/* =========================================================
   AUDIO ENGINE 3D: Web Audio API Procedural Flight Synthesizer
   Engine Roar, Sonic Boom, Lock-on Tone, Laser Guns, & Synth Music
   ========================================================= */

class FlightAudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.sfxGain = null;
        this.musicGain = null;
        this.engineGain = null;

        // Sound parameters
        this.musicVolume = 0.6;
        this.sfxVolume = 0.8;
        this.engineNoise = null;
        this.engineFilter = null;
        this.engineOsc = null;

        // Music sequencer
        this.isPlayingMusic = false;
        this.tempo = 128; // Fast Synthwave flight tempo
        this.step = 0;
        this.seqTimer = null;
        this.noiseBuffer = null;

        // Chords (D minor / Bb / F / C high-energy epic progression)
        this.chords = [
            [146.83, 174.61, 220.00], // Dm
            [116.54, 146.83, 174.61], // Bb
            [174.61, 220.00, 261.63], // F
            [130.81, 164.81, 196.00]  // C
        ];
        this.bassNotes = [73.42, 58.27, 87.31, 65.41]; // D2, Bb1, F2, C2
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
        this.initEngineAudio();
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

    initEngineAudio() {
        if (!this.ctx || !this.noiseBuffer) return;

        // Continuous jet engine white noise + lowpass filter
        this.engineNoise = this.ctx.createBufferSource();
        this.engineNoise.buffer = this.noiseBuffer;
        this.engineNoise.loop = true;

        this.engineFilter = this.ctx.createBiquadFilter();
        this.engineFilter.type = 'lowpass';
        this.engineFilter.frequency.value = 250;

        this.engineGain = this.ctx.createGain();
        this.engineGain.gain.value = 0.05;

        this.engineNoise.connect(this.engineFilter);
        this.engineFilter.connect(this.engineGain);
        this.engineGain.connect(this.sfxGain);

        // Low hum oscillator for jet engine turbine core
        this.engineOsc = this.ctx.createOscillator();
        this.engineOsc.type = 'sawtooth';
        this.engineOsc.frequency.value = 60;
        const oscGain = this.ctx.createGain();
        oscGain.gain.value = 0.04;
        this.engineOsc.connect(oscGain);
        oscGain.connect(this.engineFilter);

        this.engineNoise.start(0);
        this.engineOsc.start(0);
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    updateEngineSound(speedRatio, isBoosting) {
        if (!this.engineFilter || !this.engineOsc || !this.ctx) return;
        const now = this.ctx.currentTime;

        // Frequency sweep as speed increases
        const targetFreq = isBoosting ? 900 : (200 + speedRatio * 350);
        const targetOscPitch = isBoosting ? 130 : (55 + speedRatio * 45);
        const targetVol = isBoosting ? 0.35 : (0.05 + speedRatio * 0.1);

        this.engineFilter.frequency.setTargetAtTime(targetFreq, now, 0.1);
        this.engineOsc.frequency.setTargetAtTime(targetOscPitch, now, 0.1);
        this.engineGain.gain.setTargetAtTime(targetVol, now, 0.1);
    }

    setMusicVolume(vol) {
        this.musicVolume = Math.max(0, Math.min(1, vol));
        if (this.musicGain) this.musicGain.gain.setTargetAtTime(this.musicVolume, this.ctx.currentTime, 0.05);
    }

    setSfxVolume(vol) {
        this.sfxVolume = Math.max(0, Math.min(1, vol));
        if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(this.sfxVolume, this.ctx.currentTime, 0.05);
    }

    // ==========================================
    // PROCEDURAL FLIGHT SFX
    // ==========================================
    playLaser(isAlternate = false) {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        const startFreq = isAlternate ? 820 : 760;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    playMissileLaunch() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Whoosh rocket ignition
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.22);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.26);
    }

    playLockOnBeep() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    playExplosion(intensity = 1.0) {
        this.ensureContext();
        if (!this.ctx || !this.noiseBuffer) return;
        const now = this.ctx.currentTime;

        // Noise burst
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700 * intensity, now);
        filter.frequency.exponentialRampToValueAtTime(50, now + 0.4);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(Math.min(0.8, 0.4 * intensity), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.46);

        // Sub bass boom for large explosions
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(100, now);
        sub.frequency.exponentialRampToValueAtTime(25, now + 0.3);
        subGain.gain.setValueAtTime(0.4 * intensity, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        sub.connect(subGain);
        subGain.connect(this.sfxGain);
        sub.start(now);
        sub.stop(now + 0.33);
    }

    playRingCollected() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Crystalline dual chime
        [1046.50, 1567.98].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);
            gain.gain.setValueAtTime(0.2, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.18);

            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.19);
        });
    }

    playSonicBoom() {
        this.ensureContext();
        if (!this.ctx) return;
        this.playExplosion(2.2);
    }

    playUiClick() {
        this.ensureContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.05);
    }

    // ==========================================
    // SYNTHWAVE FLIGHT MUSIC
    // ==========================================
    startMusic() {
        this.ensureContext();
        if (this.isPlayingMusic) return;
        this.isPlayingMusic = true;
        this.step = 0;
        this.scheduleBeat();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.seqTimer) {
            clearTimeout(this.seqTimer);
            this.seqTimer = null;
        }
    }

    scheduleBeat() {
        if (!this.isPlayingMusic || !this.ctx) return;

        const secPerBeat = 60.0 / this.tempo;
        const stepTime = secPerBeat / 4; // 16th notes
        const now = this.ctx.currentTime;

        const currentBar = Math.floor(this.step / 16) % 4;
        const stepInBar = this.step % 16;

        // Kick Drum (Four-on-the-floor: 0, 4, 8, 12)
        if (stepInBar % 4 === 0) {
            const kick = this.ctx.createOscillator();
            const kGain = this.ctx.createGain();
            kick.frequency.setValueAtTime(150, now);
            kick.frequency.exponentialRampToValueAtTime(35, now + 0.1);
            kGain.gain.setValueAtTime(0.65, now);
            kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            kick.connect(kGain);
            kGain.connect(this.musicGain);
            kick.start(now);
            kick.stop(now + 0.13);
        }

        // Snare Clap (Beats 4 and 12)
        if (stepInBar === 4 || stepInBar === 12) {
            if (this.noiseBuffer) {
                const snare = this.ctx.createBufferSource();
                snare.buffer = this.noiseBuffer;
                const filter = this.ctx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 1200;
                const sGain = this.ctx.createGain();
                sGain.gain.setValueAtTime(0.3, now);
                sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                snare.connect(filter);
                filter.connect(sGain);
                sGain.connect(this.musicGain);
                snare.start(now);
                snare.stop(now + 0.17);
            }
        }

        // Rolling 16th Bassline
        const bassPitch = this.bassNotes[currentBar];
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const bGain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(stepInBar % 2 === 0 ? bassPitch : bassPitch * 2, now);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(150, now + stepTime * 0.9);

        bGain.gain.setValueAtTime(0.25, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 0.9);

        osc.connect(filter);
        filter.connect(bGain);
        bGain.connect(this.musicGain);
        osc.start(now);
        osc.stop(now + stepTime);

        // Synth Arpeggio Melodies
        const chord = this.chords[currentBar];
        const note = chord[this.step % chord.length] * 2;
        const lead = this.ctx.createOscillator();
        const lGain = this.ctx.createGain();
        lead.type = 'triangle';
        lead.frequency.setValueAtTime(note, now);
        lGain.gain.setValueAtTime(0.12, now);
        lGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 0.8);
        lead.connect(lGain);
        lGain.connect(this.musicGain);
        lead.start(now);
        lead.stop(now + stepTime);

        this.step++;
        this.seqTimer = setTimeout(() => this.scheduleBeat(), (stepTime * 1000) * 0.95);
    }
}

window.flightAudio = new FlightAudioEngine();
