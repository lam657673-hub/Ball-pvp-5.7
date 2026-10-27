import { WeaponKey, StellarCutsceneState, StellarOrbitalBeamState, StellarQuasarState } from './types';

// Helper to compute rotated rectangle corner points
export function rotRectPts(cx: number, cy: number, length: number, width: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const nx = -dy;
  const ny = dx;
  const hl = length / 2;
  const hw = width / 2;
  return [
    { x: cx - dx * hl - nx * hw, y: cy - dy * hl - ny * hw },
    { x: cx + dx * hl - nx * hw, y: cy + dy * hl - ny * hw },
    { x: cx + dx * hl + nx * hw, y: cy + dy * hl + ny * hw },
    { x: cx - dx * hl + nx * hw, y: cy - dy * hl + ny * hw }
  ];
}

export function drawPolygon(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], fill = true, stroke = false) {
  if (pts.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

export function drawWeaponIcon(ctx: CanvasRenderingContext2D, key: WeaponKey, x: number, y: number, size = 32) {
  ctx.save();
  ctx.translate(x, y);
  const scale = size / 64;
  ctx.scale(scale, scale);

  switch (key) {
    case 'kiem': {
      // Blade
      ctx.fillStyle = '#8a5a2b';
      drawPolygon(ctx, rotRectPts(16, 50, 22, 8, -45));
      ctx.fillStyle = '#555555';
      drawPolygon(ctx, rotRectPts(24, 40, 10, 3, 45));
      ctx.fillStyle = '#d8d8d8';
      drawPolygon(ctx, rotRectPts(42, 24, 34, 8, -45));
      break;
    }
    case 'riu': {
      ctx.fillStyle = '#6b4423';
      drawPolygon(ctx, rotRectPts(30, 34, 46, 5, -45));
      ctx.fillStyle = '#9a9a9a';
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(56, 18);
      ctx.lineTo(42, 32);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(20, 18);
      ctx.lineTo(34, 30);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'khien': {
      ctx.fillStyle = '#4a90d9';
      const shieldPts = [
        { x: 32, y: 8 },
        { x: 52, y: 18 },
        { x: 52, y: 38 },
        { x: 32, y: 58 },
        { x: 12, y: 38 },
        { x: 12, y: 18 }
      ];
      ctx.strokeStyle = '#2a5a9a';
      ctx.lineWidth = 3;
      drawPolygon(ctx, shieldPts, true, true);
      break;
    }
    case 'cung': {
      ctx.strokeStyle = '#c99a5b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(32, 32, 26, (-70 * Math.PI) / 180, (70 * Math.PI) / 180, false);
      ctx.stroke();
      ctx.strokeStyle = '#e8dcc0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(23, 8);
      ctx.lineTo(23, 56);
      ctx.stroke();
      break;
    }
    case 'no': {
      ctx.strokeStyle = '#8a8a8a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(30, 32, 20, (-80 * Math.PI) / 180, (80 * Math.PI) / 180, false);
      ctx.stroke();
      ctx.fillStyle = '#6b4423';
      ctx.fillRect(30, 28, 26, 8);
      ctx.fillStyle = '#333333';
      ctx.fillRect(50, 26, 6, 12);
      break;
    }
    case 'giao': {
      ctx.fillStyle = '#8a8a8a';
      drawPolygon(ctx, rotRectPts(30, 40, 52, 4, -45));
      ctx.fillStyle = '#e0e0e0';
      ctx.beginPath();
      ctx.moveTo(48, 20);
      ctx.lineTo(60, 8);
      ctx.lineTo(56, 26);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'railgun': {
      ctx.fillStyle = '#3a4a5a';
      drawPolygon(ctx, rotRectPts(32, 32, 44, 14, -30));
      ctx.fillStyle = '#8a3a3a';
      drawPolygon(ctx, rotRectPts(32, 32, 30, 4, -30));
      ctx.fillStyle = '#6a4a9a';
      drawPolygon(ctx, rotRectPts(24, 40, 16, 3, 20));
      ctx.fillStyle = '#cccccc';
      ctx.beginPath();
      ctx.arc(50, 14, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'upgraded_railgun': {
      // High-tech sci-fi heavy railgun cannon matching user asset
      ctx.fillStyle = '#f8fafc'; // White heavy armor chassis
      drawPolygon(ctx, rotRectPts(34, 30, 50, 16, -25));
      ctx.fillStyle = '#1e3a8a'; // Deep navy blue secondary armor
      drawPolygon(ctx, rotRectPts(24, 36, 24, 12, -25));
      ctx.fillStyle = '#d97706'; // Bronze energy core coil
      drawPolygon(ctx, rotRectPts(30, 32, 10, 8, -25));
      ctx.fillStyle = '#00e5ff'; // Glowing cyan laser rail
      drawPolygon(ctx, rotRectPts(42, 26, 26, 4, -25));
      ctx.fillStyle = '#0f172a'; // Heavy dark muzzle
      drawPolygon(ctx, rotRectPts(55, 18, 10, 14, -25));
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(44, 25, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'mace': {
      ctx.fillStyle = '#5a5a5a';
      drawPolygon(ctx, rotRectPts(20, 46, 30, 6, -45));
      ctx.fillStyle = '#8a8a8a';
      ctx.beginPath();
      ctx.arc(46, 20, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a3a3a';
      for (let i = 0; i < 8; i++) {
        const a = ((Math.PI * 2) / 8) * i;
        ctx.fillRect(46 + Math.cos(a) * 14 - 2, 20 + Math.sin(a) * 14 - 2, 4, 4);
      }
      break;
    }
    case 'songthu': {
      ctx.fillStyle = '#8a8a8a';
      drawPolygon(ctx, rotRectPts(18, 46, 26, 4, -45));
      ctx.fillStyle = '#e0e0e0';
      ctx.beginPath();
      ctx.moveTo(30, 26);
      ctx.lineTo(40, 16);
      ctx.lineTo(36, 30);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#8a8a8a';
      ctx.beginPath();
      ctx.arc(48, 44, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a3a3a';
      for (let i = 0; i < 6; i++) {
        const a = ((Math.PI * 2) / 6) * i;
        ctx.fillRect(48 + Math.cos(a) * 10 - 1.5, 44 + Math.sin(a) * 10 - 1.5, 3, 3);
      }
      break;
    }
    case 'minigun': {
      ctx.fillStyle = '#4a4a4a';
      for (let i = 0; i < 4; i++) ctx.fillRect(20 + i * 3, 14, 2, 36);
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.arc(30, 12, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a5a2b';
      ctx.fillRect(24, 46, 12, 10);
      break;
    }
    case 'sangthe': {
      ctx.fillStyle = '#ffd700';
      drawPolygon(ctx, rotRectPts(20, 50, 30, 8, -45));
      ctx.fillStyle = '#fff8dc';
      drawPolygon(ctx, rotRectPts(42, 22, 38, 10, -45));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(52, 12, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'satna': {
      ctx.fillStyle = '#9a9a9a';
      drawPolygon(ctx, rotRectPts(28, 40, 46, 5, -55));
      ctx.fillStyle = '#c8c8c8';
      drawPolygon(ctx, rotRectPts(44, 12, 20, 2.5, -55));
      ctx.fillStyle = '#2a2a2a';
      drawPolygon(ctx, rotRectPts(12, 56, 16, 7, -55));
      ctx.fillStyle = '#707070';
      ctx.beginPath();
      ctx.arc(20, 48, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b0b0b0';
      ctx.beginPath();
      ctx.arc(20, 48, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(221, 221, 221, 0.9)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(44, 12);
      ctx.lineTo(50, 4);
      ctx.stroke();
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(51, 6, 3, 0, (270 * Math.PI) / 180, false);
      ctx.stroke();
      break;
    }
    case 'torch': {
      ctx.fillStyle = '#6b4423';
      drawPolygon(ctx, rotRectPts(24, 46, 30, 6, -55));
      ctx.fillStyle = '#ff6a1a';
      ctx.beginPath();
      ctx.arc(40, 18, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath();
      ctx.arc(40, 18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 248, 220, 0.8)';
      ctx.beginPath();
      ctx.arc(40, 15, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'combo': {
      // 2 boxing fists (Left & Right)
      // Left Fist
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(20, 32, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(12, 36, 16, 7);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(14, 26, 12, 4);

      // Right Fist (slightly offset/raised)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(44, 24, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c2410c';
      ctx.fillRect(36, 28, 16, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(38, 18, 12, 4);

      // Speed lines / Impact spark
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(34, 10);
      ctx.lineTo(40, 4);
      ctx.moveTo(52, 14);
      ctx.lineTo(58, 8);
      ctx.stroke();
      break;
    }
    case 'songkiem': {
      // Left Katana (angled at -35 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(16, 50, 20, 6, -35));
      ctx.fillStyle = '#06b6d4';
      drawPolygon(ctx, rotRectPts(22, 42, 10, 3, 55));
      ctx.fillStyle = '#e2e8f0';
      drawPolygon(ctx, rotRectPts(38, 26, 36, 6, -35));
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, rotRectPts(38, 26, 36, 6, -35), false, true);

      // Right Katana (crossed at 35 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(48, 50, 20, 6, 35));
      ctx.fillStyle = '#06b6d4';
      drawPolygon(ctx, rotRectPts(42, 42, 10, 3, -55));
      ctx.fillStyle = '#e2e8f0';
      drawPolygon(ctx, rotRectPts(26, 26, 36, 6, 35));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, rotRectPts(26, 26, 36, 6, 35), false, true);

      // Center cross spark
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(32, 34, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'cancau': {
      // Fishing Rod (Cần Câu)
      // 1. Carbon Rod Handle & Shaft (angled at -45 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(16, 52, 24, 7, -45));
      
      // Reel attachment (Máy câu)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(20, 48, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(20, 48, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Slender flexible rod shaft
      ctx.fillStyle = '#334155';
      drawPolygon(ctx, rotRectPts(36, 32, 34, 3.5, -45));
      ctx.fillStyle = '#64748b';
      drawPolygon(ctx, rotRectPts(50, 18, 16, 2, -45));

      // Rod Tip & Guide Ring
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(56, 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Fishing line dropping down with hook
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(56, 12);
      ctx.quadraticCurveTo(58, 28, 52, 42);
      ctx.stroke();

      // Red/White Bobber Float
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(54, 28, 3, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(54, 28, 3, 0, Math.PI);
      ctx.fill();

      // Shiny Steel Barbed Hook
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(50, 42, 4, 0, Math.PI * 0.9, false);
      ctx.stroke();
      break;
    }
    case 'tamkiem': {
      // 3 Katana Zoro Santoryu (Tam Kiếm)
      // 1. Left Katana (Sandai Kitetsu - red & black sheath, wave hamon)
      ctx.fillStyle = '#dc2626';
      drawPolygon(ctx, rotRectPts(14, 52, 22, 5, -40));
      ctx.fillStyle = '#fbbf24';
      drawPolygon(ctx, rotRectPts(20, 44, 9, 3, 50));
      ctx.fillStyle = '#f1f5f9';
      drawPolygon(ctx, rotRectPts(36, 26, 38, 5.5, -40));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(36, 26, 38, 5.5, -40), false, true);

      // 2. Right Katana (Enma - purple & gold, flame hamon)
      ctx.fillStyle = '#7e22ce';
      drawPolygon(ctx, rotRectPts(50, 52, 22, 5, 40));
      ctx.fillStyle = '#fbbf24';
      drawPolygon(ctx, rotRectPts(44, 44, 9, 3, -50));
      ctx.fillStyle = '#f1f5f9';
      drawPolygon(ctx, rotRectPts(28, 26, 38, 5.5, 40));
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(28, 26, 38, 5.5, 40), false, true);

      // 3. Center Katana (Wado Ichimonji - pure white handle & sheath)
      ctx.fillStyle = '#ffffff';
      drawPolygon(ctx, rotRectPts(32, 56, 22, 5, 0));
      ctx.fillStyle = '#f59e0b';
      drawPolygon(ctx, rotRectPts(32, 44, 10, 3, 90));
      ctx.fillStyle = '#f8fafc';
      drawPolygon(ctx, rotRectPts(32, 22, 40, 5.5, 0));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(32, 22, 40, 5.5, 0), false, true);

      // Zoro green bandana knot icon & slash flare
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(32, 44, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      break;
    }
    case 'computer': {
      // Laptop Hacker / Máy Tính (The Owner Game)
      // 1. Laptop Base Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, [
        { x: 12, y: 46 },
        { x: 52, y: 46 },
        { x: 58, y: 56 },
        { x: 6, y: 56 }
      ], true, true);

      // Keyboard & Trackpad
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, [
        { x: 15, y: 48 },
        { x: 49, y: 48 },
        { x: 52, y: 52 },
        { x: 12, y: 52 }
      ]);
      ctx.fillStyle = '#334155';
      ctx.fillRect(28, 53, 8, 2.5);

      // 2. Laptop Screen Lid (Tilted Up)
      ctx.fillStyle = '#020617';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.rect(14, 12, 36, 32);
      ctx.fill();
      ctx.stroke();

      // Screen Matrix Glitch Lines
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 6px monospace';
      ctx.fillText('>_ ROOT', 17, 20);
      ctx.fillText('010110', 17, 28);
      ctx.fillText('OWNER', 17, 36);

      // Hacker Cyber Halo
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 14, 32, 28);
      ctx.shadowBlur = 0;
      break;
    }
    case 'daynit': {
      // Dây Nịt Tử Thần (The Owner Exclusive Weapon)
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 6;

      // 1. Heavy brown leather belt loop
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(14, 48);
      ctx.bezierCurveTo(16, 20, 42, 16, 44, 34);
      ctx.bezierCurveTo(46, 50, 24, 48, 28, 30);
      ctx.bezierCurveTo(30, 18, 52, 14, 56, 18);
      ctx.stroke();

      // 2. Fiery red-orange inner spine
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(14, 48);
      ctx.bezierCurveTo(16, 20, 42, 16, 44, 34);
      ctx.bezierCurveTo(46, 50, 24, 48, 28, 30);
      ctx.bezierCurveTo(30, 18, 52, 14, 56, 18);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // 3. Golden Buckle at belt head
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(8, 44, 12, 12, 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#451a03';
      ctx.fillRect(11, 48, 6, 4);

      // 4. Belt eyelets
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(22, 28, 1.2, 0, Math.PI * 2);
      ctx.arc(32, 22, 1.2, 0, Math.PI * 2);
      ctx.arc(40, 26, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 5. Whip Crack Tail with Pain Sparks
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(56, 18);
      ctx.lineTo(60, 12);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(60, 12, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(62, 10, 1.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'thuongthan': {
      // Thương Thần (Long Đảm Thần Thương)
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      // Shaft - Dragon scale silver-gold pole
      ctx.fillStyle = '#facc15';
      drawPolygon(ctx, rotRectPts(30, 40, 54, 5, -45));
      ctx.fillStyle = '#e0f2fe';
      drawPolygon(ctx, rotRectPts(30, 40, 54, 2, -45));
      // Crimson silk tassel
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(46, 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(44, 25, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Giant celestial spear head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(46, 20);
      ctx.lineTo(62, 4);
      ctx.lineTo(58, 28);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      break;
    }
    case 'than_songkiem': {
      // Thần Song Kiếm (Long Phụng Cặp Kiếm Thần Thoại)
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 8;
      // 1. Long Kiếm (Left - Golden Dragon Blade)
      ctx.fillStyle = '#78350f';
      drawPolygon(ctx, rotRectPts(16, 52, 18, 5, -40));
      ctx.fillStyle = '#f59e0b';
      drawPolygon(ctx, rotRectPts(22, 44, 8, 3, 50));
      ctx.fillStyle = '#fef08a';
      drawPolygon(ctx, rotRectPts(36, 26, 36, 6, -40));
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      // 2. Phụng Kiếm (Right - Cyan Phoenix Blade)
      ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = '#0c4a6e';
      drawPolygon(ctx, rotRectPts(48, 52, 18, 5, 40));
      ctx.fillStyle = '#38bdf8';
      drawPolygon(ctx, rotRectPts(42, 44, 8, 3, -50));
      ctx.fillStyle = '#e0f2fe';
      drawPolygon(ctx, rotRectPts(28, 26, 36, 6, 40));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
      break;
    }
    case 'stellar_remote': {
      // Stellar Remote: Tactical Cosmic Orbital Controller
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      // Remote Body: Sleek dark obsidian-titanium bevel
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(14, 14, 36, 44, 8);
      ctx.fill();
      ctx.stroke();

      // Antenna with pulsing laser emitter
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(32, 14);
      ctx.lineTo(32, 4);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(32, 4, 3, 0, Math.PI * 2);
      ctx.fill();

      // Radar Screen (Holographic targeting circle)
      ctx.fillStyle = '#022c22';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(32, 32, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, 23);
      ctx.lineTo(32, 41);
      ctx.moveTo(23, 32);
      ctx.lineTo(41, 32);
      ctx.stroke();

      // Center glowing satellite transmitter beacon
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(32, 32, 3, 0, Math.PI * 2);
      ctx.fill();

      // 4 Tactical Command Buttons (SS-01, SS-03, SS-04, SS-05)
      ctx.fillStyle = '#ef4444'; // SS-01 Red
      ctx.fillRect(19, 47, 5, 4);
      ctx.fillStyle = '#f97316'; // SS-03 Orange
      ctx.fillRect(26, 47, 5, 4);
      ctx.fillStyle = '#eab308'; // SS-04 Gold
      ctx.fillRect(33, 47, 5, 4);
      ctx.fillStyle = '#a855f7'; // SS-05 Purple/Cyan
      ctx.fillRect(40, 47, 5, 4);

      ctx.shadowBlur = 0;
      break;
    }
    default: {
      if (typeof key === 'string' && key.startsWith('fusion_')) {
        const parts = key.replace('fusion_', '').split('_');
        if (parts.length === 2) {
          ctx.save();
          ctx.translate(-14, 0);
          ctx.scale(0.68, 0.68);
          drawWeaponIcon(ctx, parts[0] as WeaponKey, 0, 0, 64);
          ctx.restore();

          ctx.save();
          ctx.translate(14, 0);
          ctx.scale(0.68, 0.68);
          drawWeaponIcon(ctx, parts[1] as WeaponKey, 0, 0, 64);
          ctx.restore();

          // Fusion Golden Star Badge in Center
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(32, 32, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e1b4b';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', 32, 32);
          break;
        }
      }
      // Fallback
      ctx.fillStyle = '#8a5a2b';
      drawPolygon(ctx, rotRectPts(16, 50, 22, 8, -45));
      ctx.fillStyle = '#d8d8d8';
      drawPolygon(ctx, rotRectPts(42, 24, 34, 8, -45));
      break;
    }
  }
  ctx.restore();
}

export function drawRuneRing(ctx: CanvasRenderingContext2D, radius: number, segments: number, color: string, alpha: number, thickness: number) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = thickness;
  const gap = 0.35;
  for (let i = 0; i < segments; i++) {
    const a0 = ((Math.PI * 2) / segments) * i;
    const a1 = a0 + ((Math.PI * 2) / segments) * (1 - gap);
    ctx.beginPath();
    ctx.arc(0, 0, radius, a0, a1, false);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawTaiji(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.save();
  // White full circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Dark half
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, false);
  ctx.fill();

  // Dark top circle
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, -radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  // White bottom circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  // Small inner dots
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -radius / 2, radius / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, radius / 2, radius / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawFireCrack(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, segments = 10, jitter = 14) {
  const minW = 2;
  const maxW = 12;
  const pts: { x: number; y: number; t: number }[] = [{ x: x1, y: y1, t: 0 }];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t;
    const by = y1 + (y2 - y1) * t;
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    const nlen = Math.hypot(nx, ny) || 1;
    const off = (Math.random() - 0.5) * jitter;
    pts.push({ x: bx + (nx / nlen) * off, y: by + (ny / nlen) * off, t });
  }
  pts.push({ x: x2, y: y2, t: 1 });

  const widthAt = (t: number) => minW + (maxW - minW) * (1 - Math.abs(t - 0.5) * 2);

  ctx.save();
  ctx.lineCap = 'round';
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const midT = (a.t + b.t) / 2;
    const w = widthAt(midT);

    // Layer 1: Outer Orange Glow
    ctx.strokeStyle = 'rgba(255, 106, 26, 0.5)';
    ctx.lineWidth = w + 5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 2: Yellow Core
    ctx.strokeStyle = 'rgba(255, 210, 63, 0.9)';
    ctx.lineWidth = w + 1.5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 3: Hot White Center
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, w * 0.35);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

// ----------------------------------------------------
// UPDATE 1.1.0: SỞ TÂN - NHẤT ĐIẾU KHAI THIÊN MÔN & TỨ THÁNH
// ----------------------------------------------------

// KỸ NĂNG MỚI: NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA (VẠN LUÂN CẦU VỒNG + TỨ TƯỢNG)
export function drawNhatDieuToiCaoRings(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radii: number[],
  rotations: number[],
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rainbowColors = [
    '#ef4444', // Đỏ (Chu Sa)
    '#f97316', // Cam (Hỏa Tinh)
    '#eab308', // Vàng (Kim Quang)
    '#22c55e', // Lục (Thanh Mộc)
    '#06b6d4', // Lam (Hải Thủy)
    '#3b82f6', // Xanh Dương (Thiên Lam)
    '#8b5cf6', // Chàm (Tử Điện)
    '#d946ef', // Tím (Hư Không)
    '#f43f5e'  // Hồng Ngọc (Sáng Thế)
  ];

  const outerRadius = radii[radii.length - 1] || 110;

  // Outer Divine Rainbow Aurora Halo
  const haloGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, outerRadius + 45);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  haloGrad.addColorStop(0.3, 'rgba(234, 179, 8, 0.35)');
  haloGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.25)');
  haloGrad.addColorStop(0.85, 'rgba(217, 70, 239, 0.15)');
  haloGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius + 45, 0, Math.PI * 2);
  ctx.fill();

  // Draw 8-9 layered rotating rainbow rings with alternating directions and celestial runes
  radii.forEach((radius, i) => {
    const rot = rotations[i] || 0;
    const numPoints = 8 + i * 4;
    const dir = i % 2 === 0 ? 1 : -1;
    const color = rainbowColors[i % rainbowColors.length];

    ctx.save();
    ctx.rotate(rot * dir);

    // Glowing Rainbow Base Ring
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.8 + (radii.length - i) * 0.4;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Sacred spikes / runic teeth on rainbow rings
    for (let p = 0; p < numPoints; p++) {
      const angle = (p / numPoints) * Math.PI * 2;
      const rx = Math.cos(angle) * radius;
      const ry = Math.sin(angle) * radius;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(angle + Math.PI / 2);

      // Rainbow rune diamond spike
      ctx.fillStyle = p % 2 === 0 ? '#ffffff' : color;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(4, 3);
      ctx.lineTo(0, 6);
      ctx.lineTo(-4, 3);
      ctx.closePath();
      ctx.fill();

      // Shimmering micro star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  });

  // Central Hyper-Luminous Prismatic Star Core
  ctx.save();
  ctx.rotate((rotations[0] || 0) * 3);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  for (let s = 0; s < 12; s++) {
    const a = (s / 12) * Math.PI * 2;
    const r = s % 2 === 0 ? 22 : 9;
    const sx = Math.cos(a) * r;
    const sy = Math.sin(a) * r;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();

  // ----------------------------------------------------
  // 4 GÓC TỨ TƯỢNG (Thanh Long, Bạch Hổ, Chu Tước, Huyền Vũ)
  // ----------------------------------------------------
  const beastDist = outerRadius + 38;
  const beasts = [
    {
      name: 'THANH LONG',
      angle: -Math.PI * 0.75, // Góc Trên - Trái (Tây Bắc / Đông)
      color: '#10b981',
      bg: 'rgba(6, 78, 59, 0.92)',
      border: '#34d399',
      symbol: '🐉'
    },
    {
      name: 'BẠCH HỔ',
      angle: -Math.PI * 0.25, // Góc Trên - Phải (Đông Bắc / Tây)
      color: '#f8fafc',
      bg: 'rgba(30, 41, 59, 0.92)',
      border: '#e2e8f0',
      symbol: '🐯'
    },
    {
      name: 'CHU TƯỚC',
      angle: Math.PI * 0.25,  // Góc Dưới - Phải (Đông Nam / Nam)
      color: '#ef4444',
      bg: 'rgba(127, 29, 29, 0.92)',
      border: '#f87171',
      symbol: '🦅'
    },
    {
      name: 'HUYỀN VŨ',
      angle: Math.PI * 0.75,  // Góc Dưới - Trái (Tây Nam / Bắc)
      color: '#06b6d4',
      bg: 'rgba(14, 116, 144, 0.92)',
      border: '#38bdf8',
      symbol: '🐢'
    }
  ];

  beasts.forEach((beast, idx) => {
    const float = Math.sin(now * 0.006 + idx * 1.5) * 4;
    const bx = Math.cos(beast.angle) * (beastDist + float);
    const by = Math.sin(beast.angle) * (beastDist + float);

    ctx.save();
    ctx.translate(bx, by);

    // Outer Aura Pulse
    ctx.shadowColor = beast.border;
    ctx.shadowBlur = 16;
    ctx.fillStyle = beast.bg;
    ctx.strokeStyle = beast.border;
    ctx.lineWidth = 2.5;

    // Sacred Beast Crest Circle
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Beast Emoji / Sacred Silhouette
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(beast.symbol, 0, 1);

    // Beast Name Ribbon / Badge
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = beast.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-36, 22, 72, 16, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = beast.color;
    ctx.fillText(beast.name, 0, 31);

    ctx.restore();
  });

  ctx.restore();
}

export function drawSoTanGoldenRings(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radii: number[],
  rotations: number[]
) {
  ctx.save();
  ctx.translate(x, y);

  // Outer Divine Halo
  const haloGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, radii[radii.length - 1] + 25);
  haloGrad.addColorStop(0, 'rgba(250, 204, 21, 0.45)');
  haloGrad.addColorStop(0.6, 'rgba(234, 179, 8, 0.2)');
  haloGrad.addColorStop(1, 'rgba(202, 138, 4, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radii[radii.length - 1] + 25, 0, Math.PI * 2);
  ctx.fill();

  // Draw 4-5 layered rotating rings with alternating directions and golden sacred runes
  radii.forEach((radius, i) => {
    const rot = rotations[i] || 0;
    const numPoints = 8 + i * 4;
    const dir = i % 2 === 0 ? 1 : -1;

    ctx.save();
    ctx.rotate(rot * dir);

    // Glowing Golden Base Ring
    ctx.strokeStyle = i % 2 === 0 ? '#fde047' : '#eab308';
    ctx.lineWidth = 2.5 + (radii.length - i) * 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred spikes / runic teeth on rings
    for (let p = 0; p < numPoints; p++) {
      const angle = (p / numPoints) * Math.PI * 2;
      const rx = Math.cos(angle) * radius;
      const ry = Math.sin(angle) * radius;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(angle + Math.PI / 2);

      // Gold rune spike
      ctx.fillStyle = p % 2 === 0 ? '#ffffff' : '#facc15';
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(3.5, 3);
      ctx.lineTo(-3.5, 3);
      ctx.closePath();
      ctx.fill();

      // Small light circle
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  });

  // Central Golden Star Core
  ctx.save();
  ctx.rotate(rotations[0] * 2);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    const r = s % 2 === 0 ? 16 : 7;
    const sx = Math.cos(a) * r;
    const sy = Math.sin(a) * r;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// Massive Golden Ground Fissure (Vết nứt cực to)
export function drawMassiveFissure(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lifeRatio: number
) {
  const segments = 16;
  const jitter = 28;
  const pts: { x: number; y: number; t: number }[] = [{ x: x1, y: y1, t: 0 }];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t;
    const by = y1 + (y2 - y1) * t;
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    const nlen = Math.hypot(nx, ny) || 1;
    const off = (Math.sin(i * 3.7) + (i % 2 === 0 ? 1 : -1)) * (jitter / 2);
    pts.push({ x: bx + (nx / nlen) * off, y: by + (ny / nlen) * off, t });
  }
  pts.push({ x: x2, y: y2, t: 1 });

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, lifeRatio));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const midT = (a.t + b.t) / 2;
    const maxW = 28;
    const minW = 6;
    const w = minW + (maxW - minW) * (1 - Math.abs(midT - 0.5) * 1.8);

    // Layer 1: Huge Radiant Golden Glow
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.45)';
    ctx.lineWidth = w + 16;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 2: Hot Amber Magma
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = w + 6;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 3: Blazing Golden Core
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 4: Pure White Laser Fissure Center
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(2, w * 0.4);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

// Massive Straight Fissure (Vết nứt thẳng Tối Cao Áo Nghĩa - Cầu Vồng / Kim Quang)
export function drawStraightFissure(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lifeRatio: number,
  now: number,
  theme: 'rainbow' | 'golden' = 'rainbow',
  remainingPool?: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, lifeRatio));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  // Layer 1: Radiant Prismatic Halo
  const isGold = theme === 'golden';
  const rainbowColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const goldColors = ['#f59e0b', '#fbbf24', '#facc15', '#fde047', '#fef08a'];
  const pulseColor = isGold 
    ? goldColors[Math.floor((now * 0.006) % goldColors.length)]
    : rainbowColors[Math.floor((now * 0.005) % rainbowColors.length)];

  ctx.shadowColor = pulseColor;
  ctx.shadowBlur = 24;
  ctx.strokeStyle = pulseColor;
  ctx.lineWidth = isGold ? 28 : 36;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Layer 2: Straight Crystalline Rift Core
  ctx.strokeStyle = isGold ? '#fef08a' : '#facc15';
  ctx.lineWidth = isGold ? 14 : 18;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Layer 3: Ultra Pure White Dimensional Cut
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Layer 4: Vertical Rising Prism Rays / Energy Spikes along the straight line
  const numRays = 18;
  const activePalette = isGold ? goldColors : rainbowColors;
  for (let i = 1; i < numRays; i++) {
    const t = i / numRays;
    const rx = x1 + dx * t;
    const ry = y1 + dy * t;
    const rayLen = 14 + Math.sin(now * 0.008 + i * 1.3) * 10;
    const rayColor = activePalette[i % activePalette.length];

    ctx.strokeStyle = rayColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx - nx * rayLen, ry - ny * rayLen);
    ctx.lineTo(rx + nx * rayLen, ry + ny * rayLen);
    ctx.stroke();

    // Small Diamond Sparkle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 5: Remaining Damage Pool Indicator (if permanent until depleted)
  if (remainingPool !== undefined && remainingPool > 0) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = isGold ? '#fef08a' : '#ffffff';
    ctx.shadowColor = isGold ? '#f59e0b' : '#38bdf8';
    ctx.shadowBlur = 10;
    const label = isGold 
      ? `✨ VẾT NỨT HOÀNG KIM: ${Math.round(remainingPool)} DMG`
      : `🌈 VẾT NỨT CÀN KHÔN: ${Math.round(remainingPool)} DMG`;
    ctx.fillText(label, midX, midY - 14);
  }

  ctx.restore();
}

// Four Sacred Beasts Spirit Aura (Tứ Thánh Thần Thú)
export function drawBeastSpirit(
  ctx: CanvasRenderingContext2D,
  beast: {
    type: 'bach_ho' | 'chu_tuoc' | 'thanh_long' | 'huyen_vu';
    title: string;
    desc: string;
    spawnAt: number;
    duration: number;
    x: number;
    y: number;
  },
  now: number
) {
  const elapsed = now - beast.spawnAt;
  const progress = Math.min(1, Math.max(0, elapsed / beast.duration));
  const alpha = progress < 0.15 ? progress / 0.15 : progress > 0.75 ? (1 - progress) / 0.25 : 1;

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  const floatY = Math.sin(now * 0.006) * 6;
  const bx = beast.x;
  const by = beast.y - 48 + floatY;

  // Banner background
  const bannerW = 210;
  const bannerH = 46;
  const rx = bx - bannerW / 2;
  const ry = by - bannerH / 2;

  let bannerBg = 'rgba(15, 23, 42, 0.92)';
  let borderColor = '#facc15';
  let titleColor = '#fef08a';

  if (beast.type === 'bach_ho') {
    bannerBg = 'rgba(30, 41, 59, 0.95)';
    borderColor = '#f8fafc';
    titleColor = '#ffffff';
  } else if (beast.type === 'chu_tuoc') {
    bannerBg = 'rgba(69, 10, 10, 0.95)';
    borderColor = '#ef4444';
    titleColor = '#fca5a5';
  } else if (beast.type === 'thanh_long') {
    bannerBg = 'rgba(6, 78, 59, 0.95)';
    borderColor = '#10b981';
    titleColor = '#6ee7b7';
  } else if (beast.type === 'huyen_vu') {
    bannerBg = 'rgba(20, 83, 45, 0.95)';
    borderColor = '#22c55e';
    titleColor = '#86efac';
  }

  // Shadow / Glow
  ctx.shadowColor = borderColor;
  ctx.shadowBlur = 18;
  ctx.fillStyle = bannerBg;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(rx, ry, bannerW, bannerH, 12);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Text
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = titleColor;
  ctx.fillText(beast.title, bx, ry + 18);

  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#fef3c7';
  ctx.fillText(beast.desc, bx, ry + 34);

  // Icon symbol on left
  ctx.font = '18px sans-serif';
  const icon = beast.type === 'bach_ho' ? '🐅' : beast.type === 'chu_tuoc' ? '🦅' : beast.type === 'thanh_long' ? '🐉' : '🐢';
  ctx.fillText(icon, rx + 18, ry + 28);

  ctx.restore();
}

export function drawHuyenVuShield(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  const pulse = Math.sin(now * 0.008) * 3;
  const shieldRadius = radius + 9 + pulse;

  // Hexagonal Turtle Shell Matrix
  ctx.shadowColor = 'rgba(34, 197, 94, 0.9)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 3;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + now * 0.002;
    const px = x + Math.cos(angle) * shieldRadius;
    const py = y + Math.sin(angle) * shieldRadius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner Tortoise Rune Ring
  ctx.strokeStyle = 'rgba(240, 253, 244, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, shieldRadius - 4, 0, Math.PI * 2);
  ctx.stroke();

  // Label
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#86efac';
  ctx.textAlign = 'center';
  ctx.fillText('🐢 [HUYỀN VŨ BẤT TỬ]', x, y + shieldRadius + 14);

  ctx.restore();
}

// ----------------------------------------------------
// PROJECTILES & WEAPON FX (Cung, Nỏ, Song Kiếm, Sáng Thế)
// ----------------------------------------------------

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color = '#c99a5b'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Motion blur / trail line
  ctx.strokeStyle = 'rgba(201, 154, 91, 0.35)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(0, 0);
  ctx.stroke();

  // Wooden shaft
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  // Arrowhead (Sharp Steel Triangle)
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(8, -4);
  ctx.lineTo(9, 0);
  ctx.lineTo(8, 4);
  ctx.closePath();
  ctx.fill();

  // Feathers / Fletching
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(-18, -4);
  ctx.lineTo(-12, 0);
  ctx.lineTo(-18, 4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawCrossbowBolt(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color = '#ef4444'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Power Glow / Tracer
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  // Heavy steel shaft
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(8, 0);
  ctx.stroke();

  // Inner energy core
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  // Diamond piercing steel bolt head
  ctx.fillStyle = '#fca5a5';
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(8, -5);
  ctx.lineTo(10, 0);
  ctx.lineTo(8, 5);
  ctx.closePath();
  ctx.fill();

  // Metallic back fins
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(-19, -5);
  ctx.lineTo(-15, 0);
  ctx.lineTo(-19, 5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawSongKiemSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius = 24,
  slashIndex = 0,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const mainColor = slashIndex === 0 ? '#22d3ee' : '#38bdf8';
  const glowColor = slashIndex === 0 ? 'rgba(6, 182, 212, 0.8)' : 'rgba(14, 165, 233, 0.8)';

  ctx.shadowColor = mainColor;
  ctx.shadowBlur = 15;

  // Outer Crescent Energy Arc
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.65 * Math.PI, 0.65 * Math.PI, false);
  ctx.stroke();

  // Inner Blazing White Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.55 * Math.PI, 0.55 * Math.PI, false);
  ctx.stroke();

  // Energy Blade Wings
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.moveTo(Math.cos(-0.65 * Math.PI) * radius, Math.sin(-0.65 * Math.PI) * radius);
  ctx.lineTo(Math.cos(-0.65 * Math.PI) * radius - 8, Math.sin(-0.65 * Math.PI) * radius - 4);
  ctx.lineTo(Math.cos(-0.5 * Math.PI) * (radius - 5), Math.sin(-0.5 * Math.PI) * (radius - 5));
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(Math.cos(0.65 * Math.PI) * radius, Math.sin(0.65 * Math.PI) * radius);
  ctx.lineTo(Math.cos(0.65 * Math.PI) * radius - 8, Math.sin(0.65 * Math.PI) * radius + 4);
  ctx.lineTo(Math.cos(0.5 * Math.PI) * (radius - 5), Math.sin(0.5 * Math.PI) * (radius - 5));
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Render Skill 2: [NHẤT QUANG] - Luồng kiếm khí khổng lồ xé toạc chiến trường
 */
export function drawSongKiemNhatQuang(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius = 68,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // 1. Massive Holy & Celestial Cyan Aura
  ctx.shadowColor = '#00f2ff';
  ctx.shadowBlur = 30;

  // Outer Colossal Energy Arc
  const grad = ctx.createLinearGradient(-30, 0, 30, 0);
  grad.addColorStop(0, '#facc15');
  grad.addColorStop(0.5, '#22d3ee');
  grad.addColorStop(1, '#ffffff');

  ctx.strokeStyle = 'rgba(6, 182, 212, 0.9)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.72 * Math.PI, 0.72 * Math.PI, false);
  ctx.stroke();

  // Secondary Gold / Cyan Radiant Rim
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 4, -0.68 * Math.PI, 0.68 * Math.PI, false);
  ctx.stroke();

  // Inner Ultra-Bright Blazing White Razor Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 2, -0.62 * Math.PI, 0.62 * Math.PI, false);
  ctx.stroke();

  // Giant Sword Crest / Center Blade Spike
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(radius + 12, 0);
  ctx.lineTo(radius - 12, -18);
  ctx.lineTo(radius - 4, 0);
  ctx.lineTo(radius - 12, 18);
  ctx.closePath();
  ctx.fill();

  // Trailing Divine Slash Wings
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(Math.cos(-0.72 * Math.PI) * radius, Math.sin(-0.72 * Math.PI) * radius);
  ctx.lineTo(Math.cos(-0.72 * Math.PI) * radius - 24, Math.sin(-0.72 * Math.PI) * radius - 14);
  ctx.lineTo(Math.cos(-0.55 * Math.PI) * (radius - 12), Math.sin(-0.55 * Math.PI) * (radius - 12));
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(Math.cos(0.72 * Math.PI) * radius, Math.sin(0.72 * Math.PI) * radius);
  ctx.lineTo(Math.cos(0.72 * Math.PI) * radius - 24, Math.sin(0.72 * Math.PI) * radius + 14);
  ctx.lineTo(Math.cos(0.55 * Math.PI) * (radius - 12), Math.sin(0.55 * Math.PI) * (radius - 12));
  ctx.closePath();
  ctx.fill();

  // Light Rays from Crescent
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 2;
  for (let i = -3; i <= 3; i++) {
    const a = (i * 0.2) * Math.PI * 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (radius - 10), Math.sin(a) * (radius - 10));
    ctx.lineTo(Math.cos(a) * (radius + 20), Math.sin(a) * (radius + 20));
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Hiệu ứng đứng im tích tụ năng lượng Nhất Quang
 */
export function drawSongKiemChargeAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  chargeProgress: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Concentric gathering rings collapsing into ball
  const ringCount = 3;
  for (let i = 0; i < ringCount; i++) {
    const cycle = ((now * 0.002 + i / ringCount) % 1);
    const radius = 60 * (1 - cycle);
    const alpha = cycle * 0.8;

    ctx.strokeStyle = i % 2 === 0 ? 'rgba(34, 211, 238, ' + alpha + ')' : 'rgba(250, 204, 21, ' + alpha + ')';
    ctx.lineWidth = 2 + (1 - cycle) * 2;
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1, radius), 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Rotating Radiant Sword Rays
  const rayAngle = now * 0.005;
  ctx.rotate(rayAngle);
  ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.5 + 0.5 * Math.sin(now * 0.02)) + ')';
  ctx.lineWidth = 1.5;
  const rayLength = 30 + chargeProgress * 35;
  for (let j = 0; j < 8; j++) {
    const a = (j * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 14);
    ctx.lineTo(Math.cos(a) * rayLength, Math.sin(a) * rayLength);
    ctx.stroke();
  }

  // 3. Center Glowing Energy Core
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.4 + 0.5 * chargeProgress) + ')';
  ctx.beginPath();
  ctx.arc(0, 0, 16 + chargeProgress * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawHolySlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  startTime: number,
  now: number,
  duration = 450
) {
  const elapsed = now - startTime;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.globalAlpha = alpha;

  // 1. Divine Pillar of Holy Genesis Light (From top of screen down)
  const pillarGrad = ctx.createLinearGradient(x, 0, x, y);
  pillarGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  pillarGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.7)');
  pillarGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

  ctx.fillStyle = pillarGrad;
  const pillarW = 28 * (1 - progress * 0.4);
  ctx.fillRect(x - pillarW / 2, 0, pillarW, y + 20);

  // 2. Grand Holy Cross Slash on Target
  const slashLen = 70 + progress * 50;
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 25;

  // Diagonal Slash 1 (\)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8 * (1 - progress);
  ctx.beginPath();
  ctx.moveTo(x - slashLen * 0.7, y - slashLen * 0.7);
  ctx.lineTo(x + slashLen * 0.7, y + slashLen * 0.7);
  ctx.stroke();

  // Diagonal Slash 2 (/)
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 6 * (1 - progress);
  ctx.beginPath();
  ctx.moveTo(x + slashLen * 0.7, y - slashLen * 0.7);
  ctx.lineTo(x - slashLen * 0.7, y + slashLen * 0.7);
  ctx.stroke();

  // Center Genesis Sunburst Halo
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 16 * (1 - progress), 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawLienHoanKichSlashFx(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hitCount: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const angle = ((hitCount % 4) * Math.PI) / 4 + (now * 0.01);
  ctx.rotate(angle);

  const colors = ['#22d3ee', '#38bdf8', '#facc15', '#f43f5e'];
  const curColor = colors[hitCount % colors.length];

  ctx.shadowColor = curColor;
  ctx.shadowBlur = 18;

  // Double X-slash trails
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-35, -20);
  ctx.lineTo(35, 20);
  ctx.moveTo(-35, 20);
  ctx.lineTo(35, -20);
  ctx.stroke();

  ctx.strokeStyle = curColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-45, 0);
  ctx.lineTo(45, 0);
  ctx.stroke();

  // Hit Spark / Flash
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ hình thái Long Nhân Hợp Nhất của Bá Thường
 * Tái hiện chi tiết khuôn mặt, tóc rồng đen tỏa tủa, sừng rồng ngà, mắt rồng hoàng kim với vảy ngọc, tai nhọn và cánh tay rồng vảy xanh
 */
export function drawDragonHumanAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Dragon Chi Emerald Flame Aura & Ambient Glow
  const pulse = Math.sin(now * 0.01) * 2.5;
  const grad = ctx.createRadialGradient(0, 0, radius * 0.4, 0, 0, radius + 14 + pulse);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
  grad.addColorStop(0.65, 'rgba(5, 150, 105, 0.25)');
  grad.addColorStop(1, 'rgba(4, 120, 87, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 14 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // 2. Green T-shirt / Tunic at bottom
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.moveTo(-radius * 0.75, radius * 0.45);
  ctx.quadraticCurveTo(0, radius * 0.35, radius * 0.75, radius * 0.45);
  ctx.lineTo(radius * 0.85, radius * 1.05);
  ctx.lineTo(-radius * 0.85, radius * 1.05);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // T-shirt collar
  ctx.strokeStyle = '#14532d';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, radius * 0.45, radius * 0.35, 0, Math.PI);
  ctx.stroke();

  // 3. Left Pointed Elf / Dragon Ear
  ctx.fillStyle = '#fed7aa';
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(radius * 0.7, -radius * 0.2);
  ctx.quadraticCurveTo(radius * 1.35, -radius * 0.1, radius * 1.45, radius * 0.3);
  ctx.quadraticCurveTo(radius * 1.0, radius * 0.45, radius * 0.65, radius * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Ear inner shadow & teal scale accent at ear base
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(radius * 0.8, radius * 0.25, 3, 0, Math.PI * 2);
  ctx.fill();

  // 4. Wild Spiky Dragon Hair (Top, Back, and Side locks flowing upwards)
  ctx.fillStyle = '#09090b';
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 1.5;

  const hairLocks = [
    // Left side locks
    [[-radius * 0.9, -radius * 0.1], [-radius * 1.4, -radius * 0.8], [-radius * 0.7, -radius * 0.9]],
    [[-radius * 0.8, -radius * 0.6], [-radius * 1.3, -radius * 1.4], [-radius * 0.4, -radius * 1.2]],
    // Top spike locks
    [[-radius * 0.5, -radius * 1.0], [-radius * 0.7, -radius * 1.8], [-radius * 0.1, -radius * 1.5]],
    [[-radius * 0.2, -radius * 1.2], [0, -radius * 2.0], [radius * 0.3, -radius * 1.5]],
    [[radius * 0.1, -radius * 1.3], [radius * 0.5, -radius * 1.8], [radius * 0.6, -radius * 1.3]],
    // Right flowing locks
    [[radius * 0.5, -radius * 0.9], [radius * 1.3, -radius * 1.3], [radius * 0.9, -radius * 0.5]],
    [[radius * 0.7, -radius * 0.4], [radius * 1.4, -radius * 0.6], [radius * 0.85, 0]]
  ];

  hairLocks.forEach(pts => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 5. Majestic Ivory Dragon Horn (Antler with branches on top-right)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(radius * 0.35, -radius * 0.75);
  ctx.quadraticCurveTo(radius * 0.85, -radius * 1.45, radius * 1.4, -radius * 1.25);
  ctx.quadraticCurveTo(radius * 1.0, -radius * 0.9, radius * 0.55, -radius * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Branch prong on horn
  ctx.beginPath();
  ctx.moveTo(radius * 0.8, -radius * 1.15);
  ctx.quadraticCurveTo(radius * 1.15, -radius * 1.55, radius * 1.3, -radius * 1.5);
  ctx.lineTo(radius * 0.95, -radius * 1.1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Horn textured segment ridges
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const frac = 0.55 + i * 0.18;
    ctx.beginPath();
    ctx.moveTo(radius * frac, -radius * (0.8 + i * 0.12));
    ctx.lineTo(radius * (frac + 0.15), -radius * (0.95 + i * 0.12));
    ctx.stroke();
  }

  // 6. Facial Features (Left stoic human side)
  // Left Eyebrow & Stoic Eye
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(radius * 0.12, -radius * 0.22);
  ctx.quadraticCurveTo(radius * 0.32, -radius * 0.32, radius * 0.52, -radius * 0.2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(radius * 0.32, -radius * 0.08, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(radius * 0.34, -radius * 0.1, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Nose contour
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.05);
  ctx.lineTo(radius * 0.08, radius * 0.1);
  ctx.lineTo(-radius * 0.02, radius * 0.14);
  ctx.stroke();

  // Determined mouth line
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-radius * 0.15, radius * 0.28);
  ctx.lineTo(radius * 0.25, radius * 0.26);
  ctx.stroke();

  // 7. Emerald Dragon Scales Half-Mask & Glowing Slit Eye on the Right Side
  // Scale Mask Base
  const scaleGrad = ctx.createLinearGradient(-radius * 0.9, -radius * 0.4, 0, radius * 0.4);
  scaleGrad.addColorStop(0, '#047857');
  scaleGrad.addColorStop(0.5, '#10b981');
  scaleGrad.addColorStop(1, '#34d399');
  ctx.fillStyle = scaleGrad;

  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.6);
  ctx.quadraticCurveTo(-radius * 0.8, -radius * 0.7, -radius * 0.9, -radius * 0.1);
  ctx.quadraticCurveTo(-radius * 0.95, radius * 0.4, -radius * 0.4, radius * 0.45);
  ctx.quadraticCurveTo(-radius * 0.1, radius * 0.2, 0, -radius * 0.1);
  ctx.closePath();
  ctx.fill();

  // Individual dragon scales texture
  ctx.strokeStyle = 'rgba(6, 78, 59, 0.65)';
  ctx.lineWidth = 1;
  const scales = [
    [-radius * 0.3, -radius * 0.45],
    [-radius * 0.6, -radius * 0.4],
    [-radius * 0.75, -radius * 0.1],
    [-radius * 0.65, radius * 0.15],
    [-radius * 0.45, radius * 0.3],
    [-radius * 0.25, radius * 0.15]
  ];
  scales.forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 3.5, 0, Math.PI);
    ctx.stroke();
  });

  // Dragon Armor Eyebrow Plate
  ctx.fillStyle = '#065f46';
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.3);
  ctx.lineTo(-radius * 0.55, -radius * 0.42);
  ctx.lineTo(-radius * 0.8, -radius * 0.25);
  ctx.lineTo(-radius * 0.5, -radius * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Glowing Dragon Slit Eye (Mắt Rồng Hoàng Kim Rực Sáng)
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.42, -radius * 0.12, 6.5, 4, -Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();

  // Slit pupil
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.42, -radius * 0.12, 1.4, 3.8, -Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  // 8. Scaled Dragon Arm (Left Arm reaching forward gripping handle)
  const armGrad = ctx.createLinearGradient(-radius * 0.8, radius * 0.3, -radius * 0.4, radius * 0.8);
  armGrad.addColorStop(0, '#0f766e');
  armGrad.addColorStop(0.5, '#14b8a6');
  armGrad.addColorStop(1, '#5eead4');
  ctx.fillStyle = armGrad;
  ctx.strokeStyle = '#115e59';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(-radius * 0.7, radius * 0.4);
  ctx.quadraticCurveTo(-radius * 1.15, radius * 0.6, -radius * 0.95, radius * 0.85);
  ctx.lineTo(-radius * 0.65, radius * 0.75);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dragon Clawed Hand
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(-radius * 0.95, radius * 0.82, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Claw tips
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-radius * 1.05, radius * 0.8);
  ctx.lineTo(-radius * 1.15, radius * 0.85);
  ctx.lineTo(-radius * 1.02, radius * 0.9);
  ctx.fill();

  ctx.restore();
}

/**
 * Render dây câu và lưỡi câu bay/kéo/đập tường cho skill [MÓC LƯỠI] của Cần Câu
 */
export function drawFishingHookAndLine(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  hookX: number,
  hookY: number,
  state: 'throwing' | 'pulling' | 'smashing',
  ownerRole: string | null,
  now: number
) {
  ctx.save();

  const isSoTan = ownerRole === 'sotan';
  const isBaThuong = ownerRole === 'bathuong';

  // Determine line & aura styling based on Role
  let lineCol = '#e2e8f0';
  let hookCol = '#94a3b8';
  let glowCol = 'rgba(255, 255, 255, 0.4)';

  if (isSoTan) {
    lineCol = '#facc15';
    hookCol = '#fef08a';
    glowCol = 'rgba(250, 204, 21, 0.8)';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 14;
  } else if (isBaThuong) {
    lineCol = '#34d399';
    hookCol = '#a7f3d0';
    glowCol = 'rgba(52, 211, 153, 0.8)';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 16;
  }

  // 1. Dynamic curved fishing line with physics sag/tension
  const midX = (ballX + hookX) / 2;
  const sag = state === 'pulling' ? Math.sin(now * 0.05) * 4 : Math.sin(now * 0.02) * 16 + 10;
  const midY = (ballY + hookY) / 2 + sag;

  // Outer glowing glow line if active skill
  ctx.strokeStyle = glowCol;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(ballX, ballY - 14);
  ctx.quadraticCurveTo(midX, midY, hookX, hookY);
  ctx.stroke();

  // Core taut fishing wire
  ctx.strokeStyle = lineCol;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(ballX, ballY - 14);
  ctx.quadraticCurveTo(midX, midY, hookX, hookY);
  ctx.stroke();

  // 2. Bobber Float on line midpoint
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(midX, midY, 4, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(midX, midY, 4, 0, Math.PI);
  ctx.fill();

  // 3. Steel Barbed Hook at (hookX, hookY)
  ctx.save();
  ctx.translate(hookX, hookY);
  const hookAngle = Math.atan2(hookY - (ballY - 14), hookX - ballX);
  ctx.rotate(hookAngle);

  // Hook Eyelet
  ctx.strokeStyle = hookCol;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(-8, 0, 3, 0, Math.PI * 2);
  ctx.stroke();

  // Hook Shank & Curved Barb
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.lineTo(4, 0);
  ctx.arc(4, 5, 5, -Math.PI / 2, Math.PI / 2, false);
  ctx.lineTo(-2, 10);
  ctx.stroke();

  // Sharp barb point
  ctx.fillStyle = hookCol;
  ctx.beginPath();
  ctx.moveTo(-2, 10);
  ctx.lineTo(1, 7);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();

  // Latch Flash Spark if pulling
  if (state === 'pulling' || state === 'smashing') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  ctx.restore();
}

/**
 * Vẽ đầu Thanh Long khổng lồ giáng thế (Long Ngẩng Đầu)
 */
export function drawQinglongHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  alpha: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 25;

  // Dragon Mane / Hair (Lông bờm rồng xanh biếc)
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.moveTo(-60, -40);
  ctx.quadraticCurveTo(-90, -70, -40, -60);
  ctx.quadraticCurveTo(-20, -100, 10, -65);
  ctx.quadraticCurveTo(50, -90, 45, -45);
  ctx.quadraticCurveTo(80, -30, 50, 0);
  ctx.quadraticCurveTo(-20, 20, -60, -40);
  ctx.fill();

  // Dragon Horns (Cặp sừng rồng ngọc)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-25, -50);
  ctx.quadraticCurveTo(-50, -110, -70, -95);
  ctx.lineTo(-40, -60);
  ctx.moveTo(15, -50);
  ctx.quadraticCurveTo(35, -110, 60, -95);
  ctx.lineTo(25, -60);
  ctx.fill();
  ctx.stroke();

  // Dragon Snout & Head (Đầu Rồng Xanh Lục Bảo)
  const headGrad = ctx.createLinearGradient(-40, -40, 40, 40);
  headGrad.addColorStop(0, '#10b981');
  headGrad.addColorStop(0.6, '#047857');
  headGrad.addColorStop(1, '#064e3b');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.moveTo(-45, -30);
  ctx.lineTo(45, -30);
  ctx.quadraticCurveTo(60, 10, 35, 45);
  ctx.lineTo(-35, 45);
  ctx.quadraticCurveTo(-60, 10, -45, -30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Glowing Golden Dragon Eyes (Mắt Rồng Hoàng Kim)
  ctx.fillStyle = '#fde047';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(-20, -5, 7, 0, Math.PI * 2);
  ctx.arc(20, -5, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-20, -5, 3, 0, Math.PI * 2);
  ctx.arc(20, -5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Whiskers (Râu rồng uốn lượn)
  const whiskerWave = Math.sin(now * 0.01) * 10;
  ctx.strokeStyle = '#a7f3d0';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-30, 25);
  ctx.bezierCurveTo(-70, 30, -90, 60 + whiskerWave, -110, 80);
  ctx.moveTo(30, 25);
  ctx.bezierCurveTo(70, 30, 90, 60 - whiskerWave, 110, 80);
  ctx.stroke();

  // Sharp Fangs (Răng nanh rồng)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-18, 42);
  ctx.lineTo(-14, 56);
  ctx.lineTo(-10, 42);
  ctx.moveTo(10, 42);
  ctx.lineTo(14, 56);
  ctx.lineTo(18, 42);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ luồng Thanh Long bơi ngang đập vào tường (Du Long Bái Vĩ)
 */
export function drawDragonWave(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  vx: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  const dir = vx >= 0 ? 1 : -1;
  ctx.scale(dir, 1);

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 12;

  // Serpentine dragon body
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
  ctx.lineWidth = radius * 0.9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-radius * 2, Math.sin(now * 0.02) * 6);
  ctx.quadraticCurveTo(-radius, Math.sin(now * 0.02 + 1) * -6, 0, 0);
  ctx.stroke();

  // Dragon Head
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(radius * 0.3, -radius * 0.3, radius * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ máy khoan lốc xoáy (Ngọa Long Phiên Đăng)
 */
export function drawDrillVortex(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  angle: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.shadowColor = '#34d399';
  ctx.shadowBlur = 15;

  // Spiral conical drill blade blades
  const bladeCount = 4;
  for (let i = 0; i < bladeCount; i++) {
    const a = (i * Math.PI * 2) / bladeCount;
    ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#059669';
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (radius + 14), Math.sin(a) * (radius + 14));
    ctx.lineTo(Math.cos(a + 0.6) * (radius - 2), Math.sin(a + 0.6) * (radius - 2));
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
  }

  // Glowing center drill tip
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ mũi khoan năng lượng xanh lá bay thẳng (Ngọa Long Mũi Khoan)
 */
export function drawDrillProjectile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  const angle = Math.atan2(vy, vx);
  ctx.rotate(angle);

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 14;

  // Drill cone
  const grad = ctx.createLinearGradient(-15, 0, 15, 0);
  grad.addColorStop(0, '#047857');
  grad.addColorStop(0.7, '#10b981');
  grad.addColorStop(1, '#a7f3d0');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -7);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-12, 7);
  ctx.closePath();
  ctx.fill();

  // Spiral threads
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-4, -6);
  ctx.lineTo(4, 6);
  ctx.moveTo(4, -5);
  ctx.lineTo(12, 3);
  ctx.stroke();

  ctx.restore();
}

/**
 * Vẽ tuyệt kỹ Hán Thất Nghiêm Đông của Lưu Bị (2 Đại Cự Kiếm Hỏa & Băng)
 */
export function drawLuuBeiDualBladeSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: 'fire' | 'ice' | 'finish',
  progress: number,
  angle: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const alpha = Math.max(0, 1 - progress);
  ctx.globalAlpha = alpha;

  if (type === 'fire') {
    // Great Flame Sword Slash (Hỏa Kiếm)
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 24;

    const swordLen = 90 + progress * 40;
    const fireGrad = ctx.createLinearGradient(0, -swordLen, 0, 0);
    fireGrad.addColorStop(0, '#ffedd5');
    fireGrad.addColorStop(0.3, '#f97316');
    fireGrad.addColorStop(0.8, '#dc2626');
    fireGrad.addColorStop(1, '#7f1d1d');

    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.moveTo(0, -swordLen);
    ctx.lineTo(16, -20);
    ctx.lineTo(6, 0);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-16, -20);
    ctx.closePath();
    ctx.fill();

    // Fiery Flame Trail Arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6 * (1 - progress);
    ctx.beginPath();
    ctx.arc(0, 0, swordLen * 0.7, -Math.PI * 0.7, Math.PI * 0.2);
    ctx.stroke();
  } else if (type === 'ice') {
    // Great Frost Ice Sword Slash (Băng Kiếm)
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 24;

    const swordLen = 90 + progress * 40;
    const iceGrad = ctx.createLinearGradient(0, -swordLen, 0, 0);
    iceGrad.addColorStop(0, '#ffffff');
    iceGrad.addColorStop(0.3, '#38bdf8');
    iceGrad.addColorStop(0.8, '#0284c7');
    iceGrad.addColorStop(1, '#0c4a6e');

    ctx.fillStyle = iceGrad;
    ctx.beginPath();
    ctx.moveTo(0, -swordLen);
    ctx.lineTo(14, -25);
    ctx.lineTo(5, 0);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-14, -25);
    ctx.closePath();
    ctx.fill();

    // Ice Shard Crystals & Frost Arc
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 6 * (1 - progress);
    ctx.beginPath();
    ctx.arc(0, 0, swordLen * 0.7, -Math.PI * 0.2, Math.PI * 0.7);
    ctx.stroke();
  } else {
    // Grand Finish: Dual Flame & Ice Cross Eruption (Hỏa Băng Song Kiếm Hợp Bích)
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 30;

    const len = 110 + progress * 60;

    // Fire Blade (Left Cross)
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 10 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(-len * 0.7, -len * 0.7);
    ctx.lineTo(len * 0.7, len * 0.7);
    ctx.stroke();

    // Ice Blade (Right Cross)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 10 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(len * 0.7, -len * 0.7);
    ctx.lineTo(-len * 0.7, len * 0.7);
    ctx.stroke();

    // Center Fusion Shockwave
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 25 * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Hiệu ứng Vùng Biển Lửa & Phân thân phóng to thu nhỏ của Sở Tân Điếu
 */
export function drawSoTanDieuDomain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  durationProgress: number
) {
  ctx.save();
  // 1. Blazing Hellfire Domain Filter
  const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.75);
  grad.addColorStop(0, 'rgba(239, 68, 68, 0.18)');
  grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
  grad.addColorStop(1, 'rgba(185, 28, 28, 0.45)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Animated Flame Pillars & Floor Embers
  const numEmbers = 16;
  for (let i = 0; i < numEmbers; i++) {
    const angle = (i / numEmbers) * Math.PI * 2 + now * 0.0015;
    const dist = 140 + Math.sin(now * 0.003 + i) * 60;
    const ex = width / 2 + Math.cos(angle) * dist;
    const ey = height / 2 + Math.sin(angle) * dist;
    const scale = 1 + Math.sin(now * 0.006 + i * 2) * 0.5;

    ctx.save();
    ctx.translate(ex, ey);
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 18;
    ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 7 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 3. Blazing Ground Runes
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(now * 0.001);
  ctx.strokeStyle = 'rgba(251, 146, 60, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, Math.PI * 2);
  ctx.stroke();

  // Hexagram Runes
  for (let j = 0; j < 6; j++) {
    const a1 = (j / 6) * Math.PI * 2;
    const a2 = ((j + 2) / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a1) * 160, Math.sin(a1) * 160);
    ctx.lineTo(Math.cos(a2) * 160, Math.sin(a2) * 160);
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ các phân thân của Sở Tân phóng to thu nhỏ bao vây trong 7.5s
 */
export function drawSoTanDieuClones(
  ctx: CanvasRenderingContext2D,
  targetX: number,
  targetY: number,
  now: number
) {
  ctx.save();
  const cloneCount = 8;
  for (let i = 0; i < cloneCount; i++) {
    const baseAngle = (i / cloneCount) * Math.PI * 2;
    const waveOffset = i * (Math.PI / 4);
    // Phóng to thu nhỏ liên tục (scale từ 0.4 đến 2.0)
    const scale = 1.1 + Math.sin(now * 0.008 + waveOffset) * 0.7;
    const orbitDist = 95 + Math.cos(now * 0.005 + waveOffset) * 45;

    const cx = targetX + Math.cos(baseAngle + now * 0.002) * orbitDist;
    const cy = targetY + Math.sin(baseAngle + now * 0.002) * orbitDist;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.globalAlpha = 0.65 + Math.sin(now * 0.01 + waveOffset) * 0.25;

    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 16;

    // Cyan/Teal Phantom Clone Ball
    ctx.fillStyle = '#0891b2';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Phantom Rod held by clone
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(24, -20);
    ctx.stroke();

    ctx.restore();
  }
  ctx.restore();
}

/**
 * Đường chém cực to siêu hoành tráng của 50 nhát Sở Tân Điếu
 */
export function drawMegaSlashLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
  color: string,
  createdAt: number,
  now: number,
  duration = 260
) {
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;

  // Outer glow blade
  const grad = ctx.createLinearGradient(-length / 2, 0, length / 2, 0);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  grad.addColorStop(0.15, color);
  grad.addColorStop(0.5, '#ffffff');
  grad.addColorStop(0.85, color);
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, length / 2, width / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Core white incandescent slash line
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 0, length * 0.45, width * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spark burst particles along the cut line
  for (let i = -2; i <= 2; i++) {
    const px = (i / 2) * (length * 0.35);
    const py = (Math.random() - 0.5) * width;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Hiệu ứng Cầu Lửa Long Hồn Đoạn Hải (Tồn tại 5s, đốt máu liên tục 5 DMG/0.2s)
 */
export function drawLongHonFireOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  createdAt: number,
  expiresAt: number,
  now: number
) {
  const totalDuration = expiresAt - createdAt;
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > totalDuration) return;

  const timeLeftRatio = Math.max(0, (expiresAt - now) / totalDuration);
  const pulse = Math.sin(now * 0.015) * 4;
  const currentRadius = radius + pulse;

  ctx.save();
  ctx.translate(x, y);

  // 1. Outer Inferno Radial Glow & Heat Distortion Field
  const outerGrad = ctx.createRadialGradient(0, 0, currentRadius * 0.2, 0, 0, currentRadius * 1.5);
  outerGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
  outerGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.7)');
  outerGrad.addColorStop(0.65, 'rgba(220, 38, 38, 0.4)');
  outerGrad.addColorStop(1, 'rgba(127, 29, 29, 0)');

  ctx.fillStyle = outerGrad;
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 1.5, 0, Math.PI * 2);
  ctx.fill();

  // 2. Swirling Solar Flares / Fire Tendrils around Orb
  const numTendrils = 8;
  for (let i = 0; i < numTendrils; i++) {
    const angle = (i / numTendrils) * Math.PI * 2 + (now * 0.003 * (i % 2 === 0 ? 1 : -1));
    const flareLen = currentRadius * (1.1 + Math.sin(now * 0.01 + i) * 0.25);
    const fx = Math.cos(angle) * flareLen;
    const fy = Math.sin(angle) * flareLen;

    ctx.strokeStyle = i % 2 === 0 ? 'rgba(251, 146, 60, 0.75)' : 'rgba(239, 68, 68, 0.65)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * (currentRadius * 0.4), Math.sin(angle) * (currentRadius * 0.4));
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.4) * (flareLen * 0.8),
      Math.sin(angle + 0.4) * (flareLen * 0.8),
      fx,
      fy
    );
    ctx.stroke();
  }

  // 3. Dense Magma Core Sphere
  ctx.shadowColor = '#ea580c';
  ctx.shadowBlur = 24;

  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, currentRadius * 0.75);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.2, '#fef08a');
  coreGrad.addColorStop(0.5, '#f97316');
  coreGrad.addColorStop(0.85, '#dc2626');
  coreGrad.addColorStop(1, '#7f1d1d');

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 0.75, 0, Math.PI * 2);
  ctx.fill();

  // 4. White Incandescent Heart
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // 5. 5s Countdown Progress Ring (Vòng đếm thời gian 5s xung quanh)
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 1.15, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * timeLeftRatio);
  ctx.stroke();
  ctx.setLineDash([]);

  // Floating status text
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`🔥 CẦU LỬA: ${(Math.max(0, (expiresAt - now) / 1000)).toFixed(1)}s (5 DMG/0.2s)`, 0, -currentRadius * 1.3);

  ctx.restore();
}

/**
 * Hiệu ứng Cột Lửa Long Hồn Đoạn Hải (Bùng nổ sau 5s, đốt cực nhanh 2.5 DMG/0.035s)
 */
export function drawLongHonFirePillar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  createdAt: number,
  expiresAt: number,
  now: number
) {
  const totalDuration = expiresAt - createdAt;
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > totalDuration) return;

  const progress = elapsed / totalDuration;
  const alpha = Math.max(0, 1 - progress * 0.4);

  ctx.save();
  ctx.globalAlpha = alpha;

  const pulse = Math.sin(now * 0.04) * 6;
  const pillarWidth = (radius * 1.6 + pulse) * (progress < 0.1 ? progress / 0.1 : (1 - progress * 0.2));

  // 1. Towering Ground-to-Sky Blazing Column
  const pillarGrad = ctx.createLinearGradient(x - pillarWidth / 2, 0, x + pillarWidth / 2, 0);
  pillarGrad.addColorStop(0, 'rgba(185, 28, 28, 0)');
  pillarGrad.addColorStop(0.2, 'rgba(239, 68, 68, 0.7)');
  pillarGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.95)');
  pillarGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.7)');
  pillarGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');

  ctx.fillStyle = pillarGrad;
  ctx.fillRect(x - pillarWidth / 2, 0, pillarWidth, 600);

  // 2. White-Hot Incandescent Core Beam
  const coreWidth = pillarWidth * 0.35;
  const coreGrad = ctx.createLinearGradient(x - coreWidth / 2, 0, x + coreWidth / 2, 0);
  coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.3)');
  coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  coreGrad.addColorStop(1, 'rgba(254, 240, 138, 0.3)');

  ctx.fillStyle = coreGrad;
  ctx.fillRect(x - coreWidth / 2, 0, coreWidth, 600);

  // 3. Ground Caldera Shockwave Base (Chân cột lửa bùng nổ)
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, 0.45);
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 30;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.5 + Math.sin(now * 0.03) * 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 4. Helical Rising Plasma Vortex Arcs
  const numHelices = 6;
  for (let i = 0; i < numHelices; i++) {
    const helixOffset = (i / numHelices) * Math.PI * 2;
    ctx.strokeStyle = i % 2 === 0 ? '#fef08a' : '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let py = 0; py <= 600; py += 30) {
      const hAngle = (py * 0.02) + (now * 0.01) + helixOffset;
      const hx = x + Math.sin(hAngle) * (pillarWidth * 0.45);
      if (py === 0) ctx.moveTo(hx, py);
      else ctx.lineTo(hx, py);
    }
    ctx.stroke();
  }

  // Floating Status Label
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`🌋 CỘT LỬA LONG HỒN (2.5 DMG/0.035s)`, x, y - radius - 18);

  ctx.restore();
}

