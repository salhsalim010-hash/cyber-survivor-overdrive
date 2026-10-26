/* =========================================================
   3D WEAPONS & PROJECTILES SYSTEM
   Laser Tracers, Homing Torpedoes, & 3D Volumetric Explosions
   ========================================================= */

class LaserBolt3D {
    constructor(scene) {
        this.scene = scene;
        this.active = false;
        this.damage = 25;
        this.speed = 420;
        this.life = 1.6;

        // 3D Laser Mesh (Glowing stretched cylinder)
        const geo = new THREE.CylinderGeometry(0.6, 0.6, 12, 8);
        geo.rotateX(Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.visible = false;
        this.scene.add(this.mesh);
    }

    spawn(x, y, z, targetZSpeed) {
        this.active = true;
        this.life = 1.6;
        this.mesh.position.set(x, y, z);
        this.speed = targetZSpeed + 450;
        this.mesh.visible = true;
    }

    update(dt) {
        if (!this.active) return;
        this.life -= dt;
        if (this.life <= 0) {
            this.deactivate();
            return;
        }
        // Travel forward along -Z axis
        this.mesh.position.z -= this.speed * dt;
    }

    deactivate() {
        this.active = false;
        this.mesh.visible = false;
    }
}

class HomingMissile3D {
    constructor(scene) {
        this.scene = scene;
        this.active = false;
        this.target = null;
        this.damage = 120;
        this.speed = 320;
        this.life = 3.2;

        // Missile 3D Mesh
        const group = new THREE.Group();
        const bodyGeo = new THREE.CylinderGeometry(1.0, 1.2, 8, 8);
        bodyGeo.rotateX(Math.PI / 2);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x22222a, metalness: 0.8, roughness: 0.3 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        // Glowing Warhead Nosecone
        const noseGeo = new THREE.ConeGeometry(1.1, 3.5, 8);
        noseGeo.rotateX(-Math.PI / 2);
        const noseMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const nose = new THREE.Mesh(noseGeo, noseMat);
        nose.position.z = -5;
        group.add(nose);

        this.mesh = group;
        this.mesh.visible = false;
        this.scene.add(this.mesh);
    }

    spawn(x, y, z, target) {
        this.active = true;
        this.target = target;
        this.life = 3.2;
        this.mesh.position.set(x, y, z);
        this.mesh.rotation.set(0, 0, 0);
        this.mesh.visible = true;
    }

    update(dt) {
        if (!this.active) return;
        this.life -= dt;
        if (this.life <= 0) {
            this.explode();
            return;
        }

        // Homing turn towards target if target is alive
        if (this.target && this.target.active) {
            const targetPos = this.target.mesh.position;
            const dx = targetPos.x - this.mesh.position.x;
            const dy = targetPos.y - this.mesh.position.y;
            const dz = targetPos.z - this.mesh.position.z;

            // Smooth turn
            this.mesh.position.x += Math.sign(dx) * Math.min(Math.abs(dx), 90 * dt);
            this.mesh.position.y += Math.sign(dy) * Math.min(Math.abs(dy), 90 * dt);
        }

        this.mesh.position.z -= this.speed * dt;
    }

    explode() {
        this.active = false;
        this.mesh.visible = false;
        window.flightAudio.playExplosion(1.5);
    }
}

class WeaponSystem3D {
    constructor(scene) {
        this.scene = scene;
        this.lasers = [];
        this.missiles = [];

        // Pool sizes
        for (let i = 0; i < 40; i++) this.lasers.push(new LaserBolt3D(scene));
        for (let i = 0; i < 12; i++) this.missiles.push(new HomingMissile3D(scene));

        this.laserCooldown = 0.12;
        this.laserTimer = 0;
        this.missileCooldown = 1.2;
        this.missileTimer = 0;
        this.missileCount = 4;
        this.maxMissiles = 4;
        this.missileReloadTimer = 0;
        this.alternateWing = false;
    }

    fireLaser(playerPos, currentSpeed) {
        if (this.laserTimer > 0) return;
        this.laserTimer = this.laserCooldown;

        const bolt = this.lasers.find(l => !l.active);
        if (bolt) {
            this.alternateWing = !this.alternateWing;
            const wingOffset = this.alternateWing ? -7 : 7;
            bolt.spawn(playerPos.x + wingOffset, playerPos.y - 1.2, playerPos.z - 8, currentSpeed);
            window.flightAudio.playLaser(this.alternateWing);
        }
    }

    fireMissile(playerPos, target) {
        if (this.missileTimer > 0 || this.missileCount <= 0) return false;
        this.missileTimer = this.missileCooldown;
        this.missileCount--;

        const m = this.missiles.find(mis => !mis.active);
        if (m) {
            m.spawn(playerPos.x, playerPos.y - 2, playerPos.z - 6, target);
            window.flightAudio.playMissileLaunch();
            return true;
        }
        return false;
    }

    update(dt, enemies) {
        if (this.laserTimer > 0) this.laserTimer -= dt;
        if (this.missileTimer > 0) this.missileTimer -= dt;

        // Missile ammo auto-recharge
        if (this.missileCount < this.maxMissiles) {
            this.missileReloadTimer += dt;
            if (this.missileReloadTimer >= 3.5) {
                this.missileReloadTimer = 0;
                this.missileCount++;
            }
        }

        // Update active lasers
        for (let bolt of this.lasers) {
            if (bolt.active) {
                bolt.update(dt);
                // Check hit against enemies
                for (let e of enemies) {
                    if (!e.active) continue;
                    const dist = bolt.mesh.position.distanceTo(e.mesh.position);
                    if (dist < e.radius + 3) {
                        e.takeDamage(bolt.damage);
                        bolt.deactivate();
                        break;
                    }
                }
            }
        }

        // Update active missiles
        for (let m of this.missiles) {
            if (m.active) {
                m.update(dt);
                for (let e of enemies) {
                    if (!e.active) continue;
                    const dist = m.mesh.position.distanceTo(e.mesh.position);
                    if (dist < e.radius + 5) {
                        e.takeDamage(m.damage);
                        m.explode();
                        break;
                    }
                }
            }
        }
    }
}

window.WeaponSystem3D = WeaponSystem3D;
