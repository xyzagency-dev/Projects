/**
 * LUMEN & CO. — VIP Client Proofing Portal Engine
 * Simulated PIN authentication, proof selection, hearting, watermark toggling, and export.
 */

const DEMO_PIN = '2026';

const PROOF_PHOTOS = [
  { id: 'proof-01', title: 'Look 01 — Silk Silhouette', url: 'assets/images/hero-editorial.jpg' },
  { id: 'proof-02', title: 'Look 02 — High Jewelry Close-Up', url: 'assets/images/retouch-after.jpg' },
  { id: 'proof-03', title: 'Look 03 — Daylight Studio Architecture', url: 'assets/images/studio-space.jpg' },
  { id: 'proof-04', title: 'Look 04 — Lake Como Archival Vows', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 'proof-05', title: 'Look 05 — Horology Obsidian Precision', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  { id: 'proof-06', title: 'Look 06 — Parisian Monolith Contrast', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80' }
];

let favoritedIds = new Set(['proof-01', 'proof-02']);
let showOnlyFavorites = false;
let watermarkEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
  initClientPortal();
});

function initClientPortal() {
  const modal = document.getElementById('clientPortalModal');
  const openButtons = document.querySelectorAll('[data-open-portal]');
  const closeBtn = document.getElementById('closePortalModal');
  const pinInput = document.getElementById('portalPinInput');
  const pinSubmitBtn = document.getElementById('portalPinSubmit');
  const pinScreen = document.getElementById('portalPinScreen');
  const galleryScreen = document.getElementById('portalGalleryScreen');
  const filterFavBtn = document.getElementById('portalFilterFavBtn');
  const watermarkToggle = document.getElementById('portalWatermarkToggle');
  const downloadBtn = document.getElementById('portalDownloadBtn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
      if (window.playHasselbladShutter) window.playHasselbladShutter();
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Verify PIN
  const handlePinSubmit = () => {
    const pin = pinInput?.value?.trim();
    if (pin === DEMO_PIN) {
      pinScreen.style.display = 'none';
      galleryScreen.style.display = 'block';
      renderProofGrid();
      if (window.showToast) window.showToast('VIP Vault Access Granted: Welcome Atelier Client.');
      if (window.playHasselbladShutter) window.playHasselbladShutter();
    } else {
      if (window.showToast) window.showToast('Invalid Access PIN. (Tip: Use Demo PIN "2026")');
      if (pinInput) {
        pinInput.value = '';
        pinInput.style.borderColor = '#ef4444';
        setTimeout(() => { pinInput.style.borderColor = ''; }, 1500);
      }
    }
  };

  pinSubmitBtn?.addEventListener('click', handlePinSubmit);
  pinInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlePinSubmit();
  });

  // Filter Favorites
  filterFavBtn?.addEventListener('click', () => {
    showOnlyFavorites = !showOnlyFavorites;
    filterFavBtn.classList.toggle('active', showOnlyFavorites);
    renderProofGrid();
  });

  // Watermark toggle
  watermarkToggle?.addEventListener('change', (e) => {
    watermarkEnabled = e.target.checked;
    renderProofGrid();
  });

  // Download simulation
  downloadBtn?.addEventListener('click', () => {
    const count = favoritedIds.size;
    if (count === 0) {
      if (window.showToast) window.showToast('Please favorite at least one photograph to package.');
      return;
    }
    if (window.showToast) {
      window.showToast(`Packaging ${count} high-resolution uncompressed master TIFFs...`);
      setTimeout(() => {
        window.showToast(`✨ Archive Lumen-Delivery-Vault.zip (248MB) downloaded successfully!`);
      }, 2000);
    }
    if (window.playHasselbladShutter) window.playHasselbladShutter();
  });
}

function renderProofGrid() {
  const grid = document.getElementById('proofGrid');
  const favCounter = document.getElementById('favCounter');
  if (!grid) return;

  const displayList = showOnlyFavorites 
    ? PROOF_PHOTOS.filter(p => favoritedIds.has(p.id)) 
    : PROOF_PHOTOS;

  if (favCounter) {
    favCounter.textContent = `${favoritedIds.size} of ${PROOF_PHOTOS.length} Approved`;
  }

  grid.innerHTML = '';

  if (displayList.length === 0) {
    grid.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 3rem; color: var(--text-muted);">No favorited frames yet. Heart images to curate your final selection.</div>`;
    return;
  }

  displayList.forEach(photo => {
    const isFav = favoritedIds.has(photo.id);
    const card = document.createElement('div');
    card.className = 'proof-card';

    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" loading="lazy" />
      ${watermarkEnabled ? `<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; opacity: 0.28; font-family: var(--font-serif); font-size: 1.6rem; letter-spacing: 0.2em; color: #fff; transform: rotate(-25deg); text-shadow: 0 2px 8px rgba(0,0,0,0.8);">PROOF • LUMEN & CO.</div>` : ''}
      <div class="proof-actions">
        <button class="proof-action-btn ${isFav ? 'favorited' : ''}" title="Favorite / Approve Frame" data-id="${photo.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 0.8rem; font-size: 0.78rem; color: #fff;">
        ${photo.title}
      </div>
    `;

    const favBtn = card.querySelector('.proof-action-btn');
    favBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (favoritedIds.has(photo.id)) {
        favoritedIds.delete(photo.id);
      } else {
        favoritedIds.add(photo.id);
      }
      renderProofGrid();
      if (window.playHasselbladShutter) window.playHasselbladShutter();
    });

    grid.appendChild(card);
  });
}
