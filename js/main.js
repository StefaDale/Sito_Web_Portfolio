// ── NAVBAR ──────────────────────────────────────────────
const THEME_KEY = 'theme';
const DEFAULT_THEME = 'dark';
const EMAILJS_CONFIG = {
  publicKey: 'Yj1cMyDJi6ZD5Oqfo',
  serviceId: 'service_1cz4p64',
  templateId: 'template_40214n2',
  verificationTemplateId: 'template_scqodrl',
};
const EMAIL_VERIFICATION_CODE_LENGTH = 6;
const EMAIL_VERIFICATION_TTL_MS = 5 * 60 * 1000;
const LIVE_BACKGROUND_CONFIG = {
  dark: {
    node: 'rgba(168, 85, 247, 0.62)',
    line: 'rgba(124, 58, 237, 0.24)',
    glow: 'rgba(168, 85, 247, 0.18)',
  },
  light: {
    node: 'rgba(109, 40, 217, 0.42)',
    line: 'rgba(109, 40, 217, 0.16)',
    glow: 'rgba(109, 40, 217, 0.10)',
  },
};
const CONTACT_MESSAGES = {
  it: {
    sending: 'Invio del messaggio in corso...',
    success: 'Messaggio inviato correttamente.',
    error: 'Invio non riuscito. Riprova tra poco o usa i link rapidi qui sotto.',
    configError: 'EmailJS non è configurato: inserisci Public Key, Service ID e Template ID.',
    verificationConfigError: 'Template di verifica EmailJS non configurato.',
    verificationSending: 'Invio del codice di verifica...',
    verificationSent: 'Codice inviato. Controlla la tua email.',
    verificationInvalid: 'Codice non valido o scaduto.',
    verificationSuccess: 'Email verificata correttamente.',
    verificationRequired: 'Verifica la tua email prima di inviare il messaggio.',
    verificationReset: 'Email modificata: invia un nuovo codice di verifica.',
  },
  en: {
    sending: 'Sending your message...',
    success: 'Message sent successfully.',
    error: 'Could not send the message. Try again shortly or use the quick links below.',
    configError: 'EmailJS is not configured: add Public Key, Service ID and Template ID.',
    verificationConfigError: 'EmailJS verification template is not configured.',
    verificationSending: 'Sending verification code...',
    verificationSent: 'Code sent. Check your email.',
    verificationInvalid: 'Invalid or expired code.',
    verificationSuccess: 'Email verified successfully.',
    verificationRequired: 'Verify your email before sending the message.',
    verificationReset: 'Email changed: send a new verification code.',
  },
  es: {
    sending: 'Enviando el mensaje...',
    success: 'Mensaje enviado correctamente.',
    error: 'No se pudo enviar el mensaje. Inténtalo de nuevo dentro de poco o usa los enlaces rápidos de abajo.',
    configError: 'EmailJS no está configurado: añade Public Key, Service ID y Template ID.',
    verificationConfigError: 'La plantilla de verificación de EmailJS no está configurada.',
    verificationSending: 'Enviando el código de verificación...',
    verificationSent: 'Código enviado. Revisa tu email.',
    verificationInvalid: 'Código no válido o caducado.',
    verificationSuccess: 'Email verificado correctamente.',
    verificationRequired: 'Verifica tu email antes de enviar el mensaje.',
    verificationReset: 'Email modificado: envía un nuevo código de verificación.',
  },
};

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' ? 'light' : DEFAULT_THEME;
}

function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : DEFAULT_THEME;
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeButtons(nextTheme);
}

function updateThemeButtons(theme) {
  const isLight = theme === 'light';
  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.textContent = isLight ? '☾' : '☀';
    button.setAttribute('aria-label', isLight ? 'Passa al tema scuro' : 'Passa al tema chiaro');
    button.setAttribute('title', isLight ? 'Tema scuro' : 'Tema chiaro');
  });
}

applyTheme(getStoredTheme());

