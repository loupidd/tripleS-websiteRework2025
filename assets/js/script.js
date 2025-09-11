// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const company = formData.get('company');
            const service = formData.get('service');
            const message = formData.get('message');

            // Validate required fields
            if (!firstName || !lastName || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

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
            showNotification('Thank you for your message! You will now be redirected to WhatsApp to send your inquiry.', 'success');

            // Small delay before opening WhatsApp
            setTimeout(() => {
                window.open(whatsappLink, '_blank');
            }, 1000);

            // Reset form
            contactForm.reset();
        });
    }
});

// Language Switching Functionality
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'hero.title.line1': 'Your Trustworthy',
        'hero.title.line2': 'Building Equipment Service',
        'hero.subtitle': 'We provide technology-based mechanical & electrical services with advanced CMMS integration for optimal building performance.',
        'hero.cta.consultation': 'Request Consultation',
        'hero.cta.work': 'View Our Work',
        'hero.scroll': 'Scroll to Explore',
        'cmms.badge': '🚀 TECHNOLOGY POWERED',
        'cmms.title': 'Supported with',
        'cmms.title.highlight': 'CMMS Web App',
        'cmms.description': 'Optimize your building maintenance with intelligent CMMS! Manage maintenance, monitor assets, and prevent downtime, all in one centralized system.',
        'cmms.features.backup': 'Automatic Backup',
        'cmms.features.security': 'Data Security',
        'cmms.features.efficiency': 'High Efficiency',
        'cmms.features.monitoring': 'Real-time Monitoring',
        'cmms.cta': 'Learn More About CMMS',
        'projects.badge': '🏢 OUR PORTFOLIO',
        'projects.title': 'Active Projects We\'re',
        'projects.title.highlight': 'Proud Of',
        'projects.subtitle': 'Discover our latest building maintenance and technology projects that showcase our expertise and commitment to excellence.',
        'projects.essence.description': 'Comprehensive building maintenance system with advanced CMMS integration for luxury residential complex.',
        'projects.niffaro.description': 'Modern office complex featuring smart building technology and comprehensive facility management systems.',
        'projects.status.active': 'Active',
        'projects.location': 'Jakarta',
        'services.badge': '🔧 OUR SERVICES',
        'services.title': 'Comprehensive Building',
        'services.title.highlight': 'Maintenance Solutions',
        'services.subtitle': 'Explore our wide range of professional services designed to keep your building operating at peak performance with cutting-edge technology and expert craftsmanship.',
        'services.toggle.view': 'View All Services',
        'services.toggle.less': 'Show Less',
        'services.preventive': 'Preventive Maintenance',
        'services.electronic': 'Electronic Panel',
        'services.website': 'Website Development',
        'services.charging': 'EV Charging',
        'services.cctv': 'CCTV',
        'services.sound': 'Sound System',
        'services.ac': 'Air Conditioner',
        'services.pompa': 'Water Pump',
        'services.genset': 'Generator',
        'services.mobile': 'App Development',
        'services.sumppit': 'Sump Pit Pump',
        'services.domestic': 'Domestic Pump',
        'services.button': 'View Details',
        'about.title': 'Why Choose Sumber Sarana Solusindo?',
        'about.subtitle': 'Your trusted partner for comprehensive building maintenance and technology solutions. We specialize in mechanical & electrical services, backed by cutting-edge CMMS technology.',
        'about.certified.title': 'Certified Professionals',
        'about.certified.desc': 'Our team consists of certified technicians with years of experience in building maintenance and technology solutions.',
        'about.emergency.title': '24/7 Emergency Service',
        'about.emergency.desc': 'Round-the-clock emergency support to ensure your building operations never stop working optimally.',
        'about.cmms.title': 'CMMS Technology',
        'about.cmms.desc': 'Advanced Computerized Maintenance Management System for optimal building performance and data security.',
        'contact.title': 'Get In Touch With Us',
        'contact.subtitle': 'Ready to optimize your building maintenance? Contact us for a professional consultation.',
        'contact.form.title': 'Send us a Message',
        'contact.form.firstname': 'First Name *',
        'contact.form.lastname': 'Last Name *',
        'contact.form.email': 'Email Address *',
        'contact.form.company': 'Company',
        'contact.form.service': 'Select a service',
        'contact.form.message': 'Tell us about your project requirements...',
        'contact.form.submit': 'Send Message',
        'contact.info.title': 'Contact Information',
        'contact.info.phone': 'Phone',
        'contact.info.email': 'Email',
        'contact.info.office': 'Office',
        'contact.info.hours': 'Hours',
        'contact.info.hours.weekday': 'Mon-Fri: 8AM-6PM',
        'contact.info.hours.emergency': 'Emergency: 24/7',
        'contact.info.assistance': 'For immediate assistance:',
        'contact.info.whatsapp': 'WhatsApp',
        'contact.info.call': 'Call Now',
        'modal.badge.maintenance': '🔧 MAINTENANCE SERVICE',
        'modal.badge.electrical': '⚡ ELECTRICAL SERVICE',
        'modal.badge.development': '💻 DEVELOPMENT SERVICE',
        'modal.badge.charging': '🔋 CHARGING SERVICE',
        'modal.badge.security': '📹 SECURITY SERVICE',
        'modal.preventive.title': 'Preventive',
        'modal.preventive.title.highlight': 'Maintenance',
        'modal.preventive.description': 'Our experts are ready to identify and fix all building problems, from structure to facilities, ensuring your building is always in optimal condition to prevent unwanted disruptions.',
        'modal.preventive.feature1': 'Scheduled Inspections',
        'modal.preventive.feature2': 'CMMS Integration',
        'modal.preventive.feature3': '24/7 Emergency Response',
        'modal.electronic.title': 'Electronic',
        'modal.electronic.title.highlight': 'Panel',
        'modal.electronic.description': 'Uninterrupted electronic performance! Routine maintenance keeps electronic components clean, well-connected, and damage-free, ensuring maximum performance and long device life.',
        'modal.electronic.feature1': 'Panel Installation',
        'modal.electronic.feature2': 'Circuit Testing',
        'modal.electronic.feature3': 'Safety Compliance',
        'modal.website.title': 'Website',
        'modal.website.title.highlight': 'Development',
        'modal.website.description': 'Build a stunning digital identity! With our Custom Website Development service, we create attractive, responsive websites tailored to your business needs, ensuring an unforgettable user experience.',
        'modal.website.feature1': 'Custom Design',
        'modal.website.feature2': 'Responsive Layout',
        'modal.website.feature3': 'SEO Optimization',
        'modal.charging.title': 'EV',
        'modal.charging.title.highlight': 'Charging',
        'modal.charging.description': 'Safe and efficient electric vehicle charging! We ensure your EV Charger is in prime condition, with strong connections and the latest software, so you can charge your vehicle with peace of mind and speed.',
        'modal.charging.feature1': 'Fast Charging',
        'modal.charging.feature2': 'Safety Certified',
        'modal.charging.feature3': 'Smart Monitoring',
        'modal.cctv.title': 'CCTV',
        'modal.cctv.title.highlight': 'System',
        'modal.cctv.description': 'Guaranteed clarity and security! We keep your CCTV in the best condition, from clean lenses to strong connections, ensuring every recording is sharp and no moment is missed.',
        'modal.cctv.feature1': 'HD Recording',
        'modal.cctv.feature2': 'Remote Monitoring',
        'modal.cctv.feature3': '24/7 Surveillance',
        'modal.button.quote': 'Get Quote',
        'modal.button.close': 'Close'
    },
    id: {
        'nav.home': 'Beranda',
        'nav.projects': 'Proyek',
        'nav.services': 'Layanan',
        'nav.about': 'Tentang',
        'nav.contact': 'Kontak',
        'hero.title.line1': 'Layanan Peralatan Gedung',
        'hero.title.line2': 'Terpercaya Anda',
        'hero.subtitle': 'Kami menyediakan layanan mekanikal & elektrikal berbasis teknologi dengan integrasi CMMS canggih untuk performa gedung yang optimal.',
        'hero.cta.consultation': 'Minta Konsultasi',
        'hero.cta.work': 'Lihat Karya Kami',
        'hero.scroll': 'Gulir untuk Jelajahi',
        'cmms.badge': '🚀 DIDUKUNG TEKNOLOGI',
        'cmms.title': 'Didukung dengan',
        'cmms.title.highlight': 'CMMS Web App',
        'cmms.description': 'Optimalkan perawatan gedung Anda dengan CMMS yang cerdas! Kelola pemeliharaan, pantau aset, dan cegah downtime, semuanya dalam satu sistem terpusat.',
        'cmms.features.backup': 'Backup Otomatis',
        'cmms.features.security': 'Keamanan Data',
        'cmms.features.efficiency': 'Efisiensi Tinggi',
        'cmms.features.monitoring': 'Monitoring Real-time',
        'cmms.cta': 'Pelajari Lebih Lanjut Tentang CMMS',
        'projects.badge': '🏢 PORTFOLIO KAMI',
        'projects.title': 'Proyek Aktif yang Kami',
        'projects.title.highlight': 'Banggakan',
        'projects.subtitle': 'Temukan proyek pemeliharaan gedung dan teknologi terbaru kami yang menunjukkan keahlian dan komitmen kami terhadap keunggulan.',
        'projects.essence.description': 'Sistem pemeliharaan gedung komprehensif dengan integrasi CMMS canggih untuk kompleks residensial mewah.',
        'projects.niffaro.description': 'Kompleks perkantoran modern dengan teknologi gedung pintar dan sistem manajemen fasilitas yang komprehensif.',
        'projects.status.active': 'Aktif',
        'projects.location': 'Jakarta',
        'services.badge': '🔧 LAYANAN KAMI',
        'services.title': 'Solusi Pemeliharaan',
        'services.title.highlight': 'Gedung Komprehensif',
        'services.subtitle': 'Jelajahi berbagai layanan profesional kami yang dirancang untuk menjaga gedung Anda beroperasi dengan performa puncak menggunakan teknologi canggih dan keahlian ahli.',
        'services.toggle.view': 'Lihat Semua Layanan',
        'services.toggle.less': 'Tampilkan Lebih Sedikit',
        'services.preventive': 'Preventive Maintenance',
        'services.electronic': 'Panel Elektronik',
        'services.website': 'Pengembangan Website',
        'services.charging': 'Pengisian EV',
        'services.cctv': 'CCTV',
        'services.sound': 'Sistem Suara',
        'services.ac': 'AC',
        'services.pompa': 'Pompa',
        'services.genset': 'Genset',
        'services.mobile': 'Pengembangan Aplikasi',
        'services.sumppit': 'Pompa Sump Pit',
        'services.domestic': 'Pompa Domestik',
        'services.button': 'Lihat Detail',
        'about.title': 'Mengapa Memilih Sumber Sarana Solusindo?',
        'about.subtitle': 'Partner terpercaya Anda untuk solusi pemeliharaan gedung dan teknologi komprehensif. Kami mengkhususkan diri dalam layanan mekanikal & elektrikal, didukung oleh teknologi CMMS canggih.',
        'about.certified.title': 'Profesional Bersertifikat',
        'about.certified.desc': 'Tim kami terdiri dari teknisi bersertifikat dengan pengalaman bertahun-tahun dalam pemeliharaan gedung dan solusi teknologi.',
        'about.emergency.title': 'Layanan Darurat 24/7',
        'about.emergency.desc': 'Dukungan darurat sepanjang waktu untuk memastikan operasional gedung Anda tidak pernah berhenti bekerja secara optimal.',
        'about.cmms.title': 'Teknologi CMMS',
        'about.cmms.desc': 'Sistem Manajemen Pemeliharaan Terkomputerisasi canggih untuk performa gedung optimal dan keamanan data.',
        'contact.title': 'Hubungi Kami',
        'contact.subtitle': 'Siap mengoptimalkan pemeliharaan gedung Anda? Hubungi kami untuk konsultasi profesional.',
        'contact.form.title': 'Kirim Pesan',
        'contact.form.firstname': 'Nama Depan *',
        'contact.form.lastname': 'Nama Belakang *',
        'contact.form.email': 'Alamat Email *',
        'contact.form.company': 'Perusahaan',
        'contact.form.service': 'Pilih layanan',
        'contact.form.message': 'Ceritakan tentang kebutuhan proyek Anda...',
        'contact.form.submit': 'Kirim Pesan',
        'contact.info.title': 'Informasi Kontak',
        'contact.info.phone': 'Telepon',
        'contact.info.email': 'Email',
        'contact.info.office': 'Kantor',
        'contact.info.hours': 'Jam Kerja',
        'contact.info.hours.weekday': 'Sen-Jum: 8AM-6PM',
        'contact.info.hours.emergency': 'Darurat: 24/7',
        'contact.info.assistance': 'Untuk bantuan segera:',
        'contact.info.whatsapp': 'WhatsApp',
        'contact.info.call': 'Telepon Sekarang',
        'modal.badge.maintenance': '🔧 LAYANAN PEMELIHARAAN',
        'modal.badge.electrical': '⚡ LAYANAN ELEKTRIKAL',
        'modal.badge.development': '💻 LAYANAN PENGEMBANGAN',
        'modal.badge.charging': '🔋 LAYANAN PENGISIAN',
        'modal.badge.security': '📹 LAYANAN KEAMANAN',
        'modal.preventive.title': 'Preventive',
        'modal.preventive.title.highlight': 'Maintenance',
        'modal.preventive.description': 'Ahli kami siap mengidentifikasi dan memperbaiki segala permasalahan bangunan, dari struktur hingga fasilitas, memastikan gedung Anda selalu dalam kondisi optimal untuk mencegah gangguan yang tidak diinginkan.',
        'modal.preventive.feature1': 'Inspeksi Terjadwal',
        'modal.preventive.feature2': 'Integrasi CMMS',
        'modal.preventive.feature3': 'Respons Darurat 24/7',
        'modal.electronic.title': 'Panel',
        'modal.electronic.title.highlight': 'Elektronik',
        'modal.electronic.description': 'Performa elektronik tanpa gangguan! Perawatan rutin menjaga komponen elektronik tetap bersih, terhubung dengan baik, dan bebas dari kerusakan, sehingga memastikan kinerja maksimal dan umur panjang perangkat Anda.',
        'modal.electronic.feature1': 'Instalasi Panel',
        'modal.electronic.feature2': 'Pengujian Sirkuit',
        'modal.electronic.feature3': 'Kepatuhan Keselamatan',
        'modal.website.title': 'Pengembangan',
        'modal.website.title.highlight': 'Website',
        'modal.website.description': 'Bangun identitas digital yang memukau! Dengan layanan Custom Website Development, kami menciptakan situs web yang menarik, responsif, dan disesuaikan dengan kebutuhan bisnis Anda, memastikan pengalaman pengguna yang tak terlupakan.',
        'modal.website.feature1': 'Desain Kustom',
        'modal.website.feature2': 'Layout Responsif',
        'modal.website.feature3': 'Optimasi SEO',
        'modal.charging.title': 'Pengisian',
        'modal.charging.title.highlight': 'EV',
        'modal.charging.description': 'Pengisian kendaraan listrik yang aman dan efisien! Kami memastikan EV Charger Anda dalam kondisi prima, dengan koneksi yang kuat dan perangkat lunak terbaru, sehingga Anda dapat mengisi daya kendaraan dengan tenang dan cepat.',
        'modal.charging.feature1': 'Pengisian Cepat',
        'modal.charging.feature2': 'Bersertifikat Aman',
        'modal.charging.feature3': 'Monitoring Pintar',
        'modal.cctv.title': 'Sistem',
        'modal.cctv.title.highlight': 'CCTV',
        'modal.cctv.description': 'Kejelasan dan keamanan terjamin! Kami menjaga CCTV Anda dalam kondisi terbaik, mulai dari lensa yang bersih hingga koneksi yang kuat, memastikan setiap rekaman tajam dan tidak ada momen yang terlewat.',
        'modal.cctv.feature1': 'Rekaman HD',
        'modal.cctv.feature2': 'Monitoring Remote',
        'modal.cctv.feature3': 'Pengawasan 24/7',
        'modal.button.quote': 'Minta Penawaran',
        'modal.button.close': 'Tutup'
    }
};