/**
 * Vẽ Hắc Long cuồn cuộn bay theo Bá Thường trong kỹ năng Long Hồn Đoạn Hải
 */
export function drawHacLongFollower(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  trailPoints: { x: number; y: number }[],
  now: number
) {
  ctx.save();

  // Draw Dragon Body along the trail
  if (trailPoints.length > 2) {
    ctx.shadowColor = '#0f172a';
    ctx.shadowBlur = 24;

    for (let i = trailPoints.length - 1; i >= 0; i--) {
      const pt = trailPoints[i];
      const prog = i / trailPoints.length; // 1 at head, 0 at tail
      const segRadius = 14 + prog * 18;

      // Dark Obsidian & Void Purple Gradient for Hắc Long
      const segGrad = ctx.createRadialGradient(pt.x, pt.y, 2, pt.x, pt.y, segRadius);
      segGrad.addColorStop(0, '#334155');
      segGrad.addColorStop(0.4, '#0f172a');
      segGrad.addColorStop(0.8, '#020617');
      segGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = segGrad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, segRadius, 0, Math.PI * 2);
      ctx.fill();

      // Dragon Scale Sparks & Glowing Spine Spikes
      if (i % 2 === 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y - segRadius * 0.6, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Draw Majestic Hắc Long Head near the Ball
  ctx.save();
  ctx.translate(ballX, ballY - 20);

  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 30;

  // Hắc Long Horns (Sừng Hắc Long màu đen tuyền viền lam)
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-15, -15);
  ctx.quadraticCurveTo(-35, -45, -50, -38);
  ctx.moveTo(15, -15);
  ctx.quadraticCurveTo(35, -45, 50, -38);
  ctx.stroke();

  // Head Silhouette
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Blazing Blue / Gold Eyes (Mắt Hắc Long Rực Sáng)
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(-9, -4, 4.5, 2.5, -0.2, 0, Math.PI * 2);
  ctx.ellipse(9, -4, 4.5, 2.5, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-9, -4, 1.5, 0, Math.PI * 2);
  ctx.arc(9, -4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Dragon Whiskers (Râu Rồng Hắc Long)
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, 6);
  ctx.quadraticCurveTo(-40, 20 + Math.sin(now * 0.01) * 8, -60, 10);
  ctx.moveTo(15, 6);
  ctx.quadraticCurveTo(40, 20 + Math.sin(now * 0.01) * 8, 60, 10);
  ctx.stroke();

  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng Cutscene Bôi Máu Lên Cần Câu của Bá Thường
 */
export function drawLongHonDoanHaiCutscene(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  now: number,
  startTime: number
) {
  const elapsed = now - startTime;
  ctx.save();
  ctx.translate(ballX, ballY);

  // Cinematic Letterbox & Dark Vignette
  ctx.shadowColor = '#0284c7';
  ctx.shadowBlur = 35;

  // Blue Aura Field
  const pulse = Math.sin(now * 0.01) * 6;
  const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80 + pulse);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(0.6, 'rgba(14, 116, 144, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // Glowing Dragon Hand Smearing Dragon Blood on Fishing Rod
  // Rod
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-45, 45);
  ctx.lineTo(45, -45);
  ctx.stroke();

  // Blood smear animation traveling up the rod
  const smearProg = Math.min(1, elapsed / 1200);
  const bloodX = -45 + 90 * smearProg;
  const bloodY = 45 - 90 * smearProg;

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-45, 45);
  ctx.lineTo(bloodX, bloodY);
  ctx.stroke();

  // Dragon Hand & Blood Droplets
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(bloodX, bloodY, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(bloodX + 4, bloodY - 4, 5, 0, Math.PI * 2);
  ctx.fill();

  // Reel & Spool Glow (Trục máy câu phóng to rực lửa lam)
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(-20, 20, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-20, 20, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Hiệu ứng hiển thị Dummy Sandbox & Bộ đếm Tổng Sát Thương
 */
export function drawSandboxDummyInfo(
  ctx: CanvasRenderingContext2D,
  dummyX: number,
  dummyY: number,
  dummyRadius: number,
  totalDmg: number,
  dps: number,
  now: number
) {
  ctx.save();

  // 1. Glowing Target Platform beneath Dummy
  ctx.save();
  ctx.translate(dummyX, dummyY + dummyRadius + 6);
  ctx.scale(1, 0.4);
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, dummyRadius * 1.6 + Math.sin(now * 0.005) * 3, 0, Math.PI * 2);
  ctx.stroke();

  // Target Crosshairs
  ctx.beginPath();
  ctx.moveTo(-dummyRadius * 1.8, 0);
  ctx.lineTo(dummyRadius * 1.8, 0);
  ctx.moveTo(0, -dummyRadius * 1.8);
  ctx.lineTo(0, dummyRadius * 1.8);
  ctx.stroke();
  ctx.restore();

  // 2. Infinity HP Shield / Hologram Badge over Dummy
  ctx.save();
  ctx.translate(dummyX, dummyY);
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 18;

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('∞ HP', 0, -2);
  ctx.restore();

  // 3. Floating Damage Board above Dummy
  const boardY = dummyY - dummyRadius - 42;
  const boardWidth = 190;
  const boardHeight = 54;

  ctx.save();
  ctx.translate(dummyX, boardY);

  // Background card
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(-boardWidth / 2, -boardHeight / 2, boardWidth, boardHeight, 10);
  ctx.fill();
  ctx.stroke();

  // Total DMG text
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f87171';
  ctx.fillText(`TỔNG SÁT THƯƠNG: ${totalDmg.toLocaleString()}`, 0, -8);

  // DPS & Reset instruction
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`DPS: ${dps.toLocaleString()}/s  •  [Click để Reset]`, 0, 12);

  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ ngoại hình & 3 thanh Katana của Zoro (Tam Kiếm - Santoryu) trên quả bóng
 */
export function drawTamKiemZoroAvatar(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  radius: number,
  isPlayer: boolean,
  recoil: number,
  now: number
) {
  ctx.save();
  ctx.translate(ballX, ballY);

  // 1. Asura Demon Aura (Khí tức Quỷ Thần Asura 9 kiếm)
  const auraPulse = Math.sin(now * 0.012) * 2.5;
  const auraRad = radius + 8 + auraPulse;
  const grad = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, auraRad);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // Emerald Green
  grad.addColorStop(0.5, 'rgba(147, 51, 234, 0.35)'); // Haoshoku Haki Purple
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, auraRad, 0, Math.PI * 2);
  ctx.fill();

  // 2. Zoro Pirate Dark Green Bandana (Khăn rằn hải tặc quấn đầu)
  ctx.fillStyle = '#14532d'; // Dark forest green
  ctx.beginPath();
  ctx.arc(0, -radius * 0.2, radius * 0.95, Math.PI * 1.05, Math.PI * 1.95, false);
  ctx.lineTo(radius * 0.85, -radius * 0.2);
  ctx.lineTo(-radius * 0.85, -radius * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#22c55e'; // Green highlight
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Bandana side knot
  const knotX = isPlayer ? -radius * 0.85 : radius * 0.85;
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(knotX, -radius * 0.35, 4, 0, Math.PI * 2);
  ctx.fill();
  // Bandana cloth tails
  ctx.beginPath();
  ctx.moveTo(knotX, -radius * 0.35);
  ctx.quadraticCurveTo(knotX + (isPlayer ? -8 : 8), -radius * 0.1, knotX + (isPlayer ? -12 : 12), radius * 0.2);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#14532d';
  ctx.stroke();

  // 3. Zoro Left Eye Scar (Vết sẹo dọc mắt trái)
  const eyeL_X = -5;
  const eyeR_X = 5;
  const eyeY = 0;

  // Left Eye Scar line
  ctx.strokeStyle = '#7f1d1d'; // Blood crimson
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(eyeL_X, eyeY - 7);
  ctx.lineTo(eyeL_X, eyeY + 7);
  ctx.stroke();

  // Left Eye (Closed with scar)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(eyeL_X - 3, eyeY);
  ctx.lineTo(eyeL_X + 3, eyeY);
  ctx.stroke();

  // Right Eye (Gleaming demonic red / fierce focus)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(eyeR_X, eyeY, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeR_X + (isPlayer ? 0.8 : -0.8), eyeY - 0.8, 1, 0, Math.PI * 2);
  ctx.fill();

  // 4. MOUTH KATANA: Wado Ichimonji (Hòa Đạo Nhất Văn Tự)
  // Ngậm ngang miệng, chuôi trắng tinh khôi, lưỡi vươn dài
  const mouthY = radius * 0.45;
  const mouthDir = isPlayer ? 1 : -1;
  ctx.save();
  // White hilt held in mouth
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-6, mouthY - 2.5, 12, 5);
  ctx.strokeStyle = '#f59e0b'; // Gold guard
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-6, mouthY - 2.5, 12, 5);

  // Pure white/silver Katana blade pointing forward
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(mouthDir * 6, mouthY - 2);
  ctx.lineTo(mouthDir * (6 + 28), mouthY - 1.2);
  ctx.lineTo(mouthDir * (6 + 32), mouthY); // sharp tip
  ctx.lineTo(mouthDir * (6 + 28), mouthY + 1.2);
  ctx.lineTo(mouthDir * 6, mouthY + 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#38bdf8'; // Blue razor glow
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // 5. LEFT HAND KATANA: Sandai Kitetsu (Tam Thế Quỷ Triệt - Vỏ đỏ đen quỷ kiếm)
  const recoilL = recoil > 0.5 ? -8 : 0;
  ctx.save();
  ctx.translate(-radius * 0.9, -radius * 0.2 + recoilL);
  ctx.rotate((-35 * Math.PI) / 180 + Math.sin(now * 0.01) * 0.1);
  // Red & black hilt
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-3, 0, 6, 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-4, -2, 8, 3);
  // Silver blade with crimson flame aura
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-2, -30, 4, 28);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-2, -30, 4, 28);
  ctx.restore();

  // 6. RIGHT HAND KATANA: Enma (Diêm Ma - Tím đen Haki Bá Vương)
  const recoilR = recoil > 0 && recoil <= 0.5 ? -8 : 0;
  ctx.save();
  ctx.translate(radius * 0.9, -radius * 0.2 + recoilR);
  ctx.rotate((35 * Math.PI) / 180 - Math.sin(now * 0.01) * 0.1);
  // Purple & gold hilt
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(-3, 0, 6, 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-4, -2, 8, 3);
  // Silver blade with purple flame aura
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-2, -30, 4, 28);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-2, -30, 4, 28);
  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng Tuyệt Kỹ Tam Thiên Thế Giới (Santoryu: Sanzen Sekai)
 * Cơn lốc xoáy 3 lưỡi kiếm xé toạc không gian
 */
