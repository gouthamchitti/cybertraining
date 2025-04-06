require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const pty = require('node-pty');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'terminal-service.log' })
  ]
});

// Environment variables
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MAX_SESSIONS = process.env.MAX_SESSIONS || 50;
const SESSION_TIMEOUT = process.env.SESSION_TIMEOUT || 3600000; // 1 hour in milliseconds

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Store active terminals
const terminals = {};
let sessionCount = 0;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', sessions: sessionCount });
});

app.get('/api/environments', authenticateToken, (req, res) => {
  // In a real implementation, this would fetch available environments from a database or Docker API
  const environments = [
    { id: 'ubuntu-base', name: 'Ubuntu Base', description: 'Basic Ubuntu environment with common tools' },
    { id: 'kali-linux', name: 'Kali Linux', description: 'Kali Linux for penetration testing' },
    { id: 'security-tools', name: 'Security Tools', description: 'Environment with specialized security tools' }
  ];
  
  res.json({ environments });
});

app.post('/api/terminal', authenticateToken, (req, res) => {
  if (sessionCount >= MAX_SESSIONS) {
    return res.status(503).json({ error: 'Maximum session limit reached' });
  }
  
  const { environmentId } = req.body;
  if (!environmentId) {
    return res.status(400).json({ error: 'Environment ID is required' });
  }
  
  // Generate a unique session ID
  const sessionId = `${req.user.id}-${Date.now()}`;
  
  res.json({ sessionId });
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  logger.info(`New connection: ${socket.id}`);
  
  socket.on('authenticate', (data) => {
    try {
      const { token, sessionId, environmentId } = data;
      const user = jwt.verify(token, JWT_SECRET);
      
      if (sessionCount >= MAX_SESSIONS) {
        socket.emit('error', { message: 'Maximum session limit reached' });
        socket.disconnect();
        return;
      }
      
      // In a production environment, we would launch a container for the user
      // For this example, we'll just start a local shell
      let shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
      let args = [];
      
      // In a real implementation, we would use Docker to run the appropriate environment
      // For example:
      // exec(`docker run -d --name ${sessionId} ${getDockerImage(environmentId)}`, (error, stdout, stderr) => {
      //   if (error) {
      //     logger.error(`Error starting container: ${error.message}`);
      //     socket.emit('error', { message: 'Failed to start environment' });
      //     return;
      //   }
      //   
      //   // Connect to the container
      //   shell = 'docker';
      //   args = ['exec', '-it', sessionId, 'bash'];
      //   startTerminal();
      // });
      
      startTerminal();
      
      function startTerminal() {
        // Start the terminal
        const term = pty.spawn(shell, args, {
          name: 'xterm-color',
          cols: 80,
          rows: 24,
          cwd: process.env.HOME || process.env.USERPROFILE,
          env: process.env
        });
        
        // Store the terminal
        terminals[sessionId] = {
          term,
          lastActivity: Date.now(),
          environmentId,
          userId: user.id
        };
        
        sessionCount++;
        logger.info(`Terminal started for session ${sessionId}, environment: ${environmentId}, user: ${user.id}`);
        
        // Set up terminal data handling
        term.on('data', (data) => {
          socket.emit('output', data);
          terminals[sessionId].lastActivity = Date.now();
        });
        
        // Handle input from client
        socket.on('input', (data) => {
          if (terminals[sessionId]) {
            terminals[sessionId].term.write(data);
            terminals[sessionId].lastActivity = Date.now();
          }
        });
        
        // Handle terminal resize
        socket.on('resize', (size) => {
          if (terminals[sessionId] && size.cols && size.rows) {
            terminals[sessionId].term.resize(size.cols, size.rows);
          }
        });
        
        // Handle disconnection
        socket.on('disconnect', () => {
          cleanupTerminal(sessionId);
        });
        
        // Send ready signal
        socket.emit('ready', { sessionId });
      }
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      socket.emit('error', { message: 'Authentication failed' });
      socket.disconnect();
    }
  });
});

// Cleanup function for terminals
function cleanupTerminal(sessionId) {
  if (terminals[sessionId]) {
    logger.info(`Cleaning up terminal for session ${sessionId}`);
    
    // Kill the terminal process
    terminals[sessionId].term.kill();
    
    // In a real implementation, we would stop the Docker container
    // For example:
    // exec(`docker stop ${sessionId} && docker rm ${sessionId}`, (error, stdout, stderr) => {
    //   if (error) {
    //     logger.error(`Error stopping container: ${error.message}`);
    //   }
    // });
    
    // Remove the terminal from our store
    delete terminals[sessionId];
    sessionCount--;
  }
}

// Periodically check for inactive terminals
setInterval(() => {
  const now = Date.now();
  Object.keys(terminals).forEach((sessionId) => {
    const terminal = terminals[sessionId];
    if (now - terminal.lastActivity > SESSION_TIMEOUT) {
      logger.info(`Terminal session ${sessionId} timed out due to inactivity`);
      cleanupTerminal(sessionId);
    }
  });
}, 60000); // Check every minute

// Start the server
server.listen(PORT, () => {
  logger.info(`Terminal service running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  
  // Clean up all terminals
  Object.keys(terminals).forEach(cleanupTerminal);
  
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
