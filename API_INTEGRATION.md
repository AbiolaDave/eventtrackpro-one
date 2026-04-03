# API Integration Guide

This guide explains how to connect EventTrackPro to your backend API.

## Overview

EventTrackPro is currently a frontend-only application with mock data. To make it fully functional, you need to:

1. Create API endpoints in your backend
2. Update the API client in the frontend
3. Implement authentication
4. Connect database operations

## API Structure

### Base Configuration

Create `lib/api.ts` with your API configuration:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## Required API Endpoints

### Authentication

#### Register
```
POST /auth/register
Body: { email, password, fullName, role }
Response: { token, user: { id, email, role } }
```

#### Login
```
POST /auth/login
Body: { email, password, role }
Response: { token, user: { id, email, role } }
```

#### Verify Token
```
GET /auth/verify
Headers: Authorization: Bearer <token>
Response: { valid: boolean, user: {...} }
```

### Events (Admin)

#### Get All Events
```
GET /events
Response: { events: [...], total: number }
```

#### Get Event by ID
```
GET /events/:id
Response: { event: {...}, counters: [...], submissions: [...] }
```

#### Create Event
```
POST /events
Body: {
  name: string,
  date: string (ISO),
  description: string,
  services: string[]
}
Response: { event: {...} }
```

#### Update Event
```
PUT /events/:id
Body: { name?, date?, description?, services? }
Response: { event: {...} }
```

#### Delete Event
```
DELETE /events/:id
Response: { success: boolean }
```

### Counters (Admin)

#### Get All Counters
```
GET /counters
Response: { counters: [...], total: number }
```

#### Get Counter by ID
```
GET /counters/:id
Response: { counter: {...} }
```

#### Register Counter (via QR)
```
POST /counters/register
Body: { qrCode: string, eventId?: string }
Response: { counter: {...} }
```

#### Assign Counter to Event
```
POST /counters/:id/assign
Body: { eventId: string }
Response: { success: boolean }
```

#### Get Counter QR Code
```
GET /counters/:id/qr
Response: { qrCode: string, counterId: string }
```

### Submissions (Coordinator/Counter)

#### Get Submissions for Event
```
GET /submissions?eventId=:eventId
Response: { submissions: [...], total: number }
```

#### Get Counter's Submissions
```
GET /submissions/counter/:counterId
Response: { submissions: [...], total: number }
```

#### Submit Count
```
POST /submissions
Body: {
  eventId: string,
  counterId: string,
  service: string,
  count: number,
  notes?: string
}
Response: { submission: {...} }
```

#### Approve Submission
```
PUT /submissions/:id/approve
Body: { feedback?: string }
Response: { submission: {...} }
```

#### Reject Submission
```
PUT /submissions/:id/reject
Body: { reason: string }
Response: { submission: {...} }
```

## Implementation Steps

### 1. Create API Client

Create `lib/api/client.ts`:

```typescript
import axios from 'axios';
import apiClient from './index';

export const authApi = {
  register: (email: string, password: string, fullName: string, role: string) =>
    apiClient.post('/auth/register', { email, password, fullName, role }),
  
  login: (email: string, password: string, role: string) =>
    apiClient.post('/auth/login', { email, password, role }),
  
  verify: () => apiClient.get('/auth/verify'),
};

export const eventApi = {
  getAll: () => apiClient.get('/events'),
  
  getById: (id: string) => apiClient.get(`/events/${id}`),
  
  create: (data: any) => apiClient.post('/events', data),
  
  update: (id: string, data: any) => apiClient.put(`/events/${id}`, data),
  
  delete: (id: string) => apiClient.delete(`/events/${id}`),
};

export const counterApi = {
  getAll: () => apiClient.get('/counters'),
  
  getById: (id: string) => apiClient.get(`/counters/${id}`),
  
  register: (qrCode: string) => apiClient.post('/counters/register', { qrCode }),
  
  assignToEvent: (id: string, eventId: string) =>
    apiClient.post(`/counters/${id}/assign`, { eventId }),
  
  getQR: (id: string) => apiClient.get(`/counters/${id}/qr`),
};

export const submissionApi = {
  getByEvent: (eventId: string) => apiClient.get(`/submissions?eventId=${eventId}`),
  
  getByCounter: (counterId: string) => apiClient.get(`/submissions/counter/${counterId}`),
  
  submit: (data: any) => apiClient.post('/submissions', data),
  
  approve: (id: string, feedback?: string) =>
    apiClient.put(`/submissions/${id}/approve`, { feedback }),
  
  reject: (id: string, reason: string) =>
    apiClient.put(`/submissions/${id}/reject`, { reason }),
};
```

