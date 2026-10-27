import React, { useState, useEffect, useRef } from 'react';
import {
  Swords,
  Coins,
  Sparkles,
  Layers,
  Shield,
  HelpCircle,
  Play,
  RotateCcw,
  Key,
  Copy,
  Check,
  Code2,
  Lock,
  Flame,
  Zap,
  Terminal,
  Send,
  Unlock,
  AlertCircle,
  BookOpen,
  X,
  ShoppingCart,
  CheckCircle2,
  Gift,
  Crown,
  Users,
  Volume2,
  VolumeX,
  Music,
  Sliders,
  Globe
} from 'lucide-react';
import { BallGameEngine } from './game/BallGameEngine';
import { sound } from './game/sound';
import {
  WEAPON_DEFS,
  NORMAL_KEYS,
  SECRET_KEYS,
  HP_OPTIONS,
  getDmgMultiplier,
  ROLE_COST,
  WEREWOLF_COST,
  BATHUONG_COST,
  LIUBEI_COST,
  VALID_ADMIN_NAMES,
  isValidAdmin,
  isDeveloperNNTL,
  SHOP_WEAPONS,
  ShopWeaponItem,
  getAllElementsXV,
  executeAdminCommand,
  elLabel,
  rollElementKey,
  mergeAll,
  loadCoins,
  saveCoins,
  loadInv,
  saveInv,
  loadUnlock,
  saveUnlock,
  loadTrieuVanWins,
  saveTrieuVanWins,
  loadLuuBeiWins,
  saveLuuBeiWins,
  loadRailgunMirrorWins,
  saveRailgunMirrorWins,
  getStellarHpMultiplier
} from './game/constants';
import { WeaponKey, RoleType, MatchBattleStats } from './game/types';
import { drawWeaponIcon } from './game/graphics';
import { WEAPON_DETAILS, ROLE_DETAILS } from './game/weaponRoleData';
import { SupportedLanguage, TRANSLATIONS, getSavedLanguage, saveLanguage } from './game/i18n';

interface SkillItem {
  slot: number;
  keyLabel: string;
  name: string;
  desc: string;
  tag?: string;
  color: string;
}

