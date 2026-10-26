/* =========================================================
   3D WORLD ENGINE: Procedural Cyberpunk Megacity & Flight Rings
   Endless Infinite Chunk Recycling in Three.js
   ========================================================= */

class World3D {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
        this.speedRings = [];
        this.obstacles = [];
        this.floatingParticles = null;

        // City generation parameters
        this.cityLength = 1600;
        this.chunkSize = 200;
        this.roadWidth = 200;

        // Shared Three.js Materials & Geometries for high performance
        this.initMaterials();
        this.createGroundGrid();
        this.createSkyscrapers();
        this.createAtmosphericDust();
    }

    initMaterials() {
        // Metallic building material with cyber glow
        this.matBuildingDark = new THREE.MeshStandardMaterial({
            color: 0x080e1c,
            roughness: 0.2,
            metalness: 0.8
        });

        this.matNeonCyan = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        this.matNeonMagenta = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        this.matNeonYellow = new THREE.MeshBasicMaterial({ color: 0xffe600 });

        // Quantum Ring Material
        this.matRing = new THREE.MeshBasicMaterial({
            color: 0x00f3ff,
            wireframe: false
        });
    }

    createGroundGrid() {
        // Infinite scrolling Cyber Highway Grid floor
        const gridHelper = new THREE.GridHelper(3000, 100, 0x00f3ff, 0x0a1630);
        gridHelper.position.y = -60;
        this.scene.add(gridHelper);
        this.gridFloor = gridHelper;

        // City Highway glow strips
        const roadGeo = new THREE.PlaneGeometry(this.roadWidth, 4000);
        const roadMat = new THREE.MeshBasicMaterial({
            color: 0x040814,
            side: THREE.DoubleSide
        });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = Math.PI / 2;
        road.position.y = -59.5;
        this.scene.add(road);
        this.roadPlane = road;
    }

    createSkyscrapers() {
        const buildingBox = new THREE.BoxGeometry(1, 1, 1);
        const countPerSide = 50;

        for (let i = 0; i < countPerSide * 2; i++) {
            const isLeft = i % 2 === 0;
            const side = isLeft ? -1 : 1;
            // Place skyscrapers with safe clearance from flight freeway
            const x = side * (this.roadWidth / 2 + 55 + Math.random() * 180);
            const z = -(i * 30) - 100;
            const w = 40 + Math.random() * 40;
            const d = 40 + Math.random() * 40;
            const h = 140 + Math.random() * 320;

            const bMesh = new THREE.Mesh(buildingBox, this.matBuildingDark);
            bMesh.scale.set(w, h, d);
            bMesh.position.set(x, h / 2 - 60, z);
            this.scene.add(bMesh);

            // Add glowing neon rooftop beacon or window strip
            const beaconGeo = new THREE.BoxGeometry(w * 0.9, 3, d * 0.9);
            const beaconMat = Math.random() > 0.5 ? this.matNeonCyan : this.matNeonMagenta;
            const beacon = new THREE.Mesh(beaconGeo, beaconMat);
            beacon.position.y = h / 2 + 1.5;
            bMesh.add(beacon);

            this.buildings.push({
                mesh: bMesh,
                originalX: x,
                height: h,
                width: w,
                depth: d
            });
        }

        // Spawn initial flight rings
        for (let r = 0; r < 8; r++) {
            this.spawnRing(-200 - r * 220);
        }
    }

    spawnRing(z) {
        const ringGeo = new THREE.TorusGeometry(22, 1.8, 12, 32);
        const ringMesh = new THREE.Mesh(ringGeo, this.matRing);
        const x = (Math.random() - 0.5) * (this.roadWidth * 0.65);
        const y = -20 + Math.random() * 60;
        ringMesh.position.set(x, y, z);
        this.scene.add(ringMesh);

        this.speedRings.push({
            mesh: ringMesh,
            x, y, z,
            radius: 22,
            collected: false
        });
    }

    createAtmosphericDust() {
        const particleCount = 600;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 600;
            positions[i * 3 + 1] = -40 + Math.random() * 200;
            positions[i * 3 + 2] = -Math.random() * 1200;

            const isCyan = Math.random() > 0.5;
            colors[i * 3] = isCyan ? 0.0 : 1.0;
            colors[i * 3 + 1] = isCyan ? 0.95 : 0.0;
            colors[i * 3 + 2] = isCyan ? 1.0 : 0.35;
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
            size: 2.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.floatingParticles = new THREE.Points(geom, mat);
        this.scene.add(this.floatingParticles);
    }

    update(dt, playerZ, flightSpeed) {
        // Move ground and road forward relative to player
        this.gridFloor.position.z = playerZ - 200;
        this.roadPlane.position.z = playerZ - 200;

        // Recycle buildings that pass behind camera
        for (let b of this.buildings) {
            if (b.mesh.position.z > playerZ + 120) {
                // Move far ahead
                b.mesh.position.z -= 3000;
                // Randomize height slightly for procedural variety
                const newH = 140 + Math.random() * 320;
                b.mesh.scale.y = newH;
                b.mesh.position.y = newH / 2 - 60;
            }
        }

        // Update Speed Rings (Rotate and recycle)
        for (let ring of this.speedRings) {
            ring.mesh.rotation.z += dt * 1.5;
            if (ring.mesh.position.z > playerZ + 80) {
                ring.mesh.position.z -= 1800;
                ring.mesh.position.x = (Math.random() - 0.5) * (this.roadWidth * 0.65);
                ring.mesh.position.y = -20 + Math.random() * 60;
                ring.mesh.visible = true;
                ring.collected = false;
            }
        }

        // Stream floating particles backward for supersonic feel
        if (this.floatingParticles) {
            const pos = this.floatingParticles.geometry.attributes.position.array;
            for (let i = 0; i < pos.length / 3; i++) {
                if (pos[i * 3 + 2] > playerZ + 100) {
                    pos[i * 3 + 2] = playerZ - 1000 - Math.random() * 200;
                }
            }
            this.floatingParticles.geometry.attributes.position.needsUpdate = true;
        }
    }

    checkRingCollisions(playerPos, onCollect) {
        for (let ring of this.speedRings) {
            if (ring.collected) continue;
            const distZ = Math.abs(ring.mesh.position.z - playerPos.z);
            if (distZ < 15) {
                const distXY = Math.hypot(ring.mesh.position.x - playerPos.x, ring.mesh.position.y - playerPos.y);
                if (distXY < ring.radius + 6) {
                    ring.collected = true;
                    ring.mesh.visible = false;
                    onCollect(ring);
                }
            }
        }
    }

    checkBuildingCollisions(playerPos, radius = 5.0) {
        for (let b of this.buildings) {
            // Check bounding box overlap with player
            const bx = b.mesh.position.x;
            const by = b.mesh.position.y;
            const bz = b.mesh.position.z;
            const hw = b.width / 2;
            const hh = b.height / 2;
            const hd = b.depth / 2;

            if (
                Math.abs(playerPos.x - bx) < hw + radius &&
                Math.abs(playerPos.y - by) < hh + radius &&
                Math.abs(playerPos.z - bz) < hd + radius
            ) {
                return { hit: true, pushX: Math.sign(-bx) * 22 }; // Bounce back toward center
            }
        }
        return null;
    }
}

window.World3D = World3D;
