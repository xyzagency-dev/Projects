/**
 * ATELIER AURA — LUXURY INTERIOR ARCHITECTURE & CONSTRUCTION
 * Core Application Engine & Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavigation();
  initBeforeAfterSlider();
  initCostCalculator();
  initStyleQuiz();
  initMaterialStudio();
  initPortfolio();
  initClientPortal();
  initFaqAccordion();
  initModals();
  initCounterAnimations();
});

/* ===================================================================
   1. CUSTOM CURSOR
   =================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!cursor || !follower || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  const hoverTargets = document.querySelectorAll('a, button, input, .calc-radio-card, .tier-card, .scope-checkbox-label, .material-swatch-item, .project-card, .faq-question');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ===================================================================
   2. NAVIGATION & MOBILE DRAWER
   =================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-drawer .nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });
  });
}

/* ===================================================================
   3. INTERACTIVE BEFORE & AFTER SLIDER
   =================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  const beforeWrapper = document.querySelector('.ba-image-before-wrapper');
  const divider = document.querySelector('.ba-divider');
  const beforeImg = document.querySelector('.ba-image-before-wrapper img');
  if (!container || !beforeWrapper || !divider) return;

  let isDragging = false;

  function updateSliderWidth() {
    if (beforeImg) {
      beforeImg.style.width = `${container.offsetWidth}px`;
    }
  }
  window.addEventListener('resize', updateSliderWidth);
  updateSliderWidth();

  function move(x) {
    const rect = container.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;

    beforeWrapper.style.width = `${pos}%`;
    divider.style.left = `${pos}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    move(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    move(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    move(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    move(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ===================================================================
   4. INTERACTIVE TURNKEY COST & SCOPE CALCULATOR
   =================================================================== */
function initCostCalculator() {
  const typeCards = document.querySelectorAll('.calc-type-card');
  const areaSlider = document.getElementById('calcAreaSlider');
  const areaValueDisplay = document.getElementById('calcAreaValue');
  const tierCards = document.querySelectorAll('.tier-card');
  const scopeCheckboxes = document.querySelectorAll('.scope-checkbox');

  // Breakdown DOM elements
  const breakdownArch = document.getElementById('breakdownArch');
  const breakdownMaterials = document.getElementById('breakdownMaterials');
  const breakdownLabor = document.getElementById('breakdownLabor');
  const breakdownMgmt = document.getElementById('breakdownMgmt');
  const totalCostDisplay = document.getElementById('calcTotalPrice');
  const timelineDisplay = document.getElementById('calcTimeline');
  const briefBtn = document.getElementById('calcGenerateBriefBtn');
  const bookCalcBtn = document.getElementById('calcBookBtn');

  let currentTypeRate = 320; // Default: Estate Residence
  let currentTypeName = 'Architectural Estate Residence';
  let currentTierMult = 1.35; // Default: Haute Architectural
  let currentTierName = 'Haute Architectural Tier';
  let currentArea = 4200;
  let addOnsTotal = 0;
  let selectedAddons = [];

  // Type Selector
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentTypeRate = parseFloat(card.dataset.rate);
      currentTypeName = card.querySelector('.calc-radio-title').innerText.trim();
      calculateTotal();
    });
  });

  // Area Slider
  if (areaSlider) {
    areaSlider.addEventListener('input', (e) => {
      currentArea = parseInt(e.target.value, 10);
      if (areaValueDisplay) {
        areaValueDisplay.innerText = `${currentArea.toLocaleString()} SQ. FT.`;
      }
      calculateTotal();
    });
  }

  // Tier Cards
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentTierMult = parseFloat(card.dataset.mult);
      currentTierName = card.querySelector('.tier-name').innerText.trim();
      calculateTotal();
    });
  });

  // Scope Checkboxes
  scopeCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const parentLabel = cb.closest('.scope-checkbox-label');
      if (cb.checked) {
        parentLabel.classList.add('checked');
      } else {
        parentLabel.classList.remove('checked');
      }
      recalcAddons();
      calculateTotal();
    });
  });

  function recalcAddons() {
    addOnsTotal = 0;
    selectedAddons = [];
    scopeCheckboxes.forEach(cb => {
      if (cb.checked) {
        addOnsTotal += parseFloat(cb.dataset.cost);
        selectedAddons.push(cb.dataset.name);
      }
    });
  }

  function calculateTotal() {
    const baseBuildingCost = currentArea * currentTypeRate * currentTierMult;
    const grossTotal = Math.round(baseBuildingCost + addOnsTotal);

    // Realistic itemized luxury allocation:
    const archFee = Math.round(grossTotal * 0.14);
    const materialsFee = Math.round(grossTotal * 0.44);
    const laborFee = Math.round(grossTotal * 0.36);
    const mgmtFee = Math.round(grossTotal * 0.06);

    // Realistic timeline based on sq ft & tier
    let estimatedMonths = Math.max(6, Math.round((currentArea / 550) * (currentTierMult > 1.5 ? 1.25 : 1.0)));
    if (estimatedMonths > 28) estimatedMonths = 28;

    if (breakdownArch) breakdownArch.innerText = `$${archFee.toLocaleString()}`;
    if (breakdownMaterials) breakdownMaterials.innerText = `$${materialsFee.toLocaleString()}`;
    if (breakdownLabor) breakdownLabor.innerText = `$${laborFee.toLocaleString()}`;
    if (breakdownMgmt) breakdownMgmt.innerText = `$${mgmtFee.toLocaleString()}`;
    if (totalCostDisplay) totalCostDisplay.innerText = `$${grossTotal.toLocaleString()}`;
    if (timelineDisplay) timelineDisplay.innerText = `Estimated Handover: ${estimatedMonths} Months Turnkey`;

    window.AURA_CALC_DATA = {
      typeName: currentTypeName,
      area: currentArea,
      tierName: currentTierName,
      addons: selectedAddons,
      archFee,
      materialsFee,
      laborFee,
      mgmtFee,
      grossTotal,
      estimatedMonths
    };
  }

  // Initial Calculation
  recalcAddons();
  calculateTotal();

  // Generate Brief Button
  if (briefBtn) {
    briefBtn.addEventListener('click', () => {
      openProposalModal(window.AURA_CALC_DATA);
    });
  }

  if (bookCalcBtn) {
    bookCalcBtn.addEventListener('click', () => {
      openBookingModal(window.AURA_CALC_DATA);
    });
  }
}

