// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const company = formData.get("company");
      const service = formData.get("service");
      const message = formData.get("message");

      // Get current language for messages
      const currentLang = localStorage.getItem("preferredLanguage") || "id";

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        const errorMsg =
          currentLang === "en"
            ? "Please fill in all required fields."
            : "Mohon lengkapi semua kolom yang wajib diisi.";
        showNotification(errorMsg, "error");
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        const errorMsg =
          currentLang === "en"
            ? "Please enter a valid email address."
            : "Mohon masukkan alamat email yang valid.";
        showNotification(errorMsg, "error");
        return;
      }

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
        let whatsappMessage = `*New Contact Form Submission*\n\n`;
        whatsappMessage += `*Name:* ${firstName} ${lastName}\n`;
        whatsappMessage += `*Email:* ${email}\n`;
        if (company) whatsappMessage += `*Company:* ${company}\n`;
        if (service) {
          const serviceText = getServiceDisplayName(service);
          whatsappMessage += `*Service Interested In:* ${serviceText}\n`;
        }
        whatsappMessage += `\n*Message:*\n${message}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp link
        const whatsappLink = `https://wa.me/+6283831062662?text=${encodedMessage}`;

        // Show success message and open WhatsApp
        const successMsg =
          currentLang === "en"
            ? "Thank you for your message! You will now be redirected to WhatsApp to send your inquiry."
            : "Terima kasih atas pesan Anda! Anda akan diarahkan ke WhatsApp untuk mengirim pertanyaan Anda.";
        showNotification(successMsg, "success");

        // Small delay before opening WhatsApp
        setTimeout(() => {
          window.open(whatsappLink, "_blank");
        }, 1000);

        // Reset form
        contactForm.reset();
      } catch (err) {
        console.error("Form submission error:", err);
        const errorMsg =
          currentLang === "en"
            ? "Failed to send message. Please try again."
            : "Gagal mengirim pesan. Silakan coba lagi.";
        showNotification(errorMsg, "error");
      }
    });
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to get service display name
function getServiceDisplayName(serviceValue) {
  const serviceMap = {
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
  return serviceMap[serviceValue] || serviceValue;
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-transform duration-300 translate-x-full`;

  // Set colors based on type
  if (type === "success") {
    notification.classList.add("bg-green-500", "text-white");
  } else if (type === "error") {
    notification.classList.add("bg-red-500", "text-white");
  } else {
    notification.classList.add("bg-blue-500", "text-white");
  }

  // Add icon and message
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  notification.innerHTML = `
        <div class="flex items-center">
            <span class="text-lg mr-2">${icon}</span>
            <span>${message}</span>
        </div>
    `;

  // Add to document
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return; // Skip empty anchors

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      }
    });
  });
});

// ============================================
// FORM INPUT ANIMATIONS AND VALIDATION
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const formInputs = document.querySelectorAll(
    "#contactForm input, #contactForm select, #contactForm textarea"
  );

  formInputs.forEach((input) => {
    // Add focus animations
    input.addEventListener("focus", function () {
      this.classList.add("ring-2", "ring-blue-500", "border-blue-500");
    });

    input.addEventListener("blur", function () {
      this.classList.remove("ring-2", "ring-blue-500");

      // Add validation styling
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.classList.add("border-red-500");
        this.classList.remove("border-blue-500");
      } else if (
        this.type === "email" &&
        this.value &&
        !isValidEmail(this.value)
      ) {
        this.classList.add("border-red-500");
        this.classList.remove("border-blue-500");
      } else {
        this.classList.remove("border-red-500");
        this.classList.add("border-gray-300");
      }
    });

    // Real-time validation for email
    if (input.type === "email") {
      input.addEventListener("input", function () {
        if (this.value && !isValidEmail(this.value)) {
          this.classList.add("border-red-500");
          this.classList.remove("border-gray-300");
        } else {
          this.classList.remove("border-red-500");
          this.classList.add("border-gray-300");
        }
      });
    }
  });
});

// ============================================
// MOBILE SERVICES COLLAPSE FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const servicesToggle = document.getElementById("servicesToggle");
  const servicesGrid = document.getElementById("servicesGrid");
  const toggleText = document.getElementById("toggleText");
  const toggleIcon = document.getElementById("toggleIcon");
  const servicesOverlay = document.getElementById("servicesOverlay");
  const moreServicesCount = document.getElementById("moreServicesCount");

  let isExpanded = false;

  function updateServiceCount() {
    if (servicesGrid && moreServicesCount) {
      const allCards = servicesGrid.querySelectorAll(".group");
      const visibleOnMobile = 4;
      const hiddenCount = Math.max(0, allCards.length - visibleOnMobile);

      if (hiddenCount > 0) {
        moreServicesCount.textContent = `+${hiddenCount}`;
        moreServicesCount.style.display = "block";
      } else {
        moreServicesCount.style.display = "none";
      }
    }
  }

  function toggleServices() {
    if (window.innerWidth < 768) {
      // Only apply on mobile
      isExpanded = !isExpanded;
      servicesGrid.classList.toggle("expanded", isExpanded);
      toggleIcon.style.transform = isExpanded
        ? "rotate(180deg)"
        : "rotate(0deg)";

      if (servicesOverlay) {
        servicesOverlay.style.opacity = isExpanded ? "0" : "1";
      }

      if (moreServicesCount) {
        moreServicesCount.style.opacity = isExpanded ? "0" : "1";
      }

      // Update text based on current language
      const currentLang = localStorage.getItem("preferredLanguage") || "id";
      if (window.i18nData && window.i18nData[currentLang]) {
        const translations = window.i18nData[currentLang];
        toggleText.textContent = isExpanded
          ? translations.services.seeLess
          : translations.services.seeMore;
      }

      // Smooth scroll when collapsing
      if (!isExpanded) {
        const servicesSection = document.getElementById("details");
        if (servicesSection) {
          const offsetTop = servicesSection.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  }

  function initializeMobileView() {
    if (window.innerWidth < 768) {
      // Initialize collapsed state on mobile
      servicesGrid.classList.remove("expanded");
      isExpanded = false;

      // Set initial text based on current language
      const currentLang = localStorage.getItem("preferredLanguage") || "id";
      if (window.i18nData && window.i18nData[currentLang] && toggleText) {
        const translations = window.i18nData[currentLang];
        toggleText.textContent = translations.services.seeMore;
      }

      toggleIcon.style.transform = "rotate(0deg)";

      // Show overlay and badge
      if (servicesOverlay) servicesOverlay.style.opacity = "1";
      updateServiceCount();
    } else {
      // Always show all services on desktop
      servicesGrid.classList.add("expanded");
      if (servicesOverlay) servicesOverlay.style.opacity = "0";
      if (moreServicesCount) moreServicesCount.style.display = "none";
    }
  }

  // Initialize on load
  if (servicesToggle && servicesGrid) {
    initializeMobileView();

    // Handle toggle click
    servicesToggle.addEventListener("click", toggleServices);

    // Handle window resize
    window.addEventListener("resize", initializeMobileView);

    // Update count when cards are loaded
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          updateServiceCount();
        }
      });
    });

    observer.observe(servicesGrid, { childList: true, subtree: true });

    // Initial count update
    setTimeout(updateServiceCount, 1000);
  }

  // Listen for language changes to update toggle button
  document.addEventListener("languageChanged", function (e) {
    const lang = e.detail.language;
    if (window.i18nData && window.i18nData[lang] && toggleText) {
      const translations = window.i18nData[lang];
      toggleText.textContent = isExpanded
        ? translations.services.seeLess
        : translations.services.seeMore;
    }
  });
});

// ============================================
// MODAL GET QUOTE FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const getQuoteButtons = document.querySelectorAll(".modal-get-quote");

  getQuoteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal-id");

      // Close the modal properly
      const modal = document.getElementById(modalId);
      if (modal) {
        // Hide the modal
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");

        // Remove backdrop and restore body scroll
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        // Remove any backdrop elements
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((backdrop) => {
          if (backdrop !== modal) {
            backdrop.remove();
          }
        });

        // Force remove modal backdrop classes
        setTimeout(() => {
          modal.style.backgroundColor = "";
          modal.style.backdropFilter = "";
        }, 100);
      }

      // Navigate to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const offsetTop = contactSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// ============================================
// MODAL CAROUSEL FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modal carousels
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

  modals.forEach((modalId) => {
    initializeModalCarousel(modalId);
  });

  function initializeModalCarousel(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const carouselItems = modal.querySelectorAll("[data-carousel-item]");
    const prevButton = modal.querySelector("[data-carousel-prev]");
    const nextButton = modal.querySelector("[data-carousel-next]");
    const indicators = modal.querySelectorAll(".absolute.bottom-4 button");

    if (carouselItems.length === 0) return;

    let currentSlide = 0;

    // Initialize carousel
    function showSlide(index) {
      carouselItems.forEach((item, i) => {
        if (i === index) {
          item.classList.remove("hidden");
          item.classList.add("block");
        } else {
          item.classList.add("hidden");
          item.classList.remove("block");
        }
      });

      // Update indicators
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
    }

    // Initialize first slide
    showSlide(0);

    // Previous button
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        currentSlide =
          currentSlide > 0 ? currentSlide - 1 : carouselItems.length - 1;
        showSlide(currentSlide);
      });
    }

    // Next button
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        currentSlide =
          currentSlide < carouselItems.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
      });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", function () {
        showSlide(index);
      });
    });

    // Auto-play (optional)
    // setInterval(() => {
    //     currentSlide = currentSlide < carouselItems.length - 1 ? currentSlide + 1 : 0;
    //     showSlide(currentSlide);
    // }, 5000);
  }
});

// ============================================
// CONSOLE GREETING
// ============================================
console.log(
  "%c🏢 Sumber Sarana Solusindo",
  "color: #0F5F98; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cWebsite loaded successfully!",
  "color: #7AC5FF; font-size: 14px;"
);
console.log(
  "%cBuilt with ❤️ using Tailwind CSS, Alpine.js & GSAP",
  "color: #666; font-size: 12px;"
);
