// Chi tiết thông số toàn diện của toàn bộ Vũ Khí & Vai Trò (Role)
// Cụ thể: DMG, Tầm đánh, Atk Speed, Nội tại, Skill có thể copy

export interface WeaponDetailItem {
  key: string;
  name: string;
  icon?: string;
  category: 'Cơ bản' | 'Tầm xa' | 'Đặc biệt' | 'Bí mật' | 'The Owner';
  dmg: string;
  range: string;
  atkSpeed: string;
  passive: string;
  copyableSkills: string;
}

export interface RoleDetailItem {
  key: string;
  name: string;
  title: string;
  dmg: string;
  range: string;
  atkSpeed: string;
  passive: string;
  copyableSkills: string;
  category: 'Miễn phí' | 'Mở khóa Shop' | 'Admin & Bí mật' | 'The Owner';
}

export const WEAPON_DETAILS: Record<string, WeaponDetailItem> = {
  kiem: {
    key: 'kiem',
    name: 'Kiếm',
    category: 'Cơ bản',
    dmg: '10 DMG (Cơ bản)',
    range: '50px (Cận chiến tiêu chuẩn)',
    atkSpeed: 'Nhanh (700ms / đòn)',
    passive: 'Combo Chém: 25% kích hoạt nhịp chém bồi liên tiếp; phản hồi va chạm ổn định.',
    copyableSkills: 'Kiếm Khí Cận Chiến, Nhịp Chém Combo Bồi'
  },
  riu: {
    key: 'riu',
    name: 'Rìu',
    category: 'Cơ bản',
    dmg: '25 DMG (Sát thương nặng)',
    range: '45px (Cận chiến ngắn)',
    atkSpeed: 'Trung bình (900ms / đòn)',
    passive: 'Xuyên Khiên 40%: Bỏ qua 40% phòng thủ / giảm sát thương từ khiên đối thủ.',
    copyableSkills: 'Bổ Rìu Xuyên Giáp, Đập Vỡ Thế Thủ'
  },
  khien: {
    key: 'khien',
    name: 'Khiên',
    category: 'Cơ bản',
    dmg: '5 DMG (Đập phản chấn)',
    range: '40px (Cận chiến hộ thân)',
    atkSpeed: 'Nhanh (700ms / đòn)',
    passive: 'Hộ Vệ Tuyệt Đối: Giảm 70% sát thương nhận vào; phản hồi lực va đập cực mạnh.',
    copyableSkills: 'Khiên Phản Đòn, Hộ Thân Tuyệt Đối'
  },
  cung: {
    key: 'cung',
    name: 'Cung',
    category: 'Tầm xa',
    dmg: '10 DMG (Mũi tên bay thẳng)',
    range: '400px (Tầm xa xuyên sàn)',
    atkSpeed: 'Nhanh (700ms / mũi tên)',
    passive: 'Bắn Tỉa An Toàn: Mũi tên tốc độ cao bay thẳng tầm xa, giữ cự ly an toàn.',
    copyableSkills: 'Tên Xuyên Phá, Mưa Tên Truy Kích'
  },
  no: {
    key: 'no',
    name: 'Nỏ',
    category: 'Tầm xa',
    dmg: '40 DMG (Bạo kích siêu nặng)',
    range: '550px (Siêu tầm xa toàn sàn)',
    atkSpeed: 'Chậm (1800ms / phát bắn)',
    passive: 'Công Phá Đơn Điểm: Sát thương đơn mục tiêu cực khủng, đường đạn thẳng tắp.',
    copyableSkills: 'Mũi Tên Công Phá, Bắn Tỉa Bạo Liệt'
  },
  giao: {
    key: 'giao',
    name: 'Giáo',
    category: 'Cơ bản',
    dmg: '20 DMG (60 DMG khi Ultra Dash x3)',
    range: '130px (Cận chiến dài)',
    atkSpeed: 'Theo nhịp lướt đâm',
    passive: 'Ultra Dash: Tích tốc độ lao thẳng xiên táo đối thủ gây x3 DMG đột phá.',
    copyableSkills: 'Đột Kích Ultra Dash, Giáo Thần Xiên Tâm'
  },
  railgun: {
    key: 'railgun',
    name: 'Railgun',
    category: 'Tầm xa',
    dmg: '5 DMG / 0.1s trong 5 giây (Tổng 250 DMG)',
    range: 'Toàn sàn đấu (Laser vô cực)',
    atkSpeed: 'Sạc 5s, bắn quét chùm tia 5s',
    passive: 'Chùm Tia Plasma: Bắn chùm tia năng lượng hạt nung chảy đối thủ liên tục và đẩy lùi.',
    copyableSkills: 'Chùm Laser Hạt Phân Tử, Quét Khóa Mục Tiêu'
  },
  upgraded_railgun: {
    key: 'upgraded_railgun',
    name: 'Railgun Nâng Cấp',
    category: 'Đặc biệt',
    dmg: '25 DMG / 0.1s trong 5 giây (Tổng 1.250 DMG - x5 so với Railgun thường) + 1.000 DMG Tuyệt kỹ Ultra Laser',
    range: 'Toàn sàn đấu (Tia laser khổng lồ bao phủ)',
    atkSpeed: 'Nạp siêu tốc 3s (Nhanh hơn 40%), bắn quét 5s',
    passive: 'Siêu Chùm Tia Plasma & Khắc Chế Railgun: Tia laser to gấp đôi, giảm 50% DMG từ Railgun thường; khi đối đầu đè bẹp quả cầu năng lượng về phía đối thủ.',
    copyableSkills: 'Tuyệt Kỹ Ultra Laser (1000 DMG), Siêu Tia Laser Nâng Cấp'
  },
  mace: {
    key: 'mace',
    name: 'Chùy Bí Mật',
    category: 'Bí mật',
    dmg: '25 DMG + (Tốc độ bóng x 0.2)',
    range: '60px (Cận chiến nặng)',
    atkSpeed: 'Theo nhịp quán tính va chạm',
    passive: 'Quán Tính Phá Hoại: Càng chạy nhanh va chạm càng đau; hất văng đập tường cực đại.',
    copyableSkills: 'Vung Chùy Quán Tính, Đập Văng Va Tường'
  },
  songthu: {
    key: 'songthu',
    name: 'Song Thủ',
    category: 'Bí mật',
    dmg: 'Kép (2 vũ khí cùng lúc)',
    range: 'Linh hoạt tùy 2 vũ khí kết hợp',
    atkSpeed: 'Gấp đôi tần suất đánh',
    passive: 'Song Thủ Hợp Bích: Cầm đồng thời 2 vũ khí khác nhau, kích hoạt đồng thời 2 hiệu ứng.',
    copyableSkills: 'Song Thủ Hợp Bích, Song Đao Hợp Nhất'
  },
  minigun: {
    key: 'minigun',
    name: 'Minigun',
    category: 'Bí mật',
    dmg: '10 DMG thường / 15 DMG Quá Nhiệt',
    range: '450px (Tầm xa liên thanh)',
    atkSpeed: 'Cực cao (20 - 30 viên/giây)',
    passive: 'Quá Nhiệt (Heat Mode): Sau 250 viên đạn, tăng 50% DMG và tốc độ xả đạn thần tốc.',
    copyableSkills: 'Bão Đạn Quá Nhiệt, Xả Súng Liên Thanh'
  },
  sangthe: {
    key: 'sangthe',
    name: 'Sáng Thế Chi Kiếm',
    category: 'The Owner',
    dmg: '777.7777 DMG (Thần Thoại NNTL)',
    range: '77px (Hào quang thánh kiếm)',
    atkSpeed: '7.7 đòn / giây (Thần Tốc)',
    passive: 'Sáng Thế Vũ Trụ: Chém tan mọi lớp giáp bảo vệ, hào quang thần thánh rực sáng.',
    copyableSkills: 'Sáng Thế Chi Kiếm Trảm, Phá Vỡ Thực Tại'
  },
  satna: {
    key: 'satna',
    name: 'Sát Na Vĩnh Hằng',
    category: 'Bí mật',
    dmg: 'Nghi thức định mệnh (Rút sinh mệnh)',
    range: 'Toàn kết giới',
    atkSpeed: '20.000ms (20s / nghi thức)',
    passive: 'Thời Gian Ngưng Đọng: Đưa không gian vào khoảng lặng trừng phạt không thể trốn thoát.',
    copyableSkills: 'Kết Giới Sát Na Vĩnh Hằng, Ngưng Đọng Thời Gian'
  },
  torch: {
    key: 'torch',
    name: 'Đuốc',
    category: 'Bí mật',
    dmg: '15 DMG trực tiếp + Thiêu đốt 1 DMG/0.2s trong 5s',
    range: '15px (Vùng lửa thiêu)',
    atkSpeed: '1.4 đòn / giây',
    passive: 'Hỏa Diễm Vĩnh Cửu: Thiêu đốt liên tục không thể hóa giải, duy trì sát thương kéo dài.',
    copyableSkills: 'Hỏa Thiêu Vĩnh Hằng, Hỏa Diễm Địa Ngục'
  },
  cancau: {
    key: 'cancau',
    name: 'Cần Câu',
    category: 'Đặc biệt',
    dmg: '18 DMG + Choáng 0.5s',
    range: '350px (Tầm trung quăng dây)',
    atkSpeed: '1.2 đòn / giây',
    passive: 'Móc Câu Cưỡng Chế: Móc dính bóng đối thủ và giật mạnh về phía mình, phá vỡ cự ly.',
    copyableSkills: 'Quăng Mồi Kéo Giật, Móc Câu Hãm Tốc'
  },
  songkiem: {
    key: 'songkiem',
    name: 'Song Kiếm',
    category: 'Đặc biệt',
    dmg: '22 DMG (11 x 2 nhịp trảm)',
    range: '55px (Cận chiến linh hoạt)',
    atkSpeed: 'Rất nhanh (400ms / đòn)',
    passive: 'Vũ Điệu Song Kiếm: Tăng 15% tốc độ di chuyển khi chém, biến hóa linh hoạt.',
    copyableSkills: 'Song Hoa Kiếm Vũ, Lướt Chém Song Đao'
  },
  tamkiem: {
    key: 'tamkiem',
    name: 'Tam Kiếm',
    category: 'Đặc biệt',
    dmg: '45 DMG (15 x 3 nhịp chém)',
    range: '70px (Tam Đao Lưu)',
    atkSpeed: 'Nhanh (550ms / đòn)',
    passive: 'Tam Thiên Thế Giới: Lốc xoáy chém xoay tròn, xuyên 35% phòng ngự.',
    copyableSkills: 'Tam Thiên Thế Giới, Lốc Kiếm Xoay'
  },
  computer: {
    key: 'computer',
    name: 'Máy Tính Hacker',
    category: 'The Owner',
    dmg: '120 DMG + Biến hóa ngẫu nhiên',
    range: 'Toàn năng (Biến đổi theo vũ khí ảo)',
    atkSpeed: 'Thích ứng tức thời',
    passive: 'Hacker Morph: Tự do chuyển hóa thành mọi vũ khí trong game + cộng thêm 40 DMG & giật sét.',
    copyableSkills: 'Mã Nguồn Biến Hóa, Hack Hệ Thống Vũ Khí'
  },
  daynit: {
    key: 'daynit',
    name: 'Dây Nịt Tử Thần',
    category: 'The Owner',
    dmg: '5% Max HP mỗi giây trong 10s (Tổng 50% HP mục tiêu)',
    range: '180px (Roi quất tử thần)',
    atkSpeed: 'Quất roi liên hoàn',
    passive: 'Trói Buộc Tàn Nhẫn: Rút máu theo % HP tối đa, bỏ qua toàn bộ giáp và trạng thái bất tử.',
    copyableSkills: 'Roi Trói Tử Thần, Rút Cạn Máu Theo %'
  },
  stellar_remote: {
    key: 'stellar_remote',
    name: 'Stellar Remote',
    category: 'The Owner',
    dmg: 'Hệ Số Nhân Mul DMG: Tỉ lệ chuẩn 1/10 so với vũ khí thường (100k HP = x1.5) x Role x Buff. Kỹ năng: 100.000.000+ DMG cực hạn vũ trụ (SS-Final Big Bang), 55.000.000+ DMG cực đại (The Sun), 35.000.000+ DMG (Halley), 25.000.000+ DMG & 1.000.000+ DoT (Gungir), 1.500.000+ x7 + 20.000.000+ DMG (Seven Star), 2.000.000+ x5 + 25.000.000+ DMG (Tesseract), 1.000.000+ DMG/0.1s (Railgun), 1.000.000+/0.2s & 50.000.000+ DMG (Quasar), 38.000.000+ DMG (Event Horizon), 45.000.000+ DMG & Radiation DoT (Neutron Star)!',
    range: 'Toàn vũ trụ (Khóa tọa độ vệ tinh quỹ đạo)',
    atkSpeed: 'Phát xung điện từ 800ms khi va chạm + Menu Vệ Tinh (Phím M hoặc 1 - 9, 0)',
    passive: 'Bệ Phóng Quỹ Đạo: Tự động scale HP x DMG cho Stellar Remote ở tỉ lệ tối ưu (100k HP = x1.5). Sở hữu 10 siêu tuyệt kỹ vũ trụ tối thượng.',
    copyableSkills: 'SS-01 Railgun, SS-02 The Sun, SS-03 Gungnir, SS-04 Seven Star, SS-05 Tesseract, SS-06 Halley, SS-021 Quasar, SS-07 Event Horizon, SS-08 Neutron Star, SS-Final Big Bang'
  }
};

