export function classifyIntent(text) {
  const lower = (text || '').toLowerCase().trim();
  const mentionsSpecificScheme = /\b(mudra|shishu|tarun|kishor|ayushman|pm.?jay|pm.?kisan|kisan samman|svanidhi|lakhpati didi)\b/i.test(lower);

  if (
    !mentionsSpecificScheme &&
    /\b(new|newly|latest|recent|recently|launched|launch|announced|introduced|nayi|naya|naye|abhi|haal hi mein)\b|नई|नयी|नया|नए/i.test(lower) &&
    /\b(schemes?|yojanas?|programmes?|programs?|initiatives?)\b|योजना/i.test(lower)
  ) {
    return 'NEW_SCHEMES';
  }

  // Greetings
  if (/^(hi|hello|hey|namaste|pranam|salam|kese ho|kaise ho|help|shuru|start|good morning|good evening)\b/i.test(lower) || lower.length <= 4) {
    return 'GREETING';
  }

  // CSC / Location / Offline
  if (/csc|kendra|centre|center|seva kendra|offline|pincode|address|location|kahan|kaha jana|biometric/i.test(lower)) {
    return 'LOCATION_CSC';
  }

  // Bank / Rejection / Bribe / Practical tips
  if (/bank|manager|guarantor|security|collateral|bribe|ghoos|rejection|delay|kitna time|real|experience/i.test(lower)) {
    return 'BENEFICIARY_EXPERIENCE';
  }

  // Specific Schemes
  if (/mudra|shishu|tarun|kishor/i.test(lower)) return 'SCHEME_MUDRA';
  if (/ayushman|pmjay|health|golden card|ilaj|bimari/i.test(lower)) return 'SCHEME_AYUSHMAN';
  if (/kisan|farmer|kheti|dbt|6000/i.test(lower)) return 'SCHEME_PMKISAN';
  if (/svanidhi|vendor|thela|street vendor/i.test(lower)) return 'SCHEME_SVANIDHI';
  if (/scholarship|student|fees|college|padhai/i.test(lower)) return 'SCHEME_SCHOLARSHIP';
  if (/lakhpati|didi|mahila|women|shg/i.test(lower)) return 'SCHEME_WOMEN';

  // General Eligibility / Documents
  if (/document|documents|kagaz|eligibility|yogyata|kaise|how to apply|apply|registration/i.test(lower)) {
    return 'DOCUMENTS_ELIGIBILITY';
  }

  return 'GENERAL_QUERY';
}

export function buildLatestSchemesAnswer(searchResult, currentYear = new Date().getFullYear()) {
  const officialDirectoryCitations = [
    { citation_id: '[[1]]', source: 'Press Information Bureau', url: 'https://pib.gov.in' },
    { citation_id: '[[2]]', source: 'myScheme official portal', url: 'https://www.myscheme.gov.in' }
  ];

  if (!searchResult.available) {
    return {
      text: 'Abhi live official scheme search configured nahi hai, isliye main kisi yojana ko nayi kehkar confirm nahi karunga. Backend par SERPAPI_KEY configure karein, ya PIB/myScheme ke official portals par latest announcements dekhein.',
      citations: officialDirectoryCitations
    };
  }

  const results = searchResult.results || [];
  if (!results.length) {
    return {
      text: `Abhi official sources par ${currentYear} ki koi nayi sarkari yojana verify karne layak result nahi mila. Main purani ya unrelated yojana ko nayi batakar guess nahi karunga. Latest announcements PIB aur myScheme par check karein.`,
      citations: officialDirectoryCitations
    };
  }

  const citations = results.map((result, index) => ({
    citation_id: `[[${index + 1}]]`,
    source: result.source,
    url: result.url,
    snippet: result.snippet
  }));
  const resultLines = results.map((result) => {
    const date = result.date ? ` (${result.date})` : '';
    return `• ${result.title}${date}\n${result.snippet || 'Official government result; open the source for details.'}`;
  });

  return {
    text: `Aap recent sarkari yojana pooch rahe hain. Official government sources par ye scheme-related announcements mile:\n\n${resultLines.join('\n\n')}\n\nSource page par launch date aur eligibility zaroor verify karein; search result akela nayi scheme hone ka proof nahi hai.`,
    citations
  };
}
