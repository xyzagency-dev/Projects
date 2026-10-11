/**
 * LUMEN & CO. — Session Investment & Quote Calculator
 * Dynamic real-time pricing engine for custom studio commissions.
 */

const BASE_RATES = {
  wedding: { name: 'Luxury Wedding & Elopement', base: 4500, deliverables: '450+ Master Color-Graded Stills' },
  editorial: { name: 'Fashion & Editorial Campaign', base: 3200, deliverables: '35 Haute Retouched Stills' },
  commercial: { name: 'Commercial Brand & Product', base: 5800, deliverables: '50 Print-Ready Advertising Assets' },
  portraiture: { name: 'Executive & VIP Portraiture', base: 1400, deliverables: '12 Magazine-Grade Portraits' },
  architecture: { name: 'Architectural & Interior Space', base: 2600, deliverables: '25 HDR Architectural Exposures' }
};

const DURATION_MULTIPLIERS = {
  half: { multiplier: 1.0, label: 'Half-Day (Up to 4 Hours)' },
  full: { multiplier: 1.75, label: 'Full-Day (Up to 8 Hours)' },
  multi: { multiplier: 3.2, label: 'Multi-Day / Destination (2-3 Days)' }
};

const ADDONS = {
  drone: { price: 850, name: 'Cinema 4K Aerial Drone Capture' },
  second_shooter: { price: 1200, name: 'Second Lead Associate Photographer' },
  rush_turnaround: { price: 950, name: '48-Hour Rush Delivery & Tethered Culling' },
  album: { price: 1600, name: 'Italian Hand-Bound Archival Art Album' },
  stylist: { price: 1100, name: 'Master Hair, Makeup & Wardrobe Stylist' }
};

let selectedSession = 'editorial';
let selectedDuration = 'full';
let selectedAddons = new Set(['rush_turnaround']);
let isCommercialBuyout = false;

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

function initCalculator() {
  const sessionCards = document.querySelectorAll('.session-radio-card');
  const durationRadios = document.querySelectorAll('input[name="calcDuration"]');
  const addonRows = document.querySelectorAll('.addon-checkbox-row');
  const licenseToggle = document.getElementById('commercialLicenseToggle');
  const lockQuoteBtn = document.getElementById('lockQuoteBtn');

  // Session Type Selection
  sessionCards.forEach(card => {
    card.addEventListener('click', () => {
      sessionCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedSession = card.getAttribute('data-session') || 'editorial';
      calculateQuote();
      if (window.playHasselbladShutter) window.playHasselbladShutter();
    });
  });

  // Duration Selection
  durationRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedDuration = e.target.value;
      calculateQuote();
    });
  });

  // Add-ons Checkboxes
  addonRows.forEach(row => {
    row.addEventListener('click', () => {
      const addonKey = row.getAttribute('data-addon');
      if (!addonKey) return;

      if (selectedAddons.has(addonKey)) {
        selectedAddons.delete(addonKey);
        row.classList.remove('checked');
      } else {
        selectedAddons.add(addonKey);
        row.classList.add('checked');
      }
      calculateQuote();
    });
  });

  // Commercial Buyout Toggle
  if (licenseToggle) {
    licenseToggle.addEventListener('change', (e) => {
      isCommercialBuyout = e.target.checked;
      calculateQuote();
    });
  }

  // Lock In Quote button
  if (lockQuoteBtn) {
    lockQuoteBtn.addEventListener('click', () => {
      openBookingWithQuote();
    });
  }

  calculateQuote();
}

function calculateQuote() {
  const sessionData = BASE_RATES[selectedSession] || BASE_RATES.editorial;
  const durationData = DURATION_MULTIPLIERS[selectedDuration] || DURATION_MULTIPLIERS.full;

  const basePrice = Math.round(sessionData.base * durationData.multiplier);

  let addonsTotal = 0;
  selectedAddons.forEach(key => {
    if (ADDONS[key]) addonsTotal += ADDONS[key].price;
  });

  let subtotal = basePrice + addonsTotal;
  let licensingFee = isCommercialBuyout ? Math.round(subtotal * 0.35) : 0;
  let total = subtotal + licensingFee;
  let deposit = Math.round(total * 0.30);

  // Update Summary UI
  const sessionNameEl = document.getElementById('calcSummarySession');
  const durationLabelEl = document.getElementById('calcSummaryDuration');
  const basePriceEl = document.getElementById('calcSummaryBase');
  const addonsTotalEl = document.getElementById('calcSummaryAddons');
  const licenseFeeEl = document.getElementById('calcSummaryLicense');
  const licenseRowEl = document.getElementById('calcSummaryLicenseRow');
  const totalAmountEl = document.getElementById('calcSummaryTotal');
  const depositAmountEl = document.getElementById('calcSummaryDeposit');
  const deliverablesEl = document.getElementById('calcSummaryDeliverables');

  if (sessionNameEl) sessionNameEl.textContent = sessionData.name;
  if (durationLabelEl) durationLabelEl.textContent = durationData.label;
  if (basePriceEl) basePriceEl.textContent = `$${basePrice.toLocaleString()}`;
  if (addonsTotalEl) addonsTotalEl.textContent = `$${addonsTotal.toLocaleString()}`;
  
  if (licenseRowEl && licenseFeeEl) {
    if (isCommercialBuyout) {
      licenseRowEl.style.display = 'flex';
      licenseFeeEl.textContent = `+$${licensingFee.toLocaleString()}`;
    } else {
      licenseRowEl.style.display = 'none';
    }
  }

  if (totalAmountEl) totalAmountEl.textContent = `$${total.toLocaleString()}`;
  if (depositAmountEl) depositAmountEl.textContent = `$${deposit.toLocaleString()}`;
  if (deliverablesEl) deliverablesEl.textContent = sessionData.deliverables;
}

function openBookingWithQuote() {
  const totalEl = document.getElementById('calcSummaryTotal');
  const totalVal = totalEl ? totalEl.textContent : '$4,500';
  const sessionData = BASE_RATES[selectedSession] || BASE_RATES.editorial;

  const bookingModal = document.getElementById('bookingModal');
  const serviceSelect = document.getElementById('bookingServiceSelect');
  const notesTextarea = document.getElementById('bookNotes');

  if (serviceSelect) {
    serviceSelect.value = sessionData.name.includes('Wedding') ? 'Luxury Wedding' :
                          sessionData.name.includes('Commercial') ? 'Commercial Campaign' :
                          sessionData.name.includes('Portraiture') ? 'Executive Portraiture' : 'Editorial Fashion';
  }

  if (notesTextarea) {
    const addonsList = Array.from(selectedAddons).map(k => ADDONS[k]?.name).filter(Boolean).join(', ');
    notesTextarea.value = `[CUSTOM ESTIMATOR QUOTE]: ${sessionData.name} (${DURATION_MULTIPLIERS[selectedDuration].label})\nSelected Addons: ${addonsList || 'None'}\nLicensing: ${isCommercialBuyout ? 'Global Commercial Buyout (+35%)' : 'Standard Editorial / Personal'}\nEstimated Investment: ${totalVal}`;
  }

  if (bookingModal) {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.playHasselbladShutter) window.playHasselbladShutter();
    if (window.showToast) window.showToast(`Custom quote of ${totalVal} transferred to your reservation form!`);
  }
}
