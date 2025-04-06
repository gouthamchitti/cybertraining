# Cybersecurity Training Platform

A modern, interactive platform for learning cybersecurity concepts and skills.

## Features

- User authentication and profile management
- Course catalog with filtering and search
- Interactive learning modules with rich visual content
- Comprehensive progress tracking and skill development
- Hands-on lab environments using Docker
- AI-powered learning assistant using Google's Gemini AI
- Admin dashboard for monitoring student progress
- Teacher dashboard for managing courses and students
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Lab Environments**: Docker, FastAPI
- **AI Integration**: Google Gemini AI
- **Deployment**: Azure (or alternative cloud provider)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Docker and Docker Compose (for lab environments)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cyber-security-training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project in Supabase
   - Run the SQL from `supabase/migrations/*.sql` in the Supabase SQL editor
   - The Supabase credentials are already configured in the project

4. Set up Docker environments (optional, for lab functionality):
   ```bash
   cd docker
   docker-compose up -d
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
cyber-security-training/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── admin/            # Admin dashboard
│   │   ├── dashboard/        # User dashboard
│   │   │   ├── modules/      # Learning modules
│   │   │   ├── labs/         # Lab environments
│   │   │   └── ...
│   ├── components/           # Reusable React components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── modules/          # Module components
│   │   └── ...
│   ├── utils/                # Utility functions and helpers
│   │   ├── supabase.ts       # Supabase client configuration
│   │   ├── supabase-types.ts # TypeScript types for Supabase
│   │   ├── progressTracking.ts # Progress tracking functions
│   │   ├── db-operations.ts  # Database operations
│   │   └── gemini.ts         # Gemini AI integration
├── public/                   # Static assets
├── supabase/                 # Supabase configuration
│   ├── migrations/           # Database migrations
│   └── schema.sql            # Database schema
├── docker/                   # Docker configuration
│   ├── ubuntu-base/          # Ubuntu environment
│   ├── kali-linux/           # Kali Linux environment
│   ├── security-tools/       # Security tools environment
│   ├── environment-proxy/    # Environment proxy API
│   └── docker-compose.yml    # Docker Compose configuration
└── package.json              # Project dependencies and scripts
```

## Supabase Integration

The platform uses Supabase for:

1. **Authentication**: User signup, login, and password reset
2. **Database**: Storing courses, modules, lessons, user progress, and lab environments
3. **Row Level Security**: Ensuring users can only access their own data
4. **Role-Based Access Control**: Admin, teacher, and student roles with appropriate permissions

## AI Integration

The platform integrates with Google's Gemini AI to provide:

1. **Cybersecurity Tips**: Get practical tips on various security topics
2. **Concept Explanations**: Simplified explanations of complex security concepts
3. **Practice Questions**: Generate custom practice questions at different difficulty levels
4. **Scenario Analysis**: Analyze security scenarios and get recommendations

## Deployment

### Frontend Deployment

The application can be deployed to any hosting platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

### Docker Environment Deployment

1. Set up a VM with Docker and Docker Compose
2. Deploy the Docker Compose configuration
3. Configure the environment proxy API to communicate with your Supabase instance

## License

This project is licensed under the MIT License - see the LICENSE file for details.