function buildNavbar() {
  const isHome     = document.body.classList.contains('page-home');
  const isPersonal = document.body.classList.contains('page-personal');
  const isWork     = document.body.classList.contains('page-work');
  const homeHref     = isHome ? '#home-section' : 'index.html#home-section';
  const personalHref = isHome ? '#personal-section' : 'index.html#personal-section';
  const workHref     = isHome ? '#work-section' : 'index.html#work-section';

  const navLinks = `
    <a href="${homeHref}" class="nav-btn" data-section="home-section" data-i18n="nav.home">Home</a>
    ${!isPersonal ? `<a href="${personalHref}" class="nav-btn" data-section="personal-section" data-i18n="nav.personal">Vita Personale</a>` : ''}
    ${!isWork     ? `<a href="${workHref}"     class="nav-btn" data-section="work-section" data-i18n="nav.work">Vita Lavorativa</a>` : ''}
    <button class="nav-btn theme-toggle" type="button" aria-label="Passa al tema chiaro" title="Tema chiaro">☀</button>
    <button class="nav-btn accent btn-contatti" type="button" data-i18n="nav.contacts">Contatti</button>
  `;

  const langSelector = `
    <div class="lang-dropdown" id="lang-dropdown">
      <button class="nav-btn lang-btn" id="btn-lang" type="button" aria-haspopup="true" aria-expanded="false">
        <img id="lang-flag" class="lang-flag-img" data-lang-flag src="https://flagcdn.com/gb.svg" alt="flag" />
        <span id="lang-code" data-lang-code>EN</span>
        <span class="lang-arrow">▾</span>
      </button>
      <ul class="lang-menu" id="lang-menu">
        <li class="lang-option" data-lang="it">
          <img class="lang-flag-img" src="https://flagcdn.com/it.svg" alt="Bandiera italiana" /> Italiano
        </li>
        <li class="lang-option" data-lang="en">
          <img class="lang-flag-img" src="https://flagcdn.com/gb.svg" alt="British flag" /> English
        </li>
        <li class="lang-option" data-lang="es">
          <img class="lang-flag-img" src="https://flagcdn.com/es.svg" alt="Bandera española" /> Español
        </li>
        <li class="lang-menu-divider">
          <button class="lang-view-all" type="button" data-i18n="nav.view_all_languages">Visualizza tutto</button>
        </li>
      </ul>
    </div>
  `;

  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');
  navbar.innerHTML = `
    <div class="nav-brand">SCD</div>
    <div class="nav-links">
      ${navLinks}
      ${langSelector}
    </div>
    <button class="nav-hamburger" id="btn-hamburger" type="button" aria-label="Menu" aria-controls="nav-mobile-menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;

  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('nav-mobile-menu');
  mobileMenu.id = 'nav-mobile-menu';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.innerHTML = `
    ${navLinks}
    ${langSelector.replace('id="lang-dropdown"', 'id="lang-dropdown-mobile"').replace('id="btn-lang"', 'id="btn-lang-mobile"').replace('id="lang-flag"', 'id="lang-flag-mobile"').replace('id="lang-code"', 'id="lang-code-mobile"').replace('id="lang-menu"', 'id="lang-menu-mobile"')}
  `;

  document.body.prepend(mobileMenu);
  document.body.prepend(navbar);
  buildLanguageModal();

  // ── Theme toggle: registrato una volta sola qui ──
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  });
  updateThemeButtons(getStoredTheme());

  // ── Bottone Contatti ──
  document.querySelectorAll('.btn-contatti').forEach(btn => {
    btn.addEventListener('click', () => {
      closeMobileMenu();
      openModal();
    });
  });

  // ── Hamburger toggle ──
  const hamburger = document.getElementById('btn-hamburger');
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // ── Dropdown lingua desktop ──
  document.getElementById('btn-lang').addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    document.getElementById('btn-lang').setAttribute('aria-expanded', String(isOpen));
  });

  // ── Dropdown lingua mobile ──
  document.getElementById('btn-lang-mobile').addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown-mobile');
    const isOpen = dropdown.classList.toggle('open');
    document.getElementById('btn-lang-mobile').setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.lang-view-all').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLangDropdowns();
      openLanguageModal();
    });
  });

  // ── Chiude dropdown cliccando fuori ──
  document.addEventListener('click', (e) => {
    closeLangDropdowns();

    const clickedInsideMobileMenu = e.target.closest('#nav-mobile-menu');
    const clickedHamburger        = e.target.closest('#btn-hamburger');

    if (!clickedInsideMobileMenu && !clickedHamburger) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('.nav-mobile-menu a.nav-btn').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  setupNavLinks();
  setupScrollSpy();
}

function closeLangDropdowns() {
  document.getElementById('lang-dropdown')?.classList.remove('open');
  document.getElementById('lang-dropdown-mobile')?.classList.remove('open');
  document.getElementById('btn-lang')?.setAttribute('aria-expanded', 'false');
  document.getElementById('btn-lang-mobile')?.setAttribute('aria-expanded', 'false');
}

function buildLanguageModal() {
  if (document.getElementById('language-modal')) return;

  const languages = typeof getLanguageOptions === 'function' ? getLanguageOptions() : [];
  const modal = document.createElement('div');
  modal.className = 'modal-overlay language-modal-overlay';
  modal.id = 'language-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-box language-modal-box" role="dialog" aria-modal="true" aria-labelledby="language-modal-title" aria-describedby="language-modal-intro" tabindex="-1">
      <button class="modal-close" id="btn-close-language-modal" type="button" data-i18n-aria-label="language_modal.close">✕</button>
      <h2 id="language-modal-title" data-i18n="language_modal.title"></h2>
      <p class="modal-intro" id="language-modal-intro" data-i18n="language_modal.intro"></p>
      <label class="sr-only" for="language-search" data-i18n="language_modal.search_label"></label>
      <input class="language-search" id="language-search" type="search" autocomplete="off" data-i18n-placeholder="language_modal.search_placeholder">
      <div class="language-list" id="language-list" role="listbox" aria-labelledby="language-modal-title">
        ${languages.map(language => `
          <button class="language-modal-option" type="button" role="option" data-lang="${language.lang}" data-search="${[language.lang, language.code, language.name, language.nativeName].join(' ').toLowerCase()}" aria-pressed="false" aria-selected="false">
            <img class="lang-flag-img" src="${language.flagSrc}" alt="${language.flagAlt}">
            <span class="language-option-text">
              <span class="language-option-name">${language.nativeName}</span>
              <span class="language-option-meta">${language.name} · ${language.code}</span>
            </span>
          </button>
        `).join('')}
      </div>
      <p class="language-no-results" id="language-no-results" data-i18n="language_modal.no_results" hidden></p>
    </div>
  `;

  document.body.append(modal);
}

