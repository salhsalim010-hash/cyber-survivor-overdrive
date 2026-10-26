/* =========================================================
   CYBER SURVIVOR: OVERDRIVE - CORE GAME CONTROLLER
   Full Roguelike Engine, Upgrades Pool, Waves, Localization & Loop
   ========================================================= */

// =========================================================
// LOCALIZATION (Arabic & English)
// =========================================================
const I18N = {
    ar: {
        score: 'النقاط',
        lvl: 'مستوى',
        time: 'الوقت',
        wave: 'الموجة',
        dash: 'اندفاع [SPACE]',
        overdrive: 'القدرة القصوى [E]',
        tagline: 'واجه أسراب الروبوتات القاتلة، طوّر ترسانتك السيبرانية، وتحدّ أعتى الزعماء في معركة بقاء لا نهائية!',
        play_now: 'ابدأ المعركة الآن',
        meta_upgrades: 'ترقيات النواة',
        settings: 'الإعدادات',
        how_to_play: 'طريقة اللعب',
        best_score: 'أفضل نتيجة:',
        choose_upgrade: 'اختر تعزيزك التكتيكي',
        upgrade_subtitle: 'طاقة البلازما جاهزة للدمج مع مركبتك',
        reroll: 'إعادة السحب',
        game_paused: 'المعركة متوقفة مؤقتاً',
        resume: 'استئناف المعركة',
        quit_to_menu: 'العودة للقائمة الرئيسية',
        defeated: 'تم تدمير المركبة',
        time_survived: 'وقت الصمود',
        total_kills: 'الأعداء المدمرون',
        final_score: 'النتيجة النهائية',
        plasma_gathered: 'بلازما مكتسبة',
        play_again: 'إعادة المحاولة فوراً',
        back_to_menu: 'القائمة الرئيسية',
        core_hangar: 'مرآب الترقيات الدائمة',
        core_shop_desc: 'أنفق بلورات البلازما لتعزيز أسطولك بشكل دائم في جميع الجولات!',
        back: 'الرجوع',
        music_volume: 'مستوى الموسيقى:',
        sfx_volume: 'المؤثرات الصوتية:',
        screen_shake: 'اهتزاز الشاشة:',
        auto_aim: 'التصويب التلقائي:',
        crt_bloom: 'تأثيرات النيون (CRT Glow):',
        save_close: 'حفظ وإغلاق',
        how_to_play_title: 'دليل الطيار السيبراني',
        controls_title: 'التحكم',
        controls_desc: 'الحركة: <b>WASD</b> أو الأسهم.<br>التصويب: <b>بالماوس 🎯</b>.<br>إطلاق النار: <b>زر الماوس الأيسر (انقر أو استمر بالضغط)</b> أو مفتاح J.<br>المراوغة السريعة: <b>مسطرة المسافات (Space) أو Shift أو الزر الأيمن</b>.<br>القدرة القصوى: <b>مفتاح E</b>.',
        collect_evolve: 'الجمع والتطوير',
        collect_desc: 'اجمع بلورات الطاقة لترقية مستواك واختيار ترقيات الأسلحة والقدرات لتصنع توليفة أسلحة لا تُقهر.',
        bosses_title: 'الزعماء والموجات',
        bosses_desc: 'تزداد ضراوة الأعداء بمرور الوقت! احذر من أشعة الليزر الحمراء وواجه زعيم الموجة الخامسة والعاشرة للحصول على غنائم أسطورية.',
        got_it: 'فهمت، لنبدأ!',
        stat_speed: 'السرعة',
        stat_armor: 'الدرع',
        stat_firepower: 'القوة الهجومية',
        rarity_common: 'شائع',
        rarity_rare: 'نادر',
        rarity_epic: 'ملحمي',
        rarity_legendary: 'أسطوري',
        stick_move: 'حركة 🕹️',
        stick_aim: 'تصويب ورماية 🎯'
    },
    en: {
        score: 'SCORE',
        lvl: 'LVL',
        time: 'TIME',
        wave: 'WAVE',
        dash: 'DASH [SPACE]',
        overdrive: 'OVERDRIVE [E]',
        tagline: 'Survive infinite cyber swarms, upgrade your lethal arsenal, and defeat terrifying bosses in a neon-drenched roguelite.',
        play_now: 'DEPLOY TO BATTLE',
        meta_upgrades: 'CORE HANGAR',
        settings: 'SETTINGS',
        how_to_play: 'PILOT MANUAL',
        best_score: 'BEST SCORE:',
        choose_upgrade: 'CHOOSE TACTICAL UPGRADE',
        upgrade_subtitle: 'Plasma core energy is ready for ship integration',
        reroll: 'REROLL',
        game_paused: 'MISSION PAUSED',
        resume: 'RESUME BATTLE',
        quit_to_menu: 'ABORT TO MENU',
        defeated: 'HULL DESTROYED',
        time_survived: 'TIME SURVIVED',
        total_kills: 'ENEMIES CRUSHED',
        final_score: 'FINAL SCORE',
        plasma_gathered: 'PLASMA COLLECTED',
        play_again: 'REDEPLOY NOW',
        back_to_menu: 'MAIN MENU',
        core_hangar: 'PERMANENT CORE UPGRADES',
        core_shop_desc: 'Spend collected plasma crystals to permanently enhance your fleet across all runs!',
        back: 'BACK',
        music_volume: 'Music Volume:',
        sfx_volume: 'SFX Volume:',
        screen_shake: 'Screen Shake:',
        auto_aim: 'Smart Auto-Aim:',
        crt_bloom: 'Neon CRT Bloom:',
        save_close: 'SAVE & CLOSE',
        how_to_play_title: 'CYBER PILOT MANUAL',
        controls_title: 'CONTROLS',
        controls_desc: 'Move: <b>WASD</b> or Arrows.<br>Aim: <b>Mouse Cursor 🎯</b>.<br>Fire: <b>Left Mouse Click / Hold</b> or J key.<br>Dash: <b>Space, Shift, or Right Click</b>.<br>Ultimate Overdrive: <b>E key</b>.',
        collect_evolve: 'COLLECT & EVOLVE',
        collect_desc: 'Gather glowing plasma gems to level up and build synergized loadouts with deadly secondary weapons.',
        bosses_title: 'BOSS THREATS',
        bosses_desc: 'Enemy density scales over time! Dodge laser sweeps and take down the Wave 5 & 10 Cyber Titans.',
        got_it: 'UNDERSTOOD, LET’S FLY!',
        stat_speed: 'SPEED',
        stat_armor: 'ARMOR',
        stat_firepower: 'FIREPOWER',
        rarity_common: 'COMMON',
        rarity_rare: 'RARE',
        rarity_epic: 'EPIC',
        rarity_legendary: 'LEGENDARY',
        stick_move: 'MOVE 🕹️',
        stick_aim: 'AIM & FIRE 🎯'
    }
};

