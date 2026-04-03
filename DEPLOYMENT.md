# EventTrackPro Deployment Guide

Complete guide to deploying EventTrackPro to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Backend API deployed and tested
- [ ] Database migrations completed
- [ ] Authentication system implemented
- [ ] CORS configured correctly
- [ ] Security headers set up
- [ ] SSL/TLS certificate obtained
- [ ] Error logging configured
- [ ] Performance optimized
- [ ] Tested all user workflows

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the official Next.js hosting platform with optimal performance.

#### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init

# Add files to git
git add .
git commit -m "Initial EventTrackPro setup"

# Create repository on GitHub
# https://github.com/new
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will detect Next.js automatically

#### Step 3: Configure Environment Variables

In Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add production environment variables:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_AUTH_URL=https://your-api-domain.com/auth
```

#### Step 4: Deploy

1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Your app is live at `your-project.vercel.app`

#### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate auto-generated

### Option 2: Deploy to AWS

#### Step 1: Prepare Application

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

#### Step 2: Create AWS EC2 Instance

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 3: Deploy Application

```bash
# Clone your repository
git clone https://github.com/yourusername/eventtrackpro.git
cd eventtrackpro

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "eventtrackpro" -- start
pm2 save
```

#### Step 4: Configure Nginx

```bash
# Install Nginx
sudo apt-get install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/default
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 5: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### Option 3: Deploy to Docker

#### Step 1: Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 2: Create docker-compose.yml

```yaml
version: '3.8'
services:
  eventtrackpro:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
      NODE_ENV: production
    restart: unless-stopped
```

#### Step 3: Build and Run

```bash
# Build image
docker build -t eventtrackpro:latest .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com eventtrackpro:latest

# Or use docker-compose
docker-compose up -d
```

### Option 4: Deploy to Digital Ocean App Platform

1. Push code to GitHub
2. Go to Digital Ocean dashboard
3. Create new App
4. Connect GitHub repository
5. Configure environment variables
6. Auto-deploys on push to main

## Post-Deployment

### 1. Health Checks

```bash
# Test endpoint
curl https://your-domain.com/
curl https://your-domain.com/api/health

# Check logs
pm2 logs eventtrackpro
```

### 2. Monitoring

Setup monitoring services:
- **Sentry**: Error tracking
- **New Relic**: Performance monitoring
- **Datadog**: Infrastructure monitoring
- **LogRocket**: Session replay

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
export SENTRY_AUTH_TOKEN=your_token
npx @sentry/wizard@latest --integration nextjs
```

### 3. Backup Strategy

```bash
# Backup database regularly
0 2 * * * /path/to/backup-script.sh

# Store backups offsite (S3, Azure, etc.)
aws s3 cp database.backup s3://your-bucket/
```

### 4. Security Hardening

- Enable HTTPS only (HSTS)
- Configure CSP headers
- Set up WAF rules
- Enable DDoS protection
- Regular security updates

```bash
# In next.config.js
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  }
];
```

## Performance Optimization

### 1. Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/event-image.jpg"
  alt="Event"
  width={400}
  height={300}
  priority
/>
```

### 2. Code Splitting

```typescript
// Lazy load components
import dynamic from 'next/dynamic';

const QRScanner = dynamic(() => import('@/components/qr/scanner'), {
  loading: () => <p>Loading...</p>,
});
```

### 3. Database Indexing

```mongodb
// Create indexes for frequently queried fields
db.events.createIndex({ createdBy: 1, createdAt: -1 })
db.submissions.createIndex({ eventId: 1, status: 1 })
db.users.createIndex({ email: 1 }, { unique: true })
```

### 4. Caching Strategy

```typescript
// Set cache headers in next.config.js
headers() {
  return [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000',
        },
      ],
    },
  ];
}
```

## Scaling

### Horizontal Scaling

```bash
# Load balance with Nginx
upstream backend {
    server instance1:3000;
    server instance2:3000;
    server instance3:3000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### Database Scaling

- Implement read replicas
- Use database sharding for large datasets
- Implement connection pooling
- Archive old data regularly

## Rollback Procedure

```bash
# If deployment fails
git revert HEAD
git push

# With Vercel: Automatic rollback available in dashboard
# With Docker: Switch to previous image tag
docker tag eventtrackpro:previous-stable eventtrackpro:latest
```

## Monitoring Commands

```bash
# Check application status
pm2 status
pm2 logs eventtrackpro --lines 100

# System resources
top
free -h
df -h

# Network connections
netstat -tulpn | grep LISTEN

# Database connection
mongosh --eval "db.adminCommand('ping')"
```

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs eventtrackpro

# Verify Node version
node --version

# Check port availability
lsof -i :3000
```

### High Memory Usage

```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm start

# Check for memory leaks
node --inspect-brk server.js
```

### Database Connection Issues

```bash
# Verify connection string
echo $MONGODB_URI

# Test connection
mongosh $MONGODB_URI

# Check network access
telnet db-host 27017
```

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly: `npm update`
- [ ] Check security vulnerabilities: `npm audit`
- [ ] Review and rotate logs weekly
- [ ] Backup database daily
- [ ] Monitor performance metrics
- [ ] Update SSL certificates (auto with Let's Encrypt)

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages safely
npm update

# Update specific package
npm install package@latest

# Test after updates
npm run build && npm start
```

## Cost Optimization

### Vercel
- Free tier for development
- $20+/month for production
- Scales automatically

### AWS
- Use spot instances for non-critical
- Set up auto-scaling groups
- Use CloudFront for static assets
- Reserved instances for stable workloads

### Digital Ocean
- $4-6/month basic droplet
- App Platform: $12+/month
- Managed databases: $15+/month

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)
- [Docker Documentation](https://docs.docker.com/)

---

Deploy with confidence!
