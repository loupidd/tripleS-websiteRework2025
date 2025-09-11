document.addEventListener('DOMContentLoaded', function() {
    // === Language Toggle Functionality ===
    const desktopToggle = document.getElementById('languageToggle');
    const mobileToggle = document.getElementById('mobileLangToggle');
    const desktopIdText = document.getElementById('desktopIdText');
    const desktopEnText = document.getElementById('desktopEnText');
    const mobileIdText = document.getElementById('mobileIdText');
    const mobileEnText = document.getElementById('mobileEnText');

    // Get stored language or default to Indonesian
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'id';

    // Internationalization functions
    function getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    function updateLanguageDisplay(language) {
        const isEnglish = language === 'en';
        
        // Update desktop toggle
        if (desktopToggle && desktopIdText && desktopEnText) {
            desktopToggle.classList.toggle('active', isEnglish);
            desktopIdText.style.opacity = isEnglish ? '0.6' : '1';
            desktopEnText.style.opacity = isEnglish ? '1' : '0.6';
        }
        
        // Update mobile toggle
        if (mobileToggle && mobileIdText && mobileEnText) {
            mobileToggle.classList.toggle('active', isEnglish);
            mobileIdText.style.opacity = isEnglish ? '0.6' : '1';
            mobileEnText.style.opacity = isEnglish ? '1' : '0.6';
        }
        
        currentLanguage = language;
        
        // Store language preference
        localStorage.setItem('preferredLanguage', language);
        
        // Apply translations with smooth animation
        applyTranslations(language);
        
        console.log('Language changed to:', currentLanguage);
    }

    function applyTranslations(language) {
        if (!window.i18nData || !window.i18nData[language]) {
            console.warn('Translation data not available for language:', language);
            return;
        }

        const translations = window.i18nData[language];
        const body = document.body;

        // Add switching animation class
        body.classList.add('lang-switching');
        body.classList.remove('lang-switched');

        // Apply translations after a short delay for smooth animation
        setTimeout(() => {
            // Update elements with data-i18n attributes
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedProperty(translations, key);
                if (translation) {
                    // Handle HTML content (for descriptions with spans)
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
                const translation = getNestedProperty(translations, key);
                if (translation) {
                    element.placeholder = translation;
                }
            });

            // Update select options
            document.querySelectorAll('[data-i18n-select]').forEach(select => {
                const categoryKey = select.getAttribute('data-i18n-select');
                const category = getNestedProperty(translations, categoryKey);
                if (category) {
                    select.querySelectorAll('option[data-i18n]').forEach(option => {
                        const optionKey = option.getAttribute('data-i18n').split('.').pop();
                        if (category[optionKey]) {
                            option.textContent = category[optionKey];
                        }
                    });
                }
            });

            // Complete animation
            body.classList.remove('lang-switching');
            body.classList.add('lang-switched');

            // Remove switched class after animation
            setTimeout(() => {
                body.classList.remove('lang-switched');
            }, 300);

            // Trigger custom event for other parts of the application
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: currentLanguage } 
            }));
        }, 100);
    }

    function toggleLanguage() {
        const newLanguage = currentLanguage === 'id' ? 'en' : 'id';
        updateLanguageDisplay(newLanguage);
    }

    // Desktop language toggle event
    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleLanguage);
    }

    // Mobile language toggle event
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleLanguage);
    }

    // === Mobile Menu Functionality ===
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMobileMenu() {
        if (mobileMenuButton && mobileMenu) {
            const isOpen = mobileMenu.classList.contains('active');
            
            mobileMenuButton.classList.toggle('active', !isOpen);
            mobileMenu.classList.toggle('active', !isOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'auto' : 'hidden';
            
            // Update button accessibility
            mobileMenuButton.setAttribute('aria-expanded', !isOpen);
            mobileMenu.setAttribute('aria-hidden', isOpen);
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                toggleMobileMenu();
            }
        }
    });

    // Close mobile menu on window resize (desktop breakpoint)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // === Active Navigation Item Management ===
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
    
    function updateActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = href.split('/').pop() || 'index.html';
                if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Update active nav item on page load
    updateActiveNavItem();

    // === Navbar Scroll Effects ===
    const navbar = document.querySelector('.navbar-scroll');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        
        if (navbar) {
            // Add scrolled class when scrolled down
            navbar.classList.toggle('scrolled', scrollY > 50);
            
            // Optional: Hide navbar when scrolling down, show when scrolling up
            if (scrollY > lastScrollY && scrollY > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbarOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

    // === Smooth Scrolling for Anchor Links ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Keyboard Navigation Support ===
    document.addEventListener('keydown', function(event) {
        // Close mobile menu with Escape key
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Toggle language with Alt+L
        if (event.altKey && event.key === 'l') {
            event.preventDefault();
            toggleLanguage();
        }
        
        // Toggle mobile menu with Alt+M
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            if (window.innerWidth < 768) {
                toggleMobileMenu();
            }
        }
    });

    // === Performance Optimization ===
    // Debounce function for expensive operations
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // === Accessibility Enhancements ===
    // Focus management for mobile menu
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            const isTabPressed = e.key === 'Tab';

            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Apply focus trapping when mobile menu is open
    if (mobileMenu) {
        mobileMenu.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                trapFocus(this);
                // Focus first item in mobile menu
                const firstMenuItem = this.querySelector('.mobile-nav-item');
                if (firstMenuItem) firstMenuItem.focus();
            }
        });
    }

    // === Initialize ===
    console.log('Enhanced navbar initialized successfully');
    
    // Wait for i18n data to be available
    const initializeLanguage = () => {
        if (window.i18nData) {
            updateLanguageDisplay(currentLanguage);
        } else {
            setTimeout(initializeLanguage, 50);
        }
    };
    
    initializeLanguage();
    
    // Initial navbar state
    updateNavbarOnScroll();
});

// === Global Utility Functions ===
window.TripleSNavbar = {
    toggleLanguage: function() {
        const event = new Event('click');
        const toggle = document.getElementById('languageToggle') || document.getElementById('mobileLangToggle');
        if (toggle) toggle.dispatchEvent(event);
    },
    
    getCurrentLanguage: function() {
        return window.currentLanguage || 'id';
    },
    
    setLanguage: function(lang) {
        if (['id', 'en'].includes(lang)) {
            const event = new CustomEvent('languageChanged', { detail: { language: lang } });
            document.dispatchEvent(event);
        }
    }
};