// Available Ships
const SHIP_PROFILES = [
    {
        id: 'vanguard',
        name: 'VANGUARD-01',
        nameAr: 'المدافع-01 (VANGUARD)',
        descAr: 'مركبة قتالية متوازنة مجهزة بمدافع البلازما ونبض الطاقة الكهرومغناطيسية الفتاك.',
        descEn: 'Balanced combat fighter equipped with rapid Twin Blasters and wide-area EMP Nova.',
        speed: 70, armor: 50, power: 80,
        startWeapon: 'blaster'
    },
    {
        id: 'phantom',
        name: 'PHANTOM-X',
        nameAr: 'الشبح-X (PHANTOM)',
        descAr: 'مركبة فائقة السرعة تراوغ ضربات الأعداء بسهولة مع قدرة تجميد الزمن.',
        descEn: 'Ultra-fast interceptor with quick dash cooldown and time-dilation bullet time warp.',
        speed: 95, armor: 25, power: 75,
        startWeapon: 'missiles'
    },
    {
        id: 'colossus',
        name: 'COLOSSUS-MK4',
        nameAr: 'العملاق-MK4 (COLOSSUS)',
        descAr: 'طراد فولاذي ثقيل مدجج بالدروع وشفرات البلازما الدوارة وقنبلة السوبرنوفا.',
        descEn: 'Heavy battle cruiser with high armor, starter Orbital Blades, and screen-clearing Supernova.',
        speed: 45, armor: 95, power: 90,
        startWeapon: 'orbital'
    }
];

// Roguelike Upgrades Database
const UPGRADE_POOL = [
    {
        id: 'blaster_upgrade',
        nameAr: 'مدافع البلازما المزدوجة',
        nameEn: 'Twin Plasma Blaster',
        descAr: 'زيادة معدل الإطلاق وعدد القذائف الخارقة.',
        descEn: 'Increases blaster fire rate, damage, and projectile count.',
        icon: '💥',
        rarity: 'common',
        isWeapon: true,
        weaponType: 'blaster'
    },
    {
        id: 'missiles_upgrade',
        nameAr: 'صواريخ الفراغ الموجهة',
        nameEn: 'Homing Void Missiles',
        descAr: 'إطلاق صواريخ تتبع تلقائي تنفجر عند الاصطدام.',
        descEn: 'Fires smart-seeking missiles with explosive payload.',
        icon: '🚀',
        rarity: 'rare',
        isWeapon: true,
        weaponType: 'missiles'
    },
    {
        id: 'orbital_upgrade',
        nameAr: 'شفرات البلازما الدوارة',
        nameEn: 'Orbital Sawblades',
        descAr: 'شفرات طاقة تدور حول المركبة وتمزق الأعداء القريبين.',
        descEn: 'Energy blades orbit your ship slicing nearby enemies.',
        icon: '🪚',
        rarity: 'rare',
        isWeapon: true,
        weaponType: 'orbital'
    },
    {
        id: 'tesla_upgrade',
        nameAr: 'صاعق تسلا المتسلسل',
        nameEn: 'Tesla Chain Arc',
        descAr: 'صواعق كهربائية تقفز بين أسراب الأعداء المتراصة.',
        descEn: 'Discharges electric lightning chaining through enemy swarms.',
        icon: '⚡',
        rarity: 'epic',
        isWeapon: true,
        weaponType: 'tesla'
    },
    {
        id: 'singularity_upgrade',
        nameAr: 'حفرة الجاذبية السوداء',
        nameEn: 'Singularity Vortex',
        descAr: 'توليد ثقوب سوداء تسحب الأعداء ثم تنفجر بقوة ساحقة.',
        descEn: 'Creates gravitational singularities that pull and crush foes.',
        icon: '🌀',
        rarity: 'legendary',
        isWeapon: true,
        weaponType: 'singularity'
    },
    // Passives
    {
        id: 'overclock',
        nameAr: 'رفع تردد المحرك الهجومي',
        nameEn: 'Overclock Core',
        descAr: '+15% سرعة إطلاق لكافة الأسلحة.',
        descEn: '+15% attack speed for all weapons.',
        icon: '⏱️',
        rarity: 'common',
        apply: (p) => { p.bonusFireRate = (p.bonusFireRate || 0) + 0.04; }
    },
    {
        id: 'damage_matrix',
        nameAr: 'مصفوفة تضخيم البلازما',
        nameEn: 'Plasma Amplifier',
        descAr: '+20% ضرر لجميع المقذوفات والقدرات.',
        descEn: '+20% damage to all weapons and abilities.',
        icon: '🔥',
        rarity: 'rare',
        apply: (p) => { p.bonusDamageMult = (p.bonusDamageMult || 1) + 0.2; }
    },
    {
        id: 'thruster_boost',
        nameAr: 'محركات كوانتم فائقة',
        nameEn: 'Quantum Thrusters',
        descAr: '+15% سرعة تحرك المركبة وسلاسة المراوغة.',
        descEn: '+15% flight move speed and agility.',
        icon: '💨',
        rarity: 'common',
        apply: (p) => { p.bonusSpeedMult = (p.bonusSpeedMult || 1) + 0.15; }
    },
    {
        id: 'nanite_armor',
        nameAr: 'دروع النانيت ذاتية الإصلاح',
        nameEn: 'Nanite Hull Plating',
        descAr: '+1 حماية دائمة من الضرر، و +1 نقطة علاج كل ثانية.',
        descEn: '+1 flat armor damage reduction and +1 HP regen/sec.',
        icon: '🛡️',
        rarity: 'rare',
        apply: (p) => { p.armor += 1; p.hpRegenPerSec += 1.0; }
    },
    {
        id: 'crit_matrix',
        nameAr: 'حوسبة الاستهداف الحرج',
        nameEn: 'Critical Strike Array',
        descAr: '+15% فرصة إلحاق ضربة حرجة مضاعفة باللون الأصفر.',
        descEn: '+15% chance to score double critical damage.',
        icon: '🎯',
        rarity: 'epic',
        apply: (p) => { p.bonusCritChance = (p.bonusCritChance || 0.05) + 0.15; }
    },
    {
        id: 'magnet_pulse',
        nameAr: 'مجال الجاذبية المغناطيسية',
        nameEn: 'Magnetosphere',
        descAr: '+60% نطاق جذب بلورات الطاقة والبلورات.',
        descEn: '+60% pickup collection radius for XP gems and loot.',
        icon: '🧲',
        rarity: 'common',
        apply: (p) => { p.magnetRadius += 80; }
    },
    {
        id: 'chrono_dash',
        nameAr: 'مكثف الاندفاع الكرونوغرافي',
        nameEn: 'Chrono Dash Booster',
        descAr: '-30% زمن انتظار الاندفاع و زيادة مسافة المراوغة.',
        descEn: '-30% dash cooldown and longer invulnerability.',
        icon: '⚡',
        rarity: 'epic',
        apply: (p) => { p.dashCooldown = Math.max(0.8, p.dashCooldown * 0.7); }
    }
];

