// Web Audio API Synthesizer for Birthday Music & Sound Effects

class SoundManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicTimeout: number | null = null;
  private isMuted = false;
  private volume = 0.6;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusic();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  // Play a soft bell/chime note
  public playNote(freq: number, duration = 0.5, type: OscillatorType = 'sine', decay = 0.4) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context may be restricted before user gesture
    }
  }

  // Sparkle / Magic sound effect
  public playSparkle() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.4, 'triangle', 0.8);
      }, idx * 60);
    });
  }

  // Pop / Confetti sound
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // ignore
    }
  }

  // Realistic paper turn / page flip sound effect
  public playPageFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.22);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.45, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.22);
    } catch {
      // ignore
    }
  }

  // Candle blow whoosh sound
  public playBlow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.8);
    } catch {
      // ignore
    }
  }

  // Full acoustic Happy Birthday melody loop
  public startHappyBirthdayMelody(onEndLoop?: () => void) {
    if (this.isMuted) return;
    this.initCtx();
    this.isPlayingMusic = true;

    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;

    const melody = [
      // Happy Birthday to you
      { note: C4, dur: 350 }, { note: C4, dur: 200 }, { note: D4, dur: 550 }, { note: C4, dur: 550 }, { note: F4, dur: 550 }, { note: E4, dur: 1100 },
      // Happy Birthday to you
      { note: C4, dur: 350 }, { note: C4, dur: 200 }, { note: D4, dur: 550 }, { note: C4, dur: 550 }, { note: G4, dur: 550 }, { note: F4, dur: 1100 },
      // Happy Birthday dear Thụy Vy
      { note: C4, dur: 350 }, { note: C4, dur: 200 }, { note: C5, dur: 550 }, { note: A4, dur: 550 }, { note: F4, dur: 550 }, { note: E4, dur: 550 }, { note: D4, dur: 1100 },
      // Happy Birthday to you
      { note: Bb4, dur: 350 }, { note: Bb4, dur: 200 }, { note: A4, dur: 550 }, { note: F4, dur: 550 }, { note: G4, dur: 550 }, { note: F4, dur: 1300 }
    ];

    let totalDelay = 0;

    const playSequence = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      totalDelay = 0;
      melody.forEach((item) => {
        window.setTimeout(() => {
          if (this.isPlayingMusic && !this.isMuted) {
            this.playHarmonicChime(item.note, item.dur / 1000);
          }
        }, totalDelay);
        totalDelay += item.dur;
      });

      this.musicTimeout = window.setTimeout(() => {
        if (this.isPlayingMusic && !this.isMuted) {
          if (onEndLoop) onEndLoop();
          playSequence();
        }
      }, totalDelay + 1800);
    };

    playSequence();
  }

  private playHarmonicChime(freq: number, duration: number) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain1.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * 1.5);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(this.ctx.currentTime + duration * 1.5);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);
      gain2.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start();
      osc2.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }
}

export const soundManager = new SoundManager();
