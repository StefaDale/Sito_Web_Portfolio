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
const GITHUB_USERNAME = 'StefaDale';
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=created&direction=asc&per_page=100`;
const PROJECT_REPO_OVERRIDES = {
  'Sito_Web_Portfolio': {
    title: 'Sito Web Portfolio',
    languages: 'HTML / CSS / JavaScript',
    mainLanguage: 'HTML',
    hideDemoButton: true,
    disablePreview: true,
  },
  Login_Registration_Form_Deploy: {
    title: 'Login Registration Form',
    languages: 'HTML / CSS / JavaScript / Python',
    mainLanguage: 'Python',
  },
  LinkTree: {
    title: 'LinkTree',
    languages: 'HTML / CSS',
    mainLanguage: 'HTML',
    demoUrl: 'https://stefanocatalinlinktree.netlify.app/',
  },
  Click_Counter: {
    languages: 'HTML / CSS / JavaScript'
  }
};
const PROJECT_HIDDEN_REPOS = new Set([
  'Login_Registration_Form',
]);
const NAV_SCROLL_DELAY = 180;
let pendingNavScroll = null;
let activeScrollId = 0;

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
  activeScrollId += 1;
  const scrollId = activeScrollId;
  const start = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(maxScroll, targetTop));
  const distance = target - start;
  if (Math.abs(distance) < 1) {
    document.dispatchEvent(new CustomEvent('live-background:resume'));
    return;
  }

  const duration = Math.min(900, Math.max(420, Math.abs(distance) * 0.35));
  const startTime = performance.now();
  document.dispatchEvent(new CustomEvent('live-background:pause'));

  const animate = (now) => {
    if (scrollId !== activeScrollId) return;

    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    document.dispatchEvent(new CustomEvent('live-background:resume'));
  };

  requestAnimationFrame(animate);
}

function scheduleNavScroll(target, href) {
  if (pendingNavScroll) clearTimeout(pendingNavScroll);

  activeScrollId += 1;
  document.dispatchEvent(new CustomEvent('live-background:pause'));

  pendingNavScroll = setTimeout(() => {
    pendingNavScroll = null;
    smoothScrollToElement(target);
    history.pushState(null, '', href);
  }, NAV_SCROLL_DELAY);
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
    scheduleNavScroll(target, link.getAttribute('href'));

    if (link.dataset.section) setActiveNavSection(link.dataset.section);

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

// ── HERO TYPEWRITER ──────────────────────────────────────
function setupHeroTypewriter() {
  if (!document.body.classList.contains('page-home')) return;
  if (setupHeroTypewriter.ready) return;

  setupHeroTypewriter.ready = true;

  document.addEventListener('languagechange', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const title = document.querySelector('.hero-name');
    const firstName = title?.querySelector('[data-i18n="home.name"]');
    const lastName = title?.querySelector('[data-i18n="home.name_extra"]');
    if (!title || !firstName || !lastName) return;

    const cleanup = () => {
      title.classList.remove('is-typing');
      title.removeAttribute('aria-label');
      [firstName, lastName].forEach(element => {
        delete element.dataset.typewriterEmpty;
      });
      setupHeroTypewriter.active = false;
    };

    if (setupHeroTypewriter.played) {
      if (setupHeroTypewriter.active) {
        setupHeroTypewriter.runId += 1;
        cleanup();
      }
      return;
    }

    if (reduceMotion) return;

    const segments = [
      { element: firstName, text: firstName.textContent },
      { element: lastName, text: lastName.textContent },
    ];

    if (segments.some(segment => !segment.text)) return;

    setupHeroTypewriter.played = true;
    setupHeroTypewriter.active = true;
    setupHeroTypewriter.runId = (setupHeroTypewriter.runId || 0) + 1;
    const runId = setupHeroTypewriter.runId;
    title.setAttribute('aria-label', segments.map(segment => segment.text).join(' '));
    title.classList.add('is-typing');

    segments.forEach(segment => {
      segment.element.textContent = '';
      segment.element.dataset.typewriterEmpty = 'true';
    });

    let segmentIndex = 0;
    let charIndex = 0;
    const speed = 74;
    const segmentPause = 130;

    const typeNext = () => {
      if (runId !== setupHeroTypewriter.runId) return;

      const segment = segments[segmentIndex];
      if (!segment) {
        cleanup();
        return;
      }

      const chars = Array.from(segment.text);
      segment.element.dataset.typewriterEmpty = String(charIndex === 0 && chars.length === 0);

      if (charIndex < chars.length) {
        segment.element.textContent = chars.slice(0, charIndex + 1).join('');
        delete segment.element.dataset.typewriterEmpty;
        charIndex += 1;
        setTimeout(typeNext, speed);
        return;
      }

      segmentIndex += 1;
      charIndex = 0;
      setTimeout(typeNext, segmentPause);
    };

    setTimeout(typeNext, 120);
  });
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
  setupProjects();
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

function setupProjectsScroller(root = document) {
  root.querySelectorAll('.projects-scroll-wrapper').forEach(wrapper => {
    const section = wrapper.closest('#projects-section') || document;
    const prev = section.querySelector('#projects-prev');
    const next = section.querySelector('#projects-next');
    if (!prev || !next) return;

    const updateButtons = () => updateSkillsNavButtons(wrapper, prev, next);

    if (wrapper.dataset.projectsReady === 'true') {
      updateButtons();
      return;
    }

    prev.addEventListener('click', () => scrollHorizontalByItem(wrapper, '.projects-grid', '.project-card', -1, updateButtons));
    next.addEventListener('click', () => scrollHorizontalByItem(wrapper, '.projects-grid', '.project-card', 1, updateButtons));
    wrapper.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    updateButtons();
    wrapper.dataset.projectsReady = 'true';
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

function scrollHorizontalByItem(element, trackSelector, itemSelector, direction, onUpdate) {
  const track = element.querySelector(trackSelector);
  const firstItem = element.querySelector(itemSelector);
  if (!track || !firstItem) return;

  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = firstItem.getBoundingClientRect().width + gap;
  if (!step) return;

  const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth);
  const currentIndex = Math.round(element.scrollLeft / step);
  const targetIndex = currentIndex + direction;
  const target = Math.max(0, Math.min(maxScroll, targetIndex * step));

  smoothHorizontalScrollTo(element, target, onUpdate);
}

function smoothHorizontalScroll(element, distance, onUpdate) {
  const start = element.scrollLeft;
  const maxScroll = element.scrollWidth - element.clientWidth;
  const target = Math.max(0, Math.min(maxScroll, start + distance));

  smoothHorizontalScrollTo(element, target, onUpdate);
}

function smoothHorizontalScrollTo(element, target, onUpdate) {
  const start = element.scrollLeft;
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

function getProjectText(key, fallback) {
  return typeof getI18nValue === 'function' ? getI18nValue(`work.${key}`, fallback) : fallback;
}

function shouldHideProjectRepo(repo) {
  if (!repo || repo.fork || repo.archived) return true;
  if (PROJECT_HIDDEN_REPOS.has(repo.name)) return true;
  return false;
}

function getRepoDemoUrl(repo) {
  const override = PROJECT_REPO_OVERRIDES[repo.name];
  if (override?.demoUrl) return override.demoUrl;
  if (repo.homepage) return repo.homepage;
  if (repo.has_pages) return `https://${GITHUB_USERNAME.toLowerCase()}.github.io/${repo.name}/`;
  return '';
}

