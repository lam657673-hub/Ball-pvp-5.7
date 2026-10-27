export type WeaponKey =
  | 'kiem'
  | 'riu'
  | 'khien'
  | 'cung'
  | 'no'
  | 'giao'
  | 'thuongthan'
  | 'railgun'
  | 'combo'
  | 'songkiem'
  | 'than_songkiem'
  | 'tamkiem'
  | 'cancau'
  | 'mace'
  | 'songthu'
  | 'minigun'
  | 'sangthe'
  | 'satna'
  | 'torch'
  | 'computer'
  | 'daynit'
  | 'stellar_remote'
  | 'upgraded_railgun'
  | string;

export interface WeaponDef {
  key: WeaponKey;
  name: string;
  dmg?: number;
  comboChance?: number;
  baseCooldown?: number;
  shieldPierce?: number;
  blockReduction?: number;
  isSpear?: boolean;
  isRailgun?: boolean;
  isUpgradedRailgun?: boolean;
  ultraLaserDmg?: number;
  imageSrc?: string;
  fireCycleMs?: number;
  beamDurationMs?: number;
  tickMs?: number;
  tickDmg?: number;
  isMace?: boolean;
  maceScale?: number;
  isDual?: boolean;
  isMinigun?: boolean;
  maxAmmo?: number;
  normalRate?: number;
  normalDmg?: number;
  heatRate?: number;
  heatDmg?: number;
  heatThreshold?: number;
  reloadMs?: number;
  isRangedMelee?: boolean;
  range?: number;
  rate?: number;
  burnDuration?: number;
  burnTickMs?: number;
  burnDmgPerTick?: number;
  isRitual?: boolean;
  cooldownMs?: number;
  isComboFist?: boolean;
  isBow?: boolean;
  isCrossbow?: boolean;
  isDualSwords?: boolean;
  isFishingRod?: boolean;
  isFusion?: boolean;
  fusionKeys?: [WeaponKey, WeaponKey];
  isTamKiem?: boolean;
  fusionTag?: string;
  fusionDesc?: string;
  isDayNit?: boolean;
  dayNitPercentHp?: number;
  dayNitDurationMs?: number;
  isStellarRemote?: boolean;
}

export interface MatchBattleStats {
  playerDamage: number;
  enemyDamage: number;
  playerSkillsUsed: number;
  enemySkillsUsed: number;
  playerHitsLanded: number;
  playerAttacksAttempted: number;
  enemyHitsLanded: number;
  enemyAttacksAttempted: number;
  matchDurationSec: number;
  winner: 'player' | 'enemy' | 'draw';
}

export interface UltraLaserState {
  active: boolean;
  charging: boolean;
  chargeStart: number;
  chargeDuration: number;
  sphereX: number;
  sphereY: number;
  targetX: number;
  targetY: number;
  fired: boolean;
  firedAt: number;
  speed: number;
  radius: number;
  dmg: number;
  attackerIsPlayer: boolean;
}

export interface DayNitEffect {
  attackerName: string;
  startedAt: number;
  endsAt: number;
  lastTick: number;
  tickInterval: number;
  dmgPerTick: number;
  totalDmg: number;
  remainingTicks: number;
}

export type QTEKey = 'W' | 'A' | 'S' | 'D';

export interface ComboQTEState {
  active: boolean;
  attackerIsPlayer: boolean;
  requiredKey: QTEKey;
  comboCount: number;
  startedAt: number;
  expiresAt: number;
  lastAiCheckAt?: number;
  statusText?: string;
  animPunchTime?: number;
}

export interface ComboWallCrash {
  active: boolean;
  victimIsPlayer: boolean;
  dmg: number;
}

export type ElementType = 'fire' | 'lightning' | 'poison' | 'shadow' | 'plant' | 'glitch';

export interface ElementData {
  type: ElementType;
  tier: number;
}

export type RoleType = 'survivalist' | 'admin' | 'werewolf' | 'sotan' | 'bathuong' | 'liubei' | 'than_liubei' | 'trieuvan' | 'than_trieuvan' | 'the_owner' | 'the_owner_7b' | null;

export type BaThuongSkillKey =
  | 'long_ngang_dau'
  | 'du_long_bai_vi'
  | 'ngoa_long_phien_dang'
  | 'than_long_na_di'
  | 'tiem_long_vat_dung'
  | 'long_nhan_hop_nhat';

