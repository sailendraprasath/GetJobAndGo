# GetJobAndGo - Job Portal Platform

A modern, full-stack job portal connecting students with verified companies. Built with React, Tailwind CSS v4, and Supabase.

## Features

### For Students
- Register and create profile with education, skills, and bio
- Browse active job listings from verified companies
- Apply to jobs with optional cover letter
- Track application status (pending, shortlisted, rejected)
- View detailed job descriptions and company information

### For Companies
- Register company profile with GST/CIN verification
- Post job listings with detailed requirements
- View and manage job postings
- Review applicant profiles with skills and education
- Shortlist or reject candidates
- Track all applications per job

### For Admins
- Approve or reject company verification requests
- View all companies with verification details
- Monitor all job postings across platform
- Manage platform activity

## Tech Stack

- **Frontend**: React 18 with JavaScript (JSX)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth (email/password)
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FeatureCard.jsx
│   ├── JobCard.jsx
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── student/
│   │   ├── StudentRegister.jsx
│   │   ├── StudentLogin.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── JobDetails.jsx
│   ├── company/
│   │   ├── CompanyRegister.jsx
│   │   ├── CompanyLogin.jsx
│   │   └── CompanyDashboard.jsx
│   └── admin/
│       ├── AdminLogin.jsx
│       └── AdminDashboard.jsx
├── layouts/            # Layout components
│   └── MainLayout.jsx
├── services/           # API services
│   ├── supabase.js
│   └── api.js
├── context/            # React Context
│   └── AuthContext.jsx
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Database Schema

### Tables
- **profiles**: User profiles with role (student/company/admin)
- **students**: Student-specific information (degree, skills, resume)
- **companies**: Company details and verification status
- **jobs**: Job postings by companies
- **applications**: Student applications to jobs

### Security
- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Students can only view/edit their own data
- Companies can only manage their own jobs
- Admins have full access

## Routes

### Public Routes
- `/` - Home page
- `/student/register` - Student registration
- `/student/login` - Student login
- `/company/register` - Company registration
- `/company/login` - Company login
- `/admin/login` - Admin login

### Protected Routes (Student)
- `/student/dashboard` - Student dashboard
- `/student/job/:id` - Job details and application

### Protected Routes (Company)
- `/company/dashboard` - Company dashboard

### Protected Routes (Admin)
- `/admin/dashboard` - Admin dashboard

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are pre-configured in `.env`

3. Start development server (handled automatically)

4. Build for production:
```bash
npm run build
```

## Design System

### Colors
- **Primary Blue**: #1E3A8A (blue-800)
- **Primary Green**: #22C55E (green-500)
- **Background**: Gray-50
- **Text**: Gray-900

### Typography
- Font: System font stack (sans-serif)
- Smooth antialiasing enabled

### Components
- Rounded corners (rounded-xl)
- Shadow effects (shadow-md)
- Smooth transitions (duration-300)
- Card-based layouts
- Responsive design (mobile-first)

## Key Features Implementation

### Authentication
- Email/password authentication via Supabase Auth
- Context API for global auth state
- Automatic session management
- Protected routes with role-based access

### State Management
- React Context for authentication
- Local state with useState/useEffect
- API service layer for data operations

### API Integration
- Centralized API service (`services/api.js`)
- Async/await pattern
- Error handling
- Real-time data fetching

### Form Handling
- Controlled components
- Client-side validation
- Loading states
- Error messages

## Production Ready

The application is production-ready with:
- Clean, modular code structure
- TypeScript-free (pure JavaScript/JSX)
- Responsive design
- Role-based access control
- Secure database with RLS
- Optimized build output
- Modern UI with Tailwind CSS v4
- Protected routes
- Error handling
