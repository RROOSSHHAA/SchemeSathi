import { createClient } from '@supabase/supabase-js';
import { env, serviceStatus } from './env.js';

let supabaseClient = null;
let supabaseAdminClient = null;

if (serviceStatus.supabase) {
  // Public client respecting RLS using anon key
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

if (serviceStatus.supabaseServiceRole) {
  // Admin client for backend-only privileged tasks (e.g. audit logs, admin tasks)
  supabaseAdminClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

/**
 * Returns an authenticated Supabase client for a specific user bearer token
 * to strictly honor Row Level Security (RLS) on user operations.
 */
export const getAuthenticatedSupabaseClient = (token) => {
  if (!serviceStatus.supabase) {
    throw new Error('Supabase is not configured. Please supply SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env');
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
};

export const supabase = supabaseClient;
export const supabaseAdmin = supabaseAdminClient;