// Meta Shop Upgrades (Permanent)
const META_UPGRADES = [
    {
        id: 'meta_hp',
        nameAr: 'تعزيز هيكل السفينة',
        nameEn: 'Hull Reinforcement',
        descAr: '+25 نقطة صحة قصوى إضافية عند بدء أي جولة.',
        descEn: '+25 starting Max HP for all ships.',
        icon: '❤️',
        maxTier: 5,
        baseCost: 50,
        costMult: 1.8
    },
    {
        id: 'meta_damage',
        nameAr: 'شحن النواة الهجومية',
        nameEn: 'Core Damage Output',
        descAr: '+10% ضرر أساسي لكافة الأسلحة في جميع الجولات.',
        descEn: '+10% base damage bonus for all weapons.',
        icon: '⚔️',
        maxTier: 5,
        baseCost: 70,
        costMult: 2.0
    },
    {
        id: 'meta_magnet',
        nameAr: 'مستشعر الطاقة بعيد المدى',
        nameEn: 'Long-Range Magnet',
        descAr: '+40 نطاق جذب إضافي للبلورات.',
        descEn: '+40 base collection radius.',
        icon: '🧲',
        maxTier: 4,
        baseCost: 40,
        costMult: 1.6
    },
    {
        id: 'meta_speed',
        nameAr: 'محركات البلازما المحسنة',
        nameEn: 'Plasma Afterburners',
        descAr: '+8% سرعة طيران دائمة.',
        descEn: '+8% base flight speed.',
        icon: '🚀',
        maxTier: 4,
        baseCost: 60,
        costMult: 1.7
    }
];

