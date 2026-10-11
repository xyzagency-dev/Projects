/**
 * LUMEN & CO. — Main Application Engine
 * Handles Navbar, Theme, Ambient Audio, Modals, Toasts & Booking Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initAmbientAudio();
  initBookingModal();
  initNewsletterForm();
});

/* --------------------------------------------------------------------------
   Theme Controller (Dark Obsidian / Light Editorial Gallery)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('lumen_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('lumen_theme', nextTheme);
    updateThemeIcon(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Obsidian Luxe' : 'Editorial Gallery'} mode`);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeToggleIcon');
  if (!icon) return;
  if (theme === 'light') {
    // Show Moon icon for switching to dark
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    // Show Sun icon for switching to light
    icon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
  }
}

/* --------------------------------------------------------------------------
   Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Navbar glass opacity on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const isOpen = mobileDrawer.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Synthetic Leaf-Shutter Sound FX (Web Audio API)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initAmbientAudio() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    audioBtn.style.opacity = soundEnabled ? '1' : '0.4';
    showToast(soundEnabled ? 'Studio shutter acoustics enabled' : 'Studio acoustics muted');
    if (soundEnabled) playHasselbladShutter();
  });
}

export function playHasselbladShutter() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;

    // Phase 1: Mechanical mirror flip / solenoid click
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, t);
    osc1.frequency.exponentialRampToValueAtTime(45, t + 0.04);
    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(t);
    osc1.stop(t + 0.05);

    // Phase 2: Leaf shutter blades snap & release
    const bufferSize = audioCtx.sampleRate * 0.06;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t + 0.02);
    filter.Q.setValueAtTime(3, t + 0.02);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.setValueAtTime(0.3, t + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    noise.start(t + 0.02);
    noise.stop(t + 0.08);
  } catch (e) {
    // Audio context may require user interaction first
  }
}
window.playHasselbladShutter = playHasselbladShutter;

/* --------------------------------------------------------------------------
   Toast Notification System
   -------------------------------------------------------------------------- */
export function showToast(message, duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
window.showToast = showToast;

/* --------------------------------------------------------------------------
   Booking & Consultation Modal
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('[data-open-booking]');
  const closeBtn = document.getElementById('closeBookingModal');
  const form = document.getElementById('bookingForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceParam = btn.getAttribute('data-service');
      if (serviceParam) {
        const select = document.getElementById('bookingServiceSelect');
        if (select) select.value = serviceParam;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playHasselbladShutter();
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value || 'Guest';
      const service = document.getElementById('bookingServiceSelect')?.value || 'Editorial Session';
      const date = document.getElementById('bookDate')?.value || 'Upcoming Season';

      playHasselbladShutter();
      closeModal();

      // Show comprehensive confirmation toast
      showToast(`Reservation inquiry secured for ${name} (${service})!`);
      
      // Generate downloadable .ics calendar invite simulation
      generateCalendarInvite(name, service, date);
    });
  }
}

function generateCalendarInvite(name, service, date) {
  setTimeout(() => {
    showToast(`📅 Calendar confirmation hold created for ${date || 'your session'}. Check your email inbox!`, 5000);
  }, 1200);
}

/* --------------------------------------------------------------------------
   Newsletter Subscription
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast(`Welcome to the Atelier Circle: ${input.value}`);
      input.value = '';
    }
  });
}
