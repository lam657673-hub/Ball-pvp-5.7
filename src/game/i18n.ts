export type SupportedLanguage = 'vi' | 'en' | 'ru';

export interface TranslationDict {
  appTitle: string;
  appSubtitle: string;
  selectLanguage: string;
  chooseLanguageTitle: string;
  chooseLanguageDesc: string;
  langVi: string;
  langEn: string;
  langRu: string; // "Tiếng Nga gốc"
  currentLanguage: string;

  // Header buttons
  guideBtn: string;
  shopBtn: string;
  soundBtn: string;
  sandboxBtn: string;
  twoVsTwoBtn: string;
  adminBtn: string;
  rematchBtn: string;
  backToSetupBtn: string;

  // Battle Results & Summary
  victory: string;
  defeat: string;
  draw: string;
  matchSummaryTitle: string;
  matchSummarySubtitle: string;
  statTotalDmg: string;
  statSkillsUsed: string;
  statAccuracy: string;
  statDuration: string;
  statResult: string;
  playerSide: string;
  enemySide: string;
  closeBtn: string;
  playAgainBtn: string;

  // Railgun
  upgradedRailgunTitle: string;
  upgradedRailgunDesc: string;
  ultraLaserSkill: string;
  ultraLaserReady: string;
  ultraLaserCharging: string;
  ultraLaserCast: string;