export interface BaThuongDragonWave {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy?: number;
  radius: number;
  dmg: number;
  ownerIsPlayer: boolean;
  createdAt: number;
  lifetimeMs?: number;
  expiresAt?: number;
}

export interface BaThuongDrillProjectile {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  dmg: number;
  ownerIsPlayer: boolean;
  createdAt: number;
  lifetimeMs?: number;
  expiresAt?: number;
}

export interface BaThuongState {
  nextSkillAt: number;
  activeSkill: BaThuongSkillKey | null;
  skillPhase: 'idle' | 'active' | 'executing';
  skillStartAt: number;
  // Sub-skill variables:
  // 1. Long Ngẩng Đầu
  headSlamExecuted: boolean;
  // 2. Du Long Bái Vĩ (20 waves)
  baiViWavesSpawned: number;
  baiViLastSpawnAt: number;
  // 3. Ngọa Long Phiên Đăng (Drill)
  drillRotationAngle: number;
  drillLastDmgAt: number;
  drillRotationsCount: number;
  drillLastDrillShotAtRotation: number;
  // 4. Thần Long Na Di (3 dashes)
  naDiDashesLeft: number;
  naDiLastDashAt: number;
  // 5. Tiềm Long Vật Dụng (Throw weapon)
  tiemLongThrown: boolean;
  // 6. Long Nhân Hợp Nhất (Dragon-Human Form)
  isDragonHuman: boolean;
  dragonHumanLastHpTickAt: number;
}

export interface LuuBeiState {
  nextSkillAt: number;
  state: 'idle' | 'charging' | 'slash_fire' | 'slash_ice' | 'combo_finish' | 'fire_slash' | 'ice_slash';
  stepStartTime: number;
  targetLocked: boolean;
  frozenUntil: number;
  chargeStartAt?: number;
  slashStep?: number;
  lastStepAt?: number;
}

export interface SpearState {
  state: 'idle' | 'charging' | 'dashing' | 'ultra_dashing';
  nextReadyAt: number;
  chargeEndAt: number;
  lungeCount: number;
  ultraStartAt: number;
}

export interface MaceState {
  state: 'idle' | 'charging' | 'charged';
  nextReadyAt: number;
  chargeEndAt: number;
}

export interface RailgunState {
  nextFireAt: number;
  firing: boolean;
  fireEndsAt: number;
  lastTick: number;
}

export interface MinigunState {
  ammo: number;
  lastShotAt: number;
  reloading: boolean;
  reloadEndsAt: number;
  shotCount: number;
}

export interface RangedMeleeState {
  lastAtkAt: number;
}

export interface RitualRingsData {
  rotations: number[];
  lastHits: number[];
  taijiRot: number;
}

export interface RitualState {
  state: 'idle' | 'rings' | 'fire' | 'slash';
  nextReadyAt: number;
  phaseEndAt: number;
  rings: RitualRingsData | null;
  fireDir: { x: number; y: number } | null;
  fireLen: number;
  lastFireTick: number;
  slashDone: boolean;
  slashIndex: number;
  slashAngles: number[] | null;
}

export interface AdminState {
  nextSkillAt: number;
  buffActive: boolean;
  buffUntil: number;
  speedActive: boolean;
  speedUntil: number;
  freezeUntil: number;
  activeCommandText: string | null;
  commandDisplayUntil: number;
}

export interface WerewolfState {
  phase: 'day' | 'night';
  phaseStartAt: number;
  phaseEndAt: number;
}

export interface GlitchState {
  skillNextAt: number;
  comboActive: boolean;
  lockedUntil: number;
  stunnedUntil: number;
  handSlam?: {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    startAt: number;
    duration: number;
    slamDown: boolean;
  } | null;
}

export interface BeastActiveData {
  type: 'bach_ho' | 'chu_tuoc' | 'thanh_long' | 'huyen_vu';
  title: string;
  desc: string;
  spawnAt: number;
  duration: number;
  x: number;
  y: number;
}

