/**
 * NEXUS ARENA — Core App Coordinator & UI Controller
 */

const NexusApp = {
  init() {
    // 1. Initialize Audio
    if (window.NexusAudio) window.NexusAudio.init();

    // 2. Setup SFX Toggle
    this.setupAudioToggle();

    // 3. Initialize Child Modules
    if (window.NexusStationMap) window.NexusStationMap.init();
    if (window.NexusBooking) window.NexusBooking.init();
    if (window.NexusBistro) window.NexusBistro.init();
    if (window.NexusFranchise) window.NexusFranchise.init();

    // 4. Setup General UI Controls
    this.setupModals();
    this.setupMobileNav();
    this.setupTimeBankCalculator();
    this.setupPingSimulator();
    this.restoreTheme();

    console.log("⚡ NEXUS ARENA Platform Initialized successfully.");
  },

  setupAudioToggle() {
    const sfxBtn = document.getElementById("sfx-toggle");
    if (!sfxBtn) return;

    if (window.NexusAudio && window.NexusAudio.enabled) {
      sfxBtn.classList.add("active");
      sfxBtn.innerHTML = `<span>🔊</span> <span>AUDIO ON</span>`;
    }

    sfxBtn.addEventListener("click", () => {
      const isEnabled = window.NexusAudio.toggle();
      if (isEnabled) {
        sfxBtn.classList.add("active");
        sfxBtn.innerHTML = `<span>🔊</span> <span>AUDIO ON</span>`;
        this.showToast("Cyber Audio Effects Enabled 🎮");
      } else {
        sfxBtn.classList.remove("active");
        sfxBtn.innerHTML = `<span>🔇</span> <span>AUDIO MUTED</span>`;
        this.showToast("Audio Muted 🔇");
      }
    });
  },

  setupModals() {
    // Backdrop click close
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay.id);
        }
      });
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => {
          this.closeModal(m.id);
        });
        if (window.NexusBistro) window.NexusBistro.toggleDrawer(false);
      }
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (window.NexusAudio) window.NexusAudio.click();
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("active");
    if (!document.querySelector(".modal-overlay.active")) {
      document.body.style.overflow = "";
    }
  },

  setupMobileNav() {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      if (window.NexusAudio) window.NexusAudio.click();
    });

    // Close mobile nav when link is clicked
    menu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    });
  },

  setupTimeBankCalculator() {
    const slider = document.getElementById("time-bank-slider");
    const hoursDisplay = document.getElementById("time-bank-hours-val");
    const costDisplay = document.getElementById("time-bank-cost-val");
    const savingsDisplay = document.getElementById("time-bank-savings-val");

    if (!slider) return;

    const updateCalc = () => {
      const hours = parseInt(slider.value, 10);
      const symbol = NEXUS_DATA.cafeInfo.currencySymbol;
      const baseHourRate = Math.round(8 * NEXUS_DATA.cafeInfo.rateMultiplier);

      // Discount tiers: 10+ hrs = 10% off, 25+ hrs = 25% off, 50+ hrs = 35% off
      let discountRate = 0;
      if (hours >= 50) discountRate = 0.35;
      else if (hours >= 25) discountRate = 0.25;
      else if (hours >= 10) discountRate = 0.10;

      const rawCost = hours * baseHourRate;
      const finalCost = Math.round(rawCost * (1 - discountRate));
      const savings = rawCost - finalCost;

      if (hoursDisplay) hoursDisplay.textContent = `${hours} Hours`;
      if (costDisplay) costDisplay.textContent = `${symbol}${finalCost}`;
      if (savingsDisplay) savingsDisplay.textContent = savings > 0 ? `Save ${symbol}${savings} (${Math.round(discountRate * 100)}% off)` : `Standard rate`;
    };

    slider.addEventListener("input", updateCalc);
    updateCalc();
  },

  setupPingSimulator() {
    const pingEl = document.getElementById("live-network-ping");
    if (!pingEl) return;

    setInterval(() => {
      // 2.8ms to 3.4ms realistic fiber jitter
      const jitter = (2.8 + Math.random() * 0.6).toFixed(1);
      pingEl.textContent = `${jitter} ms`;
    }, 4000);
  },

  restoreTheme() {
    const savedTheme = localStorage.getItem("nexus_theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      const select = document.getElementById("franchise-theme-select");
      if (select) select.value = savedTheme;
    }
  },

  showToast(message, icon = "⚡") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  registerTournament(tourneyId) {
    const tourney = NEXUS_DATA.tournaments.find(t => t.id === tourneyId);
    if (!tourney) return;

    const modalTitle = document.getElementById("tourney-modal-title");
    const modalBody = document.getElementById("tourney-modal-body");

    if (modalTitle) modalTitle.textContent = `Register: ${tourney.game}`;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px;">${tourney.title}</h4>
          <div style="color: var(--accent-gold); font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; margin-bottom: 12px;">${tourney.prizePool}</div>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            Scheduled for <strong>${tourney.date} @ ${tourney.time}</strong>. Tournament setup includes official referees, 360Hz monitors, broadcast streaming, and complimentary hydration packs.
          </p>
        </div>

        <form id="tourney-register-form" onsubmit="NexusApp.submitTourneyRegistration(event, '${tourney.id}')">
          <div class="form-group">
            <label class="form-label">Team / Player Alias *</label>
            <input type="text" id="tourney-team-name" class="form-input" placeholder="e.g. Phoenix Rising / ShadowBlade" required>
          </div>
          <div class="form-group">
            <label class="form-label">Team Captain Contact Email *</label>
            <input type="email" id="tourney-email" class="form-input" placeholder="captain@esports.gg" required>
          </div>
          <div class="form-group">
            <label class="form-label">Discord Tag (For Bracket Callouts)</label>
            <input type="text" id="tourney-discord" class="form-input" placeholder="captain#1337">
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="NexusApp.closeModal('tourney-modal')">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Confirm Roster Entry (${tourney.entryFee})</button>
          </div>
        </form>
      `;
    }

    this.openModal("tourney-modal");
  },

  submitTourneyRegistration(e, tourneyId) {
    e.preventDefault();
    const team = document.getElementById("tourney-team-name")?.value || "Contender";
    this.closeModal("tourney-modal");

    if (window.NexusAudio) window.NexusAudio.success();
    this.showToast(`🏆 Team "${team}" enrolled! Check email for bracket confirmation.`);
  },

  acquireMembership(tierId) {
    const tier = NEXUS_DATA.memberships.find(m => m.id === tierId);
    if (!tier) return;

    if (window.NexusAudio) window.NexusAudio.success();
    this.showToast(`👑 Welcome to ${tier.title}! Pass credentials activated.`);
    this.openModal("booking-modal");
  }
};

window.NexusApp = NexusApp;

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  NexusApp.init();
});
