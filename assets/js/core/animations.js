// ============================================
// ANIMATIONS.JS - All GSAP & Scroll Animations
// ============================================

const SiteAnimations = {
  init() {
    this.initGSAP();
    this.initScrollAnimations();
    console.log("✨ Animations initialized");
  },

  // ============================================
  // GSAP ANIMATIONS
  // ============================================
  initGSAP() {
    // Register GSAP plugins
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // HERO SECTION - Staggered entrance
      this.animateHero();

      // PROJECT CARDS - Hover effects
      this.animateProjects();

      // CMMS SECTION - Image reveal
      this.animateCMMS();
    }
  },

  // Hero Section Animation
  animateHero() {
    const heroElements = document.querySelectorAll(".hero-content");

    if (heroElements.length === 0) return;

    gsap.from(heroElements, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
      clearProps: "all", // Clean up after animation
    });
  },

  // Project Cards Hover (GSAP for precision)
  animateProjects() {
    const projectCards = document.querySelectorAll(".group.relative");

    projectCards.forEach((card) => {
      const overlay = card.querySelector(".absolute.inset-0");
      const content = card.querySelector(".absolute.bottom-0");

      if (!overlay || !content) return;

      // Hover in
      card.addEventListener("mouseenter", () => {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Hover out
      card.addEventListener("mouseleave", () => {
        gsap.to(overlay, {
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.in",
        });

        gsap.to(content, {
          y: 10,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  },

  // CMMS Section - Scroll-triggered image reveal
  animateCMMS() {
    const cmmsImage = document.querySelector("#cmms img");
    const cmmsContent = document.querySelector("#cmms .space-y-6");

    if (!cmmsImage || !cmmsContent) return;

    // Image slide-in from left
    gsap.from(cmmsImage, {
      scrollTrigger: {
        trigger: "#cmms",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        once: true,
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Content fade-in from right
    gsap.from(cmmsContent.children, {
      scrollTrigger: {
        trigger: "#cmms",
        start: "top 80%",
        once: true,
      },
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  },

  // ============================================
  // SCROLL ANIMATIONS (Simple fade-ups)
  // ============================================
  initScrollAnimations() {
    // Use Intersection Observer for simple fade-ups
    const fadeElements = document.querySelectorAll("[data-fade-up]");

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      fadeObserver.observe(el);
    });

    // Projects section header
    const projectsHeader = document.querySelector("#projects .text-center");
    if (projectsHeader) {
      projectsHeader.setAttribute("data-fade-up", "");
      projectsHeader.style.opacity = "0";
      projectsHeader.style.transform = "translateY(20px)";
      projectsHeader.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
      fadeObserver.observe(projectsHeader);
    }

    // About section cards
    const aboutCards = document.querySelectorAll("#about .bg-white\\/10");
    aboutCards.forEach((card, index) => {
      card.setAttribute("data-fade-up", "");
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      fadeObserver.observe(card);
    });
  },
};

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => SiteAnimations.init());
} else {
  SiteAnimations.init();
}
