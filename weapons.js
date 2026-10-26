/* =========================================================
   WEAPONS & PROJECTILES SYSTEM
   Dynamic Roguelike Arsenal: Blasters, Missiles, Orbitals, Tesla, Singularity
   ========================================================= */

class Projectile {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.damage = 10;
        this.radius = 4;
        this.color = '#00f3ff';
        this.pierce = 1;
        this.life = 2.0;
        this.maxLife = 2.0;
        this.isHoming = false;
        this.target = null;
        this.homingTurnSpeed = 0.08;
        this.isExplosive = false;
        this.explosionRadius = 0;
        this.isEnemy = false;
        this.type = 'blaster';
    }

    init(x, y, vx, vy, damage, opts = {}) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.radius = opts.radius || 4;
        this.color = opts.color || '#00f3ff';
        this.pierce = opts.pierce || 1;
        this.life = opts.life || 1.8;
        this.maxLife = this.life;
        this.isHoming = opts.isHoming || false;
        this.target = opts.target || null;
        this.homingTurnSpeed = opts.homingTurnSpeed || 0.1;
        this.isExplosive = opts.isExplosive || false;
        this.explosionRadius = opts.explosionRadius || 0;
        this.isEnemy = opts.isEnemy || false;
        this.type = opts.type || 'blaster';
    }

    update(dt, enemies) {
        if (!this.active) return;
        this.life -= dt;
        if (this.life <= 0) {
            this.active = false;
            if (this.isExplosive) {
                this.explode();
            }
            return;
        }

        // Homing behavior
        if (this.isHoming) {
            // Find target if none or died
            if (!this.target || !this.target.active) {
                let minDist = 400;
                this.target = null;
                for (let e of enemies) {
                    if (!e.active) continue;
                    const d = Math.hypot(e.x - this.x, e.y - this.y);
                    if (d < minDist) {
                        minDist = d;
                        this.target = e;
                    }
                }
            }

            if (this.target && this.target.active) {
                const targetAngle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
                const currentAngle = Math.atan2(this.vy, this.vx);
                let diff = targetAngle - currentAngle;
                while (diff < -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;
                const newAngle = currentAngle + Math.sign(diff) * Math.min(Math.abs(diff), this.homingTurnSpeed);
                const currentSpeed = Math.hypot(this.vx, this.vy);
                this.vx = Math.cos(newAngle) * currentSpeed;
                this.vy = Math.sin(newAngle) * currentSpeed;
            }

            // Spawn smoke trail
            if (Math.random() < 0.6) {
                window.particleSystem.spawnTrail(this.x, this.y, '#ff0055', 3);
            }
        }

        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;
    }

    explode() {
        window.audioEngine.playExplosion(1.2);
        window.particleSystem.spawnExplosion(this.x, this.y, this.color, 20, 4);
    }

    render(ctx) {
        if (!this.active) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color;

        if (this.type === 'blaster') {
            // Elongated neon bolt
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.atan2(this.vy, this.vx));
            ctx.fillRect(-this.radius * 2, -this.radius * 0.75, this.radius * 4, this.radius * 1.5);
            // Core white highlight
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-this.radius, -this.radius * 0.35, this.radius * 2, this.radius * 0.7);
        } else if (this.type === 'missile') {
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.atan2(this.vy, this.vx));
            ctx.beginPath();
            ctx.moveTo(6, 0);
            ctx.lineTo(-6, -4);
            ctx.lineTo(-4, 0);
            ctx.lineTo(-6, 4);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Singularity / Black Hole Class
