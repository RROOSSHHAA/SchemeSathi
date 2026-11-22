import { Router } from 'express';
import { serviceStatus, env } from '../config/env.js';
import { supabase } from '../config/supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  let database = {
    configured: serviceStatus.supabase,
    connected: false,
    table: 'schemes'
  };

  if (supabase) {
    const { error } = await supabase.from('schemes').select('code', { head: true, count: 'exact' });
    database.connected = !error;
    if (error) database.error = error.message;
  }

  const databaseHealthy = !database.configured || database.connected;
  res.status(databaseHealthy ? 200 : 503).json({
    success: databaseHealthy,
    data: {
      service: 'SchemeSathi AI API',
      status: databaseHealthy ? 'operational' : 'degraded',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      database: {
        provider: 'Supabase (PostgreSQL)',
        configured: serviceStatus.supabase,
        connected: database.connected,
        error: database.error || null
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
