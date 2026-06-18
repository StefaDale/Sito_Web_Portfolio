/* i18n.js — sistema di internazionalizzazione */

const I18N_KEY      = 'lang';
const I18N_KEY_SET  = 'lang_set_by_user';
const SUPPORTED     = ['it', 'en', 'es', 'fr', 'de', 'pt', 'ro', 'nl', 'pl', 'sv', 'da', 'no', 'mk', 'ja', 'zh', 'zh-TW', 'ko', 'ar', 'hi', 'tr'];
const DEFAULT_LANG  = 'en';

const LANG_META = {
  it: { code: 'IT', name: 'Italian', nativeName: 'Italiano', flagSrc: 'https://flagcdn.com/it.svg', flagAlt: 'Bandiera italiana' },
  en: { code: 'EN', name: 'English', nativeName: 'English', flagSrc: 'https://flagcdn.com/gb.svg', flagAlt: 'British flag' },
  es: { code: 'ES', name: 'Spanish', nativeName: 'Español', flagSrc: 'https://flagcdn.com/es.svg', flagAlt: 'Bandera española' },
  fr: { code: 'FR', name: 'French', nativeName: 'Français', flagSrc: 'https://flagcdn.com/fr.svg', flagAlt: 'Drapeau français' },
  de: { code: 'DE', name: 'German', nativeName: 'Deutsch', flagSrc: 'https://flagcdn.com/de.svg', flagAlt: 'Deutsche Flagge' },
  pt: { code: 'PT', name: 'Portuguese', nativeName: 'Português', flagSrc: 'https://flagcdn.com/pt.svg', flagAlt: 'Bandeira portuguesa' },
  ro: { code: 'RO', name: 'Romanian', nativeName: 'Română', flagSrc: 'https://flagcdn.com/ro.svg', flagAlt: 'Drapelul României' },
  nl: { code: 'NL', name: 'Dutch', nativeName: 'Nederlands', flagSrc: 'https://flagcdn.com/nl.svg', flagAlt: 'Nederlandse vlag' },
  pl: { code: 'PL', name: 'Polish', nativeName: 'Polski', flagSrc: 'https://flagcdn.com/pl.svg', flagAlt: 'Polska flaga' },
  sv: { code: 'SV', name: 'Swedish', nativeName: 'Svenska', flagSrc: 'https://flagcdn.com/se.svg', flagAlt: 'Svenska flaggan' },
  da: { code: 'DA', name: 'Danish', nativeName: 'Dansk', flagSrc: 'https://flagcdn.com/dk.svg', flagAlt: 'Dannebrog' },
  no: { code: 'NO', name: 'Norwegian', nativeName: 'Norsk', flagSrc: 'https://flagcdn.com/no.svg', flagAlt: 'Norsk flagg' },
  mk: { code: 'MK', name: 'Macedonian', nativeName: 'Македонски', flagSrc: 'https://flagcdn.com/mk.svg', flagAlt: 'Македонско знаме' },
  ja: { code: 'JA', name: 'Japanese', nativeName: '日本語', flagSrc: 'https://flagcdn.com/jp.svg', flagAlt: '日本の国旗' },
  zh: { code: 'ZH', name: 'Chinese Simplified', nativeName: '简体中文', flagSrc: 'https://flagcdn.com/cn.svg', flagAlt: '中华人民共和国国旗' },
  'zh-TW': { code: 'ZH-TW', name: 'Chinese Traditional', nativeName: '繁體中文', flagSrc: 'https://flagcdn.com/tw.svg', flagAlt: '中華民國國旗' },
  ko: { code: 'KO', name: 'Korean', nativeName: '한국어', flagSrc: 'https://flagcdn.com/kr.svg', flagAlt: '대한민국 국기' },
  tr: { code: 'TR', name: 'Turkish', nativeName: 'Türkçe', flagSrc: 'https://flagcdn.com/tr.svg', flagAlt: 'Türk bayrağı' },
  ar: { code: 'AR', name: 'Arabic', nativeName: 'العربية', flagSrc: 'https://flagcdn.com/sa.svg', flagAlt: 'علم المملكة العربية السعودية' },
  hi: { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flagSrc: 'https://flagcdn.com/in.svg', flagAlt: 'भारतीय ध्वज' },
  
};