class Singularity {
    constructor(x, y, duration = 4, radius = 140, damagePerSec = 40) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.duration = duration;
        this.life = duration;
        this.radius = radius;
        this.damagePerSec = damagePerSec;
        this.rotation = 0;
    }

    update(dt, enemies) {
        this.life -= dt;
        if (this.life <= 0) {
            this.active = false;
            // Final implosion
            window.audioEngine.playExplosion(1.8);
            window.particleSystem.spawnExplosion(this.x, this.y, '#9d00ff', 35, 7);
            window.particleSystem.addScreenshake(8, 0.3);
            for (let e of enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < this.radius * 1.2) {
                    e.takeDamage(this.damagePerSec * 2, true);
                }
            }
            return;
        }

        this.rotation += dt * 4;

        // Pull nearby enemies inward
        for (let e of enemies) {
            if (!e.active) continue;
            const dx = this.x - e.x;
            const dy = this.y - e.y;
            const dist = Math.hypot(dx, dy);
            if (dist < this.radius && dist > 5) {
                const pullStrength = (1 - dist / this.radius) * 120 * dt;
                e.x += (dx / dist) * pullStrength;
                e.y += (dy / dist) * pullStrength;
                // Periodic tick damage
                e.takeDamage(this.damagePerSec * dt, false);
            }
        }

        if (Math.random() < 0.3) {
            const angle = Math.random() * Math.PI * 2;
            const r = this.radius * Math.random();
            window.particleSystem.spawnSpark(
                this.x + Math.cos(angle) * r,
                this.y + Math.sin(angle) * r,
                -Math.cos(angle) * 3,
                -Math.sin(angle) * 3,
                '#9d00ff',
                2,
                0.3
            );
        }
    }

    render(ctx) {
        if (!this.active) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Swirling vortex circles
        ctx.strokeStyle = '#9d00ff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#9d00ff';
        ctx.shadowBlur = 15;

        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, (this.radius / 3) * i, i * 0.5, i * 0.5 + Math.PI * 1.2);
            ctx.stroke();
        }

        // Inner dark singularity core
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#0a001a';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
}

// Weapons Definition and Registry
const WEAPON_TYPES = {
    BLASTER: 'blaster',
    HOMING_MISSILES: 'missiles',
    ORBITAL_BLADES: 'orbital',
    TESLA_ARC: 'tesla',
    SINGULARITY: 'singularity'
};

class WeaponManager {
    constructor(player) {
        this.player = player;
        this.projectiles = [];
        this.singularities = [];
        this.maxProjectiles = 600;

        // Populate projectile pool
        for (let i = 0; i < this.maxProjectiles; i++) {
            this.projectiles.push(new Projectile());
        }

        // Active weapons dictionary { weaponId: { level, cooldownTimer, ... } }
        this.weapons = {};

        // Orbital blades state
        this.orbitalAngle = 0;
    }

    reset() {
        this.weapons = {};
        this.singularities = [];
        for (let p of this.projectiles) {
            p.active = false;
        }
    }

    addWeapon(type) {
        if (!this.weapons[type]) {
            this.weapons[type] = {
                level: 1,
                timer: 0
            };
        } else {
            this.weapons[type].level++;
        }
    }

    getWeaponLevel(type) {
        return this.weapons[type] ? this.weapons[type].level : 0;
    }

    getAvailableProjectile() {
        for (let p of this.projectiles) {
            if (!p.active) return p;
        }
        return null;
    }

    update(dt, enemies, aimX, aimY, isFiring = true) {
        // Update Orbital Angle
        this.orbitalAngle += dt * 3.5;

        // 1. Process Weapons firing
        for (let type in this.weapons) {
            const w = this.weapons[type];
            w.timer -= dt;

            // Orbital blades are always spinning around the ship
            if (type === WEAPON_TYPES.ORBITAL_BLADES) {
                this.updateOrbitalCollisions(w, enemies);
                continue;
            }

            // Active weapons require the player to be actively firing!
            if (!isFiring) continue;

            switch (type) {
                case WEAPON_TYPES.BLASTER:
                    this.updateBlaster(w, aimX, aimY);
                    break;
                case WEAPON_TYPES.HOMING_MISSILES:
                    this.updateMissiles(w, enemies);
                    break;
                case WEAPON_TYPES.TESLA_ARC:
                    this.updateTesla(w, enemies);
                    break;
                case WEAPON_TYPES.SINGULARITY:
                    this.updateSingularity(w, enemies);
                    break;
            }
        }

        // 2. Update active projectiles
        for (let p of this.projectiles) {
            if (p.active) {
                p.update(dt, enemies);
            }
        }

        // 3. Update Singularities
        for (let i = this.singularities.length - 1; i >= 0; i--) {
            const s = this.singularities[i];
            s.update(dt, enemies);
            if (!s.active) {
                this.singularities.splice(i, 1);
            }
        }
    }

