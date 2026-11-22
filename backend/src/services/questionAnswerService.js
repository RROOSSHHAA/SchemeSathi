import { searchQuestionWithYouCom } from './youService.js';
import { searchQuestionWithSerpApi } from './serpService.js';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'for', 'from', 'has', 'have', 'he',
  'hey', 'how', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'please',
  'the', 'to', 'was', 'what', 'when', 'where', 'which', 'who', 'why', 'with',
  'kya', 'koi', 'hai', 'he', 'ki', 'ka', 'ke', 'ko', 'mein', 'me', 'mujhe',
  'batao', 'bataiye', 'kare', 'karu', 'aai', 'aayi', 'aaya', 'kya'
]);

export function buildGovernmentSearchQuery(question, intent) {
  const currentYear = new Date().getFullYear();
  const normalizedQuestion = question.trim().replace(/\s+/g, ' ').slice(0, 400);

  if (intent === 'NEW_SCHEMES') {
    return `recently launched government schemes India ${currentYear} ${normalizedQuestion} official`;
  }

  return `${normalizedQuestion} India government scheme official`;
}

export async function collectQuestionEvidence(
  question,
  intent,
  providers = {
    youcom: searchQuestionWithYouCom,
    serpapi: searchQuestionWithSerpApi
  }
) {
  const searchQuery = buildGovernmentSearchQuery(question, intent);
  const providerEntries = Object.entries(providers);
  const settledResults = await Promise.allSettled(
    providerEntries.map(([, search]) => Promise.resolve().then(() => search(searchQuery)))
  );
  const sourceStatus = {};
  const resultsByUrl = new Map();

  settledResults.forEach((settled, index) => {
    const [providerName] = providerEntries[index];

    if (settled.status === 'rejected') {
      sourceStatus[providerName] = 'error';
      console.warn(`${providerName} government search failed:`, settled.reason?.message || 'Unknown error');
      return;
    }

    const response = settled.value;
    if (!response?.configured) {
      sourceStatus[providerName] = 'unconfigured';
      return;
    }

    const providerResults = Array.isArray(response.results) ? response.results : [];
    sourceStatus[providerName] = providerResults.length ? 'ok' : 'no_results';

    for (const result of providerResults) {
      const key = result.url?.replace(/\/+$/, '').toLowerCase();
      if (!key || resultsByUrl.has(key)) continue;
      resultsByUrl.set(key, result);
    }
  });

  return {
    results: [...resultsByUrl.values()],
    sourceStatus
  };
}

function getQuestionTerms(question) {
  return new Set(
    (question.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [])
      .filter(term => term.length > 2 && !STOP_WORDS.has(term))
  );
}

function rankResults(question, results) {
  const questionTerms = getQuestionTerms(question);

  return results
    .map((result, index) => {
      const titleTerms = new Set((result.title.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []));
      const contentTerms = new Set((result.snippet.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []));
      const score = [...questionTerms].reduce(
        (total, term) => total + (titleTerms.has(term) ? 3 : 0) + (contentTerms.has(term) ? 1 : 0),
        0
      );

      return { result, index, score };
    })
    .filter(item => questionTerms.size === 0 || item.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 4)
    .map(item => item.result);
}

export function buildQuestionAnswer(question, evidence) {
  const relevantResults = rankResults(question, evidence.results || []);
  if (!relevantResults.length) {
    const statuses = Object.values(evidence.sourceStatus || {});
    const allUnconfigured = statuses.length > 0 && statuses.every(status => status === 'unconfigured');
    const anyError = statuses.includes('error');
    const searchCompleted = statuses.some(status => status === 'ok' || status === 'no_results');

    let text = 'Official sources par is sawal ka relevant jawab nahi mila. Main bina source ke andaza nahi lagaunga; scheme ka naam ya apna state batakar dobara poochhein.';
    if (allUnconfigured) {
      text = 'Live official search abhi configure nahi hai, isliye main verified jawab nahi de sakta. Backend mein You.com aur SerpAPI credentials configure karne honge.';
    } else if (anyError && !searchCompleted) {
      text = 'Live official search sources se abhi data nahi mil paaya. Thodi der baad dobara try karein; main bina source ke jawab nahi banaunga.';
    } else if (anyError) {
      text += '\n\nEk search source unavailable tha, isliye results limited ho sakte hain.';
    }

    return { text, citations: [] };
  }

  const citations = relevantResults.map((result, index) => ({
    citation_id: `[[${index + 1}]]`,
    source: result.source,
    url: result.url,
    snippet: result.snippet
  }));
  const answerItems = relevantResults.map((result) =>
    `• ${result.title}\n${result.snippet || 'Official source par poori jaankari dekhein.'}`
  );
  const statuses = Object.values(evidence.sourceStatus || {});
  const hasUnavailableSource = statuses.some(status => status === 'error' || status === 'unconfigured');
  const availabilityNote = hasUnavailableSource
    ? '\n\nNote: Kuch search sources unavailable the; yeh jawab available official results par based hai.'
    : '';

  return {
    text: `Official sources se relevant jaankari:\n\n${answerItems.join('\n\n')}\n\nEligibility, dates aur benefits ko source page par verify karein.${availabilityNote}`,
    citations
  };
}
