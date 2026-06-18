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
const TEST_VERIFICATION_CODE = '7946130258';
const LIVE_BACKGROUND_CONFIG = {
  dark: {
    particles: [
      { r: 168, g: 85, b: 247 },   // viola brillante
      { r: 139, g: 92, b: 246 },   // indaco
      { r: 99,  g: 102, b: 241 },  // blu indaco
      { r: 192, g: 132, b: 252 },  // lilla chiaro
    ],
    lineAlpha: 0.18,
    glowAlpha: 0.22,
    nodeAlpha: 0.72,
  },
  light: {
    particles: [
      { r: 109, g: 40, b: 217 },
      { r: 124, g: 58, b: 237 },
      { r: 79,  g: 70, b: 229 },
      { r: 147, g: 51, b: 234 },
    ],
    lineAlpha: 0.10,
    glowAlpha: 0.12,
    nodeAlpha: 0.48,
  },
};
const CONTACT_MESSAGE_FALLBACK = {
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
};
const CV_DOWNLOAD_FILENAME = "Stefano Catalin D'Alessandro CV.pdf";
const CV_ASSETS = {
  it: "assets/Stefano Catalin D'Alessandro CV.pdf",
  en: "assets/Curriculum_EN.pdf",
  es: "assets/Curriculum_ES.pdf",
};

function getCurrentCvAssetUrl() {
  const lang = document.documentElement.lang || 'en';
  return CV_ASSETS[lang] || CV_ASSETS.en;
}

function updateCvAssetLinks() {
  const url = getCurrentCvAssetUrl();

  document.querySelectorAll('.cv-render-container').forEach(container => {
    if (container.dataset.cvUrl !== url) {
      container.dataset.cvUrl = url;
      container.dataset.cvReady = 'false';
    }
  });

  document.querySelectorAll('.cv-actions a').forEach(link => {
    link.href = url;
    if (link.hasAttribute('download')) {
      link.setAttribute('download', CV_DOWNLOAD_FILENAME);
    }
  });
}

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
  // CV viewer disabled: restore by uncommenting renderCustomCV() and the function block below.
  // renderCustomCV();
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

/*
  CV PDF viewer disabled on purpose.
  To show it again:
  1. Remove this block comment around renderCustomCV().
  2. Uncomment the three renderCustomCV() calls in this file.
  3. Re-enable the .cv-wrapper HTML and PDF.js script tags in index.html and vita-lavorativa.html.
async function renderCustomCV() {
  if (typeof pdfjsLib === 'undefined') return;

  updateCvAssetLinks();
  const containers = document.querySelectorAll('.cv-render-container');
  
  for (const container of containers) {
    if (container.dataset.cvReady === 'true') continue;
    const url = container.dataset.cvUrl;
    if (!url) continue;

    try {
      const renderId = String(Date.now() + Math.random());
      container.dataset.cvRenderId = renderId;
      container.innerHTML = '';
      const pdf = await pdfjsLib.getDocument(url).promise;
      if (container.dataset.cvUrl !== url || container.dataset.cvRenderId !== renderId) continue;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (container.dataset.cvUrl !== url || container.dataset.cvRenderId !== renderId) break;
        const page = await pdf.getPage(pageNum);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        canvas.className = 'cv-page';
        const ctx = canvas.getContext('2d');
        
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        ctx.scale(dpr, dpr);

        container.appendChild(canvas);
        
        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;
      }
      if (container.dataset.cvUrl === url && container.dataset.cvRenderId === renderId) {
        container.dataset.cvReady = 'true';
      }
    } catch (err) {
      console.error('Error rendering PDF:', err);
      const fallback = container.parentElement.querySelector('.cv-fallback');
      if (fallback) fallback.classList.add('show');
    }
  }
}

document.addEventListener('languagechange', () => {
  updateCvAssetLinks();
  renderCustomCV();
});
*/