export const ROLE_DETAILS: Record<string, RoleDetailItem> = {
  survivalist: {
    key: 'survivalist',
    name: 'Survivalist',
    title: 'Kẻ Sinh Tồn Ngoan Cường',
    category: 'Mở khóa Shop',
    dmg: 'Tăng từ +0% lên đến +100% DMG khi máu tụt xuống mức nguy kịch',
    range: 'Theo vũ khí trang bị',
    atkSpeed: '+10% tốc độ xuất chiêu khi dưới 30% HP',
    passive: 'Sinh Lực Ngoan Cường: Khởi đầu nhận thêm +50% Máu tối đa (Max HP). Máu càng thấp lực chiến càng bùng nổ.',
    copyableSkills: '[Bất Khuất] - Nhân đôi sức mạnh và phản đòn khi cận kề cái chết'
  },
  admin: {
    key: 'admin',
    name: 'Admin',
    title: 'Quản Trị Viên Game',
    category: 'Admin & Bí mật',
    dmg: '+77% Sát thương tổng thể, +77.7% Tỉ lệ Bạo Kích (Crit)',
    range: '+30% Tầm với mọi vũ khí',
    atkSpeed: '+35% Tốc độ đánh',
    passive: 'Quyền Lực Admin: Giảm 22% sát thương nhận vào, tự động mở khóa toàn bộ Element cấp XV & quyền hạn console.',
    copyableSkills: '[Lệnh Admin / Strike Nuke] - Triệu hồi thiên phạt sét thần & thanh trừng đối thủ'
  },
  werewolf: {
    key: 'werewolf',
    name: 'Werewolf',
    title: 'Người Sói Huyết Tộc',
    category: 'Mở khóa Shop',
    dmg: '+40% Sát thương khi ở dạng sói',
    range: '45px (Vuốt cào xé)',
    atkSpeed: '+50% Tốc độ cào liên hoàn',
    passive: 'Huyết Nguyệt Biến Hình: Hút máu 25% sát thương gây ra, tăng 35% tốc độ di chuyển, gầm làm chậm địch 40%.',
    copyableSkills: '[Huyết Trảo Hút Máu] - Cào xé hút máu hồi phục sinh mệnh'
  },
  sotan: {
    key: 'sotan',
    name: 'Sở Tân',
    title: 'Thích Khách Bóng Đêm',
    category: 'Admin & Bí mật',
    dmg: 'Bạo kích x2.5 Sát thương khi tấn công từ sau lưng (Backstab)',
    range: 'Lướt bóng xuyên cự ly',
    atkSpeed: 'Ám sát chớp nhoáng',
    passive: 'Ám Thích Vô Ảnh: Lướt bóng tàng hình ra sau lưng địch, miễn nhiễm sát thương khi lướt, đòn đánh đầu phá 100% giáp.',
    copyableSkills: '[Bóng Ma Trảm Kích] - Lướt xuyên hư không và trảm kích ám sát'
  },
  bathuong: {
    key: 'bathuong',
    name: 'Bá Thương',
    title: 'Long Thương Bá Vương',
    category: 'Mở khóa Shop',
    dmg: '45 - 90 DMG mỗi thế rồng liên chiêu',
    range: '150px (Trường thương rồng)',
    atkSpeed: 'Uyển chuyển liên chiêu',
    passive: 'Lục Long Thương Pháp: Sở hữu chuỗi 6 kỹ năng rồng thần uy chấn thiên hạ.',
    copyableSkills: 'Long Ngẩng Đầu, Du Long Bãi Vĩ, Ngọa Long Phiên Đằng, Thần Long Na Di, Tiềm Long Vật Dụng, Long Nhận Hợp Nhất'
  },
  liubei: {
    key: 'liubei',
    name: 'Lưu Bị',
    title: 'Nhân Đức Chi Quân',
    category: 'Mở khóa Shop',
    dmg: 'Cân bằng kiếm thuật song cổ kiếm',
    range: '60px (Song kiếm nhân nghĩa)',
    atkSpeed: 'Nhanh',
    passive: 'Đào Viên Kết Nghĩa: Hồi phục 5 HP/giây liên tục, tăng 30% giáp cho bản thân & đồng minh trong đấu đôi 2v2.',
    copyableSkills: '[Khí Nhân Đức] - Trị liệu liên tục và gia cố phòng hộ đồng minh'
  },
  than_liubei: {
    key: 'than_liubei',
    name: 'Thần Lưu Bị',
    title: 'Hoàng Đế Thục Hán Thần Cảnh',
    category: 'Mở khóa Shop',
    dmg: '+80% Sát thương kiếm, kèm kiếm khí viễn chinh',
    range: '120px (Kiếm khí tầm xa)',
    atkSpeed: 'Rất nhanh',
    passive: 'Chí Tôn Thục Hán: Kiếm khí Thần Long xé rách không gian, hồi máu x3 lần và phản 30% sát thương.',
    copyableSkills: '[Hoàng Long Trảm] - Bắn 3 luồng kiếm khí Thần Long xuyên màn hình'
  },
  trieuvan: {
    key: 'trieuvan',
    name: 'Triệu Vân',
    title: 'Thường Sơn Triệu Tử Long',
    category: 'Mở khóa Shop',
    dmg: '35 DMG mỗi nhịp đâm liên hoàn',
    range: '140px (Thương pháp Thường Sơn)',
    atkSpeed: 'Thần tốc liên hoàn',
    passive: 'Đơn Thương Độc Mã: Miễn nhiễm choáng, lướt xuyên mục tiêu và đánh bật lùi đối thủ.',
    copyableSkills: '[Thất Tiến Thất Xuất] - 7 lần lướt đâm siêu tốc không thể cản phá'
  },
  than_trieuvan: {
    key: 'than_trieuvan',
    name: 'Thần Triệu Vân',
    title: 'Bạch Long Thần Tướng',
    category: 'Mở khóa Shop',
    dmg: '+100% Sát thương kèm Lôi Kiếp bão điện',
    range: '160px (Thần Thương Lôi Kiếp)',
    atkSpeed: 'Cực hạn vô song',
    passive: 'Thần Long Xuất Thế: Đòn đánh giáng sét lôi kiếp, tốc độ siêu việt, bỏ qua 60% giáp mục tiêu.',
    copyableSkills: '[Bạch Long Lôi Kích] - Thần Long Lôi Điện càn quét toàn sàn đấu'
  },
  the_owner: {
    key: 'the_owner',
    name: 'The Owner Game',
    title: 'Chúa Tể Trò Chơi',
    category: 'The Owner',
    dmg: 'Tăng cường x3 sát thương mọi tuyệt kỹ, 14 thần khí tự động oanh tạc',
    range: 'Toàn sàn đấu (Không giới hạn cự ly)',
    atkSpeed: 'Tự động oanh tạc liên tục',
    passive: 'Quyền Năng Sáng Tạo: 14 thần khí bay xung quanh tự động bảo hộ và oanh tạc toàn sàn, mở khóa toàn bộ kho vũ khí bí mật.',
    copyableSkills: '[Vạn Vũ Khí Quy Tông / Strike Nuke / God Mode] - Copy và điều khiển mọi tuyệt kỹ game'
  },
  the_owner_7b: {
    key: 'the_owner_7b',
    name: 'The Owner 7 Tỉ %',
    title: 'Tối Thượng Thần Giới 7 Tỉ %',
    category: 'The Owner',
    dmg: 'Thiêu đốt 0.2% HP mục tiêu mỗi 0.01s (20% HP/s), sát thương tuyệt kỹ đỉnh phong',
    range: 'Toàn cõi hư không',
    atkSpeed: 'Vô cực',
    passive: '7 Tỉ Phần Trăm Quyền Lực: Bất tử tuyệt đối, sinh lực 7 tỷ HP, làm tan chảy vạn vật xung quanh trong hào quang thần thánh.',
    copyableSkills: '[Vạn Thần Khí 7 Tỉ %] - Uy lực sáng thế hủy diệt thực tại'
  }
};
