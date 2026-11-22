import { Router } from 'express';
import { serviceStatus, env } from '../config/env.js';
import { supabase } from '../config/supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  let dbConnected = false;
  let dbLatencyMs = null;

  if (supabase) {
    try {
      const start = Date.now();
      const { data, error } = await supabase.from('schemes').select('id').limit(1);
      dbLatencyMs = Date.now() - start;
      dbConnected = !error && Boolean(data);
    } catch {
      dbConnected = false;
    }
  }

  res.status(200).json({
    success: true,
    data: {
      service: 'SchemeSathi AI API',
      status: 'operational',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      database: {
        provider: 'Supabase (PostgreSQL)',
        configured: serviceStatus.supabase,
        connected: dbConnected,
        latency_ms: dbLatencyMs
      },
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
