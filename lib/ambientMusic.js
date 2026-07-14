/**
 * Procedural ambient music fallback using Web Audio API.
 * Used when MP3 files are not yet added to public/assets/music/.
 */

const TRACK_PRESETS = {
  'soft-piano': {
    root: 261.63,
    notes: [0, 4, 7, 12, 7, 4],
    type: 'sine',
    interval: 2.2,
    detune: 0,
  },
  'romantic-instrumental': {
    root: 220.0,
    notes: [0, 4, 7],
    type: 'triangle',
    interval: 4.0,
    detune: 3,
  },
  lofi: {
    root: 146.83,
    notes: [0, 7, 10, 7],
    type: 'sine',
    interval: 1.8,
    detune: -5,
  },
  'acoustic-guitar': {
    root: 196.0,
    notes: [0, 4, 7, 4, 0, 7],
    type: 'triangle',
    interval: 1.5,
    detune: 0,
  },
  'calm-ambient': {
    root: 174.61,
    notes: [0, 4, 7, 11],
    type: 'sine',
    interval: 5.0,
    detune: 0,
  },
};

function midiToFreq(root, semitones) {
  return root * Math.pow(2, semitones / 12);
}

export class AmbientMusicEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.padOscillators = [];
    this.noteTimer = null;
    this.noteIndex = 0;
    this.currentPreset = null;
    this.volume = 0.5;
    this.isMuted = false;
    this.isPlaying = false;
    this.trackId = null;
  }

  async ensureContext() {
    if (typeof window === 'undefined') return false;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume * 0.35;
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    return true;
  }

  _stopPads() {
    this.padOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          this.ctx.currentTime + 0.5
        );
        osc.stop(this.ctx.currentTime + 0.6);
      } catch {
        // Oscillator may already be stopped
      }
    });
    this.padOscillators = [];
  }

  _stopNoteTimer() {
    if (this.noteTimer) {
      clearInterval(this.noteTimer);
      this.noteTimer = null;
    }
  }

  _startPads(preset) {
    const now = this.ctx.currentTime;
    preset.notes.forEach((semi, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = preset.type;
      osc.frequency.value = midiToFreq(preset.root, semi + preset.detune);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06 / preset.notes.length, now + 1.5);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      this.padOscillators.push({ osc, gain });
    });
  }

  _playNote(preset) {
    if (!this.ctx || !this.isPlaying) return;

    const semi = preset.notes[this.noteIndex % preset.notes.length];
    this.noteIndex += 1;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = preset.type;
    osc.frequency.value = midiToFreq(preset.root, semi);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 2);
  }

  async play(trackId) {
    const preset = TRACK_PRESETS[trackId];
    if (!preset) return false;

    const ready = await this.ensureContext();
    if (!ready) return false;

    this.stop(false);

    this.trackId = trackId;
    this.currentPreset = preset;
    this.isPlaying = true;
    this.noteIndex = 0;

    this._startPads(preset);
    this._playNote(preset);

    this.noteTimer = setInterval(() => {
      this._playNote(preset);
    }, preset.interval * 1000);

    return true;
  }

  stop(fade = true) {
    this._stopNoteTimer();
    if (fade && this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.8);
      setTimeout(() => {
        this._stopPads();
        this.isPlaying = false;
        this.trackId = null;
        if (this.masterGain) {
          this.masterGain.gain.value = this.isMuted ? 0 : this.volume * 0.35;
        }
      }, 900);
    } else {
      this._stopPads();
      this.isPlaying = false;
      this.trackId = null;
    }
  }

  pause() {
    this._stopNoteTimer();
    this._stopPads();
    this.isPlaying = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(
        0,
        this.ctx.currentTime + 0.3
      );
    }
  }

  async resume() {
    if (!this.trackId) return;
    await this.play(this.trackId);
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.value = this.volume * 0.35;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.volume * 0.35;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export function hasAmbientPreset(trackId) {
  return trackId in TRACK_PRESETS;
}