    // ==========================================
    // WEAPON IMPLEMENTATIONS
    // ==========================================

    // 1. Plasma Blaster
    updateBlaster(w, aimX, aimY) {
        const fireRate = Math.max(0.08, 0.28 - (w.level * 0.035) - (this.player.bonusFireRate || 0));
        if (w.timer <= 0) {
            w.timer = fireRate;

            let angle = Math.atan2(aimY - this.player.y, aimX - this.player.x);
            if (isNaN(angle)) angle = 0;

            const projectileCount = Math.min(7, 1 + Math.floor(w.level / 2));
            const spreadAngle = 0.12;
            const baseDamage = (18 + w.level * 8) * (this.player.bonusDamageMult || 1);
            const speed = 12;

            for (let i = 0; i < projectileCount; i++) {
                const p = this.getAvailableProjectile();
                if (!p) break;

                const offsetIndex = i - (projectileCount - 1) / 2;
                const fireAngle = angle + offsetIndex * spreadAngle;
                const vx = Math.cos(fireAngle) * speed;
                const vy = Math.sin(fireAngle) * speed;

                p.init(this.player.x, this.player.y, vx, vy, baseDamage, {
                    type: 'blaster',
                    radius: 4 + Math.min(4, w.level),
                    color: '#00f3ff',
                    pierce: 1 + Math.floor(w.level / 3),
                    life: 1.4
                });
            }

            window.audioEngine.playLaser('plasma');
        }
    }

    // 2. Homing Void Missiles
    updateMissiles(w, enemies) {
        const fireRate = Math.max(0.6, 1.8 - w.level * 0.2);
        if (w.timer <= 0) {
            w.timer = fireRate;
            const count = Math.min(6, 1 + w.level);
            const baseDamage = (35 + w.level * 15) * (this.player.bonusDamageMult || 1);

            for (let i = 0; i < count; i++) {
                const p = this.getAvailableProjectile();
                if (!p) break;

                const angle = (Math.PI * 2 / count) * i + Math.random() * 0.2;
                const speed = 7;
                p.init(this.player.x, this.player.y, Math.cos(angle) * speed, Math.sin(angle) * speed, baseDamage, {
                    type: 'missile',
                    radius: 5,
                    color: '#ff0055',
                    isHoming: true,
                    homingTurnSpeed: 0.12 + w.level * 0.02,
                    isExplosive: true,
                    explosionRadius: 40 + w.level * 10,
                    life: 2.8
                });
            }

            window.audioEngine.playLaser('missile');
        }
    }