### 2. Update Login Page

Update `app/auth/login/[role]/page.tsx`:

```typescript
import { authApi } from '@/lib/api/client';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authApi.login(email, password, role);
    const { token, user } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    
    // Redirect to dashboard
    router.push(`/dashboard/${role}`);
  } catch (err) {
    setError('Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};
```

### 3. Update Admin Dashboard

Update `app/dashboard/admin/page.tsx`:

```typescript
import { eventApi } from '@/lib/api/client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        setEvents(response.data.events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    // ... rest of component
  );
}
```

### 4. Update Create Event

Update `app/dashboard/admin/create-event/page.tsx`:

```typescript
import { eventApi } from '@/lib/api/client';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await eventApi.create({
      name: eventName,
      date: eventDate,
      services,
    });
    
    router.push('/dashboard/admin');
  } catch (err) {
    setError('Failed to create event');
  } finally {
    setLoading(false);
  }
};
```

### 5. Update Submissions

Update `app/dashboard/counter/submit/[eventId]/page.tsx`:

```typescript
import { submissionApi } from '@/lib/api/client';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const counterId = localStorage.getItem('counterId');
    
    await submissionApi.submit({
      eventId,
      counterId,
      count: parseInt(count),
      notes,
    });
    
    setSubmitted(true);
  } catch (err) {
    setError('Failed to submit count');
  } finally {
    setLoading(false);
  }
};
```

## Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AUTH_URL=http://localhost:5000/auth
```

## Error Handling

Implement global error handling:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/select-role';
    }
    return Promise.reject(error);
  }
);
```

## Testing API Endpoints

Use tools like Postman or curl to test:

```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"admin"}'

# Get events
curl -X GET http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Backend Requirements

Ensure your backend implements:

1. **Authentication**: JWT tokens or sessions
2. **Validation**: Input validation on all endpoints
3. **Error Handling**: Consistent error response format
4. **CORS**: Allow requests from frontend domain
5. **Rate Limiting**: Prevent abuse
6. **Logging**: Track all operations

## Database Schema Suggestions

### Users
```
{
  id: ObjectId,
  email: string (unique),
  password: string (hashed),
  fullName: string,
  role: 'admin' | 'coordinator' | 'counter',
  qrCode: string,
  createdAt: Date
}
```

### Events
```
{
  id: ObjectId,
  name: string,
  date: Date,
  description: string,
  services: string[],
  createdBy: ObjectId (admin),
  status: 'draft' | 'active' | 'completed',
  createdAt: Date,
  updatedAt: Date
}
```

### Submissions
```
{
  id: ObjectId,
  eventId: ObjectId,
  counterId: ObjectId,
  service: string,
  count: number,
  notes: string,
  status: 'pending' | 'approved' | 'rejected',
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: ObjectId
}
```

## Deployment Considerations

1. Update API URLs for production
2. Implement proper authentication tokens
3. Add HTTPS/SSL certificates
4. Enable CORS for production domain
5. Set up database backups
6. Implement logging and monitoring
7. Add rate limiting and throttling

## Support

For issues with API integration, check:
- Console logs for error messages
- Network tab in browser DevTools
- Backend logs for server-side errors
- CORS headers in response
- Token expiration and refresh logic
