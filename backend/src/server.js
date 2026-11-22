import app from './app.js';
import { env } from './config/env.js';

const PORT = Number(process.env.PORT || env.PORT || 5000);
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`=======================================================`);
  console.log(`🏛️ SchemeSathi AI Backend running on ${HOST}:${PORT}`);
  console.log(`🌐 Environment: ${env.NODE_ENV}`);
  console.log(`🔗 Allowed Frontend: ${env.FRONTEND_URL}`);
  console.log(`🩺 Health check: http://${HOST}:${PORT}/api/v1/health`);
  console.log(`=======================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Shutting down gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Shutting down gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

export default server;
