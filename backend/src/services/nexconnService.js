import crypto from 'crypto';
import axios from 'axios';
import { env } from '../config/env.js';

const PRIMARY_BASE_URL = 'https://api.sg-light-api.com';
const BACKUP_BASE_URL = 'https://api-b.sg-light-api.com';

/**
 * Computes official SHA1 Signature for Nexconn Platform Chat API
 * Signature = SHA1(AppSecret + Nonce + Timestamp)
 */
export function computeNexconnSignature(appSecret, nonce, timestamp) {
  return crypto
    .createHash('sha1')
    .update(`${appSecret}${nonce}${timestamp}`)
    .digest('hex');
}

/**
 * Issues an official Nexconn Chat access token for a citizen/mentor
 * @param {Object} params
 * @param {string} params.userId - Unique citizen or volunteer identifier
 * @param {string} params.name - Display name for push/chat profiles
 * @param {string} [params.avatarUrl] - User avatar URI
 */
export async function issueNexconnToken({ userId, name, avatarUrl }) {
  const effectiveUserId = userId || `citizen_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const effectiveName = name || 'Citizen User';
  const effectiveAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(effectiveName)}&background=142B4A&color=fff`;

  const appKey = env.NEXCONN_APP_ID;
  const appSecret = env.NEXCONN_API_KEY;

  // 1. Check if real credentials are provided
  if (!appKey || !appSecret) {
    console.warn('⚠️ Nexconn credentials missing in .env. Using DemoShield sandbox token.');
    return {
      success: true,
      isSandbox: true,
      appKey: appKey || 'schemesathi_dev_key',
      token: `sandbox_token_${Buffer.from(effectiveUserId).toString('base64')}`,
      userId: effectiveUserId,
      name: effectiveName,
      avatarUrl: effectiveAvatar,
      message: 'Running in Nexconn DemoShield mode. Add NEXCONN_APP_ID & NEXCONN_API_KEY in backend/.env for live cloud connection.'
    };
  }

  // 2. Prepare auth headers
  const nonce = Math.floor(Math.random() * 1000000).toString();
  const timestamp = Date.now().toString();
  const signature = computeNexconnSignature(appSecret, nonce, timestamp);

  const payload = {
    userId: effectiveUserId,
    name: effectiveName,
    avatarUrl: effectiveAvatar
  };

  const headers = {
    'App-Key': appKey,
    'Nonce': nonce,
    'Timestamp': timestamp,
    'Signature': signature,
    'Content-Type': 'application/json'
  };

  // 3. Request token with failover support (Singapore primary & backup)
  try {
    const res = await axios.post(`${PRIMARY_BASE_URL}/v4/auth/access-token/issue`, payload, {
      headers,
      timeout: 6000
    });

    if (res.data && res.data.code === 200) {
      return {
        success: true,
        isSandbox: false,
        appKey,
        token: res.data.result?.token || res.data.token,
        userId: effectiveUserId,
        name: effectiveName,
        avatarUrl: effectiveAvatar
      };
    }
    throw new Error(`Nexconn API returned code ${res.data?.code}: ${res.data?.msg || 'Token issuance failed'}`);
  } catch (primaryErr) {
    console.warn(`Primary Nexconn domain failed (${primaryErr.message}), trying backup domain...`);
    try {
      const backupRes = await axios.post(`${BACKUP_BASE_URL}/v4/auth/access-token/issue`, payload, {
        headers,
        timeout: 6000
      });

      if (backupRes.data && backupRes.data.code === 200) {
        return {
          success: true,
          isSandbox: false,
          appKey,
          token: backupRes.data.result?.token || backupRes.data.token,
          userId: effectiveUserId,
          name: effectiveName,
          avatarUrl: effectiveAvatar
        };
      }
      throw new Error(`Backup domain error: ${backupRes.data?.msg || 'Unknown failure'}`);
    } catch (backupErr) {
      console.error('All Nexconn endpoints failed. Falling back to DemoShield sandbox:', backupErr.message);
      return {
        success: true,
        isSandbox: true,
        appKey,
        token: `fallback_token_${Buffer.from(effectiveUserId).toString('base64')}`,
        userId: effectiveUserId,
        name: effectiveName,
        avatarUrl: effectiveAvatar,
        fallbackNotice: 'Cloud connection timeout. DemoShield offline mode active.'
      };
    }
  }
}