  // Config section
  setupTitleHp: string;
  setupTitleMap: string;
  setupTitleWeapon: string;
  setupTitleRole: string;
  setupTitleElement: string;
  startBattleBtn: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  vi: {
    appTitle: 'ĐẤU TRƯỜNG BÓNG CHIẾN 2026',
    appSubtitle: 'Chiến trường đối kháng vũ khí, nguyên tố & vai trò tối thượng',
    selectLanguage: 'Chọn Ngôn Ngữ',
    chooseLanguageTitle: 'CHỌN NGÔN NGỮ GAME',
    chooseLanguageDesc: 'Vui lòng chọn ngôn ngữ hiển thị bạn muốn trải nghiệm:',
    langVi: 'Tiếng Việt',
    langEn: 'English',
    langRu: 'Tiếng Nga gốc',
    currentLanguage: 'Ngôn ngữ',

    guideBtn: 'Hướng Dẫn & Tra Cứu',
    shopBtn: 'Cửa Hàng Vũ Khí',
    soundBtn: 'Âm Thanh & Nhạc',
    sandboxBtn: 'Chế Độ Luyện Tập',
    twoVsTwoBtn: 'Đấu Đội 2v2',
    adminBtn: 'Lệnh Quản Trị Admin',
    rematchBtn: 'Tái Đấu Ngay',
    backToSetupBtn: 'Về Cấu Hình',

    victory: '🏆 CHIẾN THẮNG QUANG VINH!',
    defeat: '💀 THẤT BẠI! HÃY THỬ LẠI',
    draw: '⚖️ TRẬN ĐẤU BẤT PHÂN THẮNG BẠI!',
    matchSummaryTitle: '📊 BẢNG TỔNG KẾT THỐNG KÊ CHIẾN TRẬN',
    matchSummarySubtitle: 'Chi tiết thông số sát thương, kỹ năng và tỉ lệ trúng đòn',
    statTotalDmg: 'Tổng Sát Thương Gây Ra',
    statSkillsUsed: 'Số Lần Dùng Kỹ Năng',
    statAccuracy: 'Tỉ Lệ Trúng Đòn (Accuracy)',
    statDuration: 'Thời Gian Giao Tranh',
    statResult: 'Kết Quả Trận Đấu',
    playerSide: 'Bạn (Player)',
    enemySide: 'Đối Thủ (Enemy)',
    closeBtn: 'Đóng',
    playAgainBtn: 'Chơi Lại Trận Mới',

    upgradedRailgunTitle: 'Railgun Nâng Cấp',
    upgradedRailgunDesc: 'DMG x5, nạp 3s, tia laser to hơn, áp chế Railgun thường & Tuyệt kỹ Ultra Laser 1.000 DMG!',
    ultraLaserSkill: 'Tuyệt Kỹ Ultra Laser',
    ultraLaserReady: 'SẴN SÀNG (Phím 1)',
    ultraLaserCharging: 'ĐANG TÍCH ĐÒN...',
    ultraLaserCast: 'PHÓNG ULTRA LASER (1000 DMG)',

    setupTitleHp: '1. Chọn Lượng Máu (HP Khởi Đầu)',
    setupTitleMap: '2. Chọn Bản Đồ Thi Đấu',
    setupTitleWeapon: '3. Chọn Vũ Khí Bạn & Địch',
    setupTitleRole: '4. Chọn Vai Trò (Role)',
    setupTitleElement: '5. Chọn Ngọc Nguyên Tố',
    startBattleBtn: 'BẮT ĐẦU VÀO TRẬN CHIẾN'
  },
  en: {
    appTitle: 'BALL QUEST ARENA 2026',
    appSubtitle: 'Ultimate weapon, element & role clash arena',
    selectLanguage: 'Select Language',
    chooseLanguageTitle: 'CHOOSE GAME LANGUAGE',
    chooseLanguageDesc: 'Please choose your preferred display language:',
    langVi: 'Tiếng Việt',
    langEn: 'English',
    langRu: 'Tiếng Nga gốc',
    currentLanguage: 'Language',

    guideBtn: 'Guide & Encyclopedia',
    shopBtn: 'Weapon Shop',
    soundBtn: 'Audio & Music',
    sandboxBtn: 'Sandbox Training',
    twoVsTwoBtn: '2v2 Team Battle',
    adminBtn: 'Admin Console',
    rematchBtn: 'Rematch',
    backToSetupBtn: 'Back to Setup',

    victory: '🏆 GLORIOUS VICTORY!',
    defeat: '💀 DEFEAT! TRY AGAIN',
    draw: '⚖️ DRAW! EQUAL MATCH',
    matchSummaryTitle: '📊 BATTLE PERFORMANCE SUMMARY',
    matchSummarySubtitle: 'Detailed statistics: Damage dealt, skill casts, and hit accuracy',
    statTotalDmg: 'Total Damage Dealt',
    statSkillsUsed: 'Skills Used',
    statAccuracy: 'Hit Accuracy',
    statDuration: 'Combat Duration',
    statResult: 'Match Result',
    playerSide: 'You (Player)',
    enemySide: 'Opponent (Enemy)',
    closeBtn: 'Close',
    playAgainBtn: 'Play Again',

    upgradedRailgunTitle: 'Upgraded Railgun',
    upgradedRailgunDesc: 'DMG x5, 3s reload, colossal laser beam, railgun duel advantage & Ultra Laser 1,000 DMG skill!',
    ultraLaserSkill: 'Ultra Laser Skill',
    ultraLaserReady: 'READY (Key 1)',
    ultraLaserCharging: 'CHARGING...',
    ultraLaserCast: 'FIRE ULTRA LASER (1000 DMG)',

    setupTitleHp: '1. Choose Starting Health (HP)',
    setupTitleMap: '2. Select Battle Arena',
    setupTitleWeapon: '3. Choose Weapons (Player & Enemy)',
    setupTitleRole: '4. Choose Character Role',
    setupTitleElement: '5. Equip Element Rune',
    startBattleBtn: 'START BATTLE'
  },
  ru: {
    appTitle: 'АРЕНА ШАРОВ-ВОИНОВ 2026',
    appSubtitle: 'Битва оружия, стихий и легендарных ролей',
    selectLanguage: 'Выбрать язык',
    chooseLanguageTitle: 'ВЫБЕРИТЕ ЯЗЫК ИГРЫ',
    chooseLanguageDesc: 'Пожалуйста, выберите язык отображения интерфейса:',
    langVi: 'Tiếng Việt',
    langEn: 'English',
    langRu: 'Tiếng Nga gốc',
    currentLanguage: 'Язык',

    guideBtn: 'Руководство и база знаний',
    shopBtn: 'Магазин оружия',
    soundBtn: 'Звук и музыка',
    sandboxBtn: 'Режим песочницы',
    twoVsTwoBtn: 'Командный бой 2 на 2',
    adminBtn: 'Панель администратора',
    rematchBtn: 'Реванш',
    backToSetupBtn: 'К настройкам',

    victory: '🏆 СЛАВНАЯ ПОБЕДА!',
    defeat: '💀 ПОРАЖЕНИЕ! ПОПРОБУЙТЕ СНОВА',
    draw: '⚖️ НИЧЬЯ! РАВНЫЕ СИЛЫ',
    matchSummaryTitle: '📊 СВОДКА И СТАТИСТИКА БОЯ',
    matchSummarySubtitle: 'Подробный урон, количество примененных умений и точность попадания',
    statTotalDmg: 'Всего нанесено урона',
    statSkillsUsed: 'Использовано навыков',
    statAccuracy: 'Точность попаданий',
    statDuration: 'Длительность боя',
    statResult: 'Итог битвы',
    playerSide: 'Вы (Игрок)',
    enemySide: 'Противник',
    closeBtn: 'Закрыть',
    playAgainBtn: 'Сыграть снова',

    upgradedRailgunTitle: 'Улучшенный Рейлган (Upgraded Railgun)',
    upgradedRailgunDesc: 'Урон х5, перезарядка 3с, гигантский лазерный луч, перевес в дуэли рейлганов и навык Ультра Лазер на 1000 урона!',
    ultraLaserSkill: 'Навык Ультра Лазер',
    ultraLaserReady: 'ГОТОВО (Кл. 1)',
    ultraLaserCharging: 'ЗАРЯДКА...',
    ultraLaserCast: 'ЗАПУСТИТЬ УЛЬТРА ЛАЗЕР (1000 УРОНА)',

    setupTitleHp: '1. Выбор здоровья (HP)',
    setupTitleMap: '2. Выбор арены боя',
    setupTitleWeapon: '3. Выбор оружия (Игрок и Противник)',
    setupTitleRole: '4. Выбор роли',
    setupTitleElement: '5. Экипировка руны стихии',
    startBattleBtn: 'НАЧАТЬ СРАЖЕНИЕ'
  }
};

export function getSavedLanguage(): SupportedLanguage {
  try {
    const saved = localStorage.getItem('game_language');
    if (saved === 'en' || saved === 'ru' || saved === 'vi') {
      return saved;
    }
  } catch {}
  return 'vi';
}

export function saveLanguage(lang: SupportedLanguage): void {
  try {
    localStorage.setItem('game_language', lang);
  } catch {}
}
