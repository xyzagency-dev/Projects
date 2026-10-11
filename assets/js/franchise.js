/**
 * NEXUS ARENA — White-Label & Franchise Control Engine
 * Demonstrates how scalable and sellable this platform is for multi-location operators.
 */

const NexusFranchise = {
  currencies: {
    USD: { symbol: "$", rate: 1.0 },
    EUR: { symbol: "€", rate: 0.92 },
    GBP: { symbol: "£", rate: 0.79 },
    INR: { symbol: "₹", rate: 84.0 },
    JPY: { symbol: "¥", rate: 152.0 },
    AED: { symbol: "AED ", rate: 3.67 }
  },

  init() {
    this.setupListeners();
    this.calculateROI();
  },

  setupListeners() {
    // Currency Switcher
    const currSelect = document.getElementById("franchise-currency-select");
    if (currSelect) {
      currSelect.addEventListener("change", (e) => {
        this.setCurrency(e.target.value);
      });
    }

    // Theme Switcher
    const themeSelect = document.getElementById("franchise-theme-select");
    if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Brand Name Changer
    const brandInput = document.getElementById("franchise-brand-name-input");
    if (brandInput) {
      brandInput.addEventListener("input", (e) => {
        this.setBrandName(e.target.value);
      });
    }

    // ROI Simulator inputs
    const stationsInput = document.getElementById("roi-stations-count");
    const rateInput = document.getElementById("roi-hourly-rate");
    const utilInput = document.getElementById("roi-utilization-rate");

    [stationsInput, rateInput, utilInput].forEach(el => {
      if (el) {
        el.addEventListener("input", () => this.calculateROI());
      }
    });
  },

  setCurrency(code) {
    if (!this.currencies[code]) return;
    const config = this.currencies[code];
    NEXUS_DATA.cafeInfo.currencyCode = code;
    NEXUS_DATA.cafeInfo.currencySymbol = config.symbol;
    NEXUS_DATA.cafeInfo.rateMultiplier = config.rate;

    // Refresh components
    if (window.NexusStationMap) window.NexusStationMap.render();
    if (window.NexusBooking) {
      window.NexusBooking.populateZones();
      window.NexusBooking.calculateTotal();
    }
    if (window.NexusBistro) {
      window.NexusBistro.renderMenu();
      window.NexusBistro.renderCart();
    }
    this.calculateROI();

    if (window.NexusAudio) window.NexusAudio.click();
    NexusApp.showToast(`💱 Currency converted to ${code} (${config.symbol})`);
  },

  setTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("nexus_theme", themeName);
    if (window.NexusAudio) window.NexusAudio.click();
    NexusApp.showToast(`🎨 Theme switched to ${themeName.toUpperCase()}`);
  },

  setBrandName(name) {
    const brand = name.trim() || "NEXUS ARENA";
    NEXUS_DATA.cafeInfo.name = brand;
    document.querySelectorAll(".brand-display-name").forEach(el => {
      el.textContent = brand;
    });
  },

  calculateROI() {
    const stations = parseInt(document.getElementById("roi-stations-count")?.value || 30, 10);
    const hourlyRate = parseFloat(document.getElementById("roi-hourly-rate")?.value || 8);
    const utilHours = parseFloat(document.getElementById("roi-utilization-rate")?.value || 10); // 10 active hours / day average

    // Monthly gaming revenue = stations * hourlyRate * utilHours * 30 days
    const monthlyGamingRev = stations * hourlyRate * utilHours * 30;
    // Bistro uplift (approx 35% on gaming revenue in lifestyle gaming cafés)
    const monthlyBistroRev = monthlyGamingRev * 0.35;
    const totalMonthly = monthlyGamingRev + monthlyBistroRev;
    const annualTotal = totalMonthly * 12;

    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;
    const revEl = document.getElementById("roi-monthly-rev");
    const annualEl = document.getElementById("roi-annual-rev");

    if (revEl) revEl.textContent = `${symbol}${Math.round(totalMonthly).toLocaleString()} / mo`;
    if (annualEl) annualEl.textContent = `${symbol}${Math.round(annualTotal).toLocaleString()} / yr`;
  },

  exportPlatformData() {
    const exportBundle = {
      cafe: NEXUS_DATA.cafeInfo,
      zones: NEXUS_DATA.zones,
      stations: NEXUS_DATA.stations,
      bookings: JSON.parse(localStorage.getItem("nexus_bookings") || "[]"),
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexus_cafe_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    NexusApp.showToast("💾 Franchise operations and booking database exported!");
  }
};

window.NexusFranchise = NexusFranchise;
