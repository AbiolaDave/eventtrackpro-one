# EventTrackPro 2.0

A modern, professional event tracking and counting platform built with Next.js 15, TypeScript, and Tailwind CSS. Features role-based access control for administrators, coordinators, and counters with real-time submission tracking and QR code management.

## Features

### For Event Administrators
- Create and manage events with multiple counting services
- Assign counters to events with QR code generation
- Review all submissions in real-time
- View comprehensive event statistics and reports
- Manage coordinator teams and permissions

### For Count Coordinators
- Monitor counter activity and submissions
- Review and approve/reject count submissions
- Track submission status in real-time
- Coordinate between administrators and counters

### For Counters
- Submit attendance and count data
- Track submission status and approval history
- View assigned events and services
- Access unique QR code for event registration
- Get instant feedback on submissions

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Forms**: Formik + Yup
- **QR Codes**: react-qr-code + html5-qrcode
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
eventtrackpro/
├── app/
│   ├── auth/
│   │   ├── login/[role]/          # Login pages
│   │   ├── register/[role]/       # Registration pages
│   │   └── select-role/           # Role selection
│   ├── dashboard/
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── page.tsx           # Main dashboard
│   │   │   ├── create-event/      # Create event form
│   │   │   ├── event/[id]/        # Event details
│   │   │   ├── manage-counters/   # Counter management
│   │   │   ├── scan-qr/           # QR scanner
│   │   │   └── layout.tsx         # Admin layout
│   │   ├── coordinator/           # Coordinator dashboard
│   │   └── counter/               # Counter dashboard
│   │       ├── submit/[eventId]/  # Count submission
│   │       ├── my-qr/             # QR display
│   │       └── page.tsx           # Main dashboard
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── admin/                     # Admin-specific components
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   └── qr/                        # QR-related components
│       └── qr-display.tsx
├── lib/
│   └── utils.ts                   # Utility functions
├── public/                        # Static assets
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies**
```bash
npm install
# or
yarn install
pnpm install
bun install
```

2. **Run development server**
```bash
npm run dev
```

3. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Landing Page
Start at the home page to learn about EventTrackPro and understand the platform features.

### Role Selection
Choose your role to proceed with authentication:
- **Event Administrator**: Manage events and counters
- **Count Coordinator**: Review submissions
- **Counter**: Submit counts

### Authentication
Register or login with your role. Demo credentials are provided in the login form.

### Admin Workflow
1. Create a new event with counting services
2. Scan counter QR codes to register them
3. Assign counters to events
4. Monitor submissions in real-time
5. Review and approve counts

### Coordinator Workflow
1. View pending submissions
2. Review count details
3. Approve or request revisions
4. Monitor counter activity

### Counter Workflow
1. View assigned events
2. Download/display your unique QR code
3. Submit counts for each event
4. Track submission status
5. View approval feedback

## Key Components

### Admin Sidebar
- Quick navigation to all admin functions
- Real-time status indicators
- User profile and sign out

### Dashboard Cards
- Statistics overview
- Activity tracking
- Status indicators

### Forms
- Event creation with multiple services
- Count submission with validation
- Inline validation and error feedback

### QR System
- Counter identification via QR codes
- Download QR codes as PNG
- Manual fallback input option
- Camera scanning support

## API Integration Points

The application is designed to work with a backend API. Integration points include:

- **Authentication**: User login/registration
- **Event Management**: Create, read, update events
- **Counter Management**: Register, assign, manage counters
- **Submissions**: Submit and review counts
- **QR Codes**: Generate and validate QR codes

Update API endpoints in `lib/api.ts` once backend is available.

## Customization

### Colors & Theme
Edit design tokens in:
- `tailwind.config.ts` - Color definitions
- `app/globals.css` - CSS variables

### Typography
Fonts are configured in:
- `app/layout.tsx` - Font imports
- `tailwind.config.ts` - Font family classes

### Components
All UI components are in `components/ui/` and can be customized to match your branding.

## Development

### Building
```bash
npm run build
```

### Production
```bash
npm run start
```

## Best Practices

1. **Type Safety**: All components use TypeScript for better type checking
2. **Accessibility**: Components follow WCAG 2.1 AA standards
3. **Performance**: Uses Next.js optimizations and lazy loading
4. **Mobile First**: Responsive design that works on all devices
5. **Security**: Client-side form validation and error handling

## Future Enhancements

- Real-time WebSocket updates for live submission tracking
- Advanced filtering and search capabilities
- Batch operations for managing multiple counters
- Export reports to CSV/PDF
- Email notifications for submissions
- Dark mode support
- Multi-language support
- Analytics dashboard with charts

## License

Proprietary - All rights reserved

## Support

For issues or questions, please contact the development team or open an issue in the repository.

---

Built with passion for event management efficiency.

# Install frontend dependencies
cd ../frontend
npm install
