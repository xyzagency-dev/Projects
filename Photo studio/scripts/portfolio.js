/**
 * LUMEN & CO. — Portfolio & Lightbox Controller
 * Dynamic filtering, EXIF inspection, responsive lightbox modal, and keyboard controls.
 */

const PORTFOLIO_DATA = [
  {
    id: 'editorial-01',
    category: 'editorial',
    title: 'Emerald Silk: The Fall Couture Series',
    client: 'Vogue Italia & Atelier Marais',
    location: 'Tribeca Daylight Loft, NYC',
    image: 'assets/images/hero-editorial.jpg',
    isWide: true,
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 80mm f/1.9',
      aperture: 'f/2.2',
      shutter: '1/320s',
      iso: 'ISO 64',
      lighting: 'Profoto B10X Plus with 5ft Octabox + Rim Strip'
    },
    description: 'Medium-format high-fashion editorial exploring flowing silk drapery against industrial raw concrete.'
  },
  {
    id: 'portrait-01',
    category: 'portraiture',
    title: 'Aura of Serenity: High Jewelry Portrait',
    client: 'Cartier Haute Joaillerie & Private Client',
    location: 'Lumen Studio A, Mayfair London',
    image: 'assets/images/retouch-after.jpg',
    isWide: false,
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 100mm f/2.2',
      aperture: 'f/4.0',
      shutter: '1/250s',
      iso: 'ISO 100',
      lighting: 'Elinchrom Indirect Litemotiv 190cm Key'
    },
    description: 'Fine art portraiture capturing uncompressed micro-contrast, skin texture, and fine diamonds.'
  },
  {
    id: 'architecture-01',
    category: 'architecture',
    title: 'Atelier Loft No. 4: Natural Light Infinity Cyclorama',
    client: 'Architectural Digest & Lumen Properties',
    location: 'SoHo Design District, NYC',
    image: 'assets/images/studio-space.jpg',
    isWide: true,
    exif: {
      camera: 'Phase One IQ4 150MP Achromatic',
      lens: 'Rodenstock 32mm f/4 HR Digaron',
      aperture: 'f/11',
      shutter: '1/15s',
      iso: 'ISO 50',
      lighting: '100% Balanced North-Facing Natural Daylight'
    },
    description: 'Spatial and interior photography balancing industrial cast-iron window frames with pure cyclorama lines.'
  },
  {
    id: 'wedding-01',
    category: 'wedding',
    title: 'Lake Como Villa Balbianello Vows',
    client: 'Elena & Julian — Private Wedding',
    location: 'Tremezzina, Lake Como, Italy',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
    isWide: false,
    exif: {
      camera: 'Leica SL2',
      lens: 'Leica Summilux-SL 50mm f/1.4 ASPH',
      aperture: 'f/1.6',
      shutter: '1/1000s',
      iso: 'ISO 100',
      lighting: 'Golden Hour Ambient Sun'
    },
    description: 'Documentary luxury elopement capturing timeless intimacy and dramatic alpine light.'
  },
  {
    id: 'commercial-01',
    category: 'commercial',
    title: 'Horology Heritage: The Obsidian Chronograph',
    client: 'Vacheron Constantin Campaign',
    location: 'Geneva / Lumen Commercial Studio',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    isWide: false,
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 120mm f/3.5 Macro',
      aperture: 'f/14 Focus Stacked (18 frames)',
      shutter: '1/200s',
      iso: 'ISO 64',
      lighting: 'Broncolor Scoro 3200 with Picolite spots'
    },
    description: 'Precision macro commercial product capture with microscopic focus stacking and dial reflections.'
  },
  {
    id: 'editorial-02',
    category: 'editorial',
    title: 'Monochrome Monolith: Parisian Fashion Week',
    client: 'Dior Homme & Harper’s Bazaar',
    location: 'Place Vendôme, Paris',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    isWide: false,
    exif: {
      camera: 'Sony A1',
      lens: 'FE 85mm f/1.2 GM',
      aperture: 'f/2.0',
      shutter: '1/1600s',
      iso: 'ISO 200',
      lighting: 'High-speed sync mobile battery strobe'
    },
    description: 'Dramatic architectural fashion street spread combining structural silhouettes and Parisian limestone.'
  },
  {
    id: 'wedding-02',
    category: 'wedding',
    title: 'Amalfi Coast Sunset Reception',
    client: 'Sophia & Matteo',
    location: 'Ravello, Amalfi Coast',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    isWide: false,
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 38mm f/2.5 V',
      aperture: 'f/2.8',
      shutter: '1/640s',
      iso: 'ISO 160',
      lighting: 'Warm Mediterranean dusk light'
    },
    description: 'Fine art candlelit wedding reception surrounded by cliffside olive groves and Mediterranean sea.'
  },
  {
    id: 'commercial-02',
    category: 'commercial',
    title: 'The Essence of Santal: Luxury Fragrance Campaign',
    client: 'Maison de Parfum Paris',
    location: 'Lumen Studio B, London',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    isWide: false,
    exif: {
      camera: 'Phase One XF IQ3 100MP',
      lens: 'Schneider Kreuznach 120mm LS',
      aperture: 'f/11',
      shutter: '1/250s',
      iso: 'ISO 50',
      lighting: 'Aperture Fresnel Spotlight with amber gel'
    },
    description: 'Commercial cosmetics and perfume campaign showcasing glass refraction, caustics, and fine mist.'
  },
  {
    id: 'portrait-02',
    category: 'portraiture',
    title: 'Maestro: C-Suite & Creative Leadership',
    client: 'Financial Times Magazine Cover',
    location: 'The Shard, London',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
    isWide: false,
    exif: {
      camera: 'Leica S3 Medium Format',
      lens: 'Leica Summarit-S 70mm f/2.5 ASPH',
      aperture: 'f/2.8',
      shutter: '1/400s',
      iso: 'ISO 100',
      lighting: 'Profoto B10 with Deep White Umbrella'
    },
    description: 'Executive branding portraiture commanding confidence, character, and cinematic tonality.'
  }
];

