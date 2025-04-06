# Lab Manager Service for Cybersecurity Training Platform

This service manages lab environments for the cybersecurity training platform, providing APIs for creating, managing, and terminating Docker-based lab environments.

## Features

- RESTful API for environment management
- Docker integration for isolated lab environments
- Supabase integration for persistent storage
- Authentication and authorization using JWT
- Automatic environment cleanup and resource management
- Support for multiple environment types

## Architecture

The lab manager service is responsible for:

1. **Environment Creation**: Creating Docker containers for lab environments
2. **Environment Management**: Managing the lifecycle of lab environments
3. **Resource Management**: Enforcing resource limits and quotas
4. **Database Integration**: Storing environment metadata in Supabase
5. **Cleanup**: Automatically terminating expired environments

## Setup

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Supabase account

### Development Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3002
   JWT_SECRET=your-secret-key
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

3. Start the service:
   ```
   npm run dev
   ```

### Production Setup

1. Build the Docker images:
   ```
   docker-compose -f docker-compose.terminal.yml build
   ```

2. Start the services:
   ```
   docker-compose -f docker-compose.terminal.yml up -d
   ```

## API Endpoints

- `GET /api/health`: Health check endpoint
- `GET /api/environments`: Get available environment types (requires authentication)
- `GET /api/environments/active`: Get user's active environments (requires authentication)
- `POST /api/environments`: Create a new environment (requires authentication)
- `DELETE /api/environments/:id`: Terminate an environment (requires authentication)

## Database Schema

The lab manager uses the following tables in Supabase:

- `environment_types`: Available environment types
- `environments`: User environment instances

## Environment Types

The following environment types are available:

- **Ubuntu Base**: Basic Ubuntu environment with common cybersecurity tools
- **Kali Linux**: Kali Linux environment for penetration testing
- **Security Tools**: Environment with specialized security tools

## Security Considerations

- All API endpoints are authenticated using JWT
- Each user's environment is isolated in a separate Docker container
- Resource limits are enforced for each container
- Environments automatically terminate after a specified duration
- Regular cleanup of expired environments

## Scaling

The lab manager service can be scaled horizontally by deploying multiple instances behind a load balancer. Each instance should have access to the Docker socket or Docker API to manage containers.

For high-availability deployments, consider using a container orchestration platform like Kubernetes.

## Troubleshooting

Common issues:

- **Container creation fails**: Verify Docker permissions and resource availability
- **Database connection fails**: Check Supabase credentials and network connectivity
- **Environment termination fails**: Verify Docker API access and container status