function getPlayerSkillList(role: RoleType, weapon: WeaponKey): SkillItem[] {
  const list: SkillItem[] = [];

  // Special Dedicated Skill Hotbars for THE OWNER GAME
  if (role === 'the_owner' || role === 'the_owner_7b') {
    const is7b = role === 'the_owner_7b';
    list.push(
      { slot: 1, keyLabel: '1', name: is7b ? '👑⚡ Vạn Thần Khí 7 Tỉ %' : '👑 Vạn Vũ Khí Quy Tông', desc: is7b ? '14 thần khí oanh tạc toàn sàn đấu + thiêu đốt 0.2% HP/0.01s!' : '14 thần khí bay xung quanh đồng loạt oanh tạc toàn sàn đấu (160 DMG DoT)!', tag: 'THE OWNER OMNI', color: 'from-emerald-500 via-teal-600 to-cyan-600' },
      { slot: 2, keyLabel: '2', name: is7b ? '⚡ Lệnh /strike -25% HP' : '⚡ Strike Nuke / Lệnh Admin', desc: is7b ? 'Giáng sét lệnh trừ thẳng -25% Max HP của đối thủ!' : 'Giáng sấm sét hủy diệt trực tiếp -500 DMG không thể chống đỡ!', tag: 'HACKER COMMAND', color: 'from-green-600 to-emerald-800' },
      { slot: 3, keyLabel: '3', name: '🛡️ God Mode (Bất Tử)', desc: 'Bật/Tắt chế độ Bất Tử 100% không bao giờ tụt máu!', tag: 'GOD MODE', color: 'from-teal-600 to-blue-700' },
      { slot: 4, keyLabel: '4', name: '💖 Full Restore & Speed', desc: 'Hồi phục ngay lập tức 100% Max HP và tăng tốc 180%-250% vận tốc!', tag: 'CHEAT RESTORE', color: 'from-emerald-600 to-green-700' },
      { slot: 5, keyLabel: '5', name: '🛰️ SS-01: Railgun', desc: 'Chùm tia quỹ đạo vũ trụ 200 DMG/0.1s trong 15s (Tổng 30.000 DMG x Owner/HP)!', tag: 'STELLAR RAILGUN', color: 'from-rose-600 to-red-800' },
      { slot: 6, keyLabel: '6', name: '🪐 SS-03: Gungir', desc: 'Mũi tên đen ngòm xoay như mũi khoan 3D -> Vụ nổ Sa Hoàng 15.000 DMG + 25.000 DoT x Owner/HP!', tag: 'TSAR GUNGIR', color: 'from-amber-600 to-orange-700' },
      { slot: 7, keyLabel: '7', name: '✨ SS-04: Seven Star', desc: 'Bắc Đẩu Thất Tinh nạp năng lượng lần lượt lao xuống 5.000 x 7 + 15.000 DMG x Owner/HP!', tag: 'SEVEN STAR', color: 'from-yellow-500 to-amber-600' },
      { slot: 8, keyLabel: '8', name: '💠 SS-05: Tesseract', desc: 'Siêu lập phương 4D mở cổng không gian phình to nổ 5 lần 6.500 DMG + nổ 20.000 DMG x Owner/HP!', tag: '4D TESSERACT', color: 'from-cyan-500 to-purple-700' },
      { slot: 9, keyLabel: '9', name: '☄️ SS-06: Halley', desc: 'Sao băng Halley chuyển hướng vũ trụ khóa khoảng cách lao xuống nổ tung 60.000 DMG x Owner/HP!', tag: 'COMET HALLEY', color: 'from-sky-500 to-blue-700' },
      { slot: 10, keyLabel: '0', name: '🌌 SS-021: Quasar', desc: 'Vòng xoáy Quasar thu nhỏ vào tâm -> Siêu laser trắng 300 DMG/0.2s trong 20s -> Nổ 20.000 DMG x Owner/HP!', tag: 'QUASAR JET', color: 'from-pink-500 to-purple-700' }
    );
    return list;
  }

  // Special Dedicated Skill Hotbars for SỞ TÂN (Theo đúng 9 hàng yêu cầu)
  if (role === 'sotan') {
    list.push(
      // Hàng 1: Nhất Điếu Khai Thiên Môn - Hoàng Kim
      { slot: 1, keyLabel: '1', name: '✨👑 Nhất Điếu Khai Thiên Môn - Hoàng Kim', desc: 'Tụ Hoàng Kim Trận chém thẳng sàn đấu (500 DMG) + Vết nứt Hoàng Kim vĩnh cửu (250 DMG nứt)!', tag: 'HOÀNG KIM THÁNH ĐIẾU', color: 'from-amber-400 via-yellow-500 to-amber-600' },
      // Hàng 2: Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa
      { slot: 2, keyLabel: '2', name: '🌈⚡ Nhất Điếu Khai Thiên Môn - Tối Cao Áo Nghĩa', desc: 'Vạn Luân Cầu Vồng 9 Tầng & Tứ Tượng cực đại -> Đập chém nứt thẳng càn khôn (1500 DMG) + Vết nứt vĩnh cửu (500 DMG nứt)!', tag: 'TỐI CAO ÁO NGHĨA', color: 'from-rose-500 via-purple-600 to-indigo-600' },
      // Hàng 3: Phi Thiên Vô Cực Điếu - Tối Cao Áo Nghĩa
      { slot: 3, keyLabel: '3', name: '🌈🌪️ Phi Thiên Vô Cực Điếu - Tối Cao Áo Nghĩa', desc: 'Dịch chuyển tức thời ra trung tâm võ đài (250,250), vx=0 vy=0. Vận chuyển Vạn Luân 9 Tầng & Bão Lốc Xoáy Quét Sạch (100 DMG mỗi 0.075s DoT)!', tag: 'TỐI CAO ÁO NGHĨA', color: 'from-cyan-500 via-teal-500 to-blue-600' },
      // Hàng 4: Tường Vân 18 - Sở Tân Điếu
      { slot: 4, keyLabel: '4', name: '☁️🔥 Tường Vân 18 - Sở Tân Điếu', desc: 'Time stop 2s -> Vùng lửa & phân thân biến hóa 7.5s -> 150 đòn chém cự đại x 25 DMG!', tag: 'TỐI CAO ÁO NGHĨA', color: 'from-orange-500 via-red-600 to-amber-600' },
      // Hàng 5: Toán Thiên Thấu Chi Điếu
      { slot: 5, keyLabel: '5', name: '🔩⚡ Toán Thiên Thấu Chi Điếu', desc: 'Phóng Mũi Khoan khổng lồ bám đuổi & găm chặt đối thủ vào vách tường, ma sát nghiền nát (40 DMG mỗi 0.12s trong 3.5s)!', tag: 'THẦN KỸ SỞ TÂN', color: 'from-amber-500 via-orange-600 to-yellow-600' },
      // Hàng 6: Bạch Hổ Điếu Hồn
      { slot: 6, keyLabel: '6', name: '🐅 Bạch Hổ Điếu Hồn', desc: '+30% sát thương đòn đánh trong 3.0s!', tag: 'TỨ THÁNH THẦN HỒN', color: 'from-amber-500 to-orange-600' },
      // Hàng 7: Chu Tước Điếu Hồn
      { slot: 7, keyLabel: '7', name: '🦚 Chu Tước Điếu Hồn', desc: 'Rút ngay -5% Max HP của đối thủ thiêu đốt trực tiếp!', tag: 'TỨ THÁNH THẦN HỒN', color: 'from-rose-600 to-red-700' },
      // Hàng 8: Thanh Long Điếu Hồn
      { slot: 8, keyLabel: '8', name: '🐉 Thanh Long Điếu Hồn', desc: 'Thanh Long ngâm vang, HỒI PHỤC TOÀN BỘ COOLDOWN KỸ NĂNG ngay lập tức!', tag: 'TỨ THÁNH THẦN HỒN', color: 'from-emerald-500 to-teal-700' },
      // Hàng 9: Huyền Vũ Điếu Hồn
      { slot: 9, keyLabel: '9', name: '🐢 Huyền Vũ Điếu Hồn', desc: 'Kim Giáp Bất Hoại: Miễn nhiễm toàn bộ sát thương trong 3.0s!', tag: 'TỨ THÁNH THẦN HỒN', color: 'from-blue-600 to-indigo-800' },
      // Hàng 10: Phím 0
      { slot: 10, keyLabel: '0', name: '🎯 Đột Kích / Strike Thần Tốc', desc: 'Lao thẳng vào đối thủ và tung đòn tấn công thường ngay lập tức!', tag: 'TẤN CÔNG', color: 'from-slate-800 to-slate-900' }
    );
    return list;
  }

  // Stellar Remote (Orbital Satellite Command) Skills
  if (weapon === 'stellar_remote') {
    return [
      {
        slot: 1,
        keyLabel: '1',
        name: '🛰️ SS-01: Railgun',
        desc: 'Tia đỏ khóa mục tiêu -> Trạm vũ trụ bắn chùm tia plasma tốc độ ánh sáng 1.000.000+ DMG/0.1s trong 15s (Tổng 150.000.000+ DMG)!',
        tag: 'ORBITAL RAILGUN',
        color: 'from-rose-600 to-red-800'
      },
      {
        slot: 2,
        keyLabel: '2',
        name: '☀️ SS-02: The Sun',
        desc: '8 Hành tinh trong Hệ Mặt Trời lần lượt lao xuống ➔ Đại Mặt Trời giáng thế nổ nhiệt hạch 5.500.000+ DMG x Mul (Sát thương cực đại)!',
        tag: 'SOLAR SUPERNOVA',
        color: 'from-amber-500 via-orange-500 to-red-600'
      },
      {
        slot: 3,
        keyLabel: '3',
        name: '🪐 SS-03: Gungir',
        desc: 'Mũi tên khoan Archimedes 3D giáng thế nổ SA HOÀNG 25.000.000+ DMG + 1.000.000+ DMG DoT/0.2s trong 10s (Tổng 75.000.000+ DMG)!',
        tag: 'TSAR BOMBA GUNGIR',
        color: 'from-amber-600 to-orange-700'
      },
      {
        slot: 4,
        keyLabel: '4',
        name: '✨ SS-04: Seven Star',
        desc: 'Chòm sao Bắc Đẩu -> Từng ngôi sao ngẫu nhiên nạp năng lượng nổ 1.500.000+ DMG/lần (x7) -> Cả 7 sao đồng loạt nổ 20.000.000+ DMG!',
        tag: 'BẮC ĐẨU THẤT TINH',
        color: 'from-yellow-500 to-amber-600'
      },
      {
        slot: 5,
        keyLabel: '5',
        name: '💠 SS-05: Tesseract',
        desc: 'Siêu Lập Phương 4D -> Mở Cổng Không Gian -> Phình to nổ 5 lần 2.000.000+ DMG & nổ sụp đổ không gian 25.000.000+ DMG!',
        tag: '4D TESSERACT',
        color: 'from-cyan-500 to-purple-700'
      },
      {
        slot: 6,
        keyLabel: '6',
        name: '☄️ SS-06: Halley',
        desc: 'Sao băng Halley chuyển hướng quỹ đạo -> Dữ liệu khoảng cách đếm ngược lao xuống va chạm trực diện nổ tung 35.000.000+ DMG!',
        tag: 'COMET HALLEY',
        color: 'from-sky-500 to-blue-700'
      },
      {
        slot: 7,
        keyLabel: '7',
        name: '🌌 SS-021: Quasar',
        desc: 'Thiên hà Quasar thu nhỏ vào tâm -> Siêu laser trắng bắn xuống 1.000.000+ DMG/0.2s (20s) -> Nổ nén Singularity 50.000.000+ DMG!',
        tag: 'QUASAR JET',
        color: 'from-pink-500 to-purple-700'
      },
      {
        slot: 8,
        keyLabel: '8',
        name: '🕳️ SS-07: Event Horizon',
        desc: 'Lỗ sâu không gian vũ trụ phát sáng -> Tụ năng lượng tím vào đầu lỗ đen -> Rơi xuống hút chặt và nổ Singularity 3.800.000+ DMG x Mul!',
        tag: 'EVENT HORIZON',
        color: 'from-purple-600 via-fuchsia-600 to-slate-900'
      },
      {
        slot: 9,
        keyLabel: '9',
        name: '⚛️ SS-08: Neutron Star',
        desc: '2 Ngôi sao neutron xoay quanh tiếp cận -> Hợp nhất Kilonova khối cầu trắng sáng lao xuống giáng 4.500.000+ DMG + 150.000+ Radiation DoT!',
        tag: 'KILONOVA MERGER',
        color: 'from-sky-400 via-white to-indigo-700'
      },
      {
        slot: 10,
        keyLabel: '0',
        name: '💥 SS-FINAL: Big Bang',
        desc: 'Cỗ máy gia tốc hạt dung hợp vô số electron & proton thành điểm kỳ dị ➔ Khai sinh siêu vụ nổ Big Bang 10.000.000+ DMG x Mul cực hạn!',
        tag: 'BIG BANG FINAL',
        color: 'from-fuchsia-600 via-rose-600 to-amber-400'
      }
    ];
  }

  // Slot 1: Signature / Ultimate
  if (weapon === 'cancau' && role === 'bathuong') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Hắc Long 18 - Long Hồn Đoạn Hải',
      desc: 'Khóa địch & luôn lao vào địch (CD 20s) -> Giáng thế 125 DMG + Cầu lửa 5s (5 DMG/0.2s) -> Cột lửa trào dâng (2.5 DMG/0.035s)!',
      tag: 'HẮC LONG THẬP BÁT',
      color: 'from-orange-600 to-red-800'
    });
  } else if (role === 'bathuong') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Thanh Long Tuyệt Kỹ Ngẫu Nhiên',
      desc: 'Kích hoạt ngẫu nhiên 1 trong 6 Tuyệt kỹ Thanh Long Thần Thánh!',
      tag: 'BÁ THƯỜNG',
      color: 'from-emerald-600 to-teal-800'
    });
  } else if (role === 'than_trieuvan') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Nhai Giác Lưu Tinh Trảm',
      desc: 'Lao vào xoay thương chém 10 lần (10 DMG/lần) -> Cự Thương giáng thế (125 DMG) phát nổ (25 DMG) -> Đâm kết liễu 275 DMG!',
      tag: 'THẦN-TRIỆU VÂN',
      color: 'from-amber-400 to-sky-600'
    });
  } else if (role === 'than_liubei') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Hán Thất Nghiêm Đông (Thần)',
      desc: 'Cự Kiếm Hỏa 140 DMG + Cự Kiếm Băng 140 DMG + Trảm Kết Liễu 350 DMG!',
      tag: 'THẦN-LƯU BỊ',
      color: 'from-sky-400 to-amber-600'
    });
  } else if (role === 'liubei') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Hán Thất Nghiêm Đông',
      desc: 'Cự Kiếm Hỏa 100 DMG + Cự Kiếm Băng 100 DMG (Đóng băng 1.5s) + Trảm Kết Liễu 250 DMG!',
      tag: 'ĐẾ VƯƠNG',
      color: 'from-sky-500 to-blue-700'
    });
  } else if (role === 'trieuvan') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Thương Xuất Như Long',
      desc: 'Lao tới đâm thương liên kích, tăng 10% HP & 10% DMG!',
      tag: 'TRIỆU VÂN',
      color: 'from-sky-600 to-indigo-700'
    });
  } else if (role === 'admin') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Admin Freeze & Nuke Command',
      desc: 'Đóng băng đối thủ 2.5s và kích nổ xung lực quản trị viên!',
      tag: 'ADMIN COMMAND',
      color: 'from-rose-600 to-red-800'
    });
  } else if (weapon === 'cancau') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Tung Cần Móc Câu Nhanh',
      desc: 'Reset hồi chiêu và ném lưỡi câu lập tức!',
      tag: 'CẦN CÂU',
      color: 'from-amber-600 to-amber-800'
    });
  } else if (weapon === 'songkiem') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Liên Hoàn Kiếm Vũ',
      desc: 'Lao vào chém liên hoàn 6 nhát kiếm khí tốc độ cao!',
      tag: 'SONG KIẾM',
      color: 'from-cyan-600 to-blue-700'
    });
  } else if (weapon === 'upgraded_railgun') {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: '⚡ Tuyệt Kỹ Ultra Laser (1000 DMG)',
      desc: 'Tích tụ năng lượng trong 2s rồi phóng 1 quả cầu nổ hủy diệt bay thẳng về phía đối thủ, phát nổ gây 1.000 DMG!',
      tag: 'ULTRA LASER',
      color: 'from-cyan-500 via-sky-600 to-indigo-800'
    });
  } else {
    list.push({
      slot: 1,
      keyLabel: '1',
      name: 'Kích Hoạt Kỹ Năng Tối Thượng',
      desc: 'Giải phóng toàn bộ uy lực vũ khí và nội tại hiện tại!',
      tag: 'ULTIMATE',
      color: 'from-cyan-600 to-indigo-700'
    });
  }

  // Slot 2: Secondary / Weapon Skill
  if (weapon === 'than_songkiem' || role === 'than_liubei') {
    list.push({
      slot: 2,
      keyLabel: '2',
      name: 'Triều Đình Trợ Ta Khôi Phục',
      desc: 'Kích hoạt thánh chỉ cứu trợ triều đình, hồi phục ngay +30% Max HP!',
      tag: 'THÁNH CHỈ HỒI PHỤC',
      color: 'from-emerald-500 to-lime-700'
    });
  } else if (weapon === 'cancau') {
    list.push({
      slot: 2,
      keyLabel: '2',
      name: 'Móc Lưỡi (Lưỡi Câu Sát Thương)',
      desc: 'Ném lưỡi câu 10 DMG -> Kéo về mình -> Bồi đập 20 DMG + Đập tường!',
      tag: 'KỸ NĂNG VŨ KHÍ',
      color: 'from-amber-600 to-yellow-700'
    });
  } else if (weapon === 'songkiem') {
    list.push({
      slot: 2,
      keyLabel: '2',
      name: 'Nhất Quang Tụ Khí',
      desc: 'Đứng im tụ khí 1.6s -> Phóng luồng kiếm khổng lồ 30 DMG xuyên sàn đấu!',
      tag: 'KỸ NĂNG VŨ KHÍ',
      color: 'from-emerald-600 to-teal-700'
    });
  } else if (role === 'bathuong') {
    list.push({
      slot: 2,
      keyLabel: '2',
      name: 'Long Nhân Hợp Nhất',
      desc: 'Hóa thân Long Nhân (Tóc, Sừng, Tay rồng) +15% DMG & Tốc, -1 HP/0.3s tỉ lệ theo Max HP!',
      tag: 'BIẾN HÌNH BÁ THƯỜNG',
      color: 'from-emerald-600 to-cyan-700'
    });
  } else {
    list.push({
      slot: 2,
      keyLabel: '2',
      name: 'Đột Kích Vũ Khí',
      desc: 'Tăng tốc lao tới tung đòn cận chiến vũ lực cao!',
      tag: 'VŨ KHÍ',
      color: 'from-blue-600 to-indigo-700'
    });
  }

  // Slot 3..7 for Bá Thường
  if (role === 'bathuong') {
    list.push(
      { slot: 3, keyLabel: '3', name: '🐉 Du Long Bái Vĩ', desc: 'Phóng 20 đợt sóng rồng xanh lục 10 DMG!', tag: 'THANH LONG', color: 'from-emerald-600 to-teal-700' },
      { slot: 4, keyLabel: '4', name: '🌪️ Ngọa Long Phiên Đăng', desc: 'Mũi khoan xanh lá 45 DMG xoay tròn!', tag: 'THANH LONG', color: 'from-teal-600 to-cyan-700' },
      { slot: 5, keyLabel: '5', name: '⚡ Thần Long Na Di', desc: 'Dịch chuyển tức thời tới đối thủ + 25 DMG!', tag: 'THANH LONG', color: 'from-cyan-600 to-blue-700' },
      { slot: 6, keyLabel: '6', name: '🗡️ Tiềm Long Vật Dụng', desc: 'Ném song kiếm tầm xa gây 35 DMG!', tag: 'THANH LONG', color: 'from-sky-600 to-indigo-700' },
      { slot: 7, keyLabel: '7', name: '🐲 Long Ngẩng Đầu', desc: 'Sóng âm chấn động Thanh Long 40 DMG!', tag: 'THANH LONG', color: 'from-emerald-600 to-green-700' }
    );
  } else {
    list.push(
      { slot: 3, keyLabel: '3', name: '⚡ Đòn Quét Nhanh', desc: 'Vung vũ khí quét vòng quanh thân bóng!', tag: 'KỸ NĂNG', color: 'from-slate-700 to-slate-800' },
      { slot: 4, keyLabel: '4', name: '🛡️ Phòng Ngự Kiên Cố', desc: 'Tăng khả năng chống chịu và giảm lực đẩy!', tag: 'BỔ TRỢ', color: 'from-slate-700 to-slate-800' },
      { slot: 5, keyLabel: '5', name: '💨 Tăng Tốc Xung Kích', desc: 'Tăng tốc độ di chuyển đột ngột!', tag: 'CƠ ĐỘNG', color: 'from-slate-700 to-slate-800' },
      { slot: 6, keyLabel: '6', name: '🔥 Bộc Phát Nội Năng', desc: 'Giải phóng sóng năng lượng gây sát thương!', tag: 'KỸ NĂNG', color: 'from-slate-700 to-slate-800' },
      { slot: 7, keyLabel: '7', name: '🌀 Lốc Xoáy Áp Đảo', desc: 'Tạo vùng xoáy hút đối thủ lại gần!', tag: 'KỸ NĂNG', color: 'from-slate-700 to-slate-800' }
    );
  }

  // General filler slots up to 0
  list.push(
    { slot: 8, keyLabel: '8', name: '⚡ Tụ Lực Đòn Đánh', desc: 'Tập trung năng lượng tung đòn va chạm tức thì!', tag: 'BỔ TRỢ', color: 'from-slate-800 to-slate-900' },
    { slot: 9, keyLabel: '9', name: '💥 Đột Kích Trực Diện', desc: 'Lao thẳng vào đối thủ và gây sát thương!', tag: 'BỔ TRỢ', color: 'from-slate-800 to-slate-900' },
    { slot: 10, keyLabel: '0', name: '🎯 Đánh Thường / Strike', desc: 'Kích hoạt đòn tấn công thường ngay lập tức!', tag: 'TẤN CÔNG', color: 'from-slate-800 to-slate-900' }
  );

  return list;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'game' | 'code'>('game');
  const [coins, setCoins] = useState<number>(() => loadCoins());
  const [inventory, setInventory] = useState<Record<string, number>>(() => loadInv());

  // Weapon Unlocks
  const [cancauUnlocked, setCancauUnlocked] = useState<boolean>(() => {
    return loadUnlock('cancau_unlocked') || localStorage.getItem('cancau_unlocked') === null;
  });
  const [songkiemUnlocked, setSongkiemUnlocked] = useState<boolean>(() => {
    return loadUnlock('songkiem_unlocked') || localStorage.getItem('songkiem_unlocked') === null;
  });
  const [railgunUnlocked, setRailgunUnlocked] = useState<boolean>(() => {
    return loadUnlock('railgun_unlocked') || localStorage.getItem('railgun_unlocked') === null;
  });
  const [maceUnlocked, setMaceUnlocked] = useState<boolean>(() => loadUnlock('mace_unlocked'));
  const [songthuUnlocked, setSongthuUnlocked] = useState<boolean>(() => loadUnlock('songthu_unlocked'));
  const [minigunUnlocked, setMinigunUnlocked] = useState<boolean>(() => loadUnlock('minigun_unlocked'));
  const [satnaUnlocked, setSatnaUnlocked] = useState<boolean>(() => loadUnlock('satna_unlocked'));
  const [torchUnlocked, setTorchUnlocked] = useState<boolean>(() => loadUnlock('torch_unlocked'));
  const [devNntlUnlocked, setDevNntlUnlocked] = useState<boolean>(() => loadUnlock('dev_nntl_unlocked'));
  const [computerUnlocked, setComputerUnlocked] = useState<boolean>(true);
  const [daynitUnlocked, setDaynitUnlocked] = useState<boolean>(() => loadUnlock('daynit_unlocked'));
  const [thuongthanUnlocked, setThuongthanUnlocked] = useState<boolean>(() => loadUnlock('thuong_than_unlocked') || loadUnlock('thuongthan_unlocked') || loadTrieuVanWins() >= 20);
  const [thanSongkiemUnlocked, setThanSongkiemUnlocked] = useState<boolean>(() => loadUnlock('than_songkiem_unlocked') || loadLuuBeiWins() >= 20);
  const [stellarUnlocked, setStellarUnlocked] = useState<boolean>(() => {
    return loadUnlock('stellar_remote_unlocked') || loadRailgunMirrorWins() >= 1000;
  });
  const [railgunMirrorWins, setRailgunMirrorWins] = useState<number>(() => loadRailgunMirrorWins());
  const [showStellarMenuModal, setShowStellarMenuModal] = useState<boolean>(false);

  // Language & Internationalization (3 Options: Tiếng Việt, English, Tiếng Nga gốc)
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => getSavedLanguage());
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('game_language_chosen');
    } catch {
      return false;
    }
  });
  const t = TRANSLATIONS[currentLang];

  // Upgraded Railgun State
  const [upgradedRailgunUnlocked, setUpgradedRailgunUnlocked] = useState<boolean>(true);

  // Post-Battle Performance Summary Modal State
  const [showMatchSummary, setShowMatchSummary] = useState<boolean>(false);
  const [matchSummaryStats, setMatchSummaryStats] = useState<MatchBattleStats | null>(null);

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    saveLanguage(lang);
    try {
      localStorage.setItem('game_language_chosen', 'true');
    } catch {}
    setCurrentLang(lang);
    setShowLanguageModal(false);
  };

  // Role Unlocks
  const [roleOwned, setRoleOwned] = useState<boolean>(() => loadUnlock('role_survivalist'));
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() => loadUnlock('role_admin_unlocked'));
  const [werewolfOwned, setWerewolfOwned] = useState<boolean>(() => loadUnlock('role_werewolf'));
  const [sotanUnlocked, setSotanUnlocked] = useState<boolean>(() => loadUnlock('role_sotan_unlocked'));
  const [bathuongOwned, setBathuongOwned] = useState<boolean>(() => loadUnlock('role_bathuong'));
  const [liubeiOwned, setLiubeiOwned] = useState<boolean>(() => loadUnlock('role_liubei'));
  const [thanLiubeiUnlocked, setThanLiubeiUnlocked] = useState<boolean>(() => loadUnlock('role_than_liubei_unlocked') || loadUnlock('role_than_liubei') || loadLuuBeiWins() >= 20);
  const [trieuvanOwned, setTrieuvanOwned] = useState<boolean>(true);
  const [thanTrieuvanUnlocked, setThanTrieuvanUnlocked] = useState<boolean>(() => loadUnlock('role_than_trieuvan_unlocked') || loadUnlock('role_than_trieuvan') || loadTrieuVanWins() >= 20);
  const [theOwnerUnlocked, setTheOwnerUnlocked] = useState<boolean>(() => loadUnlock('role_the_owner_unlocked') ?? true);

  // Win stats
  const [trieuvanWins, setTrieuvanWins] = useState<number>(() => loadTrieuVanWins());
  const [luubeiWins, setLuubeiWins] = useState<number>(() => loadLuuBeiWins());

  // Setup selections
  const [selectedHp, setSelectedHp] = useState<number>(500);
  const [selectedMap, setSelectedMap] = useState<'standard' | 'sandbox' | 'tower_defense'>('standard');
  const [playerWeapon, setPlayerWeapon] = useState<WeaponKey>('cancau');
  const [enemyWeapon, setEnemyWeapon] = useState<WeaponKey | 'random'>('random');
  const [equippedElement, setEquippedElement] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleType>('sotan');
  const [enemyElementKey, setEnemyElementKey] = useState<string | 'random'>('random');
  const [enemyRole, setEnemyRole] = useState<RoleType | 'random'>('random');

  // The Owner Game 7B% Secret Role States
  const [theOwnerClicks, setTheOwnerClicks] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('the_owner_clicks') || '0', 10) || 0;
    } catch {
      return 0;
    }
  });
  const [theOwner7bUnlocked, setTheOwner7bUnlocked] = useState<boolean>(() => {
    try {
      return loadUnlock('role_the_owner_7b_unlocked') || parseInt(localStorage.getItem('the_owner_clicks') || '0', 10) >= 777;
    } catch {
      return false;
    }
  });
  const [showTheOwner7bModal, setShowTheOwner7bModal] = useState<boolean>(false);

  // 2v2 Mode Selection States
  const [is2v2, setIs2v2] = useState<boolean>(false);
  const [player2Weapon, setPlayer2Weapon] = useState<WeaponKey>('cancau');
  const [player2Element, setPlayer2Element] = useState<string | null>('lightning_10');
  const [player2Role, setPlayer2Role] = useState<RoleType>('bathuong');
  const [enemy2Weapon, setEnemy2Weapon] = useState<WeaponKey | 'random'>('giao');
  const [enemy2Element, setEnemy2Element] = useState<string | 'random'>('random');
  const [enemy2Role, setEnemy2Role] = useState<RoleType | 'random'>('random');

  // Weapon Shop Modal State
  const [showWeaponShopModal, setShowWeaponShopModal] = useState<boolean>(false);
  const [devCodeInput, setDevCodeInput] = useState<string>('');
  const [devCodeError, setDevCodeError] = useState<string | null>(null);

  // Guide & Puzzle Solutions Modal State
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [guideActiveTab, setGuideActiveTab] = useState<'gameplay' | 'weapons_roles' | 'puzzles' | 'admin_cmds' | 'credits'>('gameplay');
  const [guideCatalogTab, setGuideCatalogTab] = useState<'weapons' | 'roles'>('weapons');
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);

  // SoTan Secret Role Modal State
  const [showSotanModal, setShowSotanModal] = useState<boolean>(false);
  const [sotanInputCode, setSotanInputCode] = useState<string>('');
  const [sotanModalError, setSotanModalError] = useState<string | null>(null);

  // Minigun Quiz Modal State
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [quizError, setQuizError] = useState<string | null>(null);

  // Admin Verification Modal & Console State
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminInputName, setAdminInputName] = useState<string>('');
  const [adminModalError, setAdminModalError] = useState<string | null>(null);
  const [showAdminConsole, setShowAdminConsole] = useState<boolean>(false);
  const [adminCmdInput, setAdminCmdInput] = useState<string>('');
  const [adminLogs, setAdminLogs] = useState<string[]>([
    '[HỆ THỐNG]: Bảng điều khiển Admin đã sẵn sàng. Gõ lệnh /give <tên> <số lượng> để cấp vật phẩm.'
  ]);

  // Game state
  const [inBattle, setInBattle] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // 3D / 4D Dimension Mode state ('2d' | '3d' | '4d') - Customizable per player, defaults to 2d (smooth 60fps)
  const [dimensionMode, setDimensionMode] = useState<'2d' | '3d' | '4d'>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('preferred_dimension_mode');
      if (saved === '2d' || saved === '3d' || saved === '4d') return saved;
    }
    return '2d';
  });

  const handleSetDimensionMode = (mode: '2d' | '3d' | '4d') => {
    setDimensionMode(mode);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred_dimension_mode', mode);
    }
    if (engineRef.current) {
      engineRef.current.setDimensionMode(mode);
    }
  };

  // Audio state
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getSettings().muted);
  const [sfxVolume, setSfxVolume] = useState<number>(() => sound.getSettings().sfxVolume);
  const [bgmVolume, setBgmVolume] = useState<number>(() => sound.getSettings().bgmVolume);
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(() => sound.getSettings().bgmEnabled);
  const [showSoundModal, setShowSoundModal] = useState<boolean>(false);

  const handleToggleMute = () => {
    sound.ensureContext();
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleSetSfxVolume = (val: number) => {
    sound.setSFXVolume(val);
    setSfxVolume(val);
  };

  const handleSetBgmVolume = (val: number) => {
    sound.setBGMVolume(val);
    setBgmVolume(val);
  };

  const handleToggleBgm = () => {
    const next = !bgmEnabled;
    sound.setBGMEnabled(next);
    setBgmEnabled(next);
  };

  const handlePlayTestSound = (type: 'hit' | 'slash' | 'skill' | 'ultimate' | 'coin') => {
    sound.ensureContext();
    if (type === 'hit') sound.playHit(true);
    else if (type === 'slash') sound.playSlash();
    else if (type === 'skill') sound.playSkillCast(1);
    else if (type === 'ultimate') sound.playUltimate();
    else if (type === 'coin') sound.playCoin();
  };

  // Skill Hotbar Cooldowns (slot -> expiresAt timestamp in ms)
  const [skillCooldowns, setSkillCooldowns] = useState<Record<number, number>>({});
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());

  // Cooldown countdown timer effect
  useEffect(() => {
    const hasActive = (Object.values(skillCooldowns) as number[]).some(exp => exp > Date.now());
    if (!hasActive) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);

    return () => clearInterval(interval);
  }, [skillCooldowns]);

  const handleTriggerSkillSlot = (slot: number) => {
    const now = Date.now();
    const cdEnd = skillCooldowns[slot] || 0;
    if (cdEnd > now) return;

    const result = engineRef.current?.triggerSkillSlot(slot);
    if (result !== false) {
      const expiresAt = now + 20000;
      setSkillCooldowns(prev => ({ ...prev, [slot]: expiresAt }));
      setCurrentTime(now);
    }
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<BallGameEngine | null>(null);
  const logsEndRef = useRef<HTMLDivElement | null>(null);

  // Keyboard QTE & Sandbox WASD + Skill Hotbar (1-0) listener
  useEffect(() => {
    if (!inBattle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const k = e.key;
      // QTE minigame handling
      if (['w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(k)) {
        engineRef.current?.handleQTEInput(k);
      }

      // WASD / Sandbox / Skill keys 1-0
      engineRef.current?.handleKeyDown(k);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      engineRef.current?.handleKeyUp(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inBattle]);

  // Sync coins, inventory, wins, and unlock states from engine or updates
  const refreshStorage = () => {
    setCoins(loadCoins());
    setInventory(loadInv());
    setTrieuvanWins(loadTrieuVanWins());
    setLuubeiWins(loadLuuBeiWins());
    const rWins = loadRailgunMirrorWins();
    setRailgunMirrorWins(rWins);
    const hasOwner = theOwnerUnlocked || selectedRole === 'the_owner' || selectedRole === 'the_owner_7b' || theOwner7bUnlocked || devNntlUnlocked || adminUnlocked;
    setStellarUnlocked(loadUnlock('stellar_remote_unlocked') || hasOwner || rWins >= 1000);
    setThuongthanUnlocked(loadUnlock('thuong_than_unlocked') || loadUnlock('thuongthan_unlocked') || loadTrieuVanWins() >= 20);
    setThanSongkiemUnlocked(loadUnlock('than_songkiem_unlocked') || loadLuuBeiWins() >= 20);
  };

  const handleRollElement = () => {
    if (coins < 100) {
      alert('Bạn không đủ xu (cần 100 xu)! Hãy đấu thắng để kiếm thêm hoặc dùng lệnh Admin.');
      return;
    }
    const newCoins = coins - 100;
    setCoins(newCoins);
    saveCoins(newCoins);

    const picked = rollElementKey();
    const newInv = { ...inventory, [picked]: (inventory[picked] || 0) + 1 };
    setInventory(newInv);
    saveInv(newInv);

    if (picked.startsWith('glitch') && !torchUnlocked) {
      setTorchUnlocked(true);
      saveUnlock('torch_unlocked');
    }
  };

  const handleMergeAll = () => {
    const newInv = mergeAll(inventory);
    setInventory(newInv);
    saveInv(newInv);
  };

  const handleBuySurvivalist = () => {
    if (roleOwned) {
      setSelectedRole(selectedRole === 'survivalist' ? null : 'survivalist');
      return;
    }
    if (coins < ROLE_COST) {
      alert(`Thiếu xu! Cần ${ROLE_COST} xu để mở khóa Survivalist.`);
      return;
    }
    const newCoins = coins - ROLE_COST;
    setCoins(newCoins);
    saveCoins(newCoins);
    setRoleOwned(true);
    saveUnlock('role_survivalist');
    setSelectedRole('survivalist');
  };

  // Open Admin verification modal or toggle role
  const handleAdminAuthClick = () => {
    if (adminUnlocked) {
      setSelectedRole(selectedRole === 'admin' ? null : 'admin');
    } else {
      setAdminModalError(null);
      setAdminInputName('');
      setShowAdminModal(true);
    }
  };

  // Verify Admin Name / Password
  const handleConfirmAdminAuth = (customName?: string) => {
    const targetName = customName || adminInputName;
    if (!targetName.trim()) {
      setAdminModalError('Vui lòng nhập tên Admin hoặc mã xác nhận!');
      return;
    }

    if (isDeveloperNNTL(targetName)) {
      setAdminUnlocked(true);
      setDevNntlUnlocked(true);
      saveUnlock('role_admin_unlocked');
      saveUnlock('dev_nntl_unlocked');
      saveUnlock('sangthe_unlocked');
      setSelectedRole('admin');
      setPlayerWeapon('sangthe');
      setShowAdminModal(false);
      setShowAdminConsole(true);

      // Trao tặng ngay toàn bộ Element XV
      const xv = getAllElementsXV();
      const newInv = { ...inventory };
      Object.keys(xv).forEach(k => {
        newInv[k] = (newInv[k] || 0) + 10;
      });
      setInventory(newInv);
      saveInv(newInv);

      // Mở khóa toàn bộ vũ khí ẩn cho Nhà Phát Triển NNTL
      setCancauUnlocked(true);
      setSongkiemUnlocked(true);
      setRailgunUnlocked(true);
      setMaceUnlocked(true);
      setSongthuUnlocked(true);
      setMinigunUnlocked(true);
      setSatnaUnlocked(true);
      setTorchUnlocked(true);
      saveUnlock('cancau_unlocked');
      saveUnlock('songkiem_unlocked');
      saveUnlock('railgun_unlocked');
      saveUnlock('mace_unlocked');
      saveUnlock('songthu_unlocked');
      saveUnlock('minigun_unlocked');
      saveUnlock('satna_unlocked');
      saveUnlock('torch_unlocked');

      const welcomeMsg = `👑 [XÁC THỰC NHÀ PHÁT TRIỂN NNTL TỐI CAO THÀNH CÔNG]: Xin chào NNTL! Đã kích hoạt [SÁNG THẾ CHI KIẾM] (777.7777 DMG) độc quyền và toàn bộ vũ khí!`;
      setAdminLogs(prev => [...prev, welcomeMsg]);
      alert(welcomeMsg);
      return;
    }

    if (isValidAdmin(targetName)) {
      setAdminUnlocked(true);
      saveUnlock('role_admin_unlocked');
      setSelectedRole('admin');
      setShowAdminModal(false);
      setShowAdminConsole(true);

      // Trao tặng ngay toàn bộ Element XV
      const xv = getAllElementsXV();
      const newInv = { ...inventory };
      Object.keys(xv).forEach(k => {
        newInv[k] = (newInv[k] || 0) + 5;
      });
      setInventory(newInv);
      saveInv(newInv);

      // Mở khóa toàn bộ vũ khí ẩn cho Admin
      setCancauUnlocked(true);
      setSongkiemUnlocked(true);
      setRailgunUnlocked(true);
      setMaceUnlocked(true);
      setMinigunUnlocked(true);
      setSatnaUnlocked(true);
      setTorchUnlocked(true);
      saveUnlock('cancau_unlocked');
      saveUnlock('songkiem_unlocked');
      saveUnlock('railgun_unlocked');
      saveUnlock('mace_unlocked');
      saveUnlock('minigun_unlocked');
      saveUnlock('satna_unlocked');
      saveUnlock('torch_unlocked');

      const welcomeMsg = `[XÁC THỰC ADMIN THÀNH CÔNG]: Xin chào ${targetName.trim().toUpperCase()}! Đã tự động cấp toàn bộ Element Cấp XV và mở khóa vũ khí!`;
      setAdminLogs(prev => [...prev, welcomeMsg]);
    } else {
      setAdminModalError('Tên Admin không hợp lệ! Bạn phải dùng 1 trong các tên Admin hoặc mã Nhà Phát Triển (NNTL).');
    }
  };

  const handleExecuteAdminCmd = (customCmd?: string) => {
    const cmdToRun = customCmd || adminCmdInput;
    if (!cmdToRun.trim()) return;

    const res = executeAdminCommand(cmdToRun, coins, inventory);
    if (res.success) {
      if (res.coinsDelta) {
        setCoins(loadCoins());
      }
      if (res.newInventory) {
        setInventory(res.newInventory);
      }
      if (res.unlockedWeapons) {
        if (res.unlockedWeapons.includes('mace_unlocked')) setMaceUnlocked(true);
        if (res.unlockedWeapons.includes('minigun_unlocked')) setMinigunUnlocked(true);
        if (res.unlockedWeapons.includes('satna_unlocked')) setSatnaUnlocked(true);
        if (res.unlockedWeapons.includes('torch_unlocked')) setTorchUnlocked(true);
        if (res.unlockedWeapons.includes('cancau_unlocked')) setCancauUnlocked(true);
        if (res.unlockedWeapons.includes('songkiem_unlocked')) setSongkiemUnlocked(true);
        if (res.unlockedWeapons.includes('railgun_unlocked')) setRailgunUnlocked(true);
        if (res.unlockedWeapons.includes('songthu_unlocked')) setSongthuUnlocked(true);
        if (res.unlockedWeapons.includes('dev_nntl_unlocked')) setDevNntlUnlocked(true);
        if (res.unlockedWeapons.includes('daynit_unlocked')) setDaynitUnlocked(true);
      }
      if (res.unlockedRoles) {
        if (res.unlockedRoles.includes('role_admin_unlocked')) setAdminUnlocked(true);
        if (res.unlockedRoles.includes('role_werewolf')) setWerewolfOwned(true);
        if (res.unlockedRoles.includes('role_survivalist')) setRoleOwned(true);
        if (res.unlockedRoles.includes('role_bathuong')) setBathuongOwned(true);
        if (res.unlockedRoles.includes('role_liubei')) setLiubeiOwned(true);
        if (res.unlockedRoles.includes('role_sotan_unlocked')) setSotanUnlocked(true);
      }
      setAdminLogs(prev => [...prev, `> ${cmdToRun}`, res.message]);
    } else {
      setAdminLogs(prev => [...prev, `> ${cmdToRun}`, res.message]);
    }

    if (!customCmd) {
      setAdminCmdInput('');
    }
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [adminLogs]);

  // Weapon Shop Buy & Equip Handler
  const handleBuyWeapon = (item: ShopWeaponItem) => {
    if (item.isFree) {
      setPlayerWeapon(item.key);
      alert(`Đã trang bị vũ khí miễn phí [${item.name}]!`);
      return;
    }

    if (item.isDevOnly) {
      if (devNntlUnlocked) {
        setPlayerWeapon('sangthe');
        alert(`👑 [NHÀ PHÁT TRIỂN NNTL]: Đã trang bị Sáng Thế Chi Kiếm (777.7777 DMG)!`);
        return;
      }
      const code = prompt('👑 VŨ KHÍ ĐỘC QUYỀN NHÀ PHÁT TRIỂN\nVui lòng nhập mã định danh Nhà Phát Triển (NNTL):');
      if (code && isDeveloperNNTL(code)) {
        setDevNntlUnlocked(true);
        saveUnlock('dev_nntl_unlocked');
        saveUnlock('sangthe_unlocked');
        setPlayerWeapon('sangthe');
        alert('🎉 [XÁC THỰC THÀNH CÔNG]: Chào mừng Nhà Phát Triển NNTL! Đã mở khóa và trang bị Sáng Thế Chi Kiếm (777.7777 DMG).');
      } else if (code) {
        alert('❌ Mã Nhà Phát Triển không chính xác! Chỉ NNTL mới được sử dụng Sáng Thế Chi Kiếm.');
      }
      return;
    }

    if (item.isOwnerOnly || item.key === 'daynit') {
      const hasOwnerPrivilege = theOwnerUnlocked || selectedRole === 'the_owner' || devNntlUnlocked || adminUnlocked;
      if (hasOwnerPrivilege) {
        setDaynitUnlocked(true);
        saveUnlock('daynit_unlocked');
        setPlayerWeapon('daynit');
        alert('👑 [ĐẶC QUYỀN THE OWNER]: Xác nhận đặc quyền The Owner thành công!\nĐã trang bị Dây Nịt Tử Thần (1 hit = 36,179% Max HP/5s + 50% Choáng Đau Đớn).');
        return;
      }
      alert('❌ [TỪ CHỐI TRUY CẬP]: Vũ khí Dây Nịt Tử Thần chỉ dành riêng cho người có đặc quyền The Owner!\nHãy chọn Role "The Owner Game" hoặc dùng lệnh Admin/mã xác thực.');
      return;
    }

    if (item.key === 'stellar_remote') {
      const hasOwner = theOwnerUnlocked || selectedRole === 'the_owner' || selectedRole === 'the_owner_7b' || theOwner7bUnlocked || devNntlUnlocked || adminUnlocked;
      const isUnlocked = stellarUnlocked || hasOwner || loadUnlock('stellar_remote_unlocked') || loadRailgunMirrorWins() >= 1000;
      if (isUnlocked) {
        setStellarUnlocked(true);
        saveUnlock('stellar_remote_unlocked');
        setPlayerWeapon('stellar_remote');
        if (hasOwner && loadRailgunMirrorWins() < 1000) {
          alert('👑 [ĐẶC QUYỀN THE OWNER]: Đặc quyền The Owner xác nhận!\nĐã kích hoạt hỗ trợ Owner: Mở khóa và trang bị Stellar Remote ngay lập tức (Miễn cày 1000 trận)!\nCác tuyệt kỹ vũ trụ SS-01, SS-03, SS-04, SS-05 được tăng cường sức mạnh Thần Thánh!');
        } else {
          alert('🛰️ [STELLAR REMOTE ĐÃ TRANG BỊ]: Thiết bị điều khiển vệ tinh quỹ đạo tối cao sẵn sàng!\nTrong trận đấu, click vào vệ tinh trên bóng hoặc nhấn phím kỹ năng để mở Menu 4 Siêu Tuyệt Kỹ Vũ Trụ: SS-01 Railgun, SS-03 Gungir, SS-04 Seven Star, SS-05 Tesseract!');
        }
        return;
      }
      alert(`🔒 [NHIỆM VỤ STELLAR REMOTE CHƯA HOÀN THÀNH]:\nCách nhận: Đánh thắng 1000 trận với 2 khẩu Railgun chọi nhau không buff (không nguyên tố, không vai trò).\nTiến độ hiện tại: ${loadRailgunMirrorWins()}/1000 trận thắng!\n(💡 Hoặc chọn Vai Trò THE OWNER / ADMIN để lập tức mở khóa bằng Đặc Quyền!).`);
      return;
    }

    if (item.key === 'thuongthan') {
      const isUnlocked = thuongthanUnlocked || loadUnlock('thuong_than_unlocked') || loadUnlock('thuongthan_unlocked') || loadTrieuVanWins() >= 20;
      if (isUnlocked) {
        setThuongthanUnlocked(true);
        setPlayerWeapon('thuongthan');
        alert('🔱 Đã trang bị Thương Thần (Long Đảm)!');
        return;
      }
      alert(`🔒 Chưa hoàn thành nhiệm vụ! Dùng Triệu Vân + Giáo Chiến thắng 20 trận (Hiện tại: ${loadTrieuVanWins()}/20) để mở khóa!`);
      return;
    }

    if (item.key === 'than_songkiem') {
      const isUnlocked = thanSongkiemUnlocked || loadUnlock('than_songkiem_unlocked') || loadLuuBeiWins() >= 20;
      if (isUnlocked) {
        setThanSongkiemUnlocked(true);
        setPlayerWeapon('than_songkiem');
        alert('⚔️ Đã trang bị Thần Song Kiếm (Long Phụng)!');
        return;
      }
      alert(`🔒 Chưa hoàn thành nhiệm vụ! Dùng Lưu Bị + Song Kiếm thắng 20 trận (Hiện tại: ${loadLuuBeiWins()}/20) để mở khóa!`);
      return;
    }

    // Check if already owned
    const isOwned =
      item.isFree ||
      (item.key === 'computer' && computerUnlocked) ||
      (item.key === 'daynit' && (daynitUnlocked || theOwnerUnlocked || selectedRole === 'the_owner')) ||
      (item.key === 'cancau' && cancauUnlocked) ||
      (item.key === 'songkiem' && songkiemUnlocked) ||
      (item.key === 'railgun' && railgunUnlocked) ||
      (item.key === 'mace' && maceUnlocked) ||
      (item.key === 'songthu' && songthuUnlocked) ||
      (item.key === 'minigun' && minigunUnlocked) ||
      (item.key === 'satna' && satnaUnlocked) ||
      (item.key === 'torch' && torchUnlocked) ||
      (item.key === 'thuongthan' && thuongthanUnlocked) ||
      (item.key === 'than_songkiem' && thanSongkiemUnlocked) ||
      (item.key === 'stellar_remote' && stellarUnlocked);

    if (isOwned) {
      setPlayerWeapon(item.key);
      alert(`Đã trang bị vũ khí [${item.name}]!`);
      return;
    }

    if (coins < item.price) {
      alert(`Thiếu Xu! Bạn cần ${item.price} Xu để mua [${item.name}] (Hiện có: ${coins} Xu).\nHãy chiến thắng trận đấu 1v1 để nhận thêm +100 Xu mỗi trận hoặc dùng lệnh Admin!`);
      return;
    }

    const newCoins = coins - item.price;
    setCoins(newCoins);
    saveCoins(newCoins);
    saveUnlock(item.unlockKey);

    if (item.key === 'computer') setComputerUnlocked(true);
    if (item.key === 'cancau') setCancauUnlocked(true);
    if (item.key === 'songkiem') setSongkiemUnlocked(true);
    if (item.key === 'railgun') setRailgunUnlocked(true);
    if (item.key === 'mace') setMaceUnlocked(true);
    if (item.key === 'songthu') setSongthuUnlocked(true);
    if (item.key === 'minigun') setMinigunUnlocked(true);
    if (item.key === 'satna') setSatnaUnlocked(true);
    if (item.key === 'torch') setTorchUnlocked(true);

    setPlayerWeapon(item.key);
    alert(`🎉 Mua thành công vũ khí [${item.name}] với giá ${item.price} Xu!\nĐã tự động trang bị vào nhân vật.`);
  };

  const handleDevAuthSubmit = () => {
    if (!devCodeInput.trim()) {
      setDevCodeError('Vui lòng nhập mã định danh Nhà Phát Triển!');
      return;
    }
    if (isDeveloperNNTL(devCodeInput.trim())) {
      setDevNntlUnlocked(true);
      saveUnlock('dev_nntl_unlocked');
      saveUnlock('sangthe_unlocked');
      setPlayerWeapon('sangthe');
      setDevCodeError(null);
      setDevCodeInput('');
      alert('👑 [XÁC THỰC THÀNH CÔNG]: Chào mừng Nhà Phát Triển NNTL! Đã mở khóa Sáng Thế Chi Kiếm (777.7777 DMG).');
    } else {
      setDevCodeError('Mã không chính xác! Chỉ Nhà Phát Triển (NNTL) mới được mở khóa Sáng Thế Chi Kiếm.');
    }
  };

  const handleBuyBaThuong = () => {
    if (bathuongOwned) {
      setSelectedRole(selectedRole === 'bathuong' ? null : 'bathuong');
      return;
    }
    if (coins < BATHUONG_COST) {
      alert(`Thiếu xu! Cần ${BATHUONG_COST} xu để mở khóa Bá Thường.`);
      return;
    }
    const newCoins = coins - BATHUONG_COST;
    setCoins(newCoins);
    saveCoins(newCoins);
    setBathuongOwned(true);
    saveUnlock('role_bathuong');
    setSelectedRole('bathuong');
  };

  const handleBuyLuuBei = () => {
    if (liubeiOwned) {
      setSelectedRole(selectedRole === 'liubei' ? null : 'liubei');
      return;
    }
    if (coins < LIUBEI_COST) {
      alert(`Thiếu xu! Cần ${LIUBEI_COST} xu để mở khóa Lưu Bị.`);
      return;
    }
    const newCoins = coins - LIUBEI_COST;
    setCoins(newCoins);
    saveCoins(newCoins);
    setLiubeiOwned(true);
    saveUnlock('role_liubei');
    setSelectedRole('liubei');
  };

  const handleSelectThanLuuBei = () => {
    const isUnlocked = thanLiubeiUnlocked || loadUnlock('role_than_liubei_unlocked') || loadLuuBeiWins() >= 20;
    if (!isUnlocked) {
      alert(`Chưa hoàn thành nhiệm vụ! Hãy dùng Lưu Bị + Song Kiếm chiến thắng 20 trận (Hiện tại: ${loadLuuBeiWins()}/20) để tiến hóa Thần Song Kiếm & Thần-Lưu Bị!`);
      return;
    }
    setSelectedRole(selectedRole === 'than_liubei' ? null : 'than_liubei');
  };

  const handleSelectTrieuVan = () => {
    setSelectedRole(selectedRole === 'trieuvan' ? null : 'trieuvan');
  };

  const handleSelectThanTrieuVan = () => {
    const isUnlocked = thanTrieuvanUnlocked || loadUnlock('role_than_trieuvan_unlocked') || loadTrieuVanWins() >= 20;
    if (!isUnlocked) {
      alert(`Chưa hoàn thành nhiệm vụ! Hãy dùng Triệu Vân + Giáo chiến thắng 20 trận (Hiện tại: ${loadTrieuVanWins()}/20) để tiến hóa Thương Thần & Thần-Triệu Vân!`);
      return;
    }
    setSelectedRole(selectedRole === 'than_trieuvan' ? null : 'than_trieuvan');
  };

  const handleSelectTheOwner = (increment = 1) => {
    const nextCount = theOwnerClicks + increment;
    setTheOwnerClicks(nextCount);
    try {
      localStorage.setItem('the_owner_clicks', nextCount.toString());
    } catch {}

    // Check if 777 clicks reached for secret evolution
    if (nextCount >= 777 && !theOwner7bUnlocked) {
      setTheOwner7bUnlocked(true);
      saveUnlock('role_the_owner_7b_unlocked');
      setSelectedRole('the_owner_7b');
      setShowTheOwner7bModal(true);
      return;
    }

    if (theOwner7bUnlocked || loadUnlock('role_the_owner_7b_unlocked')) {
      if (selectedRole === 'the_owner_7b') {
        setSelectedRole(null);
      } else {
        setSelectedRole('the_owner_7b');
      }
    } else {
      setSelectedRole(selectedRole === 'the_owner' ? null : 'the_owner');
    }
  };

  const handleSelectTheOwnerStandard = () => {
    setSelectedRole(selectedRole === 'the_owner' ? null : 'the_owner');
  };

  const handleSotanAuthClick = () => {
    if (sotanUnlocked) {
      setSelectedRole(selectedRole === 'sotan' ? null : 'sotan');
    } else {
      setSotanModalError(null);
      setSotanInputCode('');
      setShowSotanModal(true);
    }
  };

  const handleConfirmSotanPassword = (overrideCode?: string) => {
    const raw = (overrideCode || sotanInputCode).trim();
    // Valid password as required by user: API.give.(sở tân béo vãi ò tên ảo ma vãi)
    const targetPass = 'API.give.(sở tân béo vãi ò tên ảo ma vãi)';
    if (raw === targetPass || raw.toLowerCase() === targetPass.toLowerCase() || raw.includes('sở tân béo vãi ò')) {
      setSotanUnlocked(true);
      saveUnlock('role_sotan_unlocked');
      setSelectedRole('sotan');
      setShowSotanModal(false);
      alert('🌌 KÍCH HOẠT THÀNH CÔNG ROLE ẨN [SỞ TÂN]!\n• Tuyệt kỹ: Nhất Điếu Khai Thiên Môn (400 DMG trực diện + Nứt đất thiêu đốt 2 DMG/0.2s)\n• Tứ Thánh Điếu Hồn: Bạch Hổ (+30% DMG), Chu Tước (-5% HP), Thanh Long (Reset toàn bộ hồi chiêu về 1), Huyền Vũ (Miễn nhiễm sát thương 3s)!');
    } else {
      setSotanModalError('Mật khẩu Role Sở Tân không chính xác! Hãy nhập chính xác cú pháp.');
    }
  };

  const handleBuyWerewolf = () => {
    if (werewolfOwned) {
      setSelectedRole(selectedRole === 'werewolf' ? null : 'werewolf');
      return;
    }
    if (coins < WEREWOLF_COST) {
      alert(`Thiếu xu! Cần ${WEREWOLF_COST} xu để mở khóa Werewolf.`);
      return;
    }
    const newCoins = coins - WEREWOLF_COST;
    setCoins(newCoins);
    saveCoins(newCoins);
    setWerewolfOwned(true);
    saveUnlock('role_werewolf');
    setSelectedRole('werewolf');
  };

  const handleSecretUnlockMace = () => {
    if (!maceUnlocked) {
      setMaceUnlocked(true);
      saveUnlock('mace_unlocked');
      alert('✨ Bạn đã tìm thấy bí mật: Đã mở khóa Chùy Bí Mật, Song Thủ & Đuốc!');
    }
  };

  const handleSecretSatna = () => {
    if (!satnaUnlocked) {
      setSatnaUnlocked(true);
      saveUnlock('satna_unlocked');
      alert('✨ Bí thuật thượng cổ: Đã mở khóa Sát Na Vĩnh Hằng!');
    }
  };

  const handleMinigunQuiz = () => {
    if (minigunUnlocked) return;
    setQuizAnswer('');
    setQuizError(null);
    setShowQuizModal(true);
  };

  const handleConfirmQuiz = (overrideAnswer?: string) => {
    const raw = (overrideAnswer || quizAnswer).trim().toLowerCase();
    // Valid answers: 4, 100, 1500, nntl, nguyen ngoc thien long
    if (
      raw === '4' ||
      raw === '100' ||
      raw === '1500' ||
      raw === 'minigun' ||
      isDeveloperNNTL(raw)
    ) {
      setMinigunUnlocked(true);
      saveUnlock('minigun_unlocked');
      setShowQuizModal(false);
      alert('🎉 Chính xác tuyệt đối! Bạn đã giải đố thành công và mở khóa Vũ khí Minigun!');
    } else {
      setQuizError('Đáp án chưa chính xác! Gợi ý: 1+1+1+1=4, 100-100+100=100, 500*3=1500, hoặc tên tác giả: Nguyễn Ngọc Thiên Long (NNTL).');
    }
  };

  const startBattle = () => {
    sound.ensureContext();
    sound.playBattleStart();
    setInBattle(true);
  };

  const exitBattle = () => {
    if (engineRef.current) {
      engineRef.current.stopLoop();
    }
    sound.stopBGM();
    setInBattle(false);
    setSkillCooldowns({});
    refreshStorage();
  };

  useEffect(() => {
    if (inBattle && canvasRef.current) {
      const engine = new BallGameEngine(canvasRef.current);
      engine.dimensionMode = dimensionMode;
      engine.onDimensionChange = (m) => {
        setDimensionMode(m);
      };
      engineRef.current = engine;
      engine.onStateChange = () => {
        refreshStorage();
      };
      engine.onCoinsGained = (amt: number) => {
        setCoins(c => {
          const updated = c + amt;
          localStorage.setItem('game_coins', updated.toString());
          return updated;
        });
      };
      engine.onSkillTriggered = (slot: number, durationMs: number) => {
        const expiresAt = Date.now() + durationMs;
        setSkillCooldowns(prev => ({ ...prev, [slot]: expiresAt }));
        setCurrentTime(Date.now());
      };
      engine.onResetSkillCooldowns = () => {
        setSkillCooldowns({});
      };
      engine.onStellarMenuToggle = (open: boolean) => {
        setShowStellarMenuModal(open);
      };
      engine.onBattleOver = (stats: MatchBattleStats) => {
        setMatchSummaryStats(stats);
        setShowMatchSummary(true);
      };
      engine.initGame({
        playerHp: selectedHp,
        playerWeaponKey: playerWeapon,
        enemyWeaponKey: enemyWeapon,
        playerElementKey: equippedElement,
        playerRole: selectedRole,
        enemyElementKey: enemyElementKey === 'random' ? undefined : enemyElementKey,
        enemyRole: enemyRole === 'random' ? undefined : enemyRole,
        isSandbox: selectedMap === 'sandbox',
        selectedMap: selectedMap,
        isTowerDefense: selectedMap === 'tower_defense',
        is2v2: is2v2,
        player2WeaponKey: player2Weapon,
        player2ElementKey: player2Element || undefined,
        player2Role: player2Role,
        enemy2WeaponKey: enemy2Weapon === 'random' ? undefined : enemy2Weapon,
        enemy2ElementKey: enemy2Element === 'random' ? undefined : enemy2Element,
        enemy2Role: enemy2Role === 'random' ? undefined : enemy2Role
      });

      return () => {
        engine.stopLoop();
      };
    }
  }, [
    inBattle, selectedHp, selectedMap, playerWeapon, enemyWeapon, equippedElement, selectedRole, enemyElementKey, enemyRole,
    is2v2, player2Weapon, player2Element, player2Role, enemy2Weapon, enemy2Element, enemy2Role
  ]);

  // Build list of player available weapons
  const availableWeapons: WeaponKey[] = [...NORMAL_KEYS];
  if (!availableWeapons.includes('computer')) availableWeapons.push('computer');
  if (cancauUnlocked && !availableWeapons.includes('cancau')) availableWeapons.push('cancau');
  if (songkiemUnlocked && !availableWeapons.includes('songkiem')) availableWeapons.push('songkiem');
  if (railgunUnlocked && !availableWeapons.includes('railgun')) availableWeapons.push('railgun');
  if (upgradedRailgunUnlocked && !availableWeapons.includes('upgraded_railgun')) availableWeapons.push('upgraded_railgun');
  if (maceUnlocked && !availableWeapons.includes('mace')) availableWeapons.push('mace');
  if (songthuUnlocked && !availableWeapons.includes('songthu')) availableWeapons.push('songthu');
  if (minigunUnlocked && !availableWeapons.includes('minigun')) availableWeapons.push('minigun');
  if (satnaUnlocked && !availableWeapons.includes('satna')) availableWeapons.push('satna');
  if (torchUnlocked && !availableWeapons.includes('torch')) availableWeapons.push('torch');
  if (thuongthanUnlocked && !availableWeapons.includes('thuongthan')) availableWeapons.push('thuongthan');
  if (thanSongkiemUnlocked && !availableWeapons.includes('than_songkiem')) availableWeapons.push('than_songkiem');
  // The Owner privileges (The Owner standard, The Owner 7B%, Dev NNTL, Admin)
  const hasOwnerPrivilege = theOwnerUnlocked || selectedRole === 'the_owner' || selectedRole === 'the_owner_7b' || theOwner7bUnlocked || devNntlUnlocked || adminUnlocked;

  if ((hasOwnerPrivilege || stellarUnlocked) && !availableWeapons.includes('stellar_remote')) {
    availableWeapons.push('stellar_remote');
  }

  // Sáng Thế Chi Kiếm is STRICTLY EXCLUSIVE to Developer NNTL!
  if (devNntlUnlocked && !availableWeapons.includes('sangthe')) {
    availableWeapons.push('sangthe');
  }

  // Dây Nịt Tử Thần is EXCLUSIVE to The Owner privilege!
  if ((hasOwnerPrivilege || daynitUnlocked) && !availableWeapons.includes('daynit')) {
    availableWeapons.push('daynit');
  }

  // Enemy weapons will NEVER include developer-only Sáng Thế Chi Kiếm, but always includes Railgun for the 1000 wins mirror challenge!
  const enemyAvailableWeapons: WeaponKey[] = availableWeapons.filter(k => k !== 'sangthe');
  if (!enemyAvailableWeapons.includes('railgun')) enemyAvailableWeapons.push('railgun');
  if (!enemyAvailableWeapons.includes('upgraded_railgun')) enemyAvailableWeapons.push('upgraded_railgun');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullVanillaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-3 sm:p-6 font-sans select-none">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between py-3 px-4 mb-4 bg-[#080f26] border border-cyan-500/30 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/40">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Đấu Bóng Chiến Đấu
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium">
                Vanilla TypeScript
              </span>
            </h1>
            <p className="text-xs text-slate-300 hidden sm:block">
              Canvas 2D Engine • Đen Xanh Đậm • Viền Chiến Đấu Xanh Nhạt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
          {/* Language Selector Button */}
          <button
            id="open-language-modal-btn"
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-950/90 hover:bg-sky-900 text-sky-200 font-bold text-xs border border-sky-400/50 shadow-md transition"
            title={t.selectLanguage}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {currentLang === 'vi' ? '🇻🇳 Tiếng Việt' : currentLang === 'en' ? '🇬🇧 English' : '🇷🇺 Tiếng Nga gốc'}
            </span>
          </button>

          {/* Weapon Shop Button */}
          <button
            id="open-weapon-shop-btn"
            onClick={() => setShowWeaponShopModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs border border-amber-400/60 shadow-lg shadow-amber-600/30 transition animate-pulse"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Cửa Hàng Vũ Khí</span>
          </button>

          {/* Guide Button */}
          <button
            id="open-guide-modal-btn"
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs border border-indigo-400/50 shadow-lg shadow-indigo-600/30 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-semibold">{adminUnlocked ? 'Cẩm Nang Admin' : 'Hướng Dẫn Chơi'}</span>
          </button>

          {/* Coin Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{coins.toLocaleString()} Xu</span>
          </div>

          {/* Audio Quick Toggle & Settings Button */}
          <div className="flex items-center bg-slate-900/90 border border-cyan-500/40 rounded-xl overflow-hidden shadow-md">
            <button
              id="header-sound-toggle-btn"
              onClick={handleToggleMute}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold transition ${
                isMuted
                  ? 'bg-rose-950/70 text-rose-300 hover:bg-rose-900/70'
                  : 'bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/60'
              }`}
              title={isMuted ? 'Đang tắt âm (Nhấn để bật)' : 'Đang bật âm (Nhấn để tắt)'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden md:inline">{isMuted ? 'Tắt Âm' : 'Bật Âm'}</span>
            </button>
            <button
              id="header-sound-settings-btn"
              onClick={() => setShowSoundModal(true)}
              className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-l border-slate-700 transition"
              title="Cài đặt Âm lượng & Nhạc nền BGM"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Admin Console Quick Toggle */}
          {adminUnlocked && (
            <button
              id="toggle-admin-console-btn"
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                showAdminConsole
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                  : 'bg-rose-950/60 text-rose-300 border-rose-600/50 hover:bg-rose-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Console Admin</span>
            </button>
          )}

          {/* Tab Switcher */}
          <button
            id="tab-toggle-btn"
            onClick={() => setActiveTab(activeTab === 'game' ? 'code' : 'game')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            {activeTab === 'game' ? (
              <>
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Mã TypeScript</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Chơi Game</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Complete Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-5">
          <div className="w-full max-w-3xl max-h-[92vh] bg-[#070e24] border-2 border-cyan-500 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-[#0a1435]">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{adminUnlocked ? 'CẨM NANG TOÀN DIỆN & QUẢN TRỊ VIÊN' : 'HƯỚNG DẪN CÁCH CHƠI & CƠ CHẾ ĐẤU BÓNG'}</span>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-[#050b1d] px-4 pt-2 gap-2 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setGuideActiveTab('gameplay')}
                className={`px-3 py-2 border-b-2 rounded-t-lg transition whitespace-nowrap ${
                  guideActiveTab === 'gameplay'
                    ? 'border-cyan-400 text-cyan-300 bg-[#0c1840]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                🎮 1. Luật Chơi & Cơ Chế v1.1.0
              </button>
              <button
                onClick={() => setGuideActiveTab('weapons_roles')}
                className={`px-3 py-2 border-b-2 rounded-t-lg transition whitespace-nowrap ${
                  guideActiveTab === 'weapons_roles'
                    ? 'border-emerald-400 text-emerald-300 bg-[#0c261e]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚔️ 2. Tra Cứu 19 Vũ Khí & 10 Role
              </button>
              <button
                onClick={() => setGuideActiveTab('credits')}
                className={`px-3 py-2 border-b-2 rounded-t-lg transition whitespace-nowrap ${
                  guideActiveTab === 'credits'
                    ? 'border-purple-400 text-purple-300 bg-[#1e0f33]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                💡 3. Bảng Vinh Danh & Tác Giả
              </button>
              {adminUnlocked && (
                <>
                  <button
                    onClick={() => setGuideActiveTab('puzzles')}
                    className={`px-3 py-2 border-b-2 rounded-t-lg transition whitespace-nowrap ${
                      guideActiveTab === 'puzzles'
                        ? 'border-amber-400 text-amber-300 bg-[#251b0a]'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🧩 3. [Admin] Bí Mật & Mật Mã
                  </button>
                  <button
                    onClick={() => setGuideActiveTab('admin_cmds')}
                    className={`px-3 py-2 border-b-2 rounded-t-lg transition whitespace-nowrap ${
                      guideActiveTab === 'admin_cmds'
                        ? 'border-rose-400 text-rose-300 bg-[#2b0c16]'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ⚡ 4. [Admin] Tra Cứu Lệnh /give
                  </button>
                </>
              )}
            </div>

            {/* Modal Body Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-200">
              {guideActiveTab === 'credits' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border border-purple-500/50 rounded-xl space-y-2.5">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>BẢNG VINH DANH ĐỒNG TÁC GIẢ & ĐÓNG GÓP Ý TƯỞNG</span>
                    </div>
                    <p className="text-slate-200">
                      Trò chơi được phát triển và nâng cấp liên tục nhờ vào các ý tưởng chiến thuật, bộ kỹ năng và cơ chế cân bằng từ cộng đồng và người bạn đồng hành!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-amber-300 font-bold flex items-center gap-1.5">
                        <span>👑 Chủ Game & Lập Trình Viên Chính: Nguyễn Ngọc Thiên Long (NNTL)</span>
                      </div>
                      <div className="text-slate-300 text-xs font-mono">
                        • Quyền năng Admin tối cao & Quản lý Hệ thống
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Xây dựng nhân vật, vũ khí Railgun, Minigun, Sát Na, Sáng Thế Chi Kiếm, hệ thống QTE minigame.
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900/90 border border-purple-500/40 rounded-xl space-y-1.5">
                      <div className="text-purple-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>🌟 Bạn Đồng Hành & Cố Vấn Ý Tưởng:</span>
                      </div>
                      <div className="text-slate-300 text-xs font-mono">
                        • Ý tưởng Role Thần Thoại [SỞ TÂN] & Kỹ năng v1.1.0
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Đóng góp ý tưởng "Nhất Điếu Khai Thiên Môn", cơ chế cộng hưởng viền Sấm sét cùng cấp (Viền Đỏ/Xanh Lá), và Tứ Thánh Điếu Hồn (Bạch Hổ, Chu Tước, Thanh Long, Huyền Vũ)!
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                      <span>🔗 Link Chạy Dự Án & Cách Chia Sẻ:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                      <li>
                        <strong>Link Web trực tiếp:</strong> Bạn có thể chia sẻ đường link URL của ứng dụng này hoặc triển khai (Deploy) lên Cloud Run / Web Server để bạn bè cùng chơi.
                      </li>
                      <li>
                        <strong>Gắn thêm người vinh danh:</strong> Mọi ý tưởng đóng góp đều được cập nhật trực tiếp vào Bảng Vinh Danh này và hiển thị nổi bật trên giao diện chính của phiên bản Update 1.1.0!
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {guideActiveTab === 'gameplay' && (
                <div className="space-y-4">
                  <div className="p-3 bg-[#0a163a] border border-cyan-500/30 rounded-xl space-y-2">
                    <h3 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                      <span>⚔️ Nguyên Lý Đấu Bóng (Ball Battle Engine)</span>
                    </h3>
                    <p className="text-slate-300">
                      Hai quả bóng chiến binh (Bạn: Xanh lam, Địch: Đỏ) di chuyển và va chạm liên tục trong đấu trường khép kín. Mỗi khi chạm nhau hoặc dùng kỹ năng tầm xa, sát thương sẽ được trừ trực tiếp vào lượng HP.
                    </p>
                  </div>

                  {/* Special Railgun Clash Feature Box */}
                  <div className="p-3.5 bg-gradient-to-r from-cyan-950/60 via-purple-950/60 to-rose-950/60 border-2 border-purple-500/60 rounded-xl space-y-2 shadow-lg shadow-purple-900/20">
                    <div className="font-bold text-purple-300 text-xs sm:text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>⚡ ĐẶC BIỆT: CƠ CHẾ ĐỐI ĐẦU TIA RAILGUN & BOM NUKE</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      Khi cả Bạn và Địch đều trang bị vũ khí <strong>Railgun</strong>:
                    </p>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
                      <li>
                        <strong>Tia năng lượng:</strong> Bạn khai hỏa <span className="text-cyan-400 font-bold">Chùm Tia Xanh Lam</span>, Địch khai hỏa <span className="text-rose-400 font-bold">Chùm Tia Đỏ Rực</span>.
                      </li>
                      <li>
                        <strong>Hút về bên gần nhất:</strong> Khi 2 tia đối đầu, quả cầu tím ở giữa sẽ <span className="text-purple-300 font-bold">bị hút và lao nhanh về phía quả bóng nào ở gần nó nhất</span>.
                      </li>
                      <li>
                        <strong>Tích tụ & Tăng Trưởng Cực Nhanh:</strong> Quả cầu liên tục nở to <span className="text-purple-300 font-bold">+2.5px/0.125s</span> và tăng sát thương bùng nổ <span className="text-amber-300 font-bold">+1.5 DMG/0.15s</span> (tương đương +10 DMG/s). Càng to thì phạm vi chạm nổ càng rộng.
                      </li>
                      <li>
                        <strong>☢️ Biến thành SIÊU BOM NUKE (100px):</strong> Nếu tích tụ đạt kích thước <strong>100px</strong> mà chưa chạm bóng, quả cầu sẽ <strong>hóa thành BOM HẠT NHÂN (NUKE)</strong> nổ tung toàn sàn đấu:
                        <br />• Tâm nổ dính trực tiếp: <strong className="text-rose-400 font-bold text-xs">-2500+ DMG</strong>
                        <br />• Sóng xung kích hạt nhân toàn màn hình: <strong className="text-cyan-400 font-bold text-xs">-800+ DMG</strong>
                      </li>
                      <li>
                        <strong>Va chạm thông thường (dưới 100px):</strong> Bên bị đâm trúng chịu <strong className="text-rose-400 font-bold">-500 DMG (+tích lũy)</strong>, bên kia chịu <strong className="text-cyan-400 font-bold">-100 DMG</strong> sóng chấn.
                      </li>
                    </ul>
                  </div>

                  {/* 30s Stalemate Breaker Box */}
                  <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-1.5">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>⚡ Cơ Chế Đột Phá Bế Tắc (30s Không Dính Sát Thương)</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Nếu trong vòng <strong>30 giây</strong> cả 2 bóng di chuyển mà không bên nào bị dính sát thương (tránh kéo dài trận đấu mất thời gian), hệ thống sẽ kích hoạt đột phá: 1 trong 2 bóng sẽ <strong>lập tức bẻ góc quỹ đạo, tăng tốc cực đại lao thẳng vào đối thủ</strong> để tạo giao tranh ngay lập tức!
                    </p>
                  </div>

                  {/* Combo Fist Weapon Box */}
                  <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-red-950/30 to-amber-950/40 border border-amber-500/40 rounded-xl space-y-2">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>🥊 Song Quyền (Combo): Minigame QTE Nhịp Điệu (WASD)</span>
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed">
                      Trang bị <strong>Song Quyền (2 Nắm Đấm)</strong> mang đến cơ chế chiến đấu minigame độc nhất vô nhị:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                      <li><strong>5 DMG / Cú đấm:</strong> Khi chạm địch, bóng tung cú đấm đầu tiên gây 5 DMG và mở Minigame QTE trên màn hình.</li>
                      <li><strong>Nhấn phím W / A / S / D:</strong> Màn hình hiện ngẫu nhiên 1 trong 4 phím. Nhấn đúng phím yêu cầu để đấm bồi thêm 1 phát nữa (+5 DMG) và tiếp tục chuỗi combo!</li>
                      <li><strong>💥 Kết thúc (Trượt hoặc Quá 3s):</strong> Nếu bấm sai phím hoặc không kịp bấm trong vòng 3s, chuỗi combo sẽ kết thúc bằng <strong>1 đòn ĐẤM TRÊN (Uppercut) gây 30 DMG</strong> kèm cú hất văng cực mạnh đẩy đối thủ bay thẳng vào tường và <strong>đập tường chịu thêm 20 DMG</strong>!</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                      <div className="font-bold text-white mb-1">1. Lượng Máu (HP):</div>
                      <p className="text-slate-400">
                        Chọn từ 500 HP đến 10,000 HP. Khi HP càng lớn, hệ số sát thương sẽ tự động tăng theo căn bậc hai để trận đấu luôn kịch tính.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                      <div className="font-bold text-white mb-1">2. Vũ khí & Kỹ năng:</div>
                      <p className="text-slate-400">
                        - <strong>Cần Câu</strong>: Đánh thường tầm xa 20 DMG. Kỹ năng [Móc Lưỡi] ném lưỡi câu tầm xa móc dính đối thủ (10 DMG), giật mạnh kéo đối thủ về phía mình rồi bồi 1 đòn 20 DMG đánh văng đối thủ đập tường cực mạnh (nhận thêm sát thương đập tường như Chùy Bí Mật)! Khi kết hợp cùng Sở Tân hoặc Bá Thường sẽ kích hoạt thêm hiệu ứng nứt đất/sóng chấn Long Lực.<br />
                        - <strong>Song Kiếm</strong>: Phóng kiếm khí tầm xa tốc độ 3 lần/giây (5 DMG). Kỹ năng 1: [Liên Hoàn Kích] lao vào khóa cứng địch chém 6 nhát liên hoàn 7.5 DMG (10% chém tiếp). Kỹ năng 2: [Nhất Quang] đứng im tụ khí 1.6s phóng ra luồng kiếm khổng lồ (30 DMG) xuyên giáp chấn động toàn sân!<br />
                        - <strong>Cung, Nỏ, Đuốc, Sáng Thế Chi Kiếm</strong>: Bắn tên khí động học, bắn nỏ thép xuyên giáp, thiêu đốt 5s, Thánh Quang Trảm.<br />
                        - <strong>Kiếm, Rìu, Khiên, Giáo, Railgun</strong>: Hệ thống cận chiến và laser hủy diệt.<br />
                        - <strong>Đặc biệt</strong>: Các vũ khí bí mật (Minigun, Chùy, Sát Na Vĩnh Hằng) và vai trò ẩn Sở Tân.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                      <div className="font-bold text-white mb-1">3. Đập đá & Ghép Nguyên tố:</div>
                      <p className="text-slate-400">
                        Dùng 100 Xu để <strong>Roll</strong> nhận nguyên tố ngẫu nhiên (Lửa, Sét, Độc, Bóng Tối, Thực Vật, Glitch). Nhấn <strong>Ghép (Merge)</strong> để kết hợp 3 viên cấp thấp thành 1 viên cấp cao hơn (tối đa Cấp XV).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                      <div className="font-bold text-white mb-1">4. Vai trò (Role):</div>
                      <p className="text-slate-400">
                        - <strong>Survivalist</strong> (500 Xu): Máu càng ít đánh càng đau (+100% dmg).<br />
                        - <strong>Werewolf</strong> (1,500 Xu): Hóa sói ban đêm nhân 2.4 máu, tăng tốc, +50% dmg.<br />
                        - <strong>Bá Thường</strong> (1,650 Xu): 6 Tuyệt Kỹ Thanh Long ngẫu nhiên (20s CD): Long Ngẩng Đầu, Du Long Bái Vĩ, Ngọa Long Phiên Đăng, Thần Long Na Di, Tiềm Long Vật Dụng, Long Nhân Hợp Nhất (Avatar Long Nhân với Tóc rồng, Sừng ngọc, Tay vảy rồng; Tăng +15% DMG & +15% Tốc chạy; Nerf cân bằng: Tự rút -1 HP/0.3s tỉ lệ theo HP tối đa).<br />
                        - <strong>Lưu Bị</strong> (1,750 Xu): Nội tại Đế Vương (+10% HP / +5% DMG; nếu dùng Song Kiếm: +15% HP / +15% DMG) + Tuyệt kỹ Hán Thất Nghiêm Đông (Cự Kiếm Hỏa/Băng + Đóng băng 1.5s + Trảm 250 DMG).<br />
                        - <strong>Sở Tân</strong> (Bí mật): Bản Tối Cao Áo Nghĩa (Nhất Điếu 1,500 DMG, Phi Thiên Vô Cực 100 DMG/tick), Sở Tân Điếu (150 nhát x 25 DMG), Toán Thiên Thấu Chi Điếu, Shield Đặc Biệt (chỉ nhận 75% DMG) & Tứ Thánh Điếu Hồn.<br />
                        - <strong>Admin</strong>: Chỉ dành cho các tài khoản quản trị viên được xác thực danh tính.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {guideActiveTab === 'weapons_roles' && (
                <div className="space-y-4">
                  {/* Sub-tab switcher */}
                  <div className="flex items-center justify-between gap-2 p-1.5 bg-[#0a1532] border border-cyan-500/30 rounded-xl">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setGuideCatalogTab('weapons')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          guideCatalogTab === 'weapons'
                            ? 'bg-cyan-500 text-black shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        ⚔️ 19 Vũ Khí Chiến Đấu
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuideCatalogTab('roles')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          guideCatalogTab === 'roles'
                            ? 'bg-indigo-500 text-white shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        👑 10 Vai Trò (Roles)
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      DMG • Tầm đánh • Tốc độ • Nội tại • Skill copy
                    </span>
                  </div>

                  {/* Weapons View */}
                  {guideCatalogTab === 'weapons' && (
                    <div className="space-y-3">
                      <div className="text-[11px] text-cyan-300/80 font-medium bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-500/20">
                        💡 Tra cứu thông số toàn diện của 19 loại vũ khí: từ vũ khí cơ bản, tầm xa, bí mật đến thần khí tối thượng The Owner.
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[58vh] overflow-y-auto pr-1">
                        {Object.values(WEAPON_DETAILS).map(wep => (
                          <div
                            key={wep.key}
                            className="p-3 bg-[#0a1532] border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl space-y-2 transition shadow-md"
                          >
                            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
                              <span className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                                ⚔️ {wep.name}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                                {wep.category}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-rose-400 font-bold block">💥 DMG</span>
                                <span className="text-white font-medium line-clamp-2">{wep.dmg}</span>
                              </div>
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-amber-400 font-bold block">🎯 Tầm</span>
                                <span className="text-white font-medium line-clamp-2">{wep.range}</span>
                              </div>
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-sky-400 font-bold block">⚡ Tốc độ</span>
                                <span className="text-white font-medium line-clamp-2">{wep.atkSpeed}</span>
                              </div>
                            </div>
                            <div className="text-[10.5px] p-2 rounded bg-[#070e24] border border-purple-500/20 space-y-1">
                              <div>
                                <span className="font-bold text-purple-300">🛡️ Nội tại: </span>
                                <span className="text-slate-300 leading-relaxed">{wep.passive}</span>
                              </div>
                              <div>
                                <span className="font-bold text-emerald-400">📋 Skill copy: </span>
                                <span className="text-emerald-300 leading-relaxed font-medium">{wep.copyableSkills}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Roles View */}
                  {guideCatalogTab === 'roles' && (
                    <div className="space-y-3">
                      <div className="text-[11px] text-indigo-300/80 font-medium bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
                        👑 Thông số chi tiết 10 vai trò đặc trưng trong game: tăng cường chỉ số, kỹ năng bị động độc quyền và tuyệt chiêu có thể sao chép.
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[58vh] overflow-y-auto pr-1">
                        {Object.values(ROLE_DETAILS).map(role => (
                          <div
                            key={role.key}
                            className="p-3 bg-[#0d1636] border border-indigo-500/20 hover:border-indigo-400/50 rounded-xl space-y-2 transition shadow-md"
                          >
                            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-1.5">
                              <div>
                                <span className="font-bold text-indigo-300 text-xs flex items-center gap-1.5">
                                  👑 {role.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-medium">{role.title}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                                {role.category}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-rose-400 font-bold block">💥 DMG</span>
                                <span className="text-white font-medium line-clamp-2">{role.dmg}</span>
                              </div>
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-amber-400 font-bold block">🎯 Tầm</span>
                                <span className="text-white font-medium line-clamp-2">{role.range}</span>
                              </div>
                              <div className="p-1.5 rounded bg-[#060c1d] border border-slate-800">
                                <span className="text-sky-400 font-bold block">⚡ Tốc độ</span>
                                <span className="text-white font-medium line-clamp-2">{role.atkSpeed}</span>
                              </div>
                            </div>
                            <div className="text-[10.5px] p-2 rounded bg-[#070e24] border border-cyan-500/20 space-y-1">
                              <div>
                                <span className="font-bold text-cyan-300">🛡️ Nội tại: </span>
                                <span className="text-slate-300 leading-relaxed">{role.passive}</span>
                              </div>
                              <div>
                                <span className="font-bold text-emerald-400">📋 Skill copy: </span>
                                <span className="text-emerald-300 leading-relaxed font-medium">{role.copyableSkills}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {adminUnlocked && guideActiveTab === 'puzzles' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl">
                    <h3 className="font-bold text-amber-300 text-sm mb-1">
                      🧩 [Dành Cho Admin] Toàn Bộ Bí Mật & Lời Giải Trong Game
                    </h3>
                    <p className="text-slate-300 text-xs">
                      Bảng tra cứu bí mật và đáp án câu đố dành riêng cho Quản Trị Viên.
                    </p>
                  </div>

                  {/* Puzzle 1: Minigun */}
                  <div className="p-3.5 bg-slate-900 border border-amber-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-xs">
                        1. Câu đố Vũ khí Minigun:
                      </span>
                      {minigunUnlocked ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-600">
                          Đã mở khóa
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-800 text-slate-400 font-medium px-2 py-0.5 rounded border border-slate-700">
                          Chưa mở khóa (Tự giải đố)
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300">
                      <strong>Câu hỏi & Đáp án chấp nhận:</strong>
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                      <li>Toán học 1: <code className="text-amber-300 font-mono">1 + 1 + 1 + 1</code> ➔ Đáp án: <strong className="text-emerald-400">4</strong></li>
                      <li>Toán học 2: <code className="text-amber-300 font-mono">100 - 100 + 100</code> ➔ Đáp án: <strong className="text-emerald-400">100</strong></li>
                      <li>Toán học 3: <code className="text-amber-300 font-mono">500 * 3</code> ➔ Đáp án: <strong className="text-emerald-400">1500</strong></li>
                      <li>Tác giả game: ➔ Đáp án: <strong className="text-emerald-400">Nguyễn Ngọc Thiên Long</strong> (hoặc <strong className="text-emerald-400">NNTL</strong>)</li>
                    </ul>
                  </div>

                  {/* Puzzle 2: Satna */}
                  <div className="p-3.5 bg-slate-900 border border-purple-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-300 text-xs">
                        2. Cổ Thuật Sát Na Vĩnh Hằng:
                      </span>
                      {satnaUnlocked ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-600">
                          Đã mở khóa
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-800 text-slate-400 font-medium px-2 py-0.5 rounded border border-slate-700">
                          Chưa mở khóa (Dùng lệnh /give satna)
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Nghi thức gồm 4 giai đoạn hội tụ ma thuật tạo ra vụ nổ hủy diệt toàn bộ đấu trường.
                    </p>
                  </div>

                  {/* Puzzle 3: Mace & Secret Weapons */}
                  <div className="p-3.5 bg-slate-900 border border-blue-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-300 text-xs">
                        3. Bộ Vũ Khí Ẩn (Chùy, Song Thủ, Sáng Thế, Đuốc):
                      </span>
                      {maceUnlocked ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-600">
                          Đã mở khóa
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-800 text-slate-400 font-medium px-2 py-0.5 rounded border border-slate-700">
                          Chưa mở khóa (Mua trong Shop hoặc dùng /give all_weapons)
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Bao gồm Chùy Khổng Lồ, Song Thủ tấn công liên hoàn, Sáng Thế Chi Kiếm tầm đánh 77 và Đuốc thiêu đốt.
                    </p>
                  </div>

                  {/* Puzzle 4: Admin Names */}
                  <div className="p-3.5 bg-slate-900 border border-rose-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-300 text-xs">
                        4. Danh Tính Admin & Nhà Phát Triển:
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-600">
                        Đã kích hoạt Admin
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Danh sách tên Admin và Nhà Phát Triển hợp lệ trong hệ thống:
                    </p>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="p-1.5 bg-slate-950 border border-rose-500/50 text-amber-300 rounded flex items-center justify-between col-span-2">
                        <span>👑 Nguyễn Ngọc Thiên Long (NNTL)</span>
                        <span className="text-[9px] text-amber-400 font-bold">Nhà Phát Triển Tối Cao</span>
                      </div>
                      {VALID_ADMIN_NAMES.map(n => (
                        <div key={n} className="p-1.5 bg-slate-950 border border-slate-800 text-rose-300 rounded flex items-center justify-between">
                          <span>{n}</span>
                          <span className="text-[9px] text-emerald-400">Admin Hợp Lệ</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {adminUnlocked && guideActiveTab === 'admin_cmds' && (
                <div className="space-y-3">
                  <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl">
                    <h3 className="font-bold text-rose-300 text-sm mb-1">
                      ⚡ Bảng Tra Cứu Toàn Bộ Lệnh Console (/give & /clear_inv)
                    </h3>
                    <p className="text-slate-300 text-xs">
                      Cú pháp: <code className="text-amber-300 font-mono">/give &lt;tên&gt; &lt;số lượng&gt;</code> (nếu không ghi số lượng, mặc định là 1). Hãy mở Bảng Điều Khiển Admin và tự gõ lệnh vào ô nhập:
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/give all_xv</code>
                        <div className="text-[11px] text-slate-400">Nhận toàn bộ 6 loại Element Cấp XV (x5 mỗi loại)</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/give xu 10000</code>
                        <div className="text-[11px] text-slate-400">Cộng thêm 10,000 Xu vào tài khoản</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/give all_weapons</code>
                        <div className="text-[11px] text-slate-400">Mở khóa tất cả mọi vũ khí ẩn trong game</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/give all_roles</code>
                        <div className="text-[11px] text-slate-400">Mở khóa toàn bộ các Vai trò (Bá Thường, Lưu Bị, Werewolf, Sở Tân, Survivalist)</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/give fire_15 10</code>
                        <div className="text-[11px] text-slate-400">Cấp 10 viên Lửa Cấp XV (thay đổi thành lightning_15, poison_15, glitch_15...)</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <code className="text-amber-300 font-mono font-bold text-xs">/clear_inv</code>
                        <div className="text-[11px] text-slate-400">Dọn sạch toàn bộ túi đồ</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        Nhập vào Console
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-slate-800 bg-[#050b1d] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Nhấn đóng để quay trở lại trận đấu.
              </span>
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-lg shadow-cyan-600/30"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Minigun Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#070e24] border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Giải Đố Mở Khóa Vũ Khí Minigun</span>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <p className="text-xs text-slate-300 leading-relaxed">
                Giải mã một trong các câu đố sau để mở khóa vũ khí bí mật <strong className="text-amber-300">Minigun</strong>:
              </p>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="text-slate-400 font-semibold mb-1">Gợi ý câu đố:</div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-mono">
                  <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                    • Phép tính: <span className="text-amber-300">1 + 1 + 1 + 1 = ?</span>
                  </div>
                  <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                    • Phép tính: <span className="text-amber-300">100 - 100 + 100 = ?</span>
                  </div>
                  <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                    • Phép tính: <span className="text-amber-300">500 × 3 = ?</span>
                  </div>
                  <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                    • Định danh tác giả tạo ra hệ thống (4 ký tự chữ cái)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nhập câu trả lời của bạn:
                </label>
                <input
                  id="quiz-input-field"
                  type="text"
                  value={quizAnswer}
                  onChange={e => {
                    setQuizAnswer(e.target.value);
                    setQuizError(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleConfirmQuiz();
                  }}
                  placeholder="Nhập kết quả hoặc đáp án..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-amber-500 transition"
                  autoFocus
                />
              </div>

              {quizError && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/60 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{quizError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Đóng
                </button>
                <button
                  id="submit-quiz-btn"
                  type="button"
                  onClick={() => handleConfirmQuiz()}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 flex items-center gap-1.5 transition"
                >
                  <Check className="w-4 h-4" />
                  Trả Lời
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Verification Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#070e24] border-2 border-rose-600/60 rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Key className="w-5 h-5" />
                <span>Xác Thực Danh Tính Admin</span>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <p className="text-xs text-slate-300 leading-relaxed">
                Nhập danh tính <strong className="text-rose-400">Quản Trị Viên (Admin)</strong> được ủy quyền để kích hoạt đặc quyền hệ thống:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nhập mã / tên Admin:
                </label>
                <input
                  id="admin-name-input"
                  type="text"
                  value={adminInputName}
                  onChange={e => {
                    setAdminInputName(e.target.value);
                    setAdminModalError(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleConfirmAdminAuth();
                  }}
                  placeholder="Nhập tên Admin..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-rose-500 transition"
                  autoFocus
                />
              </div>

              {adminModalError && (
                <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{adminModalError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Hủy bỏ
                </button>
                <button
                  id="confirm-admin-auth-btn"
                  type="button"
                  onClick={() => handleConfirmAdminAuth()}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition"
                >
                  <Unlock className="w-4 h-4" />
                  Xác nhận Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Owner 7B% Secret Role Evolution Modal */}
      {showTheOwner7bModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-gradient-to-b from-[#1c1202] via-[#09142b] to-[#040914] border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl shadow-yellow-500/30 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/40 animate-bounce">
              👑
            </div>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-yellow-400 px-3 py-1 rounded-full bg-yellow-950/80 border border-yellow-500/50">
              SECRET EVOLUTION UNLOCKED! (777 CLICKS)
            </span>
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 mt-2.5 mb-2">
              THE OWNER GAME (7 TỈ % SỨC MẠNH)
            </h2>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Bạn đã bí mật spam 777 lần vào The Owner Game! Sức mạnh tối cao của Chúa Tể Vũ Trụ đã thức tỉnh hoàn toàn!
            </p>

            <div className="text-left bg-black/50 border border-yellow-500/30 rounded-2xl p-4 text-xs space-y-2 mb-5">
              <div className="flex items-center gap-2 text-yellow-300 font-bold">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span>HP Bất Tử: 7.000.000.000 HP (Miễn nhiễm 100% mọi sát thương)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sát Thương Thần Thánh: Rút 0.2% HP Max / 0.01s (Tan chảy cạn máu đều đặn trong 5s)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Tầm Đánh & Tốc Độ Đánh: VÔ HẠN (Infinite Range & Infinite Atk Speed)</span>
              </div>
              <div className="flex items-center gap-2 text-sky-300 font-bold">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span>Đặc Quyền Sandbox: Giết được cả Bù nhìn Dummy, thưởng FREE 1.000.000 Xu!</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowTheOwner7bModal(false);
                setSelectedRole('the_owner_7b');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-yellow-500/40 transition active:scale-95"
            >
              Vào Trận Hủy Diệt Càn Khôn Ngay! 🚀
            </button>
          </div>
        </div>
      )}

      {/* SoTan Secret Role Verification Modal */}
      {showSotanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#070e24] border-2 border-amber-400/80 rounded-2xl p-5 shadow-2xl shadow-amber-500/20 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Mở Khóa Role Ẩn Thần Thánh: Sở Tân</span>
              </div>
              <button
                onClick={() => setShowSotanModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <span>🌌 Role Độc Quyền Chủ Game: Sở Tân</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  • <strong>Bản Tối Cao Áo Nghĩa:</strong> Nhất Điếu Khai Thiên Môn (1,500 DMG + 500 nứt sàn càn khôn) & Phi Thiên Vô Cực Điếu (100 DMG/tick bão lốc càn quét).
                </p>
                <p className="text-[11px] text-slate-300">
                  • <strong>Kỹ năng Sở Tân Điếu:</strong> Tường Vân 18 Chiêu (Time stop 2s, 150 nhát trảm cự đại x 25 DMG = 3,750 DMG) & Toán Thiên Thấu Chi Điếu (găm tường 40 DMG/0.12s).
                </p>
                <p className="text-[11px] text-slate-300">
                  • <strong>Shield Đặc Biệt:</strong> Chỉ nhận 75% sát thương (giảm 25% mọi nguồn sát thương nhận vào).
                </p>
                <p className="text-[11px] text-slate-300">
                  • <strong>Tứ Thánh Điếu Hồn:</strong> Bạch Hổ (+30% DMG), Chu Tước (-5% Max HP), Thanh Long (Reset 100% CD toàn bộ chiêu), Huyền Vũ (Bất tử miễn nhiễm 3.0s)!
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nhập mật khẩu bí mật (Chỉ chủ game mới biết):
                </label>
                <input
                  id="sotan-password-input"
                  type="text"
                  value={sotanInputCode}
                  onChange={e => {
                    setSotanInputCode(e.target.value);
                    setSotanModalError(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleConfirmSotanPassword();
                  }}
                  placeholder="Nhập chuỗi mật mã API.give..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition"
                  autoFocus
                />
              </div>

              {sotanModalError && (
                <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{sotanModalError}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleConfirmSotanPassword('API.give.(sở tân béo vãi ò tên ảo ma vãi)');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-mono border border-amber-500/30 transition"
                >
                  [Điền Mật Khẩu Nhanh]
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSotanModal(false)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                  >
                    Đóng
                  </button>
                  <button
                    id="confirm-sotan-auth-btn"
                    type="button"
                    onClick={() => handleConfirmSotanPassword()}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition"
                  >
                    <Unlock className="w-4 h-4" />
                    Kích Hoạt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Language Selection Modal (Khi mới vào game chọn 3 mục: Tiếng Việt, English, Tiếng Nga gốc) */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#070e24] border-2 border-sky-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(56,189,248,0.25)] flex flex-col gap-6 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-sky-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-400 flex items-center justify-center text-2xl shadow-lg shadow-sky-500/30">
                  🌐
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300">
                    {t.chooseLanguageTitle}
                  </h2>
                  <p className="text-xs text-slate-300">
                    {t.chooseLanguageDesc}
                  </p>
                </div>
              </div>
              {localStorage.getItem('game_language_chosen') && (
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {/* Option 1: Tiếng Việt */}
              <button
                type="button"
                onClick={() => handleSelectLanguage('vi')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all group ${
                  currentLang === 'vi'
                    ? 'bg-sky-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-sky-400 hover:bg-slate-800/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🇻🇳</span>
                  <div className="text-left">
                    <div className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                      Tiếng Việt
                    </div>
                    <div className="text-xs text-slate-400">
                      Ngôn ngữ hiển thị tiếng Việt đầy đủ
                    </div>
                  </div>
                </div>
                {currentLang === 'vi' && (
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                )}
              </button>

              {/* Option 2: English */}
              <button
                type="button"
                onClick={() => handleSelectLanguage('en')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all group ${
                  currentLang === 'en'
                    ? 'bg-sky-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-sky-400 hover:bg-slate-800/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🇬🇧</span>
                  <div className="text-left">
                    <div className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                      English
                    </div>
                    <div className="text-xs text-slate-400">
                      International English interface
                    </div>
                  </div>
                </div>
                {currentLang === 'en' && (
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                )}
              </button>

              {/* Option 3: Tiếng Nga gốc */}
              <button
                type="button"
                onClick={() => handleSelectLanguage('ru')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all group ${
                  currentLang === 'ru'
                    ? 'bg-sky-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-sky-400 hover:bg-slate-800/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🇷🇺</span>
                  <div className="text-left">
                    <div className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                      Tiếng Nga gốc
                    </div>
                    <div className="text-xs text-slate-400">
                      Русский язык (Оригинальный русский)
                    </div>
                  </div>
                </div>
                {currentLang === 'ru' && (
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Post-Match Battle Performance Summary Modal (Bảng tổng kết thống kê trận đấu) */}
      {showMatchSummary && matchSummaryStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#080e22] border-2 border-cyan-400/80 rounded-3xl p-6 shadow-[0_0_70px_rgba(6,182,212,0.3)] flex flex-col gap-5 text-white animate-in zoom-in-95 duration-200">
            {/* Header / Outcome Banner */}
            <div className="flex flex-col items-center text-center pb-2 border-b border-cyan-500/30">
              <div className="text-3xl mb-1">
                {matchSummaryStats.winner === 'player' ? '🏆' : matchSummaryStats.winner === 'enemy' ? '💀' : '⚖️'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                {matchSummaryStats.winner === 'player'
                  ? t.victory
                  : matchSummaryStats.winner === 'enemy'
                  ? t.defeat
                  : t.draw}
              </h2>
              <p className="text-xs text-cyan-300/80 mt-1">
                {t.matchSummarySubtitle}
              </p>
            </div>

            {/* Statistics Table */}
            <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/60 shadow-inner">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-cyan-950/40 text-cyan-200 border-b border-cyan-500/30 font-bold">
                    <th className="py-2.5 px-3 sm:px-4">Chỉ số thống kê</th>
                    <th className="py-2.5 px-3 sm:px-4 text-center text-sky-400">🔵 {t.playerSide}</th>
                    <th className="py-2.5 px-3 sm:px-4 text-center text-rose-400">🔴 {t.enemySide}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* Total Damage Dealt */}
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-200 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>{t.statTotalDmg}</span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-amber-300">
                      {matchSummaryStats.playerDamage.toLocaleString()} HP
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-amber-300">
                      {matchSummaryStats.enemyDamage.toLocaleString()} HP
                    </td>
                  </tr>

                  {/* Skills Used */}
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-200 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>{t.statSkillsUsed}</span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-cyan-300">
                      {matchSummaryStats.playerSkillsUsed} lần
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-cyan-300">
                      {matchSummaryStats.enemySkillsUsed} lần
                    </td>
                  </tr>

                  {/* Hit Accuracy % */}
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-200 flex items-center gap-2">
                      <Swords className="w-4 h-4 text-emerald-400" />
                      <span>{t.statAccuracy}</span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-emerald-300">
                      {matchSummaryStats.playerAttacksAttempted > 0
                        ? `${Math.round((matchSummaryStats.playerHitsLanded / matchSummaryStats.playerAttacksAttempted) * 100)}%`
                        : '100%'}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        ({matchSummaryStats.playerHitsLanded}/{matchSummaryStats.playerAttacksAttempted} trúng)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-emerald-300">
                      {matchSummaryStats.enemyAttacksAttempted > 0
                        ? `${Math.round((matchSummaryStats.enemyHitsLanded / matchSummaryStats.enemyAttacksAttempted) * 100)}%`
                        : '100%'}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        ({matchSummaryStats.enemyHitsLanded}/{matchSummaryStats.enemyAttacksAttempted} trúng)
                      </span>
                    </td>
                  </tr>

                  {/* Combat Duration */}
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>{t.statDuration}</span>
                    </td>
                    <td colSpan={2} className="py-2.5 px-3 sm:px-4 text-center font-bold text-purple-300">
                      {matchSummaryStats.matchDurationSec} giây
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowMatchSummary(false);
                  exitBattle();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.backToSetupBtn}</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMatchSummary(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition"
                >
                  {t.closeBtn}
                </button>
                <button
                  type="button"
                  id="summary-rematch-btn"
                  onClick={() => {
                    setShowMatchSummary(false);
                    if (engineRef.current) {
                      engineRef.current.initGame({
                        playerHp: selectedHp,
                        playerWeaponKey: playerWeapon,
                        enemyWeaponKey: enemyWeapon,
                        playerElementKey: equippedElement,
                        playerRole: selectedRole,
                        enemyElementKey: enemyElementKey === 'random' ? undefined : enemyElementKey,
                        enemyRole: enemyRole === 'random' ? undefined : enemyRole,
                        isSandbox: selectedMap === 'sandbox',
                        selectedMap: selectedMap,
                        isTowerDefense: selectedMap === 'tower_defense',
                        is2v2: is2v2,
                        player2WeaponKey: player2Weapon,
                        player2ElementKey: player2Element || undefined,
                        player2Role: player2Role,
                        enemy2WeaponKey: enemy2Weapon === 'random' ? undefined : enemy2Weapon,
                        enemy2ElementKey: enemy2Element === 'random' ? undefined : enemy2Element,
                        enemy2Role: enemy2Role === 'random' ? undefined : enemy2Role
                      });
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/30 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.playAgainBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stellar Remote Satellite Command Console Modal */}
      {showStellarMenuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#060c1d] border-2 border-cyan-400 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col gap-4 text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30 animate-pulse">
                  🛰️
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                    BẢNG ĐIỀU KHIỂN QUỸ ĐẠO - STELLAR REMOTE
                  </h2>
                  <p className="text-[11px] text-cyan-300/80 font-mono">
                    🛰️ VỆ TINH VŨ TRỤ • HỆ SỐ MUL THEO MÁU VÀ VAI TRÒ • 10 SIÊU TUYỆT KỸ VŨ TRỤ TỐI THƯỢNG
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowStellarMenuModal(false);
                  if (engineRef.current) engineRef.current.stellarMenuOpen = false;
                }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const curStellarMul = engineRef.current
                ? engineRef.current.getStellarMultiplier()
                : Number((1.0 * getStellarHpMultiplier(selectedHp) * (selectedRole === 'the_owner_7b' ? 10.0 : selectedRole === 'the_owner' ? 5.0 : selectedRole === 'admin' ? 3.5 : selectedRole === 'sotan' ? 3.0 : selectedRole === 'bathuong' ? 2.5 : 1.0)).toFixed(2));
              return (
                <>
                  {/* Real-time Mul DMG indicator */}
                  <div className="p-2.5 rounded-2xl bg-[#09152e] border border-cyan-400/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚡</span>
                      <span className="font-bold text-cyan-200">HỆ SỐ NHÂN SÁT THƯƠNG (MUL DMG):</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/25 text-amber-300 border border-amber-400/60 font-black text-sm shadow-sm shadow-amber-400/30">
                        x{curStellarMul} DMG
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Mul HP Trận (Stellar): <strong className="text-cyan-300">x{getStellarHpMultiplier(selectedHp)}</strong> (100k HP = x1.5) • Base Vệ Tinh: <strong className="text-emerald-300">x1.0</strong>
                      {selectedRole === 'the_owner_7b' && ' • 👑 Owner 7 Tỉ: x10.0'}
                      {selectedRole === 'the_owner' && ' • 👑 Owner: x5.0'}
                      {selectedRole === 'admin' && ' • Admin: x3.5'}
                      {selectedRole === 'sotan' && ' • Sơ Tán: x3.0'}
                      {selectedRole === 'bathuong' && ' • Bá Thương: x2.5'}
                    </div>
                  </div>

                  {/* Owner Privilege Banner if applicable */}
                  {(selectedRole === 'the_owner' || selectedRole === 'the_owner_7b' || theOwner7bUnlocked || theOwnerUnlocked) && (
                    <div className="p-2.5 rounded-2xl bg-[#141208] border border-yellow-400/80 text-yellow-200 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <Crown className="w-4 h-4 text-yellow-400 animate-pulse shrink-0" />
                        <span>
                          {selectedRole === 'the_owner_7b'
                            ? '👑⚡ ĐẶC QUYỀN THE OWNER 7 TỈ %: TẤT CẢ TUYỆT KỸ ĐƯỢC NHÂN x10.0 LẦN!'
                            : '👑💻 ĐẶC QUYỀN THE OWNER: TẤT CẢ TUYỆT KỸ ĐƯỢC NHÂN x5.0 LẦN!'}
                        </span>
                      </div>
                      <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-black">
                        PHÍM [1 - 9, 0]
                      </span>
                    </div>
                  )}

                  {/* Grid 9 Skills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[72vh] overflow-y-auto pr-1">
                    {/* SS-01: Railgun */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border border-rose-500/40 hover:border-rose-400 transition flex flex-col justify-between gap-2.5 shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-rose-300 flex items-center gap-1.5">
                            <span className="text-base">🛰️</span> SS-01: RAILGUN
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/50">
                            PHÍM [1]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-rose-400 font-bold mb-1">
                          ⚡ {Math.round(100_000 * curStellarMul).toLocaleString()} DMG / 0.1s (15s = {(Math.round(100_000 * curStellarMul) * 150).toLocaleString()} DMG)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Tia đỏ kéo dài bay ra ngoài Trái Đất ➔ Hệ Mặt Trời ➔ Ngân Hà ➔ Trạm Không Gian Khổng Lồ bắn chùm tia plasma với tốc độ ánh sáng!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss01_railgun');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Kích Hoạt SS-01 Railgun
                      </button>
                    </div>

                    {/* SS-02: The Sun */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border-2 border-amber-500/60 hover:border-amber-400 transition flex flex-col justify-between gap-2.5 shadow-xl group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                            <span className="text-base">☀️</span> SS-02: THE SUN
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/50">
                            PHÍM [2]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-amber-400 font-bold mb-1">
                          💥 {Math.round(5_500_000 * curStellarMul).toLocaleString()} DMG (SIÊU NHIỆT HẠCH CỰC ĐẠI)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Hệ Mặt Trời lần lượt 8 hành tinh phá quỹ đạo lao xuống sàn đấu ➔ <strong>Đại Mặt Trời giáng thế nổ nhiệt hạch</strong> gây sát thương cực đại toàn sàn đấu!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss02_the_sun');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-amber-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        Kích Hoạt SS-02 The Sun
                      </button>
                    </div>

                    {/* SS-03: Gungir */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border border-amber-500/40 hover:border-amber-400 transition flex flex-col justify-between gap-2.5 shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                            <span className="text-base">🪐</span> SS-03: GUNGIR
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/50">
                            PHÍM [3]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-amber-400 font-bold mb-1">
                          💥 {Math.round(2_500_000 * curStellarMul).toLocaleString()} DMG + 🔥 {Math.round(100_000 * curStellarMul).toLocaleString()} DoT/0.2s (VỤ NỔ SA HOÀNG)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Tia cam ➔ Sao Mộc phân thành 2 nửa hành tinh ➔ <strong>Mũi tên đen ngòm xoay như mũi khoan 3D</strong> Archimedes lao xuống vụ nổ Sa Hoàng!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss03_gungir');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-amber-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        Kích Hoạt SS-03 Gungir
                      </button>
                    </div>

                    {/* SS-04: Seven Star */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border border-yellow-500/40 hover:border-yellow-400 transition flex flex-col justify-between gap-2.5 shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-yellow-300 flex items-center gap-1.5">
                            <span className="text-base">✨</span> SS-04: SEVEN STAR
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-950 text-yellow-300 border border-yellow-500/50">
                            PHÍM [4]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-yellow-400 font-bold mb-1">
                          ⭐ {Math.round(150_000 * curStellarMul).toLocaleString()} DMG x 7 sao + 🌟 {Math.round(2_000_000 * curStellarMul).toLocaleString()} DMG ĐỒNG LOẠT
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Chòm sao Bắc Đẩu chân thực ➔ Từng ngôi sao nạp năng lượng, nạp xong lao xuống giáng thế rồi lặp lại, bắt đầu từ 1 ngôi sao ngẫu nhiên!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss04_seven_star');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 active:scale-95 text-black font-black text-xs shadow-md shadow-yellow-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Kích Hoạt SS-04 Seven Star
                      </button>
                    </div>

                    {/* SS-05: Tesseract */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border border-cyan-500/40 hover:border-cyan-400 transition flex flex-col justify-between gap-2.5 shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                            <span className="text-base">💠</span> SS-05: TESSERACT
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/50">
                            PHÍM [5]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-cyan-300 font-bold mb-1">
                          🌀 {Math.round(200_000 * curStellarMul).toLocaleString()} DMG x 5 đợt + 🌌 {Math.round(2_500_000 * curStellarMul).toLocaleString()} DMG SỤP ĐỔ
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Bay ra Ngân Hà đến Siêu Lập Phương 4D ➔ Mở Cổng Không Gian trên đỉnh sàn đấu ➔ Cân bằng vuông góc ➔ Phình to nổ 5 lần ➔ Xoay tít nổ sụp đổ không gian!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss05_tesseract');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 active:scale-95 text-white font-black text-xs shadow-md shadow-cyan-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Kích Hoạt SS-05 Tesseract
                      </button>
                    </div>

                    {/* SS-06: Halley */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border border-sky-500/40 hover:border-sky-400 transition flex flex-col justify-between gap-2.5 shadow-lg group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-sky-300 flex items-center gap-1.5">
                            <span className="text-base">☄️</span> SS-06: HALLEY
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-500/50">
                            PHÍM [6]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-sky-400 font-bold mb-1">
                          💥 {Math.round(3_500_000 * curStellarMul).toLocaleString()} DMG (VA CHẠM TRỰC DIỆN THIÊN THẠCH)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Sao băng Halley đang bay ngoài vũ trụ ➔ Kích hoạt chuyển hướng quỹ đạo ➔ Khóa khoảng cách mục tiêu đếm ngược ➔ Lao xuống nổ tung hủy diệt!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss06_halley');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-black text-xs shadow-md shadow-sky-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Kích Hoạt SS-06 Halley
                      </button>
                    </div>

                    {/* SS-021: Quasar [ADD-ON] */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border-2 border-pink-500/60 hover:border-pink-400 transition flex flex-col justify-between gap-2.5 shadow-xl group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-pink-300 flex items-center gap-1.5">
                            <span className="text-base">🌌</span> SS-021: QUASAR
                          </span>
                          <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-400">
                            PHÍM [7]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-pink-400 font-bold mb-1">
                          ⚡ {Math.round(100_000 * curStellarMul).toLocaleString()} DMG / 0.2s trong 20s + 💥 {Math.round(5_000_000 * curStellarMul).toLocaleString()} DMG NỔ SINGULARITY
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Thiên hà Quasar ➔ Vòng xoáy Accretion xoay tít và thu nhỏ nén vào tâm lỗ đen ➔ <strong>Siêu tia laser trắng bắn xuống chiếu rọi 20s</strong> ➔ Nổ Singularity!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss21_quasar');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:scale-95 text-white font-black text-xs shadow-md shadow-pink-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Kích Hoạt SS-021 Quasar
                      </button>
                    </div>

                    {/* SS-07: Event Horizon */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border-2 border-purple-500/60 hover:border-purple-400 transition flex flex-col justify-between gap-2.5 shadow-xl group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-purple-300 flex items-center gap-1.5">
                            <span className="text-base">🕳️</span> SS-07: EVENT HORIZON
                          </span>
                          <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-400">
                            PHÍM [8]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-fuchsia-400 font-bold mb-1">
                          💥 {Math.round(3_800_000 * curStellarMul).toLocaleString()} DMG (LỖ ĐEN SINGULARITY VORTEX)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          Lỗ sâu vũ trụ không gian sâu ➔ Năng lượng tím biến mất và tụ vào đầu 1 lỗ đen ➔ Rơi thẳng xuống sàn đấu hút chặt đối thủ và nổ Singularity!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('event_horizon');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-700 hover:from-purple-500 hover:to-fuchsia-500 active:scale-95 text-white font-black text-xs shadow-md shadow-purple-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Kích Hoạt SS-07 Event Horizon
                      </button>
                    </div>

                    {/* SS-08: Neutron Star */}
                    <div className="p-3.5 rounded-2xl bg-[#0c162d] border-2 border-sky-400/80 hover:border-white transition flex flex-col justify-between gap-2.5 shadow-xl group">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-sky-200 flex items-center gap-1.5">
                            <span className="text-base">⚛️</span> SS-08: NEUTRON STAR
                          </span>
                          <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-sky-950 text-sky-200 border border-sky-300">
                            PHÍM [9]
                          </span>
                        </div>
                        <div className="text-[10.5px] text-sky-300 font-bold mb-1">
                          ⚡ {Math.round(4_500_000 * curStellarMul).toLocaleString()} DMG + ☢️ {Math.round(150_000 * curStellarMul).toLocaleString()} DoT/0.25s (KILONOVA)
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-relaxed">
                          2 Ngôi sao neutron xoay quanh nhau tiếp cận ➔ Hợp nhất Kilonova thành <strong>khối cầu trắng sáng vô hạn mật độ</strong> lao xuống sàn gây sát thương cực khủng khiếp + Radiation DoT 8s!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('neutron_star');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-600 hover:from-sky-400 hover:to-cyan-300 active:scale-95 text-white font-black text-xs shadow-md shadow-cyan-500/30 transition flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Kích Hoạt SS-08 Neutron Star
                      </button>
                    </div>

                    {/* SS-FINAL: Big Bang */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1c0827] via-[#120722] to-[#0a142e] border-2 border-amber-400/90 hover:border-fuchsia-400 transition flex flex-col justify-between gap-2.5 shadow-2xl shadow-fuchsia-900/40 group sm:col-span-2 lg:col-span-3">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 flex items-center gap-1.5">
                            <span className="text-lg">💥🌌</span> SS-FINAL: BIG BANG (KHAI SINH VŨ TRỤ)
                          </span>
                          <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-black border border-yellow-300 shadow-md animate-pulse">
                            PHÍM [0] • KỸ NĂNG TỐI THƯỢNG
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-amber-300 font-black mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                          💥 {Math.round(10_000_000 * curStellarMul).toLocaleString()} DMG (VỤ NỔ HẠT LƯỢNG TỬ ĐỈNH CAO TOÀN VŨ TRỤ)
                        </div>
                        <p className="text-[11px] text-slate-200 leading-relaxed">
                          Dựa trên thiết kế cỗ máy gia tốc Dyson đa tầng vũ trụ: Cỗ máy cơ khí bắt đầu hoạt động và tăng tốc xoay các vòng gimbal ➔ Vô số electron (cyan) và proton (hổ phách) tăng tốc đạt vận tốc ánh sáng xoáy tròn dung hợp vào trung tâm ➔ Hợp nhất thành <strong>1 điểm kỳ dị trắng sáng vô hạn mật độ</strong> ➔ Phóng ra <strong>siêu vụ nổ Big Bang giáng thế</strong> lao thẳng vào sàn đấu gây sát thương cực hạn!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          engineRef.current?.triggerStellarSkill('ss_final_big_bang');
                          setShowStellarMenuModal(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-fuchsia-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 active:scale-95 text-white font-black text-xs sm:text-sm shadow-xl shadow-fuchsia-600/40 transition flex items-center justify-center gap-2 border border-amber-300/60"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                        Kích Hoạt SS-FINAL: Big Bang Khai Sinh Vũ Trụ
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Weapon Shop Modal */}
      {showWeaponShopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#070e24] border-2 border-amber-500/80 rounded-2xl p-5 shadow-2xl shadow-amber-500/20 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <span>CỬA HÀNG VŨ KHÍ CHIẾN ĐẤU (MUA BẰNG XU)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{coins.toLocaleString()} Xu</span>
                </div>
                <button
                  onClick={() => setShowWeaponShopModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Shop Scrollable Content */}
            <div className="overflow-y-auto pr-1 space-y-4 flex-1">
              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center justify-between">
                <span>
                  💡 <strong>Cách kiếm Xu:</strong> Thắng mỗi trận đấu 1v1 nhận ngay <strong>+100 Xu</strong>, hoặc Quản trị viên có thể dùng lệnh <code>/give xu &lt;số&gt;</code> trong Console Admin.
                </span>
              </div>

              {/* Weapons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SHOP_WEAPONS.map(item => {
                  const wep = WEAPON_DEFS[item.key];
                  const isCurrent = playerWeapon === item.key;
                  const isOwned =
                    item.isFree ||
                    (item.key === 'computer' && computerUnlocked) ||
                    (item.key === 'daynit' && (daynitUnlocked || theOwnerUnlocked || selectedRole === 'the_owner')) ||
                    (item.key === 'cancau' && cancauUnlocked) ||
                    (item.key === 'songkiem' && songkiemUnlocked) ||
                    (item.key === 'railgun' && railgunUnlocked) ||
                    (item.key === 'mace' && maceUnlocked) ||
                    (item.key === 'songthu' && songthuUnlocked) ||
                    (item.key === 'minigun' && minigunUnlocked) ||
                    (item.key === 'satna' && satnaUnlocked) ||
                    (item.key === 'torch' && torchUnlocked) ||
                    (item.key === 'thuongthan' && thuongthanUnlocked) ||
                    (item.key === 'than_songkiem' && thanSongkiemUnlocked) ||
                    (item.key === 'stellar_remote' && (stellarUnlocked || hasOwnerPrivilege || loadRailgunMirrorWins() >= 1000)) ||
                    (item.key === 'sangthe' && devNntlUnlocked);

                  return (
                    <div
                      key={item.key}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition ${
                        isCurrent
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : isOwned
                          ? 'bg-slate-900/90 border-slate-700'
                          : 'bg-[#0a122c] border-amber-500/30 hover:border-amber-400/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-black/60 border border-slate-700 flex-shrink-0 flex items-center justify-center">
                          <WeaponCanvasPreview weaponKey={item.key} isSelected={isCurrent} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-bold text-xs text-white truncate">
                              {item.name}
                            </span>
                            {item.tag && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                  item.isDevOnly
                                    ? 'bg-rose-950 text-rose-300 border-rose-500'
                                    : item.isOwnerOnly
                                    ? 'bg-amber-950 text-amber-300 border-amber-500'
                                    : item.isFree
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                                    : 'bg-amber-950 text-amber-300 border-amber-500'
                                }`}
                              >
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-amber-400 font-bold mb-1">
                            Sát thương cơ bản: {wep?.dmg || 15} DMG
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1 text-xs font-bold">
                          {item.isDevOnly ? (
                            <span className="text-rose-400 flex items-center gap-1">
                              <Crown className="w-3.5 h-3.5" /> NNTL Độc Quyền
                            </span>
                          ) : item.isOwnerOnly ? (
                            <span className="text-amber-400 flex items-center gap-1 font-bold">
                              <Crown className="w-3.5 h-3.5 text-amber-400" /> Đặc Quyền Owner
                            </span>
                          ) : item.isFree ? (
                            <span className="text-emerald-400">Miễn Phí</span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5" /> {item.price} Xu
                            </span>
                          )}
                        </div>

                        <div>
                          {isCurrent ? (
                            <span className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-bold text-[11px] flex items-center gap-1 shadow">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Đang Dùng
                            </span>
                          ) : isOwned ? (
                            <button
                              onClick={() => {
                                setPlayerWeapon(item.key);
                                alert(`Đã trang bị vũ khí [${item.name}]!`);
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow"
                            >
                              Trang Bị
                            </button>
                          ) : item.isDevOnly ? (
                            <button
                              onClick={() => handleBuyWeapon(item)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1 transition shadow"
                            >
                              <Crown className="w-3 h-3" /> Xác Thực NNTL
                            </button>
                          ) : item.isOwnerOnly ? (
                            <button
                              onClick={() => handleBuyWeapon(item)}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black font-black text-[11px] flex items-center gap-1 transition shadow shadow-amber-500/20"
                            >
                              <Crown className="w-3 h-3" /> Dùng Đặc Quyền
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBuyWeapon(item)}
                              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-black text-[11px] transition shadow-md shadow-amber-500/20"
                            >
                              Mua Ngay
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Developer NNTL Direct Authorization Section */}
              <div className="p-3.5 bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Xác thực Nhà Phát Triển (Nguyễn Ngọc Thiên Long) - Mở Khóa Sáng Thế Chi Kiếm</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Vũ khí tối cao <strong>Sáng Thế Chi Kiếm (777.7777 DMG)</strong> được bảo vệ và chỉ có Nhà Phát Triển <strong>Nguyễn Ngọc Thiên Long (NNTL)</strong> mới được phép kích hoạt sử dụng trong trận chiến.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={devCodeInput}
                    onChange={e => {
                      setDevCodeInput(e.target.value);
                      setDevCodeError(null);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleDevAuthSubmit();
                    }}
                    placeholder="Nhập: Nguyễn Ngọc Thiên Long hoặc nntl..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-rose-400"
                  />
                  <button
                    onClick={handleDevAuthSubmit}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow"
                  >
                    Xác Thực NNTL
                  </button>
                </div>
                {devCodeError && (
                  <div className="text-[11px] text-rose-400 font-semibold">{devCodeError}</div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
              <span className="text-[11px] text-slate-400">
                Nhấn Trang Bị hoặc Mua để sử dụng vũ khí trong trận đấu 1v1.
              </span>
              <button
                onClick={() => setShowWeaponShopModal(false)}
                className="px-5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
              >
                Đóng Cửa Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sound Settings Modal */}
      {showSoundModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0b132b] border-2 border-cyan-500/80 rounded-2xl w-full max-w-lg shadow-[0_0_40px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col p-5 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Cài Đặt Âm Thanh Game
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                      Web Audio Engine
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Âm thanh tổng hợp tự động theo thời gian thực (Zero Lag, Không tốn tải mạng)
                  </p>
                </div>
              </div>
              <button
                id="close-sound-modal-btn"
                onClick={() => setShowSoundModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              {/* Master Mute Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white text-sm">Âm Lượng Tổng (Master Audio)</div>
                  <div className="text-slate-400 text-[11px]">Bật hoặc tắt toàn bộ hiệu ứng âm thanh và nhạc nền</div>
                </div>
                <button
                  id="modal-toggle-master-mute-btn"
                  onClick={handleToggleMute}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isMuted
                      ? 'bg-rose-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Đang Tắt' : 'Đang Bật'}</span>
                </button>
              </div>

              {/* SFX Volume Slider */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Hiệu Ứng Chiến Đấu (SFX): {Math.round(sfxVolume * 100)}%</span>
                  <span className="text-[11px] text-slate-400">Va đập, Chém kiếm, Sấm sét, Dây nịt</span>
                </div>
                <input
                  id="sound-sfx-volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sfxVolume}
                  onChange={(e) => handleSetSfxVolume(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* BGM Toggle & Slider */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Music className="w-4 h-4 text-cyan-400" />
                      <span>Nhạc Nền Trận Đấu (Battle BGM): {Math.round(bgmVolume * 100)}%</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Nhạc nền nhịp điệu kích thích khi chiến đấu</div>
                  </div>
                  <button
                    id="modal-toggle-bgm-btn"
                    onClick={handleToggleBgm}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      bgmEnabled ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {bgmEnabled ? 'Bật BGM' : 'Tắt BGM'}
                  </button>
                </div>
                <input
                  id="sound-bgm-volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bgmVolume}
                  onChange={(e) => handleSetBgmVolume(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Interactive Sound Test Area */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nghe Thử Hiệu Ứng (Sound Test):</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <button
                    id="sound-test-hit"
                    onClick={() => handlePlayTestSound('hit')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-700 transition flex flex-col items-center gap-1"
                  >
                    <span>💥 Đòn Đánh</span>
                  </button>
                  <button
                    id="sound-test-slash"
                    onClick={() => handlePlayTestSound('slash')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-700 transition flex flex-col items-center gap-1"
                  >
                    <span>🗡️ Chém Kiếm</span>
                  </button>
                  <button
                    id="sound-test-skill"
                    onClick={() => handlePlayTestSound('skill')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-700 transition flex flex-col items-center gap-1"
                  >
                    <span>⚡ Kỹ Năng</span>
                  </button>
                  <button
                    id="sound-test-ultimate"
                    onClick={() => handlePlayTestSound('ultimate')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-700 transition flex flex-col items-center gap-1"
                  >
                    <span>🌌 Tuyệt Kỹ</span>
                  </button>
                  <button
                    id="sound-test-coin"
                    onClick={() => handlePlayTestSound('coin')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-700 transition flex flex-col items-center gap-1"
                  >
                    <span>🪙 Nhặt Xu</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                id="close-sound-modal-footer-btn"
                onClick={() => setShowSoundModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
              >
                Hoàn Tất Cài Đặt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-4xl space-y-4">
        {activeTab === 'game' ? (
          inBattle ? (
            /* Battle Mode */
            <div className="w-full bg-[#070e24] border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/40 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between w-full px-2 border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${selectedMap === 'sandbox' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500 animate-pulse'}`}></span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300">
                    {selectedMap === 'sandbox' ? '🎯 CHẾ ĐỘ MAP SANDBOX (DUMMY BẤT TỬ & ĐO SÁT THƯƠNG)' : '⚔️ ĐANG GIAO ĐẤU 1V1 • VIỀN CHIẾN ĐẤU'}
                  </span>
                </div>
                <button
                  id="exit-battle-btn"
                  onClick={exitBattle}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Quay lại Cài đặt
                </button>
              </div>

              {selectedMap === 'sandbox' && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Cơ chế Sandbox:</strong> Dùng phím <strong>W A S D</strong> để di chuyển • Click / Space để tấn công • Click vào quả bóng Dummy để <strong>Reset DMG về 0</strong> • Nhấn phím <strong>1 - 0</strong> để xuất chiêu!
                    </span>
                  </div>
                </div>
              )}

              {/* Responsive 2-Column Battle Layout: Arena on Left, Skill Hotbar on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Canvas & Quick Controls (7/12 cols on desktop) */}
                <div className="lg:col-span-7 flex flex-col items-center gap-4">
                  {/* Dimension Switcher Control Bar (2D / 3D / 4D Tesseract - Player Choice) */}
                  <div className="flex items-center justify-between w-full max-w-[460px] px-3 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                      <span className="text-cyan-400">🌌 Dạng Không Gian:</span>
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold transition-all ${
                          dimensionMode === '4d'
                            ? 'bg-purple-950/80 border border-pink-500/60 text-pink-300'
                            : dimensionMode === '3d'
                            ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
                            : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                        }`}
                      >
                        {dimensionMode === '4d' ? '4D TESSERACT' : dimensionMode === '3d' ? '3D LẬP THỂ' : '2D (MƯỢT 60FPS)'}
                      </span>
                      <span className="hidden sm:inline text-[10px] text-slate-400 font-normal">(Phím V)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        id="dimension-btn-2d"
                        onClick={() => handleSetDimensionMode('2d')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                          dimensionMode === '2d'
                            ? 'bg-emerald-500 text-black shadow-md font-extrabold ring-1 ring-emerald-300'
                            : 'text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700/70'
                        }`}
                        title="2D Cổ Điển: Siêu mượt, không lag, chuẩn 60 FPS"
                      >
                        2D (Mượt)
                      </button>
                      <button
                        id="dimension-btn-3d"
                        onClick={() => handleSetDimensionMode('3d')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                          dimensionMode === '3d'
                            ? 'bg-cyan-500 text-black shadow-md font-extrabold ring-1 ring-cyan-300'
                            : 'text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700/70'
                        }`}
                        title="3D Lập Thể: Đổ bóng cầu và lưới phối cảnh"
                      >
                        3D
                      </button>
                      <button
                        id="dimension-btn-4d"
                        onClick={() => handleSetDimensionMode('4d')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          dimensionMode === '4d'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md font-extrabold ring-1 ring-pink-300'
                            : 'text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700/70'
                        }`}
                        title="4D Tesseract: Khối siêu lập phương 4 chiều"
                      >
                        <Sparkles className="w-3 h-3" /> 4D
                      </button>

                      {/* Sound Quick Toggle */}
                      <button
                        id="battle-audio-toggle-btn"
                        onClick={handleToggleMute}
                        className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                          isMuted
                            ? 'bg-rose-950 border-rose-500/60 text-rose-300'
                            : 'bg-slate-800 border-slate-700 text-cyan-300 hover:text-white'
                        }`}
                        title={isMuted ? 'Đang tắt âm (Click để bật)' : 'Đang bật âm (Click để tắt)'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                      <button
                        id="battle-sound-modal-btn"
                        onClick={() => setShowSoundModal(true)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                        title="Cài đặt Âm thanh & Nhạc nền"
                      >
                        <Sliders className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Game Canvas (Flat DOM container - Zero CSS 3D lag) */}
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all bg-black ${
                      dimensionMode === '4d'
                        ? 'border-2 border-fuchsia-400 shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                        : dimensionMode === '3d'
                        ? 'border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                        : 'border-2 border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    }`}
                  >
                    <canvas
                      id="game-canvas"
                      ref={canvasRef}
                      width={500}
                      height={500}
                      onClick={(e) => engineRef.current?.handleCanvasClick(e.clientX, e.clientY)}
                      className="block w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] cursor-crosshair"
                    />
                  </div>

                  {/* On-Screen Touch / Click QTE Controls */}
                  <div className="w-full max-w-[460px] bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
                    <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                      <span>🥊 Phím Di Chuyển / QTE (WASD):</span>
                      <span className="text-[10px] text-cyan-400 font-normal">Nhấn phím bàn phím hoặc chạm nút</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 w-full max-w-[320px]">
                      {(['W', 'A', 'S', 'D'] as const).map(k => (
                        <button
                          key={k}
                          id={`qte-btn-${k}`}
                          onMouseDown={() => engineRef.current?.handleKeyDown(k)}
                          onMouseUp={() => engineRef.current?.handleKeyUp(k)}
                          onTouchStart={() => engineRef.current?.handleKeyDown(k)}
                          onTouchEnd={() => engineRef.current?.handleKeyUp(k)}
                          onClick={() => engineRef.current?.handleQTEInput(k)}
                          className="py-2 px-3 rounded-xl bg-[#0a1835] hover:bg-cyan-600 active:scale-95 border border-cyan-500/40 hover:border-cyan-400 text-white font-mono font-black text-sm shadow-md transition flex flex-col items-center justify-center"
                        >
                          <span>{k}</span>
                          <span className="text-[8px] text-slate-400 font-sans">{k === 'W' ? '▲' : k === 'A' ? '◄' : k === 'S' ? '▼' : '►'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <button
                        id="rematch-btn"
                        onClick={() => {
                          if (engineRef.current) {
                            engineRef.current.initGame({
                              playerHp: selectedHp,
                              playerWeaponKey: playerWeapon,
                              enemyWeaponKey: enemyWeapon,
                              playerElementKey: equippedElement,
                              playerRole: selectedRole,
                              enemyElementKey: enemyElementKey === 'random' ? undefined : enemyElementKey,
                              enemyRole: enemyRole === 'random' ? undefined : enemyRole,
                              isSandbox: selectedMap === 'sandbox',
                              selectedMap: selectedMap,
                              isTowerDefense: selectedMap === 'tower_defense',
                              is2v2: is2v2,
                              player2WeaponKey: player2Weapon,
                              player2ElementKey: player2Element || undefined,
                              player2Role: player2Role,
                              enemy2WeaponKey: enemy2Weapon === 'random' ? undefined : enemy2Weapon,
                              enemy2ElementKey: enemy2Element === 'random' ? undefined : enemy2Element,
                              enemy2Role: enemy2Role === 'random' ? undefined : enemy2Role
                            });
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {selectedMap === 'sandbox' ? 'Làm Mới Phòng Sandbox' : selectedMap === 'tower_defense' ? 'Thủ Lại Thành (Chơi Lại)' : 'Tái đấu (Đấu lại)'}
                      </button>

                      {is2v2 && (
                        <button
                          id="trigger-tranquoc-btn"
                          onClick={() => {
                            engineRef.current?.triggerTranQuocChiKiem('blue');
                          }}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 font-black text-xs text-white shadow-lg shadow-amber-600/30 flex items-center gap-1.5 transition border border-amber-300/40"
                          title="Kích hoạt tuyệt kỹ Cửu Ngũ Chí Tôn Thức - Trấn Quốc Chi Kiếm (Hiến tế Bá Thường, Sở Tân cắm kiếm 88% Max HP)"
                        >
                          <Flame className="w-4 h-4 text-amber-300" />
                          Trấn Quốc Chi Kiếm (Hiến Tế)
                        </button>
                      )}

                      {(playerWeapon === 'stellar_remote' || selectedRole === 'the_owner' || selectedRole === 'the_owner_7b' || theOwner7bUnlocked || theOwnerUnlocked) && (
                        <button
                          id="trigger-stellar-menu-btn"
                          onClick={() => {
                            if (engineRef.current) {
                              engineRef.current.toggleStellarMenu();
                            } else {
                              setShowStellarMenuModal(prev => !prev);
                            }
                          }}
                          className={`px-5 py-2.5 rounded-xl font-black text-xs text-white shadow-lg flex items-center gap-2 transition border animate-pulse ${
                            selectedRole === 'the_owner_7b'
                              ? 'bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 border-yellow-300 shadow-yellow-500/40 text-black'
                              : selectedRole === 'the_owner'
                              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-300 shadow-emerald-500/30'
                              : 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-cyan-300/40 shadow-cyan-500/30'
                          }`}
                          title="Bảng điều khiển 4 Tuyệt Kỹ Quỹ Đạo Vũ Trụ (SS-01, SS-03, SS-04, SS-05) - Hỗ trợ đặc quyền The Owner!"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                          <span>
                            {selectedRole === 'the_owner_7b'
                              ? '👑⚡ Menu Vệ Tinh 7 TỈ % (Owner)'
                              : selectedRole === 'the_owner'
                              ? '👑💻 Menu Vệ Tinh (Đặc Quyền Owner)'
                              : '🛰️ Menu Vệ Tinh (Stellar Remote)'}
                          </span>
                        </button>
                      )}
                    </div>
                </div>

                {/* Right Column: Skill Hotbar 1 - 0 (5/12 cols on desktop) */}
                <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                        Bảng Kỹ Năng (Phím 1 - 0)
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Nhấn số hoặc click
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {getPlayerSkillList(selectedRole, playerWeapon).map(item => {
                      const cdEnd = skillCooldowns[item.slot] || 0;
                      const remainingMs = Math.max(0, cdEnd - currentTime);
                      const isOnCooldown = remainingMs > 0;
                      const remainingSec = Math.ceil(remainingMs / 1000);
                      const progress = Math.min(1, Math.max(0, remainingMs / 20000));
                      // Hiển thị con số mờ dần trong 20s: progress giảm dần từ 1.0 về 0.0
                      const numberOpacity = Math.max(0.2, progress);

                      return (
                        <button
                          key={item.slot}
                          id={`skill-slot-btn-${item.slot}`}
                          disabled={isOnCooldown}
                          onClick={() => handleTriggerSkillSlot(item.slot)}
                          className={`relative overflow-hidden w-full text-left p-2.5 rounded-xl border transition shadow-md group flex items-start gap-2.5 select-none ${
                            isOnCooldown
                              ? 'bg-[#080e22] border-amber-500/40 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#0a142e] to-[#0f1f45] hover:from-[#112450] hover:to-[#173069] active:scale-[0.98] border-cyan-500/30 hover:border-cyan-400 cursor-pointer'
                          }`}
                        >
                          {/* Lớp phủ hồi chiêu & Con số đếm ngược mờ dần trong 20s */}
                          {isOnCooldown && (
                            <div className="absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-[1px] flex items-center justify-between px-3 pointer-events-none">
                              {/* Thanh tiến trình hồi chiêu 20s thu dần về 0% */}
                              <div
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                style={{ width: `${progress * 100}%` }}
                              />

                              {/* Phím số */}
                              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                                {item.keyLabel}
                              </div>

                              {/* Tên kỹ năng mờ nhẹ */}
                              <div className="flex-1 min-w-0 px-2.5 opacity-40">
                                <span className="font-semibold text-xs text-slate-200 truncate block">
                                  {item.name}
                                </span>
                              </div>

                              {/* Con số đếm ngược thời gian hồi chiêu mờ dần trong 20s */}
                              <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 border border-amber-500/50 shadow-lg flex-shrink-0"
                                style={{
                                  opacity: numberOpacity,
                                  transition: 'opacity 0.2s ease-out'
                                }}
                              >
                                <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wider">
                                  HỒI
                                </span>
                                <span className="font-mono font-black text-base sm:text-lg text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-pulse">
                                  {remainingSec}s
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Key Badge */}
                          <div className={`w-7 h-7 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-sm flex-shrink-0 transition ${
                            isOnCooldown ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:scale-105'
                          }`}>
                            {item.keyLabel}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="font-bold text-xs text-white truncate">
                                {item.name}
                              </span>
                              {item.tag && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-600/40 flex-shrink-0">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 bg-[#0a1532] border border-cyan-500/20 rounded-xl text-[11px] text-slate-300 space-y-1">
                    <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hướng dẫn phím tắt:</span>
                    </div>
                    <p className="text-[10px] text-slate-300">
                      • Bấm phím <strong>1</strong> đến <strong>0</strong> trên bàn phím để kích hoạt ngay lập tức!<br />
                      • Trong Sandbox: bóng đối thủ là Dummy Bất Tử (Infinite HP) để bạn thoải mái kiểm tra sát thương và combo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Setup Mode */
            <div className="space-y-4">
              {/* Quick Guide Banner */}
              <div className="bg-gradient-to-r from-[#0c1840] via-[#09122e] to-[#0c1840] border border-cyan-500/30 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">
                      Hướng Dẫn Luật Chơi & Cơ Chế Đấu Bóng
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Tìm hiểu cơ chế đấu bóng, đập ghép nguyên tố và màn đối đầu chùm tia Railgun Clash.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuideModal(true)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-600/30 transition flex items-center gap-1.5"
                >
                  <span>Xem Hướng Dẫn</span>
                </button>
              </div>

              {/* 0. Map / Mode Selection (Map Đấu Trường vs Map Sandbox) */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    0. Chọn Chế Độ Chơi (Bản Đồ / Map)
                  </h2>
                  <span className="text-xs text-cyan-300 font-bold">
                    {selectedMap === 'sandbox' ? 'Map Sandbox (Dummy Bất Tử)' : 'Đấu Trường 1v1 (PvP/AI)'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Standard Map */}
                  <button
                    id="map-standard-btn"
                    onClick={() => setSelectedMap('standard')}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedMap === 'standard'
                        ? 'bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#0e1d42] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        <Swords className="w-4 h-4 text-cyan-400" />
                        Đấu Trường 1v1
                      </span>
                      {selectedMap === 'standard' && (
                        <span className="text-[10px] text-cyan-300 font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/50">
                          Đang chọn
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      Hai quả bóng chiến đấu tự do, chạm va đập và thi triển kỹ năng trừ máu trực tiếp. Bên nào cạn HP trước sẽ bị xử thua!
                    </p>
                  </button>

                  {/* Sandbox Map */}
                  <button
                    id="map-sandbox-btn"
                    onClick={() => setSelectedMap('sandbox')}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedMap === 'sandbox'
                        ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#06201b] hover:border-emerald-600/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        Sandbox (Đo Damage)
                      </span>
                      {selectedMap === 'sandbox' && (
                        <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">
                          Đang chọn
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      Bóng đối thủ là <strong>Dummy Bất Tử</strong> đứng im. Hiện bảng Tổng DMG & DPS trên đầu (click để Reset). Phím <strong>WASD</strong> & <strong>1-0</strong> xả chiêu!
                    </p>
                  </button>

                  {/* Tower Defense Map [NEW] */}
                  <button
                    id="map-tower-defense-btn"
                    onClick={() => setSelectedMap('tower_defense')}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedMap === 'tower_defense'
                        ? 'bg-rose-950/80 border-rose-400 text-white ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/30'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#20080d] hover:border-rose-500/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-rose-300 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-rose-400" />
                        Map Thủ Thành (Tower Defense) [NEW]
                      </span>
                      {selectedMap === 'tower_defense' && (
                        <span className="text-[10px] text-rose-300 font-bold px-1.5 py-0.5 rounded bg-rose-950 border border-rose-500/50">
                          Đang chọn
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      Quái đỏ tràn vào từ bên phải hướng về Cổng thành bên góc trái. Diệt quái cộng trực tiếp <strong>+2.5 Xu/con</strong>. Quái tăng số lượng và máu theo thời gian!
                    </p>
                  </button>
                </div>
              </section>

              {/* Dimension Mode Preference (2D / 3D / 4D Tùy Player Chọn) */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Chế Độ Không Gian Hiển Thị (Tùy Player Lựa Chọn)
                  </h2>
                  <span className="text-xs text-slate-300 font-medium">
                    {dimensionMode === '2d' ? '⚡ 2D Cực Mượt (Khuyên dùng)' : dimensionMode === '3d' ? '🧊 3D Lập Thể' : '🌌 4D Tesseract'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    id="lobby-dimension-2d-btn"
                    onClick={() => handleSetDimensionMode('2d')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                      dimensionMode === '2d'
                        ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#06201b]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-emerald-300">2D Cổ Điển (Khuyên Dùng)</span>
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">60-120 FPS</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Giao diện 2D phẳng truyền thống, tối ưu 100% tài nguyên, hoàn toàn không lag, phản hồi thao tác tức thì.
                    </p>
                  </button>

                  <button
                    id="lobby-dimension-3d-btn"
                    onClick={() => handleSetDimensionMode('3d')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                      dimensionMode === '3d'
                        ? 'bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#0c1e3d]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-cyan-300">3D Lập Thể</span>
                      <span className="text-[10px] bg-cyan-900/60 text-cyan-200 px-1.5 py-0.5 rounded font-mono font-bold">Khối Cầu</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Lưới sàn đấu phối cảnh có độ sâu, tường 3D nổi khối và bóng đổ tiếp đất tự nhiên cho các thực thể.
                    </p>
                  </button>

                  <button
                    id="lobby-dimension-4d-btn"
                    onClick={() => handleSetDimensionMode('4d')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                      dimensionMode === '4d'
                        ? 'bg-purple-950/80 border-pink-400 text-white ring-2 ring-pink-400/40 shadow-lg shadow-purple-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1d0d33]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-pink-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-pink-400" />
                        4D Tesseract Siêu Chiều
                      </span>
                      <span className="text-[10px] bg-purple-900/60 text-pink-200 px-1.5 py-0.5 rounded font-mono font-bold">Hypercube</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Mô phỏng khối siêu lập phương 4D tesseract xoay trục W, sóng hấp dẫn không-thời gian và dư ảnh lượng tử.
                    </p>
                  </button>
                </div>
              </section>

              {/* HP Selection */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    1. Chọn Lượng Máu (HP Khởi Đầu)
                  </h2>
                  <span className="text-xs text-cyan-300 font-bold">
                    {selectedHp >= 1000000 ? `${selectedHp / 1000000}M HP (${selectedHp.toLocaleString()} HP)` : `${selectedHp.toLocaleString()} HP`}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
                  {HP_OPTIONS.map(hp => (
                    <button
                      key={hp}
                      id={`hp-btn-${hp}`}
                      onClick={() => setSelectedHp(hp)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                        selectedHp === hp
                          ? 'bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                          : 'bg-[#0a142e] border-slate-700 text-white hover:bg-[#0e1d42] hover:border-cyan-400/50'
                      }`}
                    >
                      {hp >= 1000000 ? `${hp / 1000000}m` : hp >= 1000 ? `${hp / 1000}k` : hp}
                    </button>
                  ))}
                </div>
              </section>

              {/* 2v2 Mode Toggle Bar */}
              <section className={`p-4 rounded-2xl border transition-all ${
                is2v2
                  ? 'bg-gradient-to-r from-emerald-950/70 via-slate-900/80 to-amber-950/70 border-emerald-500/80 ring-2 ring-emerald-400/30 shadow-xl'
                  : 'bg-[#080f24] border-slate-800'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                      is2v2 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                          Chế Độ Đấu Đội 2v2 (4 Bóng Tranh Tài)
                        </h2>
                        {is2v2 ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500 text-black animate-pulse shadow">
                            ĐANG BẬT 2v2
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-400">
                            1v1 CƠ BẢN
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Khi bật: Hiện 2 mục chọn nữa là <span className="text-emerald-400 font-bold">Màu Xanh Lá</span> (Team Bạn) và <span className="text-amber-400 font-bold">Màu Vàng</span> (Team Địch), chia riêng Vũ khí, Hệ và Role!
                      </p>
                    </div>
                  </div>

                  <button
                    id="toggle-2v2-btn"
                    onClick={() => setIs2v2(prev => !prev)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
                      is2v2
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/30 ring-2 ring-emerald-300/60'
                        : 'bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white shadow-emerald-600/20'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>{is2v2 ? '✓ Đang bật 2v2 (Bấm để tắt)' : '⚡ Bật Chế Độ 2v2'}</span>
                  </button>
                </div>

                {/* Live Synergy Status Display */}
                {is2v2 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Team Blue Synergies */}
                    {(((selectedRole === 'sotan' && player2Role === 'bathuong') || (selectedRole === 'bathuong' && player2Role === 'sotan')) && (playerWeapon === 'cancau' || player2Weapon === 'cancau')) ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/80 text-emerald-200 flex items-start gap-2 text-xs shadow-md">
                        <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 shrink-0 animate-bounce" />
                        <div>
                          <strong className="text-amber-300 block font-black">🌟 KÍCH HOẠT: THIÊN HẠ VẠN CỔ HOÀNH HẢI SA TRƯỜNG</strong>
                          <span className="text-[11px] text-emerald-100">
                            Team Xanh: <strong>HP +20%, DMG x1.5, Tốc độ x1.7</strong>! Tuyệt kỹ hợp nhất: <strong>Trấn Quốc Chi Kiếm</strong> (Khi Bá Thường hy sinh về 0 HP, Sở Tân nổi trận lôi đình triệu hồi kiếm thần cắm phạt <strong>88% Max HP</strong>).
                          </span>
                        </div>
                      </div>
                    ) : (((selectedRole === 'admin' && player2Role === 'the_owner') || (selectedRole === 'the_owner' && player2Role === 'admin'))) ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/80 text-emerald-200 flex items-start gap-2 text-xs shadow-md">
                        <Crown className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0 animate-pulse" />
                        <div>
                          <strong className="text-emerald-300 block font-black">👑 KÍCH HOẠT: BUFF ĐỒNG NGHIỆP</strong>
                          <span className="text-[11px] text-emerald-100">
                            Team Xanh (Admin & The Owner): <strong>Giảm 30% sát thương, DMG x1.5, Tốc độ x1.3</strong>, tự động cứu mạng hồi 25% HP & khiên bất tử 2.5s khi nguy cấp!
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">Team Xanh:</span>
                        <span>Chọn <strong>Sở Tân + Bá Thường + Cần Câu</strong> hoặc <strong>Admin + The Owner</strong> để kích hoạt Duyên Phận!</span>
                      </div>
                    )}

                    {/* Team Yellow Synergies */}
                    {(((enemyRole === 'sotan' && enemy2Role === 'bathuong') || (enemyRole === 'bathuong' && enemy2Role === 'sotan')) && (enemyWeapon === 'cancau' || enemy2Weapon === 'cancau')) ? (
                      <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-400/80 text-amber-200 flex items-start gap-2 text-xs shadow-md">
                        <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 shrink-0 animate-bounce" />
                        <div>
                          <strong className="text-amber-300 block font-black">⭐ ĐỊCH KÍCH HOẠT: THIÊN HẠ VẠN CỔ HOÀNH HẢI SA TRƯỜNG</strong>
                          <span className="text-[11px] text-amber-100">
                            Team Vàng: <strong>HP +20%, DMG x1.5, Tốc độ x1.7</strong> và kích hoạt tuyệt kỹ <strong>Trấn Quốc Chi Kiếm 88% Max HP</strong>!
                          </span>
                        </div>
                      </div>
                    ) : (((enemyRole === 'admin' && enemy2Role === 'the_owner') || (enemyRole === 'the_owner' && enemy2Role === 'admin'))) ? (
                      <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-400/80 text-amber-200 flex items-start gap-2 text-xs shadow-md">
                        <Crown className="w-4 h-4 text-amber-300 mt-0.5 shrink-0 animate-pulse" />
                        <div>
                          <strong className="text-amber-300 block font-black">⭐ ĐỊCH KÍCH HOẠT: BUFF ĐỒNG NGHIỆP</strong>
                          <span className="text-[11px] text-amber-100">
                            Team Vàng: <strong>Giảm 30% sát thương, DMG x1.5, Tốc độ x1.3</strong> và khiên hộ mệnh cứu tử!
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                        <span className="text-amber-400 font-bold">Team Vàng:</span>
                        <span>Địch có thể kích hoạt Duyên Phận tương tự nếu thiết lập đúng tổ hợp!</span>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Weapons Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Player Weapon */}
                <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Swords className="w-4 h-4" />
                      2. {is2v2 ? 'Vũ khí BẠN 1 (Team Xanh)' : 'Vũ khí của Bạn'}
                    </h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowWeaponShopModal(true)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-400/50 text-amber-300 font-bold text-[10px] flex items-center gap-1 transition"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Cửa Hàng Xu</span>
                      </button>
                      <span className="text-xs text-white font-bold">
                        {WEAPON_DEFS[playerWeapon]?.name}
                      </span>
                    </div>
                  </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableWeapons.map(key => {
                      const wep = WEAPON_DEFS[key];
                      const isSelected = playerWeapon === key;
                      const isComputer = key === 'computer';
                      const isDayNit = key === 'daynit';
                      const isStellar = key === 'stellar_remote';
                      return (
                        <button
                          key={key}
                          id={`p-wep-${key}`}
                          onClick={() => setPlayerWeapon(key)}
                          className={`relative p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition text-center ${
                            isSelected
                              ? 'bg-cyan-950/70 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                              : isComputer
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900/60 hover:border-emerald-400'
                              : isDayNit
                              ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 hover:bg-amber-900/60 hover:border-amber-400'
                              : isStellar
                              ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 hover:bg-cyan-900/60 hover:border-cyan-400'
                              : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#0e1d42] hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          {isComputer && (
                            <span className="absolute -top-1.5 -right-1 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500 text-black shadow">
                              THE OWNER
                            </span>
                          )}
                          {isDayNit && (
                            <span className="absolute -top-1.5 -right-1 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-amber-500 text-black shadow">
                              THE OWNER
                            </span>
                          )}
                          {isStellar && (
                            <span className="absolute -top-1.5 -right-1 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-cyan-400 text-black shadow">
                              {hasOwnerPrivilege ? '👑 OWNER VỆ TINH' : '🛰️ VỆ TINH'}
                            </span>
                          )}
                          <WeaponCanvasPreview weaponKey={key} isSelected={isSelected} />
                          <span className="text-[11px] font-bold truncate max-w-full">
                            {wep.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Chi tiết thông số Vũ Khí Đang Chọn của Bạn */}
                  {WEAPON_DETAILS[playerWeapon] && (() => {
                    const detail = WEAPON_DETAILS[playerWeapon];
                    return (
                      <div className="mt-3.5 p-3.5 bg-[#060c1d] border-2 border-cyan-500/60 rounded-xl text-xs space-y-2.5 shadow-lg">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/30 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">⚔️</span>
                            <span className="font-black text-cyan-300 text-sm">{detail.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/50 text-[10px] text-cyan-300 font-bold">
                              {detail.category}
                            </span>
                          </div>
                          <span className="text-[10px] text-cyan-400/80 font-mono">Bảng Thông Số Chiến Đấu</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-[#0b1632] border border-cyan-500/20">
                            <span className="text-[10px] font-bold text-rose-300 block mb-0.5">💥 SÁT THƯƠNG (DMG)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.dmg}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#0b1632] border border-cyan-500/20">
                            <span className="text-[10px] font-bold text-amber-300 block mb-0.5">🎯 TẦM ĐÁNH (RANGE)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.range}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#0b1632] border border-cyan-500/20">
                            <span className="text-[10px] font-bold text-sky-300 block mb-0.5">⚡ TỐC ĐỘ (ATK SPEED)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.atkSpeed}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-[#0b1632] border border-purple-500/20 flex flex-col sm:flex-row gap-2">
                          <div className="flex-1">
                            <span className="text-[10px] font-bold text-purple-300 block mb-0.5">🛡️ NỘI TẠI ĐẶC QUYỀN</span>
                            <p className="text-slate-200 text-[11px] leading-relaxed">{detail.passive}</p>
                          </div>
                          <div className="flex-1 sm:border-l sm:border-purple-500/20 sm:pl-2">
                            <span className="text-[10px] font-bold text-emerald-300 block mb-0.5">📋 SKILL CÓ THỂ COPY</span>
                            <p className="text-emerald-200 text-[11px] font-medium leading-relaxed">{detail.copyableSkills}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </section>

                {/* Enemy Weapon */}
                <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Swords className="w-4 h-4" />
                      3. {is2v2 ? 'Vũ khí ĐỊCH 1 (Team Vàng)' : 'Vũ khí của Địch'}
                    </h2>
                    <span className="text-xs text-white font-bold">
                      {enemyWeapon === 'random' ? 'Ngẫu nhiên' : WEAPON_DEFS[enemyWeapon]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <button
                      id="e-wep-random"
                      onClick={() => setEnemyWeapon('random')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                        enemyWeapon === 'random'
                          ? 'bg-rose-950/70 border-rose-400 text-white ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/20'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1a0f1d] hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-rose-400 font-bold text-sm">
                        ??
                      </div>
                      <span className="text-[11px] font-bold">Ngẫu nhiên</span>
                    </button>
                    {enemyAvailableWeapons.map(key => {
                      const wep = WEAPON_DEFS[key];
                      const isSelected = enemyWeapon === key;
                      const isComputer = key === 'computer';
                      const isDayNit = key === 'daynit';
                      return (
                        <button
                          key={key}
                          id={`e-wep-${key}`}
                          onClick={() => setEnemyWeapon(key)}
                          className={`relative p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition text-center ${
                            isSelected
                              ? 'bg-rose-950/70 border-rose-400 text-white ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/20'
                              : isComputer
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900/60 hover:border-emerald-400'
                              : isDayNit
                              ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 hover:bg-amber-900/60 hover:border-amber-400'
                              : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1a0f1d] hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          {isComputer && (
                            <span className="absolute -top-1.5 -right-1 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500 text-black shadow">
                              THE OWNER
                            </span>
                          )}
                          {isDayNit && (
                            <span className="absolute -top-1.5 -right-1 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-amber-500 text-black shadow">
                              THE OWNER
                            </span>
                          )}
                          <WeaponCanvasPreview weaponKey={key} isSelected={isSelected} />
                          <span className="text-[11px] font-bold truncate max-w-full">
                            {wep.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Chi tiết thông số Vũ Khí của Địch */}
                  {enemyWeapon !== 'random' && WEAPON_DETAILS[enemyWeapon] && (() => {
                    const detail = WEAPON_DETAILS[enemyWeapon];
                    return (
                      <div className="mt-3.5 p-3.5 bg-[#170a13] border-2 border-rose-500/60 rounded-xl text-xs space-y-2.5 shadow-lg">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/30 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🗡️</span>
                            <span className="font-black text-rose-300 text-sm">{detail.name} (Địch)</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/50 text-[10px] text-rose-300 font-bold">
                              {detail.category}
                            </span>
                          </div>
                          <span className="text-[10px] text-rose-400/80 font-mono">Thông Số Đối Thủ</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                            <span className="text-[10px] font-bold text-rose-300 block mb-0.5">💥 SÁT THƯƠNG (DMG)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.dmg}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                            <span className="text-[10px] font-bold text-amber-300 block mb-0.5">🎯 TẦM ĐÁNH (RANGE)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.range}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                            <span className="text-[10px] font-bold text-sky-300 block mb-0.5">⚡ TỐC ĐỘ (ATK SPEED)</span>
                            <span className="text-white font-semibold text-[11px] leading-tight block">{detail.atkSpeed}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-[#240e1b] border border-purple-500/20 flex flex-col sm:flex-row gap-2">
                          <div className="flex-1">
                            <span className="text-[10px] font-bold text-purple-300 block mb-0.5">🛡️ NỘI TẠI ĐẶC QUYỀN</span>
                            <p className="text-slate-200 text-[11px] leading-relaxed">{detail.passive}</p>
                          </div>
                          <div className="flex-1 sm:border-l sm:border-purple-500/20 sm:pl-2">
                            <span className="text-[10px] font-bold text-emerald-300 block mb-0.5">📋 SKILL CÓ THỂ COPY</span>
                            <p className="text-emerald-200 text-[11px] font-medium leading-relaxed">{detail.copyableSkills}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </section>
              </div>

              {/* 2v2 Dedicated Member Selectors: Màu Xanh Lá (Bạn 2) & Màu Vàng (Địch 2) */}
              {is2v2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mục Màu Xanh Lá: Team Ball Xanh (Bạn 2) */}
                  <section className="bg-emerald-950/30 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-lg shadow-emerald-500/10">
                    <div className="flex items-center justify-between mb-3 border-b border-emerald-500/40 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 animate-pulse" />
                        <h2 className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          Mục Xanh Lá: BẠN 2 (Team Ball Xanh)
                        </h2>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold">
                        ĐỒNG MINH
                      </span>
                    </div>

                    {/* Choose Weapon for Player 2 */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-emerald-200 flex items-center gap-1">
                          <Swords className="w-3.5 h-3.5 text-emerald-400" />
                          Vũ Khí Bạn 2:
                        </span>
                        <span className="text-xs text-white font-bold">
                          {WEAPON_DEFS[player2Weapon]?.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {availableWeapons.map(key => {
                          const wep = WEAPON_DEFS[key];
                          const isSelected = player2Weapon === key;
                          return (
                            <button
                              key={`p2-${key}`}
                              onClick={() => setPlayer2Weapon(key)}
                              className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition text-center ${
                                isSelected
                                  ? 'bg-emerald-600 border-emerald-300 text-white font-black shadow-md ring-2 ring-emerald-400'
                                  : 'bg-[#0a1829] border-emerald-900/60 text-slate-200 hover:bg-emerald-900/40 hover:border-emerald-500'
                              }`}
                            >
                              <WeaponCanvasPreview weaponKey={key} isSelected={isSelected} />
                              <span className="text-[10px] font-bold truncate max-w-full">
                                {wep.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Choose Element for Player 2 */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-emerald-200 flex items-center gap-1 mb-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Hệ / Nguyên Tố Bạn 2:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                        {[
                          { key: '', label: 'Vô Hệ' },
                          { key: 'lightning_10', label: '⚡ Lôi X' },
                          { key: 'fire_10', label: '🔥 Hỏa X' },
                          { key: 'poison_10', label: '🧪 Độc X' },
                          { key: 'lightning_15', label: '⚡ Lôi XV' },
                          { key: 'glitch', label: '👾 Glitch' },
                        ].map(el => {
                          const isSelected = (player2Element || '') === el.key;
                          return (
                            <button
                              key={`p2-el-${el.key}`}
                              onClick={() => setPlayer2Element(el.key ? el.key : null)}
                              className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                                isSelected
                                  ? 'bg-emerald-500 border-emerald-300 text-black shadow font-black'
                                  : 'bg-[#0a1829] border-emerald-900/50 text-slate-300 hover:bg-emerald-900/50'
                              }`}
                            >
                              {el.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Choose Role for Player 2 */}
                    <div>
                      <span className="text-[11px] font-bold text-emerald-200 flex items-center gap-1 mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        Vai Trò (Role) Bạn 2:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                        {[
                          { key: 'bathuong', label: '🛡️ Bá Thường' },
                          { key: 'sotan', label: '👑 Sở Tân' },
                          { key: 'liubei', label: '🏮 Lưu Bị' },
                          { key: 'than_liubei', label: '👑 Thần Lưu Bị' },
                          { key: 'trieuvan', label: '🐉 Triệu Vân' },
                          { key: 'than_trieuvan', label: '🌟 Thần Triệu Vân' },
                          { key: 'the_owner_7b', label: '👑 The Owner 7 Tỉ' },
                          { key: 'the_owner', label: '💻 The Owner' },
                          { key: 'admin', label: '🔑 Admin' },
                          { key: null, label: '⭕ Tự Do' },
                        ].map(r => {
                          const isSelected = player2Role === r.key;
                          return (
                            <button
                              key={`p2-role-${r.key ?? 'none'}`}
                              onClick={() => setPlayer2Role(r.key as RoleType)}
                              className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                                isSelected
                                  ? 'bg-emerald-500 border-emerald-300 text-black shadow font-black ring-1 ring-emerald-300'
                                  : 'bg-[#0a1829] border-emerald-900/50 text-slate-300 hover:bg-emerald-900/50'
                              }`}
                            >
                              {r.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Mục Màu Vàng: Team Địch (Địch 2) */}
                  <section className="bg-amber-950/30 border-2 border-amber-500/80 rounded-2xl p-4 shadow-lg shadow-amber-500/10">
                    <div className="flex items-center justify-between mb-3 border-b border-amber-500/40 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-pulse" />
                        <h2 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                          Mục Vàng: ĐỊCH 2 (Team Địch Vàng)
                        </h2>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold">
                        ĐỐI THỦ
                      </span>
                    </div>

                    {/* Choose Weapon for Enemy 2 */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
                          <Swords className="w-3.5 h-3.5 text-amber-400" />
                          Vũ Khí Địch 2:
                        </span>
                        <span className="text-xs text-white font-bold">
                          {enemy2Weapon === 'random' ? 'Ngẫu nhiên' : WEAPON_DEFS[enemy2Weapon]?.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        <button
                          onClick={() => setEnemy2Weapon('random')}
                          className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center ${
                            enemy2Weapon === 'random'
                              ? 'bg-amber-600 border-amber-300 text-white font-black shadow-md ring-2 ring-amber-400'
                              : 'bg-[#1e1505] border-amber-900/60 text-slate-200 hover:bg-amber-900/40 hover:border-amber-500'
                          }`}
                        >
                          <span className="text-amber-400 font-bold text-xs py-2">??</span>
                          <span className="text-[10px] font-bold">Ngẫu nhiên</span>
                        </button>
                        {enemyAvailableWeapons.map(key => {
                          const wep = WEAPON_DEFS[key];
                          const isSelected = enemy2Weapon === key;
                          return (
                            <button
                              key={`e2-${key}`}
                              onClick={() => setEnemy2Weapon(key)}
                              className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition text-center ${
                                isSelected
                                  ? 'bg-amber-600 border-amber-300 text-white font-black shadow-md ring-2 ring-amber-400'
                                  : 'bg-[#1e1505] border-amber-900/60 text-slate-200 hover:bg-amber-900/40 hover:border-amber-500'
                              }`}
                            >
                              <WeaponCanvasPreview weaponKey={key} isSelected={isSelected} />
                              <span className="text-[10px] font-bold truncate max-w-full">
                                {wep.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Choose Element for Enemy 2 */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1 mb-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Hệ / Nguyên Tố Địch 2:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                        {[
                          { key: 'random', label: '🎲 Ngẫu nhiên' },
                          { key: '', label: 'Vô Hệ' },
                          { key: 'lightning_10', label: '⚡ Lôi X' },
                          { key: 'fire_10', label: '🔥 Hỏa X' },
                          { key: 'poison_10', label: '🧪 Độc X' },
                          { key: 'glitch', label: '👾 Glitch' },
                        ].map(el => {
                          const isSelected = (enemy2Element || '') === el.key;
                          return (
                            <button
                              key={`e2-el-${el.key}`}
                              onClick={() => setEnemy2Element(el.key)}
                              className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                                isSelected
                                  ? 'bg-amber-500 border-amber-300 text-black shadow font-black'
                                  : 'bg-[#1e1505] border-amber-900/50 text-slate-300 hover:bg-amber-900/50'
                              }`}
                            >
                              {el.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Choose Role for Enemy 2 */}
                    <div>
                      <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1 mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        Vai Trò (Role) Địch 2:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                        {[
                          { key: 'random', label: '🎲 Ngẫu nhiên' },
                          { key: 'bathuong', label: '🛡️ Bá Thường' },
                          { key: 'sotan', label: '👑 Sở Tân' },
                          { key: 'liubei', label: '🏮 Lưu Bị' },
                          { key: 'than_liubei', label: '👑 Thần Lưu Bị' },
                          { key: 'trieuvan', label: '🐉 Triệu Vân' },
                          { key: 'than_trieuvan', label: '🌟 Thần Triệu Vân' },
                          { key: 'the_owner_7b', label: '👑 The Owner 7 Tỉ' },
                          { key: 'the_owner', label: '💻 The Owner' },
                          { key: 'admin', label: '🔑 Admin' },
                          { key: null, label: '⭕ Tự Do' },
                        ].map(r => {
                          const isSelected = enemy2Role === r.key;
                          return (
                            <button
                              key={`e2-role-${r.key ?? 'none'}`}
                              onClick={() => setEnemy2Role(r.key as RoleType | 'random')}
                              className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                                isSelected
                                  ? 'bg-amber-500 border-amber-300 text-black shadow font-black ring-1 ring-amber-300'
                                  : 'bg-[#1e1505] border-amber-900/50 text-slate-300 hover:bg-amber-900/50'
                              }`}
                            >
                              {r.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* Elements & Inventory */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      4. Nguyên Tố & Túi Đồ
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="merge-btn"
                      onClick={handleMergeAll}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-1 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      Ghép (Merge)
                    </button>
                    <button
                      id="roll-btn"
                      onClick={handleRollElement}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1 transition shadow-md shadow-amber-600/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Roll (100 Xu)
                    </button>
                  </div>
                </div>

                {/* Inventory Grid */}
                <div className="min-h-[70px] p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  {Object.keys(inventory).filter(k => inventory[k] > 0).length === 0 ? (
                    <div className="text-center py-5 text-xs text-slate-400">
                      Chưa có nguyên tố nào trong túi. Nhấn <strong className="text-amber-400">Roll (100 Xu)</strong> hoặc mở Console Admin để nhận toàn bộ!
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {Object.keys(inventory)
                        .filter(k => inventory[k] > 0)
                        .sort()
                        .map(key => {
                          const isEquipped = equippedElement === key;
                          const isGlitch = key.startsWith('glitch');
                          return (
                            <button
                              key={key}
                              id={`el-item-${key}`}
                              onClick={() => setEquippedElement(isEquipped ? null : key)}
                              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                                isEquipped
                                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                                  : isGlitch
                                  ? 'bg-fuchsia-950/40 border-fuchsia-500 text-fuchsia-200 hover:bg-fuchsia-950/70'
                                  : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#0e1d42] hover:border-slate-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-white">{elLabel(key)}</span>
                                {isEquipped && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold">
                                    Dùng
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-300 mt-1 font-semibold">
                                Số lượng: x{inventory[key]}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>
              </section>

              {/* Roles */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    5. Chọn Vai Trò (Role của Bạn)
                  </h2>
                  <span className="text-xs text-cyan-300 font-bold">
                    {selectedRole ? selectedRole.toUpperCase() : 'Chưa chọn'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Survivalist */}
                  <button
                    id="role-survivalist-btn"
                    onClick={handleBuySurvivalist}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'survivalist'
                        ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#0e1d42] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">Survivalist</span>
                        {roleOwned ? (
                          <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-600/40">
                            Đã sở hữu
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40">
                            500 Xu
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed mt-1">
                        Tăng máu khởi đầu, máu càng thấp đánh càng mạnh (+100% dmg khi cạn máu).
                      </p>
                    </div>
                  </button>

                  {/* Admin */}
                  <button
                    id="role-admin-btn"
                    onClick={handleAdminAuthClick}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'admin'
                        ? 'bg-rose-950/70 border-rose-400 text-rose-100 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1a0f1d] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs flex items-center gap-1.5 text-white">
                          <Key className="w-3.5 h-3.5 text-rose-400" /> Admin
                        </span>
                        {adminUnlocked ? (
                          <span className="text-[10px] text-rose-300 font-bold px-1.5 py-0.5 rounded bg-rose-950 border border-rose-600/40">
                            Đã kích hoạt
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> 4 Tên Admin
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Tăng 77% dmg, giảm 22% nhận vào, 77.7% bạo kích, nhận toàn bộ Element XV & bảng lệnh <code className="text-rose-300 font-mono">/give</code>.
                      </p>
                    </div>
                  </button>

                  {/* Werewolf */}
                  <button
                    id="role-werewolf-btn"
                    onClick={handleBuyWerewolf}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'werewolf'
                        ? 'bg-amber-950/70 border-amber-400 text-amber-100 ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/20'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1e1708] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-white">Werewolf</span>
                        {werewolfOwned ? (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40">
                            Đã sở hữu
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40">
                            1500 Xu
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Chu kỳ Ngày/Đêm mỗi 10s. Ban đêm thức tỉnh x2.4 máu, tăng tốc và +50% sát thương!
                      </p>
                    </div>
                  </button>

                  {/* Sở Tân (New Secret Role v1.1.0) */}
                  <button
                    id="role-sotan-btn"
                    onClick={handleSotanAuthClick}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'sotan'
                        ? 'bg-amber-950/80 border-amber-400 text-amber-100 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#1f1906] hover:border-amber-500/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-amber-300 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sở Tân [NEW]
                        </span>
                        {sotanUnlocked ? (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/50">
                            Đã kích hoạt
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/50 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Mật khẩu Chủ Game
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        ✨ <strong>Tối Cao Áo Nghĩa</strong>: Nhất Điếu Khai Thiên Môn (1,500 DMG), Phi Thiên Vô Cực (100 DMG/tick), <strong>Sở Tân Điếu</strong> (150 nhát x 25 DMG), Toán Thiên Thấu Chi & Tứ Thánh Điếu Hồn (Shield 75% DMG)!
                      </p>
                    </div>
                  </button>

                  {/* Bá Thường (New Role) */}
                  <button
                    id="role-bathuong-btn"
                    onClick={handleBuyBaThuong}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'bathuong'
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/30'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#062419] hover:border-emerald-500/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-emerald-300 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" /> Bá Thường [NEW]
                        </span>
                        {bathuongOwned ? (
                          <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">
                            Đã sở hữu
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/50">
                            {BATHUONG_COST.toLocaleString()} Xu
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        6 Tuyệt Kỹ Thanh Long ngẫu nhiên (20s CD): Long Ngẩng Đầu (30 DMG + nứt), Du Long Bái Vĩ (20 đợt x 10 DMG), Ngọa Long Phiên Đăng (Khoan 2 DMG/0.4s + Bắn tên 10 DMG), Thần Long Na Di (3 lần nứt), Tiềm Long Vật Dụng (75 DMG), Long Nhân Hợp Nhất (x1.3 DMG, x1.5 Tốc độ, -0.01 HP/0.4s)!
                      </p>
                    </div>
                  </button>

                  {/* Lưu Bị (New Role) */}
                  <button
                    id="role-liubei-btn"
                    onClick={handleBuyLuuBei}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'liubei'
                        ? 'bg-sky-950/80 border-sky-400 text-sky-100 ring-2 ring-sky-400/50 shadow-lg shadow-sky-500/30'
                        : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#071e3d] hover:border-sky-500/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-sky-300 flex items-center gap-1">
                          <Swords className="w-3.5 h-3.5 text-sky-400" /> Lưu Bị [NEW]
                        </span>
                        {liubeiOwned ? (
                          <span className="text-[10px] text-sky-300 font-bold px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500/50">
                            Đã sở hữu
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/50">
                            {LIUBEI_COST.toLocaleString()} Xu
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Nội tại Đế Vương: Không Song Kiếm (+10% HP, +5% DMG), Có Song Kiếm (+15% HP, +15% DMG). Tuyệt Kỹ: Hán Thất Nghiêm Đông (Cự Hỏa Kiếm 100 DMG + Cháy, Cự Băng Kiếm 100 DMG + Đóng Băng 1.5s, Kết Liễu 250 DMG)!
                      </p>
                    </div>
                  </button>

                  {/* Thần Lưu Bị (Tiến hóa) */}
                  <button
                    id="role-than-liubei-btn"
                    onClick={handleSelectThanLuuBei}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                      selectedRole === 'than_liubei'
                        ? 'bg-amber-950/90 border-amber-400 text-amber-100 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30'
                        : 'bg-[#150d26] border-purple-900/60 text-slate-200 hover:bg-[#201538] hover:border-purple-500/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-purple-300 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-400" /> 👑 Thần-Lưu Bị [TIẾN HÓA]
                        </span>
                        {(thanLiubeiUnlocked || loadUnlock('role_than_liubei_unlocked') || loadLuuBeiWins() >= 20) ? (
                          <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">
                            ĐÃ MỞ KHÓA
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/50">
                            🔒 {loadLuuBeiWins()}/20 Trận Thắng
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Hán Chiêu Liệt Hoàng Đế: Thần Song Kiếm chém 5 nhát/s, chỉ số x1.3679, x1.4 Skill DMG! Tuyệt kỹ: Hán Thất Nghiêm Đông & <strong>Triều Đình Trợ Ta Khôi Phục (Hồi 30% Max HP)</strong>!
                      </p>
                    </div>
                  </button>

                  {/* Triệu Vân & Thần-Triệu Vân */}
                  <div className="flex flex-col gap-2">
                    <button
                      id="role-trieuvan-btn"
                      onClick={handleSelectTrieuVan}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                        selectedRole === 'trieuvan'
                          ? 'bg-blue-950/90 border-blue-400 text-blue-100 ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/30'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#071d3d] hover:border-blue-500/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs text-blue-300 flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5 text-blue-400" /> Triệu Vân (Thường Sơn)
                          </span>
                          <span className="text-[10px] text-blue-300 font-bold px-1.5 py-0.5 rounded bg-blue-950 border border-blue-500/50">
                            +10% HP & DMG
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          Hổ Tướng: +10% HP, +10% DMG. 🎯 Tiến hóa Thương Thần: Thắng 20 trận với Triệu Vân + Giáo (Tiến độ: <strong className="text-amber-300">{loadTrieuVanWins()}/20</strong>). Khi mang Thương Thần tự động tiến hóa thành THẦN-TRIỆU VÂN!
                        </p>
                      </div>
                    </button>

                    <button
                      id="role-than-trieuvan-btn"
                      onClick={handleSelectThanTrieuVan}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${
                        selectedRole === 'than_trieuvan'
                          ? 'bg-amber-950/90 border-amber-400 text-amber-100 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30'
                          : 'bg-[#1e1302] border-amber-900/60 text-slate-200 hover:bg-[#2e1c05] hover:border-amber-500/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs text-amber-300 flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-amber-400" /> 🌟 Thần-Triệu Vân [TIẾN HÓA]
                          </span>
                          {(thanTrieuvanUnlocked || loadUnlock('role_than_trieuvan_unlocked') || loadTrieuVanWins() >= 20) ? (
                            <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">
                              ĐÃ MỞ KHÓA
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/50">
                              🔒 {loadTrieuVanWins()}/20 Trận Thắng
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          Thần Tướng Tối Thượng: +30% HP, +50% DMG, +25% Liên Kích (đánh thêm 1 đòn), +25% Truy Kích (truy đuổi áp sát)! Tuyệt kỹ: <strong>Nhai Giác Lưu Tinh Trảm</strong> (Xoay thương 10 hit x 10 DMG -&gt; Cắm cự thương trời giáng 125 DMG -&gt; Nổ 25 DMG -&gt; Đâm bạo kích 275 DMG)!
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* The Owner Game & Secret Evolution (7 Tỉ % Sức Mạnh) */}
                  <div className="flex flex-col gap-2">
                    <button
                      id="role-the-owner-btn"
                      onClick={() => handleSelectTheOwner(1)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition relative overflow-hidden ${
                        selectedRole === 'the_owner_7b'
                          ? 'bg-gradient-to-br from-yellow-950/90 via-amber-900/70 to-purple-950/90 border-2 border-yellow-400 text-yellow-100 ring-2 ring-yellow-400/80 shadow-2xl shadow-yellow-500/40'
                          : selectedRole === 'the_owner'
                          ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/30'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-[#062618] hover:border-emerald-500/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`font-bold text-xs flex items-center gap-1.5 ${
                            theOwner7bUnlocked ? 'text-yellow-300 font-black' : 'text-emerald-300'
                          }`}>
                            <Crown className={`w-4 h-4 ${theOwner7bUnlocked ? 'text-yellow-400 animate-pulse' : 'text-emerald-400'}`} />
                            {theOwner7bUnlocked ? '👑 THE OWNER GAME (7 TỈ % SỨC MẠNH) [SECRET]' : '💻 The Owner Game'}
                          </span>
                          {theOwner7bUnlocked ? (
                            <span className="text-[10px] text-yellow-300 font-mono font-black px-2 py-0.5 rounded-full bg-yellow-950 border border-yellow-400 shadow-sm shadow-yellow-500/50">
                              ⭐ 7 TỈ % GOD MODE
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-300 font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">
                              {theOwnerClicks}/777 Clicks
                            </span>
                          )}
                        </div>

                        {theOwner7bUnlocked ? (
                          <div className="space-y-1">
                            <p className="text-[10px] text-yellow-100 font-medium leading-relaxed">
                              🔥 <strong>FULL BUFF THẦN THOẠI:</strong> HP cố định <strong>7.000.000.000 (7 Tỉ)</strong>, Kháng 100% sát thương (Bất tử tuyệt đối). Sát thương thiêu đốt <strong>0.2% HP Max / 0.01s</strong> (tan chảy máu mượt mà trong 5 giây). <strong>Tầm đánh Vô Hạn (Inf Range)</strong> & <strong>Tốc độ đánh Vô Hạn (Inf Atk Speed)</strong>!
                            </p>
                            <p className="text-[10px] text-emerald-300 font-bold">
                              💰 <strong>Đặc quyền Sandbox:</strong> Thiêu đốt 0.2% HP/0.01s rút cạn máu Bù nhìn Dummy bất tử, nhận ngay <strong>FREE +1.000.000 Xu</strong>!
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-[10px] text-slate-300 leading-relaxed mb-2">
                              Chúa Tể Trò Chơi: 14 thần khí bay lơ lửng xung quanh tự động bảo hộ và oanh tạc. Kỹ năng: Vạn Vũ Khí Quy Tông, Nuke Admin, God Mode, Hồi phục toàn phần!
                            </p>
                            {/* Spam progress bar */}
                            <div className="w-full bg-slate-900/80 rounded-full h-2 border border-slate-700 overflow-hidden mb-1">
                              <div
                                className="bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-400 h-full transition-all duration-150"
                                style={{ width: `${Math.min(100, (theOwnerClicks / 777) * 100)}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[9px] text-slate-400">
                              <span>🔒 Spam vào nút này 777 lần để mở khóa Role Secret 7 Tỉ %</span>
                              <span className="font-mono text-amber-300 font-bold">{Math.round((theOwnerClicks / 777) * 100)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Quick Spam / Mode Toggle Sub-bar */}
                    {!theOwner7bUnlocked ? (
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] text-slate-400">⚡ Spam nhanh:</span>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleSelectTheOwner(10);
                          }}
                          className="px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold transition"
                        >
                          +10 Clicks
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleSelectTheOwner(77);
                          }}
                          className="px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/40 text-[10px] font-bold transition"
                        >
                          +77 Clicks
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleSelectTheOwner(777);
                          }}
                          className="px-2 py-0.5 rounded bg-yellow-950/80 hover:bg-yellow-900 text-yellow-300 border border-yellow-500/50 text-[10px] font-black transition ml-auto"
                        >
                          👑 Mở Khóa Ngay (777)
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-1 text-[10px]">
                        <span className="text-slate-400 font-bold">Chế độ đã chọn:</span>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedRole('the_owner_7b');
                          }}
                          className={`px-2 py-0.5 rounded font-bold transition ${
                            selectedRole === 'the_owner_7b'
                              ? 'bg-yellow-400 text-black shadow font-black'
                              : 'bg-yellow-950/50 text-yellow-300 border border-yellow-500/40'
                          }`}
                        >
                          👑 7 Tỉ % (Bí Mật)
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedRole('the_owner');
                          }}
                          className={`px-2 py-0.5 rounded font-bold transition ${
                            selectedRole === 'the_owner'
                              ? 'bg-emerald-500 text-black shadow font-black'
                              : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          💻 Bản Thường
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Synergy Status Notice */}
                {((selectedRole === 'liubei' || selectedRole === 'than_liubei') && (player2Role === 'trieuvan' || player2Role === 'than_trieuvan')) ||
                 ((selectedRole === 'trieuvan' || selectedRole === 'than_trieuvan') && (player2Role === 'liubei' || player2Role === 'than_liubei')) ? (
                  <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-amber-950/80 via-yellow-900/50 to-amber-950/80 border-2 border-amber-400 shadow-lg shadow-amber-500/20 text-amber-200 text-xs">
                    <div className="font-extrabold flex items-center gap-1.5 text-amber-300 text-sm mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      🌟 KÍCH HOẠT BUFF SYNERGY: TUYỆT THẾ ANH HÙNG (Lưu Bị + Triệu Vân)!
                    </div>
                    <div className="text-[11px] text-slate-200 leading-relaxed">
                      Cả 2 chiến tướng cùng nhận: <strong>HP +40%</strong> • <strong>DMG +35%</strong> • <strong>Tốc độ +15%</strong> • <strong>Liên Kích +10%</strong> • <strong>Truy Kích +15%</strong>!
                      {(selectedRole === 'than_liubei' && player2Role === 'than_trieuvan') || (selectedRole === 'than_trieuvan' && player2Role === 'than_liubei') ? (
                        <div className="mt-1 text-emerald-300 font-bold">
                          ⚡ ĐẶC BIỆT [SONG THẦN GIÁNG THẾ]: Sức mạnh thăng hoa lên HP +50%, DMG +45%, Tốc +25%, Liên Kích +15%, Truy Kích +20%!
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {/* Chi Tiết Thông Số Toàn Diện Của Role Đang Chọn */}
                {selectedRole && ROLE_DETAILS[selectedRole] && (() => {
                  const roleDetail = ROLE_DETAILS[selectedRole];
                  return (
                    <div className="mt-3.5 p-3.5 bg-[#060c1d] border-2 border-indigo-500/60 rounded-xl text-xs space-y-2.5 shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/30 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">👑</span>
                          <span className="font-black text-indigo-300 text-sm">{roleDetail.name}</span>
                          <span className="text-slate-400 font-semibold text-xs">({roleDetail.title})</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/50 text-[10px] text-indigo-300 font-bold">
                            {roleDetail.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-400/80 font-mono">Bảng Thông Số Vai Trò</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2 rounded-lg bg-[#0d1633] border border-indigo-500/20">
                          <span className="text-[10px] font-bold text-rose-300 block mb-0.5">⚔️ SÁT THƯƠNG (DMG)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.dmg}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#0d1633] border border-indigo-500/20">
                          <span className="text-[10px] font-bold text-amber-300 block mb-0.5">🎯 TẦM ĐÁNH (RANGE)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.range}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#0d1633] border border-indigo-500/20">
                          <span className="text-[10px] font-bold text-sky-300 block mb-0.5">⚡ TỐC ĐỘ (ATK SPEED)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.atkSpeed}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0d1633] border border-cyan-500/20 flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-cyan-300 block mb-0.5">🛡️ NỘI TẠI ĐẶC QUYỀN</span>
                          <p className="text-slate-200 text-[11px] leading-relaxed">{roleDetail.passive}</p>
                        </div>
                        <div className="flex-1 sm:border-l sm:border-cyan-500/20 sm:pl-2">
                          <span className="text-[10px] font-bold text-emerald-300 block mb-0.5">📋 SKILL CÓ THỂ COPY</span>
                          <p className="text-emerald-200 text-[11px] font-medium leading-relaxed">{roleDetail.copyableSkills}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </section>

              {/* 6. Enemy Element & Role Customization (Update v1.1.0) */}
              <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-rose-400" />
                    6. Tùy Chọn Nguyên Tố & Role Của Địch (Update 1.1.0)
                  </h2>
                  <span className="text-[11px] text-slate-300 font-mono">
                    Địch: {enemyElementKey === 'random' ? 'Ngẫu nhiên' : elLabel(enemyElementKey)} • {enemyRole ? (enemyRole === 'random' ? 'Role Ngẫu nhiên' : enemyRole.toUpperCase()) : 'Không Role'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Enemy Element Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Chọn Nguyên Tố Của Địch (Test hiệu ứng cùng cấp):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-[160px] overflow-y-auto p-1.5 bg-slate-950/80 rounded-xl border border-slate-800">
                      <button
                        id="enemy-el-random"
                        onClick={() => setEnemyElementKey('random')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyElementKey === 'random'
                            ? 'bg-rose-950 border-rose-400 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Ngẫu nhiên
                      </button>
                      {/* Popular elements for testing: Lightning I to XV, Fire XV, etc. */}
                      {[
                        'lightning_1', 'lightning_2', 'lightning_3', 'lightning_5', 'lightning_10', 'lightning_15',
                        'fire_15', 'poison_15', 'shadow_15', 'plant_15', 'glitch_15'
                      ].map(elKey => (
                        <button
                          key={elKey}
                          id={`enemy-el-${elKey}`}
                          onClick={() => setEnemyElementKey(elKey)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition border text-center truncate ${
                            enemyElementKey === elKey
                              ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {elLabel(elKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enemy Role Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Chọn Vai Trò (Role) Của Địch:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800">
                      <button
                        id="enemy-role-random"
                        onClick={() => setEnemyRole('random')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'random'
                            ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Ngẫu nhiên
                      </button>
                      <button
                        id="enemy-role-none"
                        onClick={() => setEnemyRole(null)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === null
                            ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Không có
                      </button>
                      <button
                        id="enemy-role-survivalist"
                        onClick={() => setEnemyRole('survivalist')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'survivalist'
                            ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Survivalist
                      </button>
                      <button
                        id="enemy-role-admin"
                        onClick={() => setEnemyRole('admin')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'admin'
                            ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Admin
                      </button>
                      <button
                        id="enemy-role-werewolf"
                        onClick={() => setEnemyRole('werewolf')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'werewolf'
                            ? 'bg-rose-950 border-rose-400 text-rose-200 ring-1 ring-rose-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Werewolf
                      </button>
                      <button
                        id="enemy-role-sotan"
                        onClick={() => setEnemyRole('sotan')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'sotan'
                            ? 'bg-amber-950 border-amber-400 text-amber-200 ring-1 ring-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Sở Tân
                      </button>
                      <button
                        id="enemy-role-bathuong"
                        onClick={() => setEnemyRole('bathuong')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'bathuong'
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Bá Thường
                      </button>
                      <button
                        id="enemy-role-liubei"
                        onClick={() => setEnemyRole('liubei')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'liubei'
                            ? 'bg-sky-950 border-sky-400 text-sky-200 ring-1 ring-sky-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Lưu Bị
                      </button>
                      <button
                        id="enemy-role-than-liubei"
                        onClick={() => setEnemyRole('than_liubei')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'than_liubei'
                            ? 'bg-purple-950 border-purple-400 text-purple-200 ring-1 ring-purple-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Thần Lưu Bị
                      </button>
                      <button
                        id="enemy-role-trieuvan"
                        onClick={() => setEnemyRole('trieuvan')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'trieuvan'
                            ? 'bg-blue-950 border-blue-400 text-blue-200 ring-1 ring-blue-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Triệu Vân
                      </button>
                      <button
                        id="enemy-role-than-trieuvan"
                        onClick={() => setEnemyRole('than_trieuvan')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'than_trieuvan'
                            ? 'bg-amber-950 border-amber-400 text-amber-200 ring-1 ring-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        Thần Triệu Vân
                      </button>
                      <button
                        id="enemy-role-the-owner"
                        onClick={() => setEnemyRole('the_owner')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border text-center ${
                          enemyRole === 'the_owner'
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        The Owner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chi Tiết Thông Số Role Của Địch */}
                {enemyRole && enemyRole !== 'random' && ROLE_DETAILS[enemyRole] && (() => {
                  const roleDetail = ROLE_DETAILS[enemyRole];
                  return (
                    <div className="mt-3.5 p-3.5 bg-[#170a13] border-2 border-rose-500/60 rounded-xl text-xs space-y-2.5 shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/30 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">😈</span>
                          <span className="font-black text-rose-300 text-sm">{roleDetail.name} (Địch)</span>
                          <span className="text-slate-400 font-semibold text-xs">({roleDetail.title})</span>
                          <span className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/50 text-[10px] text-rose-300 font-bold">
                            {roleDetail.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-rose-400/80 font-mono">Thông Số Đối Thủ</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                          <span className="text-[10px] font-bold text-rose-300 block mb-0.5">⚔️ SÁT THƯƠNG (DMG)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.dmg}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                          <span className="text-[10px] font-bold text-amber-300 block mb-0.5">🎯 TẦM ĐÁNH (RANGE)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.range}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#240e1b] border border-rose-500/20">
                          <span className="text-[10px] font-bold text-sky-300 block mb-0.5">⚡ TỐC ĐỘ (ATK SPEED)</span>
                          <span className="text-white font-semibold text-[11px] leading-tight block">{roleDetail.atkSpeed}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#240e1b] border border-purple-500/20 flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-purple-300 block mb-0.5">🛡️ NỘI TẠI ĐẶC QUYỀN</span>
                          <p className="text-slate-200 text-[11px] leading-relaxed">{roleDetail.passive}</p>
                        </div>
                        <div className="flex-1 sm:border-l sm:border-purple-500/20 sm:pl-2">
                          <span className="text-[10px] font-bold text-emerald-300 block mb-0.5">📋 SKILL CÓ THỂ COPY</span>
                          <p className="text-emerald-200 text-[11px] font-medium leading-relaxed">{roleDetail.copyableSkills}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-2.5 p-2 bg-slate-950/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Cơ chế cộng hưởng Viền (Update 1.1.0):</strong> Nếu 1 người dùng Sấm sét hoặc có Role → <strong>Viền Xanh Lá</strong>. Nếu cả 2 người cùng trang bị Sấm sét cùng cấp hoặc cùng Role → <strong>Viền Đỏ rực sáng</strong>!
                  </span>
                </div>
              </section>

              {/* Sound & Audio Control Card (Web Audio Engine) */}
              <section className="bg-[#0b1430] border border-cyan-500/40 rounded-2xl p-4 shadow-md space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                        Âm Thanh & Nhạc Nền (Web Audio SFX / BGM)
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          {isMuted ? 'Đang Tắt Âm' : 'Đang Bật Âm'}
                        </span>
                      </h2>
                      <p className="text-[11px] text-slate-300">
                        Âm thanh tổng hợp tự động không lag: Tiếng va đập, tiếng chém kiếm, kỹ năng và nhạc nền BGM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="lobby-toggle-mute-btn"
                      onClick={handleToggleMute}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isMuted
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                      }`}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span>{isMuted ? 'Bật Âm Thanh' : 'Tắt Âm Thanh'}</span>
                    </button>
                    <button
                      id="lobby-open-sound-settings-btn"
                      onClick={() => setShowSoundModal(true)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Cài Đặt Chi Tiết</span>
                    </button>
                  </div>
                </div>

                {/* Quick Volume Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">Hiệu Ứng Đòn Đánh (SFX)</span>
                      <span className="font-mono text-cyan-400 font-bold">{Math.round(sfxVolume * 100)}%</span>
                    </div>
                    <input
                      id="lobby-sfx-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={sfxVolume}
                      onChange={(e) => handleSetSfxVolume(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200 flex items-center gap-1">
                        <Music className="w-3 h-3 text-cyan-400" /> Nhạc Nền Trận Đấu (BGM)
                      </span>
                      <span className="font-mono text-cyan-400 font-bold">{Math.round(bgmVolume * 100)}%</span>
                    </div>
                    <input
                      id="lobby-bgm-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={bgmVolume}
                      onChange={(e) => handleSetBgmVolume(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </section>

              {/* Stellar Remote Quest & Quick Challenge Card */}
              <section className="bg-gradient-to-r from-[#03152e] via-[#052147] to-[#0a1538] border-2 border-cyan-400/80 rounded-2xl p-4 sm:p-5 shadow-xl shadow-cyan-500/20 text-white">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/40 animate-pulse flex-shrink-0">
                      🛰️
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                          NHIỆM VỤ TỐI CAO: VŨ KHÍ VỆ TINH [STELLAR REMOTE]
                        </h2>
                        {stellarUnlocked ? (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/60 flex items-center gap-1 shadow">
                            <CheckCircle2 className="w-3 h-3" /> ĐÃ HOÀN THÀNH (1000/1000)
                          </span>
                        ) : (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/60 shadow">
                            TIẾN ĐỘ: {railgunMirrorWins}/1000 TRẬN THẮNG
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        🎯 <strong>Cách nhận:</strong> Đánh thắng <strong>1000 trận</strong> với vũ khí: <strong>Railgun không buff</strong> (phải là 2 khẩu Railgun chọi nhau, không nguyên tố, không role).
                      </p>
                    </div>
                  </div>

                  {stellarUnlocked || hasOwnerPrivilege ? (
                    <button
                      id="equip-stellar-remote-btn"
                      onClick={() => {
                        setStellarUnlocked(true);
                        saveUnlock('stellar_remote_unlocked');
                        setPlayerWeapon('stellar_remote');
                        alert('🛰️ Đã trang bị Stellar Remote! Vào trận click vào vệ tinh hoặc nút trên màn hình để mở Menu 4 Siêu Tuyệt Kỹ Vũ Trụ!');
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-black text-xs text-white shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Trang Bị Stellar Remote Ngay
                    </button>
                  ) : (
                    <button
                      id="quick-railgun-mirror-btn"
                      onClick={() => {
                        setPlayerWeapon('railgun');
                        setEnemyWeapon('railgun');
                        setEquippedElement(null);
                        setEnemyElementKey(null as any);
                        setSelectedRole(null as any);
                        setEnemyRole(null as any);
                        setIs2v2(false);
                        alert('⚡ [ĐÃ THIẾT LẬP NHANH]:\n• Người chơi: Railgun (Không nguyên tố, Không role)\n• Đối thủ: Railgun (Không buff)\nNhấn "BẮT ĐẦU TRẬN ĐẤU" để chiến đấu tích lũy 1000 trận thắng mở khóa Stellar Remote!');
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 font-black text-xs text-white shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 transition active:scale-95 border border-cyan-300/40"
                    >
                      <Zap className="w-4 h-4 text-cyan-200" />
                      ⚡ Cài Đặt Nhanh 2 Railgun Chọi Nhau
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700/80 mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{ width: `${Math.min(100, (railgunMirrorWins / 1000) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 Trận</span>
                  <span className="text-cyan-300 font-bold">{railgunMirrorWins} / 1000 Trận Thắng ({((railgunMirrorWins / 1000) * 100).toFixed(1)}%)</span>
                  <span>1000 Trận</span>
                </div>

                {/* The Owner Privilege Support Box */}
                {hasOwnerPrivilege && (
                  <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-amber-950/80 border border-amber-500/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>👑 ĐẶC QUYỀN THE OWNER: Hỗ trợ Owner mở khóa ngay lập tức (Miễn cày 1000 trận & Tăng x3 - x10 Sức Mạnh)!</span>
                    </div>
                    <button
                      id="owner-instant-unlock-stellar-btn"
                      onClick={() => {
                        setStellarUnlocked(true);
                        saveUnlock('stellar_remote_unlocked');
                        setPlayerWeapon('stellar_remote');
                        alert('👑 [ĐẶC QUYỀN THE OWNER]: Đã mở khóa & trang bị Stellar Remote ngay lập tức!\n• Kỹ năng vũ trụ SS-01, SS-03, SS-04, SS-05 được nhân x3 đến x10 Sức Mạnh Thần Thánh!');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-black text-[11px] shadow-md shadow-yellow-500/30 hover:brightness-110 active:scale-95"
                    >
                      Trang Bị Bằng Quyền Owner 👑
                    </button>
                  </div>
                )}
              </section>

              {/* Start Battle Button */}
              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <button
                  id="start-battle-btn"
                  onClick={startBattle}
                  className="w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 hover:from-cyan-500 hover:to-teal-500 font-bold text-sm text-white shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 transform active:scale-98 transition"
                >
                  <Play className="w-5 h-5 fill-white" />
                  BẮT ĐẦU TRẬN ĐẤU (START BATTLE)
                </button>
              </div>

              {/* Contributors & Honor Section (Vinh danh & Đồng tác giả ý tưởng) */}
              <section className="bg-gradient-to-r from-[#0c1840] via-[#09122e] to-[#0c1840] border border-cyan-500/30 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                        Bảng Vinh Danh Đồng Sáng Tạo & Đóng Góp Ý Tưởng
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                          Update v1.1.0
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Tôn vinh bạn đồng hành đã đóng góp nhiều ý tưởng tuyệt vời cho hệ thống kỹ năng, cơ chế cộng hưởng sấm sét và Tứ Thánh Điếu Hồn!
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono font-bold">
                      💡 Ý tưởng: Bạn & Co-Creator
                    </span>
                  </div>
                </div>
              </section>

              {/* Secret Management Panel (Only visible for Authorized Admins) */}
              {adminUnlocked && (
                <section className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      Khu Vực Quản Trị & Kho Vũ Khí Ẩn
                    </h2>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      Đặc quyền Admin đã kích hoạt
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Satna Unlock */}
                    <button
                      id="secret-satna-btn"
                      onClick={handleSecretSatna}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        satnaUnlocked
                          ? 'bg-purple-950/60 border-purple-400 text-purple-200 ring-1 ring-purple-500/40'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-purple-950/40 hover:border-purple-500'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                          <span>✦ Sát Na Vĩnh Hằng</span>
                        </div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          Cổ thuật 4 giai đoạn đại phát nổ
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        satnaUnlocked ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-200'
                      }`}>
                        {satnaUnlocked ? 'Đã mở' : 'Mở khóa'}
                      </span>
                    </button>

                    {/* Minigun Quiz */}
                    <button
                      id="quiz-btn"
                      onClick={handleMinigunQuiz}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        minigunUnlocked
                          ? 'bg-amber-950/60 border-amber-400 text-amber-200 ring-1 ring-amber-500/40'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-amber-950/40 hover:border-amber-500'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Mở Khóa Minigun</span>
                        </div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          Vũ khí xả 20-30 viên đạn & giật sét
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        minigunUnlocked ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-200'
                      }`}>
                        {minigunUnlocked ? 'Đã mở' : 'Mở khóa'}
                      </span>
                    </button>

                    {/* Mace & Weapon pack */}
                    <button
                      id="secret-mace-btn"
                      onClick={handleSecretUnlockMace}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        maceUnlocked
                          ? 'bg-blue-950/60 border-blue-400 text-blue-200 ring-1 ring-blue-500/40'
                          : 'bg-[#0a142e] border-slate-700 text-slate-200 hover:bg-blue-950/40 hover:border-blue-500'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-blue-300 flex items-center gap-1.5">
                          <span>✦ Bộ Vũ Khí Ẩn</span>
                        </div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          Chùy Bí Mật, Song Thủ, Sáng Thế, Đuốc
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        maceUnlocked ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
                      }`}>
                        {maceUnlocked ? 'Đã mở' : 'Mở khóa'}
                      </span>
                    </button>
                  </div>
                </section>
              )}
            </div>
          )
        ) : (
          /* Source Code Viewer Mode */
          <div className="bg-[#080f24] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  Toàn Bộ Mã Nguồn Vanilla TypeScript (Canvas 2D)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Đã khôi phục hoàn chỉnh, gỡ bỏ phụ thuộc Phaser, chuẩn TypeScript thuần chạy trực tiếp trên HTML5 Canvas.
                </p>
              </div>

              <button
                id="copy-ts-code-btn"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép mã TypeScript'}</span>
              </button>
            </div>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 max-h-[600px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
              <pre>
                <code>{fullVanillaCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Dedicated Admin Console Panel (Toggleable / Expanded) */}
        {adminUnlocked && showAdminConsole && (
          <section className="bg-[#080f24] border-2 border-rose-600/60 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
                <Terminal className="w-4 h-4" />
                <span>BẢNG ĐIỀU KHIỂN LỆNH ADMIN (/give console)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">
                  Cú pháp: <code className="text-amber-300 font-mono">/give &lt;tên&gt; &lt;số lượng&gt;</code> (mặc định là 1)
                </span>
                <button
                  onClick={() => setShowAdminConsole(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Logs Window */}
            <div className="h-36 sm:h-44 bg-slate-950 rounded-xl border border-slate-800 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed text-emerald-400 space-y-1">
              {adminLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('>') ? 'text-amber-300 font-bold' : log.includes('ERROR') ? 'text-red-400' : 'text-emerald-400'}>
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Command Input Box */}
            <div className="mt-3 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="admin-cmd-input"
                  type="text"
                  value={adminCmdInput}
                  onChange={e => setAdminCmdInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleExecuteAdminCmd();
                  }}
                  placeholder="Gõ lệnh, ví dụ: /give xu 50000 hoặc /give fire_15 10 hoặc /give satna"
                  className="w-full pl-3 pr-8 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-rose-500 transition"
                />
              </div>
              <button
                id="run-admin-cmd-btn"
                onClick={() => handleExecuteAdminCmd()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Thực Thi</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Small sub-component to render weapon preview icon onto mini canvas
function WeaponCanvasPreview({ weaponKey, isSelected }: { weaponKey: WeaponKey; isSelected: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 36, 36);
        drawWeaponIcon(ctx, weaponKey, 18, 18, 28);
      }
    }
  }, [weaponKey]);

  return (
    <canvas
      ref={canvasRef}
      width={36}
      height={36}
      className={`rounded-lg ${isSelected ? 'scale-110' : ''} transition-transform`}
    />
  );
}

const fullVanillaCode = `/**
 * ============================================================================
 * ĐẤU BÓNG CHIẾN ĐẤU (BALL BATTLE) - VANILLA TYPESCRIPT ENGINE (CANVAS 2D)
 * Đã khôi phục hoàn toàn từ Phaser sang TypeScript thuần & Canvas 2D
 * ============================================================================
 */

export type WeaponKey =
  | 'kiem' | 'riu' | 'khien' | 'cung' | 'no' | 'giao'
  | 'railgun' | 'mace' | 'songthu' | 'minigun' | 'sangthe' | 'satna' | 'torch';

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
  minigun: { key: 'minigun', name: 'Minigun', isMinigun: true, maxAmmo: 10000, normalRate: 20, normalDmg: 10, heatRate: 30, heatDmg: 15, heatThreshold: 250, reloadMs: 3000 },
  sangthe: { key: 'sangthe', name: 'Sáng Thế Chi Kiếm', isRangedMelee: true, range: 77, dmg: 777.7777, rate: 7.7 },
  satna: { key: 'satna', name: 'Sát Na Vĩnh Hằng', isRitual: true, cooldownMs: 20000 },
  torch: { key: 'torch', name: 'Đuốc', isRangedMelee: true, range: 15, dmg: 15, rate: 1.4, burnDuration: 5000, burnTickMs: 200, burnDmgPerTick: 1 }
};

export const ADMIN_PASSWORD = '363636366767676769696969';

export function dealDamage(attacker: WeaponDef, defender: WeaponDef | null, baseDmg: number): number {
  let dmg = baseDmg;
  if (defender && defender.blockReduction) {
    let reduction = defender.blockReduction;
    if (attacker.shieldPierce) reduction *= (1 - attacker.shieldPierce);
    dmg *= (1 - reduction);
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

// Xem thêm chi tiết engine vật lý, rendering Canvas 2D, và vòng lặp requestAnimationFrame trong thư mục /src/game/
`;