document.addEventListener('languagechange', () => {
  updateCvAssetLinks();
  // CV viewer disabled: restore by uncommenting renderCustomCV() above and this call.
  // renderCustomCV();
});

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

    const getMessages = () => (
      typeof getI18nValue === 'function'
        ? getI18nValue('contact_messages', CONTACT_MESSAGE_FALLBACK)
        : CONTACT_MESSAGE_FALLBACK
    );
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
      const valid = (
      code === TEST_VERIFICATION_CODE
      || (
        verification.code
        && verification.email === email
        && verification.code === code
        && verification.expiresAt > Date.now()
        )
      );

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
  updateCvAssetLinks();
  // CV viewer disabled: restore by uncommenting renderCustomCV() and the function block above.
  // renderCustomCV();

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
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 0; pointer-events: none;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const pointer = { x: 0, y: 0, active: false };
  const nodes = [];
  let width = 0;
  let height = 0;
  let viewportHeightLock = 0;
  let lastDpr = 0;
  let animationFrame = 0;
  let time = 0;

  /* ── Profondità / layer ── */
  const LAYERS = [
    { speed: 0.15, sizeMin: 1.0, sizeMax: 1.6, drift: 0.08, count: 0.40 },  // far
    { speed: 0.28, sizeMin: 1.4, sizeMax: 2.4, drift: 0.14, count: 0.35 },  // mid
    { speed: 0.42, sizeMin: 2.0, sizeMax: 3.2, drift: 0.20, count: 0.25 },  // near
  ];

  const LINK_DISTANCE = 150;
  const MOUSE_RADIUS = 160;
  const MOUSE_FORCE = 0.005;

  const createNodes = () => {
    nodes.length = 0;
    const totalDensity = Math.min(160, Math.max(50, Math.round((width * height) / 16000)));

    LAYERS.forEach((layer, layerIndex) => {
      const count = Math.round(totalDensity * layer.count);
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          /* Velocità base persistente: mai smorzata, mai zero */
          baseVx: Math.cos(angle) * layer.drift,
          baseVy: Math.sin(angle) * layer.drift,
          /* Velocità extra (interazione mouse) */
          vx: 0,
          vy: 0,
          radius: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
          layer: layerIndex,
          speed: layer.speed,
          /* Parametri per oscillazione organica */
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          waveAmpX: 0.15 + Math.random() * 0.25,
          waveAmpY: 0.15 + Math.random() * 0.25,
          waveFreq: 0.008 + Math.random() * 0.006,
          /* Colore casuale dalla palette */
          colorIndex: Math.floor(Math.random() * 4),
          /* Pulsazione glow */
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.008,
        });
      }
    });
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isTouchViewport = window.matchMedia('(pointer: coarse)').matches;
    const nextWidth = Math.ceil(window.innerWidth || document.documentElement.clientWidth);
    const currentHeight = Math.ceil(window.innerHeight || document.documentElement.clientHeight);
    const screenHeight = Math.ceil(window.screen?.height || currentHeight);
    const nextHeight = isTouchViewport
      ? Math.max(viewportHeightLock, currentHeight, screenHeight)
      : currentHeight;

    if (width === nextWidth && height === nextHeight && lastDpr === dpr) return;

    width = nextWidth;
    height = nextHeight;
    viewportHeightLock = nextHeight;
    lastDpr = dpr;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNodes();
  };

  const draw = () => {
    time += 1;
    const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const palette = LIVE_BACKGROUND_CONFIG[theme];
    ctx.clearRect(0, 0, width, height);

    /* ── Aggiorna posizioni ── */
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];

      /* Oscillazione organica (onde sinusoidali) */
      const waveX = Math.sin(time * n.waveFreq + n.phaseX) * n.waveAmpX;
      const waveY = Math.cos(time * n.waveFreq * 0.7 + n.phaseY) * n.waveAmpY;

      /* Interazione col mouse: repulsione/attrazione morbida */
      if (pointer.active) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          n.vx += dx * strength;
          n.vy += dy * strength;
        }
      }

      /* Posizione = base drift + onda + velocità extra (mouse) */
      n.x += n.baseVx + waveX + n.vx;
      n.y += n.baseVy + waveY + n.vy;

      /* Smorzamento solo della velocità extra (mouse), non del drift */
      n.vx *= 0.94;
      n.vy *= 0.94;

      /* Wrap-around con margine */
      if (n.x < -30) n.x = width + 30;
      if (n.x > width + 30) n.x = -30;
      if (n.y < -30) n.y = height + 30;
      if (n.y > height + 30) n.y = -30;
    }

    /* ── Disegna linee con gradiente ── */
    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        if (dist > LINK_DISTANCE) continue;

        const opacity = (1 - dist / LINK_DISTANCE) * palette.lineAlpha;
        const colA = palette.particles[a.colorIndex];
        const colB = palette.particles[b.colorIndex];

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(${colA.r},${colA.g},${colA.b},${opacity})`);
        grad.addColorStop(1, `rgba(${colB.r},${colB.g},${colB.b},${opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6 + (1 - dist / LINK_DISTANCE) * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    /* ── Disegna particelle con glow radiale pulsante ── */
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      const col = palette.particles[n.colorIndex];

      /* Pulsazione: il raggio e l'opacità oscillano dolcemente */
      const pulse = 0.75 + 0.25 * Math.sin(time * n.pulseSpeed + n.pulsePhase);
      const glowRadius = n.radius * (3.5 + pulse * 1.5);
      const coreRadius = n.radius * (0.85 + pulse * 0.15);

      /* Glow esterno: gradiente radiale sfumato */
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
      glow.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${palette.glowAlpha * pulse})`);
      glow.addColorStop(0.4, `rgba(${col.r},${col.g},${col.b},${palette.glowAlpha * pulse * 0.4})`);
      glow.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      /* Nucleo luminoso */
      const core = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, coreRadius);
      core.addColorStop(0, `rgba(255,255,255,${palette.nodeAlpha * 0.9 * pulse})`);
      core.addColorStop(0.3, `rgba(${col.r},${col.g},${col.b},${palette.nodeAlpha * pulse})`);
      core.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(n.x, n.y, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => {
    viewportHeightLock = 0;
    requestAnimationFrame(resize);
  });
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
