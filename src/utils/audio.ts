// High-precision synthesized sound effects using Web Audio API

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // High-tech System notification chime
  playSystemPing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Deep ominous 'ARISE' shadow monarch surge
  playAriseSurge() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sub-bass rumble
      const oscSub = this.ctx.createOscillator();
      const gainSub = this.ctx.createGain();
      oscSub.type = 'sawtooth';
      oscSub.frequency.setValueAtTime(80, now);
      oscSub.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      gainSub.gain.setValueAtTime(0.2, now);
      gainSub.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      // Low pass filter to create shadow smoke depth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.linearRampToValueAtTime(120, now + 1.2);

      oscSub.connect(filter);
      filter.connect(gainSub);
      gainSub.connect(this.ctx.destination);

      oscSub.start(now);
      oscSub.stop(now + 1.4);

      // Ethereal high harmonic resonance
      const oscHigh = this.ctx.createOscillator();
      const gainHigh = this.ctx.createGain();
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(520, now);
      oscHigh.frequency.exponentialRampToValueAtTime(1100, now + 0.6);
      oscHigh.frequency.exponentialRampToValueAtTime(350, now + 1.2);

      gainHigh.gain.setValueAtTime(0.05, now);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      oscHigh.connect(gainHigh);
      gainHigh.connect(this.ctx.destination);

      oscHigh.start(now);
      oscHigh.stop(now + 1.25);
    } catch {
      // Fallback
    }
  }

  // Quest Completed / Stat Level Up
  playLevelUp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // Fallback
    }
  }

  // Gate Threat Pulsing Hum
  playGateWarning() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.4);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Fallback
    }
  }
}

export const sound = new SoundEngine();