// ── Mobile menu ──────────────────────────────────────────
function toggleMobileMenu() {
  const menu      = document.getElementById('nav-mobile-menu');
  const hamburger = document.getElementById('btn-hamburger');
  const isOpen    = menu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  menu.setAttribute('aria-hidden', String(!isOpen));
}

function closeMobileMenu() {
  const menu      = document.getElementById('nav-mobile-menu');
  const hamburger = document.getElementById('btn-hamburger');
  if (!menu || !hamburger) return;
  menu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

function setActiveNavSection(sectionId) {
  document.querySelectorAll('.nav-btn[data-section]').forEach(link => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function smoothScrollToElement(target) {
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
  smoothVerticalScroll(Math.max(0, targetTop));
}

function smoothVerticalScroll(targetTop) {
  const start = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(maxScroll, targetTop));
  const distance = target - start;
  const duration = Math.min(900, Math.max(420, Math.abs(distance) * 0.35));
  const startTime = performance.now();

  const animate = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function setupNavLinks() {
  if (setupNavLinks.ready) return;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();
    smoothScrollToElement(target);

    if (link.dataset.section) setActiveNavSection(link.dataset.section);

    history.pushState(null, '', link.getAttribute('href'));
    closeMobileMenu();
  }, true);

  setupNavLinks.ready = true;
}

function setupScrollSpy() {
  if (!document.body.classList.contains('page-home')) {
    const currentSection = document.body.classList.contains('page-personal')
      ? 'personal-section'
      : document.body.classList.contains('page-work')
        ? 'work-section'
        : 'home-section';
    setActiveNavSection(currentSection);
    return;
  }

  const sectionIds = ['home-section', 'personal-section', 'work-section'];
  const updateActiveSection = () => {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const marker = navbarHeight + Math.min(window.innerHeight * 0.35, 260);
    let activeSection = sectionIds[0];

    sectionIds.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      if (section.getBoundingClientRect().top <= marker) activeSection = sectionId;
    });

    setActiveNavSection(activeSection);
  };

  setupScrollSpy.update = updateActiveSection;
  updateActiveSection();
  if (setupScrollSpy.ready) return;

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection);
  setupScrollSpy.ready = true;
}

function refreshScrollSpy() {
  setupScrollSpy.update?.();
}

