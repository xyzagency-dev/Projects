/**
 * NEXUS ARENA — Station Map & Live Radar Engine
 */

const NexusStationMap = {
  currentFilter: "all",
  container: null,

  init() {
    this.container = document.getElementById("station-grid-container");
    if (!this.container) return;

    this.setupFilters();
    this.render();

    // Periodic simulation of random session progress
    setInterval(() => {
      this.tick();
    }, 12000);
  },

  setupFilters() {
    const filterButtons = document.querySelectorAll("[data-zone-filter]");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.getAttribute("data-zone-filter");
        if (window.NexusAudio) window.NexusAudio.click();
        this.render();
      });
    });
  },

  render() {
    if (!this.container) return;
    const stations = NEXUS_DATA.stations.filter(s => {
      if (this.currentFilter === "all") return true;
      return s.zone === this.currentFilter;
    });

    this.container.innerHTML = stations.map(station => {
      const zoneObj = NEXUS_DATA.zones.find(z => z.id === station.zone);
      const zoneName = zoneObj ? zoneObj.name : "Gaming Station";
      const currency = NEXUS_DATA.cafeInfo.currencySymbol;
      const rate = Math.round(zoneObj ? zoneObj.hourlyRate * NEXUS_DATA.cafeInfo.rateMultiplier : 10);

      let statusBadge = "";
      let statusClass = station.status;
      let statusText = "Available";

      if (station.status === "occupied") {
        statusText = `In Use • ${station.remainingMin}m left`;
      } else if (station.status === "reserved") {
        statusText = `Reserved • Next ${station.remainingMin}m`;
      } else if (station.status === "maintenance") {
        statusText = "Maintenance";
      }

      return `
        <div class="station-node ${statusClass}" onclick="NexusStationMap.openStationModal('${station.id}')">
          <div class="station-node-header">
            <span class="station-id">${station.id}</span>
            <div class="status-indicator">
              <span class="dot-pulse ${statusClass}"></span>
              <span style="font-size: 0.76rem; text-transform: uppercase;">${station.status}</span>
            </div>
          </div>
          <div class="station-meta-zone">${zoneName}</div>
          <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 6px; color: #fff;">
            ${station.name}
          </div>
          <div class="station-specs-preview">
            ${station.specs}
          </div>
          <div class="station-node-footer">
            <span style="color: var(--text-dim);">${statusText}</span>
            <span style="font-family: var(--font-heading); font-weight: 700; color: var(--primary);">
              ${currency}${rate}/hr
            </span>
          </div>
        </div>
      `;
    }).join("");

    this.updateLiveCount();
  },

  updateLiveCount() {
    const total = NEXUS_DATA.stations.length;
    const occupied = NEXUS_DATA.stations.filter(s => s.status === "occupied").length;
    const liveCounterEl = document.getElementById("live-rig-counter");
    if (liveCounterEl) {
      liveCounterEl.innerHTML = `🟢 <strong>${occupied} / ${total}</strong> Battlestations Active`;
    }
  },

  openStationModal(stationId) {
    const station = NEXUS_DATA.stations.find(s => s.id === stationId);
    if (!station) return;

    if (window.NexusAudio) window.NexusAudio.stationSelect();

    const zoneObj = NEXUS_DATA.zones.find(z => z.id === station.zone);
    const currency = NEXUS_DATA.cafeInfo.currencySymbol;
    const rate = Math.round(zoneObj ? zoneObj.hourlyRate * NEXUS_DATA.cafeInfo.rateMultiplier : 10);

    const modalTitle = document.getElementById("station-modal-title");
    const modalBody = document.getElementById("station-modal-body");
    const modalFooter = document.getElementById("station-modal-footer");

    if (modalTitle) modalTitle.textContent = `${station.id} — ${station.name}`;

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
          <div style="flex: 1;">
            <div style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Zone Category</div>
            <div style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; font-weight: 700;">${zoneObj ? zoneObj.name : "Arena"}</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Hourly Rate</div>
            <div style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--primary); font-weight: 800;">${currency}${rate} / hr</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Live Status</div>
            <span class="badge ${station.status === 'available' ? 'badge-primary' : 'badge-secondary'}">${station.status}</span>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Hardware & Setup Specifications</h4>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; font-size: 0.9rem; line-height: 1.6;">
            ${station.specs}
          </div>
        </div>

        ${station.status === 'occupied' ? `
          <div style="background: rgba(255,51,102,0.1); border: 1px solid rgba(255,51,102,0.3); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 20px;">
            <div style="font-weight: 700; color: #ff3366; font-size: 0.9rem; margin-bottom: 4px;">Currently In Use</div>
            <div style="font-size: 0.85rem; color: #cbd5e1;">Gamer: <strong>${station.user}</strong> is playing <strong>${station.game}</strong>. Approx ${station.remainingMin} minutes remaining in session.</div>
          </div>
        ` : ''}

        <p style="font-size: 0.85rem; color: var(--text-dim);">
          Every station includes sanitization before each session, private gigabit LAN connection, Discord team channel integration, and instant desk bistro service.
        </p>
      `;
    }

    if (modalFooter) {
      modalFooter.innerHTML = `
        <button class="btn btn-outline btn-sm" onclick="NexusApp.closeModal('station-modal')">Close</button>
        <button class="btn btn-primary btn-sm" onclick="NexusStationMap.quickBookStation('${station.id}')">
          ${station.status === 'available' ? '⚡ Reserve This Rig Now' : 'Schedule Future Slot'}
        </button>
      `;
    }

    NexusApp.openModal("station-modal");
  },

  quickBookStation(stationId) {
    NexusApp.closeModal("station-modal");
    NexusBooking.preselectStation(stationId);
  },

  tick() {
    // Randomly update remaining minutes for simulation realism
    NEXUS_DATA.stations.forEach(s => {
      if (s.status === "occupied" && s.remainingMin > 2) {
        s.remainingMin -= 1;
      }
    });
    this.render();
  }
};

window.NexusStationMap = NexusStationMap;
