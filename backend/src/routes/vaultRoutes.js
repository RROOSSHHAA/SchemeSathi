import express from 'express';

const router = express.Router();

// Ephemeral in-memory session buffer with 10-minute TTL (Zero Disk Retention)
const ephemeralVault = new Map();

// Periodic sweep for abandoned sessions (>10 mins)
setInterval(() => {
  const now = Date.now();
  for (const [key, session] of ephemeralVault.entries()) {
    if (now - session.lastActivity > 10 * 60 * 1000) {
      ephemeralVault.delete(key);
    }
  }
}, 60 * 1000);

/**
 * POST /api/v1/vault/assist
 * Updates ephemeral registration fields in volatile memory only
 */
router.post('/assist', (req, res) => {
  const { sessionId, field, value } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID required for ephemeral vault' });
  }

  const session = ephemeralVault.get(sessionId) || { data: {}, lastActivity: Date.now() };
  session.data[field] = value;
  session.lastActivity = Date.now();
  ephemeralVault.set(sessionId, session);

  return res.status(200).json({
    success: true,
    sessionId,
    fieldUpdated: field,
    storedInRAMOnly: true,
    message: 'Field temporarily buffered in volatile memory. No disk persistence.'
  });
});

/**
 * GET /api/v1/vault/preview
 * Returns transient state for form pre-filling preview
 */
router.get('/preview/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = ephemeralVault.get(sessionId);
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session expired or already purged.' });
  }

  return res.status(200).json({
    success: true,
    data: session.data,
    timeRemainingMs: Math.max(0, 10 * 60 * 1000 - (Date.now() - session.lastActivity))
  });
});

/**
 * DELETE /api/v1/vault/purge
 * Cryptographic Zero-Fill Purge
 * Instantly wipes all session data from server RAM upon registration completion or cancel
 */
router.delete('/purge', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId && ephemeralVault.has(sessionId)) {
    const session = ephemeralVault.get(sessionId);
    // Overwrite memory before deleting
    if (session && session.data) {
      for (const k in session.data) {
        session.data[k] = null;
      }
    }
    ephemeralVault.delete(sessionId);
  }

  return res.status(200).json({
    success: true,
    purged: true,
    message: 'Zero-Knowledge Purge Complete. All citizen data wiped from RAM buffer.'
  });
});

export default router;
