// ============================================
// INTERACTIONS.JS - User-triggered Events
// ============================================

const SiteInteractions = {
  init() {
    this.initContactForm();
    this.initModals();
    this.initCarousels();
    this.initServiceToggle();
    this.initSmoothScroll();
    this.initFormValidation();
    console.log("🎯 Interactions initialized");
  },

  // ============================================
  // CONTACT FORM
  // ============================================
  initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const currentLang = localStorage.getItem("preferredLanguage") || "id";

      // Validate
      if (!this.validateForm(formData, currentLang)) return;

      // Submit to Google Sheets
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzg1fU1izaT0Ur4zXVvDdXQVScYSXbzQle0vqzb0jHv_A0kn02M2ebKh-yztOtS5J5Ktg/exec";

      try {
        await fetch(scriptURL, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        });

        // Create WhatsApp message
        const whatsappMessage = this.createWhatsAppMessage(formData);
        const whatsappLink = `https://wa.me/+6283831062662?text=${encodeURIComponent(whatsappMessage)}`;

        const successMsg =
          currentLang === "en"
            ? "Thank you for your message! You will now be redirected to WhatsApp to send your inquiry."
            : "Terima kasih atas pesan Anda! Anda akan diarahkan ke WhatsApp untuk mengirim pertanyaan Anda.";

        this.showNotification(successMsg, "success");

        setTimeout(() => window.open(whatsappLink, "_blank"), 1000);
        contactForm.reset();
      } catch (err) {
        console.error("Form submission error:", err);
        const errorMsg =
          currentLang === "en"
            ? "Failed to send message. Please try again."
            : "Gagal mengirim pesan. Silakan coba lagi.";
        this.showNotification(errorMsg, "error");
      }
    });
  },

  validateForm(formData, lang) {
    const required = ["firstName", "lastName", "email", "message"];

    for (let field of required) {
      if (!formData.get(field)) {
        const msg =
          lang === "en"
            ? "Please fill in all required fields."
            : "Mohon lengkapi semua kolom yang wajib diisi.";
        this.showNotification(msg, "error");
        return false;
      }
    }

    const email = formData.get("email");
    if (!this.isValidEmail(email)) {
      const msg =
        lang === "en"
          ? "Please enter a valid email address."
          : "Mohon masukkan alamat email yang valid.";
      this.showNotification(msg, "error");
      return false;
    }

    return true;
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  createWhatsAppMessage(formData) {
    let msg = `*New Contact Form Submission*\n\n`;
    msg += `*Name:* ${formData.get("firstName")} ${formData.get("lastName")}\n`;
    msg += `*Email:* ${formData.get("email")}\n`;
    if (formData.get("company"))
      msg += `*Company:* ${formData.get("company")}\n`;
    if (formData.get("service")) {
      const service = this.getServiceDisplayName(formData.get("service"));
      msg += `*Service:* ${service}\n`;
    }
    msg += `\n*Message:*\n${formData.get("message")}`;
    return msg;
  },

  getServiceDisplayName(value) {
    const map = {
      "preventive-maintenance": "Preventive Maintenance",
      electrical: "Electrical Services",
      hvac: "HVAC Services",
      "access-control": "Access Control Systems",
      cctv: "CCTV Installation",
      "website-development": "Website Development",
      "mobile-development": "Mobile App Development",
      cmms: "CMMS Implementation",
      other: "Other",
    };
    return map[value] || value;
  },

  showNotification(message, type = "info") {
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-transform duration-300 translate-x-full`;

    if (type === "success")
      notification.classList.add("bg-green-500", "text-white");
    else if (type === "error")
      notification.classList.add("bg-red-500", "text-white");
    else notification.classList.add("bg-blue-500", "text-white");

    const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="text-lg mr-2">${icon}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.remove("translate-x-full"), 100);
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  },

  // ============================================
  // FORM VALIDATION (Real-time)
  // ============================================
  initFormValidation() {
    const inputs = document.querySelectorAll(
      "#contactForm input, #contactForm select, #contactForm textarea",
    );

    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.classList.add("ring-2", "ring-white/50", "border-white/50");
      });

      input.addEventListener("blur", function () {
        this.classList.remove("ring-2", "ring-white/50");

        if (this.hasAttribute("required") && !this.value.trim()) {
          this.classList.add("border-red-500");
        } else if (
          this.type === "email" &&
          this.value &&
          !SiteInteractions.isValidEmail(this.value)
        ) {
          this.classList.add("border-red-500");
        } else {
          this.classList.remove("border-red-500");
        }
      });

      if (input.type === "email") {
        input.addEventListener("input", function () {
          if (this.value && !SiteInteractions.isValidEmail(this.value)) {
            this.classList.add("border-red-500");
          } else {
            this.classList.remove("border-red-500");
          }
        });
      }
    });
  },

  // ============================================
  // MODAL FUNCTIONALITY
  // ============================================
  initModals() {
    const getQuoteButtons = document.querySelectorAll(".modal-get-quote");

    getQuoteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-modal-id");
        const modal = document.getElementById(modalId);

        if (modal) {
          modal.classList.add("hidden");
          modal.setAttribute("aria-hidden", "true");
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";

          const backdrops = document.querySelectorAll(".modal-backdrop");
          backdrops.forEach((backdrop) => {
            if (backdrop !== modal) backdrop.remove();
          });
        }

        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const offsetTop = contactSection.offsetTop - 100;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      });
    });
  },

  // ============================================
  // CAROUSEL FUNCTIONALITY
  // ============================================
  initCarousels() {
    const modals = [
      "preventive-maintenance",
      "electronic-panel",
      "mobile-apps",
      "charging",
      "cctv",
      "soundsystem",
      "airconditioner",
      "pompa",
      "genset",
      "mobiledev",
      "sumppit",
      "pompa-domestik",
      "ac-lift",
      "access-control-system",
      "access-control-door",
      "access-control-lift",
      "perbaikan-permasalahan-gedung",
      "fresh-air-fan",
    ];

    modals.forEach((modalId) => this.initModalCarousel(modalId));
  },

  initModalCarousel(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const items = modal.querySelectorAll("[data-carousel-item]");
    const prevBtn = modal.querySelector("[data-carousel-prev]");
    const nextBtn = modal.querySelector("[data-carousel-next]");
    const indicators = modal.querySelectorAll(".absolute.bottom-4 button");

    if (items.length === 0) return;

    let currentSlide = 0;

    const showSlide = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle("hidden", i !== index);
        item.classList.toggle("block", i === index);
      });

      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.remove("bg-white/30");
          indicator.classList.add("bg-white/80");
        } else {
          indicator.classList.add("bg-white/30");
          indicator.classList.remove("bg-white/80");
        }
      });

      currentSlide = index;
    };

    showSlide(0);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : items.length - 1;
        showSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = currentSlide < items.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => showSlide(index));
    });
  },

  // ============================================
  // SERVICES TOGGLE (Mobile)
  // ============================================
  initServiceToggle() {
    const toggle = document.getElementById("servicesToggle");
    const grid = document.getElementById("servicesGrid");
    const toggleText = document.getElementById("toggleText");
    const toggleIcon = document.getElementById("toggleIcon");
    const overlay = document.getElementById("servicesOverlay");
    const count = document.getElementById("moreServicesCount");

    if (!toggle || !grid) return;

    let isExpanded = false;

    const updateCount = () => {
      if (!count) return;
      const allCards = grid.querySelectorAll(".group");
      const hidden = Math.max(0, allCards.length - 4);

      if (hidden > 0) {
        count.textContent = `+${hidden}`;
        count.style.display = "block";
      } else {
        count.style.display = "none";
      }
    };

    const toggleServices = () => {
      if (window.innerWidth >= 768) return;

      isExpanded = !isExpanded;
      grid.classList.toggle("expanded", isExpanded);
      toggleIcon.style.transform = isExpanded
        ? "rotate(180deg)"
        : "rotate(0deg)";

      if (overlay) overlay.style.opacity = isExpanded ? "0" : "1";
      if (count) count.style.opacity = isExpanded ? "0" : "1";

      const lang = localStorage.getItem("preferredLanguage") || "id";
      if (window.i18nData?.[lang] && toggleText) {
        toggleText.textContent = isExpanded
          ? window.i18nData[lang].services.seeLess
          : window.i18nData[lang].services.seeMore;
      }

      if (!isExpanded) {
        const section = document.getElementById("details");
        if (section) {
          window.scrollTo({ top: section.offsetTop - 100, behavior: "smooth" });
        }
      }
    };

    const initMobileView = () => {
      if (window.innerWidth < 768) {
        grid.classList.remove("expanded");
        isExpanded = false;
        toggleIcon.style.transform = "rotate(0deg)";
        if (overlay) overlay.style.opacity = "1";
        updateCount();
      } else {
        grid.classList.add("expanded");
        if (overlay) overlay.style.opacity = "0";
        if (count) count.style.display = "none";
      }
    };

    toggle.addEventListener("click", toggleServices);
    window.addEventListener("resize", initMobileView);

    const observer = new MutationObserver(() => updateCount());
    observer.observe(grid, { childList: true, subtree: true });

    initMobileView();
    setTimeout(updateCount, 1000);

    document.addEventListener("languageChanged", (e) => {
      const lang = e.detail.language;
      if (window.i18nData?.[lang] && toggleText) {
        toggleText.textContent = isExpanded
          ? window.i18nData[lang].services.seeLess
          : window.i18nData[lang].services.seeMore;
      }
    });
  },

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;

        e.preventDefault();

        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });

          const mobileMenu = document.getElementById("mobile-menu");
          if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
          }
        }
      });
    });
  },
};

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => SiteInteractions.init());
} else {
  SiteInteractions.init();
}

// Console greeting
console.log(
  "%c🏢 Sumber Sarana Solusindo",
  "color: #0F5F98; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cWebsite loaded successfully!",
  "color: #7AC5FF; font-size: 14px;",
);
console.log(
  "%cBuilt with ❤️ using Tailwind CSS, Alpine.js & GSAP",
  "color: #666; font-size: 12px;",
);