/* ===================================================================
   5. INTERACTIVE STYLE ARCHETYPE FINDER
   =================================================================== */
function initStyleQuiz() {
  const steps = document.querySelectorAll('.quiz-question-step');
  const resultCard = document.querySelector('.quiz-result-card');
  const progressFill = document.querySelector('.quiz-progress-fill');
  const nextBtns = document.querySelectorAll('.quiz-next-btn');
  const prevBtns = document.querySelectorAll('.quiz-prev-btn');
  const retakeBtn = document.querySelector('.quiz-retake-btn');
  const applyQuizToBookingBtn = document.querySelector('.quiz-apply-btn');

  let currentStep = 0;
  const userAnswers = {};

  const archetypes = {
    japandi: {
      title: "Japandi Organic Minimalist",
      desc: "A harmonious marriage of Scandinavian simplicity and Japanese wabi-sabi philosophy. Defined by natural low-sheen white oak, microcement, limewash plaster, and serene decluttered negative space.",
      palette: ["Nordic Oak", "Warm Travertine", "Honed Basalt", "Belgian Linen"]
    },
    biophilic: {
      title: "Haute Biophilic Architecture",
      desc: "Blurring the frontier between living architecture and the wild landscape. Integrates interior botanical courtyards, board-formed concrete, water reflections, and natural daylight channeling.",
      palette: ["Board-Formed Concrete", "Western Red Cedar", "Patinated Bronze", "Raw Slate"]
    },
    classical: {
      title: "Continental Neo-Classical Haute",
      desc: "Monumental European elegance with contemporary restraint. Characterized by dramatic Calacatta Viola marbles, coffered ceiling lighting, bespoke fluted smoked walnut, and brushed champagne brass hardware.",
      palette: ["Calacatta Viola", "Smoked Walnut", "Champagne Brass", "Silk Bouclé"]
    },
    brutalist: {
      title: "Warm Monumental Brutalism",
      desc: "Sculptural, monolithic, and unapologetically bold. Employs raw architectural stone slabs, dark blackened steel, architectural light shafts, and tailored leather accents.",
      palette: ["Monolithic Granite", "Charred Timber", "Blackened Steel", "Saddle Leather"]
    }
  };

  // Option selection
  const answerCards = document.querySelectorAll('.quiz-answer-card');
  answerCards.forEach(card => {
    card.addEventListener('click', () => {
      const parent = card.closest('.quiz-answers-grid');
      parent.querySelectorAll('.quiz-answer-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const qIndex = card.dataset.q;
      userAnswers[qIndex] = card.dataset.val;
    });
  });

  // Next Step
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!userAnswers[currentStep]) {
        showToast("Please select an aesthetic preference to continue.");
        return;
      }
      steps[currentStep].classList.remove('active');
      currentStep++;

      if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
        if (progressFill) progressFill.style.width = `${((currentStep + 1) / (steps.length + 1)) * 100}%`;
      } else {
        showQuizResult();
      }
    });
  });

  // Prev Step
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      steps[currentStep].classList.remove('active');
      currentStep--;
      steps[currentStep].classList.add('active');
      if (progressFill) progressFill.style.width = `${((currentStep + 1) / (steps.length + 1)) * 100}%`;
    });
  });

  function showQuizResult() {
    steps.forEach(s => s.classList.remove('active'));
    if (progressFill) progressFill.style.width = '100%';

    // Determine archetype
    const tally = { japandi: 0, biophilic: 0, classical: 0, brutalist: 0 };
    Object.values(userAnswers).forEach(val => {
      if (tally[val] !== undefined) tally[val]++;
    });

    let bestMatch = 'japandi';
    let maxVotes = -1;
    for (const [key, count] of Object.entries(tally)) {
      if (count > maxVotes) {
        maxVotes = count;
        bestMatch = key;
      }
    }

    const archData = archetypes[bestMatch];
    const nameEl = document.getElementById('quizResultName');
    const descEl = document.getElementById('quizResultDesc');
    const pillsContainer = document.getElementById('quizPalettePills');

    if (nameEl) nameEl.innerText = archData.title;
    if (descEl) descEl.innerText = archData.desc;
    if (pillsContainer) {
      pillsContainer.innerHTML = archData.palette.map(p => `<span class="palette-pill">${p}</span>`).join('');
    }

    resultCard.classList.add('active');
    window.AURA_QUIZ_RESULT = archData;
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      resultCard.classList.remove('active');
      currentStep = 0;
      steps[0].classList.add('active');
      if (progressFill) progressFill.style.width = '25%';
      answerCards.forEach(c => c.classList.remove('selected'));
    });
  }

  if (applyQuizToBookingBtn) {
    applyQuizToBookingBtn.addEventListener('click', () => {
      openBookingModal({
        archetype: window.AURA_QUIZ_RESULT?.title
      });
    });
  }
}

