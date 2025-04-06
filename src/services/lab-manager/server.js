require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Docker = require('dockerode');
const winston = require('winston');
const { createClient } = require('@supabase/supabase-js');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'lab-manager.log' })
  ]
});

// Environment variables
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Docker client
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Environment configurations
const environments = {
  'ubuntu-base': {
    image: 'cyber-ubuntu-base',
    resources: {
      memory: '512m',
      cpus: '0.5'
    },
    ports: {
      22: {} // SSH
    },
    cmd: ['/usr/sbin/sshd', '-D'],
    env: ['TERM=xterm']
  },
  'kali-linux': {
    image: 'cyber-kali-linux',
    resources: {
      memory: '1g',
      cpus: '1'
    },
    ports: {
      22: {} // SSH
    },
    cmd: ['/usr/sbin/sshd', '-D'],
    env: ['TERM=xterm']
  },
  'security-tools': {
    image: 'cyber-security-tools',
    resources: {
      memory: '512m',
      cpus: '0.5'
    },
    ports: {
      22: {} // SSH
    },
    cmd: ['/usr/sbin/sshd', '-D'],
    env: ['TERM=xterm']
  }
};

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
  res.json({ status: 'healthy' });
});

// Get available environments
app.get('/api/environments', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('environment_types')
      .select('*');
    
    if (error) throw error;
    
    res.json({ environments: data });
  } catch (error) {
    logger.error(`Error fetching environments: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch environments' });
  }
});

// Get user's active environments
app.get('/api/environments/active', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('environments')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'active');
    
    if (error) throw error;
    
    res.json({ environments: data });
  } catch (error) {
    logger.error(`Error fetching active environments: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch active environments' });
  }
});

// Create a new environment
app.post('/api/environments', authenticateToken, async (req, res) => {
  try {
    const { environment_type, module_id, duration_minutes = 60 } = req.body;
    
    if (!environment_type) {
      return res.status(400).json({ error: 'Environment type is required' });
    }
    
    if (!environments[environment_type]) {
      return res.status(400).json({ error: 'Invalid environment type' });
    }
    
    // Generate a unique container name
    const containerName = `cyber-${environment_type}-${req.user.id}-${Date.now()}`;
    
    // Calculate expiration time
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + duration_minutes);
    
    // Create container
    const envConfig = environments[environment_type];
    const container = await docker.createContainer({
      Image: envConfig.image,
      name: containerName,
      Cmd: envConfig.cmd,
      Env: envConfig.env,
      ExposedPorts: envConfig.ports,
      HostConfig: {
        Memory: parseInt(envConfig.resources.memory),
        NanoCpus: parseInt(envConfig.resources.cpus) * 1e9,
        PortBindings: {
          '22/tcp': [{ HostPort: '' }] // Dynamically assign port
        },
        RestartPolicy: {
          Name: 'no'
        }
      }
    });
    
    // Start container
    await container.start();
    
    // Get container info to determine assigned ports
    const containerInfo = await container.inspect();
    const sshPort = containerInfo.NetworkSettings.Ports['22/tcp'][0].HostPort;
    
    // Save environment to database
    const { data, error } = await supabase
      .from('environments')
      .insert({
        user_id: req.user.id,
        environment_type,
        module_id: module_id || null,
        container_id: containerInfo.Id,
        container_name: containerName,
        status: 'active',
        access_url: `ssh://student@localhost:${sshPort}`,
        credentials: {
          username: 'student',
          password: 'cyberstudent'
        },
        expiration_time: expirationTime.toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    logger.info(`Created environment ${containerName} for user ${req.user.id}`);
    res.status(201).json({ environment: data });
  } catch (error) {
    logger.error(`Error creating environment: ${error.message}`);
    res.status(500).json({ error: 'Failed to create environment' });
  }
});

// Terminate an environment
app.delete('/api/environments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get environment from database
    const { data: environment, error } = await supabase
      .from('environments')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();
    
    if (error) throw error;
    
    if (!environment) {
      return res.status(404).json({ error: 'Environment not found' });
    }
    
    // Stop and remove container
    const container = docker.getContainer(environment.container_id);
    await container.stop();
    await container.remove();
    
    // Update environment status in database
    const { error: updateError } = await supabase
      .from('environments')
      .update({ status: 'terminated' })
      .eq('id', id);
    
    if (updateError) throw updateError;
    
    logger.info(`Terminated environment ${environment.container_name} for user ${req.user.id}`);
    res.json({ message: 'Environment terminated successfully' });
  } catch (error) {
    logger.error(`Error terminating environment: ${error.message}`);
    res.status(500).json({ error: 'Failed to terminate environment' });
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Lab manager service running on port ${PORT}`);
});

// Periodically check for expired environments
setInterval(async () => {
  try {
    const now = new Date().toISOString();
    
    // Get expired environments
    const { data: expiredEnvironments, error } = await supabase
      .from('environments')
      .select('*')
      .eq('status', 'active')
      .lt('expiration_time', now);
    
    if (error) throw error;
    
    // Terminate expired environments
    for (const environment of expiredEnvironments) {
      try {
        const container = docker.getContainer(environment.container_id);
        await container.stop();
        await container.remove();
        
        // Update environment status in database
        await supabase
          .from('environments')
          .update({ status: 'expired' })
          .eq('id', environment.id);
        
        logger.info(`Expired environment ${environment.container_name} terminated`);
      } catch (containerError) {
        logger.error(`Error terminating expired environment ${environment.container_name}: ${containerError.message}`);
      }
    }
  } catch (error) {
    logger.error(`Error checking for expired environments: ${error.message}`);
  }
}, 60000); // Check every minute
