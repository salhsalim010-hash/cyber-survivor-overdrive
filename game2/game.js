/* =========================================================
   CYBERWING 3D: QUANTUM STRIKE - MAIN CONTROLLER
   Full Three.js WebGL Loop, Dynamic Camera, HUD, & Combat
   ========================================================= */

// =========================================================
// LOCALIZATION (Arabic & English)
// =========================================================
const I18N = {
    ar: {
        score: 'النقاط',
        distance: 'المسافة',
        speed_mach: 'السرعة (MACH)',
        hull_integrity: 'درع الهيكل',
        shield_energy: 'درع الطاقة',
        twin_lasers: 'مدافع الليزر [L-CLICK]',
        missiles_label: 'صواريخ البلازما [R-CLICK / K]',
        boost_drive: 'شاحن الكوانتم',
        boost_hint: '[SPACE / SHIFT] للسرعة القصوى',
        menu_tagline: 'حلق بطائرتك النفاثة الأسرع من الصوت بين ناطحات السحاب النيون، وناور بصواريخ البلازما، وأسقط أسطول المذركرافت العملاق!',
        launch_sortie: 'بدء التحليق والقتال الآن',
        controls_manual: 'دليل التحكم',
        settings: 'الإعدادات',
        high_score: 'أعلى رقم قياسي:',
        mission_paused: 'المهمة متوقفة مؤقتاً',
        resume: 'متابعة الطيران',
        quit_to_menu: 'العودة للقاعدة',
        jet_destroyed: 'تحطمت المقاتلة النفاثة',
        final_score: 'النتيجة النهائية',
        distance_flown: 'المسافة المحققة',
        targets_destroyed: 'الأهداف المدمرة',
        rings_collected: 'بوابات السرعة',
        retry_flight: 'إعادة التحليق فوراً',
        back_to_hangar: 'المرآب الرئيسي',
        flight_manual: 'دليل المناورات الجوية 3D',
        maneuvering: 'المناورة والتوجيه',
        maneuver_desc: 'استخدم <b>WASD</b> أو حركة الماوس للتحليق والميلان الجانبي.<br>اضغط مرتين على <b>A</b> أو <b>D</b> لتنفيذ دوران برميلي <b>(Barrel Roll)</b> يراوغ طلقات العدو!',
        afterburner_title: 'التوربو النفاث الكوانتم',
        afterburner_desc: 'استمر بالضغط على <b>مسطرة المسافات (Space)</b> أو <b>Shift</b> للوصول لسرعة ماخ الخارقة مع تأثير تمدد خطوط السرعة.<br>اعبر من خلال <b>حلقات النيون الطافية</b> لإعادة ملء الشاحن.',
        combat_systems: 'أنظمة القتال والرماية',
        combat_desc: '<b>زر الماوس الأيسر</b>: إطلاق مدافع الليزر التوأم.<br><b>زر الماوس الأيمن أو مفتاح K</b>: إطلاق صواريخ البلازما الموجهة نحو الأهداف المقفلة.<br><b>مفتاح V</b>: تبديل زاوية الكاميرا (Chase / Cockpit).',
        ready_to_fly: 'مستعد للإقلاع!',
        role_balanced: 'متوازنة وسريعة',
        role_speed: 'سرعة ومراوغة خارقة',
        role_armor: 'دروع ثقيلة وصواريخ مزدوجة',
        flight_stick: 'توجيه الطائرة',
        btn_boost: 'توربو',
        btn_roll: 'مراوغة',
        btn_missile: 'صاروخ',
        btn_fire: 'إطلاق',
        btn_autofire: 'إطلاق آلي',
        rotate_device: 'يرجى تدوير الهاتف بالعرض',
        rotate_desc: 'لتجربة قيادة ومناورات جوية 3D فائقة الدقة والسلاسة',
        cause_building: 'سبب التحطم: اصطدام مباشر بناطحة سحاب نيون',
        cause_drone: 'سبب التحطم: انفجار جراء الاصطدام بطائرة معادية',
        cause_boss: 'سبب التحطم: قصف من مدفع المذركرافت العملاقة',
        impact_building: 'اصطدام بناطحة سحاب! تم ارتداد المركبة للمسار الآمن',
        impact_drone: 'اصطدام بطائرة معادية!'
    },
    en: {
        score: 'SCORE',
        distance: 'DISTANCE',
        speed_mach: 'SPEED (MACH)',
        hull_integrity: 'HULL INTEGRITY',
        shield_energy: 'ENERGY SHIELD',
        twin_lasers: 'TWIN LASERS [L-CLICK]',
        missiles_label: 'PLASMA TORPEDOES [R-CLICK / K]',
        boost_drive: 'QUANTUM DRIVE',
        boost_hint: '[SPACE / SHIFT] FOR OVERDRIVE',
        menu_tagline: 'Pilot your supersonic fighter jet through neon cyber megacities, dogfight hunter drones, and destroy the giant Mothership fortress!',
        launch_sortie: 'SCRAMBLE / LAUNCH JET',
        controls_manual: 'PILOT MANUAL',
        settings: 'SETTINGS',
        high_score: 'BEST FLIGHT SCORE:',
        mission_paused: 'SORTIE PAUSED',
        resume: 'RESUME FLIGHT',
        quit_to_menu: 'ABORT TO BASE',
        jet_destroyed: 'FIGHTER HULL LOST',
        final_score: 'FINAL SCORE',
        distance_flown: 'DISTANCE REACHED',
        targets_destroyed: 'TARGETS DESTROYED',
        rings_collected: 'QUANTUM RINGS',
        retry_flight: 'REDEPLOY IMMEDIATELY',
        back_to_hangar: 'MAIN HANGAR',
        flight_manual: '3D AEROBATIC MANUAL',
        maneuvering: 'MANEUVERING & FLIGHT',
        maneuver_desc: 'Use <b>WASD</b> or Mouse to steer and bank into turns.<br>Double-tap <b>A</b> or <b>D</b> to execute an evasive <b>Barrel Roll</b> with i-frames!',
        afterburner_title: 'QUANTUM AFTERBURNER',
        afterburner_desc: 'Hold <b>Spacebar</b> or <b>Shift</b> to surge into supersonic warp with FOV stretch.<br>Fly through <b>Neon Rings</b> to instantly recharge boost.',
        combat_systems: 'COMBAT & TARGETING',
        combat_desc: '<b>Left Click</b>: Fire Twin Gatling Lasers.<br><b>Right Click / K</b>: Launch Homing Plasma Torpedoes at locked targets.<br><b>V Key</b>: Toggle Chase / Cockpit Camera.',
        ready_to_fly: 'ALL SYSTEMS GO!',
        role_balanced: 'Balanced & Agile',
        role_speed: 'Supersonic Speed Demon',
        role_armor: 'Heavy Armor & Double Payload',
        btn_boost: 'BOOST',
        btn_roll: 'ROLL',
        btn_missile: 'TORPEDO',
        btn_fire: 'FIRE',
        btn_autofire: 'AUTO FIRE',
        rotate_device: 'ROTATE TO LANDSCAPE',
        rotate_desc: 'For best supersonic 3D flight precision and panoramic cockpit view',
        cause_building: 'CRASH CAUSE: Direct Impact with Neon Skyscraper',
        cause_drone: 'CRASH CAUSE: Collided with Enemy Hunter Drone',
        cause_boss: 'CRASH CAUSE: Heavy Bombardment from Titan Mothership',
        impact_building: 'SKYSCRAPER IMPACT! Repelling to Safe Lane',
        impact_drone: 'COLLISION WITH ENEMY CRAFT!'
    }
};

