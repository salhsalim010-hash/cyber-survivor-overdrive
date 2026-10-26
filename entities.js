/* =========================================================
   ENTITIES SYSTEM: Player, Enemies, Bosses, and Pickups
   State of the Art AI Behaviors & Visual Polish
   ========================================================= */

// =========================================================
// PLAYER SHIP
// =========================================================
class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.radius = 18;

        // Stats
        this.maxHp = 100;
        this.hp = 100;
        this.baseSpeed = 5.2;
        this.speed = 5.2;
        this.armor = 0;
        this.magnetRadius = 140;

        // Dash Ability
        this.dashCooldown = 2.5;
        this.dashTimer = 0;
        this.isDashing = false;
        this.dashDuration = 0.22;
        this.dashTimeLeft = 0;
        this.dashSpeedMult = 3.2;

        // Ultimate Overdrive
        this.ultMaxCharge = 100;
        this.ultCharge = 0;
        this.isUltReady = false;

        // Ship Class ('vanguard', 'phantom', 'colossus')
        this.shipClass = 'vanguard';

        // Roguelike Stat Multipliers
        this.bonusDamageMult = 1.0;
        this.bonusFireRate = 0.0;
        this.bonusSpeedMult = 1.0;
        this.bonusCritChance = 0.05;
        this.hpRegenPerSec = 0;

        this.regenTimer = 0;
    }

    init(shipClass = 'vanguard') {
        this.shipClass = shipClass;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.isDashing = false;
        this.dashTimer = 0;
        this.ultCharge = 0;
        this.regenTimer = 0;

        if (shipClass === 'phantom') {
            this.maxHp = 80;
            this.baseSpeed = 6.4;
            this.dashCooldown = 1.6;
            this.armor = 0;
        } else if (shipClass === 'colossus') {
            this.maxHp = 160;
            this.baseSpeed = 4.2;
            this.dashCooldown = 3.2;
            this.armor = 3;
        } else {
            // Vanguard (balanced)
            this.maxHp = 100;
            this.baseSpeed = 5.2;
            this.dashCooldown = 2.4;
            this.armor = 1;
        }

        this.hp = this.maxHp;
    }

    dash() {
        if (this.dashTimer > 0 || this.isDashing) return false;
        this.isDashing = true;
        this.dashTimeLeft = this.dashDuration;
        this.dashTimer = this.dashCooldown;

        window.audioEngine.playDash();
        window.particleSystem.addScreenshake(4, 0.15);

        // Burst shockwave
        window.particleSystem.spawnShockwave(this.x, this.y, '#00f3ff', 60, 0.25);
        return true;
    }

    triggerUltimate(enemies) {
        if (this.ultCharge < this.ultMaxCharge) return false;
        this.ultCharge = 0;

        window.audioEngine.playUltimate();
        window.particleSystem.addScreenshake(18, 0.5);
        window.particleSystem.triggerScreenFlash('#00f3ff', 0.6);

        if (this.shipClass === 'phantom') {
            // Time Warp Slowdown & Void Blades
            window.particleSystem.spawnShockwave(this.x, this.y, '#9d00ff', 240, 0.6);
            for (let e of enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < 350) {
                    e.takeDamage(120 * this.bonusDamageMult, true);
                    e.slowTimer = 4.0; // slowed
                }
            }
        } else if (this.shipClass === 'colossus') {
            // Magnetic Supernova: Clears screen bullets and crushes nearby foes
            window.particleSystem.spawnShockwave(this.x, this.y, '#ff0055', 300, 0.6);
            for (let e of enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < 450) {
                    e.takeDamage(160 * this.bonusDamageMult, true);
                }
            }
        } else {
            // Vanguard: EMP Shockwave
            window.particleSystem.spawnShockwave(this.x, this.y, '#00f3ff', 350, 0.5);
            for (let e of enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < 400) {
                    e.takeDamage(140 * this.bonusDamageMult, true);
                }
            }
        }
        return true;
    }

    takeDamage(amount) {
        if (this.isDashing) return; // Invulnerability frames during dash!

        const actualDamage = Math.max(1, amount - this.armor);
        this.hp -= actualDamage;

        window.audioEngine.playExplosion(0.8);
        window.particleSystem.addScreenshake(7, 0.2);
        window.particleSystem.triggerScreenFlash('#ff0033', 0.35);
        window.particleSystem.spawnDamageNumber(this.x, this.y, actualDamage, false, true);

        if (this.hp < 0) this.hp = 0;
    }

    addCharge(amount) {
        this.ultCharge = Math.min(this.ultMaxCharge, this.ultCharge + amount);
    }

    update(dt, inputVector, aimX, aimY) {
        // Cooldowns
        if (this.dashTimer > 0) this.dashTimer -= dt;

        // Dash update
        if (this.isDashing) {
            this.dashTimeLeft -= dt;
            if (this.dashTimeLeft <= 0) {
                this.isDashing = false;
            }
            // Emit trail particles during dash
            window.particleSystem.spawnTrail(this.x, this.y, '#00f3ff', 6);
        }

        // Regen
        if (this.hpRegenPerSec > 0 && this.hp < this.maxHp) {
            this.regenTimer += dt;
            if (this.regenTimer >= 1.0) {
                this.regenTimer = 0;
                this.hp = Math.min(this.maxHp, this.hp + this.hpRegenPerSec);
            }
        }

        // Movement Physics
        const currentSpeed = (this.baseSpeed * this.bonusSpeedMult) * (this.isDashing ? this.dashSpeedMult : 1);
        const targetVx = inputVector.x * currentSpeed;
        const targetVy = inputVector.y * currentSpeed;

        this.vx += (targetVx - this.vx) * 0.25;
        this.vy += (targetVy - this.vy) * 0.25;

        this.x += this.vx * 60 * dt;
        this.y += this.vy * 60 * dt;

        // Rotation towards aim
        this.angle = Math.atan2(aimY - this.y, aimX - this.x);

        // Engine thruster sparks behind ship
        if (Math.hypot(this.vx, this.vy) > 0.5) {
            const backAngle = this.angle + Math.PI;
            const flareX = this.x + Math.cos(backAngle) * 16;
            const flareY = this.y + Math.sin(backAngle) * 16;
            const flareColor = this.shipClass === 'phantom' ? '#9d00ff' : (this.shipClass === 'colossus' ? '#ff0055' : '#00f3ff');
            window.particleSystem.spawnTrail(flareX, flareY, flareColor, 3);
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Ship Glowing Shadow
        ctx.shadowColor = this.shipClass === 'phantom' ? '#9d00ff' : (this.shipClass === 'colossus' ? '#ff0055' : '#00f3ff');
        ctx.shadowBlur = this.isDashing ? 25 : 12;

        // Custom Ship Geometry based on Class
        if (this.shipClass === 'phantom') {
            // Sleek Arrow Delta Wing
            ctx.fillStyle = '#0a1020';
            ctx.strokeStyle = '#9d00ff';
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.moveTo(22, 0);
            ctx.lineTo(-14, -16);
            ctx.lineTo(-8, 0);
            ctx.lineTo(-14, 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Cockpit neon
            ctx.fillStyle = '#00f3ff';
            ctx.beginPath();
            ctx.ellipse(2, 0, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shipClass === 'colossus') {
            // Heavy Battle Cruiser
            ctx.fillStyle = '#140c18';
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(18, -10);
            ctx.lineTo(24, 0);
            ctx.lineTo(18, 10);
            ctx.lineTo(-12, 18);
            ctx.lineTo(-18, 8);
            ctx.lineTo(-18, -8);
            ctx.lineTo(-12, -18);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Cockpit core
            ctx.fillStyle = '#ffe600';
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Vanguard Fighter
            ctx.fillStyle = '#071224';
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.moveTo(22, 0);
            ctx.lineTo(-12, -14);
            ctx.lineTo(-6, -6);
            ctx.lineTo(-14, 0);
            ctx.lineTo(-6, 6);
            ctx.lineTo(-12, 14);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Dual wing blasters
            ctx.fillStyle = '#00f3ff';
            ctx.fillRect(0, -12, 10, 2);
            ctx.fillRect(0, 10, 10, 2);

            // Glowing Cockpit
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(2, 0, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// =========================================================
// ENEMIES & BOSSES
// =========================================================
class Enemy {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.type = 'drone';
        this.radius = 12;
        this.maxHp = 20;
        this.hp = 20;
        this.speed = 2.5;
        this.damage = 10;
        this.scoreValue = 50;
        this.color = '#ff0055';
        this.isBoss = false;
        this.shootTimer = 0;
        this.chargeTimer = 0;
        this.slowTimer = 0;
        this.hitFlashTimer = 0;
    }

    init(x, y, type, waveMultiplier = 1) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
        this.isBoss = false;
        this.slowTimer = 0;
        this.hitFlashTimer = 0;

        switch (type) {
            case 'swarm':
                this.radius = 10;
                this.maxHp = 15 * waveMultiplier;
                this.speed = 3.6;
                this.damage = 8;
                this.scoreValue = 30;
                this.color = '#ff00aa';
                break;

            case 'bruiser':
                this.radius = 22;
                this.maxHp = 70 * waveMultiplier;
                this.speed = 1.8;
                this.damage = 22;
                this.scoreValue = 120;
                this.color = '#ff5500';
                break;

            case 'stalker':
                this.radius = 14;
                this.maxHp = 35 * waveMultiplier;
                this.speed = 4.0;
                this.damage = 15;
                this.scoreValue = 80;
                this.color = '#aa00ff';
                break;

            case 'sniper':
                this.radius = 16;
                this.maxHp = 40 * waveMultiplier;
                this.speed = 1.4;
                this.damage = 25;
                this.scoreValue = 150;
                this.color = '#ffe600';
                this.shootTimer = 2.0;
                break;

            case 'boss_hydra':
                this.radius = 48;
                this.maxHp = 1200 * waveMultiplier;
                this.speed = 1.6;
                this.damage = 30;
                this.scoreValue = 3000;
                this.color = '#ff0055';
                this.isBoss = true;
                this.shootTimer = 1.0;
                this.chargeTimer = 4.0;
                break;

            case 'boss_titan':
                this.radius = 64;
                this.maxHp = 2500 * waveMultiplier;
                this.speed = 1.2;
                this.damage = 45;
                this.scoreValue = 7000;
                this.color = '#ff0033';
                this.isBoss = true;
                this.shootTimer = 1.5;
                this.chargeTimer = 5.0;
                break;

            default: // drone
                this.radius = 14;
                this.maxHp = 25 * waveMultiplier;
                this.speed = 2.6;
                this.damage = 12;
                this.scoreValue = 50;
                this.color = '#ff0055';
                break;
        }

        this.hp = this.maxHp;
    }

    takeDamage(amount, isCrit = false) {
        if (!this.active) return;
        this.hp -= amount;
        this.hitFlashTimer = 0.1;

        window.particleSystem.spawnDamageNumber(this.x, this.y, amount, isCrit, false);
        window.audioEngine.playLaser('normal');

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.active = false;
        const explosionSize = this.isBoss ? 2.5 : (this.radius > 18 ? 1.4 : 0.9);
        window.audioEngine.playExplosion(explosionSize);
        window.particleSystem.spawnExplosion(this.x, this.y, this.color, this.isBoss ? 60 : 20, this.isBoss ? 8 : 4);

        if (this.isBoss) {
            window.particleSystem.addScreenshake(15, 0.4);
            window.particleSystem.triggerScreenFlash(this.color, 0.5);
        }
    }

    update(dt, player, projectilePool) {
        if (!this.active) return;

        if (this.hitFlashTimer > 0) this.hitFlashTimer -= dt;
        if (this.slowTimer > 0) this.slowTimer -= dt;

        const effectiveSpeed = this.speed * (this.slowTimer > 0 ? 0.45 : 1.0);

        // Direction to player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);
        this.angle = Math.atan2(dy, dx);

        // Movement behavior
        if (this.type === 'sniper') {
            // Keep medium distance from player
            if (dist > 320) {
                this.x += Math.cos(this.angle) * effectiveSpeed * 60 * dt;
                this.y += Math.sin(this.angle) * effectiveSpeed * 60 * dt;
            } else if (dist < 220) {
                this.x -= Math.cos(this.angle) * effectiveSpeed * 60 * dt;
                this.y -= Math.sin(this.angle) * effectiveSpeed * 60 * dt;
            }
            // Sniper shoot
            this.shootTimer -= dt;
            if (this.shootTimer <= 0) {
                this.shootTimer = 2.4;
                const p = projectilePool.getAvailableProjectile();
                if (p) {
                    const speed = 7;
                    p.init(this.x, this.y, Math.cos(this.angle) * speed, Math.sin(this.angle) * speed, this.damage, {
                        type: 'blaster',
                        color: '#ffe600',
                        radius: 5,
                        isEnemy: true,
                        life: 2.5
                    });
                }
            }
        } else if (this.isBoss) {
            // Boss AI
            this.x += Math.cos(this.angle) * effectiveSpeed * 60 * dt;
            this.y += Math.sin(this.angle) * effectiveSpeed * 60 * dt;

            // Attack patterns
            this.shootTimer -= dt;
            if (this.shootTimer <= 0) {
                this.shootTimer = this.type === 'boss_titan' ? 1.6 : 1.1;

                // Radial Spiral or Nova bullet pattern
                const bulletCount = this.type === 'boss_titan' ? 14 : 8;
                for (let i = 0; i < bulletCount; i++) {
                    const p = projectilePool.getAvailableProjectile();
                    if (!p) break;
                    const bAngle = this.angle + (Math.PI * 2 / bulletCount) * i;
                    const speed = 5.5;
                    p.init(this.x, this.y, Math.cos(bAngle) * speed, Math.sin(bAngle) * speed, 15, {
                        type: 'blaster',
                        color: '#ff0055',
                        radius: 6,
                        isEnemy: true,
                        life: 3.0
                    });
                }
                window.audioEngine.playLaser('plasma');
            }
        } else {
            // Standard pursuit
            this.x += Math.cos(this.angle) * effectiveSpeed * 60 * dt;
            this.y += Math.sin(this.angle) * effectiveSpeed * 60 * dt;
        }

        // Check collision with player
        if (dist < this.radius + player.radius) {
            player.takeDamage(this.damage * dt * 2.5);
        }
    }

    render(ctx) {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Flash white on hit
        const renderColor = this.hitFlashTimer > 0 ? '#ffffff' : this.color;
        ctx.shadowColor = renderColor;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = renderColor;
        ctx.fillStyle = '#0f0510';
        ctx.lineWidth = 2;

        if (this.isBoss) {
            // Huge mechanical boss frame
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Inner glowing reactor
            ctx.fillStyle = renderColor;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * 0.45, 0, Math.PI * 2);
            ctx.fill();

            // Weapon spires
            for (let i = 0; i < 4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.fillRect(this.radius * 0.7, -4, 18, 8);
            }
        } else if (this.type === 'bruiser') {
            // Heavy hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                const hx = Math.cos(a) * this.radius;
                const hy = Math.sin(a) * this.radius;
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.type === 'stalker') {
            // Sharp chevron
            ctx.beginPath();
            ctx.moveTo(this.radius * 1.4, 0);
            ctx.lineTo(-this.radius, -this.radius);
            ctx.lineTo(-this.radius * 0.4, 0);
            ctx.lineTo(-this.radius, this.radius);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Standard drone diamond
            ctx.beginPath();
            ctx.moveTo(this.radius * 1.3, 0);
            ctx.lineTo(0, -this.radius * 0.8);
            ctx.lineTo(-this.radius * 0.8, 0);
            ctx.lineTo(0, this.radius * 0.8);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }
}

// =========================================================
// PICKUPS & DROPS (XP Gems, Plasma, Health)
// =========================================================
class DropItem {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.type = 'xp'; // 'xp', 'plasma', 'health', 'magnet'
        this.value = 10;
        this.radius = 6;
        this.color = '#00f3ff';
        this.life = 60;
    }

    init(x, y, type = 'xp', value = 10) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.type = type;
        this.value = value;
        this.life = 60;

        switch (type) {
            case 'plasma':
                this.color = '#33aaff';
                this.radius = 7;
                break;
            case 'health':
                this.color = '#00ff66';
                this.radius = 9;
                break;
            case 'magnet':
                this.color = '#ffe600';
                this.radius = 10;
                break;
            default: // xp
                this.color = value > 25 ? '#ffe600' : '#00f3ff';
                this.radius = value > 25 ? 7 : 5;
                break;
        }
    }

    update(dt, player) {
        if (!this.active) return;
        this.life -= dt;
        if (this.life <= 0) {
            this.active = false;
            return;
        }

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        // Magnetic Attraction
        if (dist < player.magnetRadius) {
            const pullSpeed = Math.min(16, (player.magnetRadius / Math.max(10, dist)) * 8);
            this.x += (dx / dist) * pullSpeed * 60 * dt;
            this.y += (dy / dist) * pullSpeed * 60 * dt;
        }

        // Pickup collision
        if (dist < this.radius + player.radius) {
            this.active = false;
            this.onPickup(player);
        }
    }

    onPickup(player) {
        window.audioEngine.playGem();
        if (this.type === 'xp') {
            window.gameInstance.addExperience(this.value);
            player.addCharge(this.value * 0.4);
        } else if (this.type === 'plasma') {
            window.gameInstance.addPlasma(this.value);
        } else if (this.type === 'health') {
            player.hp = Math.min(player.maxHp, player.hp + this.value);
            window.particleSystem.spawnDamageNumber(player.x, player.y, `+${this.value}`, true, false);
        } else if (this.type === 'magnet') {
            window.gameInstance.pullAllDrops();
        }
    }

    render(ctx) {
        if (!this.active) return;
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        if (this.type === 'health') {
            // Draw glowing plus
            ctx.fillRect(this.x - 2, this.y - 7, 4, 14);
            ctx.fillRect(this.x - 7, this.y - 2, 14, 4);
        } else {
            // Draw glowing diamond
            ctx.moveTo(this.x, this.y - this.radius);
            ctx.lineTo(this.x + this.radius, this.y);
            ctx.lineTo(this.x, this.y + this.radius);
            ctx.lineTo(this.x - this.radius, this.y);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

window.Player = Player;
window.Enemy = Enemy;
window.DropItem = DropItem;
