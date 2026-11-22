import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { classifyIntent } from '../src/services/chatIntent.js';
import {
  buildGovernmentSearchQuery,
  buildQuestionAnswer,
  collectQuestionEvidence
} from '../src/services/questionAnswerService.js';
import { normalizeOfficialSearchResult } from '../src/services/officialSources.js';

describe('SchemeSathi evidence-based chat', () => {
  test('classifies Hindi and Hinglish requests for new schemes', () => {
    assert.equal(classifyIntent('Koi new scheme hai kya?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('Koi nayi yojana aayi hai kya?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('Kisan ke liye koi new scheme hai?'), 'NEW_SCHEMES');
    assert.equal(classifyIntent('क्या कोई नई योजना है?'), 'NEW_SCHEMES');
  });

  test('preserves existing specific scheme and greeting intents', () => {
    assert.equal(classifyIntent('PM Kisan eKYC kaise karein?'), 'SCHEME_PMKISAN');
    assert.equal(classifyIntent('Latest PM Kisan scheme ke rules kya hain?'), 'SCHEME_PMKISAN');
    assert.equal(classifyIntent('Mudra ke documents kya chahiye?'), 'SCHEME_MUDRA');
    assert.equal(classifyIntent('Namaste'), 'GREETING');
  });

  test('builds question-specific search text for both regular and latest-scheme questions', () => {
    assert.match(buildGovernmentSearchQuery('PM Kisan installment status', 'GENERAL_QUERY'), /PM Kisan installment status/);
    assert.match(buildGovernmentSearchQuery('Koi new scheme aai he?', 'NEW_SCHEMES'), /recently launched government schemes/i);
  });

  test('collects results from both providers and deduplicates identical official links', async () => {
    const calls = [];
    const evidence = await collectQuestionEvidence('new farmer scheme', 'NEW_SCHEMES', {
      youcom: async query => {
        calls.push(['youcom', query]);
        return {
          configured: true,
          results: [{
            title: 'New Farmer Scheme',
            url: 'https://www.pib.gov.in/farmer-scheme/',
            source: 'www.pib.gov.in',
            snippet: 'A new farmer support scheme was announced.'
          }]
        };
      },
      serpapi: async query => {
        calls.push(['serpapi', query]);
        return {
          configured: true,
          results: [
            {
              title: 'New Farmer Scheme',
              url: 'https://www.pib.gov.in/farmer-scheme',
              source: 'www.pib.gov.in',
              snippet: 'A new farmer support scheme was announced.'
            },
            {
              title: 'Official Farmer Grant',
              url: 'https://agriculture.gov.in/grant',
              source: 'agriculture.gov.in',
              snippet: 'Official farmer grant information.'
            }
          ]
        };
      }
    });

    assert.deepEqual(calls.map(([provider]) => provider).sort(), ['serpapi', 'youcom']);
    assert.equal(calls[0][1], calls[1][1]);
    assert.equal(evidence.results.length, 2);
    assert.deepEqual(evidence.sourceStatus, { youcom: 'ok', serpapi: 'ok' });
  });

  test('answers from relevant official evidence without echoing the question or inventing citations', () => {
    const answer = buildQuestionAnswer('Koi new scheme aai he?', {
      sourceStatus: { youcom: 'unconfigured', serpapi: 'ok' },
      results: [{
        title: 'New Farmer Support Scheme',
        url: 'https://www.pib.gov.in/farmer-scheme',
        source: 'www.pib.gov.in',
        snippet: 'A new support scheme was announced for eligible farmers.'
      }]
    });

    assert.match(answer.text, /New Farmer Support Scheme/);
    assert.match(answer.text, /eligible farmers/);
    assert.doesNotMatch(answer.text, /Koi new scheme aai he/i);
    assert.equal(answer.citations.length, 1);
    assert.equal(answer.citations[0].url, 'https://www.pib.gov.in/farmer-scheme');
  });

  test('does not use unrelated results or generic canned documents advice', () => {
    const answer = buildQuestionAnswer('PM Kisan installment status', {
      sourceStatus: { youcom: 'ok', serpapi: 'no_results' },
      results: [{
        title: 'New Farmer Support Scheme',
        url: 'https://www.pib.gov.in/farmer-scheme',
        source: 'www.pib.gov.in',
        snippet: 'A new support scheme was announced for eligible farmers.'
      }]
    });

    assert.match(answer.text, /relevant jawab nahi mila/i);
    assert.doesNotMatch(answer.text, /Aadhaar|income certificate|bank statement/i);
    assert.deepEqual(answer.citations, []);
  });

  test('reports missing search configuration without fabricating source citations', () => {
    const answer = buildQuestionAnswer('Koi new scheme hai?', {
      sourceStatus: { youcom: 'unconfigured', serpapi: 'unconfigured' },
      results: []
    });

    assert.match(answer.text, /search abhi configure nahi hai/i);
    assert.deepEqual(answer.citations, []);
  });

  test('discloses a partial outage when it answers from the remaining provider', () => {
    const answer = buildQuestionAnswer('PM Kisan status', {
      sourceStatus: { youcom: 'unconfigured', serpapi: 'ok' },
      results: [{
        title: 'PM Kisan Beneficiary Status',
        url: 'https://pmkisan.gov.in/beneficiarystatus_new.aspx',
        source: 'pmkisan.gov.in',
        snippet: 'Check the PM Kisan beneficiary status.'
      }]
    });

    assert.match(answer.text, /search sources unavailable/i);
    assert.equal(answer.citations.length, 1);
  });

  test('keeps one provider usable when the other fails', async () => {
    const evidence = await collectQuestionEvidence('PM Kisan status', 'SCHEME_PMKISAN', {
      youcom: async () => {
        throw new Error('provider unavailable');
      },
      serpapi: async () => ({
        configured: true,
        results: [{
          title: 'PM Kisan Beneficiary Status',
          url: 'https://pmkisan.gov.in/beneficiarystatus_new.aspx',
          source: 'pmkisan.gov.in',
          snippet: 'Check the PM Kisan beneficiary status.'
        }]
      })
    });

    assert.equal(evidence.sourceStatus.youcom, 'error');
    assert.equal(evidence.sourceStatus.serpapi, 'ok');
    assert.equal(evidence.results.length, 1);
  });

  test('accepts only HTTPS government and NIC search results', () => {
    assert.equal(normalizeOfficialSearchResult({
      title: 'Official result',
      url: 'https://pib.gov.in/example',
      snippet: 'Official text'
    }).source, 'pib.gov.in');
    assert.equal(normalizeOfficialSearchResult({
      title: 'Fake result',
      url: 'https://gov.in.attacker.example/fake',
      snippet: 'Untrusted text'
    }), null);
    assert.equal(normalizeOfficialSearchResult({
      title: 'Insecure result',
      url: 'http://www.pib.gov.in/example',
      snippet: 'Insecure text'
    }), null);
  });
});