/* ===================================================================
   6. TACTILE MATERIAL STUDIO
   =================================================================== */
function initMaterialStudio() {
  const swatches = document.querySelectorAll('.material-swatch-item');
  const matName = document.getElementById('matName');
  const matOrigin = document.getElementById('matOrigin');
  const matDesc = document.getElementById('matDesc');
  const matAcoustic = document.getElementById('matAcoustic');
  const matFinish = document.getElementById('matFinish');
  const matApp = document.getElementById('matApp');

  const materialsData = {
    marble: {
      name: "Calacatta Viola Monolithic Marble",
      origin: "Carrara, Apuan Alps, Italy",
      desc: "Dramatic burgundy-veined Breccia marble quarried in Tuscany. Highly celebrated for sculptural architectural kitchen islands, monolithic fireplaces, and master bathroom vanities with bookmatched precision.",
      specAcoustic: "Reflective Density 2.7g/cm³",
      specFinish: "Silk Honed & Matte Seal",
      specApp: "Focal Islands & Powder Suites"
    },
    oak: {
      name: "Smoked American White Oak",
      origin: "Appalachian Basin, USA",
      desc: "Slow-grown sustainable white oak smoked to an understated warm taupe hue. Triple-wire brushed to expose rich organic grain texture with zero-VOC biological oil finish.",
      specAcoustic: "0.68 NRC Sound Absorption",
      specFinish: "Wire Brushed Bio-Hardwax",
      specApp: "Flooring & Fluted Joinery"
    },
    brass: {
      name: "Hand-Aged Champagne Brass",
      origin: "Birmingham Metalworks, UK",
      desc: "Solid brass alloy subtly oxidized to a delicate champagne hue. Left unlacquered to develop a unique living patina that gracefully matures with touch over generations.",
      specAcoustic: "Vibration Dampened",
      specFinish: "Satin Hand-Brushed Living",
      specApp: "Custom Hardware & Luminaires"
    },
    linen: {
      name: "Washed Belgian Architectural Linen",
      origin: "Flanders, Belgium",
      desc: "Heavyweight organic flax linen custom woven for double-height drape installations and tactile wall acoustic upholstery. Provides natural light filtration and softens hard architectural lines.",
      specAcoustic: "0.85 NRC Sound Isolation",
      specFinish: "Natural Stonewashed Matte",
      specApp: "Drapery & Bouclé Furniture"
    }
  };

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const key = swatch.dataset.mat;
      const data = materialsData[key];
      if (!data) return;

      if (matName) matName.innerText = data.name;
      if (matOrigin) matOrigin.innerText = data.origin;
      if (matDesc) matDesc.innerText = data.desc;
      if (matAcoustic) matAcoustic.innerText = data.specAcoustic;
      if (matFinish) matFinish.innerText = data.specFinish;
      if (matApp) matApp.innerText = data.specApp;
    });
  });
}

