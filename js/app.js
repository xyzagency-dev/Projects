/**
 * Vanguard & Stone - Core Application Logic
 * Interactive Engine for Real Estate, Construction Estimator & Client Portals
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// State Management
const appState = {
  savedProperties: JSON.parse(localStorage.getItem('vs_saved_properties') || '[]'),
  comparisonList: [],
  activeCategory: 'all',
  searchQuery: '',
  selectedPropertyForModal: null,
  
  // Construction Estimator State
  estimator: {
    projectType: 'ground-up', // 'ground-up', 'renovation', 'pavilion'
    sqft: 7500,
    finishTier: 'ultra', // 'signature', 'ultra', 'netzero'
    ratePerSqft: {
      'ground-up': { signature: 650, ultra: 950, netzero: 1250 },
      'renovation': { signature: 450, ultra: 720, netzero: 920 },
      'pavilion': { signature: 750, ultra: 1100, netzero: 1450 }
    }
  },

  // Mortgage Calculator State
  mortgage: {
    homePrice: 22800000,
    downPaymentPercent: 25,
    interestRate: 6.2,
    termYears: 30
  }
};

function initApp() {
  renderProperties();
  setupFilterHandlers();
  setupEstimator();
  setupMortgageCalculator();
  setupBeforeAfterSlider();
  setupNavigation();
  setupModals();
  setupForms();
  updateSavedBadge();
}

/* ==========================================================================
   NAVIGATION & UI INTERACTIONS
   ========================================================================== */

function setupNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-menu-open');
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          document.body.classList.remove('mobile-menu-open');
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Saved properties pill click
  const savedPill = document.getElementById('savedPillBtn');
  if (savedPill) {
    savedPill.addEventListener('click', () => {
      openComparisonDrawer();
    });
  }
}

/* ==========================================================================
   PROPERTIES RENDERING & FILTERING
   ========================================================================== */