// ── REVEAL ANIMATIONS ────────────────────────────────────
function setupRevealAnimations(root = document) {
  const selectors = [
    '.hero > *',
    '.page-hero > *',
    '.content-section > h2',
    '.content-section > p',
    '.skills-header',
    '.cards-grid .card',
    '.skill-card',
    '.timeline-item',
    '.cv-wrapper',
    '.contact-form',
    '.contact-form-status',
    '.contact-form-hint',
    '.footer > *'
  ];

  const items = root.querySelectorAll(selectors.join(', '));
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  items.forEach((item, index) => {
    if (item.dataset.revealReady === 'true') return;
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 220)}ms`);
    item.dataset.revealReady = 'true';
    if (reduceMotion) item.classList.add('is-visible');
  });

  if (reduceMotion) return;

  if (!setupRevealAnimations.observer) {
    setupRevealAnimations.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.dataset.revealGroup === 'skill-cards') {
          entry.target.querySelectorAll('.skill-card.reveal:not(.is-visible)').forEach((card, index) => {
            setTimeout(() => card.classList.add('is-visible'), Math.min(index * 55, 220));
          });
          setupRevealAnimations.observer.unobserve(entry.target);
          return;
        }
        entry.target.classList.add('is-visible');
        setupRevealAnimations.observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px 0px 0px'
    });
  }

  // ── FIX PRINCIPALE: gli elementi già nel viewport diventano
  // visibili subito, senza aspettare uno scroll ──
  const vh = window.innerHeight;
  root.querySelectorAll('.reveal:not(.is-visible)').forEach(item => {
    const revealBox = item.classList.contains('skill-card')
      ? item.closest('.skills-scroll-wrapper') || item
      : item;
    const rect = revealBox.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      // Già visibile: anima con un piccolo delay per effetto naturale
      setTimeout(() => item.classList.add('is-visible'), 50);
    } else if (item.classList.contains('skill-card') && revealBox) {
      revealBox.dataset.revealGroup = 'skill-cards';
      setupRevealAnimations.observer.observe(revealBox);
    } else {
      // Fuori viewport: affida all'observer
      setupRevealAnimations.observer.observe(item);
    }
  });
}

document.addEventListener('DOMContentLoaded', buildNavbar);

// ── FRAGMENT LOADER ──────────────────────────────────────
async function loadPageFragments() {
  const fragments = document.querySelectorAll('[data-fragment-url][data-fragment-source]');
  if (!fragments.length) return;

  await Promise.all([...fragments].map(async fragment => {
    try {
      const res = await fetch(fragment.dataset.fragmentUrl);
      if (!res.ok) throw new Error(`Impossibile caricare ${fragment.dataset.fragmentUrl}`);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const source = doc.getElementById(fragment.dataset.fragmentSource);
      if (!source) throw new Error(`Sorgente ${fragment.dataset.fragmentSource} non trovata`);

      fragment.innerHTML = source.innerHTML;
    } catch (err) {
      console.error('fragment error:', err);
      fragment.hidden = true;
    }
  }));

  if (typeof refreshI18n === 'function') refreshI18n();

  setupSkillsScroller();
  setupCvFallback();
  setupContactForm();

  // Aspetta due frame: uno per il layout, uno per il paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setupRevealAnimations(document);
    });
  });

  setupScrollSpy();
  requestAnimationFrame(refreshScrollSpy);
  setTimeout(refreshScrollSpy, 150);

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      smoothScrollToElement(target);
      setActiveNavSection(target.id);
    }
  }
}

function setupSkillsScroller() {
  document.querySelectorAll('.skills-scroll-wrapper').forEach(wrapper => {
    if (wrapper.dataset.skillsReady === 'true') return;

    const section = wrapper.closest('.content-section') || document;
    const prev = section.querySelector('#skills-prev');
    const next = section.querySelector('#skills-next');
    if (!prev || !next) return;

    const firstCard = wrapper.querySelector('.skill-card');
    const gap = parseFloat(getComputedStyle(wrapper.querySelector('.skills-scroll')).columnGap) || 0;
    const STEP = firstCard ? firstCard.getBoundingClientRect().width + gap : 360;
    const updateButtons = () => updateSkillsNavButtons(wrapper, prev, next);

    prev.addEventListener('click', () => smoothHorizontalScroll(wrapper, -STEP, updateButtons));
    next.addEventListener('click', () => smoothHorizontalScroll(wrapper, STEP, updateButtons));
    wrapper.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    updateButtons();
    wrapper.dataset.skillsReady = 'true';
  });
}

function updateSkillsNavButtons(wrapper, prev, next) {
  const maxScroll = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
  const current = Math.round(wrapper.scrollLeft);
  const atStart = current <= 1;
  const atEnd = current >= maxScroll - 1;

  prev.disabled = atStart;
  next.disabled = atEnd;
}

function smoothHorizontalScroll(element, distance, onUpdate) {
  const start = element.scrollLeft;
  const maxScroll = element.scrollWidth - element.clientWidth;
  const target = Math.max(0, Math.min(maxScroll, start + distance));
  const duration = 320;
  const startTime = performance.now();

  const animate = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.scrollLeft = start + (target - start) * eased;
    onUpdate?.();
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function canPreviewPdfInline() {
  if ('pdfViewerEnabled' in navigator) return navigator.pdfViewerEnabled;
  return Boolean(navigator.mimeTypes?.['application/pdf']);
}

function setupCvFallback() {
  document.querySelectorAll('.cv-wrapper').forEach(wrapper => {
    if (wrapper.dataset.cvReady === 'true') return;

    const frame = wrapper.querySelector('.cv-frame');
    const fallback = wrapper.querySelector('.cv-fallback');
    if (!frame || !fallback) return;

    const originalSrc = frame.src;

    // Costruisce l'URL per Google Docs Viewer
    const absoluteSrc = new URL(originalSrc, window.location.href).href;
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteSrc)}&embedded=true`;

    const showFallback = () => {
      fallback.classList.add('show');
      wrapper.classList.add('cv-no-preview');
    };

    if (canPreviewPdfInline()) {
      // Desktop con viewer nativo: usa il PDF diretto
      frame.addEventListener('error', showFallback);
    } else {
      // Mobile o browser senza viewer: usa Google Docs
      frame.src = googleViewerUrl;
      frame.addEventListener('error', showFallback);
    }

    wrapper.dataset.cvReady = 'true';
  });
}

