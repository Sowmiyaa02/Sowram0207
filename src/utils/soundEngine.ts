class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isSynthesizing = false;
  private synthInterval: number | null = null;
  private isMuted = false;
  private volume = 0.65;
  private isPlaying = false;
  private isFileLoadedSuccessfully = false;

  initAudioCtx() {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  getVolume() {
    return this.volume;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }

  getIsFileLoaded() {
    return this.isFileLoadedSuccessfully;
  }

  async startMusic(src = '/audio/paathi-nee-paathi-naa.mp3') {
    this.initAudioCtx();
    this.isPlaying = true;
    try {
      if (!this.bgAudio) {
        this.bgAudio = new Audio(src);
        this.bgAudio.loop = true;
        this.bgAudio.volume = this.volume;
        this.bgAudio.muted = this.isMuted;
        this.bgAudio.addEventListener('canplaythrough', () => {
          this.isFileLoadedSuccessfully = true;
        });
        this.bgAudio.addEventListener('error', () => {
          this.isFileLoadedSuccessfully = false;
          this.startAmbientSynth();
        });
      }
      await this.bgAudio.play();
      this.isFileLoadedSuccessfully = true;
      return true;
    } catch {
      this.isFileLoadedSuccessfully = false;
      this.startAmbientSynth();
      return true;
    }
  }

  pauseMusic() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientSynth();
  }

  togglePlay(src = '/audio/paathi-nee-paathi-naa.mp3') {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    }
    this.startMusic(src);
    return true;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  playTone(freq: number, duration = 1.2, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    this.initAudioCtx();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.2 * this.volume,
        this.audioCtx.currentTime + 0.05
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        this.audioCtx.currentTime + duration
      );
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // ignore audio context errors
    }
  }

  startAmbientSynth() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;
    const notes = [311.13, 349.23, 392, 466.16, 523.25, 622.25, 698.46, 783.99];
    let idx = 0;
    this.synthInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const freq = notes[idx % notes.length];
      this.playTone(freq, 2.2, 'sine');
      if (idx % 2 === 0) {
        setTimeout(() => {
          if (this.isPlaying && !this.isMuted) {
            this.playTone(freq * 1.25, 1.8, 'triangle');
          }
        }, 300);
      }
      idx = (idx + Math.floor(Math.random() * 3) + 1) % notes.length;
    }, 1800);
  }

  stopAmbientSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  playSparkle() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.4, 'triangle'), i * 80);
    });
  }

  playSuccess() {
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.6, 'sine'), i * 110);
    });
  }

  playWrong() {
    [329.63, 293.66].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.5, 'sine'), i * 150);
    });
  }

  playHeartExplosion() {
    [440, 554.37, 659.25, 880, 1108.73, 1318.51].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 1.4, 'sine'), i * 90);
    });
  }
}

export const soundEngine = new SoundEngine();
