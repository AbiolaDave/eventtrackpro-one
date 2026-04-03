# EventTrackPro Quick Start Guide

Get up and running with EventTrackPro in 5 minutes.

## 1. Install & Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 2. Navigate to Landing Page

You'll see the EventTrackPro landing page with:
- Platform overview
- Feature highlights
- Call-to-action buttons

Click **"Get Started"** or **"Start Tracking Now"** to begin.

## 3. Select Your Role

Choose one of three roles:

### Event Administrator
Manages events and counters
- Create events
- Scan QR codes to register counters
- Manage services and counting rules
- Review all submissions

### Count Coordinator
Reviews and approves submissions
- Monitor counter submissions
- Approve or reject counts
- Track submission history
- Manage coordinator team

### Counter
Submits attendance counts
- View assigned events
- Submit counts
- Download personal QR code
- Track submission status

## 4. Register Your Account

Fill in the registration form:
- **Full Name**: Your name
- **Email**: Your email address
- **Password**: At least 8 characters

Click **"Create Account"** to proceed.

## 5. Explore Your Dashboard

Each role has a unique dashboard:

### Admin Dashboard
- **Events**: View all created events
- **Create Event**: Add new events with services
- **Manage Counters**: View all registered counters
- **Scan Counter QR**: Register counters via QR code

### Coordinator Dashboard
- **Pending Reviews**: See submissions to review
- **Approved**: View approved submissions
- **Total Submissions**: Track submission count

### Counter Dashboard
- **Quick Stats**: See your submission stats
- **Active Events**: View events you can submit to
- **Submission History**: Track your submitted counts
- **Your QR Code**: Download your identification QR code

## 6. Try Admin Features

1. **Create an Event**
   - Click "Create Event"
   - Enter event name and date
   - Add counting services (e.g., "Registration", "Attendance")
   - Click "Create Event"

2. **Manage Counters**
   - Click "Manage Counters"
   - View registered counters
   - Click "QR" to view counter's QR code

3. **Scan QR Codes**
   - Click "Scan Counter QR"
   - Use your device camera or enter counter ID manually
   - Counters are registered to the system

## 7. Try Counter Features

1. **View Your QR Code**
   - Click "Your Counter QR Code"
   - Download the QR code as PNG
   - Share with event administrators

2. **Submit a Count**
   - Select an active event
   - Click "Submit Count"
   - Enter the count number
   - Add optional notes
   - Click "Submit Count"

3. **Track Status**
   - View submission history
   - Check if counts are approved or pending
   - See approval feedback

## 8. Try Coordinator Features

1. **Review Submissions**
   - See pending submissions
   - Check counter name and submission details
   - Note the timestamp

2. **Approve Submissions**
   - Click on a submission to view details
   - Approve or request revision
   - Provide feedback to counters

## Demo Credentials

All roles use the same login credentials for testing:

**Email**: `demo@example.com`
**Password**: `password123`

## Key Workflows

### Create and Launch Event (Admin)
1. Go to "Create Event"
2. Enter event details
3. Add counting services
4. Event appears in dashboard

### Register Counter (Admin)
1. Go to "Scan Counter QR"
2. Scan counter's QR or enter ID
3. Counter is registered to system
4. Can now be assigned to events

### Submit Count (Counter)
1. Go to "Active Events"
2. Select event
3. Click "Submit Count"
4. Enter count value
5. Get instant confirmation

### Approve Count (Coordinator)
1. Go to "Pending Reviews"
2. Review submission details
3. Click badge to approve
4. Counter gets notification

## Customization Tips

### Change Colors
Edit `app/globals.css` to customize:
- Primary color: `--primary`
- Secondary color: `--secondary`
- Accent color: `--accent`

### Add Navigation Items
Edit component files:
- Admin: `components/admin/sidebar.tsx`
- Add new menu items with routes

### Modify Forms
Update form components:
- Event creation: `app/dashboard/admin/create-event/page.tsx`
- Count submission: `app/dashboard/counter/submit/[eventId]/page.tsx`

## Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
# macOS/Linux: lsof -ti:3000 | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

### QR Scanner Not Working
- Camera permissions must be granted
- Use manual input option as fallback
- Check browser compatibility

### Form Validation Issues
- All required fields must be filled
- Password must be 8+ characters
- Email must be valid format

## Next Steps

1. **Connect Backend API**: Update endpoints in `lib/api.ts`
2. **Add Authentication**: Implement real auth with JWT or sessions
3. **Deploy**: Push to Vercel or your hosting platform
4. **Customize**: Modify styles and branding
5. **Test**: Run through all workflows thoroughly

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Formik Documentation](https://formik.org)

---

Happy tracking!
