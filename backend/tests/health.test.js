import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('Health & Security Endpoints', () => {
  test('GET /api/v1/health returns 200 with service operational status', async () => {
    const res = await request(app).get('/api/v1/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.service, 'SchemeSathi AI API');
    assert.strictEqual(res.body.data.status, 'operational');
    assert.ok(res.body.data.integrations !== undefined);
  });

  test('GET / unknown route returns 404 with structured error', async () => {
    const res = await request(app).get('/api/v1/nonexistent');
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
    assert.strictEqual(res.body.error.code, 'NOT_FOUND');
  });

  test('Security headers are present', async () => {
    const res = await request(app).get('/api/v1/health');
    // Helmet headers
    assert.ok(res.headers['x-content-type-options'] === 'nosniff');
    assert.ok(res.headers['x-frame-options'] === 'SAMEORIGIN');
  });
});
