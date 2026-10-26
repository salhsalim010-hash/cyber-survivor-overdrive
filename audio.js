/* =========================================================
   AUDIO ENGINE: Web Audio API Procedural Synthesizer & Sequencer
   Real-time Synthwave Music & Dynamic Procedural SFX
   ========================================================= */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.masterGain = null;

        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.isMuted = false;

        this.isPlayingMusic = false;
        this.isBossMusic = false;
        this.tempo = 124; // BPM
        this.step = 0;
        this.seqTimer = null;

        // Synthwave Chord Progression (A minor -> F -> C -> G)
        this.chords = [
            [220.00, 261.63, 329.63], // Am (A3, C4, E4)
            [174.61, 220.00, 261.63], // F (F3, A3, C4)
            [261.63, 329.63, 392.00], // C (C4, E4, G4)
            [196.00, 246.94, 293.66]  // G (G3, B3, D4)
        ];

        this.bassNotes = [110, 87.31, 130.81, 98]; // A2, F2, C3, G2
        this.bossBassNotes = [55, 61.74, 58.27, 51.91]; // Dark A1, B1, Bb1, G#1

        // White noise buffer for explosions & percussion
        this.noiseBuffer = null;
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicVolume;
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxVolume;
        this.sfxGain.connect(this.masterGain);

        this.createNoiseBuffer();
    }

    createNoiseBuffer() {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 2;
        this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setMusicVolume(vol) {
        this.musicVolume = Math.max(0, Math.min(1, vol));
        if (this.musicGain) {
            this.musicGain.gain.setTargetAtTime(this.musicVolume, this.ctx.currentTime, 0.05);
        }
    }

    setSfxVolume(vol) {
        this.sfxVolume = Math.max(0, Math.min(1, vol));
        if (this.sfxGain) {
            this.sfxGain.gain.setTargetAtTime(this.sfxVolume, this.ctx.currentTime, 0.05);
        }
    }

    // ==========================================
    // SYNTH MUSIC SEQUENCER
    // ==========================================
    startMusic() {
        this.ensureContext();
        if (this.isPlayingMusic) return;
        this.isPlayingMusic = true;
        this.step = 0;
        this.scheduleNextBar();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.seqTimer) {
            clearTimeout(this.seqTimer);
            this.seqTimer = null;
        }
    }

    setBossTheme(active) {
        this.isBossMusic = active;
        this.tempo = active ? 140 : 124;
    }

    scheduleNextBar() {
        if (!this.isPlayingMusic || !this.ctx) return;

        const secondsPerBeat = 60.0 / this.tempo;
        const stepTime = secondsPerBeat / 4; // 16th note

        const currentBar = Math.floor(this.step / 16) % 4;
        const stepInBar = this.step % 16;
        const now = this.ctx.currentTime;

        // 1. Kick Drum (Every 4 steps: 0, 4, 8, 12)
        if (stepInBar % 4 === 0) {
            this.playKickSynth(now);
        }

        // 2. Snare / Clap (On beats 4 and 12)
        if (stepInBar === 4 || stepInBar === 12) {
            this.playSnareSynth(now);
        }

        // 3. Hi-Hat (Every 2 steps: 2, 6, 10, 14 offbeat)
        if (stepInBar % 2 === 1) {
            this.playHiHatSynth(now);
        }

        // 4. Rolling Bassline (16th notes with groove)
        const bassPitch = this.isBossMusic ? this.bossBassNotes[currentBar] : this.bassNotes[currentBar];
        if (stepInBar % 2 === 0 || (this.isBossMusic && stepInBar % 1 === 0)) {
            const freq = (stepInBar % 4 === 2) ? bassPitch * 1.5 : bassPitch;
            this.playBassSynth(now, freq, stepTime * 0.9);
        }

        // 5. Arpeggio / Lead Chords
        const chord = this.chords[currentBar];
        const arpIndex = (this.step % 8);
        const notePitch = chord[arpIndex % chord.length] * (arpIndex > 3 ? 2 : 1);
        this.playLeadSynth(now, notePitch, stepTime * 0.8);

        this.step++;
        const nextTime = (stepTime * 1000) * 0.95;
        this.seqTimer = setTimeout(() => this.scheduleNextBar(), nextTime);
    }

    playKickSynth(time) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(32, time + 0.12);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

        osc.start(time);
        osc.stop(time + 0.15);
    }

    playSnareSynth(time) {
        if (!this.ctx || !this.noiseBuffer) return;
        // White noise burst
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;

        const gain = this.ctx.createGain();
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        noise.start(time);
        noise.stop(time + 0.2);
    }

    playHiHatSynth(time) {
        if (!this.ctx || !this.noiseBuffer) return;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7000;

        const gain = this.ctx.createGain();
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        noise.start(time);
        noise.stop(time + 0.06);
    }

    playBassSynth(time, freq, dur) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, time);
        filter.frequency.exponentialRampToValueAtTime(150, time + dur);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + dur + 0.01);
    }

    playLeadSynth(time, freq, dur) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + dur + 0.01);
    }

    // ==========================================
    // PROCEDURAL SOUND EFFECTS (SFX)
    // ==========================================
    playLaser(type = 'normal') {
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.sfxGain);

        if (type === 'plasma') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(750, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === 'missile') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.23);
        } else {
            osc.type = 'square';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.09);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            osc.start(now);
            osc.stop(now + 0.1);
        }
    }

    playExplosion(intensity = 1) {
        this.ensureContext();
        if (!this.ctx || !this.noiseBuffer) return;

        const now = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 * intensity, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + 0.4);

        const gain = this.ctx.createGain();
        const vol = Math.min(0.8, 0.4 * intensity);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.46);

        // Sub bass thump for large explosions
        if (intensity >= 1.5) {
            const sub = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            sub.type = 'sine';
            sub.frequency.setValueAtTime(110, now);
            sub.frequency.exponentialRampToValueAtTime(28, now + 0.35);

            subGain.gain.setValueAtTime(0.5, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

            sub.connect(subGain);
            subGain.connect(this.sfxGain);
            sub.start(now);
            sub.stop(now + 0.36);
        }
    }

    playGem() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        
        // Crisp chime pitch
        const baseFreq = 880 + Math.random() * 200;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    playDash() {
        this.ensureContext();
        if (!this.ctx || !this.noiseBuffer) return;
        const now = this.ctx.currentTime;

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
        filter.Q.value = 3;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.21);
    }

    playLevelUp() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major arpeggio fanfare

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;

            const startTime = now + idx * 0.06;
            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(startTime);
            osc.stop(startTime + 0.36);
        });
    }

    playUltimate() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Pitch riser
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.42);

        // Huge shockwave boom at 0.35s
        setTimeout(() => {
            this.playExplosion(2.5);
        }, 350);
    }

    playUiClick() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.05);
    }
}

// Global Singleton
window.audioEngine = new SoundEngine();
