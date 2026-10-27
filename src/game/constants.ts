import { WeaponDef, WeaponKey, ElementType, ElementData } from './types';

export const WEAPON_DEFS: Record<WeaponKey, WeaponDef> = {
  kiem: { key: 'kiem', name: 'Kiếm', dmg: 10, comboChance: 0.25, baseCooldown: 700 },
  riu: { key: 'riu', name: 'Rìu', dmg: 25, shieldPierce: 0.4, baseCooldown: 900 },
  khien: { key: 'khien', name: 'Khiên', dmg: 5, blockReduction: 0.7, baseCooldown: 700 },
  cung: { key: 'cung', name: 'Cung', dmg: 16, baseCooldown: 700, isBow: true },
  no: { key: 'no', name: 'Nỏ', dmg: 45, baseCooldown: 1800, isCrossbow: true, shieldPierce: 0.5 },
  giao: { key: 'giao', name: 'Giáo', dmg: 20, isSpear: true },
  railgun: { key: 'railgun', name: 'Railgun', isRailgun: true, fireCycleMs: 5000, beamDurationMs: 5000, tickMs: 100, tickDmg: 5 },
  upgraded_railgun: {
    key: 'upgraded_railgun',
    name: 'Railgun Nâng Cấp',
    dmg: 25,
    isRailgun: true,
    isUpgradedRailgun: true,
    fireCycleMs: 3000,
    beamDurationMs: 5000,
    tickMs: 100,
    tickDmg: 25,
    ultraLaserDmg: 1000,
    imageSrc: '/assets/aistudio/image_66175253.png',
    fusionTag: '⚡ TIẾN HÓA VŨ KHÍ TỐI THƯỢNG',
    fusionDesc: '⚡ UPGRADED RAILGUN: Dmg x5 (25 DMG/0.1s), tốc độ nạp nhanh 3s, tia laser to hơn, sức mạnh áp đảo khi solo với Railgun thường (+100% đẩy quả cầu clash và giảm 50% sát thương laser thường). Tuyệt kỹ độc quyền [Ultra Laser]: Tích đòn phóng siêu cầu nổ gây 1.000 DMG!'
  },
  combo: { key: 'combo', name: 'Song Quyền Combo', dmg: 5, isComboFist: true, baseCooldown: 900 },
  songkiem: { key: 'songkiem', name: 'Song Kiếm', dmg: 5, isDualSwords: true, baseCooldown: 333 },
  mace: { key: 'mace', name: 'Chùy Bí Mật', dmg: 25, isMace: true, maceScale: 0.2 },
  songthu: { key: 'songthu', name: 'Song Thủ', isDual: true },
  minigun: {
    key: 'minigun',
    name: 'Minigun',
    isMinigun: true,
    maxAmmo: 100,
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
    range: 140,
    dmg: 777.7777,
    rate: 6.0
  },
  satna: { key: 'satna', name: 'Sát Na Vĩnh Hằng', isRitual: true, cooldownMs: 20000 },
  cancau: {
    key: 'cancau',
    name: 'Cần Câu',
    dmg: 20,
    baseCooldown: 500
  },
  torch: {
    key: 'torch',
    name: 'Đuốc',
    isRangedMelee: true,
    range: 95,
    dmg: 22,
    rate: 2.0,
    burnDuration: 5000,
    burnTickMs: 200,
    burnDmgPerTick: 2
  },
  tamkiem: {
    key: 'tamkiem',
    name: 'Tam Kiếm (Santoryu - Zoro)',
    dmg: 25,
    comboChance: 0.35,
    baseCooldown: 300,
    isDualSwords: true,
    isTamKiem: true,
    isFusion: true,
    fusionKeys: ['kiem', 'songkiem'],
    fusionTag: 'ZORO SANTORYU',
    fusionDesc: 'Vũ khí Fusion Thần Thoại từ Kiếm & Song Kiếm phong cách Roronoa Zoro One Piece! Mang 3 thanh kiếm (Wado Ichimonji ngậm miệng + Sandai Kitetsu & Enma), sở hữu trọn vẹn sức mạnh cả 2 vũ khí: Kiếm Khí Tam Luồng, Chém Liên Kích, Nhất Quang Trảm và Tuyệt Kỹ Tam Thiên Thế Giới!'
  },
  computer: {
    key: 'computer',
    name: 'Máy Tính Hacker (The Owner)',
    dmg: 777,
    comboChance: 0.5,
    baseCooldown: 300,
    fusionTag: 'THE OWNER WEAPON',
    fusionDesc: '💻 Vũ khí tối thượng của The Owner Game: Mỗi đòn đánh ngẫu nhiên biến hóa ra vũ khí hoặc kỹ năng khác nhau! Chiêu tối thượng Vạn Vũ Khí Quy Tông!'
  },
  daynit: {
    key: 'daynit',
    name: 'Dây Nịt Tử Thần (The Owner)',
    dmg: 77,
    comboChance: 0.35,
    baseCooldown: 5000,
    isDayNit: true,
    isRangedMelee: true,
    range: 280,
    dayNitPercentHp: 0.36179,
    dayNitDurationMs: 5000,
    fusionTag: '👑 THE OWNER EXCLUSIVE',
    fusionDesc: '👑 VŨ KHÍ ĐẶC QUYỀN THE OWNER: Chỉ người có đặc quyền The Owner mới dùng được! Cứ 5s mới quất 1 lần phạm vi khổng lồ (AoE 280px)! Mỗi cú quất (1 hit) rút 36,179% Max HP trong 5s liên tục + 50% tỉ lệ gây hiệu ứng "Đau Đớn Tột Cùng" (Choáng tê tái 3.5s)!'
  },
  thuongthan: {
    key: 'thuongthan',
    name: 'Thương Thần (Long Đảm Thương)',
    dmg: 45,
    baseCooldown: 400,
    isSpear: true,
    fusionTag: 'TIẾN HÓA THẦN THOẠI',
    fusionDesc: '⚡ THƯƠNG THẦN: Tiến hóa tối thượng từ Giáo Chiến sau 20 trận thắng cùng Triệu Vân! Uy lực vô song, khi kết hợp với Triệu Vân sẽ tiến hóa thành THẦN-TRIỆU VÂN!'
  },
  than_songkiem: {
    key: 'than_songkiem',
    name: 'Thần Song Kiếm (Long Phụng Cặp Kiếm)',
    dmg: 7, // 5 * 1.3679 = 6.84 ~ 7
    baseCooldown: 200, // 5 nhát/s (1000ms / 5)
    isDualSwords: true,
    comboChance: 0.35,
    fusionTag: 'TIẾN HÓA THẦN THOẠI',
    fusionDesc: '⚔️ THẦN SONG KIẾM: Tiến hóa từ Song Kiếm sau 20 trận thắng cùng Lưu Bị! Tốc độ trảm kích cực hạn 5 nhát/giây, skill DMG x1.4 và Tuyệt kỹ "Triều Đình Trợ Ta Khôi Phục" hồi 30% Max HP!'
  },
  stellar_remote: {
    key: 'stellar_remote',
    name: 'Stellar Remote (Vệ Tinh Không Gian)',
    dmg: 0,
    baseCooldown: 1000,
    isStellarRemote: true,
    fusionTag: '🛰️ VỆ TINH VŨ TRỤ',
    fusionDesc: '🛰️ VŨ KHÍ TỐI CAO VỆ TINH QUỸ ĐẠO: Nhận sau 1000 trận thắng Railgun vs Railgun không buff! Hệ số HP Mul cân bằng (ví dụ 100k HP = x1.5). Click mở Menu Vệ Tinh 7 Siêu Tuyệt Kỹ: SS-01 Railgun, SS-03 Gungir, SS-04 Seven Star, SS-05 Tesseract, SS-06 Halley, SS-021 Quasar, và Tuyệt Kỹ mới SS-07 EVENT HORIZON (Hội tụ năng lượng tím vào đỉnh lỗ đen rơi xuống sàn hút đối thủ & nổ sụp đổ chân trời sự kiện)!'
  }
};

export const NORMAL_KEYS: WeaponKey[] = ['kiem', 'riu', 'khien', 'cung', 'no', 'giao', 'combo'];
export const SECRET_KEYS: WeaponKey[] = ['cancau', 'songkiem', 'than_songkiem', 'thuongthan', 'tamkiem', 'railgun', 'upgraded_railgun', 'mace', 'songthu', 'torch', 'minigun', 'satna', 'sangthe', 'computer', 'daynit', 'stellar_remote'];

export interface ShopWeaponItem {
  key: WeaponKey;
  name: string;
  price: number;
  desc: string;
  isFree?: boolean;
  isDevOnly?: boolean;
  isOwnerOnly?: boolean;
  unlockKey: string;
  tag: string;
  imageSrc?: string;
}