function formatRepoName(name) {
  return String(name || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function capitalizeFirstLetter(value) {
  const text = String(value || '');
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function getProjectData(repo) {
  const override = PROJECT_REPO_OVERRIDES[repo.name] || {};
  const title = override.title || formatRepoName(repo.name);
  const description = override.description || repo.description || getProjectText('project_no_description', 'Nessuna descrizione disponibile.');
  const demoUrl = getRepoDemoUrl(repo);

  return {
    title,
    description,
    demoUrl: override.disablePreview ? '' : demoUrl,
    repoUrl: repo.html_url,
    languages: override.languages || repo.language || getProjectText('project_language_unknown', 'Varie'),
    mainLanguage: override.mainLanguage || repo.language || getProjectText('project_language_unknown', 'Varie'),
    createdAt: repo.created_at,
    name: repo.name,
    hideDemoButton: Boolean(override.hideDemoButton),
  };
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.tabIndex = project.demoUrl ? 0 : -1;
  card.classList.toggle('has-demo', Boolean(project.demoUrl));

  const createdDate = project.createdAt
    ? capitalizeFirstLetter(new Intl.DateTimeFormat(document.documentElement.lang || 'it', { month: 'long', year: 'numeric' }).format(new Date(project.createdAt)))
    : '';
  const safeTitle = escapeHtml(project.title);
  const safeDescription = escapeHtml(project.description);
  const safeLanguages = escapeHtml(project.languages);
  const safeMainLanguage = escapeHtml(project.mainLanguage);
  const safeCreatedDate = escapeHtml(createdDate);
  const safeRepoUrl = encodeURI(project.repoUrl);
  const showDemoButton = project.demoUrl && !project.hideDemoButton;
  const demoButton = showDemoButton
    ? `<button class="btn-primary project-open" type="button">${escapeHtml(getProjectText('project_open_demo', 'Apri demo'))}</button>`
    : '';

  card.innerHTML = `
    <div class="project-preview" aria-hidden="true">
      <span class="project-preview-title">${safeTitle}</span>
      <span class="project-preview-subtitle">${safeLanguages}</span>
    </div>
    <div class="project-card-body">
      <div class="project-card-topline">
        <span class="project-language">${escapeHtml(getProjectText('project_main_language', 'Linguaggio piu utilizzato'))}: ${safeMainLanguage}</span>
        ${createdDate ? `<span class="project-updated">${safeCreatedDate}</span>` : ''}
      </div>
      <h3>${safeTitle}</h3>
      <p>${safeDescription}</p>
      <div class="project-card-actions">
        ${demoButton}
        <a class="btn-secondary" href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(getProjectText('project_repo', 'Repository'))}</a>
      </div>
    </div>
  `;

  const open = () => {
    if (project.demoUrl) openProjectModal(project);
  };

  card.querySelector('.project-open')?.addEventListener('click', event => {
    event.stopPropagation();
    open();
  });

  card.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    open();
  });
  card.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    open();
  });

  return card;
}