export function drawSanzenSekaiVortex(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rotSpeed = now * 0.035; // Fast whirling blades
  const swordColors = ['#38bdf8', '#ef4444', '#c084fc']; // Wado, Kitetsu, Enma

  // 3 spinning blade arcs
  for (let i = 0; i < 3; i++) {
    const angle = rotSpeed + (i * Math.PI * 2) / 3;
    ctx.save();
    ctx.rotate(angle);

    // Whirling blade trail
    const grad = ctx.createLinearGradient(0, 0, radius * 2.2, 0);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.5, swordColors[i]);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.6, 0, Math.PI * 0.65);
    ctx.stroke();

    // Katana silhouette in vortex
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(radius * 0.4, -2, radius * 1.2, 4);
    ctx.strokeStyle = swordColors[i];
    ctx.lineWidth = 2;
    ctx.strokeRect(radius * 0.4, -2, radius * 1.2, 4);
    ctx.restore();
  }

  // Center Spatial Shockwave
  const pulse = Math.sin(now * 0.02) * 6;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.2 + pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Hiệu ứng Đại Lốc Xoáy Rồng Ba Kiếm (Kokujo: O Tatsumaki)
 */
export function drawTatsumakiDragon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rot = now * 0.02;
  const layers = 5;

  for (let i = 0; i < layers; i++) {
    const layerRad = radius * (0.4 + (i / layers) * 0.9);
    const layerAngle = rot + (i * Math.PI) / 3;

    ctx.save();
    ctx.rotate(layerAngle);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(147, 51, 234, 0.7)';
    ctx.lineWidth = 3 + i * 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, layerRad, 0, Math.PI * 1.4);
    ctx.stroke();

    // Dragon Wind Claws
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(layerRad, 0, 3 + i, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Dragon Eye Glowing in center
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ Tam Kiếm Khí (3 luồng kiếm khí phóng đi cùng lúc)
 */
export function drawTamKiemSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const colors = ['#38bdf8', '#ef4444', '#c084fc'];
  const offsets = [-7, 0, 7];

  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.translate(0, offsets[i]);

    // Outer aura
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-radius * 0.8, 0, radius, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.stroke();

    // Core sharp blade light
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-radius * 0.8, 0, radius, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// PHI THIÊN VÔ CỰC ĐIẾU - TỐI CAO ÁO NGHĨA
// ----------------------------------------------------
export function drawPhiThienVoCucTornado(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  ringsRot: number[],
  tornadoAngle: number,
  now: number
) {
  ctx.save();
  ctx.translate(centerX, centerY);

  const rainbowColors = [
    '#ef4444', '#f97316', '#facc15', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'
  ];

  // 1. Heavenly Light Pillar (Cột sáng thiên giới từ trời giáng xuống tâm)
  const pillarGrad = ctx.createLinearGradient(0, -250, 0, 80);
  pillarGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  pillarGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.25)');
  pillarGrad.addColorStop(0.7, 'rgba(236, 72, 153, 0.3)');
  pillarGrad.addColorStop(1, 'rgba(250, 204, 21, 0.45)');
  ctx.fillStyle = pillarGrad;
  ctx.fillRect(-35, -250, 70, 330);

  // Expanding shockwave ripples
  for (let s = 0; s < 3; s++) {
    const sPhase = ((now * 0.002 + s * 0.33) % 1);
    const sRadius = sPhase * 240;
    const sAlpha = (1 - sPhase) * 0.6;
    ctx.strokeStyle = `rgba(244, 63, 94, ${sAlpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, sRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Van Luan 9-Tier Rainbow Rings
  const radii = [28, 46, 64, 84, 106, 130, 156, 184, 216];
  for (let i = 0; i < 9; i++) {
    const r = radii[i];
    const rot = ringsRot[i] || (now * (0.001 + i * 0.0003) * (i % 2 === 0 ? 1 : -1));
    const col = rainbowColors[i % rainbowColors.length];

    ctx.save();
    ctx.rotate(rot);
    ctx.strokeStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred Runes & Magic Nodes
    const runesCount = 4 + i * 2;
    for (let k = 0; k < runesCount; k++) {
      const a = (k * Math.PI * 2) / runesCount;
      const rx = Math.cos(a) * r;
      const ry = Math.sin(a) * r;
      ctx.fillStyle = k % 2 === 0 ? '#ffffff' : col;
      ctx.beginPath();
      ctx.arc(rx, ry, k % 2 === 0 ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 3. Swirling Rainbow Tornado Whirlwind (Bão Lốc Xoáy Cầu Vồng hút chân không)
  ctx.save();
  ctx.rotate(tornadoAngle);
  const arms = 8;
  for (let arm = 0; arm < arms; arm++) {
    const baseA = (arm * Math.PI * 2) / arms;
    const col = rainbowColors[arm % rainbowColors.length];
    ctx.strokeStyle = col;
    ctx.lineWidth = 5;
    ctx.shadowColor = col;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    for (let dist = 8; dist < 240; dist += 10) {
      const spiralAngle = baseA + (dist * 0.038);
      const px = Math.cos(spiralAngle) * dist;
      const py = Math.sin(spiralAngle) * dist;
      if (dist === 8) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Swirling Inward Vacuum Particles
  for (let p = 0; p < 16; p++) {
    const pPhase = ((now * 0.0025 + p * 0.0625) % 1);
    const pDist = (1 - pPhase) * 230 + 10;
    const pAngle = p * 1.618 * Math.PI * 2 + now * 0.004;
    const px = Math.cos(pAngle) * pDist;
    const py = Math.sin(pAngle) * pDist;
    ctx.fillStyle = rainbowColors[p % rainbowColors.length];
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(px, py, 3.5 * pPhase + 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Four Sacred Beasts Spirit Manifestations at 4 Quadrants
  const beastRadius = 150;
  const beasts = [
    { icon: '🐉', name: 'THANH LONG', a: 0, color: '#10b981', ringCol: '#34d399' },
    { icon: '🐅', name: 'BẠCH HỔ', a: Math.PI * 0.5, color: '#f8fafc', ringCol: '#cbd5e1' },
    { icon: '🦅', name: 'CHU TƯỚC', a: Math.PI, color: '#ef4444', ringCol: '#f87171' },
    { icon: '🐢', name: 'HUYỀN VŨ', a: Math.PI * 1.5, color: '#06b6d4', ringCol: '#38bdf8' }
  ];
  for (const b of beasts) {
    const curA = b.a + now * 0.0018;
    const bx = Math.cos(curA) * beastRadius;
    const by = Math.sin(curA) * beastRadius;

    // Glowing aura disc behind beast
    ctx.save();
    ctx.fillStyle = b.ringCol + '33';
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(bx, by, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b.icon, bx, by);
    ctx.restore();
  }

  // 5. Center Radiant Prismatic Star Core
  ctx.save();
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();

  // Inner pulsing core
  const pulse = Math.sin(now * 0.01) * 4;
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 24 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 6. Majestic Skill Title Banner on Top
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#ec4899';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.roundRect(-140, -195, 280, 28, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#facc15';
  ctx.fillText('⚡ VẠN LUÂN QUY TÔNG • PHI THIÊN VÔ CỰC ĐIẾU ⚡', 0, -181);
  ctx.restore();

  ctx.restore();
}

// ----------------------------------------------------
// TOÁN THIÊN THẤU CHI ĐIẾU (MŨI KHOAN GĂM TƯỜNG)
// ----------------------------------------------------
export function drawToanThienDrill(
  ctx: CanvasRenderingContext2D,
  drillX: number,
  drillY: number,
  angle: number,
  rotAngle: number,
  isWallPinned: boolean,
  now: number
) {
  ctx.save();
  ctx.translate(drillX, drillY);
  ctx.rotate(angle);

  // 1. Wall Pin Friction & Cracks if pinned against border
  if (isWallPinned) {
    ctx.save();
    // Wall Shatter Cracks
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 16;
    for (let c = 0; c < 8; c++) {
      const crackAngle = (c * Math.PI * 2) / 8 + Math.sin(c * 1.5) * 0.3;
      const len = 35 + (c % 3) * 15;
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(35 + Math.cos(crackAngle) * len, Math.sin(crackAngle) * len);
      ctx.stroke();
    }

    // Heavy Friction Sparks Shower
    const sparkCount = 18;
    for (let sp = 0; sp < sparkCount; sp++) {
      const spA = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.9;
      const spDist = 15 + Math.random() * 45;
      const spX = 35 + Math.cos(spA) * spDist;
      const spY = Math.sin(spA) * spDist;
      ctx.fillStyle = sp % 2 === 0 ? '#facc15' : '#ef4444';
      ctx.beginPath();
      ctx.arc(spX, spY, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Divine Energy Chains binding victim to wall
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(35, -35);
    ctx.lineTo(10, 0);
    ctx.lineTo(35, 35);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // 2. Thruster Jet Cone & Vortex Behind Drill
  ctx.save();
  const jetGrad = ctx.createLinearGradient(-65, 0, -25, 0);
  jetGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
  jetGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.55)');
  jetGrad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');
  ctx.fillStyle = jetGrad;
  ctx.beginPath();
  ctx.moveTo(-65, -12);
  ctx.lineTo(-20, 0);
  ctx.lineTo(-65, 12);
  ctx.closePath();
  ctx.fill();

  // Spiral Vortex Rings behind
  for (let r = 0; r < 3; r++) {
    const rx = -30 - r * 14;
    const ry = 10 + r * 3;
    ctx.strokeStyle = r % 2 === 0 ? '#38bdf8' : '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(rx, 0, 4, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Spiral Drill Cone Body (6 Helical Flutes)
  ctx.save();
  ctx.shadowColor = isWallPinned ? '#ef4444' : '#f59e0b';
  ctx.shadowBlur = 24;

  const numFlutes = 6;
  for (let i = 0; i < numFlutes; i++) {
    const phase = rotAngle + (i * Math.PI * 2) / numFlutes;
    const wave = Math.sin(phase) * 14;
    const waveNext = Math.sin(phase + Math.PI / 3) * 14;

    const grad = ctx.createLinearGradient(-45, wave - 10, 40, 0);
    if (i % 2 === 0) {
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#e0f2fe');
    } else {
      grad.addColorStop(0, '#b45309');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(1, '#fef08a');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(42, 0); // Drill Tip
    ctx.lineTo(-45, wave - 10);
    ctx.lineTo(-45, waveNext + 10);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Diamond Tip with Ultra Prismatic Core
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.moveTo(48, 0);
  ctx.lineTo(28, -7);
  ctx.lineTo(28, 7);
  ctx.closePath();
  ctx.fill();

  // Electric arc lightning on drill
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(40, 0);
  ctx.lineTo(15, (Math.sin(now * 0.03) * 12));
  ctx.lineTo(-15, (Math.cos(now * 0.03) * 12));
  ctx.stroke();
  ctx.restore();

  // 5. Status Banner when pinned or homing
  ctx.save();
  if (isWallPinned) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(-100, -38, 200, 22, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡ [GĂM TƯỜNG MA SÁT 40 DMG/TICK] ⚡', 0, -27);
  } else {
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('🔩 [MŨI KHOAN BÁM ĐUỔI]', 0, -22);
  }
  ctx.restore();

  ctx.restore();
}

// ----------------------------------------------------
// THE OWNER GAME - VẠN VŨ KHÍ QUY TÔNG (OMNI-WEAPON CONVERGENCE)
// ----------------------------------------------------
export function drawTheOwnerOrbitingWeapons(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  rotAngle: number,
  now: number,
  is7b?: boolean
) {
  ctx.save();
  ctx.translate(centerX, centerY);

  if (is7b) {
    // Hyper Cosmic 7B% God Aura & Cyber Hex Shield
    const pulse = Math.sin(now * 0.008) * 8;
    const fastRot = now * 0.003;

    // 1. Cybernetic Rotating Hexagonal Energy Shield
    ctx.save();
    ctx.rotate(fastRot);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    const hexR = 68 + pulse * 0.5;
    for (let k = 0; k < 6; k++) {
      const ha = (k * Math.PI) / 3;
      const hx = Math.cos(ha) * hexR;
      const hy = Math.sin(ha) * hexR;
      if (k === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    // Hex inner matrix grid nodes
    for (let k = 0; k < 6; k++) {
      const ha = (k * Math.PI) / 3;
      const hx = Math.cos(ha) * hexR;
      const hy = Math.sin(ha) * hexR;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5);
    }
    ctx.restore();

    // 2. Holographic Binary Code Ring Orbit
    ctx.save();
    ctx.rotate(-fastRot * 0.7);
    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
    const binaryBits = ['0x7B', '101', 'ROOT', '7B%', '010', 'GOD', '111', 'MAX'];
    for (let b = 0; b < binaryBits.length; b++) {
      const ba = (b * Math.PI * 2) / binaryBits.length;
      const bx = Math.cos(ba) * 82;
      const by = Math.sin(ba) * 82;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(ba + Math.PI / 2);
      ctx.fillText(binaryBits[b], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // 3. Multi-layer Radiant Rings
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(0, 0, 95 + pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 125 - pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, 0, 150 + pulse * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Matrix Hacker Circuit Halo
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 85, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.stroke();
  }

  // All Weapons Orbiting (including Daynit & Stellar Remote)
  const weapons: WeaponKey[] = [
    'kiem', 'dao', 'cung', 'no', 'giao', 'mace',
    'railgun', 'minigun', 'sangthe', 'cancau', 'songkiem',
    'tamkiem', 'torch', 'computer', 'daynit', 'stellar_remote'
  ];

  const total = weapons.length;
  for (let i = 0; i < total; i++) {
    const a = (rotAngle * (is7b ? 1.6 : 1.0)) + (i * Math.PI * 2) / total;
    const r = (is7b ? 110 : 95) + Math.sin(now * 0.006 + i) * (is7b ? 16 : 12);
    const wx = Math.cos(a) * r;
    const wy = Math.sin(a) * r;

    // Laser conduit tether to core if 7B
    if (is7b) {
      ctx.save();
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(250, 204, 21, 0.45)' : 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(wx, wy);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(a + Math.PI / 2);
    drawWeaponIcon(ctx, weapons[i], 0, 0, is7b ? 32 : 26);
    ctx.restore();

    // Laser sight pointing outwards
    if (i % 2 === 0) {
      ctx.strokeStyle = is7b ? 'rgba(251, 191, 36, 0.85)' : 'rgba(74, 222, 128, 0.4)';
      ctx.lineWidth = is7b ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx * (is7b ? 3.2 : 2.2), wy * (is7b ? 3.2 : 2.2));
      ctx.stroke();
    }
  }

  // Center Hologram
  ctx.save();
  ctx.font = is7b ? 'bold 11px monospace' : 'bold 9px monospace';
  ctx.fillStyle = is7b ? '#fde047' : '#86efac';
  ctx.shadowColor = is7b ? '#ca8a04' : '#22c55e';
  ctx.shadowBlur = 12;
  ctx.textAlign = 'center';

  if (is7b) {
    // Cyber Tag Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-65, -38, 130, 20);
    ctx.fillRect(-65, -38, 130, 20);

    ctx.fillStyle = '#fef08a';
    ctx.fillText('👑 7 TỈ % CODE ARENA', 0, -24);
  } else {
    ctx.fillText('👑 THE OWNER', 0, -22);
  }
  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng sàn đấu CODE ARENA của The Owner Game 7 Tỉ %
 * Bao gồm lưới tọa độ Matrix điện tử, mưa mã code nhị phân & hex rơi từ trên xuống,
 * các bảng Telemetry công nghệ HUD, đường truyền dẫn lượng tử và viền mạch điện Cyberpunk!
 */
export function drawCodeArenaDomain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  is7b = true
) {
  ctx.save();

  // 1. Digital Cyber Grid Floor
  const gridSize = 32;
  const gridAlpha = 0.08 + Math.sin(now * 0.003) * 0.03;
  ctx.strokeStyle = is7b ? `rgba(250, 204, 21, ${gridAlpha})` : `rgba(34, 197, 94, ${gridAlpha})`;
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Crosshair intersection nodes (+)
  ctx.fillStyle = is7b ? 'rgba(253, 224, 71, 0.28)' : 'rgba(74, 222, 128, 0.28)';
  for (let x = gridSize; x < width; x += gridSize * 2) {
    for (let y = gridSize; y < height; y += gridSize * 2) {
      if ((x + y + Math.floor(now * 0.002)) % 4 === 0) {
        ctx.fillRect(x - 2, y, 5, 1);
        ctx.fillRect(x, y - 2, 1, 5);
      }
    }
  }

  // 2. Horizontal Cyber Scanline Sweep
  const scanY = (now * 0.09) % (height + 60) - 30;
  const scanGrad = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
  scanGrad.addColorStop(0, 'rgba(250, 204, 21, 0)');
  scanGrad.addColorStop(0.5, is7b ? 'rgba(250, 204, 21, 0.14)' : 'rgba(34, 197, 94, 0.14)');
  scanGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, scanY - 25, width, 50);

  // 3. Matrix Binary & Hex Code Rain Streams (18 Columns)
  const columns = 18;
  const colSpacing = width / columns;
  const glyphs = ['0', '1', '7', 'B', 'X', 'F', 'A', 'Ω', '§', 'Δ', '0x7B', 'ROOT', '777', 'GOD', 'MELT', '0.2%'];

  ctx.font = 'bold 9px monospace';
  for (let c = 0; c < columns; c++) {
    const colX = colSpacing * c + 14;
    const speed = 70 + ((c * 23) % 80);
    const headY = ((now * 0.001 * speed) + c * 77) % (height + 220) - 40;

    // Draw 8 glyphs in the tail
    const streamLen = 8;
    for (let g = 0; g < streamLen; g++) {
      const gy = headY - g * 16;
      if (gy < -10 || gy > height + 10) continue;

      const glyphIndex = (c * 7 + g + Math.floor(now * 0.005)) % glyphs.length;
      const glyph = glyphs[glyphIndex];

      if (g === 0) {
        // Head glyph: Luminous White & Glowing
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = is7b ? '#facc15' : '#4ade80';
        ctx.shadowBlur = 10;
      } else {
        // Tail glyphs: Fading Gold / Emerald
        const fade = 1 - g / streamLen;
        ctx.fillStyle = is7b ? `rgba(253, 224, 71, ${fade * 0.65})` : `rgba(74, 222, 128, ${fade * 0.65})`;
        ctx.shadowBlur = 0;
      }
      ctx.fillText(glyph, colX, gy);
    }
  }
  ctx.shadowBlur = 0;

  // 4. Cybernetic Circuit Borders & Corner Brackets
  ctx.strokeStyle = is7b ? '#facc15' : '#22c55e';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  // Inner dotted tech border
  ctx.save();
  ctx.strokeStyle = is7b ? 'rgba(253, 224, 71, 0.4)' : 'rgba(74, 222, 128, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(8, 8, width - 16, height - 16);
  ctx.restore();

  // Corner HUD Brackets
  const cornerL = 28;
  ctx.strokeStyle = is7b ? '#fbbf24' : '#38bdf8';
  ctx.lineWidth = 3.5;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(3, 3 + cornerL);
  ctx.lineTo(3, 3);
  ctx.lineTo(3 + cornerL, 3);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(width - 3 - cornerL, 3);
  ctx.lineTo(width - 3, 3);
  ctx.lineTo(width - 3, 3 + cornerL);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(3, height - 3 - cornerL);
  ctx.lineTo(3, height - 3);
  ctx.lineTo(3 + cornerL, height - 3);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(width - 3 - cornerL, height - 3);
  ctx.lineTo(width - 3, height - 3);
  ctx.lineTo(width - 3, height - 3 - cornerL);
  ctx.stroke();

  // 5. High-Tech Telemetry HUD Tags in Arena Corners
  ctx.save();
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = is7b ? '#fde047' : '#86efac';

  // Top Left Tag
  ctx.fillText('⚡ DOMAIN: [CODE ARENA 7B%]', 16, 24);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('ROOT::OVERRIDE [0x7B00000000]', 16, 36);

  // Top Right Tag
  ctx.textAlign = 'right';
  ctx.fillStyle = is7b ? '#fde047' : '#38bdf8';
  ctx.fillText('SYS::MELT [0.2% HP / 0.01s] ⚡', width - 16, 24);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('GOD_MODE_ACTIVE [IMMUNE 100%]', width - 16, 36);

  // Bottom Center Banner
  ctx.textAlign = 'center';
  ctx.fillStyle = is7b ? 'rgba(250, 204, 21, 0.85)' : 'rgba(34, 197, 94, 0.85)';
  ctx.fillText('>>> THE OWNER GAME: MATRIX CYBER REALM <<<', width / 2, height - 12);
  ctx.restore();

  ctx.restore();
}

/**
 * Hệ thống Animation Chém Động (Dynamic Slash Effect)
 * Nâng cấp hoạt ảnh chém: Lưỡi chém trăng khuyết, tia chém chéo xuyên thấu,
 * vệt chém Code Cyber cho The Owner 7B và vết chém nặng nề cho rìu/chùy!
 */
export function drawDynamicSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius: number,
  color: string,
  glowColor: string,
  type: 'crescent' | 'cross' | 'code_cleave' | 'heavy_cleave',
  createdAt: number,
  now: number,
  duration = 240
) {
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  if (type === 'code_cleave') {
    // 1. Digital Cyber Blade for The Owner 7B / Hacker
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 22;

    // Dual energy arc
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4 * (1 - progress * 0.4);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.6 * Math.PI, 0.6 * Math.PI, false);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8 * (1 - progress * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, radius - 4, -0.7 * Math.PI, 0.7 * Math.PI, false);
    ctx.stroke();

    // Matrix digital bits along the slice edge
    ctx.fillStyle = '#38bdf8';
    for (let k = -3; k <= 3; k++) {
      const sa = (k * Math.PI) / 8;
      const px = Math.cos(sa) * (radius + 6 * progress);
      const py = Math.sin(sa) * (radius + 6 * progress);
      ctx.fillRect(px - 2, py - 2, 4, 4);
    }

    // Impact core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 10 * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'cross') {
    // 2. Cross Slash
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 18;

    const len = radius * 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(-len * 0.7, -len * 0.7);
    ctx.lineTo(len * 0.7, len * 0.7);
    ctx.moveTo(-len * 0.7, len * 0.7);
    ctx.lineTo(len * 0.7, -len * 0.7);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = 8 * (1 - progress);
    ctx.stroke();
  } else if (type === 'heavy_cleave') {
    // 3. Heavy Axe / Mace Cleave Arc
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;

    const sweepW = radius * 1.6;
    const grad = ctx.createLinearGradient(-sweepW / 2, 0, sweepW / 2, 0);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.8, color);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, sweepW / 2, (radius * 0.6) * (1 - progress), 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // 4. Standard Sharp Crescent Sword Slash
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 16;

    // Outer Glow Arc
    ctx.strokeStyle = color;
    ctx.lineWidth = 7 * (1 - progress * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.6 * Math.PI, 0.6 * Math.PI, false);
    ctx.stroke();

    // Inner White-Hot Razor Blade
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5 * (1 - progress * 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.stroke();

    // Kinetic speed line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.4, 0);
    ctx.lineTo(radius * 1.2, 0);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// RAID THỦ THÀNH (TOWER DEFENSE / SURVIVAL)
// ----------------------------------------------------
export function drawTowerDefenseFortress(
  ctx: CanvasRenderingContext2D,
  gateHp: number,
  maxGateHp: number,
  wave: number,
  mobsKilled: number,
  coinsEarned: number,
  width: number,
  height: number,
  now: number
) {
  ctx.save();

  // 1. Fortress Wall on Left (Stone & Steel Battlements)
  const wallX = 70;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, wallX, height);

  // Stone bricks pattern
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  for (let y = 10; y < height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(wallX, y);
    ctx.stroke();
  }

  // Battlements Teeth
  ctx.fillStyle = '#475569';
  for (let y = 0; y < height; y += 36) {
    ctx.fillRect(wallX - 8, y, 14, 18);
  }

  // Castle Gate Archway (Cổng thành)
  const gateY = height / 2 - 45;
  const gateH = 90;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(wallX - 18, gateY, 22, gateH);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(wallX - 18, gateY, 22, gateH);

  // 2. Castle Gate HP Bar (Thanh máu cổng thành)
  const hpFrac = Math.max(0, gateHp / maxGateHp);
  const hpBarX = 14;
  const hpBarY = 20;
  const hpBarW = wallX - 28;
  const hpBarH = 120;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(hpBarX, hpBarY, hpBarW, hpBarH);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(hpBarX, hpBarY, hpBarW, hpBarH);

  // Vertical HP fill
  const fillH = hpBarH * hpFrac;
  const hpCol = hpFrac > 0.5 ? '#10b981' : hpFrac > 0.2 ? '#f59e0b' : '#ef4444';
  ctx.fillStyle = hpCol;
  ctx.fillRect(hpBarX + 2, hpBarY + hpBarH - fillH + 2, hpBarW - 4, fillH - 4);

  // Gate Label
  ctx.save();
  ctx.translate(hpBarX + hpBarW / 2, hpBarY + hpBarH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`CỔNG THÀNH: ${Math.max(0, Math.round(gateHp))}/${maxGateHp}`, 0, 3);
  ctx.restore();

  // 3. Top Banner: Wave & Kill Rewards (+2.5 Xu / kill)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 130, 8, 260, 26, 6);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.fillText(`🏰 THỦ THÀNH | ĐỢT ${wave} | DIỆT: ${mobsKilled} (+${coinsEarned.toFixed(1)} Xu)`, width / 2, 25);

  ctx.restore();
}

/**
 * Vẽ Tuyệt Kỹ Hợp Nhất [CỬU NGŨ CHÍ TÔN THỨC - TRẤN QUỐC CHI KIẾM]
 * Khi Bá Thường hy sinh (HP về 0), Sở Tân tức giận ngưng tụ Cự Kiếm Khổng Lồ cắm xuống đất gây 88% Max HP!
 */
export function drawTranQuocChiKiem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  hasStruck: boolean,
  team: 'blue' | 'red'
) {
  ctx.save();
  ctx.translate(x, y);

  const glowColor = team === 'blue' ? '#38bdf8' : '#f59e0b';
  const bladeColor = team === 'blue' ? '#0284c7' : '#d97706';

  // 1. Holy Column of Light Beam from the Sky
  ctx.save();
  const beamGrad = ctx.createLinearGradient(0, -600, 0, 100);
  beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  beamGrad.addColorStop(0.3, team === 'blue' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(245, 158, 11, 0.45)');
  beamGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.7)');
  beamGrad.addColorStop(1, team === 'blue' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(239, 68, 68, 0.9)');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(-45, -600, 90, 700);
  ctx.restore();

  // 2. Colossal Shockwaves if sword has struck the ground
  if (hasStruck) {
    const pulse = Math.sin(now * 0.015) * 15;
    ctx.save();
    ctx.strokeStyle = team === 'blue' ? '#22d3ee' : '#fbbf24';
    ctx.lineWidth = 6;
    ctx.shadowColor = team === 'blue' ? '#06b6d4' : '#f59e0b';
    ctx.shadowBlur = 30;

    ctx.beginPath();
    ctx.ellipse(0, 10, 120 + pulse, 35 + pulse * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 10, 80 + pulse * 0.5, 22 + pulse * 0.2, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. The Colossal Celestial Sword (Trấn Quốc Chi Kiếm)
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 35;

  // Blade Body (Height: 300px, Width: 46px)
  const swordH = 260;
  const swordW = 44;

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(0, 20); // Tip
  ctx.lineTo(-swordW / 2, -swordH * 0.3);
  ctx.lineTo(-swordW * 0.45, -swordH);
  ctx.lineTo(swordW * 0.45, -swordH);
  ctx.lineTo(swordW / 2, -swordH * 0.3);
  ctx.closePath();
  ctx.fill();

  // Glowing Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Inner Radiant Blade Core
  const coreGrad = ctx.createLinearGradient(0, -swordH, 0, 20);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.5, glowColor);
  coreGrad.addColorStop(1, bladeColor);
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(-swordW * 0.3, -swordH * 0.3);
  ctx.lineTo(-swordW * 0.25, -swordH * 0.95);
  ctx.lineTo(swordW * 0.25, -swordH * 0.95);
  ctx.lineTo(swordW * 0.3, -swordH * 0.3);
  ctx.closePath();
  ctx.fill();

  // Central Divine Bloodline Groove (Kích Nộ Huyết Tuyến)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, -swordH * 0.9);
  ctx.lineTo(0, -10);
  ctx.stroke();

  // Crossguard (Chuôi Kiếm Cửu Ngũ Chí Tôn)
  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-swordW * 1.3, -swordH - 12, swordW * 2.6, 20, 5);
  ctx.fill();
  ctx.stroke();

  // Sword Hilt & Pommel
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-9, -swordH - 70, 18, 58);
  ctx.strokeStyle = '#facc15';
  ctx.strokeRect(-9, -swordH - 70, 18, 58);

  ctx.beginPath();
  ctx.arc(0, -swordH - 76, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.stroke();

  // Title Banner above sword
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 10;
  ctx.fillText('⚔️ CỬU NGŨ CHÍ TÔN: TRẤN QUỐC CHI KIẾM (-88% MAX HP) ⚔️', 0, -swordH - 95);

  ctx.restore();
}

/**
 * Vẽ Hiệu Ứng Quất Dây Nịt Phạm Vi Khổng Lồ (AoE 280px - Cooldown 5s)
 */
export function drawDayNitWhipAoe(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  progress: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  const currentRad = radius * Math.min(1, progress * 1.4);
  const alpha = Math.max(0, 1 - progress);

  // 1. Expanding Fiery Crimson & Gold Whip Shockwave Ring
  ctx.save();
  ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
  ctx.lineWidth = 8 * (1 - progress * 0.6);
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(0, 0, currentRad, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(250, 204, 21, ${alpha * 0.9})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, currentRad * 0.85, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 2. Colossal Curved Leather Whip Slash Trails (Quất Dây Nịt)
  const angleStart = progress * Math.PI * 2;
  ctx.save();
  ctx.rotate(angleStart);
  ctx.strokeStyle = `rgba(180, 83, 9, ${alpha})`;
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.shadowColor = '#b45309';
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    currentRad * 0.4, -currentRad * 0.5,
    currentRad * 0.8, currentRad * 0.6,
    currentRad, 0
  );
  ctx.stroke();

  // White Hot Razor Whip Core
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ Hào Quang Biển Cát "Thiên Hạ Vạn Cổ Hoành Hải Sa Trường" (Sở Tân + Bá Thường + Cần Câu)
 */
export function drawThienHaSandAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rot1 = now * 0.003;
  const rot2 = -now * 0.0045;

  // Outer Golden Sand Swirl
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner Ocean Blue Swirl
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Golden Sand Spores
  for (let i = 0; i < 4; i++) {
    const a = rot1 * 2 + (i * Math.PI) / 2;
    const px = Math.cos(a) * (radius + 10);
    const py = Math.sin(a) * (radius + 10);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Buff Đồng Nghiệp" (Admin & The Owner Game)
 */
export function drawDongNghiepColleagueAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.008) * 3;
  const rot = now * 0.0025;

  ctx.save();
  ctx.rotate(rot);
  // Dual Crown & Matrix Ring
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 12;
  ctx.setLineDash([10, 4, 3, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 9 + pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Tuyệt Thế Anh Hùng" (Lưu Bị + Triệu Vân / Thần-Triệu Vân)
 */
export function drawTuyetTheAnhHungAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.007) * 3.5;
  const rot1 = now * 0.0035;
  const rot2 = -now * 0.004;

  // Outer Dragon Cyan Ring
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 10;
  ctx.setLineDash([14, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 11 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner Imperial Gold Ring
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 8;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Dragon Flame Embers
  for (let i = 0; i < 4; i++) {
    const a = rot1 + (i * Math.PI) / 2;
    const px = Math.cos(a) * (radius + 9);
    const py = Math.sin(a) * (radius + 9);
    ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#facc15';
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Song Thần Giáng Thế" (Thần-Lưu Bị + Thần-Triệu Vân)
 */
export function drawSongThanGiangTheAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.01) * 4.5;
  const rot1 = now * 0.005;
  const rot2 = -now * 0.006;

  // Supreme Divine Crown Radiant Ring
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.95)';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 16;
  ctx.setLineDash([16, 6, 4, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 14 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Celestial Cyan Dragon Core Ring
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.9)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#0ea5e9';
  ctx.shadowBlur = 12;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Divine Celestial Star Sparks
  for (let i = 0; i < 6; i++) {
    const a = rot1 * 1.5 + (i * Math.PI) / 3;
    const px = Math.cos(a) * (radius + 12 + pulse * 0.5);
    const py = Math.sin(a) * (radius + 12 + pulse * 0.5);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hiệu ứng Tuyệt Kỹ: Nhai Giác Lưu Tinh Trảm
 */
export function drawNhaiGiacAnimationGraphics(
  ctx: CanvasRenderingContext2D,
  anim: {
    stage: 'spinning' | 'spear_drop' | 'explosion' | 'final_thrust' | 'done';
    attackerBall: { x: number; y: number };
    targetBall: { x: number; y: number };
    spinHitCount: number;
    spearDropX: number;
    spearDropY: number;
    spearCurrentY: number;
    stageStartTime: number;
  },
  now: number
) {
  ctx.save();

  if (anim.stage === 'spinning') {
    // Rotating Golden Spears Vortex around target
    const vortexRot = now * 0.03;
    ctx.save();
    ctx.translate(anim.targetBall.x, anim.targetBall.y);
    ctx.rotate(vortexRot);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(45, 0);
      ctx.stroke();
      // Spear head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(45, -4);
      ctx.lineTo(58, 0);
      ctx.lineTo(45, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // Slash streak rings
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(anim.targetBall.x, anim.targetBall.y, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'spear_drop') {
    // Colossal Divine Spear plunging from the sky into center of map
    const spearX = anim.spearDropX;
    const spearY = anim.spearCurrentY;

    // Lightning Trail
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(spearX, 0);
    ctx.lineTo(spearX, spearY);
    ctx.stroke();

    // Giant Spear Shaft
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 20;
    ctx.fillRect(spearX - 6, spearY - 140, 12, 140);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(spearX - 2, spearY - 140, 4, 140);

    // Giant Spear Blade Head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(spearX - 18, spearY - 20);
    ctx.lineTo(spearX, spearY + 30);
    ctx.lineTo(spearX + 18, spearY - 20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Target Crosshair at Drop Point
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(anim.spearDropX, anim.spearDropY, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'explosion') {
    // Colossal Detonation shockwave at map center
    ctx.save();
    ctx.translate(anim.spearDropX, anim.spearDropY);
    const pulse = Math.sin((now - anim.stageStartTime) * 0.05) * 10;
    ctx.fillStyle = 'rgba(249, 115, 22, 0.35)';
    ctx.beginPath();
    ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'final_thrust') {
    // Thần-Triệu Vân final thrust dragon phantom trail
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.9)';
    ctx.lineWidth = 6;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.moveTo(anim.attackerBall.x, anim.attackerBall.y);
    ctx.lineTo(anim.targetBall.x, anim.targetBall.y);
    ctx.stroke();

    // Piercing Dragon Spark Cross
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(anim.targetBall.x - 30, anim.targetBall.y);
    ctx.lineTo(anim.targetBall.x + 30, anim.targetBall.y);
    ctx.moveTo(anim.targetBall.x, anim.targetBall.y - 30);
    ctx.lineTo(anim.targetBall.x, anim.targetBall.y + 30);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

// --- Optimized 4D & 3D Static Constants (Zero-allocation during 60 FPS game loop) ---
const TESSERACT_VERTICES: ReadonlyArray<[number, number, number, number]> = [
  [-1, -1, -1, -1], [1, -1, -1, -1], [-1, 1, -1, -1], [1, 1, -1, -1],
  [-1, -1, 1, -1], [1, -1, 1, -1], [-1, 1, 1, -1], [1, 1, 1, -1],
  [-1, -1, -1, 1], [1, -1, -1, 1], [-1, 1, -1, 1], [1, 1, -1, 1],
  [-1, -1, 1, 1], [1, -1, 1, 1], [-1, 1, 1, 1], [1, 1, 1, 1]
];

const TESSERACT_EDGES: ReadonlyArray<[number, number]> = [
  [0, 1], [0, 2], [0, 4], [0, 8], [1, 3], [1, 5], [1, 9], [2, 3],
  [2, 6], [2, 10], [3, 7], [3, 11], [4, 5], [4, 6], [4, 12], [5, 7],
  [5, 13], [6, 7], [6, 14], [7, 15], [8, 9], [8, 10], [8, 12], [9, 11],
  [9, 13], [10, 11], [10, 14], [11, 15], [12, 13], [12, 14], [13, 15], [14, 15]
];

// Preallocated point projection buffer to avoid GC spikes
const PROJ_POINTS_BUFFER: { x: number; y: number; z: number; w: number }[] = Array.from(
  { length: 16 },
  () => ({ x: 0, y: 0, z: 0, w: 0 })
);

/**
 * 4D Hypercube (Tesseract) Mathematical Projection:
 * Optimized for butter-smooth 60 FPS (zero shadowBlur in loop, precalculated topology).
 */
export function draw4DTesseract(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  now: number
) {
  ctx.save();

  // 4D Rotation angles
  const rotXW = now * 0.0006;
  const rotYW = now * 0.00045;
  const rotZW = now * 0.00035;
  const rotXY = now * 0.00025;

  const sinXW = Math.sin(rotXW), cosXW = Math.cos(rotXW);
  const sinYW = Math.sin(rotYW), cosYW = Math.cos(rotYW);
  const sinZW = Math.sin(rotZW), cosZW = Math.cos(rotZW);
  const sinXY = Math.sin(rotXY), cosXY = Math.cos(rotXY);

  // Project 16 vertices in-place
  for (let i = 0; i < 16; i++) {
    const [x, y, z, w] = TESSERACT_VERTICES[i];

    // 1. Rotate in X-W plane
    const x1 = x * cosXW - w * sinXW;
    const w1 = x * sinXW + w * cosXW;

    // 2. Rotate in Y-W plane
    const y2 = y * cosYW - w1 * sinYW;
    const w2 = y * sinYW + w1 * cosYW;

    // 3. Rotate in Z-W plane
    const z3 = z * cosZW - w2 * sinZW;
    const w3 = z * sinZW + w2 * cosZW;

    // 4. Rotate in X-Y plane
    const x4 = x1 * cosXY - y2 * sinXY;
    const y4 = x1 * sinXY + y2 * cosXY;
    const z4 = z3;
    const w4 = w3;

    // Perspective projection: 4D to 3D
    const dist4D = 2.8;
    const proj4 = 1 / (dist4D - w4);
    const x3D = x4 * proj4;
    const y3D = y4 * proj4;
    const z3D = z4 * proj4;

    // Perspective projection: 3D to 2D
    const dist3D = 3.2;
    const proj3 = 1 / (dist3D - z3D);

    const pt = PROJ_POINTS_BUFFER[i];
    pt.x = centerX + x3D * proj3 * size;
    pt.y = centerY + y3D * proj3 * size;
    pt.z = z3D;
    pt.w = w4;
  }

  // Central 4D Singularity faint core
  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
  ctx.fill();

  // Draw 32 4D Tesseract Edges (Fast 2-pass neon stroke without shadowBlur)
  ctx.save();
  for (const [i1, i2] of TESSERACT_EDGES) {
    const p1 = PROJ_POINTS_BUFFER[i1];
    const p2 = PROJ_POINTS_BUFFER[i2];
    const avgW = (p1.w + p2.w) * 0.5;
    const normW = Math.max(0, Math.min(1, (avgW + 1) * 0.5));

    // Fast color determination
    const edgeColor = normW > 0.65
      ? 'rgba(236, 72, 153, 0.7)'
      : normW > 0.35
      ? 'rgba(6, 182, 212, 0.6)'
      : 'rgba(168, 85, 247, 0.4)';

    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = 1.0 + normW * 1.2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  ctx.restore();

  // Draw 16 4D Vertex Nodes (Fast fill without shadowBlur)
  for (let i = 0; i < 16; i++) {
    const p = PROJ_POINTS_BUFFER[i];
    const nodeR = 2.2 + ((p.w + 1) * 0.5) * 1.8;
    ctx.fillStyle = (i & 8) ? '#ec4899' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw 4D HUD label
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = 'rgba(34, 211, 238, 0.65)';
  ctx.fillText('4D TESSERACT HYPERCUBE [X,Y,Z,W]', 12, 18);

  ctx.restore();
}

/**
 * 3D Isometric / Perspective Grid & 3D Extruded Arena Walls (Optimized for 0 lag)
 */
export function draw3DArenaGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  is4D: boolean
) {
  ctx.save();

  // 1. Perspective Grid Lines (vanishing towards center-top)
  const cx = width * 0.5;
  const horizonY = height * 0.16;
  const numRadials = 10; // Optimized count

  ctx.lineWidth = 1;
  for (let i = 0; i <= numRadials; i++) {
    const bottomX = (i / numRadials) * width;
    const alpha = 0.07 + Math.abs(bottomX - cx) / width * 0.05;
    ctx.strokeStyle = is4D ? `rgba(236, 72, 153, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(cx + (bottomX - cx) * 0.35, horizonY);
    ctx.lineTo(bottomX, height);
    ctx.stroke();
  }

  // Horizontal perspective rings
  const numHorizontals = 7; // Optimized count
  for (let j = 1; j <= numHorizontals; j++) {
    const t = j / numHorizontals;
    const y = horizonY + Math.pow(t, 1.4) * (height - horizonY);
    const alpha = 0.04 + t * 0.09;
    ctx.strokeStyle = is4D ? `rgba(168, 85, 247, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(width - 10, y);
    ctx.stroke();
  }

  // 2. 4D Spacetime Gravitational Ripples (if 4D mode) - 2 rings
  if (is4D) {
    const wavePhase = (now * 0.0012) % 1;
    for (let w = 0; w < 2; w++) {
      const p = (wavePhase + w * 0.5) % 1;
      const radius = p * 200;
      const alpha = (1 - p) * 0.28;
      ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, height * 0.5, radius, radius * 0.65, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 3. 3D Extruded Arena Wall Borders
  const pad = 6;
  const wallDepth = 8;

  // Bottom 3D Wall face
  ctx.fillStyle = is4D ? 'rgba(88, 28, 135, 0.4)' : 'rgba(8, 47, 73, 0.5)';
  ctx.beginPath();
  ctx.moveTo(pad, height - pad);
  ctx.lineTo(width - pad, height - pad);
  ctx.lineTo(width - pad - wallDepth, height - pad + wallDepth);
  ctx.lineTo(pad + wallDepth, height - pad + wallDepth);
  ctx.closePath();
  ctx.fill();

  // 3D Outer border line (no shadowBlur to maintain 60 FPS)
  ctx.strokeStyle = is4D ? 'rgba(236, 72, 153, 0.85)' : 'rgba(6, 182, 212, 0.85)';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // 3D Corner Bevel Pillars
  const pillarLen = 16;
  ctx.lineWidth = 3;
  ctx.strokeStyle = is4D ? '#facc15' : '#38bdf8';

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(pad, pad + pillarLen);
  ctx.lineTo(pad, pad);
  ctx.lineTo(pad + pillarLen, pad);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(width - pad - pillarLen, pad);
  ctx.lineTo(width - pad, pad);
  ctx.lineTo(width - pad, pad + pillarLen);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(pad, height - pad - pillarLen);
  ctx.lineTo(pad, height - pad);
  ctx.lineTo(pad + pillarLen, height - pad);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(width - pad - pillarLen, height - pad);
  ctx.lineTo(width - pad, height - pad);
  ctx.lineTo(width - pad, height - pad - pillarLen);
  ctx.stroke();

  ctx.restore();
}

/**
 * 3D Volumetric Sphere Shading with Light Source & Specular Highlight (Optimized)
 */
export function draw3DVolumetricSphere(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  baseColor: string,
  borderColor: string,
  is4D: boolean,
  now: number
) {
  // 1. Dynamic 3D Ground Shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y + radius * 0.85, radius * 1.05, radius * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. 4D Quantum Dimensional Echoes (if 4D mode) - subtle fast circles
  if (is4D) {
    const wShiftX = Math.sin(now * 0.0025) * 8;
    const wShiftY = Math.cos(now * 0.0025) * 7;

    ctx.fillStyle = 'rgba(6, 182, 212, 0.22)';
    ctx.beginPath();
    ctx.arc(x - wShiftX, y - wShiftY, radius * 0.88, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(236, 72, 153, 0.22)';
    ctx.beginPath();
    ctx.arc(x + wShiftX, y + wShiftY, radius * 0.88, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Fast 3D Sphere gradient
  const lightX = x - radius * 0.3;
  const lightY = y - radius * 0.3;

  const grad = ctx.createRadialGradient(
    lightX,
    lightY,
    radius * 0.1,
    x,
    y,
    radius
  );
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, baseColor);
  grad.addColorStop(0.9, '#050c1e');
  grad.addColorStop(1, '#000000');

  ctx.fillStyle = grad;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * ------------------------------------------------------------------
 * STELLAR REMOTE: COSMIC SATELLITE ORBITAL CUTSCENES & VISUAL EFFECTS
 * ------------------------------------------------------------------
 */

// Draw starfield background helper
function drawCosmicStarfield(ctx: CanvasRenderingContext2D, width: number, height: number, now: number) {
  ctx.fillStyle = '#01030d';
  ctx.fillRect(0, 0, width, height);

  // Deep space cosmic dust nebula gradient
  const nebula = ctx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.5, width * 0.65);
  nebula.addColorStop(0, 'rgba(49, 16, 82, 0.45)');
  nebula.addColorStop(0.5, 'rgba(12, 34, 76, 0.3)');
  nebula.addColorStop(1, 'rgba(1, 3, 13, 0)');
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, width, height);

  // Background stars
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 45; i++) {
    const sx = ((i * 73 + 17) % width);
    const sy = ((i * 109 + 31) % height);
    const pulse = Math.sin(now * 0.003 + i) * 0.4 + 0.6;
    const r = (i % 3 === 0 ? 1.8 : 1.0) * pulse;
    ctx.globalAlpha = 0.35 + 0.55 * pulse;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
}

/**
 * Helper to render authentic military Sci-Fi Orbital Strike HUD in crimson red
 * matching the user's reference screenshots.
 */
function drawRailgunTacticalHUD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timerStr: string,
  impactSec: number,
  scaleStr: string,
  rangeStr: string,
  lockStr = 'LOCK 1933 / 66 / -054',
  skmStr = '0.0 skm'
) {
  ctx.save();
  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 4;

  // Top-left: UPLINK // SS-01 > THE SHOOTING STAR & Timer
  ctx.textAlign = 'left';
  ctx.fillText('UPLINK // SS-01 > THE SHOOTING STAR', 18, 22);
  ctx.font = '10px monospace';
  ctx.fillText(timerStr, 18, 35);

  // Top-right: IMPACT T - 12.63 (or counting down)
  ctx.textAlign = 'right';
  ctx.font = 'bold 10.5px monospace';
  ctx.fillText(`IMPACT T - ${impactSec.toFixed(2)}`, width - 18, 22);

  // Bottom-left: Bracket box with SCALE and RANGE
  ctx.textAlign = 'left';
  const bY = height - 42;
  // Corner bracket
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(18, bY - 8);
  ctx.lineTo(18, bY + 24);
  ctx.lineTo(135, bY + 24);
  ctx.stroke();

  ctx.fillText(scaleStr, 24, bY + 6);
  ctx.font = '9px monospace';
  ctx.fillText(rangeStr, 24, bY + 18);

  // Bottom-right: LOCK & speed
  ctx.textAlign = 'right';
  ctx.font = '9px monospace';
  ctx.fillText(skmStr, width - 18, height - 30);
  ctx.fillText(lockStr, width - 18, height - 18);

  ctx.restore();
}

/**
 * Render Cutscenes for SS-01 Railgun, SS-03 Gungir, SS-04 Seven Star, SS-05 Tesseract
 */
export function drawStellarCutscene(
  ctx: CanvasRenderingContext2D,
  cs: StellarCutsceneState,
  width: number,
  height: number,
  now: number
) {
  const elapsed = now - cs.startTime;
  ctx.save();

  drawCosmicStarfield(ctx, width, height, now);

  const cx = width / 2;
  const cy = height / 2;

  if (cs.skillKey === 'ss01_railgun') {
    // ----------------------------------------------------------------
    // SS-01: RAILGUN (THE SHOOTING STAR - AUTHENTIC ORBITAL STRIKE HUD)
    // Recreated with 100% fidelity from the user's reference screenshots:
    // Scene 1 (0-2100ms): Earth view with day/night terminator, glowing city lights,
    //                     red targeting reticle, and crimson laser shooting to bottom-left.
    // Scene 2 (2100-4200ms): Solar System view with Sun, concentric cyan planetary orbits
    //                     (Jupiter 5.2 AU, Saturn 9.58 AU, Uranus 19.2 AU, Neptune 30.1 AU),
    //                     Milky Way star dust band in background, red laser shooting down.
    // Scene 3 (4200-6400ms): Milky Way panoramic tilted spiral galaxy with core bracket,
    //                     MILKY WAY 100,000 LY, SOL 26,400 LY TO CORE,
    //                     and red beam shooting upward into deep space.
    // Scene 4 (6400-8400ms): Deep intergalactic space looking down at Milky Way rim,
    //                     laser connects to + SS-01 + RAILGUN 50,000 LY lock-on,
    //                     orbital citadel charges and unleashes relativistic beam!
    // ----------------------------------------------------------------
    if (elapsed < 2100) {
      // ==============================================================
      // SCENE 1: EARTH VIEW (IMAGE 1)
      // ==============================================================
      const earthRadius = Math.min(135, width * 0.26);
      const earthX = cx - 8;
      const earthY = cy + 18;

      // Distant spiral galaxy (Andromeda) in upper-right
      ctx.save();
      ctx.translate(width - 55, 65);
      ctx.rotate(-0.35);
      const andGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 18);
      andGrad.addColorStop(0, '#ffffff');
      andGrad.addColorStop(0.35, '#cbd5e1');
      andGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = andGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Earth atmospheric cyan limb haze
      const atmGrad = ctx.createRadialGradient(earthX, earthY, earthRadius * 0.95, earthX, earthY, earthRadius * 1.18);
      atmGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
      atmGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.25)');
      atmGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Earth Globe clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
      ctx.clip();

      // 1. Day Ocean Base
      const oceanGrad = ctx.createRadialGradient(earthX - earthRadius * 0.35, earthY - earthRadius * 0.35, 5, earthX, earthY, earthRadius);
      oceanGrad.addColorStop(0, '#38bdf8');
      oceanGrad.addColorStop(0.3, '#0284c7');
      oceanGrad.addColorStop(0.75, '#0369a1');
      oceanGrad.addColorStop(1, '#075985');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(earthX - earthRadius, earthY - earthRadius, earthRadius * 2, earthRadius * 2);

      // 2. Continents (North America, Gulf of Mexico, Central America)
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(earthX - earthRadius * 0.25, earthY - earthRadius * 0.15, earthRadius * 0.42, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.05, earthY + earthRadius * 0.15, earthRadius * 0.32, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.45, earthY + earthRadius * 0.05, earthRadius * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Mountain / Arid plateaus
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(earthX - earthRadius * 0.35, earthY - earthRadius * 0.2, earthRadius * 0.22, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.15, earthY + earthRadius * 0.2, earthRadius * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // 3. Swirling White Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
      ctx.beginPath();
      ctx.ellipse(earthX - earthRadius * 0.1, earthY - earthRadius * 0.25, earthRadius * 0.55, earthRadius * 0.18, -0.3, 0, Math.PI * 2);
      ctx.ellipse(earthX - earthRadius * 0.35, earthY + earthRadius * 0.2, earthRadius * 0.42, earthRadius * 0.15, 0.4, 0, Math.PI * 2);
      ctx.ellipse(earthX + earthRadius * 0.05, earthY + earthRadius * 0.35, earthRadius * 0.35, earthRadius * 0.12, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // 4. Night Terminator Shadow (Upper Right Hemisphere)
      ctx.save();
      ctx.translate(earthX, earthY);
      ctx.rotate(-0.55); // Terminator angle
      const nightGrad = ctx.createLinearGradient(0, -earthRadius, 0, earthRadius);
      nightGrad.addColorStop(0, 'rgba(3, 7, 18, 0.96)');
      nightGrad.addColorStop(0.48, 'rgba(3, 7, 18, 0.92)');
      nightGrad.addColorStop(0.55, 'rgba(3, 7, 18, 0.4)');
      nightGrad.addColorStop(0.65, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = nightGrad;
      ctx.fillRect(-earthRadius, -earthRadius, earthRadius * 2, earthRadius);

      // Night City Lights (Golden twinkling clusters)
      const cityLights = [
        { x: -25, y: -55, r: 1.5 }, { x: -12, y: -65, r: 2.0 }, { x: 5, y: -75, r: 1.8 },
        { x: 25, y: -58, r: 1.6 }, { x: 42, y: -45, r: 2.2 }, { x: 18, y: -42, r: 1.5 },
        { x: -8, y: -45, r: 2.5 }, { x: -35, y: -40, r: 1.7 }, { x: 30, y: -30, r: 1.9 },
        { x: 55, y: -25, r: 1.6 }, { x: 12, y: -22, r: 2.2 }, { x: 65, y: -15, r: 1.4 }
      ];
      cityLights.forEach((c, idx) => {
        const twinkle = 0.7 + 0.3 * Math.sin(now * 0.005 + idx * 1.5);
        ctx.fillStyle = idx % 2 === 0 ? `rgba(253, 224, 71, ${twinkle})` : `rgba(251, 191, 36, ${twinkle})`;
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.restore(); // End Earth Globe clipping

      // Target on Day Side
      const targetX = earthX - earthRadius * 0.14;
      const targetY = earthY + earthRadius * 0.12;

      // Red Targeting Reticle
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(targetX - 7, targetY - 7, 14, 14);
      ctx.beginPath();
      ctx.moveTo(targetX - 10, targetY);
      ctx.lineTo(targetX + 10, targetY);
      ctx.moveTo(targetX, targetY - 10);
      ctx.lineTo(targetX, targetY + 10);
      ctx.stroke();

      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'left';
      ctx.fillText('TARGET', targetX + 11, targetY - 2);
      ctx.font = '8px monospace';
      ctx.fillText('34.0522 N, 118.2437 W', targetX + 11, targetY + 8);

      // Crimson Laser Line shooting to bottom-left corner
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(0, height * 0.95);
      ctx.stroke();

      // Pure white beam core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 12.63 - (elapsed / 2100) * 2.2);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 04:37', impactCountdown, 'SCALE 10^4 KM', 'RANGE 65,355 KM');

    } else if (elapsed < 4200) {
      // ==============================================================
      // SCENE 2: SOLAR SYSTEM ORBITAL VIEW (IMAGE 2)
      // ==============================================================
      const sunX = cx - 8;
      const sunY = cy - 25;

      // Diagonal Milky Way Stardust Band running from bottom-left to top-left
      ctx.save();
      ctx.translate(sunX - 120, sunY + 60);
      ctx.rotate(-0.85);
      const mwBandGrad = ctx.createLinearGradient(-150, 0, 150, 0);
      mwBandGrad.addColorStop(0, 'rgba(0,0,0,0)');
      mwBandGrad.addColorStop(0.3, 'rgba(148, 163, 184, 0.12)');
      mwBandGrad.addColorStop(0.5, 'rgba(226, 232, 240, 0.22)');
      mwBandGrad.addColorStop(0.7, 'rgba(148, 163, 184, 0.12)');
      mwBandGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mwBandGrad;
      ctx.fillRect(-150, -height, 300, height * 2);
      ctx.restore();

      // Central Sun
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 24);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.35, '#fef08a');
      sunGrad.addColorStop(0.75, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 24, 0, Math.PI * 2);
      ctx.fill();

      // Concentric Tilted Cyan Planetary Orbits
      const orbitData = [
        { rX: 30, rY: 18, label: '' },
        { rX: 52, rY: 32, label: '' },
        { rX: 86, rY: 54, label: 'JUPITER\n5.2 AU', textX: 72, textY: -8 },
        { rX: 132, rY: 82, label: 'SATURN\n9.58 AU', textX: 110, textY: -2 },
        { rX: 178, rY: 112, label: 'URANUS\n19.2 AU', textX: 148, textY: 8 },
        { rX: 228, rY: 142, label: 'NEPTUNE\n30.1 AU', textX: 190, textY: 20 }
      ];

      orbitData.forEach(ob => {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, ob.rX, ob.rY, 0.12, 0, Math.PI * 2);
        ctx.stroke();

        if (ob.label) {
          ctx.font = 'bold 8.5px monospace';
          ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.textAlign = 'left';
          const lines = ob.label.split('\n');
          lines.forEach((l, lIdx) => {
            ctx.fillText(l, sunX + ob.textX!, sunY + ob.textY! + lIdx * 10);
          });
        }
      });

      // Earth Target Position on Inner Orbit
      const earthOrbX = sunX - 2;
      const earthOrbY = sunY + 28;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(earthOrbX, earthOrbY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(earthOrbX - 5, earthOrbY - 5, 10, 10);

      // Crimson Laser Line cutting straight down through all orbits
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(earthOrbX, earthOrbY);
      ctx.lineTo(cx - 24, height);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 10.43 - ((elapsed - 2100) / 2100) * 2.5);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 06:18', impactCountdown, 'SCALE 10^10 KM', 'RANGE 13,833,371,689 KM');

    } else if (elapsed < 6400) {
      // ==============================================================
      // SCENE 3: MILKY WAY GALAXY PANORAMIC VIEW (IMAGE 3)
      // ==============================================================
      const mwX = cx;
      const mwY = cy + 22;

      // Galactic Tilted Perspective
      ctx.save();
      ctx.translate(mwX, mwY);
      ctx.rotate(-0.1);
      ctx.scale(1.0, 0.36); // Inclined galactic plane

      // Multi-armed Logarithmic Spiral Dust Lanes
      for (let arm = 0; arm < 4; arm++) {
        const armOffset = (arm * Math.PI) / 2;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2.8; a += 0.08) {
          const r = 24 + a * 34;
          const px = Math.cos(a + armOffset) * r;
          const py = Math.sin(a + armOffset) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = arm % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 14;
        ctx.stroke();

        // Pink/Magenta H-II Starburst Nebulae knots along the arms
        for (let k = 0; k < 6; k++) {
          const kA = 0.8 + k * 0.42;
          const kR = 24 + kA * 34;
          const kX = Math.cos(kA + armOffset) * kR;
          const kY = Math.sin(kA + armOffset) * kR;
          ctx.fillStyle = k % 2 === 0 ? 'rgba(244, 114, 182, 0.65)' : 'rgba(251, 113, 133, 0.6)';
          ctx.beginPath();
          ctx.arc(kX, kY, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Brilliant Galactic Bulge & Core
      const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 75);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#fffbeb');
      coreGrad.addColorStop(0.65, '#fef08a');
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // End galaxy scale

      // Cyan 4-Corner Bracket Reticle around Galactic Core
      const bW = 110;
      const bH = 50;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 1.2;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(mwX - bW / 2, mwY - bH / 2 + 12);
      ctx.lineTo(mwX - bW / 2, mwY - bH / 2);
      ctx.lineTo(mwX - bW / 2 + 12, mwY - bH / 2);
      // Top-right
      ctx.moveTo(mwX + bW / 2 - 12, mwY - bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY - bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY - bH / 2 + 12);
      // Bottom-left
      ctx.moveTo(mwX - bW / 2, mwY + bH / 2 - 12);
      ctx.lineTo(mwX - bW / 2, mwY + bH / 2);
      ctx.lineTo(mwX - bW / 2 + 12, mwY + bH / 2);
      // Bottom-right
      ctx.moveTo(mwX + bW / 2 - 12, mwY + bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY + bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY + bH / 2 - 12);
      ctx.stroke();

      // Label: MILKY WAY 100,000 LY
      ctx.font = 'bold 8.5px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.textAlign = 'left';
      ctx.fillText('MILKY WAY', mwX + 62, mwY - 4);
      ctx.fillText('100,000 LY', mwX + 62, mwY + 6);

      // SOL Marker on Outer Orion Arm
      const solX = mwX + 88;
      const solY = mwY - 10;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(solX, solY, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 8.5px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('SOL', solX + 7, solY - 2);
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(254, 202, 202, 0.85)';
      ctx.fillText('26,400 LY TO CORE', solX + 7, solY + 8);

      // Crimson Laser Line shooting UPWARDS into deep space
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(solX, solY);
      ctx.lineTo(cx + 80, 0);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 7.93 - ((elapsed - 4200) / 2200) * 2.8);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 10:35', impactCountdown, 'SCALE 10^17 KM', 'RANGE 69,334 LY');

    } else {
      // ==============================================================
      // SCENE 4: DEEP COSMOS & SS-01 STATION LOCK-ON & FIRING (IMAGE 4)
      // ==============================================================
      // Curved edge of Milky Way glowing below at the bottom
      const mwEdgeGrad = ctx.createRadialGradient(cx, height + 90, 40, cx, height + 90, width * 0.75);
      mwEdgeGrad.addColorStop(0, '#ffffff');
      mwEdgeGrad.addColorStop(0.3, '#93c5fd');
      mwEdgeGrad.addColorStop(0.7, '#3b82f6');
      mwEdgeGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mwEdgeGrad;
      ctx.beginPath();
      ctx.ellipse(cx, height + 85, width * 0.85, 115, 0, Math.PI, 0);
      ctx.fill();

      // Laser Line originating from Milky Way below and reaching up to SS-01 Station
      const ss01X = cx + 18;
      const ss01Y = cy - 65;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(cx + 98, height);
      ctx.lineTo(ss01X, ss01Y);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Red Target Reticle locked on SS-01
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(ss01X - 9, ss01Y - 9, 18, 18);
      ctx.beginPath();
      ctx.moveTo(ss01X - 14, ss01Y);
      ctx.lineTo(ss01X + 14, ss01Y);
      ctx.moveTo(ss01X, ss01Y - 14);
      ctx.lineTo(ss01X, ss01Y + 14);
      ctx.stroke();

      // Text: + SS-01 + RAILGUN 50,000 LY
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'left';
      ctx.fillText('+ SS-01 +', ss01X + 13, ss01Y - 2);
      ctx.font = '8px monospace';
      ctx.fillText('RAILGUN 50,000 LY', ss01X + 13, ss01Y + 9);

      // Outer Space Railgun Citadel / Dyson Station Architecture
      ctx.save();
      ctx.translate(ss01X, ss01Y);

      // Concentric Rotating Relativistic Accelerator Rings
      ctx.rotate(now * 0.003);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-now * 0.005);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-18, -18, 36, 36);

      // Station Core Energy Accumulation
      const isFiring = elapsed >= 7500;
      const coreR = isFiring ? 35 : 12 + ((elapsed - 6400) / 1100) * 14;
      const cGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, coreR);
      cGrad.addColorStop(0, '#ffffff');
      cGrad.addColorStop(0.3, '#fca5a5');
      cGrad.addColorStop(0.7, '#ef4444');
      cGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Lightspeed Firing Flash back towards Earth
      if (isFiring) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.fillRect(0, 0, width, height);

        // Colossal return strike beam
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 14;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.moveTo(ss01X, ss01Y);
        ctx.lineTo(cx + 98, height);
        ctx.stroke();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 30;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 5.13 - ((elapsed - 6400) / 2000) * 5.13);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 18:00', impactCountdown, 'SCALE 10^17 KM', 'RANGE 69,333 LY');
    }
  } else if (cs.skillKey === 'ss02_the_sun') {
    // ----------------------------------------------------------------
    // SS-02: THE SUN (SOLAR SYSTEM PLANETARY BARRAGE & SOLAR SUPERNOVA PLUNGE)
    // Phase 1 (0 - 4200ms): 8 planets sequentially break orbit & plunge to arena floor!
    // Phase 2 (4200 - 6500ms): Colossal thermonuclear Sun gathers mass & plunges for ultimate cataclysmic damage!
    // ----------------------------------------------------------------
    drawGalacticDust(ctx, width, height, now);

    const PLANET_DEFS = [
      { name: 'Sao Thủy', en: 'Mercury', r: 4.5, a: 68, b: 34, speed: 0.0055, color: '#94a3b8', stroke: '#cbd5e1' },
      { name: 'Sao Kim', en: 'Venus', r: 6.5, a: 98, b: 48, speed: 0.0042, color: '#facc15', stroke: '#fef08a' },
      { name: 'Trái Đất', en: 'Earth', r: 7.5, a: 128, b: 62, speed: 0.0032, color: '#0284c7', stroke: '#38bdf8', hasMoon: true },
      { name: 'Sao Hỏa', en: 'Mars', r: 5.5, a: 158, b: 76, speed: 0.0025, color: '#ef4444', stroke: '#f87171' },
      { name: 'Sao Mộc', en: 'Jupiter', r: 16.0, a: 198, b: 94, speed: 0.0018, color: '#f97316', stroke: '#fed7aa', isBanded: true },
      { name: 'Sao Thổ', en: 'Saturn', r: 13.5, a: 238, b: 112, speed: 0.0014, color: '#eab308', stroke: '#fef9c3', hasRing: true },
      { name: 'Sao Thiên Vương', en: 'Uranus', r: 10.0, a: 278, b: 130, speed: 0.0011, color: '#06b6d4', stroke: '#a5f3fc' },
      { name: 'Sao Hải Vương', en: 'Neptune', r: 9.5, a: 318, b: 148, speed: 0.0008, color: '#3b82f6', stroke: '#93c5fd' }
    ];

    const sunBaseY = cy - 25;

    // Phase 1: Planets sequentially plunge downward
    if (elapsed < 4200) {
      // 1. Draw central Sun
      const sunR = 36 + Math.sin(now * 0.03) * 3;

      // Outer golden solar corona
      const coronaGrad = ctx.createRadialGradient(cx, sunBaseY, sunR * 0.5, cx, sunBaseY, sunR * 2.2);
      coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coronaGrad.addColorStop(0.25, 'rgba(253, 224, 71, 0.85)');
      coronaGrad.addColorStop(0.55, 'rgba(249, 115, 22, 0.5)');
      coronaGrad.addColorStop(0.85, 'rgba(239, 68, 68, 0.2)');
      coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(cx, sunBaseY, sunR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Blazing solar prominences looping off the Sun
      for (let p = 0; p < 8; p++) {
        const pAng = (p * Math.PI * 2) / 8 + now * 0.003;
        const pLen = sunR * (1.25 + Math.sin(now * 0.02 + p) * 0.35);
        ctx.strokeStyle = p % 2 === 0 ? 'rgba(254, 240, 138, 0.8)' : 'rgba(249, 115, 22, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(pAng) * (sunR * 0.8), sunBaseY + Math.sin(pAng) * (sunR * 0.8));
        ctx.quadraticCurveTo(
          cx + Math.cos(pAng + 0.3) * pLen,
          sunBaseY + Math.sin(pAng + 0.3) * pLen,
          cx + Math.cos(pAng + 0.5) * (sunR * 0.9),
          sunBaseY + Math.sin(pAng + 0.5) * (sunR * 0.9)
        );
        ctx.stroke();
      }

      // Solid glowing Sun core
      const sunCoreGrad = ctx.createRadialGradient(cx, sunBaseY, 2, cx, sunBaseY, sunR);
      sunCoreGrad.addColorStop(0, '#ffffff');
      sunCoreGrad.addColorStop(0.4, '#fef08a');
      sunCoreGrad.addColorStop(0.75, '#f59e0b');
      sunCoreGrad.addColorStop(1, '#ea580c');
      ctx.fillStyle = sunCoreGrad;
      ctx.beginPath();
      ctx.arc(cx, sunBaseY, sunR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 8 Planetary Orbits & Planets
      const planetInterval = 480; // ~480ms per planet
      const curPlanetIdx = Math.min(7, Math.floor(elapsed / planetInterval));

      PLANET_DEFS.forEach((planet, idx) => {
        const launchTime = idx * planetInterval;
        const isPlunging = elapsed >= launchTime;

        if (!isPlunging) {
          // In stable orbit
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.ellipse(cx, sunBaseY, planet.a, planet.b, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Orbit position
          const theta = now * planet.speed + idx * 1.3;
          const px = cx + Math.cos(theta) * planet.a;
          const py = sunBaseY + Math.sin(theta) * planet.b;

          // Planet body
          ctx.fillStyle = planet.color;
          ctx.strokeStyle = planet.stroke;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, planet.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Special rings/features
          if (planet.hasRing) {
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(0.35);
            ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.r * 2.2, planet.r * 0.6, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          if (planet.isBanded) {
            ctx.strokeStyle = 'rgba(124, 45, 18, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px - planet.r * 0.8, py);
            ctx.lineTo(px + planet.r * 0.8, py);
            ctx.stroke();
          }
          if (planet.hasMoon) {
            const mAng = now * 0.01;
            ctx.fillStyle = '#cbd5e1';
            ctx.beginPath();
            ctx.arc(px + Math.cos(mAng) * (planet.r + 5), py + Math.sin(mAng) * (planet.r + 5), 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Plunging straight down to arena floor!
          const plungeProgress = Math.min(1, (elapsed - launchTime) / 600);
          const startTheta = (launchTime * 0.001) * planet.speed + idx * 1.3;
          const startX = cx + Math.cos(startTheta) * planet.a;
          const startY = sunBaseY + Math.sin(startTheta) * planet.b;

          const destX = cx + (idx % 2 === 0 ? -1 : 1) * (idx * 16);
          const destY = height + 40;

          const px = startX + (destX - startX) * plungeProgress;
          const py = startY + Math.pow(plungeProgress, 1.8) * (destY - startY);

          // Fiery re-entry tail
          const tailLen = 70 + plungeProgress * 60;
          const tailGrad = ctx.createLinearGradient(px, py, px, py - tailLen);
          tailGrad.addColorStop(0, '#ffffff');
          tailGrad.addColorStop(0.25, '#f59e0b');
          tailGrad.addColorStop(0.7, '#ef4444');
          tailGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
          ctx.fillStyle = tailGrad;
          ctx.beginPath();
          ctx.moveTo(px - planet.r * 1.3, py);
          ctx.lineTo(px, py - tailLen);
          ctx.lineTo(px + planet.r * 1.3, py);
          ctx.closePath();
          ctx.fill();

          // Fiery re-entry shockwave rings
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, planet.r * 1.6, 0, Math.PI * 2);
          ctx.stroke();

          // Planet core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, planet.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      drawBannerText(
        ctx,
        `☀️ [SS-02: THE SUN]: HÀNH TINH #${curPlanetIdx + 1}/8 [${PLANET_DEFS[curPlanetIdx].name.toUpperCase()} (${PLANET_DEFS[curPlanetIdx].en.toUpperCase()})] PHÓNG LAO XUỐNG VÕ ĐÀI!`,
        '#facc15',
        cx,
        height - 35
      );
    } else {
      // Phase 2 (4200ms - 6500ms): The colossal Sun gathers thermonuclear mass & plunges downward!
      const t = Math.min(1, (elapsed - 4200) / 2300);
      const sunY = sunBaseY + Math.pow(t, 2.2) * (height * 0.8);
      const sunRadius = 45 + t * 40;

      // Colossal solar thermonuclear tail extending 280px upward
      const tailLen = 280;
      const tailGrad = ctx.createLinearGradient(cx, sunY, cx, sunY - tailLen);
      tailGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      tailGrad.addColorStop(0.2, 'rgba(254, 240, 138, 0.95)');
      tailGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.7)');
      tailGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.35)');
      tailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(cx - sunRadius * 1.6, sunY);
      ctx.lineTo(cx, sunY - tailLen);
      ctx.lineTo(cx + sunRadius * 1.6, sunY);
      ctx.closePath();
      ctx.fill();

      // Coronal thermal blast rings
      for (let r = 1; r <= 4; r++) {
        const ringProg = ((t * 3 + r * 0.25) % 1);
        ctx.strokeStyle = `rgba(254, 240, 138, ${(1 - ringProg) * 0.9})`;
        ctx.lineWidth = 5 * (1 - ringProg);
        ctx.beginPath();
        ctx.arc(cx, sunY, sunRadius + ringProg * 160, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Blazing solar corona aura
      const sunCorona = ctx.createRadialGradient(cx, sunY, sunRadius * 0.4, cx, sunY, sunRadius * 2.4);
      sunCorona.addColorStop(0, '#ffffff');
      sunCorona.addColorStop(0.35, '#fef08a');
      sunCorona.addColorStop(0.7, '#f97316');
      sunCorona.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = sunCorona;
      ctx.beginPath();
      ctx.arc(cx, sunY, sunRadius * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // Blinding white-hot core
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      drawBannerText(
        ctx,
        '🔥☀️ CẢ HỆ MẶT TRỜI GIÁNG THẾ! ĐẠI MẶT TRỜI LAO XUỐNG SÀN ĐẤU GÂY SÁT THƯƠNG CỰC ĐẠI!',
        '#ffedd5',
        cx,
        height - 35
      );
    }
  } else if (cs.skillKey === 'ss03_gungir') {
    // ----------------------------------------------------------------
    // SS-03: GUNGIR (JUPITER SPLIT & TUNGSTEN ARROW & TSAR BOMBA)
    // 1. Earth orange targeting beam (0-1400ms)
    // 2. Flight reaching Jupiter (1400-3200ms)
    // 3. Jupiter splits open & Tungsten Arrow appears (3200-5200ms)
    // 4. Tungsten rod hyper-speed spin & plunge (5200-7200ms)
    // ----------------------------------------------------------------
    if (elapsed < 1400) {
      // Orange targeting beam from Earth
      const earthRadius = 80;
      const earthY = cy + 45;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(cx, earthY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Orange beam piercing space
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(cx, earthY - earthRadius * 0.5);
      ctx.lineTo(cx, 0);
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      drawBannerText(ctx, '🛰️ [SS-03: GUNGIR] - TIA SÁNG CAM KÍCH HOẠT HỆ THỐNG...', '#f97316', cx, height - 35);
    } else if (elapsed < 3200) {
      // Reaching Jupiter
      const t = (elapsed - 1400) / 1800;
      const jupRadius = 75 + t * 25;
      drawJupiter(ctx, cx, cy, jupRadius, 0);

      drawBannerText(ctx, '🪐 TIẾP CẬN SAO MỘC (JUPITER)...', '#fb923c', cx, height - 35);
    } else if (elapsed < 5200) {
      // Cataclysmic event: Jupiter physically splits and separates into TWO distinct planetary bodies!
      const t = (elapsed - 3200) / 2000;
      drawJupiterSplitIntoTwo(ctx, cx, cy, 95, t, now);

      // Pitch-black Arrow emerging from the celestial abyss between the two separated Jupiter bodies!
      // Rotating axially like a drill bit with rifling spiral grooves and dark neon halo
      const arrowSlowRot = (elapsed - 3200) * 0.005;
      drawPitchBlackDrillArrow(ctx, cx, cy, arrowSlowRot, 1.25 + t * 0.25, 0, false, now);

      drawBannerText(ctx, '💥 SAO MỘC PHÂN TÁCH THÀNH 2 NỬA HÀNH TINH! MŨI TÊN ĐEN NGÒM XOAY NHƯ MŨI KHOAN XUẤT HIỆN!', '#fdba74', cx, height - 35);
    } else {
      // 3D Pitch-black Arrow spinning at hyper-speed like a supersonic drill on its axis & plunging downward
      const arrowFastRot = (now - cs.startTime) * 0.055;
      const plungeProgress = Math.min(1, (elapsed - 5200) / 2000);
      const plungeY = cy + plungeProgress * 45;

      // Re-entry dark void / thermonuclear fire vortex
      ctx.save();
      ctx.translate(cx, plungeY);

      // Multilayer re-entry vortex
      const fireGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 135);
      fireGrad.addColorStop(0, '#ffffff');
      fireGrad.addColorStop(0.2, '#f97316');
      fireGrad.addColorStop(0.5, '#7c3aed');
      fireGrad.addColorStop(0.8, '#090d16');
      fireGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 135, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Cavitation Spiral Rings pulsing outwards
      ctx.strokeStyle = 'rgba(255, 237, 213, 0.85)';
      ctx.lineWidth = 2.5;
      for (let cr = 0; cr < 4; cr++) {
        const cPhase = ((now * 0.006 + cr * 0.25) % 1);
        ctx.beginPath();
        ctx.ellipse(0, 25 * cPhase, 35 + cPhase * 95, (35 + cPhase * 95) * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Supersonic shockwave diamonds
      for (let dia = 0; dia < 3; dia++) {
        const diaPhase = ((now * 0.008 + dia * 0.33) % 1);
        const diaY = -80 - diaPhase * 60;
        ctx.strokeStyle = dia % 2 === 0 ? '#38bdf8' : '#fde047';
        ctx.lineWidth = 2;
        ctx.strokeRect(-12 * (1 - diaPhase), diaY, 24 * (1 - diaPhase), 14);
      }

      drawPitchBlackDrillArrow(ctx, 0, 0, arrowFastRot, 1.6, 0, true, now);
      ctx.restore();

      drawBannerText(ctx, '🌪️ MŨI TÊN ĐEN NGÒM XOAY TÍT NHƯ MŨI KHOAN SIÊU ÂM - GIÁNG THẾ VỤ NỔ SA HOÀNG!', '#ea580c', cx, height - 35);
    }
  } else if (cs.skillKey === 'ss04_seven_star') {
    // ----------------------------------------------------------------
    // SS-04: SEVEN STAR (BẮC ĐẨU THẤT TINH - CHÒM SAO ĐÍCH THỰC)
    // 7 ngôi sao Bắc Đẩu: Thiên Xu, Thiên Tuyền, Thiên Cơ, Thiên Quyền,
    // Ngọc Hoành, Khai Dương, Dao Quang.
    // Từng cái nạp năng lượng -> nạp xong thì lao xuống -> cứ lặp lại!
    // Cái nạp đầu tiên được chọn NGẪU NHIÊN!
    // ----------------------------------------------------------------
    const BIG_DIPPER_STARS = [
      { id: 0, name: 'Thiên Xu', en: 'Dubhe', glyph: 'α', xR: 0.29, yR: 0.25, color: '#fde047', size: 9 },
      { id: 1, name: 'Thiên Tuyền', en: 'Merak', glyph: 'β', xR: 0.27, yR: 0.44, color: '#38bdf8', size: 8.5 },
      { id: 2, name: 'Thiên Cơ', en: 'Phecda', glyph: 'γ', xR: 0.43, yR: 0.48, color: '#60a5fa', size: 8.5 },
      { id: 3, name: 'Thiên Quyền', en: 'Megrez', glyph: 'δ', xR: 0.47, yR: 0.32, color: '#c084fc', size: 7.5 },
      { id: 4, name: 'Ngọc Hoành', en: 'Alioth', glyph: 'ε', xR: 0.61, yR: 0.29, color: '#fde047', size: 10 },
      { id: 5, name: 'Khai Dương', en: 'Mizar', glyph: 'ζ', xR: 0.73, yR: 0.23, color: '#a78bfa', size: 9 },
      { id: 6, name: 'Dao Quang', en: 'Alkaid', glyph: 'η', xR: 0.85, yR: 0.16, color: '#38bdf8', size: 9.5 }
    ];

    // Compute screen coordinates for the 7 stars
    const starCoords = BIG_DIPPER_STARS.map(s => ({
      ...s,
      x: s.xR * width,
      y: s.yR * height
    }));

    // Ensure first star is randomly selected for the loop
    if (!cs.data || typeof cs.data.firstStarIndex !== 'number') {
      cs.data = {
        firstStarIndex: Math.floor(Math.random() * 7),
        startTime: now
      };
    }
    const firstIdx = cs.data.firstStarIndex;

    // Background Celestial Astral Wheel & Ley Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy * 0.7, width * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    // 1. Draw Authentic Constellation Connecting Ley Lines
    // Bowl: Thiên Xu (0) -> Thiên Tuyền (1) -> Thiên Cơ (2) -> Thiên Quyền (3) -> Thiên Xu (0)
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(starCoords[0].x, starCoords[0].y);
    ctx.lineTo(starCoords[1].x, starCoords[1].y);
    ctx.lineTo(starCoords[2].x, starCoords[2].y);
    ctx.lineTo(starCoords[3].x, starCoords[3].y);
    ctx.closePath();
    ctx.stroke();

    // Handle: Thiên Quyền (3) -> Ngọc Hoành (4) -> Khai Dương (5) -> Dao Quang (6)
    ctx.beginPath();
    ctx.moveTo(starCoords[3].x, starCoords[3].y);
    ctx.lineTo(starCoords[4].x, starCoords[4].y);
    ctx.lineTo(starCoords[5].x, starCoords[5].y);
    ctx.lineTo(starCoords[6].x, starCoords[6].y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pointer line from Merak through Dubhe pointing northwards
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(starCoords[1].x, starCoords[1].y);
    ctx.lineTo(starCoords[0].x, starCoords[0].y);
    ctx.lineTo(starCoords[0].x + (starCoords[0].x - starCoords[1].x) * 1.5, starCoords[0].y + (starCoords[0].y - starCoords[1].y) * 1.5);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Cycle Choreography:
    // Từng ngôi sao nạp năng lượng -> nạp xong thì lao xuống -> cứ lặp lại!
    // Bắt đầu từ firstIdx (ngẫu nhiên)
    const STEP_DURATION = 980; // ~1s per star
    const currentStep = Math.floor(elapsed / STEP_DURATION);
    const activeStarIdx = (firstIdx + currentStep) % 7;
    const stepProgress = elapsed % STEP_DURATION;
    const isCharging = stepProgress < 560; // 0-560ms: Nạp năng lượng
    const plungeProgress = isCharging ? 0 : (stepProgress - 560) / 420; // 560-980ms: Lao xuống!

    const activeStar = starCoords[activeStarIdx];

    // 3. Render all stationary constellation stars
    starCoords.forEach((st, idx) => {
      const isCurrent = idx === activeStarIdx;
      // If this star is plunging, we draw its diving meteor separately
      if (isCurrent && !isCharging) return;

      const baseRad = st.size;
      const chargeScale = isCurrent && isCharging ? 1 + (stepProgress / 560) * 1.2 : 1;
      const rad = baseRad * chargeScale;

      // Celestial Aura Halo
      const sGrad = ctx.createRadialGradient(st.x, st.y, 2, st.x, st.y, rad * 2.8);
      sGrad.addColorStop(0, '#ffffff');
      sGrad.addColorStop(0.35, st.color);
      sGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.4)');
      sGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(st.x, st.y, rad * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Core Star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(st.x, st.y, rad * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // 4-point diffraction spike
      ctx.strokeStyle = isCurrent ? '#ffffff' : st.color;
      ctx.lineWidth = isCurrent ? 2 : 1.2;
      const spikeLen = rad * (isCurrent ? 3.2 : 1.8);
      ctx.beginPath();
      ctx.moveTo(st.x - spikeLen, st.y);
      ctx.lineTo(st.x + spikeLen, st.y);
      ctx.moveTo(st.x, st.y - spikeLen);
      ctx.lineTo(st.x, st.y + spikeLen);
      ctx.stroke();

      // Sacred Chinese/Vietnamese Star Name Label
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = isCurrent ? '#facc15' : '#e2e8f0';
      ctx.textAlign = 'center';
      ctx.fillText(`${st.name} (${st.glyph})`, st.x, st.y + rad + 14);

      // Inward energy streams when charging
      if (isCurrent && isCharging) {
        for (let ray = 0; ray < 8; ray++) {
          const rAng = (ray * Math.PI) / 4 + now * 0.006;
          const rDist = 55 - (stepProgress * 0.08) % 45;
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(st.x + Math.cos(rAng) * rDist, st.y + Math.sin(rAng) * rDist);
          ctx.lineTo(st.x + Math.cos(rAng) * (rDist - 12), st.y + Math.sin(rAng) * (rDist - 12));
          ctx.stroke();
        }

        // Concentric charging pulse ring
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(st.x, st.y, rad * 2.2 + Math.sin(now * 0.02) * 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 4. Render Active Star Plunging Downward ("nạp xong thì lao xuống")
    if (!isCharging) {
      const startX = activeStar.x;
      const startY = activeStar.y;
      const targetY = height - 60;
      const currentY = startY + plungeProgress * (targetY - startY + 50);

      // Blazing Celestial Comet Tail
      const tailGrad = ctx.createLinearGradient(startX, currentY, startX, currentY - 140);
      tailGrad.addColorStop(0, '#ffffff');
      tailGrad.addColorStop(0.2, '#fde047');
      tailGrad.addColorStop(0.6, '#f97316');
      tailGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(startX - 18, currentY);
      ctx.lineTo(startX, currentY - 140);
      ctx.lineTo(startX + 18, currentY);
      ctx.closePath();
      ctx.fill();

      // Diving Star Core
      drawStellarMeteor(ctx, startX, currentY, Math.PI / 2, 16, activeStar.color, now);

      // Impact explosion when near bottom
      if (plungeProgress > 0.8) {
        const impactR = (plungeProgress - 0.8) * 5 * 80;
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(startX, targetY, impactR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Banner Text updating dynamically per star
    if (isCharging) {
      drawBannerText(
        ctx,
        `⭐ [NGÔI SAO #${activeStarIdx + 1}/7: ${activeStar.name.toUpperCase()}]: ĐANG NẠP ĐẦY NĂNG LƯỢNG VŨ TRỤ...`,
        '#fde047',
        cx,
        height - 35
      );
    } else {
      drawBannerText(
        ctx,
        `☄️ [${activeStar.name.toUpperCase()} NẠP XONG]: LAO XUỐNG SÀN ĐẤU (5.000 DMG) -> CHUẨN BỊ SAO KẾ TIẾP!`,
        '#f97316',
        cx,
        height - 35
      );
    }
  } else if (cs.skillKey === 'ss05_tesseract') {
    // ----------------------------------------------------------------
    // SS-05: TESSERACT (4D HYPERCUBE & SPACETIME RIFT)
    // 1. Direct to Milky Way 4D hypercube moving (0-2000ms)
    // 2. Opens dimensional rift over arena (2000-3600ms)
    // 3. Emerges, rotates, aligns perpendicular (3600-5000ms)
    // 4. Plunges to arena (5000-6500ms)
    // ----------------------------------------------------------------
    if (elapsed < 2000) {
      // Moving 4D Hypercube in Milky Way Galaxy
      drawGalacticDust(ctx, width, height, now);
      drawStellarTesseractObject(ctx, cx, cy, 75, now * 0.002, 0.3, now);

      drawBannerText(ctx, '💠 [SS-05: TESSERACT] - SIÊU LẬP PHƯƠNG 4D TRONG DẢI NGÂN HÀ...', '#06b6d4', cx, height - 35);
    } else if (elapsed < 3600) {
      // Opening Hyperspace Rift right over arena
      drawGalacticDust(ctx, width, height, now);

      // Dimensional Wormhole / Rift
      const riftPulse = Math.sin(now * 0.015) * 8;
      const riftGrad = ctx.createRadialGradient(cx, cy - 25, 10, cx, cy - 25, 95 + riftPulse);
      riftGrad.addColorStop(0, '#ffffff');
      riftGrad.addColorStop(0.3, '#38bdf8');
      riftGrad.addColorStop(0.7, '#8b5cf6');
      riftGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = riftGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 95 + riftPulse, 0, Math.PI * 2);
      ctx.fill();

      // Rift event horizon ring
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 55 + riftPulse * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      drawBannerText(ctx, '🌀 MỞ CỔNG KHÔNG GIAN SIÊU CHIỀU TRÊN ĐỈNH ĐẤU TRƯỜNG...', '#a855f7', cx, height - 35);
    } else if (elapsed < 5000) {
      // Tesseract emerges, rotates, balances perpendicular
      const t = (elapsed - 3600) / 1400;
      // Portal background
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 110, 0, Math.PI * 2);
      ctx.fill();

      // Rotates then slows down to perpendicular alignment
      const rot = t < 0.7 ? now * 0.003 : 0; // locks to 0 (perpendicular) at end!
      drawStellarTesseractObject(ctx, cx, cy - 25, 80, rot, 1.0, now);

      drawBannerText(ctx, '📐 TESSERACT CÂN BẰNG VUÔNG GÓC HOÀN HẢO...', '#38bdf8', cx, height - 35);
    } else {
      // Plunging down to arena
      const plungeT = Math.min(1, (elapsed - 5000) / 1500);
      const curY = (cy - 25) + plungeT * (height * 0.6);
      drawStellarTesseractObject(ctx, cx, curY, 85 + plungeT * 20, 0, 1.0, now);

      drawBannerText(ctx, '⚡ LAO XUỐNG PHÌNH TO NỔ 5 LẦN (6.500 DMG) & NỔ HỦY DIỆT (20.000 DMG)!', '#06b6d4', cx, height - 35);
    }
  } else if (cs.skillKey === 'ss06_halley') {
    // ----------------------------------------------------------------
    // SS-06: HALLEY (COMET HALLEY DEEP SPACE TRANSIT & TARGET LOCK)
    // 1. Comet Halley flying in deep space (0-2400ms)
    // 2. Vector Course Correction & Reticle Lock (2400-4200ms)
    // 3. Sublight Dive with Distance Telemetry Countdown (4200-6200ms)
    // ----------------------------------------------------------------
    if (elapsed < 2400) {
      // Phase 1: Comet Halley cruising gracefully in deep space
      const t = elapsed / 2400;
      const cometX = width * 0.15 + t * (width * 0.45);
      const cometY = height * 0.35 + Math.sin(t * Math.PI) * 20;

      // Deep space nebula background
      const nebGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, width * 0.7);
      nebGrad.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      nebGrad.addColorStop(0.5, 'rgba(3, 105, 161, 0.25)');
      nebGrad.addColorStop(1, 'rgba(2, 6, 23, 0.95)');
      ctx.fillStyle = nebGrad;
      ctx.fillRect(0, 0, width, height);

      // Starfield
      drawGalacticDust(ctx, width, height, now);

      // Draw massive sweeping ion tail (Cyan & Electric Ice Blue)
      ctx.save();
      const tailLen = 220;
      const tailGrad = ctx.createLinearGradient(cometX, cometY, cometX - tailLen, cometY - 45);
      tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      tailGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.85)');
      tailGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.4)');
      tailGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(cometX, cometY);
      ctx.lineTo(cometX - tailLen, cometY - 65);
      ctx.lineTo(cometX - tailLen * 0.85, cometY - 15);
      ctx.lineTo(cometX - tailLen, cometY + 35);
      ctx.closePath();
      ctx.fill();

      // Ion Tail Particle Streaks
      for (let p = 0; p < 16; p++) {
        const pFrac = ((now * 0.002 + p * 0.06) % 1);
        const px = cometX - pFrac * tailLen;
        const py = cometY - 20 + (p % 7 - 3) * 12 + Math.sin(now * 0.01 + p) * 6;
        ctx.fillStyle = p % 2 === 0 ? '#ffffff' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 1.8 * (1 - pFrac), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Comet Nucleus & Coma
      const comaGrad = ctx.createRadialGradient(cometX, cometY, 2, cometX, cometY, 32);
      comaGrad.addColorStop(0, '#ffffff');
      comaGrad.addColorStop(0.35, '#7dd3fc');
      comaGrad.addColorStop(0.7, '#0284c7');
      comaGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = comaGrad;
      ctx.beginPath();
      ctx.arc(cometX, cometY, 32, 0, Math.PI * 2);
      ctx.fill();

      // Icy Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cometX, cometY, 9, 0, Math.PI * 2);
      ctx.fill();

      // Deep Space Sci-Fi Telemetry HUD
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.font = 'bold 9.5px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('CELESTIAL OBJECT: 1P/HALLEY', 24, 40);
      ctx.fillText('SPEED: 70.56 KM/S | ORBIT: RETROGRADE', 24, 55);
      ctx.fillText('TRAJECTORY: DEEP SOLAR TRANSIT', 24, 70);
      ctx.fillText('DISTANCE TO TARGET: 480,000,000 KM', 24, 85);

      drawBannerText(ctx, '☄️ [SS-06: HALLEY] - SAO BĂNG HALLEY ĐANG BAY NGOÀI KHÔNG GIAN SÂU...', '#38bdf8', cx, height - 35);
    } else if (elapsed < 4200) {
      // Phase 2: Vector Course Correction ("nó bắt đầu chuyển hướng")
      const t = (elapsed - 2400) / 1800;
      const cometX = width * 0.58;
      const cometY = height * 0.38;

      drawGalacticDust(ctx, width, height, now);

      // Orbital Trajectory Curve Line showing course deviation
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(cometX - 160, cometY - 80);
      ctx.quadraticCurveTo(cometX, cometY, cx, height * 0.75);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Gravity Thruster Ignition Plumes on the nucleus!
      const thrusterAngle = Math.PI * 0.75 + t * Math.PI * 0.5;
      for (let jet = 0; jet < 3; jet++) {
        const jAng = thrusterAngle + (jet - 1) * 0.25;
        const jLen = 45 + Math.sin(now * 0.05 + jet) * 15;
        const jGrad = ctx.createLinearGradient(cometX, cometY, cometX + Math.cos(jAng) * jLen, cometY + Math.sin(jAng) * jLen);
        jGrad.addColorStop(0, '#ffffff');
        jGrad.addColorStop(0.3, '#38bdf8');
        jGrad.addColorStop(0.7, '#6366f1');
        jGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = jGrad;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cometX, cometY);
        ctx.lineTo(cometX + Math.cos(jAng) * jLen, cometY + Math.sin(jAng) * jLen);
        ctx.stroke();
      }

      // Halley turning towards the viewer/target
      const headTurnScale = 1.0 + t * 0.6;
      const comaGrad = ctx.createRadialGradient(cometX, cometY, 2, cometX, cometY, 40 * headTurnScale);
      comaGrad.addColorStop(0, '#ffffff');
      comaGrad.addColorStop(0.3, '#38bdf8');
      comaGrad.addColorStop(0.7, '#0284c7');
      comaGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = comaGrad;
      ctx.beginPath();
      ctx.arc(cometX, cometY, 40 * headTurnScale, 0, Math.PI * 2);
      ctx.fill();

      // Tactical Target Lock Reticle over Arena
      const retX = cx;
      const retY = height * 0.75;
      const retSize = 36 * (1 - t * 0.3);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(retX - retSize, retY - retSize, retSize * 2, retSize * 2);
      ctx.beginPath();
      ctx.moveTo(retX - retSize - 8, retY);
      ctx.lineTo(retX + retSize + 8, retY);
      ctx.moveTo(retX, retY - retSize - 8);
      ctx.lineTo(retX, retY + retSize + 8);
      ctx.stroke();

      // HUD Warning & Course Correction Data
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('⚠️ COURSE CORRECTION: ACTIVE', 24, 40);
      ctx.fillText('ORBITAL DEFLECTION: +142.8°', 24, 55);
      ctx.fillText('KHÓA TỌA ĐỘ MỤC TIÊU SÀN ĐẤU: 100%', 24, 70);
      ctx.fillText('SUBLIGHT DRIVE CHARGING...', 24, 85);

      drawBannerText(ctx, '🛰️ SAO BĂNG HALLEY BẮT ĐẦU CHUYỂN HƯỚNG QUỸ ĐẠO - KHÓA TỌA ĐỘ MỤC TIÊU!', '#fb923c', cx, height - 35);
    } else {
      // Phase 3: Plunging directly with real-time distance telemetry countdown!
      // ("dữ liệu khoảng cách đến mục tiêu: khi lao đến sẽ nổ gây 60000 dmg")
      const t = Math.min(1, (elapsed - 4200) / 2000);
      drawGalacticDust(ctx, width, height, now);

      // Distance countdown calculation: 480,000,000 KM -> 0 KM!
      const remainingKm = Math.max(0, Math.round(480000000 * Math.pow(1 - t, 2.8)));
      const velocityKmS = Math.round(70.56 + t * 299720);
      const countdownSec = Math.max(0, 2.0 - t * 2.0).toFixed(2);

      // Head-on view of Halley accelerating directly at screen!
      const headScale = 1.2 + Math.pow(t, 2) * 5.5;
      const headY = cy * 0.85 + t * (height * 0.25);

      // Compression Plasma Shockwaves
      for (let w = 1; w <= 4; w++) {
        const wProg = ((now * 0.005 + w * 0.25) % 1);
        ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - wProg) * 0.85})`;
        ctx.lineWidth = 3.5 * (1 - wProg);
        ctx.beginPath();
        ctx.ellipse(cx, headY, (40 + wProg * 140) * headScale * 0.4, (20 + wProg * 70) * headScale * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Blinding Comet Nucleus expanding
      const nGrad = ctx.createRadialGradient(cx, headY, 5, cx, headY, 45 * headScale);
      nGrad.addColorStop(0, '#ffffff');
      nGrad.addColorStop(0.25, '#7dd3fc');
      nGrad.addColorStop(0.55, '#0284c7');
      nGrad.addColorStop(0.85, '#1e1b4b');
      nGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nGrad;
      ctx.beginPath();
      ctx.arc(cx, headY, 45 * headScale, 0, Math.PI * 2);
      ctx.fill();

      // Tactical Sci-Fi Telemetry HUD (Dữ liệu khoảng cách đến mục tiêu!)
      ctx.save();
      ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 150, 25, 300, 75);
      ctx.fillRect(cx - 150, 25, 300, 75);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('📡 DỮ LIỆU ĐO ĐẠC KHOẢNG CÁCH MỤC TIÊU', cx, 42);

      ctx.fillStyle = remainingKm > 50000 ? '#38bdf8' : '#ef4444';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`KHOẢNG CÁCH: ${remainingKm.toLocaleString()} KM`, cx, 63);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`VẬN TỐC: ${velocityKmS.toLocaleString()} KM/S | VA CHẠM: T - ${countdownSec}s`, cx, 83);
      ctx.restore();

      drawBannerText(ctx, '☄️ VA CHẠM THIÊN THẠCH KHỔNG LỒ VỚI TỐC ĐỘ ÁNH SÁNG - GIÁNG THẾ 60.000 DMG!', '#38bdf8', cx, height - 35);
    }
  } else if (cs.skillKey === 'ss21_quasar') {
    // ----------------------------------------------------------------
    // SS-21: QUASAR [ADD-ON] (AUTHENTIC REFERENCE ART & RELATIVISTIC JET)
    // 1. Quasar artwork Presentation with SS-21 Typography (0-2400ms)
    // 2. Accretion disc acceleration & condensing into singularity (2400-5000ms)
    // 3. Super White Laser Cannon Ignition downwards (5000-6800ms)
    // ----------------------------------------------------------------
    drawGalacticDust(ctx, width, height, now);

    if (elapsed < 2400) {
      // Phase 1: Reference image presentation ("SS-021 QUASAR [ADD-ON]")
      drawQuasarGraphic(ctx, cx, cy - 20, 140, now * 0.001, 1.0, true, now);
      drawBannerText(ctx, '🌌 [SS-021: QUASAR (ADD-ON)] - THIÊN HÀ QUASAR & LỖ ĐEN SIÊU KHỐI...', '#f472b6', cx, height - 35);
    } else if (elapsed < 5000) {
      // Phase 2: Accretion disc spins and condenses into singularity!
      // ("vòng xoáy quasar bắt đầu xoay và thu nhỏ vào tâm")
      const t = (elapsed - 2400) / 2600;
      const spin = (now * 0.002) + Math.pow(t, 2.5) * 16;
      const discR = 140 * Math.max(0.12, 1 - t * 0.85);
      const jetInt = 1.0 + t * 1.5;
      drawQuasarGraphic(ctx, cx, cy - 20, discR, spin, jetInt, false, now);

      // Gravitational lensing distortion ripples
      for (let r = 1; r <= 3; r++) {
        const rPhase = ((now * 0.004 + r * 0.33) % 1);
        ctx.strokeStyle = `rgba(244, 114, 182, ${(1 - rPhase) * 0.65})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy - 20, (1 - t * 0.7) * (60 + rPhase * 90), 0, Math.PI * 2);
        ctx.stroke();
      }

      drawBannerText(ctx, '🌀 VÒNG XOÁY ACCRETION DISC XOAY TÍT VÀ THU NHỎ NÉN VÀO TÂM LỖ ĐEN...', '#e879f9', cx, height - 35);
    } else {
      // Phase 3: Super White Laser shoots down!
      // ("rồi 1 siêu tia laser trắng bắn xuống")
      const t = Math.min(1, (elapsed - 5000) / 1800);
      drawQuasarGraphic(ctx, cx, cy - 20, 16, now * 0.02, 3.0, false, now);

      // Blinding Super White Laser Beam shooting down from the singularity through screen!
      const laserWidth = 35 + Math.sin(now * 0.05) * 8;
      // Violet outer corona
      const lGrad = ctx.createLinearGradient(cx - laserWidth * 2, 0, cx + laserWidth * 2, 0);
      lGrad.addColorStop(0, 'rgba(192, 132, 252, 0)');
      lGrad.addColorStop(0.3, 'rgba(224, 231, 255, 0.6)');
      lGrad.addColorStop(0.5, '#ffffff');
      lGrad.addColorStop(0.7, 'rgba(224, 231, 255, 0.6)');
      lGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
      ctx.fillStyle = lGrad;
      ctx.fillRect(cx - laserWidth * 2, cy - 20, laserWidth * 4, height);

      // Pure white central core
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 10, cy - 20, 20, height);

      // Expanding Ionization rings along the laser
      for (let ir = 0; ir < 4; ir++) {
        const irY = (cy - 20) + ((now * 0.35 + ir * 80) % (height - cy + 20));
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, irY, laserWidth * 1.6, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      drawBannerText(ctx, '⚡ SIÊU TIA LASER TRẮNG BẮN XUỐNG - GÂY SÁT THƯƠNG LIÊN HOÀN & NỔ KẾT LIỄU!', '#ffffff', cx, height - 35);
    }
  } else if (cs.skillKey === 'event_horizon') {
    // ----------------------------------------------------------------
    // SS-07: EVENT HORIZON (BLACK HOLE APERTURE & SINGULARITY COLLAPSE)
    // 1. Cosmic Aperture Core with provided image (0-2200ms)
    // 2. Purple energy absorption & condensation into black hole (2200-4000ms)
    // 3. Black hole plunges straight down to arena floor (4000-5500ms)
    // ----------------------------------------------------------------
    drawGalacticDust(ctx, width, height, now);

    const img = getEventHorizonImage();

    if (elapsed < 2200) {
      // Phase 1: Cosmic core activation with reference image
      const pulse = 1.0 + Math.sin(now * 0.008) * 0.06;
      const size = 150 * pulse;
      const imgX = cx;
      const imgY = cy - 20;

      // Outer purple nebular aura
      const auraGrad = ctx.createRadialGradient(imgX, imgY, size * 0.3, imgX, imgY, size * 1.3);
      auraGrad.addColorStop(0, 'rgba(217, 70, 239, 0.45)');
      auraGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
      auraGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(imgX, imgY, size * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Rotating electromagnetic plasma rings
      for (let r = 0; r < 3; r++) {
        const ringAngle = now * (0.002 + r * 0.001) * (r % 2 === 0 ? 1 : -1);
        ctx.save();
        ctx.translate(imgX, imgY);
        ctx.rotate(ringAngle);
        ctx.strokeStyle = r === 0 ? 'rgba(236, 72, 153, 0.8)' : r === 1 ? 'rgba(168, 85, 247, 0.7)' : 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 2.5 - r * 0.5;
        ctx.setLineDash([12, 6, 4, 6]);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * (0.65 + r * 0.15), size * (0.45 + r * 0.1), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw the circular high-tech core image
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.translate(imgX, imgY);
        ctx.rotate(now * 0.002);
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.52, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, -size * 0.55, -size * 0.55, size * 1.1, size * 1.1);
        ctx.restore();
      } else {
        const coreGrad = ctx.createRadialGradient(imgX, imgY, 10, imgX, imgY, size * 0.5);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.2, '#f472b6');
        coreGrad.addColorStop(0.6, '#9333ea');
        coreGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(imgX, imgY, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright rim stroke
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(imgX, imgY, size * 0.52, 0, Math.PI * 2);
      ctx.stroke();

      drawBannerText(ctx, '🌌 [SS-07: EVENT HORIZON - CHÂN TRỜI SỰ KIỆN]: KHỞI ĐỘNG CỔNG LỖ ĐEN VŨ TRỤ...', '#e879f9', cx, height - 35);
    } else if (elapsed < 4000) {
      // Phase 2: Purple energy vanishes & converges into the tip of a created black hole
      const t = (elapsed - 2200) / 1800;
      const imgX = cx;
      const imgY = cy - 20;

      const imgScale = Math.max(0.05, 1 - t * 0.9);
      const size = 150 * imgScale;

      // Inward swirling purple energy streams
      const streamCount = 16;
      for (let s = 0; s < streamCount; s++) {
        const baseAng = (s * Math.PI * 2) / streamCount + now * 0.008 + t * 4;
        const dist = (1 - t * 0.8) * (140 - ((now * 0.08 + s * 15) % 110));
        if (dist > 8) {
          const sx = imgX + Math.cos(baseAng) * dist;
          const sy = imgY + Math.sin(baseAng) * dist;
          ctx.strokeStyle = s % 2 === 0 ? 'rgba(236, 72, 153, 0.85)' : 'rgba(168, 85, 247, 0.85)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(imgX + Math.cos(baseAng + 0.3) * (dist * 0.7), imgY + Math.sin(baseAng + 0.3) * (dist * 0.7));
          ctx.stroke();
        }
      }

      // Emerging Black Hole at the center!
      const holeRadius = 14 + t * 24;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(imgX, imgY, holeRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(imgX, imgY, holeRadius + 8, 0, Math.PI * 2);
      ctx.stroke();

      // Pitch black event horizon center
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(imgX, imgY, holeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Residual image collapsing inside
      if (t < 0.7 && img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = 1 - t / 0.7;
        ctx.beginPath();
        ctx.arc(imgX, imgY, size * 0.5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, imgX - size * 0.5, imgY - size * 0.5, size, size);
        ctx.restore();
      }

      drawBannerText(ctx, '🕳️ NĂNG LƯỢNG TÍM BIẾN MẤT - HỘI TỤ VÀO ĐỈNH LỖ ĐEN ĐƯỢC TẠO RA...', '#c084fc', cx, height - 35);
    } else {
      // Phase 3: Black hole plunges downward from space toward the arena floor!
      const t = Math.min(1, (elapsed - 4000) / 1500);
      const holeY = (cy - 20) + t * (height * 0.65);
      const holeRadius = 38 + Math.sin(now * 0.02) * 3;

      const trailGrad = ctx.createLinearGradient(cx, holeY, cx, holeY - 180);
      trailGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      trailGrad.addColorStop(0.3, 'rgba(147, 51, 234, 0.7)');
      trailGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.3)');
      trailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = trailGrad;
      ctx.beginPath();
      ctx.moveTo(cx - holeRadius * 1.2, holeY);
      ctx.lineTo(cx, holeY - 180);
      ctx.lineTo(cx + holeRadius * 1.2, holeY);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, holeY, holeRadius + 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, holeY, holeRadius + 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(cx, holeY, holeRadius, 0, Math.PI * 2);
      ctx.fill();

      drawBannerText(ctx, '⚡ LỖ ĐEN RƠI XUỐNG SÀN ĐẤU - HÚT CỰC ĐẠI VÀ NỔ SỤP ĐỔ CHÂN TRỜI SỰ KIỆN!', '#ec4899', cx, height - 35);
    }
  } else if (cs.skillKey === 'neutron_star') {
    // ----------------------------------------------------------------
    // SS-08: NEUTRON STAR MERGER (KILONOVA BINARY INSPIRAL & HYPER-SPHERE IMPACT)
    // 1. Dual neutron stars spinning around each other & spiraling closer (0 - 3600ms)
    // 2. Collision & merger into dazzling white-hot hyper-dense sphere (3600 - 4800ms)
    // 3. Ultra-dense white sphere plunges downward into the arena (4800 - 6000ms)
    // ----------------------------------------------------------------
    drawGalacticDust(ctx, width, height, now);

    // Spacetime gravitational wave concentric ripple distortion
    const waveCount = 5;
    for (let w = 0; w < waveCount; w++) {
      const wavePhase = ((now * 0.003 + w * (1 / waveCount)) % 1);
      const waveRadius = 30 + wavePhase * 180;
      ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - wavePhase) * 0.45})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6, 2, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy - 20, waveRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (elapsed < 3600) {
      // Phase 1: 2 neutron stars orbiting each other, spiraling inward
      const t = elapsed / 3600;
      // Separation distance collapses from 135px to ~12px
      const sep = 135 * Math.pow(1 - t, 0.75);
      // Accelerating orbital frequency (gravitational chirp)
      const theta = (now * 0.004) + Math.pow(t, 2.5) * 28;

      const star1X = cx + Math.cos(theta) * sep;
      const star1Y = (cy - 20) + Math.sin(theta) * sep;
      const star2X = cx - Math.cos(theta) * sep;
      const star2Y = (cy - 20) - Math.sin(theta) * sep;

      // Accretion mass transfer streamer connecting the two
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.lineWidth = 3 + t * 4;
      ctx.beginPath();
      ctx.moveTo(star1X, star1Y);
      ctx.quadraticCurveTo(cx + Math.cos(theta + Math.PI / 2) * (sep * 0.35), (cy - 20) + Math.sin(theta + Math.PI / 2) * (sep * 0.35), star2X, star2Y);
      ctx.stroke();

      // Draw single neutron star
      const drawSingleNeutronStar = (sx: number, sy: number, ang: number) => {
        const starR = 14;

        // Outer cyan-blue magnetosphere
        const magGrad = ctx.createRadialGradient(sx, sy, 2, sx, sy, starR * 2.5);
        magGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        magGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
        magGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.4)');
        magGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = magGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, starR * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Relativistic magnetic polar jet beams
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(ang + Math.PI / 2);
        ctx.fillStyle = 'rgba(224, 242, 254, 0.9)';
        ctx.fillRect(-2, -starR * 3.5, 4, starR * 7);
        ctx.restore();

        // Dazzling white ultra-dense core
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sx, sy, starR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      drawSingleNeutronStar(star1X, star1Y, theta);
      drawSingleNeutronStar(star2X, star2Y, theta + Math.PI);

      drawBannerText(ctx, `🌌 [SS-08: NEUTRON STAR]: 2 NGÔI SAO NEUTRON QUAY QUANH VÀ TIẾP CẬN CỰC NHANH (K/C: ${Math.round(sep * 10)} KM)...`, '#38bdf8', cx, height - 35);
    } else if (elapsed < 4800) {
      // Phase 2: Kilonova merger! Blinding white-hot hyper-dense sphere formed
      const t = (elapsed - 3600) / 1200;
      const sphereRadius = 30 + Math.sin(now * 0.04) * 4 + t * 8;

      // Expanding kilonova shockwave rings
      for (let k = 0; k < 4; k++) {
        const ringProg = ((t * 2 + k * 0.25) % 1);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - ringProg) * 0.9})`;
        ctx.lineWidth = 4 * (1 - ringProg);
        ctx.beginPath();
        ctx.arc(cx, cy - 20, sphereRadius + ringProg * 140, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Starburst rays
      const rays = 12;
      for (let r = 0; r < rays; r++) {
        const rAng = (r * Math.PI * 2) / rays + now * 0.005;
        const rLen = sphereRadius * (2.0 + Math.sin(now * 0.02 + r) * 0.8);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx + Math.cos(rAng) * rLen, (cy - 20) + Math.sin(rAng) * rLen);
        ctx.stroke();
      }

      // Blinding white hyper-dense core sphere
      const whiteGrad = ctx.createRadialGradient(cx, cy - 20, 2, cx, cy - 20, sphereRadius * 1.5);
      whiteGrad.addColorStop(0, '#ffffff');
      whiteGrad.addColorStop(0.35, '#ffffff');
      whiteGrad.addColorStop(0.65, '#e0f2fe');
      whiteGrad.addColorStop(0.85, '#38bdf8');
      whiteGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = whiteGrad;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, sphereRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Pure white heart
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy - 20, sphereRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      drawBannerText(ctx, '⚡ HỢP NHẤT KILONOVA! HÓA THÀNH KHỐI CẦU TRẮNG SÁNG VÔ HẠN MẬT ĐỘ...', '#ffffff', cx, height - 35);
    } else {
      // Phase 3: The hyper-dense white sphere plunges downward into arena!
      const t = Math.min(1, (elapsed - 4800) / 1200);
      const sphereY = (cy - 20) + Math.pow(t, 2.2) * (height * 0.75);
      const sphereRadius = 36;

      // Radiant white-blue plasma tail behind the falling sphere
      const tailGrad = ctx.createLinearGradient(cx, sphereY, cx, sphereY - 240);
      tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      tailGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
      tailGrad.addColorStop(0.7, 'rgba(129, 140, 248, 0.4)');
      tailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(cx - sphereRadius * 1.4, sphereY);
      ctx.lineTo(cx, sphereY - 240);
      ctx.lineTo(cx + sphereRadius * 1.4, sphereY);
      ctx.closePath();
      ctx.fill();

      // Electric discharge rings along the fall path
      for (let e = 1; e <= 3; e++) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, sphereY - e * 35, sphereRadius * (1.2 + e * 0.2), 8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Blinding white hyper-dense core sphere
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, sphereY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, sphereY, sphereRadius + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      drawBannerText(ctx, '☄️ KHỐI CẦU TRẮNG SÁNG LAO XUỐNG SÀN ĐẤU - GÂY SÁT THƯƠNG KHỦNG KHIẾP + RADIATION DoT!', '#38bdf8', cx, height - 35);
    }
  } else if (cs.skillKey === 'ss_final_big_bang') {
    // ----------------------------------------------------------------
    // SS-FINAL: BIG BANG (CỖ MÁY GIA TỐC VŨ TRỤ & VỤ NỔ KHAI SINH THỰC TẠI)
    // Reference Image: /public/assets/aistudio/image_1085458f.png
    // Phase 1 (0 - 2400ms): Cỗ máy bắt đầu hoạt động, vòng quay máy móc xoay dần và tăng tốc.
    // Phase 2 (2400 - 4600ms): Vô số electron & proton gia tốc xoáy tròn vào tâm với tốc độ cực đại.
    // Phase 3 (4600 - 5800ms): Dung hợp lại tạo thành 1 điểm sáng kỳ dị (Quantum Singularity) rực chói vô tận.
    // Phase 4 (5800 - 7200ms): Phóng ra vụ nổ BIG BANG cực đại lao thẳng xuống sàn đấu!
    // ----------------------------------------------------------------
    drawGalacticDust(ctx, width, height, now);

    const machineImg = getBigBangMachineImage();
    const coreX = cx;
    const coreY = cy - 25;

    // Background cosmic space grid
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }
    ctx.restore();

    if (elapsed < 2400) {
      // --------------------------------------------------------------
      // PHASE 1: CỖ MÁY HOẠT ĐỘNG DẦN VÀ BẮT ĐẦU TĂNG TỐC
      // --------------------------------------------------------------
      const t = elapsed / 2400;
      const spinSpeed = 0.001 + Math.pow(t, 2) * 0.006;
      const machineScale = 0.95 + t * 0.08;

      // Draw uploaded machine reference image with circular aperture
      if (machineImg && machineImg.complete && machineImg.naturalWidth > 0) {
        ctx.save();
        ctx.translate(coreX, coreY);
        ctx.scale(machineScale, machineScale);
        ctx.globalAlpha = 0.88 + t * 0.12;
        const imgW = width * 0.96;
        const imgH = imgW * (machineImg.naturalHeight / machineImg.naturalWidth);
        ctx.drawImage(machineImg, -imgW / 2, -imgH / 2, imgW, imgH);
        ctx.restore();
      }

      // Dynamic mechanical gimbal rings rotating around the center
      drawMachineGimbalRings(ctx, coreX, coreY, now * spinSpeed, t, now);

      // Central nebular spiral vortex revving up
      drawCentralNebulaVortex(ctx, coreX, coreY, now * spinSpeed * 2, 45 + t * 25, 0.6);

      // 8 Radiant Laser Spokes starting to glow
      drawBigBang8LaserSpokes(ctx, coreX, coreY, width, height, now, 0.4 + t * 0.5);

      drawBannerText(
        ctx,
        '🌀 [SS-FINAL: BIG BANG] - CỖ MÁY GIA TỐC VŨ TRỤ KHỞI ĐỘNG & BẮT ĐẦU TĂNG TỐC...',
        '#38bdf8',
        cx,
        height - 35
      );
    } else if (elapsed < 4600) {
      // --------------------------------------------------------------
      // PHASE 2: VÔ SỐ ELECTRON & PROTON GIA TỐC DUNG HỢP VÀO TÂM
      // --------------------------------------------------------------
      const t = (elapsed - 2400) / 2200;
      const spinSpeed = 0.007 + Math.pow(t, 2.2) * 0.035;

      // Draw machine image with high contrast & pulsing energy
      if (machineImg && machineImg.complete && machineImg.naturalWidth > 0) {
        ctx.save();
        ctx.translate(coreX, coreY);
        ctx.scale(1.03, 1.03);
        const imgW = width * 0.96;
        const imgH = imgW * (machineImg.naturalHeight / machineImg.naturalWidth);
        ctx.drawImage(machineImg, -imgW / 2, -imgH / 2, imgW, imgH);
        ctx.restore();
      }

      // Fast spinning mechanical gimbal rings
      drawMachineGimbalRings(ctx, coreX, coreY, now * spinSpeed, 1.0, now);

      // 8 Radiant Laser Spokes reaching maximum intensity
      drawBigBang8LaserSpokes(ctx, coreX, coreY, width, height, now, 0.95);

      // Accelerated particle streams: 48+ Electrons (cyan) & 48+ Protons (fiery amber/gold)
      drawElectronProtonStreams(ctx, coreX, coreY, t, now);

      // Central nebular spiral vortex spinning violently
      drawCentralNebulaVortex(ctx, coreX, coreY, now * spinSpeed * 2.5, 70, 0.95);

      // Quantum lightning arcs discharging between rings and core
      drawQuantumLightningArcs(ctx, coreX, coreY, 130, 8, now);

      drawBannerText(
        ctx,
        '⚛️ VÔ SỐ ELECTRON & PROTON GIA TỐC VẬN TỐC ÁNH SÁNG DUNG HỢP VÀO TÂM...',
        '#facc15',
        cx,
        height - 35
      );
    } else if (elapsed < 5800) {
      // --------------------------------------------------------------
      // PHASE 3: DUNG HỢP TẠO THÀNH 1 ĐIỂM SÁNG KỲ DỊ (QUANTUM SINGULARITY)
      // --------------------------------------------------------------
      const t = (elapsed - 4600) / 1200;

      // Darkened background: all energy concentrated into the single infinitesimal point!
      ctx.fillStyle = `rgba(0, 0, 0, ${0.45 + t * 0.45})`;
      ctx.fillRect(0, 0, width, height);

      // Machine backdrop subtle silhouette
      if (machineImg && machineImg.complete && machineImg.naturalWidth > 0) {
        ctx.save();
        ctx.translate(coreX, coreY);
        ctx.globalAlpha = Math.max(0.2, 0.6 - t * 0.4);
        const imgW = width * 0.96;
        const imgH = imgW * (machineImg.naturalHeight / machineImg.naturalWidth);
        ctx.drawImage(machineImg, -imgW / 2, -imgH / 2, imgW, imgH);
        ctx.restore();
      }

      // 8 Laser Spokes focusing into the exact singularity point
      drawBigBang8LaserSpokes(ctx, coreX, coreY, width, height, now, 1.0);

      // Gravitational Lensing Rings warping space
      for (let r = 1; r <= 5; r++) {
        const ringProg = ((now * 0.005 + r * 0.2) % 1);
        const ringRad = 15 + ringProg * 140;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - ringProg) * 0.85})`;
        ctx.lineWidth = 3 * (1 - ringProg);
        ctx.beginPath();
        ctx.arc(coreX, coreY, ringRad, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(217, 70, 239, ${(1 - ringProg) * 0.6})`;
        ctx.lineWidth = 6 * (1 - ringProg);
        ctx.stroke();
      }

      // BLINDING ULTRA-DENSE POINT OF LIGHT (Điểm sáng kỳ dị)
      const singularityRad = 12 + t * 16;
      // Outer chromatic halo
      const singGrad = ctx.createRadialGradient(coreX, coreY, 2, coreX, coreY, singularityRad * 3.5);
      singGrad.addColorStop(0, '#ffffff');
      singGrad.addColorStop(0.25, '#ffffff');
      singGrad.addColorStop(0.5, '#38bdf8');
      singGrad.addColorStop(0.75, '#c084fc');
      singGrad.addColorStop(0.9, '#f43f5e');
      singGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = singGrad;
      ctx.beginPath();
      ctx.arc(coreX, coreY, singularityRad * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Pure white infinite density heart
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 45;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(coreX, coreY, singularityRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 8-way Cross Diffraction Spikes radiating outward
      drawDiffractionSpikes(ctx, coreX, coreY, 180 + t * 60, now);

      drawBannerText(
        ctx,
        '🌟 DUNG HỢP HOÀN TẤT! ĐIỂM KỲ DỊ VÔ HẠN MẬT ĐỘ TÍCH TỤ NĂNG LƯỢNG VŨ TRỤ...',
        '#ffffff',
        cx,
        height - 35
      );
    } else {
      // --------------------------------------------------------------
      // PHASE 4: VỤ NỔ BIG BANG PHÓNG RA LAO THẲNG XUỐNG SÀN ĐẤU!
      // --------------------------------------------------------------
      const t = Math.min(1, (elapsed - 5800) / 1400);
      const sphereY = coreY + Math.pow(t, 2.4) * (height * 0.78);
      const sphereRadius = 38 + t * 24;

      // Space warp trailing plasma cone
      const tailLen = 290;
      const tailGrad = ctx.createLinearGradient(cx, sphereY, cx, sphereY - tailLen);
      tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      tailGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
      tailGrad.addColorStop(0.45, 'rgba(192, 132, 252, 0.75)');
      tailGrad.addColorStop(0.75, 'rgba(244, 63, 94, 0.5)');
      tailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(cx - sphereRadius * 1.5, sphereY);
      ctx.lineTo(cx, sphereY - tailLen);
      ctx.lineTo(cx + sphereRadius * 1.5, sphereY);
      ctx.closePath();
      ctx.fill();

      // Cosmic web filaments trailing behind the Big Bang projectile
      for (let fil = 0; fil < 8; fil++) {
        const filAng = fil * (Math.PI / 4) + now * 0.01;
        const filSpread = Math.sin(filAng) * 70;
        ctx.strokeStyle = fil % 2 === 0 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(244, 114, 182, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, sphereY - tailLen * 0.3);
        ctx.quadraticCurveTo(cx + filSpread * 1.4, sphereY - tailLen * 0.6, cx + filSpread, sphereY - tailLen);
        ctx.stroke();
      }

      // Relativistic Mach shock rings wrapping the falling sphere
      for (let s = 1; s <= 4; s++) {
        ctx.strokeStyle = s % 2 === 0 ? '#ffffff' : '#facc15';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(cx, sphereY - s * 28, sphereRadius * (1.1 + s * 0.22), 10, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // The BIG BANG Primordial Sphere
      const bbGrad = ctx.createRadialGradient(cx, sphereY, 2, cx, sphereY, sphereRadius * 1.8);
      bbGrad.addColorStop(0, '#ffffff');
      bbGrad.addColorStop(0.25, '#ffffff');
      bbGrad.addColorStop(0.55, '#fde047');
      bbGrad.addColorStop(0.8, '#ec4899');
      bbGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = bbGrad;
      ctx.beginPath();
      ctx.arc(cx, sphereY, sphereRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Blinding white-hot core
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, sphereY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Golden solar corona rim
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 4.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      drawBannerText(
        ctx,
        '💥 VỤ NỔ BIG BANG LAO THẲNG XUỐNG SÀN ĐẤU - 10.000.000+ SÁT THƯƠNG TỐI THƯỢNG!',
        '#f43f5e',
        cx,
        height - 35
      );
    }
  }

  ctx.restore();
}

let bigBangMachineImgCached: HTMLImageElement | null = null;
function getBigBangMachineImage(): HTMLImageElement | null {
  if (typeof Image === 'undefined') return null;
  if (!bigBangMachineImgCached) {
    bigBangMachineImgCached = new Image();
    bigBangMachineImgCached.src = '/assets/aistudio/image_1085458f.png';
  }
  return bigBangMachineImgCached;
}

let eventHorizonImgCached: HTMLImageElement | null = null;
function getEventHorizonImage(): HTMLImageElement | null {
  if (typeof Image === 'undefined') return null;
  if (!eventHorizonImgCached) {
    eventHorizonImgCached = new Image();
    eventHorizonImgCached.src = '/assets/aistudio/image_76c051f8.png';
  }
  return eventHorizonImgCached;
}

export function drawStellarEventHorizonVortex(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number,
  now: number
) {
  ctx.save();
  const radius = 28 + Math.sin(now * 0.02) * 4;
  const pulseR = 75 + (1 - progress) * 65;

  // Outer gravitational suction spirals
  for (let s = 0; s < 12; s++) {
    const ang = (s * Math.PI * 2) / 12 + now * 0.01;
    const len = pulseR * (0.6 + ((now * 0.04 + s * 10) % 40) / 40);
    ctx.strokeStyle = s % 2 === 0 ? 'rgba(168, 85, 247, 0.75)' : 'rgba(56, 189, 248, 0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.lineTo(x + Math.cos(ang + 0.4) * (len * 0.4), y + Math.sin(ang + 0.4) * (len * 0.4));
    ctx.stroke();
  }

  // Event horizon accretion ring
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(x, y, radius + 7, 0, Math.PI * 2);
  ctx.stroke();

  // Pitch black center
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Warning text above vortex
  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('🕳️ EVENT HORIZON: SINGULARITY VORTEX', x, y - radius - 16);

  ctx.restore();
}

export function drawStellarNeutronImpact(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number,
  now: number
) {
  ctx.save();
  const radius = 24 + Math.sin(now * 0.03) * 5;
  const radiationRadius = 60 + Math.sin(now * 0.015) * 20;

  // 1. Gamma-ray radiation field
  const radGrad = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radiationRadius);
  radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  radGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.6)');
  radGrad.addColorStop(0.7, 'rgba(129, 140, 248, 0.3)');
  radGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(x, y, radiationRadius, 0, Math.PI * 2);
  ctx.fill();

  // 2. High-energy electric arcs
  for (let i = 0; i < 6; i++) {
    const ang = (i * Math.PI * 2) / 6 + now * 0.01;
    const len = radius * (1.3 + Math.random() * 0.6);
    ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(ang) * (radius * 0.6), y + Math.sin(ang) * (radius * 0.6));
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }

  // 3. Ultra-bright white hyper-dense core sphere
  const coreGrad = ctx.createRadialGradient(x, y, 2, x, y, radius);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.4, '#e0f2fe');
  coreGrad.addColorStop(0.8, '#38bdf8');
  coreGrad.addColorStop(1, '#6366f1');
  ctx.fillStyle = coreGrad;
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // 4. Warning status text
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('⚛️ NEUTRON KILONOVA (RADIATION DoT)', x, y - radius - 14);

  ctx.restore();
}

/**
 * Render SS-02 The Sun Cataclysmic Solar Explosion in Arena (5,500,000+ Ultimate Damage)
 */
export function drawStellarSunExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number, // 0..1
  now: number
) {
  ctx.save();
  const maxR = 340;
  const curR = 25 + progress * maxR;
  const alpha = Math.max(0, 1 - progress);

  // 1. Blinding solar flash core
  const blastGrad = ctx.createRadialGradient(x, y, 4, x, y, curR);
  blastGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  blastGrad.addColorStop(0.2, `rgba(254, 240, 138, ${alpha})`);
  blastGrad.addColorStop(0.5, `rgba(249, 115, 22, ${alpha * 0.85})`);
  blastGrad.addColorStop(0.8, `rgba(185, 28, 28, ${alpha * 0.5})`);
  blastGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = blastGrad;
  ctx.beginPath();
  ctx.arc(x, y, curR, 0, Math.PI * 2);
  ctx.fill();

  // 2. Coronal shockwave rings
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 8 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 1.12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`;
  ctx.lineWidth = 5 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.88, 0, Math.PI * 2);
  ctx.stroke();

  // 3. 8 Radial Solar Flare Jets
  for (let f = 0; f < 8; f++) {
    const fAng = (f * Math.PI * 2) / 8 + now * 0.005;
    const fLen = curR * (1.1 + Math.sin(now * 0.02 + f) * 0.25);
    ctx.strokeStyle = f % 2 === 0 ? `rgba(254, 240, 138, ${alpha})` : `rgba(239, 68, 68, ${alpha})`;
    ctx.lineWidth = 4 * alpha;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(fAng) * (curR * 0.35), y + Math.sin(fAng) * (curR * 0.35));
    ctx.lineTo(x + Math.cos(fAng) * fLen, y + Math.sin(fAng) * fLen);
    ctx.stroke();
  }

  // 4. Blazing solar embers & prominences
  for (let em = 0; em < 16; em++) {
    const eAng = em * 0.39;
    const eDist = curR * 0.65 + ((now * 0.15 + em * 20) % (curR * 0.45));
    ctx.fillStyle = em % 2 === 0 ? '#ffffff' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(x + Math.cos(eAng) * eDist, y + Math.sin(eAng) * eDist, 3.5 * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Status banner
  if (progress < 0.6) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☀️ THERMONUCLEAR SOLAR SUPERNOVA (SÁT THƯƠNG CỰC ĐẠI)', x, y - curR * 0.5 - 15);
  }

  ctx.restore();
}

/**
 * Render SS-FINAL Big Bang Cataclysmic Primordial Explosion in Arena (10,000,000+ Ultimate Damage)
 */
export function drawStellarBigBangExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number, // 0..1
  now: number
) {
  ctx.save();
  const maxR = 380;
  const curR = 25 + progress * maxR;
  const alpha = Math.max(0, 1 - progress);

  // 1. Primordial Big Bang expanding plasma fireball
  const bbGrad = ctx.createRadialGradient(x, y, 4, x, y, curR);
  bbGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  bbGrad.addColorStop(0.18, `rgba(254, 240, 138, ${alpha})`);
  bbGrad.addColorStop(0.42, `rgba(56, 189, 248, ${alpha * 0.88})`);
  bbGrad.addColorStop(0.7, `rgba(217, 70, 239, ${alpha * 0.65})`);
  bbGrad.addColorStop(0.9, `rgba(244, 63, 94, ${alpha * 0.35})`);
  bbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = bbGrad;
  ctx.beginPath();
  ctx.arc(x, y, curR, 0, Math.PI * 2);
  ctx.fill();

  // 2. Multilayer supersonic chromatic shock rings
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 10 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
  ctx.lineWidth = 6 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.9, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`;
  ctx.lineWidth = 4 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  // 3. 12 Radial Relativistic Cosmic Ray Jets
  for (let j = 0; j < 12; j++) {
    const jAng = (j * Math.PI * 2) / 12 + now * 0.003;
    const jLen = curR * (1.2 + Math.sin(now * 0.02 + j) * 0.3);
    ctx.strokeStyle = j % 3 === 0 ? `rgba(255, 255, 255, ${alpha})` : j % 3 === 1 ? `rgba(56, 189, 248, ${alpha})` : `rgba(244, 114, 182, ${alpha})`;
    ctx.lineWidth = 4.5 * alpha;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(jAng) * (curR * 0.3), y + Math.sin(jAng) * (curR * 0.3));
    ctx.lineTo(x + Math.cos(jAng) * jLen, y + Math.sin(jAng) * jLen);
    ctx.stroke();
  }

  // 4. Cosmic Web Filaments with miniature galaxy clusters forming
  for (let w = 0; w < 10; w++) {
    const wAng = (w * Math.PI * 2) / 10;
    const wLen = curR * 0.85;
    ctx.strokeStyle = `rgba(192, 132, 252, ${alpha * 0.7})`;
    ctx.lineWidth = 2 * alpha;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(
      x + Math.cos(wAng + 0.3) * (wLen * 0.5),
      y + Math.sin(wAng + 0.3) * (wLen * 0.5),
      x + Math.cos(wAng) * wLen,
      y + Math.sin(wAng) * wLen
    );
    ctx.stroke();

    // Galaxy cluster ember
    ctx.fillStyle = w % 2 === 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(250, 204, 21, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x + Math.cos(wAng) * wLen, y + Math.sin(wAng) * wLen, 3.5 * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Primordial quark-gluon embers flying outwards
  for (let em = 0; em < 24; em++) {
    const eAng = em * 0.26 + now * 0.002;
    const eDist = curR * 0.5 + ((now * 0.2 + em * 18) % (curR * 0.6));
    ctx.fillStyle = em % 3 === 0 ? '#ffffff' : em % 3 === 1 ? '#38bdf8' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(x + Math.cos(eAng) * eDist, y + Math.sin(eAng) * eDist, 4 * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Centered Epic Status Banner
  if (progress < 0.65) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11.5px monospace';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 16;
    ctx.fillText('💥 BIG BANG: VỤ NỔ KHAI SINH VŨ TRỤ (10.000.000+ SÁT THƯƠNG TỐI THƯỢNG)', x, y - curR * 0.5 - 20);
    ctx.shadowBlur = 0;
  }

  ctx.restore();
}

// Helper: Rotating Mechanical Gimbal Rings for Big Bang Particle Accelerator Machine
function drawMachineGimbalRings(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rot: number,
  intensity: number,
  now: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer orbital ring
  ctx.save();
  ctx.rotate(rot * 0.8);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, Math.PI * 2);
  ctx.stroke();

  // Outer ring ticks
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI * 2) / 16;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 144, Math.sin(a) * 144);
    ctx.lineTo(Math.cos(a) * 156, Math.sin(a) * 156);
    ctx.stroke();
  }
  ctx.restore();

  // Tilted Gimbal Ring 1 (tilted 35 deg)
  ctx.save();
  ctx.rotate(0.6);
  ctx.rotate(-rot * 1.2);
  ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 132, 65, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Tilted Gimbal Ring 2 (tilted -45 deg)
  ctx.save();
  ctx.rotate(-0.8);
  ctx.rotate(rot * 1.4);
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.75)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 115, 55, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner Accelerator Chamber Ring
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// Helper: 8 Radiant Laser Spokes radiating outwards from machine core (matching reference image)
function drawBigBang8LaserSpokes(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  now: number,
  alpha = 1.0
) {
  ctx.save();
  const maxLen = Math.hypot(width, height);
  for (let s = 0; s < 8; s++) {
    const ang = s * (Math.PI / 4) + Math.sin(now * 0.001) * 0.02;
    const x2 = cx + Math.cos(ang) * maxLen;
    const y2 = cy + Math.sin(ang) * maxLen;

    // Cyan/blue outer beam
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 * alpha})`;
    ctx.lineWidth = 6 + Math.sin(now * 0.04 + s) * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Intense pure white core ray
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }
  ctx.restore();
}

