// ============================================
// ServicesSection.js
// 13 service category cards matching the
// company profile gallery photo.
// Image paths follow existing assets/img/
// folder structure — replace with real paths.
// Brand palette: #1D3D62 navy, #006AB3 bright,
// #004E8A mid, #4A90D9 light, #EBF3FB pale.
// ============================================

class ServicesSection {
  /**
   * @param {{ i18n, animations, gridId?, btnId? }} opts
   *   gridId — ID of the grid container  (default: 'servicesGrid')
   *   btnId  — ID of the portfolio CTA   (default: 'portfolioBtn')
   *            Pass null to skip button binding.
   */
  constructor({
    i18n,
    animations,
    gridId = "servicesGrid",
    btnId = "portfolioBtn",
  } = {}) {
    this.i18n = i18n;
    this.animations = animations;
    this.$grid = document.getElementById(gridId);
    this.$btn = btnId ? document.getElementById(btnId) : null;

    if (!this.$grid) return;

    this._render();
    this._bindBtn();
    document.addEventListener("languageChanged", () => this._render());
  }

  // ─── 13 categories matching company profile gallery ───────────────────
  _categories() {
    return [
      {
        key: "ac",
        // Gallery 1 — "Air Conditioner" card
        img: "assets/img/services/air_conditioner.png",
        tags: ["Split", "Split Duct", "Central"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`,
        ),
        shade: {
          bg: "#EBF3FB",
          icon: "#006AB3",
          border: "#D0E6F5",
          tag: "blue",
        },
      },
      {
        key: "acLift",
        // Gallery 1 — "AC Lift" card
        img: "assets/img/services/elevator_ac.png",
        tags: ["Elevator AC", "Lift"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>`,
        ),
        shade: {
          bg: "#EDF4FF",
          icon: "#004E8A",
          border: "#C8DEFA",
          tag: "navy",
        },
      },
      {
        key: "hydrant",
        // Gallery 1 — "Hydrant Box"
        img: "assets/img/services/hydrant.png",
        tags: ["Hydrant Box", "Fire Hose"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>`,
        ),
        shade: {
          bg: "#FFF3F3",
          icon: "#C0392B",
          border: "#F5C6C6",
          tag: "red",
        },
      },
      {
        key: "electricPanel",
        // Gallery 1 — "Electric Panel"
        img: "assets/img/services/electrical_panel.png",
        tags: ["MDP", "SDP", "Switchgear"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
        ),
        shade: {
          bg: "#EBF3FB",
          icon: "#006AB3",
          border: "#D0E6F5",
          tag: "blue",
        },
      },
      {
        key: "electronicPanel",
        // Gallery 1 — "Electronic Panel" (Fire Alarm / Sound)
        img: "assets/img/services/electronic_panel.png",
        tags: ["Fire Alarm", "Sound System"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>`,
        ),
        shade: {
          bg: "#EDF4FF",
          icon: "#004E8A",
          border: "#C8DEFA",
          tag: "navy",
        },
      },
      {
        key: "intercom",
        // Gallery 1 — "Intercom"
        img: "assets/img/services/intercom.png",
        tags: ["Public Address", "Intercom"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12m-4.5-9.5l3.5 2.5v4l-3.5 2.5V8.5z"/>`,
        ),
        shade: {
          bg: "#EBF3FB",
          icon: "#006AB3",
          border: "#D0E6F5",
          tag: "blue",
        },
      },
      {
        key: "genset",
        // Gallery 2 — "Generator Set"
        img: "assets/img/services/generator_set.png",
        tags: ["Preventive", "Corrective", "Overhaul"],
        icon: this._icon(
          `<rect x="2" y="7" width="20" height="14" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v3M9 15h6"/>`,
        ),
        shade: {
          bg: "#FFF8EC",
          icon: "#B7600A",
          border: "#FADDAD",
          tag: "amber",
        },
      },
      {
        key: "elevatorAccess",
        // Gallery 2 — "Elevator Access"
        img: "assets/img/services/elevator_access.png",
        tags: ["Elevator ACS", "Pegasus"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>`,
        ),
        shade: {
          bg: "#EDF4FF",
          icon: "#004E8A",
          border: "#C8DEFA",
          tag: "navy",
        },
      },
      {
        key: "doorAccess",
        // Gallery 2 — "Door Access"
        img: "assets/img/services/door_access.png",
        tags: ["Door ACS", "Fingerprint"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>`,
        ),
        shade: {
          bg: "#EBF3FB",
          icon: "#006AB3",
          border: "#D0E6F5",
          tag: "blue",
        },
      },
      {
        key: "cctv",
        // Gallery 2 — "CCTV System"
        img: "assets/img/services/cctv.png",
        tags: ["IP Camera", "NVR/DVR", "Analog"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z"/>`,
        ),
        shade: {
          bg: "#F0F0FF",
          icon: "#3730A3",
          border: "#C7C7F5",
          tag: "indigo",
        },
      },
      {
        key: "firePump",
        // Gallery 2 — "Fire Pump"
        img: "assets/img/services/fire_pump.png",
        tags: ["Jockey", "Main Electric", "Main Diesel"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
        ),
        shade: {
          bg: "#FFF3F3",
          icon: "#C0392B",
          border: "#F5C6C6",
          tag: "red",
        },
      },
      {
        key: "plumbing",
        // Gallery 2 — "Plumbing"
        img: "assets/img/services/plumbing.png",
        tags: ["Air Bersih", "Submersible", "PDAM"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>`,
        ),
        shade: {
          bg: "#EDF7FF",
          icon: "#1D6FA4",
          border: "#BDE0F8",
          tag: "sky",
        },
      },
      {
        key: "evcs",
        // Gallery 2 — "EV Charger"
        img: "assets/img/services/ev_charging.png",
        tags: ["40–106 KW", "Hotel", "Office"],
        icon: this._icon(
          `<path stroke-linecap="round" stroke-linejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5"/><path stroke-linecap="round" stroke-linejoin="round" d="M14 17h1a2 2 0 002-2v-1M17 21v-4M15 19h4"/>`,
        ),
        shade: {
          bg: "#FFF8EC",
          icon: "#B7600A",
          border: "#FADDAD",
          tag: "amber",
        },
      },
    ];
  }

