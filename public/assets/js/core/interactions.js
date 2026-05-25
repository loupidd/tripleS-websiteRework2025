// ============================================
// INTERACTIONS.JS — OOP rewrite
// All original SiteInteractions logic preserved inside a class.
// Smooth scroll now delegates to Lenis if available (via window.app).
// ============================================

class Interactions {
  /** @param {{ i18n: I18n }} deps */
  constructor({ i18n }) {
    this.i18n = i18n;

    this._initContactForm();
    this._initModals();
    this._initCarousels();
    this._initServiceToggle();
    this._initSmoothScroll();
    this._initFormValidation();

    // Keep submitToWhatsApp global for the inline onclick in the HTML
    window.submitToWhatsApp = () => this._submitToWhatsApp();

    this._consoleGreeting();
  }

  // ============================================
  // CONTACT FORM (Google Sheets + WhatsApp)
  // ============================================
  _initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const lang = this.i18n.lang;

      if (!this._validateForm(formData, lang)) return;

      const scriptURL =
        'https://script.google.com/macros/s/AKfycbzg1fU1izaT0Ur4zXVvDdXQVScYSXbzQle0vqzb0jHv_A0kn02M2ebKh-yztOtS5J5Ktg/exec';

      try {
        await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });

        const waMsg  = this._buildWhatsAppMessage(formData);
        const waLink = `https://wa.me/+6283831062662?text=${encodeURIComponent(waMsg)}`;

        const successMsg = lang === 'en'
          ? 'Thank you! You will now be redirected to WhatsApp.'
          : 'Terima kasih! Anda akan diarahkan ke WhatsApp.';

        this._showNotification(successMsg, 'success');
        setTimeout(() => window.open(waLink, '_blank'), 1000);
        contactForm.reset();
      } catch (err) {
        console.error('[Interactions] Form error:', err);
        const errorMsg = lang === 'en'
          ? 'Failed to send. Please try again.'
          : 'Gagal mengirim. Silakan coba lagi.';
        this._showNotification(errorMsg, 'error');
      }
    });
  }

  // WhatsApp-only submit (used by the onclick button in index.html)
  _submitToWhatsApp() {
    const get = id => document.getElementById(id)?.value.trim() ?? '';
    const firstName = get('firstName');
    const lastName  = get('lastName');
    const email     = get('email');
    const company   = get('company');
    const service   = get('service');
    const message   = get('message');

    // Clear previous errors
    document.querySelectorAll('.contact-error')
      .forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.contact-input, .contact-select')
      .forEach(el => el.classList.remove('contact-input-error'));

    let hasError = false;
    if (!firstName)                                  { this._fieldError('firstName', 0); hasError = true; }
    if (!lastName)                                   { this._fieldError('lastName',  1); hasError = true; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this._fieldError('email', 2); hasError = true;
    }
    if (!message)                                    { this._fieldError('message',   3); hasError = true; }
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

    const waUrl = `https://wa.me/628118860355?text=${encodeURIComponent(lines)}`;

    // Button feedback
    const btn  = document.querySelector('.contact-submit');
    const text = document.getElementById('submitText');
    const icon = document.getElementById('submitIcon');
    if (btn)  btn.disabled = true;
    if (text) text.textContent = this.i18n.lang === 'en' ? 'Opening WhatsApp…' : 'Membuka WhatsApp…';
    if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`;

    window.open(waUrl, '_blank');

    setTimeout(() => {
      if (btn)  btn.disabled = false;
      if (text) text.textContent = this.i18n.lang === 'en' ? 'Send via WhatsApp' : 'Kirim via WhatsApp';
      if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>`;
    }, 3000);
  }

  _fieldError(fieldId, errorIndex) {
    document.getElementById(fieldId)?.classList.add('contact-input-error');
    document.querySelectorAll('.contact-error')[errorIndex]?.classList.remove('hidden');
  }

  _validateForm(formData, lang) {
    const required = ['firstName', 'lastName', 'email', 'message'];
    for (const field of required) {
      if (!formData.get(field)) {
        const msg = lang === 'en'
          ? 'Please fill in all required fields.'
          : 'Mohon lengkapi semua kolom yang wajib diisi.';
        this._showNotification(msg, 'error');
        return false;
      }
    }
    if (!this._isValidEmail(formData.get('email'))) {
      const msg = lang === 'en'
        ? 'Please enter a valid email address.'
        : 'Mohon masukkan alamat email yang valid.';
      this._showNotification(msg, 'error');
      return false;
    }
    return true;
  }

  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  _buildWhatsAppMessage(formData) {
    const serviceMap = {
      'preventive-maintenance': 'Preventive Maintenance',
      electrical:               'Electrical Services',
      hvac:                     'HVAC Services',
      'access-control':         'Access Control Systems',
      cctv:                     'CCTV Installation',
      'website-development':    'Website Development',
      'mobile-development':     'Mobile App Development',
      cmms:                     'CMMS Implementation',
      other:                    'Other',
    };
    let msg = `*New Contact Form Submission*\n\n`;
    msg += `*Name:* ${formData.get('firstName')} ${formData.get('lastName')}\n`;
    msg += `*Email:* ${formData.get('email')}\n`;
    if (formData.get('company')) msg += `*Company:* ${formData.get('company')}\n`;
    if (formData.get('service')) {
      const svc = serviceMap[formData.get('service')] || formData.get('service');
      msg += `*Service:* ${svc}\n`;
    }
    msg += `\n*Message:*\n${formData.get('message')}`;
    return msg;
  }

  _showNotification(message, type = 'info') {
    document.querySelector('.notification')?.remove();

    const el = document.createElement('div');
    el.className = 'notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-transform duration-300 translate-x-full';

    if (type === 'success') el.classList.add('bg-green-500', 'text-white');
    else if (type === 'error') el.classList.add('bg-red-500', 'text-white');
    else el.classList.add('bg-blue-500', 'text-white');

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    el.innerHTML = `<div class="flex items-center gap-2"><span class="text-lg">${icon}</span><span>${message}</span></div>`;

    document.body.appendChild(el);
    setTimeout(() => el.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      el.classList.add('translate-x-full');
      setTimeout(() => el.remove(), 300);
    }, 5000);
  }

  // ============================================
  // FORM VALIDATION (real-time, original logic)
  // ============================================
  _initFormValidation() {
    const inputs = document.querySelectorAll(
      '#contactForm input, #contactForm select, #contactForm textarea'
    );
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.classList.add('ring-2', 'ring-white/50', 'border-white/50');
      });
      input.addEventListener('blur', function () {
        this.classList.remove('ring-2', 'ring-white/50');
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.classList.add('border-red-500');
        } else if (
          this.type === 'email' && this.value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)
        ) {
          this.classList.add('border-red-500');
        } else {
          this.classList.remove('border-red-500');
        }
      });
      if (input.type === 'email') {
        input.addEventListener('input', function () {
          if (this.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            this.classList.add('border-red-500');
          } else {
            this.classList.remove('border-red-500');
          }
        });
      }
      // Clear contact-input-error on type
      input.addEventListener('input', function () {
        this.classList.remove('contact-input-error');
        this.closest('div')?.querySelector('.contact-error')?.classList.add('hidden');
      });
    });
  }

  // ============================================
  // MODALS (original logic, unchanged)
  // ============================================
  _initModals() {
    document.querySelectorAll('.modal-get-quote').forEach(btn => {
      btn.addEventListener('click', function () {
        const modal = document.getElementById(this.getAttribute('data-modal-id'));
        if (modal) {
          modal.classList.add('hidden');
          modal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          document.querySelectorAll('.modal-backdrop').forEach(b => {
            if (b !== modal) b.remove();
          });
        }
        const contact = document.getElementById('contact');
        if (contact) window.scrollTo({ top: contact.offsetTop - 100, behavior: 'smooth' });
      });
    });
  }

  // ============================================
  // CAROUSELS (original logic, unchanged)
  // ============================================
  _initCarousels() {
    const modals = [
      'preventive-maintenance', 'electronic-panel', 'mobile-apps', 'charging',
      'cctv', 'soundsystem', 'airconditioner', 'pompa', 'genset', 'mobiledev',
      'sumppit', 'pompa-domestik', 'ac-lift', 'access-control-system',
      'access-control-door', 'access-control-lift', 'perbaikan-permasalahan-gedung',
      'fresh-air-fan',
    ];
    modals.forEach(id => this._initModalCarousel(id));
  }

  _initModalCarousel(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const items      = modal.querySelectorAll('[data-carousel-item]');
    const prevBtn    = modal.querySelector('[data-carousel-prev]');
    const nextBtn    = modal.querySelector('[data-carousel-next]');
    const indicators = modal.querySelectorAll('.absolute.bottom-4 button');
    if (!items.length) return;

    let current = 0;

    const show = idx => {
      items.forEach((item, i) => {
        item.classList.toggle('hidden', i !== idx);
        item.classList.toggle('block', i === idx);
      });
      indicators.forEach((ind, i) => {
        ind.classList.toggle('bg-white/80', i === idx);
        ind.classList.toggle('bg-white/30', i !== idx);
      });
      current = idx;
    };

    show(0);
    prevBtn?.addEventListener('click', () => show(current > 0 ? current - 1 : items.length - 1));
    nextBtn?.addEventListener('click', () => show(current < items.length - 1 ? current + 1 : 0));
    indicators.forEach((ind, i) => ind.addEventListener('click', () => show(i)));
  }

  // ============================================
  // SERVICES TOGGLE — mobile (original logic)
  // ============================================
  _initServiceToggle() {
    const toggle   = document.getElementById('servicesToggle');
    const grid     = document.getElementById('servicesGrid');
    const toggleTx = document.getElementById('toggleText');
    const toggleIc = document.getElementById('toggleIcon');
    const overlay  = document.getElementById('servicesOverlay');
    const count    = document.getElementById('moreServicesCount');

    if (!toggle || !grid) return;

    let isExpanded = false;

    const updateCount = () => {
      if (!count) return;
      const hidden = Math.max(0, grid.querySelectorAll('.services-grid-card').length - 4);
      count.textContent = hidden > 0 ? `+${hidden}` : '';
      count.style.display = hidden > 0 ? 'block' : 'none';
    };

    const initMobileView = () => {
      if (window.innerWidth < 768) {
        grid.classList.remove('expanded');
        isExpanded = false;
        if (toggleIc) toggleIc.style.transform = 'rotate(0deg)';
        if (overlay)  { overlay.style.opacity = '1'; overlay.style.pointerEvents = 'auto'; }
        updateCount();
        if (toggle.parentElement) toggle.parentElement.style.display = 'flex';
      } else {
        grid.classList.add('expanded');
        if (overlay)  { overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }
        if (count)    count.style.display = 'none';
        if (toggle.parentElement) toggle.parentElement.style.display = 'none';
      }
    };

    toggle.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;
      isExpanded = !isExpanded;
      grid.classList.toggle('expanded', isExpanded);
      if (toggleIc) toggleIc.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      if (overlay)  { overlay.style.opacity = isExpanded ? '0' : '1'; overlay.style.pointerEvents = isExpanded ? 'none' : 'auto'; }
      if (count)    count.style.opacity = isExpanded ? '0' : '1';
      if (toggleTx) toggleTx.textContent = this.i18n.t(isExpanded ? 'services.seeLess' : 'services.seeMore');
      if (!isExpanded) {
        const sec = document.getElementById('details');
        if (sec) window.scrollTo({ top: sec.offsetTop - 100, behavior: 'smooth' });
      }
    });

    window.addEventListener('resize', initMobileView);

    new MutationObserver(() => {
      updateCount();
      setTimeout(initMobileView, 100);
    }).observe(grid, { childList: true, subtree: true });

    initMobileView();
    setTimeout(updateCount, 1000);

    document.addEventListener('languageChanged', () => {
      if (toggleTx) toggleTx.textContent = this.i18n.t(isExpanded ? 'services.seeLess' : 'services.seeMore');
    });
  }

  // ============================================
  // SMOOTH SCROLL (delegates to Lenis if ready)
  // ============================================
  _initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();

        const target = document.getElementById(href.substring(1));
        if (!target) return;

        // Use Lenis if available, otherwise native scroll
        const lenis = window.app?.animations?.lenis;
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = 'auto';
        }
      });
    });
  }

  // ============================================
  // CONSOLE GREETING (original)
  // ============================================
  _consoleGreeting() {
    console.log('%cSumber Sarana Solusindo', 'color:#0F5F98;font-size:20px;font-weight:bold;');
    console.log('%cWebsite loaded successfully!', 'color:#7AC5FF;font-size:14px;');
    console.log('%cBuilt using Tailwind CSS, Alpine.js & GSAP', 'color:#666;font-size:12px;');
  }
}

window.Interactions = Interactions;