// Helper: Central accretion nebula vortex swirling in the core
function drawCentralNebulaVortex(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rotAngle: number,
  radius: number,
  alpha: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotAngle);

  // Swirling galaxy arms
  for (let arm = 0; arm < 3; arm++) {
    const armAng = (arm * Math.PI * 2) / 3;
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2.2; a += 0.1) {
      const r = (a / (Math.PI * 2.2)) * radius;
      const th = a + armAng;
      const px = Math.cos(th) * r;
      const py = Math.sin(th) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = arm === 0 ? `rgba(244, 63, 94, ${0.75 * alpha})` : arm === 1 ? `rgba(168, 85, 247, ${0.75 * alpha})` : `rgba(251, 191, 36, ${0.75 * alpha})`;
    ctx.lineWidth = 12 * (radius / 70);
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  ctx.restore();
}

// Helper: Electron & Proton streams accelerating into center
function drawElectronProtonStreams(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  progress: number,
  now: number
) {
  ctx.save();
  const particleCount = 48;
  const maxR = 155;

  for (let p = 0; p < particleCount; p++) {
    const pProg = ((now * 0.003 + (p / particleCount)) % 1);
    const r = maxR * (1 - pProg);
    const spiralAng = p * 0.45 + pProg * Math.PI * 5 + now * 0.005;
    const px = cx + Math.cos(spiralAng) * r;
    const py = cy + Math.sin(spiralAng) * r;

    const isElectron = p % 2 === 0;
    const color = isElectron ? '#00f0ff' : '#f59e0b';

    // Particle trail
    const prevR = maxR * (1 - Math.max(0, pProg - 0.08));
    const prevAng = p * 0.45 + Math.max(0, pProg - 0.08) * Math.PI * 5 + now * 0.005;
    const ppx = cx + Math.cos(prevAng) * prevR;
    const ppy = cy + Math.sin(prevAng) * prevR;

    ctx.strokeStyle = color;
    ctx.lineWidth = isElectron ? 2 : 2.5;
    ctx.beginPath();
    ctx.moveTo(ppx, ppy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Particle head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, isElectron ? 2.5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Helper: Quantum lightning arcs jumping between rings and core
function drawQuantumLightningArcs(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerRadius: number,
  arcCount: number,
  now: number
) {
  ctx.save();
  for (let a = 0; a < arcCount; a++) {
    const baseAng = (a * Math.PI * 2) / arcCount + Math.sin(now * 0.02 + a) * 0.2;
    const p1x = cx + Math.cos(baseAng) * outerRadius;
    const p1y = cy + Math.sin(baseAng) * outerRadius;

    ctx.strokeStyle = a % 2 === 0 ? '#38bdf8' : '#ffffff';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);

    let curX = p1x;
    let curY = p1y;
    for (let seg = 1; seg <= 4; seg++) {
      const frac = seg / 4;
      const targetRad = outerRadius * (1 - frac);
      const targetAng = baseAng + (Math.sin(now * 0.05 + seg * 4 + a) - 0.5) * 0.45;
      curX = cx + Math.cos(targetAng) * targetRad;
      curY = cy + Math.sin(targetAng) * targetRad;
      ctx.lineTo(curX, curY);
    }
    ctx.stroke();
  }
  ctx.restore();
}

// Helper: Diffraction Spikes on the Singularity Point
function drawDiffractionSpikes(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikeLen: number,
  now: number
) {
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;

  // Horizontal and vertical
  ctx.beginPath();
  ctx.moveTo(cx - spikeLen, cy);
  ctx.lineTo(cx + spikeLen, cy);
  ctx.moveTo(cx, cy - spikeLen);
  ctx.lineTo(cx, cy + spikeLen);
  ctx.stroke();

  // Diagonal spikes
  const diagLen = spikeLen * 0.7;
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(cx - diagLen, cy - diagLen);
  ctx.lineTo(cx + diagLen, cy + diagLen);
  ctx.moveTo(cx - diagLen, cy + diagLen);
  ctx.lineTo(cx + diagLen, cy - diagLen);
  ctx.stroke();

  ctx.restore();
}

// Banner label on bottom of cutscene
function drawBannerText(ctx: CanvasRenderingContext2D, text: string, color: string, cx: number, y: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(3, 7, 18, 0.88)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  const tw = ctx.measureText(text).width + 36;
  ctx.beginPath();
  ctx.roundRect(cx - tw / 2, y - 16, tw, 30, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, y);
  ctx.restore();
}

// Helper to draw single Jupiter planet
function drawJupiter(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Atmospheric base
  const jGrad = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, 10, 0, 0, radius);
  jGrad.addColorStop(0, '#fef08a');
  jGrad.addColorStop(0.35, '#f59e0b');
  jGrad.addColorStop(0.7, '#b45309');
  jGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = jGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Swirling gas bands
  ctx.save();
  ctx.clip();
  const bands = [-0.65, -0.4, -0.15, 0.1, 0.35, 0.6];
  bands.forEach((bY, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(120, 53, 15, 0.45)' : 'rgba(254, 240, 138, 0.35)';
    ctx.fillRect(-radius, bY * radius, radius * 2, radius * 0.22);
  });

  // Great Red Spot
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(radius * 0.25, radius * 0.22, radius * 0.22, radius * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/**
 * Helper to draw Jupiter literally splitting into TWO distinct planetary bodies!
 * (Sao Mộc phân tách thành 2 nửa hành tinh / 2 khối cầu trôi dạt)
 */
export function drawJupiterSplitIntoTwo(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  splitProgress: number, // 0 to 1
  now: number
) {
  const separation = 40 + splitProgress * 155; // Drifts apart into TWO planets!
  const tilt = splitProgress * 0.18; // Tectonic rotation in zero gravity

  // 1. Cosmic Rupture & Planetary Magnetic Lightning between the two separated planets
  ctx.save();
  const riftGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, separation + 85);
  riftGrad.addColorStop(0, 'rgba(255, 237, 213, 0.95)');
  riftGrad.addColorStop(0.25, 'rgba(249, 115, 22, 0.7)');
  riftGrad.addColorStop(0.55, 'rgba(185, 28, 28, 0.45)');
  riftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = riftGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, separation + 50, radius * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Violent magnetic plasma lightning arcs snapping between the two separated bodies
  ctx.lineWidth = 2.5;
  for (let arc = 0; arc < 8; arc++) {
    const arcY = cy + (arc - 3.5) * (radius * 0.32);
    const leftConnX = cx - separation * 0.48;
    const rightConnX = cx + separation * 0.48;
    ctx.strokeStyle = arc % 2 === 0 ? '#fde047' : '#38bdf8';
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(leftConnX, arcY + Math.sin(now * 0.02 + arc) * 10);
    const mid1X = leftConnX + (rightConnX - leftConnX) * 0.33;
    const mid1Y = arcY + ((now * 0.03 + arc * 17) % 28) - 14;
    const mid2X = leftConnX + (rightConnX - leftConnX) * 0.67;
    const mid2Y = arcY + ((now * 0.025 + arc * 31) % 28) - 14;
    ctx.lineTo(mid1X, mid1Y);
    ctx.lineTo(mid2X, mid2Y);
    ctx.lineTo(rightConnX, arcY - Math.cos(now * 0.02 + arc) * 10);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.restore();

  const segs = 14;

  // 2. LEFT JUPITER PLANETARY BODY (Nửa Hành Tinh Trái)
  const leftX = cx - separation * 0.55;
  const leftY = cy;
  ctx.save();
  ctx.translate(leftX, leftY);
  ctx.rotate(-tilt);

  // Outer curved 3D spherical arc on left, inner jagged molten mantle face on right
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI * 1.5, Math.PI * 0.5, true);
  for (let i = segs; i >= 0; i--) {
    const sy = -radius + (i / segs) * (radius * 2);
    const jg = Math.sin(i * 1.8 + splitProgress * 4) * (7 + splitProgress * 14);
    ctx.lineTo(jg, sy);
  }
  ctx.closePath();
  ctx.save();
  ctx.clip(); // Clip to Left planetary hemisphere

  // Left planetary atmospheric base & gas bands
  const leftGrad = ctx.createRadialGradient(-radius * 0.4, -radius * 0.2, 10, 0, 0, radius * 1.15);
  leftGrad.addColorStop(0, '#fef08a');
  leftGrad.addColorStop(0.35, '#f59e0b');
  leftGrad.addColorStop(0.7, '#b45309');
  leftGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = leftGrad;
  ctx.fillRect(-radius * 1.3, -radius * 1.3, radius * 2.6, radius * 2.6);

  const bands = [-0.7, -0.45, -0.2, 0.05, 0.3, 0.55, 0.8];
  bands.forEach((bY, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(120, 53, 15, 0.55)' : 'rgba(254, 240, 138, 0.38)';
    ctx.fillRect(-radius * 1.3, bY * radius, radius * 2.6, radius * 0.22);
  });

  // Great Red Spot on left flank
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.38, radius * 0.2, radius * 0.24, radius * 0.15, -0.08, 0, Math.PI * 2);
  ctx.fill();

  // Exposed Molten Mantle & Magma Core on the inner fracture face
  const leftCoreGrad = ctx.createLinearGradient(0, 0, -radius * 0.5, 0);
  leftCoreGrad.addColorStop(0, '#ffffff'); // Blinding white-hot core
  leftCoreGrad.addColorStop(0.2, '#fde047');
  leftCoreGrad.addColorStop(0.55, '#f97316');
  leftCoreGrad.addColorStop(0.85, '#991b1b');
  leftCoreGrad.addColorStop(1, 'rgba(69, 26, 3, 0)');
  ctx.fillStyle = leftCoreGrad;
  ctx.fillRect(-radius * 0.5, -radius, radius * 0.6, radius * 2);

  ctx.restore(); // End clip of Left Hemisphere

  // Molten glowing border along the inner fracture edge
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#f97316';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const sy = -radius + (i / segs) * (radius * 2);
    const jg = Math.sin(i * 1.8 + splitProgress * 4) * (7 + splitProgress * 14);
    if (i === 0) ctx.moveTo(jg, sy);
    else ctx.lineTo(jg, sy);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore(); // End Left Jupiter Body

  // 3. RIGHT JUPITER PLANETARY BODY (Nửa Hành Tinh Phải)
  const rightX = cx + separation * 0.55;
  const rightY = cy;
  ctx.save();
  ctx.translate(rightX, rightY);
  ctx.rotate(tilt);

  // Outer curved 3D spherical arc on right, inner jagged molten mantle face on left
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI * 1.5, Math.PI * 0.5, false);
  for (let i = segs; i >= 0; i--) {
    const sy = -radius + (i / segs) * (radius * 2);
    const jg = -Math.sin(i * 1.8 + splitProgress * 4) * (7 + splitProgress * 14);
    ctx.lineTo(jg, sy);
  }
  ctx.closePath();
  ctx.save();
  ctx.clip(); // Clip to Right planetary hemisphere

  const rightGrad = ctx.createRadialGradient(radius * 0.4, -radius * 0.2, 10, 0, 0, radius * 1.15);
  rightGrad.addColorStop(0, '#fef08a');
  rightGrad.addColorStop(0.35, '#f59e0b');
  rightGrad.addColorStop(0.7, '#b45309');
  rightGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(-radius * 1.3, -radius * 1.3, radius * 2.6, radius * 2.6);

  bands.forEach((bY, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(120, 53, 15, 0.55)' : 'rgba(254, 240, 138, 0.38)';
    ctx.fillRect(-radius * 1.3, bY * radius, radius * 2.6, radius * 0.22);
  });

  // Exposed Molten Core on right's inner fracture face
  const rightCoreGrad = ctx.createLinearGradient(0, 0, radius * 0.5, 0);
  rightCoreGrad.addColorStop(0, '#ffffff');
  rightCoreGrad.addColorStop(0.2, '#fde047');
  rightCoreGrad.addColorStop(0.55, '#f97316');
  rightCoreGrad.addColorStop(0.85, '#991b1b');
  rightCoreGrad.addColorStop(1, 'rgba(69, 26, 3, 0)');
  ctx.fillStyle = rightCoreGrad;
  ctx.fillRect(-radius * 0.1, -radius, radius * 0.6, radius * 2);

  ctx.restore(); // End clip of Right Hemisphere

  // Molten glowing border along the inner fracture edge
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#f97316';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const sy = -radius + (i / segs) * (radius * 2);
    const jg = -Math.sin(i * 1.8 + splitProgress * 4) * (7 + splitProgress * 14);
    if (i === 0) ctx.moveTo(jg, sy);
    else ctx.lineTo(jg, sy);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore(); // End Right Jupiter Body

  // 4. Cataclysmic Planetary Debris & Asteroid Ejecta
  for (let d = 0; d < 20; d++) {
    const dAng = (d * 0.35 + now * 0.002) % (Math.PI * 2);
    const dDist = 20 + ((now * 0.08 + d * 19) % (separation + 60));
    const dX = cx + Math.cos(dAng) * dDist;
    const dY = cy + Math.sin(dAng) * (radius * 0.95);
    const dSize = 2 + (d % 4);
    ctx.fillStyle = d % 3 === 0 ? '#ffffff' : d % 3 === 1 ? '#f97316' : '#78350f';
    ctx.beginPath();
    ctx.arc(dX, dY, dSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Helper to draw Pitch-Black Supersonic Arrow Rotating like a Drill
 * (Mũi Tên Đen Ngòm Xoay Như Mũi Khoan 3D với Animation Siêu Cường)
 * - Physical shape: Arrow (Mũi tên đen ngòm sắc nhọn hình tam giác có ngạnh và cánh đuôi)
 * - Rotation: Rotates axially like a supersonic drill bit (xoay như mũi khoan với rãnh xoắn kép Archimedes)
 * - Animation: Rich Mach shockwaves, cavitation spiral ribbons, neon black aura, specular glints!
 */
export function drawPitchBlackDrillArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  longitudinalRot: number,
  scale = 1.0,
  tiltAngle = 0,
  isPlunging = false,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tiltAngle);
  ctx.scale(scale, scale);

  // 1. Supersonic Conical Mach Shockwaves & Void Spiral Vortex when plunging
  if (isPlunging) {
    // A. Conical Mach shockwave rings propagating upwards from the needle apex
    for (let s = 1; s <= 5; s++) {
      const sProgress = ((now * 0.004 + s * 0.2) % 1);
      const sY = 70 - sProgress * 150;
      const sRadius = 20 + sProgress * 110;
      const sAlpha = (1 - sProgress) * 0.8;
      ctx.strokeStyle = `rgba(249, 115, 22, ${sAlpha})`;
      ctx.lineWidth = 3.5 * (1 - sProgress);
      ctx.beginPath();
      ctx.ellipse(0, sY, sRadius, sRadius * 0.32, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner electric-cyan ionization ring
      ctx.strokeStyle = `rgba(34, 211, 238, ${sAlpha * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // B. Hypersonic Cavitation Spiral Ribbons wrapping backwards like drill vortex
    for (let ribbon = 0; ribbon < 2; ribbon++) {
      const rOffset = ribbon * Math.PI;
      ctx.strokeStyle = ribbon === 0 ? 'rgba(255, 237, 213, 0.9)' : 'rgba(249, 115, 22, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let step = 0; step < 30; step++) {
        const vY = 75 - step * 6.5;
        const vRad = 16 + step * 2.2;
        const vAng = longitudinalRot * 3.8 + step * 0.38 + rOffset;
        const vX = Math.cos(vAng) * vRad;
        if (step === 0) ctx.moveTo(vX, vY);
        else ctx.lineTo(vX, vY);
      }
      ctx.stroke();
    }
  }

  // Dimension coordinates of the Pitch-Black Arrow:
  // Apex (Tip pointing down): y = 75
  // Arrowhead Barbs (Rear wings): y = 10, x = ±32
  // Arrowhead Neck: y = -5, x = ±8
  // Shaft Base: y = -70, width = 12
  // Tail Fletchings / Vanes: y = -65 to -95
  // Engine Nozzle: y = -95
  const tipY = 75;

  // 2. Neon Black / Dark Void Halo surrounding the entire Arrow
  const darkGlow = ctx.createRadialGradient(0, 0, 20, 0, 0, 110);
  darkGlow.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
  darkGlow.addColorStop(0.45, 'rgba(76, 29, 149, 0.6)');
  darkGlow.addColorStop(0.8, 'rgba(6, 182, 212, 0.25)');
  darkGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = darkGlow;
  ctx.beginPath();
  ctx.arc(0, 0, 110, 0, Math.PI * 2);
  ctx.fill();

  // 3. Arrow Tail Thruster & Kinetic Drive Nozzle (y = -95)
  const nozzleGrad = ctx.createLinearGradient(-12, 0, 12, 0);
  nozzleGrad.addColorStop(0, '#020617');
  nozzleGrad.addColorStop(0.5, '#334155');
  nozzleGrad.addColorStop(1, '#020617');
  ctx.fillStyle = nozzleGrad;
  ctx.beginPath();
  ctx.roundRect(-10, -102, 20, 10, 3);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Thruster shock diamond jet flames firing backwards
  if (isPlunging) {
    const jetGrad = ctx.createLinearGradient(0, -102, 0, -150);
    jetGrad.addColorStop(0, '#ffffff');
    jetGrad.addColorStop(0.3, '#38bdf8');
    jetGrad.addColorStop(0.7, '#7c3aed');
    jetGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = jetGrad;
    ctx.beginPath();
    ctx.moveTo(-7, -102);
    ctx.lineTo(0, -145 - Math.sin(now * 0.05) * 15);
    ctx.lineTo(7, -102);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Arrow 3D Fletchings / Stabilizing Tail Vanes (Cánh đuôi lông tên 3D xoay tròn!)
  // 4 aerodynamic fins projecting in cylindrical perspective:
  const numVanes = 4;
  for (let v = 0; v < numVanes; v++) {
    const vAngle = longitudinalRot * 3.5 + v * (Math.PI / 2);
    const cosA = Math.cos(vAngle);
    const sinA = Math.sin(vAngle);
    // Depth shading
    if (sinA > -0.6) {
      const vWidth = cosA * 26;
      const vAlpha = Math.max(0.2, 0.5 + sinA * 0.5);

      ctx.fillStyle = `rgba(15, 23, 42, ${vAlpha})`;
      ctx.strokeStyle = `rgba(147, 197, 253, ${vAlpha * 0.8})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -68);
      ctx.lineTo(vWidth, -88);
      ctx.lineTo(vWidth * 0.8, -98);
      ctx.lineTo(0, -94);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Trailing edge neon trim
      ctx.strokeStyle = `rgba(99, 102, 241, ${vAlpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vWidth, -88);
      ctx.lineTo(vWidth * 0.8, -98);
      ctx.stroke();
    }
  }

  // 5. Arrow Shaft (Thân mũi tên đen ngòm khí động học: y = -5 đến -70)
  const shaftGrad = ctx.createLinearGradient(-7, 0, 7, 0);
  shaftGrad.addColorStop(0, '#020408'); // Pitch black
  shaftGrad.addColorStop(0.25, '#0f172a');
  shaftGrad.addColorStop(0.5, '#334155'); // Gunmetal metallic highlight
  shaftGrad.addColorStop(0.75, '#0f172a');
  shaftGrad.addColorStop(1, '#020408');
  ctx.fillStyle = shaftGrad;
  ctx.fillRect(-7, -70, 14, 66);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-7, -70, 14, 66);

  // Central dark neon energy core running down the shaft
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#818cf8';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(0, -68);
  ctx.lineTo(0, -6);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Helical Plasma Flutes wrapping around the arrow shaft (like an auger drill bit!)
  for (let h = 0; h < 2; h++) {
    const hPhase = h * Math.PI;
    ctx.strokeStyle = h === 0 ? '#f97316' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let hStarted = false;
    for (let s = 0; s <= 20; s++) {
      const sT = s / 20;
      const curY = -70 + sT * 64;
      const theta = longitudinalRot * 4 + sT * Math.PI * 4 + hPhase;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      if (cosT > -0.2) {
        const hX = sinT * 7.5;
        if (!hStarted) {
          ctx.moveTo(hX, curY);
          hStarted = true;
        } else {
          ctx.lineTo(hX, curY);
        }
      } else {
        hStarted = false;
      }
    }
    ctx.stroke();
  }

  // 6. MENACING PITCH-BLACK ARROWHEAD (Đầu mũi tên đen ngòm sắc bén: y = -5 đến 75)
  // Arrowhead polygon: Tip at (0, 75), Left barb at (-32, 10), Left notch at (-8, -5),
  // Right notch at (8, -5), Right barb at (32, 10), returning to (0, 75).
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, tipY); // Needle sharp apex
  ctx.lineTo(-32, 10); // Left barbed wing
  ctx.lineTo(-12, -2); // Left swept notch
  ctx.lineTo(0, -5);   // Central spine
  ctx.lineTo(12, -2);  // Right swept notch
  ctx.lineTo(32, 10);  // Right barbed wing
  ctx.closePath();

  // Pitch-black obsidian metallic fill with specular lighting
  const headGrad = ctx.createLinearGradient(-32, 0, 32, 0);
  headGrad.addColorStop(0, '#000000'); // Pure pitch black
  headGrad.addColorStop(0.2, '#090d16');
  headGrad.addColorStop(0.48, '#1e293b');
  headGrad.addColorStop(0.55, '#64748b'); // Sharp specular ridge highlight
  headGrad.addColorStop(0.7, '#0f172a');
  headGrad.addColorStop(0.85, '#05080f');
  headGrad.addColorStop(1, '#000000');
  ctx.fillStyle = headGrad;
  ctx.fill();

  // Razor-sharp cutting border
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 7. ARCHIMEDEAN HELICAL DRILL RIFLING FLUTES ON ARROWHEAD (Rãnh xoắn mũi khoan trên đầu tên)
  // As longitudinalRot advances, spiral grooves continuously sweep down the arrowhead to the tip!
  for (let f = 0; f < 2; f++) {
    const flutePhase = f * Math.PI;
    const slices = 36;
    ctx.beginPath();
    let started = false;

    for (let i = 0; i <= slices; i++) {
      const t = i / slices; // 0 at base, 1 at apex tip
      const curY = 0 + t * (tipY - 0);
      const widthAtY = 26 * (1 - t * 0.95);

      const theta = longitudinalRot * 3.8 + t * Math.PI * 4 + flutePhase;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      if (cosT > -0.3) {
        const xOffset = sinT * widthAtY;
        if (!started) {
          ctx.moveTo(xOffset, curY);
          started = true;
        } else {
          ctx.lineTo(xOffset, curY);
        }
      } else {
        started = false;
      }
    }

    // Groove shadow (pitch black depth)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4 * scale;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Hot friction vein inside groove
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1.8 * scale;
    ctx.stroke();

    // Specular cutting ridge highlight beside groove
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2 * scale;
    ctx.stroke();
  }

  // 8. Dynamic Specular Sheen sweeping across the black facets
  const spinPhase = ((longitudinalRot * 3.5) % Math.PI);
  const glintAlpha = Math.pow(Math.abs(Math.sin(spinPhase)), 6);
  if (glintAlpha > 0.05) {
    ctx.fillStyle = `rgba(255, 255, 255, ${glintAlpha * 0.75})`;
    ctx.beginPath();
    ctx.moveTo(0, tipY);
    ctx.lineTo(Math.sin(spinPhase) * 20, 15);
    ctx.lineTo(Math.sin(spinPhase) * 12, 10);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore(); // End Arrowhead

  // 9. Blinding White-Hot Plasma Friction Apex at Needle Tip (y = tipY)
  const tipGlow = ctx.createRadialGradient(0, tipY, 1, 0, tipY, 26);
  tipGlow.addColorStop(0, '#ffffff');
  tipGlow.addColorStop(0.3, '#fde047');
  tipGlow.addColorStop(0.65, '#f97316');
  tipGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(0, tipY, 26, 0, Math.PI * 2);
  ctx.fill();

  // 4-point Diamond Diffraction Spikes at tip
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, tipY - 24);
  ctx.lineTo(0, tipY + 24);
  ctx.moveTo(-18, tipY);
  ctx.lineTo(18, tipY);
  ctx.stroke();

  // 10. Dynamic sparks and dark matter embers flying off spinning barbs
  if (isPlunging) {
    for (let sp = 0; sp < 10; sp++) {
      const spAng = (longitudinalRot * 4 + sp * 0.63) % (Math.PI * 2);
      const spDist = 20 + ((now * 0.22 + sp * 9) % 40);
      const spY = tipY - ((now * 0.18 + sp * 14) % 80);
      ctx.fillStyle = sp % 2 === 0 ? '#ffffff' : '#fb923c';
      ctx.beginPath();
      ctx.arc(Math.cos(spAng) * spDist, spY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

// Backward-compatible aliases
export const draw3DTungstenDrill = drawPitchBlackDrillArrow;
function drawTungstenArrow(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale = 1.0) {
  drawPitchBlackDrillArrow(ctx, x, y, angle, scale, 0, true, performance.now());
}

// Helper to draw Galactic Dust
function drawGalacticDust(ctx: CanvasRenderingContext2D, width: number, height: number, now: number) {
  const gGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.6);
  gGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  gGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
  gGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gGrad;
  ctx.fillRect(0, 0, width, height);
}

// Helper to draw Tesseract 4D Hypercube
export function drawStellarTesseractObject(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  glowAlpha = 1.0,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  const innerSize = size * 0.52;
  const pulse = Math.sin(now * 0.008) * 4;

  // Outer Cube
  ctx.strokeStyle = `rgba(6, 182, 212, ${glowAlpha})`;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(-size / 2 - pulse, -size / 2 - pulse, size + pulse * 2, size + pulse * 2);

  // Inner Cube
  ctx.strokeStyle = `rgba(168, 85, 247, ${glowAlpha})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);

  // Connecting 4D Projection Edges (8 vertices)
  const oHalf = size / 2 + pulse;
  const iHalf = innerSize / 2;
  ctx.strokeStyle = `rgba(244, 63, 94, ${glowAlpha * 0.8})`;
  ctx.lineWidth = 1.5;

  const corners = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ];
  ctx.beginPath();
  corners.forEach(([sx, sy]) => {
    ctx.moveTo(sx * oHalf, sy * oHalf);
    ctx.lineTo(sx * iHalf, sy * iHalf);
  });
  ctx.stroke();

  // Central glowing singularity core
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Helper to draw diving stellar meteor
function drawStellarMeteor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  color: string,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Tail flame
  const grad = ctx.createLinearGradient(0, 0, -size * 3.5, 0);
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.6)');
  grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.4);
  ctx.lineTo(-size * 3.5, 0);
  ctx.lineTo(0, size * 0.4);
  ctx.closePath();
  ctx.fill();

  // Glowing Star Core
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

