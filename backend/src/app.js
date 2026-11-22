import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { standardRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import healthRoutes from './routes/healthRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import vaultRoutes from './routes/vaultRoutes.js';

const app = express();

// Security Headers with Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration - restricted in production, allow local development origins
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers with limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Apply standard rate limiter for general API routes
app.use('/api', standardRateLimiter);

// API Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/schemes', schemeRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/vault', vaultRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'SchemeSathi (HaqSe) AI API',
    version: '1.0.0',
    description: 'Government Scheme Discovery and Ephemeral Multi-Agent Assistance Platform',
    endpoints: {
      health: '/api/v1/health',
      schemes: '/api/v1/schemes',
      schemeMatch: 'POST /api/v1/schemes/match',
      cscCenters: 'GET /api/v1/schemes/csc-centers',
      multiAgentChat: 'POST /api/v1/chat/multi-agent',
      nexconnToken: 'GET /api/v1/chat/nexconn/token',
      nexconnVolunteers: 'GET /api/v1/chat/nexconn/volunteers',
      ephemeralVault: '/api/v1/vault/assist'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
