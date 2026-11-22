# Production Dockerfile for SchemeSathi Backend
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy source code
COPY src ./src

# Expose Koyeb standard port
EXPOSE 8000

# Start server
CMD ["node", "src/server.js"]