export interface SoTanState {
  nextSkillAt: number;
  state: 'idle' | 'charging_rings' | 'dashing_smash';
  chargeStartAt: number;
  chargeDuration: number;
  ringsRot: number[];
  aimAngle: number;
  dashSpeed: number;
  targetX: number;
  targetY: number;
  huyenVuImmuneUntil: number;
  beastActive: BeastActiveData | null;
}

export interface DotEffect {
  dmgPerSec: number;
  endsAt: number;
  lastTick: number;
  poisonStacks?: number;
  type?: 'fire' | 'poison';
}

export interface ShadowClone {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hp: number;
  maxHp: number;
  ownerIsPlayer: boolean;
  color: string;
  createdAt: number;
  lastAtkAt: number;
}

export interface TorchBurnEffect {
  endsAt: number;
  tickMs: number;
  dmgPerTick: number;
  lastTick: number;
}

export interface MaceFlight {
  active: boolean;
  wallHits: number;
}

export interface SongKiemState {
  lastSlashAt: number;
  skillNextAt: number;
  comboActive: boolean;
  comboHitsLeft: number;
  totalComboHits: number;
  lastHitAt: number;
  targetLocked: boolean;
  dashStartTime: number;
  continuousChanceTriggered: boolean;
  // Skill 2: Nhất Quang (Giant Sword Light Wave)
  nhatQuangNextAt: number;
  isChargingNhatQuang: boolean;
  nhatQuangChargeStartTime: number;
}

export interface ActiveProjectile {
  id: string;
  type: 'arrow' | 'crossbow_bolt' | 'songkiem_slash' | 'songkiem_nhatquang' | 'tamkiem_slash' | 'tatsumaki_vortex' | string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  length: number;
  dmg: number;
  ownerIsPlayer: boolean;
  pierceShield?: boolean;
  color: string;
  createdAt: number;
  lifetimeMs: number;
  slashIndex?: number;
}

export interface HolySlashEffect {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export interface CanCauState {
  nextHookAt: number;
  state: 'idle' | 'throwing' | 'pulling' | 'smashing';
  hookStartTime: number;
  hookX: number;
  hookY: number;
  targetLocked: boolean;
  lineTension: number;
}

export interface TamKiemState {
  // Zoro Santoryu special abilities
  lastSlashAt?: number;
  sanzenSekaiNextAt: number;
  isSanzenSekai: boolean;
  sanzenSekaiStartTime: number;
  sanzenSekaiHitsLeft: number;
  sanzenSekaiLastHitAt: number;
  tatsumakiNextAt: number;
  isTatsumaki: boolean;
  tatsumakiStartTime: number;
  tatsumakiDuration: number;
  asuraAuraActive: boolean;
}

export interface Entity {
  hp: number;
  maxHp: number;
  weapon: WeaponDef;
  element: ElementData | null;
  role: RoleType;
  nextAtkAt: number;
  rootedUntil: number;
  dot: DotEffect | null;
  torchBurn: TorchBurnEffect | null;
  maceFlight: MaceFlight;
  spear?: SpearState;
  mace?: MaceState;
  railgun?: RailgunState;
  minigun?: MinigunState;
  rangedMelee?: RangedMeleeState;
  ritual?: RitualState;
  admin?: AdminState;
  werewolfBase?: number;
  werewolf?: WerewolfState;
  glitch?: GlitchState;
  sotan?: SoTanState;
  songkiem?: SongKiemState;
  tamkiem?: TamKiemState;
  bathuong?: BaThuongState;
  liubei?: LuuBeiState;
  cancau?: CanCauState;
  theOwner?: TheOwnerState;
  dayNitEffect?: DayNitEffect | null;
  dayNitStunUntil?: number;
  weaponRecoil: number; // for recoil swing animation
  id?: string;
  name?: string;
  team?: 'blue' | 'red';
  isDead?: boolean;
  synergyThienHa?: boolean;
  synergyDongNghiep?: boolean;
  synergyTuyetTheAnhHung?: boolean;
  synergySongThanGiangThe?: boolean;
  dongNghiepShieldUntil?: number;
  dongNghiepRescued?: boolean;
  colleagueShieldUntil?: number;
  hasUsedColleagueSave?: boolean;
  isEnragedSoTan?: boolean;
  lienKichChance?: number;
  truyKichChance?: number;
  lastTruyKichAt?: number;
  lastLuuBeiHealAt?: number;
  lastNhaiGiacAt?: number;
  lastTrieuDinhAt?: number;
}

export interface NhaiGiacLuuTinhTramAnimation {
  active: boolean;
  attackerEntity: Entity;
  attackerBall: Ball;
  targetEntity: Entity;
  targetBall: Ball;
  stage: 'spinning' | 'spear_drop' | 'explosion' | 'final_thrust' | 'done';
  startTime: number;
  stageStartTime: number;
  spinHitCount: number;
  lastSpinHitTime: number;
  spearDropX: number;
  spearDropY: number;
  spearCurrentY: number;
  explosionRadius: number;
}

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  borderColor: string;
  id?: string;
  name?: string;
  team?: 'blue' | 'red';
}