let currentLightboxIndex = 0;
let filteredItems = [...PORTFOLIO_DATA];

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioGrid('all');
  initPortfolioFilters();
  initLightbox();
});

function renderPortfolioGrid(filter = 'all') {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  filteredItems = filter === 'all' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.category === filter);

  grid.innerHTML = '';

  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `portfolio-item ${item.isWide ? 'featured-wide' : ''}`;
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <span class="portfolio-tag">${item.category.toUpperCase()} • ${item.client}</span>
        <h3 class="portfolio-title">${item.title}</h3>
        <div class="portfolio-exif-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <span>${item.exif.camera} • ${item.exif.lens}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(index);
    });

    grid.appendChild(card);
  });
}

function initPortfolioFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderPortfolioGrid(filter);
      if (window.playHasselbladShutter) window.playHasselbladShutter();
    });
  });
}

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!modal) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevLightbox);
  nextBtn?.addEventListener('click', nextLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  if (!modal || !filteredItems[index]) return;

  currentLightboxIndex = index;
  updateLightboxContent(filteredItems[index]);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.playHasselbladShutter) window.playHasselbladShutter();
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
  updateLightboxContent(filteredItems[currentLightboxIndex]);
  if (window.playHasselbladShutter) window.playHasselbladShutter();
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
  updateLightboxContent(filteredItems[currentLightboxIndex]);
  if (window.playHasselbladShutter) window.playHasselbladShutter();
}

function updateLightboxContent(item) {
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCategory');
  const client = document.getElementById('lightboxClient');
  const location = document.getElementById('lightboxLocation');
  const desc = document.getElementById('lightboxDesc');
  const exifCamera = document.getElementById('lightboxExifCamera');
  const exifLens = document.getElementById('lightboxExifLens');
  const exifSettings = document.getElementById('lightboxExifSettings');
  const exifLighting = document.getElementById('lightboxExifLighting');
  const bookBtn = document.getElementById('lightboxBookBtn');

  if (img) img.src = item.image;
  if (title) title.textContent = item.title;
  if (cat) cat.textContent = item.category.toUpperCase();
  if (client) client.textContent = item.client;
  if (location) location.textContent = item.location;
  if (desc) desc.textContent = item.description;

  if (exifCamera) exifCamera.textContent = item.exif.camera;
  if (exifLens) exifLens.textContent = item.exif.lens;
  if (exifSettings) exifSettings.textContent = `${item.exif.aperture} • ${item.exif.shutter} • ${item.exif.iso}`;
  if (exifLighting) exifLighting.textContent = item.exif.lighting;

  if (bookBtn) {
    bookBtn.onclick = () => {
      closeLightbox();
      const bookingModal = document.getElementById('bookingModal');
      const select = document.getElementById('bookingServiceSelect');
      if (select) {
        select.value = item.category === 'wedding' ? 'Luxury Wedding' : 
                       item.category === 'commercial' ? 'Commercial Campaign' :
                       item.category === 'portraiture' ? 'Executive Portraiture' : 'Editorial Fashion';
      }
      bookingModal?.classList.add('active');
    };
  }
}
