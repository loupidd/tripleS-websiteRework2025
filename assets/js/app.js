// Alpine.js Navbar Component
function navbarComponent() {
    return {
        currentLang: localStorage.getItem('preferredLanguage') || 'id',
        mobileMenuOpen: false,
        scrolled: false,

        init() {
            // Initialize scroll listener
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
                this.updateNavbarAppearance();
            });

            // Apply initial language
            this.applyLanguage(this.currentLang);
            
            // Close mobile menu on route changes
            window.addEventListener('hashchange', () => {
                this.closeMobileMenu();
            });

            // Close mobile menu on resize to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    this.closeMobileMenu();
                }
            });
        },

        toggleLanguage() {
            this.currentLang = this.currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('preferredLanguage', this.currentLang);
            this.applyLanguage(this.currentLang);
            
            // Smooth language switch animation
            gsap.to(document.body, {
                opacity: 0.7,
                duration: 0.2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(document.body, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        },

        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
            
            // GSAP animation for mobile menu
            if (this.mobileMenuOpen) {
                gsap.fromTo('#mobile-menu', {
                    opacity: 0,
                    y: -20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        },

        closeMobileMenu() {
            if (this.mobileMenuOpen) {
                this.mobileMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        },

        updateNavbarAppearance() {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (this.scrolled) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        },

        applyLanguage(language) {
            if (!window.i18nData || !window.i18nData[language]) {
                console.warn('Translation data not available for language:', language);
                return;
            }

            const translations = window.i18nData[language];

            // Update elements with data-i18n attributes
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.getNestedProperty(translations, key);
                if (translation) {
                    if (key.includes('description') && translation.includes('<span')) {
                        element.innerHTML = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            });

            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.getNestedProperty(translations, key);
                if (translation) {
                    element.placeholder = translation;
                }
            });

            // Update select options
            document.querySelectorAll('[data-i18n-select]').forEach(select => {
                const categoryKey = select.getAttribute('data-i18n-select');
                const category = this.getNestedProperty(translations, categoryKey);
                if (category) {
                    select.querySelectorAll('option[data-i18n]').forEach(option => {
                        const optionKey = option.getAttribute('data-i18n').split('.').pop();
                        if (category[optionKey]) {
                            option.textContent = category[optionKey];
                        }
                    });
                }
            });
        },

        getNestedProperty(obj, path) {
            return path.split('.').reduce((current, key) => current && current[key], obj);
        }
    };
}

// GSAP Animations System
class GSAPAnimations {
    constructor() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        this.initializeAnimations();
    }

    initializeAnimations() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setupHeroAnimations();
            this.setupScrollAnimations();
            this.setupHoverAnimations();
            this.setupServiceCardAnimations();
        });
    }

    setupHeroAnimations() {
        // Hero section entrance animation
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.fromTo('.hero-content', {
            opacity: 0,
            y: 50,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Typing animation enhancement
        gsap.set('.autotyping-hitech', { opacity: 0 });
        gsap.to('.autotyping-hitech', {
            opacity: 1,
            duration: 0.5,
            delay: 1.5,
            ease: "power2.out"
        });

        // Floating elements animation
        gsap.to('.animate-bounce', {
            y: -20,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.3
        });
    }

    setupScrollAnimations() {
        // Navbar scroll behavior
        ScrollTrigger.create({
            start: "top -80",
            end: "bottom bottom",
            onUpdate: (self) => {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    if (self.direction === -1) {
                        // Scrolling up
                        gsap.to(navbar, {
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    } else if (self.progress > 0.1) {
                        // Scrolling down (after initial scroll)
                        gsap.to(navbar, {
                            y: -100,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                }
            }
        });

        // Section reveal animations
        gsap.utils.toArray('section:not(#home)').forEach(section => {
            gsap.fromTo(section.children, {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Service cards stagger animation
        gsap.fromTo('.services-grid-card', {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '#details',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }

    setupServiceCardAnimations() {
        // Enhanced hover animations for service cards
        document.querySelectorAll('.services-grid-card').forEach(card => {
            const button = card.querySelector('button');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                if (button) {
                    gsap.to(button, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                if (button) {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    setupHoverAnimations() {
        // CTA buttons pulse effect
        document.querySelectorAll('a[href="#contact"]').forEach(cta => {
            cta.addEventListener('mouseenter', () => {
                gsap.to(cta, {
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(122, 197, 255, 0.3)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            cta.addEventListener('mouseleave', () => {
                gsap.to(cta, {
                    scale: 1,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Logo glow animation
        const logo = document.querySelector('.logo-glow');
        if (logo) {
            gsap.to(logo, {
                filter: "drop-shadow(0 0 20px rgba(122, 197, 255, 0.8))",
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    }

    // Utility method for custom animations
    animateElement(element, animation) {
        return gsap.to(element, animation);
    }

    // Method to create scroll-triggered animations
    createScrollTrigger(element, animation, triggerOptions = {}) {
        return gsap.fromTo(element, animation.from, {
            ...animation.to,
            scrollTrigger: {
                trigger: element,
                ...triggerOptions
            }
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    window.gsapAnimations = new GSAPAnimations();
    
    // Initialize auto typing (if library is loaded)
    if (typeof AutoTyping !== 'undefined') {
        const exampleText = ['Hi-Tech'];
        const exampleTyping = new AutoTyping('.autotyping-hitech', exampleText, {
            typeSpeed: 60,
            deleteSpeed: 50,
            waitBeforeDelete: 2000,
            waitBetweenWords: 500,
        });
        exampleTyping.start();
    }
});

// Global utilities
window.TripleSAnimations = {
    animateElement: (element, animation) => {
        return gsap.to(element, animation);
    },
    
    createScrollAnimation: (element, animation, trigger) => {
        return gsap.fromTo(element, animation.from, {
            ...animation.to,
            scrollTrigger: trigger
        });
    }
};
