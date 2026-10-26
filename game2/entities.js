/* =========================================================
   3D ENTITIES: Player Fighter Jet, Enemy Drones, & Boss Mothership
   Detailed Procedural Three.js Geometries & AI
   ========================================================= */

// =========================================================
// PLAYER FIGHTER JET (3D MESH & PHYSICS)
// =========================================================
class PlayerJet3D {
    constructor(scene) {
        this.scene = scene;
        this.mesh = this.buildJetMesh();
        this.scene.add(this.mesh);

        // Flight Physics State
        this.position = this.mesh.position;
        this.rotation = this.mesh.rotation;
        this.velocity = new THREE.Vector3();

        this.baseSpeed = 160;
        this.speed = 160;
        this.boostSpeed = 290;
        this.isBoosting = false;

        this.boostEnergy = 100;
        this.maxBoostEnergy = 100;
        
        // Defensive Shields & Hull
        this.maxHp = 100;
        this.hp = 100;
        this.maxShield = 100;
        this.shield = 100;
        this.invulnerableTimer = 0;
        this.shieldRegenDelay = 0;

        // Roll & Banking angles
        this.bankAngle = 0;
        this.pitchAngle = 0;
        this.barrelRollTimer = 0;
        this.isBarrelRolling = false;
        this.rollDirection = 1;

        // Bounding Radius
        this.radius = 4.5;
    }

