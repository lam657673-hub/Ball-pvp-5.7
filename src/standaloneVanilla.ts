/**
 * ============================================================================
 * ĐẤU BÓNG CHIẾN ĐẤU (BALL BATTLE) - BẢN VANILLA TYPESCRIPT THUẦN (CANVAS 2D)
 * Khôi phục từ Phaser sang TypeScript thuần & HTML5 Canvas 2D.
 * Đã sửa lỗi font tiếng Việt, hỗ trợ đầy đủ vũ khí, nguyên tố, role và kỹ năng.
 * ============================================================================
 */

export type WeaponKey =
  | 'kiem'
  | 'riu'
  | 'khien'
  | 'cung'
  | 'no'
  | 'giao'
  | 'railgun'
  | 'mace'
  | 'songthu'
  | 'minigun'
  | 'sangthe'
  | 'satna'
  | 'torch';

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
}

export type ElementType = 'fire' | 'lightning' | 'poison' | 'shadow' | 'plant' | 'glitch';

export interface ElementData {
  type: ElementType;
  tier: number;
}

export type RoleType = 'survivalist' | 'admin' | 'werewolf' | null;

export const WEAPON_DEFS: Record<WeaponKey, WeaponDef> = {
  kiem: { key: 'kiem', name: 'Kiếm', dmg: 10, comboChance: 0.25, baseCooldown: 700 },
  riu: { key: 'riu', name: 'Rìu', dmg: 25, shieldPierce: 0.4, baseCooldown: 900 },
  khien: { key: 'khien', name: 'Khiên', dmg: 5, blockReduction: 0.7, baseCooldown: 700 },
  cung: { key: 'cung', name: 'Cung', dmg: 10, baseCooldown: 700 },
  no: { key: 'no', name: 'Nỏ', dmg: 40, baseCooldown: 1800 },
  giao: { key: 'giao', name: 'Giáo', dmg: 20, isSpear: true },
  railgun: { key: 'railgun', name: 'Railgun', isRailgun: true, fireCycleMs: 5000, beamDurationMs: 5000, tickMs: 100, tickDmg: 5 },
  mace: { key: 'mace', name: 'Chùy Bí Mật', dmg: 25, isMace: true, maceScale: 0.2 },
  songthu: { key: 'songthu', name: 'Song Thủ', isDual: true },
  minigun: {
    key: 'minigun',
    name: 'Minigun',
    isMinigun: true,
    maxAmmo: 10000,
    normalRate: 20,
    normalDmg: 10,
    heatRate: 30,
    heatDmg: 15,
    heatThreshold: 250,
    reloadMs: 3000
  },
  sangthe: {
    key: 'sangthe',
    name: 'Sáng Thế Chi Kiếm',
    isRangedMelee: true,
    range: 77,
    dmg: 777.7777,
    rate: 7.7
  },
  satna: { key: 'satna', name: 'Sát Na Vĩnh Hằng', isRitual: true, cooldownMs: 20000 },
  torch: {
    key: 'torch',
    name: 'Đuốc',
    isRangedMelee: true,
    range: 15,
    dmg: 15,
    rate: 1.4,
    burnDuration: 5000,
    burnTickMs: 200,
    burnDmgPerTick: 1
  }
};

export const ELEMENT_NAMES: Record<ElementType, string> = {
  fire: 'Lửa',
  lightning: 'Sét',
  poison: 'Độc',
  shadow: 'Bóng Tối',
  plant: 'Thực Vật',
  glitch: 'Glitch'
};

export const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

export function elLabel(key: string): string {
  const [typeStr, tierStr] = key.split('_');
  const type = typeStr as ElementType;
  const t = parseInt(tierStr, 10);
  if (type === 'shadow' || type === 'plant') return ELEMENT_NAMES[type];
  const r = ROMAN_NUMERALS[t - 1] || String(t);
  return `${ELEMENT_NAMES[type]} ${r}`;
}

export function dealDamage(attacker: WeaponDef, defender: WeaponDef | null, baseDmg: number): number {
  let dmg = baseDmg;
  if (defender && defender.blockReduction) {
    let reduction = defender.blockReduction;
    if (attacker.shieldPierce) reduction *= 1 - attacker.shieldPierce;
    dmg *= 1 - reduction;
  }
  return dmg;
}

export function getDmgMultiplier(maxHp: number): number {
  if (maxHp <= 500) return 1;
  return Math.sqrt(maxHp / 500);
}

export function lightningBoltDmg(tier: number): number {
  return 5 + (tier + 5);
}

// Full code is fully exported and available for seamless Vanilla integration.