export const SHOP_WEAPONS: ShopWeaponItem[] = [
  { key: 'kiem', name: 'Kiếm', price: 0, isFree: true, unlockKey: 'free', desc: 'Vũ khí cơ bản cân bằng, đòn đánh nhanh với 25% chém liên kích.', tag: 'MIỄN PHÍ' },
  { key: 'riu', name: 'Rìu Chiến', price: 0, isFree: true, unlockKey: 'free', desc: 'Sát thương cực mạnh 25 DMG, xuyên 40% giáp khiên đối thủ.', tag: 'MIỄN PHÍ' },
  { key: 'khien', name: 'Khiên Chiến', price: 0, isFree: true, unlockKey: 'free', desc: 'Phòng thủ kiên cố, giảm 70% sát thương từ đòn đánh thường.', tag: 'MIỄN PHÍ' },
  { key: 'cung', name: 'Cung Tên', price: 0, isFree: true, unlockKey: 'free', desc: 'Bắn mũi tên khí động học 16 DMG từ khoảng cách xa.', tag: 'MIỄN PHÍ' },
  { key: 'no', name: 'Nỏ Thép', price: 0, isFree: true, unlockKey: 'free', desc: 'Nạp đạn bắn nỏ thép 45 DMG cực mạnh, xuyên 50% khiên.', tag: 'MIỄN PHÍ' },
  { key: 'giao', name: 'Giáo Chiến', price: 0, isFree: true, unlockKey: 'free', desc: 'Tích tụ sức mạnh lao đâm 3 nhát liên hoàn hoặc Ultra Dash.', tag: 'MIỄN PHÍ' },
  { key: 'combo', name: 'Song Quyền', price: 0, isFree: true, unlockKey: 'free', desc: 'Hệ thống đấm combo QTE phản xạ 4 hướng chấn động.', tag: 'MIỄN PHÍ' },
  { key: 'cancau', name: 'Cần Câu', price: 200, unlockKey: 'cancau_unlocked', desc: 'Móc Lưỡi tầm xa 10 DMG -> Kéo về -> Bồi đòn đập 20 DMG hất văng đập tường!', tag: 'VŨ KHÍ MỚI' },
  { key: 'songkiem', name: 'Song Kiếm', price: 250, unlockKey: 'songkiem_unlocked', desc: 'Phóng kiếm khí 3 lần/s + Tụ khí Nhất Quang 30 DMG xuyên sàn đấu!', tag: 'VŨ KHÍ MỚI' },
  { key: 'tamkiem', name: 'Tam Kiếm (Santoryu)', price: 10000, unlockKey: 'tamkiem_unlocked', desc: '👑 FUSION THẦN THOẠI: Kiếm + Song Kiếm (Zoro One Piece)! Sức mạnh cả 2 vũ khí + Tuyệt kỹ Tam Thiên Thế Giới & Đại Lốc Xoáy Rồng!', tag: 'FUSION ZORO' },
  { key: 'railgun', name: 'Railgun', price: 300, unlockKey: 'railgun_unlocked', desc: 'Tia laser hủy diệt 5s + Cơ chế chùm tia đối đầu Railgun Clash!', tag: 'CÔNG NGHỆ' },
  { key: 'upgraded_railgun', name: 'Railgun Nâng Cấp (Upgraded Railgun)', price: 500, unlockKey: 'upgraded_railgun_unlocked', desc: '⚡ TIẾN HÓA RAILGUN: Dmg x5 (25 DMG/0.1s), nạp siêu tốc 3s, tia laser to hơn, áp chế Railgun thường + Tuyệt kỹ Ultra Laser tích cầu nổ 1.000 DMG!', tag: '⚡ SIÊU VŨ KHÍ', imageSrc: '/assets/aistudio/image_66175253.png' },
  { key: 'torch', name: 'Đuốc Lửa', price: 200, unlockKey: 'torch_unlocked', desc: 'Quét lửa thiêu đốt đối thủ trong 5 giây liên tục (2 DMG/0.2s).', tag: 'ẨN' },
  { key: 'mace', name: 'Chùy Gai Khổng Lồ', price: 350, unlockKey: 'mace_unlocked', desc: 'Tích lực gõ choáng và quăng đối thủ bay vào tường cực mạnh.', tag: 'ẨN' },
  { key: 'songthu', name: 'Song Thủ', price: 300, unlockKey: 'songthu_unlocked', desc: 'Trang bị kết hợp Giáo Chiến lao đâm và Chùy Bí Mật.', tag: 'ẨN' },
  { key: 'minigun', name: 'Minigun Gatling', price: 400, unlockKey: 'minigun_unlocked', desc: 'Xả 20-30 viên đạn liên thanh, bùng nổ quá nhiệt sấm sét!', tag: 'BÍ MẬT' },
  { key: 'satna', name: 'Sát Na Vĩnh Hằng', price: 600, unlockKey: 'satna_unlocked', desc: 'Đại cổ thuật 4 giai đoạn hội tụ ma thuật nổ tung sàn đấu.', tag: 'TỐI THƯỢNG' },
  { key: 'sangthe', name: 'Sáng Thế Chi Kiếm', price: 0, isDevOnly: true, unlockKey: 'dev_nntl_unlocked', desc: '👑 VŨ KHÍ TỐI CAO ĐỘC QUYỀN: Chỉ dành riêng cho Nhà Phát Triển NNTL (777.7777 DMG)!', tag: 'DEV NNTL' },
  { key: 'computer', name: 'Máy Tính Hacker (The Owner)', price: 0, isFree: true, unlockKey: 'computer_unlocked', desc: '💻 VŨ KHÍ TỐI THƯỢNG THE OWNER GAME: Biến hóa vạn loại vũ khí và tuyệt kỹ Vạn Vũ Khí Quy Tông!', tag: 'THE OWNER' },
  { key: 'daynit', name: 'Dây Nịt Tử Thần (The Owner)', price: 0, isOwnerOnly: true, unlockKey: 'daynit_unlocked', desc: '👑 VŨ KHÍ ĐẶC QUYỀN THE OWNER: Chỉ người có đặc quyền The Owner mới dùng được! 1 hit = 36,179% Max HP trong 5s!', tag: 'THE OWNER ONLY' },
  { key: 'thuongthan', name: 'Thương Thần (Long Đảm)', price: 0, unlockKey: 'thuong_than_unlocked', desc: '🔱 TIẾN HÓA THẦN THOẠI: Tiến hóa từ Giáo Chiến sau 20 trận thắng với Triệu Vân! Kết hợp với Triệu Vân thành THẦN-TRIỆU VÂN (+30% HP, +50% DMG, +25% Liên Kích, +25% Truy Kích, Tuyệt Kỹ Nhai Giác Lưu Tinh Trảm)!', tag: 'TIẾN HÓA THẦN' },
  { key: 'than_songkiem', name: 'Thần Song Kiếm (Long Phụng)', price: 0, unlockKey: 'than_songkiem_unlocked', desc: '⚔️ TIẾN HÓA THẦN THOẠI: Tiến hóa từ Song Kiếm sau 20 trận thắng với Lưu Bị! Chỉ số x1.3679, 5 chém/s, x1.4 Skill DMG & Tuyệt Kỹ Triều Đình Trợ Ta Khôi Phục (+30% Max HP)!', tag: 'TIẾN HÓA THẦN' },
  { key: 'stellar_remote', name: 'Stellar Remote (Vệ Tinh Không Gian)', price: 0, unlockKey: 'stellar_remote_unlocked', desc: '🛰️ VŨ KHÍ TỐI CAO VỆ TINH: Thắng 1000 trận Railgun đối đầu ko buff! Không đánh thường, click mở Menu 4 Siêu Tuyệt Kỹ Vũ Trụ: SS-01 Railgun (30.000 DMG/15s), SS-03 Gungir (15.000 + 25.000 DoT bom Sa Hoàng), SS-04 Seven Star (7 sao nạp chuyền & nổ 5.000 DMG x7 + 15.000 DMG), SS-05 Tesseract (Cổng 4D nổ 5 lần 6.500 DMG + 20.000 DMG)!', tag: '🛰️ 1000 WIN RAILGUN' }
];

