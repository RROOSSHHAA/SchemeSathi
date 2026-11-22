# Production Dockerfile for Koyeb (Root level detection)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

# Copy backend package manifests
COPY backend/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy backend source code
COPY backend/src ./src

EXPOSE 8000

CMD ["node", "src/server.js"]