// =========================================================
// MAIN 3D GAME CLASS
// =========================================================
class CyberwingGame {
    constructor() {
        this.container = document.getElementById('game-container');
        this.webglCanvas = document.getElementById('webglCanvas');
        this.speedLinesCanvas = document.getElementById('speedLinesCanvas');
        this.speedLinesCtx = this.speedLinesCanvas.getContext('2d');

        // State Machine
        this.state = 'MENU'; // 'MENU', 'PLAYING', 'PAUSED', 'GAMEOVER'
        this.currentLang = 'ar';
        this.cameraViewMode = 'chase'; // 'chase' or 'cockpit'

        // Three.js Core
        this.initThree();

        // 3D Modules
        this.world = new World3D(this.scene);
        this.player = new PlayerJet3D(this.scene);
        this.weapons = new WeaponSystem3D(this.scene);
        this.enemies = [];

        // Pool Enemies
        for (let i = 0; i < 20; i++) {
            this.enemies.push(new Enemy3D(this.scene, 'drone'));
        }
        this.boss = new Enemy3D(this.scene, 'boss');

        // Flight & Combat Metrics
        this.score = 0;
        this.distance = 0;
        this.kills = 0;
        this.ringsCollected = 0;
        this.comboMultiplier = 1.0;
        this.comboTimer = 0;

        // Input State
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.isFiringLaser = false;
        this.isBoosting = false;
        this.touchFlightVector = { x: 0, y: 0 };
        this.touchFlightActive = false;
        this.autoFire = true;

        // Double-tap barrel roll detection
        this.lastTapKey = '';
        this.lastTapTime = 0;

        // Lock-on Target
        this.lockedTarget = null;

        // High Score
        this.loadHighScore();

        // Bind DOM & Controls
        this.setupDOM();
        this.setupInputs();
        this.applyLanguage();
        this.resize();

        window.addEventListener('resize', () => this.resize());

        // Speed Lines Generation
        this.initSpeedLines();

        // Loop
        this.clock = new THREE.Clock();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    initThree() {
        // Scene with Cyberpunk Neon Fog
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x040612);
        this.scene.fog = new THREE.FogExp2(0x060b1c, 0.0018);

        // Perspective Camera
        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(0, 12, 35);

        // WebGL Renderer with High Precision & Shadows
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.webglCanvas,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 3D Lighting Setup
        const ambientLight = new THREE.AmbientLight(0x182444, 1.2);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x00f3ff, 1.5);
        dirLight.position.set(50, 100, 50);
        this.scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0xff0055, 1.0);
        backLight.position.set(-50, 40, -50);
        this.scene.add(backLight);
    }

    resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);

        this.speedLinesCanvas.width = w;
        this.speedLinesCanvas.height = h;
    }

    loadHighScore() {
        this.highScore = parseInt(localStorage.getItem('cyberwing_highscore') || '0', 10);
        document.getElementById('menu-high-score').textContent = this.highScore.toLocaleString();
    }

    saveHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('cyberwing_highscore', this.highScore.toString());
            document.getElementById('menu-high-score').textContent = this.highScore.toLocaleString();
        }
    }

    // ==========================================
    // INPUTS & DOM BINDINGS
    // ==========================================
    setupDOM() {
        document.getElementById('btn-start-game').onclick = () => {
            window.flightAudio.playUiClick();
            this.startRun();
        };

        document.getElementById('btn-pause').onclick = () => this.togglePause();
        document.getElementById('btn-resume-game').onclick = () => this.togglePause();
        document.getElementById('btn-pause-quit').onclick = () => this.quitToMenu();

        document.getElementById('btn-camera-toggle').onclick = () => this.toggleCamera();

        const btnFs = document.getElementById('btn-fullscreen');
        if (btnFs) {
            btnFs.onclick = () => {
                window.flightAudio.playUiClick();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            };
        }

        // Modals
        const openModal = (id) => {
            window.flightAudio.playUiClick();
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('active');
        };
        const closeModal = (id) => {
            window.flightAudio.playUiClick();
            document.getElementById(id).classList.remove('active');
            document.getElementById(id).classList.add('hidden');
        };

        document.getElementById('btn-open-howtoplay').onclick = () => openModal('modal-howtoplay');
        document.getElementById('btn-close-howtoplay').onclick = () => closeModal('modal-howtoplay');
        document.getElementById('btn-open-settings').onclick = () => openModal('modal-settings');
        document.getElementById('btn-close-settings').onclick = () => closeModal('modal-settings');

        // Language
        document.getElementById('btn-lang-ar').onclick = () => this.setLanguage('ar');
        document.getElementById('btn-lang-en').onclick = () => this.setLanguage('en');

        // Restart
        document.getElementById('btn-restart-game').onclick = () => {
            closeModal('modal-gameover');
            this.startRun();
        };
        document.getElementById('btn-gameover-menu').onclick = () => this.quitToMenu();

        // Audio sliders
        document.getElementById('slider-music').oninput = (e) => {
            window.flightAudio.setMusicVolume(e.target.value / 100);
        };
        document.getElementById('slider-sfx').oninput = (e) => {
            window.flightAudio.setSfxVolume(e.target.value / 100);
        };
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.getElementById('btn-lang-ar').classList.toggle('active', lang === 'ar');
        document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
        this.applyLanguage();
    }

    applyLanguage() {
        const dict = I18N[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.innerHTML = dict[key];
        });
    }

    toggleCamera() {
        this.cameraViewMode = this.cameraViewMode === 'chase' ? 'cockpit' : 'chase';
        window.flightAudio.playUiClick();
    }

    setupInputs() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = true;

            // Double tap A or D for Barrel Roll
            if (key === 'a' || key === 'd') {
                const now = performance.now();
                if (this.lastTapKey === key && now - this.lastTapTime < 280) {
                    this.player.startBarrelRoll(key === 'a' ? -1 : 1);
                }
                this.lastTapKey = key;
                this.lastTapTime = now;
            }

            if (e.key === ' ' || e.code === 'Space' || e.key === 'Shift') {
                this.isBoosting = true;
                e.preventDefault();
            }

            if (key === 'k') {
                this.weapons.fireMissile(this.player.position, this.lockedTarget);
            }

            if (key === 'v') {
                this.toggleCamera();
            }

            if (key === 'escape' || key === 'p') {
                if (this.state === 'PLAYING' || this.state === 'PAUSED') this.togglePause();
            }
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = false;
            if (e.key === ' ' || e.code === 'Space' || e.key === 'Shift') {
                this.isBoosting = false;
            }
        });

        // Mouse flight & weapons
        window.addEventListener('mousemove', (e) => {
            this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('mousedown', (e) => {
            if (this.state !== 'PLAYING') return;
            if (e.button === 0) {
                this.isFiringLaser = true;
            } else if (e.button === 2) {
                this.weapons.fireMissile(this.player.position, this.lockedTarget);
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.isFiringLaser = false;
        });
        window.addEventListener('contextmenu', (e) => e.preventDefault());

        // Mobile Touch Virtual Flight Stick
        const flightStick = document.getElementById('touch-flight-stick');
        const flightThumb = document.getElementById('touch-flight-thumb');
        let flightTouchId = null;

        const handleFlightMove = (touch) => {
            const rect = flightStick.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = touch.clientX - cx;
            const dy = touch.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const maxR = rect.width / 2;

            const clampedDist = Math.min(maxR, dist);
            const angle = Math.atan2(dy, dx);
            const tx = Math.cos(angle) * clampedDist;
            const ty = Math.sin(angle) * clampedDist;

            flightThumb.style.transform = `translate(${tx}px, ${ty}px)`;
            this.touchFlightVector.x = tx / maxR;
            this.touchFlightVector.y = -ty / maxR;
            this.touchFlightActive = true;
        };

        if (flightStick) {
            flightStick.addEventListener('touchstart', (e) => {
                flightTouchId = e.changedTouches[0].identifier;
                handleFlightMove(e.changedTouches[0]);
            });
            window.addEventListener('touchmove', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === flightTouchId) {
                        handleFlightMove(t);
                        break;
                    }
                }
            });
            const resetStick = () => {
                flightThumb.style.transform = `translate(0px, 0px)`;
                this.touchFlightVector.x = 0;
                this.touchFlightVector.y = 0;
                this.touchFlightActive = false;
                flightTouchId = null;
            };
            window.addEventListener('touchend', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === flightTouchId) resetStick();
                }
            });
        }

        // Mobile Action buttons with preventDefault and haptic feedback
        const btnBoost = document.getElementById('touch-btn-boost');
        if (btnBoost) {
            btnBoost.addEventListener('touchstart', (e) => { e.preventDefault(); this.isBoosting = true; }, { passive: false });
            btnBoost.addEventListener('touchend', (e) => { e.preventDefault(); this.isBoosting = false; }, { passive: false });
        }

        const btnRoll = document.getElementById('touch-btn-roll');
        if (btnRoll) {
            btnRoll.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.player.startBarrelRoll(Math.random() > 0.5 ? 1 : -1);
                if (navigator.vibrate) navigator.vibrate(35);
            }, { passive: false });
        }

        const btnFire = document.getElementById('touch-btn-fire');
        if (btnFire) {
            btnFire.addEventListener('touchstart', (e) => { e.preventDefault(); this.isFiringLaser = true; }, { passive: false });
            btnFire.addEventListener('touchend', (e) => { e.preventDefault(); this.isFiringLaser = false; }, { passive: false });
        }

        const btnMissile = document.getElementById('touch-btn-missile');
        if (btnMissile) {
            btnMissile.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.weapons.fireMissile(this.player.position, this.lockedTarget);
                if (navigator.vibrate) navigator.vibrate(40);
            }, { passive: false });
            btnMissile.onclick = () => this.weapons.fireMissile(this.player.position, this.lockedTarget);
        }

        const btnAuto = document.getElementById('touch-btn-autofire');
        if (btnAuto) {
            btnAuto.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.autoFire = !this.autoFire;
                btnAuto.classList.toggle('disabled', !this.autoFire);
                const lbl = btnAuto.querySelector('.btn-lbl');
                if (lbl) {
                    lbl.textContent = this.autoFire ? 
                        (this.currentLang === 'ar' ? 'آلي: تشغيل' : 'AUTO: ON') : 
                        (this.currentLang === 'ar' ? 'آلي: إيقاف' : 'AUTO: OFF');
                }
                if (navigator.vibrate) navigator.vibrate(25);
            }, { passive: false });
        }

        // Screen orientation advisor
        const checkOrientation = () => {
            const prompt = document.getElementById('landscape-prompt');
            if (!prompt) return;
            const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 900);
            if (isMobile && window.innerHeight > window.innerWidth) {
                prompt.classList.remove('hidden');
            } else {
                prompt.classList.add('hidden');
            }
        };
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);
        const dismissBtn = document.getElementById('btn-dismiss-rotate');
        if (dismissBtn) {
            dismissBtn.onclick = () => {
                const prompt = document.getElementById('landscape-prompt');
                if (prompt) prompt.classList.add('hidden');
            };
        }
        checkOrientation();

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 900) {
            document.getElementById('touch-controls').classList.remove('hidden');
        }
    }

    // ==========================================
    // RUN LIFECYCLE
    // ==========================================
    startRun() {
        this.player.reset();
        this.score = 0;
        this.distance = 0;
        this.kills = 0;
        this.ringsCollected = 0;
        this.comboMultiplier = 1.0;
        this.comboTimer = 0;

        for (let e of this.enemies) e.active = false;
        this.boss.active = false;

        document.getElementById('menu-start').classList.remove('active');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('boss-hud-container').classList.add('hidden');
        const warnBanner = document.getElementById('impact-warning-banner');
        if (warnBanner) warnBanner.classList.add('hidden');

        this.state = 'PLAYING';
        window.flightAudio.startMusic();
    }

    togglePause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            document.getElementById('pause-score').textContent = this.score.toLocaleString();
            document.getElementById('pause-dist').textContent = `${(this.distance / 1000).toFixed(1)} KM`;
            document.getElementById('modal-pause').classList.remove('hidden');
            document.getElementById('modal-pause').classList.add('active');
        } else if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            document.getElementById('modal-pause').classList.add('hidden');
            document.getElementById('modal-pause').classList.remove('active');
        }
    }

    quitToMenu() {
        this.state = 'MENU';
        window.flightAudio.stopMusic();
        document.querySelectorAll('.screen-overlay').forEach(el => el.classList.remove('active'));
        document.getElementById('modal-pause').classList.add('hidden');
        document.getElementById('modal-gameover').classList.add('hidden');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('menu-start').classList.add('active');
        this.saveHighScore();
    }

    onPlayerCrashed(cause = 'building') {
        this.state = 'GAMEOVER';
        window.flightAudio.stopMusic();
        window.flightAudio.playExplosion(3.0);
        this.saveHighScore();

        const dict = I18N[this.currentLang];
        const causeKey = `cause_${cause}`;
        const causeText = dict[causeKey] || dict['cause_building'];
        const causeEl = document.getElementById('gameover-cause');
        if (causeEl) causeEl.textContent = causeText;

        document.getElementById('go-score').textContent = this.score.toLocaleString();
        document.getElementById('go-distance').textContent = `${(this.distance / 1000).toFixed(1)} KM`;
        document.getElementById('go-kills').textContent = this.kills;
        document.getElementById('go-rings').textContent = this.ringsCollected;

        document.getElementById('modal-gameover').classList.remove('hidden');
        document.getElementById('modal-gameover').classList.add('active');
    }

    triggerImpactAlert(type = 'building') {
        const banner = document.getElementById('impact-warning-banner');
        const text = document.getElementById('impact-warning-text');
        if (!banner || !text) return;

        const dict = I18N[this.currentLang];
        const msgKey = `impact_${type}`;
        text.textContent = dict[msgKey] || '⚠️ IMPACT // اصطدام!';
        banner.classList.remove('hidden');

        if (this.alertTimeout) clearTimeout(this.alertTimeout);
        this.alertTimeout = setTimeout(() => {
            banner.classList.add('hidden');
        }, 1300);
    }

    // ==========================================
    // SPEED WARP LINES OVERLAY
    // ==========================================
    initSpeedLines() {
        this.speedLines = [];
        const count = 45;
        for (let i = 0; i < count; i++) {
            this.speedLines.push({
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 400 + 50,
                len: Math.random() * 60 + 20,
                speed: Math.random() * 6 + 3
            });
        }
    }

    renderSpeedLines(isBoosting) {
        const ctx = this.speedLinesCtx;
        const w = this.speedLinesCanvas.width;
        const h = this.speedLinesCanvas.height;
        ctx.clearRect(0, 0, w, h);

        if (!isBoosting && this.state !== 'PLAYING') return;

        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = isBoosting ? '#ffe600' : 'rgba(0, 243, 255, 0.4)';
        ctx.lineWidth = isBoosting ? 2.5 : 1.2;

        for (let line of this.speedLines) {
            line.dist += line.speed * (isBoosting ? 3.5 : 1);
            if (line.dist > Math.max(w, h)) line.dist = 30;

            const x1 = cx + Math.cos(line.angle) * line.dist;
            const y1 = cy + Math.sin(line.angle) * line.dist;
            const x2 = cx + Math.cos(line.angle) * (line.dist + line.len * (isBoosting ? 2.5 : 1));
            const y2 = cy + Math.sin(line.angle) * (line.dist + line.len * (isBoosting ? 2.5 : 1));

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        ctx.restore();
    }

    // ==========================================
    // MAIN UPDATE LOOP
    // ==========================================
    update(dt) {
        if (this.state !== 'PLAYING') return;

        // 1. Flight Input Vector
        let ix = 0;
        let iy = 0;
        if (this.keys['a'] || this.keys['arrowleft']) ix -= 1;
        if (this.keys['d'] || this.keys['arrowright']) ix += 1;
        if (this.keys['w'] || this.keys['arrowup']) iy += 1;
        if (this.keys['s'] || this.keys['arrowdown']) iy -= 1;

        // Combine with mouse or touch stick
        if (this.touchFlightActive) {
            ix = this.touchFlightVector.x;
            iy = this.touchFlightVector.y;
        } else if (Math.hypot(this.mousePos.x, this.mousePos.y) > 0.05) {
            ix += this.mousePos.x * 0.9;
            iy += this.mousePos.y * 0.9;
        }

        const len = Math.hypot(ix, iy);
        if (len > 1) { ix /= len; iy /= len; }

        // 2. Update Player Jet
        this.player.update(dt, { x: ix, y: iy }, this.isBoosting);

        if (this.player.hp <= 0) {
            this.onPlayerCrashed();
            return;
        }

        // Distance & Score accrual
        this.distance += this.player.speed * dt;
        this.score += Math.floor(this.player.speed * dt * this.comboMultiplier);

        // 3. Update 3D World & Chunk recycling
        this.world.update(dt, this.player.position.z, this.player.speed);

        // Ring collection check
        this.world.checkRingCollisions(this.player.position, (ring) => {
            this.ringsCollected++;
            this.score += 500 * this.comboMultiplier;
            this.player.boostEnergy = Math.min(this.player.maxBoostEnergy, this.player.boostEnergy + 35);
            this.player.repair(30);
            this.comboMultiplier = Math.min(5.0, this.comboMultiplier + 0.5);
            this.comboTimer = 4.0;
            window.flightAudio.playRingCollected();
        });

        // Building obstacle collision check with safety bounceback
        const col = this.world.checkBuildingCollisions(this.player.position, this.player.radius);
        if (col && col.hit) {
            const res = this.player.takeDamage(25, 'building');
            if (res && res.damaged) {
                this.player.position.x += col.pushX;
                this.comboMultiplier = 1.0;
                this.triggerImpactAlert('building');
                if (res.fatal) {
                    this.onPlayerCrashed('building');
                    return;
                }
            }
        }

        // 4. Combat & Weapons
        if (this.isFiringLaser || this.autoFire) {
            this.weapons.fireLaser(this.player.position, this.player.speed);
        }
        this.weapons.update(dt, this.enemies.concat(this.boss.active ? [this.boss] : []));

        // 5. Enemy Spawning & Boss Wave
        this.updateEnemies(dt);

        // 6. Target Lock-on Raycast / Proximity
        this.updateTargetLock();

        // 7. Dynamic Camera Follow
        this.updateCamera(dt);

        // 8. Combo Decay
        if (this.comboTimer > 0) {
            this.comboTimer -= dt;
            if (this.comboTimer <= 0) this.comboMultiplier = 1.0;
        }

        this.updateHUD();
    }

    updateEnemies(dt) {
        // Spawn drones ahead of player
        if (Math.random() < 0.035) {
            const drone = this.enemies.find(e => !e.active);
            if (drone) {
                const x = (Math.random() - 0.5) * 80;
                const y = -10 + Math.random() * 50;
                const z = this.player.position.z - 450 - Math.random() * 100;
                drone.spawn(x, y, z);
            }
        }

        for (let e of this.enemies) {
            if (e.active) {
                e.update(dt, this.player.position.z);
                // Check if drone collided with player
                if (e.mesh.position.distanceTo(this.player.position) < e.radius + this.player.radius) {
                    const res = this.player.takeDamage(20, 'drone');
                    e.destroy();
                    if (res && res.damaged) {
                        this.triggerImpactAlert('drone');
                        if (res.fatal) {
                            this.onPlayerCrashed('drone');
                            return;
                        }
                    }
                }
            }
        }

        // Boss Encounter at 2500m
        if (this.distance > 2500 && !this.boss.active && !this.bossDefeated) {
            this.boss.spawn(0, 25, this.player.position.z - 500);
            document.getElementById('boss-hud-container').classList.remove('hidden');
            window.flightAudio.playSonicBoom();
        }

        if (this.boss.active) {
            // Boss tracks ahead of player
            this.boss.mesh.position.z = this.player.position.z - 380;
            this.boss.mesh.position.x = Math.sin(performance.now() * 0.001) * 35;
            this.boss.update(dt, this.player.position.z);

            const bPct = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
            document.getElementById('boss-bar-fill').style.width = `${bPct}%`;

            if (this.boss.hp <= 0) {
                this.bossDefeated = true;
                this.kills += 5;
                this.score += this.boss.scoreValue;
                document.getElementById('boss-hud-container').classList.add('hidden');
            }
        }
    }

    updateTargetLock() {
        let bestTarget = null;
        let minAngle = 0.35; // Screen central cone

        const allTargets = this.enemies.concat(this.boss.active ? [this.boss] : []);
        for (let target of allTargets) {
            if (!target.active) continue;
            const toTarget = target.mesh.position.clone().sub(this.player.position);
            // Must be ahead
            if (toTarget.z < -20 && toTarget.z > -400) {
                const angle = Math.atan2(Math.hypot(toTarget.x, toTarget.y), -toTarget.z);
                if (angle < minAngle) {
                    minAngle = angle;
                    bestTarget = target;
                }
            }
        }

        this.lockedTarget = bestTarget;
        const lockIndicator = document.getElementById('lockon-indicator');
        if (this.lockedTarget) {
            lockIndicator.classList.remove('hidden');
            if (Math.random() < 0.1) window.flightAudio.playLockOnBeep();
        } else {
            lockIndicator.classList.add('hidden');
        }
    }

    updateCamera(dt) {
        if (this.cameraViewMode === 'cockpit') {
            // First person inside cockpit canopy
            this.camera.position.set(
                this.player.position.x,
                this.player.position.y + 1.2,
                this.player.position.z - 2
            );
            this.camera.rotation.copy(this.player.rotation);
        } else {
            // Third-Person High-Action Chase Cam with spring damping
            const targetCamX = this.player.position.x * 0.7;
            const targetCamY = this.player.position.y * 0.6 + 9;
            const targetCamZ = this.player.position.z + 28;

            this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetCamX, 0.12);
            this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetCamY, 0.12);
            this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, targetCamZ, 0.18);

            // Dynamic Field of View Warp on Afterburner
            const targetFov = this.player.isBoosting ? 82 : 65;
            this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, 0.1);
            this.camera.updateProjectionMatrix();

            // Look slightly ahead of jet
            this.camera.lookAt(this.player.position.x * 0.4, this.player.position.y * 0.4, this.player.position.z - 80);
        }
    }

    updateHUD() {
        document.getElementById('hud-score').textContent = this.score.toLocaleString();
        document.getElementById('hud-multiplier').textContent = `x${this.comboMultiplier.toFixed(1)}`;

        const mach = (this.player.speed / 120).toFixed(2);
        document.getElementById('hud-speed-val').textContent = mach;
        const speedPct = Math.min(100, (this.player.speed / this.player.boostSpeed) * 100);
        document.getElementById('hud-speed-bar').style.width = `${speedPct}%`;

        const distKm = (this.distance / 1000).toFixed(2);
        document.getElementById('hud-distance').textContent = `${distKm} KM`;

        // Defense: Shield & Hull
        const shieldPct = Math.max(0, Math.min(100, (this.player.shield / this.player.maxShield) * 100));
        const shieldBar = document.getElementById('hud-shield-bar');
        const shieldVal = document.getElementById('hud-shield-val');
        if (shieldBar) shieldBar.style.width = `${shieldPct}%`;
        if (shieldVal) shieldVal.textContent = `${Math.ceil(shieldPct)}%`;

        const hpPct = Math.max(0, Math.min(100, (this.player.hp / this.player.maxHp) * 100));
        document.getElementById('hud-hp-bar').style.width = `${hpPct}%`;
        document.getElementById('hud-hp-val').textContent = `${Math.ceil(hpPct)}%`;

        const boostPct = Math.max(0, Math.min(100, (this.player.boostEnergy / this.player.maxBoostEnergy) * 100));
        document.getElementById('hud-boost-bar').style.width = `${boostPct}%`;
        document.getElementById('hud-boost-val').textContent = `${Math.ceil(boostPct)}%`;

        // Missile pills
        let pText = '';
        for (let i = 0; i < this.weapons.missileCount; i++) pText += '●';
        for (let i = this.weapons.missileCount; i < this.weapons.maxMissiles; i++) pText += '○';
        document.getElementById('hud-missile-count').textContent = pText;
    }

    gameLoop(now) {
        const dt = Math.min(0.1, this.clock.getDelta());

        this.update(dt);
        this.renderer.render(this.scene, this.camera);
        this.renderSpeedLines(this.player.isBoosting);

        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

// Bootstrap on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    window.game = new CyberwingGame();
});
