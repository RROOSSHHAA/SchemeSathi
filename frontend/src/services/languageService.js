/**
 * Google Translate Auto-Switcher Service for SchemeSathi AI
 * Seamlessly switches portal language between English ('en'), Hindi ('hi'), and Marathi ('mr')
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' }
];

export function getCurrentLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  // 1. Check localStorage
  const savedLang = localStorage.getItem('schemesathi_lang');
  if (savedLang && ['en', 'hi', 'mr'].includes(savedLang)) {
    return savedLang;
  }

  // 2. Check googtrans cookie
  const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
  if (match && ['en', 'hi', 'mr'].includes(match[1])) {
    return match[1];
  }

  return 'en';
}

export function changeLanguage(targetLang) {
  if (typeof window === 'undefined') return;

  const validLang = ['en', 'hi', 'mr'].includes(targetLang) ? targetLang : 'en';
  localStorage.setItem('schemesathi_lang', validLang);

  const domain = window.location.hostname;
  const cookieValue = `/en/${validLang}`;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();

  // Set cookies for Google Translate across path and current hostname
  document.cookie = `googtrans=${cookieValue}; expires=${expires}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; expires=${expires}; domain=${domain}; path=/;`;
  if (domain !== 'localhost' && !domain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    document.cookie = `googtrans=${cookieValue}; expires=${expires}; domain=.${domain}; path=/;`;
  }

  // If user selects English, clear or reset cookie
  if (validLang === 'en') {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
    document.cookie = `googtrans=/en/en; expires=${expires}; path=/;`;
  }

  // Trigger Google Translate hidden select combo if already mounted
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = validLang;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // If Google Translate hasn't injected the combo yet, a quick reload applies the cookie
    window.location.reload();
  }
}

export function initGoogleTranslateAutoSwitcher() {
  if (typeof window === 'undefined') return;

  const current = getCurrentLanguage();
  if (current && current !== 'en') {
    // Wait for .goog-te-combo to appear in DOM and trigger it
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        if (combo.value !== current) {
          combo.value = current;
          combo.dispatchEvent(new Event('change', { bubbles: true }));
        }
        clearInterval(interval);
      }
      if (attempts > 30) clearInterval(interval);
    }, 200);
  }
}
