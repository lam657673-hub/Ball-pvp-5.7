import {
  Entity,
  Ball,
  GameSetupOptions,
  GlitchTrail,
  ActiveCrack,
  ActiveFissure,
  Particle,
  ExpandingRing,
  WeaponDef,
  ComboQTEState,
  ComboWallCrash,
  ShadowClone,
  QTEKey,
  SoTanState,
  BeastActiveData,
  ActiveProjectile,
  HolySlashEffect,
  BaThuongDragonWave,
  BaThuongDrillProjectile,
  BaThuongSkillKey,
  NhatDieuToiCaoState,
  NhaiGiacLuuTinhTramAnimation,
  UltraLaserState,
  MatchBattleStats
} from './types';
import {
  WEAPON_DEFS,
  elObj,
  elObjRandom,
  elLabel,
  randWeapon,
  getDmgMultiplier,
  lightningBoltDmg,
  dealDamage,
  getRoleHpBonus,
  getRoleIncomingMultiplier,
  getRoleDmgMultiplier,
  getRoleSpeedMultiplier,
  applyAdminCrit,
  computeCooldown,
  spearCooldownMs,
  spearChargeMs,
  MACE_CHARGE_MS,
  MACE_COOLDOWN_MS,
  MACE_KNOCKBACK_SPEED,
  MACE_WALL_DMG,
  MACE_WALL_MAX_HITS,
  ULTRA_LUNGE_SPEED,
  ULTRA_LUNGE_TIMEOUT,
  LUNGE_TRIGGER_COUNT,
  MINIGUN_LIGHTNING_EVERY,
  RITUAL_RING_DURATION,
  RITUAL_RING_DMG,
  RITUAL_RING_HIT_RADIUS,
  RITUAL_RING_HIT_COOLDOWN,
  RITUAL_FIRE_DURATION,
  RITUAL_FIRE_TICK_MS,
  RITUAL_FIRE_DMG_PER_TICK,
  RITUAL_FIRE_BASE_HALF_WIDTH,
  RITUAL_FIRE_WIDEN_RATE,
  RITUAL_EXPLOSION_DMG,
  RITUAL_ROTATE_DIRS,
  ARENA_CORNERS,
  CRACK_DMG_PER_TICK,
  CRACK_TICK_MS,
  CRACK_LIFETIME_MS,
  CRACK_MIN_HALF,
  CRACK_MAX_HALF,
  ADMIN_DMG_MUL,
  ADMIN_BUFF_DURATION_MS,
  ADMIN_BUFF_DMG_MUL,
  ADMIN_SPEED_DURATION_MS,
  ADMIN_HEAL_FRAC,
  ADMIN_COMMANDS,
  ADMIN_SKILL_INTERVAL_MS,
  ADMIN_SKILL_FREEZE_MS,
  WW_DAY_DURATION_MS,
  WW_NIGHT_DURATION_MS,
  WW_DAY_HP_FRAC,
  WW_NIGHT_HP_FRAC,
  WW_DAY_SPEED,
  WW_NIGHT_SPEED,
  WW_NIGHT_DMG_MUL,
  GLITCH_TRAIL_DURATION,
  GLITCH_ENEMY_DMG_PER_TICK,
  GLITCH_ENEMY_TICK_MS,
  GLITCH_SELF_HEAL_PER_TICK,
  GLITCH_SELF_TICK_MS,
  GLITCH_STUN_CHANCE,
  GLITCH_STUN_DURATION,
  GLITCH_TRAIL_RADIUS,
  GLITCH_HACK_COOLDOWN,
  GLITCH_HACK_HEAL_FRAC,
  GLITCH_PROJ_DMG,
  GLITCH_PROJ_STUN_CHANCE,
  GLITCH_COMBO_DASH_SPEED,
  GLITCH_COMBO_HIT_DMG,
  GLITCH_COMBO_HIT_INTERVAL,
  GLITCH_COMBO_EXTEND_CHANCE,
  GLITCH_HAND_SLAM_DMG,
  GLITCH_HAND_KNOCKBACK,
  SOTAN_SKILL_INTERVAL_MS,
  SOTAN_CHARGE_DURATION_MS,
  SOTAN_DIRECT_DMG,
  SOTAN_DOT_DMG_PER_TICK,
  SOTAN_DOT_TICK_MS,
  SOTAN_FISSURE_LIFETIME_MS,
  SOTAN_HUYENVU_IMMUNE_MS,
  SOTAN_BACHHO_BONUS_FRAC,
  SOTAN_CHUTUOC_PERCENT_HP,
  SOTAN_BEAST_CHANCE,
  SOTAN_DIEU_SLASH_COUNT,
  SOTAN_DIEU_SLASH_DMG,
  SOTAN_DIEU_SLASH_INTERVAL_MS,
  BATHUONG_COST,
  BATHUONG_SKILL_INTERVAL_MS,
  LONG_HON_DOAN_HAI_COOLDOWN_MS,
  BATHUONG_LONG_NGANG_DAU_DMG,
  BATHUONG_DU_LONG_DMG,
  BATHUONG_DU_LONG_WAVES,
  BATHUONG_NGOA_LONG_DRILL_DMG,
  BATHUONG_NGOA_LONG_DRILL_TICK_MS,
  BATHUONG_NGOA_LONG_SHOT_DMG,
  BATHUONG_TIEM_LONG_DMG,
  BATHUONG_LONG_NHAN_DMG_MUL,
  BATHUONG_LONG_NHAN_SPEED_MUL,
  BATHUONG_LONG_NHAN_HP_LOSS,
  BATHUONG_LONG_NHAN_HP_TICK_MS,
  LIUBEI_COST,
  LIUBEI_NO_SONGKIEM_HP_MUL,
  LIUBEI_NO_SONGKIEM_DMG_MUL,
  LIUBEI_SONGKIEM_HP_MUL,
  LIUBEI_SONGKIEM_DMG_MUL,
  LIUBEI_SKILL_INTERVAL_MS,
  LIUBEI_SLASH_FIRE_DMG,
  LIUBEI_SLASH_ICE_DMG,
  LIUBEI_COMBO_FINISH_DMG,
  SONGKIEM_SLASH_SPEED,
  SONGKIEM_SLASH_RANGE,
  SONGKIEM_COMBO_COOLDOWN,
  SONGKIEM_COMBO_HITS,
  SONGKIEM_COMBO_HIT_DMG,
  SONGKIEM_CONTINUE_CHANCE,
  SONGKIEM_DASH_SPEED,
  SONGKIEM_HIT_INTERVAL,
  SONGKIEM_NHATQUANG_COOLDOWN,
  SONGKIEM_NHATQUANG_CHARGE_MS,
  SONGKIEM_NHATQUANG_DMG,
  SONGKIEM_NHATQUANG_SPEED,
  SONGKIEM_NHATQUANG_RADIUS,
  CANCAU_HOOK_COOLDOWN_MS,
  CANCAU_HOOK_DMG,
  CANCAU_SMASH_DMG,
  CANCAU_HOOK_SPEED,
  CANCAU_PULL_SPEED,
  NHAT_DIEU_HOANG_KIM_DMG,
  NHAT_DIEU_HOANG_KIM_FISSURE_DMG,
  NHAT_DIEU_HOANG_KIM_COOLDOWN_MS,
  NHAT_DIEU_HOANG_KIM_CHARGE_MS,
  NHAT_DIEU_TOI_CAO_DMG,
  NHAT_DIEU_TOI_CAO_FISSURE_DMG,
  NHAT_DIEU_TOI_CAO_COOLDOWN_MS,
  NHAT_DIEU_TOI_CAO_CHARGE_MS,
  PHI_THIEN_VO_CUC_COOLDOWN_MS,
  PHI_THIEN_VO_CUC_DURATION_MS,
  PHI_THIEN_VO_CUC_TICK_MS,
  PHI_THIEN_VO_CUC_TICK_DMG,
  TOAN_THIEN_COOLDOWN_MS,
  TOAN_THIEN_HOMING_SPEED,
  TOAN_THIEN_PIN_DURATION_MS,
  TOAN_THIEN_PIN_TICK_MS,
  TOAN_THIEN_PIN_TICK_DMG,
  THE_OWNER_DMG_MUL,
  THE_OWNER_INCOMING_MUL,
  THE_OWNER_OMNI_DURATION_MS,
  THE_OWNER_OMNI_COOLDOWN_MS,
  TD_GATE_MAX_HP,
  TD_MOBS_PER_SEC,
  TD_COIN_PER_KILL,
  TD_MOB_BASE_HP,
  TD_MOB_BASE_SPEED,
  loadCoins,
  saveCoins,
  DAYNIT_COOLDOWN_MS,
  DAYNIT_AOE_RANGE,
  THIEN_HA_HP_BONUS,
  THIEN_HA_DMG_MUL,
  THIEN_HA_SPEED_MUL,
  TRAN_QUOC_SWORD_PERCENT_HP,
  DONG_NGHIEP_DMG_MUL,
  DONG_NGHIEP_INCOMING_MUL,
  DONG_NGHIEP_DEF_REDUCTION,
  DONG_NGHIEP_SPEED_MUL,
  DONG_NGHIEP_HEAL_FRAC,
  DONG_NGHIEP_HEAL_PCT,
  DONG_NGHIEP_SHIELD_MS,
  TRIEUVAN_HP_BONUS,
  TRIEUVAN_DMG_MUL,
  THAN_TRIEUVAN_HP_BONUS,
  THAN_TRIEUVAN_DMG_MUL,
  THAN_TRIEUVAN_LIEN_KICH,
  THAN_TRIEUVAN_TRUY_KICH,
  THAN_LIUBEI_DMG_MUL,
  NHAI_GIAC_SPIN_HITS,
  NHAI_GIAC_SPIN_DMG,
  NHAI_GIAC_SPEAR_DROP_DMG,
  NHAI_GIAC_SPEAR_EXPLODE_DMG,
  NHAI_GIAC_FINAL_THRUST_DMG,
  NHAI_GIAC_COOLDOWN_MS,
  TRIEU_DINH_HEAL_PCT,
  TRIEU_DINH_COOLDOWN_MS,
  TUYET_THE_HP_BONUS,
  TUYET_THE_DMG_MUL,
  TUYET_THE_SPEED_MUL,
  TUYET_THE_LIEN_KICH,
  TUYET_THE_TRUY_KICH,
  SONG_THAN_HP_BONUS,
  SONG_THAN_DMG_MUL,
  SONG_THAN_SPEED_MUL,
  SONG_THAN_LIEN_KICH,
  SONG_THAN_TRUY_KICH,
  THAN_SONGKIEM_SKILL_DMG_MUL,
  THE_OWNER_7B_HP,
  THE_OWNER_7B_DMG,
  THE_OWNER_7B_DMG_MUL,
  THE_OWNER_7B_MELT_PERCENT,
  THE_OWNER_7B_MELT_INTERVAL_SEC,
  THE_OWNER_7B_DUMMY_REWARD,
  loadTrieuVanWins,
  saveTrieuVanWins,
  loadLuuBeiWins,
  saveLuuBeiWins,
  loadRailgunMirrorWins,
  saveRailgunMirrorWins,
  saveUnlock,
  getStellarHpMultiplier
} from './constants';
import {
  drawWeaponIcon,
  drawRuneRing,
  drawTaiji,
  drawFireCrack,
  drawSoTanGoldenRings,
  drawNhatDieuToiCaoRings,
  drawMassiveFissure,
  drawStraightFissure,
  drawBeastSpirit,
  drawHuyenVuShield,
  drawArrow,
  drawCrossbowBolt,
  drawSongKiemSlash,
  drawSongKiemNhatQuang,
  drawSongKiemChargeAura,
  drawHolySlash,
  drawLienHoanKichSlashFx,
  drawDragonHumanAvatar,
  drawFishingHookAndLine,
  drawQinglongHead,
  drawDragonWave,
  drawDrillVortex,
  drawDrillProjectile,
  drawLuuBeiDualBladeSlash,
  drawSoTanDieuDomain,
  drawSoTanDieuClones,
  drawMegaSlashLine,
  drawHacLongFollower,
  drawLongHonDoanHaiCutscene,
  drawLongHonFireOrb,
  drawLongHonFirePillar,
  drawSandboxDummyInfo,
  drawPhiThienVoCucTornado,
  drawToanThienDrill,
  drawTheOwnerOrbitingWeapons,
  drawCodeArenaDomain,
  drawDynamicSlash,
  drawTowerDefenseFortress,
  drawTranQuocChiKiem,
  drawDayNitWhipAoe,
  drawThienHaSandAura,
  drawDongNghiepColleagueAura,
  drawTuyetTheAnhHungAura,
  drawSongThanGiangTheAura,
  drawNhaiGiacAnimationGraphics,
  draw4DTesseract,
  draw3DArenaGrid,
  draw3DVolumetricSphere,
  drawStellarCutscene,
  drawStellarOrbitalBeam,
  drawStellarTsarExplosion,
  drawStellarTesseractObject,
  drawStellarHalleyExplosion,
  drawStellarQuasarLaser,
  drawStellarEventHorizonVortex,
  drawStellarNeutronImpact,
  drawStellarSunExplosion,
  drawStellarBigBangExplosion
} from './graphics';
import {
  SoTanDieuState,
  LongHonDoanHaiState,
  LongHonDoanHaiFireOrb,
  LongHonDoanHaiFirePillar,
  NhatDieuHoangKimState,
  PhiThienVoCucDieuState,
  ToanThienThauChiDieuState,
  TheOwnerState,
  TowerDefenseState,
  TowerDefenseMob,
  TranQuocSwordState,
  StellarCutsceneState,
  StellarOrbitalBeamState,
  StellarGungnirDoTState,
  StellarSevenStarState,
  StellarTesseractStrikeState,
  StellarQuasarState,
  StellarHalleyFx,
  StellarTheSunFx,
  StellarEventHorizonState,
  StellarNeutronStarState,
  StellarBigBangFx,
  StellarSkillKey
} from './types';
import { sound } from './sound';

function oppositeCornerIndex(i: number): number {
  return 3 - i;
}

function crackHalfWidthAt(t: number): number {
  return CRACK_MIN_HALF + (CRACK_MAX_HALF - CRACK_MIN_HALF) * (1 - Math.abs(t - 0.5) * 2);
}

export class BallGameEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public width = 500;
  public height = 500;

  public isRunning = false;
  public battleOver = false;
  public result: 'win' | 'lose' | 'draw' | null = null;
  public logMessage = '';

  public p!: Entity;
  public e!: Entity;
  public playerBall!: Ball;
  public enemyBall!: Ball;

  public dmgMul = 1;
  public glitchTrails: GlitchTrail[] = [];
  public activeCracks: ActiveCrack[] = [];
  public activeFissures: ActiveFissure[] = [];
  public particles: Particle[] = [];
  public expandingRings: ExpandingRing[] = [];
  public projectiles: ActiveProjectile[] = [];
  public holySlashes: HolySlashEffect[] = [];
  public dragonWaves: BaThuongDragonWave[] = [];
  public drillProjectiles: BaThuongDrillProjectile[] = [];
  public thrownWeapons: {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    dmg: number;
    rot: number;
    ownerIsPlayer: boolean;
    createdAt: number;
  }[] = [];
  public dynamicSlashes: {
    x: number;
    y: number;
    angle: number;
    radius: number;
    color: string;
    glowColor: string;
    type: 'crescent' | 'cross' | 'code_cleave' | 'heavy_cleave';
    createdAt: number;
    duration: number;
  }[] = [];
  public luuBeiSlashes: {
    x: number;
    y: number;
    type: 'fire' | 'ice' | 'finish';
    startTime: number;
    duration: number;
    angle: number;
  }[] = [];
  public qinglongManifestation: {
    x: number;
    y: number;
    scale: number;
    alpha: number;
    startTime: number;
    duration: number;
  } | null = null;

  public laserGfx: {
    playerActive: boolean;
    playerX1: number;
    playerY1: number;
    playerX2: number;
    playerY2: number;
    enemyActive: boolean;
    enemyX1: number;
    enemyY1: number;
    enemyX2: number;
    enemyY2: number;
  } | null = null;
  public railgunClash: {
    active: boolean;
    orbX: number;
    orbY: number;
    orbRadius: number;
    startedAt: number;
    targetSide: 'player' | 'enemy';
  } | null = null;
  public minigunGfx: { active: boolean; x1: number; y1: number; x2: number; y2: number; isHeat: boolean } | null = null;
  public comboQTE: ComboQTEState | null = null;
  public comboWallCrash: ComboWallCrash | null = null;
  public shadowClones: ShadowClone[] = [];
  public screenShake = 0;
  public lastDamageTakenAt = 0;

  // Upgraded Railgun: Ultra Laser state
  public ultraLaser: UltraLaserState | null = null;

  // Post-battle statistics tracking
  public playerDamageDealt = 0;
  public enemyDamageDealt = 0;
  public playerSkillsUsed = 0;
  public enemySkillsUsed = 0;
  public playerHitsLanded = 0;
  public playerAttacksAttempted = 0;
  public enemyHitsLanded = 0;
  public enemyAttacksAttempted = 0;
  public matchStartTime = 0;
  public battleStats: MatchBattleStats | null = null;
  public onBattleOver?: (stats: MatchBattleStats) => void;

  // Sandbox Mode state
  public isSandbox = false;
  public sandboxTotalDamage = 0;
  public sandboxDps = 0;
  public sandboxDmgHistory: { time: number; dmg: number }[] = [];
  public sandboxKeysPressed: Set<string> = new Set();
  public sandboxManualAttackTriggered = false;

  // 3D / 4D Dimension Mode state (Default to 2D for 0 lag and maximum 60 FPS)
  public dimensionMode: '2d' | '3d' | '4d' = (() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('preferred_dimension_mode');
      if (saved === '2d' || saved === '3d' || saved === '4d') return saved;
    }
    return '2d';
  })();
  public onDimensionChange?: (mode: '2d' | '3d' | '4d') => void;

  // Sở Tân Điếu, Nhất Điếu Khai Thiên Môn Tối Cao & Bá Thường Long Hồn Đoạn Hải states
  public soTanDieu: SoTanDieuState | null = null;
  public nhatDieuToiCao: NhatDieuToiCaoState | null = null;
  public nhatDieuToiCaoNextAt = 0;
  public nhatDieuHoangKim: NhatDieuHoangKimState | null = null;
  public nhatDieuHoangKimNextAt = 0;
  public phiThienVoCuc: PhiThienVoCucDieuState | null = null;
  public phiThienVoCucNextAt = 0;
  public toanThienThauChi: ToanThienThauChiDieuState | null = null;
  public toanThienThauChiNextAt = 0;
  public theOwner: TheOwnerState = {
    omniWeaponActive: false,
    omniWeaponUntil: 0,
    lastOmniAttackAt: 0,
    weaponsOrbitRot: 0,
    godModeActive: false
  };
  public towerDefense: TowerDefenseState = {
    active: false,
    wave: 1,
    gateHp: TD_GATE_MAX_HP,
    maxGateHp: TD_GATE_MAX_HP,
    mobs: [],
    lastSpawnAt: 0,
    spawnIntervalMs: 1000,
    mobsKilled: 0,
    totalCoinsEarned: 0,
    waveStartTime: 0,
    isGameOver: false,
    isVictory: false
  };
  public floatingTexts: {
    text: string;
    x: number;
    y: number;
    color: string;
    createdAt: number;
    expiresAt: number;
  }[] = [];
  public onCoinsGained?: (amount: number) => void;
  public skillCooldowns: Map<number, number> = new Map();
  public onSkillTriggered?: (slot: number, durationMs: number) => void;
  public onResetSkillCooldowns?: () => void;
  public longHonDoanHai: LongHonDoanHaiState | null = null;
  public longHonDoanHaiNextAt = 0;
  public hacLongTrail: { x: number; y: number }[] = [];
  public longHonFireOrbs: LongHonDoanHaiFireOrb[] = [];
  public longHonFirePillars: LongHonDoanHaiFirePillar[] = [];
  public nhaiGiacLuuTinhTram: NhaiGiacLuuTinhTramAnimation | null = null;
  public nhaiGiacNextAt = 0;
  public megaSlashes: {
    x: number;
    y: number;
    angle: number;
    length: number;
    width: number;
    color: string;
    createdAt: number;
    expiresAt: number;
  }[] = [];
  public timeStopUntil = 0;
  public timeStopMessage: string | null = null;

  // Stellar Remote States
  public stellarCutscene: StellarCutsceneState | null = null;
  public stellarOrbitalBeam: StellarOrbitalBeamState | null = null;
  public stellarGungnirDoT: StellarGungnirDoTState | null = null;
  public stellarSevenStar: StellarSevenStarState | null = null;
  public stellarTesseract: StellarTesseractStrikeState | null = null;
  public stellarTsarFx: { x: number; y: number; startTime: number; duration: number } | null = null;
  public stellarHalleyFx: StellarHalleyFx | null = null;
  public stellarQuasar: StellarQuasarState | null = null;
  public stellarEventHorizon: StellarEventHorizonState | null = null;
  public stellarNeutronStar: StellarNeutronStarState | null = null;
  public stellarSunFx: StellarTheSunFx | null = null;
  public stellarBigBangFx: StellarBigBangFx | null = null;
  public stellarMenuOpen = false;
  public onStellarMenuToggle?: (open: boolean) => void;

  // 2v2 Mode & Synergy states
  public is2v2 = false;
  public p2!: Entity;
  public playerBall2!: Ball;
  public e2!: Entity;
  public enemyBall2!: Ball;
  public blueSynergyThienHa = false;
  public redSynergyThienHa = false;
  public blueSynergyDongNghiep = false;
  public redSynergyDongNghiep = false;
  public tranQuocSword: TranQuocSwordState | null = null;
  public dayNitAoeFx: { x: number; y: number; radius: number; startTime: number; duration: number }[] = [];

  public now = 0;
  private animFrameId: number | null = null;
  public onStateChange?: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Cannot get 2d context');
    this.ctx = context;
  }

  public initGame(options: GameSetupOptions) {
    this.now = performance.now();
    this.lastDamageTakenAt = this.now;
    this.battleOver = false;
    this.result = null;
    this.ultraLaser = null;
    this.playerDamageDealt = 0;
    this.enemyDamageDealt = 0;
    this.playerSkillsUsed = 0;
    this.enemySkillsUsed = 0;
    this.playerHitsLanded = 0;
    this.playerAttacksAttempted = 0;
    this.enemyHitsLanded = 0;
    this.enemyAttacksAttempted = 0;
    this.matchStartTime = this.now;
    this.battleStats = null;
    this.glitchTrails = [];
    this.activeCracks = [];
    this.activeFissures = [];
    this.particles = [];
    this.expandingRings = [];
    this.projectiles = [];
    this.holySlashes = [];
    this.dynamicSlashes = [];
    this.skillCooldowns.clear();
    if (this.onResetSkillCooldowns) {
      this.onResetSkillCooldowns();
    }
    this.dragonWaves = [];
    this.drillProjectiles = [];
    this.thrownWeapons = [];
    this.luuBeiSlashes = [];
    this.qinglongManifestation = null;
    this.laserGfx = null;
    this.railgunClash = null;
    this.minigunGfx = null;
    this.comboQTE = null;
    this.comboWallCrash = null;
    this.shadowClones = [];
    this.soTanDieu = null;
    this.nhatDieuToiCao = null;
    this.nhatDieuToiCaoNextAt = 0;
    this.nhatDieuHoangKim = null;
    this.nhatDieuHoangKimNextAt = 0;
    this.phiThienVoCuc = null;
    this.phiThienVoCucNextAt = 0;
    this.toanThienThauChi = null;
    this.toanThienThauChiNextAt = 0;
    this.theOwner = {
      omniWeaponActive: false,
      omniWeaponUntil: 0,
      lastOmniAttackAt: 0,
      weaponsOrbitRot: 0,
      godModeActive: options.playerRole === 'the_owner' || options.playerRole === 'the_owner_7b'
    };
    const isTD = options.selectedMap === 'tower_defense' || !!options.isTowerDefense;
    this.towerDefense = {
      active: isTD,
      wave: 1,
      gateHp: TD_GATE_MAX_HP,
      maxGateHp: TD_GATE_MAX_HP,
      mobs: [],
      lastSpawnAt: this.now,
      spawnIntervalMs: 1000,
      mobsKilled: 0,
      totalCoinsEarned: 0,
      waveStartTime: this.now,
      isGameOver: false,
      isVictory: false
    };
    this.floatingTexts = [];
    this.longHonDoanHai = null;
    this.longHonDoanHaiNextAt = 0;
    this.hacLongTrail = [];
    this.longHonFireOrbs = [];
    this.longHonFirePillars = [];
    this.megaSlashes = [];
    this.timeStopUntil = 0;
    this.timeStopMessage = null;
    this.stellarCutscene = null;
    this.stellarOrbitalBeam = null;
    this.stellarGungnirDoT = null;
    this.stellarSevenStar = null;
    this.stellarTesseract = null;
    this.stellarTsarFx = null;
    this.stellarHalleyFx = null;
    this.stellarQuasar = null;
    this.stellarEventHorizon = null;
    this.stellarNeutronStar = null;
    this.stellarSunFx = null;
    this.stellarBigBangFx = null;
    this.stellarMenuOpen = false;

    this.isSandbox = !!options.isSandbox;
    this.sandboxTotalDamage = 0;
    this.sandboxDps = 0;
    this.sandboxDmgHistory = [];
    this.sandboxKeysPressed.clear();
    this.sandboxManualAttackTriggered = false;

    const startHp = options.playerHp || 500;
    this.dmgMul = getDmgMultiplier(startHp);

    const playerWep = WEAPON_DEFS[options.playerWeaponKey] || WEAPON_DEFS.kiem;
    const enemyWepKey = options.enemyWeaponKey === 'random' ? randWeapon().key : options.enemyWeaponKey;
    const enemyWep = WEAPON_DEFS[enemyWepKey] || WEAPON_DEFS.kiem;

    const pElement = options.playerElementKey ? elObj(options.playerElementKey) : null;
    let eElement: Entity['element'] = null;
    if (options.enemyElementKey === 'random') {
      eElement = elObjRandom();
    } else if (options.enemyElementKey) {
      eElement = elObj(options.enemyElementKey);
    } else if (options.enemyElementKey === null) {
      eElement = null;
    } else {
      eElement = Math.random() < 0.5 ? elObjRandom() : null;
    }

    const enemyRole = options.enemyRole || null;

    this.is2v2 = !!options.is2v2;
    this.blueSynergyThienHa = false;
    this.redSynergyThienHa = false;
    this.blueSynergyDongNghiep = false;
    this.redSynergyDongNghiep = false;
    this.tranQuocSword = null;
    this.dayNitAoeFx = [];

    this.p = this.makeEntity(playerWep, startHp, pElement, options.playerRole);
    this.p.id = 'p1';
    this.p.name = 'Bạn 1 (Xanh Lam)';
    this.p.team = 'blue';

    this.e = this.makeEntity(enemyWep, this.isSandbox ? 999999999 : startHp, eElement, enemyRole);
    this.e.id = 'e1';
    this.e.name = 'Địch 1 (Đỏ)';
    this.e.team = 'red';

    if (this.is2v2) {
      const p2WepKey = options.player2WeaponKey || 'cancau';
      const p2Wep = WEAPON_DEFS[p2WepKey] || WEAPON_DEFS.cancau;
      const p2Element = options.player2ElementKey ? elObj(options.player2ElementKey) : null;
      const p2Role = options.player2Role || 'bathuong';

      this.p2 = this.makeEntity(p2Wep, startHp, p2Element, p2Role);
      this.p2.id = 'p2';
      this.p2.name = 'Bạn 2 (Xanh Lá)';
      this.p2.team = 'blue';

      const e2WepKey = options.enemy2WeaponKey === 'random' ? randWeapon().key : (options.enemy2WeaponKey || 'kiem');
      const e2Wep = WEAPON_DEFS[e2WepKey] || WEAPON_DEFS.kiem;
      let e2Element: Entity['element'] = null;
      if (options.enemy2ElementKey === 'random') {
        e2Element = elObjRandom();
      } else if (options.enemy2ElementKey) {
        e2Element = elObj(options.enemy2ElementKey);
      }
      const e2Role = options.enemy2Role || null;

      this.e2 = this.makeEntity(e2Wep, startHp, e2Element, e2Role);
      this.e2.id = 'e2';
      this.e2.name = 'Địch 2 (Vàng)';
      this.e2.team = 'red';

      // Ball positions in 2v2
      this.playerBall = {
        x: 160,
        y: 200,
        vx: 84,
        vy: 74,
        radius: 18,
        color: '#378add',
        borderColor: '#1a3a5c',
        id: 'p1',
        name: 'Bạn 1 (Xanh Lam)',
        team: 'blue'
      };

      this.playerBall2 = {
        x: 160,
        y: 310,
        vx: 74,
        vy: -84,
        radius: 18,
        color: '#22c55e',
        borderColor: '#14532d',
        id: 'p2',
        name: 'Bạn 2 (Xanh Lá)',
        team: 'blue'
      };

      this.enemyBall = {
        x: 340,
        y: 200,
        vx: -84,
        vy: -74,
        radius: 18,
        color: '#e24b4a',
        borderColor: '#7a1f14',
        id: 'e1',
        name: 'Địch 1 (Đỏ)',
        team: 'red'
      };

      this.enemyBall2 = {
        x: 340,
        y: 310,
        vx: -74,
        vy: 84,
        radius: 18,
        color: '#eab308',
        borderColor: '#713f12',
        id: 'e2',
        name: 'Địch 2 (Vàng)',
        team: 'red'
      };

      // Check Blue Team Synergies
      const hasBlueThienHa =
        (this.p.role === 'sotan' && this.p.weapon.key === 'cancau' && this.p2.role === 'bathuong' && this.p2.weapon.key === 'cancau') ||
        (this.p2.role === 'sotan' && this.p2.weapon.key === 'cancau' && this.p.role === 'bathuong' && this.p.weapon.key === 'cancau');

      if (hasBlueThienHa) {
        this.blueSynergyThienHa = true;
        this.p.synergyThienHa = true;
        this.p2.synergyThienHa = true;
        this.p.maxHp = Math.round(this.p.maxHp * (1 + THIEN_HA_HP_BONUS));
        this.p.hp = this.p.maxHp;
        this.p2.maxHp = Math.round(this.p2.maxHp * (1 + THIEN_HA_HP_BONUS));
        this.p2.hp = this.p2.maxHp;
        this.floatingTexts.push({
          text: '🌊 THIÊN HẠ VẠN CỔ HOÀNH HẢI SA TRƯỜNG KÍCH HOẠT! ✨',
          x: 250,
          y: 70,
          color: '#facc15',
          createdAt: this.now,
          expiresAt: this.now + 4000
        });
      }

      const hasBlueDongNghiep =
        (this.p.role === 'admin' && this.p2.role === 'the_owner') ||
        (this.p2.role === 'admin' && this.p.role === 'the_owner');

      if (hasBlueDongNghiep) {
        this.blueSynergyDongNghiep = true;
        this.p.synergyDongNghiep = true;
        this.p2.synergyDongNghiep = true;
        this.floatingTexts.push({
          text: '👑 BUFF ĐỒNG NGHIỆP: ADMIN & THE OWNER CÙNG XUẤT TRẬN! 🤝',
          x: 250,
          y: 95,
          color: '#10b981',
          createdAt: this.now,
          expiresAt: this.now + 4000
        });
      }

      // Check Song Thần Giáng Thế (Thần-Lưu Bị + Thần-Triệu Vân)
      const hasBlueSongThan =
        (this.p.role === 'than_liubei' && this.p2.role === 'than_trieuvan') ||
        (this.p2.role === 'than_liubei' && this.p.role === 'than_trieuvan');

      if (hasBlueSongThan) {
        this.p.synergySongThanGiangThe = true;
        this.p2.synergySongThanGiangThe = true;
        this.p.maxHp = Math.round(this.p.maxHp * (1 + SONG_THAN_HP_BONUS));
        this.p.hp = this.p.maxHp;
        this.p2.maxHp = Math.round(this.p2.maxHp * (1 + SONG_THAN_HP_BONUS));
        this.p2.hp = this.p2.maxHp;
        this.p.lienKichChance = (this.p.lienKichChance || 0) + SONG_THAN_LIEN_KICH;
        this.p2.lienKichChance = (this.p2.lienKichChance || 0) + SONG_THAN_LIEN_KICH;
        this.p.truyKichChance = (this.p.truyKichChance || 0) + SONG_THAN_TRUY_KICH;
        this.p2.truyKichChance = (this.p2.truyKichChance || 0) + SONG_THAN_TRUY_KICH;
        this.floatingTexts.push({
          text: '⚡ SONG THẦN GIÁNG THẾ: HP+50%, DMG+45%, SPEED+25%, LIÊN KÍCH+20%, TRUY KÍCH+25%! 🌟',
          x: 250,
          y: 110,
          color: '#fbbf24',
          createdAt: this.now,
          expiresAt: this.now + 4500
        });
      }

      // Check Tuyệt Thế Anh Hùng (Lưu Bị + Triệu Vân / Thần-Triệu Vân)
      const isBlueLuuBei = this.p.role === 'liubei' || this.p.role === 'than_liubei';
      const isBlueTrieuVan = this.p.role === 'trieuvan' || this.p.role === 'than_trieuvan';
      const isBlue2LuuBei = this.p2.role === 'liubei' || this.p2.role === 'than_liubei';
      const isBlue2TrieuVan = this.p2.role === 'trieuvan' || this.p2.role === 'than_trieuvan';

      const hasBlueTuyetThe = !hasBlueSongThan && (
        (isBlueLuuBei && isBlue2TrieuVan) ||
        (isBlue2LuuBei && isBlueTrieuVan)
      );

      if (hasBlueTuyetThe) {
        this.p.synergyTuyetTheAnhHung = true;
        this.p2.synergyTuyetTheAnhHung = true;
        this.p.maxHp = Math.round(this.p.maxHp * (1 + TUYET_THE_HP_BONUS));
        this.p.hp = this.p.maxHp;
        this.p2.maxHp = Math.round(this.p2.maxHp * (1 + TUYET_THE_HP_BONUS));
        this.p2.hp = this.p2.maxHp;
        this.p.lienKichChance = (this.p.lienKichChance || 0) + TUYET_THE_LIEN_KICH;
        this.p2.lienKichChance = (this.p2.lienKichChance || 0) + TUYET_THE_LIEN_KICH;
        this.p.truyKichChance = (this.p.truyKichChance || 0) + TUYET_THE_TRUY_KICH;
        this.p2.truyKichChance = (this.p2.truyKichChance || 0) + TUYET_THE_TRUY_KICH;
        this.floatingTexts.push({
          text: '⚔️ TUYỆT THẾ ANH HÙNG: HP+40%, DMG+35%, SPEED+15%, LIÊN KÍCH+10%, TRUY KÍCH+15%! ✨',
          x: 250,
          y: 110,
          color: '#38bdf8',
          createdAt: this.now,
          expiresAt: this.now + 4500
        });
      }

      // Check Red Team Synergies
      const hasRedThienHa =
        (this.e.role === 'sotan' && this.e.weapon.key === 'cancau' && this.e2.role === 'bathuong' && this.e2.weapon.key === 'cancau') ||
        (this.e2.role === 'sotan' && this.e2.weapon.key === 'cancau' && this.e.role === 'bathuong' && this.e.weapon.key === 'cancau');

      if (hasRedThienHa) {
        this.redSynergyThienHa = true;
        this.e.synergyThienHa = true;
        this.e2.synergyThienHa = true;
        this.e.maxHp = Math.round(this.e.maxHp * (1 + THIEN_HA_HP_BONUS));
        this.e.hp = this.e.maxHp;
        this.e2.maxHp = Math.round(this.e2.maxHp * (1 + THIEN_HA_HP_BONUS));
        this.e2.hp = this.e2.maxHp;
      }

      const hasRedDongNghiep =
        (this.e.role === 'admin' && this.e2.role === 'the_owner') ||
        (this.e2.role === 'admin' && this.e.role === 'the_owner');

      if (hasRedDongNghiep) {
        this.redSynergyDongNghiep = true;
        this.e.synergyDongNghiep = true;
        this.e2.synergyDongNghiep = true;
      }

      const hasRedSongThan =
        (this.e.role === 'than_liubei' && this.e2.role === 'than_trieuvan') ||
        (this.e2.role === 'than_liubei' && this.e.role === 'than_trieuvan');

      if (hasRedSongThan) {
        this.e.synergySongThanGiangThe = true;
        this.e2.synergySongThanGiangThe = true;
        this.e.maxHp = Math.round(this.e.maxHp * (1 + SONG_THAN_HP_BONUS));
        this.e.hp = this.e.maxHp;
        this.e2.maxHp = Math.round(this.e2.maxHp * (1 + SONG_THAN_HP_BONUS));
        this.e2.hp = this.e2.maxHp;
        this.e.lienKichChance = (this.e.lienKichChance || 0) + SONG_THAN_LIEN_KICH;
        this.e2.lienKichChance = (this.e2.lienKichChance || 0) + SONG_THAN_LIEN_KICH;
        this.e.truyKichChance = (this.e.truyKichChance || 0) + SONG_THAN_TRUY_KICH;
        this.e2.truyKichChance = (this.e2.truyKichChance || 0) + SONG_THAN_TRUY_KICH;
      }

      const isRedLuuBei = this.e.role === 'liubei' || this.e.role === 'than_liubei';
      const isRedTrieuVan = this.e.role === 'trieuvan' || this.e.role === 'than_trieuvan';
      const isRed2LuuBei = this.e2.role === 'liubei' || this.e2.role === 'than_liubei';
      const isRed2TrieuVan = this.e2.role === 'trieuvan' || this.e2.role === 'than_trieuvan';

      const hasRedTuyetThe = !hasRedSongThan && (
        (isRedLuuBei && isRed2TrieuVan) ||
        (isRed2LuuBei && isRedTrieuVan)
      );

      if (hasRedTuyetThe) {
        this.e.synergyTuyetTheAnhHung = true;
        this.e2.synergyTuyetTheAnhHung = true;
        this.e.maxHp = Math.round(this.e.maxHp * (1 + TUYET_THE_HP_BONUS));
        this.e.hp = this.e.maxHp;
        this.e2.maxHp = Math.round(this.e2.maxHp * (1 + TUYET_THE_HP_BONUS));
        this.e2.hp = this.e2.maxHp;
        this.e.lienKichChance = (this.e.lienKichChance || 0) + TUYET_THE_LIEN_KICH;
        this.e2.lienKichChance = (this.e2.lienKichChance || 0) + TUYET_THE_LIEN_KICH;
        this.e.truyKichChance = (this.e.truyKichChance || 0) + TUYET_THE_TRUY_KICH;
        this.e2.truyKichChance = (this.e2.truyKichChance || 0) + TUYET_THE_TRUY_KICH;
      }

      this.logMessage = `⚔️ Chế độ Tổ Đội 2v2 bắt đầu! Team Xanh (Xanh Lam & Xanh Lá) vs Team Địch (Đỏ & Vàng)!`;
    } else if (this.isSandbox) {
      this.playerBall = {
        x: this.width * 0.28,
        y: this.height * 0.5,
        vx: 0,
        vy: 0,
        radius: 18,
        color: '#378add',
        borderColor: '#1a3a5c'
      };

      this.enemyBall = {
        x: this.width * 0.72,
        y: this.height * 0.5,
        vx: 0,
        vy: 0,
        radius: 20,
        color: '#ef4444',
        borderColor: '#7f1d1d'
      };

      this.logMessage = '🎯 PHÒNG THÍ NGHIỆM SANDBOX: Phím WASD di chuyển, click chuột/Space để đánh, phím 1-0 tung skill!';
    } else {
      this.playerBall = {
        x: 220,
        y: 270,
        vx: 84,
        vy: 84,
        radius: 18,
        color: '#378add',
        borderColor: '#1a3a5c'
      };

      this.enemyBall = {
        x: 270,
        y: 220,
        vx: -84,
        vy: -84,
        radius: 18,
        color: '#e24b4a',
        borderColor: '#7a1f14'
      };

      this.logMessage = `Trận đấu bắt đầu! (Sát thương x${this.dmgMul.toFixed(2)})`;
    }
    this.startLoop();
    sound.playBattleStart();
    sound.startBGM();
  }

  private makeEntity(
    weapon: WeaponDef,
    baseMaxHp: number,
    element: Entity['element'],
    role: Entity['role']
  ): Entity {
    // Auto-Evolution Check:
    // Triệu Vân + Thương Thần -> Thần-Triệu Vân
    if (role === 'trieuvan' && weapon.key === 'thuongthan') {
      role = 'than_trieuvan';
    }
    // Lưu Bị + Thần Song Kiếm -> Thần-Lưu Bị
    if (role === 'liubei' && weapon.key === 'than_songkiem') {
      role = 'than_liubei';
    }

    let maxHp = baseMaxHp;
    if (role === 'the_owner_7b') {
      maxHp = THE_OWNER_7B_HP;
    } else if (role === 'survivalist') {
      maxHp = baseMaxHp + getRoleHpBonus(baseMaxHp);
    } else if (role === 'than_trieuvan') {
      maxHp = Math.round(baseMaxHp * (1 + THAN_TRIEUVAN_HP_BONUS)); // +30% HP
    } else if (role === 'trieuvan') {
      maxHp = Math.round(baseMaxHp * (1 + TRIEUVAN_HP_BONUS)); // +10% HP
    } else if (role === 'than_liubei') {
      maxHp = Math.round(baseMaxHp * 1.30);
    } else if (role === 'liubei') {
      if (weapon.key === 'songkiem' || weapon.key === 'than_songkiem') {
        maxHp = Math.round(baseMaxHp * LIUBEI_SONGKIEM_HP_MUL);
      } else {
        maxHp = Math.round(baseMaxHp * LIUBEI_NO_SONGKIEM_HP_MUL);
      }
    }

    const entity: Entity = {
      hp: maxHp,
      maxHp,
      weapon,
      element,
      role: role || null,
      nextAtkAt: 0,
      rootedUntil: 0,
      dot: null,
      torchBurn: null,
      maceFlight: { active: false, wallHits: 0 },
      weaponRecoil: 0
    };

    if (weapon.isSpear || weapon.isDual) {
      entity.spear = {
        state: 'idle',
        nextReadyAt: 0,
        chargeEndAt: 0,
        lungeCount: 0,
        ultraStartAt: 0
      };
    }
    if (weapon.isMace || weapon.isDual) {
      entity.mace = { state: 'idle', nextReadyAt: 0, chargeEndAt: 0 };
    }
    if (weapon.isRailgun) {
      entity.railgun = { nextFireAt: 0, firing: false, fireEndsAt: 0, lastTick: 0 };
    }
    if (weapon.isMinigun) {
      entity.minigun = {
        ammo: weapon.maxAmmo || 10000,
        lastShotAt: 0,
        reloading: false,
        reloadEndsAt: 0,
        shotCount: 0
      };
    }
    if (weapon.isRangedMelee) {
      entity.rangedMelee = { lastAtkAt: 0 };
    }
    if (weapon.isRitual) {
      entity.ritual = {
        state: 'idle',
        nextReadyAt: 0,
        phaseEndAt: 0,
        rings: null,
        fireDir: null,
        fireLen: 0,
        lastFireTick: 0,
        slashDone: false,
        slashIndex: 0,
        slashAngles: null
      };
    }
    if (role === 'admin') {
      entity.admin = {
        nextSkillAt: ADMIN_SKILL_INTERVAL_MS,
        buffActive: false,
        buffUntil: 0,
        speedActive: false,
        speedUntil: 0,
        freezeUntil: 0,
        activeCommandText: null,
        commandDisplayUntil: 0
      };
    }
    if (role === 'werewolf') {
      entity.werewolfBase = baseMaxHp;
      entity.werewolf = {
        phase: 'day',
        phaseStartAt: 0,
        phaseEndAt: WW_DAY_DURATION_MS
      };
      entity.maxHp = Math.round(baseMaxHp * WW_DAY_HP_FRAC);
      entity.hp = entity.maxHp;
    }
    if (role === 'sotan') {
      entity.sotan = {
        nextSkillAt: this.now + 2500,
        state: 'idle',
        chargeStartAt: 0,
        chargeDuration: SOTAN_CHARGE_DURATION_MS,
        ringsRot: [0, 0, 0, 0, 0],
        aimAngle: 0,
        dashSpeed: 1100,
        targetX: 0,
        targetY: 0,
        huyenVuImmuneUntil: 0,
        beastActive: null
      };
    }
    if (role === 'bathuong') {
      entity.bathuong = {
        nextSkillAt: this.now + 2000,
        activeSkill: null,
        skillPhase: 'idle',
        skillStartAt: 0,
        headSlamExecuted: false,
        baiViWavesSpawned: 0,
        baiViLastSpawnAt: 0,
        drillRotationAngle: 0,
        drillLastDmgAt: 0,
        drillRotationsCount: 0,
        drillLastDrillShotAtRotation: 0,
        naDiDashesLeft: 0,
        naDiLastDashAt: 0,
        tiemLongThrown: false,
        isDragonHuman: false,
        dragonHumanLastHpTickAt: 0
      };
    }
    if (role === 'than_trieuvan') {
      entity.lienKichChance = (entity.lienKichChance || 0) + THAN_TRIEUVAN_LIEN_KICH;
      entity.truyKichChance = (entity.truyKichChance || 0) + THAN_TRIEUVAN_TRUY_KICH;
    }
    if (role === 'liubei' || role === 'than_liubei') {
      entity.liubei = {
        nextSkillAt: this.now + 3000,
        state: 'idle',
        stepStartTime: 0,
        targetLocked: false,
        frozenUntil: 0
      };
    }
    if (element && element.type === 'glitch') {
      entity.glitch = {
        skillNextAt: 0,
        comboActive: false,
        lockedUntil: 0,
        stunnedUntil: 0,
        handSlam: null
      };
    }
    if (weapon.isDualSwords || weapon.key === 'songkiem' || weapon.key === 'than_songkiem') {
      entity.songkiem = {
        lastSlashAt: 0,
        skillNextAt: this.now + 4000,
        comboActive: false,
        comboHitsLeft: 0,
        totalComboHits: 0,
        lastHitAt: 0,
        targetLocked: false,
        dashStartTime: 0,
        continuousChanceTriggered: false,
        nhatQuangNextAt: this.now + 2500,
        isChargingNhatQuang: false,
        nhatQuangChargeStartTime: 0
      };
    }
    if (weapon.key === 'cancau') {
      entity.cancau = {
        nextHookAt: this.now + 2500,
        state: 'idle',
        hookStartTime: 0,
        hookX: 0,
        hookY: 0,
        targetLocked: false,
        lineTension: 0
      };
    }
    return entity;
  }

  public startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      this.now = currentTime;

      this.update(dt);
      this.render();

      if (this.onStateChange) this.onStateChange();

      if (this.isRunning) {
        this.animFrameId = requestAnimationFrame(loop);
      }
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public stopLoop() {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    sound.stopBGM();
  }

  private isStunned(entity: Entity, now: number) {
    return (!!entity.glitch && entity.glitch.stunnedUntil > now) || (!!entity.dayNitStunUntil && entity.dayNitStunUntil > now);
  }

  private isRooted(entity: Entity, now: number) {
    return entity.rootedUntil > now;
  }

  public applyDamage(entity: Entity, rawDmg: number, attacker?: Entity) {
    if (entity.hp <= 0 && entity.isDead) return 0;

    // The Owner 7 Tỉ là BẤT TỬ TUYỆT ĐỐI (God Mode 100%, không nhận bất kỳ sát thương nào)
    if (entity.role === 'the_owner_7b') {
      const b = this.getBallForEntity(entity);
      this.spawnSparks(b.x, b.y, '#fbbf24', 12);
      return 0;
    }

    if (entity.sotan && entity.sotan.huyenVuImmuneUntil > this.now) {
      const b = this.getBallForEntity(entity);
      this.spawnSparks(b.x, b.y, '#22c55e', 8);
      return 0; // Immune: 100% damage resistance
    }

    // Colleague invulnerability shield check
    if (entity.synergyDongNghiep && entity.colleagueShieldUntil && entity.colleagueShieldUntil > this.now) {
      const b = this.getBallForEntity(entity);
      this.spawnSparks(b.x, b.y, '#10b981', 10);
      return 0;
    }

    // Check if attacker is The Owner 7 Tỉ or massive one-shot
    const isFromOwner7b =
      (attacker && attacker.role === 'the_owner_7b') ||
      (this.p && this.p.role === 'the_owner_7b' && entity !== this.p && entity !== this.p2);

    if (isFromOwner7b) {
      // Gây 0.2% HP Max / 0.01s (hoặc lượng sát thương truyền vào)
      const effectiveDmg = rawDmg >= THE_OWNER_7B_DMG
        ? Math.max(1, Math.round(entity.maxHp * THE_OWNER_7B_MELT_PERCENT))
        : rawDmg;

      if (this.isSandbox && entity === this.e) {
        // DUMMY BỊ RÚT MÁU 0.2% HP MAX / 0.01S CHO ĐẾN KHI CẠN MÁU!
        this.e.hp -= effectiveDmg;
        this.sandboxTotalDamage += Math.round(effectiveDmg);
        this.sandboxDmgHistory.push({ time: this.now, dmg: Math.round(effectiveDmg) });
        this.lastDamageTakenAt = this.now;

        if (this.e.hp <= 0) {
          this.e.hp = 0;
          this.e.isDead = true;

          // THƯỞNG FREE 1 TRIỆU XU!
          const curCoins = loadCoins();
          saveCoins(curCoins + THE_OWNER_7B_DUMMY_REWARD);
          try {
            localStorage.setItem('game_coins', (curCoins + THE_OWNER_7B_DUMMY_REWARD).toString());
          } catch {}
          if (this.onCoinsGained) this.onCoinsGained(THE_OWNER_7B_DUMMY_REWARD);

          this.logMessage = '👑💥 [THE OWNER 7 TỈ %]: 0.2% HP/0.01s ĐÃ RÚT CẠN MÁU & TIÊU DIỆT BÙ NHÌN DUMMY! NHẬN FREE +1.000.000 XU! 💰';
          this.shakeScreen(45);
          this.spawnSparks(this.enemyBall.x, this.enemyBall.y, '#fbbf24', 60);
          this.spawnSparks(this.enemyBall.x, this.enemyBall.y, '#22c55e', 40);
          this.floatingTexts.push({
            text: '👑 DIỆT DUMMY! +1.000.000 XU 💰',
            x: this.enemyBall.x,
            y: this.enemyBall.y - 45,
            color: '#fbbf24',
            createdAt: this.now,
            expiresAt: this.now + 4000
          });

          // Hồi sinh Dummy sau 3.5s để người chơi test tiếp
          setTimeout(() => {
            if (this.isSandbox && this.e) {
              this.e.hp = 999999999;
              this.e.isDead = false;
              this.logMessage = '🎯 [SANDBOX]: Bù nhìn Dummy bất tử đã hồi sinh!';
            }
          }, 3500);
        }

        return effectiveDmg;
      }

      // Đối thủ thông thường nhận sát thương 1% Max HP/0.01s
      entity.hp -= effectiveDmg;
      this.lastDamageTakenAt = this.now;
      if (entity.hp <= 0) {
        entity.hp = 0;
        entity.isDead = true;
        const b = this.getBallForEntity(entity);
        this.spawnSparks(b.x, b.y, '#fbbf24', 40);
      }
      return effectiveDmg;
    }

    let dmg = rawDmg * getRoleIncomingMultiplier(entity);

    // Buff Đồng Nghiệp: Giảm 30% sát thương nhận vào
    if (entity.synergyDongNghiep) {
      dmg *= (1 - DONG_NGHIEP_DEF_REDUCTION);
    }

    if (dmg > 0) {
      sound.playHit(dmg >= 100);
      if (this.isSandbox && entity === this.e) {
        this.sandboxTotalDamage += Math.round(dmg);
        this.sandboxDmgHistory.push({ time: this.now, dmg: Math.round(dmg) });
        this.e.hp = 999999999;
      } else {
        entity.hp -= dmg;
      }
      this.lastDamageTakenAt = this.now;

      // Track total damage for post-match summary stats
      if (attacker === this.p || attacker === this.p2 || (!attacker && entity !== this.p && entity !== this.p2)) {
        this.playerDamageDealt += Math.round(dmg);
      } else {
        this.enemyDamageDealt += Math.round(dmg);
      }

      // Buff Đồng Nghiệp cứu mạng: Khi HP < 30% lần đầu, hồi 25% Max HP và bật khiên bất tử 2.5s
      if (entity.synergyDongNghiep && !entity.hasUsedColleagueSave && entity.hp > 0 && entity.hp <= entity.maxHp * 0.3) {
        entity.hasUsedColleagueSave = true;
        sound.playShield();
        const healAmt = Math.round(entity.maxHp * DONG_NGHIEP_HEAL_PCT);
        entity.hp = Math.min(entity.maxHp, entity.hp + healAmt);
        entity.colleagueShieldUntil = this.now + DONG_NGHIEP_SHIELD_MS;
        const b = this.getBallForEntity(entity);
        this.spawnSparks(b.x, b.y, '#10b981', 35);
        this.floatingTexts.push({
          text: `🤝 ĐỒNG NGHIỆP TƯƠNG TRỢ (+${healAmt.toLocaleString()} HP & KHIÊN BẤT TỬ 2.5S)! 👑`,
          x: b.x,
          y: b.y - 30,
          color: '#10b981',
          createdAt: this.now,
          expiresAt: this.now + 3000
        });
      }

      // Check death
      if (entity.hp <= 0) {
        entity.hp = 0;
        entity.isDead = true;

        // Synergy "Thiên hạ vạn cổ hoành hải sa trường": Khi Bá Thường chết, Sở Tân tức giận triệu hoán Trấn Quốc Chi Kiếm!
        if (entity.role === 'bathuong' && entity.synergyThienHa) {
          const team = entity.team || (entity === this.p || entity === this.p2 ? 'blue' : 'red');
          this.triggerTranQuocChiKiem(team);
        }
      }

      // When entity with role sotan is HIT, 5% chance to trigger Huyền Vũ (100% resistance for 3s)
      if (entity.role === 'sotan' && entity.sotan && entity.sotan.huyenVuImmuneUntil <= this.now) {
        if (Math.random() < SOTAN_BEAST_CHANCE) {
          entity.sotan.huyenVuImmuneUntil = this.now + SOTAN_HUYENVU_IMMUNE_MS;
          const b = this.getBallForEntity(entity);
          entity.sotan.beastActive = {
            type: 'huyen_vu',
            title: '🐢 HUYỀN VŨ THẦN THÚ HỘ THỂ',
            desc: 'Kháng 100% sát thương trong 3.0s!',
            spawnAt: this.now,
            duration: 3000,
            x: b.x,
            y: b.y
          };
          const name = entity === this.p ? 'Bạn' : 'Địch';
          this.logMessage = `🐢 [HUYỀN VŨ ĐIỀU HỒN (5%)]: ${name} triệu hoán Mai Rùa Huyền Vũ, KHÁNG 100% SÁT THƯƠNG trong 3s!`;
          this.spawnSparks(b.x, b.y, '#22c55e', 25);
          this.expandingRings.push({
            x: b.x,
            y: b.y,
            radius: 10,
            maxRadius: 75,
            thickness: 4,
            color: '#22c55e',
            alpha: 1,
            life: 0,
            maxLife: 0.5
          });
        }
      }
    }
    return dmg;
  }

  public getBallForEntity(entity: Entity): Ball {
    if (entity === this.p) return this.playerBall;
    if (entity === this.e) return this.enemyBall;
    if (this.is2v2 && this.p2 && entity === this.p2 && this.playerBall2) return this.playerBall2;
    if (this.is2v2 && this.e2 && entity === this.e2 && this.enemyBall2) return this.enemyBall2;
    return this.playerBall;
  }

  public getOpponentFor(entity: Entity): { ent: Entity; ball: Ball } {
    const isPlayerTeam = entity === this.p || (this.is2v2 && entity === this.p2);
    const ownBall = this.getBallForEntity(entity);

    if (isPlayerTeam) {
      if (!this.is2v2 || !this.e2 || !this.enemyBall2) {
        return { ent: this.e, ball: this.enemyBall };
      }
      const e1Alive = this.e.hp > 0 && !this.e.isDead;
      const e2Alive = this.e2.hp > 0 && !this.e2.isDead;
      if (e1Alive && !e2Alive) return { ent: this.e, ball: this.enemyBall };
      if (!e1Alive && e2Alive) return { ent: this.e2, ball: this.enemyBall2 };
      if (!e1Alive && !e2Alive) return { ent: this.e, ball: this.enemyBall };

      const d1 = Math.hypot(this.enemyBall.x - ownBall.x, this.enemyBall.y - ownBall.y);
      const d2 = Math.hypot(this.enemyBall2.x - ownBall.x, this.enemyBall2.y - ownBall.y);
      return d1 <= d2 ? { ent: this.e, ball: this.enemyBall } : { ent: this.e2, ball: this.enemyBall2 };
    } else {
      if (!this.is2v2 || !this.p2 || !this.playerBall2) {
        return { ent: this.p, ball: this.playerBall };
      }
      const p1Alive = this.p.hp > 0 && !this.p.isDead;
      const p2Alive = this.p2.hp > 0 && !this.p2.isDead;
      if (p1Alive && !p2Alive) return { ent: this.p, ball: this.playerBall };
      if (!p1Alive && p2Alive) return { ent: this.p2, ball: this.playerBall2 };
      if (!p1Alive && !p2Alive) return { ent: this.p, ball: this.playerBall };

      const d1 = Math.hypot(this.playerBall.x - ownBall.x, this.playerBall.y - ownBall.y);
      const d2 = Math.hypot(this.playerBall2.x - ownBall.x, this.playerBall2.y - ownBall.y);
      return d1 <= d2 ? { ent: this.p, ball: this.playerBall } : { ent: this.p2, ball: this.playerBall2 };
    }
  }

  public finalizeAttackerDmg(attacker: Entity, baseDmg: number) {
    let dmg = baseDmg;
    if (attacker.role === 'admin') {
      dmg *= ADMIN_DMG_MUL;
      if (attacker.admin && attacker.admin.buffActive) dmg *= ADMIN_BUFF_DMG_MUL;
    } else if (attacker.role === 'survivalist' || attacker.role === 'liubei' || attacker.role === 'bathuong') {
      dmg *= getRoleDmgMultiplier(attacker);
    } else if (attacker.role === 'werewolf' && attacker.werewolf?.phase === 'night') {
      dmg *= WW_NIGHT_DMG_MUL;
    } else if (attacker.role === 'than_trieuvan') {
      dmg *= THAN_TRIEUVAN_DMG_MUL; // +50% DMG
    } else if (attacker.role === 'trieuvan') {
      dmg *= TRIEUVAN_DMG_MUL; // +10% DMG
    }

    if (attacker.synergyThienHa) {
      dmg *= THIEN_HA_DMG_MUL;
    }
    if (attacker.synergyDongNghiep) {
      dmg *= DONG_NGHIEP_DMG_MUL;
    }
    if (attacker.synergySongThanGiangThe) {
      dmg *= SONG_THAN_DMG_MUL; // +45% DMG
    } else if (attacker.synergyTuyetTheAnhHung) {
      dmg *= TUYET_THE_DMG_MUL; // +35% DMG
    }
    if (attacker.isEnragedSoTan) {
      dmg *= 2.0;
    }

    return applyAdminCrit(attacker, dmg);
  }

  private triggerStalemateBreak() {
    this.lastDamageTakenAt = this.now;
    // Pick rusher ball (random or the one furthest away)
    const rusherIsPlayer = Math.random() < 0.5;
    const rusherBall = rusherIsPlayer ? this.playerBall : this.enemyBall;
    const targetBall = rusherIsPlayer ? this.enemyBall : this.playerBall;
    const rusherName = rusherIsPlayer ? 'Bạn' : 'Địch';

    const dx = targetBall.x - rusherBall.x;
    const dy = targetBall.y - rusherBall.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0) {
      const rushSpeed = 420;
      rusherBall.vx = (dx / dist) * rushSpeed;
      rusherBall.vy = (dy / dist) * rushSpeed;
    }

    this.screenShake = 12;
    this.spawnSparks(rusherBall.x, rusherBall.y, '#f59e0b', 25);
    this.expandingRings.push({
      x: rusherBall.x,
      y: rusherBall.y,
      radius: 10,
      maxRadius: 100,
      thickness: 5,
      color: '#f59e0b',
      alpha: 1,
      life: 0,
      maxLife: 0.5
    });

    this.logMessage = `⚡ [ĐỘT PHÁ 30S BẾ TẮC]: 30s không ai dính đòn! ${rusherName} đổi quỹ đạo tăng tốc lao thẳng vào đối thủ!`;
  }

  private shakeScreen(amount: number) {
    this.screenShake = Math.max(this.screenShake, amount);
  }

  private update(dt: number) {
    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 20);
    }

    if (!this.battleOver) {
      this.updatePhysics(dt);
      this.checkCollisions();

      // Stalemate 30s check: if no damage has been dealt in 30 seconds, force a rush
      if (this.now - this.lastDamageTakenAt >= 30000) {
        this.triggerStalemateBreak();
      }
    }

    const pTarget = this.getOpponentFor(this.p);
    const eTarget = this.getOpponentFor(this.e);

    this.updateSpear(this.p, this.playerBall, pTarget.ball, 'Bạn');
    this.updateSpear(this.e, this.enemyBall, eTarget.ball, 'Địch');

    this.updateMace(this.p, this.playerBall);
    this.updateMace(this.e, this.enemyBall);

    this.updateRailguns(dt);
    this.updateUltraLaser(dt);
    this.updateCombo(dt);
    this.updateShadowClones(dt);

    this.updateMinigun(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateMinigun(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateBowAndCrossbow(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateBowAndCrossbow(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateSongKiem(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn', dt);
    this.updateSongKiem(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch', dt);

    this.updateCanCau(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn', dt);
    this.updateCanCau(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch', dt);

    this.updateProjectiles(dt);

    this.updateRangedMelee(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateRangedMelee(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateRitual(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateRitual(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateAdminSkill(this.p, this.playerBall, 'Bạn');
    this.updateAdminSkill(this.e, this.enemyBall, 'Địch');

    this.updateWerewolf(this.p, this.playerBall);
    this.updateWerewolf(this.e, this.enemyBall);

    this.updateGlitchSkill(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateGlitchSkill(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateSoTanSkill(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateSoTanSkill(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateBaThuongSkill(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateBaThuongSkill(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateLuuBeiSkill(this.p, this.playerBall, pTarget.ball, pTarget.ent, 'Bạn');
    this.updateLuuBeiSkill(this.e, this.enemyBall, eTarget.ball, eTarget.ent, 'Địch');

    this.updateDragonWaves(dt);
    this.updateDrillProjectiles(dt);
    this.updateThrownWeapons(dt);
    this.updateLuuBeiSlashes(dt);
    this.updateSoTanDieu(dt);
    this.updateNhatDieuToiCao(dt);
    this.updateNhatDieuHoangKim(dt);
    this.updatePhiThienVoCuc(dt);
    this.updateToanThienThauChi(dt);
    this.updateTheOwner(dt);
    this.updateTowerDefense(dt);
    this.updateLongHonDoanHai(dt);
    this.updateLongHonFireOrbs(dt);
    this.updateLongHonFirePillars(dt);
    this.updateNhaiGiacLuuTinhTram(dt);
    this.updateStellar(dt);

    // Auto-cast Thần-Triệu Vân Nhai Giác Lưu Tinh Trảm for AI
    const allEntities = [this.p, this.e];
    if (this.is2v2 && this.p2 && this.e2) {
      allEntities.push(this.p2, this.e2);
    }
    allEntities.forEach(ent => {
      if (ent.hp <= 0 || ent.isDead) return;
      if (ent.role === 'than_trieuvan' && this.now >= this.nhaiGiacNextAt && (!this.nhaiGiacLuuTinhTram || !this.nhaiGiacLuuTinhTram.active)) {
        this.triggerNhaiGiacLuuTinhTram(ent);
      }
      if ((ent.weapon.key === 'than_songkiem' || ent.role === 'than_liubei') && ent.hp <= ent.maxHp * 0.70) {
        if (this.now >= (ent.lastTrieuDinhAt || 0) + TRIEU_DINH_COOLDOWN_MS) {
          this.triggerTrieuDinhTroTaKhoiPhuc(ent);
        }
      }
    });

    this.holySlashes = this.holySlashes.filter(h => this.now - h.startTime < h.duration);
    this.megaSlashes = this.megaSlashes.filter(s => this.now < s.expiresAt);
    this.dynamicSlashes = this.dynamicSlashes.filter(s => this.now - s.createdAt < s.duration);

    if (this.isSandbox) {
      this.sandboxDmgHistory = this.sandboxDmgHistory.filter(h => this.now - h.time <= 5000);
      const sumDmg = this.sandboxDmgHistory.reduce((acc, h) => acc + h.dmg, 0);
      this.sandboxDps = Math.round(sumDmg / 5);
    }

    if (this.qinglongManifestation && this.now - this.qinglongManifestation.startTime > this.qinglongManifestation.duration) {
      this.qinglongManifestation = null;
    }

    this.updateGlitchTrails(this.now);
    this.updateActiveCracks(this.now);
    this.updateActiveFissures(this.now);

    this.tickDot(this.p, this.now);
    this.tickDot(this.e, this.now);

    this.tickTorchBurn(this.p, this.now);
    this.tickTorchBurn(this.e, this.now);

    this.tickDayNit(this.p, this.now);
    this.tickDayNit(this.e, this.now);

    // 2v2 Secondary Fighters Update
    if (this.is2v2 && this.p2 && this.playerBall2 && this.e2 && this.enemyBall2) {
      const p2Target = this.getOpponentFor(this.p2);
      const e2Target = this.getOpponentFor(this.e2);

      if (!this.p2.isDead && this.p2.hp > 0) {
        this.updateSpear(this.p2, this.playerBall2, p2Target.ball, 'Bạn 2');
        this.updateMace(this.p2, this.playerBall2);
        this.updateMinigun(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateBowAndCrossbow(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateSongKiem(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2', dt);
        this.updateCanCau(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2', dt);
        this.updateRangedMelee(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateRitual(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateAdminSkill(this.p2, this.playerBall2, 'Bạn 2');
        this.updateSoTanSkill(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateBaThuongSkill(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.updateLuuBeiSkill(this.p2, this.playerBall2, p2Target.ball, p2Target.ent, 'Bạn 2');
        this.tickDot(this.p2, this.now);
        this.tickTorchBurn(this.p2, this.now);
        this.tickDayNit(this.p2, this.now);
        this.p2.weaponRecoil = Math.max(0, this.p2.weaponRecoil - dt * 5);
      }
      if (!this.e2.isDead && this.e2.hp > 0) {
        this.updateSpear(this.e2, this.enemyBall2, e2Target.ball, 'Địch 2');
        this.updateMace(this.e2, this.enemyBall2);
        this.updateMinigun(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateBowAndCrossbow(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateSongKiem(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2', dt);
        this.updateCanCau(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2', dt);
        this.updateRangedMelee(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateRitual(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateAdminSkill(this.e2, this.enemyBall2, 'Địch 2');
        this.updateSoTanSkill(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateBaThuongSkill(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.updateLuuBeiSkill(this.e2, this.enemyBall2, e2Target.ball, e2Target.ent, 'Địch 2');
        this.tickDot(this.e2, this.now);
        this.tickTorchBurn(this.e2, this.now);
        this.tickDayNit(this.e2, this.now);
        this.e2.weaponRecoil = Math.max(0, this.e2.weaponRecoil - dt * 5);
      }
    }

    this.updateDayNitAoE();
    this.updateTranQuocChiKiem(dt);
    this.dayNitAoeFx = this.dayNitAoeFx.filter(fx => this.now - fx.startTime < fx.duration);

    this.floatingTexts = this.floatingTexts.filter(t => this.now < t.expiresAt);

    // Decay weapon recoil animations
    this.p.weaponRecoil = Math.max(0, this.p.weaponRecoil - dt * 5);
    this.e.weaponRecoil = Math.max(0, this.e.weaponRecoil - dt * 5);

    // Update Particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life += dt;
      if (p.rot !== undefined && p.rotSpeed !== undefined) {
        p.rot += p.rotSpeed * dt;
      }
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);
      return p.life < p.maxLife;
    });

    // Update Expanding Rings
    this.expandingRings = this.expandingRings.filter(r => {
      r.life += dt;
      const progress = r.life / r.maxLife;
      r.radius = r.maxRadius * progress;
      r.alpha = Math.max(0, 1 - progress);
      return r.life < r.maxLife;
    });

    this.checkEnd();
  }

  private updatePhysics(dt: number) {
    const isPlayerInSpecialCutscene = !!(
      (this.longHonDoanHai && this.longHonDoanHai.active) ||
      (this.soTanDieu && this.soTanDieu.active) ||
      (this.nhatDieuToiCao && this.nhatDieuToiCao.active && this.nhatDieuToiCao.attackerIsPlayer) ||
      (this.nhaiGiacLuuTinhTram && this.nhaiGiacLuuTinhTram.active)
    );

    if (this.isSandbox) {
      // Static Dummy Ball
      this.enemyBall.x = this.width * 0.72;
      this.enemyBall.y = this.height * 0.5;
      this.enemyBall.vx = 0;
      this.enemyBall.vy = 0;

      // WASD Control for Player Ball (only when not in scripted flight/cutscene)
      if (!isPlayerInSpecialCutscene) {
        const moveSpeed = 260;
        let mx = 0;
        let my = 0;
        if (this.sandboxKeysPressed.has('w') || this.sandboxKeysPressed.has('arrowup')) my -= 1;
        if (this.sandboxKeysPressed.has('s') || this.sandboxKeysPressed.has('arrowdown')) my += 1;
        if (this.sandboxKeysPressed.has('a') || this.sandboxKeysPressed.has('arrowleft')) mx -= 1;
        if (this.sandboxKeysPressed.has('d') || this.sandboxKeysPressed.has('arrowright')) mx += 1;

        if (mx !== 0 || my !== 0) {
          const len = Math.hypot(mx, my);
          this.playerBall.vx = (mx / len) * moveSpeed;
          this.playerBall.vy = (my / len) * moveSpeed;
        } else {
          this.playerBall.vx *= 0.88;
          this.playerBall.vy *= 0.88;
        }
      }
    }

    const balls = [
      { b: this.playerBall, ent: this.p, isPlayer: true },
      { b: this.enemyBall, ent: this.e, isPlayer: false }
    ];
    if (this.is2v2 && this.playerBall2 && this.p2 && this.enemyBall2 && this.e2) {
      balls.push(
        { b: this.playerBall2, ent: this.p2, isPlayer: true },
        { b: this.enemyBall2, ent: this.e2, isPlayer: false }
      );
    }

    balls.forEach(({ b, ent, isPlayer }) => {
      // Dead balls don't move or hit walls
      if (ent.hp <= 0 && ent.isDead) {
        b.vx = 0;
        b.vy = 0;
        return;
      }

      // If player in scripted dragon flight, physics step is handled by updateLongHonDoanHai
      if (isPlayer && isPlayerInSpecialCutscene) {
        return;
      }

      // Freeze if admin skill or rooted or ritual cast
      if (ent.admin && ent.admin.freezeUntil > this.now) {
        b.vx = 0;
        b.vy = 0;
        return;
      }
      if (this.isRooted(ent, this.now)) {
        b.vx = 0;
        b.vy = 0;
        return;
      }
      if (ent.songkiem && ent.songkiem.isChargingNhatQuang) {
        b.vx = 0;
        b.vy = 0;
        return;
      }

      // Speed multipliers from synergies
      let speedFactor = 1.0;
      if (ent.synergyThienHa) speedFactor *= THIEN_HA_SPEED_MUL; // x1.7
      if (ent.synergyDongNghiep) speedFactor *= DONG_NGHIEP_SPEED_MUL; // x1.3
      if (ent.synergySongThanGiangThe) speedFactor *= SONG_THAN_SPEED_MUL; // x1.25 (+25%)
      else if (ent.synergyTuyetTheAnhHung) speedFactor *= TUYET_THE_SPEED_MUL; // x1.15 (+15%)

      // Combat steering and TRUY KÍCH towards targeted opponent
      if (!this.isSandbox) {
        const tgt = this.getOpponentFor(ent);
        if (tgt && tgt.ball && tgt.ent.hp > 0 && !tgt.ent.isDead) {
          const dx = tgt.ball.x - b.x;
          const dy = tgt.ball.y - b.y;
          const dist = Math.hypot(dx, dy) || 1;

          // Check TRUY KÍCH
          if (ent.truyKichChance && ent.truyKichChance > 0) {
            if (!ent.lastTruyKichAt) ent.lastTruyKichAt = 0;
            if (this.now - ent.lastTruyKichAt > 3500 && Math.random() < ent.truyKichChance * dt * 2.2) {
              ent.lastTruyKichAt = this.now;
              b.vx = (dx / dist) * 450;
              b.vy = (dy / dist) * 450;
              this.spawnSparks(b.x, b.y, '#38bdf8', 16);
              this.floatingTexts.push({
                text: '⚡ TRUY KÍCH!',
                x: b.x,
                y: b.y - 22,
                color: '#38bdf8',
                createdAt: this.now,
                expiresAt: this.now + 1300
              });
              this.logMessage = `⚡ [TRUY KÍCH]: ${ent.name || (isPlayer ? 'Bạn' : 'Địch')} kích hoạt Truy Kích, tăng tốc truy đuổi mục tiêu!`;
            }
          }

          // Dynamic steering towards target
          const isDashing = ent.spear?.state === 'dashing' || ent.spear?.state === 'ultra_dashing';
          if (!isDashing && (!this.nhaiGiacLuuTinhTram || !this.nhaiGiacLuuTinhTram.active)) {
            const steerSpeed = 65;
            b.vx += (dx / dist) * steerSpeed * dt;
            b.vy += (dy / dist) * steerSpeed * dt;

            const curSpd = Math.hypot(b.vx, b.vy);
            const maxSpd = 260;
            if (curSpd > maxSpd) {
              b.vx = (b.vx / curSpd) * maxSpd;
              b.vy = (b.vy / curSpd) * maxSpd;
            }
          }
        }
      }

      b.x += b.vx * speedFactor * dt;
      b.y += b.vy * speedFactor * dt;

      // Arena walls: x: 18..482, y: 18..482
      let hitWall = false;
      if (b.x < b.radius) {
        b.x = b.radius;
        b.vx = Math.abs(b.vx);
        hitWall = true;
      } else if (b.x > this.width - b.radius) {
        b.x = this.width - b.radius;
        b.vx = -Math.abs(b.vx);
        hitWall = true;
      }

      if (b.y < b.radius) {
        b.y = b.radius;
        b.vy = Math.abs(b.vy);
        hitWall = true;
      } else if (b.y > this.height - b.radius) {
        b.y = this.height - b.radius;
        b.vy = -Math.abs(b.vy);
        hitWall = true;
      }

      if (hitWall) {
        this.onWallHit(ent, b, isPlayer);
      }
    });
  }

  private onWallHit(entity: Entity, ball: Ball, isPlayer: boolean) {
    sound.playWallBounce();
    const name = isPlayer ? 'Bạn' : 'Địch';
    const opp = isPlayer ? this.e : this.p;

    if (entity.maceFlight && entity.maceFlight.active) {
      const wallDmg = Math.round(MACE_WALL_DMG * this.dmgMul);
      this.applyDamage(entity, wallDmg);
      entity.maceFlight.wallHits += 1;
      this.logMessage = `${name} đập tường (${entity.maceFlight.wallHits}/${MACE_WALL_MAX_HITS}), -${wallDmg} HP`;
      if (entity.maceFlight.wallHits >= MACE_WALL_MAX_HITS) {
        entity.maceFlight.active = false;
      }
      this.spawnSparks(ball.x, ball.y, '#ffffff', 10);
    }

    if (opp.element && opp.element.type === 'lightning') {
      const bolt = Math.round(lightningBoltDmg(opp.element.tier) * this.dmgMul);
      this.applyDamage(entity, bolt);
      this.logMessage = `${name} va vào tường trúng giật sét, -${bolt} HP`;
      this.spawnSparks(ball.x, ball.y, '#ffff44', 15);
    }

    if (this.comboWallCrash && this.comboWallCrash.active && this.comboWallCrash.victimIsPlayer === isPlayer) {
      sound.playExplosion();
      const wallDmg = Math.round(this.comboWallCrash.dmg * this.dmgMul);
      this.applyDamage(entity, wallDmg);
      this.comboWallCrash = null;
      this.spawnSparks(ball.x, ball.y, '#ef4444', 25);
      this.spawnSparks(ball.x, ball.y, '#ffffff', 15);
      this.screenShake = 12;
      this.logMessage = `💥 [ĐẬP TƯỜNG]: ${name} va đập cực mạnh vào tường chịu thêm -${wallDmg} HP!`;
    }
  }

  private checkCollisions() {
    const list: { ent: Entity; b: Ball; name: string; isPlayer: boolean; team: 'blue' | 'red' }[] = [
      { ent: this.p, b: this.playerBall, name: 'Bạn 1', isPlayer: true, team: 'blue' },
      { ent: this.e, b: this.enemyBall, name: 'Địch 1', isPlayer: false, team: 'red' }
    ];
    if (this.is2v2 && this.playerBall2 && this.p2 && this.enemyBall2 && this.e2) {
      list.push(
        { ent: this.p2, b: this.playerBall2, name: 'Bạn 2', isPlayer: true, team: 'blue' },
        { ent: this.e2, b: this.enemyBall2, name: 'Địch 2', isPlayer: false, team: 'red' }
      );
    }

    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const o1 = list[i];
        const o2 = list[j];

        if ((o1.ent.hp <= 0 && o1.ent.isDead) || (o2.ent.hp <= 0 && o2.ent.isDead)) continue;

        const dx = o2.b.x - o1.b.x;
        const dy = o2.b.y - o1.b.y;
        const dist = Math.hypot(dx, dy);
        const minDist = o1.b.radius + o2.b.radius;

        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;

          const p1 = o1.b.vx * nx + o1.b.vy * ny;
          const p2 = o2.b.vx * nx + o2.b.vy * ny;

          const diff = minDist - dist;
          o1.b.x -= nx * (diff / 2);
          o1.b.y -= ny * (diff / 2);
          o2.b.x += nx * (diff / 2);
          o2.b.y += ny * (diff / 2);

          o1.b.vx += (p2 - p1) * nx;
          o1.b.vy += (p2 - p1) * ny;
          o2.b.vx += (p1 - p2) * nx;
          o2.b.vy += (p1 - p2) * ny;
          sound.playBallBounce();

          // If opposite teams, trigger combat collision
          if (o1.team !== o2.team) {
            this.handleSingleBallCollision(o1.ent, o1.b, o2.ent, o2.b, o1.name);
            this.handleSingleBallCollision(o2.ent, o2.b, o1.ent, o1.b, o2.name);
          } else {
            // Teammate harmless bounce sparks
            this.spawnSparks((o1.b.x + o2.b.x) / 2, (o1.b.y + o2.b.y) / 2, '#38bdf8', 6);
          }
        }
      }
    }
  }

  private handleSingleBallCollision(self: Entity, ownBall: Ball, opp: Entity, oppBall: Ball, name: string) {
    if (self.hp <= 0 && self.isDead) return;
    if (opp.hp <= 0 && opp.isDead) return;
    if (self.admin && self.admin.freezeUntil > this.now) return;
    if (this.isStunned(self, this.now)) return;

    if (self.element && self.element.type === 'glitch') {
      this.spawnGlitchTrail(self, (ownBall.x + oppBall.x) / 2, (ownBall.y + oppBall.y) / 2);
    }

    if (self.spear && (self.spear.state === 'dashing' || self.spear.state === 'ultra_dashing')) {
      this.resolveSpearHit(self, opp, ownBall, name);
    }
    if (self.mace && self.mace.state === 'charged') {
      this.resolveMaceHit(self, opp, ownBall, oppBall, name);
    }
    if (self.weapon.isComboFist) {
      if (!this.comboQTE && this.now >= self.nextAtkAt && !this.isRooted(self, this.now)) {
        this.startComboQTE(self, opp, ownBall, oppBall, name);
      }
      return;
    }
    if (
      !self.weapon.isSpear &&
      !self.weapon.isMace &&
      !self.weapon.isDual &&
      !self.weapon.isRailgun &&
      !self.weapon.isMinigun &&
      !self.weapon.isRangedMelee &&
      !self.weapon.isRitual &&
      !self.weapon.isComboFist &&
      !self.weapon.isBow &&
      !self.weapon.isCrossbow &&
      !self.weapon.isDualSwords &&
      self.weapon.key !== 'songkiem' &&
      self.weapon.key !== 'daynit' &&
      self.weapon.key !== 'stellar_remote' &&
      !self.weapon.isStellarRemote &&
      this.now >= self.nextAtkAt &&
      !this.isRooted(self, this.now)
    ) {
      this.performAttack(self, opp, name);
      self.nextAtkAt = this.now + computeCooldown(self);
    } else if (
      (self.weapon.key === 'stellar_remote' || self.weapon.isStellarRemote) &&
      this.now >= self.nextAtkAt &&
      !this.isRooted(self, this.now)
    ) {
      self.nextAtkAt = this.now + computeCooldown(self);
      const stellarMul = this.getStellarMultiplier(self);
      const pulseDmg = Math.round(100_000 * stellarMul);
      this.applyDamage(opp, pulseDmg, self);
      this.shakeScreen(7);
      sound.playLaser();
      const oppBall = opp === this.p ? this.playerBall : this.enemyBall;
      this.spawnSparks(oppBall.x, oppBall.y, '#38bdf8', 18);
      this.spawnSparks(oppBall.x, oppBall.y, '#f59e0b', 12);
      this.floatingTexts.push({
        text: `🛰️⚡ -${pulseDmg.toLocaleString()} DMG (x${stellarMul})`,
        x: oppBall.x,
        y: oppBall.y - 30,
        color: '#38bdf8',
        createdAt: this.now,
        expiresAt: this.now + 1200
      });
      this.logMessage = `${name} [XUNG KÍCH VỆ TINH]: Vệ tinh quỹ đạo phóng xung điện plasma -${pulseDmg.toLocaleString()} DMG (x${stellarMul})!`;
    }
  }

  private onBallsCollide() {
    this.handleSingleBallCollision(this.p, this.playerBall, this.e, this.enemyBall, 'Bạn 1');
    this.handleSingleBallCollision(this.e, this.enemyBall, this.p, this.playerBall, 'Địch 1');
  }

  private spawnGlitchTrail(owner: Entity, x: number, y: number) {
    this.glitchTrails.push({
      x,
      y,
      ownerIsPlayer: owner === this.p,
      createdAt: this.now,
      lastEnemyTick: this.now,
      lastSelfTick: this.now
    });

    const opp = owner === this.p ? this.e : this.p;
    if (Math.random() < GLITCH_STUN_CHANCE) {
      if (!opp.glitch) {
        opp.glitch = { skillNextAt: 0, comboActive: false, lockedUntil: 0, stunnedUntil: 0 };
      }
      opp.glitch.stunnedUntil = this.now + GLITCH_STUN_DURATION;
      this.logMessage = 'Glitch: Đối thủ bị gây choáng (Stun)!';
    }
  }

  private updateGlitchTrails(now: number) {
    this.glitchTrails = this.glitchTrails.filter(trail => {
      if (this.battleOver) return false;
      if (now - trail.createdAt > GLITCH_TRAIL_DURATION) return false;

      const ownerBall = trail.ownerIsPlayer ? this.playerBall : this.enemyBall;
      const oppBall = trail.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const ownerEntity = trail.ownerIsPlayer ? this.p : this.e;
      const oppEntity = trail.ownerIsPlayer ? this.e : this.p;

      const distOpp = Math.hypot(oppBall.x - trail.x, oppBall.y - trail.y);
      if (distOpp < GLITCH_TRAIL_RADIUS && now - trail.lastEnemyTick >= GLITCH_ENEMY_TICK_MS) {
        trail.lastEnemyTick = now;
        const dmg = GLITCH_ENEMY_DMG_PER_TICK * this.dmgMul;
        this.applyDamage(oppEntity, dmg);
      }

      const distOwn = Math.hypot(ownerBall.x - trail.x, ownerBall.y - trail.y);
      if (distOwn < GLITCH_TRAIL_RADIUS && now - trail.lastSelfTick >= GLITCH_SELF_TICK_MS) {
        trail.lastSelfTick = now;
        ownerEntity.hp = Math.min(ownerEntity.maxHp, ownerEntity.hp + GLITCH_SELF_HEAL_PER_TICK);
      }
      return true;
    });
  }

  private updateGlitchSkill(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (!entity.element || entity.element.type !== 'glitch' || entity.element.tier < 5) return;
    if (!entity.glitch) {
      entity.glitch = { skillNextAt: 0, comboActive: false, lockedUntil: 0, stunnedUntil: 0 };
    }
    const g = entity.glitch;
    if (g.comboActive || this.now < g.skillNextAt) return;

    if (entity.element.tier >= 15) {
      g.comboActive = true;
      const dx = opponentBall.x - ownBall.x;
      const dy = opponentBall.y - ownBall.y;
      const len = Math.hypot(dx, dy) || 1;
      ownBall.vx = (dx / len) * GLITCH_COMBO_DASH_SPEED;
      ownBall.vy = (dy / len) * GLITCH_COMBO_DASH_SPEED;
      this.logMessage = `${name} kích hoạt Glitch Combo: Khóa mục tiêu!`;

      setTimeout(() => {
        if (!this.battleOver) {
          this.doGlitchComboHit(entity, opponentEntity, opponentBall, name);
        }
      }, 300);
    } else if (entity.element.tier >= 10) {
      const dmg = Math.round(GLITCH_PROJ_DMG * this.dmgMul);
      this.applyDamage(opponentEntity, dmg);
      if (Math.random() < GLITCH_PROJ_STUN_CHANCE) {
        if (!opponentEntity.glitch) {
          opponentEntity.glitch = { skillNextAt: 0, comboActive: false, lockedUntil: 0, stunnedUntil: 0 };
        }
        opponentEntity.glitch.stunnedUntil = this.now + GLITCH_STUN_DURATION;
      }
      this.spawnSparks(opponentBall.x, opponentBall.y, '#ff00ff', 20);
      this.logMessage = `${name} bắn Glitch Code Projectile, gây ${dmg} sát thương`;
      g.skillNextAt = this.now + GLITCH_HACK_COOLDOWN;
    } else {
      entity.hp = Math.min(entity.maxHp, entity.hp + entity.maxHp * GLITCH_HACK_HEAL_FRAC);
      this.logMessage = `${name} Hack hồi phục ${Math.round(GLITCH_HACK_HEAL_FRAC * 100)}% HP`;
      g.skillNextAt = this.now + GLITCH_HACK_COOLDOWN;
    }
  }

  private doGlitchComboHit(
    entity: Entity,
    opponentEntity: Entity,
    opponentBall: Ball,
    name: string
  ) {
    if (this.battleOver) return;
    opponentEntity.rootedUntil = this.now + 500;
    opponentBall.vx = 0;
    opponentBall.vy = 0;

    const dmg = Math.round(GLITCH_COMBO_HIT_DMG * this.dmgMul);
    this.applyDamage(opponentEntity, dmg);
    this.logMessage = `${name} Glitch Combo đánh liên kích! -${dmg} HP`;
    this.spawnSparks(opponentBall.x, opponentBall.y, '#ff00ff', 10);

    if (Math.random() < GLITCH_COMBO_EXTEND_CHANCE) {
      setTimeout(() => {
        this.doGlitchComboHit(entity, opponentEntity, opponentBall, name);
      }, GLITCH_COMBO_HIT_INTERVAL);
    } else {
      this.doGlitchHandSlam(entity, opponentEntity, opponentBall, name);
      if (entity.glitch) {
        entity.glitch.comboActive = false;
        entity.glitch.skillNextAt = this.now + GLITCH_HACK_COOLDOWN;
      }
    }
  }

  private doGlitchHandSlam(
    _entity: Entity,
    opponentEntity: Entity,
    opponentBall: Ball,
    name: string
  ) {
    const dmg = Math.round(GLITCH_HAND_SLAM_DMG * this.dmgMul);
    this.applyDamage(opponentEntity, dmg);
    const dx = Math.random() - 0.5;
    const dy = 1;
    const len = Math.hypot(dx, dy) || 1;
    opponentBall.vx = (dx / len) * GLITCH_HAND_KNOCKBACK;
    opponentBall.vy = (dy / len) * GLITCH_HAND_KNOCKBACK;
    this.logMessage = `${name} Bàn Tay Glitch đập mạnh đối phương! -${dmg} HP`;
    this.screenShake = 10;
    this.spawnSparks(opponentBall.x, opponentBall.y, '#ff00ff', 30);
  }

  private resolveSpearHit(
    attackerEntity: Entity,
    defenderEntity: Entity,
    attackerBall: Ball,
    name: string
  ) {
    const w = attackerEntity.weapon.isDual ? WEAPON_DEFS.giao : attackerEntity.weapon;
    const isUltra = attackerEntity.spear?.state === 'ultra_dashing';
    let dmg = dealDamage(w, defenderEntity.weapon.isDual ? null : defenderEntity.weapon, w.dmg || 20);
    if (isUltra) dmg *= 3;
    if (attackerEntity.element && attackerEntity.element.type === 'lightning') {
      dmg += lightningBoltDmg(attackerEntity.element.tier);
    }
    const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attackerEntity, dmg);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(defenderEntity, roundedDmg);

    attackerBall.vx = 0;
    attackerBall.vy = 0;
    if (attackerEntity.spear) {
      attackerEntity.spear.state = 'idle';
      attackerEntity.spear.lungeCount = isUltra ? 0 : attackerEntity.spear.lungeCount + 1;
      attackerEntity.spear.nextReadyAt = this.now + spearCooldownMs(attackerEntity);
    }
    attackerEntity.weaponRecoil = 1;

    const dBall = defenderEntity === this.p ? this.playerBall : this.enemyBall;
    this.triggerSoTanAttackBeast(attackerEntity, defenderEntity, attackerBall, dBall, name, roundedDmg);

    this.logMessage = `${name} ${isUltra ? 'ULTRA LUNGE trúng' : 'đâm giáo trúng'}${
      isCrit ? ' [BẠO KÍCH!]' : ''
    }, gây ${roundedDmg} sát thương`;
    this.spawnSparks(attackerBall.x, attackerBall.y, '#ffe066', 20);
  }

  private resolveMaceHit(
    attackerEntity: Entity,
    defenderEntity: Entity,
    attackerBall: Ball,
    defenderBall: Ball,
    name: string
  ) {
    const w = attackerEntity.weapon.isDual ? WEAPON_DEFS.mace : attackerEntity.weapon;
    const speed = Math.hypot(attackerBall.vx, attackerBall.vy);
    const dmg = (w.dmg || 25) + speed * (w.maceScale || 0.2);
    const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attackerEntity, dmg);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(defenderEntity, roundedDmg);

    const dx = defenderBall.x - attackerBall.x;
    const dy = defenderBall.y - attackerBall.y;
    const len = Math.hypot(dx, dy) || 1;
    defenderBall.vx = (dx / len) * MACE_KNOCKBACK_SPEED;
    defenderBall.vy = (dy / len) * MACE_KNOCKBACK_SPEED;
    defenderEntity.maceFlight = { active: true, wallHits: 0 };

    if (attackerEntity.mace) {
      attackerEntity.mace.state = 'idle';
      attackerEntity.mace.nextReadyAt = this.now + MACE_COOLDOWN_MS * getRoleSpeedMultiplier(attackerEntity);
    }
    attackerEntity.weaponRecoil = 1;

    this.triggerSoTanAttackBeast(attackerEntity, defenderEntity, attackerBall, defenderBall, name, roundedDmg);

    this.logMessage = `${name} chùy dập trúng${isCrit ? ' [BẠO KÍCH!]' : ''}, gây ${roundedDmg} sát thương! Đối phương bị hất bay!`;
    this.spawnSparks(defenderBall.x, defenderBall.y, '#ffffff', 25);
    this.screenShake = 6;
  }

  private updateSpear(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    name: string
  ) {
    if (!entity.spear || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const s = entity.spear;

    if (s.state === 'idle' && this.now >= s.nextReadyAt) {
      const isUltra = s.lungeCount >= LUNGE_TRIGGER_COUNT;
      if (isUltra) {
        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const len = Math.hypot(dx, dy) || 1;
        ownBall.vx = (dx / len) * ULTRA_LUNGE_SPEED;
        ownBall.vy = (dy / len) * ULTRA_LUNGE_SPEED;
        s.state = 'ultra_dashing';
        s.ultraStartAt = this.now;
        this.logMessage = `${name} kích hoạt ULTRA LUNGE cực mạnh!`;
      } else {
        s.state = 'charging';
        s.chargeEndAt = this.now + spearChargeMs(entity);
        ownBall.vx = 0;
        ownBall.vy = 0;
      }
    } else if (s.state === 'charging') {
      ownBall.vx = 0;
      ownBall.vy = 0;
      if (this.now >= s.chargeEndAt) {
        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const len = Math.hypot(dx, dy) || 1;
        ownBall.vx = (dx / len) * 300;
        ownBall.vy = (dy / len) * 300;
        s.state = 'dashing';
      }
    } else if (s.state === 'ultra_dashing') {
      if (this.now - s.ultraStartAt > ULTRA_LUNGE_TIMEOUT) {
        s.state = 'idle';
        s.lungeCount = 0;
        s.nextReadyAt = this.now + spearCooldownMs(entity);
      }
    }
  }

  private updateMace(entity: Entity, _ownBall: Ball) {
    if (!entity.mace || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const m = entity.mace;

    if (m.state === 'idle' && this.now >= m.nextReadyAt) {
      m.state = 'charging';
      m.chargeEndAt = this.now + MACE_CHARGE_MS;
    } else if (m.state === 'charging') {
      if (this.now >= m.chargeEndAt) {
        m.state = 'charged';
      }
    }
  }

  private updateRailguns(dt: number) {
    if (this.battleOver) return;

    const pIsUpgraded = this.p.weapon.key === 'upgraded_railgun' || (this.p.weapon as any).isUpgradedRailgun;
    const eIsUpgraded = this.e.weapon.key === 'upgraded_railgun' || (this.e.weapon as any).isUpgradedRailgun;

    const pCanFire =
      (this.p.weapon.isRailgun || pIsUpgraded) &&
      !(this.p.admin && this.p.admin.freezeUntil > this.now) &&
      !this.isStunned(this.p, this.now);

    const eCanFire =
      (this.e.weapon.isRailgun || eIsUpgraded) &&
      !(this.e.admin && this.e.admin.freezeUntil > this.now) &&
      !this.isStunned(this.e, this.now);

    // Player Railgun trigger
    if (pCanFire && this.p.railgun) {
      if (!this.p.railgun.firing && this.now >= this.p.railgun.nextFireAt) {
        this.p.railgun.firing = true;
        this.p.railgun.fireEndsAt = this.now + (this.p.weapon.beamDurationMs || 5000);
        this.p.railgun.lastTick = this.now;
        this.logMessage = pIsUpgraded
          ? '⚡ [UPGRADED RAILGUN]: Bạn khai hỏa SIÊU CHÙM TIA RAILGUN NÂNG CẤP (Tia Điện Lam Khổng Lồ - 25 DMG/0.1s - Nạp 3s)!'
          : 'Bạn khai hỏa chùm tia Railgun (Tia Xanh)!';
        this.screenShake = pIsUpgraded ? 8 : 4;
      }
    }

    // Enemy Railgun trigger
    if (eCanFire && this.e.railgun) {
      if (!this.e.railgun.firing && this.now >= this.e.railgun.nextFireAt) {
        this.e.railgun.firing = true;
        this.e.railgun.fireEndsAt = this.now + (this.e.weapon.beamDurationMs || 5000);
        this.e.railgun.lastTick = this.now;
        this.logMessage = eIsUpgraded
          ? '⚡ [UPGRADED RAILGUN]: Địch khai hỏa SIÊU CHÙM TIA RAILGUN NÂNG CẤP (Tia Điện Đỏ Khổng Lồ - 25 DMG/0.1s - Nạp 3s)!'
          : 'Địch khai hỏa chùm tia Railgun (Tia Đỏ)!';
        this.screenShake = eIsUpgraded ? 8 : 4;
      }
    }

    const pFiring = Boolean(pCanFire && this.p.railgun?.firing);
    const eFiring = Boolean(eCanFire && this.e.railgun?.firing);

    // CASE 1: BOTH RAILGUNS FIRING SIMULTANEOUSLY -> RAILGUN CLASH & PURPLE ORB
    if (pFiring && eFiring) {
      if (!this.railgunClash || !this.railgunClash.active) {
        // Initialize Clash at midpoint
        const midX = (this.playerBall.x + this.enemyBall.x) / 2;
        const midY = (this.playerBall.y + this.enemyBall.y) / 2;
        const distPlayer = Math.hypot(this.playerBall.x - midX, this.playerBall.y - midY);
        const distEnemy = Math.hypot(this.enemyBall.x - midX, this.enemyBall.y - midY);
        
        let targetSide: 'player' | 'enemy';
        if (pIsUpgraded && !eIsUpgraded) {
          targetSide = 'enemy';
        } else if (!pIsUpgraded && eIsUpgraded) {
          targetSide = 'player';
        } else {
          targetSide = distPlayer <= distEnemy ? 'player' : 'enemy';
        }

        this.railgunClash = {
          active: true,
          orbX: midX,
          orbY: midY,
          orbRadius: 16,
          startedAt: this.now,
          targetSide
        };

        if (pIsUpgraded && !eIsUpgraded) {
          this.logMessage = '⚡👑 [ÁP ĐẢO RAILGUN]: Railgun Nâng Cấp phóng tia laser siêu đại áp chế chùm tia thường! Đẩy quả cầu năng lượng về phía địch!';
        } else if (!pIsUpgraded && eIsUpgraded) {
          this.logMessage = '⚡⚠️ [ÁP ĐẢO RAILGUN]: Railgun Nâng Cấp của địch áp chế chùm tia thường! Đẩy quả cầu năng lượng về phía bạn!';
        } else {
          this.logMessage = '⚡ [ĐỐI ĐẦU RAILGUN]: Tia Xanh đối đầu Tia Đỏ! Quả cầu tím tích tụ (+1.5 DMG/0.15s, +2.5px/0.125s)!';
        }
        this.screenShake = (pIsUpgraded || eIsUpgraded) ? 14 : 8;
      }

      // Prolong firing while clash is ongoing so it can reach nuke size
      if (this.p.railgun) this.p.railgun.fireEndsAt = Math.max(this.p.railgun.fireEndsAt, this.now + 2000);
      if (this.e.railgun) this.e.railgun.fireEndsAt = Math.max(this.e.railgun.fireEndsAt, this.now + 2000);

      const elapsed = this.now - this.railgunClash.startedAt;
      
      // Speed up: +1.5 DMG / 0.15s & +2.5px / 0.125s
      const dmgTicks = Math.floor(elapsed / 150);
      const bonusDmg = Math.round(dmgTicks * 1.5);
      const sizeTicks = elapsed / 125;
      this.railgunClash.orbRadius = Math.min(100, 16 + sizeTicks * 2.5);

      // Sức mạnh lớn hơn khi solo với Railgun thường: Quả cầu bị đẩy lùi mạnh về phía kẻ dùng Railgun thường!
      let targetSide: 'player' | 'enemy';
      if (pIsUpgraded && !eIsUpgraded) {
        targetSide = 'enemy';
      } else if (!pIsUpgraded && eIsUpgraded) {
        targetSide = 'player';
      } else {
        const distToPlayer = Math.hypot(this.playerBall.x - this.railgunClash.orbX, this.playerBall.y - this.railgunClash.orbY);
        const distToEnemy = Math.hypot(this.enemyBall.x - this.railgunClash.orbX, this.enemyBall.y - this.railgunClash.orbY);
        targetSide = distToPlayer <= distToEnemy ? 'player' : 'enemy';
      }
      this.railgunClash.targetSide = targetSide;

      const targetBall = targetSide === 'player' ? this.playerBall : this.enemyBall;
      const otherBall = targetSide === 'player' ? this.enemyBall : this.playerBall;
      const targetEntity = targetSide === 'player' ? this.p : this.e;
      const otherEntity = targetSide === 'player' ? this.e : this.p;
      const targetName = targetSide === 'player' ? 'Bạn' : 'Địch';
      const otherName = targetSide === 'player' ? 'Địch' : 'Bạn';
      const dist = Math.hypot(targetBall.x - this.railgunClash.orbX, targetBall.y - this.railgunClash.orbY);

      // Move the purple orb towards the target side with increased agility if upgraded
      const dx = targetBall.x - this.railgunClash.orbX;
      const dy = targetBall.y - this.railgunClash.orbY;
      const speedMultiplier = ((pIsUpgraded && !eIsUpgraded) || (!pIsUpgraded && eIsUpgraded)) ? 1.75 : 1;
      const moveSpeed = (85 + Math.min(320, (elapsed / 1000) * 45)) * speedMultiplier;

      if (dist > 0) {
        this.railgunClash.orbX += (dx / dist) * moveSpeed * dt;
        this.railgunClash.orbY += (dy / dist) * moveSpeed * dt;
      }

      // Spawn electrical sparks and energy field around the orb
      if (Math.random() < 0.85) {
        const sparkSpread = this.railgunClash.orbRadius * 0.9;
        this.spawnSparks(
          this.railgunClash.orbX + (Math.random() - 0.5) * sparkSpread,
          this.railgunClash.orbY + (Math.random() - 0.5) * sparkSpread,
          this.railgunClash.orbRadius >= 70 ? '#fbbf24' : '#d946ef',
          2
        );
      }

      // Laser graphics for both beams meeting at orb
      this.laserGfx = {
        playerActive: true,
        playerX1: this.playerBall.x,
        playerY1: this.playerBall.y,
        playerX2: this.railgunClash.orbX,
        playerY2: this.railgunClash.orbY,
        enemyActive: true,
        enemyX1: this.enemyBall.x,
        enemyY1: this.enemyBall.y,
        enemyX2: this.railgunClash.orbX,
        enemyY2: this.railgunClash.orbY
      };

      // CHECK NUKE EXPLOSION: Orb reaches 100px
      if (this.railgunClash.orbRadius >= 100) {
        let nukeDirectDmg = Math.round((2500 + bonusDmg) * this.dmgMul);
        let nukeShockwaveDmg = Math.round((800 + Math.floor(bonusDmg * 0.5)) * this.dmgMul);

        // Khắc chế solo: Upgraded Railgun giảm 50% sát thương, đối thủ thường chịu thêm +50%
        if (pIsUpgraded && !eIsUpgraded) {
          if (targetEntity === this.e) {
            nukeDirectDmg = Math.round(nukeDirectDmg * 1.5);
            nukeShockwaveDmg = Math.round(nukeShockwaveDmg * 0.5);
          }
        } else if (!pIsUpgraded && eIsUpgraded) {
          if (targetEntity === this.p) {
            nukeDirectDmg = Math.round(nukeDirectDmg * 1.5);
            nukeShockwaveDmg = Math.round(nukeShockwaveDmg * 0.5);
          }
        }

        this.applyDamage(targetEntity, nukeDirectDmg, otherEntity);
        this.applyDamage(otherEntity, nukeShockwaveDmg, targetEntity);

        this.screenShake = 35; // Catastrophic nuke shake

        // Massive multi-layered nuke blast waves
        [
          { maxRad: 450, color: '#f59e0b', thickness: 12, maxLife: 1.1 },
          { maxRad: 360, color: '#d946ef', thickness: 10, maxLife: 0.9 },
          { maxRad: 260, color: '#ef4444', thickness: 8, maxLife: 0.75 },
          { maxRad: 180, color: '#ffffff', thickness: 6, maxLife: 0.55 }
        ].forEach(ring => {
          this.expandingRings.push({
            x: this.railgunClash!.orbX,
            y: this.railgunClash!.orbY,
            radius: 15,
            maxRadius: ring.maxRad,
            thickness: ring.thickness,
            color: ring.color,
            alpha: 1,
            life: 0,
            maxLife: ring.maxLife
          });
        });

        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#ff0055', 40);
        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#d946ef', 35);
        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#fbbf24', 30);
        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#ffffff', 25);

        this.logMessage = `💥☢️ [SIÊU BOM NUKE PHÁT NỔ]: Quả cầu đạt 100px hóa BOM HẠT NHÂN! ${targetName} (gần nhất) dính tâm nổ -${nukeDirectDmg.toLocaleString()} HP, ${otherName} chịu dư chấn -${nukeShockwaveDmg.toLocaleString()} HP!`;

        if (this.p.railgun) {
          this.p.railgun.firing = false;
          this.p.railgun.nextFireAt = this.now + (this.p.weapon.fireCycleMs || (pIsUpgraded ? 3000 : 5000));
        }
        if (this.e.railgun) {
          this.e.railgun.firing = false;
          this.e.railgun.nextFireAt = this.now + (this.e.weapon.fireCycleMs || (eIsUpgraded ? 3000 : 5000));
        }
        this.railgunClash = null;
        this.laserGfx = null;
        return;
      }

      // CHECK DIRECT HIT COLLISION: Orb hits the closest ball before 100px
      const hitRadius = targetBall.radius + this.railgunClash.orbRadius;
      if (dist <= hitRadius) {
        let directDmg = Math.round((500 + bonusDmg) * this.dmgMul);
        let shockwaveDmg = Math.round((100 + Math.floor(bonusDmg * 0.4)) * this.dmgMul);

        // Khắc chế solo với Railgun thường
        if (pIsUpgraded && !eIsUpgraded) {
          if (targetEntity === this.e) {
            directDmg = Math.round(directDmg * 1.5);
            shockwaveDmg = Math.round(shockwaveDmg * 0.5);
          }
        } else if (!pIsUpgraded && eIsUpgraded) {
          if (targetEntity === this.p) {
            directDmg = Math.round(directDmg * 1.5);
            shockwaveDmg = Math.round(shockwaveDmg * 0.5);
          }
        }

        this.applyDamage(targetEntity, directDmg, otherEntity);
        this.applyDamage(otherEntity, shockwaveDmg, targetEntity);

        this.screenShake = 18 + Math.min(12, this.railgunClash.orbRadius * 0.15);

        const maxR = Math.max(160, this.railgunClash.orbRadius * 3.5);
        this.expandingRings.push({
          x: this.railgunClash.orbX,
          y: this.railgunClash.orbY,
          radius: 10,
          maxRadius: maxR,
          thickness: 8,
          color: '#a855f7',
          alpha: 1,
          life: 0,
          maxLife: 0.65
        });
        this.expandingRings.push({
          x: this.railgunClash.orbX,
          y: this.railgunClash.orbY,
          radius: 5,
          maxRadius: maxR * 0.6,
          thickness: 4,
          color: '#e879f9',
          alpha: 1,
          life: 0,
          maxLife: 0.4
        });

        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#c084fc', 35);
        this.spawnSparks(this.railgunClash.orbX, this.railgunClash.orbY, '#ffffff', 20);

        this.logMessage = `⚡ [ĐỐI ĐẦU RAILGUN]: Quả cầu tím nổ tung! ${targetName} dính trực tiếp -${directDmg.toLocaleString()} HP (+${bonusDmg} tích tụ), ${otherName} chịu chấn -${shockwaveDmg.toLocaleString()} HP!`;

        // End firing for both with weapon specific fire cycle (3s for upgraded railgun)
        if (this.p.railgun) {
          this.p.railgun.firing = false;
          this.p.railgun.nextFireAt = this.now + (this.p.weapon.fireCycleMs || (pIsUpgraded ? 3000 : 5000));
        }
        if (this.e.railgun) {
          this.e.railgun.firing = false;
          this.e.railgun.nextFireAt = this.now + (this.e.weapon.fireCycleMs || (eIsUpgraded ? 3000 : 5000));
        }
        this.railgunClash = null;
        this.laserGfx = null;
      }
      return;
    }

    // If clash was active but one stopped, reset clash
    if (this.railgunClash) {
      this.railgunClash = null;
    }

    // CASE 2: ONLY PLAYER FIRING (Blue/Cyan beam)
    if (pFiring && this.p.railgun) {
      this.laserGfx = {
        playerActive: true,
        playerX1: this.playerBall.x,
        playerY1: this.playerBall.y,
        playerX2: this.enemyBall.x,
        playerY2: this.enemyBall.y,
        enemyActive: false,
        enemyX1: 0,
        enemyY1: 0,
        enemyX2: 0,
        enemyY2: 0
      };

      if (this.now - this.p.railgun.lastTick >= (this.p.weapon.tickMs || 100)) {
        // Upgraded railgun: 25 DMG per tick (5x dmg compared to standard 5 DMG)
        const baseTick = pIsUpgraded ? 25 : (this.p.weapon.tickDmg || 5);
        const { dmg: finalDmg } = this.finalizeAttackerDmg(this.p, baseTick);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(this.e, roundedDmg, this.p);
        this.p.railgun.lastTick = this.now;
        this.spawnSparks(this.enemyBall.x, this.enemyBall.y, pIsUpgraded ? '#00e5ff' : '#38bdf8', pIsUpgraded ? 7 : 3);
      }

      if (this.now >= this.p.railgun.fireEndsAt) {
        this.p.railgun.firing = false;
        // Tốc độ nạp 3s cho upgraded railgun
        this.p.railgun.nextFireAt = this.now + (this.p.weapon.fireCycleMs || (pIsUpgraded ? 3000 : 5000));
        this.laserGfx = null;
      }
      return;
    }

    // CASE 3: ONLY ENEMY FIRING (Red beam)
    if (eFiring && this.e.railgun) {
      this.laserGfx = {
        playerActive: false,
        playerX1: 0,
        playerY1: 0,
        playerX2: 0,
        playerY2: 0,
        enemyActive: true,
        enemyX1: this.enemyBall.x,
        enemyY1: this.enemyBall.y,
        enemyX2: this.playerBall.x,
        enemyY2: this.playerBall.y
      };

      if (this.now - this.e.railgun.lastTick >= (this.e.weapon.tickMs || 100)) {
        // Upgraded railgun: 25 DMG per tick (5x dmg compared to standard 5 DMG)
        const baseTick = eIsUpgraded ? 25 : (this.e.weapon.tickDmg || 5);
        const { dmg: finalDmg } = this.finalizeAttackerDmg(this.e, baseTick);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(this.p, roundedDmg, this.e);
        this.e.railgun.lastTick = this.now;
        this.spawnSparks(this.playerBall.x, this.playerBall.y, eIsUpgraded ? '#f43f5e' : '#ef4444', eIsUpgraded ? 7 : 3);
      }

      if (this.now >= this.e.railgun.fireEndsAt) {
        this.e.railgun.firing = false;
        // Tốc độ nạp 3s cho upgraded railgun
        this.e.railgun.nextFireAt = this.now + (this.e.weapon.fireCycleMs || (eIsUpgraded ? 3000 : 5000));
        this.laserGfx = null;
      }
      return;
    }

    // CASE 4: NEITHER FIRING
    this.laserGfx = null;
  }

  public triggerUltraLaser(attacker: Entity): boolean {
    if (this.battleOver || this.ultraLaser) return false;
    const isPlayer = attacker === this.p;
    const atkBall = isPlayer ? this.playerBall : this.enemyBall;
    const oppBall = isPlayer ? this.enemyBall : this.playerBall;

    this.ultraLaser = {
      active: true,
      charging: true,
      chargeStart: this.now,
      chargeDuration: 2000,
      sphereX: atkBall.x,
      sphereY: atkBall.y,
      targetX: oppBall.x,
      targetY: oppBall.y,
      fired: false,
      firedAt: 0,
      speed: 480,
      radius: 22,
      dmg: 1000,
      attackerIsPlayer: isPlayer
    };

    sound.playUltraLaserCharge();
    this.screenShake = 8;
    this.logMessage = isPlayer
      ? '⚡ [UPGRADED RAILGUN]: ĐANG TÍCH ĐÒN ULTRA LASER (2s)... Tụ siêu cầu nổ 1.000 DMG!'
      : '⚡ [UPGRADED RAILGUN]: ĐỊCH ĐANG TÍCH ĐÒN ULTRA LASER (2s)... Cảnh giác siêu cầu 1.000 DMG!';
    return true;
  }

  private updateUltraLaser(dt: number) {
    if (!this.ultraLaser || !this.ultraLaser.active || this.battleOver) return;
    const ul = this.ultraLaser;
    const atkBall = ul.attackerIsPlayer ? this.playerBall : this.enemyBall;
    const oppBall = ul.attackerIsPlayer ? this.enemyBall : this.playerBall;
    const oppEnt = ul.attackerIsPlayer ? this.e : this.p;
    const atkEnt = ul.attackerIsPlayer ? this.p : this.e;
    const oppName = ul.attackerIsPlayer ? 'Địch' : 'Bạn';
    const atkName = ul.attackerIsPlayer ? 'Bạn' : 'Địch';

    if (ul.charging) {
      ul.sphereX = atkBall.x;
      ul.sphereY = atkBall.y;
      const elapsed = this.now - ul.chargeStart;

      // Electric sparks gathering into core
      if (Math.random() < 0.6) {
        const angle = Math.random() * Math.PI * 2;
        const rad = 25 + Math.random() * 25;
        this.spawnSparks(ul.sphereX + Math.cos(angle) * rad, ul.sphereY + Math.sin(angle) * rad, '#38bdf8', 2);
      }

      if (elapsed >= ul.chargeDuration) {
        ul.charging = false;
        ul.fired = true;
        ul.firedAt = this.now;
        sound.playUltraLaserBlast();
        this.screenShake = 16;
        this.logMessage = `⚡🚀 [UPGRADED RAILGUN]: ${atkName} PHÓNG SIÊU CẦU ULTRA LASER 1.000 DMG XÉ TOẠC KHÔNG GIAN!`;

        // Ring blast on firing
        this.expandingRings.push({
          x: ul.sphereX,
          y: ul.sphereY,
          radius: 10,
          maxRadius: 120,
          thickness: 6,
          color: '#38bdf8',
          alpha: 1,
          life: 0,
          maxLife: 0.4
        });
      }
      return;
    }

    if (ul.fired) {
      const dx = oppBall.x - ul.sphereX;
      const dy = oppBall.y - ul.sphereY;
      const dist = Math.hypot(dx, dy) || 1;

      ul.sphereX += (dx / dist) * ul.speed * dt;
      ul.sphereY += (dy / dist) * ul.speed * dt;

      // Trailing sparks
      if (Math.random() < 0.8) {
        this.spawnSparks(ul.sphereX, ul.sphereY, '#67e8f9', 2);
        this.spawnSparks(ul.sphereX, ul.sphereY, '#3b82f6', 1);
      }

      // Check collision with target ball
      if (dist <= oppBall.radius + ul.radius) {
        const finalDmg = Math.round(1000 * this.dmgMul);
        this.applyDamage(oppEnt, finalDmg, atkEnt);
        sound.playUltraLaserBlast();
        this.screenShake = 32;

        // Expanding blast rings
        [
          { maxRad: 280, color: '#00e5ff', thickness: 10, maxLife: 0.8 },
          { maxRad: 200, color: '#3b82f6', thickness: 8, maxLife: 0.6 },
          { maxRad: 120, color: '#ffffff', thickness: 6, maxLife: 0.4 }
        ].forEach(ring => {
          this.expandingRings.push({
            x: ul.sphereX,
            y: ul.sphereY,
            radius: 12,
            maxRadius: ring.maxRad,
            thickness: ring.thickness,
            color: ring.color,
            alpha: 1,
            life: 0,
            maxLife: ring.maxLife
          });
        });

        this.spawnSparks(ul.sphereX, ul.sphereY, '#00e5ff', 40);
        this.spawnSparks(ul.sphereX, ul.sphereY, '#ffffff', 25);
        this.spawnSparks(ul.sphereX, ul.sphereY, '#3b82f6', 25);

        this.floatingTexts.push({
          text: `⚡💥 -${finalDmg.toLocaleString()} DMG (ULTRA LASER)!`,
          x: oppBall.x,
          y: oppBall.y - 35,
          color: '#38bdf8',
          createdAt: this.now,
          expiresAt: this.now + 3500
        });

        this.logMessage = `⚡💥 [ULTRA LASER PHÁT NỔ]: Siêu cầu nổ oanh tạc trúng ${oppName}! Gây -${finalDmg.toLocaleString()} HP cực đại!`;
        this.ultraLaser = null;
      }
    }
  }

  private updateMinigun(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (!entity.weapon.isMinigun || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const m = entity.minigun;
    const w = entity.weapon;
    if (!m) return;

    if (m.ammo <= 0 && !m.reloading) {
      m.reloading = true;
      m.reloadEndsAt = this.now + (w.reloadMs || 3000);
      this.logMessage = `${name}: Minigun hết đạn, đang nạp lại...`;
    }
    if (m.reloading) {
      if (this.now >= m.reloadEndsAt) {
        m.ammo = w.maxAmmo || 10000;
        m.reloading = false;
      }
      return;
    }

    const isHeat = m.ammo <= (w.maxAmmo || 10000) - (w.heatThreshold || 250);
    const rate = isHeat ? w.heatRate || 30 : w.normalRate || 20;
    const dmgPerShot = isHeat ? w.heatDmg || 15 : w.normalDmg || 10;
    let interval = (1000 / rate) * getRoleSpeedMultiplier(entity);
    if (entity.admin && entity.admin.speedActive) interval *= 0.5;

    if (this.now - m.lastShotAt >= interval) {
      m.lastShotAt = this.now;
      m.ammo -= 1;
      const { dmg: finalDmg } = this.finalizeAttackerDmg(entity, dmgPerShot);
      const roundedDmg = Math.round(finalDmg * this.dmgMul);
      this.applyDamage(opponentEntity, roundedDmg);

      if (entity.element && entity.element.type === 'lightning') {
        m.shotCount = (m.shotCount || 0) + 1;
        if (m.shotCount >= MINIGUN_LIGHTNING_EVERY) {
          m.shotCount = 0;
          const bolt = Math.round(lightningBoltDmg(entity.element.tier) * this.dmgMul);
          this.applyDamage(opponentEntity, bolt);
          this.logMessage = `${name} Minigun tích tụ sấm sét, phóng sét giật -${bolt} HP`;
          this.spawnSparks(opponentBall.x, opponentBall.y, '#ffff33', 15);
        }
      }

      this.minigunGfx = {
        active: true,
        x1: ownBall.x,
        y1: ownBall.y,
        x2: opponentBall.x,
        y2: opponentBall.y,
        isHeat
      };
      setTimeout(() => {
        this.minigunGfx = null;
      }, 40);
    }
  }

  private updateRangedMelee(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (!entity.weapon.isRangedMelee || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const rm = entity.rangedMelee;
    const w = entity.weapon;
    if (!rm) return;

    let interval = (1000 / (w.rate || 1)) * getRoleSpeedMultiplier(entity);
    if (entity.admin && entity.admin.speedActive) interval *= 0.5;

    if (this.now - rm.lastAtkAt < interval) return;

    const dx = opponentBall.x - ownBall.x;
    const dy = opponentBall.y - ownBall.y;
    const dist = Math.hypot(dx, dy);
    if (dist > (w.range || 50)) return;

    rm.lastAtkAt = this.now;
    entity.weaponRecoil = 1;
    let dmg = w.dmg || 15;
    if (entity.element && entity.element.type === 'lightning') {
      dmg += lightningBoltDmg(entity.element.tier);
    }
    const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(entity, dmg);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(opponentEntity, roundedDmg);

    this.triggerSoTanAttackBeast(entity, opponentEntity, ownBall, opponentBall, name, roundedDmg);

    if (entity.weapon.key === 'sangthe') {
      this.holySlashes.push({
        x: opponentBall.x,
        y: opponentBall.y,
        startTime: this.now,
        duration: 450
      });
      this.shakeScreen(7);
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: opponentBall.x + (Math.random() - 0.5) * 30,
          y: opponentBall.y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 140,
          vy: (Math.random() - 0.5) * 140,
          radius: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#facc15' : '#ffffff',
          alpha: 1,
          life: 0,
          maxLife: 0.35
        });
      }
      this.logMessage = `${name} vung Sáng Thế Chi Kiếm - Thánh Quang Trảm giáng thế${isCrit ? ' [BẠO KÍCH!]' : ''} (-${roundedDmg} HP)!`;
    } else if (entity.weapon.key === 'torch') {
      opponentEntity.torchBurn = {
        endsAt: this.now + (w.burnDuration || 5000),
        tickMs: w.burnTickMs || 200,
        dmgPerTick: w.burnDmgPerTick || 2,
        lastTick: this.now
      };
      for (let i = 0; i < 6; i++) {
        this.particles.push({
          x: opponentBall.x + (Math.random() - 0.5) * 20,
          y: opponentBall.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 60,
          vy: -Math.random() * 80 - 20,
          radius: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#ff6a1a' : '#ffd23f',
          alpha: 1,
          life: 0,
          maxLife: 0.35
        });
      }
      this.logMessage = `${name} vung Đuốc thiêu đốt! Đối thủ bốc cháy rực lửa (-${w.burnDmgPerTick || 2} DMG/0.2s)${isCrit ? ' [BẠO KÍCH!]' : ''}!`;
    } else {
      this.logMessage = `${name} dùng ${entity.weapon.name}${isCrit ? ' [BẠO KÍCH!]' : ''}, gây ${roundedDmg} sát thương`;
    }

    this.expandingRings.push({
      x: ownBall.x,
      y: ownBall.y,
      radius: 0,
      maxRadius: w.range || 50,
      color: entity.weapon.key === 'sangthe' ? '#facc15' : entity.weapon.key === 'torch' ? '#ff6a1a' : '#ffd700',
      alpha: 0.8,
      thickness: 2.5,
      life: 0,
      maxLife: 0.25
    });
  }

  private tickTorchBurn(entity: Entity, now: number) {
    const b = entity.torchBurn;
    if (!b) return;
    if (now > b.endsAt) {
      entity.torchBurn = null;
      return;
    }
    if (now - b.lastTick >= b.tickMs) {
      const dmg = Math.round(b.dmgPerTick * this.dmgMul);
      this.applyDamage(entity, dmg);
      b.lastTick = now;
      const targetBall = entity === this.p ? this.playerBall : this.enemyBall;
      this.particles.push({
        x: targetBall.x + (Math.random() - 0.5) * 16,
        y: targetBall.y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 30,
        vy: -Math.random() * 40 - 15,
        radius: 2,
        color: '#ff6a1a',
        alpha: 0.8,
        life: 0,
        maxLife: 0.25
      });
    }
  }

  private tickDayNit(entity: Entity, now: number) {
    const d = entity.dayNitEffect;
    if (!d) return;
    if (now > d.endsAt || d.remainingTicks <= 0) {
      entity.dayNitEffect = null;
      return;
    }
    if (now - d.lastTick >= d.tickInterval) {
      const dmg = Math.round(d.dmgPerTick * this.dmgMul);
      this.applyDamage(entity, dmg);
      d.lastTick = now;
      d.remainingTicks--;
      const targetBall = entity === this.p ? this.playerBall : this.enemyBall;
      for (let i = 0; i < 3; i++) {
        this.particles.push({
          x: targetBall.x + (Math.random() - 0.5) * 24,
          y: targetBall.y + (Math.random() - 0.5) * 24,
          vx: (Math.random() - 0.5) * 60,
          vy: -Math.random() * 50 - 15,
          radius: 2,
          color: Math.random() > 0.4 ? '#ef4444' : '#f59e0b',
          alpha: 0.9,
          life: 0,
          maxLife: 0.25
        });
      }
    }
  }

  private updateBowAndCrossbow(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if ((!entity.weapon.isBow && !entity.weapon.isCrossbow) || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    if (this.isRooted(entity, this.now)) return;

    let cooldown = computeCooldown(entity);
    if (entity.admin && entity.admin.speedActive) cooldown *= 0.5;

    if (this.now < entity.nextAtkAt) return;
    entity.nextAtkAt = this.now + cooldown;
    entity.weaponRecoil = 1;

    const angle = Math.atan2(opponentBall.y - ownBall.y, opponentBall.x - ownBall.x);

    if (entity.weapon.isBow) {
      const speed = 550;
      this.projectiles.push({
        id: `arrow_${Math.random()}`,
        type: 'arrow',
        x: ownBall.x + Math.cos(angle) * (ownBall.radius + 8),
        y: ownBall.y + Math.sin(angle) * (ownBall.radius + 8),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle,
        radius: 6,
        length: 26,
        dmg: entity.weapon.dmg || 16,
        ownerIsPlayer: entity === this.p,
        color: '#c99a5b',
        createdAt: this.now,
        lifetimeMs: 1600
      });
      this.logMessage = `${name} giương Cung bắn ra mũi tên bay vút!`;
    } else if (entity.weapon.isCrossbow) {
      const speed = 680;
      this.projectiles.push({
        id: `bolt_${Math.random()}`,
        type: 'crossbow_bolt',
        x: ownBall.x + Math.cos(angle) * (ownBall.radius + 10),
        y: ownBall.y + Math.sin(angle) * (ownBall.radius + 10),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle,
        radius: 8,
        length: 30,
        dmg: entity.weapon.dmg || 45,
        ownerIsPlayer: entity === this.p,
        pierceShield: true,
        color: '#ef4444',
        createdAt: this.now,
        lifetimeMs: 1400
      });
      this.logMessage = `${name} bóp cò Nỏ phóng mũi tên thép xuyên giáp uy lực cực mạnh!`;
    }
  }

  private updateSongKiem(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string,
    dt: number
  ) {
    if ((!entity.weapon.isDualSwords && entity.weapon.key !== 'songkiem' && entity.weapon.key !== 'than_songkiem') || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    if (!entity.songkiem) return;

    const sk = entity.songkiem;

    // 1. Skill 2: [NHẤT QUANG] - Đứng im tích tụ năng lượng và phóng ra luồng kiếm khổng lồ
    if (sk.isChargingNhatQuang) {
      // Ball stops completely while charging
      ownBall.vx = 0;
      ownBall.vy = 0;

      // Inward sucking charge particles
      if (Math.random() < 0.6) {
        const pAngle = Math.random() * Math.PI * 2;
        const pDist = 35 + Math.random() * 30;
        this.particles.push({
          x: ownBall.x + Math.cos(pAngle) * pDist,
          y: ownBall.y + Math.sin(pAngle) * pDist,
          vx: -Math.cos(pAngle) * 65,
          vy: -Math.sin(pAngle) * 65,
          radius: 2 + Math.random() * 2,
          color: Math.random() > 0.5 ? '#22d3ee' : '#facc15',
          alpha: 0.9,
          life: 0,
          maxLife: 0.35
        });
      }

      const chargeElapsed = this.now - sk.nhatQuangChargeStartTime;
      if (chargeElapsed >= SONGKIEM_NHATQUANG_CHARGE_MS) {
        // Release the Giant Sword Light Beam!
        sk.isChargingNhatQuang = false;
        sk.nhatQuangNextAt = this.now + SONGKIEM_NHATQUANG_COOLDOWN;
        entity.weaponRecoil = 1;

        const angle = Math.atan2(opponentBall.y - ownBall.y, opponentBall.x - ownBall.x);
        const speed = SONGKIEM_NHATQUANG_SPEED;

        this.projectiles.push({
          id: `sk_nhatquang_${Math.random()}`,
          type: 'songkiem_nhatquang',
          x: ownBall.x + Math.cos(angle) * (ownBall.radius + 12),
          y: ownBall.y + Math.sin(angle) * (ownBall.radius + 12),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle,
          radius: SONGKIEM_NHATQUANG_RADIUS,
          length: 85,
          dmg: Math.round(SONGKIEM_NHATQUANG_DMG * (entity.weapon.key === 'than_songkiem' ? THAN_SONGKIEM_SKILL_DMG_MUL : 1)),
          ownerIsPlayer: entity === this.p,
          pierceShield: true,
          color: '#00f2ff',
          createdAt: this.now,
          lifetimeMs: 1800
        });

        this.shakeScreen(7);
        this.expandingRings.push({
          x: ownBall.x,
          y: ownBall.y,
          radius: 0,
          maxRadius: 90,
          color: '#facc15',
          alpha: 1,
          thickness: 4,
          life: 0,
          maxLife: 0.35
        });

        for (let i = 0; i < 14; i++) {
          this.particles.push({
            x: ownBall.x,
            y: ownBall.y,
            vx: (Math.random() - 0.5) * 160,
            vy: (Math.random() - 0.5) * 160,
            radius: 2.5 + Math.random() * 3,
            color: Math.random() > 0.5 ? '#22d3ee' : '#facc15',
            alpha: 1,
            life: 0,
            maxLife: 0.4
          });
        }

        this.logMessage = `✨ [NHẤT QUANG]: ${name} giải phóng vạn đạo kiếm khí, PHÓNG RA LUỒNG ĐẠI KIẾM KHÍ KHỔNG LỒ XÉ RÁCH KHÔNG GIAN!`;
      }
      return;
    }

    // Check Triggering Skill 2: [NHẤT QUANG]
    if (this.now >= sk.nhatQuangNextAt && !sk.comboActive && !this.isRooted(entity, this.now)) {
      sk.isChargingNhatQuang = true;
      sk.nhatQuangChargeStartTime = this.now;
      ownBall.vx = 0;
      ownBall.vy = 0;
      this.logMessage = `✨ [NHẤT QUANG]: ${name} đứng im tụ khí, ngưng tụ luồng kiếm khổng lồ...!`;
      return;
    }

    // 2. Skill 1: [LIÊN HOÀN KÍCH] (Frenzy Combo Rush)
    if (sk.comboActive) {
      // Lock / root opponent
      opponentEntity.rootedUntil = Math.max(opponentEntity.rootedUntil, this.now + 350);

      // Dash towards opponent
      const dx = opponentBall.x - ownBall.x;
      const dy = opponentBall.y - ownBall.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 32) {
        const nx = dx / dist;
        const ny = dy / dist;
        ownBall.vx = nx * SONGKIEM_DASH_SPEED;
        ownBall.vy = ny * SONGKIEM_DASH_SPEED;
      } else {
        ownBall.vx *= 0.2;
        ownBall.vy *= 0.2;
      }

      // Slashes every SONGKIEM_HIT_INTERVAL (130ms)
      if (this.now - sk.lastHitAt >= SONGKIEM_HIT_INTERVAL) {
        sk.lastHitAt = this.now;
        entity.weaponRecoil = 1;
        const hitIndex = sk.totalComboHits - sk.comboHitsLeft + 1;

        let rawDmg = SONGKIEM_COMBO_HIT_DMG;
        if (entity.weapon.key === 'than_songkiem') {
          rawDmg = Math.round(rawDmg * THAN_SONGKIEM_SKILL_DMG_MUL);
        }
        if (entity.element && entity.element.type === 'lightning') {
          rawDmg += lightningBoltDmg(entity.element.tier);
        }
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(entity, rawDmg);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(opponentEntity, roundedDmg);

        this.triggerSoTanAttackBeast(entity, opponentEntity, ownBall, opponentBall, name, roundedDmg);

        this.shakeScreen(3);
        for (let i = 0; i < 6; i++) {
          this.particles.push({
            x: opponentBall.x + (Math.random() - 0.5) * 24,
            y: opponentBall.y + (Math.random() - 0.5) * 24,
            vx: (Math.random() - 0.5) * 130,
            vy: (Math.random() - 0.5) * 130,
            radius: 2 + Math.random() * 2.5,
            color: hitIndex % 2 === 0 ? '#22d3ee' : '#38bdf8',
            alpha: 1,
            life: 0,
            maxLife: 0.25
          });
        }

        this.logMessage = `⚔️ [LIÊN HOÀN KÍCH]: ${name} chém liên hoàn nhát #${hitIndex}${isCrit ? ' [BẠO KÍCH!]' : ''} (-${roundedDmg} HP)!`;

        sk.comboHitsLeft--;

        // Check combo completion & 10% Continuous Chance
        if (sk.comboHitsLeft <= 0) {
          const continueRoll = Math.random() < SONGKIEM_CONTINUE_CHANCE;
          if (continueRoll) {
            sk.comboHitsLeft = 5;
            sk.totalComboHits += 5;
            sk.continuousChanceTriggered = true;
            this.shakeScreen(7);
            this.expandingRings.push({
              x: opponentBall.x,
              y: opponentBall.y,
              radius: 0,
              maxRadius: 80,
              color: '#facc15',
              alpha: 1,
              thickness: 4,
              life: 0,
              maxLife: 0.35
            });
            this.logMessage = `🔥 [10% KÍCH HOẠT TIẾP TỤC]: ${name} bùng nổ ý chí, LIÊN HOÀN KÍCH TIẾP TỤC CHÉM KHÔNG NGỪNG!`;
          } else {
            sk.comboActive = false;
            sk.skillNextAt = this.now + SONGKIEM_COMBO_COOLDOWN;
            sk.targetLocked = false;
          }
        }
      }
      return;
    }

    // Check Triggering Skill 1: [LIÊN HOÀN KÍCH]
    if (this.now >= sk.skillNextAt && !sk.isChargingNhatQuang && !this.isRooted(entity, this.now)) {
      sk.comboActive = true;
      sk.targetLocked = true;
      sk.comboHitsLeft = SONGKIEM_COMBO_HITS;
      sk.totalComboHits = SONGKIEM_COMBO_HITS;
      sk.lastHitAt = this.now;
      sk.dashStartTime = this.now;
      sk.continuousChanceTriggered = false;
      this.logMessage = `⚡ ${name} kích hoạt tuyệt kỹ [LIÊN HOÀN KÍCH] - Lao vào khóa địch chém điên cuồng!`;
      return;
    }

    // 3. Đòn đánh cơ bản: 1 Đường Kiếm Khí tầm xa tốc độ 3 lần / giây (cooldown ~333ms, 5 DMG)
    let cooldown = computeCooldown(entity);
    if (entity.admin && entity.admin.speedActive) cooldown *= 0.5;

    if (this.now >= sk.lastSlashAt + cooldown && !this.isRooted(entity, this.now)) {
      sk.lastSlashAt = this.now;
      entity.weaponRecoil = 1;

      const angle = Math.atan2(opponentBall.y - ownBall.y, opponentBall.x - ownBall.x);
      const speed = SONGKIEM_SLASH_SPEED;

      // 1 Đường Kiếm Khí Tầm Xa Uy Lực
      this.projectiles.push({
        id: `sk_slash_${Math.random()}`,
        type: 'songkiem_slash',
        x: ownBall.x + Math.cos(angle) * (ownBall.radius + 8),
        y: ownBall.y + Math.sin(angle) * (ownBall.radius + 8),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle,
        radius: 24,
        length: 34,
        dmg: entity.weapon.dmg ?? 5,
        ownerIsPlayer: entity === this.p,
        color: '#22d3ee',
        createdAt: this.now,
        lifetimeMs: 1400,
        slashIndex: 0
      });

      this.logMessage = `${name} vung Song Kiếm phóng ra 1 ĐƯỜNG KIẾM KHÍ tầm xa xé gió!`;
    }
  }

  private updateCanCau(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string,
    dt: number
  ) {
    if (entity.weapon.key !== 'cancau' || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;

    if (!entity.cancau) {
      entity.cancau = {
        nextHookAt: this.now + 2500,
        state: 'idle',
        hookStartTime: 0,
        hookX: ownBall.x,
        hookY: ownBall.y,
        targetLocked: false,
        lineTension: 0
      };
    }
    const cc = entity.cancau;

    // Check Triggering Skill: [MÓC LƯỠI]
    if (cc.state === 'idle') {
      if (this.now >= cc.nextHookAt && !this.isRooted(entity, this.now)) {
        cc.state = 'throwing';
        cc.hookStartTime = this.now;
        cc.hookX = ownBall.x;
        cc.hookY = ownBall.y;
        cc.targetLocked = true;
        this.logMessage = `🎣 [CẦN CÂU - MÓC LƯỠI]: ${name} vung cần quăng lưỡi câu tầm xa nhắm vào đối thủ!`;
        this.spawnSparks(ownBall.x, ownBall.y, '#38bdf8', 10);
      }
      return;
    }

    if (cc.state === 'throwing') {
      // Advance hook position towards opponent ball
      const dx = opponentBall.x - cc.hookX;
      const dy = opponentBall.y - cc.hookY;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist > 18 && this.now - cc.hookStartTime < 800) {
        const moveDist = CANCAU_HOOK_SPEED * dt;
        cc.hookX += (dx / dist) * Math.min(moveDist, dist);
        cc.hookY += (dy / dist) * Math.min(moveDist, dist);

        // Spawn sparkling trail
        if (Math.random() < 0.4) {
          this.particles.push({
            x: cc.hookX,
            y: cc.hookY,
            vx: (Math.random() - 0.5) * 30,
            vy: (Math.random() - 0.5) * 30,
            radius: 2,
            color: '#38bdf8',
            alpha: 0.8,
            life: 0,
            maxLife: 0.2
          });
        }
      } else {
        // Hook latched on opponent!
        cc.state = 'pulling';
        cc.hookX = opponentBall.x;
        cc.hookY = opponentBall.y;

        // Deal 10 Hook Damage
        let rawDmg = CANCAU_HOOK_DMG;
        if (entity.element && entity.element.type === 'lightning') {
          rawDmg += lightningBoltDmg(entity.element.tier);
        }
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(entity, rawDmg);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(opponentEntity, roundedDmg);

        this.triggerSoTanAttackBeast(entity, opponentEntity, ownBall, opponentBall, name, roundedDmg);

        this.shakeScreen(5);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ef4444', 16);
        this.logMessage = `🎣 [MÓC LƯỠI TRÚNG ĐÍCH]: ${name} móc dính đối thủ${isCrit ? ' [BẠO KÍCH!]' : ''} (-${roundedDmg} HP) và bắt đầu giật dây kéo về!`;
      }
      return;
    }

    if (cc.state === 'pulling') {
      cc.hookX = opponentBall.x;
      cc.hookY = opponentBall.y;

      const pullDx = ownBall.x - opponentBall.x;
      const pullDy = ownBall.y - opponentBall.y;
      const dist = Math.hypot(pullDx, pullDy) || 1;

      // Pull opponent ball towards own ball
      opponentBall.vx = (pullDx / dist) * CANCAU_PULL_SPEED;
      opponentBall.vy = (pullDy / dist) * CANCAU_PULL_SPEED;

      // Stop own ball for solid leverage
      ownBall.vx *= 0.85;
      ownBall.vy *= 0.85;

      if (dist <= 42 || this.now - cc.hookStartTime > 2200) {
        // Reached melee contact: Deliver follow-up 20 DMG and Smash into Wall (similar to Mace!)
        cc.state = 'smashing';

        let rawSmashDmg = CANCAU_SMASH_DMG;
        if (entity.element && entity.element.type === 'lightning') {
          rawSmashDmg += lightningBoltDmg(entity.element.tier);
        }
        const { dmg: smashFinalDmg, isCrit } = this.finalizeAttackerDmg(entity, rawSmashDmg);
        const roundedSmashDmg = Math.round(smashFinalDmg * this.dmgMul);
        this.applyDamage(opponentEntity, roundedSmashDmg);

        this.triggerSoTanAttackBeast(entity, opponentEntity, ownBall, opponentBall, name, roundedSmashDmg);

        // Calculate smash velocity away from own ball
        const smashAngle = Math.atan2(opponentBall.y - ownBall.y, opponentBall.x - ownBall.x);
        opponentBall.vx = Math.cos(smashAngle) * MACE_KNOCKBACK_SPEED;
        opponentBall.vy = Math.sin(smashAngle) * MACE_KNOCKBACK_SPEED;

        // Activate mace flight on opponent for wall crash damage
        opponentEntity.maceFlight = {
          active: true,
          wallHits: 0
        };

        this.shakeScreen(12);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#f59e0b', 24);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ffffff', 14);

        // Role Special Synergies
        if (entity.role === 'sotan') {
          // Sở Tân: Ground Fissure Quake
          const fx2 = opponentBall.x + Math.cos(smashAngle) * 90;
          const fy2 = opponentBall.y + Math.sin(smashAngle) * 90;
          this.activeFissures.push({
            x1: ownBall.x,
            y1: ownBall.y,
            x2: Math.max(15, Math.min(this.width - 15, fx2)),
            y2: Math.max(15, Math.min(this.height - 15, fy2)),
            createdAt: this.now,
            expiresAt: this.now + SOTAN_FISSURE_LIFETIME_MS,
            lastDotTick: this.now,
            ownerIsPlayer: entity === this.p
          });
          this.logMessage = `💥 [SỞ TÂN - THẦN ĐIẾU KHAI MÔN]: ${name} bồi đòn đập nứt đất (-${roundedSmashDmg} HP) và hất đối thủ đập tường cực mạnh!`;
        } else if (entity.role === 'bathuong') {
          // Bá Thường: Long Nhân Thanh Long Shockwave
          this.expandingRings.push({
            x: opponentBall.x,
            y: opponentBall.y,
            radius: 0,
            maxRadius: 100,
            color: '#10b981',
            alpha: 1,
            thickness: 5,
            life: 0,
            maxLife: 0.4
          });
          this.logMessage = `🐉 [BÁ THƯỜNG - LONG LỰC GIẬT CẦN]: ${name} vận Long Nhân bồi cú giật sấm sét (-${roundedSmashDmg} HP) và đánh bay đối thủ đập tường!`;
        } else {
          this.logMessage = `💥 [MÓC LƯỠI - BỒI ĐÒN ĐẬP TƯỜNG]: ${name} giật cần câu bồi thêm -${roundedSmashDmg} HP${isCrit ? ' [BẠO KÍCH!]' : ''} và quăng đối thủ bay vào tường!`;
        }

        // Reset to idle with cooldown
        cc.state = 'idle';
        cc.targetLocked = false;
        cc.nextHookAt = this.now + CANCAU_HOOK_COOLDOWN_MS * getRoleSpeedMultiplier(entity);
      }
    }
  }

  /**
   * Kích hoạt tuyệt kỹ tối thượng [SỞ TÂN ĐIẾU] (Tường Vân Thập Bát Chiêu 18 - 150 nhát chém x 25 DMG)
   */
  public triggerSoTanDieu(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.soTanDieu && this.soTanDieu.active) return;
    this.soTanDieu = {
      active: true,
      phase: 'timestop',
      startTime: this.now,
      lastSlashAt: 0,
      slashCount: 0,
      domainEndTime: 0
    };
    this.timeStopUntil = this.now + 2000;
    this.timeStopMessage = 'TƯỜNG VÂN THẬP BÁT CHIÊU 18 TỐI CAO ÁO NGHĨA - SỞ TÂN ĐIẾU (150 NHÁT - 25 DMG)';
    this.logMessage = `🌌 [SỞ TÂN ĐIẾU]: ${name} kích hoạt Tường Vân Thập Bát Chiêu 18 Tối Cao Áo Nghĩa - Sở Tân Điếu (150 nhát x 25 DMG)!`;
    this.shakeScreen(18);
    this.spawnSparks(ownBall.x, ownBall.y, '#06b6d4', 35);
  }

  /**
   * Kỹ năng mới: [NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA] (300 DMG + Vết nứt thẳng + Vạn Luân Cầu Vồng Tứ Tượng)
   */
  public triggerNhatDieuToiCao(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.nhatDieuToiCao && this.nhatDieuToiCao.active) return;

    if (this.now < this.nhatDieuToiCaoNextAt) {
      const rem = ((this.nhatDieuToiCaoNextAt - this.now) / 1000).toFixed(1);
      this.logMessage = `⏳ [NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA]: Kỹ năng đang hồi chiêu (còn ${rem}s)!`;
      return;
    }

    this.nhatDieuToiCaoNextAt = this.now + NHAT_DIEU_TOI_CAO_COOLDOWN_MS;
    this.nhatDieuToiCao = {
      active: true,
      phase: 'charging',
      startTime: this.now,
      chargeDuration: NHAT_DIEU_TOI_CAO_CHARGE_MS,
      ringsRot: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ringsRadii: [24, 38, 52, 66, 80, 94, 108, 122, 136],
      targetLocked: true,
      attackerIsPlayer: attacker === this.p
    };

    ownBall.vx = 0;
    ownBall.vy = 0;
    this.shakeScreen(15);
    this.logMessage = `🌈⚡ [NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA]: ${name} ngưng tụ VẠN LUÂN CẦU VỒNG 9 TẦNG & TỨ THÁNH! Giáng đòn cực đại (${NHAT_DIEU_TOI_CAO_DMG} DMG + ${NHAT_DIEU_TOI_CAO_FISSURE_DMG} DMG vết nứt vĩnh cửu)!`;
    this.spawnSparks(ownBall.x, ownBall.y, '#facc15', 25);
    this.spawnSparks(ownBall.x, ownBall.y, '#06b6d4', 25);
  }

  /**
   * Kích hoạt tuyệt kỹ [LONG HỒN ĐOẠN HẢI] (Hắc Long Thập Bát - Cần câu Bá Thường - CD 20s - Khóa địch & Luôn lao vào địch)
   */
  public triggerLongHonDoanHai(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.longHonDoanHai && this.longHonDoanHai.active) return;

    if (this.now < this.longHonDoanHaiNextAt) {
      const rem = ((this.longHonDoanHaiNextAt - this.now) / 1000).toFixed(1);
      this.logMessage = `⏳ [LONG HỒN ĐOẠN HẢI]: Kỹ năng đang hồi chiêu (còn ${rem}s)!`;
      return;
    }

    this.longHonDoanHaiNextAt = this.now + LONG_HON_DOAN_HAI_COOLDOWN_MS;
    this.longHonDoanHai = {
      active: true,
      phase: 'cutscene',
      startTime: this.now,
      zigZagIdx: 0,
      lastZigZagAt: this.now,
      targetX: opponentBall.x,
      targetY: opponentBall.y
    };
    this.hacLongTrail = [];
    this.logMessage = `🐉 [LONG HỒN ĐOẠN HẢI]: ${name} bôi huyết rồng khóa chặt đối thủ: Hắc Long Thập Bát - Long Hồn Đoạn Hải (CD 20s)!`;
    this.shakeScreen(14);
    this.spawnSparks(ownBall.x, ownBall.y, '#38bdf8', 30);
  }

  private updateSoTanDieu(dt: number) {
    if (!this.soTanDieu || !this.soTanDieu.active) return;

    if (this.soTanDieu.phase === 'timestop') {
      if (this.now >= this.timeStopUntil) {
        this.timeStopMessage = null;
        this.soTanDieu.phase = 'domain';
        this.soTanDieu.domainEndTime = this.now + 7500; // 7.5 giây biển lửa & phân thân
        this.logMessage = '🔥 [SỞ TÂN ĐIẾU]: Thời gian khôi phục! Vùng biển lửa bùng nổ, ảo ảnh phân thân vờn quanh!';
        this.shakeScreen(10);
      }
      return;
    }

    if (this.soTanDieu.phase === 'domain') {
      if (this.now >= this.soTanDieu.domainEndTime) {
        this.soTanDieu.phase = 'slashing';
        this.soTanDieu.slashCount = 0;
        this.soTanDieu.lastSlashAt = this.now;
        this.logMessage = `⚡ [SỞ TÂN ĐIẾU]: Hết thời gian ảo ảnh! TUNG BÃO ${SOTAN_DIEU_SLASH_COUNT} ĐÒN CHÉM CỰ ĐẠI (${SOTAN_DIEU_SLASH_DMG} DMG/NHÁT) LIÊN HOÀN!`;
        this.shakeScreen(18);
      }
      return;
    }

    if (this.soTanDieu.phase === 'slashing') {
      // Tung đòn chém siêu tốc mỗi 22ms lên đến 150 nhát
      if (this.now - this.soTanDieu.lastSlashAt >= SOTAN_DIEU_SLASH_INTERVAL_MS && this.soTanDieu.slashCount < SOTAN_DIEU_SLASH_COUNT) {
        this.soTanDieu.lastSlashAt = this.now;
        this.soTanDieu.slashCount++;

        const targetBall = this.enemyBall;
        const targetEntity = this.e;

        // Angle xoay vòng bao phủ toàn bộ mục tiêu (đường chém rất to, không thể né)
        const angle = (this.soTanDieu.slashCount * 0.38) + (Math.random() - 0.5) * 0.25;
        this.megaSlashes.push({
          x: targetBall.x,
          y: targetBall.y,
          angle,
          length: 280, // Rất to
          width: 42,   // Rất to
          color: this.soTanDieu.slashCount % 2 === 0 ? '#06b6d4' : '#38bdf8',
          createdAt: this.now,
          expiresAt: this.now + 240
        });

        // 25 DMG mỗi đòn (áp dụng buff xdmg / role / crit)
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(this.p, SOTAN_DIEU_SLASH_DMG);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(targetEntity, roundedDmg);

        this.spawnSparks(targetBall.x, targetBall.y, '#22d3ee', 8);
        this.shakeScreen(4);

        if (this.soTanDieu.slashCount >= SOTAN_DIEU_SLASH_COUNT) {
          this.soTanDieu = null;
          this.shakeScreen(28);
          this.logMessage = `💥 [SỞ TÂN ĐIẾU HOÀN TẤT]: ${SOTAN_DIEU_SLASH_COUNT} đòn chém cự đại ${SOTAN_DIEU_SLASH_DMG} DMG (Tổng ~${SOTAN_DIEU_SLASH_COUNT * SOTAN_DIEU_SLASH_DMG} DMG) đã giáng xuống tuyệt đối!`;
          this.expandingRings.push({
            x: targetBall.x,
            y: targetBall.y,
            radius: 10,
            maxRadius: 190,
            color: '#06b6d4',
            alpha: 1,
            thickness: 7,
            life: 0,
            maxLife: 0.65
          });
        }
      }
    }
  }

  /**
   * Cập nhật Kỹ năng mới: Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa
   */
  private updateNhatDieuToiCao(dt: number) {
    if (!this.nhatDieuToiCao || !this.nhatDieuToiCao.active) return;

    const ownBall = this.nhatDieuToiCao.attackerIsPlayer ? this.playerBall : this.enemyBall;
    const opponentBall = this.nhatDieuToiCao.attackerIsPlayer ? this.enemyBall : this.playerBall;
    const attackerEntity = this.nhatDieuToiCao.attackerIsPlayer ? this.p : this.e;
    const opponentEntity = this.nhatDieuToiCao.attackerIsPlayer ? this.e : this.p;
    const attackerName = this.nhatDieuToiCao.attackerIsPlayer ? 'Bạn' : 'Địch';

    if (this.nhatDieuToiCao.phase === 'charging') {
      // Freeze own ball velocity during charge
      ownBall.vx = 0;
      ownBall.vy = 0;

      // Rotate all 9 rings in alternating directions
      for (let i = 0; i < this.nhatDieuToiCao.ringsRot.length; i++) {
        const speed = (0.0035 + i * 0.0006) * (i % 2 === 0 ? 1 : -1);
        this.nhatDieuToiCao.ringsRot[i] += speed * (dt * 1000);
      }

      // Continuous aura sparks
      if (Math.random() < 0.35) {
        const angle = Math.random() * Math.PI * 2;
        const rad = 30 + Math.random() * 100;
        this.particles.push({
          x: ownBall.x + Math.cos(angle) * rad,
          y: ownBall.y + Math.sin(angle) * rad,
          vx: -Math.cos(angle) * 30,
          vy: -Math.sin(angle) * 30,
          color: ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 5)],
          radius: 3.5,
          life: 0,
          maxLife: 0.4,
          alpha: 1
        });
      }

      // Check if charge complete -> ĐẬP 1 CÁI LÀ CHÉM NỨT THẲNG
      if (this.now - this.nhatDieuToiCao.startTime >= this.nhatDieuToiCao.chargeDuration) {
        this.nhatDieuToiCao.phase = 'smash';

        // Calculate straight cut line passing directly through opponent
        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        // Teleport / Dash straight into opponent
        ownBall.x = opponentBall.x - nx * 25;
        ownBall.y = opponentBall.y - ny * 25;
        ownBall.vx = nx * 200;
        ownBall.vy = ny * 200;

        // GÂY 300 DMG TRỰC DIỆN
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attackerEntity, NHAT_DIEU_TOI_CAO_DMG);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(opponentEntity, roundedDmg);

        // TẠO VẾT NỨT THẲNG (NỨT THẲNG XUYÊN SÂN ĐẤU)
        const lineLen = 600;
        const startX = opponentBall.x - nx * (lineLen * 0.4);
        const startY = opponentBall.y - ny * (lineLen * 0.4);
        const endX = opponentBall.x + nx * (lineLen * 0.6);
        const endY = opponentBall.y + ny * (lineLen * 0.6);

        this.activeFissures.push({
          x1: Math.max(8, Math.min(this.width - 8, startX)),
          y1: Math.max(8, Math.min(this.height - 8, startY)),
          x2: Math.max(8, Math.min(this.width - 8, endX)),
          y2: Math.max(8, Math.min(this.height - 8, endY)),
          createdAt: this.now,
          expiresAt: this.now + 999999999,
          lastDotTick: this.now,
          ownerIsPlayer: this.nhatDieuToiCao.attackerIsPlayer,
          isStraight: true,
          colorTheme: 'rainbow',
          isPermanentUntilDepleted: true,
          remainingDmgPool: NHAT_DIEU_TOI_CAO_FISSURE_DMG
        });

        // Massive Mega Slash along cut trajectory
        this.megaSlashes.push({
          x: opponentBall.x,
          y: opponentBall.y,
          angle: Math.atan2(ny, nx),
          length: 420,
          width: 52,
          color: '#f43f5e',
          createdAt: this.now,
          expiresAt: this.now + 380
        });

        // Visual effects
        this.shakeScreen(35);
        this.expandingRings.push({
          x: opponentBall.x,
          y: opponentBall.y,
          radius: 12,
          maxRadius: 220,
          color: '#f43f5e',
          alpha: 1,
          thickness: 8,
          life: 0,
          maxLife: 0.7
        });

        this.spawnSparks(opponentBall.x, opponentBall.y, '#ef4444', 25);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#facc15', 25);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#06b6d4', 25);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ffffff', 20);

        this.logMessage = `🌈💥 [RẦM! NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA]: ${attackerName} chém thẳng giáng -${roundedDmg} HP${isCrit ? ' [BẠO KÍCH!]' : ''} và xẻ VẾT NỨT CẦU VỒNG VĨNH CỬU (chứa ${NHAT_DIEU_TOI_CAO_FISSURE_DMG} DMG)!`;
        this.nhatDieuToiCao = null;
      }
    }
  }

  /**
   * Kỹ năng mới: [NHẤT ĐIẾU KHAI THIÊN MÔN - HOÀNG KIM] (500 DMG + 250 DMG Vết nứt vĩnh cửu)
   */
  public triggerNhatDieuHoangKim(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.nhatDieuHoangKim && this.nhatDieuHoangKim.active) return;

    if (this.now < this.nhatDieuHoangKimNextAt) {
      const rem = ((this.nhatDieuHoangKimNextAt - this.now) / 1000).toFixed(1);
      this.logMessage = `⏳ [NHẤT ĐIẾU KHAI THIÊN MÔN - HOÀNG KIM]: Kỹ năng đang hồi chiêu (còn ${rem}s)!`;
      return;
    }

    this.nhatDieuHoangKimNextAt = this.now + NHAT_DIEU_HOANG_KIM_COOLDOWN_MS;
    this.nhatDieuHoangKim = {
      active: true,
      phase: 'charging',
      startTime: this.now,
      chargeDuration: NHAT_DIEU_HOANG_KIM_CHARGE_MS,
      ringsRot: [0, 0, 0, 0, 0],
      ringsRadii: [25, 42, 60, 78, 96],
      targetLocked: true,
      attackerIsPlayer: attacker === this.p
    };

    ownBall.vx = 0;
    ownBall.vy = 0;
    this.shakeScreen(15);
    this.logMessage = `✨👑 [NHẤT ĐIẾU KHAI THIÊN MÔN - HOÀNG KIM]: ${name} tụ khí HOÀNG KIM TRẬN! Chuẩn bị chém thẳng sàn đấu (${NHAT_DIEU_HOANG_KIM_DMG} DMG + ${NHAT_DIEU_HOANG_KIM_FISSURE_DMG} DMG nứt)!`;
    this.spawnSparks(ownBall.x, ownBall.y, '#facc15', 25);
  }

  private updateNhatDieuHoangKim(dt: number) {
    if (!this.nhatDieuHoangKim || !this.nhatDieuHoangKim.active) return;

    const ownBall = this.nhatDieuHoangKim.attackerIsPlayer ? this.playerBall : this.enemyBall;
    const opponentBall = this.nhatDieuHoangKim.attackerIsPlayer ? this.enemyBall : this.playerBall;
    const attackerEntity = this.nhatDieuHoangKim.attackerIsPlayer ? this.p : this.e;
    const opponentEntity = this.nhatDieuHoangKim.attackerIsPlayer ? this.e : this.p;
    const attackerName = this.nhatDieuHoangKim.attackerIsPlayer ? 'Bạn' : 'Địch';

    if (this.nhatDieuHoangKim.phase === 'charging') {
      ownBall.vx = 0;
      ownBall.vy = 0;

      for (let i = 0; i < this.nhatDieuHoangKim.ringsRot.length; i++) {
        const speed = (0.004 + i * 0.001) * (i % 2 === 0 ? 1 : -1);
        this.nhatDieuHoangKim.ringsRot[i] += speed * (dt * 1000);
      }

      if (Math.random() < 0.35) {
        this.spawnSparks(ownBall.x, ownBall.y, '#facc15', 3);
      }

      if (this.now - this.nhatDieuHoangKim.startTime >= this.nhatDieuHoangKim.chargeDuration) {
        this.nhatDieuHoangKim.phase = 'smash';

        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        ownBall.x = opponentBall.x - nx * 25;
        ownBall.y = opponentBall.y - ny * 25;
        ownBall.vx = nx * 200;
        ownBall.vy = ny * 200;

        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attackerEntity, NHAT_DIEU_HOANG_KIM_DMG);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(opponentEntity, roundedDmg);

        // Vết nứt hoàng kim vĩnh cửu cho đến khi rút cạn 250 DMG
        const lineLen = 600;
        const startX = opponentBall.x - nx * (lineLen * 0.4);
        const startY = opponentBall.y - ny * (lineLen * 0.4);
        const endX = opponentBall.x + nx * (lineLen * 0.6);
        const endY = opponentBall.y + ny * (lineLen * 0.6);

        this.activeFissures.push({
          x1: Math.max(8, Math.min(this.width - 8, startX)),
          y1: Math.max(8, Math.min(this.height - 8, startY)),
          x2: Math.max(8, Math.min(this.width - 8, endX)),
          y2: Math.max(8, Math.min(this.height - 8, endY)),
          createdAt: this.now,
          expiresAt: this.now + 999999999,
          lastDotTick: this.now,
          ownerIsPlayer: this.nhatDieuHoangKim.attackerIsPlayer,
          isStraight: true,
          colorTheme: 'golden',
          isPermanentUntilDepleted: true,
          remainingDmgPool: NHAT_DIEU_HOANG_KIM_FISSURE_DMG
        });

        this.megaSlashes.push({
          x: opponentBall.x,
          y: opponentBall.y,
          angle: Math.atan2(ny, nx),
          length: 380,
          width: 44,
          color: '#fbbf24',
          createdAt: this.now,
          expiresAt: this.now + 350
        });

        this.shakeScreen(30);
        this.expandingRings.push({
          x: opponentBall.x,
          y: opponentBall.y,
          radius: 12,
          maxRadius: 200,
          color: '#fbbf24',
          alpha: 1,
          thickness: 7,
          life: 0,
          maxLife: 0.65
        });

        this.spawnSparks(opponentBall.x, opponentBall.y, '#f59e0b', 25);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#facc15', 25);
        this.logMessage = `👑💥 [RẦM! NHẤT ĐIẾU KHAI THIÊN MÔN - HOÀNG KIM]: ${attackerName} chém thẳng giáng -${roundedDmg} HP${isCrit ? ' [BẠO KÍCH!]' : ''} và xẻ rách VẾT NỨT HOÀNG KIM tồn tại vĩnh viễn (chứa ${NHAT_DIEU_HOANG_KIM_FISSURE_DMG} DMG)!`;
        this.nhatDieuHoangKim = null;
      }
    }
  }

  /**
   * Kỹ năng: [PHI THIÊN VÔ CỰC ĐIẾU - TỐI CAO ÁO NGHĨA]
   * Dịch chuyển tức thời ra trung tâm võ đài (250, 250), vx=0, vy=0.
   * Vạn Luân 9 Tầng Cầu Vồng + Tứ Tượng cực đại.
   * Quét Bão Lốc Xoáy Cầu Vồng: 100 DMG mỗi 75ms DoT!
   */
  public triggerPhiThienVoCuc(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.phiThienVoCuc && this.phiThienVoCuc.active) return;
    if (this.now < this.phiThienVoCucNextAt) {
      const rem = ((this.phiThienVoCucNextAt - this.now) / 1000).toFixed(1);
      this.logMessage = `⏳ [PHI THIÊN VÔ CỰC ĐIẾU]: Kỹ năng đang hồi chiêu (còn ${rem}s)!`;
      return;
    }
    this.phiThienVoCucNextAt = this.now + PHI_THIEN_VO_CUC_COOLDOWN_MS;
    ownBall.x = this.width / 2;
    ownBall.y = this.height / 2;
    ownBall.vx = 0;
    ownBall.vy = 0;

    this.phiThienVoCuc = {
      active: true,
      startTime: this.now,
      duration: PHI_THIEN_VO_CUC_DURATION_MS,
      lastTickAt: this.now,
      ringsRot: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      tornadoAngle: 0,
      attackerIsPlayer: attacker === this.p
    };

    this.shakeScreen(32);
    this.logMessage = `🌈🌪️ [PHI THIÊN VÔ CỰC ĐIẾU - TỐI CAO ÁO NGHĨA]: ${name} dịch chuyển ra trung tâm võ đài! Vận chuyển Vạn Luân 9 Tầng & Bão Lốc Cầu Vồng quét sạch võ đài (100 DMG/0.075s)!`;
    this.spawnSparks(ownBall.x, ownBall.y, '#f43f5e', 30);
    this.spawnSparks(ownBall.x, ownBall.y, '#38bdf8', 30);
  }

  private updatePhiThienVoCuc(dt: number) {
    if (!this.phiThienVoCuc || !this.phiThienVoCuc.active) return;
    const elapsed = this.now - this.phiThienVoCuc.startTime;
    if (elapsed >= this.phiThienVoCuc.duration) {
      this.phiThienVoCuc = null;
      return;
    }

    const ownBall = this.phiThienVoCuc.attackerIsPlayer ? this.playerBall : this.enemyBall;
    const opponentBall = this.phiThienVoCuc.attackerIsPlayer ? this.enemyBall : this.playerBall;
    const opponentEntity = this.phiThienVoCuc.attackerIsPlayer ? this.e : this.p;

    // Lock own ball at center
    ownBall.x = this.width / 2;
    ownBall.y = this.height / 2;
    ownBall.vx = 0;
    ownBall.vy = 0;

    this.phiThienVoCuc.tornadoAngle += dt * 6.5;
    for (let i = 0; i < this.phiThienVoCuc.ringsRot.length; i++) {
      this.phiThienVoCuc.ringsRot[i] += (0.005 + i * 0.0008) * (i % 2 === 0 ? 1 : -1) * dt * 1000;
    }

    // Pull opponent towards center
    const dx = ownBall.x - opponentBall.x;
    const dy = ownBall.y - opponentBall.y;
    const dist = Math.hypot(dx, dy) || 1;
    opponentBall.vx += (dx / dist) * 180 * dt;
    opponentBall.vy += (dy / dist) * 180 * dt;

    if (this.now - this.phiThienVoCuc.lastTickAt >= PHI_THIEN_VO_CUC_TICK_MS) {
      this.phiThienVoCuc.lastTickAt = this.now;
      const dotDmg = Math.round(PHI_THIEN_VO_CUC_TICK_DMG * this.dmgMul);
      this.applyDamage(opponentEntity, dotDmg);
      this.shakeScreen(6);
      this.spawnSparks(opponentBall.x, opponentBall.y, '#f43f5e', 8);
      this.spawnSparks(opponentBall.x, opponentBall.y, '#38bdf8', 8);

      // Also damage all tower defense mobs if active
      if (this.towerDefense && this.towerDefense.active) {
        this.towerDefense.mobs.forEach(mob => {
          mob.hp -= dotDmg;
        });
      }
    }
  }

  /**
   * Kỹ năng: [TOÁN THIÊN THẤU CHI ĐIẾU] (Mũi khoan găm tường ma sát 40 DMG/0.12s trong 3.5s)
   */
  public triggerToanThienThauChi(attacker: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (this.toanThienThauChi && this.toanThienThauChi.active) return;
    if (this.now < this.toanThienThauChiNextAt) {
      const rem = ((this.toanThienThauChiNextAt - this.now) / 1000).toFixed(1);
      this.logMessage = `⏳ [TOÁN THIÊN THẤU CHI ĐIẾU]: Kỹ năng đang hồi chiêu (còn ${rem}s)!`;
      return;
    }
    this.toanThienThauChiNextAt = this.now + TOAN_THIEN_COOLDOWN_MS;
    this.toanThienThauChi = {
      active: true,
      phase: 'homing',
      startTime: this.now,
      drillX: ownBall.x,
      drillY: ownBall.y,
      drillRot: 0,
      targetX: opponentBall.x,
      targetY: opponentBall.y,
      lastTickAt: this.now,
      pinnedUntil: 0,
      attackerIsPlayer: attacker === this.p
    };
    this.logMessage = `🔩⚡ [TOÁN THIÊN THẤU CHI ĐIẾU]: ${name} bắn MŨI KHOAN KHỔNG LỒ bám đuổi và găm nghiền đối thủ vào tường!`;
    this.shakeScreen(18);
  }

  private updateToanThienThauChi(dt: number) {
    if (!this.toanThienThauChi || !this.toanThienThauChi.active) return;
    const oppBall = this.toanThienThauChi.attackerIsPlayer ? this.enemyBall : this.playerBall;
    const oppEntity = this.toanThienThauChi.attackerIsPlayer ? this.e : this.p;
    this.toanThienThauChi.drillRot += dt * 25;

    if (this.toanThienThauChi.phase === 'homing') {
      const dx = oppBall.x - this.toanThienThauChi.drillX;
      const dy = oppBall.y - this.toanThienThauChi.drillY;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = TOAN_THIEN_HOMING_SPEED * dt;
      this.toanThienThauChi.drillX += (dx / dist) * speed;
      this.toanThienThauChi.drillY += (dy / dist) * speed;

      if (dist <= 35) {
        this.toanThienThauChi.phase = 'pinned';
        this.toanThienThauChi.pinnedUntil = this.now + TOAN_THIEN_PIN_DURATION_MS;
        this.toanThienThauChi.lastTickAt = this.now;

        const distLeft = oppBall.x;
        const distRight = this.width - oppBall.x;
        const distTop = oppBall.y;
        const distBottom = this.height - oppBall.y;
        const minDist = Math.min(distLeft, distRight, distTop, distBottom);

        if (minDist === distLeft) { oppBall.x = 24; oppBall.vx = -300; }
        else if (minDist === distRight) { oppBall.x = this.width - 24; oppBall.vx = 300; }
        else if (minDist === distTop) { oppBall.y = 24; oppBall.vy = -300; }
        else { oppBall.y = this.height - 24; oppBall.vy = 300; }

        this.shakeScreen(28);
        this.logMessage = `⚡🔩 [GĂM TƯỜNG! TOÁN THIÊN THẤU CHI ĐIẾU]: Mũi khoan găm chặt đối thủ vào vách tường, ma sát nghiền nát (40 DMG/0.12s)!`;
      }
    } else if (this.toanThienThauChi.phase === 'pinned') {
      if (this.now >= this.toanThienThauChi.pinnedUntil) {
        this.toanThienThauChi = null;
        return;
      }
      this.toanThienThauChi.drillX = oppBall.x;
      this.toanThienThauChi.drillY = oppBall.y;
      oppBall.vx = (Math.random() - 0.5) * 40;
      oppBall.vy = (Math.random() - 0.5) * 40;

      if (this.now - this.toanThienThauChi.lastTickAt >= TOAN_THIEN_PIN_TICK_MS) {
        this.toanThienThauChi.lastTickAt = this.now;
        const dmg = Math.round(TOAN_THIEN_PIN_TICK_DMG * this.dmgMul);
        this.applyDamage(oppEntity, dmg);
        this.shakeScreen(5);
        this.spawnSparks(oppBall.x, oppBall.y, '#f59e0b', 12);
        this.spawnSparks(oppBall.x, oppBall.y, '#ef4444', 8);
      }
    }
  }

  public triggerTheOwnerOmni() {
    this.theOwner.omniWeaponActive = true;
    this.theOwner.omniWeaponUntil = this.now + THE_OWNER_OMNI_DURATION_MS;
    this.theOwner.lastOmniAttackAt = this.now;
    this.shakeScreen(32);
    this.logMessage = '👑💻 [THE OWNER GAME]: Kích hoạt VẠN VŨ KHÍ QUY TÔNG! 14 Thần khí xuất trận oanh tạc toàn sàn!';
  }

  private updateTheOwner(dt: number) {
    if (!this.theOwner) return;
    this.theOwner.weaponsOrbitRot += dt * 3.5;

    // The Owner 7 Tỉ % Auto-Attack (Tầm đánh inf, Tốc độ đánh inf, Gây 0.2% HP Max / 0.01s)
    if (this.p && this.p.role === 'the_owner_7b') {
      this.p.hp = THE_OWNER_7B_HP;
      this.p.maxHp = THE_OWNER_7B_HP;
      this.p.nextAtkAt = 0;
      this.theOwner.godModeActive = true;

      this.theOwner.meltAccumulator = (this.theOwner.meltAccumulator || 0) + dt;

      // Mỗi 0.01s gây 0.2% Max HP
      if (this.theOwner.meltAccumulator >= THE_OWNER_7B_MELT_INTERVAL_SEC) {
        const ticks = Math.floor(this.theOwner.meltAccumulator / THE_OWNER_7B_MELT_INTERVAL_SEC);
        this.theOwner.meltAccumulator -= ticks * THE_OWNER_7B_MELT_INTERVAL_SEC;

        const targets: { ent: Entity; ball: Ball }[] = [];
        if (this.is2v2) {
          if (this.e && (this.isSandbox || !this.e.isDead)) targets.push({ ent: this.e, ball: this.enemyBall });
          if (this.e2 && !this.e2.isDead) targets.push({ ent: this.e2, ball: this.enemyBall2 });
        } else {
          if (this.e && (this.isSandbox || !this.e.isDead)) {
            targets.push({ ent: this.e, ball: this.enemyBall });
          }
        }

        targets.forEach(({ ent, ball }) => {
          if (ent.hp <= 0 && ent.isDead) return;
          const dmgPerTick = Math.max(1, Math.round(ent.maxHp * THE_OWNER_7B_MELT_PERCENT));
          const totalTickDmg = dmgPerTick * ticks;
          this.applyDamage(ent, totalTickDmg, this.p);

          // Tia lửa thần khí hồng ngọc / hoàng kim & hiệu ứng chém Code Arena
          if (Math.random() < 0.35) {
            this.spawnSparks(ball.x, ball.y, '#fbbf24', 6);
            this.spawnSparks(ball.x, ball.y, '#38bdf8', 4);
          }

          if (Math.random() < 0.15) {
            this.dynamicSlashes.push({
              x: ball.x + (Math.random() - 0.5) * 16,
              y: ball.y + (Math.random() - 0.5) * 16,
              angle: Math.random() * Math.PI * 2,
              radius: 46,
              color: '#facc15',
              glowColor: '#38bdf8',
              type: 'code_cleave',
              createdAt: this.now,
              duration: 220
            });
          }

          if (Math.random() < 0.05) {
            this.floatingTexts.push({
              text: '⚡ 0x7B::MELT [-0.2%]',
              x: ball.x + (Math.random() - 0.5) * 25,
              y: ball.y - 18,
              color: '#fde047',
              createdAt: this.now,
              expiresAt: this.now + 420
            });
          }
        });

        // Xử lý Raid Thủ Thành
        if (this.towerDefense && this.towerDefense.active) {
          this.towerDefense.mobs.forEach(mob => {
            if (mob.hp > 0) {
              const mobDmg = Math.max(1, Math.round(mob.maxHp * THE_OWNER_7B_MELT_PERCENT * ticks));
              mob.hp -= mobDmg;
              if (mob.hp <= 0) {
                this.towerDefense.mobsKilled++;
              }
            }
          });
        }
      }
    }

    if (this.theOwner.omniWeaponActive) {
      if (this.now > this.theOwner.omniWeaponUntil) {
        this.theOwner.omniWeaponActive = false;
        return;
      }

      if (this.now - this.theOwner.lastOmniAttackAt >= 200) {
        this.theOwner.lastOmniAttackAt = this.now;
        const dmg = Math.round(160 * this.dmgMul);
        this.applyDamage(this.e, dmg, this.p);
        this.shakeScreen(8);
        this.spawnSparks(this.enemyBall.x, this.enemyBall.y, '#22c55e', 14);
        this.spawnSparks(this.enemyBall.x, this.enemyBall.y, '#38bdf8', 14);

        if (this.towerDefense && this.towerDefense.active) {
          this.towerDefense.mobs.forEach(mob => {
            mob.hp -= dmg;
          });
        }
      }
    }
  }

  public toggleStellarMenu(): void {
    this.stellarMenuOpen = !this.stellarMenuOpen;
    sound.playStellarMenu();
    if (this.onStellarMenuToggle) this.onStellarMenuToggle(this.stellarMenuOpen);
  }

  public triggerStellarSkill(skillKey: StellarSkillKey): void {
    if (this.battleOver) return;
    this.stellarMenuOpen = false;
    if (this.onStellarMenuToggle) this.onStellarMenuToggle(false);

    const opp = this.getOpponentFor(this.p);
    const targetX = opp.ball.x;
    const targetY = opp.ball.y;

    sound.playStellarMenu();

    const randomFirstStar = Math.floor(Math.random() * 7);
    this.stellarCutscene = {
      active: true,
      skillKey,
      phase: 'start',
      startTime: this.now,
      targetX,
      targetY,
      attackerIsPlayer: true,
      subStep: 0,
      lastSubStepAt: this.now,
      data: { firstStarIndex: randomFirstStar }
    };

    if (skillKey === 'ss01_railgun') {
      this.logMessage = '🛰️ [STELLAR REMOTE: SS-01 RAILGUN]: Khóa mục tiêu từ Trái Đất -> Vượt Hệ Mặt Trời -> Vượt Ngân Hà -> Trạm Vũ Trụ Khổng Lồ!';
      sound.playOrbitalBeam();
    } else if (skillKey === 'ss02_the_sun') {
      this.logMessage = '☀️🌌 [STELLAR REMOTE: SS-02 THE SUN]: Hệ Mặt Trời thức tỉnh! Lần lượt 8 hành tinh lao xuống ➔ Đại Mặt Trời giáng thế nổ nhiệt hạch cực đại!';
      sound.playSolarSystemPlanetsDive(0);
    } else if (skillKey === 'ss03_gungir') {
      this.logMessage = '🪐 [STELLAR REMOTE: SS-03 GUNGIR]: Tia cam chiếu rọi -> Tiếp cận Sao Mộc tách đôi -> Mũi khoan Tungsten 3D xoay tít lao xuống nổ SA HOÀNG!';
      sound.playJupiterSplit();
    } else if (skillKey === 'ss04_seven_star') {
      const STAR_NAMES = ['Thiên Xu', 'Thiên Tuyền', 'Thiên Cơ', 'Thiên Quyền', 'Ngọc Hoành', 'Khai Dương', 'Dao Quang'];
      this.logMessage = `✨ [STELLAR REMOTE: SS-04 SEVEN STAR]: Chòm sao Bắc Đẩu -> Ngôi sao ${STAR_NAMES[randomFirstStar]} ngẫu nhiên nạp đầu tiên -> Nạp xong lao xuống giáng thế!`;
      sound.playSevenStarCharge(randomFirstStar + 1);
    } else if (skillKey === 'ss05_tesseract') {
      this.logMessage = '💠 [STELLAR REMOTE: SS-05 TESSERACT]: Siêu Lập Phương 4D Ngân Hà -> Cổng Không Gian -> Cân bằng vuông góc -> Nổ 5 lần 2.000.000+ DMG & Nổ Sụp Đổ 25.000.000+ DMG!';
      sound.playTesseractPulse(1);
    } else if (skillKey === 'ss06_halley') {
      this.logMessage = '☄️ [STELLAR REMOTE: SS-06 HALLEY]: Sao băng Halley đang bay ngoài vũ trụ -> Kích hoạt chuyển hướng quỹ đạo -> Khóa khoảng cách mục tiêu!';
      sound.playHalleyCourseCorrection();
    } else if (skillKey === 'ss21_quasar') {
      this.logMessage = '🌌⚡ [STELLAR REMOTE: SS-21 QUASAR [ADD-ON]]: Vòng xoáy Quasar xoay tít và thu nhỏ vào tâm -> Siêu tia laser trắng giáng thế!';
      sound.playQuasarVortexSpin();
    } else if (skillKey === 'event_horizon') {
      this.logMessage = '🕳️🌌 [STELLAR REMOTE: EVENT HORIZON]: Lỗ sâu vũ trụ phát sáng -> Tụ năng lượng tím vào đầu lỗ đen -> Rơi thẳng xuống sàn đấu!';
      sound.playEventHorizonCharge();
    } else if (skillKey === 'neutron_star') {
      this.logMessage = '⚛️💥 [STELLAR REMOTE: NEUTRON STAR]: 2 Ngôi sao neutron xoay tít tiếp cận -> Hợp nhất Kilonova thành khối cầu trắng sáng -> Lao xuống sàn đấu!';
      sound.playNeutronBinaryOrbit();
    } else if (skillKey === 'ss_final_big_bang') {
      this.logMessage = '💥🌌 [STELLAR REMOTE: SS-FINAL BIG BANG]: Cỗ máy lượng tử gia tốc hạt khởi động -> Vô số electron & proton dung hợp thành điểm kỳ dị -> Giải phóng siêu vụ nổ Big Bang giáng thế!';
      sound.playBigBangMachineStartup(0.1);
    }
  }

  public getStellarMultiplier(attacker?: Entity): number {
    const ent = attacker || this.p;
    if (!ent) return 1.0;
    const isOwner7b = ent.role === 'the_owner_7b';
    const isOwner = ent.role === 'the_owner';

    // 1. Base Stellar Remote Multiplier
    const baseRemoteMul = 1.0;

    // 2. Role Multiplier
    let roleMul = 1.0;
    if (isOwner7b) {
      roleMul = 10.0; // The Owner 7 Tỉ % sức mạnh tối cao x10.0
    } else if (isOwner) {
      roleMul = 5.0; // The Owner Game x5.0
    } else if (ent.role === 'admin') {
      roleMul = 3.5; // Admin x3.5 DMG
    } else if (ent.role === 'sotan') {
      roleMul = 3.0; // Sơ Tán Thần Thú x3.0
    } else if (ent.role === 'bathuong') {
      roleMul = 2.5; // Bá Thương Long Khí x2.5
    } else if (ent.role === 'than_trieuvan') {
      roleMul = 2.5; // Thần Triệu Vân x2.5
    } else if (ent.role === 'than_liubei') {
      roleMul = 2.2; // Thần Lưu Bị x2.2
    } else if (ent.role === 'survivalist') {
      roleMul = Math.max(1.5, getRoleDmgMultiplier(ent) * 1.5);
    } else if (ent.role === 'werewolf' && ent.werewolf?.phase === 'night') {
      roleMul = 2.0; // Werewolf night x2.0
    } else if (ent.role === 'trieuvan' || ent.role === 'liubei') {
      roleMul = 1.8;
    }

    // 3. Synergy Multiplier
    let synMul = 1.0;
    if (ent.synergySongThanGiangThe) synMul *= 1.5;
    else if (ent.synergyTuyetTheAnhHung) synMul *= 1.4;
    if (ent.synergyDongNghiep) synMul *= 1.25;
    if (ent.synergyThienHa) synMul *= 1.3;

    // 4. Element Multiplier
    let elMul = 1.0;
    if (ent.element) {
      if (ent.element.type === 'fire') elMul += 0.35;
      else if (ent.element.type === 'lightning') elMul += 0.30;
      else if (ent.element.type === 'glitch') elMul += 0.30;
      else if (ent.element.type === 'poison') elMul += 0.25;
      else if (ent.element.type === 'shadow') elMul += 0.25;
      else if (ent.element.type === 'plant') elMul += 0.20;
    }

    // 5. Match HP Multiplier specifically scaled down for Stellar Remote (e.g. 100k HP = x15 -> x1.5)
    const stellarMatchDmgMul = Math.max(1, getStellarHpMultiplier(this.p.maxHp || 500));

    const totalMul = Math.max(1.0, baseRemoteMul * roleMul * synMul * elMul * stellarMatchDmgMul);
    return Number(totalMul.toFixed(2));
  }

  private updateStellar(dt: number): void {
    const isOwner7b = this.p.role === 'the_owner_7b';
    const isOwner = this.p.role === 'the_owner';
    const totalStellarMul = this.getStellarMultiplier();
    const ownerPrefix = isOwner7b
      ? `👑⚡ [THE OWNER 7 TỈ % (x${totalStellarMul} DMG)] `
      : isOwner
      ? `👑💻 [THE OWNER (x${totalStellarMul} DMG)] `
      : `💥 [STELLAR REMOTE (x${totalStellarMul} DMG)] `;

    // 1. Update Cutscene
    if (this.stellarCutscene && this.stellarCutscene.active) {
      const cs = this.stellarCutscene;
      const elapsed = this.now - cs.startTime;

      if (cs.skillKey === 'ss01_railgun') {
        if (elapsed >= 8400) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const tickDmg = Math.round(20_000 * totalStellarMul);
          this.stellarOrbitalBeam = {
            active: true,
            targetX: opp.ball.x,
            targetY: opp.ball.y,
            startTime: this.now,
            durationMs: 15000,
            lastTickAt: this.now,
            tickIntervalMs: 100,
            dmgPerTick: tickDmg,
            attackerIsPlayer: true
          };

          this.shakeScreen(isOwner7b ? 35 : 18);
          sound.playOrbitalBeam();
          this.logMessage = `${ownerPrefix}⚡ [SS-01 RAILGUN OANH TẠC]: Chùm tia quỹ đạo vũ trụ tốc độ ánh sáng (${tickDmg.toLocaleString()} DMG/0.1s trong 15s = ${(tickDmg * 150).toLocaleString()} DMG)!`;
        }
      } else if (cs.skillKey === 'ss02_the_sun') {
        const pIdx = Math.min(7, Math.floor(elapsed / 480));
        if (pIdx !== cs.subStep) {
          cs.subStep = pIdx;
          sound.playSolarSystemPlanetsDive(pIdx);
        }

        if (elapsed >= 6500) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const directDmg = Math.round(5_500_000 * totalStellarMul);
          this.applyDamage(opp.ent, directDmg, this.p);
          this.shakeScreen(isOwner7b ? 75 : 55);
          sound.playTheSunSupernova();

          this.floatingTexts.push({
            text: `☀️💥 -${directDmg.toLocaleString()} DMG (THE SUN SUPERNOVA)`,
            x: opp.ball.x,
            y: opp.ball.y - 45,
            color: '#facc15',
            createdAt: this.now,
            expiresAt: this.now + 2500
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 50);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#fef08a', 45);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#f97316', 40);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#ef4444', 35);

          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 20,
            maxRadius: 360,
            thickness: 14,
            color: '#fde047',
            alpha: 1,
            life: 0,
            maxLife: 0.9
          });
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 12,
            maxRadius: 290,
            thickness: 8,
            color: '#f97316',
            alpha: 1,
            life: 0,
            maxLife: 0.75
          });

          this.stellarSunFx = {
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            duration: 2500
          };

          this.logMessage = `${ownerPrefix}☀️💥 [SS-02 THE SUN]: Cả Hệ Mặt Trời oanh tạc & Đại Mặt Trời giáng thế nổ nhiệt hạch cực đại -${directDmg.toLocaleString()} DMG!`;
        }
      } else if (cs.skillKey === 'ss03_gungir') {
        if (elapsed >= 5200 && (!cs.subStep || cs.subStep === 0)) {
          cs.subStep = 1;
          sound.playTungstenDrillSpin();
        }
        if (elapsed >= 7200) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const directDmg = Math.round(1_500_000 * totalStellarMul);
          const dotDmg = Math.round(25_000 * totalStellarMul);
          this.applyDamage(opp.ent, directDmg, this.p);
          this.shakeScreen(isOwner7b ? 55 : 40);
          sound.playTsarBomba();

          this.floatingTexts.push({
            text: `🪐💥 -${directDmg.toLocaleString()} DMG (x${totalStellarMul})`,
            x: opp.ball.x,
            y: opp.ball.y - 35,
            color: '#f97316',
            createdAt: this.now,
            expiresAt: this.now + 2000
          });

          this.stellarTsarFx = {
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            duration: 2500
          };

          this.stellarGungnirDoT = {
            active: true,
            startTime: this.now,
            durationMs: 10000,
            lastTickAt: this.now,
            tickIntervalMs: 200,
            dmgPerTick: dotDmg,
            ticksRemaining: 50,
            attackerIsPlayer: true
          };

          this.logMessage = `${ownerPrefix}🪐💥 [SS-03 GUNGIR SA HOÀNG]: Mũi tên khoan Archimedes nổ tung -${directDmg.toLocaleString()} DMG (+${dotDmg.toLocaleString()} DMG DoT/0.2s)!`;
        }
      } else if (cs.skillKey === 'ss04_seven_star') {
        if (elapsed >= 7200) {
          const firstStarIdx = cs.data?.firstStarIndex ?? Math.floor(Math.random() * 7);
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          this.stellarSevenStar = {
            active: true,
            phase: 'charging',
            startTime: this.now,
            meteorIndex: 0,
            firstStarIndex: firstStarIdx,
            currentStarIndex: firstStarIdx,
            chargedUntil: this.now + 280,
            loopCount: 0,
            lastMeteorAt: this.now,
            targetX: opp.ball.x,
            targetY: opp.ball.y,
            attackerIsPlayer: true
          };

          const STAR_NAMES = ['Thiên Xu', 'Thiên Tuyền', 'Thiên Cơ', 'Thiên Quyền', 'Ngọc Hoành', 'Khai Dương', 'Dao Quang'];
          this.logMessage = `${ownerPrefix}✨ [SS-04 SEVEN STAR]: Bắt đầu giáng thế liên hoàn từ ngôi sao ${STAR_NAMES[firstStarIdx]} (${Math.round(200_000 * totalStellarMul).toLocaleString()} DMG/lần)!`;
        }
      } else if (cs.skillKey === 'ss05_tesseract') {
        if (elapsed >= 6000) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          this.stellarTesseract = {
            active: true,
            phase: 'pulses',
            startTime: this.now,
            pulseCount: 0,
            lastPulseAt: this.now,
            targetX: opp.ball.x,
            targetY: opp.ball.y,
            attackerIsPlayer: true
          };

          this.logMessage = `${ownerPrefix}💠 [SS-05 TESSERACT]: Cổng không gian mở! Siêu lập phương lao xuống phình to nổ 5 lần (${Math.round(250_000 * totalStellarMul).toLocaleString()} DMG/đợt)!`;
        }
      } else if (cs.skillKey === 'ss06_halley') {
        if (elapsed >= 2400 && (!cs.subStep || cs.subStep === 0)) {
          cs.subStep = 1;
          sound.playHalleyCourseCorrection();
        }
        if (elapsed >= 6200) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const directDmg = Math.round(2_500_000 * totalStellarMul);
          this.applyDamage(opp.ent, directDmg, this.p);
          this.shakeScreen(isOwner7b ? 55 : 35);
          sound.playHalleyImpact();

          this.floatingTexts.push({
            text: `☄️💥 -${directDmg.toLocaleString()} DMG (x${totalStellarMul})`,
            x: opp.ball.x,
            y: opp.ball.y - 40,
            color: '#38bdf8',
            createdAt: this.now,
            expiresAt: this.now + 2000
          });

          this.stellarHalleyFx = {
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            duration: 2200
          };

          this.spawnSparks(opp.ball.x, opp.ball.y, '#38bdf8', 60);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 50);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#7dd3fc', 40);
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 20,
            maxRadius: 280,
            thickness: 10,
            color: '#38bdf8',
            alpha: 1,
            life: 0,
            maxLife: 0.8
          });

          this.logMessage = `${ownerPrefix}💥☄️ [SS-06 HALLEY - VA CHẠM THIÊN THẠCH]: Sao băng Halley chuyển hướng giáng thế nổ tung -${directDmg.toLocaleString()} DMG!`;
        }
      } else if (cs.skillKey === 'ss21_quasar') {
        if (elapsed >= 2400 && (!cs.subStep || cs.subStep === 0)) {
          cs.subStep = 1;
          sound.playQuasarVortexSpin();
        }
        if (elapsed >= 5000 && cs.subStep === 1) {
          cs.subStep = 2;
          sound.playQuasarSuperLaser();
        }
        if (elapsed >= 6800) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const tickDmg = Math.round(15_000 * totalStellarMul);
          const nukeDmg = Math.round(2_500_000 * totalStellarMul);
          this.stellarQuasar = {
            active: true,
            targetX: opp.ball.x,
            targetY: opp.ball.y,
            startTime: this.now,
            durationMs: 20000,
            lastTickAt: this.now,
            tickIntervalMs: 200,
            dmgPerTick: tickDmg,
            finalExploded: false,
            attackerIsPlayer: true
          };

          this.shakeScreen(isOwner7b ? 35 : 20);
          sound.playQuasarSuperLaser();
          this.logMessage = `${ownerPrefix}🌌⚡ [SS-021 QUASAR]: Siêu tia laser trắng giáng thế chiếu rọi (${tickDmg.toLocaleString()} DMG/0.2s trong 20s -> Nổ kết liễu ${nukeDmg.toLocaleString()} DMG)!`;
        }
      } else if (cs.skillKey === 'event_horizon') {
        if (elapsed >= 5500) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const ehDmg = Math.round(3_800_000 * totalStellarMul);
          this.stellarEventHorizon = {
            active: true,
            phase: 'vortex',
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            durationMs: 2200,
            lastPullAt: this.now,
            targetX: opp.ball.x,
            targetY: opp.ball.y,
            dmg: ehDmg,
            attackerIsPlayer: true
          };

          this.shakeScreen(isOwner7b ? 40 : 25);
          sound.playEventHorizonVortex();
          this.logMessage = `${ownerPrefix}🕳️🌌 [EVENT HORIZON GIÁNG LÂM]: Lỗ đen rơi xuống sàn đấu! Lực hấp dẫn cực đại hút chặt đối thủ vào tâm!`;
        }
      } else if (cs.skillKey === 'neutron_star') {
        if (elapsed >= 6000) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const directDmg = Math.round(4_500_000 * totalStellarMul);
          const dotDmg = Math.round(150_000 * totalStellarMul);

          this.applyDamage(opp.ent, directDmg, this.p);
          this.shakeScreen(isOwner7b ? 65 : 48);
          sound.playNeutronImpact();

          this.floatingTexts.push({
            text: `⚛️💥 -${directDmg.toLocaleString()} DMG (NEUTRON KILONOVA)`,
            x: opp.ball.x,
            y: opp.ball.y - 45,
            color: '#38bdf8',
            createdAt: this.now,
            expiresAt: this.now + 2500
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 50);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#38bdf8', 40);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#818cf8', 30);

          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 15,
            maxRadius: 340,
            thickness: 12,
            color: '#ffffff',
            alpha: 1,
            life: 0,
            maxLife: 0.85
          });
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 10,
            maxRadius: 280,
            thickness: 8,
            color: '#38bdf8',
            alpha: 1,
            life: 0,
            maxLife: 0.7
          });

          this.stellarNeutronStar = {
            active: true,
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            durationMs: 8000,
            directDmg,
            dotDmg,
            lastDotAt: this.now,
            dotIntervalMs: 250,
            dotEndsAt: this.now + 8000,
            attackerIsPlayer: true,
            radius: 24
          };

          this.logMessage = `${ownerPrefix}⚛️💥 [NEUTRON STAR - KILONOVA MERGER]: Khối cầu trắng sáng lao xuống giáng -${directDmg.toLocaleString()} DMG và phát xạ tia Gamma DoT (${dotDmg.toLocaleString()} DMG/0.25s trong 8s)!`;
        }
      } else if (cs.skillKey === 'ss_final_big_bang') {
        if (elapsed < 2400) {
          if (Math.random() < 0.08) sound.playBigBangMachineStartup(elapsed / 2400);
        } else if (elapsed < 4600) {
          if (Math.random() < 0.12) sound.playBigBangMachineStartup(0.5 + (elapsed - 2400) / 4400);
        } else if (elapsed >= 4600 && (!cs.subStep || cs.subStep === 0)) {
          cs.subStep = 1;
          sound.playBigBangSingularityFusion();
        }

        if (elapsed >= 7200) {
          cs.active = false;
          this.stellarCutscene = null;

          const opp = this.getOpponentFor(this.p);
          const bbDmg = Math.round(10_000_000 * totalStellarMul);
          this.applyDamage(opp.ent, bbDmg, this.p);
          this.shakeScreen(isOwner7b ? 95 : 85);
          sound.playBigBangCataclysm();

          this.stellarBigBangFx = {
            x: opp.ball.x,
            y: opp.ball.y,
            startTime: this.now,
            duration: 2800
          };

          this.floatingTexts.push({
            text: `💥🌌 -${bbDmg.toLocaleString()} DMG (BIG BANG TỐI THƯỢNG)`,
            x: opp.ball.x,
            y: opp.ball.y - 45,
            color: '#f43f5e',
            createdAt: this.now,
            expiresAt: this.now + 3000
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 60);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#38bdf8', 50);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#f43f5e', 45);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#fbbf24', 40);

          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 20,
            maxRadius: 390,
            thickness: 16,
            color: '#ffffff',
            alpha: 1,
            life: 0,
            maxLife: 1.1
          });
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 12,
            maxRadius: 320,
            thickness: 10,
            color: '#38bdf8',
            alpha: 1,
            life: 0,
            maxLife: 0.95
          });
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 8,
            maxRadius: 260,
            thickness: 8,
            color: '#f43f5e',
            alpha: 1,
            life: 0,
            maxLife: 0.8
          });

          this.logMessage = `${ownerPrefix}💥🌌 [SS-FINAL: BIG BANG KHAI SINH VŨ TRỤ]: Điểm kỳ dị dung hợp hạt giải phóng siêu vụ nổ Big Bang giáng thế -${bbDmg.toLocaleString()} SÁT THƯƠNG TỐI THƯỢNG!`;
        }
      }
    }

    // 2. Update SS-01 Continuous Orbital Beam (15s duration)
    if (this.stellarOrbitalBeam && this.stellarOrbitalBeam.active) {
      const beam = this.stellarOrbitalBeam;
      const opp = this.getOpponentFor(this.p);
      beam.targetX = opp.ball.x;
      beam.targetY = opp.ball.y;

      if (this.now - beam.startTime >= beam.durationMs || this.battleOver) {
        beam.active = false;
        this.stellarOrbitalBeam = null;
      } else {
        if (this.now - beam.lastTickAt >= beam.tickIntervalMs) {
          beam.lastTickAt = this.now;
          this.applyDamage(opp.ent, beam.dmgPerTick, this.p);
          this.shakeScreen(3);

          if (Math.random() < 0.3) {
            this.spawnSparks(opp.ball.x, opp.ball.y, '#ef4444', 4);
            this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 3);
          }
        }
      }
    }

    // 3. Update SS-03 Gungnir DoT
    if (this.stellarGungnirDoT && this.stellarGungnirDoT.active) {
      const dot = this.stellarGungnirDoT;
      const opp = this.getOpponentFor(this.p);

      if (dot.ticksRemaining <= 0 || this.now - dot.startTime >= dot.durationMs || this.battleOver) {
        dot.active = false;
        this.stellarGungnirDoT = null;
      } else {
        if (this.now - dot.lastTickAt >= dot.tickIntervalMs) {
          dot.lastTickAt = this.now;
          dot.ticksRemaining--;
          this.applyDamage(opp.ent, dot.dmgPerTick, this.p);

          if (Math.random() < 0.3) {
            this.spawnSparks(opp.ball.x, opp.ball.y, '#f97316', 3);
          }
        }
      }
    }

    // 4. Update SS-04 Seven Star Arena Sequence
    if (this.stellarSevenStar && this.stellarSevenStar.active) {
      const s7 = this.stellarSevenStar;
      const opp = this.getOpponentFor(this.p);
      const STAR_NAMES = ['Thiên Xu', 'Thiên Tuyền', 'Thiên Cơ', 'Thiên Quyền', 'Ngọc Hoành', 'Khai Dương', 'Dao Quang'];
      const curStarIdx = typeof s7.currentStarIndex === 'number' ? s7.currentStarIndex : 0;
      const starName = STAR_NAMES[curStarIdx % 7];

      if (s7.phase === 'charging') {
        if (Math.random() < 0.6) {
          this.spawnSparks(opp.ball.x, opp.ball.y - 120, '#fde047', 4);
        }
        if (this.now >= (s7.chargedUntil ?? 0)) {
          s7.phase = 'meteors';
          s7.lastMeteorAt = this.now;
        }
      } else if (s7.phase === 'meteors') {
        s7.meteorIndex++;
        const mDmg = Math.round(200_000 * totalStellarMul);
        this.applyDamage(opp.ent, mDmg, this.p);
        this.shakeScreen(isOwner7b ? 22 : 12);
        sound.playSevenStarImpact();

        this.floatingTexts.push({
          text: `✨ -${mDmg.toLocaleString()} (x${totalStellarMul})`,
          x: opp.ball.x + (Math.random() - 0.5) * 30,
          y: opp.ball.y - 20,
          color: '#facc15',
          createdAt: this.now,
          expiresAt: this.now + 1200
        });

        this.spawnSparks(opp.ball.x, opp.ball.y, '#facc15', 20);
        this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 10);
        this.expandingRings.push({
          x: opp.ball.x,
          y: opp.ball.y,
          radius: 10,
          maxRadius: 130,
          thickness: 5,
          color: '#facc15',
          alpha: 1,
          life: 0,
          maxLife: 0.35
        });

        this.logMessage = `${ownerPrefix}☄️ [THẤT TINH - ${starName.toUpperCase()} NẠP XONG]: Giáng thế oanh tạc -${mDmg.toLocaleString()} DMG! (${s7.meteorIndex}/7)`;

        if (s7.meteorIndex >= 7) {
          s7.phase = 'unison_dive';
          s7.lastMeteorAt = this.now;
        } else {
          s7.currentStarIndex = (curStarIdx + 1) % 7;
          s7.phase = 'charging';
          s7.chargedUntil = this.now + 260;
          sound.playSevenStarCharge(s7.currentStarIndex + 1);
        }
      } else if (s7.phase === 'unison_dive') {
        if (this.now - s7.lastMeteorAt >= 500) {
          const uDmg = Math.round(1_200_000 * totalStellarMul);
          this.applyDamage(opp.ent, uDmg, this.p);
          this.shakeScreen(isOwner7b ? 45 : 30);
          sound.playSevenStarSupernova();

          this.floatingTexts.push({
            text: `🌟💥 -${uDmg.toLocaleString()} (x${totalStellarMul})`,
            x: opp.ball.x,
            y: opp.ball.y - 35,
            color: '#facc15',
            createdAt: this.now,
            expiresAt: this.now + 1800
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#facc15', 30);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 20);
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 15,
            maxRadius: 240,
            thickness: 8,
            color: '#fde047',
            alpha: 1,
            life: 0,
            maxLife: 0.65
          });

          this.logMessage = `${ownerPrefix}💥🌟 [BẮC ĐẨU ĐẠI TỔNG LỰC]: 7 Ngôi sao đồng loạt lao xuống nổ -${uDmg.toLocaleString()} DMG!`;
          s7.active = false;
          this.stellarSevenStar = null;
        }
      }
    }

    // 5. Update SS-05 Tesseract Arena Sequence
    if (this.stellarTesseract && this.stellarTesseract.active) {
      const tes = this.stellarTesseract;
      const opp = this.getOpponentFor(this.p);

      if (tes.phase === 'pulses') {
        if (this.now - tes.lastPulseAt >= 320) {
          tes.lastPulseAt = this.now;
          tes.pulseCount++;

          const pDmg = Math.round(250_000 * totalStellarMul);
          this.applyDamage(opp.ent, pDmg, this.p);
          this.shakeScreen(isOwner7b ? 22 : 12);
          sound.playTesseractPulse(tes.pulseCount);

          this.floatingTexts.push({
            text: `💠 -${pDmg.toLocaleString()} (x${totalStellarMul})`,
            x: opp.ball.x + (Math.random() - 0.5) * 25,
            y: opp.ball.y - 20,
            color: '#06b6d4',
            createdAt: this.now,
            expiresAt: this.now + 1200
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#06b6d4', 15);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#a855f7', 10);
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 12,
            maxRadius: 140 + tes.pulseCount * 15,
            thickness: 6,
            color: tes.pulseCount % 2 === 0 ? '#06b6d4' : '#a855f7',
            alpha: 1,
            life: 0,
            maxLife: 0.4
          });

          this.logMessage = `${ownerPrefix}💠 [TESSERACT PHÌNH TO]: Xung kích không gian đợt #${tes.pulseCount}/5 phát nổ -${pDmg.toLocaleString()} DMG!`;

          if (tes.pulseCount >= 5) {
            tes.phase = 'final_spin';
            tes.lastPulseAt = this.now;
          }
        }
      } else if (tes.phase === 'final_spin') {
        if (this.now - tes.lastPulseAt >= 600) {
          const colDmg = Math.round(1_500_000 * totalStellarMul);
          this.applyDamage(opp.ent, colDmg, this.p);
          this.shakeScreen(isOwner7b ? 50 : 35);
          sound.playTesseractCollapse();

          this.floatingTexts.push({
            text: `🌌💥 -${colDmg.toLocaleString()} (x${totalStellarMul})`,
            x: opp.ball.x,
            y: opp.ball.y - 35,
            color: '#c084fc',
            createdAt: this.now,
            expiresAt: this.now + 2000
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#c084fc', 35);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 25);
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 15,
            maxRadius: 260,
            thickness: 9,
            color: '#38bdf8',
            alpha: 1,
            life: 0,
            maxLife: 0.75
          });

          this.logMessage = `${ownerPrefix}💥🌌 [TESSERACT SỤP ĐỔ]: Siêu lập phương 4D sụp đổ không thời gian -${colDmg.toLocaleString()} DMG!`;
          tes.active = false;
          this.stellarTesseract = null;
        }
      }
    }

    // 6. Update Tsar Bomba visual effect timeout
    if (this.stellarTsarFx) {
      if (this.now - this.stellarTsarFx.startTime >= this.stellarTsarFx.duration) {
        this.stellarTsarFx = null;
      }
    }

    // 7. Update SS-06 Halley visual effect timeout
    if (this.stellarHalleyFx) {
      if (this.now - this.stellarHalleyFx.startTime >= this.stellarHalleyFx.duration) {
        this.stellarHalleyFx = null;
      }
    }

    // 7b. Update SS-02 The Sun visual effect timeout
    if (this.stellarSunFx) {
      if (this.now - this.stellarSunFx.startTime >= this.stellarSunFx.duration) {
        this.stellarSunFx = null;
      }
    }

    // 8. Update SS-021 Quasar Super White Laser Beam
    if (this.stellarQuasar && this.stellarQuasar.active) {
      const q = this.stellarQuasar;
      const opp = this.getOpponentFor(this.p);
      q.targetX = opp.ball.x;
      q.targetY = opp.ball.y;

      if (this.now - q.startTime >= q.durationMs || this.battleOver) {
        if (!q.finalExploded && !this.battleOver) {
          q.finalExploded = true;
          const finalNukeDmg = Math.round(2_500_000 * totalStellarMul);
          this.applyDamage(opp.ent, finalNukeDmg, this.p);
          this.shakeScreen(isOwner7b ? 60 : 40);
          sound.playQuasarExplosion();

          this.floatingTexts.push({
            text: `🌌⚡💥 -${finalNukeDmg.toLocaleString()} DMG (x${totalStellarMul})`,
            x: opp.ball.x,
            y: opp.ball.y - 45,
            color: '#ec4899',
            createdAt: this.now,
            expiresAt: this.now + 2500
          });

          this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 40);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#c084fc', 30);
          this.spawnSparks(opp.ball.x, opp.ball.y, '#f472b6', 20);
          this.expandingRings.push({
            x: opp.ball.x,
            y: opp.ball.y,
            radius: 15,
            maxRadius: 280,
            thickness: 10,
            color: '#f472b6',
            alpha: 1,
            life: 0,
            maxLife: 0.75
          });

          this.logMessage = `${ownerPrefix}💥🌌 [SS-021 QUASAR SỤP ĐỔ]: Siêu tia laser trắng kết thúc nén nổ Singularity -${finalNukeDmg.toLocaleString()} DMG!`;
        }
        q.active = false;
        this.stellarQuasar = null;
      } else {
        if (this.now - q.lastTickAt >= q.tickIntervalMs) {
          q.lastTickAt = this.now;
          this.applyDamage(opp.ent, q.dmgPerTick, this.p);
          this.shakeScreen(3);

          if (Math.random() < 0.3) {
            this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 4);
            this.spawnSparks(opp.ball.x, opp.ball.y, '#c084fc', 3);
          }
        }
      }
    }

    // 9. Update SS-07 Event Horizon (Gravitational Singularity Vortex & Implosion)
    if (this.stellarEventHorizon && this.stellarEventHorizon.active) {
      const eh = this.stellarEventHorizon;
      const opp = this.getOpponentFor(this.p);

      if (eh.phase === 'vortex') {
        // Gravitational pull toward singularity center
        const dx = eh.x - opp.ball.x;
        const dy = eh.y - opp.ball.y;
        const dist = Math.hypot(dx, dy) || 1;
        const pullSpeed = 480;
        opp.ball.vx += (dx / dist) * pullSpeed * dt;
        opp.ball.vy += (dy / dist) * pullSpeed * dt;

        // Particle swirl around black hole
        if (Math.random() < 0.7) {
          const angle = Math.random() * Math.PI * 2;
          const r = 25 + Math.random() * 60;
          this.particles.push({
            x: eh.x + Math.cos(angle) * r,
            y: eh.y + Math.sin(angle) * r,
            vx: -Math.sin(angle) * 120 - Math.cos(angle) * 80,
            vy: Math.cos(angle) * 120 - Math.sin(angle) * 80,
            radius: 2 + Math.random() * 2.5,
            color: Math.random() < 0.5 ? '#a855f7' : '#ec4899',
            alpha: 0.9,
            life: 0,
            maxLife: 0.4
          });
        }

        if (this.now - eh.startTime >= 1700) {
          eh.phase = 'implosion';
          this.applyDamage(opp.ent, eh.dmg, this.p);
          this.shakeScreen(isOwner7b ? 65 : 45);
          sound.playEventHorizonCollapse();

          this.floatingTexts.push({
            text: `🕳️💥 -${eh.dmg.toLocaleString()} DMG (EVENT HORIZON)`,
            x: eh.x,
            y: eh.y - 45,
            color: '#c084fc',
            createdAt: this.now,
            expiresAt: this.now + 2500
          });

          this.spawnSparks(eh.x, eh.y, '#c084fc', 45);
          this.spawnSparks(eh.x, eh.y, '#e879f9', 35);
          this.spawnSparks(eh.x, eh.y, '#38bdf8', 25);
          this.spawnSparks(eh.x, eh.y, '#ffffff', 30);

          this.expandingRings.push({
            x: eh.x,
            y: eh.y,
            radius: 10,
            maxRadius: 320,
            thickness: 12,
            color: '#a855f7',
            alpha: 1,
            life: 0,
            maxLife: 0.85
          });
          this.expandingRings.push({
            x: eh.x,
            y: eh.y,
            radius: 5,
            maxRadius: 260,
            thickness: 8,
            color: '#ec4899',
            alpha: 1,
            life: 0,
            maxLife: 0.7
          });

          this.logMessage = `${ownerPrefix}💥🕳️ [EVENT HORIZON SỤP ĐỔ]: Lỗ đen nuốt trọn không thời gian phát nổ Singularity -${eh.dmg.toLocaleString()} DMG!`;
        }
      } else if (eh.phase === 'implosion') {
        if (this.now - eh.startTime >= eh.durationMs) {
          eh.active = false;
          this.stellarEventHorizon = null;
        }
      }
    }

    // 10. Update SS-08 Neutron Star Kilonova & Radiation DoT (8s duration)
    if (this.stellarNeutronStar && this.stellarNeutronStar.active) {
      const ns = this.stellarNeutronStar;
      const opp = this.getOpponentFor(this.p);

      // Track opponent ball
      ns.x = opp.ball.x;
      ns.y = opp.ball.y;

      if (this.now >= ns.dotEndsAt || this.now - ns.startTime >= ns.durationMs || this.battleOver) {
        ns.active = false;
        this.stellarNeutronStar = null;
      } else {
        if (this.now - ns.lastDotAt >= ns.dotIntervalMs) {
          ns.lastDotAt = this.now;
          this.applyDamage(opp.ent, ns.dotDmg, this.p);
          this.shakeScreen(4);

          if (Math.random() < 0.4) {
            this.spawnSparks(opp.ball.x, opp.ball.y, '#ffffff', 4);
            this.spawnSparks(opp.ball.x, opp.ball.y, '#38bdf8', 4);
          }

          if (Math.random() < 0.25) {
            this.floatingTexts.push({
              text: `⚛️ -${ns.dotDmg.toLocaleString()} (RADIATION)`,
              x: opp.ball.x + (Math.random() - 0.5) * 30,
              y: opp.ball.y - 25,
              color: '#38bdf8',
              createdAt: this.now,
              expiresAt: this.now + 800
            });
          }
        }
      }
    }

    // 11. Update SS-Final Big Bang FX timeout
    if (this.stellarBigBangFx) {
      if (this.now - this.stellarBigBangFx.startTime >= this.stellarBigBangFx.duration) {
        this.stellarBigBangFx = null;
      }
    }
  }

  private updateTowerDefense(dt: number) {
    if (!this.towerDefense || !this.towerDefense.active || this.battleOver) return;

    if (this.towerDefense.gateHp <= 0) {
      this.towerDefense.isGameOver = true;
      this.battleOver = true;
      this.result = 'lose';
      this.logMessage = '🏰💥 [THỦ THÀNH THẤT BẠI]: Cổng thành phòng thủ đã bị quái đỏ công phá hoàn toàn!';
      return;
    }

    if (this.now - this.towerDefense.lastSpawnAt >= this.towerDefense.spawnIntervalMs) {
      this.towerDefense.lastSpawnAt = this.now;
      const wave = this.towerDefense.wave;
      for (let i = 0; i < TD_MOBS_PER_SEC; i++) {
        const startY = 40 + Math.random() * (this.height - 80);
        const speed = TD_MOB_BASE_SPEED + (wave - 1) * 12 + Math.random() * 25;
        const maxHp = TD_MOB_BASE_HP + (wave - 1) * 30;
        this.towerDefense.mobs.push({
          id: `mob_${this.now}_${i}_${Math.random()}`,
          x: this.width - 15,
          y: startY,
          vx: -speed,
          vy: (Math.random() - 0.5) * 50,
          hp: maxHp,
          maxHp: maxHp,
          radius: 13,
          speed: speed,
          goldValue: TD_COIN_PER_KILL,
          wave: wave
        });
      }

      if (this.towerDefense.mobsKilled > 0 && this.towerDefense.mobsKilled % 25 === 0) {
        this.towerDefense.wave = Math.floor(this.towerDefense.mobsKilled / 25) + 1;
      }
    }

    const gateX = 72;
    this.towerDefense.mobs = this.towerDefense.mobs.filter(mob => {
      mob.x += mob.vx * dt;
      mob.y += mob.vy * dt;

      if (mob.y < mob.radius + 10) { mob.y = mob.radius + 10; mob.vy = Math.abs(mob.vy); }
      if (mob.y > this.height - mob.radius - 10) { mob.y = this.height - mob.radius - 10; mob.vy = -Math.abs(mob.vy); }

      if (mob.x <= gateX + mob.radius) {
        this.towerDefense.gateHp -= 20;
        this.shakeScreen(10);
        this.spawnSparks(mob.x, mob.y, '#ef4444', 12);
        return false;
      }

      const dx = this.playerBall.x - mob.x;
      const dy = this.playerBall.y - mob.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.playerBall.radius + mob.radius + 12) {
        const dmg = Math.round(60 * this.dmgMul);
        mob.hp -= dmg;
        mob.vx = 220;
        this.spawnSparks(mob.x, mob.y, '#f59e0b', 8);
      }

      if (mob.hp <= 0) {
        this.towerDefense.mobsKilled++;
        this.towerDefense.totalCoinsEarned += TD_COIN_PER_KILL;

        const curCoins = loadCoins();
        saveCoins(curCoins + TD_COIN_PER_KILL);
        if (this.onCoinsGained) this.onCoinsGained(TD_COIN_PER_KILL);

        this.spawnSparks(mob.x, mob.y, '#fbbf24', 18);
        this.floatingTexts.push({
          text: `+2.5 Xu 💰`,
          x: mob.x,
          y: mob.y,
          color: '#facc15',
          createdAt: this.now,
          expiresAt: this.now + 1100
        });
        return false;
      }

      return true;
    });
  }

  private updateLongHonDoanHai(dt: number) {
    if (!this.longHonDoanHai || !this.longHonDoanHai.active) return;

    const targetBall = this.enemyBall;

    // Track position trail for Hắc Long body
    this.hacLongTrail.unshift({ x: this.playerBall.x, y: this.playerBall.y });
    if (this.hacLongTrail.length > 24) {
      this.hacLongTrail.pop();
    }

    if (this.longHonDoanHai.phase === 'cutscene') {
      this.playerBall.vx = 0;
      this.playerBall.vy = 0;
      if (this.now - this.longHonDoanHai.startTime >= 1100) {
        this.longHonDoanHai.phase = 'flight';
        this.longHonDoanHai.lastZigZagAt = this.now;
        this.longHonDoanHai.zigZagIdx = 0;
        this.logMessage = '🐉 [HẮC LONG KHÓA ĐỊCH]: Hắc Long khổng lồ quấn quanh bay lượn khóa chặt mục tiêu chuẩn bị giáng thế!';
      }
      return;
    }

    if (this.longHonDoanHai.phase === 'flight') {
      // Dynamic Lock-on Zigzag waypoints centered around targetBall
      const waypoints = [
        { x: Math.max(30, Math.min(this.width - 30, targetBall.x - 140)), y: Math.max(30, Math.min(this.height - 30, targetBall.y - 80)) },
        { x: Math.max(30, Math.min(this.width - 30, targetBall.x + 140)), y: Math.max(30, Math.min(this.height - 30, targetBall.y - 60)) },
        { x: Math.max(30, Math.min(this.width - 30, targetBall.x - 80)), y: Math.max(30, Math.min(this.height - 30, targetBall.y - 140)) },
        { x: Math.max(30, Math.min(this.width - 30, targetBall.x)), y: Math.max(30, Math.min(this.height - 30, targetBall.y - 150)) }
      ];

      const currentWp = waypoints[this.longHonDoanHai.zigZagIdx];
      const dx = currentWp.x - this.playerBall.x;
      const dy = currentWp.y - this.playerBall.y;
      const dist = Math.hypot(dx, dy);

      const flightSpeed = 580;
      const step = flightSpeed * dt;
      if (dist <= step || dist <= 24 || this.now - this.longHonDoanHai.lastZigZagAt >= 420) {
        this.playerBall.x = currentWp.x;
        this.playerBall.y = currentWp.y;
        this.longHonDoanHai.zigZagIdx++;
        this.longHonDoanHai.lastZigZagAt = this.now;
        if (this.longHonDoanHai.zigZagIdx >= waypoints.length) {
          this.longHonDoanHai.phase = 'smash';
          this.longHonDoanHai.smashStartAt = this.now;
          this.logMessage = '💥 [LONG HỒN ĐOẠN HẢI]: HẮC LONG KHÓA ĐỊCH - BỔ ĐẦU TỪ TRÊN TRỜI LAO THẲNG VÀO ĐỐI THỦ!';
        }
      } else {
        this.playerBall.x += (dx / dist) * step;
        this.playerBall.y += (dy / dist) * step;
        this.playerBall.vx = (dx / dist) * flightSpeed;
        this.playerBall.vy = (dy / dist) * flightSpeed;
      }
      return;
    }

    if (this.longHonDoanHai.phase === 'smash') {
      // Direct aggressive dive straight into enemyBall
      const dx = targetBall.x - this.playerBall.x;
      const dy = targetBall.y - this.playerBall.y;
      const dist = Math.hypot(dx, dy) || 1;

      const diveSpeed = 920;
      const step = diveSpeed * dt;
      const timeInSmash = this.now - (this.longHonDoanHai.smashStartAt || this.now);

      if (dist <= step + 38 || dist <= 45 || timeInSmash >= 520) {
        // Guaranteed direct impact at target location
        this.playerBall.x = targetBall.x;
        this.playerBall.y = targetBall.y;

        // Impact Explosion: 125 DMG trực diện + Triệu hoán Cầu Lửa 5s (5 DMG/0.2s) -> Cột Lửa (2.5 DMG/0.035s)
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(this.p, 125);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(this.e, roundedDmg);

        // Spawn Cầu Lửa Long Hồn Đoạn Hải (tồn tại 5s, đốt 5 DMG / 0.2s)
        this.longHonFireOrbs.push({
          id: Math.random().toString(36).slice(2),
          x: targetBall.x,
          y: targetBall.y,
          radius: 80,
          createdAt: this.now,
          expiresAt: this.now + 5000,
          lastDotTick: this.now,
          ownerIsPlayer: true,
          hasSpawnedPillar: false
        });

        this.shakeScreen(36);
        this.spawnSparks(targetBall.x, targetBall.y, '#f97316', 50);
        this.spawnSparks(targetBall.x, targetBall.y, '#ef4444', 40);
        this.spawnSparks(targetBall.x, targetBall.y, '#fde047', 30);
        this.expandingRings.push({
          x: targetBall.x,
          y: targetBall.y,
          radius: 10,
          maxRadius: 200,
          color: '#f97316',
          alpha: 1,
          thickness: 9,
          life: 0,
          maxLife: 0.7
        });

        this.logMessage = `🐉🔥 [LONG HỒN ĐOẠN HẢI LAO VÀO ĐỊCH]: Bổ thẳng đầu đối thủ -${roundedDmg} HP${isCrit ? ' [BẠO KÍCH!]' : ''} và triệu hoán CẦU LỬA thiêu đốt (5 DMG/0.2s) trong 5s!`;
        this.longHonDoanHai = null;
        this.hacLongTrail = [];
        this.playerBall.vx = -120;
        this.playerBall.vy = -120;
      } else {
        this.playerBall.x += (dx / dist) * step;
        this.playerBall.y += (dy / dist) * step;
        this.playerBall.vx = (dx / dist) * diveSpeed;
        this.playerBall.vy = (dy / dist) * diveSpeed;
      }
    }
  }

  /**
   * Cập nhật Cầu Lửa Long Hồn Đoạn Hải (Đốt 5 DMG / 0.2s trong 5 giây, sau đó biến thành Cột Lửa)
   */
  private updateLongHonFireOrbs(dt: number) {
    this.longHonFireOrbs.forEach(orb => {
      // Đang trong thời gian 5s tồn tại
      if (this.now < orb.expiresAt) {
        // Tích tắc mỗi 0.2s (200ms)
        if (this.now - orb.lastDotTick >= 200) {
          orb.lastDotTick = this.now;

          const attacker = orb.ownerIsPlayer ? this.p : this.e;
          const targetEnt = orb.ownerIsPlayer ? this.e : this.p;
          const targetBall = orb.ownerIsPlayer ? this.enemyBall : this.playerBall;

          const dist = Math.hypot(targetBall.x - orb.x, targetBall.y - orb.y);
          if (dist <= orb.radius + targetBall.radius) {
            const rawDmg = 5;
            const finalDmg = Math.max(1, Math.round(rawDmg * this.dmgMul * (attacker.role === 'bathuong' && attacker.bathuong?.isDragonHuman ? 1.3 : 1)));
            this.applyDamage(targetEnt, finalDmg);
            this.spawnSparks(targetBall.x, targetBall.y, '#f97316', 5);
            this.logMessage = `🔥 [CẦU LỬA LONG HỒN]: Thiêu đốt đối thủ -${finalDmg} HP (5 DMG/0.2s)!`;
          }
        }
      } else if (!orb.hasSpawnedPillar) {
        // Hết 5s -> Bùng nổ thành CỘT LỬA KHỔNG LỒ (đốt 2.5 DMG / 0.035s)
        orb.hasSpawnedPillar = true;
        this.longHonFirePillars.push({
          id: Math.random().toString(36).slice(2),
          x: orb.x,
          y: orb.y,
          radius: 75,
          createdAt: this.now,
          expiresAt: this.now + 2800, // Cột lửa tồn tại 2.8s
          lastDotTick: this.now,
          ownerIsPlayer: orb.ownerIsPlayer
        });

        this.shakeScreen(28);
        this.spawnSparks(orb.x, orb.y, '#ef4444', 45);
        this.spawnSparks(orb.x, orb.y, '#fde047', 35);
        this.expandingRings.push({
          x: orb.x,
          y: orb.y,
          radius: 15,
          maxRadius: 200,
          color: '#ef4444',
          alpha: 1,
          thickness: 10,
          life: 0,
          maxLife: 0.75
        });

        this.logMessage = `🌋 [CỘT LỬA LONG HỒN TRÀO DÂNG]: Hết 5s cầu lửa, CỘT LỬA khổng lồ trào dâng thiêu đốt cực nhanh (2.5 DMG/0.035s)!`;
      }
    });

    this.longHonFireOrbs = this.longHonFireOrbs.filter(orb => this.now < orb.expiresAt || !orb.hasSpawnedPillar);
  }

  /**
   * Cập nhật Cột Lửa Long Hồn Đoạn Hải (Đốt cực nhanh 2.5 DMG / 0.035s = 35ms)
   */
  private updateLongHonFirePillars(dt: number) {
    this.longHonFirePillars.forEach(pillar => {
      if (this.now < pillar.expiresAt) {
        // Tích tắc mỗi 0.035s (35ms)
        if (this.now - pillar.lastDotTick >= 35) {
          pillar.lastDotTick = this.now;

          const attacker = pillar.ownerIsPlayer ? this.p : this.e;
          const targetEnt = pillar.ownerIsPlayer ? this.e : this.p;
          const targetBall = pillar.ownerIsPlayer ? this.enemyBall : this.playerBall;

          const dist = Math.hypot(targetBall.x - pillar.x, targetBall.y - pillar.y);
          if (dist <= pillar.radius + targetBall.radius) {
            const rawDmg = 2.5;
            const finalDmg = Math.max(1, Math.round(rawDmg * this.dmgMul * (attacker.role === 'bathuong' && attacker.bathuong?.isDragonHuman ? 1.3 : 1)));
            this.applyDamage(targetEnt, finalDmg);
            this.spawnSparks(targetBall.x, targetBall.y, '#fde047', 2);
          }
        }
      }
    });

    this.longHonFirePillars = this.longHonFirePillars.filter(pillar => this.now < pillar.expiresAt);
  }

  /**
   * Thực thi kỹ năng cụ thể của Bá Thường
   */
  public executeBaThuongSkill(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string,
    chosen: BaThuongSkillKey
  ) {
    if (!entity.bathuong) {
      entity.bathuong = {
        nextSkillAt: 0,
        activeSkill: null,
        skillPhase: 'idle',
        skillStartAt: 0,
        isDragonHuman: false,
        dragonHumanLastHpTickAt: 0,
        headSlamExecuted: false,
        baiViWavesSpawned: 0,
        baiViLastSpawnAt: 0,
        drillRotationAngle: 0,
        drillLastDmgAt: 0,
        drillRotationsCount: 0,
        drillLastDrillShotAtRotation: 0,
        naDiDashesLeft: 3,
        naDiLastDashAt: 0,
        tiemLongThrown: false
      };
    }
    const bt = entity.bathuong;
    bt.activeSkill = chosen;
    bt.skillPhase = 'active';
    bt.skillStartAt = this.now;
    bt.headSlamExecuted = false;
    bt.baiViWavesSpawned = 0;
    bt.baiViLastSpawnAt = 0;
    bt.drillRotationAngle = 0;
    bt.drillLastDmgAt = 0;
    bt.drillRotationsCount = 0;
    bt.drillLastDrillShotAtRotation = 0;
    bt.naDiDashesLeft = 3;
    bt.naDiLastDashAt = 0;
    bt.tiemLongThrown = false;

    if (chosen === 'long_ngang_dau') {
      this.logMessage = `🐉 [BÁ THƯỜNG - LONG NGẨNG ĐẦU]: ${name} triệu hoán Thanh Long giáng lâm, chuẩn bị đập tan càn khôn!`;
      this.qinglongManifestation = {
        x: ownBall.x,
        y: ownBall.y - 45,
        scale: 1.1,
        alpha: 1,
        startTime: this.now,
        duration: 1300
      };
    } else if (chosen === 'du_long_bai_vi') {
      this.logMessage = `🌊 [BÁ THƯỜNG - DU LONG BÁI VĨ]: ${name} thi triển 20 đợt Thanh Long xung kích quét 2 bên tường (10 DMG/đợt)!`;
    } else if (chosen === 'ngoa_long_phien_dang') {
      this.logMessage = `🌀 [BÁ THƯỜNG - NGỌA LONG PHIÊN ĐĂNG]: ${name} hóa thân thành MÁY KHOAN LONG VỰC lao vào đối thủ (2 DMG/0.4s & bắn mũi khoan)!`;
    } else if (chosen === 'than_long_na_di') {
      this.logMessage = `⚡ [BÁ THƯỜNG - THẦN LONG NA DI]: ${name} liên tục Na Di di chuyển 3 lần xé rách không gian tạo vết nứt!`;
    } else if (chosen === 'tiem_long_vat_dung') {
      this.logMessage = `💫 [BÁ THƯỜNG - TIỀM LONG VẬT DỤNG]: ${name} định thân tụ lực, phi vũ khí long thần giáng đòn 75 DMG!`;
    } else if (chosen === 'long_nhan_hop_nhat') {
      this.logMessage = `🐲 [BÁ THƯỜNG - LONG NHÂN HỢP NHẤT]: ${name} THỨC TỈNH LONG NHÂN! DMG x1.3, Tốc độ x1.5, Tự tiêu hao 1 HP/0.3s!`;
      bt.isDragonHuman = true;
      this.screenShake = 18;
      this.spawnSparks(ownBall.x, ownBall.y, '#10b981', 30);
      this.spawnSparks(ownBall.x, ownBall.y, '#34d399', 20);
      this.expandingRings.push({
        x: ownBall.x,
        y: ownBall.y,
        radius: 10,
        maxRadius: 120,
        thickness: 5,
        color: '#10b981',
        alpha: 1,
        life: 0,
        maxLife: 0.6
      });
      bt.skillPhase = 'idle';
      bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
    }
  }

  public triggerBaThuongRandomSkill(entity: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    const skills: BaThuongSkillKey[] = [
      'long_ngang_dau',
      'du_long_bai_vi',
      'ngoa_long_phien_dang',
      'than_long_na_di',
      'tiem_long_vat_dung',
      'long_nhan_hop_nhat'
    ];
    const chosen = skills[Math.floor(Math.random() * skills.length)];
    this.executeBaThuongSkill(entity, ownBall, opponentBall, opponentEntity, name, chosen);
  }

  public triggerSoTanRingDash(entity: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (!entity.sotan) {
      entity.sotan = {
        nextSkillAt: 0,
        state: 'idle',
        chargeStartAt: 0,
        chargeDuration: 1400,
        ringsRot: [0, 0, 0, 0, 0],
        aimAngle: 0,
        dashSpeed: 750,
        targetX: 0,
        targetY: 0,
        huyenVuImmuneUntil: 0,
        beastActive: null
      };
    }
    entity.sotan.state = 'charging_rings';
    entity.sotan.chargeStartAt = this.now;
    ownBall.vx = 0;
    ownBall.vy = 0;
    this.logMessage = `⚡ [NHẤT ĐIẾU KHAI THIÊN MÔN]: ${name} ngưng tụ vạn luân kim trận! Chuẩn bị giáng thế khai môn!`;
  }

  public triggerLuuBeiSkill(entity: Entity, ownBall: Ball, opponentBall: Ball, opponentEntity: Entity, name: string) {
    if (!entity.liubei) {
      entity.liubei = {
        nextSkillAt: 0,
        state: 'idle',
        stepStartTime: 0,
        targetLocked: false,
        frozenUntil: 0,
        chargeStartAt: 0,
        slashStep: 0,
        lastStepAt: 0
      };
    }
    entity.liubei.state = 'charging';
    entity.liubei.chargeStartAt = this.now;
    entity.liubei.slashStep = 0;
    entity.liubei.lastStepAt = this.now;
    ownBall.vx = 0;
    ownBall.vy = 0;
    this.logMessage = `👑 [HÁN THẤT NGHIÊM ĐÔNG]: ${name} kích hoạt tuyệt kỹ Tam Quốc Hán Thất Nghiêm Đông!`;
  }

  public triggerAdminSkill(entity: Entity, ownBall: Ball, name: string) {
    const opp = entity === this.p ? this.e : this.p;
    if (!opp.admin) {
      opp.admin = {
        nextSkillAt: 0,
        buffActive: false,
        buffUntil: 0,
        speedActive: false,
        speedUntil: 0,
        freezeUntil: 0,
        activeCommandText: '',
        commandDisplayUntil: 0
      };
    }
    opp.admin.freezeUntil = this.now + 3000;
    opp.admin.activeCommandText = '/freeze @enemy 3s';
    opp.admin.commandDisplayUntil = this.now + 2000;
    this.logMessage = `⚡ [ADMIN]: ${name} thi hành lệnh /freeze - Đóng băng đối thủ 3.0s!`;
    this.shakeScreen(10);
    this.spawnSparks(ownBall.x, ownBall.y, '#38bdf8', 20);
  }

  public triggerTrieuDinhTroTaKhoiPhuc(entity: Entity) {
    if (this.battleOver) return;
    const healAmt = Math.round(entity.maxHp * TRIEU_DINH_HEAL_PCT);
    entity.hp = Math.min(entity.maxHp, entity.hp + healAmt);
    entity.lastTrieuDinhAt = this.now;

    const ball = this.getBallForEntity(entity);
    this.spawnSparks(ball.x, ball.y, '#facc15', 25);
    this.spawnSparks(ball.x, ball.y, '#22c55e', 20);
    this.expandingRings.push({
      x: ball.x,
      y: ball.y,
      radius: 5,
      maxRadius: 75,
      thickness: 4,
      color: '#22c55e',
      alpha: 1,
      life: 0,
      maxLife: 0.4
    });

    this.floatingTexts.push({
      text: `👑 TRIỀU ĐÌNH TRỢ TA KHÔI PHỤC (+${healAmt.toLocaleString()} HP)! ✨`,
      x: ball.x,
      y: ball.y - 30,
      color: '#22c55e',
      createdAt: this.now,
      expiresAt: this.now + 2500
    });

    const name = entity === this.p ? 'Bạn' : (this.is2v2 && entity === this.p2 ? 'Bạn 2' : 'Địch');
    this.logMessage = `👑 [TRIỀU ĐÌNH TRỢ TA KHÔI PHỤC]: ${name} kích hoạt thánh lệnh, hồi phục +30% HP (+${healAmt.toLocaleString()} HP)!`;
  }

  public triggerNhaiGiacLuuTinhTram(attacker: Entity, target?: Entity) {
    if (this.battleOver) return;
    if (this.nhaiGiacLuuTinhTram && this.nhaiGiacLuuTinhTram.active) return;

    const atkBall = this.getBallForEntity(attacker);
    const tgt = target ? { ent: target, ball: this.getBallForEntity(target) } : this.getOpponentFor(attacker);
    if (!tgt.ent || tgt.ent.hp <= 0) return;

    this.nhaiGiacNextAt = this.now + NHAI_GIAC_COOLDOWN_MS;
    this.nhaiGiacLuuTinhTram = {
      active: true,
      attackerEntity: attacker,
      attackerBall: atkBall,
      targetEntity: tgt.ent,
      targetBall: tgt.ball,
      stage: 'spinning',
      startTime: this.now,
      stageStartTime: this.now,
      spinHitCount: 0,
      lastSpinHitTime: 0,
      spearDropX: 250,
      spearDropY: 250,
      spearCurrentY: -100,
      explosionRadius: 0
    };

    tgt.ent.rootedUntil = Math.max(tgt.ent.rootedUntil, this.now + 5000);
    tgt.ball.vx = 0;
    tgt.ball.vy = 0;

    atkBall.x = tgt.ball.x - 30;
    atkBall.y = tgt.ball.y;
    atkBall.vx = 0;
    atkBall.vy = 0;

    this.shakeScreen(10);
    this.floatingTexts.push({
      text: '🐉 NHAI GIÁC LƯU TINH TRẢM! ⚡',
      x: tgt.ball.x,
      y: tgt.ball.y - 35,
      color: '#facc15',
      createdAt: this.now,
      expiresAt: this.now + 3000
    });
    this.logMessage = `🐉 [THẦN-TRIỆU VÂN]: GIẢI PHÓNG TUYỆT KỸ [NHAI GIÁC LƯU TINH TRẢM]!`;
  }

  private updateNhaiGiacLuuTinhTram(dt: number) {
    const anim = this.nhaiGiacLuuTinhTram;
    if (!anim || !anim.active) return;

    const { attackerEntity, targetEntity, targetBall, attackerBall } = anim;
    if (this.battleOver || targetEntity.hp <= 0) {
      anim.active = false;
      this.nhaiGiacLuuTinhTram = null;
      return;
    }

    targetEntity.rootedUntil = Math.max(targetEntity.rootedUntil, this.now + 1000);
    targetBall.vx = 0;
    targetBall.vy = 0;

    if (anim.stage === 'spinning') {
      const angle = (this.now - anim.stageStartTime) * 0.018;
      attackerBall.x = targetBall.x + Math.cos(angle) * 35;
      attackerBall.y = targetBall.y + Math.sin(angle) * 35;
      attackerBall.vx = 0;
      attackerBall.vy = 0;

      if (anim.spinHitCount < NHAI_GIAC_SPIN_HITS && this.now - anim.lastSpinHitTime >= 80) {
        anim.spinHitCount++;
        anim.lastSpinHitTime = this.now;

        const { dmg } = this.finalizeAttackerDmg(attackerEntity, NHAI_GIAC_SPIN_DMG);
        const finalDmg = Math.round(dmg * this.dmgMul);
        this.applyDamage(targetEntity, finalDmg);
        this.shakeScreen(4);
        this.spawnSparks(targetBall.x, targetBall.y, '#facc15', 8);

        this.logMessage = `🌪️ Nhai Giác xoay thương chém liên hoàn (${anim.spinHitCount}/${NHAI_GIAC_SPIN_HITS}), -${finalDmg} HP`;
      }

      if (anim.spinHitCount >= NHAI_GIAC_SPIN_HITS && this.now - anim.lastSpinHitTime >= 200) {
        anim.stage = 'spear_drop';
        anim.stageStartTime = this.now;
        anim.spearCurrentY = -120;
        this.logMessage = `⚡ Triệu hồi Cự Thương Thần Thánh từ trên trời cắm thẳng giữa bản đồ!`;
      }
    } else if (anim.stage === 'spear_drop') {
      anim.spearCurrentY += 1300 * dt;
      if (anim.spearCurrentY >= anim.spearDropY) {
        anim.spearCurrentY = anim.spearDropY;
        anim.stage = 'explosion';
        anim.stageStartTime = this.now;
        anim.explosionRadius = 10;

        const { dmg: dropDmg } = this.finalizeAttackerDmg(attackerEntity, NHAI_GIAC_SPEAR_DROP_DMG);
        const finalDrop = Math.round(dropDmg * this.dmgMul);
        this.applyDamage(targetEntity, finalDrop);

        this.shakeScreen(16);
        this.expandingRings.push({
          x: anim.spearDropX,
          y: anim.spearDropY,
          radius: 10,
          maxRadius: 180,
          thickness: 6,
          color: '#facc15',
          alpha: 1,
          life: 0,
          maxLife: 0.6
        });
        this.spawnSparks(anim.spearDropX, anim.spearDropY, '#ffffff', 30);
        this.spawnSparks(anim.spearDropX, anim.spearDropY, '#f59e0b', 30);
        this.logMessage = `💥 Cự Thương Thần cắm xuống giữa sàn đấu! -${finalDrop} HP!`;
      }
    } else if (anim.stage === 'explosion') {
      anim.explosionRadius += 300 * dt;
      if (this.now - anim.stageStartTime >= 350) {
        const { dmg: expDmg } = this.finalizeAttackerDmg(attackerEntity, NHAI_GIAC_SPEAR_EXPLODE_DMG);
        const finalExp = Math.round(expDmg * this.dmgMul);
        this.applyDamage(targetEntity, finalExp);

        const isPlayerTeam = attackerEntity === this.p || (this.is2v2 && attackerEntity === this.p2);
        if (this.is2v2) {
          const otherEnemy = isPlayerTeam ? (targetEntity === this.e ? this.e2 : this.e) : (targetEntity === this.p ? this.p2 : this.p);
          if (otherEnemy && otherEnemy.hp > 0 && !otherEnemy.isDead) {
            this.applyDamage(otherEnemy, finalExp);
          }
        }

        this.shakeScreen(12);
        this.logMessage = `💥 Vụ nổ từ Cự Thương bộc phát uy lực hủy diệt! -${finalExp} HP!`;

        anim.stage = 'final_thrust';
        anim.stageStartTime = this.now;
      }
    } else if (anim.stage === 'final_thrust') {
      attackerBall.x = targetBall.x - 45;
      attackerBall.y = targetBall.y;
      attackerBall.vx = 400;
      attackerBall.vy = 0;

      if (this.now - anim.stageStartTime >= 250) {
        const { dmg: finalDmg } = this.finalizeAttackerDmg(attackerEntity, NHAI_GIAC_FINAL_THRUST_DMG);
        const roundedFinal = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(targetEntity, roundedFinal);

        this.shakeScreen(18);
        this.spawnSparks(targetBall.x, targetBall.y, '#38bdf8', 40);
        this.spawnSparks(targetBall.x, targetBall.y, '#facc15', 30);
        this.floatingTexts.push({
          text: `💥 KẾT LIỄU -${roundedFinal} HP!`,
          x: targetBall.x,
          y: targetBall.y - 30,
          color: '#38bdf8',
          createdAt: this.now,
          expiresAt: this.now + 2500
        });
        this.logMessage = `⚡ [KẾT THÚC NHAI GIÁC]: Thần-Triệu Vân đâm thương chí mạng cuối cùng xé toạc sinh lực! -${roundedFinal} HP!`;

        anim.stage = 'done';
        anim.active = false;
        this.nhaiGiacLuuTinhTram = null;
      }
    }
  }

  /**
   * Kích hoạt skill từ hotbar phím 1-0
   */
  public triggerSkillSlot(slot: number): boolean {
    if (this.battleOver) return false;

    // Kiểm tra hồi chiêu 20s
    const now = Date.now();
    const cdExpiresAt = this.skillCooldowns.get(slot) || 0;
    if (cdExpiresAt > now) {
      const remainingSec = Math.ceil((cdExpiresAt - now) / 1000);
      this.logMessage = `⏳ Kỹ năng [Phím ${slot === 10 ? '0' : slot}] đang hồi chiêu (còn ${remainingSec}s)...`;
      return false;
    }

    // Đặt thời gian hồi chiêu 20s
    const cdDuration = 20000;
    this.skillCooldowns.set(slot, now + cdDuration);
    this.playerSkillsUsed++;
    if (this.onSkillTriggered) {
      this.onSkillTriggered(slot, cdDuration);
    }

    if (this.p.role === 'the_owner_7b' || this.p.role === 'the_owner') {
      sound.playGodMode();
    } else if (slot === 1 || this.p.role === 'sotan') {
      sound.playUltimate();
    } else {
      sound.playSkillCast(slot);
    }

    // UPGRADED RAILGUN: ULTRA LASER SKILL (Phím 1)
    if (this.p.weapon.key === 'upgraded_railgun' || (this.p.weapon as any).isUpgradedRailgun) {
      if (slot === 1) {
        this.triggerUltraLaser(this.p);
        return true;
      }
    }

    // STELLAR REMOTE SATELLITE COMMANDS (SS-01..SS-08 & THE SUN)
    if (this.p.weapon.key === 'stellar_remote') {
      if (slot === 1) {
        this.triggerStellarSkill('ss01_railgun');
        return true;
      }
      if (slot === 2) {
        this.triggerStellarSkill('ss02_the_sun');
        return true;
      }
      if (slot === 3) {
        this.triggerStellarSkill('ss03_gungir');
        return true;
      }
      if (slot === 4) {
        this.triggerStellarSkill('ss04_seven_star');
        return true;
      }
      if (slot === 5) {
        this.triggerStellarSkill('ss05_tesseract');
        return true;
      }
      if (slot === 6) {
        this.triggerStellarSkill('ss06_halley');
        return true;
      }
      if (slot === 7) {
        this.triggerStellarSkill('ss21_quasar');
        return true;
      }
      if (slot === 8) {
        this.triggerStellarSkill('event_horizon');
        return true;
      }
      if (slot === 9) {
        this.triggerStellarSkill('neutron_star');
        return true;
      }
      if (slot === 10 || slot === 0) {
        this.triggerStellarSkill('ss_final_big_bang');
        return true;
      }
      this.toggleStellarMenu();
      return true;
    }

    // THẦN-TRIỆU VÂN
    if (this.p.role === 'than_trieuvan') {
      if (slot === 1) {
        this.triggerNhaiGiacLuuTinhTram(this.p);
        return;
      }
    }

    // THẦN-LƯU BỊ & THẦN SONG KIẾM
    if (slot === 2 || (slot === 1 && (this.p.weapon.key === 'than_songkiem' || this.p.role === 'than_liubei'))) {
      if (this.p.weapon.key === 'than_songkiem' || this.p.role === 'than_liubei') {
        this.triggerTrieuDinhTroTaKhoiPhuc(this.p);
        return;
      }
    }

    // THE OWNER GAME SKILLS
    if (this.p.role === 'the_owner' || this.p.role === 'the_owner_7b') {
      const is7b = this.p.role === 'the_owner_7b';
      if (slot === 1) {
        if (is7b) {
          const opp = this.getOpponentFor(this.p);
          if (opp && opp.ent) {
            const burstDmg = Math.max(1, Math.round(opp.ent.maxHp * 0.15)); // Giáng bão 15% Max HP
            this.applyDamage(opp.ent, burstDmg, this.p);
          }
          this.triggerTheOwnerOmni();
          this.shakeScreen(35);
          this.logMessage = '👑⚡ [THE OWNER 7 TỈ %]: VẠN THẦN KHÍ QUY TÔNG - KÍCH HOẠT THẦN TRẬN THIÊU ĐỐT 0.2% HP/0.01S!';
        } else {
          this.triggerTheOwnerOmni();
        }
        return;
      }
      if (slot === 2) {
        const opp = this.getOpponentFor(this.p);
        const nukeDmg = is7b && opp && opp.ent
          ? Math.max(1, Math.round(opp.ent.maxHp * 0.25)) // Lệnh /strike giáng sét 25% Max HP
          : Math.round(500 * this.dmgMul);
        if (opp && opp.ent) {
          this.applyDamage(opp.ent, nukeDmg, this.p);
          this.spawnSparks(opp.ball.x, opp.ball.y, is7b ? '#fbbf24' : '#22c55e', 35);
        }
        this.shakeScreen(30);
        this.logMessage = is7b
          ? `👑⚡ [THE OWNER 7 TỈ % ADMIN]: Lệnh /strike giáng sét lệnh trừ -25% Max HP (-${nukeDmg.toLocaleString()} HP)!`
          : `👑💻 [THE OWNER ADMIN]: Lệnh /strike giáng sét -${nukeDmg} DMG!`;
        return;
      }
      if (slot === 3) {
        this.theOwner.godModeActive = true;
        this.p.hp = is7b ? THE_OWNER_7B_HP : this.p.maxHp;
        this.logMessage = is7b
          ? '👑💻 [THE OWNER 7 TỈ %]: CHẾ ĐỘ BẤT TỬ TUYỆT ĐỐI (7 TỈ HP & KHÁNG 100% SÁT THƯƠNG)!'
          : (this.theOwner.godModeActive ? '👑💻 [THE OWNER]: ĐÃ BẬT CHẾ ĐỘ BẤT TỬ (GOD MODE 100% BẤT TỬ)!' : '👑💻 [THE OWNER]: Đã tắt chế độ bất tử!');
        return;
      }
      if (slot === 4) {
        this.p.hp = is7b ? THE_OWNER_7B_HP : this.p.maxHp;
        this.playerBall.vx *= 2.5;
        this.playerBall.vy *= 2.5;
        this.logMessage = is7b
          ? '👑💻 [THE OWNER 7 TỈ %]: HỒI PHỤC ĐẦY 7 TỈ HP VÀ SIÊU TỐC VẬN TỐC 250%!'
          : '👑💻 [THE OWNER]: Đã hồi đầy 100% HP và tăng tốc vận tốc 180%!';
        return;
      }
      if (slot === 5) {
        this.triggerStellarSkill('ss01_railgun');
        return true;
      }
      if (slot === 6) {
        this.triggerStellarSkill('ss03_gungir');
        return true;
      }
      if (slot === 7) {
        this.triggerStellarSkill('ss04_seven_star');
        return true;
      }
      if (slot === 8) {
        this.triggerStellarSkill('ss05_tesseract');
        return true;
      }
      if (slot === 9) {
        this.triggerStellarSkill('ss06_halley');
        return true;
      }
      if (slot === 10 || slot === 0) {
        this.triggerStellarSkill('ss_final_big_bang');
        return true;
      }
    }

    // SỞ TÂN SKILLS
    if (this.p.role === 'sotan') {
      // Slot 1: Nhất Điếu Khai Thiên Môn - Hoàng Kim (500 DMG + 250 DMG nứt)
      if (slot === 1) {
        this.triggerNhatDieuHoangKim(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      // Slot 2: Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa (1500 DMG + 500 DMG nứt)
      if (slot === 2) {
        this.triggerNhatDieuToiCao(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      // Slot 3: Phi Thiên Vô Cực Điếu - Tối Cao Áo Nghĩa (Teleport center + Bão Lốc DoT 100 DMG/0.075s)
      if (slot === 3) {
        this.triggerPhiThienVoCuc(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      // Slot 4: Sở Tân Điếu (ở hàng 4) - Tường Vân 18 Chiêu (150 nhát chém)
      if (slot === 4) {
        this.triggerSoTanDieu(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      // Slot 5: Toán Thiên Thấu Chi Điếu (Mũi khoan găm tường 40 DMG/0.12s)
      if (slot === 5) {
        this.triggerToanThienThauChi(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      // Slot 6: Bạch Hổ Điếu Hồn (+30% DMG trong 3s)
      if (slot === 6) {
        this.p.sotan = this.p.sotan || { nextSkillAt: 0, state: 'idle', chargeStartAt: 0, chargeDuration: 1400, ringsRot: [0,0,0,0,0], aimAngle: 0, dashSpeed: 750, targetX: 0, targetY: 0, huyenVuImmuneUntil: 0, beastActive: null };
        this.p.sotan.beastActive = {
          type: 'bach_ho',
          title: '🐅 BẠCH HỔ THẦN THÚ HỘ THỂ',
          desc: '+30% sát thương trong 3.0s!',
          spawnAt: this.now,
          duration: 3000,
          x: this.playerBall.x,
          y: this.playerBall.y
        };
        this.logMessage = '🐅 [BẠCH HỔ]: Kích hoạt Bạch Hổ Điếu Hồn +30% Sát thương!';
        return;
      }
      // Slot 7: Chu Tước Điếu Hồn (-5% Max HP)
      if (slot === 7) {
        this.p.sotan = this.p.sotan || { nextSkillAt: 0, state: 'idle', chargeStartAt: 0, chargeDuration: 1400, ringsRot: [0,0,0,0,0], aimAngle: 0, dashSpeed: 750, targetX: 0, targetY: 0, huyenVuImmuneUntil: 0, beastActive: null };
        this.p.sotan.beastActive = {
          type: 'chu_tuoc',
          title: '🦚 CHU TƯỚC ĐIẾU HỒN PHI VŨ',
          desc: 'Rút ngay -5% Max HP đối thủ!',
          spawnAt: this.now,
          duration: 3000,
          x: this.playerBall.x,
          y: this.playerBall.y
        };
        const burnHp = Math.max(15, Math.round(this.e.maxHp * 0.05));
        this.applyDamage(this.e, burnHp);
        this.logMessage = `🦚 [CHU TƯỚC]: Thiêu đốt trực diện -${burnHp} HP (-5% Max HP) của đối thủ!`;
        return;
      }
      // Slot 8: Thanh Long Điếu Hồn (Hồi phục toàn bộ cooldown)
      if (slot === 8) {
        this.p.sotan = this.p.sotan || { nextSkillAt: 0, state: 'idle', chargeStartAt: 0, chargeDuration: 1400, ringsRot: [0,0,0,0,0], aimAngle: 0, dashSpeed: 750, targetX: 0, targetY: 0, huyenVuImmuneUntil: 0, beastActive: null };
        this.p.sotan.beastActive = {
          type: 'thanh_long',
          title: '🐉 THANH LONG ĐIẾU HỒN TÁI SINH',
          desc: 'Reset toàn bộ thời gian hồi chiêu!',
          spawnAt: this.now,
          duration: 3000,
          x: this.playerBall.x,
          y: this.playerBall.y
        };
        this.nhatDieuHoangKimNextAt = 0;
        this.nhatDieuToiCaoNextAt = 0;
        this.phiThienVoCucNextAt = 0;
        this.toanThienThauChiNextAt = 0;
        this.p.sotan.nextSkillAt = 0;
        if (this.p.cancau) this.p.cancau.nextHookAt = 0;
        this.skillCooldowns.clear();
        if (this.onResetSkillCooldowns) {
          this.onResetSkillCooldowns();
        }
        this.logMessage = '🐉 [THANH LONG]: Thanh Long ngâm vang, HỒI PHỤC TOÀN BỘ COOLDOWN KỸ NĂNG!';
        return;
      }
      // Slot 9: Huyền Vũ Điếu Hồn (Miễn nhiễm sát thương 3s)
      if (slot === 9) {
        this.p.sotan = this.p.sotan || { nextSkillAt: 0, state: 'idle', chargeStartAt: 0, chargeDuration: 1400, ringsRot: [0,0,0,0,0], aimAngle: 0, dashSpeed: 750, targetX: 0, targetY: 0, huyenVuImmuneUntil: 0, beastActive: null };
        this.p.sotan.huyenVuImmuneUntil = this.now + 3000;
        this.p.sotan.beastActive = {
          type: 'huyen_vu',
          title: '🐢 HUYỀN VŨ KIM GIÁP BẤT HOẠI',
          desc: 'Miễn nhiễm toàn bộ sát thương trong 3.0s!',
          spawnAt: this.now,
          duration: 3000,
          x: this.playerBall.x,
          y: this.playerBall.y
        };
        this.logMessage = '🐢 [HUYỀN VŨ]: Kích hoạt Kim Giáp Bất Hoại, BẤT TỬ MIỄN NHIỄM SÁT THƯƠNG 3S!';
        return;
      }
    }

    // OTHER ROLES / STANDARD WEAPONS
    if (slot === 1) {
      if (this.p.role === 'bathuong' && this.p.weapon.key === 'cancau') {
        this.triggerLongHonDoanHai(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      if (this.p.role === 'bathuong') {
        this.triggerBaThuongRandomSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      if (this.p.role === 'liubei') {
        this.triggerLuuBeiSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn');
        return;
      }
      if (this.p.role === 'admin') {
        this.triggerAdminSkill(this.p, this.playerBall, 'Bạn');
        return;
      }
      if (this.p.weapon.key === 'cancau') {
        if (this.p.cancau) {
          this.p.cancau.nextHookAt = 0;
          this.p.cancau.state = 'idle';
          this.logMessage = '🎣 [MÓC LƯỠI CÂU]: Bạn vung cần phóng móc câu!';
        }
        return;
      }
      if (this.p.weapon.key === 'songkiem' && this.p.songkiem) {
        this.p.songkiem.skillNextAt = 0;
        return;
      }
    }

    if (slot === 2) {
      if (this.p.weapon.key === 'cancau' && this.p.cancau) {
        this.p.cancau.state = 'idle';
        this.p.cancau.nextHookAt = 0;
        this.logMessage = '🎣 [GIẬT DÂY CÂU]: Bạn kéo giật dây câu đối thủ!';
        return;
      }
      if (this.p.weapon.key === 'songkiem' && this.p.songkiem) {
        this.p.songkiem.nhatQuangNextAt = 0;
        this.logMessage = '✨ [NHẤT QUANG]: Bạn bắt đầu tụ khí Nhất Quang!';
        return;
      }
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'long_nhan_hop_nhat');
        return;
      }
    }

    if (slot === 3) {
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'du_long_bai_vi');
        return;
      }
      if (this.p.weapon.key === 'cancau') {
        this.p.nextAtkAt = 0;
        this.performAttack(this.p, this.e, 'Bạn');
        this.logMessage = '🎣 [VỤT CẦN ĐẬP MẠNH]: Bạn vung cần quất thẳng vào đối thủ!';
        return;
      }
    }

    if (slot === 4) {
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'ngoa_long_phien_dang');
        return;
      }
    }

    if (slot === 5) {
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'than_long_na_di');
        return;
      }
    }

    if (slot === 6) {
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'tiem_long_vat_dung');
        return;
      }
    }

    if (slot === 7) {
      if (this.p.role === 'bathuong') {
        this.executeBaThuongSkill(this.p, this.playerBall, this.enemyBall, this.e, 'Bạn', 'long_ngang_dau');
        return;
      }
    }

    // Default: Reset normal attack cooldown and strike
    this.p.nextAtkAt = 0;
    this.performAttack(this.p, this.e, 'Bạn');
  }

  /**
   * Xử lý click chuột trong Sandbox Mode
   */
  public handleCanvasClick(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = ((clientX - rect.left) / rect.width) * this.width;
    const clickY = ((clientY - rect.top) / rect.height) * this.height;

    // Check if clicked inside Dummy Ball or Damage Info Board
    const dx = clickX - this.enemyBall.x;
    const dy = clickY - this.enemyBall.y;
    const dist = Math.hypot(dx, dy);

    // If equipped with Stellar Remote OR playing as The Owner: Clicking ball or canvas opens/toggles the Stellar Command Menu
    const isOwnerRole = this.p.role === 'the_owner' || this.p.role === 'the_owner_7b';
    const pDx = clickX - this.playerBall.x;
    const pDy = clickY - this.playerBall.y;
    const pDist = Math.hypot(pDx, pDy);

    if (this.p.weapon.key === 'stellar_remote' || (isOwnerRole && pDist <= this.playerBall.radius + 40)) {
      this.toggleStellarMenu();
      return;
    }

    if (this.isSandbox && (dist <= this.enemyBall.radius + 30 || Math.abs(dx) <= 95 && clickY < this.enemyBall.y && clickY > this.enemyBall.y - 80)) {
      this.sandboxTotalDamage = 0;
      this.sandboxDps = 0;
      this.sandboxDmgHistory = [];
      this.logMessage = '🎯 [SANDBOX]: Đã Reset Tổng Sát Thương và DPS về 0!';
      this.spawnSparks(this.enemyBall.x, this.enemyBall.y, '#22c55e', 20);
      return;
    }

    // Otherwise in Sandbox: Click triggers attack towards cursor or normal attack
    if (this.isSandbox) {
      this.p.nextAtkAt = 0;
      this.performAttack(this.p, this.e, 'Bạn');
    }
  }

  public cycleDimensionMode() {
    if (this.dimensionMode === '2d') {
      this.dimensionMode = '3d';
    } else if (this.dimensionMode === '3d') {
      this.dimensionMode = '4d';
    } else {
      this.dimensionMode = '2d';
    }
    sound.playDimensionWarp(this.dimensionMode);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred_dimension_mode', this.dimensionMode);
    }
    this.logMessage = `🌌 [KHÔNG GIAN]: Chuyển sang chế độ ${this.dimensionMode.toUpperCase()} (${this.dimensionMode === '4d' ? 'Siêu Chiều 4D Tesseract' : this.dimensionMode === '3d' ? '3D Lập Thể Phối Cảnh' : '2D Cổ Điển - Cực Mượt'})!`;
    if (this.onDimensionChange) {
      this.onDimensionChange(this.dimensionMode);
    }
  }

  public setDimensionMode(mode: '2d' | '3d' | '4d') {
    this.dimensionMode = mode;
    sound.playDimensionWarp(this.dimensionMode);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred_dimension_mode', this.dimensionMode);
    }
    this.logMessage = `🌌 [KHÔNG GIAN]: Chuyển sang chế độ ${this.dimensionMode.toUpperCase()} (${this.dimensionMode === '4d' ? 'Siêu Chiều 4D Tesseract' : this.dimensionMode === '3d' ? '3D Lập Thể Phối Cảnh' : '2D Cổ Điển - Cực Mượt'})!`;
    if (this.onDimensionChange) {
      this.onDimensionChange(this.dimensionMode);
    }
  }

  public handleKeyDown(k: string) {
    const keyLower = k.toLowerCase();
    this.sandboxKeysPressed.add(keyLower);

    // Key V switches dimension (2D -> 3D -> 4D)
    if (keyLower === 'v') {
      this.cycleDimensionMode();
      return;
    }

    // Key M toggles Stellar Remote Menu
    if (keyLower === 'm') {
      if (this.p.weapon.key === 'stellar_remote' || this.p.role === 'the_owner' || this.p.role === 'the_owner_7b') {
        this.toggleStellarMenu();
        return;
      }
    }

    // Number keys 1-0 trigger skills
    if (['1','2','3','4','5','6','7','8','9','0'].includes(k)) {
      const slot = k === '0' ? 10 : parseInt(k, 10);
      this.triggerSkillSlot(slot);
    } else if (k === ' ' && this.isSandbox) {
      this.p.nextAtkAt = 0;
      this.performAttack(this.p, this.e, 'Bạn');
    }
  }

  public handleKeyUp(k: string) {
    this.sandboxKeysPressed.delete(k.toLowerCase());
  }

  private updateProjectiles(dt: number) {
    this.projectiles = this.projectiles.filter(proj => {
      if (this.battleOver) return false;
      if (this.now - proj.createdAt > proj.lifetimeMs) return false;

      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;

      if (proj.x < -60 || proj.x > this.width + 60 || proj.y < -60 || proj.y > this.height + 60) {
        return false;
      }

      // Trail particles
      if (Math.random() < 0.4) {
        const isNhatQuang = proj.type === 'songkiem_nhatquang';
        this.particles.push({
          x: proj.x + (Math.random() - 0.5) * (isNhatQuang ? 30 : 10),
          y: proj.y + (Math.random() - 0.5) * (isNhatQuang ? 30 : 10),
          vx: (Math.random() - 0.5) * 30,
          vy: (Math.random() - 0.5) * 30,
          radius: isNhatQuang ? 3.5 : proj.type === 'songkiem_slash' ? 2.5 : 1.5,
          color: isNhatQuang ? (Math.random() > 0.5 ? '#facc15' : '#22d3ee') : proj.color,
          alpha: 0.8,
          life: 0,
          maxLife: isNhatQuang ? 0.3 : 0.2
        });
      }

      const targetBall = proj.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const targetEntity = proj.ownerIsPlayer ? this.e : this.p;
      const attackerEntity = proj.ownerIsPlayer ? this.p : this.e;
      const attackerBall = proj.ownerIsPlayer ? this.playerBall : this.enemyBall;
      const attackerName = proj.ownerIsPlayer ? 'Bạn' : 'Địch';

      const dist = Math.hypot(targetBall.x - proj.x, targetBall.y - proj.y);
      if (dist <= targetBall.radius + proj.radius) {
        let rawDmg = proj.dmg;
        if (attackerEntity.element && attackerEntity.element.type === 'lightning') {
          rawDmg += lightningBoltDmg(attackerEntity.element.tier);
        }
        const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attackerEntity, rawDmg);
        const roundedDmg = Math.round(finalDmg * this.dmgMul);
        this.applyDamage(targetEntity, roundedDmg);

        this.triggerSoTanAttackBeast(attackerEntity, targetEntity, attackerBall, targetBall, attackerName, roundedDmg);

        const vLen = Math.hypot(proj.vx, proj.vy) || 1;
        const kx = proj.vx / vLen;
        const ky = proj.vy / vLen;
        const knockSpeed = proj.type === 'songkiem_nhatquang' ? 140 : proj.type === 'crossbow_bolt' ? 95 : 45;
        targetBall.vx += kx * knockSpeed;
        targetBall.vy += ky * knockSpeed;

        const pCount = proj.type === 'songkiem_nhatquang' ? 16 : 8;
        for (let i = 0; i < pCount; i++) {
          this.particles.push({
            x: proj.x,
            y: proj.y,
            vx: (Math.random() - 0.5) * (proj.type === 'songkiem_nhatquang' ? 180 : 120),
            vy: (Math.random() - 0.5) * (proj.type === 'songkiem_nhatquang' ? 180 : 120),
            radius: 2 + Math.random() * (proj.type === 'songkiem_nhatquang' ? 4 : 2),
            color: proj.color,
            alpha: 1,
            life: 0,
            maxLife: 0.35
          });
        }

        if (proj.type === 'songkiem_nhatquang') {
          this.shakeScreen(10);
          this.expandingRings.push({
            x: targetBall.x,
            y: targetBall.y,
            radius: 0,
            maxRadius: 110,
            color: '#facc15',
            alpha: 1,
            thickness: 5,
            life: 0,
            maxLife: 0.4
          });
          this.logMessage = `✨ [NHẤT QUANG TRÚNG ĐÍCH]: ${attackerName} chém trúng luồng kiếm khổng lồ${isCrit ? ' [BẠO KÍCH!]' : ''}, gây ${roundedDmg} sát thương cực khủng!`;
        } else {
          if (proj.type === 'crossbow_bolt') {
            this.shakeScreen(4);
          } else if (proj.type === 'songkiem_slash') {
            this.shakeScreen(2.5);
          }
          const typeLabel = proj.type === 'arrow' ? 'mũi tên' : proj.type === 'crossbow_bolt' ? 'mũi tên nỏ xuyên giáp' : 'đường kiếm khí';
          this.logMessage = `${attackerName} bắn trúng ${typeLabel}${isCrit ? ' [BẠO KÍCH!]' : ''}, gây ${roundedDmg} sát thương`;
        }

        return false;
      }

      return true;
    });
  }

  private updateRitual(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (!entity.weapon.isRitual || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    const r = entity.ritual;
    if (!r) return;

    if (r.state === 'idle' && this.now >= r.nextReadyAt) {
      r.state = 'rings';
      r.phaseEndAt = this.now + RITUAL_RING_DURATION;
      ownBall.vx = 0;
      ownBall.vy = 0;
      r.rings = {
        rotations: [0, 0, 0, 0, 0],
        lastHits: [0, 0, 0, 0, 0],
        taijiRot: 0
      };
      this.logMessage = `${name} bắt đầu triệu hồi Sát Na Vĩnh Hằng...`;
    } else if (r.state === 'rings' && r.rings) {
      ownBall.vx = 0;
      ownBall.vy = 0;
      r.rings.taijiRot += 0.15;

      const ringRadii = [26, 46, 68, 90, 112];
      const dx = opponentBall.x - ownBall.x;
      const dy = opponentBall.y - ownBall.y;
      const distToEnemy = Math.hypot(dx, dy);

      ringRadii.forEach((radius, i) => {
        const speed = (2.2 - i * 0.35) * 0.05 * RITUAL_ROTATE_DIRS[i];
        if (r.rings) {
          r.rings.rotations[i] += speed;

          if (
            Math.abs(distToEnemy - radius) < RITUAL_RING_HIT_RADIUS &&
            this.now - r.rings.lastHits[i] > RITUAL_RING_HIT_COOLDOWN
          ) {
            r.rings.lastHits[i] = this.now;
            const { dmg: finalDmg } = this.finalizeAttackerDmg(entity, RITUAL_RING_DMG);
            const roundedDmg = Math.round(finalDmg * this.dmgMul);
            this.applyDamage(opponentEntity, roundedDmg);
            this.logMessage = `${name}: Vòng Sát Na cắt trúng địch, -${roundedDmg} HP`;
            this.spawnSparks(opponentBall.x, opponentBall.y, '#9b59b6', 8);
          }
        }
      });

      if (this.now >= r.phaseEndAt) {
        r.rings = null;

        // Teleport to closest corner, then aim at opposite corner
        let bestIdx = 0;
        let bestDist = Infinity;
        ARENA_CORNERS.forEach((c, i) => {
          const d = Math.hypot(ownBall.x - c.x, ownBall.y - c.y);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        const target = ARENA_CORNERS[oppositeCornerIndex(bestIdx)];
        ownBall.x = ARENA_CORNERS[bestIdx].x;
        ownBall.y = ARENA_CORNERS[bestIdx].y;
        ownBall.vx = 0;
        ownBall.vy = 0;

        const dirX = target.x - ownBall.x;
        const dirY = target.y - ownBall.y;
        const dirLen = Math.hypot(dirX, dirY) || 1;
        r.fireDir = { x: dirX / dirLen, y: dirY / dirLen };
        r.fireLen = dirLen;
        r.lastFireTick = this.now;

        r.state = 'fire';
        r.phaseEndAt = this.now + RITUAL_FIRE_DURATION;
        this.logMessage = `${name} dịch chuyển đến góc và phun lửa thiêu rụi!`;
      }
    } else if (r.state === 'fire' && r.fireDir) {
      ownBall.vx = 0;
      ownBall.vy = 0;
      const dir = r.fireDir;
      const fireLen = r.fireLen;
      const nx = -dir.y;
      const ny = dir.x;

      if (this.now - r.lastFireTick >= RITUAL_FIRE_TICK_MS) {
        r.lastFireTick = this.now;
        const ex = opponentBall.x - ownBall.x;
        const ey = opponentBall.y - ownBall.y;
        const along = ex * dir.x + ey * dir.y;
        const perp = Math.abs(ex * nx + ey * ny);
        const halfWidthAtDist = RITUAL_FIRE_BASE_HALF_WIDTH + Math.max(0, along) * RITUAL_FIRE_WIDEN_RATE;
        if (along > 0 && along < fireLen && perp < halfWidthAtDist) {
          const { dmg: finalDmg } = this.finalizeAttackerDmg(entity, RITUAL_FIRE_DMG_PER_TICK);
          const roundedDmg = Math.round(finalDmg * this.dmgMul);
          this.applyDamage(opponentEntity, roundedDmg);
          this.spawnSparks(opponentBall.x, opponentBall.y, '#ff6b00', 4);
        }
      }

      if (this.now >= r.phaseEndAt) {
        r.state = 'slash';
        r.slashDone = false;
        this.logMessage = `${name} chuẩn bị 3 đường chém rực lửa!`;
      }
    } else if (r.state === 'slash') {
      if (!r.slashDone) {
        r.slashDone = true;
        r.slashIndex = 0;
        r.slashAngles = [0, 60, 120];
        this.doNextSlash(entity, opponentBall, opponentEntity, name);
      }
    }
  }

  private doNextSlash(
    entity: Entity,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (this.battleOver || !entity.ritual || !entity.ritual.slashAngles) return;
    const r = entity.ritual;
    const cx = 250;
    const cy = 250;
    const deg = r.slashAngles[r.slashIndex];
    const rad = (deg * Math.PI) / 180;
    const dxr = Math.cos(rad);
    const dyr = Math.sin(rad);
    const x1 = cx - dxr * 300;
    const y1 = cy - dyr * 300;
    const x2 = cx + dxr * 300;
    const y2 = cy + dyr * 300;

    this.activeCracks.push({
      x1,
      y1,
      x2,
      y2,
      attackerIsPlayer: entity === this.p,
      createdAt: this.now,
      lastTick: this.now
    });

    this.logMessage = `${name} chém đường rực lửa thứ ${r.slashIndex + 1}/3`;
    this.screenShake = 6;
    this.spawnSparks(cx, cy, '#ff6a1a', 20);

    r.slashIndex += 1;
    if (r.slashIndex < 3) {
      setTimeout(() => {
        this.doNextSlash(entity, opponentBall, opponentEntity, name);
      }, 250);
    } else {
      setTimeout(() => {
        this.doExplosion(entity, opponentEntity, name);
      }, 300);
    }
  }

  private updateActiveCracks(now: number) {
    this.activeCracks = this.activeCracks.filter(crack => {
      if (this.battleOver) return false;
      if (now - crack.createdAt > CRACK_LIFETIME_MS) return false;
      if (now - crack.lastTick < CRACK_TICK_MS) return true;
      crack.lastTick = now;

      const attacker = crack.attackerIsPlayer ? this.p : this.e;
      const oppBall = crack.attackerIsPlayer ? this.enemyBall : this.playerBall;
      const oppEntity = crack.attackerIsPlayer ? this.e : this.p;

      const dx = crack.x2 - crack.x1;
      const dy = crack.y2 - crack.y1;
      const lenSq = dx * dx + dy * dy || 1;
      const ex = oppBall.x - crack.x1;
      const ey = oppBall.y - crack.y1;
      let t = (ex * dx + ey * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const closestX = crack.x1 + dx * t;
      const closestY = crack.y1 + dy * t;
      const dist = Math.hypot(oppBall.x - closestX, oppBall.y - closestY);
      const halfWidth = crackHalfWidthAt(t);

      if (dist < halfWidth) {
        const { dmg: finalDmg } = this.finalizeAttackerDmg(attacker, CRACK_DMG_PER_TICK);
        const roundedDmg = finalDmg * this.dmgMul;
        this.applyDamage(oppEntity, roundedDmg);
      }
      return true;
    });
  }

  private doExplosion(entity: Entity, opponentEntity: Entity, name: string) {
    if (this.battleOver) return;
    const cx = 250;
    const cy = 250;

    this.expandingRings.push({
      x: cx,
      y: cy,
      radius: 5,
      maxRadius: 260,
      color: '#ffffff',
      alpha: 1,
      thickness: 4,
      life: 0,
      maxLife: 0.7
    });

    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 150 + Math.random() * 250;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3 + Math.random() * 4,
        color: '#ffcc66',
        alpha: 1,
        life: 0,
        maxLife: 0.8,
        type: 'shard',
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    const { dmg: finalDmg } = this.finalizeAttackerDmg(entity, RITUAL_EXPLOSION_DMG);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(opponentEntity, roundedDmg);
    this.logMessage = `${name} SÁT NA VĨNH HẰNG PHÁT NỔ! -${roundedDmg} HP`;
    this.screenShake = 16;

    if (entity.ritual) {
      entity.ritual.state = 'idle';
      entity.ritual.nextReadyAt = this.now + (entity.weapon.cooldownMs || 20000);
    }
  }

  private getRandomQTEKey(excludeKey?: QTEKey): QTEKey {
    const keys: QTEKey[] = ['W', 'A', 'S', 'D'];
    const candidates = excludeKey ? keys.filter(k => k !== excludeKey) : keys;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  public handleQTEInput(rawKey: string): boolean {
    if (!this.comboQTE || !this.comboQTE.active || !this.comboQTE.attackerIsPlayer || this.battleOver) {
      return false;
    }

    let key = rawKey.toUpperCase().trim();
    if (key === 'ARROWUP' || key === 'KEYW') key = 'W';
    if (key === 'ARROWLEFT' || key === 'KEYA') key = 'A';
    if (key === 'ARROWDOWN' || key === 'KEYS') key = 'S';
    if (key === 'ARROWRIGHT' || key === 'KEYD') key = 'D';
    if (key === '' || key === 'SPACE' || rawKey === ' ') key = 'SPACE';

    if (key === this.comboQTE.requiredKey) {
      this.doComboPunch(this.p, this.e, this.playerBall, this.enemyBall, 'Bạn');
      return true;
    } else {
      // Wrong key -> trigger Uppercut Finisher immediately
      this.finishCombo(this.p, this.e, this.playerBall, this.enemyBall, 'Bạn', 'wrong_key');
      return false;
    }
  }

  private spawnShadowClones(ownerIsPlayer: boolean, originBall: Ball) {
    // Remove previous clones belonging to this owner
    this.shadowClones = this.shadowClones.filter(c => c.ownerIsPlayer !== ownerIsPlayer);
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 190 + Math.random() * 70;
      this.shadowClones.push({
        id: `clone_${this.now}_${i}_${Math.random()}`,
        x: originBall.x + Math.cos(angle) * 24,
        y: originBall.y + Math.sin(angle) * 24,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 12,
        hp: 1,
        maxHp: 1,
        ownerIsPlayer,
        color: ownerIsPlayer ? '#a855f7' : '#7e22ce',
        createdAt: this.now,
        lastAtkAt: 0
      });
    }
    this.spawnSparks(originBall.x, originBall.y, '#9333ea', 22);
    this.spawnSparks(originBall.x, originBall.y, '#c084fc', 16);
    this.screenShake = 6;
  }

  private updateShadowClones(dt: number) {
    if (this.shadowClones.length === 0) return;

    const PADDING = 14;
    const MIN_X = PADDING;
    const MAX_X = 500 - PADDING;
    const MIN_Y = PADDING;
    const MAX_Y = 500 - PADDING;

    this.shadowClones.forEach(clone => {
      const targetBall = clone.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const targetEntity = clone.ownerIsPlayer ? this.e : this.p;

      const dx = targetBall.x - clone.x;
      const dy = targetBall.y - clone.y;
      const dist = Math.hypot(dx, dy) || 1;

      // Homing steer towards target
      const homeSpeed = 230;
      const desiredVx = (dx / dist) * homeSpeed;
      const desiredVy = (dy / dist) * homeSpeed;
      clone.vx += (desiredVx - clone.vx) * dt * 4;
      clone.vy += (desiredVy - clone.vy) * dt * 4;

      clone.x += clone.vx * dt;
      clone.y += clone.vy * dt;

      // Bounce bounds
      if (clone.x - clone.radius < MIN_X) {
        clone.x = MIN_X + clone.radius;
        clone.vx = Math.abs(clone.vx);
      } else if (clone.x + clone.radius > MAX_X) {
        clone.x = MAX_X - clone.radius;
        clone.vx = -Math.abs(clone.vx);
      }
      if (clone.y - clone.radius < MIN_Y) {
        clone.y = MIN_Y + clone.radius;
        clone.vy = Math.abs(clone.vy);
      } else if (clone.y + clone.radius > MAX_Y) {
        clone.y = MAX_Y - clone.radius;
        clone.vy = -Math.abs(clone.vy);
      }

      // Trail
      if (Math.random() < 0.25) {
        this.particles.push({
          x: clone.x + (Math.random() - 0.5) * 6,
          y: clone.y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          radius: 2.5,
          color: '#9333ea',
          alpha: 0.5,
          life: 0,
          maxLife: 0.25
        });
      }

      // Hit enemy ball -> deal 5 DMG and dissipate (1 HP)
      if (dist < clone.radius + targetBall.radius) {
        const cloneDmg = Math.round(5 * this.dmgMul);
        this.applyDamage(targetEntity, cloneDmg);
        clone.hp = 0;
        this.spawnSparks(clone.x, clone.y, '#c084fc', 16);
        this.spawnSparks(clone.x, clone.y, '#9333ea', 12);
        this.screenShake = 3;
        const ownerName = clone.ownerIsPlayer ? 'Bạn' : 'Địch';
        this.logMessage = `👤 Phân thân bóng tối (${ownerName}) đấm trúng đối thủ (-${cloneDmg} HP)!`;
      }
    });

    this.shadowClones = this.shadowClones.filter(c => c.hp > 0);
  }

  private renderShadowClones(ctx: CanvasRenderingContext2D) {
    if (this.shadowClones.length === 0) return;

    ctx.save();
    this.shadowClones.forEach(clone => {
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(24, 10, 42, 0.85)';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(clone.x, clone.y, clone.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Eyes
      ctx.fillStyle = '#f0abfc';
      ctx.beginPath();
      ctx.arc(clone.x - 3.5, clone.y - 2, 1.8, 0, Math.PI * 2);
      ctx.arc(clone.x + 3.5, clone.y - 2, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Mini 1 HP tag
      ctx.fillStyle = 'rgba(239, 68, 68, 0.95)';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('1 HP', clone.x, clone.y - clone.radius - 3);
    });
    ctx.restore();
  }

  private applyComboPunchHit(
    attacker: Entity,
    defender: Entity,
    attackerBall: Ball,
    defenderBall: Ball,
    comboIndex: number,
    name: string
  ): { dmgTotal: number; elementMsg: string } {
    const isPlayer = attacker === this.p;
    // Base damage scaling: +0.05 / combo
    const basePunch = 5 + Math.max(0, comboIndex - 1) * 0.05;
    let extraDmg = 0;
    let elementMsg = '';

    if (attacker.element) {
      const el = attacker.element;
      if (el.type === 'fire') {
        // "lửa quyền lửa : gây 10 dmg, +2.5/lv(I-XV)"
        const fireBonus = 10 + 2.5 * el.tier;
        extraDmg += fireBonus;
        elementMsg = ` 🔥[Quyền Lửa +${fireBonus.toFixed(1)} DMG]`;
        this.spawnSparks(defenderBall.x, defenderBall.y, '#ef4444', 18);
        this.spawnSparks(defenderBall.x, defenderBall.y, '#f97316', 12);
        defender.dot = {
          type: 'fire',
          dmgPerSec: Math.round(fireBonus * 0.5),
          endsAt: this.now + 4500,
          lastTick: this.now
        };
      } else if (el.type === 'lightning') {
        // "sét: tầm đánh xa hơn vì đánh xa"
        const shockBonus = lightningBoltDmg(el.tier);
        extraDmg += shockBonus;
        elementMsg = ` ⚡[Sét Giật +${shockBonus} DMG]`;
        this.spawnSparks(defenderBall.x, defenderBall.y, '#38bdf8', 16);
        this.spawnSparks(defenderBall.x, defenderBall.y, '#facc15', 12);
      } else if (el.type === 'plant') {
        // "thực vật: đấm ra rễ cây"
        defender.rootedUntil = this.now + 1600;
        defenderBall.vx = 0;
        defenderBall.vy = 0;
        elementMsg = ` 🌿[Rễ Cây Trói Chân!]`;
        this.spawnSparks(defenderBall.x, defenderBall.y, '#22c55e', 20);
        this.spawnSparks(defenderBall.x, defenderBall.y, '#16a34a', 14);
      } else if (el.type === 'poison') {
        // "độc : stack lv độc càng cao dmg càng to"
        const currentStacks = (defender.dot && defender.dot.type === 'poison' ? (defender.dot.poisonStacks || 0) : 0) + 1;
        const poisonDps = (el.tier * 3) + (currentStacks * el.tier * 4);
        defender.dot = {
          type: 'poison',
          dmgPerSec: poisonDps,
          endsAt: this.now + 6000,
          lastTick: this.now,
          poisonStacks: currentStacks
        };
        elementMsg = ` 🧪[Độc Tích Tụ x${currentStacks}: -${Math.round(poisonDps * this.dmgMul)} HP/s]`;
        this.spawnSparks(defenderBall.x, defenderBall.y, '#a855f7', 16);
        this.spawnSparks(defenderBall.x, defenderBall.y, '#10b981', 12);
      } else if (el.type === 'shadow') {
        // "bóng tối tạo 5 phân thân nhưng chúng chỉ có 1hp"
        if (comboIndex === 1 || this.shadowClones.filter(c => c.ownerIsPlayer === isPlayer).length === 0) {
          this.spawnShadowClones(isPlayer, attackerBall);
          elementMsg = ` 👤[Triệu Hồi 5 Phân Thân 1 HP!]`;
        }
      }
    }

    const { dmg: finalDmg } = this.finalizeAttackerDmg(attacker, basePunch + extraDmg);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(defender, roundedDmg);

    attacker.weaponRecoil = 1;
    this.spawnSparks(defenderBall.x, defenderBall.y, '#f59e0b', 14);
    this.screenShake = 6;

    return { dmgTotal: roundedDmg, elementMsg };
  }

  private startComboQTE(
    attacker: Entity,
    defender: Entity,
    attackerBall: Ball,
    defenderBall: Ball,
    name: string
  ) {
    const isPlayer = attacker === this.p;
    attacker.nextAtkAt = this.now + 4000;

    const { dmgTotal, elementMsg } = this.applyComboPunchHit(attacker, defender, attackerBall, defenderBall, 1, name);

    const initialKey = this.getRandomQTEKey();
    this.comboQTE = {
      active: true,
      attackerIsPlayer: isPlayer,
      requiredKey: initialKey,
      comboCount: 1,
      startedAt: this.now,
      expiresAt: this.now + 3000,
      animPunchTime: this.now,
      lastAiCheckAt: this.now
    };

    if (isPlayer) {
      this.logMessage = `🥊 [COMBO BẮT ĐẦU]: Đấm x1 (-${dmgTotal} HP)${elementMsg}! NHẤN PHÍM [${initialKey}] TRONG 3S ĐỂ LIÊN HOÀN!`;
    } else {
      this.logMessage = `🥊 [ĐỊCH DÙNG COMBO]: Địch tung cú đấm đầu (-${dmgTotal} HP)${elementMsg} và bắt đầu liên hoàn đấm!`;
    }
  }

  private doComboPunch(
    attacker: Entity,
    defender: Entity,
    attackerBall: Ball,
    defenderBall: Ball,
    name: string
  ) {
    if (!this.comboQTE) return;

    this.comboQTE.comboCount += 1;
    const currentCount = this.comboQTE.comboCount;

    const { dmgTotal, elementMsg } = this.applyComboPunchHit(
      attacker,
      defender,
      attackerBall,
      defenderBall,
      currentCount,
      name
    );

    this.comboQTE.requiredKey = this.getRandomQTEKey(this.comboQTE.requiredKey);
    this.comboQTE.expiresAt = this.now + 3000;
    this.comboQTE.animPunchTime = this.now;

    const isPlayer = attacker === this.p;
    if (isPlayer) {
      this.logMessage = `🥊 Bạn đấm trúng nhịp! COMBO x${currentCount} (-${dmgTotal} HP)${elementMsg}! [BẤM TIẾP: ${this.comboQTE.requiredKey}]`;
    } else {
      this.logMessage = `🥊 Địch đấm trúng nhịp! COMBO x${currentCount} (-${dmgTotal} HP)${elementMsg}!`;
    }
  }

  private finishCombo(
    attacker: Entity,
    defender: Entity,
    attackerBall: Ball,
    defenderBall: Ball,
    name: string,
    reason: 'timeout' | 'wrong_key' | 'ai_finisher'
  ) {
    // Đòn đấm trên (Uppercut): 30 DMG
    const { dmg: finalDmg } = this.finalizeAttackerDmg(attacker, 30);
    const uppercutDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(defender, uppercutDmg);

    attacker.weaponRecoil = 1.6;
    this.screenShake = 15;
    this.spawnSparks(defenderBall.x, defenderBall.y, '#ef4444', 30);
    this.spawnSparks(defenderBall.x, defenderBall.y, '#facc15', 20);

    this.expandingRings.push({
      x: defenderBall.x,
      y: defenderBall.y,
      radius: 5,
      maxRadius: 75,
      thickness: 4,
      color: '#ef4444',
      alpha: 1,
      life: 0,
      maxLife: 0.35
    });

    // Knockback cực mạnh bay về hướng tường (tốc độ cao 920 px/s)
    let dx = defenderBall.x - attackerBall.x;
    let dy = defenderBall.y - attackerBall.y;
    let dist = Math.hypot(dx, dy);
    if (dist < 1) {
      dx = (Math.random() - 0.5) * 2;
      dy = (Math.random() - 0.5) * 2;
      dist = Math.hypot(dx, dy) || 1;
    }

    const knockbackSpeed = 920;
    defenderBall.vx = (dx / dist) * knockbackSpeed;
    defenderBall.vy = (dy / dist) * knockbackSpeed;

    // Đánh dấu va đập tường 20 DMG
    this.comboWallCrash = {
      active: true,
      victimIsPlayer: defender === this.p,
      dmg: 20
    };

    const count = this.comboQTE ? this.comboQTE.comboCount : 1;
    this.comboQTE = null;
    attacker.nextAtkAt = this.now + (attacker.weapon.baseCooldown || 900);

    const isPlayer = attacker === this.p;
    const reasonText = reason === 'timeout' ? 'Hết 3 giây' : reason === 'wrong_key' ? 'Bấm trượt' : 'Kết thúc combo';
    const targetName = isPlayer ? 'Địch' : 'Bạn';
    this.logMessage = `💥 [${reasonText}]: ${name} tung cú ĐẤM TRÊN (Combo x${count}) hất tung ${targetName} (-${uppercutDmg} HP)! Đang bay đập tường...`;
  }

  private updateCombo(dt: number) {
    // Check if either entity has Lightning Combo Fist and can attack from distance (up to 160px)
    if (!this.comboQTE && !this.battleOver) {
      const checkLightningCombo = (attacker: Entity, defender: Entity, aBall: Ball, dBall: Ball, name: string) => {
        if (
          attacker.weapon.isComboFist &&
          attacker.element?.type === 'lightning' &&
          this.now >= attacker.nextAtkAt &&
          !this.isRooted(attacker, this.now) &&
          !this.isStunned(attacker, this.now)
        ) {
          const dist = Math.hypot(dBall.x - aBall.x, dBall.y - aBall.y);
          if (dist <= 160) {
            this.startComboQTE(attacker, defender, aBall, dBall, name);
          }
        }
      };

      checkLightningCombo(this.p, this.e, this.playerBall, this.enemyBall, 'Bạn');
      if (!this.comboQTE) {
        checkLightningCombo(this.e, this.p, this.enemyBall, this.playerBall, 'Địch');
      }
    }

    if (!this.comboQTE || !this.comboQTE.active || this.battleOver) return;

    // Check timeout (> 3s)
    if (this.now >= this.comboQTE.expiresAt) {
      if (this.comboQTE.attackerIsPlayer) {
        this.finishCombo(this.p, this.e, this.playerBall, this.enemyBall, 'Bạn', 'timeout');
      } else {
        this.finishCombo(this.e, this.p, this.enemyBall, this.playerBall, 'Địch', 'timeout');
      }
      return;
    }

    // AI bot behavior
    if (!this.comboQTE.attackerIsPlayer) {
      if (!this.comboQTE.lastAiCheckAt || this.now - this.comboQTE.lastAiCheckAt >= 420) {
        this.comboQTE.lastAiCheckAt = this.now;
        const aiSuccess = Math.random() < 0.78;
        if (aiSuccess && this.comboQTE.comboCount < 6) {
          this.doComboPunch(this.e, this.p, this.enemyBall, this.playerBall, 'Địch');
        } else {
          this.finishCombo(this.e, this.p, this.enemyBall, this.playerBall, 'Địch', 'ai_finisher');
        }
      }
    }
  }

  private performAttack(attacker: Entity, defender: Entity, name: string) {
    if (attacker === this.p || attacker === this.p2) {
      this.playerAttacksAttempted++;
    } else {
      this.enemyAttacksAttempted++;
    }

    if (this.isStunned(attacker, this.now)) return;
    if (defender.element && defender.element.type === 'shadow' && Math.random() < 0.05) {
      this.logMessage = `${name === 'Bạn' ? 'Địch' : 'Bạn'} tàng hình né đòn!`;
      return;
    }
    let dmg = dealDamage(attacker.weapon, defender.weapon, attacker.weapon.dmg || 10);
    let msg = `${name} dùng ${attacker.weapon.name}`;

    const atkBall = attacker === this.p ? this.playerBall : this.enemyBall;
    const defBall = defender === this.p ? this.playerBall : this.enemyBall;

    if (attacker.weapon.key === 'computer') {
      const morphPool = ['kiem', 'dao', 'cung', 'no', 'giao', 'mace', 'railgun', 'minigun', 'cancau', 'songkiem', 'tamkiem'];
      const morph = morphPool[Math.floor(Math.random() * morphPool.length)];
      const wepDef = WEAPON_DEFS[morph];
      msg = `💻 [MÁY TÍNH HACKER]: ${name} biến hóa thành [${wepDef?.name || morph}]`;
      if (morph === 'railgun' || morph === 'minigun') {
        dmg += 40;
        this.spawnSparks(defBall.x, defBall.y, '#38bdf8', 20);
      } else if (morph === 'cancau') {
        dmg += 30;
        defBall.vx = (atkBall.x - defBall.x) * 2;
        defBall.vy = (atkBall.y - defBall.y) * 2;
      } else if (morph === 'tamkiem' || morph === 'songkiem') {
        dmg += 45;
        this.spawnSparks(defBall.x, defBall.y, '#4ade80', 20);
      } else {
        dmg += 25;
      }
    }

    if (attacker.weapon.key === 'daynit') {
      const oppName = name === 'Bạn' ? 'Địch' : 'Bạn';
      const percentHp = attacker.weapon.dayNitPercentHp || 0.36179;
      const durationMs = attacker.weapon.dayNitDurationMs || 5000;
      const totalDmg = Math.max(1, Math.round(defender.maxHp * percentHp));
      const tickInterval = 250;
      const totalTicks = Math.round(durationMs / tickInterval); // 20 ticks
      const dmgPerTick = Math.max(1, Math.round(totalDmg / totalTicks));

      defender.dayNitEffect = {
        attackerName: name,
        startedAt: this.now,
        endsAt: this.now + durationMs,
        lastTick: this.now,
        tickInterval,
        dmgPerTick,
        totalDmg,
        remainingTicks: totalTicks
      };

      this.spawnSparks(defBall.x, defBall.y, '#ef4444', 24);
      this.spawnSparks(defBall.x, defBall.y, '#f59e0b', 16);

      // 50% chance of "Đau Đớn Tột Cùng" (Stun 3.0s)
      const gotPainStun = Math.random() < 0.50;
      if (gotPainStun) {
        defender.dayNitStunUntil = this.now + 3000;
        defender.rootedUntil = Math.max(defender.rootedUntil, this.now + 3000);
        defBall.vx = 0;
        defBall.vy = 0;
        this.shakeScreen(15);
        this.floatingTexts.push({
          text: '😱 ĐAU ĐỚN TỘT CÙNG (CHOÁNG 3S)! 💢',
          x: defBall.x,
          y: defBall.y - 28,
          color: '#ef4444',
          createdAt: this.now,
          expiresAt: this.now + 2500
        });
      }

      this.floatingTexts.push({
        text: `💢 QUẤT DÂY NỊT (-36.179% HP/5s)`,
        x: defBall.x,
        y: defBall.y - 12,
        color: '#f59e0b',
        createdAt: this.now,
        expiresAt: this.now + 2000
      });

      msg = `👑 [DÂY NỊT TỬ THẦN]: ${name} quất cực rát trúng ${oppName} (-36.179% HP/5s = -${totalDmg.toLocaleString()} HP)${gotPainStun ? ' + 💥 [ĐAU ĐỚN TỘT CÙNG: CHOÁNG 3S!]' : ''}`;
    }

    if (attacker.weapon.key === 'stellar_remote' || attacker.weapon.isStellarRemote) {
      const stellarMul = this.getStellarMultiplier(attacker);
      dmg += Math.round(100_000 * stellarMul);
      msg = `🛰️ [STELLAR REMOTE (x${stellarMul})]: ${name} kích hoạt xung kích vệ tinh quỹ đạo (+${Math.round(100_000 * stellarMul).toLocaleString()} DMG)`;
      this.spawnSparks(defBall.x, defBall.y, '#38bdf8', 25);
      sound.playLaser();
    }

    if (attacker.weapon.comboChance && Math.random() < attacker.weapon.comboChance) {
      const combo = dealDamage(attacker.weapon, defender.weapon, attacker.weapon.dmg || 10);
      dmg += combo;
      msg += ' (Liên kích!)';
    }
    if (attacker.element && attacker.element.type === 'lightning') {
      dmg += lightningBoltDmg(attacker.element.tier);
    }
    const { dmg: finalDmg, isCrit } = this.finalizeAttackerDmg(attacker, dmg);
    const roundedDmg = Math.round(finalDmg * this.dmgMul);
    this.applyDamage(defender, roundedDmg);
    if (roundedDmg > 0) {
      if (attacker === this.p || attacker === this.p2) {
        this.playerHitsLanded++;
      } else {
        this.enemyHitsLanded++;
      }
    }
    attacker.weaponRecoil = 1;

    if (attacker.weapon.key === 'railgun') {
      sound.playLaser();
    } else if (attacker.weapon.key === 'minigun') {
      sound.playMinigun();
    } else if (attacker.weapon.key === 'daynit') {
      sound.playDayNit();
    } else if (attacker.weapon.isDual || attacker.weapon.key === 'kiem' || attacker.weapon.key === 'songkiem' || attacker.weapon.key === 'tamkiem' || attacker.weapon.key === 'dao') {
      sound.playSlash();
    }

    // Hiệu ứng chém động mượt mà (Dynamic Slash Animation & Phát sáng)
    const slashAngle = Math.atan2(defBall.y - atkBall.y, defBall.x - atkBall.x);
    let slashType: 'crescent' | 'cross' | 'code_cleave' | 'heavy_cleave' = 'crescent';
    let slashColor = '#38bdf8';
    let slashGlow = '#0284c7';
    let slashRadius = 38;

    if (attacker.role === 'the_owner_7b') {
      slashType = 'code_cleave';
      slashColor = '#facc15';
      slashGlow = '#ca8a04';
      slashRadius = 55;
    } else if (attacker.weapon.key === 'riu' || attacker.weapon.key === 'mace') {
      slashType = 'heavy_cleave';
      slashColor = '#f43f5e';
      slashGlow = '#be123c';
      slashRadius = 45;
    } else if (attacker.weapon.key === 'sangthe') {
      slashType = 'cross';
      slashColor = '#facc15';
      slashGlow = '#eab308';
      slashRadius = 48;
    } else if (attacker.weapon.key === 'tamkiem' || attacker.weapon.key === 'songkiem') {
      slashType = 'crescent';
      slashColor = '#22d3ee';
      slashGlow = '#06b6d4';
      slashRadius = 42;
    } else if (attacker.weapon.key === 'computer') {
      slashType = 'code_cleave';
      slashColor = '#4ade80';
      slashGlow = '#16a34a';
      slashRadius = 40;
    }

    this.dynamicSlashes.push({
      x: defBall.x,
      y: defBall.y,
      angle: slashAngle + (Math.random() - 0.5) * 0.4,
      radius: slashRadius,
      color: slashColor,
      glowColor: slashGlow,
      type: slashType,
      createdAt: this.now,
      duration: 260
    });

    this.triggerSoTanAttackBeast(attacker, defender, atkBall, defBall, name, roundedDmg);

    msg += `${isCrit ? ' [BẠO KÍCH!]' : ''}, gây ${roundedDmg} sát thương`;

    if (attacker.element && (attacker.element.type === 'fire' || attacker.element.type === 'poison')) {
      const dps = attacker.element.type === 'poison' ? attacker.element.tier : 1;
      defender.dot = { dmgPerSec: dps, endsAt: this.now + 5000, lastTick: this.now };
    }
    if (attacker.element && attacker.element.type === 'plant' && Math.random() < 0.2) {
      defender.rootedUntil = this.now + 1000;
      defBall.vx = 0;
      defBall.vy = 0;
      msg += ' - Bị rễ cây trói chặt!';
    }
    this.logMessage = msg;
    this.spawnSparks(defBall.x, defBall.y, '#ffffff', 12);
  }

  private tickDot(entity: Entity, now: number) {
    if (!entity.dot) return;
    if (now > entity.dot.endsAt) {
      entity.dot = null;
      return;
    }
    if (now - entity.dot.lastTick >= 1000) {
      const dmg = Math.round(entity.dot.dmgPerSec * this.dmgMul);
      this.applyDamage(entity, dmg);
      entity.dot.lastTick = now;
    }
  }

  private updateAdminSkill(entity: Entity, _ownBall: Ball, name: string) {
    if (!entity.admin || this.battleOver) return;
    const a = entity.admin;

    if (a.buffActive && this.now > a.buffUntil) a.buffActive = false;
    if (a.speedActive && this.now > a.speedUntil) a.speedActive = false;

    if (this.now >= a.nextSkillAt) {
      a.freezeUntil = this.now + ADMIN_SKILL_FREEZE_MS;
      a.nextSkillAt = this.now + ADMIN_SKILL_INTERVAL_MS;

      const cmd = ADMIN_COMMANDS[Math.floor(Math.random() * ADMIN_COMMANDS.length)];
      a.activeCommandText = cmd;
      a.commandDisplayUntil = this.now + ADMIN_SKILL_FREEZE_MS;

      if (cmd === '/heal') {
        entity.hp = Math.min(entity.maxHp, entity.hp + entity.maxHp * ADMIN_HEAL_FRAC);
        this.logMessage = `${name} gõ lệnh ${cmd} -> Hồi phục máu tức thì!`;
      } else if (cmd === '/buff') {
        a.buffActive = true;
        a.buffUntil = this.now + ADMIN_BUFF_DURATION_MS;
        this.logMessage = `${name} gõ lệnh ${cmd} -> Tăng sát thương cực hạn!`;
      } else if (cmd === '/speed') {
        a.speedActive = true;
        a.speedUntil = this.now + ADMIN_SPEED_DURATION_MS;
        this.logMessage = `${name} gõ lệnh ${cmd} -> Tăng tốc xuất chiêu!`;
      } else if (cmd === '/-cd') {
        entity.nextAtkAt = this.now;
        if (entity.spear) entity.spear.nextReadyAt = this.now;
        if (entity.mace) entity.mace.nextReadyAt = this.now;
        if (entity.railgun) entity.railgun.nextFireAt = this.now;
        if (entity.minigun) entity.minigun.reloading = false;
        this.logMessage = `${name} gõ lệnh ${cmd} -> Reset toàn bộ thời gian hồi chiêu!`;
      }
    }
  }

  private updateWerewolf(entity: Entity, ownBall: Ball) {
    if (!entity.werewolf) return;
    const ww = entity.werewolf;

    if (this.now >= ww.phaseEndAt) {
      const hpFrac = entity.hp / entity.maxHp;
      ww.phase = ww.phase === 'day' ? 'night' : 'day';
      ww.phaseStartAt = this.now;
      ww.phaseEndAt = this.now + (ww.phase === 'day' ? WW_DAY_DURATION_MS : WW_NIGHT_DURATION_MS);
      entity.maxHp = Math.round(
        (entity.werewolfBase || 500) * (ww.phase === 'day' ? WW_DAY_HP_FRAC : WW_NIGHT_HP_FRAC)
      );
      entity.hp = Math.round(entity.maxHp * hpFrac);
    }

    const targetSpeed = ww.phase === 'day' ? WW_DAY_SPEED : WW_NIGHT_SPEED;
    const curSpeed = Math.hypot(ownBall.vx, ownBall.vy);
    if (curSpeed > 0.01) {
      const scale = targetSpeed / curSpeed;
      ownBall.vx *= scale;
      ownBall.vy *= scale;
    }
  }

  private spawnSparks(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 150;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 2,
        color,
        alpha: 1,
        life: 0,
        maxLife: 0.3 + Math.random() * 0.2
      });
    }
  }

  private updateSoTanSkill(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (!entity.sotan || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const st = entity.sotan;

    if (st.state === 'idle' && this.now >= st.nextSkillAt) {
      st.state = 'charging_rings';
      st.chargeStartAt = this.now;
      ownBall.vx = 0;
      ownBall.vy = 0;
      this.logMessage = `⚡ [NHẤT ĐIẾU KHAI THIÊN MÔN]: ${name} ngưng tụ vạn luân kim trận! Chuẩn bị giáng thế khai môn!`;
    } else if (st.state === 'charging_rings') {
      ownBall.vx = 0;
      ownBall.vy = 0;
      // Rotate 5 golden rings
      st.ringsRot = st.ringsRot.map((r, idx) => r + (0.045 + idx * 0.015));
      st.aimAngle = Math.atan2(opponentBall.y - ownBall.y, opponentBall.x - ownBall.x);

      // Spawn golden aura sparks
      if (Math.random() < 0.35) {
        this.spawnSparks(ownBall.x, ownBall.y, '#facc15', 3);
      }

      if (this.now - st.chargeStartAt >= st.chargeDuration) {
        // Dash to enemy -> smash!
        st.state = 'idle';
        st.nextSkillAt = this.now + SOTAN_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);

        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        ownBall.vx = nx * st.dashSpeed;
        ownBall.vy = ny * st.dashSpeed;

        // Create Massive Fissure line passing through opponent
        const startX = ownBall.x - nx * 40;
        const startY = ownBall.y - ny * 40;
        const endX = opponentBall.x + nx * 140;
        const endY = opponentBall.y + ny * 140;

        this.activeFissures.push({
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY,
          createdAt: this.now,
          expiresAt: this.now + SOTAN_FISSURE_LIFETIME_MS,
          lastDotTick: this.now,
          ownerIsPlayer: entity === this.p
        });

        // Direct damage 400
        const directDmg = Math.round(SOTAN_DIRECT_DMG * this.dmgMul);
        this.applyDamage(opponentEntity, directDmg);

        this.screenShake = 22;
        this.spawnSparks(opponentBall.x, opponentBall.y, '#fde047', 35);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#f59e0b', 25);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ffffff', 20);

        this.expandingRings.push({
          x: opponentBall.x,
          y: opponentBall.y,
          radius: 15,
          maxRadius: 130,
          thickness: 5,
          color: '#facc15',
          alpha: 1,
          life: 0,
          maxLife: 0.6
        });

        this.logMessage = `💥 [RẦM! NHẤT ĐIẾU KHAI THIÊN MÔN]: ${name} chém vỡ hư không giáng trực diện -${directDmg} HP & mở vết nứt thiêu đốt 2 DMG/0.2s!`;
      }
    }
  }

  private updateActiveFissures(now: number) {
    this.activeFissures = this.activeFissures.filter(fissure => {
      if (this.battleOver) return false;
      if (fissure.isPermanentUntilDepleted) {
        if ((fissure.remainingDmgPool ?? 0) <= 0) return false;
      } else if (now > fissure.expiresAt) {
        return false;
      }

      const oppBall = fissure.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const oppEntity = fissure.ownerIsPlayer ? this.e : this.p;

      // Distance from oppBall to fissure segment
      const dx = fissure.x2 - fissure.x1;
      const dy = fissure.y2 - fissure.y1;
      const l2 = dx * dx + dy * dy;
      let t = l2 === 0 ? 0 : ((oppBall.x - fissure.x1) * dx + (oppBall.y - fissure.y1) * dy) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = fissure.x1 + t * dx;
      const projY = fissure.y1 + t * dy;
      const dist = Math.hypot(oppBall.x - projX, oppBall.y - projY);

      if (dist < 45 && now - fissure.lastDotTick >= SOTAN_DOT_TICK_MS) {
        fissure.lastDotTick = now;
        let baseDot = fissure.colorTheme === 'rainbow' ? 50 : (fissure.colorTheme === 'golden' ? 40 : SOTAN_DOT_DMG_PER_TICK);
        if (fissure.isPermanentUntilDepleted && fissure.remainingDmgPool !== undefined) {
          baseDot = Math.min(baseDot, fissure.remainingDmgPool);
          fissure.remainingDmgPool -= baseDot;
        }
        const dotDmg = Math.round(baseDot * this.dmgMul);
        this.applyDamage(oppEntity, dotDmg);
        this.spawnSparks(oppBall.x, oppBall.y, fissure.colorTheme === 'rainbow' ? '#f43f5e' : '#facc15', 5);
      }
      return true;
    });
  }

  private triggerSoTanAttackBeast(
    attacker: Entity,
    defender: Entity,
    aBall: Ball,
    dBall: Ball,
    name: string,
    baseAtkDmg: number
  ) {
    if (attacker.role !== 'sotan' || !attacker.sotan || this.battleOver) return;
    // 5% chance per beast trigger
    if (Math.random() > SOTAN_BEAST_CHANCE) return;

    const beasts: ('bach_ho' | 'chu_tuoc' | 'thanh_long')[] = ['bach_ho', 'chu_tuoc', 'thanh_long'];
    const chosen = beasts[Math.floor(Math.random() * beasts.length)];

    if (chosen === 'bach_ho') {
      const extraDmg = Math.max(1, Math.round(baseAtkDmg * SOTAN_BACHHO_BONUS_FRAC));
      this.applyDamage(defender, extraDmg);
      attacker.sotan.beastActive = {
        type: 'bach_ho',
        title: '🐅 BẠCH HỔ ĐIỀU HỒN XUNG KÍCH (5%)',
        desc: `Bạch Hổ vồ địch gây thêm +30% DMG (-${extraDmg} HP)!`,
        spawnAt: this.now,
        duration: 2500,
        x: aBall.x,
        y: aBall.y
      };
      this.spawnSparks(dBall.x, dBall.y, '#f8fafc', 20);
      this.spawnSparks(dBall.x, dBall.y, '#facc15', 15);
      this.logMessage = `🐅 [BẠCH HỔ ĐIỀU HỒN (5%)]: ${name} triệu hoán Bạch Hổ lao vào địch bồi thêm -${extraDmg} HP (+30% DMG)!`;
    } else if (chosen === 'chu_tuoc') {
      const burnHp = Math.max(1, Math.round(defender.maxHp * SOTAN_CHUTUOC_PERCENT_HP));
      this.applyDamage(defender, burnHp);
      attacker.sotan.beastActive = {
        type: 'chu_tuoc',
        title: '🦅 CHU TƯỚC ĐIỀU HỒN THIÊU ĐỐT (5%)',
        desc: `Chu Tước thiêu đốt trừ ngay -5% Max HP (-${burnHp} HP)!`,
        spawnAt: this.now,
        duration: 2500,
        x: aBall.x,
        y: aBall.y
      };
      this.spawnSparks(dBall.x, dBall.y, '#ef4444', 25);
      this.spawnSparks(dBall.x, dBall.y, '#f97316', 15);
      this.logMessage = `🦅 [CHU TƯỚC ĐIỀU HỒN (5%)]: ${name} gọi Chu Tước giáng hỏa vũ thiêu đối thủ -${burnHp} HP (-5% MAX HP)!`;
    } else if (chosen === 'thanh_long') {
      attacker.nextAtkAt = this.now;
      if (attacker.spear) attacker.spear.nextReadyAt = this.now;
      if (attacker.mace) attacker.mace.nextReadyAt = this.now;
      if (attacker.railgun) attacker.railgun.nextFireAt = this.now;
      if (attacker.minigun) attacker.minigun.reloading = false;
      if (attacker.sotan) attacker.sotan.nextSkillAt = this.now;

      attacker.sotan.beastActive = {
        type: 'thanh_long',
        title: '🐉 THANH LONG ĐIỀU HỒN CHÚC PHÚC (5%)',
        desc: 'Reset hồi chiêu toàn bộ kỹ năng về 1 (sẵn sàng ngay)!',
        spawnAt: this.now,
        duration: 2500,
        x: aBall.x,
        y: aBall.y
      };
      this.spawnSparks(aBall.x, aBall.y, '#10b981', 25);
      this.spawnSparks(aBall.x, aBall.y, '#06b6d4', 20);
      this.logMessage = `🐉 [THANH LONG ĐIỀU HỒN (5%)]: Long Thần chúc phúc ${name}, RESET TOÀN BỘ HỒI CHIÊU SKILL VỀ 1!`;
    }
  }

  private updateBaThuongSkill(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (entity.role !== 'bathuong' || !entity.bathuong || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const bt = entity.bathuong;
    const isPlayer = entity === this.p;

    // Handle Long Nhân passive HP drain (-1 HP / 0.3s, scaling with Max HP, e.g. 100k HP -> -15 HP/0.3s)
    if (bt.isDragonHuman) {
      if (this.now - bt.dragonHumanLastHpTickAt >= BATHUONG_LONG_NHAN_HP_TICK_MS) {
        bt.dragonHumanLastHpTickAt = this.now;
        const scaleDrain = Math.max(1, Math.round((entity.maxHp / 100000) * 15));
        entity.hp = Math.max(1, entity.hp - scaleDrain);
        if (Math.random() < 0.35) {
          this.particles.push({
            x: ownBall.x + (Math.random() - 0.5) * 20,
            y: ownBall.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 20,
            vy: -30 - Math.random() * 30,
            radius: 2.5,
            color: '#10b981',
            alpha: 0.8,
            life: 0,
            maxLife: 0.4
          });
        }
      }
    }

    // Skill trigger selection
    if (bt.skillPhase === 'idle' && this.now >= bt.nextSkillAt) {
      const skills: BaThuongSkillKey[] = [
        'long_ngang_dau',
        'du_long_bai_vi',
        'ngoa_long_phien_dang',
        'than_long_na_di',
        'tiem_long_vat_dung',
        'long_nhan_hop_nhat'
      ];
      // Pick random skill
      const chosen = skills[Math.floor(Math.random() * skills.length)];
      bt.activeSkill = chosen;
      bt.skillPhase = 'active';
      bt.skillStartAt = this.now;
      bt.headSlamExecuted = false;
      bt.baiViWavesSpawned = 0;
      bt.baiViLastSpawnAt = 0;
      bt.drillRotationAngle = 0;
      bt.drillLastDmgAt = 0;
      bt.drillRotationsCount = 0;
      bt.drillLastDrillShotAtRotation = 0;
      bt.naDiDashesLeft = 3;
      bt.naDiLastDashAt = 0;
      bt.tiemLongThrown = false;

      if (chosen === 'long_ngang_dau') {
        this.logMessage = `🐉 [BÁ THƯỜNG - LONG NGẨNG ĐẦU]: ${name} triệu hoán Thanh Long giáng lâm, chuẩn bị đập tan càn khôn!`;
        this.qinglongManifestation = {
          x: ownBall.x,
          y: ownBall.y - 45,
          scale: 1.1,
          alpha: 1,
          startTime: this.now,
          duration: 1300
        };
      } else if (chosen === 'du_long_bai_vi') {
        this.logMessage = `🌊 [BÁ THƯỜNG - DU LONG BÁI VĨ]: ${name} thi triển 20 đợt Thanh Long xung kích quét 2 bên tường (10 DMG/đợt)!`;
      } else if (chosen === 'ngoa_long_phien_dang') {
        this.logMessage = `🌀 [BÁ THƯỜNG - NGỌA LONG PHIÊN ĐĂNG]: ${name} hóa thân thành MÁY KHOAN LONG VỰC lao vào đối thủ (2 DMG/0.4s & bắn mũi khoan)!`;
      } else if (chosen === 'than_long_na_di') {
        this.logMessage = `⚡ [BÁ THƯỜNG - THẦN LONG NA DI]: ${name} liên tục Na Di di chuyển 3 lần xé rách không gian tạo vết nứt!`;
      } else if (chosen === 'tiem_long_vat_dung') {
        this.logMessage = `💫 [BÁ THƯỜNG - TIỀM LONG VẬT DỤNG]: ${name} định thân tụ lực, phi vũ khí long thần giáng đòn 75 DMG!`;
      } else if (chosen === 'long_nhan_hop_nhat') {
        this.logMessage = `🐲 [BÁ THƯỜNG - LONG NHÂN HỢP NHẤT]: ${name} THỨC TỈNH LONG NHÂN! DMG x1.3, Tốc độ x1.5, Tự tiêu hao 0.01 HP/0.4s!`;
        bt.isDragonHuman = true;
        this.screenShake = 18;
        this.spawnSparks(ownBall.x, ownBall.y, '#10b981', 30);
        this.spawnSparks(ownBall.x, ownBall.y, '#34d399', 20);
        this.expandingRings.push({
          x: ownBall.x,
          y: ownBall.y,
          radius: 10,
          maxRadius: 120,
          thickness: 5,
          color: '#10b981',
          alpha: 1,
          life: 0,
          maxLife: 0.6
        });
        bt.skillPhase = 'idle';
        bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
      }
    } else if (bt.skillPhase === 'active') {
      const elapsed = this.now - bt.skillStartAt;

      if (bt.activeSkill === 'long_ngang_dau') {
        ownBall.vx = 0;
        ownBall.vy = 0;
        if (!bt.headSlamExecuted && elapsed >= 450) {
          bt.headSlamExecuted = true;
          const directDmg = Math.round(BATHUONG_LONG_NGANG_DAU_DMG * this.dmgMul);
          this.applyDamage(opponentEntity, directDmg);

          // Spawn ground fissure
          const startX = ownBall.x - 30;
          const startY = ownBall.y;
          const endX = opponentBall.x + 30;
          const endY = opponentBall.y;
          this.activeFissures.push({
            x1: startX,
            y1: startY,
            x2: endX,
            y2: endY,
            createdAt: this.now,
            expiresAt: this.now + SOTAN_FISSURE_LIFETIME_MS,
            lastDotTick: this.now,
            ownerIsPlayer: isPlayer
          });

          this.screenShake = 22;
          this.spawnSparks(opponentBall.x, opponentBall.y, '#10b981', 30);
          this.spawnSparks(opponentBall.x, opponentBall.y, '#34d399', 20);
          this.expandingRings.push({
            x: opponentBall.x,
            y: opponentBall.y,
            radius: 10,
            maxRadius: 100,
            thickness: 4,
            color: '#10b981',
            alpha: 1,
            life: 0,
            maxLife: 0.5
          });
          this.logMessage = `💥 [LONG NGẨNG ĐẦU TRÚNG ĐÍCH]: ${name} đập 1 phát tạo vết nứt và giáng -${directDmg} HP!`;
        }

        if (elapsed >= 1100) {
          bt.skillPhase = 'idle';
          bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
        }
      } else if (bt.activeSkill === 'du_long_bai_vi') {
        if (bt.baiViWavesSpawned < BATHUONG_DU_LONG_WAVES && this.now - bt.baiViLastSpawnAt >= 65) {
          bt.baiViLastSpawnAt = this.now;
          const isLeft = bt.baiViWavesSpawned % 2 === 0;
          const vx = isLeft ? -520 : 520;
          this.dragonWaves.push({
            id: `dw_${this.now}_${bt.baiViWavesSpawned}`,
            x: ownBall.x,
            y: ownBall.y + (Math.random() - 0.5) * 50,
            vx,
            dmg: BATHUONG_DU_LONG_DMG,
            createdAt: this.now,
            expiresAt: this.now + 2000,
            ownerIsPlayer: isPlayer,
            radius: 20
          });
          bt.baiViWavesSpawned++;
          this.spawnSparks(ownBall.x, ownBall.y, '#34d399', 3);
        }

        if (bt.baiViWavesSpawned >= BATHUONG_DU_LONG_WAVES && elapsed >= 1800) {
          bt.skillPhase = 'idle';
          bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
        }
      } else if (bt.activeSkill === 'ngoa_long_phien_dang') {
        // Drill rush towards opponent
        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = 400;
        ownBall.vx = (dx / dist) * speed;
        ownBall.vy = (dy / dist) * speed;

        bt.drillRotationAngle += 0.55;
        if (bt.drillRotationAngle >= Math.PI * 2) {
          bt.drillRotationAngle -= Math.PI * 2;
          bt.drillRotationsCount++;
          // Every 5 rotations, fire a green drill projectile (10 dmg)
          if (bt.drillRotationsCount - bt.drillLastDrillShotAtRotation >= 5) {
            bt.drillLastDrillShotAtRotation = bt.drillRotationsCount;
            const pSpeed = 650;
            this.drillProjectiles.push({
              id: `dp_${this.now}`,
              x: ownBall.x,
              y: ownBall.y,
              vx: (dx / dist) * pSpeed,
              vy: (dy / dist) * pSpeed,
              dmg: BATHUONG_NGOA_LONG_SHOT_DMG,
              radius: 14,
              createdAt: this.now,
              lifetimeMs: 2500,
              ownerIsPlayer: isPlayer
            });
            this.logMessage = `🚀 [MŨI KHOAN THANH LONG]: ${name} phóng mũi khoan lục gây 10 DMG!`;
            this.spawnSparks(ownBall.x, ownBall.y, '#10b981', 10);
          }
        }

        // Drill tick damage (2 dmg / 0.4s) when close
        if (dist < ownBall.radius + opponentBall.radius + 15) {
          if (this.now - bt.drillLastDmgAt >= BATHUONG_NGOA_LONG_DRILL_TICK_MS) {
            bt.drillLastDmgAt = this.now;
            const drillDmg = Math.round(BATHUONG_NGOA_LONG_DRILL_DMG * this.dmgMul);
            this.applyDamage(opponentEntity, drillDmg);
            this.spawnSparks(opponentBall.x, opponentBall.y, '#34d399', 8);
            this.shakeScreen(3);
          }
        }

        if (elapsed >= 2500) {
          bt.skillPhase = 'idle';
          bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
        }
      } else if (bt.activeSkill === 'than_long_na_di') {
        if (bt.naDiDashesLeft > 0 && this.now - bt.naDiLastDashAt >= 320) {
          bt.naDiLastDashAt = this.now;
          bt.naDiDashesLeft--;

          const oldX = ownBall.x;
          const oldY = ownBall.y;

          // Dash to random strategic spot around opponent
          const angle = Math.random() * Math.PI * 2;
          const offsetDist = 70 + Math.random() * 80;
          const targetX = Math.max(30, Math.min(this.width - 30, opponentBall.x + Math.cos(angle) * offsetDist));
          const targetY = Math.max(30, Math.min(this.height - 30, opponentBall.y + Math.sin(angle) * offsetDist));

          ownBall.x = targetX;
          ownBall.y = targetY;
          ownBall.vx = (Math.random() - 0.5) * 120;
          ownBall.vy = (Math.random() - 0.5) * 120;

          // Leave a fissure between old position and new position
          this.activeFissures.push({
            x1: oldX,
            y1: oldY,
            x2: targetX,
            y2: targetY,
            createdAt: this.now,
            expiresAt: this.now + SOTAN_FISSURE_LIFETIME_MS,
            lastDotTick: this.now,
            ownerIsPlayer: isPlayer
          });

          this.screenShake = 6;
          this.spawnSparks(oldX, oldY, '#10b981', 15);
          this.spawnSparks(targetX, targetY, '#34d399', 20);
          this.logMessage = `⚡ [THẦN LONG NA DI (${3 - bt.naDiDashesLeft}/3)]: ${name} dịch chuyển chớp nhoáng để lại vết nứt không gian!`;
        }

        if (bt.naDiDashesLeft <= 0 && elapsed >= 1200) {
          bt.skillPhase = 'idle';
          bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
        }
      } else if (bt.activeSkill === 'tiem_long_vat_dung') {
        ownBall.vx = 0;
        ownBall.vy = 0;
        if (!bt.tiemLongThrown && elapsed >= 400) {
          bt.tiemLongThrown = true;
          const dx = opponentBall.x - ownBall.x;
          const dy = opponentBall.y - ownBall.y;
          const dist = Math.hypot(dx, dy) || 1;
          const speed = 720;
          this.thrownWeapons.push({
            id: `tw_${this.now}`,
            x: ownBall.x,
            y: ownBall.y,
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed,
            dmg: BATHUONG_TIEM_LONG_DMG,
            rot: 0,
            ownerIsPlayer: isPlayer,
            createdAt: this.now
          });
          this.spawnSparks(ownBall.x, ownBall.y, '#10b981', 20);
          this.logMessage = `💫 [TIỀM LONG VẬT DỤNG]: ${name} ném vũ khí long thần bay thẳng vào kẻ địch gây 75 DMG!`;
        }

        if (elapsed >= 1100) {
          bt.skillPhase = 'idle';
          bt.nextSkillAt = this.now + BATHUONG_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
        }
      }
    }
  }

  private updateLuuBeiSkill(
    entity: Entity,
    ownBall: Ball,
    opponentBall: Ball,
    opponentEntity: Entity,
    name: string
  ) {
    if (entity.role !== 'liubei' || !entity.liubei || this.battleOver) return;
    if (entity.admin && entity.admin.freezeUntil > this.now) return;
    if (this.isStunned(entity, this.now)) return;
    const lb = entity.liubei;

    // Lưu Bị skill "Hán Thất Nghiêm Đông" requires Song Kiếm
    if (entity.weapon.key !== 'songkiem') return;

    if (lb.state === 'idle' && this.now >= lb.nextSkillAt) {
      lb.state = 'fire_slash';
      lb.stepStartTime = this.now;
      this.logMessage = `🔥 [HÁN THẤT NGHIÊM ĐÔNG - NHÁT 1]: Lưu Bị ngưng tụ CỰ HỎA KIẾM chém thẳng vào ${name === 'Bạn' ? 'Địch' : 'Bạn'}!`;

      // Dash to enemy
      const dx = opponentBall.x - ownBall.x;
      const dy = opponentBall.y - ownBall.y;
      const dist = Math.hypot(dx, dy) || 1;
      ownBall.vx = (dx / dist) * 750;
      ownBall.vy = (dy / dist) * 750;

      const fireDmg = Math.round(LIUBEI_SLASH_FIRE_DMG * this.dmgMul);
      this.applyDamage(opponentEntity, fireDmg);

      // Apply burn 3s
      opponentEntity.torchBurn = {
        endsAt: this.now + 3000,
        tickMs: 500,
        dmgPerTick: 3,
        lastTick: this.now
      };

      this.luuBeiSlashes.push({
        x: opponentBall.x,
        y: opponentBall.y,
        type: 'fire',
        startTime: this.now,
        duration: 550,
        angle: Math.atan2(dy, dx)
      });

      this.screenShake = 16;
      this.spawnSparks(opponentBall.x, opponentBall.y, '#f97316', 30);
      this.spawnSparks(opponentBall.x, opponentBall.y, '#ef4444', 20);
    } else if (lb.state === 'fire_slash') {
      if (this.now - lb.stepStartTime >= 550) {
        lb.state = 'ice_slash';
        lb.stepStartTime = this.now;
        this.logMessage = `❄️ [HÁN THẤT NGHIÊM ĐÔNG - NHÁT 2]: Lưu Bị chuyển kiếm CỰ BĂNG KIẾM chém ĐÓNG BĂNG đối thủ 1.5s!`;

        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;

        const iceDmg = Math.round(LIUBEI_SLASH_ICE_DMG * this.dmgMul);
        this.applyDamage(opponentEntity, iceDmg);

        // Freeze / root target for 1.5s
        opponentEntity.rootedUntil = this.now + 1500;
        opponentBall.vx = 0;
        opponentBall.vy = 0;

        this.luuBeiSlashes.push({
          x: opponentBall.x,
          y: opponentBall.y,
          type: 'ice',
          startTime: this.now,
          duration: 550,
          angle: Math.atan2(dy, dx) + Math.PI / 3
        });

        this.screenShake = 16;
        this.spawnSparks(opponentBall.x, opponentBall.y, '#06b6d4', 30);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#38bdf8', 20);
      }
    } else if (lb.state === 'ice_slash') {
      if (this.now - lb.stepStartTime >= 550) {
        lb.state = 'combo_finish';
        lb.stepStartTime = this.now;
        this.logMessage = `⚔️ [HÁN THẤT NGHIÊM ĐÔNG - ĐÒN KẾT LIỄU]: HỎA BĂNG SONG KIẾM HỢP NHẤT giáng bão kiếm khí -250 DMG!`;

        const dx = opponentBall.x - ownBall.x;
        const dy = opponentBall.y - ownBall.y;

        const finishDmg = Math.round(LIUBEI_COMBO_FINISH_DMG * this.dmgMul);
        this.applyDamage(opponentEntity, finishDmg);

        this.luuBeiSlashes.push({
          x: opponentBall.x,
          y: opponentBall.y,
          type: 'finish',
          startTime: this.now,
          duration: 700,
          angle: Math.atan2(dy, dx)
        });

        this.screenShake = 24;
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ef4444', 30);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#06b6d4', 30);
        this.spawnSparks(opponentBall.x, opponentBall.y, '#ffffff', 20);
        this.expandingRings.push({
          x: opponentBall.x,
          y: opponentBall.y,
          radius: 15,
          maxRadius: 130,
          thickness: 6,
          color: '#38bdf8',
          alpha: 1,
          life: 0,
          maxLife: 0.6
        });
      }
    } else if (lb.state === 'combo_finish') {
      if (this.now - lb.stepStartTime >= 700) {
        lb.state = 'idle';
        lb.nextSkillAt = this.now + LIUBEI_SKILL_INTERVAL_MS * getRoleSpeedMultiplier(entity);
      }
    }
  }

  private updateDragonWaves(dt: number) {
    this.dragonWaves = this.dragonWaves.filter(wave => {
      if (this.battleOver || this.now > wave.expiresAt) return false;
      wave.x += wave.vx * dt;

      // Trail sparks
      if (Math.random() < 0.35) {
        this.particles.push({
          x: wave.x,
          y: wave.y + (Math.random() - 0.5) * 10,
          vx: -wave.vx * 0.1,
          vy: (Math.random() - 0.5) * 20,
          radius: 2,
          color: '#10b981',
          alpha: 0.8,
          life: 0,
          maxLife: 0.25
        });
      }

      const targetBall = wave.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const targetEntity = wave.ownerIsPlayer ? this.e : this.p;

      const dist = Math.hypot(targetBall.x - wave.x, targetBall.y - wave.y);
      if (dist <= targetBall.radius + wave.radius) {
        const dmg = Math.round(wave.dmg * this.dmgMul);
        this.applyDamage(targetEntity, dmg);
        this.spawnSparks(targetBall.x, targetBall.y, '#34d399', 10);
        return false;
      }

      if (wave.x < 15 || wave.x > this.width - 15) {
        this.spawnSparks(wave.x, wave.y, '#10b981', 6);
        return false;
      }
      return true;
    });
  }

  private updateDrillProjectiles(dt: number) {
    this.drillProjectiles = this.drillProjectiles.filter(proj => {
      if (this.battleOver || this.now - proj.createdAt > proj.lifetimeMs) return false;
      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;

      const targetBall = proj.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const targetEntity = proj.ownerIsPlayer ? this.e : this.p;

      const dist = Math.hypot(targetBall.x - proj.x, targetBall.y - proj.y);
      if (dist <= targetBall.radius + proj.radius) {
        const dmg = Math.round(proj.dmg * this.dmgMul);
        this.applyDamage(targetEntity, dmg);
        this.shakeScreen(5);
        this.spawnSparks(targetBall.x, targetBall.y, '#10b981', 15);
        return false;
      }

      if (proj.x < -30 || proj.x > this.width + 30 || proj.y < -30 || proj.y > this.height + 30) {
        return false;
      }
      return true;
    });
  }

  private updateThrownWeapons(dt: number) {
    this.thrownWeapons = this.thrownWeapons.filter(tw => {
      if (this.battleOver || this.now - tw.createdAt > 2000) return false;
      tw.x += tw.vx * dt;
      tw.y += tw.vy * dt;
      tw.rot += 18 * dt;

      const targetBall = tw.ownerIsPlayer ? this.enemyBall : this.playerBall;
      const targetEntity = tw.ownerIsPlayer ? this.e : this.p;

      const dist = Math.hypot(targetBall.x - tw.x, targetBall.y - tw.y);
      if (dist <= targetBall.radius + 20) {
        const dmg = Math.round(tw.dmg * this.dmgMul);
        this.applyDamage(targetEntity, dmg);
        this.shakeScreen(15);
        this.spawnSparks(targetBall.x, targetBall.y, '#10b981', 25);
        this.spawnSparks(targetBall.x, targetBall.y, '#ffffff', 15);
        return false;
      }

      if (tw.x < -30 || tw.x > this.width + 30 || tw.y < -30 || tw.y > this.height + 30) {
        return false;
      }
      return true;
    });
  }

  private updateLuuBeiSlashes(dt: number) {
    this.luuBeiSlashes = this.luuBeiSlashes.filter(s => {
      return this.now - s.startTime < s.duration;
    });
  }

  private updateDayNitAoE() {
    const list: { ent: Entity; b: Ball; name: string; isPlayer: boolean; team: 'blue' | 'red' }[] = [
      { ent: this.p, b: this.playerBall, name: 'Bạn 1', isPlayer: true, team: 'blue' },
      { ent: this.e, b: this.enemyBall, name: 'Địch 1', isPlayer: false, team: 'red' }
    ];
    if (this.is2v2 && this.p2 && this.e2) {
      list.push(
        { ent: this.p2, b: this.playerBall2, name: 'Bạn 2', isPlayer: true, team: 'blue' },
        { ent: this.e2, b: this.enemyBall2, name: 'Địch 2', isPlayer: false, team: 'red' }
      );
    }

    list.forEach(({ ent, b, name, team }) => {
      if (ent.weapon.key !== 'daynit' || ent.isDead || ent.hp <= 0) return;
      if (this.now < ent.nextAtkAt) return;

      ent.nextAtkAt = this.now + DAYNIT_COOLDOWN_MS; // Cứ 5s mới đánh 1 lần!
      const aoeRadius = DAYNIT_AOE_RANGE; // 280px

      // Push visual AoE whip lash
      this.dayNitAoeFx.push({
        x: b.x,
        y: b.y,
        radius: aoeRadius,
        startTime: this.now,
        duration: 750
      });

      this.shakeScreen(20);
      this.logMessage = `⚡ [DÂY NỊT TỬ THẦN]: ${name} vung dây nịt phạm vi khổng lồ (280px)! Gây 36.179% Max HP trong 5s!`;

      // Affect opponents within 280px
      const opponents = list.filter(item => item.team !== team && !item.ent.isDead && item.ent.hp > 0);
      opponents.forEach(opp => {
        const dist = Math.hypot(opp.b.x - b.x, opp.b.y - b.y);
        if (dist <= aoeRadius) {
          const percentHp = ent.weapon.dayNitPercentHp || 0.36179;
          const durationMs = ent.weapon.dayNitDurationMs || 5000;
          const totalDmg = Math.max(1, Math.round(opp.ent.maxHp * percentHp));
          const tickInterval = 250;
          const totalTicks = Math.round(durationMs / tickInterval);
          const dmgPerTick = Math.max(1, Math.round(totalDmg / totalTicks));

          opp.ent.dayNitEffect = {
            attackerName: name,
            startedAt: this.now,
            endsAt: this.now + durationMs,
            lastTick: this.now,
            tickInterval,
            dmgPerTick,
            totalDmg,
            remainingTicks: totalTicks
          };

          this.spawnSparks(opp.b.x, opp.b.y, '#ef4444', 30);
          this.spawnSparks(opp.b.x, opp.b.y, '#f59e0b', 20);

          // 50% chance of "Đau Đớn Tột Cùng" (Stun 3.5s)
          if (Math.random() < 0.50) {
            opp.ent.dayNitStunUntil = this.now + 3500;
            opp.ent.rootedUntil = Math.max(opp.ent.rootedUntil, this.now + 3500);
            opp.b.vx = 0;
            opp.b.vy = 0;
            this.floatingTexts.push({
              text: '😱 ĐAU ĐỚN TỘT CÙNG (CHOÁNG 3.5S)! 💢',
              x: opp.b.x,
              y: opp.b.y - 28,
              color: '#ef4444',
              createdAt: this.now,
              expiresAt: this.now + 3000
            });
          }

          this.floatingTexts.push({
            text: '⚡ QUẤT DÂY NỊT (-36.179% HP)! 💥',
            x: opp.b.x,
            y: opp.b.y - 45,
            color: '#f59e0b',
            createdAt: this.now,
            expiresAt: this.now + 2500
          });
        }
      });
    });
  }

  public triggerTranQuocChiKiem(team: 'blue' | 'red' = 'blue') {
    if (this.tranQuocSword && this.tranQuocSword.active) return;

    if (team === 'blue') {
      if (this.p.role === 'bathuong') {
        this.p.hp = 0;
        this.p.isDead = true;
      }
      if (this.is2v2 && this.p2 && this.p2.role === 'bathuong') {
        this.p2.hp = 0;
        this.p2.isDead = true;
      }
      if (this.p.role === 'sotan') this.p.isEnragedSoTan = true;
      if (this.is2v2 && this.p2 && this.p2.role === 'sotan') this.p2.isEnragedSoTan = true;

      this.tranQuocSword = {
        active: true,
        team: 'blue',
        x: this.width / 2,
        y: -260,
        targetY: 230,
        startTime: this.now,
        duration: 3500,
        hasStruck: false
      };
      this.shakeScreen(30);
      this.logMessage = '⚡ BÁ THƯỜNG HY SINH (HP VỀ 0)! SỞ TÂN TỨC GIẬN TRIỆU HOÁN TRẤN QUỐC CHI KIẾM CẮM XUỐNG 88% MAX HP!';
    } else {
      if (this.e.role === 'bathuong') {
        this.e.hp = 0;
        this.e.isDead = true;
      }
      if (this.is2v2 && this.e2 && this.e2.role === 'bathuong') {
        this.e2.hp = 0;
        this.e2.isDead = true;
      }
      if (this.e.role === 'sotan') this.e.isEnragedSoTan = true;
      if (this.is2v2 && this.e2 && this.e2.role === 'sotan') this.e2.isEnragedSoTan = true;

      this.tranQuocSword = {
        active: true,
        team: 'red',
        x: this.width / 2,
        y: -260,
        targetY: 230,
        startTime: this.now,
        duration: 3500,
        hasStruck: false
      };
      this.shakeScreen(30);
      this.logMessage = '⚡ BÁ THƯỜNG (ĐỊCH) HY SINH! SỞ TÂN TỨC GIẬN CẮM TRẤN QUỐC CHI KIẾM GÂY 88% MAX HP!';
    }
  }

  private updateTranQuocChiKiem(dt: number) {
    if (!this.tranQuocSword || !this.tranQuocSword.active) return;
    const elapsed = this.now - this.tranQuocSword.startTime;
    const t = Math.min(1, elapsed / 800);
    this.tranQuocSword.y = -260 + t * (this.tranQuocSword.targetY - (-260));

    if (elapsed >= 800 && !this.tranQuocSword.hasStruck) {
      this.tranQuocSword.hasStruck = true;
      this.shakeScreen(45);
      this.expandingRings.push({
        x: this.tranQuocSword.x,
        y: this.tranQuocSword.targetY,
        radius: 20,
        maxRadius: 280,
        thickness: 8,
        color: '#facc15',
        alpha: 1,
        life: 0,
        maxLife: 0.8
      });
      this.expandingRings.push({
        x: this.tranQuocSword.x,
        y: this.tranQuocSword.targetY,
        radius: 20,
        maxRadius: 240,
        thickness: 6,
        color: '#ef4444',
        alpha: 1,
        life: 0,
        maxLife: 0.6
      });
      this.spawnSparks(this.tranQuocSword.x, this.tranQuocSword.targetY, '#facc15', 50);
      this.spawnSparks(this.tranQuocSword.x, this.tranQuocSword.targetY, '#ef4444', 40);

      const targets = this.tranQuocSword.team === 'blue'
        ? (this.is2v2 ? [this.e, this.e2] : [this.e])
        : (this.is2v2 ? [this.p, this.p2] : [this.p]);

      targets.forEach(tgt => {
        if (tgt && tgt.hp > 0 && !tgt.isDead) {
          const hitDmg = Math.round(tgt.maxHp * TRAN_QUOC_SWORD_PERCENT_HP);
          this.applyDamage(tgt, hitDmg);
          this.floatingTexts.push({
            text: `⚔️ TRẤN QUỐC CHI KIẾM -${(TRAN_QUOC_SWORD_PERCENT_HP * 100).toFixed(0)}% HP (-${hitDmg.toLocaleString()})! 💥`,
            x: this.width / 2,
            y: 180,
            color: '#facc15',
            createdAt: this.now,
            expiresAt: this.now + 3500
          });
        }
      });
    }

    if (elapsed >= this.tranQuocSword.duration) {
      this.tranQuocSword.active = false;
      this.tranQuocSword = null;
    }
  }

  private checkEnd() {
    if (this.isSandbox || this.battleOver) return;

    if (this.is2v2) {
      const blueAlive = (this.p.hp > 0 && !this.p.isDead) || (this.p2 && this.p2.hp > 0 && !this.p2.isDead);
      const redAlive = (this.e.hp > 0 && !this.e.isDead) || (this.e2 && this.e2.hp > 0 && !this.e2.isDead);

      if (!blueAlive || !redAlive) {
        this.battleOver = true;
        this.playerBall.vx = 0;
        this.playerBall.vy = 0;
        if (this.playerBall2) {
          this.playerBall2.vx = 0;
          this.playerBall2.vy = 0;
        }
        this.enemyBall.vx = 0;
        this.enemyBall.vy = 0;
        if (this.enemyBall2) {
          this.enemyBall2.vx = 0;
          this.enemyBall2.vy = 0;
        }
        this.laserGfx = null;
        this.minigunGfx = null;

        if (blueAlive && !redAlive) {
          this.result = 'win';
          saveCoins(loadCoins() + 200);
          sound.stopBGM();
          sound.playWin();
          sound.playCoin();
          this.logMessage = '🏆 TEAM BẠN ĐÃ CHIẾN THẮNG 2v2! Nhận ngay +200 Xu thưởng!';
          this.onBattleWin();
        } else if (!blueAlive && redAlive) {
          this.result = 'lose';
          sound.stopBGM();
          sound.playLose();
          this.logMessage = '💀 TEAM BẠN ĐÃ THUA! Hãy thử đổi đội hình chiến thuật khác!';
        } else {
          this.result = 'draw';
          sound.stopBGM();
          this.logMessage = '⚖️ HÒA! Cả hai đội đều chiến đấu ngang ngửa!';
        }
        this.finalizeBattleOver();
      }
    } else {
      if (this.p.hp <= 0 || this.e.hp <= 0) {
        this.battleOver = true;
        this.playerBall.vx = 0;
        this.playerBall.vy = 0;
        this.enemyBall.vx = 0;
        this.enemyBall.vy = 0;
        this.laserGfx = null;
        this.minigunGfx = null;

        if (this.e.hp <= 0 && this.p.hp > 0) {
          this.result = 'win';
          saveCoins(loadCoins() + 100);
          sound.stopBGM();
          sound.playWin();
          sound.playCoin();
          this.logMessage = 'Bạn đã THẮNG! Nhận ngay +100 Xu thưởng!';
          this.onBattleWin();
        } else if (this.p.hp <= 0 && this.e.hp > 0) {
          this.result = 'lose';
          sound.stopBGM();
          sound.playLose();
          this.logMessage = 'Bạn đã THUA! Hãy thử lại!';
        } else {
          this.result = 'draw';
          sound.stopBGM();
          this.logMessage = 'HÒA! Hai đấu thủ ngang tài ngang sức!';
        }
        this.finalizeBattleOver();
      }
    }
  }

  private finalizeBattleOver() {
    const duration = Math.max(1, Math.round((this.now - this.matchStartTime) / 1000));
    const winner: 'player' | 'enemy' | 'draw' = this.result === 'win' ? 'player' : (this.result === 'lose' ? 'enemy' : 'draw');
    this.battleStats = {
      playerDamage: this.playerDamageDealt,
      enemyDamage: this.enemyDamageDealt,
      playerSkillsUsed: this.playerSkillsUsed,
      enemySkillsUsed: this.enemySkillsUsed,
      playerHitsLanded: this.playerHitsLanded,
      playerAttacksAttempted: Math.max(this.playerHitsLanded, this.playerAttacksAttempted),
      enemyHitsLanded: this.enemyHitsLanded,
      enemyAttacksAttempted: Math.max(this.enemyHitsLanded, this.enemyAttacksAttempted),
      matchDurationSec: duration,
      winner
    };
    if (this.onBattleOver) {
      this.onBattleOver(this.battleStats);
    }
  }

  private onBattleWin() {
    const isPlayerTrieuVanSpear = (this.p.role === 'trieuvan' && ['giao', 'spear', 'thuongthan', 'thuong_than'].includes(this.p.weapon.key)) ||
      (this.is2v2 && this.p2 && this.p2.role === 'trieuvan' && ['giao', 'spear', 'thuongthan', 'thuong_than'].includes(this.p2.weapon.key));

    if (isPlayerTrieuVanSpear) {
      const curWins = loadTrieuVanWins() + 1;
      saveTrieuVanWins(curWins);
      if (curWins >= 20) {
        saveUnlock('thuong_than_unlocked');
        saveUnlock('thuongthan_unlocked');
        saveUnlock('role_than_trieuvan_unlocked');
        saveUnlock('role_than_trieuvan');
        this.logMessage += ` 🌟 [TIẾN HÓA THẦN THOẠI]: Hoàn thành 20 trận thắng Triệu Vân + Giáo! Mở khóa [THƯƠNG THẦN] & [THẦN-TRIỆU VÂN]!`;
      } else {
        this.logMessage += ` ⚔️ [Nhiệm Vụ Triệu Vân]: ${curWins}/20 trận thắng với Triệu Vân + Giáo.`;
      }
    }

    const isPlayerLuuBeiSongKiem = (this.p.role === 'liubei' && (this.p.weapon.key === 'songkiem' || this.p.weapon.key === 'than_songkiem')) ||
      (this.is2v2 && this.p2 && this.p2.role === 'liubei' && (this.p2.weapon.key === 'songkiem' || this.p2.weapon.key === 'than_songkiem'));

    if (isPlayerLuuBeiSongKiem) {
      const curWins = loadLuuBeiWins() + 1;
      saveLuuBeiWins(curWins);
      if (curWins >= 20) {
        saveUnlock('than_songkiem_unlocked');
        saveUnlock('role_than_liubei_unlocked');
        saveUnlock('role_than_liubei');
        this.logMessage += ` 🌟 [TIẾN HÓA THẦN THOẠI]: Hoàn thành 20 trận thắng Lưu Bị + Song Kiếm! Mở khóa [THẦN SONG KIẾM] & [THẦN-LƯU BỊ]!`;
      } else {
        this.logMessage += ` ⚔️ [Nhiệm Vụ Lưu Bị]: ${curWins}/20 trận thắng với Lưu Bị + Song Kiếm.`;
      }
    }

    // Nhiệm vụ mở khóa Stellar Remote: Đánh 1000 trận win với 2 khẩu Railgun chọi nhau ko buff
    const isPlayerRailgun = this.p.weapon.key === 'railgun' || (this.is2v2 && this.p2 && this.p2.weapon.key === 'railgun');
    const isEnemyRailgun = this.e.weapon.key === 'railgun' || (this.is2v2 && this.e2 && this.e2.weapon.key === 'railgun');
    const isPlayerNoBuff = (!this.p.element || (this.p.element as any).type === 'none') && (!this.p.role || (this.p.role as any) === 'none') && (!this.is2v2 || !this.p2 || ((!this.p2.element || (this.p2.element as any).type === 'none') && (!this.p2.role || (this.p2.role as any) === 'none')));
    const isEnemyNoBuff = (!this.e.element || (this.e.element as any).type === 'none') && (!this.e.role || (this.e.role as any) === 'none') && (!this.is2v2 || !this.e2 || ((!this.e2.element || (this.e2.element as any).type === 'none') && (!this.e2.role || (this.e2.role as any) === 'none')));

    if (isPlayerRailgun && isEnemyRailgun && isPlayerNoBuff && isEnemyNoBuff) {
      const curWins = loadRailgunMirrorWins() + 1;
      saveRailgunMirrorWins(curWins);
      if (curWins >= 1000) {
        saveUnlock('stellar_remote_unlocked');
        this.logMessage += ` 🛰️ [MỞ KHÓA VŨ KHÍ TỐI THƯỢNG]: Đạt 1000/1000 trận thắng Railgun chọi nhau không buff! Mở khóa [STELLAR REMOTE]!`;
      } else {
        this.logMessage += ` 🛰️ [Nhiệm Vụ Stellar Remote]: ${curWins}/1000 trận thắng Railgun đối đầu không buff!`;
      }
    }
  }

  public render() {
    const ctx = this.ctx;
    ctx.save();

    // Screen Shake
    if (this.screenShake > 0) {
      const ox = (Math.random() - 0.5) * this.screenShake;
      const oy = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(ox, oy);
    }

    // Background: Ultra deep blue-black / pitch black (Never wash out to bright white)
    let bgColor = '#020617'; // Đen xanh cực đậm
    if (this.p.role === 'werewolf' && this.p.werewolf) {
      // Werewolf daytime is dark solar amber/obsidian, night is pitch midnight
      bgColor = this.p.werewolf.phase === 'day' ? '#0f0a04' : '#01040a';
    }
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, this.width, this.height);

    const hasOwner7b = (this.p && this.p.role === 'the_owner_7b') ||
      (this.e && this.e.role === 'the_owner_7b') ||
      (this.is2v2 && ((this.p2 && this.p2.role === 'the_owner_7b') || (this.e2 && this.e2.role === 'the_owner_7b')));

    if (hasOwner7b) {
      // CODE ARENA DOMAIN FOR THE OWNER 7 TỈ % (Lưới Matrix, Mưa Code Nhị Phân & Hex, HUD Viền Mạch Điện)
      drawCodeArenaDomain(ctx, this.width, this.height, this.now, true);
    } else if (this.dimensionMode === '3d' || this.dimensionMode === '4d') {
      // 3D Perspective Grid & 3D Extruded Walls
      draw3DArenaGrid(ctx, this.width, this.height, this.now, this.dimensionMode === '4d');
      // 4D Mode: Render 4D Tesseract Hypercube Projection
      if (this.dimensionMode === '4d') {
        draw4DTesseract(ctx, this.width / 2, this.height / 2, 165, this.now);
      }
    } else {
      // High-tech subtle combat grid
      ctx.save();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < this.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
        ctx.stroke();
      }
      for (let y = 0; y < this.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Render Sở Tân Điếu Domain (Fire zone & runes)
    if (this.soTanDieu && this.soTanDieu.active && this.soTanDieu.phase === 'domain') {
      const elapsed = this.now - (this.soTanDieu.domainEndTime - 7500);
      const progress = Math.min(1, Math.max(0, elapsed / 7500));
      drawSoTanDieuDomain(ctx, this.width, this.height, this.now, progress);
      drawSoTanDieuClones(ctx, this.enemyBall.x, this.enemyBall.y, this.now);
    }

    // Standard Arena Border (chỉ vẽ nếu ở 2D mode và không trong Code Arena)
    if (!hasOwner7b && this.dimensionMode === '2d') {
      ctx.save();
      // Outer glow
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, this.width - 8, this.height - 8);

      // Main sharp cyan border
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, this.width - 4, this.height - 4);

      // Corner tactical brackets
      const cornerSize = 16;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 4;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(2, 2 + cornerSize);
      ctx.lineTo(2, 2);
      ctx.lineTo(2 + cornerSize, 2);
      ctx.stroke();
      // Top-Right
      ctx.beginPath();
      ctx.moveTo(this.width - 2 - cornerSize, 2);
      ctx.lineTo(this.width - 2, 2);
      ctx.lineTo(this.width - 2, 2 + cornerSize);
      ctx.stroke();
      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(2, this.height - 2 - cornerSize);
      ctx.lineTo(2, this.height - 2);
      ctx.lineTo(2 + cornerSize, this.height - 2);
      ctx.stroke();
      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(this.width - 2 - cornerSize, this.height - 2);
      ctx.lineTo(this.width - 2, this.height - 2);
      ctx.lineTo(this.width - 2, this.height - 2 - cornerSize);
      ctx.stroke();
      ctx.restore();
    }

    // Render Glitch Trails
    this.glitchTrails.forEach(trail => {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 0, 255, 0.25)';
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, GLITCH_TRAIL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    // Render Active Fire Crack Slashes
    this.activeCracks.forEach(crack => {
      drawFireCrack(ctx, crack.x1, crack.y1, crack.x2, crack.y2);
    });

    // Render Massive Ground Fissures (Vết nứt cong cực to & Vết nứt thẳng Cầu Vồng Tối Cao)
    this.activeFissures.forEach(fissure => {
      const lifeRatio = Math.max(0, 1 - (this.now - fissure.createdAt) / Math.max(1, fissure.expiresAt - fissure.createdAt));
      if (fissure.isStraight) {
        drawStraightFissure(ctx, fissure.x1, fissure.y1, fissure.x2, fissure.y2, lifeRatio, this.now);
      } else {
        drawMassiveFissure(ctx, fissure.x1, fissure.y1, fissure.x2, fissure.y2, lifeRatio);
      }
    });

    // Render Expanding Rings
    this.expandingRings.forEach(r => {
      ctx.save();
      ctx.strokeStyle = r.color;
      ctx.globalAlpha = r.alpha;
      ctx.lineWidth = r.thickness;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    // Render Particles
    this.particles.forEach(p => {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      if (p.type === 'shard') {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot || 0);
        ctx.beginPath();
        ctx.moveTo(0, -p.radius);
        ctx.lineTo(p.radius * 0.8, p.radius);
        ctx.lineTo(-p.radius * 0.8, p.radius);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // Render Laser Beams
    if (this.laserGfx) {
      const pIsUpgraded = this.p.weapon.key === 'upgraded_railgun' || (this.p.weapon as any).isUpgradedRailgun;
      const eIsUpgraded = this.e.weapon.key === 'upgraded_railgun' || (this.e.weapon as any).isUpgradedRailgun;

      // Player Laser (Cyan / Blue)
      if (this.laserGfx.playerActive) {
        ctx.save();
        ctx.lineCap = 'round';
        if (pIsUpgraded) {
          // GIGANTIC UPGRADED RAILGUN BEAM (TIA LASER TO HƠN GẤP ĐÔI)
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
          ctx.lineWidth = 44;
          ctx.beginPath();
          ctx.moveTo(this.laserGfx.playerX1, this.laserGfx.playerY1);
          ctx.lineTo(this.laserGfx.playerX2, this.laserGfx.playerY2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
          ctx.lineWidth = 26;
          ctx.stroke();

          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 14;
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 6;
          ctx.stroke();

          // Electric lightning arcs crackling around beam
          ctx.strokeStyle = '#e0f2fe';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const steps = 9;
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const lx = this.laserGfx.playerX1 + (this.laserGfx.playerX2 - this.laserGfx.playerX1) * t;
            const ly = this.laserGfx.playerY1 + (this.laserGfx.playerY2 - this.laserGfx.playerY1) * t;
            const jitter = Math.sin(this.now * 0.04 + i * 2.5) * 12;
            const len = Math.hypot(this.laserGfx.playerX2 - this.laserGfx.playerX1, this.laserGfx.playerY2 - this.laserGfx.playerY1) || 1;
            const perpX = -(this.laserGfx.playerY2 - this.laserGfx.playerY1) / len;
            const perpY = (this.laserGfx.playerX2 - this.laserGfx.playerX1) / len;
            if (i === 0) ctx.moveTo(lx, ly);
            else ctx.lineTo(lx + perpX * jitter, ly + perpY * jitter);
          }
          ctx.stroke();
        } else {
          // Standard Railgun Beam
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(this.laserGfx.playerX1, this.laserGfx.playerY1);
          ctx.lineTo(this.laserGfx.playerX2, this.laserGfx.playerY2);
          ctx.stroke();

          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 8;
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Enemy Laser (Red / Crimson)
      if (this.laserGfx.enemyActive) {
        ctx.save();
        ctx.lineCap = 'round';
        if (eIsUpgraded) {
          // GIGANTIC UPGRADED ENEMY BEAM
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
          ctx.lineWidth = 44;
          ctx.beginPath();
          ctx.moveTo(this.laserGfx.enemyX1, this.laserGfx.enemyY1);
          ctx.lineTo(this.laserGfx.enemyX2, this.laserGfx.enemyY2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
          ctx.lineWidth = 26;
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 14;
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 6;
          ctx.stroke();
        } else {
          // Standard Railgun Beam
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(this.laserGfx.enemyX1, this.laserGfx.enemyY1);
          ctx.lineTo(this.laserGfx.enemyX2, this.laserGfx.enemyY2);
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 8;
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Render Ultra Laser (Charging or In-Flight Plasma Sphere)
    if (this.ultraLaser && this.ultraLaser.active) {
      const ul = this.ultraLaser;
      ctx.save();
      if (ul.charging) {
        const elapsed = this.now - ul.chargeStart;
        const progress = Math.min(1, elapsed / ul.chargeDuration);
        const curR = 12 + progress * 16;

        // Rotating Energy Ring
        ctx.save();
        ctx.translate(ul.sphereX, ul.sphereY);
        ctx.rotate(this.now * 0.007);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, curR + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Inner glowing plasma sphere
        const grad = ctx.createRadialGradient(ul.sphereX, ul.sphereY, 2, ul.sphereX, ul.sphereY, curR);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, '#38bdf8');
        grad.addColorStop(0.75, '#2563eb');
        grad.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ul.sphereX, ul.sphereY, curR, 0, Math.PI * 2);
        ctx.fill();

        // Charge Text Banner
        const remSec = Math.max(0, (ul.chargeDuration - elapsed) / 1000).toFixed(1);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`⚡ ULTRA LASER: TÍCH ĐÒN (${remSec}s)`, ul.sphereX, ul.sphereY - curR - 14);
      } else if (ul.fired) {
        // In-flight glowing super plasma missile
        const grad = ctx.createRadialGradient(ul.sphereX, ul.sphereY, 3, ul.sphereX, ul.sphereY, ul.radius * 1.6);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#00e5ff');
        grad.addColorStop(0.75, '#2563eb');
        grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ul.sphereX, ul.sphereY, ul.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(ul.sphereX, ul.sphereY, ul.radius * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ 1000 DMG', ul.sphereX, ul.sphereY - ul.radius - 8);
      }
      ctx.restore();
    }

    // Render Railgun Clash Purple Energy Orb
    if (this.railgunClash && this.railgunClash.active) {
      const { orbX, orbY, orbRadius, startedAt } = this.railgunClash;
      const elapsed = this.now - startedAt;
      const dmgTicks = Math.floor(elapsed / 150);
      const bonusDmg = Math.round(dmgTicks * 1.5);
      const isCriticalNuke = orbRadius >= 70;

      ctx.save();

      // Outer pulsating field
      const pulse = Math.sin(this.now * 0.02) * (isCriticalNuke ? 6 : 3);
      const outerRad = Math.max(orbRadius * 1.8 + pulse, orbRadius + 10);
      const gradOuter = ctx.createRadialGradient(orbX, orbY, 4, orbX, orbY, outerRad);
      
      if (isCriticalNuke) {
        gradOuter.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
        gradOuter.addColorStop(0.4, 'rgba(217, 70, 239, 0.7)');
        gradOuter.addColorStop(0.8, 'rgba(245, 158, 11, 0.3)');
        gradOuter.addColorStop(1, 'rgba(239, 68, 68, 0)');
      } else {
        gradOuter.addColorStop(0, 'rgba(217, 70, 239, 0.85)');
        gradOuter.addColorStop(0.5, 'rgba(168, 85, 247, 0.45)');
        gradOuter.addColorStop(1, 'rgba(147, 51, 234, 0)');
      }
      
      ctx.fillStyle = gradOuter;
      ctx.beginPath();
      ctx.arc(orbX, orbY, outerRad, 0, Math.PI * 2);
      ctx.fill();

      // Mid electric core
      const gradCore = ctx.createRadialGradient(orbX, orbY, 1, orbX, orbY, orbRadius);
      if (isCriticalNuke) {
        gradCore.addColorStop(0, '#ffffff');
        gradCore.addColorStop(0.25, '#fef08a');
        gradCore.addColorStop(0.6, '#f43f5e');
        gradCore.addColorStop(1, '#9333ea');
      } else {
        gradCore.addColorStop(0, '#ffffff');
        gradCore.addColorStop(0.3, '#f0abfc');
        gradCore.addColorStop(0.7, '#c084fc');
        gradCore.addColorStop(1, '#9333ea');
      }
      ctx.fillStyle = gradCore;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outline
      ctx.strokeStyle = isCriticalNuke ? '#facc15' : '#e879f9';
      ctx.lineWidth = isCriticalNuke ? 3.5 : 2.5;
      ctx.stroke();

      // Electric arcs around the orb
      const arcCount = isCriticalNuke ? 8 : 4;
      for (let i = 0; i < arcCount; i++) {
        const angle = (this.now * 0.008 + i * ((Math.PI * 2) / arcCount)) % (Math.PI * 2);
        const arcLen = orbRadius * (1.2 + Math.random() * 0.5);
        const ax1 = orbX + Math.cos(angle) * (orbRadius * 0.5);
        const ay1 = orbY + Math.sin(angle) * (orbRadius * 0.5);
        const ax2 = orbX + Math.cos(angle + 0.3) * arcLen;
        const ay2 = orbY + Math.sin(angle + 0.3) * arcLen;

        ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : (isCriticalNuke ? '#fbbf24' : '#d946ef');
        ctx.lineWidth = isCriticalNuke ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(ax1, ay1);
        ctx.lineTo((ax1 + ax2) / 2 + (Math.random() - 0.5) * 8, (ay1 + ay2) / 2 + (Math.random() - 0.5) * 8);
        ctx.lineTo(ax2, ay2);
        ctx.stroke();
      }

      // Floating status text above the orb
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      if (isCriticalNuke) {
        ctx.fillStyle = '#fef08a';
        ctx.fillText(`☢ NUKE SẮP NỔ (${Math.round(orbRadius)}/100px) ☢`, orbX, orbY - orbRadius - 12);
        ctx.fillStyle = '#fda4af';
        ctx.fillText(`+${bonusDmg} DMG`, orbX, orbY - orbRadius - 2);
      } else {
        ctx.fillStyle = '#f5d0fe';
        ctx.fillText(`⚡ ${Math.round(orbRadius)}px (+${bonusDmg} DMG)`, orbX, orbY - orbRadius - 8);
      }

      ctx.restore();
    }

    // Render Minigun Tracers
    if (this.minigunGfx && this.minigunGfx.active) {
      ctx.save();
      ctx.strokeStyle = this.minigunGfx.isHeat ? '#ff8800' : '#ffdd44';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.minigunGfx.x1, this.minigunGfx.y1);
      ctx.lineTo(this.minigunGfx.x2, this.minigunGfx.y2);
      ctx.stroke();
      ctx.restore();
    }

    // Render Ritual FX
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (!ent.ritual) return;
      if (ent.ritual.state === 'rings' && ent.ritual.rings) {
        const ringRadii = [26, 46, 68, 90, 112];
        const ringSegments = [8, 10, 12, 14, 16];
        ringRadii.forEach((rad, i) => {
          ctx.save();
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ent.ritual?.rings?.rotations[i] || 0);
          drawRuneRing(ctx, rad, ringSegments[i], '#9b59b6', 0.85 - i * 0.08, 3);
          ctx.restore();
        });
        ctx.save();
        ctx.translate(ball.x, ball.y);
        ctx.rotate(ent.ritual.rings.taijiRot);
        drawTaiji(ctx, 14);
        ctx.restore();
      } else if (ent.ritual.state === 'fire' && ent.ritual.fireDir) {
        const dir = ent.ritual.fireDir;
        const fireLen = ent.ritual.fireLen;
        const nx = -dir.y;
        const ny = dir.x;
        const endHalfWidth = RITUAL_FIRE_BASE_HALF_WIDTH + fireLen * RITUAL_FIRE_WIDEN_RATE;

        ctx.save();
        ctx.fillStyle = 'rgba(255, 107, 0, 0.35)';
        ctx.beginPath();
        ctx.moveTo(ball.x + nx * RITUAL_FIRE_BASE_HALF_WIDTH, ball.y + ny * RITUAL_FIRE_BASE_HALF_WIDTH);
        ctx.lineTo(ball.x - nx * RITUAL_FIRE_BASE_HALF_WIDTH, ball.y - ny * RITUAL_FIRE_BASE_HALF_WIDTH);
        ctx.lineTo(ball.x + dir.x * fireLen - nx * endHalfWidth, ball.y + dir.y * fireLen - ny * endHalfWidth);
        ctx.lineTo(ball.x + dir.x * fireLen + nx * endHalfWidth, ball.y + dir.y * fireLen + ny * endHalfWidth);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    });

    // Render SoTan Golden Rings & Aim Laser
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (ent.sotan && ent.sotan.state === 'charging_rings') {
        const ringRadii = [28, 48, 70, 92, 114];
        drawSoTanGoldenRings(ctx, ball.x, ball.y, ringRadii, ent.sotan.ringsRot);

        // Sacred Golden Target Aim Laser
        const oppBall = ent === this.p ? this.enemyBall : this.playerBall;
        ctx.save();
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(oppBall.x, oppBall.y);
        ctx.stroke();
        ctx.restore();
      }
    });

    // Render Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa (Vạn Luân Cầu Vồng 9 Tầng & Tứ Tượng)
    if (this.nhatDieuToiCao && this.nhatDieuToiCao.active && this.nhatDieuToiCao.phase === 'charging') {
      const sourceBall = this.nhatDieuToiCao.attackerIsPlayer ? this.playerBall : this.enemyBall;
      drawNhatDieuToiCaoRings(
        ctx,
        sourceBall.x,
        sourceBall.y,
        this.nhatDieuToiCao.ringsRadii,
        this.nhatDieuToiCao.ringsRot,
        this.now
      );

      // Rainbow Divine Lock-on Aim Beam
      const oppBall = this.nhatDieuToiCao.attackerIsPlayer ? this.enemyBall : this.playerBall;
      ctx.save();
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.moveTo(sourceBall.x, sourceBall.y);
      ctx.lineTo(oppBall.x, oppBall.y);
      ctx.stroke();
      ctx.restore();
    }

    // Render Phi Thiên Vô Cực Điếu - Tối Cao Áo Nghĩa (Vạn Luân 9 Tầng Cầu Vồng + Bão Lốc Xoáy)
    if (this.phiThienVoCuc && this.phiThienVoCuc.active) {
      drawPhiThienVoCucTornado(
        ctx,
        this.width / 2,
        this.height / 2,
        this.phiThienVoCuc.ringsRot,
        this.phiThienVoCuc.tornadoAngle,
        this.now
      );
    }

    // Render Toán Thiên Thấu Chi Điếu (Mũi Khoan Găm Tường Khổng Lồ)
    if (this.toanThienThauChi && this.toanThienThauChi.active) {
      const oppBall = this.toanThienThauChi.attackerIsPlayer ? this.enemyBall : this.playerBall;
      const dx = oppBall.x - this.toanThienThauChi.drillX;
      const dy = oppBall.y - this.toanThienThauChi.drillY;
      const angle = this.toanThienThauChi.phase === 'homing' ? Math.atan2(dy, dx) : 0;
      drawToanThienDrill(
        ctx,
        this.toanThienThauChi.drillX,
        this.toanThienThauChi.drillY,
        angle,
        this.toanThienThauChi.drillRot,
        this.toanThienThauChi.phase === 'pinned',
        this.now
      );
    }

    // Render The Owner Game - 14 Orbiting Holy Weapons
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall },
      { ent: this.p2, ball: this.playerBall2 },
      { ent: this.e2, ball: this.enemyBall2 }
    ].forEach(({ ent, ball }) => {
      if (ent && ball && (ent.role === 'the_owner' || ent.role === 'the_owner_7b')) {
        drawTheOwnerOrbitingWeapons(
          ctx,
          ball.x,
          ball.y,
          this.theOwner.weaponsOrbitRot,
          this.now,
          ent.role === 'the_owner_7b'
        );
      }
    });

    // Render Tower Defense Fortress & Mobs
    if (this.towerDefense && this.towerDefense.active) {
      drawTowerDefenseFortress(
        ctx,
        this.towerDefense.gateHp,
        this.towerDefense.maxGateHp,
        this.towerDefense.wave,
        this.towerDefense.mobsKilled,
        this.towerDefense.totalCoinsEarned,
        this.width,
        this.height,
        this.now
      );

      // Render TD Mobs
      this.towerDefense.mobs.forEach(mob => {
        const mobColor = mob.wave % 3 === 0 ? '#a855f7' : mob.wave % 2 === 0 ? '#f97316' : '#ef4444';
        ctx.save();
        ctx.fillStyle = mobColor;
        ctx.shadowColor = mobColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(mob.x, mob.y, mob.radius, 0, Math.PI * 2);
        ctx.fill();

        // Mob Mini HP Bar
        const barW = mob.radius * 2.2;
        const barH = 3;
        const hpPct = Math.max(0, mob.hp / mob.maxHp);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(mob.x - barW / 2, mob.y - mob.radius - 7, barW, barH);
        ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : '#ef4444';
        ctx.fillRect(mob.x - barW / 2, mob.y - mob.radius - 7, barW * hpPct, barH);
        ctx.restore();
      });
    }

    // Render Holy Slashes from Sáng Thế Chi Kiếm
    this.holySlashes.forEach(h => {
      drawHolySlash(ctx, h.x, h.y, h.startTime, this.now, h.duration);
    });

    // Render Active Projectiles (Arrows, Bolts, Song Kiem Slashes, Nhất Quang)
    this.projectiles.forEach(p => {
      if (p.type === 'arrow') {
        drawArrow(ctx, p.x, p.y, p.angle, p.color);
      } else if (p.type === 'crossbow_bolt') {
        drawCrossbowBolt(ctx, p.x, p.y, p.angle, p.color);
      } else if (p.type === 'songkiem_slash') {
        drawSongKiemSlash(ctx, p.x, p.y, p.angle, p.radius, p.slashIndex || 0, this.now);
      } else if (p.type === 'songkiem_nhatquang') {
        drawSongKiemNhatQuang(ctx, p.x, p.y, p.angle, p.radius, this.now);
      }
    });

    // Render Song Kiem Charging Auras (Skill 2: Nhất Quang)
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (ent.songkiem && ent.songkiem.isChargingNhatQuang) {
        const progress = Math.min(1, (this.now - ent.songkiem.nhatQuangChargeStartTime) / SONGKIEM_NHATQUANG_CHARGE_MS);
        drawSongKiemChargeAura(ctx, ball.x, ball.y, progress, this.now);
      }
    });

    // Render Song Kiem Liên Hoàn Kích Slash Overlay Effects
    if (this.p.songkiem && this.p.songkiem.comboActive) {
      const hitIdx = this.p.songkiem.totalComboHits - this.p.songkiem.comboHitsLeft;
      drawLienHoanKichSlashFx(ctx, this.enemyBall.x, this.enemyBall.y, hitIdx, this.now);
    }
    if (this.e.songkiem && this.e.songkiem.comboActive) {
      const hitIdx = this.e.songkiem.totalComboHits - this.e.songkiem.comboHitsLeft;
      drawLienHoanKichSlashFx(ctx, this.playerBall.x, this.playerBall.y, hitIdx, this.now);
    }

    // Render Cần Câu Fishing Line & Hook [MÓC LƯỠI]
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (ent.cancau && (ent.cancau.state === 'throwing' || ent.cancau.state === 'pulling' || ent.cancau.state === 'smashing')) {
        drawFishingHookAndLine(
          ctx,
          ball.x,
          ball.y,
          ent.cancau.hookX,
          ent.cancau.hookY,
          ent.cancau.state,
          ent.role,
          this.now
        );
      }
    });

    // Render DayNit AoE Whip Lashes
    this.dayNitAoeFx.forEach(fx => {
      const progress = Math.min(1, (this.now - fx.startTime) / fx.duration);
      drawDayNitWhipAoe(ctx, fx.x, fx.y, fx.radius, progress);
    });

    // Render Synergies Auras around Balls
    const activeFighters: { ent: Entity; b: Ball }[] = [
      { ent: this.p, b: this.playerBall },
      { ent: this.e, b: this.enemyBall }
    ];
    if (this.is2v2 && this.p2 && this.playerBall2 && this.e2 && this.enemyBall2) {
      activeFighters.push(
        { ent: this.p2, b: this.playerBall2 },
        { ent: this.e2, b: this.enemyBall2 }
      );
    }
    activeFighters.forEach(({ ent, b }) => {
      if (ent.hp <= 0 && ent.isDead) return;
      if (ent.synergyThienHa) {
        drawThienHaSandAura(ctx, b.x, b.y, b.radius, this.now);
      }
      if (ent.synergyDongNghiep) {
        drawDongNghiepColleagueAura(ctx, b.x, b.y, b.radius, this.now);
      }
    });

    // Render Balls & Attached Weapon Rigs
    this.renderEntityBall(this.p, this.playerBall, true);
    this.renderEntityBall(this.e, this.enemyBall, false);
    if (this.is2v2 && this.p2 && this.playerBall2 && this.e2 && this.enemyBall2) {
      if (this.p2.hp > 0 || !this.p2.isDead) {
        this.renderEntityBall(this.p2, this.playerBall2, true);
      }
      if (this.e2.hp > 0 || !this.e2.isDead) {
        this.renderEntityBall(this.e2, this.enemyBall2, false);
      }
    }

    // Render Trấn Quốc Chi Kiếm (Colossal Celestial Sword)
    if (this.tranQuocSword && this.tranQuocSword.active) {
      drawTranQuocChiKiem(
        ctx,
        this.tranQuocSword.x,
        this.tranQuocSword.y,
        this.now,
        this.tranQuocSword.hasStruck,
        this.tranQuocSword.team
      );
    }

    // Render Four Sacred Beasts Spirit Auras
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (ent.sotan && ent.sotan.beastActive) {
        if (this.now - ent.sotan.beastActive.spawnAt < ent.sotan.beastActive.duration) {
          ent.sotan.beastActive.x = ball.x;
          ent.sotan.beastActive.y = ball.y;
          drawBeastSpirit(ctx, ent.sotan.beastActive, this.now);
        } else {
          ent.sotan.beastActive = null;
        }
      }
    });

    // Render Bá Thường Qinglong Manifestation
    if (this.qinglongManifestation) {
      const q = this.qinglongManifestation;
      const alpha = Math.max(0, 1 - (this.now - q.startTime) / q.duration);
      drawQinglongHead(ctx, q.x, q.y, q.scale, alpha, this.now);
    }

    // Render Bá Thường Dragon Waves (Du Long Bái Vĩ)
    this.dragonWaves.forEach(w => {
      drawDragonWave(ctx, w.x, w.y, w.radius, w.vx, this.now);
    });

    // Render Bá Thường Drill Projectiles (Mũi khoan xanh lá)
    this.drillProjectiles.forEach(dp => {
      drawDrillProjectile(ctx, dp.x, dp.y, dp.vx, dp.vy, dp.radius, this.now);
    });

    // Render Bá Thường Thrown Weapons (Tiềm Long Vật Dụng)
    this.thrownWeapons.forEach(tw => {
      ctx.save();
      ctx.translate(tw.x, tw.y);
      ctx.rotate(tw.rot);
      drawWeaponIcon(ctx, 'songkiem', 0, 0, 32);
      ctx.restore();
    });

    // Render Lưu Bị Dual Blade Slashes (Hán Thất Nghiêm Đông)
    this.luuBeiSlashes.forEach(s => {
      drawLuuBeiDualBladeSlash(ctx, s.x, s.y, s.type, Math.min(1, (this.now - s.startTime) / s.duration), s.angle);
    });

    // Render Long Hồn Đoạn Hải Cutscene & Hắc Long Follower
    if (this.longHonDoanHai && this.longHonDoanHai.active) {
      if (this.longHonDoanHai.phase === 'cutscene') {
        drawLongHonDoanHaiCutscene(ctx, this.playerBall.x, this.playerBall.y, this.now, this.longHonDoanHai.startTime);
      } else if (this.longHonDoanHai.phase === 'flight' || this.longHonDoanHai.phase === 'smash') {
        drawHacLongFollower(ctx, this.playerBall.x, this.playerBall.y, this.hacLongTrail, this.now);
      }
    }

    // Render Long Hồn Đoạn Hải Fire Orbs (Cầu Lửa 5s)
    this.longHonFireOrbs.forEach(orb => {
      drawLongHonFireOrb(ctx, orb.x, orb.y, orb.radius, orb.createdAt, orb.expiresAt, this.now);
    });

    // Render Long Hồn Đoạn Hải Fire Pillars (Cột Lửa bùng nổ)
    this.longHonFirePillars.forEach(pillar => {
      drawLongHonFirePillar(ctx, pillar.x, pillar.y, pillar.radius, pillar.createdAt, pillar.expiresAt, this.now);
    });

    // Render Sở Tân Điếu Mega Slashes
    this.megaSlashes.forEach(s => {
      drawMegaSlashLine(ctx, s.x, s.y, s.angle, s.length, s.width, s.color, s.createdAt, this.now, 260);
    });

    // Render Dynamic Slashes (Hiệu ứng chém & phát sáng lưỡi kiếm/code cleave)
    this.dynamicSlashes.forEach(s => {
      drawDynamicSlash(ctx, s.x, s.y, s.angle, s.radius, s.color, s.glowColor, s.type, s.createdAt, this.now, s.duration);
    });

    // Render Nhai Giác Lưu Tinh Trảm Animation
    if (this.nhaiGiacLuuTinhTram && this.nhaiGiacLuuTinhTram.active) {
      drawNhaiGiacAnimationGraphics(ctx, this.nhaiGiacLuuTinhTram, this.now);
    }

    // Render Sandbox Dummy Info & Damage Board
    if (this.isSandbox) {
      drawSandboxDummyInfo(ctx, this.enemyBall.x, this.enemyBall.y, this.enemyBall.radius, this.sandboxTotalDamage, this.sandboxDps, this.now);
    }

    // Render Admin Terminal Popups
    [
      { ent: this.p, ball: this.playerBall },
      { ent: this.e, ball: this.enemyBall }
    ].forEach(({ ent, ball }) => {
      if (ent.admin && ent.admin.activeCommandText && this.now < ent.admin.commandDisplayUntil) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 1;
        ctx.fillRect(ball.x - 35, ball.y - 45, 70, 20);
        ctx.strokeRect(ball.x - 35, ball.y - 45, 70, 20);
        ctx.fillStyle = '#4caf50';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ent.admin.activeCommandText, ball.x, ball.y - 35);
        ctx.restore();
      }
    });

    // Render Time Stop Majestic Banner
    if (this.timeStopUntil > this.now && this.timeStopMessage) {
      ctx.save();
      ctx.fillStyle = 'rgba(2, 6, 23, 0.78)';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.fillRect(0, this.height * 0.40, this.width, 76);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(0, this.height * 0.40, this.width, 76);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⏳ TIME STOP - THỜI GIAN NGƯNG ĐỌNG ⏳', this.width / 2, this.height * 0.40 + 24);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(this.timeStopMessage, this.width / 2, this.height * 0.40 + 52);
      ctx.restore();
    }

    // Render Continuous Orbital Railgun Beam in Arena
    if (this.stellarOrbitalBeam && this.stellarOrbitalBeam.active) {
      drawStellarOrbitalBeam(ctx, this.stellarOrbitalBeam, this.now);
    }

    // Render SS-21 Quasar Super White Laser Beam in Arena (300 dmg/0.2s for 20s)
    if (this.stellarQuasar && this.stellarQuasar.active) {
      drawStellarQuasarLaser(ctx, this.stellarQuasar, this.now);
    }

    // Render Tsar Bomba Cataclysmic Shockwaves
    if (this.stellarTsarFx) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarTsarFx.startTime) / this.stellarTsarFx.duration));
      drawStellarTsarExplosion(ctx, this.stellarTsarFx.x, this.stellarTsarFx.y, progress, this.now);
    }

    // Render SS-06 Halley Cataclysmic Impact Crater Explosion (60,000 DMG)
    if (this.stellarHalleyFx) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarHalleyFx.startTime) / this.stellarHalleyFx.duration));
      drawStellarHalleyExplosion(ctx, this.stellarHalleyFx.x, this.stellarHalleyFx.y, progress, this.now);
    }

    // Render SS-02 The Sun Cataclysmic Solar Explosion in Arena
    if (this.stellarSunFx) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarSunFx.startTime) / this.stellarSunFx.duration));
      drawStellarSunExplosion(ctx, this.stellarSunFx.x, this.stellarSunFx.y, progress, this.now);
    }

    // Render Event Horizon Singularity Vortex in Arena
    if (this.stellarEventHorizon && this.stellarEventHorizon.active) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarEventHorizon.startTime) / this.stellarEventHorizon.durationMs));
      drawStellarEventHorizonVortex(ctx, this.stellarEventHorizon.x, this.stellarEventHorizon.y, progress, this.now);
    }

    // Render Neutron Star Kilonova & Radiation DoT in Arena
    if (this.stellarNeutronStar && this.stellarNeutronStar.active) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarNeutronStar.startTime) / this.stellarNeutronStar.durationMs));
      drawStellarNeutronImpact(ctx, this.stellarNeutronStar.x, this.stellarNeutronStar.y, progress, this.now);
    }

    // Render SS-Final Big Bang Cosmic Primordial Explosion in Arena
    if (this.stellarBigBangFx) {
      const progress = Math.min(1, Math.max(0, (this.now - this.stellarBigBangFx.startTime) / this.stellarBigBangFx.duration));
      drawStellarBigBangExplosion(ctx, this.stellarBigBangFx.x, this.stellarBigBangFx.y, progress, this.now);
    }

    // Render Stellar Cutscene (Full screen cinematic takeover)
    if (this.stellarCutscene && this.stellarCutscene.active) {
      drawStellarCutscene(ctx, this.stellarCutscene, this.width, this.height, this.now);
    }

    // Render Top HUD Health Bars
    this.renderHUD(ctx);

    // Render Combo QTE Minigame Overlay
    this.renderComboQTE(ctx);

    ctx.restore();
  }

  private renderComboQTE(ctx: CanvasRenderingContext2D) {
    if (!this.comboQTE || !this.comboQTE.active || this.battleOver) return;

    ctx.save();
    const qte = this.comboQTE;
    const remainingMs = Math.max(0, qte.expiresAt - this.now);
    const timeFrac = Math.min(1, Math.max(0, remainingMs / 3000));
    const isPlayer = qte.attackerIsPlayer;

    const panelX = 135;
    const panelY = 95;
    const panelW = 230;
    const panelH = 125;

    // Outer glow / panel background
    ctx.shadowColor = isPlayer ? 'rgba(6, 182, 212, 0.6)' : 'rgba(239, 68, 68, 0.6)';
    ctx.shadowBlur = 16;
    ctx.fillStyle = 'rgba(7, 14, 36, 0.95)';
    ctx.strokeStyle = isPlayer ? '#22d3ee' : '#f87171';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 16);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header: Combo count
    ctx.fillStyle = isPlayer ? '#38bdf8' : '#fb7185';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      isPlayer ? `🥊 COMBO LIÊN HOÀN (x${qte.comboCount})` : `🥊 ĐỊCH ĐANG ĐẤM COMBO (x${qte.comboCount})`,
      panelX + panelW / 2,
      panelY + 22
    );

    // Key Box (Center)
    const keyBoxX = panelX + panelW / 2 - 24;
    const keyBoxY = panelY + 34;
    const keyBoxSize = 48;

    // Key Box BG with pulse
    const pulse = Math.sin(this.now * 0.015) * 0.15 + 0.85;
    ctx.fillStyle = isPlayer ? `rgba(6, 182, 212, ${0.25 * pulse})` : `rgba(239, 68, 68, ${0.25 * pulse})`;
    ctx.strokeStyle = isPlayer ? '#38bdf8' : '#f87171';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(keyBoxX, keyBoxY, keyBoxSize, keyBoxSize, 10);
    ctx.fill();
    ctx.stroke();

    // Large Key text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 26px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(qte.requiredKey, keyBoxX + keyBoxSize / 2, keyBoxY + keyBoxSize / 2 + 1);

    // Subtitle instruction
    ctx.textBaseline = 'alphabetic';
    ctx.font = 'bold 10px sans-serif';
    if (isPlayer) {
      ctx.fillStyle = '#fef08a';
      ctx.fillText(
        `NHẤN [${qte.requiredKey}] TRONG ${(remainingMs / 1000).toFixed(1)}s`,
        panelX + panelW / 2,
        panelY + 98
      );
    } else {
      ctx.fillStyle = '#fda4af';
      ctx.fillText(
        `ĐỊCH ĐANG PHẢN XẠ (${(remainingMs / 1000).toFixed(1)}s)...`,
        panelX + panelW / 2,
        panelY + 98
      );
    }

    // Time Progress Bar (at bottom of panel)
    const barX = panelX + 16;
    const barY = panelY + panelH - 14;
    const barW = panelW - 32;
    const barH = 5;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(barX, barY, barW, barH);

    ctx.fillStyle = timeFrac > 0.4 ? (isPlayer ? '#06b6d4' : '#ef4444') : '#f59e0b';
    ctx.fillRect(barX, barY, barW * timeFrac, barH);

    ctx.restore();
  }

  private renderEntityBall(entity: Entity, ball: Ball, isPlayer: boolean) {
    const ctx = this.ctx;
    ctx.save();

    // Spear or Mace visual cues
    let ballFill = ball.color;
    if (entity.spear && entity.spear.state === 'charging') {
      ballFill = '#ffff00';
    } else if (entity.spear && entity.spear.state === 'ultra_dashing') {
      ballFill = '#ffffff';
    }

    // Ball circle
    // Check same-level lightning or same-role visual border resonance
    // "nếu chọn địch và bạn là sấm sét cùng cấp thì: 1 người viền xanh lá, 2 người viền đỏ, và cả role cũng vậy"
    const pIsLightning = this.p.element?.type === 'lightning';
    const eIsLightning = this.e.element?.type === 'lightning';
    const sameLightningTier = pIsLightning && eIsLightning && this.p.element?.tier === this.e.element?.tier;
    const thisIsLightning = entity.element?.type === 'lightning';

    const pHasRole = Boolean(this.p.role);
    const eHasRole = Boolean(this.e.role);
    const sameRole = pHasRole && eHasRole && this.p.role === this.e.role;
    const thisHasRole = Boolean(entity.role);

    let resonanceBorder: string | null = null;
    if ((sameLightningTier && thisIsLightning) || (sameRole && thisHasRole)) {
      // 2 người cùng cấp sấm sét hoặc cùng role -> viền đỏ
      resonanceBorder = '#ef4444';
    } else if (thisIsLightning || thisHasRole) {
      // 1 người -> viền xanh lá
      resonanceBorder = '#22c55e';
    }

    if (this.dimensionMode === '3d' || this.dimensionMode === '4d') {
      draw3DVolumetricSphere(
        ctx,
        ball.x,
        ball.y,
        ball.radius,
        ballFill,
        resonanceBorder || ball.borderColor,
        this.dimensionMode === '4d',
        this.now
      );
    } else {
      ctx.fillStyle = ballFill;
      ctx.strokeStyle = resonanceBorder || ball.borderColor;
      ctx.lineWidth = resonanceBorder ? 4.5 : 3;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // If resonance border active, draw outer glowing pulse ring
    if (resonanceBorder) {
      ctx.save();
      const pulse = Math.sin(this.now * 0.01) * 2;
      ctx.strokeStyle = resonanceBorder === '#ef4444' ? 'rgba(239, 68, 68, 0.75)' : 'rgba(34, 197, 94, 0.75)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 5 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Special Shield Aura for So Tan (Only takes 75% damage)
    if (entity.role === 'sotan') {
      ctx.save();
      const shieldPulse = Math.sin(this.now * 0.008) * 1.5;
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 7 + shieldPulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Turtle Shell Shield if Huyền Vũ immunity active
    if (entity.sotan && entity.sotan.huyenVuImmuneUntil > this.now) {
      drawHuyenVuShield(ctx, ball.x, ball.y, ball.radius, this.now);
    }

    // Bá Thường: Long Nhân Hợp Nhất Dragon Avatar
    if (entity.role === 'bathuong' && entity.bathuong?.isDragonHuman) {
      drawDragonHumanAvatar(ctx, ball.x, ball.y, ball.radius, this.now);
    }

    // Bá Thường: Ngọa Long Phiên Đăng Drill Vortex
    if (entity.role === 'bathuong' && entity.bathuong?.activeSkill === 'ngoa_long_phien_dang' && entity.bathuong.skillPhase === 'active') {
      drawDrillVortex(ctx, ball.x, ball.y, ball.radius, entity.bathuong.drillRotationAngle, this.now);
    }

    // Weapon Rig
    const rigOffsetX = isPlayer ? 14 : -14;
    const recoilOffset = entity.weaponRecoil * (isPlayer ? -8 : 8);

    ctx.save();
    ctx.translate(ball.x, ball.y - 24);

    // Left Arm / Weapon if Dual
    if (entity.weapon.isDual) {
      drawWeaponIcon(ctx, 'giao', -20, 0, 22);
      drawWeaponIcon(ctx, 'mace', 20 + recoilOffset, 0, 22);
    } else if (entity.weapon.isDualSwords || entity.weapon.key === 'songkiem') {
      const slashL = entity.weaponRecoil > 0.5 ? -6 : 0;
      const slashR = entity.weaponRecoil > 0 && entity.weaponRecoil <= 0.5 ? -6 : 0;
      drawWeaponIcon(ctx, 'songkiem', -16, slashL, 22);
      drawWeaponIcon(ctx, 'songkiem', 16 + recoilOffset, slashR, 22);
    } else if (entity.weapon.isComboFist) {
      const punchL = entity.weaponRecoil > 0.5 ? -8 : 0;
      const punchR = entity.weaponRecoil > 0 && entity.weaponRecoil <= 0.5 ? -8 : 0;
      drawWeaponIcon(ctx, 'combo', -16, punchL, 22);
      drawWeaponIcon(ctx, 'combo', 16 + recoilOffset, punchR, 22);
    } else {
      drawWeaponIcon(ctx, entity.weapon.key, rigOffsetX + recoilOffset, 0, 24);
    }
    ctx.restore();

    // Floating Click Prompt for Stellar Remote & The Owner
    if (isPlayer && (entity.weapon.key === 'stellar_remote' || entity.role === 'the_owner' || entity.role === 'the_owner_7b')) {
      ctx.save();
      const pPulse = Math.sin(this.now * 0.008) * 3;
      const isOwnerRole = entity.role === 'the_owner' || entity.role === 'the_owner_7b';
      ctx.fillStyle = isOwnerRole ? 'rgba(234, 179, 8, 0.95)' : 'rgba(6, 182, 212, 0.9)';
      ctx.strokeStyle = isOwnerRole ? '#fde047' : '#38bdf8';
      ctx.lineWidth = 1.5;
      const bText = isOwnerRole ? '👑🛰️ OWNER VỆ TINH (CLICK)' : '🛰️ CLICK VỆ TINH (MENU)';
      ctx.font = 'bold 9px sans-serif';
      const bWidth = ctx.measureText(bText).width + 12;
      ctx.beginPath();
      ctx.roundRect(ball.x - bWidth / 2, ball.y - ball.radius - 34 + pPulse, bWidth, 16, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = isOwnerRole ? '#000000' : '#ffffff';
      ctx.font = isOwnerRole ? 'bold 9px sans-serif' : 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bText, ball.x, ball.y - ball.radius - 26 + pPulse);
      ctx.restore();
    }

    // Entity Label
    let label = entity.weapon.name;
    if (entity.element) {
      label += ` • ${elLabel(`${entity.element.type}_${entity.element.tier}`)}`;
    }
    if (entity.role === 'werewolf' && entity.werewolf) {
      label += entity.werewolf.phase === 'night' ? ' [Werewolf Đêm]' : ' [Werewolf Ngày]';
    } else if (entity.role === 'sotan') {
      label += ' [SỞ TÂN - SHIELD 75%]';
    } else if (entity.role === 'bathuong') {
      label += entity.bathuong?.isDragonHuman ? ' [BÁ THƯỜNG - LONG NHÂN]' : ' [BÁ THƯỜNG]';
    } else if (entity.role === 'liubei') {
      label += entity.weapon.key === 'songkiem' ? ' [LƯU BỊ - SONG KIẾM]' : ' [LƯU BỊ]';
    } else if (entity.role) {
      label += ` [${entity.role.toUpperCase()}]`;
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, ball.x, ball.y - 12);

    // So Tan permanent special shield badge
    if (entity.role === 'sotan' && (!entity.sotan || entity.sotan.huyenVuImmuneUntil <= this.now)) {
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(`🛡️ SHIELD (75% DMG)`, ball.x, ball.y + 28);
    }

    // Bá Thường skill badge
    if (entity.role === 'bathuong' && entity.bathuong) {
      if (entity.bathuong.isDragonHuman) {
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`🐲 LONG NHÂN (DMGx1.3 Spdx1.5)`, ball.x, ball.y + 28);
      } else if (entity.bathuong.skillPhase === 'active' && entity.bathuong.activeSkill) {
        const skillNameMap: Record<string, string> = {
          long_ngang_dau: '🐉 LONG NGẨNG ĐẦU',
          du_long_bai_vi: '🌊 DU LONG BÁI VĨ',
          ngoa_long_phien_dang: '🌀 NGỌA LONG PHIÊN ĐĂNG',
          than_long_na_di: '⚡ THẦN LONG NA DI',
          tiem_long_vat_dung: '💫 TIỀM LONG VẬT DỤNG'
        };
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(skillNameMap[entity.bathuong.activeSkill] || '🐉 LONG THẦN KỸ', ball.x, ball.y + 28);
      }
    }

    // Lưu Bị skill & buff badge
    if (entity.role === 'liubei' && entity.liubei) {
      if (entity.liubei.state !== 'idle') {
        const stateNameMap: Record<string, string> = {
          fire_slash: '🔥 HÁN THẤT - HỎA TRẢM',
          ice_slash: '❄️ HÁN THẤT - BĂNG TRẢM',
          combo_finish: '⚔️ HÁN THẤT - TẬN DIỆT'
        };
        ctx.fillStyle = '#f97316';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(stateNameMap[entity.liubei.state] || '⚔️ HÁN THẤT NGHIÊM ĐÔNG', ball.x, ball.y + 28);
      } else if (entity.weapon.key === 'songkiem') {
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`👑 ĐẾ VƯƠNG (+15% HP & DMG)`, ball.x, ball.y + 28);
      } else {
        ctx.fillStyle = '#a7f3d0';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`👑 ĐẾ VƯƠNG (+10% HP, +5% DMG)`, ball.x, ball.y + 28);
      }
    }

    // Song Kiem combo & Nhất Quang status badges
    if (entity.songkiem) {
      if (entity.songkiem.isChargingNhatQuang) {
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`✨ TỤ KHÍ [NHẤT QUANG]...`, ball.x, ball.y + 28);
      } else if (entity.songkiem.comboActive) {
        const comboStep = entity.songkiem.totalComboHits - entity.songkiem.comboHitsLeft;
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`⚔️ LIÊN HOÀN KÍCH (x${comboStep})`, ball.x, ball.y + 28);
      }
    }

    // Minigun Ammo display
    if (entity.minigun) {
      const ammoStr = `Đạn: ${entity.minigun.ammo}${entity.minigun.reloading ? ' (Đang nạp...)' : ''}`;
      ctx.fillStyle = '#ffdd44';
      ctx.font = '9px sans-serif';
      ctx.fillText(ammoStr, ball.x, ball.y + 28);
    }

    // Dây Nịt Pain Stun effect ("Đau đớn tột cùng")
    if (entity.dayNitStunUntil && entity.dayNitStunUntil > this.now) {
      ctx.save();
      const shakeOffset = (Math.sin(this.now * 0.08) * 3);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(ball.x + shakeOffset, ball.y, ball.radius + 6, 0, Math.PI * 2);
      ctx.stroke();

      const stunSec = Math.max(0, (entity.dayNitStunUntil - this.now) / 1000).toFixed(1);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(`😱 ĐAU ĐỚN (${stunSec}s)`, ball.x, ball.y - 20);
      ctx.restore();
    }

    // Dây Nịt DoT effect
    if (entity.dayNitEffect && entity.dayNitEffect.endsAt > this.now) {
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 4, 0, Math.PI * 2);
      ctx.stroke();

      const dotSec = Math.max(0, (entity.dayNitEffect.endsAt - this.now) / 1000).toFixed(1);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText(`💢 DÂY NỊT (-36% HP) ${dotSec}s`, ball.x, ball.y + 38);
      ctx.restore();
    }

    ctx.restore();
  }

  private renderHUD(ctx: CanvasRenderingContext2D) {
    ctx.save();

    if (this.is2v2 && this.p2 && this.e2) {
      const drawBar = (ent: Entity, x: number, y: number, w: number, h: number, name: string, col: string, isRight: boolean) => {
        const frac = Math.max(0, ent.hp / ent.maxHp);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = col;
        if (isRight) {
          ctx.fillRect(x + (w - 4) * (1 - frac) + 2, y + 2, (w - 4) * frac, h - 4);
        } else {
          ctx.fillRect(x + 2, y + 2, (w - 4) * frac, h - 4);
        }
        const cur = Math.max(0, Math.round(ent.hp));
        const lbl = ent.maxHp >= 1000000 ? `${name}: ${(cur / 1000000).toFixed(1)}M` : `${name}: ${cur.toLocaleString()}`;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        if (isRight) {
          ctx.textAlign = 'right';
          ctx.fillText(lbl, x + w, y + h + 10);
        } else {
          ctx.textAlign = 'left';
          ctx.fillText(lbl, x, y + h + 10);
        }
      };

      drawBar(this.p, 16, 8, 100, 8, 'BẠN 1 (XANH)', '#10b981', false);
      drawBar(this.p2, 122, 8, 100, 8, 'BẠN 2 (XANH)', '#06b6d4', false);
      drawBar(this.e2, this.width - 222, 8, 100, 8, 'ĐỊCH 2 (VÀNG)', '#eab308', true);
      drawBar(this.e, this.width - 116, 8, 100, 8, 'ĐỊCH 1 (VÀNG)', '#f43f5e', true);
    } else {
      // Player HP Bar (Left)
      const pFrac = Math.max(0, this.p.hp / this.p.maxHp);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(18, 14, 124, 12);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.strokeRect(18, 14, 124, 12);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(20, 16, 120 * pFrac, 8);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(20, 16, 120 * pFrac, 2);

      const pCurrent = Math.max(0, Math.round(this.p.hp));
      const pLabel = this.p.maxHp >= 1000000000
        ? `BẠN: ${(pCurrent / 1000000000).toFixed(1)} TỈ / ${(this.p.maxHp / 1000000000).toFixed(0)} TỈ HP`
        : (this.p.maxHp >= 1000000 
          ? `BẠN: ${(pCurrent / 1000000).toFixed(2)}M/${(this.p.maxHp / 1000000).toFixed(0)}M HP`
          : `BẠN: ${pCurrent.toLocaleString()} / ${this.p.maxHp.toLocaleString()} HP`);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(pLabel, 20, 39);

      // Enemy HP Bar (Right)
      const eFrac = Math.max(0, this.e.hp / this.e.maxHp);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(this.width - 142, 14, 124, 12);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.width - 142, 14, 124, 12);
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(this.width - 140 + 120 * (1 - eFrac), 16, 120 * eFrac, 8);
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(this.width - 140 + 120 * (1 - eFrac), 16, 120 * eFrac, 2);

      const eCurrent = Math.max(0, Math.round(this.e.hp));
      const eLabel = this.e.maxHp >= 1000000000
        ? `ĐỊCH: ${(eCurrent / 1000000000).toFixed(1)} TỈ / ${(this.e.maxHp / 1000000000).toFixed(0)} TỈ HP`
        : (this.e.maxHp >= 1000000 
          ? `ĐỊCH: ${(eCurrent / 1000000).toFixed(2)}M/${(this.e.maxHp / 1000000).toFixed(0)}M HP`
          : `ĐỊCH: ${eCurrent.toLocaleString()} / ${this.e.maxHp.toLocaleString()} HP`);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'right';
      ctx.fillText(eLabel, this.width - 20, 39);
    }

    // Combat Log at Bottom
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.fillRect(10, this.height - 34, this.width - 20, 24);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, this.height - 34, this.width - 20, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.logMessage, this.width / 2, this.height - 22);

    ctx.restore();
  }
}
