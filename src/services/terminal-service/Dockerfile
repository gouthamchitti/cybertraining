FROM node:18-slim

# Install dependencies required for node-pty
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    bash \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3001

# Start the service
CMD ["node", "server.js"]
