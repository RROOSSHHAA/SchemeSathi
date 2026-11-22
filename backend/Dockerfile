# Multi-stage production Dockerfile for SchemeSathi Backend
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8000

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Expose Koyeb standard port
EXPOSE 8000

# Start server
CMD ["node", "src/server.js"]
