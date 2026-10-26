# 🎮 ARCADE SHOWDOWN: THE DUAL BROWSER BATTLE

A showcase of two browser games built with pure modern web technologies, zero bloat, and custom procedural Web Audio synthesizers.

---

## 🏆 Game 1: CYBER SURVIVOR: OVERDRIVE
### *الناجي السيبراني: السرعة القصوى*
**Location:** `/` (Root directory - `index.html`)

A neon-drenched Cyberpunk Roguelite twin-stick arcade arena shooter built with pure HTML5 Canvas 2D and real-time procedural Web Audio synthesis.

### ✨ Key Features
- **Pure Procedural Audio Synth:** Real-time 80s synthwave music sequencer and sound effects generator via Web Audio API.
- **60+ FPS Object-Pooled Canvas Engine:** Additive neon bloom, shockwaves, damage floating text, screen shake, and camera follow.
- **Twin-Stick Action:** True manual mouse aiming with animated laser sight and left-click trigger.
- **Mobile & Tablet Ready:** Dual virtual joysticks (360 Movement stick + Aim & Fire stick) and fullscreen mode.
- **3 Unique Ships:** Vanguard-01, Phantom-X, and Colossus-MK4.
- **Roguelike Upgrades:** Twin Blaster, Homing Void Missiles, Orbital Sawblades, Tesla Chain Lightning, and Gravitational Singularities.
- **Boss Battles:** Wave 5 Cyber Hydra & Wave 10 Giga Titan.
- **Bilingual:** Full Arabic (العربية) and English support with one-click instant switch.
- **Core Hangar:** Permanent meta-progression shop saved locally via `localStorage`.

### 🕹️ Controls (Game 1)
- **PC:** `WASD` to move, Mouse to aim, `Left-Click` to shoot, `Space`/`Shift` to dash, `E` for Ultimate Overdrive.
- **Mobile:** Left virtual joystick for 360° motion, Right virtual joystick for direction-aimed shooting, Dash & Ultimate touch buttons.

---

## ⚡ Game 2: CYBERWING 3D: QUANTUM STRIKE
### *أجنحة السايبر 3D: الضربة الكمية*
**Location:** `/game2/` (`game2/index.html`)

A 3D Supersonic Flight Combat simulation game built with WebGL / Three.js. Pilot an advanced aerospace fighter through endless cyberpunk neon megacities, dogfight hunter drones, and take down titan dreadnoughts.

### ✨ Key Features
- **Full 3D WebGL Engine:** Dynamic lighting, neon volumetric fog, infinite procedural skyscraper canyons, and warp speed tunnels.
- **Energy Shield & Hull System:** Auto-recharging cyber shield, 1.2s invulnerability frames (I-frames), and safe corridor bounce-back physics.
- **Supersonic Flight Physics:** Dynamic banking, barrel rolls (`A`/`D` double-tap or mobile `Roll` button), quantum afterburners with FOV warping.
- **Combat Systems:** Twin forward pulse lasers, lock-on targeting cone, and homing plasma torpedoes.
- **Mobile Optimized:** Virtual flight stick, touch combat panel (Turbo, Barrel Roll, Torpedo, Auto-Fire toggle), haptic vibration feedback, and landscape mode guidance.
- **Boss Encounters:** Titan Valkyrie Mothership dreadnought battle at 2.5 KM.
- **Interactive Audio:** Real-time procedural jet engine turbine synthesis, sonic booms, laser blasts, and high-energy electronic soundtrack.

### 🕹️ Controls (Game 2)
- **PC:** `WASD` or Mouse to steer & bank, Double-tap `A`/`D` for Barrel Roll, `Space`/`Shift` for Turbo Boost, `Left-Click` for Lasers, `Right-Click` or `K` for Missiles, `V` to toggle Cockpit / Chase camera.
- **Mobile:** Left touch stick for 360° flight, dedicated buttons for `Boost 🔥`, `Barrel Roll 🔄`, `Torpedo 🚀`, and `Auto-Fire 🎯`.

---

## 🚀 How to Play Locally

Serve with any static HTTP server from the root directory:

```bash
# Python
python -m http.server 8080
```

- **Game 1:** `http://localhost:8080/index.html`
- **Game 2:** `http://localhost:8080/game2/index.html`

### 📱 Playing on Mobile (Same Wi-Fi)
Open `http://<YOUR_LOCAL_IP>:8080/game2/index.html` on your mobile browser.

---

## 🌐 GitHub Pages Deployment
1. Go to repository **Settings** > **Pages**.
2. Select **Branch: main** and folder `/ (root)`, then click **Save**.
3. Access anytime at:
   - Game 1: `https://<username>.github.io/<repo>/`
   - Game 2: `https://<username>.github.io/<repo>/game2/`