function setupContactForm(root = document) {
  root.querySelectorAll('.contact-form').forEach(form => {
    if (form.dataset.contactReady === 'true') return;

    const status = form.parentElement?.querySelector('.contact-form-status');
    const submit = form.querySelector('.contact-submit');
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');
    const verifySend = form.querySelector('.email-verify-send');
    const verifyCheck = form.querySelector('.email-verify-check');
    const codeInput = form.querySelector('[name="email_code"]');
    const verificationStatus = form.parentElement?.querySelector('.email-verification-status');
    let verification = {
      code: '',
      email: '',
      expiresAt: 0,
      verifiedEmail: '',
    };

    const setStatus = (type, message) => {
      if (!status) return;
      status.textContent = message;
      status.classList.remove('success', 'error');
      if (type) status.classList.add(type);
    };
    const setVerificationStatus = (type, message) => {
      if (!verificationStatus) return;
      verificationStatus.textContent = message;
      verificationStatus.classList.remove('success', 'error');
      if (type) verificationStatus.classList.add(type);
    };

    const getMessages = () => CONTACT_MESSAGES[document.documentElement.lang] || CONTACT_MESSAGES.en;
    const isEmailJsConfigured = () => (
      EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'
      && EMAILJS_CONFIG.serviceId !== 'YOUR_EMAILJS_SERVICE_ID'
      && EMAILJS_CONFIG.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID'
    );
    const isVerificationConfigured = () => (
      isEmailJsConfigured()
      && EMAILJS_CONFIG.verificationTemplateId !== 'YOUR_EMAILJS_VERIFICATION_TEMPLATE_ID'
    );
    const isEmailVerified = () => (
      emailInput
      && verification.verifiedEmail
      && verification.verifiedEmail === emailInput.value.trim().toLowerCase()
    );
    const updateVerifiedControls = () => {
      const verified = isEmailVerified();
      if (messageInput) messageInput.disabled = !verified;
      if (submit) submit.disabled = !verified;
      if (codeInput) codeInput.disabled = verified;
      if (verifyCheck) verifyCheck.disabled = verified;
    };
    const resetVerification = (message = '') => {
      verification = {
        code: '',
        email: '',
        expiresAt: 0,
        verifiedEmail: '',
      };
      if (codeInput) codeInput.value = '';
      setVerificationStatus('', message);
      updateVerifiedControls();
    };
    const generateVerificationCode = () => {
      const min = 10 ** (EMAIL_VERIFICATION_CODE_LENGTH - 1);
      const max = 10 ** EMAIL_VERIFICATION_CODE_LENGTH - 1;
      return String(Math.floor(min + Math.random() * (max - min + 1)));
    };
    const sendWithEmailJs = (templateParams, templateId = EMAILJS_CONFIG.templateId) => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        return window.emailjs.send(
          EMAILJS_CONFIG.serviceId,
          templateId,
          templateParams
        );
      }

      return fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: templateParams,
        }),
      }).then(async response => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`EmailJS REST error ${response.status}: ${errorText}`);
        }
        return response;
      });
    };
    updateVerifiedControls();

    emailInput?.addEventListener('input', () => {
      if (verification.verifiedEmail) {
        resetVerification(getMessages().verificationReset);
      } else {
        resetVerification();
      }
    });

    verifySend?.addEventListener('click', async () => {
      const messages = getMessages();
      const email = emailInput?.value.trim().toLowerCase() || '';
      if (!emailInput?.checkValidity()) {
        emailInput?.reportValidity();
        return;
      }
      if (!isVerificationConfigured()) {
        setVerificationStatus('error', messages.verificationConfigError);
        return;
      }

      const code = generateVerificationCode();
      verification = {
        code,
        email,
        expiresAt: Date.now() + EMAIL_VERIFICATION_TTL_MS,
        verifiedEmail: '',
      };

      setVerificationStatus('', messages.verificationSending);
      verifySend.disabled = true;
      verifySend.classList.add('is-loading');

      try {
        await sendWithEmailJs({
          email,
          name: nameInput?.value.trim() || email,
          code,
          time: new Intl.DateTimeFormat(document.documentElement.lang || 'it', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date()),
        }, EMAILJS_CONFIG.verificationTemplateId);
        setVerificationStatus('success', messages.verificationSent);
        if (codeInput) codeInput.disabled = false;
      } catch (err) {
        console.error('email verification error:', err);
        resetVerification(messages.error);
      } finally {
        verifySend.classList.remove('is-loading');
        verifySend.disabled = false;
        updateVerifiedControls();
      }
    });

    verifyCheck?.addEventListener('click', () => {
      const messages = getMessages();
      const email = emailInput?.value.trim().toLowerCase() || '';
      const code = codeInput?.value.trim() || '';
      const valid = verification.code
        && verification.email === email
        && verification.code === code
        && verification.expiresAt > Date.now();

      if (!valid) {
        setVerificationStatus('error', messages.verificationInvalid);
        return;
      }

      verification.verifiedEmail = email;
      setVerificationStatus('success', messages.verificationSuccess);
      updateVerifiedControls();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const messages = getMessages();
      const sentAt = new Intl.DateTimeFormat(document.documentElement.lang || 'it', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date());
      const templateParams = {
        name,
        email,
        title: name || email,
        time: sentAt,
        message,
      };

      if (!isEmailJsConfigured()) {
        setStatus('error', messages.configError);
        return;
      }
      if (!isEmailVerified()) {
        setStatus('error', messages.verificationRequired);
        return;
      }

      setStatus('', messages.sending);
      if (submit) {
        submit.disabled = true;
        submit.classList.add('is-loading');
      }

      try {
        await sendWithEmailJs(templateParams);

        form.reset();
        resetVerification();
        setStatus('success', messages.success);
      } catch (err) {
        console.error('contact form error:', err);
        setStatus('error', messages.error);
      } finally {
        if (submit) {
          submit.classList.remove('is-loading');
          submit.disabled = false;
        }
        updateVerifiedControls();
      }
    });

    form.dataset.contactReady = 'true';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupLiveBackground();
  loadPageFragments();
  setupSkillsScroller();
  setupCvFallback();

  // Su pagine senza fragment le animazioni partono subito
  if (!document.querySelector('[data-fragment-url]')) {
    requestAnimationFrame(() => setupRevealAnimations());
  }
});

