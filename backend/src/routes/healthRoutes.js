import { Router } from 'express';
import { serviceStatus, env } from '../config/env.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: 'SchemeSathi AI API',
      status: 'operational',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      integrations: {
        database_configured: serviceStatus.supabase,
        database_admin_configured: serviceStatus.supabaseServiceRole,
        serpapi_configured: serviceStatus.serpApi,
        yousearch_configured: serviceStatus.youSearch,
        nexconn_configured: serviceStatus.nexconn,
        ollama_configured: serviceStatus.ollama
      }
    }
  });
});

export default router;
