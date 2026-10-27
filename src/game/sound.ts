/**
 * High-Performance Procedural Web Audio Sound Engine for Ball Battle Game
 * Completely self-contained: No external mp3/wav files needed.
 * Zero network latency, instant playback, customizable volume & BGM synth.
 */

export interface SoundSettings {
  muted: boolean;
  sfxVolume: number; // 0 to 1
  bgmVolume: number; // 0 to 1
  bgmEnabled: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;

  private settings: SoundSettings = {
    muted: false,
    sfxVolume: 0.75,
    bgmVolume: 0.35,
    bgmEnabled: true,
  };

  // Sound cooldowns to avoid audio clipping / ear blasting on rapid events
  private lastWallBounceTime = 0;
  private lastBallBounceTime = 0;
  private lastHitTime = 0;

  // Background music state
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private bgmStep = 0;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    if (typeof localStorage !== 'undefined') {
      try {
        const savedMuted = localStorage.getItem('game_sound_muted');
        if (savedMuted !== null) this.settings.muted = savedMuted === 'true';

        const savedSfx = localStorage.getItem('game_sound_sfx_volume');
        if (savedSfx !== null) this.settings.sfxVolume = parseFloat(savedSfx);

        const savedBgm = localStorage.getItem('game_sound_bgm_volume');
        if (savedBgm !== null) this.settings.bgmVolume = parseFloat(savedBgm);

        const savedBgmEnabled = localStorage.getItem('game_sound_bgm_enabled');
        if (savedBgmEnabled !== null) this.settings.bgmEnabled = savedBgmEnabled === 'true';
      } catch {}
    }
  }

  public saveSettings() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('game_sound_muted', this.settings.muted.toString());
        localStorage.setItem('game_sound_sfx_volume', this.settings.sfxVolume.toString());
        localStorage.setItem('game_sound_bgm_volume', this.settings.bgmVolume.toString());
        localStorage.setItem('game_sound_bgm_enabled', this.settings.bgmEnabled.toString());
      } catch {}
    }
  }

  public getSettings(): SoundSettings {
    return { ...this.settings };
  }

  /**
   * Lazily initialize AudioContext on user interaction
   */
  public ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.settings.muted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.settings.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // BGM Gain
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.settings.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.settings.muted = muted;
    this.saveSettings();
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
    } else if (!muted && this.settings.bgmEnabled && !this.isBgmPlaying) {
      this.startBGM();
    }
  }

  public setSFXVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.settings.sfxVolume = clamped;
    this.saveSettings();
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public setBGMVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.settings.bgmVolume = clamped;
    this.saveSettings();
    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public setBGMEnabled(enabled: boolean) {
    this.settings.bgmEnabled = enabled;
    this.saveSettings();
    if (enabled && !this.settings.muted) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  // ==========================================
  // SOUND EFFECTS (SFX) SYNTHESIZER
  // ==========================================

  /**
   * Attack hit impact sound
   */
  public playHit(isCrit = false, heavy = false) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastHitTime < 0.04) return; // throttle 40ms
    this.lastHitTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isCrit ? 'sawtooth' : heavy ? 'triangle' : 'sine';
    const startFreq = isCrit ? 520 : heavy ? 380 : 280;
    const endFreq = isCrit ? 90 : 40;
    const duration = isCrit ? 0.18 : 0.12;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

    gain.gain.setValueAtTime(isCrit ? 0.8 : 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + duration);

    // If critical or heavy, add punchy sub thump
    if (isCrit || heavy) {
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);

      subOsc.start(now);
      subOsc.stop(now + 0.15);
    }
  }

  /**
   * Blade slash / swoosh sound
   */
  public playSlash() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Wall bounce sound (resonant hollow impact)
   */
  public playWallBounce() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastWallBounceTime < 0.06) return; // throttle 60ms
    this.lastWallBounceTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const pitch = 200 + Math.random() * 40;
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Ball-to-ball collision bounce
   */
  public playBallBounce() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastBallBounceTime < 0.05) return; // throttle 50ms
    this.lastBallBounceTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const pitch = 400 + Math.random() * 80;
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.06);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Laser / Railgun beam sound
   */
  public playLaser() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Minigun rapid shot
   */
  public playMinigun() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Lightning shock / zap
   */
  public playLightning() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Explosion sound
   */
  public playExplosion() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.4);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Dây Nịt whip snap sound
   */
  public playDayNit() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.09);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Shield activation / barrier hum
   */
  public playShield() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Skill activation power-up chime
   */
  public playSkillCast(slot = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const baseFreq = 300 + (slot % 6) * 70;

    [0, 0.05, 0.1].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * (1 + idx * 0.25), now + delay);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.3 + idx * 0.3), now + delay + 0.14);

      gain.gain.setValueAtTime(0.35, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + delay);
      osc.stop(now + delay + 0.14);
    });
  }

  /**
   * The Owner Game 7 Tỉ % & God Mode sound: Majestic cosmic golden chord
   */
  public playGodMode() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const freqs = [261.63, 329.63, 392.0, 523.25, 659.25]; // C major 7 chord

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.35, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.04);
      osc.stop(now + 0.7);
    });
  }

  /**
   * Ultimate supreme skill sound (Nhất Điếu Khai Thiên Môn, Bá Thường Long Hồn, Vạn Thần Khí)
   */
  public playUltimate() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;

    // Sub rumble
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(120, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.5);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 0.5);

    // Celestial rising arpeggio
    [440, 554.37, 659.25, 880, 1108.7].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.06);
      gain.gain.setValueAtTime(0.35, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }

  /**
   * Dimension Warp sound (2D / 3D / 4D Tesseract)
   */
  public playDimensionWarp(mode: '2d' | '3d' | '4d') {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (mode === '2d') {
      // Crisp retro 8-bit blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (mode === '3d') {
      // Holographic depth sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      // 4D Cosmic Spacetime Phase-Shift
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.32);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  }

  /**
   * Battle Start Horn / Gong
   */
  public playBattleStart() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    [261.63, 392.0, 523.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.4, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  /**
   * Victory Fanfare
   */
  public playWin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.5, d: 0.4, t: 0.36 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.45, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  /**
   * Defeat Sound
   */
  public playLose() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 392.0, t: 0 },
      { f: 369.99, t: 0.15 },
      { f: 349.23, t: 0.3 },
      { f: 293.66, t: 0.45 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.3, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.22);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.22);
    });
  }

  /**
   * Coin ping chime
   */
  public playCoin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 987.77, t: 0 },
      { f: 1318.51, t: 0.08 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.4, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.18);
    });
  }

  /**
   * UI button click sound
   */
  public playClick() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // ==========================================
  // PROCEDURAL BATTLE BACKGROUND MUSIC (BGM)
  // ==========================================

  /**
   * Start procedural synthwave battle music
   */
  public startBGM() {
    if (this.isBgmPlaying || !this.settings.bgmEnabled || this.settings.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Rhythmic 16-step bass & arpeggio sequence in A minor
    const bassScale = [110, 110, 130.81, 110, 146.83, 110, 164.81, 146.83];
    const arpScale = [440, 523.25, 659.25, 880, 659.25, 523.25, 587.33, 493.88];
    const tempoMs = 150; // 100 BPM 16th notes

    const tick = () => {
      if (!this.isBgmPlaying) return;

      const currentCtx = this.ensureContext();
      if (currentCtx && this.bgmGain && !this.settings.muted && this.settings.bgmEnabled) {
        const t = currentCtx.currentTime;

        // Bass beat
        const bassNote = bassScale[this.bgmStep % bassScale.length];
        const bassOsc = currentCtx.createOscillator();
        const bassGain = currentCtx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(bassNote / 2, t);
        bassGain.gain.setValueAtTime(0.18, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(t);
        bassOsc.stop(t + 0.12);

        // Melodic synth arpeggio every 2 steps
        if (this.bgmStep % 2 === 0) {
          const arpNote = arpScale[(this.bgmStep / 2) % arpScale.length];
          const arpOsc = currentCtx.createOscillator();
          const arpGain = currentCtx.createGain();
          arpOsc.type = 'triangle';
          arpOsc.frequency.setValueAtTime(arpNote, t);
          arpGain.gain.setValueAtTime(0.14, t);
          arpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          arpOsc.connect(arpGain);
          arpGain.connect(this.bgmGain);
          arpOsc.start(t);
          arpOsc.stop(t + 0.1);
        }

        // Percussive kick / hi-hat click every 4 steps
        if (this.bgmStep % 4 === 0) {
          const kickOsc = currentCtx.createOscillator();
          const kickGain = currentCtx.createGain();
          kickOsc.type = 'sine';
          kickOsc.frequency.setValueAtTime(120, t);
          kickOsc.frequency.exponentialRampToValueAtTime(30, t + 0.08);
          kickGain.gain.setValueAtTime(0.3, t);
          kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          kickOsc.connect(kickGain);
          kickGain.connect(this.bgmGain);
          kickOsc.start(t);
          kickOsc.stop(t + 0.08);
        }
      }

      this.bgmStep++;
      this.bgmTimer = window.setTimeout(tick, tempoMs);
    };

    tick();
  }

  /**
   * Stop background music
   */
  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  /**
   * Stellar Remote: Satellite terminal click & holographic menu open
   */
  public playStellarMenu() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    [1200, 1800, 2400].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.2, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.05);
    });
  }

  /**
   * SS-01: Orbital Railgun Light-speed Beam
   */
  public playOrbitalBeam() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(450, now + 0.15);
    osc.frequency.setValueAtTime(280, now + 0.3);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * SS-03: Jupiter Planetary Core Rift
   */
  public playJupiterSplit() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  /**
   * SS-03: Tungsten Drill Rotary Spin Whine
   */
  public playTungstenDrillSpin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(720, now + 0.6);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * SS-03: Tungsten Rod Hypersonic Air Screech & Tsar Bomba Detonation
   */
  public playTsarBomba() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    // Massive sub-bass impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.9);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 0.9);

    // Crackling shockwave
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.7, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    whiteNoise.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    whiteNoise.start(now);
  }

  /**
   * SS-04: Big Dipper Star Charge Ping
   */
  public playSevenStarCharge(starIdx = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const baseFreq = 400 + (starIdx % 7) * 90;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * SS-04: Celestial Meteor Impact (5000 DMG)
   */
  public playSevenStarImpact() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * SS-04: Grand Unison 7-Star Supernova Blast (15000 DMG)
   */
  public playSevenStarSupernova() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 1.6, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 0.45);
    });
    this.playExplosion();
  }

  /**
   * SS-05: 4D Tesseract Pulse (6500 DMG per pulse)
   */
  public playTesseractPulse(pulseNum = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180 + pulseNum * 40, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * SS-05: Tesseract Spacetime Collapse & Final Detonation (20000 DMG)
   */
  public playTesseractCollapse() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.65);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.7);
    this.playTsarBomba();
  }

  /**
   * SS-06: Halley's Comet Vector Course Correction Thruster Burn
   */
  public playHalleyCourseCorrection() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.8);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  /**
   * SS-06: Halley's Comet Cataclysmic 60,000 DMG Impact Detonation
   */
  public playHalleyImpact() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    // Massive sub-bass asteroid crash
    const sub = ctx.createOscillator();
    const subG = ctx.createGain();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(260, now);
    sub.frequency.exponentialRampToValueAtTime(15, now + 1.2);
    subG.gain.setValueAtTime(0.9, now);
    subG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    sub.connect(subG);
    subG.connect(this.sfxGain);
    sub.start(now);
    sub.stop(now + 1.2);
    this.playTsarBomba();
  }

  /**
   * SS-21: Quasar Accretion Disc High-Speed Relativistic Swirl
   */
  public playQuasarVortexSpin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 1.0);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.0);
  }

  /**
   * SS-21: Quasar Super White Laser Beam Ionization Hum
   */
  public playQuasarSuperLaser() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.linearRampToValueAtTime(440, now + 0.18);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * SS-21: Quasar 20,000 DMG Singularity Collapse Detonation
   */
  public playQuasarExplosion() {
    this.playTsarBomba();
  }

  /**
   * Upgraded Railgun: Ultra Laser Energy Charge Buildup
   */
  public playUltraLaserCharge() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    
    // Low frequency rumbler
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(60, now);
    sub.frequency.exponentialRampToValueAtTime(320, now + 2.0);
    subGain.gain.setValueAtTime(0.01, now);
    subGain.gain.linearRampToValueAtTime(0.4, now + 1.8);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    sub.connect(subGain);
    subGain.connect(this.sfxGain);
    sub.start(now);
    sub.stop(now + 2.0);

    // High frequency electric charge whine
    const whine = ctx.createOscillator();
    const whineGain = ctx.createGain();
    whine.type = 'sawtooth';
    whine.frequency.setValueAtTime(400, now);
    whine.frequency.exponentialRampToValueAtTime(2400, now + 2.0);
    whineGain.gain.setValueAtTime(0.05, now);
    whineGain.gain.linearRampToValueAtTime(0.3, now + 1.8);
    whineGain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    whine.connect(whineGain);
    whineGain.connect(this.sfxGain);
    whine.start(now);
    whine.stop(now + 2.0);
  }

  /**
   * Upgraded Railgun: Ultra Laser Launch & 1000 DMG Detonation
   */
  public playUltraLaserBlast() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // Laser discharge snap
    const snap = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snap.type = 'sawtooth';
    snap.frequency.setValueAtTime(1600, now);
    snap.frequency.exponentialRampToValueAtTime(80, now + 0.35);
    snapGain.gain.setValueAtTime(0.6, now);
    snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    snap.connect(snapGain);
    snapGain.connect(this.sfxGain);
    snap.start(now);
    snap.stop(now + 0.35);

    // Deep cataclysmic explosion impact
    const boom = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boom.type = 'triangle';
    boom.frequency.setValueAtTime(140, now);
    boom.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    boomGain.gain.setValueAtTime(0.7, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    boom.connect(boomGain);
    boomGain.connect(this.sfxGain);
    boom.start(now);
    boom.stop(now + 0.8);
  }

  /**
   * Event Horizon: Singularity Aperture Activation & Purple Energy Concentration
   */
  public playEventHorizonCharge() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    const hum = ctx.createOscillator();
    const humGain = ctx.createGain();
    hum.type = 'sine';
    hum.frequency.setValueAtTime(65, now);
    hum.frequency.exponentialRampToValueAtTime(160, now + 2.5);
    humGain.gain.setValueAtTime(0.35, now);
    humGain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);
    hum.connect(humGain);
    humGain.connect(this.sfxGain);
    hum.start(now);
    hum.stop(now + 2.5);

    const aura = ctx.createOscillator();
    const auraGain = ctx.createGain();
    aura.type = 'triangle';
    aura.frequency.setValueAtTime(220, now);
    aura.frequency.linearRampToValueAtTime(540, now + 2.5);
    auraGain.gain.setValueAtTime(0.15, now);
    auraGain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);
    aura.connect(auraGain);
    auraGain.connect(this.sfxGain);
    aura.start(now);
    aura.stop(now + 2.5);
  }

  /**
   * Event Horizon: Gravitational Singularity Vortex Pull on Arena Floor
   */
  public playEventHorizonVortex() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(320, now + 1.2);
    osc.frequency.exponentialRampToValueAtTime(50, now + 1.8);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.8);
  }

  /**
   * Event Horizon: Singularity Implosion / Black Hole Collapse
   */
  public playEventHorizonCollapse() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // Vacuum suck snap
    const snap = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snap.type = 'sawtooth';
    snap.frequency.setValueAtTime(700, now);
    snap.frequency.exponentialRampToValueAtTime(35, now + 0.3);
    snapGain.gain.setValueAtTime(0.7, now);
    snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    snap.connect(snapGain);
    snapGain.connect(this.sfxGain);
    snap.start(now);
    snap.stop(now + 0.3);

    // Deep cosmic shockwave
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(120, now + 0.05);
    sub.frequency.exponentialRampToValueAtTime(20, now + 1.3);
    subGain.gain.setValueAtTime(0.85, now + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
    sub.connect(subGain);
    subGain.connect(this.sfxGain);
    sub.start(now + 0.05);
    sub.stop(now + 1.3);
  }

  /**
   * Neutron Star: Binary Inspiral Gravitational Chirp & High Frequency Whir
   */
  public playNeutronBinaryOrbit() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // Dual pulsating chirp oscillators
    [220, 277].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 3.5);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 3.5);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 3.5);
    });
  }

  /**
   * Neutron Star: Kilonova Collision Flash & Merger Resonator
   */
  public playNeutronMergerFlash() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(110, now + 1.2);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.2);
  }

  /**
   * Neutron Star: Arena Impact Detonation & Gamma-Ray Burst Radioactive Hum
   */
  public playNeutronImpact() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // 1. Extreme low-end kilonova blast
    const boom = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(160, now);
    boom.frequency.exponentialRampToValueAtTime(25, now + 1.5);
    boomGain.gain.setValueAtTime(0.95, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    boom.connect(boomGain);
    boomGain.connect(this.sfxGain);
    boom.start(now);
    boom.stop(now + 1.5);

    // 2. High-energy gamma ray burst sizzle
    const sizzle = ctx.createOscillator();
    const sizzleGain = ctx.createGain();
    sizzle.type = 'sawtooth';
    sizzle.frequency.setValueAtTime(1200, now);
    sizzle.frequency.linearRampToValueAtTime(350, now + 0.8);
    sizzleGain.gain.setValueAtTime(0.4, now);
    sizzleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    sizzle.connect(sizzleGain);
    sizzleGain.connect(this.sfxGain);
    sizzle.start(now);
    sizzle.stop(now + 0.8);
  }

  /**
   * SS-02 The Sun: Planetary Plunge Whoosh & Impact (8 planets dive sequentially)
   */
  public playSolarSystemPlanetsDive(planetIndex: number) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    const baseFreq = 220 + planetIndex * 45;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.28);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  /**
   * SS-02 The Sun: Colossal Solar Cataclysm Supernova Impact
   */
  public playTheSunSupernova() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // 1. Massive deep rumble
    const rumble = ctx.createOscillator();
    const rumbleGain = ctx.createGain();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(140, now);
    rumble.frequency.exponentialRampToValueAtTime(20, now + 2.2);
    rumbleGain.gain.setValueAtTime(1.0, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    rumble.connect(rumbleGain);
    rumbleGain.connect(this.sfxGain);
    rumble.start(now);
    rumble.stop(now + 2.2);

    // 2. Thermonuclear solar flare roaring crackle
    const flare = ctx.createOscillator();
    const flareGain = ctx.createGain();
    flare.type = 'sawtooth';
    flare.frequency.setValueAtTime(650, now);
    flare.frequency.linearRampToValueAtTime(90, now + 1.2);
    flareGain.gain.setValueAtTime(0.5, now);
    flareGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    flare.connect(flareGain);
    flareGain.connect(this.sfxGain);
    flare.start(now);
    flare.stop(now + 1.2);
  }

  /**
   * SS-FINAL Big Bang: Particle Accelerator Machine Spinning Up
   */
  public playBigBangMachineStartup(progress: number) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    const baseFreq = 60 + Math.pow(Math.min(1, Math.max(0, progress)), 2) * 480;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.08, now + 0.18);

    gain.gain.setValueAtTime(0.25 + progress * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * SS-FINAL Big Bang: Electron & Proton Fusion into Single Quantum Singularity
   */
  public playBigBangSingularityFusion() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // Resonant high-pitch singularity compression sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(1750, now + 0.9);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.65, now + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.1);
  }

  /**
   * SS-FINAL Big Bang: Primordial Big Bang Eruption & Cosmic Expansion
   */
  public playBigBangCataclysm() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;

    // 1. Deep sub-harmonic seismic bass (Universe birth rumble)
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(95, now);
    sub.frequency.exponentialRampToValueAtTime(12, now + 3.2);
    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    sub.connect(subGain);
    subGain.connect(this.sfxGain);
    sub.start(now);
    sub.stop(now + 3.2);

    // 2. Primordial plasma blast crackle
    const blast = ctx.createOscillator();
    const blastGain = ctx.createGain();
    blast.type = 'sawtooth';
    blast.frequency.setValueAtTime(800, now);
    blast.frequency.exponentialRampToValueAtTime(45, now + 1.8);
    blastGain.gain.setValueAtTime(0.75, now);
    blastGain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
    blast.connect(blastGain);
    blastGain.connect(this.sfxGain);
    blast.start(now);
    blast.stop(now + 1.8);

    // 3. Ethereal celestial harmonic chord (The dawn of stars and light)
    [528, 660, 792, 1056].forEach((f, i) => {
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.type = 'triangle';
      harm.frequency.setValueAtTime(f, now + 0.05 * i);
      harm.frequency.linearRampToValueAtTime(f * 1.5, now + 2.0);
      harmGain.gain.setValueAtTime(0.25 / (i + 1), now);
      harmGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
      harm.connect(harmGain);
      harmGain.connect(this.sfxGain);
      harm.start(now);
      harm.stop(now + 2.4);
    });
  }

  public toggleMute(): boolean {
    const next = !this.settings.muted;
    this.setMuted(next);
    return next;
  }
}

export const sound = new SoundEngine();