function setupLiveBackground() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || document.getElementById('live-background')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'live-background';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const pointer = { x: 0, y: 0, active: false };
  const nodes = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  const createNodes = () => {
    nodes.length = 0;
    const density = Math.min(90, Math.max(34, Math.round((width * height) / 26000)));
    for (let index = 0; index < density; index += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.8 + 1.1,
      });
    }
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNodes();
  };

  const draw = () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const colors = LIVE_BACKGROUND_CONFIG[theme];
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];

      if (pointer.active) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 180 && distance > 0) {
          const force = (1 - distance / 180) * 0.012;
          node.vx += dx * force / distance;
          node.vy += dy * force / distance;
        }
      }

      node.x += node.vx;
      node.y += node.vy;
      node.vx *= 0.985;
      node.vy *= 0.985;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;

      for (let j = i + 1; j < nodes.length; j += 1) {
        const other = nodes[j];
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 135) continue;

        ctx.strokeStyle = colors.line;
        ctx.globalAlpha = 1 - distance / 135;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = colors.node;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });
  window.addEventListener('pointerleave', () => {
    pointer.active = false;
  });
  reduceMotion.addEventListener?.('change', event => {
    if (!event.matches) return;
    cancelAnimationFrame(animationFrame);
    canvas.remove();
  });

  resize();
  draw();
}

