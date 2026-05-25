// ============================================
// CmmsPage.js
// Extracted from the inline <script> in assets/cmms.html.
// Handles: AOS init, navbar scroll effect, language toggle
// sync, countup animation for stats strip.
// ============================================

(function () {

  // ─── i18n helper ─────────────────────────────────────────────────────
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((cur, key) => cur && cur[key], obj);
  }

  function applyCMMSTranslations(lang) {
    if (!window.i18nData || !window.i18nData[lang]) return;
    const t = window.i18nData[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = getNestedProperty(t, el.getAttribute('data-i18n'));
      if (val !== undefined && val !== null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = getNestedProperty(t, el.getAttribute('data-i18n-placeholder'));
      if (val) el.placeholder = val;
    });

    document.querySelectorAll('select option[data-i18n]').forEach(opt => {
      const val = getNestedProperty(t, opt.getAttribute('data-i18n'));
      if (val) opt.textContent = val;
    });
  }

  // ─── Toggle UI sync ──────────────────────────────────────────────────
  function syncToggleUI(lang) {
    const isEn = lang === 'en';
    const ids = {
      toggleSlider:    { prop: 'transform', on: 'translateX(28px)', off: 'translateX(0)' },
      mobileToggleSlider: { prop: 'transform', on: 'translateX(20px)', off: 'translateX(0)' },
      desktopIdText:   { prop: 'opacity', on: '0.5', off: '1' },
      desktopEnText:   { prop: 'opacity', on: '1',   off: '0.5' },
      mobileIdText:    { prop: 'opacity', on: '0.5', off: '1' },
      mobileEnText:    { prop: 'opacity', on: '1',   off: '0.5' },
    };
    Object.entries(ids).forEach(([id, cfg]) => {
      const el = document.getElementById(id);
      if (el) el.style[cfg.prop] = isEn ? cfg.on : cfg.off;
    });
  }

  // ─── Stats countup ───────────────────────────────────────────────────
  function initCountup() {
    const strip = document.querySelector('.stats-strip');
    if (!strip) return;

    let fired = false;
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || fired) return;
      fired = true;

      document.querySelectorAll('.countup-val').forEach(el => {
        const target   = parseInt(el.dataset.target || '0', 10);
        const duration = 1800;
        const start    = performance.now();

        const tick = now => {
          const p   = Math.min((now - start) / duration, 1);
          const val = Math.round(p * (1 - Math.pow(1 - p, 3)) * target + p * target) / 2;
          el.textContent = Math.round(Math.min(val * 2, target)).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(tick);
      });
      obs.disconnect();
    }, { threshold: 0.3 });

    obs.observe(strip);
  }

  // ─── WhatsApp form (mirrors interactions.js logic) ───────────────────
  function submitToWhatsApp() {
    const get = id => document.getElementById(id)?.value.trim() ?? '';
    const firstName = get('firstName');
    const lastName  = get('lastName');
    const email     = get('email');
    const company   = get('company');
    const service   = get('service');
    const message   = get('message');

    document.querySelectorAll('.contact-error').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.contact-input, .contact-select')
      .forEach(el => el.classList.remove('contact-input-error'));

    let hasError = false;
    const fieldError = (id, idx) => {
      document.getElementById(id)?.classList.add('contact-input-error');
      document.querySelectorAll('.contact-error')[idx]?.classList.remove('hidden');
      hasError = true;
    };

    if (!firstName)                                           fieldError('firstName', 0);
    if (!lastName)                                            fieldError('lastName',  1);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldError('email',     2);
    if (!message)                                             fieldError('message',   3);
    if (hasError) return;

    const lines = [
      '*New Inquiry — Sumber Sarana Solusindo*',
      '--------------------------------',
      `*Name:* ${firstName} ${lastName}`,
      `*Email:* ${email}`,
      company ? `*Company:* ${company}` : null,
      service ? `*Service:* ${service}` : null,
      '--------------------------------',
      '*Message:*',
      message,
    ].filter(Boolean).join('\n');

    const btn  = document.querySelector('.contact-submit');
    const text = document.getElementById('submitText');
    const icon = document.getElementById('submitIcon');
    if (btn)  btn.disabled = true;
    if (text) text.textContent = 'Opening WhatsApp…';
    if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`;

    window.open(`https://wa.me/628118860355?text=${encodeURIComponent(lines)}`, '_blank');

    setTimeout(() => {
      if (btn)  btn.disabled = false;
      if (text) text.textContent = 'Send via WhatsApp';
      if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>`;
    }, 3000);
  }

  // expose globally (onclick= in HTML)
  window.submitToWhatsApp = submitToWhatsApp;

  // ─── Boot ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
      }, { passive: true });
    }

    // Mobile menu (fallback)
    const menuBtn    = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }

    // Apply saved language
    const savedLang = localStorage.getItem('preferredLanguage') || 'id';
    applyCMMSTranslations(savedLang);
    syncToggleUI(savedLang);

    // Language toggle buttons
    function handleToggle() {
      const next = (localStorage.getItem('preferredLanguage') || 'id') === 'id' ? 'en' : 'id';
      localStorage.setItem('preferredLanguage', next);
      applyCMMSTranslations(next);
      syncToggleUI(next);
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: next } }));
    }

    document.getElementById('languageToggle')?.addEventListener('click', handleToggle);
    document.getElementById('mobileLangToggle')?.addEventListener('click', handleToggle);

    // Also listen for changes dispatched by navbar.js (if loaded)
    document.addEventListener('languageChanged', e => {
      const lang = e.detail?.language;
      if (lang) { applyCMMSTranslations(lang); syncToggleUI(lang); }
    });

    // Countup
    initCountup();

    // Clear contact errors on input
    ['firstName','lastName','email','message'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', function () {
        this.classList.remove('contact-input-error');
        this.closest('div')?.querySelector('.contact-error')?.classList.add('hidden');
      });
    });
  });

})();