/**
 * Render SS-01 Continuous Orbital Railgun Beam in Arena (200 dmg/0.1s x 15s)
 */
export function drawStellarOrbitalBeam(
  ctx: CanvasRenderingContext2D,
  beam: StellarOrbitalBeamState,
  now: number
) {
  if (!beam.active) return;
  const { targetX, targetY } = beam;

  ctx.save();
  // Vertical column from sky (y=0) to target point
  const beamWidth = 38 + Math.sin(now * 0.05) * 6;

  // Outer red glow
  ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
  ctx.fillRect(targetX - beamWidth, 0, beamWidth * 2, targetY);

  // Mid crimson energy
  ctx.fillStyle = 'rgba(248, 113, 113, 0.85)';
  ctx.fillRect(targetX - beamWidth * 0.5, 0, beamWidth, targetY);

  // Pure white lightspeed core
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(targetX - 4, 0, 8, targetY);

  // Ground Impact Scorch & Plasma Flare
  const flareRadius = 32 + Math.sin(now * 0.04) * 8;
  const fGrad = ctx.createRadialGradient(targetX, targetY, 4, targetX, targetY, flareRadius);
  fGrad.addColorStop(0, '#ffffff');
  fGrad.addColorStop(0.4, '#ef4444');
  fGrad.addColorStop(0.8, '#f97316');
  fGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = fGrad;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRadius, 0, Math.PI * 2);
  ctx.fill();

  // Concentric shock rings at base
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRadius * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Render SS-03 Tsar Bomba Cataclysmic Nuclear Blast
 */