  // ─── SVG icon wrapper ─────────────────────────────────────────────────
  _icon(paths) {
    return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  }

  // ─── Tag colour map (brand shades) ───────────────────────────────────
  _tagClass(style) {
    return (
      {
        blue: "border-[#D0E6F5] text-[#006AB3] bg-[#EBF3FB]",
        navy: "border-[#C8DEFA] text-[#1D3D62] bg-[#EDF4FF]",
        amber: "border-[#FADDAD] text-[#7C4410] bg-[#FFF8EC]",
        red: "border-[#F5C6C6] text-[#8B1A1A] bg-[#FFF3F3]",
        indigo: "border-[#C7C7F5] text-[#3730A3] bg-[#F0F0FF]",
        sky: "border-[#BDE0F8] text-[#1D6FA4] bg-[#EDF7FF]",
      }[style] ?? "border-[#D0E6F5] text-[#006AB3] bg-[#EBF3FB]"
    );
  }

  // ─── i18n resolver ────────────────────────────────────────────────────
  _t(path) {
    const lang = localStorage.getItem("preferredLanguage") || "id";
    const data = window.i18nData?.[lang] ?? window.i18nData?.["id"] ?? {};
    return path.split(".").reduce((obj, k) => obj?.[k], data) ?? path;
  }

