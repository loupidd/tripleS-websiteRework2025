// ============================================
// ANIMATIONS.JS — OOP class
// GSAP + ScrollTrigger + IntersectionObserver.
// Lenis removed — it conflicted with navbar.js
// smooth scroll and caused slingshot/stutter.
// Rive and Lottie hooks kept as opt-in APIs.
// ============================================

class Animations {
  constructor() {
    this.lenis = null; // reserved — not used
    this._riveMap = new Map();
    this._lottieSet = new Set();

    this._initGSAP();
  }

  // ─── GSAP + ScrollTrigger ────────────────────────────────────────────
  _initGSAP() {
    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    this._animateHero();
    this._animateProjects();
    this._animateCMMS();
    this._animateScrollReveal();
    this._initFadeObserver();
  }

  // ─── Hero entrance ───────────────────────────────────────────────────
  _animateHero() {
    const els = document.querySelectorAll(".hero-content");
    if (!els.length) return;
    gsap.from(els, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
      clearProps: "all",
    });
  }

  // ─── Project card hovers ─────────────────────────────────────────────
  _animateProjects() {
    document.querySelectorAll(".group.relative").forEach((card) => {
      const overlay = card.querySelector(".absolute.inset-0");
      const content = card.querySelector(".absolute.bottom-0");
      if (!overlay || !content) return;
      card.addEventListener("mouseenter", () => {
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(content, { y: 0, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(overlay, { opacity: 0.7, duration: 0.3, ease: "power2.in" });
        gsap.to(content, { y: 10, duration: 0.3, ease: "power2.in" });
      });
    });
  }

  // ─── CMMS section scroll reveal ──────────────────────────────────────
  _animateCMMS() {
    if (typeof ScrollTrigger === "undefined") return;
    const img = document.querySelector("#cmms img");
    const content = document.querySelector("#cmms .space-y-6");
    if (!img || !content) return;

    gsap.from(img, {
      scrollTrigger: { trigger: "#cmms", start: "top 80%", once: true },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(content.children, {
      scrollTrigger: { trigger: "#cmms", start: "top 80%", once: true },
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }

  // ─── Generic reveal classes ──────────────────────────────────────────
  _animateScrollReveal() {
    if (typeof ScrollTrigger === "undefined") return;

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power2.out",
      });
    });

    gsap.utils.toArray(".reveal-stagger").forEach((parent) => {
      const kids = parent.querySelectorAll(".reveal-child");
      if (!kids.length) return;
      gsap.from(kids, {
        scrollTrigger: {
          trigger: parent,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      });
    });
  }

  // ─── IntersectionObserver fade-up ────────────────────────────────────
  _initFadeObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    const watch = (el, delay = 0) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`;
      observer.observe(el);
    };

    document.querySelectorAll("[data-fade-up]").forEach((el) => watch(el));

    const projHeader = document.querySelector("#projects .text-center");
    if (projHeader && !projHeader.hasAttribute("data-fade-up"))
      watch(projHeader);

    document
      .querySelectorAll("#about .bg-white\\/10")
      .forEach((card, i) => watch(card, i * 0.1));
  }

  // ─── Rive (opt-in) ───────────────────────────────────────────────────
  attachRive(target, src, opts = {}) {
    if (typeof rive === "undefined") {
      console.warn("[Animations] Rive not loaded.");
      return null;
    }
    const canvas =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!canvas) return null;
    const instance = new rive.Rive({
      src,
      canvas,
      autoplay: true,
      stateMachines: opts.stateMachines ?? "default",
      layout: new rive.Layout({
        fit: opts.fit ?? rive.Fit.Cover,
        alignment: opts.alignment ?? rive.Alignment.Center,
      }),
      ...opts,
    });
    this._riveMap.set(canvas, instance);
    return instance;
  }
  getRive(target) {
    const canvas =
      typeof target === "string" ? document.querySelector(target) : target;
    return this._riveMap.get(canvas) ?? null;
  }

  // ─── Lottie (opt-in) ─────────────────────────────────────────────────
  attachLottie(containerId, src, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container || !customElements.get("lottie-player")) return null;
    const player = document.createElement("lottie-player");
    player.setAttribute("src", src);
    player.setAttribute("background", opts.background ?? "transparent");
    player.setAttribute("speed", String(opts.speed ?? 1));
    if (opts.loop !== false) player.setAttribute("loop", "");
    if (opts.autoplay !== false) player.setAttribute("autoplay", "");
    player.style.width = opts.width ?? "100%";
    player.style.height = opts.height ?? "100%";
    container.innerHTML = "";
    container.appendChild(player);
    this._lottieSet.add(player);
    return player;
  }
  pauseAllLottie() {
    this._lottieSet.forEach((p) => p.pause?.());
  }
  resumeAllLottie() {
    this._lottieSet.forEach((p) => p.play?.());
  }

  destroy() {
    this._riveMap.forEach((r) => r.cleanup?.());
    this._riveMap.clear();
    this._lottieSet.clear();
  }
}