// =========================================================
// MAIN GAME CONTROLLER CLASS
// =========================================================
class CyberSurvivorGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.previewCtx = this.previewCanvas.getContext('2d');

        // State Machine
        this.state = 'MENU'; // 'MENU', 'PLAYING', 'LEVEL_UP', 'PAUSED', 'GAMEOVER'
        this.currentLang = 'ar';
        this.selectedShipIndex = 0;

        // Entities
        this.player = new Player();
        this.weaponManager = new WeaponManager(this.player);
        this.enemies = [];
        this.drops = [];

        // Pool limits
        this.maxEnemies = 250;
        this.maxDrops = 200;
        for (let i = 0; i < this.maxEnemies; i++) this.enemies.push(new Enemy());
        for (let i = 0; i < this.maxDrops; i++) this.drops.push(new DropItem());

        // Camera
        this.camera = { x: 0, y: 0 };

        // Input
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.isMouseDown = false;
        this.isFiringActive = false;
        this.autoAim = false; // Manual aim is default for true skill-based action!
        this.touchVector = { x: 0, y: 0 };
        this.touchActive = false;
        this.touchAimVector = { x: 0, y: 0 };
        this.touchAimActive = false;
        this.touchFiring = false;

        // Run Metrics
        this.gameTime = 0;
        this.wave = 1;
        this.waveTimer = 0;
        this.waveDuration = 35; // seconds per wave
        this.score = 0;
        this.kills = 0;
        this.level = 1;
        this.currentXp = 0;
        this.nextLevelXp = 40;
        this.runPlasma = 0;
        this.rerolls = 1;

        // Meta Progress (LocalStorage)
        this.loadSaveData();

        // Wave Spawning
        this.spawnTimer = 0;
        this.activeBoss = null;

        // Loop Timing
        this.lastFrameTime = performance.now();

        // Bind events
        this.setupDOM();
        this.setupInputs();
        this.applyLanguage();
        this.renderPreviewShip();

        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();

        // Start loop
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ==========================================
    // SAVE DATA (LocalStorage)
    // ==========================================
    loadSaveData() {
        this.savedPlasma = parseInt(localStorage.getItem('cyber_plasma') || '0', 10);
        this.highScore = parseInt(localStorage.getItem('cyber_highscore') || '0', 10);
        this.metaTiers = JSON.parse(localStorage.getItem('cyber_meta_tiers') || '{}');
        document.getElementById('menu-best-score').textContent = this.highScore.toLocaleString();
        document.getElementById('shop-plasma-balance').textContent = this.savedPlasma.toLocaleString();
    }

    saveProgress() {
        localStorage.setItem('cyber_plasma', this.savedPlasma.toString());
        localStorage.setItem('cyber_highscore', this.highScore.toString());
        localStorage.setItem('cyber_meta_tiers', JSON.stringify(this.metaTiers));
    }

    addPlasma(amount) {
        this.runPlasma += amount;
        this.savedPlasma += amount;
        document.getElementById('hud-plasma').textContent = this.runPlasma;
        this.saveProgress();
    }

    // ==========================================
    // DOM & UI EVENTS
    // ==========================================
    setupDOM() {
        // Start Game
        document.getElementById('btn-start-game').onclick = () => {
            window.audioEngine.playUiClick();
            this.startRun();
        };

        // Ship Selector
        document.getElementById('btn-prev-ship').onclick = () => {
            this.selectedShipIndex = (this.selectedShipIndex - 1 + SHIP_PROFILES.length) % SHIP_PROFILES.length;
            this.updateShipPreview();
            window.audioEngine.playUiClick();
        };
        document.getElementById('btn-next-ship').onclick = () => {
            this.selectedShipIndex = (this.selectedShipIndex + 1) % SHIP_PROFILES.length;
            this.updateShipPreview();
            window.audioEngine.playUiClick();
        };

        // Modals
        const openModal = (id) => {
            window.audioEngine.playUiClick();
            document.querySelectorAll('.screen-overlay').forEach(el => el.classList.remove('active', 'hidden'));
            document.getElementById(id).classList.add('active');
        };
        const closeModal = (id) => {
            window.audioEngine.playUiClick();
            document.getElementById(id).classList.remove('active');
            document.getElementById(id).classList.add('hidden');
        };

        document.getElementById('btn-open-upgrades').onclick = () => {
            this.renderMetaShop();
            openModal('modal-meta-shop');
        };
        document.getElementById('btn-close-shop').onclick = () => closeModal('modal-meta-shop');

        document.getElementById('btn-open-settings').onclick = () => openModal('modal-settings');
        document.getElementById('btn-close-settings').onclick = () => closeModal('modal-settings');

        document.getElementById('btn-open-howtoplay').onclick = () => openModal('modal-howtoplay');
        document.getElementById('btn-close-howtoplay').onclick = () => closeModal('modal-howtoplay');

        // Fullscreen & Pause
        const btnFs = document.getElementById('btn-fullscreen');
        if (btnFs) {
            btnFs.onclick = () => {
                window.audioEngine.playUiClick();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            };
        }

        document.getElementById('btn-pause').onclick = () => this.togglePause();
        document.getElementById('btn-resume-game').onclick = () => this.togglePause();
        document.getElementById('btn-pause-quit').onclick = () => this.quitToMenu();
        document.getElementById('btn-pause-settings').onclick = () => openModal('modal-settings');

        // Game Over
        document.getElementById('btn-restart-game').onclick = () => {
            closeModal('modal-gameover');
            this.startRun();
        };
        document.getElementById('btn-gameover-menu').onclick = () => this.quitToMenu();

        // Level Up Reroll
        document.getElementById('btn-reroll').onclick = () => {
            if (this.rerolls > 0) {
                this.rerolls--;
                document.getElementById('reroll-count').textContent = this.rerolls;
                window.audioEngine.playUiClick();
                this.showLevelUpModal();
            }
        };

        // Language Buttons
        document.getElementById('btn-lang-ar').onclick = () => this.setLanguage('ar');
        document.getElementById('btn-lang-en').onclick = () => this.setLanguage('en');

        // Settings Sliders
        document.getElementById('slider-music').oninput = (e) => {
            window.audioEngine.setMusicVolume(e.target.value / 100);
        };
        document.getElementById('slider-sfx').oninput = (e) => {
            window.audioEngine.setSfxVolume(e.target.value / 100);
        };
        document.getElementById('check-screenshake').onchange = (e) => {
            window.particleSystem.screenshakeEnabled = e.target.checked;
        };
        document.getElementById('check-autoaim').onchange = (e) => {
            this.autoAim = e.target.checked;
        };
        document.getElementById('check-crt').onchange = (e) => {
            const crt = document.getElementById('crt-overlay');
            crt.style.display = e.target.checked ? 'block' : 'none';
        };
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.getElementById('btn-lang-ar').classList.toggle('active', lang === 'ar');
        document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

        this.applyLanguage();
        this.updateShipPreview();
    }

    applyLanguage() {
        const dict = I18N[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });
    }

    updateShipPreview() {
        const ship = SHIP_PROFILES[this.selectedShipIndex];
        document.getElementById('ship-name').textContent = ship.name;
        document.getElementById('ship-desc').textContent = this.currentLang === 'ar' ? ship.descAr : ship.descEn;
        document.getElementById('stat-spd-fill').style.width = `${ship.speed}%`;
        document.getElementById('stat-arm-fill').style.width = `${ship.armor}%`;
        document.getElementById('stat-pwr-fill').style.width = `${ship.power}%`;
    }

    renderPreviewShip() {
        const ctx = this.previewCtx;
        const w = this.previewCanvas.width;
        const h = this.previewCanvas.height;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);

        const ship = SHIP_PROFILES[this.selectedShipIndex];
        const time = performance.now() * 0.002;

        // Floating rotation effect
        ctx.rotate(time * 0.5);

        ctx.shadowColor = ship.id === 'phantom' ? '#9d00ff' : (ship.id === 'colossus' ? '#ff0055' : '#00f3ff');
        ctx.shadowBlur = 18;

        if (ship.id === 'phantom') {
            ctx.fillStyle = '#0a1020';
            ctx.strokeStyle = '#9d00ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(35, 0);
            ctx.lineTo(-24, -26);
            ctx.lineTo(-12, 0);
            ctx.lineTo(-24, 26);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (ship.id === 'colossus') {
            ctx.fillStyle = '#140c18';
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(28, -16);
            ctx.lineTo(38, 0);
            ctx.lineTo(28, 16);
            ctx.lineTo(-20, 26);
            ctx.lineTo(-28, 12);
            ctx.lineTo(-28, -12);
            ctx.lineTo(-20, -26);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.fillStyle = '#071224';
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(35, 0);
            ctx.lineTo(-20, -22);
            ctx.lineTo(-10, -10);
            ctx.lineTo(-24, 0);
            ctx.lineTo(-10, 10);
            ctx.lineTo(-20, 22);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
        requestAnimationFrame(() => this.renderPreviewShip());
    }

    // ==========================================
    // INPUT HANDLING
    // ==========================================
    setupInputs() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ' || e.code === 'Space' || e.key === 'Shift') {
                if (this.state === 'PLAYING') {
                    this.player.dash();
                    e.preventDefault();
                }
            }
            if (e.key.toLowerCase() === 'e') {
                if (this.state === 'PLAYING') {
                    this.player.triggerUltimate(this.enemies);
                }
            }
            if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
                if (this.state === 'PLAYING' || this.state === 'PAUSED') {
                    this.togglePause();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        window.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.isMouseDown = true; // Left click to fire!
            } else if (e.button === 2 && this.state === 'PLAYING') {
                this.player.dash(); // Right click dash
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.isMouseDown = false;
            }
        });
        window.addEventListener('contextmenu', (e) => e.preventDefault());

        // 1. Move Virtual Joystick (Left Hand)
        const moveJoystick = document.getElementById('joystick-move');
        const moveThumb = document.getElementById('joystick-move-thumb');
        let moveTouchId = null;

        const handleMoveTouch = (touch) => {
            const rect = moveJoystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.hypot(dx, dy);
            const maxR = rect.width / 2;

            const clampedDist = Math.min(maxR, dist);
            const angle = Math.atan2(dy, dx);
            const thumbX = Math.cos(angle) * clampedDist;
            const thumbY = Math.sin(angle) * clampedDist;

            moveThumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;
            this.touchVector.x = thumbX / maxR;
            this.touchVector.y = thumbY / maxR;
            this.touchActive = true;
        };

        if (moveJoystick) {
            moveJoystick.addEventListener('touchstart', (e) => {
                moveTouchId = e.changedTouches[0].identifier;
                handleMoveTouch(e.changedTouches[0]);
            });
            window.addEventListener('touchmove', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === moveTouchId) {
                        handleMoveTouch(t);
                        break;
                    }
                }
            });
            const resetMoveStick = () => {
                moveThumb.style.transform = `translate(0px, 0px)`;
                this.touchVector.x = 0;
                this.touchVector.y = 0;
                this.touchActive = false;
                moveTouchId = null;
            };
            window.addEventListener('touchend', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === moveTouchId) resetMoveStick();
                }
            });
        }

        // 2. Aim & Fire Virtual Joystick (Right Hand - Twin-Stick)
        const aimJoystick = document.getElementById('joystick-aim');
        const aimThumb = document.getElementById('joystick-aim-thumb');
        let aimTouchId = null;

        const handleAimTouch = (touch) => {
            const rect = aimJoystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.hypot(dx, dy);
            const maxR = rect.width / 2;

            const clampedDist = Math.min(maxR, dist);
            const angle = Math.atan2(dy, dx);
            const thumbX = Math.cos(angle) * clampedDist;
            const thumbY = Math.sin(angle) * clampedDist;

            aimThumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;
            this.touchAimVector.x = thumbX / maxR;
            this.touchAimVector.y = thumbY / maxR;
            this.touchAimActive = true;
            this.touchFiring = (clampedDist > 10); // Drag to continuously fire in direction!
        };

        if (aimJoystick) {
            aimJoystick.addEventListener('touchstart', (e) => {
                aimTouchId = e.changedTouches[0].identifier;
                handleAimTouch(e.changedTouches[0]);
            });
            window.addEventListener('touchmove', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === aimTouchId) {
                        handleAimTouch(t);
                        break;
                    }
                }
            });
            const resetAimStick = () => {
                aimThumb.style.transform = `translate(0px, 0px)`;
                this.touchAimVector.x = 0;
                this.touchAimVector.y = 0;
                this.touchAimActive = false;
                this.touchFiring = false;
                aimTouchId = null;
            };
            window.addEventListener('touchend', (e) => {
                for (let t of e.changedTouches) {
                    if (t.identifier === aimTouchId) resetAimStick();
                }
            });
        }

        // Action buttons
        const btnDash = document.getElementById('touch-btn-dash');
        if (btnDash) btnDash.onclick = () => this.player.dash();

        const btnUlt = document.getElementById('touch-btn-ult');
        if (btnUlt) btnUlt.onclick = () => this.player.triggerUltimate(this.enemies);

        // Show touch controls on touch devices or small viewports
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 900) {
            document.getElementById('touch-controls').classList.remove('hidden');
        }
    }

    // ==========================================
    // RUN LIFECYCLE
    // ==========================================
    startRun() {
        const ship = SHIP_PROFILES[this.selectedShipIndex];
        this.player.init(ship.id);

        // Apply Meta Upgrades
        const hpTier = this.metaTiers['meta_hp'] || 0;
        this.player.maxHp += hpTier * 25;
        this.player.hp = this.player.maxHp;

        const dmgTier = this.metaTiers['meta_damage'] || 0;
        this.player.bonusDamageMult = 1.0 + (dmgTier * 0.1);

        const magnetTier = this.metaTiers['meta_magnet'] || 0;
        this.player.magnetRadius += magnetTier * 40;

        const spdTier = this.metaTiers['meta_speed'] || 0;
        this.player.bonusSpeedMult = 1.0 + (spdTier * 0.08);

        // Initialize Arsenal
        this.weaponManager.reset();
        this.weaponManager.addWeapon(ship.startWeapon);

        // Reset Run Variables
        this.gameTime = 0;
        this.wave = 1;
        this.waveTimer = 0;
        this.score = 0;
        this.kills = 0;
        this.level = 1;
        this.currentXp = 0;
        this.nextLevelXp = 40;
        this.runPlasma = 0;
        this.rerolls = 1;
        this.activeBoss = null;

        // Reset Pools
        for (let e of this.enemies) e.active = false;
        for (let d of this.drops) d.active = false;
        window.particleSystem.clear();

        // UI Transition
        document.getElementById('menu-start').classList.remove('active');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('boss-bar-container').classList.add('hidden');
        this.updateHUD();

        this.state = 'PLAYING';
        window.audioEngine.startMusic();
    }

    togglePause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            document.getElementById('pause-time').textContent = this.formatTime(this.gameTime);
            document.getElementById('pause-kills').textContent = this.kills;
            document.getElementById('pause-score').textContent = this.score.toLocaleString();
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
        window.audioEngine.stopMusic();
        document.querySelectorAll('.screen-overlay').forEach(el => el.classList.remove('active'));
        document.getElementById('modal-pause').classList.add('hidden');
        document.getElementById('modal-gameover').classList.add('hidden');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('menu-start').classList.add('active');
        this.saveProgress();
    }

    onPlayerDied() {
        this.state = 'GAMEOVER';
        window.audioEngine.stopMusic();
        window.audioEngine.playExplosion(3.0);

        // Check High Score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveProgress();
        }

        // Fill Game Over Screen
        document.getElementById('go-time').textContent = this.formatTime(this.gameTime);
        document.getElementById('go-kills').textContent = this.kills;
        document.getElementById('go-score').textContent = this.score.toLocaleString();
        document.getElementById('go-plasma').textContent = `+${this.runPlasma}`;

        document.getElementById('modal-gameover').classList.remove('hidden');
        document.getElementById('modal-gameover').classList.add('active');
    }

    // ==========================================
    // PROGRESSION & UPGRADES
    // ==========================================
    addExperience(amount) {
        this.currentXp += amount;
        this.score += amount * 5;

        if (this.currentXp >= this.nextLevelXp) {
            this.currentXp -= this.nextLevelXp;
            this.level++;
            this.nextLevelXp = Math.floor(this.nextLevelXp * 1.35) + 20;

            window.audioEngine.playLevelUp();
            this.triggerLevelUp();
        }
        this.updateHUD();
    }

    triggerLevelUp() {
        this.state = 'LEVEL_UP';
        this.showLevelUpModal();
    }

    showLevelUpModal() {
        const modal = document.getElementById('modal-levelup');
        const container = document.getElementById('upgrade-cards');
        container.innerHTML = '';

        // Pick 3 random upgrades from pool
        const shuffled = [...UPGRADE_POOL].sort(() => 0.5 - Math.random());
        const choices = shuffled.slice(0, 3);
        const dict = I18N[this.currentLang];

        choices.forEach(upg => {
            const card = document.createElement('div');
            card.className = `upgrade-card rarity-${upg.rarity}`;

            const name = this.currentLang === 'ar' ? upg.nameAr : upg.nameEn;
            const desc = this.currentLang === 'ar' ? upg.descAr : upg.descEn;
            const rarityText = dict[`rarity_${upg.rarity}`] || upg.rarity;

            let currentLevelBadge = '';
            if (upg.isWeapon) {
                const curLvl = this.weaponManager.getWeaponLevel(upg.weaponType);
                currentLevelBadge = `<span style="font-size: 0.75rem; color: var(--neon-cyan)">[${dict.lvl} ${curLvl + 1}]</span>`;
            }

            card.innerHTML = `
                <div class="card-rarity-tag">${rarityText}</div>
                <div class="card-icon-frame">${upg.icon}</div>
                <div class="card-title">${name} ${currentLevelBadge}</div>
                <div class="card-desc">${desc}</div>
            `;

            card.onclick = () => {
                window.audioEngine.playUiClick();
                this.selectUpgrade(upg);
            };

            container.appendChild(card);
        });

        document.getElementById('reroll-count').textContent = this.rerolls;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    selectUpgrade(upg) {
        if (upg.isWeapon) {
            this.weaponManager.addWeapon(upg.weaponType);
        } else if (upg.apply) {
            upg.apply(this.player);
        }

        document.getElementById('modal-levelup').classList.add('hidden');
        document.getElementById('modal-levelup').classList.remove('active');
        this.state = 'PLAYING';
        this.updateHUD();
    }

    pullAllDrops() {
        window.audioEngine.playLaser('missile');
        for (let d of this.drops) {
            if (d.active) {
                d.onPickup(this.player);
                d.active = false;
            }
        }
    }

    // ==========================================
    // META SHOP
    // ==========================================
    renderMetaShop() {
        const grid = document.getElementById('meta-upgrades-grid');
        grid.innerHTML = '';
        document.getElementById('shop-plasma-balance').textContent = this.savedPlasma.toLocaleString();

        META_UPGRADES.forEach(item => {
            const currentTier = this.metaTiers[item.id] || 0;
            const cost = Math.floor(item.baseCost * Math.pow(item.costMult, currentTier));
            const isMax = currentTier >= item.maxTier;
            const canAfford = this.savedPlasma >= cost && !isMax;

            const name = this.currentLang === 'ar' ? item.nameAr : item.nameEn;
            const desc = this.currentLang === 'ar' ? item.descAr : item.descEn;

            const card = document.createElement('div');
            card.className = 'shop-card';

            let pipsHtml = '';
            for (let i = 0; i < item.maxTier; i++) {
                pipsHtml += `<div class="tier-pip ${i < currentTier ? 'filled' : ''}"></div>`;
            }

            card.innerHTML = `
                <div style="font-size: 2rem;">${item.icon}</div>
                <h4 style="color: var(--neon-cyan); font-family: var(--font-heading);">${name}</h4>
                <div class="tier-indicator">${pipsHtml}</div>
                <p style="font-size: 0.8rem; color: #9bb; line-height: 1.4;">${desc}</p>
                <button class="btn-buy-upgrade" ${canAfford ? '' : 'disabled'}>
                    ${isMax ? 'MAX' : `💎 ${cost}`}
                </button>
            `;

            const btn = card.querySelector('button');
            if (canAfford) {
                btn.onclick = () => {
                    this.savedPlasma -= cost;
                    this.metaTiers[item.id] = currentTier + 1;
                    this.saveProgress();
                    window.audioEngine.playLevelUp();
                    this.renderMetaShop();
                };
            }

            grid.appendChild(card);
        });
    }

    // ==========================================
    // WAVE ENEMY SPAWNER
    // ==========================================
    updateWaves(dt) {
        this.gameTime += dt;
        this.waveTimer += dt;

        // Wave progression
        if (this.waveTimer >= this.waveDuration) {
            this.waveTimer = 0;
            this.wave++;
            window.audioEngine.playLevelUp();
            window.particleSystem.triggerScreenFlash('#00f3ff', 0.4);

            // Boss wave trigger at Wave 5 & Wave 10
            if (this.wave === 5) {
                this.spawnBoss('boss_hydra');
            } else if (this.wave === 10) {
                this.spawnBoss('boss_titan');
            }
        }

        // Spawn rhythm
        this.spawnTimer -= dt;
        const spawnDelay = Math.max(0.25, 1.2 - (this.wave * 0.08));

        if (this.spawnTimer <= 0) {
            this.spawnTimer = spawnDelay;

            // Pick enemy type based on wave
            let type = 'drone';
            const roll = Math.random();

            if (this.wave >= 4 && roll < 0.25) {
                type = 'sniper';
            } else if (this.wave >= 3 && roll < 0.45) {
                type = 'stalker';
            } else if (this.wave >= 2 && roll < 0.65) {
                type = 'bruiser';
            } else if (roll < 0.5) {
                type = 'swarm';
            }

            this.spawnEnemyAtEdge(type);
        }
    }

    spawnEnemyAtEdge(type) {
        let e = null;
        for (let enemy of this.enemies) {
            if (!enemy.active) { e = enemy; break; }
        }
        if (!e) return;

        // Spawn circle perimeter outside viewport
        const angle = Math.random() * Math.PI * 2;
        const dist = 750 + Math.random() * 150;
        const x = this.player.x + Math.cos(angle) * dist;
        const y = this.player.y + Math.sin(angle) * dist;

        const waveMult = 1 + (this.wave - 1) * 0.35;
        e.init(x, y, type, waveMult);
    }

    spawnBoss(bossType) {
        let b = null;
        for (let enemy of this.enemies) {
            if (!enemy.active) { b = enemy; break; }
        }
        if (!b) return;

        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * 700;
        const y = this.player.y + Math.sin(angle) * 700;

        b.init(x, y, bossType, 1 + this.wave * 0.2);
        this.activeBoss = b;

        window.audioEngine.setBossTheme(true);
        window.audioEngine.playUltimate();
        window.particleSystem.triggerScreenFlash('#ff0055', 0.7);

        // Show Boss HUD Bar
        const bossBar = document.getElementById('boss-bar-container');
        document.getElementById('boss-name').textContent = bossType === 'boss_titan' ? 'GIGA MECH TITAN' : 'CYBER HYDRA';
        bossBar.classList.remove('hidden');
    }

    // ==========================================
    // MAIN UPDATE LOOP
    // ==========================================
    update(dt) {
        if (this.state !== 'PLAYING') return;

        // 1. Player Input Vector
        let ix = 0;
        let iy = 0;
        if (this.keys['w'] || this.keys['arrowup']) iy -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) iy += 1;
        if (this.keys['a'] || this.keys['arrowleft']) ix -= 1;
        if (this.keys['d'] || this.keys['arrowright']) ix += 1;

        if (this.touchActive) {
            ix = this.touchVector.x;
            iy = this.touchVector.y;
        }

        const len = Math.hypot(ix, iy);
        if (len > 1) { ix /= len; iy /= len; }

        // 2. Aim Calculation (Touch Aim Stick vs Mouse vs Auto-Aim)
        let aimWorldX = this.camera.x + this.mousePos.x;
        let aimWorldY = this.camera.y + this.mousePos.y;

        if (this.touchAimActive && (Math.hypot(this.touchAimVector.x, this.touchAimVector.y) > 0.1)) {
            // Mobile right stick direction
            aimWorldX = this.player.x + this.touchAimVector.x * 250;
            aimWorldY = this.player.y + this.touchAimVector.y * 250;
        } else if (this.autoAim) {
            let closestDist = 550;
            let closestTarget = null;
            for (let e of this.enemies) {
                if (!e.active) continue;
                const d = Math.hypot(e.x - this.player.x, e.y - this.player.y);
                if (d < closestDist) {
                    closestDist = d;
                    closestTarget = e;
                }
            }
            if (closestTarget) {
                aimWorldX = closestTarget.x;
                aimWorldY = closestTarget.y;
            }
        }

        // Active trigger check: Player must actively shoot!
        this.isFiringActive = this.isMouseDown || this.keys['j'] || this.keys['f'] || this.keys['enter'] || (this.autoAim) || this.touchFiring;

        // 3. Update Player
        this.player.update(dt, { x: ix, y: iy }, aimWorldX, aimWorldY);

        if (this.player.hp <= 0) {
            this.onPlayerDied();
            return;
        }

        // 4. Update Weapons & Projectiles (Only fire if isFiringActive is true)
        this.weaponManager.update(dt, this.enemies, aimWorldX, aimWorldY, this.isFiringActive);

        // 5. Update Waves & Enemies
        this.updateWaves(dt);

        for (let e of this.enemies) {
            if (e.active) {
                e.update(dt, this.player, this.weaponManager);

                // Projectile hits enemy
                for (let p of this.weaponManager.projectiles) {
                    if (!p.active || p.isEnemy) continue;
                    const d = Math.hypot(e.x - p.x, e.y - p.y);
                    if (d < e.radius + p.radius) {
                        // Critical hit calculation
                        const isCrit = Math.random() < this.player.bonusCritChance;
                        const dmg = isCrit ? p.damage * 2.2 : p.damage;
                        e.takeDamage(dmg, isCrit);

                        p.pierce--;
                        if (p.pierce <= 0) {
                            if (p.isExplosive) p.explode();
                            p.active = false;
                        }
                    }
                }

                // Enemy died: spawn drops
                if (!e.active) {
                    this.kills++;
                    this.score += e.scoreValue;
                    this.spawnDrops(e.x, e.y, e.isBoss ? 40 : 10, e.isBoss);

                    if (e === this.activeBoss) {
                        this.activeBoss = null;
                        window.audioEngine.setBossTheme(false);
                        document.getElementById('boss-bar-container').classList.add('hidden');
                    }
                }
            }
        }

        // 6. Enemy Projectile hits player
        for (let p of this.weaponManager.projectiles) {
            if (p.active && p.isEnemy) {
                const d = Math.hypot(this.player.x - p.x, this.player.y - p.y);
                if (d < this.player.radius + p.radius) {
                    this.player.takeDamage(p.damage);
                    p.active = false;
                }
            }
        }

        // 7. Update Drops
        for (let d of this.drops) {
            if (d.active) d.update(dt, this.player);
        }

        // 8. Update Particles & Shake
        window.particleSystem.update(dt);

        // 9. Smooth Camera Follow
        const targetCamX = this.player.x - this.canvas.width / 2;
        const targetCamY = this.player.y - this.canvas.height / 2;
        this.camera.x += (targetCamX - this.camera.x) * 0.12;
        this.camera.y += (targetCamY - this.camera.y) * 0.12;

        this.updateHUD();
    }

    spawnDrops(x, y, value, isBoss = false) {
        // Spawn XP crystal
        let drop = null;
        for (let d of this.drops) {
            if (!d.active) { drop = d; break; }
        }
        if (drop) drop.init(x, y, 'xp', value);

        // Chance for plasma coin or health pack
        if (isBoss || Math.random() < 0.12) {
            let pDrop = null;
            for (let d of this.drops) {
                if (!d.active) { pDrop = d; break; }
            }
            if (pDrop) pDrop.init(x + 10, y + 10, isBoss ? 'magnet' : (Math.random() < 0.3 ? 'health' : 'plasma'), 15);
        }
    }

    // ==========================================
    // RENDER LOOP
    // ==========================================
    render() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Camera Shake application
        ctx.save();
        ctx.translate(-this.camera.x + window.particleSystem.shakeOffsetX, -this.camera.y + window.particleSystem.shakeOffsetY);

        // 1. Dynamic Cyber Grid Ground
        this.renderCyberGrid(ctx);

        // 2. Ambient background particles
        window.particleSystem.renderBackgroundStars(ctx, this.camera);

        // 3. Drops
        for (let d of this.drops) d.render(ctx);

        // 4. Weapons & Projectiles
        this.weaponManager.render(ctx);

        // 5. Enemies
        for (let e of this.enemies) e.render(ctx);

        // 6. Player Ship
        this.player.render(ctx);

        // 7. Targeting Reticle & Laser Sight
        this.renderTargetingReticle(ctx);

        // 8. Particles, shockwaves, damage numbers
        window.particleSystem.render(ctx);

        ctx.restore();

        // 9. Screen Flash Effect
        window.particleSystem.renderScreenFlash(ctx, w, h);
    }

    renderTargetingReticle(ctx) {
        if (this.state !== 'PLAYING') return;

        const aimX = this.camera.x + this.mousePos.x;
        const aimY = this.camera.y + this.mousePos.y;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        // 1. Draw glowing laser sight line from ship to cursor
        const distToMouse = Math.hypot(aimX - this.player.x, aimY - this.player.y);
        if (distToMouse > 25) {
            ctx.strokeStyle = this.isFiringActive ? 'rgba(255, 0, 85, 0.45)' : 'rgba(0, 243, 255, 0.25)';
            ctx.lineWidth = this.isFiringActive ? 2 : 1;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(this.player.x, this.player.y);
            ctx.lineTo(aimX, aimY);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // 2. Check if hovering over an enemy (Target Lock)
        let lockedEnemy = null;
        for (let e of this.enemies) {
            if (!e.active) continue;
            if (Math.hypot(e.x - aimX, e.y - aimY) < e.radius + 20) {
                lockedEnemy = e;
                break;
            }
        }

        const reticleColor = lockedEnemy ? '#ff0055' : (this.isFiringActive ? '#ffe600' : '#00f3ff');
        ctx.strokeStyle = reticleColor;
        ctx.fillStyle = reticleColor;
        ctx.shadowColor = reticleColor;
        ctx.shadowBlur = 10;

        // Draw animated reticle rings & crosshair ticks
        const pulse = Math.sin(performance.now() * 0.008) * 2;
        const r = (lockedEnemy ? 22 : 16) + pulse;

        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(aimX, aimY, r, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshair 4 ticks
        const tickLen = 6;
        ctx.beginPath();
        ctx.moveTo(aimX - r - tickLen, aimY); ctx.lineTo(aimX - r + 2, aimY);
        ctx.moveTo(aimX + r - 2, aimY); ctx.lineTo(aimX + r + tickLen, aimY);
        ctx.moveTo(aimX, aimY - r - tickLen); ctx.lineTo(aimX, aimY - r + 2);
        ctx.moveTo(aimX, aimY + r - 2); ctx.lineTo(aimX, aimY + r + tickLen);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(aimX, aimY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    renderCyberGrid(ctx) {
        ctx.save();
        const gridSize = 80;
        const startX = Math.floor((this.camera.x - 200) / gridSize) * gridSize;
        const endX = startX + this.canvas.width + 400;
        const startY = Math.floor((this.camera.y - 200) / gridSize) * gridSize;
        const endY = startY + this.canvas.height + 400;

        ctx.strokeStyle = 'rgba(0, 243, 255, 0.07)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();

        ctx.restore();
    }

    // ==========================================
    // HUD UPDATE
    // ==========================================
    updateHUD() {
        document.getElementById('hud-score').textContent = this.score.toLocaleString();
        document.getElementById('hud-level').textContent = this.level;
        document.getElementById('hud-wave').textContent = this.wave;
        document.getElementById('hud-timer').textContent = this.formatTime(this.gameTime);
        document.getElementById('hud-kills').textContent = this.kills;

        // XP Bar
        const xpPct = Math.min(100, (this.currentXp / this.nextLevelXp) * 100);
        document.getElementById('hud-xp-fill').style.width = `${xpPct}%`;
        document.getElementById('hud-xp-text').textContent = `${this.currentXp} / ${this.nextLevelXp}`;

        // HP Bar
        const hpPct = Math.max(0, Math.min(100, (this.player.hp / this.player.maxHp) * 100));
        document.getElementById('hud-hp-fill').style.width = `${hpPct}%`;
        document.getElementById('hud-hp-text').textContent = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`;

        // Abilities Cooldowns
        const dashCdPct = Math.max(0, (1 - (this.player.dashTimer / this.player.dashCooldown)) * 100);
        document.getElementById('dash-cd-ring').style.width = `${dashCdPct}%`;
        document.getElementById('badge-dash').classList.toggle('ready', this.player.dashTimer <= 0);

        const ultCdPct = Math.min(100, (this.player.ultCharge / this.player.ultMaxCharge) * 100);
        document.getElementById('ult-cd-ring').style.width = `${ultCdPct}%`;
        document.getElementById('badge-ultimate').classList.toggle('ready', this.player.ultCharge >= this.player.ultMaxCharge);

        // Boss Bar update
        if (this.activeBoss && this.activeBoss.active) {
            const bPct = Math.max(0, Math.min(100, (this.activeBoss.hp / this.activeBoss.maxHp) * 100));
            document.getElementById('boss-bar-fill').style.width = `${bPct}%`;
            document.getElementById('boss-hp-pct').textContent = `${Math.ceil(bPct)}%`;
        }

        // Active Weapons Row
        const weaponRow = document.getElementById('hud-weapons');
        weaponRow.innerHTML = '';
        for (let type in this.weaponManager.weapons) {
            const w = this.weaponManager.weapons[type];
            const slot = document.createElement('div');
            slot.className = 'weapon-slot-pill';
            const icon = type === 'blaster' ? '💥' : (type === 'missiles' ? '🚀' : (type === 'orbital' ? '🪚' : (type === 'tesla' ? '⚡' : '🌀')));
            slot.innerHTML = `<span class="slot-icon">${icon}</span><span class="slot-lvl">${w.level}</span>`;
            weaponRow.appendChild(slot);
        }
    }

    formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // ==========================================
    // MAIN LOOP
    // ==========================================
    gameLoop(now) {
        const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000);
        this.lastFrameTime = now;

        this.update(dt);
        this.render();

        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

// Instantiate Game on load
window.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new CyberSurvivorGame();
});