async function setupProjects(root = document) {
  const grids = root.querySelectorAll('#projects-grid');
  if (!grids.length) return;
  setupProjectsScroller(root);

  try {
    const response = await fetch(GITHUB_REPOS_URL);
    if (!response.ok) throw new Error(`GitHub API error ${response.status}`);

    const repos = await response.json();
    const projects = repos
      .filter(repo => !shouldHideProjectRepo(repo))
      .map(getProjectData);

    grids.forEach(grid => {
      grid.innerHTML = '';

      if (!projects.length) {
        const status = document.createElement('p');
        status.className = 'projects-status';
        status.textContent = getProjectText('projects_empty', 'Nessun progetto pubblico disponibile.');
        grid.append(status);
        return;
      }

      projects.forEach(project => grid.append(createProjectCard(project)));
    });

    setupProjectsScroller(root);
    requestAnimationFrame(() => setupRevealAnimations(root));
  } catch (error) {
    console.error('projects error:', error);
    grids.forEach(grid => {
      grid.innerHTML = `<p class="projects-status error">${getProjectText('projects_error', 'Non riesco a caricare i progetti in questo momento.')}</p>`;
    });
    setupProjectsScroller(root);
  }
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalBox = modal?.querySelector('.project-modal-box');
  const title = document.getElementById('project-modal-title');
  const description = document.getElementById('project-modal-description');
  const repo = document.getElementById('project-modal-repo');
  const frameWrap = document.getElementById('project-modal-frame-wrap');
  const status = document.getElementById('project-modal-status');
  if (!modal || !modalBox || !frameWrap) return;

  title.textContent = project.title;
  description.textContent = project.description;
  repo.href = project.repoUrl;
  status.textContent = getProjectText('project_iframe_hint', 'La demo live e\' caricata qui sotto.');
  frameWrap.innerHTML = `<iframe class="project-modal-frame" src="${encodeURI(project.demoUrl)}" title="${escapeHtml(project.title)}" loading="lazy"></iframe>`;

  lastFocusedBeforeProjectModal = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => modalBox.focus());
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
  setupHeroTypewriter();
  setupLiveBackground();
  loadPageFragments();
  setupSkillsScroller();
  setupProjects();
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

  const buffer = document.createElement('canvas');
  const ctx = {
    visible: canvas.getContext('2d'),
    buffer: buffer.getContext('2d'),
  };
  const pipeCount = 25;
  const turnCount = 8;
  const turnAmount = (360 / turnCount) * (Math.PI / 180);
  const turnChanceRange = 58;
  const baseSpeed = 0.5;
  const rangeSpeed = 1;
  const baseTTL = 190;
  const rangeTTL = 210;
  const baseHold = 120;
  const rangeHold = 150;
  const exitSpeed = 2.3;
  const spawnDelay = 20;
  const baseWidth = 2;
  const rangeWidth = 4;
  const baseHue = 258;
  const rangeHue = 42;
  const backgroundColor = 'hsla(250, 58%, 6%, 1)';
  const pipes = [];
  const center = [0, 0];
  let width = 0;
  let height = 0;
  let viewportHeightLock = 0;
  let lastDpr = 0;
  let tick = 0;
  let animationFrame = 0;
  let nextSpawnTick = 0;
  let paused = false;

  const rand = value => Math.random() * value;
  const fadeInOut = (time, max) => {
    const halfMax = 0.5 * max;
    return Math.abs((time + halfMax) % max - halfMax) / halfMax;
  };

  const createPipe = () => {
    const fromCenter = Math.random() < 0.58;
    const side = Math.floor(rand(4));
    const centerSpread = Math.min(width, height) * 0.08;
    const edgeInset = 16;
    let x;
    let y;
    let direction;

    if (fromCenter) {
      x = center[0] + rand(centerSpread * 2) - centerSpread;
      y = center[1] + rand(centerSpread * 2) - centerSpread;
      direction = Math.atan2(y - center[1], x - center[0]);
      direction = Math.round(direction / turnAmount) * turnAmount;
    } else {
      x = side === 0 ? edgeInset : side === 1 ? width - edgeInset : rand(width);
      y = side === 2 ? edgeInset : side === 3 ? height - edgeInset : rand(height);
      direction = [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5][side];
    }

    return {
      x,
      y,
      direction,
      speed: baseSpeed + rand(rangeSpeed),
      life: 0,
      ttl: baseTTL + rand(rangeTTL),
      hold: baseHold + rand(rangeHold),
      exit: 0,
      width: baseWidth + rand(rangeWidth),
      hue: baseHue + rand(rangeHue),
      state: 'enter',
      points: [],
    };
  };

  const spawnPipe = () => {
    if (pipes.length >= pipeCount) return;
    pipes.push(createPipe());
  };

  const initPipes = () => {
    pipes.length = 0;
    nextSpawnTick = 0;
    for (let i = 0; i < Math.floor(pipeCount * 0.45); i += 1) {
      spawnPipe();
    }
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

    buffer.width = canvas.width;
    buffer.height = canvas.height;
    ctx.visible.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.buffer.setTransform(dpr, 0, 0, dpr, 0, 0);
    center[0] = width * 0.5;
    center[1] = height * 0.5;

    ctx.buffer.clearRect(0, 0, width, height);
    ctx.visible.clearRect(0, 0, width, height);
    initPipes();
  };

  const drawPipePoint = (x, y, life, ttl, pipeWidth, hue) => {
    ctx.buffer.save();
    ctx.buffer.strokeStyle = `hsla(${hue}, 75%, 50%, ${fadeInOut(life, ttl) * 0.125})`;
    ctx.buffer.beginPath();
    ctx.buffer.arc(x, y, pipeWidth, 0, Math.PI * 2);
    ctx.buffer.stroke();
    ctx.buffer.closePath();
    ctx.buffer.restore();
  };

  const updatePipe = pipe => {
    if (pipe.state === 'enter') {
      pipe.points.push({
        x: pipe.x,
        y: pipe.y,
        life: pipe.life,
      });

      pipe.life += 1;
      pipe.x += Math.cos(pipe.direction) * pipe.speed;
      pipe.y += Math.sin(pipe.direction) * pipe.speed;

      if (pipe.x > width) pipe.x = 0;
      if (pipe.x < 0) pipe.x = width;
      if (pipe.y > height) pipe.y = 0;
      if (pipe.y < 0) pipe.y = height;

      const shouldTurn = !(tick % Math.max(1, Math.round(rand(turnChanceRange))))
        && (!(Math.round(pipe.x) % 6) || !(Math.round(pipe.y) % 6));
      pipe.direction += shouldTurn ? turnAmount * (Math.round(rand(1)) ? -1 : 1) : 0;

      if (pipe.life > pipe.ttl) {
        pipe.state = 'hold';
        pipe.life = 0;
      }
      return;
    }

    if (pipe.state === 'hold') {
      pipe.life += 1;
      if (pipe.life > pipe.hold) {
        pipe.state = 'exit';
        pipe.life = 0;
      }
      return;
    }

    pipe.exit += exitSpeed;
  };

  const updatePipes = () => {
    tick += 1;

    if (tick >= nextSpawnTick) {
      spawnPipe();
      nextSpawnTick = tick + spawnDelay;
    }

    for (let i = pipes.length - 1; i >= 0; i -= 1) {
      const pipe = pipes[i];
      updatePipe(pipe);
      if (pipe.exit >= pipe.points.length) {
        pipes.splice(i, 1);
      }
    }
  };

  const drawPipes = () => {
    ctx.buffer.clearRect(0, 0, width, height);

    pipes.forEach(pipe => {
      const start = Math.floor(pipe.exit);
      for (let i = start; i < pipe.points.length; i += 1) {
        const point = pipe.points[i];
        drawPipePoint(point.x, point.y, point.life, pipe.ttl, pipe.width, pipe.hue);
      }
    });
  };

  const render = () => {
    ctx.visible.save();
    ctx.visible.fillStyle = backgroundColor;
    ctx.visible.fillRect(0, 0, width, height);
    ctx.visible.restore();

    ctx.visible.save();
    ctx.visible.filter = 'blur(12px)';
    ctx.visible.drawImage(buffer, 0, 0, width, height);
    ctx.visible.restore();

    ctx.visible.drawImage(buffer, 0, 0, width, height);
  };

  const draw = () => {
    if (paused) return;

    updatePipes();
    drawPipes();
    render();

    animationFrame = requestAnimationFrame(draw);
  };

  const pause = () => {
    if (paused) return;
    paused = true;
    cancelAnimationFrame(animationFrame);
  };

  const resume = () => {
    if (!paused) return;
    paused = false;
    draw();
  };

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => {
    viewportHeightLock = 0;
    requestAnimationFrame(resize);
  });
  document.addEventListener('live-background:pause', pause);
  document.addEventListener('live-background:resume', resume);
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
let lastFocusedBeforeProjectModal = null;

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

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  const frameWrap = document.getElementById('project-modal-frame-wrap');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (frameWrap) frameWrap.innerHTML = '';

  if (lastFocusedBeforeProjectModal && typeof lastFocusedBeforeProjectModal.focus === 'function') {
    lastFocusedBeforeProjectModal.focus();
  }
  lastFocusedBeforeProjectModal = null;
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

function handleProjectModalKeydown(e) {
  const modal = document.getElementById('project-modal');
  if (!modal?.classList.contains('open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeProjectModal();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = getModalFocusableElements(modal);
  if (!focusable.length) {
    e.preventDefault();
    modal.querySelector('.project-modal-box')?.focus();
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
  document.addEventListener('keydown', handleProjectModalKeydown);

  document.getElementById('btn-close-language-modal')
    ?.addEventListener('click', closeLanguageModal);

  document.getElementById('language-modal')
    ?.addEventListener('click', (e) => {
      if (e.target.id === 'language-modal') closeLanguageModal();
    });

  document.getElementById('language-search')
    ?.addEventListener('input', (e) => filterLanguageOptions(e.target.value));

  document.getElementById('btn-close-project-modal')
    ?.addEventListener('click', closeProjectModal);

  document.getElementById('project-modal')
    ?.addEventListener('click', (e) => {
      if (e.target.id === 'project-modal') closeProjectModal();
    });

  document.querySelectorAll('.language-modal-option').forEach(option => {
    option.addEventListener('click', () => {
      if (typeof setLang === 'function') setLang(option.dataset.lang);
    });
  });

  setupContactForm();
});