    // 3. Tesla Lightning Arc
    updateTesla(w, enemies) {
        const fireRate = Math.max(0.4, 1.4 - w.level * 0.15);
        if (w.timer <= 0) {
            w.timer = fireRate;

            // Find closest enemy within radius
            let closest = null;
            let minDist = 320;
            for (let e of enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.player.x, e.y - this.player.y);
                if (d < minDist) {
                    minDist = d;
                    closest = e;
                }
            }

            if (closest) {
                const damage = (30 + w.level * 14) * (this.player.bonusDamageMult || 1);
                const maxChains = 2 + w.level;
                this.chainLightning(this.player.x, this.player.y, closest, damage, maxChains, enemies, []);
                window.audioEngine.playLaser('normal');
            }
        }
    }

    chainLightning(startX, startY, currentTarget, damage, chainsLeft, allEnemies, visited) {
        if (!currentTarget || chainsLeft <= 0) return;
        visited.push(currentTarget);
        currentTarget.takeDamage(damage, false);

        // Visual electric spark trail
        window.particleSystem.spawnSpark(currentTarget.x, currentTarget.y, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, '#ffe600', 4, 0.3);

        if (chainsLeft > 1) {
            let nextTarget = null;
            let minDist = 180;
            for (let e of allEnemies) {
                if (!e.active || visited.includes(e)) continue;
                const d = Math.hypot(e.x - currentTarget.x, e.y - currentTarget.y);
                if (d < minDist) {
                    minDist = d;
                    nextTarget = e;
                }
            }
            if (nextTarget) {
                this.chainLightning(currentTarget.x, currentTarget.y, nextTarget, damage * 0.85, chainsLeft - 1, allEnemies, visited);
            }
        }
    }

    // 4. Singularity Vortex
    updateSingularity(w, enemies) {
        const fireRate = Math.max(3.0, 7.0 - w.level * 0.8);
        if (w.timer <= 0) {
            w.timer = fireRate;
            // Spawn at random nearby position near enemies
            let targetX = this.player.x + (Math.random() * 300 - 150);
            let targetY = this.player.y + (Math.random() * 300 - 150);

            // If enemies exist, target a dense group
            if (enemies.length > 0) {
                const randEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                if (randEnemy && randEnemy.active) {
                    targetX = randEnemy.x;
                    targetY = randEnemy.y;
                }
            }

            const duration = 3.5 + w.level * 0.5;
            const radius = 120 + w.level * 20;
            const dps = (25 + w.level * 15) * (this.player.bonusDamageMult || 1);

            this.singularities.push(new Singularity(targetX, targetY, duration, radius, dps));
        }
    }

    // 5. Orbital Blades Collision
    updateOrbitalCollisions(w, enemies) {
        const bladeCount = 1 + w.level;
        const orbitRadius = 75 + Math.min(50, w.level * 8);
        const bladeRadius = 14;
        const bladeDamage = (20 + w.level * 9) * (this.player.bonusDamageMult || 1);

        for (let i = 0; i < bladeCount; i++) {
            const angle = this.orbitalAngle + (Math.PI * 2 / bladeCount) * i;
            const bx = this.player.x + Math.cos(angle) * orbitRadius;
            const by = this.player.y + Math.sin(angle) * orbitRadius;

            // Check collision with enemies
            for (let e of enemies) {
                if (!e.active) continue;
                const dist = Math.hypot(e.x - bx, e.y - by);
                if (dist < bladeRadius + e.radius) {
                    e.takeDamage(bladeDamage * 0.05, false); // continuous contact damage
                    if (Math.random() < 0.25) {
                        window.particleSystem.spawnSpark(bx, by, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, '#00ff66', 3, 0.2);
                    }
                }
            }
        }
    }

    render(ctx) {
        // Render Singularities
        for (let s of this.singularities) {
            s.render(ctx);
        }

        // Render Projectiles
        for (let p of this.projectiles) {
            p.render(ctx);
        }

        // Render Orbital Blades
        if (this.weapons[WEAPON_TYPES.ORBITAL_BLADES]) {
            const w = this.weapons[WEAPON_TYPES.ORBITAL_BLADES];
            const bladeCount = 1 + w.level;
            const orbitRadius = 75 + Math.min(50, w.level * 8);

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.shadowColor = '#00ff66';
            ctx.shadowBlur = 12;

            for (let i = 0; i < bladeCount; i++) {
                const angle = this.orbitalAngle + (Math.PI * 2 / bladeCount) * i;
                const bx = this.player.x + Math.cos(angle) * orbitRadius;
                const by = this.player.y + Math.sin(angle) * orbitRadius;

                // Draw spinning energy sawblade
                ctx.save();
                ctx.translate(bx, by);
                ctx.rotate(this.orbitalAngle * 3);

                ctx.fillStyle = '#00ff66';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();

                // Saw teeth
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                for (let t = 0; t < 4; t++) {
                    ctx.rotate(Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(10, 0);
                    ctx.lineTo(16, 4);
                    ctx.lineTo(8, 8);
                    ctx.stroke();
                }

                ctx.restore();
            }

            // Draw faint orbital ring
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, orbitRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        }
    }
}

window.WEAPON_TYPES = WEAPON_TYPES;
window.WeaponManager = WeaponManager;