    buildJetMesh() {
        const jetGroup = new THREE.Group();

        // 1. Sleek Fuselage
        const bodyGeo = new THREE.ConeGeometry(2.4, 20, 8);
        bodyGeo.rotateX(-Math.PI / 2);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: 0x111628,
            metalness: 0.85,
            roughness: 0.2
        });
        const fuselage = new THREE.Mesh(bodyGeo, bodyMat);
        jetGroup.add(fuselage);

        // 2. Cockpit Canopy (Glowing Cyan Visor)
        const cockpitGeo = new THREE.SphereGeometry(1.6, 12, 8);
        cockpitGeo.scale(0.8, 0.7, 2.2);
        const cockpitMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
        cockpit.position.set(0, 1.2, -1);
        jetGroup.add(cockpit);

        // 3. Delta Wings with glowing neon borders
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 4);
        wingShape.lineTo(-12, -4);
        wingShape.lineTo(-9, -7);
        wingShape.lineTo(0, -5);
        wingShape.lineTo(9, -7);
        wingShape.lineTo(12, -4);
        wingShape.closePath();

        const extrudeSettings = { depth: 0.6, bevelEnabled: false };
        const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
        wingGeo.rotateX(Math.PI / 2);
        const wingMat = new THREE.MeshStandardMaterial({
            color: 0x182038,
            metalness: 0.9,
            roughness: 0.15
        });
        const wings = new THREE.Mesh(wingGeo, wingMat);
        wings.position.set(0, 0, 1);
        jetGroup.add(wings);

        // Wingtip Neon Beacons
        const beaconGeo = new THREE.BoxGeometry(0.8, 0.4, 3);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        const leftBeacon = new THREE.Mesh(beaconGeo, beaconMat);
        leftBeacon.position.set(-11, 0, 0);
        const rightBeacon = new THREE.Mesh(beaconGeo, beaconMat);
        rightBeacon.position.set(11, 0, 0);
        jetGroup.add(leftBeacon);
        jetGroup.add(rightBeacon);

        // 4. Twin Vertical Stabilizer Fins
        const finGeo = new THREE.BoxGeometry(0.3, 3.5, 4);
        finGeo.rotateX(-0.3);
        const finMat = new THREE.MeshStandardMaterial({ color: 0x111628 });
        const leftFin = new THREE.Mesh(finGeo, finMat);
        leftFin.position.set(-2.5, 2.0, 5);
        leftFin.rotation.z = -0.25;
        const rightFin = new THREE.Mesh(finGeo, finMat);
        rightFin.position.set(2.5, 2.0, 5);
        rightFin.rotation.z = 0.25;
        jetGroup.add(leftFin);
        jetGroup.add(rightFin);

        // 5. Dual Afterburner Thrusters
        this.thrusters = [];
        const thrusterGeo = new THREE.CylinderGeometry(0.9, 0.7, 3.5, 8);
        thrusterGeo.rotateX(Math.PI / 2);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });

        [-1.6, 1.6].forEach(xOffset => {
            const t = new THREE.Mesh(thrusterGeo, flameMat);
            t.position.set(xOffset, 0, 8.5);
            jetGroup.add(t);
            this.thrusters.push(t);
        });

        // 6. Energy Shield Wireframe Sphere (Flashes when hit/invulnerable)
        const shieldGeo = new THREE.SphereGeometry(14, 16, 12);
        const shieldMat = new THREE.MeshBasicMaterial({
            color: 0x00f3ff,
            wireframe: true,
            transparent: true,
            opacity: 0.0
        });
        this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        jetGroup.add(this.shieldMesh);

        return jetGroup;
    }

    startBarrelRoll(dir = 1) {
        if (this.isBarrelRolling) return;
        this.isBarrelRolling = true;
        this.rollDirection = dir;
        this.barrelRollTimer = 0.45;
        this.invulnerableTimer = 0.55; // Invulnerable while rolling!
        window.flightAudio.playSonicBoom();
    }

    update(dt, inputVector, wantsBoost) {
        // Invulnerability & Shield Pulse
        if (this.invulnerableTimer > 0) {
            this.invulnerableTimer -= dt;
            this.shieldMesh.material.opacity = Math.sin(performance.now() * 0.025) * 0.35 + 0.35;
        } else {
            this.shieldMesh.material.opacity = 0.0;
        }

        // Shield Auto Regeneration
        if (this.shieldRegenDelay > 0) {
            this.shieldRegenDelay -= dt;
        } else if (this.shield < this.maxShield) {
            this.shield = Math.min(this.maxShield, this.shield + dt * 25);
        }

        // Boost Engine Logic
        if (wantsBoost && this.boostEnergy > 0) {
            this.isBoosting = true;
            this.speed = THREE.MathUtils.lerp(this.speed, this.boostSpeed, 0.1);
            this.boostEnergy = Math.max(0, this.boostEnergy - dt * 28);
        } else {
            this.isBoosting = false;
            this.speed = THREE.MathUtils.lerp(this.speed, this.baseSpeed, 0.08);
            // Slow passive boost recharge
            this.boostEnergy = Math.min(this.maxBoostEnergy, this.boostEnergy + dt * 8);
        }

        // Forward flight movement along -Z
        this.position.z -= this.speed * dt;

        // Horizontal & Vertical maneuvering with generous corridor boundaries
        const moveSpeed = 100;
        this.position.x += inputVector.x * moveSpeed * dt;
        this.position.y += inputVector.y * moveSpeed * dt;

        // Clamping inside city corridor (safe from outer skyscraper line)
        this.position.x = THREE.MathUtils.clamp(this.position.x, -75, 75);
        this.position.y = THREE.MathUtils.clamp(this.position.y, -36, 56);

        // Barrel Roll Animation
        if (this.isBarrelRolling) {
            this.barrelRollTimer -= dt;
            const rollSpeed = (Math.PI * 2 / 0.45) * this.rollDirection;
            this.rotation.z += rollSpeed * dt;
            if (this.barrelRollTimer <= 0) {
                this.isBarrelRolling = false;
                this.rotation.z = 0;
            }
        } else {
            // Smooth banking tilt based on turning
            const targetBank = -inputVector.x * 0.75;
            const targetPitch = inputVector.y * 0.35;
            this.bankAngle = THREE.MathUtils.lerp(this.bankAngle, targetBank, 0.15);
            this.pitchAngle = THREE.MathUtils.lerp(this.pitchAngle, targetPitch, 0.15);

            this.rotation.z = this.bankAngle;
            this.rotation.x = this.pitchAngle;
        }

        // Pulse afterburner flames
        const flameScale = this.isBoosting ? (1.5 + Math.random() * 0.4) : (0.9 + Math.random() * 0.2);
        this.thrusters.forEach(t => {
            t.scale.set(1, 1, flameScale);
            t.material.color.setHex(this.isBoosting ? 0xffe600 : 0x00f3ff);
        });

        // Update jet engine sound
        const speedRatio = (this.speed - this.baseSpeed) / (this.boostSpeed - this.baseSpeed);
        window.flightAudio.updateEngineSound(speedRatio, this.isBoosting);
    }

    takeDamage(amount, source = 'impact') {
        if (this.isBarrelRolling || this.invulnerableTimer > 0) {
            return { damaged: false };
        }

        this.invulnerableTimer = 1.2; // 1.2 seconds of invulnerability
        this.shieldRegenDelay = 3.0;  // 3s delay before shield starts recharging

        let remaining = amount;
        if (this.shield > 0) {
            if (this.shield >= remaining) {
                this.shield -= remaining;
                remaining = 0;
            } else {
                remaining -= this.shield;
                this.shield = 0;
            }
        }

        if (remaining > 0) {
            this.hp = Math.max(0, this.hp - remaining);
        }

        window.flightAudio.playExplosion(1.1);
        return { damaged: true, fatal: this.hp <= 0, source };
    }

    repair(amount = 35) {
        this.shield = Math.min(this.maxShield, this.shield + amount);
        this.hp = Math.min(this.maxHp, this.hp + amount * 0.4);
    }

    reset() {
        this.position.set(0, 0, 0);
        this.rotation.set(0, 0, 0);
        this.hp = this.maxHp;
        this.shield = this.maxShield;
        this.invulnerableTimer = 0;
        this.shieldRegenDelay = 0;
        this.boostEnergy = this.maxBoostEnergy;
        this.speed = this.baseSpeed;
    }
}