  // ─── i18n labels for service keys not in i18n-data ───────────────────
  _label(key) {
    const labels = {
      id: {
        ac: {
          title: "Air Conditioner",
          desc: "Pemeliharaan AC split, split duct, dan central untuk kenyamanan ruangan gedung secara optimal.",
        },
        acLift: {
          title: "AC Lift / Elevator",
          desc: "Perawatan dan perbaikan unit AC khusus elevator agar kenyamanan penumpang tetap terjaga.",
        },
        hydrant: {
          title: "Hydrant Box & Fire System",
          desc: "Pemeliharaan hydrant box, selang, dan komponen sistem proteksi kebakaran aktif.",
        },
        electricPanel: {
          title: "Panel Listrik",
          desc: "Pemeliharaan panel MDP, SDP, switchgear, dan seluruh distribusi sistem kelistrikan gedung.",
        },
        electronicPanel: {
          title: "Panel Elektronik & Fire Alarm",
          desc: "Perawatan panel fire alarm, sistem tata suara, dan panel kontrol elektronik gedung.",
        },
        intercom: {
          title: "Tata Suara & Intercom",
          desc: "Instalasi dan pemeliharaan sistem public address serta intercom untuk komunikasi gedung.",
        },
        genset: {
          title: "Generator Set (Genset)",
          desc: "Inspeksi, servis, perbaikan, dan overhaul genset berbagai kapasitas untuk keandalan daya cadangan.",
        },
        elevatorAccess: {
          title: "Elevator Access Control",
          desc: "Pemasangan dan pemeliharaan sistem access control khusus elevator — termasuk merk Pegasus.",
        },
        doorAccess: {
          title: "Door Access Control",
          desc: "Instalasi dan pemeliharaan sistem kontrol akses pintu — kartu, fingerprint, dan keypad.",
        },
        cctv: {
          title: "Sistem CCTV",
          desc: "Pemeliharaan dan instalasi kamera IP, analog, serta NVR/DVR untuk keamanan menyeluruh gedung.",
        },
        firePump: {
          title: "Fire Pump & Hydrant Pump",
          desc: "Perawatan fire pump jockey, main electric, dan main diesel untuk kesiapan sistem pemadam kebakaran.",
        },
        plumbing: {
          title: "Pompa Air & Plumbing",
          desc: "Pemeliharaan pompa air bersih, pompa submersible, dan instalasi pipa air bersih supply PDAM.",
        },
        evcs: {
          title: "EV Charging Station",
          desc: "Pemasangan dan komisioning EVCS kapasitas 40–106 KW di hotel, gedung perkantoran, dan kawasan komersial.",
        },
      },
      en: {
        ac: {
          title: "Air Conditioner",
          desc: "Maintenance of split, split-duct, and central AC systems for optimal building comfort.",
        },
        acLift: {
          title: "Elevator AC Unit",
          desc: "Care and repair of dedicated elevator AC units to ensure passenger comfort.",
        },
        hydrant: {
          title: "Hydrant Box & Fire System",
          desc: "Maintenance of hydrant boxes, hoses, and active fire protection system components.",
        },
        electricPanel: {
          title: "Electrical Panel",
          desc: "Maintenance of MDP, SDP, switchgear, and complete building electrical distribution systems.",
        },
        electronicPanel: {
          title: "Electronic Panel & Fire Alarm",
          desc: "Maintenance of fire alarm panels, sound systems, and building electronic control panels.",
        },
        intercom: {
          title: "Public Address & Intercom",
          desc: "Installation and maintenance of public address and intercom communication systems.",
        },
        genset: {
          title: "Generator Set (Genset)",
          desc: "Inspection, servicing, repair, and overhaul of generator sets for reliable backup power.",
        },
        elevatorAccess: {
          title: "Elevator Access Control",
          desc: "Installation and maintenance of elevator-specific access control systems including Pegasus brand.",
        },
        doorAccess: {
          title: "Door Access Control",
          desc: "Installation and maintenance of door access control — card, fingerprint, and keypad.",
        },
        cctv: {
          title: "CCTV System",
          desc: "Maintenance and installation of IP cameras, analog cameras, and NVR/DVR systems.",
        },
        firePump: {
          title: "Fire Pump & Hydrant Pump",
          desc: "Maintenance of jockey, main electric, and main diesel fire pumps for fire readiness.",
        },
        plumbing: {
          title: "Water Pump & Plumbing",
          desc: "Maintenance of domestic water pumps, submersible pumps, and PDAM water supply piping.",
        },
        evcs: {
          title: "EV Charging Station",
          desc: "Installation and commissioning of EVCS (40–106 KW) at hotels, offices, and commercial venues.",
        },
      },
    };
    const lang = localStorage.getItem("preferredLanguage") || "id";
    return (
      labels[lang]?.[key] ?? labels["id"]?.[key] ?? { title: key, desc: "" }
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────
  _render() {
    if (!this.$grid) return;

    this.$grid.innerHTML = this._categories()
      .map((c, i) => {
        const { title, desc } = this._label(c.key);
        const tagHtml = c.tags
          .map(
            (tag) =>
              `<span class="text-[10.5px] font-semibold px-2.5 py-1 rounded-full border ${this._tagClass(c.shade.tag)}">${tag}</span>`,
          )
          .join("");

        return `
        <div class="services-grid-card group bg-white border border-gray-200 rounded-[20px] overflow-hidden
                    flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
             style="--hover-border:${c.shade.border};"
             onmouseenter="this.style.borderColor='${c.shade.border}'"
             onmouseleave="this.style.borderColor=''"
             data-aos="fade-up" data-aos-delay="${(i % 3) * 60}">

          <!-- Header -->
          <div class="flex items-start gap-4 pt-6 px-6">
            <div class="w-11 h-11 rounded-[13px] flex items-center justify-center flex-shrink-0
                        transition-transform duration-300 group-hover:scale-110"
                 style="background:${c.shade.bg};color:${c.shade.icon};border:1px solid ${c.shade.border};">
              ${c.icon}
            </div>
            <div class="min-w-0 pt-0.5">
              <p class="text-[9.5px] font-bold uppercase tracking-[0.14em] mb-1"
                 style="color:${c.shade.icon};opacity:0.5;">
                ${this._t("services.label")}
              </p>
              <h3 class="text-[14.5px] font-bold leading-snug" style="color:#1D3D62;">
                ${title}
              </h3>
            </div>
          </div>

          <!-- Description -->
          <p class="px-6 pt-3 pb-1 text-[12.5px] text-gray-500 leading-[1.7] flex-1">${desc}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 px-6 py-3">${tagHtml}</div>

          <!-- Image -->
          <div class="mx-4 mb-4 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-video
                      flex items-center justify-center relative">
            <img
              src="${c.img}"
              alt="${title}"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onerror="this.closest('.aspect-video').classList.add('img-fallback');this.remove();"
            />
          </div>

        </div>`;
      })
      .join("");

    // Update portfolio button text
    if (this.$btn) {
      const span = this.$btn.querySelector("span");
      if (span) span.textContent = this._t("services.viewPortfolio");
    }

    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  }

  _bindBtn() {
    this.$btn?.addEventListener("click", () => {
      window.location.href = "projects.html";
    });
  }
}

window.ServicesSection = ServicesSection;
