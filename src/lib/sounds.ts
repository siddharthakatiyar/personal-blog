"use client";

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isEnabled = false; 

  constructor() {
    // Attempt to hydrate from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sounds-enabled");
      if (stored !== null) {
        this.isEnabled = stored === "true";
      }
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sounds-enabled", String(this.isEnabled));
    }
    if (this.isEnabled) {
      this.init();
      this.playBoot(); // Play a nice sound to confirm it's on
    }
    return this.isEnabled;
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  playKeytick() {
    if (!this.isEnabled || !this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.001);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.005);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.01);
  }

  playBoot() {
    if (!this.isEnabled || !this.ctx) return;
    
    const playNote = (freq: number, delay: number) => {
      if(!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + 0.5);
    };

    playNote(440, 0);     // A4
    playNote(659.25, 0.1); // E5
  }
}

export const sounds = typeof window !== "undefined" ? new SoundEngine() : null;
