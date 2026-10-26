/* =========================================================
   PARTICLE ENGINE & CAMERA JUICE
   High-performance object-pooled particle & shockwave system
   ========================================================= */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.shockwaves = [];
        this.damageNumbers = [];
        this.ambientStars = [];

        // Pool sizes
        this.maxParticles = 800;
        this.quality = 'high'; // 'low', 'med', 'high'
        this.screenshakeEnabled = true;

        // Camera Shake State
        this.shakeIntensity = 0;
        this.shakeDuration = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;

        // Screen Flash State
        this.flashAlpha = 0;
        this.flashColor = '#ffffff';

        this.initAmbientStars();
    }

    initAmbientStars() {
        this.ambientStars = [];
        const count = 120;
        for (let i = 0; i < count; i++) {
            this.ambientStars.push({
                x: Math.random() * 3000 - 1500,
                y: Math.random() * 3000 - 1500,
                size: Math.random() * 2 + 0.8,
                alpha: Math.random() * 0.7 + 0.3,
                speed: Math.random() * 0.4 + 0.1,
                color: Math.random() > 0.5 ? '#00f3ff' : '#ff0055'
            });
        }
    }

    addScreenshake(intensity, duration = 0.25) {
        if (!this.screenshakeEnabled) return;
        this.shakeIntensity = Math.min(25, this.shakeIntensity + intensity);
        this.shakeDuration = Math.max(this.shakeDuration, duration);
    }

    triggerScreenFlash(color = '#ffffff', alpha = 0.4) {
        this.flashColor = color;
        this.flashAlpha = alpha;
    }

    spawnSpark(x, y, vx, vy, color = '#00f3ff', size = 3, life = 0.6) {
        if (this.particles.length >= this.maxParticles) return;
        this.particles.push({
            x, y, vx, vy,
            color,
            size,
            initialSize: size,
            life,
            maxLife: life,
            type: 'spark'
        });
    }

    spawnExplosion(x, y, color = '#ff0055', count = 25, power = 5) {
        const actualCount = this.quality === 'low' ? Math.floor(count * 0.4) : count;
        for (let i = 0; i < actualCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.8 + 0.2) * power;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = Math.random() * 4 + 2;
            const life = Math.random() * 0.4 + 0.3;
            this.spawnSpark(x, y, vx, vy, color, size, life);
        }

        // Add a shockwave ring
        this.spawnShockwave(x, y, color, power * 15, 0.35);
    }

    spawnShockwave(x, y, color = '#00f3ff', maxRadius = 80, duration = 0.4) {
        this.shockwaves.push({
            x, y,
            radius: 4,
            maxRadius,
            duration,
            life: duration,
            color,
            lineWidth: 6
        });
    }

    spawnTrail(x, y, color = '#00f3ff', size = 4) {
        if (this.particles.length >= this.maxParticles) return;
        this.particles.push({
            x: x + (Math.random() * 4 - 2),
            y: y + (Math.random() * 4 - 2),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color,
            size,
            initialSize: size,
            life: 0.25,
            maxLife: 0.25,
            type: 'trail'
        });
    }

    spawnDamageNumber(x, y, amount, isCrit = false, isPlayer = false) {
        const text = Math.round(amount).toString();
        const color = isPlayer ? '#ff2244' : (isCrit ? '#ffe600' : '#00f3ff');
        const fontSize = isCrit ? 22 : 15;
        this.damageNumbers.push({
            x: x + (Math.random() * 20 - 10),
            y: y - 10,
            text,
            color,
            fontSize,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -2 - Math.random() * 1.5,
            life: 0.7,
            maxLife: 0.7,
            isCrit
        });
    }

    update(dt) {
        // Camera shake update
        if (this.shakeDuration > 0) {
            this.shakeDuration -= dt;
            const decay = Math.max(0, this.shakeDuration / 0.25);
            const currentMag = this.shakeIntensity * decay;
            this.shakeOffsetX = (Math.random() * 2 - 1) * currentMag;
            this.shakeOffsetY = (Math.random() * 2 - 1) * currentMag;
        } else {
            this.shakeIntensity = 0;
            this.shakeOffsetX = 0;
            this.shakeOffsetY = 0;
        }

        // Screen Flash decay
        if (this.flashAlpha > 0) {
            this.flashAlpha = Math.max(0, this.flashAlpha - dt * 2.5);
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            p.x += p.vx * 60 * dt;
            p.y += p.vy * 60 * dt;
            p.vx *= 0.96;
            p.vy *= 0.96;
            p.size = p.initialSize * (p.life / p.maxLife);
        }

        // Update Shockwaves
        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const sw = this.shockwaves[i];
            sw.life -= dt;
            if (sw.life <= 0) {
                this.shockwaves.splice(i, 1);
                continue;
            }
            const progress = 1 - (sw.life / sw.duration);
            sw.radius = 4 + progress * sw.maxRadius;
            sw.lineWidth = Math.max(1, 6 * (1 - progress));
        }

        // Update Damage Numbers
        for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
            const dn = this.damageNumbers[i];
            dn.life -= dt;
            if (dn.life <= 0) {
                this.damageNumbers.splice(i, 1);
                continue;
            }
            dn.x += dn.vx * 60 * dt;
            dn.y += dn.vy * 60 * dt;
            dn.vy += 2 * dt; // slight gravity
        }
    }

    renderBackgroundStars(ctx, camera) {
        ctx.save();
        for (let star of this.ambientStars) {
            // Parallax movement relative to camera
            const drawX = (star.x - camera.x * star.speed + 6000) % 3000 - 1500;
            const drawY = (star.y - camera.y * star.speed + 6000) % 3000 - 1500;

            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    render(ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter'; // Neon glowing additive blending

        // 1. Draw Shockwaves
        for (let sw of this.shockwaves) {
            const alpha = sw.life / sw.duration;
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = sw.lineWidth;
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 2. Draw Particles (Sparks & Trails)
        for (let p of this.particles) {
            const alpha = p.life / p.maxLife;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;

            if (p.type === 'spark') {
                // Velocity-oriented stretched spark
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 1) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.atan2(p.vy, p.vx));
                    ctx.fillRect(-p.size * 1.8, -p.size * 0.5, p.size * 3.6, p.size);
                    ctx.restore();
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();

        // 3. Draw Damage Numbers (Floating combat text)
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let dn of this.damageNumbers) {
            const alpha = dn.life / dn.maxLife;
            ctx.globalAlpha = alpha;
            ctx.font = `900 ${dn.fontSize}px 'Orbitron', 'Cairo', sans-serif`;
            ctx.fillStyle = dn.color;
            ctx.shadowColor = dn.color;
            ctx.shadowBlur = 8;
            ctx.fillText(dn.text, dn.x, dn.y);
        }
        ctx.restore();
    }

    renderScreenFlash(ctx, width, height) {
        if (this.flashAlpha > 0) {
            ctx.save();
            ctx.fillStyle = this.flashColor;
            ctx.globalAlpha = this.flashAlpha;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }
    }

    clear() {
        this.particles = [];
        this.shockwaves = [];
        this.damageNumbers = [];
    }
}

// Global Singleton
window.particleSystem = new ParticleSystem();