// ── MODAL ────────────────────────────────────────────────
let lastFocusedBeforeModal = null;
let lastFocusedBeforeLanguageModal = null;

function getModalFocusableElements(modal) {
  return [...modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => element.offsetParent !== null);
}

function openModal() {
  const modal = document.getElementById('modal-contatti');
  const modalBox = modal?.querySelector('.modal-box');
  if (!modal || !modalBox) return;

  lastFocusedBeforeModal = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    const firstField = modal.querySelector('#contact-name');
    (firstField || modalBox).focus();
  });
}

function closeModal() {
  const modal = document.getElementById('modal-contatti');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
  }
  lastFocusedBeforeModal = null;
}

function handleModalKeydown(e) {
  const modal = document.getElementById('modal-contatti');
  if (!modal?.classList.contains('open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = getModalFocusableElements(modal);
  if (!focusable.length) {
    e.preventDefault();
    modal.querySelector('.modal-box')?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openLanguageModal() {
  const modal = document.getElementById('language-modal');
  const modalBox = modal?.querySelector('.language-modal-box');
  if (!modal || !modalBox) return;

  lastFocusedBeforeLanguageModal = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    const search = modal.querySelector('#language-search');
    (search || modalBox).focus();
  });
}

function closeLanguageModal() {
  const modal = document.getElementById('language-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  const search = modal.querySelector('#language-search');
  if (search) search.value = '';
  filterLanguageOptions('');

  if (lastFocusedBeforeLanguageModal && typeof lastFocusedBeforeLanguageModal.focus === 'function') {
    lastFocusedBeforeLanguageModal.focus();
  }
  lastFocusedBeforeLanguageModal = null;
}

function filterLanguageOptions(query) {
  const modal = document.getElementById('language-modal');
  if (!modal) return;

  const normalizeSearch = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
  const normalized = normalizeSearch(query);
  let visibleCount = 0;

  modal.querySelectorAll('.language-modal-option').forEach(option => {
    const searchable = normalizeSearch(option.dataset.search || '');
    const isVisible = !normalized || searchable.includes(normalized);
    option.hidden = !isVisible;
    option.setAttribute('aria-hidden', String(!isVisible));
    if (isVisible) visibleCount += 1;
  });

  const noResults = modal.querySelector('#language-no-results');
  if (noResults) noResults.hidden = visibleCount > 0;
}

function handleLanguageModalKeydown(e) {
  const modal = document.getElementById('language-modal');
  if (!modal?.classList.contains('open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeLanguageModal();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = getModalFocusableElements(modal);
  if (!focusable.length) {
    e.preventDefault();
    modal.querySelector('.language-modal-box')?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-close-modal')
    .addEventListener('click', closeModal);

  document.getElementById('modal-contatti')
    .addEventListener('click', (e) => {
      if (e.target.id === 'modal-contatti') closeModal();
    });

  document.addEventListener('keydown', handleModalKeydown);
  document.addEventListener('keydown', handleLanguageModalKeydown);

  document.getElementById('btn-close-language-modal')
    ?.addEventListener('click', closeLanguageModal);

  document.getElementById('language-modal')
    ?.addEventListener('click', (e) => {
      if (e.target.id === 'language-modal') closeLanguageModal();
    });

  document.getElementById('language-search')
    ?.addEventListener('input', (e) => filterLanguageOptions(e.target.value));

  document.querySelectorAll('.language-modal-option').forEach(option => {
    option.addEventListener('click', () => {
      if (typeof setLang === 'function') setLang(option.dataset.lang);
    });
  });

  setupContactForm();
});