export function drawStellarTsarExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number, // 0..1
  now: number
) {
  ctx.save();
  const maxR = 260;
  const curR = 15 + progress * maxR;
  const alpha = Math.max(0, 1 - progress);

  // Blinding Core
  const blastGrad = ctx.createRadialGradient(x, y, 5, x, y, curR);
  blastGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  blastGrad.addColorStop(0.25, `rgba(254, 240, 138, ${alpha})`);
  blastGrad.addColorStop(0.55, `rgba(249, 115, 22, ${alpha * 0.85})`);
  blastGrad.addColorStop(0.85, `rgba(220, 38, 38, ${alpha * 0.6})`);
  blastGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = blastGrad;
  ctx.beginPath();
  ctx.arc(x, y, curR, 0, Math.PI * 2);
  ctx.fill();

  // Supersonic shock rings
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 6 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
  ctx.lineWidth = 4 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Helper to render Quasar graphic matching user's reference image
 */
export function drawQuasarGraphic(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  discRadius: number,
  rotAngle: number,
  jetIntensity: number,
  showTypography: boolean,
  now: number
) {
  ctx.save();

  // 1. Relativistic Jet (Blinding pure white vertical laser beam shooting up & down)
  const jetWidth = (14 * jetIntensity + Math.sin(now * 0.04) * 3);
  const jetGlow = ctx.createLinearGradient(cx - jetWidth * 2.5, 0, cx + jetWidth * 2.5, 0);
  jetGlow.addColorStop(0, 'rgba(192, 132, 252, 0)');
  jetGlow.addColorStop(0.3, 'rgba(224, 231, 255, 0.45)');
  jetGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  jetGlow.addColorStop(0.7, 'rgba(224, 231, 255, 0.45)');
  jetGlow.addColorStop(1, 'rgba(192, 132, 252, 0)');
  ctx.fillStyle = jetGlow;
  ctx.fillRect(cx - jetWidth * 2.5, 0, jetWidth * 5, cy * 2.5);

  // Pure white laser core
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 3 * jetIntensity, 0, 6 * jetIntensity, cy * 2.5);

  // Jet collimation nodes / pulse diamonds
  for (let n = -4; n <= 4; n++) {
    const nodeY = cy + n * 45 + ((now * 0.08) % 45);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, nodeY, jetWidth * 1.2, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Accretion Disc (Tilted Glowing Galactic Swirl with 2 sweeping spiral arms)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1.0, 0.45); // Tilted galactic plane
  ctx.rotate(rotAngle);

  // Ambient luminous diffuse haze around disc
  const hazeGrad = ctx.createRadialGradient(0, 0, 15, 0, 0, discRadius * 1.35);
  hazeGrad.addColorStop(0, '#ffffff');
  hazeGrad.addColorStop(0.25, 'rgba(224, 231, 255, 0.85)');
  hazeGrad.addColorStop(0.55, 'rgba(147, 197, 253, 0.4)');
  hazeGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.15)');
  hazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = hazeGrad;
  ctx.beginPath();
  ctx.arc(0, 0, discRadius * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // Spiral Accretion Arms (2 broad luminous logarithmic spiral arms)
  for (let arm = 0; arm < 2; arm++) {
    const armOffset = arm * Math.PI;
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2.5; a += 0.08) {
      const r = 16 + (a / (Math.PI * 2.5)) * (discRadius - 16);
      const theta = a + armOffset;
      const px = Math.cos(theta) * r;
      const py = Math.sin(theta) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 18 * (discRadius / 140);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Inner bright filament
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8 * (discRadius / 140);
    ctx.stroke();
  }

  // Stardust embers in accretion flow
  for (let s = 0; s < 24; s++) {
    const sAng = s * 0.28 + rotAngle * 2;
    const sR = 20 + ((s * 19 + now * 0.05) % (discRadius - 10));
    ctx.fillStyle = s % 2 === 0 ? '#ffffff' : '#e0e7ff';
    ctx.beginPath();
    ctx.arc(Math.cos(sAng) * sR, Math.sin(sAng) * sR, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore(); // Return from tilted disc

  // 3. Central Event Horizon & Singularity
  const singRadius = Math.max(8, 18 * (discRadius / 140));
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, singRadius, 0, Math.PI * 2);
  ctx.fill();

  // Luminous Photon Sphere Ring around singularity
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, singRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 4. Reference Image Typography ("SS-21", "QUASAR", "[ ADD-ON ]")
  if (showTypography) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "SS-021" at top
    ctx.font = '900 42px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 18;
    ctx.fillText('SS-021', cx, cy - 130);

    // "QUASAR" in pink-magenta uppercase
    ctx.font = '800 20px sans-serif';
    ctx.fillStyle = '#f472b6';
    ctx.shadowColor = '#f472b6';
    ctx.shadowBlur = 12;
    ctx.fillText('Q U A S A R', cx, cy - 90);

    // Subtle pink horizontal divider line
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 85, cy - 74);
    ctx.lineTo(cx + 85, cy - 74);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // "[ ADD-ON ]" pill badge at bottom
    const badgeW = 125;
    const badgeH = 34;
    const badgeY = cy + 125;

    ctx.strokeStyle = '#d946ef';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#d946ef';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#090412';
    ctx.beginPath();
    ctx.roundRect(cx - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 10);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - badgeW / 2 + 3, badgeY - badgeH / 2 + 3, badgeW - 6, badgeH - 6);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 13px sans-serif';
    ctx.fillText('ADD-ON', cx, badgeY);

    ctx.restore();
  }

  ctx.restore();
}

