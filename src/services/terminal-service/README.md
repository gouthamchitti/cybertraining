# Terminal Service for Cybersecurity Training Platform

This service provides a web-based terminal interface for the cybersecurity training platform, allowing users to access lab environments directly in their browser.

## Features

- Web-based terminal using Xterm.js
- WebSocket communication for real-time terminal interaction
- Docker integration for isolated lab environments
- Authentication and authorization using JWT
- Session management and automatic cleanup
- Resource monitoring and scaling

## Architecture

The terminal service consists of several components:

1. **Terminal Service**: Node.js server that manages terminal sessions and WebSocket connections
2. **Lab Manager**: Service that manages Docker containers for lab environments
3. **Terminal Proxy**: NGINX proxy for WebSocket connections
4. **Frontend Component**: React component that provides the terminal UI

## Setup

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- NGINX (for production)

### Development Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your-secret-key
   MAX_SESSIONS=50
   SESSION_TIMEOUT=3600000
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

## Usage

The terminal service exposes the following endpoints:

- `GET /api/health`: Health check endpoint
- `GET /api/environments`: Get available environments (requires authentication)
- `POST /api/terminal`: Create a new terminal session (requires authentication)

WebSocket connections are established at the root endpoint (`/`) and require authentication via the `authenticate` event.

## Security Considerations

- All connections are authenticated using JWT
- Each user's environment is isolated in a separate Docker container
- Resource limits are enforced for each container
- Sessions automatically terminate after a period of inactivity
- All terminal sessions have a maximum lifetime

## Scaling

The terminal service can be scaled horizontally by deploying multiple instances behind a load balancer. Each instance should have access to the Docker socket or Docker API to manage containers.

For high-availability deployments, consider using a container orchestration platform like Kubernetes.

## Troubleshooting

Common issues:

- **WebSocket connection fails**: Check NGINX configuration for WebSocket support
- **Container creation fails**: Verify Docker permissions and resource availability
- **High resource usage**: Adjust container resource limits and maximum session count
