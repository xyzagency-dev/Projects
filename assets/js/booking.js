/**
 * NEXUS ARENA — Booking & Battlestation Reservation Engine
 */

const NexusBooking = {
  activeBooking: {
    zoneId: "esports-pc",
    stationId: "PC-02",
    date: "",
    time: "18:00",
    duration: 2,
    addons: []
  },

  addonsCatalog: [
    { id: "wooting", name: "Wooting 60HE Rapid-Trigger Keyboard", price: 3 },
    { id: "shure", name: "Shure SM7B Studio Broadcast Mic", price: 4 },
    { id: "tactsuit", name: "bHaptics Sensory Haptic Vest", price: 5 },
    { id: "combo-snack", name: "Bistro Fuel Pack (Cold Brew + Fries)", price: 8 }
  ],

  init() {
    this.populateZones();
    this.populateStations();
    this.setupListeners();
    this.setDefaultDate();
    this.calculateTotal();
  },

  setDefaultDate() {
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("book-date");
    if (dateInput) {
      dateInput.value = today;
      dateInput.min = today;
      this.activeBooking.date = today;
    }
  },

  populateZones() {
    const zoneSelect = document.getElementById("book-zone");
    if (!zoneSelect) return;

    zoneSelect.innerHTML = NEXUS_DATA.zones.map(z => {
      const rate = Math.round(z.hourlyRate * NEXUS_DATA.cafeInfo.rateMultiplier);
      const symbol = NEXUS_DATA.cafeInfo.currencySymbol;
      return `<option value="${z.id}">${z.name} (${symbol}${rate}/hr)</option>`;
    }).join("");

    zoneSelect.value = this.activeBooking.zoneId;
  },

  populateStations() {
    const stationSelect = document.getElementById("book-station");
    if (!stationSelect) return;

    const currentZone = this.activeBooking.zoneId;
    const stations = NEXUS_DATA.stations.filter(s => s.zone === currentZone);

    stationSelect.innerHTML = stations.map(s => {
      const statusNote = s.status === "available" ? "🟢 Available" : `🟡 ${s.status}`;
      return `<option value="${s.id}">${s.id} - ${s.name} [${statusNote}]</option>`;
    }).join("");

    if (stations.length > 0) {
      this.activeBooking.stationId = stations[0].id;
      stationSelect.value = stations[0].id;
    }
  },

  preselectStation(stationId) {
    const station = NEXUS_DATA.stations.find(s => s.id === stationId);
    if (!station) return;

    this.activeBooking.zoneId = station.zone;
    this.activeBooking.stationId = station.id;

    const zoneSelect = document.getElementById("book-zone");
    if (zoneSelect) zoneSelect.value = station.zone;

    this.populateStations();
    const stationSelect = document.getElementById("book-station");
    if (stationSelect) stationSelect.value = station.id;

    this.calculateTotal();
    NexusApp.openModal("booking-modal");
  },

  setupListeners() {
    const zoneSelect = document.getElementById("book-zone");
    if (zoneSelect) {
      zoneSelect.addEventListener("change", (e) => {
        this.activeBooking.zoneId = e.target.value;
        this.populateStations();
        this.calculateTotal();
      });
    }

    const stationSelect = document.getElementById("book-station");
    if (stationSelect) {
      stationSelect.addEventListener("change", (e) => {
        this.activeBooking.stationId = e.target.value;
        this.calculateTotal();
      });
    }

    const durationSelect = document.getElementById("book-duration");
    if (durationSelect) {
      durationSelect.addEventListener("change", (e) => {
        this.activeBooking.duration = parseInt(e.target.value, 10);
        this.calculateTotal();
      });
    }

    const dateInput = document.getElementById("book-date");
    if (dateInput) {
      dateInput.addEventListener("change", (e) => {
        this.activeBooking.date = e.target.value;
      });
    }

    const timeInput = document.getElementById("book-time");
    if (timeInput) {
      timeInput.addEventListener("change", (e) => {
        this.activeBooking.time = e.target.value;
      });
    }

    // Addon checkboxes
    document.querySelectorAll(".booking-addon-check").forEach(chk => {
      chk.addEventListener("change", () => {
        const id = chk.getAttribute("data-addon-id");
        if (chk.checked) {
          if (!this.activeBooking.addons.includes(id)) this.activeBooking.addons.push(id);
        } else {
          this.activeBooking.addons = this.activeBooking.addons.filter(a => a !== id);
        }
        this.calculateTotal();
      });
    });
  },

  calculateTotal() {
    const zone = NEXUS_DATA.zones.find(z => z.id === this.activeBooking.zoneId);
    const hourlyRate = zone ? Math.round(zone.hourlyRate * NEXUS_DATA.cafeInfo.rateMultiplier) : 10;
    const duration = this.activeBooking.duration || 1;
    const baseTotal = hourlyRate * duration;

    let addonsTotal = 0;
    this.activeBooking.addons.forEach(addonId => {
      const addon = this.addonsCatalog.find(a => a.id === addonId);
      if (addon) addonsTotal += Math.round(addon.price * NEXUS_DATA.cafeInfo.rateMultiplier);
    });

    const grandTotal = baseTotal + addonsTotal;
    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;

    const rateDisplay = document.getElementById("book-summary-rate");
    const durationDisplay = document.getElementById("book-summary-duration");
    const addonsDisplay = document.getElementById("book-summary-addons");
    const grandTotalDisplay = document.getElementById("book-summary-total");

    if (rateDisplay) rateDisplay.textContent = `${symbol}${hourlyRate}/hr`;
    if (durationDisplay) durationDisplay.textContent = `${duration} Hours (${symbol}${baseTotal})`;
    if (addonsDisplay) addonsDisplay.textContent = `${symbol}${addonsTotal}`;
    if (grandTotalDisplay) grandTotalDisplay.textContent = `${symbol}${grandTotal}`;

    return grandTotal;
  },

  submitBooking(e) {
    if (e) e.preventDefault();

    const name = document.getElementById("book-name") ? document.getElementById("book-name").value.trim() : "";
    const email = document.getElementById("book-email") ? document.getElementById("book-email").value.trim() : "";

    if (!name || !email) {
      NexusApp.showToast("⚠️ Please enter your Gamer Tag/Name & Email");
      return;
    }

    const total = this.calculateTotal();
    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;
    const bookingCode = "NX-" + Math.floor(100000 + Math.random() * 900000);

    const reservation = {
      code: bookingCode,
      name: name,
      email: email,
      zone: this.activeBooking.zoneId,
      stationId: this.activeBooking.stationId,
      date: this.activeBooking.date || new Date().toISOString().split("T")[0],
      time: this.activeBooking.time || "18:00",
      duration: this.activeBooking.duration,
      addons: [...this.activeBooking.addons],
      total: total,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("nexus_bookings") || "[]");
    saved.unshift(reservation);
    localStorage.setItem("nexus_bookings", JSON.stringify(saved));

    // Play chime
    if (window.NexusAudio) window.NexusAudio.success();

    // Close booking modal and show Voucher Modal
    NexusApp.closeModal("booking-modal");
    this.showVoucherModal(reservation);
  },

  showVoucherModal(res) {
    const voucherContent = document.getElementById("voucher-modal-content");
    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;
    const zoneObj = NEXUS_DATA.zones.find(z => z.id === res.zone);
    const zoneName = zoneObj ? zoneObj.name : "Battlestation Pit";

    if (voucherContent) {
      voucherContent.innerHTML = `
        <div class="booking-voucher-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 6px;">VIP ARENA PASS CONFIRMED</span>
              <h3 style="font-size: 1.5rem; color: #fff; margin: 0;">${NEXUS_DATA.cafeInfo.name}</h3>
              <div style="font-size: 0.8rem; color: var(--text-dim);">${NEXUS_DATA.cafeInfo.location}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Pass Code</div>
              <div style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--accent-gold); font-weight: 800;">${res.code}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 20px;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Gamer Tag / Name</div>
              <div style="font-weight: 700; color: #fff;">${res.name}</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Station ID</div>
              <div style="font-family: var(--font-heading); font-weight: 800; color: var(--primary);">${res.stationId} (${zoneName})</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Date & Start Time</div>
              <div style="font-weight: 600; color: #fff;">${res.date} @ ${res.time}</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Session Duration</div>
              <div style="font-weight: 600; color: #fff;">${res.duration} Hours (${symbol}${res.total} Total)</div>
            </div>
          </div>

          <div class="voucher-barcode"></div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">
            <span>Scan at front cyber-desk or mobile kiosk</span>
            <span>Security Hash: 0x889F-NX</span>
          </div>
        </div>
      `;
    }

    NexusApp.openModal("voucher-modal");
    NexusApp.showToast("🎉 Battlestation Reserved! Check your Arena Pass.");
  }
};

window.NexusBooking = NexusBooking;
