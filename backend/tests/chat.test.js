import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildLatestSchemesAnswer, classifyIntent } from '../src/services/chatIntent.js';
import { filterRecentSchemeResults } from '../src/services/serpService.js';

describe('SchemeSathi chat intent and recent scheme responses', () => {
  test('classifies Hindi and Hinglish requests for new schemes', () => {
    assert.equal(classifyIntent('Koi new scheme hai kya?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('Koi nayi yojana aayi hai kya?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('Kisan ke liye koi new scheme hai?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('क्या कोई नई योजना है?'), 'NEW_SCHEMES');
  });

  test('preserves existing specific scheme and document intents', () => {
    assert.equal(classifyIntent('PM Kisan eKYC kaise karein?'), 'SCHEME_PMKISAN');
    assert.equal(classifyIntent('Latest PM Kisan scheme ke rules kya hain?'), 'SCHEME_PMKISAN');
    assert.equal(classifyIntent('Mudra ke documents kya chahiye?'), 'SCHEME_MUDRA');
  });

  test('does not present a scheme as new when official search is unavailable', () => {
    const answer = buildLatestSchemesAnswer({ available: false, results: [] }, 2026);

    assert.match(answer.text, /live official scheme search configured nahi hai/i);
    assert.doesNotMatch(answer.text, /Aadhaar|collateral|mandatory documents/i);
    assert.equal(answer.citations[0].url, 'https://pib.gov.in');
  });

  test('presents official recent results with source citations and a launch-date caveat', () => {
    const answer = buildLatestSchemesAnswer({
      available: true,
      results: [{
        title: 'New Farmer Support Scheme',
        url: 'https://www.pib.gov.in/example',
        source: 'www.pib.gov.in',
        snippet: 'The scheme was announced for eligible farmers.',
        date: 'May 2026'
      }]
    }, 2026);

    assert.match(answer.text, /New Farmer Support Scheme/);
    assert.match(answer.text, /launch date aur eligibility/i);
    assert.equal(answer.citations[0].url, 'https://www.pib.gov.in/example');
  });

  test('filters non-official, irrelevant, and clearly old scheme search results', () => {
    const results = filterRecentSchemeResults([
      {
        title: 'New Farmer Scheme',
        link: 'https://www.pib.gov.in/farmer-scheme',
        snippet: 'A new scheme was announced in 2026.'
      },
      {
        title: 'New Farmer Scheme',
        link: 'https://pib.gov.in.attacker.example/fake',
        snippet: 'A new scheme was announced in 2026.'
      },
      {
        title: 'Digital India update',
        link: 'https://www.pib.gov.in/digital',
        snippet: 'New digital services announced in 2026.'
      },
      {
        title: 'Old welfare scheme',
        link: 'https://www.pib.gov.in/old-scheme',
        snippet: 'The scheme was launched in 2023.'
      }
    ], 2026);

    assert.equal(results.length, 1);
    assert.equal(results[0].title, 'New Farmer Scheme');
  });
});