export interface GlitchTrail {
  x: number;
  y: number;
  ownerIsPlayer: boolean;
  createdAt: number;
  lastEnemyTick: number;
  lastSelfTick: number;
}

export interface ActiveCrack {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  attackerIsPlayer: boolean;
  createdAt: number;
  lastTick: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  type?: 'dot' | 'shard';
  rot?: number;
  rotSpeed?: number;
}

export interface ExpandingRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  thickness: number;
  life: number;
  maxLife: number;
  isFilled?: boolean;
}

export interface ActiveFissure {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  createdAt: number;
  expiresAt: number;
  lastDotTick: number;
  ownerIsPlayer: boolean;
  isStraight?: boolean;
  colorTheme?: 'golden' | 'rainbow' | 'emerald';
  remainingDmgPool?: number;
  isPermanentUntilDepleted?: boolean;
}

export interface NhatDieuHoangKimState {
  active: boolean;
  phase: 'charging' | 'smash';
  startTime: number;
  chargeDuration: number;
  ringsRot: number[];
  ringsRadii: number[];
  targetLocked: boolean;
  attackerIsPlayer: boolean;
}

export interface PhiThienVoCucDieuState {
  active: boolean;
  startTime: number;
  duration: number;
  lastTickAt: number;
  ringsRot: number[];
  tornadoAngle: number;
  attackerIsPlayer: boolean;
}

export interface ToanThienThauChiDieuState {
  active: boolean;
  phase: 'homing' | 'pinned';
  startTime: number;
  drillX: number;
  drillY: number;
  drillRot: number;
  targetX: number;
  targetY: number;
  lastTickAt: number;
  pinnedUntil: number;
  attackerIsPlayer: boolean;
}

export interface TheOwnerState {
  omniWeaponActive: boolean;
  omniWeaponUntil: number;
  lastOmniAttackAt: number;
  weaponsOrbitRot: number;
  godModeActive: boolean;
  meltAccumulator?: number;
}

export interface TowerDefenseMob {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  radius: number;
  speed: number;
  goldValue: number;
  wave: number;
}

export interface TowerDefenseState {
  active: boolean;
  wave: number;
  gateHp: number;
  maxGateHp: number;
  mobs: TowerDefenseMob[];
  lastSpawnAt: number;
  spawnIntervalMs: number;
  mobsKilled: number;
  totalCoinsEarned: number;
  waveStartTime: number;
  isGameOver: boolean;
  isVictory: boolean;
}

export interface NhatDieuToiCaoState {
  active: boolean;
  phase: 'charging' | 'smash';
  startTime: number;
  chargeDuration: number;
  ringsRot: number[];
  ringsRadii: number[];
  targetLocked: boolean;
  attackerIsPlayer: boolean;
}

export interface SoTanDieuState {
  active: boolean;
  phase: 'timestop' | 'domain' | 'slashing';
  startTime: number;
  lastSlashAt: number;
  slashCount: number;
  domainEndTime: number;
}

export interface LongHonDoanHaiState {
  active: boolean;
  phase: 'cutscene' | 'flight' | 'smash';
  startTime: number;
  zigZagIdx: number;
  lastZigZagAt: number;
  targetX: number;
  targetY: number;
  smashStartAt?: number;
}

export interface LongHonDoanHaiFireOrb {
  id: string;
  x: number;
  y: number;
  radius: number;
  createdAt: number;
  expiresAt: number;
  lastDotTick: number;
  ownerIsPlayer: boolean;
  hasSpawnedPillar?: boolean;
}

