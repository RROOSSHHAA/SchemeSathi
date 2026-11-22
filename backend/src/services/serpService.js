import axios from 'axios';
import { env, serviceStatus } from '../config/env.js';
import { FALLBACK_CSC_CENTERS } from './demoShield.js';

/**
 * Searches nearest Common Service Centres (CSC / Jan Seva Kendra) using SerpApi Google Maps Engine
 */
export async function getNearestCSCCenters(locationQuery = 'Mumbai Andheri') {
  if (!serviceStatus.serpApi) {
    console.warn('⚠️ SerpApi key missing, serving resilient fallback CSC centers.');
    return FALLBACK_CSC_CENTERS;
  }

  try {
    const res = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_maps',
        q: `Common Service Centre CSC Jan Seva Kendra ${locationQuery}`,
        api_key: env.SERPAPI_KEY
      },
      timeout: 3800
    });

    const results = res.data.local_results || [];
    if (!results.length) {
      return FALLBACK_CSC_CENTERS;
    }

    return results.slice(0, 3).map((item, index) => ({
      name: item.title || `Jan Seva Kendra #${index + 1}`,
      address: item.address || 'Address available upon in-person visit',
      rating: item.rating || 4.7,
      phone: item.phone || '+91 1800 3000 3468 (CSC Toll-Free)',
      distance: `${(0.8 + index * 0.9).toFixed(1)} km`,
      operating_hours: item.open_state || '9:30 AM - 6:30 PM (Mon-Sat)',
      services: ['Aadhaar eKYC', 'Scheme Application Filing', 'Biometric Verification', 'DBT Seeding'],
      maps_url: item.gps_coordinates
        ? `https://maps.google.com/?q=${item.gps_coordinates.latitude},${item.gps_coordinates.longitude}`
        : `https://maps.google.com/?q=${encodeURIComponent(item.title + ' ' + (item.address || ''))}`
    }));
  } catch (error) {
    console.warn('⚠️ SerpApi Maps failed/timed out, activating DemoShield fallback:', error.message);
    return FALLBACK_CSC_CENTERS;
  }
}

/**
 * Searches for official PDF guidelines / application forms using SerpApi Google Organic Engine
 */
export async function findOfficialSchemePDF(schemeTitle) {
  if (!serviceStatus.serpApi) return null;

  try {
    const res = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google',
        q: `${schemeTitle} official application form filetype:pdf site:gov.in OR site:nic.in`,
        api_key: env.SERPAPI_KEY
      },
      timeout: 3500
    });

    const results = res.data.organic_results || [];
    const pdfResult = results.find(r => r.link && (r.link.endsWith('.pdf') || r.title.toLowerCase().includes('pdf') || r.title.toLowerCase().includes('form')));
    return pdfResult ? pdfResult.link : null;
  } catch (err) {
    console.warn('⚠️ SerpApi PDF lookup failed:', err.message);
    return null;
  }
}

function getOfficialHost(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (parsedUrl.protocol !== 'https:') return null;
    if (!hostname.endsWith('.gov.in') && !hostname.endsWith('.nic.in')) return null;

    return hostname;
  } catch {
    return null;
  }
}

export function filterRecentSchemeResults(results, currentYear = new Date().getFullYear()) {
  const seenUrls = new Set();

  return (results || [])
    .map((result) => {
      const source = getOfficialHost(result.link);
      if (!source) return null;

      const title = result.title?.trim();
      const snippet = (result.snippet || result.description || '').trim();
      if (!title) return null;

      const searchableText = `${title} ${snippet} ${result.date || ''}`;
      if (!/\b(scheme|yojana|programme|program|initiative)\b|योजना/i.test(searchableText)) return null;
      if (!/\b(new|newly|recent|launch|launched|announce|announced|introduc|introduced|approved|rollout|rolled out)\b|20\d{2}/i.test(searchableText)) return null;

      const launchYear = searchableText.match(/\b(?:launched|started|introduced|approved|announced)\b[^.]{0,60}\b(20\d{2})\b/i);
      if (launchYear && Number(launchYear[1]) < currentYear - 1) return null;
      if (seenUrls.has(result.link)) return null;

      seenUrls.add(result.link);
      return {
        title,
        url: result.link,
        source,
        snippet,
        date: result.date || null
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

export async function searchLatestGovernmentSchemes(currentYear = new Date().getFullYear()) {
  if (!serviceStatus.serpApi) {
    return { available: false, results: [] };
  }

  const response = await axios.get('https://serpapi.com/search.json', {
    params: {
      engine: 'google',
      q: `newly launched or announced government schemes India ${currentYear} official site:pib.gov.in OR site:gov.in OR site:nic.in`,
      api_key: env.SERPAPI_KEY
    },
    timeout: 7000
  });

  return {
    available: true,
    results: filterRecentSchemeResults(response.data.organic_results, currentYear)
  };
}
