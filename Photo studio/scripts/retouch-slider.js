/**
 * LUMEN & CO. — Before / After Color Retouching Slider
 * Touch, mouse drag, and accessible keyboard comparison controller.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRetouchSlider();
});

function initRetouchSlider() {
  const container = document.getElementById('comparisonContainer');
  const overlay = document.getElementById('comparisonOverlay');
  const handle = document.getElementById('comparisonHandle');
  const beforeImg = document.getElementById('comparisonBeforeImg');

  if (!container || !overlay || !handle || !beforeImg) return;

  let isDragging = false;

  const syncImageWidth = () => {
    const containerWidth = container.offsetWidth;
    beforeImg.style.width = `${containerWidth}px`;
  };

  syncImageWidth();
  window.addEventListener('resize', syncImageWidth);

  const setSliderPosition = (xPos) => {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;

    overlay.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Keyboard accessibility
  container.setAttribute('tabindex', '0');
  container.addEventListener('keydown', (e) => {
    const currentWidth = parseFloat(overlay.style.width) || 50;
    if (e.key === 'ArrowLeft') {
      const next = Math.max(0, currentWidth - 5);
      overlay.style.width = `${next}%`;
      handle.style.left = `${next}%`;
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(100, currentWidth + 5);
      overlay.style.width = `${next}%`;
      handle.style.left = `${next}%`;
    }
  });
}
