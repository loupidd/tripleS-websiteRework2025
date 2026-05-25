// ============================================
// app.js — Root bootstrap
//
// Script load order in index.html:
//   1. i18n-data.js               sync  — window.i18nData
//   2. core/navbar.js             defer — existing navbar (untouched)
//   3. core/animations.js         defer — Animations class
//   4. core/interactions.js       defer — Interactions class
//   5. sections/ServicesSection.js defer
//   6. vendors/autotyping.min.js  defer
//   7. app.js                     defer — this file
//
// Note: navbar.js handles its own DOMContentLoaded internally,
// so we don't instantiate Navbar here — it self-initialises.
// ============================================

class App {
  constructor() {
    this.animations = null;
    this.services = null;

    this._boot();
  }

  _boot() {
    this.animations = new Animations();

    this.interactions = new Interactions({ i18n: this._i18nShim() });

    this.services = new ServicesSection({
      i18n: this._i18nShim(),
      animations: this.animations,
    });

    console.info("[App] Sumber Sarana Solusindo — ready.");
  }

  _i18nShim() {
    return {
      get lang() {
        return localStorage.getItem("preferredLanguage") || "id";
      },
      t(key) {
        const lang = localStorage.getItem("preferredLanguage") || "id";
        const data = window.i18nData?.[lang] || window.i18nData?.["id"] || {};
        return key.split(".").reduce((obj, k) => obj?.[k], data) ?? key;
      },
    };
  }
}

// Boot on DOMContentLoaded (navbar.js also uses DOMContentLoaded — order is fine)
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