export function normalizeVietnamese(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function isDeveloperNNTL(input: string): boolean {
  if (!input) return false;
  const raw = input.trim().toLowerCase();
  const normalized = normalizeVietnamese(input);
  const cleanAlphaNumeric = normalized.replace(/[^a-z0-9]/g, '');

  if (raw === 'nntl' || raw === 'dev_nntl' || raw === 'developer_nntl' || raw === 'dev_nguyenngocthienlong') return true;
  if (cleanAlphaNumeric === 'nntl' || cleanAlphaNumeric === 'devnntl' || cleanAlphaNumeric === 'developernntl') return true;
  if (cleanAlphaNumeric === 'nguyenngocthienlong' || cleanAlphaNumeric === 'devnguyenngocthienlong') return true;
  if (cleanAlphaNumeric.includes('nguyenngocthienlong') || cleanAlphaNumeric === 'nntl') return true;
  if (normalized.includes('nguyen ngoc thien long') || normalized.includes('nntl')) return true;
  return false;
}

// Song Kiếm Constants
export const SONGKIEM_SLASH_SPEED = 560;
export const SONGKIEM_SLASH_RANGE = 500;
export const SONGKIEM_COMBO_COOLDOWN = 10000;
export const SONGKIEM_COMBO_HITS = 6;
export const SONGKIEM_COMBO_HIT_DMG = 7.5;
export const SONGKIEM_CONTINUE_CHANCE = 0.10;
export const SONGKIEM_DASH_SPEED = 850;
export const SONGKIEM_HIT_INTERVAL = 130;

// Skill 2: Nhất Quang (Giant Sword Light Wave)
export const SONGKIEM_NHATQUANG_COOLDOWN = 12000;
export const SONGKIEM_NHATQUANG_CHARGE_MS = 1600;
export const SONGKIEM_NHATQUANG_DMG = 30;
export const SONGKIEM_NHATQUANG_SPEED = 620;
export const SONGKIEM_NHATQUANG_RADIUS = 68;

// Fusion Weapon Constants
export const FUSION_COST = 10000; // Mỗi lần fusion tốn đúng 10.000 xu theo yêu cầu người dùng
export const TAMKIEM_SANZEN_COOLDOWN = 12000;
export const TAMKIEM_SANZEN_DMG = 180;
export const TAMKIEM_SANZEN_HITS = 15;
export const TAMKIEM_TATSUMAKI_COOLDOWN = 10000;
export const TAMKIEM_TATSUMAKI_DMG = 100;

export interface FusionRecipeDef {
  key1: WeaponKey;
  key2: WeaponKey;
  resultKey: string;
  resultName: string;
  tag: string;
  desc: string;
  isSpecial?: boolean;
}

export const POPULAR_FUSION_RECIPES: FusionRecipeDef[] = [
  {
    key1: 'kiem',
    key2: 'songkiem',
    resultKey: 'tamkiem',
    resultName: 'Tam Kiếm (Santoryu - Zoro)',
    tag: '👑 THẦN THOẠI',
    desc: 'Hợp thể từ Kiếm + Song Kiếm theo phong cách Roronoa Zoro One Piece! Mang 3 thanh kiếm (ngậm Wado Ichimonji trong miệng + 2 tay cầm Sandai Kitetsu & Enma). Sở hữu toàn bộ sức mạnh cả 2 vũ khí: Kiếm khí 3 luồng, Chém liên kích, Nhất Quang và Tuyệt Kỹ Tam Thiên Thế Giới (Sanzen Sekai)!',
    isSpecial: true
  },
  {
    key1: 'cung',
    key2: 'no',
    resultKey: 'fusion_cung_no',
    resultName: 'Thần Nỏ Liên Hoàn (Bow & Crossbow)',
    tag: '⚡ TẦM XA',
    desc: 'Kết hợp Cung và Nỏ: Vừa xả mưa tên liên tiếp vừa bắn nỏ thép xuyên 50% giáp cực mạnh!'
  },
  {
    key1: 'khien',
    key2: 'riu',
    resultKey: 'fusion_khien_riu',
    resultName: 'Khiên Rìu Chiến Thần (Axe & Shield)',
    tag: '🛡️ CÔNG THỦ',
    desc: 'Kết hợp Rìu và Khiên: Chém 30 DMG, xuyên 40% giáp khiên và giảm tới 70% sát thương nhận vào!'
  },
  {
    key1: 'railgun',
    key2: 'minigun',
    resultKey: 'fusion_minigun_railgun',
    resultName: 'Đại Pháo Photon Gatling',
    tag: '💥 HỦY DIỆT',
    desc: 'Kết hợp Railgun và Minigun: Vừa bắn tia laser photon hủy diệt 5s vừa xả đạn minigun liên thanh sấm sét!'
  },
  {
    key1: 'cancau',
    key2: 'kiem',
    resultKey: 'fusion_cancau_kiem',
    resultName: 'Ngư Kiếm Thuật (Hook & Blade)',
    tag: '🎣 ĐỘC ĐÁO',
    desc: 'Kết hợp Cần Câu và Kiếm: Móc câu kéo đối thủ lại gần rồi chém combo liên kích đập vỡ tường!'
  },
  {
    key1: 'cancau',
    key2: 'songkiem',
    resultKey: 'fusion_cancau_songkiem',
    resultName: 'Song Kiếm Điếu Ngư (Dual Hook-Blades)',
    tag: '🌪️ BÃO KIẾM',
    desc: 'Kết hợp Cần Câu và Song Kiếm: Vừa móc kéo khống chế vừa phóng kiếm khí và xả Song Kiếm Liên Hoàn Kích!'
  },
  {
    key1: 'kiem',
    key2: 'torch',
    resultKey: 'fusion_kiem_torch',
    resultName: 'Hỏa Ma Chi Kiếm (Flame Sword)',
    tag: '🔥 THIÊU ĐỐT',
    desc: 'Kết hợp Kiếm và Đuốc: Chém nhanh liên kích kèm ngọn lửa thiêu đốt đối thủ trong 5 giây liên tục!'
  },
  {
    key1: 'giao',
    key2: 'mace',
    resultKey: 'fusion_giao_mace',
    resultName: 'Song Thủ Chiến Binh (Spear & Mace)',
    tag: '⚔️ BẬC THẦY',
    desc: 'Kết hợp Giáo và Chùy: Lao đâm Ultra Dash xuyên phá kết hợp tích lực gõ choáng quăng đối thủ đập tường!'
  },
  {
    key1: 'cancau',
    key2: 'railgun',
    resultKey: 'fusion_cancau_railgun',
    resultName: 'Ngư Lôi Laser Pháo (Hook & Railgun)',
    tag: '⚡ LASER HOOK',
    desc: 'Kết hợp Cần Câu và Railgun: Móc giữ đối thủ cố định trong chùm tia laser tử thần!'
  }
];

export function getFusionKey(w1: WeaponKey, w2: WeaponKey): string {
  if ((w1 === 'kiem' && w2 === 'songkiem') || (w1 === 'songkiem' && w2 === 'kiem')) {
    return 'tamkiem';
  }
  const s1 = String(w1);
  const s2 = String(w2);
  const sorted = [s1, s2].sort();
  return `fusion_${sorted[0]}_${sorted[1]}`;
}

export function createFusionWeapon(w1Key: WeaponKey, w2Key: WeaponKey): WeaponDef {
  if ((w1Key === 'kiem' && w2Key === 'songkiem') || (w1Key === 'songkiem' && w2Key === 'kiem')) {
    return WEAPON_DEFS.tamkiem;
  }
  const fKey = getFusionKey(w1Key, w2Key);
  if (WEAPON_DEFS[fKey]) return WEAPON_DEFS[fKey];

  const def1 = WEAPON_DEFS[w1Key] || WEAPON_DEFS.kiem;
  const def2 = WEAPON_DEFS[w2Key] || WEAPON_DEFS.kiem;

  // Check popular recipes for nice name
  const matchRecipe = POPULAR_FUSION_RECIPES.find(
    r => (r.key1 === w1Key && r.key2 === w2Key) || (r.key1 === w2Key && r.key2 === w1Key)
  );

  const name = matchRecipe ? matchRecipe.resultName : `Hợp Thể: ${def1.name} & ${def2.name}`;
  const tag = matchRecipe ? matchRecipe.tag : 'FUSION';
  const desc = matchRecipe ? matchRecipe.desc : `Vũ khí Fusion kết hợp sức mạnh của ${def1.name} và ${def2.name}!`;

  const fused: WeaponDef = {
    key: fKey,
    name,
    dmg: Math.round(((def1.dmg || 15) + (def2.dmg || 15)) * 0.9),
    comboChance: Math.min(0.5, (def1.comboChance || 0) + (def2.comboChance || 0)),
    baseCooldown: Math.min(def1.baseCooldown || 700, def2.baseCooldown || 700),
    shieldPierce: Math.max(def1.shieldPierce || 0, def2.shieldPierce || 0),
    blockReduction: Math.max(def1.blockReduction || 0, def2.blockReduction || 0),
    isSpear: Boolean(def1.isSpear || def2.isSpear),
    isRailgun: Boolean(def1.isRailgun || def2.isRailgun),
    fireCycleMs: def1.fireCycleMs || def2.fireCycleMs,
    beamDurationMs: def1.beamDurationMs || def2.beamDurationMs,
    tickMs: def1.tickMs || def2.tickMs,
    tickDmg: (def1.tickDmg || 0) + (def2.tickDmg || 0) || 5,
    isMace: Boolean(def1.isMace || def2.isMace),
    maceScale: def1.maceScale || def2.maceScale,
    isDual: Boolean(def1.isDual || def2.isDual),
    isMinigun: Boolean(def1.isMinigun || def2.isMinigun),
    maxAmmo: def1.maxAmmo || def2.maxAmmo,
    normalRate: def1.normalRate || def2.normalRate,
    normalDmg: (def1.normalDmg || 0) + (def2.normalDmg || 0),
    heatRate: def1.heatRate || def2.heatRate,
    heatDmg: (def1.heatDmg || 0) + (def2.heatDmg || 0),
    heatThreshold: def1.heatThreshold || def2.heatThreshold,
    reloadMs: def1.reloadMs || def2.reloadMs,
    isRangedMelee: Boolean(def1.isRangedMelee || def2.isRangedMelee),
    range: Math.max(def1.range || 0, def2.range || 0),
    rate: Math.max(def1.rate || 0, def2.rate || 0),
    burnDuration: Math.max(def1.burnDuration || 0, def2.burnDuration || 0),
    burnTickMs: def1.burnTickMs || def2.burnTickMs,
    burnDmgPerTick: (def1.burnDmgPerTick || 0) + (def2.burnDmgPerTick || 0),
    isRitual: Boolean(def1.isRitual || def2.isRitual),
    cooldownMs: def1.cooldownMs || def2.cooldownMs,
    isComboFist: Boolean(def1.isComboFist || def2.isComboFist),
    isBow: Boolean(def1.isBow || def2.isBow),
    isCrossbow: Boolean(def1.isCrossbow || def2.isCrossbow),
    isDualSwords: Boolean(def1.isDualSwords || def2.isDualSwords),
    isFishingRod: Boolean(def1.key === 'cancau' || def2.key === 'cancau'),
    isFusion: true,
    fusionKeys: [w1Key, w2Key],
    fusionTag: tag,
    fusionDesc: desc
  };

  WEAPON_DEFS[fKey] = fused;
  return fused;
}

export function loadFusionWeapons(): string[] {
  try {
    const raw = localStorage.getItem('fusion_weapons');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFusionWeapons(list: string[]): void {
  try {
    localStorage.setItem('fusion_weapons', JSON.stringify(list));
  } catch {}
}

export function registerFusionWeapon(wep: WeaponDef): void {
  WEAPON_DEFS[wep.key] = wep;
}

export function initRegisteredFusions(): void {
  const saved = loadFusionWeapons();
  saved.forEach(key => {
    if (key === 'tamkiem') return;
    if (key.startsWith('fusion_')) {
      const parts = key.replace('fusion_', '').split('_');
      if (parts.length === 2 && WEAPON_DEFS[parts[0]] && WEAPON_DEFS[parts[1]]) {
        createFusionWeapon(parts[0], parts[1]);
      }
    }
  });
}

export function randWeapon(): WeaponDef {
  const k = NORMAL_KEYS[Math.floor(Math.random() * NORMAL_KEYS.length)];
  return WEAPON_DEFS[k];
}

export const HP_OPTIONS: number[] = [500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 10000, 100000, 500000, 1000000, 10000000, 50000000, 100000000];

// Role Constants
export const ROLE_COST = 500;
export const WEREWOLF_COST = 1500;
export const ADMIN_PASSWORD = '363636366767676769696969';
export const VALID_ADMIN_NAMES = [
  'TAICIUBE',
  'Xz_long_zXvn2',
  'CODES_LONGvn2',
  'XyZ_code_long_zYx'
] as const;

export function isValidAdmin(input: string): boolean {
  if (!input) return false;
  const clean = input.trim();
  if (clean === ADMIN_PASSWORD) return true;
  return VALID_ADMIN_NAMES.some(name => name.toLowerCase() === clean.toLowerCase());
}

// SoTan Role Constants
export const SOTAN_PASSWORD = 'API.give.(sở tân béo vãi ò tên ảo ma vãi);';
export function isSoTanPassword(input: string): boolean {
  if (!input) return false;
  const clean = input.trim().toLowerCase().replace(/;/g, '').replace(/\s+/g, ' ');
  const target = 'api.give.(sở tân béo vãi ò tên ảo ma vãi)';
  const targetNoAccents = 'api.give.(so tan beo vai o ten ao ma vai)';
  return (
    clean === target ||
    clean === targetNoAccents ||
    clean === 'sotan' ||
    clean === 'so_tan' ||
    clean === 'sở tân béo vãi ò tên ảo ma vãi' ||
    clean === 'sở tân'
  );
}

export const SOTAN_SKILL_INTERVAL_MS = 11000;
export const SOTAN_CHARGE_DURATION_MS = 1800;
export const SOTAN_DIRECT_DMG = 200;
export const SOTAN_INCOMING_MUL = 0.75; // Shield Đặc Biệt: Chỉ nhận 75% sát thương
export const SOTAN_DOT_DMG_PER_TICK = 2;
export const SOTAN_DOT_TICK_MS = 200;
export const SOTAN_FISSURE_LIFETIME_MS = 5000;
export const SOTAN_HUYENVU_IMMUNE_MS = 3000;
export const SOTAN_BACHHO_BONUS_FRAC = 0.30;
export const SOTAN_CHUTUOC_PERCENT_HP = 0.05;
export const SOTAN_BEAST_CHANCE = 0.05; // Mỗi tứ thánh có đúng 5% tỷ lệ xuất hiện

// Kỹ năng mới: Nhất Điếu Khai Thiên Môn - Hoàng Kim
export const NHAT_DIEU_HOANG_KIM_DMG = 500; // 500 DMG trực tiếp
export const NHAT_DIEU_HOANG_KIM_FISSURE_DMG = 250; // 250 DMG từ vết nứt hoàng kim
export const NHAT_DIEU_HOANG_KIM_COOLDOWN_MS = 14000;
export const NHAT_DIEU_HOANG_KIM_CHARGE_MS = 1400;

// Kỹ năng mới: Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa
export const NHAT_DIEU_TOI_CAO_DMG = 1500; // 1500 DMG trực tiếp
export const NHAT_DIEU_TOI_CAO_FISSURE_DMG = 500; // 500 DMG từ vết nứt càn khôn vĩnh cửu
export const NHAT_DIEU_TOI_CAO_COOLDOWN_MS = 18000;
export const NHAT_DIEU_TOI_CAO_CHARGE_MS = 1600;
export const NHAT_DIEU_TOI_CAO_DOT_DMG = 10;
export const NHAT_DIEU_TOI_CAO_FISSURE_LIFETIME_MS = 15000;

// Phi Thiên Vô Cực Điếu - Tối Cao Áo Nghĩa
export const PHI_THIEN_VO_CUC_COOLDOWN_MS = 22000;
export const PHI_THIEN_VO_CUC_DURATION_MS = 3600;
export const PHI_THIEN_VO_CUC_TICK_MS = 75; // 75ms DoT
export const PHI_THIEN_VO_CUC_TICK_DMG = 100; // 100 DMG per tick dồn dập

// Toán Thiên Thấu Chi Điếu (Mũi khoan cắm tường)
export const TOAN_THIEN_COOLDOWN_MS = 16000;
export const TOAN_THIEN_HOMING_SPEED = 650;
export const TOAN_THIEN_PIN_DURATION_MS = 3500;
export const TOAN_THIEN_PIN_TICK_MS = 120;
export const TOAN_THIEN_PIN_TICK_DMG = 40;

// Sở Tân Điếu Constants (150 nhát chém, 25 DMG/nhát - ở hàng 4)
export const SOTAN_DIEU_SLASH_COUNT = 150;
export const SOTAN_DIEU_SLASH_DMG = 25;
export const SOTAN_DIEU_SLASH_INTERVAL_MS = 22;

// The Owner Game Constants
export const THE_OWNER_DMG_MUL = 5.0;
export const THE_OWNER_INCOMING_MUL = 0.05;
export const THE_OWNER_OMNI_DURATION_MS = 6000;
export const THE_OWNER_OMNI_COOLDOWN_MS = 15000;

// The Owner Game (7 Tỉ % Sức Mạnh - Bí mật tiến hóa 777 clicks)
export const THE_OWNER_7B_HP = 7_000_000_000; // HP 7 Tỉ
export const THE_OWNER_7B_MELT_PERCENT = 0.002; // 0.2% HP Max mỗi 0.01s
export const THE_OWNER_7B_MELT_INTERVAL_SEC = 0.01; // 0.01s
export const THE_OWNER_7B_DMG = 70_000_000_000; // Sát thương cực đại
export const THE_OWNER_7B_DMG_MUL = 70_000_000; // 7 Tỉ % Sức Mạnh (70,000,000x multiplier)
export const THE_OWNER_7B_SPEED_MUL = 3.5;
export const THE_OWNER_7B_DUMMY_REWARD = 1_000_000; // Free 1 Triệu Xu khi tiêu diệt Dummy

// Raid Thủ Thành (Tower Defense) Constants
export const TD_GATE_MAX_HP = 10000;
export const TD_MOBS_PER_SEC = 5;
export const TD_COIN_PER_KILL = 2.5; // Mỗi mạng quái = +2.5 Xu
export const TD_MOB_BASE_HP = 80;
export const TD_MOB_BASE_SPEED = 120;

// Bá Thường Role Constants
export const BATHUONG_COST = 2000;
export const BATHUONG_SKILL_INTERVAL_MS = 20000; // 20s cooldown per skill
export const LONG_HON_DOAN_HAI_COOLDOWN_MS = 20000; // 20s cooldown cho Long Hồn Đoạn Hải
export const BATHUONG_LONG_NGANG_DAU_DMG = 30;
export const BATHUONG_DU_LONG_DMG = 10;
export const BATHUONG_DU_LONG_WAVES = 20;
export const BATHUONG_NGOA_LONG_DRILL_DMG = 2;
export const BATHUONG_NGOA_LONG_DRILL_TICK_MS = 400;
export const BATHUONG_NGOA_LONG_SHOT_DMG = 10;
export const BATHUONG_TIEM_LONG_DMG = 75;
export const BATHUONG_LONG_NHAN_DMG_MUL = 1.3;
export const BATHUONG_LONG_NHAN_SPEED_MUL = 1.5;
export const BATHUONG_LONG_NHAN_HP_LOSS = 1.0;
export const BATHUONG_LONG_NHAN_HP_TICK_MS = 300; // -1 HP / 0.3s (scaled by Max HP)

// Cần Câu (Fishing Rod) Constants
export const CANCAU_HOOK_COOLDOWN_MS = 7500;
export const CANCAU_HOOK_DMG = 10;
export const CANCAU_SMASH_DMG = 20;
export const CANCAU_HOOK_SPEED = 850;
export const CANCAU_PULL_SPEED = 780;

// Lưu Bị Role Constants
export const LIUBEI_COST = 1750;
export const LIUBEI_NO_SONGKIEM_HP_MUL = 1.10; // +10% HP khi ko có Song Kiếm
export const LIUBEI_NO_SONGKIEM_DMG_MUL = 1.05; // +5% DMG khi ko có Song Kiếm
export const LIUBEI_SONGKIEM_HP_MUL = 1.15; // +15% HP khi có Song Kiếm
export const LIUBEI_SONGKIEM_DMG_MUL = 1.15; // +15% DMG khi có Song Kiếm
export const LIUBEI_SKILL_INTERVAL_MS = 14000;
export const LIUBEI_SLASH_FIRE_DMG = 100;
export const LIUBEI_SLASH_ICE_DMG = 100;
export const LIUBEI_COMBO_FINISH_DMG = 250;

export function getAllElementsXV(): Record<string, number> {
  return {
    fire_15: 5,
    lightning_15: 5,
    poison_15: 5,
    shadow_15: 5,
    plant_15: 5,
    glitch_15: 5
  };
}

export function getAllElementsXXX(): Record<string, number> {
  return {
    fire_30: 5,
    lightning_30: 5,
    poison_30: 5,
    shadow_30: 5,
    plant_30: 5,
    glitch_30: 5
  };
}

export const ADMIN_DMG_MUL = 1.77;
export const ADMIN_INCOMING_MUL = 0.777;
export const ADMIN_CRIT_CHANCE = 0.777;
export const ADMIN_CRIT_MUL = 1.5;
export const ADMIN_SKILL_INTERVAL_MS = 15000;
export const ADMIN_SKILL_FREEZE_MS = 1000;
export const ADMIN_BUFF_DURATION_MS = 8000;
export const ADMIN_BUFF_DMG_MUL = 1.5;
export const ADMIN_SPEED_DURATION_MS = 8000;
export const ADMIN_HEAL_FRAC = 0.3;
export const ADMIN_COMMANDS = ['/heal', '/buff', '/speed', '/-cd'];

// Cộng hưởng 2v2: Thiên Hạ Vạn Cổ Hoành Hải Sa Trường (Sở Tân + Bá Thường + Cần Câu)
export const THIEN_HA_HP_BONUS = 0.20; // +20% HP
export const THIEN_HA_DMG_MUL = 1.5; // DMG x1.5
export const THIEN_HA_SPEED_MUL = 1.7; // Speed x1.7
export const TRAN_QUOC_SWORD_PERCENT_HP = 0.88; // Cắm kiếm gây 88% Max HP

// Cộng hưởng 2v2: Buff Đồng Nghiệp (Admin & The Owner Game)
export const DONG_NGHIEP_DMG_MUL = 1.5; // +50% Sát thương
export const DONG_NGHIEP_INCOMING_MUL = 0.70; // Giảm 30% sát thương nhận vào
export const DONG_NGHIEP_DEF_REDUCTION = 0.30; // Giảm 30% sát thương nhận vào
export const DONG_NGHIEP_SPEED_MUL = 1.30; // +30% Tốc độ di chuyển
export const DONG_NGHIEP_HEAL_FRAC = 0.25; // Hồi 25% Max HP khi nguy cấp
export const DONG_NGHIEP_HEAL_PCT = 0.25;
export const DONG_NGHIEP_SHIELD_MS = 2500; // Khiên bảo hộ 2.5s

// Dây Nịt Tử Thần Specs (5s AoE quất diện rộng, 36.179% Max HP, 50% stun đau đớn)
export const DAYNIT_COOLDOWN_MS = 5000;
export const DAYNIT_AOE_RANGE = 280;
export const DAYNIT_DAMAGE_PCT = 0.36179;
export const DAYNIT_STUN_CHANCE = 0.50;
export const DAYNIT_STUN_MS = 3200;

// Triệu Vân & Thần-Triệu Vân Specs
export const TRIEUVAN_HP_BONUS = 0.10; // +10% HP
export const TRIEUVAN_DMG_MUL = 1.10; // +10% DMG
export const THAN_TRIEUVAN_HP_BONUS = 0.30; // +30% HP
export const THAN_TRIEUVAN_DMG_MUL = 1.50; // +50% DMG
export const THAN_TRIEUVAN_LIEN_KICH = 0.25; // +25% Liên Kích (đánh thêm 1 đòn)
export const THAN_TRIEUVAN_TRUY_KICH = 0.25; // +25% Truy Kích (truy đuổi kẻ địch)

// Thần-Lưu Bị Specs
export const THAN_LIUBEI_DMG_MUL = 1.50; // +50% DMG

// Tuyệt Kỹ: Nhai Giác Lưu Tinh Trảm (Thần-Triệu Vân)
export const NHAI_GIAC_SPIN_HITS = 10;
export const NHAI_GIAC_SPIN_DMG = 10;
export const NHAI_GIAC_SPEAR_DROP_DMG = 125;
export const NHAI_GIAC_SPEAR_EXPLODE_DMG = 25;
export const NHAI_GIAC_FINAL_THRUST_DMG = 275;
export const NHAI_GIAC_COOLDOWN_MS = 10000;

// Thần Song Kiếm Skill: Triều Đình Trợ Ta Khôi Phục
export const THAN_SONGKIEM_SKILL_DMG_MUL = 1.4; // x1.4 Sát thương kỹ năng Song Kiếm
export const TRIEU_DINH_HEAL_PCT = 0.30; // Hồi 30% Max HP
export const TRIEU_DINH_COOLDOWN_MS = 10000;

// Cộng hưởng 2v2: Tuyệt Thế Anh Hùng (Lưu Bị + Triệu Vân / Thần Triệu Vân)
export const TUYET_THE_HP_BONUS = 0.40; // +40% HP
export const TUYET_THE_DMG_MUL = 1.35; // +35% DMG
export const TUYET_THE_SPEED_MUL = 1.15; // +15% Tốc độ
export const TUYET_THE_LIEN_KICH = 0.10; // +10% Liên Kích
export const TUYET_THE_TRUY_KICH = 0.15; // +15% Truy Kích

// Cộng hưởng 2v2: Song Thần Giáng Thế (Thần-Lưu Bị + Thần-Triệu Vân)
export const SONG_THAN_HP_BONUS = 0.50; // +50% HP
export const SONG_THAN_DMG_MUL = 1.45; // +45% DMG
export const SONG_THAN_SPEED_MUL = 1.25; // +25% Tốc độ
export const SONG_THAN_LIEN_KICH = 0.20; // +20% Liên Kích
export const SONG_THAN_TRUY_KICH = 0.25; // +25% Truy Kích

export const WW_DAY_DURATION_MS = 10000;
export const WW_NIGHT_DURATION_MS = 10000;
export const WW_DAY_HP_FRAC = 0.9;
export const WW_NIGHT_HP_FRAC = 2.4;
export const WW_DAY_SPEED = 100;
export const WW_NIGHT_SPEED = 200;
export const WW_NIGHT_DMG_MUL = 1.5;

// Combat & Weapons
export const MACE_CHARGE_MS = 300;
export const MACE_COOLDOWN_MS = 1000;
export const MACE_KNOCKBACK_SPEED = 2000;
export const MACE_WALL_DMG = 15;
export const MACE_WALL_MAX_HITS = 5;
export const ULTRA_LUNGE_SPEED = 15000;
export const ULTRA_LUNGE_TIMEOUT = 600;
export const LUNGE_TRIGGER_COUNT = 2;
export const MINIGUN_LIGHTNING_EVERY = 10;

// Sát Na Vĩnh Hằng
export const RITUAL_RING_DURATION = 5000;
export const RITUAL_RING_DMG = 50;
export const RITUAL_RING_HIT_RADIUS = 12;
export const RITUAL_RING_HIT_COOLDOWN = 300;
export const RITUAL_FIRE_DURATION = 4000;
export const RITUAL_FIRE_TICK_MS = 100;
export const RITUAL_FIRE_DMG_PER_TICK = 5;
export const RITUAL_FIRE_BASE_HALF_WIDTH = 20;
export const RITUAL_FIRE_WIDEN_RATE = 0.35;
export const RITUAL_SLASH_DMG = 300;
export const RITUAL_EXPLOSION_DMG = 1000;
export const RITUAL_ROTATE_DIRS = [1, -1, 1, -1, 1];
export const ARENA_CORNERS = [
  { x: 30, y: 30 },
  { x: 470, y: 30 },
  { x: 30, y: 470 },
  { x: 470, y: 470 }
];

export const CRACK_DMG_PER_TICK = 0.4;
export const CRACK_TICK_MS = 50;
export const CRACK_LIFETIME_MS = 400;
export const CRACK_MIN_HALF = 6.767;
export const CRACK_MAX_HALF = 36;

// Elements
export const TIERED_TYPES: ElementType[] = ['fire', 'lightning', 'poison', 'glitch'];
export const ELEMENT_NAMES: Record<ElementType, string> = {
  fire: 'Lửa',
  lightning: 'Sét',
  poison: 'Độc',
  shadow: 'Bóng Tối',
  plant: 'Thực Vật',
  glitch: 'Glitch'
};
export const ROMAN_NUMERALS = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX'
];
export const MAX_TIER = 30;
export const GLITCH_ROLL_CHANCE = 0.05;

export const ROLL_POOL: string[] = [];
(['fire', 'lightning', 'poison'] as ElementType[]).forEach(t => {
  [1, 2, 3, 4].forEach(tier => ROLL_POOL.push(`${t}_${tier}`));
});
ROLL_POOL.push('shadow_1');
ROLL_POOL.push('plant_1');

export function rollElementKey(): string {
  if (Math.random() < GLITCH_ROLL_CHANCE) {
    return 'glitch_' + (1 + Math.floor(Math.random() * 5));
  }
  return ROLL_POOL[Math.floor(Math.random() * ROLL_POOL.length)];
}

export function elLabel(key: string): string {
  const [typeStr, tierStr] = key.split('_');
  const type = typeStr as ElementType;
  const t = parseInt(tierStr, 10);
  if (type === 'shadow' || type === 'plant') return ELEMENT_NAMES[type];
  const r = ROMAN_NUMERALS[t - 1] || String(t);
  return `${ELEMENT_NAMES[type]} ${r}`;
}

export function elObj(key: string): ElementData {
  const [type, tier] = key.split('_');
  return { type: type as ElementType, tier: parseInt(tier, 10) };
}

export function elObjRandom(): ElementData {
  const types: ElementType[] = ['fire', 'lightning', 'poison', 'shadow', 'plant'];
  const type = types[Math.floor(Math.random() * types.length)];
  const tier = type === 'shadow' || type === 'plant' ? 1 : 1 + Math.floor(Math.random() * 5);
  return { type, tier };
}

// Glitch specs
export const GLITCH_TRAIL_DURATION = 3000;
export const GLITCH_ENEMY_DMG_PER_TICK = 2;
export const GLITCH_ENEMY_TICK_MS = 100;
export const GLITCH_SELF_HEAL_PER_TICK = 5;
export const GLITCH_SELF_TICK_MS = 200;
export const GLITCH_STUN_CHANCE = 0.15;
export const GLITCH_STUN_DURATION = 1000;
export const GLITCH_TRAIL_RADIUS = 22;
export const GLITCH_HACK_COOLDOWN = 25000;
export const GLITCH_HACK_HEAL_FRAC = 0.10;
export const GLITCH_PROJ_DMG = 20;
export const GLITCH_PROJ_STUN_CHANCE = 0.40;
export const GLITCH_COMBO_DASH_SPEED = 350;
export const GLITCH_COMBO_HIT_DMG = 25;
export const GLITCH_COMBO_HIT_INTERVAL = 220;
export const GLITCH_COMBO_EXTEND_CHANCE = 0.15;
export const GLITCH_HAND_SLAM_DMG = 50;
export const GLITCH_HAND_KNOCKBACK = 700;

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
  if (maxHp === 1000) return 1.5;
  if (maxHp === 1500) return 2;
  if (maxHp === 2000) return 2;
  if (maxHp === 3000) return 2.5;
  if (maxHp === 4000) return 3;
  if (maxHp === 5000) return 3;
  if (maxHp === 6000) return 3.5;
  if (maxHp === 10000) return 5;
  if (maxHp === 100000) return 15;
  if (maxHp === 500000) return 30;
  if (maxHp === 1000000) return 45;
  if (maxHp === 10000000) return 75;
  if (maxHp === 50000000) return 120;
  if (maxHp >= 100000000) return 180;
  return Math.round(Math.sqrt(maxHp / 500));
}

export function getStellarHpMultiplier(maxHp: number): number {
  const baseMul = getDmgMultiplier(maxHp);
  // Yêu cầu: giảm tỉ lệ hp x dmg đối với stellar đi thấp hơn so với vũ khí khác (ví dụ 100k hp=x15, thì stellar remote=x1.5)
  return Math.max(1, Number((baseMul / 10).toFixed(2)));
}

export function lightningBoltDmg(tier: number): number {
  return 5 + (tier + 5);
}

export function getRoleHpBonus(baseHp: number, role?: string | null): number {
  if (role === 'the_owner_7b') return THE_OWNER_7B_HP;
  if (role === 'than_trieuvan') return Math.round(baseHp * THAN_TRIEUVAN_HP_BONUS);
  if (role === 'trieuvan') return Math.round(baseHp * TRIEUVAN_HP_BONUS);
  return Math.round(baseHp * 0.05);
}

export function getRoleIncomingMultiplier(entity: { role?: string | null }): number {
  if (entity.role === 'the_owner_7b') return 0; // God Mode Bất Tử 100%
  if (entity.role === 'survivalist') return 0.95;
  if (entity.role === 'admin') return ADMIN_INCOMING_MUL;
  if (entity.role === 'sotan') return SOTAN_INCOMING_MUL; // Shield Đặc Biệt: Chỉ nhận 75% sát thương
  if (entity.role === 'the_owner') return THE_OWNER_INCOMING_MUL; // Siêu phòng thủ The Owner (chỉ nhận 5% sát thương)
  return 1;
}

export function getRoleDmgMultiplier(entity: { role?: string | null; hp: number; maxHp: number; weapon?: WeaponDef; bathuong?: { isDragonHuman?: boolean } }): number {
  if (entity.role === 'the_owner_7b') return THE_OWNER_7B_DMG_MUL; // 7 Tỉ % Sức Mạnh (One-shot)
  if (entity.role === 'the_owner') return THE_OWNER_DMG_MUL; // x5.0 DMG
  if (entity.role === 'survivalist') {
    const missingFrac = 1 - entity.hp / entity.maxHp;
    return 1 + Math.max(0, missingFrac);
  }
  if (entity.role === 'than_trieuvan') {
    return THAN_TRIEUVAN_DMG_MUL; // +50% DMG
  }
  if (entity.role === 'trieuvan') {
    return TRIEUVAN_DMG_MUL; // +10% DMG
  }
  if (entity.role === 'than_liubei') {
    let mul = THAN_LIUBEI_DMG_MUL; // +50% DMG
    if (entity.weapon && (entity.weapon.key === 'than_songkiem' || entity.weapon.key === 'songkiem')) {
      mul *= 1.15;
    }
    return mul;
  }
  if (entity.role === 'liubei') {
    if (entity.weapon && (entity.weapon.key === 'songkiem' || entity.weapon.key === 'than_songkiem')) {
      return LIUBEI_SONGKIEM_DMG_MUL; // +15% DMG khi có Song Kiếm
    }
    return LIUBEI_NO_SONGKIEM_DMG_MUL; // +5% DMG khi ko có Song Kiếm
  }
  if (entity.role === 'bathuong') {
    if (entity.bathuong && entity.bathuong.isDragonHuman) {
      return BATHUONG_LONG_NHAN_DMG_MUL; // x1.3 DMG ở thể Long Nhân Hợp Nhất
    }
  }
  return 1;
}

export function getRoleSpeedMultiplier(entity: { role?: string | null; hp: number; maxHp: number; bathuong?: { isDragonHuman?: boolean } }): number {
  if (entity.role === 'the_owner_7b') return 0; // Infinite attack speed
  if (entity.role === 'survivalist') {
    const missingFrac = 1 - entity.hp / entity.maxHp;
    return 1 - 0.5 * Math.max(0, missingFrac);
  }
  if (entity.role === 'bathuong') {
    if (entity.bathuong && entity.bathuong.isDragonHuman) {
      return BATHUONG_LONG_NHAN_SPEED_MUL; // x1.5 Speed ở thể Long Nhân Hợp Nhất
    }
  }
  return 1;
}

export function applyAdminCrit(entity: { role?: string | null }, dmg: number): { dmg: number; isCrit: boolean } {
  if (entity.role === 'the_owner_7b') return { dmg: THE_OWNER_7B_DMG, isCrit: true };
  if (entity.role === 'admin' && Math.random() < ADMIN_CRIT_CHANCE) {
    return { dmg: dmg * ADMIN_CRIT_MUL, isCrit: true };
  }
  return { dmg, isCrit: false };
}

export function computeCooldown(entity: { weapon: WeaponDef; element?: ElementData | null; role?: string | null; hp: number; maxHp: number; admin?: { speedActive?: boolean } }): number {
  if (entity.role === 'the_owner_7b') {
    return 0; // Attack speed vô hạn (0s cooldown)
  }
  if (entity.weapon && entity.weapon.key === 'than_songkiem') {
    // 5 nhát / giây = 200ms
    return 200;
  }
  let cd = entity.weapon.baseCooldown || 700;
  if (entity.element) {
    if (entity.element.type === 'fire') cd -= entity.element.tier * 150;
    if (entity.element.type === 'lightning') cd -= entity.element.tier * 100;
  }
  cd *= getRoleSpeedMultiplier(entity);
  if (entity.admin && entity.admin.speedActive) cd *= 0.5;
  return Math.max(150, cd);
}

export function spearCooldownMs(entity: { element?: ElementData | null }): number {
  return entity.element && entity.element.type === 'lightning' ? 3000 : 5000;
}

export function spearChargeMs(entity: { element?: ElementData | null }): number {
  return entity.element && entity.element.type === 'lightning' ? 1500 : 2500;
}

// Storage Helpers
export function loadCoins(): number {
  try {
    const c = localStorage.getItem('coins');
    return c ? JSON.parse(c) : 0;
  } catch {
    return 0;
  }
}
export function saveCoins(v: number): void {
  try {
    localStorage.setItem('coins', JSON.stringify(v));
  } catch {}
}

export function loadInv(): Record<string, number> {
  try {
    const i = localStorage.getItem('inventory');
    return i ? JSON.parse(i) : {};
  } catch {
    return {};
  }
}
export function saveInv(v: Record<string, number>): void {
  try {
    localStorage.setItem('inventory', JSON.stringify(v));
  } catch {}
}

export function loadUnlock(key: string): boolean {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}
export function saveUnlock(key: string): void {
  try {
    localStorage.setItem(key, '1');
  } catch {}
}

export function loadTrieuVanWins(): number {
  try {
    const val = localStorage.getItem('ball_quest_trieuvan_wins');
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveTrieuVanWins(wins: number): void {
  try {
    localStorage.setItem('ball_quest_trieuvan_wins', wins.toString());
  } catch {}
}

export function loadLuuBeiWins(): number {
  try {
    const val = localStorage.getItem('ball_quest_luubei_wins');
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveLuuBeiWins(wins: number): void {
  try {
    localStorage.setItem('ball_quest_luubei_wins', wins.toString());
  } catch {}
}

export function loadRailgunMirrorWins(): number {
  try {
    const val = localStorage.getItem('ball_quest_railgun_mirror_wins');
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveRailgunMirrorWins(wins: number): void {
  try {
    localStorage.setItem('ball_quest_railgun_mirror_wins', wins.toString());
  } catch {}
}

export function mergeAll(inv: Record<string, number>): Record<string, number> {
  const newInv = { ...inv };
  let changed = true;
  while (changed) {
    changed = false;
    TIERED_TYPES.forEach(type => {
      for (let tier = 1; tier < MAX_TIER; tier++) {
        const key = `${type}_${tier}`;
        const nextKey = `${type}_${tier + 1}`;
        if ((newInv[key] || 0) >= 2) {
          newInv[key] -= 2;
          if (newInv[key] <= 0) delete newInv[key];
          newInv[nextKey] = (newInv[nextKey] || 0) + 1;
          changed = true;
        }
      }
    });
  }
  return newInv;
}

export interface AdminCommandResult {
  success: boolean;
  message: string;
  coinsDelta?: number;
  newInventory?: Record<string, number>;
  unlockedWeapons?: string[];
  unlockedRoles?: string[];
}

export function executeAdminCommand(
  rawCmd: string,
  currentCoins: number,
  currentInv: Record<string, number>
): AdminCommandResult {
  const trimmed = rawCmd.trim();
  if (!trimmed) {
    return { success: false, message: 'Lệnh không được để trống. Ví dụ: /give xu 10000 hoặc /give fire_15 5' };
  }

  // Check if input is the secret SoTan password
  if (isSoTanPassword(trimmed)) {
    saveUnlock('role_sotan_unlocked');
    return {
      success: true,
      message: '👑 [THẦN TƯỚNG TỐI CAO]: Đã mở khóa thành công Role Ẩn Độc Quyền [SỞ TÂN]!',
      unlockedRoles: ['role_sotan_unlocked']
    };
  }

  // Normalize /give command
  // Matches `/give <name> <amount>`, `/give <name><amount>` or `/give <name>`
  const giveMatch = trimmed.match(/^\/give(?:\s+([a-zA-Z0-9_.-]+)(?:\s+(\d+))?|\s*([a-zA-Z_.-]+)(\d+))$/i);
  
  if (giveMatch) {
    const rawName = (giveMatch[1] || giveMatch[3] || '').toLowerCase();
    const rawAmt = giveMatch[2] || giveMatch[4];
    const amount = rawAmt ? Math.max(1, parseInt(rawAmt, 10)) : 1;

    // Coins
    if (['xu', 'coin', 'coins', 'money', 'gold', 'tien'].includes(rawName)) {
      const added = rawAmt ? amount : 10000;
      const newCoins = currentCoins + added;
      saveCoins(newCoins);
      return {
        success: true,
        message: `[ADMIN /give]: Đã cấp thành công +${added} Xu (Tổng: ${newCoins} Xu)!`,
        coinsDelta: added
      };
    }

    // All XXX (Tier 30) elements
    if (['all_xxx', 'xxx', 'all_30', 'max_element', 'all_max'].includes(rawName)) {
      const newInv = { ...currentInv };
      const xxx = getAllElementsXXX();
      Object.keys(xxx).forEach(k => {
        newInv[k] = (newInv[k] || 0) + (amount > 1 ? amount : 5);
      });
      saveInv(newInv);
      return {
        success: true,
        message: `[ADMIN /give]: Đã cấp toàn bộ Element TỐI CAO CẤP 30 (XXX) x${amount > 1 ? amount : 5}!`,
        newInventory: newInv
      };
    }

    // All XV elements
    if (['all_xv', 'xv', 'all_element', 'all_elements', 'all'].includes(rawName)) {
      const newInv = { ...currentInv };
      const xv = getAllElementsXV();
      Object.keys(xv).forEach(k => {
        newInv[k] = (newInv[k] || 0) + (amount > 1 ? amount : 5);
      });
      saveInv(newInv);
      return {
        success: true,
        message: `[ADMIN /give]: Đã cấp toàn bộ Element Cấp XV (Lửa, Sét, Độc, Bóng Tối, Thực Vật, Glitch) x${amount > 1 ? amount : 5}!`,
        newInventory: newInv
      };
    }

    // All weapons
    if (['all_weapons', 'weapons', 'vukhi'].includes(rawName)) {
      const unls = ['mace_unlocked', 'minigun_unlocked', 'satna_unlocked', 'torch_unlocked'];
      unls.forEach(k => saveUnlock(k));
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa toàn bộ vũ khí thường & vũ khí ẩn!',
        unlockedWeapons: unls
      };
    }

    // Specific Weapons
    if (['satna', 'sat_na'].includes(rawName)) {
      saveUnlock('satna_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa vũ khí tối thượng [Sát Na Vĩnh Hằng]!',
        unlockedWeapons: ['satna_unlocked']
      };
    }
    if (['minigun', 'mini_gun', 'sung'].includes(rawName)) {
      saveUnlock('minigun_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa vũ khí [Minigun xả đạn]!',
        unlockedWeapons: ['minigun_unlocked']
      };
    }
    if (['sangthe', 'sang_the', 'nntl', 'dev', 'developer', 'god_sword'].includes(rawName)) {
      saveUnlock('dev_nntl_unlocked');
      saveUnlock('sangthe_unlocked');
      return {
        success: true,
        message: '👑 [NHÀ PHÁT TRIỂN NNTL]: Đã mở khóa vũ khí tối cao [SÁNG THẾ CHI KIẾM] (777.7777 DMG)!',
        unlockedWeapons: ['dev_nntl_unlocked', 'sangthe_unlocked']
      };
    }
    if (['cancau', 'can_cau', 'cancauca', 'rod', 'fishing_rod'].includes(rawName)) {
      saveUnlock('cancau_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Vũ khí [Cần Câu] (Đánh xa 20 DMG + Móc Lưỡi 10 DMG + Bồi 20 DMG Đập Tường) đã sẵn sàng!',
        unlockedWeapons: ['cancau_unlocked']
      };
    }
    if (['songkiem', 'song_kiem', 'katana', 'dual_swords'].includes(rawName)) {
      saveUnlock('songkiem_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Vũ khí [Song Kiếm] (Kiếm khí liên kích + Nhất Quang chấn động) đã mở khóa!',
        unlockedWeapons: ['songkiem_unlocked']
      };
    }
    if (['tamkiem', 'tam_kiem', 'zoro', 'santoryu', 'fusion_zoro'].includes(rawName)) {
      saveUnlock('tamkiem_unlocked');
      saveUnlock('songkiem_unlocked');
      const fusions = loadFusionWeapons();
      if (!fusions.includes('tamkiem')) {
        saveFusionWeapons([...fusions, 'tamkiem']);
      }
      return {
        success: true,
        message: '👑 [ADMIN /give]: Đã mở khóa Vũ Khí Thần Thoại [TAM KIẾM - SANTORYU ZORO ONE PIECE] (180 DMG Tam Thiên Thế Giới + 100 DMG Đại Lốc Xoáy Rồng)!',
        unlockedWeapons: ['tamkiem_unlocked', 'songkiem_unlocked']
      };
    }
    if (['railgun', 'laser', 'phao'].includes(rawName)) {
      saveUnlock('railgun_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Vũ khí [Railgun] (Tia laser hủy diệt + Chùm tia Clash) đã mở khóa!',
        unlockedWeapons: ['railgun_unlocked']
      };
    }
    if (['stellar', 'stellar_remote', 'vetinh', 've_tinh', 'remote'].includes(rawName)) {
      saveUnlock('stellar_remote_unlocked');
      saveRailgunMirrorWins(1000);
      return {
        success: true,
        message: '🛰️ [ADMIN /give]: Đã mở khóa Vũ Khí Tối Thượng [STELLAR REMOTE] (Menu Vệ Tinh Vũ Trụ: SS-01 Railgun, SS-03 Gungir, SS-04 Seven Star, SS-05 Tesseract)!',
        unlockedWeapons: ['stellar_remote_unlocked']
      };
    }
    if (['mace', 'chuy', 'songthu', 'torch', 'duoc'].includes(rawName)) {
      saveUnlock('mace_unlocked');
      saveUnlock('torch_unlocked');
      saveUnlock('songthu_unlocked');
      return {
        success: true,
        message: `[ADMIN /give]: Đã mở khóa vũ khí ẩn [${rawName.toUpperCase()}]!`,
        unlockedWeapons: ['mace_unlocked', 'torch_unlocked', 'songthu_unlocked']
      };
    }

    // Specific Roles
    if (['admin', 'role_admin'].includes(rawName)) {
      saveUnlock('role_admin_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa đặc quyền Role Admin!',
        unlockedRoles: ['role_admin_unlocked']
      };
    }
    if (['werewolf', 'soi', 'nguoisoi'].includes(rawName)) {
      saveUnlock('role_werewolf');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role Werewolf (Người Sói)!',
        unlockedRoles: ['role_werewolf']
      };
    }
    if (['sotan', 'so_tan', 'sở_tân', 'thanhtuong'].includes(rawName)) {
      saveUnlock('role_sotan_unlocked');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role Ẩn Độc Quyền [SỞ TÂN]!',
        unlockedRoles: ['role_sotan_unlocked']
      };
    }
    if (['bathuong', 'ba_thuong', 'bá_thường', 'longnhan'].includes(rawName)) {
      saveUnlock('role_bathuong');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role Thần Thoại [BÁ THƯỜNG] (6 Tuyệt Kỹ Long Thần & Long Nhân Hợp Nhất)!',
        unlockedRoles: ['role_bathuong']
      };
    }
    if (['trieuvan', 'trieu_van', 'triệu_vân', 'trieuvan_thuong'].includes(rawName)) {
      saveUnlock('role_trieuvan');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role [TRIỆU VÂN] (+10% HP, +10% DMG)!',
        unlockedRoles: ['role_trieuvan']
      };
    }
    if (['than_trieuvan', 'thantrieuvan', 'than_trieu_van', 'thần_triệu_vân'].includes(rawName)) {
      saveUnlock('role_trieuvan');
      saveUnlock('role_than_trieuvan_unlocked');
      saveUnlock('thuong_than_unlocked');
      saveTrieuVanWins(20);
      return {
        success: true,
        message: '🌟 [ADMIN /give]: Đã mở khóa [THẦN-TRIỆU VÂN] (+30% HP, +50% DMG, +25% Liên Kích, +25% Truy Kích, Tuyệt kỹ Nhai Giác Lưu Tinh Trảm) & [THƯƠNG THẦN]!',
        unlockedRoles: ['role_trieuvan', 'role_than_trieuvan_unlocked'],
        unlockedWeapons: ['thuong_than_unlocked']
      };
    }
    if (['thuong_than', 'thuongthan', 'thương_thần'].includes(rawName)) {
      saveUnlock('thuong_than_unlocked');
      return {
        success: true,
        message: '🔱 [ADMIN /give]: Đã mở khóa Vũ khí Thần Thoại [THƯƠNG THẦN]!',
        unlockedWeapons: ['thuong_than_unlocked']
      };
    }
    if (['than_liubei', 'thanliubei', 'thần_lưu_bị', 'than_songkiem', 'thansongkiem'].includes(rawName)) {
      saveUnlock('role_liubei');
      saveUnlock('role_than_liubei_unlocked');
      saveUnlock('than_songkiem_unlocked');
      saveLuuBeiWins(20);
      return {
        success: true,
        message: '👑 [ADMIN /give]: Đã mở khóa [THẦN-LƯU BỊ] & [THẦN SONG KIẾM] (x1.3679 Chỉ số, 5 chém/s, x1.4 Skill DMG, Tuyệt kỹ Triều Đình Trợ Ta Khôi Phục)!',
        unlockedRoles: ['role_liubei', 'role_than_liubei_unlocked'],
        unlockedWeapons: ['than_songkiem_unlocked']
      };
    }
    if (['liubei', 'liu_bei', 'luubi', 'luu_bi', 'lưu_bị', 'hanthat'].includes(rawName)) {
      saveUnlock('role_liubei');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role [LƯU BỊ] (Hán Thất Nghiêm Đông - Hỏa Băng Song Kiếm)!',
        unlockedRoles: ['role_liubei']
      };
    }
    if (['the_owner_7b', 'the_owner_evolved', 'the_true_owner', 'owner_7b', 'owner7b', 'the_owner_7ti', 'owner_7ti'].includes(rawName) || (['the_owner', 'owner', 'theowner'].includes(rawName) && amount >= 777)) {
      saveUnlock('role_the_owner_unlocked');
      saveUnlock('role_the_owner_7b_unlocked');
      saveUnlock('computer_unlocked');
      try {
        localStorage.setItem('the_owner_clicks', '777');
      } catch {}
      return {
        success: true,
        message: '👑⚡ [THE OWNER GAME 7 TỈ % SỨC MẠNH]: Đã kích hoạt bí mật 777 clicks! HP 7 Tỉ, One-Shot mọi thứ, Tầm đánh & Tốc đánh Inf, Diệt Dummy thưởng +1.000.000 Xu!',
        unlockedRoles: ['role_the_owner_unlocked', 'role_the_owner_7b_unlocked'],
        unlockedWeapons: ['computer_unlocked']
      };
    }
    if (['the_owner', 'owner', 'theowner', 'role_the_owner'].includes(rawName)) {
      saveUnlock('role_the_owner_unlocked');
      saveUnlock('computer_unlocked');
      return {
        success: true,
        message: '👑 [THE OWNER GAME]: Đã mở khóa Role Tối Cao [THE OWNER GAME] & Vũ Khí Máy Tính (Laptop Hacker)!',
        unlockedRoles: ['role_the_owner_unlocked'],
        unlockedWeapons: ['computer_unlocked']
      };
    }
    if (['computer', 'maytinh', 'may_tinh', 'laptop'].includes(rawName)) {
      saveUnlock('computer_unlocked');
      saveUnlock('role_the_owner_unlocked');
      return {
        success: true,
        message: '💻 [THE OWNER GAME]: Đã mở khóa Vũ khí Máy Tính Laptop Hacker!',
        unlockedWeapons: ['computer_unlocked'],
        unlockedRoles: ['role_the_owner_unlocked']
      };
    }
    if (['daynit', 'day_nit', 'nit', 'daynit_tuthan'].includes(rawName)) {
      saveUnlock('daynit_unlocked');
      saveUnlock('role_the_owner_unlocked');
      return {
        success: true,
        message: '👑 [THE OWNER EXCLUSIVE]: Đã mở khóa vũ khí [DÂY NỊT TỬ THẦN] (1 hit = 36,179% Max HP/5s + 50% Choáng Đau Đớn)!',
        unlockedWeapons: ['daynit_unlocked'],
        unlockedRoles: ['role_the_owner_unlocked']
      };
    }
    if (['survivalist', 'sinh_ton', 'sinhton'].includes(rawName)) {
      saveUnlock('role_survivalist');
      return {
        success: true,
        message: '[ADMIN /give]: Đã mở khóa Role Survivalist (Sinh tồn)!',
        unlockedRoles: ['role_survivalist']
      };
    }

    // Specific Elements: support formats like `fire_30`, `fire_15`, `fire30`, `glitch_30`, `set_30`, `doc_30`
    let elKey = rawName;
    // Map aliases
    if (elKey.startsWith('hoa') || elKey.startsWith('lua')) elKey = elKey.replace(/^(hoa|lua)/, 'fire');
    if (elKey.startsWith('set')) elKey = elKey.replace(/^set/, 'lightning');
    if (elKey.startsWith('doc')) elKey = elKey.replace(/^doc/, 'poison');
    if (elKey.startsWith('bongtoi') || elKey.startsWith('shadow')) elKey = elKey.replace(/^(bongtoi|shadow)/, 'shadow');
    if (elKey.startsWith('thucvat') || elKey.startsWith('plant')) elKey = elKey.replace(/^(thucvat|plant)/, 'plant');
    
    // Normalize format like fire30 -> fire_30
    const elSplit = elKey.match(/^([a-z]+)[_-]?(\d+)?$/);
    if (elSplit) {
      const type = elSplit[1];
      const tier = elSplit[2] ? parseInt(elSplit[2], 10) : 30; // default to Tier 30 for admin!
      const validTypes = ['fire', 'lightning', 'poison', 'shadow', 'plant', 'glitch'];
      if (validTypes.includes(type)) {
        const fullKey = `${type}_${Math.min(30, Math.max(1, tier))}`;
        const newInv = { ...currentInv, [fullKey]: (currentInv[fullKey] || 0) + amount };
        saveInv(newInv);
        return {
          success: true,
          message: `[ADMIN /give]: Đã cấp thành công ${elLabel(fullKey)} x${amount}!`,
          newInventory: newInv
        };
      }
    }

    return {
      success: false,
      message: `[ADMIN ERROR]: Không tìm thấy vật phẩm '${rawName}'. Hỗ trợ: xu, all_xxx, all_xv, fire_30, lightning_30, poison_30, shadow_30, plant_30, glitch_30, daynit, computer, satna, minigun, etc.`
    };
  }

  // Clear inv command
  if (trimmed.toLowerCase() === '/clear_inv' || trimmed.toLowerCase() === '/clear') {
    saveInv({});
    return {
      success: true,
      message: '[ADMIN]: Đã dọn sạch túi đồ!',
      newInventory: {}
    };
  }

  return {
    success: false,
    message: `[ADMIN ERROR]: Lệnh '${trimmed}' không hợp lệ. Cú pháp: /give <name> <amount> (hoặc /give <name>)`
  };
}