let currentLanguage = 'id';

// Language switching functionality
document.addEventListener('DOMContentLoaded', function () {
    const languageToggle = document.getElementById('languageToggle');
    const currentLangDisplay = document.getElementById('currentLang');

    // Load saved language preference or default to Indonesian
    const savedLang = localStorage.getItem('preferredLanguage') || 'id';
    currentLanguage = savedLang;
    updateLanguage(currentLanguage);

    if (languageToggle) {
        languageToggle.addEventListener('click', function () {
            currentLanguage = currentLanguage === 'en' ? 'id' : 'en';
            updateLanguage(currentLanguage);
            localStorage.setItem('preferredLanguage', currentLanguage);
        });
    }

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update language display
        if (currentLangDisplay) {
            currentLangDisplay.textContent = lang.toUpperCase();
        }

        // Update services toggle text
        updateServicesToggleText(lang);

        // Update form placeholders
        updateFormPlaceholders(lang);
    }

    function updateServicesToggleText(lang) {
        const toggleText = document.getElementById('toggleText');
        const servicesGrid = document.getElementById('servicesGrid');

        if (toggleText && servicesGrid) {
            const isExpanded = servicesGrid.classList.contains('expanded');
            if (isExpanded) {
                toggleText.textContent = translations[lang]['services.toggle.less'];
            } else {
                toggleText.textContent = translations[lang]['services.toggle.view'];
            }
        }
    }

    function updateFormPlaceholders(lang) {
        const placeholderMap = {
            'firstName': 'contact.form.firstname',
            'lastName': 'contact.form.lastname',
            'email': 'contact.form.email',
            'company': 'contact.form.company',
            'message': 'contact.form.message'
        };

        Object.keys(placeholderMap).forEach(id => {
            const element = document.getElementById(id);
            if (element && translations[lang][placeholderMap[id]]) {
                element.placeholder = translations[lang][placeholderMap[id]];
            }
        });

        // Update service select options
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && translations[lang]['contact.form.service']) {
            const firstOption = serviceSelect.querySelector('option[value=""]');
            if (firstOption) {
                firstOption.textContent = translations[lang]['contact.form.service'];
            }
        }
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to get service display name
function getServiceDisplayName(serviceValue) {
    const serviceMap = {
        'preventive-maintenance': 'Preventive Maintenance',
        'electrical': 'Electrical Services',
        'hvac': 'HVAC Services',
        'access-control': 'Access Control Systems',
        'cctv': 'CCTV Installation',
        'website-development': 'Website Development',
        'mobile-development': 'Mobile App Development',
        'cmms': 'CMMS Implementation',
        'other': 'Other'
    };
    return serviceMap[serviceValue] || serviceValue;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-transform duration-300 translate-x-full`;

    // Set colors based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }

    // Add icon and message
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
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
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('md:text-blue-700');
                    navLink.classList.add('text-white');
                });

                this.classList.remove('text-white');
                this.classList.add('md:text-blue-700');
            }
        });
    });
});

// Form input animations and validation feedback
document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function () {
            this.classList.add('ring-2', 'ring-blue-500', 'border-blue-500');
        });

        input.addEventListener('blur', function () {
            this.classList.remove('ring-2', 'ring-blue-500');

            // Add validation styling
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('border-red-500');
                this.classList.remove('border-blue-500');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-blue-500');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });

        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function () {
                if (this.value && !isValidEmail(this.value)) {
                    this.classList.add('border-red-500');
                    this.classList.remove('border-gray-300');
                } else {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-gray-300');
                }
            });
        }
    });
});

// Enhanced Mobile Services Collapse Functionality
document.addEventListener('DOMContentLoaded', function () {
    const servicesToggle = document.getElementById('servicesToggle');
    const servicesGrid = document.getElementById('servicesGrid');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');
    const servicesOverlay = document.getElementById('servicesOverlay');
    const moreServicesCount = document.getElementById('moreServicesCount');

    if (servicesToggle && servicesGrid) {
        let isExpanded = false;
        const serviceCards = servicesGrid.querySelectorAll('.group');
        const totalServices = serviceCards.length;
        const visibleServicesOnMobile = 4;
        const hiddenServicesCount = totalServices - visibleServicesOnMobile;

        // Update the badge count
        if (moreServicesCount && hiddenServicesCount > 0) {
            moreServicesCount.textContent = `+${hiddenServicesCount}`;
        }

        function toggleServices() {
            if (window.innerWidth < 768) { // Only apply on mobile
                if (isExpanded) {
                    // Collapse - show only first 4 with animation
                    servicesGrid.classList.remove('expanded');

                    // Update button text
                    toggleText.textContent = currentLanguage === 'en' ? 'See More Services' : 'Lihat Layanan Lainnya';
                    toggleIcon.style.transform = 'rotate(0deg)';

                    // Show overlay and badge
                    if (servicesOverlay) servicesOverlay.style.opacity = '1';
                    if (moreServicesCount) {
                        moreServicesCount.style.display = 'block';
                        moreServicesCount.textContent = `+${hiddenServicesCount}`;
                    }

                    isExpanded = false;

                    // Smooth scroll to services section when collapsing
                    const servicesSection = document.getElementById('details');
                    if (servicesSection) {
                        const offsetTop = servicesSection.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Expand - show all with animation
                    servicesGrid.classList.add('expanded');

                    // Update button text
                    toggleText.textContent = currentLanguage === 'en' ? 'Show Less' : 'Tampilkan Lebih Sedikit';
                    toggleIcon.style.transform = 'rotate(180deg)';

                    // Hide overlay and badge
                    if (servicesOverlay) servicesOverlay.style.opacity = '0';
                    if (moreServicesCount) moreServicesCount.style.display = 'none';

                    isExpanded = true;
                }
            }
        }

        function initializeMobileView() {
            if (window.innerWidth < 768) {
                // Initialize collapsed state on mobile
                servicesGrid.classList.remove('expanded');
                isExpanded = false;

                // Set initial text based on current language
                toggleText.textContent = currentLanguage === 'en' ? 'See More Services' : 'Lihat Layanan Lainnya';
                toggleIcon.style.transform = 'rotate(0deg)';

                // Show overlay and badge
                if (servicesOverlay) servicesOverlay.style.opacity = '1';
                if (moreServicesCount) {
                    moreServicesCount.style.display = 'block';
                    moreServicesCount.textContent = `+${hiddenServicesCount}`;
                }
            } else {
                // Always show all services on desktop
                servicesGrid.classList.add('expanded');
                if (servicesOverlay) servicesOverlay.style.opacity = '0';
                if (moreServicesCount) moreServicesCount.style.display = 'none';
            }
        }

        // Initialize on load
        initializeMobileView();

        // Handle toggle click
        servicesToggle.addEventListener('click', toggleServices);

        // Handle window resize
        window.addEventListener('resize', initializeMobileView);
    }
});

// Modal Get Quote Functionality
document.addEventListener('DOMContentLoaded', function () {
    const getQuoteButtons = document.querySelectorAll('.modal-get-quote');

    getQuoteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal-id');

            // Close the modal properly
            const modal = document.getElementById(modalId);
            if (modal) {
                // Hide the modal
                modal.classList.add('hidden');
                modal.setAttribute('aria-hidden', 'true');

                // Remove backdrop and restore body scroll
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';

                // Remove any backdrop elements
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => {
                    if (backdrop !== modal) {
                        backdrop.remove();
                    }
                });

                // Force remove modal backdrop classes
                setTimeout(() => {
                    modal.style.backgroundColor = '';
                    modal.style.backdropFilter = '';
                }, 100);
            }

            // Navigate to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced Modal Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modal carousels - both old and new format
    const modals = ['preventive-maintenance', 'electronic-panel', 'mobile-apps', 'charging', 'cctv', 'soundsystem', 'airconditioner', 'pompa', 'genset', 'mobiledev', 'sumppit', 'pompa-domestik', 'ac-lift', 'access-control-system', 'access-control-door', 'access-control-lift', 'perbaikan-permasalahan-gedung', 'fresh-air-fan'];

    modals.forEach(modalId => {
        initializeModalCarousel(modalId);
    });

    function initializeModalCarousel(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const carouselItems = modal.querySelectorAll('[data-carousel-item]');
        const prevButton = modal.querySelector('[data-carousel-prev]');
        const nextButton = modal.querySelector('[data-carousel-next]');
        const indicators = modal.querySelectorAll('.absolute.bottom-4 button');

        if (carouselItems.length === 0) return;

        let currentSlide = 0;

        // Initialize carousel
        function showSlide(index) {
            carouselItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.remove('hidden');
                    item.classList.add('block');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('block');
                }
            });

            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.remove('bg-white/30');
                    indicator.classList.add('bg-white/80');
                } else {
                    indicator.classList.add('bg-white/30');
                    indicator.classList.remove('bg-white/80');
                }
            });

            currentSlide = index;
        }

        // Initialize first slide
        showSlide(0);

        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', function () {
                currentSlide = currentSlide > 0 ? currentSlide - 1 : carouselItems.length - 1;
                showSlide(currentSlide);
            });
        }

        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', function () {
                currentSlide = currentSlide < carouselItems.length - 1 ? currentSlide + 1 : 0;
                showSlide(currentSlide);
            });
        }

        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function () {
                showSlide(index);
            });
        });
    }
});

// Form Response Script

const scriptURL = "https://script.google.com/macros/s/AKfycbzg1fU1izaT0Ur4zXVvDdXQVScYSXbzQle0vqzb0jHv_A0kn02M2ebKh-yztOtS5J5Ktg/exec";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        // mode no-cors is acceptable (opaque success), but if you want debug response set mode omitted
        await fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" });
        alert("✅ Pesan terkirim (front-end).");
        form.reset();
    } catch (err) {
        console.error("Fetch error:", err);
        alert("❌ Gagal mengirim.");
    }
});