/**
 * Render SS-06 Halley's Comet Cataclysmic 60,000 DMG Impact Crater Explosion
 */
export function drawStellarHalleyExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number, // 0..1
  now: number
) {
  ctx.save();
  const maxR = 280;
  const curR = 20 + progress * maxR;
  const alpha = Math.max(0, 1 - progress);

  // Blinding Core Flash
  const blastGrad = ctx.createRadialGradient(x, y, 5, x, y, curR);
  blastGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  blastGrad.addColorStop(0.2, `rgba(125, 211, 252, ${alpha})`);
  blastGrad.addColorStop(0.5, `rgba(2, 132, 199, ${alpha * 0.85})`);
  blastGrad.addColorStop(0.8, `rgba(30, 27, 75, ${alpha * 0.5})`);
  blastGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = blastGrad;
  ctx.beginPath();
  ctx.arc(x, y, curR, 0, Math.PI * 2);
  ctx.fill();

  // Supersonic shock rings
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 7 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
  ctx.lineWidth = 4.5 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.85, 0, Math.PI * 2);
  ctx.stroke();

  // Ice crystal asteroid shrapnel flying out
  for (let sh = 0; sh < 14; sh++) {
    const sAng = sh * 0.45;
    const sDist = curR * 0.75 + ((now * 0.15 + sh * 20) % (curR * 0.4));
    ctx.fillStyle = sh % 2 === 0 ? '#ffffff' : '#7dd3fc';
    ctx.beginPath();
    ctx.arc(x + Math.cos(sAng) * sDist, y + Math.sin(sAng) * sDist, 3.5 * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Render SS-21 Quasar Super White Laser Beam in Arena (300 dmg/0.2s for 20s)
 */
export function drawStellarQuasarLaser(
  ctx: CanvasRenderingContext2D,
  quasar: StellarQuasarState,
  now: number
) {
  if (!quasar.active) return;
  const { targetX, targetY, startTime, durationMs } = quasar;
  const elapsed = now - startTime;
  const timeLeftSec = Math.max(0, (durationMs - elapsed) / 1000).toFixed(1);

  ctx.save();

  // 1. Vertical Super White Laser Beam shooting down from sky (y=0) to target
  const beamWidth = 32 + Math.sin(now * 0.06) * 6;

  // Outer lavender/violet ionization corona
  const coronaGrad = ctx.createLinearGradient(targetX - beamWidth * 2.2, 0, targetX + beamWidth * 2.2, 0);
  coronaGrad.addColorStop(0, 'rgba(192, 132, 252, 0)');
  coronaGrad.addColorStop(0.3, 'rgba(224, 231, 255, 0.55)');
  coronaGrad.addColorStop(0.5, '#ffffff');
  coronaGrad.addColorStop(0.7, 'rgba(224, 231, 255, 0.55)');
  coronaGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
  ctx.fillStyle = coronaGrad;
  ctx.fillRect(targetX - beamWidth * 2.2, 0, beamWidth * 4.4, targetY);

  // Pure blinding white core
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(targetX - 8, 0, 16, targetY);

  // High-intensity ionization rings travelling down the beam
  for (let r = 0; r < 5; r++) {
    const rY = ((now * 0.4 + r * 65) % Math.max(1, targetY));
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(targetX, rY, beamWidth * 1.5, 5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Ground Thermal Scorching & Plasma Flare
  const flareRad = 36 + Math.sin(now * 0.05) * 8;
  const gGrad = ctx.createRadialGradient(targetX, targetY, 4, targetX, targetY, flareRad);
  gGrad.addColorStop(0, '#ffffff');
  gGrad.addColorStop(0.35, '#c084fc');
  gGrad.addColorStop(0.7, '#d946ef');
  gGrad.addColorStop(1, 'rgba(217, 70, 239, 0)');
  ctx.fillStyle = gGrad;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRad, 0, Math.PI * 2);
  ctx.fill();

  // Concentric ground shock rings
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRad * 0.8, 0, Math.PI * 2);
  ctx.stroke();

  // Floating tactical timer above the beam
  ctx.save();
  ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 1;
  const tagW = 190;
  ctx.beginPath();
  ctx.roundRect(targetX - tagW / 2, Math.max(15, targetY - flareRad - 36), tagW, 24, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9.5px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`⚡ QUASAR LASER: ${timeLeftSec}s (300/0.2s)`, targetX, Math.max(15, targetY - flareRad - 24));
  ctx.restore();

  ctx.restore();
}