/* ===================================================================
   7. PORTFOLIO & CASE STUDIES LIGHTBOX
   =================================================================== */
let projectsDatabase = [];

async function initPortfolio() {
  const grid = document.querySelector('.projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  try {
    const res = await fetch('data/projects.json');
    projectsDatabase = await res.json();
    renderProjects(projectsDatabase, 'all');
  } catch (err) {
    console.warn("Could not load projects.json locally, using embedded backup data", err);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      renderProjects(projectsDatabase, cat);
    });
  });
}

function renderProjects(projects, filterCategory) {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card" data-id="${p.id}">
      <div class="project-thumbnail">
        <img src="${p.coverImage}" alt="${p.title}" loading="lazy">
        <span class="project-category-tag">${p.categoryLabel}</span>
      </div>
      <div class="project-content">
        <div class="project-location">${p.location}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="service-desc" style="font-size: 0.85rem; margin-bottom: 1rem;">${p.description.substring(0, 110)}...</p>
        <div class="project-meta-row">
          <span>Area: <strong>${p.area}</strong></span>
          <span>Budget: <strong>${p.budget}</strong></span>
          <span>Timeline: <strong>${p.duration}</strong></span>
        </div>
      </div>
    </article>
  `).join('');

  // Attach click listener for modal
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const proj = projectsDatabase.find(item => item.id === id);
      if (proj) openProjectLightbox(proj);
    });
  });
}

function openProjectLightbox(proj) {
  const modal = document.getElementById('projectLightboxModal');
  if (!modal) return;

  document.getElementById('lightboxTitle').innerText = proj.title;
  document.getElementById('lightboxCategory').innerText = `${proj.categoryLabel} — ${proj.location}`;
  document.getElementById('lightboxArea').innerText = proj.area;
  document.getElementById('lightboxBudget').innerText = proj.budget;
  document.getElementById('lightboxDuration').innerText = proj.duration;
  document.getElementById('lightboxArchitect').innerText = proj.leadArchitect;
  document.getElementById('lightboxDesc').innerText = proj.description;
  document.getElementById('lightboxQuote').innerText = proj.testimonial;

  // Scope list
  const scopeList = document.getElementById('lightboxScopeList');
  if (scopeList) {
    scopeList.innerHTML = proj.scope.map(s => `<li>✓ ${s}</li>`).join('');
  }

  // Gallery main & thumbs
  const mainImg = document.getElementById('lightboxMainImage');
  const thumbsContainer = document.getElementById('lightboxThumbs');
  if (mainImg) mainImg.src = proj.gallery[0] || proj.coverImage;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = proj.gallery.map((img, idx) => `
      <button class="lightbox-thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img}">
        <img src="${img}" alt="Thumbnail ${idx + 1}">
      </button>
    `).join('');

    thumbsContainer.querySelectorAll('.lightbox-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbsContainer.querySelectorAll('.lightbox-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (mainImg) mainImg.src = btn.dataset.src;
      });
    });
  }

  modal.classList.add('active');
}

/* ===================================================================
   8. INTERACTIVE CLIENT PORTAL SIMULATION ("AURA TRACK")
   =================================================================== */
function initClientPortal() {
  const approvalBtn = document.getElementById('portalApproveBtn');
  const switchProjectBtn = document.getElementById('portalSwitchViewBtn');
  const siteLogs = document.getElementById('portalSiteLogs');

  if (approvalBtn) {
    approvalBtn.addEventListener('click', () => {
      approvalBtn.innerText = "✓ Approved by Principal";
      approvalBtn.style.background = "#27ae60";
      approvalBtn.style.color = "#ffffff";
      approvalBtn.disabled = true;
      showToast("Change Order #104: Bookmatched Calacatta Viola Slab approved and sent to fabrication.");

      // Add a live log entry
      if (siteLogs) {
        const newLog = document.createElement('div');
        newLog.className = 'site-log-item';
        newLog.innerHTML = `
          <div class="site-log-time">JUST NOW · CLIENT PORTAL</div>
          <div>Calacatta Viola batch sign-off recorded. Digital seal affixed.</div>
        `;
        siteLogs.prepend(newLog);
      }
    });
  }

  if (switchProjectBtn) {
    switchProjectBtn.addEventListener('click', () => {
      showToast("Toggled view: Live 3D BIM coordination overlay activated.");
    });
  }
}

/* ===================================================================
   9. FAQ ACCORDION
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ===================================================================
   10. MODALS & BOOKING ENGINE
   =================================================================== */
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // Global triggers
  const bookTriggers = document.querySelectorAll('.trigger-booking-modal');
  bookTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  // Lookbook download button
  const lookbookBtns = document.querySelectorAll('.trigger-lookbook-download');
  lookbookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Downloading Atelier Aura 2025/2026 Architectural Lookbook (PDF 48MB)...");
      setTimeout(() => {
        showToast("✓ Download complete: Atelier_Aura_Lookbook.pdf");
      }, 1500);
    });
  });

  // Booking Form Submission
  const bookingForm = document.getElementById('consultationBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value;
      const modal = document.getElementById('bookingModal');
      if (modal) modal.classList.remove('active');
      showToast(`Thank you, ${name}. Your private architectural briefing call has been confirmed. A partner will reach out within 4 business hours.`);
      bookingForm.reset();
    });
  }
}

function openProposalModal(data) {
  const modal = document.getElementById('proposalModal');
  if (!modal || !data) return;

  document.getElementById('propProjectType').innerText = data.typeName;
  document.getElementById('propArea').innerText = `${data.area.toLocaleString()} SQ. FT.`;
  document.getElementById('propTier').innerText = data.tierName;
  document.getElementById('propArchFee').innerText = `$${data.archFee.toLocaleString()}`;
  document.getElementById('propMaterials').innerText = `$${data.materialsFee.toLocaleString()}`;
  document.getElementById('propLabor').innerText = `$${data.laborFee.toLocaleString()}`;
  document.getElementById('propMgmt').innerText = `$${data.mgmtFee.toLocaleString()}`;
  document.getElementById('propTotal').innerText = `$${data.grossTotal.toLocaleString()}`;
  document.getElementById('propTimeline').innerText = `${data.estimatedMonths} Months Handover`;

  const addOnList = document.getElementById('propAddonsList');
  if (addOnList) {
    if (data.addons.length > 0) {
      addOnList.innerHTML = data.addons.map(a => `<li>✓ ${a}</li>`).join('');
    } else {
      addOnList.innerHTML = '<li>None selected (Standard high-specification turnkey)</li>';
    }
  }

  modal.classList.add('active');
}

function openBookingModal(prefillData = {}) {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  if (prefillData.grossTotal) {
    const scopeField = document.getElementById('bookScope');
    if (scopeField) {
      scopeField.value = `Estimated ${prefillData.area.toLocaleString()} sq ft ${prefillData.typeName} (${prefillData.tierName}) — Approx $${prefillData.grossTotal.toLocaleString()}`;
    }
  }

  if (prefillData.archetype) {
    const scopeField = document.getElementById('bookScope');
    if (scopeField) {
      scopeField.value = `Aesthetic Archetype: ${prefillData.archetype}`;
    }
  }

  modal.classList.add('active');
}

/* ===================================================================
   11. ANIMATED COUNTERS
   =================================================================== */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.animate-counter');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersectEvent || entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1800;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.innerText = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.innerText = `${prefix}${Math.floor(start)}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* ===================================================================
   12. TOAST SYSTEM
   =================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✧</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
