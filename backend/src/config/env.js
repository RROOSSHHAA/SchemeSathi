import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),

  // Supabase Configuration
  SUPABASE_URL: z.string().optional().default(''),
  SUPABASE_ANON_KEY: z.string().optional().default(''),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(''),

  // External APIs
  SERPAPI_KEY: z.string().optional().default(''),
  YDC_API_KEY: z.string().optional().default(''),

  // Auth / Security
  JWT_SECRET: z.string().default('schemesathi-dev-jwt-secret-change-in-production-only-min-32-chars-long!'),

  // Nexconn Chat
  NEXCONN_APP_ID: z.string().optional().default(''),
  NEXCONN_API_KEY: z.string().optional().default(''),

  // LLM Configuration
  LLM_PROVIDER: z.string().default('ollama'),
  OLLAMA_BASE_URL: z.string().default('http://localhost:11434'),
  OLLAMA_MODEL: z.string().optional().default('llama3.2')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Environment validation failed:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

if (env.NODE_ENV === 'production') {
  const missing = [];
  if (!env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!env.SUPABASE_ANON_KEY) missing.push('SUPABASE_ANON_KEY');

  if (missing.length > 0) {
    console.warn(`⚠️ Running with DemoShield fallback due to missing production keys: ${missing.join(', ')}`);
  }
}

export const serviceStatus = {
  supabase: Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY),
  supabaseServiceRole: Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY),
  serpApi: Boolean(env.SERPAPI_KEY),
  youSearch: Boolean(env.YDC_API_KEY),
  nexconn: Boolean(env.NEXCONN_APP_ID && env.NEXCONN_API_KEY),
  ollama: Boolean(env.OLLAMA_BASE_URL)
};

export default env;
