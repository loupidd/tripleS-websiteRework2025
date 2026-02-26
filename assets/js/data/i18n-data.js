// Internationalization Data for Sumber Sarana Solusindo Website
const i18nData = {
  id: {
    // Navigation
    nav: {
      home: "Beranda",
      projects: "Proyek",
      services: "Layanan",
      about: "Tentang Kami",
      contact: "Kontak",
      cmms: "CMMS",
    },

    // Hero Section
    hero: {
      company: "SUMBER SARANA SOLUSINDO",
      title: {
        line1: "Mitra Terpercaya",
        line2: "Layanan Peralatan Gedung Anda",
      },
      subtitle:
        "Kami menyediakan layanan mekanikal dan elektrikal berbasis teknologi dengan integrasi CMMS canggih untuk performa gedung yang optimal.",
      cta: {
        consultation: "Hubungi Kami",
        work: "Lihat Layanan Kami",
      },
      scrollIndicator: "Gulir untuk Menjelajahi",
    },

    // CMMS Section
    cmms: {
      badge: "TEKNOLOGI TERDEPAN",
      title: "Didukung dengan",
      titleHighlight: "Aplikasi Web CMMS",
      description:
        "Optimalkan perawatan gedung Anda dengan CMMS yang cerdas! Kelola pemeliharaan, pantau aset, dan cegah downtime dalam satu sistem terpusat yang aman dan efisien.",
      features: {
        autoBackup: "Cadangan Otomatis",
        dataSecurity: "Keamanan Data",
        highEfficiency: "Efisiensi Tinggi",
        realTimeMonitoring: "Pemantauan Real-time",
      },
      cta: "Pelajari Lebih Lanjut tentang CMMS",

      // CMMS Page specific
      hero: {
        badge: "Didukung Teknologi · CMMS",
        title1: "Didukung dengan",
        title2: "Aplikasi Web CMMS",
        desc: "Optimalkan perawatan MEP gedung Anda dengan CMMS yang cerdas — kelola work order, pantau aset, dan cegah downtime dalam satu sistem terpusat yang aman dan efisien.",
      },

      // System Map section
      map: {
        badge: "Arsitektur Sistem",
        title1: "Bagaimana Semua",
        title2: " Terhubung",
        desc: "Setiap modul saling terhubung — dari laporan kerusakan di lapangan hingga persetujuan digital manajemen, setiap tindakan terekam dalam satu rantai terintegrasi.",
      },

      // Highlights section
      highlights: {
        badge: "Modul Utama",
        title1: "Keunggulan",
        title2: " Sistem",
        desc: "Delapan modul yang saling terhubung mencakup setiap aspek pemeliharaan MEP — dari operasi lapangan hingga persetujuan eksekutif.",
      },

      // Cards
      card: {
        num1: "Keunggulan 01",
        title1: "Manajemen Work Order",
        desc1:
          "Empat jenis work order — Pemeliharaan Preventif, Pemeliharaan Korektif, Sertifikasi, dan Trouble Report. Masing-masing mengikuti alur kerja tersendiri dengan penugasan otomatis, pelacakan progres, dan jalur eskalasi.",

        num2: "Keunggulan 02",
        title2: "Trouble Report → Tautan Work Order",
        desc2:
          "Setiap Trouble Report yang dikirimkan dapat langsung dieskalasi menjadi Work Order formal. Ini menciptakan rantai keterlacakan otomatis — dari keluhan lapangan hingga resolusi dan persetujuan, menghilangkan celah tindak lanjut manual.",

        num3: "Keunggulan 03",
        title3: "Daftar & Manajemen Pengguna",
        desc3:
          "Direktori pengguna lengkap dengan manajemen profil, visibilitas beban kerja, dan pelacakan penugasan. Pengguna terikat pada peran dan lokasi tertentu yang memastikan penugasan tugas yang akurat dan dapat diaudit.",

        num4: "Keunggulan 04",
        title4: "Manajemen Jadwal",
        desc4:
          "Mesin penjadwalan terpadu yang terhubung ke Work Order dan Trouble Report. Jadwal pemeliharaan preventif secara otomatis menghasilkan WO pada tanggal jatuh tempo, sementara Trouble Report dapat dijadwalkan untuk timeline resolusi yang terlacak.",

        num5: "Keunggulan 05",
        title5: "Daftar Peralatan → Work Order",
        desc5:
          "Registri peralatan lengkap yang terhubung langsung ke Work Order. Setiap aset membawa riwayat lengkap aktivitas pemeliharaan, sertifikasi, dan trouble report. Teknisi dapat melihat rekam layanan lengkap setiap peralatan.",

        num6: "Keunggulan 06",
        title6: "Pilihan Lokasi & Tautan Peran Pengguna",
        desc6:
          "Dukungan multi-lokasi dengan visibilitas data yang dibatasi per lokasi. Setiap pengguna ditugaskan ke satu atau lebih lokasi dan akses data mereka otomatis dibatasi. Teknisi di Lokasi A tidak dapat melihat atau mengubah data Lokasi B kecuali diotorisasi.",

        num7: "Keunggulan 07",
        title7: "Otoritas Berbasis Peran",
        desc7:
          "Sistem izin terperinci di seluruh modul. Peran didefinisikan di tingkat sistem — Admin, Supervisor, Teknisi, Approver, dan Viewer — masing-masing dengan hak akses tepat per modul. Izin berjenjang dari tingkat lokasi hingga tindakan pengguna individual.",

        num8: "Keunggulan 08",
        title8: "Sistem Persetujuan Digital",
        desc8:
          "Alur kerja persetujuan digital end-to-end yang terhubung ke semua tindakan sistem utama — pembuatan WO, penutupan WO, eskalasi Trouble Report, penerbitan Sertifikasi, dan perubahan Jadwal. Persetujuan multi-level dengan tanda tangan bertanda waktu menggantikan tanda tangan berbasis kertas sepenuhnya.",
      },

      // Process flow section
      flow: {
        badge: "Alur Kerja End-to-End",
        title1: "Alur",
        title2: " Proses",
        desc: "Dari kerusakan di lapangan hingga work order yang ditutup dan disetujui secara digital — lihat bagaimana sistem menangani setiap langkah secara otomatis.",
      },

      // Stats
      stats: {
        equipments: "Peralatan",
        maintenance: "Aktivitas Pemeliharaan",
        companies: "Perusahaan",
        workers: "Teknisi",
      },

      // Tags (pill labels)
      tag: {
        preventive: "Preventif",
        corrective: "Korektif",
        certification: "Sertifikasi",
        troubleReport: "Trouble Report",
        autoEscalation: "Eskalasi Otomatis",
        traceability: "Keterlacakan",
        rootCause: "Tautan Akar Masalah",
        userProfiles: "Profil Pengguna",
        workloadTracking: "Pelacakan Beban Kerja",
        assignmentHistory: "Riwayat Penugasan",
        autoWO: "Pembuatan WO Otomatis",
        calendarView: "Tampilan Kalender",
        deadlineAlerts: "Pengingat Tenggat",
        assetRegistry: "Registri Aset",
        serviceHistory: "Riwayat Layanan",
        woLinkage: "Tautan WO",
        multiSite: "Multi-Lokasi",
        dataScoping: "Pembatasan Data",
        accessControl: "Kontrol Akses",
        multiLevel: "Multi-Level",
        timestamped: "Bertanda Waktu",
        paperless: "Tanpa Kertas",
        auditTrail: "Jejak Audit",
        troubleReportModule: "Modul Trouble Report",
        equipmentRegistry: "Registri Peralatan",
        siteScope: "Cakupan Lokasi",
        workOrderModule: "Modul Work Order",
        userList: "Daftar Pengguna",
        roleAuthority: "Otoritas Peran",
        scheduleModule: "Modul Jadwal",
        preventiveCalendar: "Kalender Preventif",
        conflictDetection: "Deteksi Konflik",
        equipmentLog: "Log Peralatan",
        technicianProfile: "Profil Teknisi",
        realtimeUpdate: "Pembaruan Real-time",
        digitalApproval: "Persetujuan Digital",
        trClosure: "Penutupan TR",
        equipmentUpdate: "Pembaruan Peralatan",
      },

      // Contact (CMMS page specific)
      contact: {
        eyebrow: "Hubungi Kami",
        title: "Mari Membangun Sesuatu",
        titleHighlight: "Bersama",
        subtitle:
          "Siap mengoptimalkan pemeliharaan gedung Anda? Hubungi kami untuk konsultasi profesional.",
        formTitle: "Ceritakan proyek Anda",
        required: "Wajib diisi",
        validEmail: "Masukkan email yang valid",
        sendWhatsApp: "Kirim via WhatsApp",
        infoTitle: "Kami siap membantu",
      },

      // Footer
      footer: {
        navigation: "Navigasi",
        services: "Layanan",
        cmmsLink: "Platform CMMS",
        copyright: "© 2025 PT. Sumber Sarana Solusindo. Hak cipta dilindungi.",
        location: "Jakarta, Indonesia · Sen–Jum 08.00–18.00 WIB",
      },

      // Steps
      step1: {
        title: "Laporan Lapangan Dikirim",
        desc: "Seorang teknisi atau operator mengirimkan Trouble Report melalui CMMS, menggambarkan kerusakan, peralatan yang terdampak, dan lokasi. Laporan diberi cap waktu dan nomor referensi unik secara otomatis.",
      },
      step2: {
        title: "Tinjauan Supervisor & Pembuatan Work Order",
        desc: "Supervisor menerima notifikasi, meninjau laporan, dan membuat Work Order formal — memilih jenis (Korektif, Preventif, Sertifikasi) dan menugaskan teknisi berdasarkan keahlian dan ketersediaan.",
      },
      step3: {
        title: "Penugasan Jadwal",
        desc: "WO ditempatkan pada jadwal pemeliharaan dengan tanggal penyelesaian target. Sistem memeriksa konflik dengan jendela pemeliharaan preventif yang ada dan secara otomatis menandai tumpang tindih.",
      },
      step4: {
        title: "Eksekusi & Pembaruan Progres",
        desc: "Teknisi yang ditugaskan memperbarui WO secara real time — mencatat jam kerja, temuan, suku cadang yang digunakan, dan foto. Rekam layanan peralatan diperbarui secara bersamaan. Semua tindakan dicatat terhadap profil pengguna teknisi.",
      },
      step5: {
        title: "Persetujuan Digital & Penutupan WO",
        desc: "Setelah selesai, WO diajukan untuk persetujuan. Supervisor meninjau dan meneruskan ke Approver untuk tanda tangan digital final. Persetujuan multi-level direkam dengan cap waktu dalam jejak audit yang tahan gangguan. Trouble Report ditandai sebagai terselesaikan dan secara permanen terhubung ke WO yang ditutup.",
      },
    },

    // Projects Section
    projects: {
      badge: "PORTOFOLIO KAMI",
      title: "Proyek Aktif yang Kami",
      titleHighlight: "Banggakan",
      subtitle:
        "Temukan proyek-proyek terbaru dalam bidang pemeliharaan gedung dan teknologi yang menunjukkan keahlian serta komitmen kami terhadap keunggulan.",
      project1: {
        name: "Essence Darmawangsa",
        description:
          "Sistem pemeliharaan gedung komprehensif dengan integrasi CMMS canggih untuk kompleks residensial mewah.",
        status: "Aktif",
        location: "Jakarta",
      },
      project2: {
        name: "Niffaro Park",
        description:
          "Kompleks perkantoran modern dengan teknologi gedung pintar dan sistem manajemen fasilitas yang komprehensif.",
        status: "Aktif",
        location: "Jakarta",
      },
    },

    // Services Section
    services: {
      badge: "LAYANAN KAMI",
      title: "Solusi Pemeliharaan Gedung",
      titleHighlight: "yang Komprehensif",
      subtitle:
        "Jelajahi berbagai layanan profesional yang dirancang untuk menjaga gedung Anda beroperasi dengan performa puncak menggunakan teknologi terkini dan keahlian terbaik.",
      seeMore: "Lihat Layanan Lainnya",
      seeLess: "Tampilkan Lebih Sedikit",
      viewDetails: "Lihat Detail",
    },

    // About Section
    about: {
      title: "Mengapa Memilih Sumber Sarana Solusindo?",
      subtitle:
        "Mitra terpercaya untuk solusi pemeliharaan gedung dan teknologi yang komprehensif. Kami mengkhususkan diri dalam layanan mekanikal dan elektrikal yang didukung oleh teknologi CMMS mutakhir.",
      feature1: {
        title: "Profesional Bersertifikat",
        description:
          "Tim kami terdiri dari teknisi bersertifikat dengan pengalaman bertahun-tahun dalam pemeliharaan gedung dan solusi teknologi.",
      },
      feature2: {
        title: "Layanan Darurat 24/7",
        description:
          "Dukungan darurat sepanjang waktu untuk memastikan operasional gedung Anda tidak pernah terhenti dan selalu berjalan optimal.",
      },
      feature3: {
        title: "Teknologi CMMS",
        description:
          "Sistem Manajemen Pemeliharaan Terkomputerisasi yang canggih untuk performa gedung optimal dan keamanan data terjamin.",
      },
    },

    // Contact Section
    contact: {
      title: "Hubungi Kami",
      subtitle:
        "Siap mengoptimalkan pemeliharaan gedung Anda? Hubungi kami untuk konsultasi profesional.",
      form: {
        sendMessage: "Kirim Pesan kepada Kami",
        firstName: "Nama Depan *",
        lastName: "Nama Belakang *",
        email: "Alamat Email *",
        company: "Perusahaan",
        service: "Pilih Layanan",
        message: "Ceritakan kebutuhan proyek Anda...",
        submit: "Kirim Pesan",
      },
      info: {
        title: "Informasi Kontak",
        phone: "Telepon",
        email: "Email",
        office: "Kantor",
        hours: "Jam Operasional",
        hoursDetail: {
          weekday: "Sen–Jum: 08.00–18.00",
          weekend: "Sabtu: Tutup",
          emergency: "Darurat: 24/7",
        },
        assistance: "Untuk bantuan segera:",
        whatsapp: "WhatsApp",
        callNow: "Hubungi Sekarang",
      },
    },

    // Service Options (for contact form dropdown)
    serviceOptions: {
      default: "Pilih Layanan",
      preventiveMaintenance: "Pemeliharaan Preventif",
      electrical: "Layanan Kelistrikan",
      hvac: "Layanan HVAC",
      accessControl: "Sistem Kontrol Akses",
      cctv: "Instalasi CCTV",
      websiteDevelopment: "Pengembangan Website",
      mobileDevelopment: "Pengembangan Aplikasi Mobile",
      cmms: "Implementasi CMMS",
      other: "Lainnya",
    },

    // Modal/General Actions
    actions: {
      close: "Tutup",
      viewDetails: "Lihat Detail",
      getQuote: "Dapatkan Penawaran",
      learnMore: "Pelajari Lebih Lanjut",
      openInMaps: "Buka di Maps",
    },

    // Company Info
    company: {
      tagline: "Solusi Peralatan Gedung",
      name: "Triple S",
      fullName: "Sumber Sarana Solusindo",
      description:
        "Penyedia layanan mekanikal dan elektrikal terpercaya dengan teknologi CMMS canggih",
    },

    // Meta Information
    meta: {
      loading: "Memuat layanan...",
      error: "Terjadi kesalahan saat memuat data",
      noResults: "Tidak ada hasil ditemukan",
    },
  },

  en: {
    // Navigation
    nav: {
      home: "Home",
      projects: "Projects",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      cmms: "CMMS",
    },

    // Hero Section
    hero: {
      company: "SUMBER SARANA SOLUSINDO",
      title: {
        line1: "Your Trustworthy",
        line2: "Building Equipment Service",
      },
      subtitle:
        "We provide technology-based mechanical and electrical services with advanced CMMS integration for optimal building performance.",
      cta: {
        consultation: "Contact Us",
        work: "View Our Services",
      },
      scrollIndicator: "Scroll to Explore",
    },

    // CMMS Section
    cmms: {
      badge: "TECHNOLOGY POWERED",
      title: "Supported with",
      titleHighlight: "CMMS Web Application",
      description:
        "Optimize your building maintenance with intelligent CMMS! Manage maintenance, monitor assets, and prevent downtime in one secure and efficient centralized system.",
      features: {
        autoBackup: "Automatic Backup",
        dataSecurity: "Data Security",
        highEfficiency: "High Efficiency",
        realTimeMonitoring: "Real-time Monitoring",
      },
      cta: "Learn More About CMMS",

      // CMMS Page specific
      hero: {
        badge: "Technology Powered · CMMS",
        title1: "Supported with",
        title2: "CMMS Web App",
        desc: "Optimize your building MEP maintenance with intelligent CMMS — manage work orders, monitor assets, and prevent downtime in one secure and efficient centralized system.",
      },

      // System Map section
      map: {
        badge: "System Architecture",
        title1: "How Everything",
        title2: " Connects",
        desc: "Every module is interlinked — from a field trouble report all the way to digital management sign-off, every action traces through one unified chain.",
      },

      // Highlights section
      highlights: {
        badge: "Core Modules",
        title1: "System",
        title2: " Highlights",
        desc: "Eight interconnected modules covering every aspect of MEP maintenance — from field operations to executive approval.",
      },

      // Cards
      card: {
        num1: "Highlight 01",
        title1: "Work Order Management",
        desc1:
          "Four distinct work order types — Preventive Maintenance, Corrective Maintenance, Certification, and Trouble Report. Each follows its own defined workflow with automated assignment, progress tracking, and escalation paths.",

        num2: "Highlight 02",
        title2: "Trouble Report → Work Order Link",
        desc2:
          "Any submitted Trouble Report can be directly escalated into a formal Work Order. This creates an automatic traceability chain — from the field complaint all the way to resolution and sign-off, eliminating manual follow-up gaps.",

        num3: "Highlight 03",
        title3: "User List & Management",
        desc3:
          "Full user directory with profile management, workload visibility, and assignment tracking. Users are tied to specific roles and sites ensuring contextually accurate and auditable task assignment.",

        num4: "Highlight 04",
        title4: "Schedule Management",
        desc4:
          "Unified scheduling engine connected to both Work Orders and Trouble Reports. Preventive maintenance schedules auto-generate WOs on due dates, while Trouble Reports can be slotted for tracked resolution timelines.",

        num5: "Highlight 05",
        title5: "Equipment List → Work Order",
        desc5:
          "Full equipment registry linked directly to Work Orders. Each asset carries its complete history of maintenance activities, certifications, and trouble reports. Technicians can look up any equipment and immediately see its full service record.",

        num6: "Highlight 06",
        title6: "Site Choice & User Role Linkage",
        desc6:
          "Multi-site support with site-scoped data visibility. Each user is assigned to one or more sites and their data access is automatically scoped. A technician at Site A cannot see or modify data belonging to Site B unless explicitly authorized.",

        num7: "Highlight 07",
        title7: "Role-Based Authority",
        desc7:
          "Granular permission system across all modules. Roles are defined at the system level — Admin, Supervisor, Technician, Approver, and Viewer — each with precise access rights per module. Permissions cascade from site level down to individual user actions.",

        num8: "Highlight 08",
        title8: "Digital Approval System",
        desc8:
          "End-to-end digital approval workflow linked to all major system actions — WO creation, WO closure, Trouble Report escalation, Certification issuance, and Schedule changes. Multi-level approvals with timestamped signatures replace paper-based sign-off entirely.",
      },

      // Process flow section
      flow: {
        badge: "End-to-End Workflow",
        title1: "Process",
        title2: " Flow",
        desc: "From a fault on the floor to a closed and digitally approved work order — see how the system handles every step automatically.",
      },

      // Stats
      stats: {
        equipments: "Equipments",
        maintenance: "Maintenance Activities",
        companies: "Companies",
        workers: "Workers",
      },

      // Tags (pill labels)
      tag: {
        preventive: "Preventive",
        corrective: "Corrective",
        certification: "Certification",
        troubleReport: "Trouble Report",
        autoEscalation: "Auto-escalation",
        traceability: "Traceability",
        rootCause: "Root Cause Linking",
        userProfiles: "User Profiles",
        workloadTracking: "Workload Tracking",
        assignmentHistory: "Assignment History",
        autoWO: "Auto WO Generation",
        calendarView: "Calendar View",
        deadlineAlerts: "Deadline Alerts",
        assetRegistry: "Asset Registry",
        serviceHistory: "Service History",
        woLinkage: "WO Linkage",
        multiSite: "Multi-site",
        dataScoping: "Data Scoping",
        accessControl: "Access Control",
        multiLevel: "Multi-level",
        timestamped: "Timestamped",
        paperless: "Paperless",
        auditTrail: "Audit Trail",
        troubleReportModule: "Trouble Report Module",
        equipmentRegistry: "Equipment Registry",
        siteScope: "Site Scope",
        workOrderModule: "Work Order Module",
        userList: "User List",
        roleAuthority: "Role Authority",
        scheduleModule: "Schedule Module",
        preventiveCalendar: "Preventive Calendar",
        conflictDetection: "Conflict Detection",
        equipmentLog: "Equipment Log",
        technicianProfile: "Technician Profile",
        realtimeUpdate: "Real-time Update",
        digitalApproval: "Digital Approval",
        trClosure: "TR Closure",
        equipmentUpdate: "Equipment Update",
      },

      // Contact (CMMS page specific)
      contact: {
        eyebrow: "Get In Touch",
        title: "Let's Build Something",
        titleHighlight: "Together",
        subtitle:
          "Ready to optimize your building maintenance? Contact us for a professional consultation.",
        formTitle: "Tell us about your project",
        required: "Required",
        validEmail: "Enter a valid email",
        sendWhatsApp: "Send via WhatsApp",
        infoTitle: "We're here to help",
      },

      // Footer
      footer: {
        navigation: "Navigation",
        services: "Services",
        cmmsLink: "CMMS Platform",
        copyright: "© 2025 PT. Sumber Sarana Solusindo. All rights reserved.",
        location: "Jakarta, Indonesia · Mon–Fri 8AM–6PM WIB",
      },

      // Steps
      step1: {
        title: "Field Report Submitted",
        desc: "A technician or operator submits a Trouble Report via CMMS, describing the fault, affected equipment, and site. The report is time-stamped and assigned a unique reference number automatically.",
      },
      step2: {
        title: "Supervisor Review & Work Order Creation",
        desc: "The Supervisor receives a notification, reviews the report, and creates a formal Work Order — selecting the type (Corrective, Preventive, Certification) and assigning a technician based on skill and availability.",
      },
      step3: {
        title: "Schedule Assignment",
        desc: "The WO is placed on the maintenance schedule with a target completion date. The system checks for conflicts with existing preventive maintenance windows and flags overlaps automatically.",
      },
      step4: {
        title: "Execution & Progress Update",
        desc: "The assigned technician updates the WO in real time — logging labor hours, findings, parts used, and photos. The equipment's service record updates simultaneously. All actions are logged against the technician's user profile.",
      },
      step5: {
        title: "Digital Approval & WO Closure",
        desc: "Upon completion, the WO is submitted for approval. The Supervisor reviews and routes to the Approver for final digital sign-off. Multi-level approvals are captured with timestamps in a tamper-proof audit trail. The Trouble Report is marked resolved and permanently linked to the closed WO.",
      },
    },

    // Projects Section
    projects: {
      badge: "OUR PORTFOLIO",
      title: "Active Projects We're",
      titleHighlight: "Proud Of",
      subtitle:
        "Discover our latest building maintenance and technology projects that showcase our expertise and commitment to excellence.",
      project1: {
        name: "Essence Darmawangsa",
        description:
          "Comprehensive building maintenance system with advanced CMMS integration for luxury residential complex.",
        status: "Active",
        location: "Jakarta",
      },
      project2: {
        name: "Niffaro Park",
        description:
          "Modern office complex featuring smart building technology and comprehensive facility management systems.",
        status: "Active",
        location: "Jakarta",
      },
    },

    // Services Section
    services: {
      badge: "OUR SERVICES",
      title: "Comprehensive Building",
      titleHighlight: "Maintenance Solutions",
      subtitle:
        "Explore our wide range of professional services designed to keep your building operating at peak performance with cutting-edge technology and expert craftsmanship.",
      seeMore: "See More Services",
      seeLess: "Show Less",
      viewDetails: "View Details",
    },

    // About Section
    about: {
      title: "Why Choose Sumber Sarana Solusindo?",
      subtitle:
        "Your trusted partner for comprehensive building maintenance and technology solutions. We specialize in mechanical and electrical services backed by cutting-edge CMMS technology.",
      feature1: {
        title: "Certified Professionals",
        description:
          "Our team consists of certified technicians with years of experience in building maintenance and technology solutions.",
      },
      feature2: {
        title: "24/7 Emergency Service",
        description:
          "Round-the-clock emergency support to ensure your building operations never stop and always run optimally.",
      },
      feature3: {
        title: "CMMS Technology",
        description:
          "Advanced Computerized Maintenance Management System for optimal building performance and guaranteed data security.",
      },
    },

    // Contact Section
    contact: {
      title: "Get In Touch With Us",
      subtitle:
        "Ready to optimize your building maintenance? Contact us for a professional consultation.",
      form: {
        sendMessage: "Send us a Message",
        firstName: "First Name *",
        lastName: "Last Name *",
        email: "Email Address *",
        company: "Company",
        service: "Select a Service",
        message: "Tell us about your project requirements...",
        submit: "Send Message",
      },
      info: {
        title: "Contact Information",
        phone: "Phone",
        email: "Email",
        office: "Office",
        hours: "Business Hours",
        hoursDetail: {
          weekday: "Mon–Fri: 8AM–6PM",
          weekend: "Saturday: Closed",
          emergency: "Emergency: 24/7",
        },
        assistance: "For immediate assistance:",
        whatsapp: "WhatsApp",
        callNow: "Call Now",
      },
    },

    // Service Options (for contact form dropdown)
    serviceOptions: {
      default: "Select a Service",
      preventiveMaintenance: "Preventive Maintenance",
      electrical: "Electrical Services",
      hvac: "HVAC Services",
      accessControl: "Access Control Systems",
      cctv: "CCTV Installation",
      websiteDevelopment: "Website Development",
      mobileDevelopment: "Mobile App Development",
      cmms: "CMMS Implementation",
      other: "Other",
    },

    // Modal/General Actions
    actions: {
      close: "Close",
      viewDetails: "View Details",
      getQuote: "Get Quote",
      learnMore: "Learn More",
      openInMaps: "Open in Maps",
    },

    // Company Info
    company: {
      tagline: "Building Equipment Solutions",
      name: "Triple S",
      fullName: "Sumber Sarana Solusindo",
      description:
        "Trusted mechanical and electrical service provider with advanced CMMS technology",
    },

    // Meta Information
    meta: {
      loading: "Loading services...",
      error: "An error occurred while loading data",
      noResults: "No results found",
    },
  },
};

// Make globally available
window.i18nData = i18nData;

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = i18nData;
}