export interface LongHonDoanHaiFirePillar {
  id: string;
  x: number;
  y: number;
  radius: number;
  createdAt: number;
  expiresAt: number;
  lastDotTick: number;
  ownerIsPlayer: boolean;
}

export interface TranQuocSwordState {
  active: boolean;
  team: 'blue' | 'red';
  x: number;
  y: number;
  targetY: number;
  startTime: number;
  duration: number;
  hasStruck: boolean;
}

export type StellarSkillKey =
  | 'ss01_railgun'
  | 'ss02_the_sun'
  | 'ss03_gungir'
  | 'ss04_seven_star'
  | 'ss05_tesseract'
  | 'ss06_halley'
  | 'ss21_quasar'
  | 'event_horizon'
  | 'neutron_star'
  | 'ss_final_big_bang';

export interface StellarTheSunFx {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export interface StellarBigBangFx {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export interface StellarEventHorizonState {
  active: boolean;
  phase: 'vortex' | 'implosion';
  x: number;
  y: number;
  startTime: number;
  durationMs: number;
  lastPullAt: number;
  targetX: number;
  targetY: number;
  dmg: number;
  attackerIsPlayer: boolean;
}

export interface StellarNeutronStarState {
  active: boolean;
  x: number;
  y: number;
  startTime: number;
  durationMs: number;
  directDmg: number;
  dotDmg: number;
  lastDotAt: number;
  dotIntervalMs: number;
  dotEndsAt: number;
  attackerIsPlayer: boolean;
  radius: number;
}

export interface StellarCutsceneState {
  active: boolean;
  skillKey: StellarSkillKey;
  phase: string;
  startTime: number;
  targetX: number;
  targetY: number;
  attackerIsPlayer: boolean;
  subStep?: number;
  lastSubStepAt?: number;
  data?: any;
}

export interface StellarOrbitalBeamState {
  active: boolean;
  targetX: number;
  targetY: number;
  startTime: number;
  durationMs: number;
  lastTickAt: number;
  tickIntervalMs: number;
  dmgPerTick: number;
  attackerIsPlayer: boolean;
}

export interface StellarGungnirDoTState {
  active: boolean;
  startTime: number;
  durationMs: number;
  lastTickAt: number;
  tickIntervalMs: number;
  dmgPerTick: number;
  ticksRemaining: number;
  attackerIsPlayer: boolean;
}

export interface StellarSevenStarState {
  active: boolean;
  phase: 'charging' | 'meteors' | 'unison_dive';
  startTime: number;
  meteorIndex: number;
  firstStarIndex?: number;
  currentStarIndex?: number;
  chargedUntil?: number;
  loopCount?: number;
  lastMeteorAt: number;
  targetX: number;
  targetY: number;
  attackerIsPlayer: boolean;
}

export interface StellarTesseractStrikeState {
  active: boolean;
  phase: 'pulses' | 'final_spin';
  startTime: number;
  pulseCount: number;
  lastPulseAt: number;
  targetX: number;
  targetY: number;
  attackerIsPlayer: boolean;
}

export interface StellarQuasarState {
  active: boolean;
  targetX: number;
  targetY: number;
  startTime: number;
  durationMs: number; // 20000ms (20s)
  lastTickAt: number;
  tickIntervalMs: number; // 200ms (0.2s)
  dmgPerTick: number; // 300 * mult
  finalExploded: boolean;
  attackerIsPlayer: boolean;
}

export interface StellarHalleyFx {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export interface GameSetupOptions {
  playerHp: number;
  playerWeaponKey: WeaponKey;
  enemyWeaponKey: WeaponKey | 'random';
  playerElementKey: string | null;
  enemyElementKey?: string | 'random' | null;
  playerRole: RoleType;
  enemyRole?: RoleType;
  isSandbox?: boolean;
  selectedMap?: 'standard' | 'sandbox' | 'tower_defense';
  isTowerDefense?: boolean;
  // 2v2 Mode options
  is2v2?: boolean;
  player2WeaponKey?: WeaponKey;
  player2ElementKey?: string | null;
  player2Role?: RoleType;
  enemy2WeaponKey?: WeaponKey | 'random';
  enemy2ElementKey?: string | 'random' | null;
  enemy2Role?: RoleType;
}
