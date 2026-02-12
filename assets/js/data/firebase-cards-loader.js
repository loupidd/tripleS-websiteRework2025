// Import Firebase config
import { firebaseConfig } from "../config";

// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized successfully");

// Global modal functions
window.openServiceModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
};

window.closeServiceModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
};

// Function to create service card HTML
function createServiceCard(card) {
  const safeId = card.id.replace(/[^a-zA-Z0-9]/g, "-");
  return `
    <div class="services-grid-card group relative overflow-hidden bg-white rounded-2xl shadow-xl hover-lift transition-all duration-500 border border-gray-100">
      <div class="aspect-[4/5] bg-cover bg-center relative service-card-bg" style="background-image: url('${card.imageUrl || "assets/img/maintenance.jpg"}');">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <h3 class="text-lg font-semibold text-white mb-3">${card.title}</h3>
          <button 
            onclick="openServiceModal('modal-${safeId}')"
            class="bg-white/90 backdrop-blur-sm text-[#0F5F98] px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
            <span data-i18n="services.details">View Details</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Function to create modal HTML
function createServiceModal(card) {
  const safeId = card.id.replace(/[^a-zA-Z0-9]/g, "-");
  const features = card.modalContent?.features || [];
  const badge = card.modalContent?.badge || "SERVICE";

  // Split title intelligently
  const titleWords = card.title.split(" ");
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(" ");

  return `
    <div id="modal-${safeId}" tabindex="-1" aria-hidden="true"
      class="hidden fixed inset-0 z-50 items-center justify-center p-4 modal-backdrop font-poppins"
      style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 modal-content overflow-y-auto">
        <button onclick="closeServiceModal('modal-${safeId}')" type="button"
          class="absolute top-6 right-6 z-40 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="flex flex-col lg:flex-row">
          <div class="relative w-full lg:w-2/3">
            <div class="relative w-full h-64 md:h-80 lg:h-[500px]">
              <div class="relative h-full overflow-hidden rounded-l-3xl">
                <img src="${card.imageUrl || "assets/img/maintenance.jpg"}" class="w-full h-full object-cover" alt="${card.title}">
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/3 p-8 lg:p-10 flex flex-col justify-center">
            <div class="inline-block mb-6">
              <div class="bg-gradient-to-r from-[#7AC5FF] to-[#0F5F98] text-white px-4 py-2 rounded-full text-sm font-semibold">
                ${badge}
              </div>
            </div>

            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              ${firstPart ? firstPart + " <br>" : ""}
              <span class="bg-gradient-to-r from-[#7AC5FF] to-[#0F5F98] bg-clip-text text-transparent">
                ${lastWord}
              </span>
            </h3>

            <p class="text-gray-600 leading-relaxed mb-8">
              ${card.description}
            </p>

            ${
              features.length > 0
                ? `
            <div class="space-y-4 mb-8">
              ${features
                .map((feature) =>
                  feature
                    ? `
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-[#7AC5FF] to-[#0F5F98] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">${feature}</span>
                </div>
              `
                    : "",
                )
                .join("")}
            </div>
            `
                : ""
            }

            <div class="flex justify-center">
              <button onclick="closeServiceModal('modal-${safeId}')" type="button"
                class="bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Load cards from Firebase
async function loadServicesFromFirebase() {
  console.log("Starting to load services from Firebase...");

  const servicesGrid = document.getElementById("servicesGrid");

  if (!servicesGrid) {
    console.error("Services grid element not found!");
    return;
  }

  console.log("Found servicesGrid element");

  // Show loading state
  servicesGrid.innerHTML = `
    <div class="col-span-full py-12 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A7AE0] mx-auto"></div>
      <p class="mt-4 text-gray-500">Loading services...</p>
    </div>
  `;

  try {
    console.log("Fetching from Firestore...");

    // Fetch cards from Firestore
    const q = query(collection(db, "landingPageCards"), orderBy("order"));
    const querySnapshot = await getDocs(q);

    console.log(`Received ${querySnapshot.size} cards from Firebase`);

    const cards = [];
    querySnapshot.forEach((doc) => {
      cards.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (cards.length === 0) {
      console.warn("No cards found in Firebase");
      servicesGrid.innerHTML = `
        <div class="col-span-full py-12 text-center">
          <div class="bg-gray-50 rounded-2xl p-8 inline-block">
            <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <p class="mt-4 text-gray-500 font-medium">No services available yet</p>
        </div>
      `;
      return;
    }

    console.log("Rendering cards...");

    // Render cards
    servicesGrid.innerHTML = cards
      .map((card) => createServiceCard(card))
      .join("");

    // Render modals
    const modalsHTML = cards.map((card) => createServiceModal(card)).join("");

    // Remove old modals
    const oldModals = document.querySelectorAll('[id^="modal-"]');
    oldModals.forEach((modal) => modal.remove());

    // Add new modals
    const modalsContainer = document.createElement("div");
    modalsContainer.id = "firebase-modals-container";
    modalsContainer.innerHTML = modalsHTML;
    document.body.appendChild(modalsContainer);

    console.log(`Successfully loaded ${cards.length} service cards!`);

    // Update mobile toggle count
    const moreServicesCount = document.getElementById("moreServicesCount");
    if (moreServicesCount && cards.length > 4) {
      moreServicesCount.textContent = `+${cards.length - 4}`;
    }
  } catch (error) {
    console.error("Error loading services:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    servicesGrid.innerHTML = `
      <div class="col-span-full py-12 text-center">
        <div class="bg-red-50 rounded-2xl p-8 inline-block">
          <svg class="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="mt-4 text-red-600 font-medium">Error loading services</p>
        <p class="text-sm text-gray-500 mt-2">${error.message}</p>
        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Retry
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
console.log("Firebase cards loader script initialized");

if (document.readyState === "loading") {
  console.log("Waiting for DOMContentLoaded...");
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready, loading services");
    loadServicesFromFirebase();
  });
} else {
  console.log("DOM already ready, loading services immediately");
  loadServicesFromFirebase();
}

// Expose globally for manual refresh
window.reloadFirebaseCards = loadServicesFromFirebase;