let currentLang = DEFAULT_LANG;
let currentTranslations = null;

// Determina la lingua da usare
function getStoredLang() {
  const userHasChosen = localStorage.getItem(I18N_KEY_SET) === 'true';

  if (!userHasChosen) {
    // navigator.language restituisce es. "it-IT", "en-US", "en-GB"
    // .slice(0, 2) prende solo "it" o "en"
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browserLang) ? browserLang : DEFAULT_LANG;
  }

  const stored = localStorage.getItem(I18N_KEY);
  return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
}

// Carica il file JSON della lingua richiesta
async function loadTranslations(lang) {
  const res = await fetch(`locales/${lang}.json`);
  if (!res.ok) throw new Error(`Impossibile caricare locales/${lang}.json`);
  return res.json();
}

// Naviga un oggetto annidato tramite chiave "a.b.c"
function resolve(obj, key) {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
}

function getI18nValue(key, fallback = undefined) {
  if (!currentTranslations) return fallback;
  const value = resolve(currentTranslations, key);
  return value !== undefined ? value : fallback;
}

// Applica le traduzioni a tutti gli elementi con data-i18n
function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key   = el.getAttribute('data-i18n');
    const value = resolve(translations, key);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key   = el.getAttribute('data-i18n-placeholder');
    const value = resolve(translations, key);
    if (value !== undefined) el.placeholder = value;
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key   = el.getAttribute('data-i18n-aria-label');
    const value = resolve(translations, key);
    if (value !== undefined) el.setAttribute('aria-label', value);
  });
}

// Aggiorna bandiera e codice nel bottone, e segna la voce attiva nel menu
function updateLangButton(lang) {
  const meta = LANG_META[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-lang-flag]').forEach(flagEl => {
    flagEl.src = meta.flagSrc;
    flagEl.alt = meta.flagAlt;
  });

  document.querySelectorAll('[data-lang-code]').forEach(codeEl => {
    codeEl.textContent = meta.code;
  });

  document.querySelectorAll('.lang-option').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });

  document.querySelectorAll('.language-modal-option').forEach(button => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    button.setAttribute('aria-selected', String(isActive));
  });
}

function getLanguageOptions() {
  return SUPPORTED.map(lang => ({
    lang,
    ...LANG_META[lang],
  }));
}

// Imposta una nuova lingua
async function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;

  localStorage.setItem(I18N_KEY, lang);
  localStorage.setItem(I18N_KEY_SET, 'true');
  const translations = await loadTranslations(lang);
  currentLang = lang;
  currentTranslations = translations;
  applyTranslations(translations);
  updateLangButton(lang);
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  document.querySelectorAll('.lang-dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
  });

  if (typeof closeMobileMenu === 'function') {
    closeMobileMenu();
  }

  if (typeof closeLanguageModal === 'function') {
    closeLanguageModal();
  }
}

// Riapplica la lingua corrente a contenuti inseriti dopo il primo caricamento
async function refreshI18n() {
  try {
    if (!currentTranslations) {
      currentLang = getStoredLang();
      currentTranslations = await loadTranslations(currentLang);
    }

    applyTranslations(currentTranslations);
    updateLangButton(currentLang);
  } catch (err) {
    console.error('i18n refresh error:', err);
  }
}

// Gestisce le scelte lingua anche se la navbar viene generata dinamicamente
function bindLangOptions() {
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-option');
    if (!option) return;

    e.stopPropagation();
    setLang(option.dataset.lang);
  });
}

// Inizializzazione principale
async function initI18n() {
  const lang = getStoredLang();
  try {
    const translations = await loadTranslations(lang);
    currentLang = lang;
    currentTranslations = translations;
    applyTranslations(translations);
    updateLangButton(lang);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));

  } catch (err) {
    console.error('i18n error:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindLangOptions();
  requestAnimationFrame(initI18n);
});