function renderProperties() {
  const container = document.getElementById('propertiesGrid');
  if (!container) return;

  let filtered = PROPERTIES_DATA.filter(prop => {
    const matchesCat = appState.activeCategory === 'all' || prop.category === appState.activeCategory;
    const matchesSearch = appState.searchQuery === '' ||
      prop.title.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
      prop.features.some(f => f.toLowerCase().includes(appState.searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <h4 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">No Residences Found</h4>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">No properties matched your current filter criteria.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prop => {
    const isSaved = appState.savedProperties.includes(prop.id);
    const isCompared = appState.comparisonList.some(item => item.id === prop.id);
    const statusClass = prop.status.toLowerCase().replace(' ', '-');

    return `
      <div class="property-card" data-id="${prop.id}">
        <div class="property-img-wrap">
          <img src="${prop.image}" alt="${prop.title}" loading="lazy">
          <span class="property-status-badge status-${statusClass}">${prop.status}</span>
          
          <div class="property-actions-overlay">
            <button class="action-circle-btn ${isSaved ? 'favorited' : ''}" 
                    title="${isSaved ? 'Remove from Saved' : 'Save Property'}" 
                    onclick="toggleSaveProperty('${prop.id}', event)">
              ♥
            </button>
            <button class="action-circle-btn" 
                    title="Add to Comparison" 
                    onclick="toggleCompareProperty('${prop.id}', event)">
              ⇄
            </button>
          </div>

          <div class="property-price-bar">
            <div>
              <div class="property-badge-tag">${prop.badge}</div>
              <div class="property-price">${prop.priceFormatted}</div>
            </div>
          </div>
        </div>

        <div class="property-info">
          <h3 class="property-title">${prop.title}</h3>
          <div class="property-location">
            <span>📍</span> ${prop.location}
          </div>

          <div class="property-specs">
            <div class="spec-item">
              <span class="spec-value">${prop.beds} Beds</span>
              <span class="spec-label">Bedrooms</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${prop.baths} Baths</span>
              <span class="spec-label">Bathrooms</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${prop.sqft.toLocaleString()}</span>
              <span class="spec-label">Living Sq.Ft</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${prop.yearBuilt}</span>
              <span class="spec-label">Year Built</span>
            </div>
          </div>

          <div class="property-card-footer">
            <button class="btn btn-secondary btn-sm" onclick="openPropertyModal('${prop.id}')">
              Explore Residence
            </button>
            <button class="btn btn-outline-gold btn-sm" onclick="openBookingModal('${prop.title}')">
              Private Tour
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilterHandlers() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeCategory = chip.getAttribute('data-cat');
      renderProperties();
    });
  });

  const searchInput = document.getElementById('propertySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value.trim();
      renderProperties();
    });
  }

  // Quick search form in hero
  const heroQuickForm = document.getElementById('heroQuickSearchForm');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('heroPropertyType').value;
      const budget = document.getElementById('heroBudget').value;
      
      if (type) {
        appState.activeCategory = type;
        const matchingChip = document.querySelector(`.filter-chip[data-cat="${type}"]`);
        if (matchingChip) {
          document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          matchingChip.classList.add('active');
        }
      }
      
      const propertiesSection = document.getElementById('propertiesSection');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
      renderProperties();
      showToast(`Filtered residences for: ${type || 'all luxury portfolios'}`);
    });
  }
}

window.resetFilters = function() {
  appState.activeCategory = 'all';
  appState.searchQuery = '';
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-cat') === 'all');
  });
  const searchInput = document.getElementById('propertySearchInput');
  if (searchInput) searchInput.value = '';
  renderProperties();
};

/* ==========================================================================
   FAVORITES & COMPARISON SYSTEM
   ========================================================================== */

window.toggleSaveProperty = function(id, event) {
  if (event) event.stopPropagation();
  const index = appState.savedProperties.indexOf(id);
  const prop = PROPERTIES_DATA.find(p => p.id === id);

  if (index > -1) {
    appState.savedProperties.splice(index, 1);
    showToast(`Removed "${prop.title}" from saved list`);
  } else {
    appState.savedProperties.push(id);
    showToast(`Saved "${prop.title}" to private portfolio`);
  }

  localStorage.setItem('vs_saved_properties', JSON.stringify(appState.savedProperties));
  updateSavedBadge();
  renderProperties();
};

window.toggleCompareProperty = function(id, event) {
  if (event) event.stopPropagation();
  const existingIndex = appState.comparisonList.findIndex(item => item.id === id);
  const prop = PROPERTIES_DATA.find(p => p.id === id);

  if (existingIndex > -1) {
    appState.comparisonList.splice(existingIndex, 1);
    showToast(`Removed "${prop.title}" from comparison drawer`);
  } else {
    if (appState.comparisonList.length >= 3) {
      showToast('Maximum 3 properties can be compared simultaneously.');
      return;
    }
    appState.comparisonList.push(prop);
    showToast(`Added "${prop.title}" to side-by-side comparison`);
  }

  renderComparisonDrawer();
};

function updateSavedBadge() {
  const counter = document.getElementById('savedCounter');
  if (counter) {
    counter.textContent = appState.savedProperties.length;
  }
}

function openComparisonDrawer() {
  const drawer = document.getElementById('comparisonDrawer');
  if (drawer) {
    renderComparisonDrawer();
    drawer.classList.add('active');
  }
}

window.closeComparisonDrawer = function() {
  const drawer = document.getElementById('comparisonDrawer');
  if (drawer) {
    drawer.classList.remove('active');
  }
};

function renderComparisonDrawer() {
  const drawer = document.getElementById('comparisonDrawer');
  const itemsContainer = document.getElementById('drawerItemsContainer');
  if (!drawer || !itemsContainer) return;

  if (appState.comparisonList.length === 0) {
    // If no compare items, populate with saved properties or prompt
    const saved = PROPERTIES_DATA.filter(p => appState.savedProperties.includes(p.id));
    if (saved.length > 0) {
      appState.comparisonList = saved.slice(0, 3);
    }
  }

  if (appState.comparisonList.length === 0) {
    itemsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 12px 0; color: var(--text-secondary); font-size: 0.9rem;">
        No properties currently selected for comparison. Click "⇄" on any residence card above.
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = appState.comparisonList.map(prop => {
    const pricePerSqft = Math.round(prop.price / prop.sqft);
    return `
      <div class="drawer-item-card">
        <img class="drawer-thumb" src="${prop.image}" alt="${prop.title}">
        <div class="drawer-info">
          <h6>${prop.title}</h6>
          <p>${prop.priceFormatted}</p>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            ${prop.sqft.toLocaleString()} sqft • $${pricePerSqft}/sqft • ${prop.beds}b/${prop.baths}ba
          </div>
        </div>
        <button class="drawer-remove-btn" onclick="removeCompareItem('${prop.id}')" title="Remove">&times;</button>
      </div>
    `;
  }).join('');

  drawer.classList.add('active');
}

window.removeCompareItem = function(id) {
  appState.comparisonList = appState.comparisonList.filter(item => item.id !== id);
  renderComparisonDrawer();
  renderProperties();
};

/* ==========================================================================
   CONSTRUCTION FEASIBILITY & INVESTMENT ESTIMATOR
   ========================================================================== */

function setupEstimator() {
  const sqftInput = document.getElementById('estimatorSqft');
  const sqftDisplay = document.getElementById('estimatorSqftVal');
  const typeBoxes = document.querySelectorAll('.type-option-box');
  const finishBoxes = document.querySelectorAll('.finish-option-box');

  if (!sqftInput) return;

  // Sqft Slider
  sqftInput.addEventListener('input', (e) => {
    appState.estimator.sqft = parseInt(e.target.value, 10);
    if (sqftDisplay) sqftDisplay.textContent = `${appState.estimator.sqft.toLocaleString()} sq.ft`;
    calculateEstimator();
  });

  // Project Type
  typeBoxes.forEach(box => {
    box.addEventListener('click', () => {
      typeBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      appState.estimator.projectType = box.getAttribute('data-type');
      calculateEstimator();
    });
  });

  // Finish Tier
  finishBoxes.forEach(box => {
    box.addEventListener('click', () => {
      finishBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      appState.estimator.finishTier = box.getAttribute('data-tier');
      calculateEstimator();
    });
  });

  calculateEstimator();
}

function calculateEstimator() {
  const { projectType, finishTier, sqft, ratePerSqft } = appState.estimator;
  const baseRate = ratePerSqft[projectType][finishTier];

  const totalEstimate = sqft * baseRate;
  const structuralCost = Math.round(totalEstimate * 0.42);
  const finishesCost = Math.round(totalEstimate * 0.38);
  const architecturalMep = Math.round(totalEstimate * 0.20);

  // Timeline computation based on sqft and project type
  let baseMonths = projectType === 'renovation' ? 10 : (projectType === 'pavilion' ? 14 : 16);
  if (sqft > 10000) baseMonths += 4;
  else if (sqft > 6000) baseMonths += 2;

  // Update DOM
  const totalDisplay = document.getElementById('estimatorTotalDisplay');
  const structuralDisplay = document.getElementById('costStructural');
  const finishesDisplay = document.getElementById('costFinishes');
  const mepDisplay = document.getElementById('costMep');
  const timelineDisplay = document.getElementById('estimatorTimeline');
  const rateDisplay = document.getElementById('estimatorRatePerSqft');

  if (totalDisplay) totalDisplay.textContent = `$${totalEstimate.toLocaleString()}`;
  if (structuralDisplay) structuralDisplay.textContent = `$${structuralCost.toLocaleString()}`;
  if (finishesDisplay) finishesDisplay.textContent = `$${finishesCost.toLocaleString()}`;
  if (mepDisplay) mepDisplay.textContent = `$${architecturalMep.toLocaleString()}`;
  if (timelineDisplay) timelineDisplay.textContent = `${baseMonths} – ${baseMonths + 3} Months`;
  if (rateDisplay) rateDisplay.textContent = `$${baseRate} / sq.ft`;
}

window.exportEstimatorPdf = function() {
  const { projectType, finishTier, sqft } = appState.estimator;
  const total = document.getElementById('estimatorTotalDisplay').textContent;
  
  showToast('Generating official Vanguard Feasibility Report PDF...');
  setTimeout(() => {
    showToast(`Feasibility Report generated for ${sqft.toLocaleString()} sqft (${total})`);
    openBookingModal(`Construction Consultation (${projectType.toUpperCase()} - ${total})`);
  }, 900);
};

/* ==========================================================================
   MORTGAGE & FINANCING ROI CALCULATOR
   ========================================================================== */

function setupMortgageCalculator() {
  const priceInput = document.getElementById('mortgagePrice');
  const priceDisplay = document.getElementById('mortgagePriceVal');
  const downInput = document.getElementById('mortgageDown');
  const downDisplay = document.getElementById('mortgageDownVal');
  const rateInput = document.getElementById('mortgageRate');
  const rateDisplay = document.getElementById('mortgageRateVal');
  const termSelect = document.getElementById('mortgageTerm');

  if (!priceInput) return;

  priceInput.addEventListener('input', (e) => {
    appState.mortgage.homePrice = parseFloat(e.target.value);
    if (priceDisplay) priceDisplay.textContent = `$${appState.mortgage.homePrice.toLocaleString()}`;
    calculateMortgage();
  });

  downInput.addEventListener('input', (e) => {
    appState.mortgage.downPaymentPercent = parseFloat(e.target.value);
    if (downDisplay) downDisplay.textContent = `${appState.mortgage.downPaymentPercent}% ($${Math.round(appState.mortgage.homePrice * (appState.mortgage.downPaymentPercent / 100)).toLocaleString()})`;
    calculateMortgage();
  });

  rateInput.addEventListener('input', (e) => {
    appState.mortgage.interestRate = parseFloat(e.target.value);
    if (rateDisplay) rateDisplay.textContent = `${appState.mortgage.interestRate.toFixed(2)}%`;
    calculateMortgage();
  });

  if (termSelect) {
    termSelect.addEventListener('change', (e) => {
      appState.mortgage.termYears = parseInt(e.target.value, 10);
      calculateMortgage();
    });
  }

  calculateMortgage();
}

function calculateMortgage() {
  const { homePrice, downPaymentPercent, interestRate, termYears } = appState.mortgage;

  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPaymentAmount;

  const monthlyRate = (interestRate / 100) / 12;
  const numPayments = termYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0) {
    monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPrincipalInterest = loanAmount / numPayments;
  }

  // Luxury property tax ~1.15% per year, luxury insurance ~0.35%
  const monthlyPropertyTax = (homePrice * 0.0115) / 12;
  const monthlyInsurance = (homePrice * 0.0035) / 12;
  const monthlyTotal = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance;

  // DOM
  const totalDisplay = document.getElementById('mortgageMonthlyTotal');
  const piDisplay = document.getElementById('mortgagePI');
  const taxDisplay = document.getElementById('mortgageTax');
  const insDisplay = document.getElementById('mortgageIns');
  const loanDisplay = document.getElementById('mortgageLoanAmount');

  if (totalDisplay) totalDisplay.textContent = `$${Math.round(monthlyTotal).toLocaleString()}/mo`;
  if (piDisplay) piDisplay.textContent = `$${Math.round(monthlyPrincipalInterest).toLocaleString()}`;
  if (taxDisplay) taxDisplay.textContent = `$${Math.round(monthlyPropertyTax).toLocaleString()}`;
  if (insDisplay) insDisplay.textContent = `$${Math.round(monthlyInsurance).toLocaleString()}`;
  if (loanDisplay) loanDisplay.textContent = `$${Math.round(loanAmount).toLocaleString()}`;
}

// Tab Switching between Estimators
window.switchCalcTab = function(tabName) {
  document.querySelectorAll('.calc-tab-trigger').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  document.querySelectorAll('.calc-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `calcPanel-${tabName}`);
  });
};

/* ==========================================================================
   INTERACTIVE BEFORE / AFTER SLIDER
   ========================================================================== */

function setupBeforeAfterSlider() {
  const container = document.querySelector('.comparison-slider-wrapper');
  const beforeWrap = document.querySelector('.comparison-before-wrap');
  const handle = document.querySelector('.comparison-handle');

  if (!container || !beforeWrap || !handle) return;

  let isDragging = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let posX = clientX - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    beforeWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  handle.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  // Touch Support
  handle.addEventListener('touchstart', () => { isDragging = true; });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    moveSlider(e.touches[0].clientX);
  });

  // Clicking anywhere on slider jumps handle
  container.addEventListener('click', (e) => {
    moveSlider(e.clientX);
  });
}

/* ==========================================================================
   MODAL CONTROLLERS
   ========================================================================== */

function setupModals() {
  // Backdrop close listeners
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });
}

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
};

window.openPropertyModal = function(id) {
  const prop = PROPERTIES_DATA.find(p => p.id === id);
  if (!prop) return;

  appState.selectedPropertyForModal = prop;
  const modal = document.getElementById('propertyDetailModal');
  const modalBody = document.getElementById('propertyDetailContent');

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="position: relative;">
      <div style="aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--radius-md) var(--radius-md) 0 0;">
        <img id="modalMainImg" src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="display: flex; gap: 10px; margin-top: 12px;">
        ${prop.gallery.map((img, idx) => `
          <img src="${img}" alt="Thumbnail ${idx}" 
               style="width: 80px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--gold-400)' : 'transparent'};"
               onclick="document.getElementById('modalMainImg').src='${img}'">
        `).join('')}
      </div>
    </div>

    <div style="padding: 32px 0 10px 0;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="section-tag">${prop.badge}</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; color: #fff; margin-bottom: 6px;">${prop.title}</h2>
          <p style="color: var(--text-secondary); font-size: 1rem;">📍 ${prop.location}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-400); font-weight: 700;">Asking Price</div>
          <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #fff;">${prop.priceFormatted}</div>
        </div>
      </div>

      <p style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.8; margin-bottom: 28px;">
        ${prop.description}
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; margin-bottom: 28px;">
        <h4 style="font-family: var(--font-display); margin-bottom: 16px; color: #fff;">Architectural Specifications</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 0.9rem;">
          <div><strong style="color: var(--text-secondary);">Architect:</strong> <span style="color: #fff;">${prop.architect}</span></div>
          <div><strong style="color: var(--text-secondary);">Structure:</strong> <span style="color: #fff;">${prop.constructionType}</span></div>
          <div><strong style="color: var(--text-secondary);">Bedrooms/Baths:</strong> <span style="color: #fff;">${prop.beds} Beds / ${prop.baths} Baths</span></div>
          <div><strong style="color: var(--text-secondary);">Interior Area:</strong> <span style="color: #fff;">${prop.sqft.toLocaleString()} sq.ft</span></div>
          <div><strong style="color: var(--text-secondary);">Year Completed:</strong> <span style="color: #fff;">${prop.yearBuilt}</span></div>
        </div>
      </div>

      <h4 style="font-family: var(--font-display); margin-bottom: 14px; color: #fff;">Key Amenities & Craftsmanship</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px;">
        ${prop.features.map(f => `
          <span style="padding: 8px 16px; background: var(--gold-tint); border: 1px solid var(--border-gold); border-radius: var(--radius-full); font-size: 0.85rem; color: #fff;">
            ✓ ${f}
          </span>
        `).join('')}
      </div>

      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="closeModal('propertyDetailModal'); openBookingModal('${prop.title}');">
          Schedule Private VIP Tour
        </button>
        <button class="btn btn-secondary" onclick="toggleSaveProperty('${prop.id}')">
          Save to Private Portfolio
        </button>
        <button class="btn btn-outline-gold" onclick="prefillMortgage(${prop.price})">
          Calculate Monthly Investment
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
};

window.prefillMortgage = function(price) {
  closeModal('propertyDetailModal');
  const mortgageSection = document.getElementById('calculatorsSection');
  if (mortgageSection) {
    mortgageSection.scrollIntoView({ behavior: 'smooth' });
  }
  switchCalcTab('mortgage');
  const priceInput = document.getElementById('mortgagePrice');
  if (priceInput) {
    priceInput.value = price;
    priceInput.dispatchEvent(new Event('input'));
  }
  showToast(`Mortgage calculator loaded for $${price.toLocaleString()}`);
};

window.openBookingModal = function(subject = 'General Consultation') {
  const modal = document.getElementById('bookingModal');
  const subjectInput = document.getElementById('bookingSubject');
  if (subjectInput) {
    subjectInput.value = subject;
  }
  if (modal) {
    modal.classList.add('open');
  }
};

/* ==========================================================================
   FORM HANDLERS & TOAST FEEDBACK
   ========================================================================== */

function setupForms() {
  // Booking Modal Form
  const bookingForm = document.getElementById('vipBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value;
      const date = document.getElementById('bookDate').value;
      closeModal('bookingModal');
      showToast(`Thank you, ${name}! Your private consultation for ${date || 'upcoming dates'} has been registered. Our partner concierge will contact you within 2 hours.`);
      bookingForm.reset();
    });
  }

  // Main Consultation Form
  const consultForm = document.getElementById('mainConsultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast(`Inquiry received, ${name}. A Senior Partner at Vanguard & Stone will be in touch shortly.`);
      consultForm.reset();
    });
  }

  // Newsletter
  const newsForm = document.getElementById('newsletterForm');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsForm.querySelector('input').value;
      showToast(`Subscribed! The Private Vanguard Architectural Journal has been dispatched to ${email}.`);
      newsForm.reset();
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--gold-400); font-size: 1.1rem;">❖</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}