// =========================================================
// ENEMY COMBAT DRONES & BOSS MOTHERSHIP
// =========================================================
class Enemy3D {
    constructor(scene, type = 'drone') {
        this.scene = scene;
        this.type = type;
        this.active = false;
        this.maxHp = type === 'boss' ? 1400 : 50;
        this.hp = this.maxHp;
        this.radius = type === 'boss' ? 35 : 4.5;
        this.scoreValue = type === 'boss' ? 8000 : 250;
        this.shootTimer = 0;

        this.mesh = this.buildMesh(type);
        this.mesh.visible = false;
        this.scene.add(this.mesh);
    }

    buildMesh(type) {
        if (type === 'boss') {
            // Massive Dreadnought Mothership
            const group = new THREE.Group();
            const mainBodyGeo = new THREE.BoxGeometry(45, 16, 80);
            const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a0510, metalness: 0.9, roughness: 0.3 });
            const body = new THREE.Mesh(mainBodyGeo, bodyMat);
            group.add(body);

            // Glowing Red Command Core
            const coreGeo = new THREE.SphereGeometry(8, 16, 16);
            const coreMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
            const core = new THREE.Mesh(coreGeo, coreMat);
            core.position.set(0, 6, 0);
            group.add(core);

            // Weapon wings
            const wingGeo = new THREE.BoxGeometry(70, 4, 30);
            const wing = new THREE.Mesh(wingGeo, bodyMat);
            wing.position.set(0, 0, -10);
            group.add(wing);

            return group;
        } else {
            // Agile Hunter Drone
            const group = new THREE.Group();
            const geo = new THREE.OctahedronGeometry(4, 0);
            const mat = new THREE.MeshStandardMaterial({ color: 0xff0055, metalness: 0.8, roughness: 0.2 });
            const drone = new THREE.Mesh(geo, mat);
            group.add(drone);

            // Eye scanner light
            const eyeGeo = new THREE.SphereGeometry(1.2, 8, 8);
            const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
            const eye = new THREE.Mesh(eyeGeo, eyeMat);
            eye.position.z = 3.5;
            group.add(eye);

            return group;
        }
    }

    spawn(x, y, z) {
        this.active = true;
        this.hp = this.maxHp;
        this.mesh.position.set(x, y, z);
        this.mesh.visible = true;
        this.shootTimer = 1.0;
    }

    takeDamage(amount) {
        if (!this.active) return;
        this.hp -= amount;
        window.flightAudio.playLaser(true);
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    destroy() {
        this.active = false;
        this.mesh.visible = false;
        window.flightAudio.playExplosion(this.type === 'boss' ? 3.0 : 1.2);
    }

    update(dt, playerZ) {
        if (!this.active) return;

        // Hover animation
        this.mesh.rotation.y += dt * 1.5;

        // Deactivate if far behind player
        if (this.mesh.position.z > playerZ + 60) {
            this.active = false;
            this.mesh.visible = false;
        }
    }
}

window.PlayerJet3D = PlayerJet3D;
window.Enemy3D = Enemy3D;
