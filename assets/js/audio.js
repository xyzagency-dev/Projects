/**
 * NEXUS Sound Engine (Web Audio API)
 * High-tech synthesized SFX for an immersive cyber gaming vibe.
 * Zero external audio files required!
 */

const NexusAudio = {
  enabled: false,
  ctx: null,

  init() {
    // Check local storage preference
    const saved = localStorage.getItem("nexus_sfx_enabled");
    if (saved === "true") {
      this.enabled = true;
    }
  },

  getContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("nexus_sfx_enabled", this.enabled ? "true" : "false");
    if (this.enabled) {
      this.getContext();
      this.playBeep(880, 0.08, "sine");
    }
    return this.enabled;
  },

  playBeep(freq = 600, duration = 0.06, type = "sine", gainVal = 0.08) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio SFX notice:", e);
    }
  },

  // Cyber click sound
  click() {
    if (!this.enabled) return;
    this.playBeep(1200, 0.04, "triangle", 0.05);
  },

  // Futuristic hover tick
  hover() {
    if (!this.enabled) return;
    this.playBeep(700, 0.02, "sine", 0.02);
  },

  // Station select chirp
  stationSelect() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  },

  // Success / Confirmation Chime
  success() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playBeep(freq, 0.15, "triangle", 0.07);
        }, idx * 60);
      });
    } catch (e) {}
  },

  // Cart item added
  cartAdd() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }
};

window.NexusAudio = NexusAudio;
