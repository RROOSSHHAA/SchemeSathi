export function getOfficialHost(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (parsedUrl.protocol !== 'https:') return null;
    if (
      hostname !== 'gov.in' &&
      hostname !== 'nic.in' &&
      !hostname.endsWith('.gov.in') &&
      !hostname.endsWith('.nic.in')
    ) {
      return null;
    }

    return hostname;
  } catch {
    return null;
  }
}

export function normalizeOfficialSearchResult({ title, url, snippet, provider, date }) {
  if (typeof title !== 'string' || typeof url !== 'string') return null;

  const source = getOfficialHost(url);
  const normalizedTitle = title.trim();
  if (!source || !normalizedTitle) return null;

  return {
    title: normalizedTitle,
    url,
    source,
    snippet: typeof snippet === 'string' ? snippet.trim() : '',
    provider,
    date: typeof date === 'string' ? date : null
  };
}
