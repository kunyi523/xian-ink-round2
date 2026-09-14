import { BUILDINGS, type BuildingDef } from "./data";

export const TIER_NAME = ["", "草创", "开山", "仙府"] as const;

export function buildingTier(lv: number): 0 | 1 | 2 | 3 {
  if (lv <= 0) return 0;
  if (lv < 10) return 1;
  if (lv < 25) return 2;
  return 3;
}

export function nextTierAt(lv: number): number | null {
  if (lv < 1) return 1;
  if (lv < 10) return 10;
  if (lv < 25) return 25;
  return null;
}

export function tierName(id: string, tier: number): string {
  if (tier <= 0) return "";
  const def = BUILDINGS.find((b) => b.id === id);
  return def?.tiers[tier - 1] ?? TIER_NAME[tier];
}

export function perkLine(id: string, lv: number): string {
  if (lv <= 0) return BUILDINGS.find((b) => b.id === id)?.perk ?? "";
  if (id === "hall") return `香火 全山山息 +${(lv * 0.5).toFixed(1)}%`;
  if (id === "house") return `人潮 香火自燃 ${(Math.floor(lv / 3) * 0.12).toFixed(2)}/秒`;
  if (id === "sword") return `剑鸣 剑系 +${(lv * 1.6).toFixed(0)}%`;
  if (id === "array") return `阵眼 劫层 +${(lv * 1.2).toFixed(0)}%`;
  if (id === "mine") return `脉晶 ${Math.max(1, Math.floor(lv * 0.35))}/分`;
  if (id === "tower") return `神雷 开光 +${(lv * 1.2).toFixed(0)}%`;
  if (id === "mirror") return `望劫 开光 +${(lv * 0.8).toFixed(0)}%`;
  if (id === "alchemy") return `丹烟 ${Math.max(1, Math.floor(lv * 0.28))}/分`;
  return "";
}

export const SHORT_NAME: Record<string, string> = {
  hall: "香",
  house: "茅",
  sword: "剑",
  array: "纹",
  mine: "脉",
  tower: "雷",
  mirror: "镜",
  alchemy: "丹",
};

export type Peak = {
  id: string;
  nx: number;
  ny: number;
  hw: number;
  hh: number;
  band: 0 | 1 | 2;
  z: number;
};

export const PEAKS: Peak[] = [
  // band0 近劫 · band1 山腰 · band2 山麓 — 从下往上开山（接口约定 2026-09-14）
  { id: "main", nx: 0.48, ny: 0.2, hw: 0.18, hh: 0.22, band: 0, z: 0 },
  { id: "tower", nx: 0.72, ny: 0.22, hw: 0.07, hh: 0.16, band: 0, z: 1 },
  { id: "mirror", nx: 0.58, ny: 0.34, hw: 0.07, hh: 0.1, band: 0, z: 2 },
  { id: "alchemy", nx: 0.11, ny: 0.55, hw: 0.07, hh: 0.1, band: 1, z: 0 },
  { id: "array", nx: 0.28, ny: 0.48, hw: 0.11, hh: 0.12, band: 1, z: 1 },
  { id: "sword", nx: 0.78, ny: 0.46, hw: 0.075, hh: 0.1, band: 1, z: 2 },
  { id: "house", nx: 0.2, ny: 0.84, hw: 0.12, hh: 0.1, band: 2, z: 0 },
  { id: "hall", nx: 0.48, ny: 0.7, hw: 0.14, hh: 0.16, band: 2, z: 1 },
  { id: "mine", nx: 0.82, ny: 0.76, hw: 0.09, hh: 0.11, band: 2, z: 2 },
];

export const BUILDING_SLOTS: Record<string, { nx: number; ny: number; z: number; band: 0 | 1 | 2; hw: number; hh: number }> =
  Object.fromEntries(
    PEAKS.filter((p) => p.id !== "main").map((p) => [p.id, { nx: p.nx, ny: p.ny, z: p.z, band: p.band, hw: p.hw, hh: p.hh }]),
  );

/** 拜山多径：山麓环 / 山腰折 / 朝圣上峰（NPC 分路，不全挤一条折线） */
export const MOUNTAIN_PATHS: { nx: number; ny: number }[][] = [
  // 0 · 山麓环 — 茅舍 ↔ 香案 ↔ 龙脉口
  [
    { nx: 0.2, ny: 0.84 },
    { nx: 0.34, ny: 0.78 },
    { nx: 0.48, ny: 0.7 },
    { nx: 0.66, ny: 0.74 },
    { nx: 0.82, ny: 0.76 },
    { nx: 0.62, ny: 0.8 },
    { nx: 0.4, ny: 0.82 },
    { nx: 0.2, ny: 0.84 },
  ],
  // 1 · 山腰折 — 丹灶 → 残纹 → 剑冢 → 回折
  [
    { nx: 0.11, ny: 0.55 },
    { nx: 0.2, ny: 0.5 },
    { nx: 0.28, ny: 0.48 },
    { nx: 0.52, ny: 0.46 },
    { nx: 0.78, ny: 0.46 },
    { nx: 0.62, ny: 0.52 },
    { nx: 0.4, ny: 0.54 },
    { nx: 0.22, ny: 0.56 },
    { nx: 0.11, ny: 0.55 },
  ],
  // 2 · 朝圣上峰 — 香案 → 残纹 → 望劫 → 雷骨（高稀有偏好）
  [
    { nx: 0.48, ny: 0.7 },
    { nx: 0.36, ny: 0.58 },
    { nx: 0.28, ny: 0.48 },
    { nx: 0.42, ny: 0.4 },
    { nx: 0.58, ny: 0.34 },
    { nx: 0.68, ny: 0.28 },
    { nx: 0.72, ny: 0.22 },
    { nx: 0.58, ny: 0.3 },
    { nx: 0.48, ny: 0.42 },
    { nx: 0.48, ny: 0.7 },
  ],
];

/** @deprecated 兼容旧单折线引用；等同山麓环 */
export const MOUNTAIN_PATH = MOUNTAIN_PATHS[0];

export const PATH_COUNT = MOUNTAIN_PATHS.length;

export const TRIB = { nx: 0.48, ny: 0.11 };

export type Blit = { dx: number; dy: number; dw: number; dh: number };

export function coverBlit(imgW: number, imgH: number, w: number, h: number): Blit {
  const ir = imgW / Math.max(1, imgH);
  const cr = w / Math.max(1, h);
  if (ir > cr) {
    const dh = h;
    const dw = dh * ir;
    return { dx: (w - dw) / 2, dy: 0, dw, dh };
  }
  const dw = w;
  const dh = dw / ir;
  return { dx: 0, dy: (h - dh) / 2, dw, dh };
}

export function panBlit(blit: Blit, pan: number, w: number): Blit {
  const extra = blit.dw - w;
  if (extra <= 0) return { ...blit, dx: 0 };
  const max = extra / 2;
  const p = Math.max(-max, Math.min(max, pan));
  return { ...blit, dx: (w - blit.dw) / 2 + p };
}

export function slotXY(nx: number, ny: number, w: number, h: number, blit: Blit | null) {
  if (!blit) return { x: nx * w, y: ny * h };
  return { x: blit.dx + nx * blit.dw, y: blit.dy + ny * blit.dh };
}

/** 残山→仙山揭示度 0..1：开局偏废墟，随印记数/香案级/层/伐劫推进 */
export function mountainReveal(
  buildings: Record<string, number>,
  layer: number,
  totalDamage: number,
): number {
  const owned = BUILDINGS.reduce((n, b) => n + ((buildings[b.id] ?? 0) > 0 ? 1 : 0), 0);
  if (owned <= 0) return 0;
  const byOwned = owned / BUILDINGS.length;
  const byHall = Math.min(0.22, (buildings.hall ?? 0) / 45);
  const byLayer = Math.min(0.18, Math.max(0, layer) / 40);
  const byDmg = Math.min(0.12, Math.log10(Math.max(1, totalDamage)) / 8);
  return Math.max(0, Math.min(1, byOwned * 0.72 + byHall + byLayer + byDmg));
}

export function tribCenter(w: number, h: number, blit: Blit | null = null) {
  const p = slotXY(TRIB.nx, TRIB.ny, w, h, blit);
  // 视觉半径加大（点空开光已不依赖 R 命中）
  return { cx: p.x, cy: p.y, R: Math.min(w, h) * 0.128 };
}

export function pathPoint(
  s: number,
  w: number,
  h: number,
  blit: Blit | null = null,
  pathIndex = 0,
  jitter = 0,
) {
  const path = MOUNTAIN_PATHS[Math.max(0, Math.min(MOUNTAIN_PATHS.length - 1, pathIndex | 0))] ?? MOUNTAIN_PATHS[0];
  const n = path.length - 1;
  const t = Math.max(0, Math.min(0.999, s)) * n;
  const i = Math.floor(t);
  const f = t - i;
  const a = path[i];
  const b = path[i + 1] ?? a;
  const ease = f * f * (3 - 2 * f);
  const nx = a.nx + (b.nx - a.nx) * ease;
  const ny = a.ny + (b.ny - a.ny) * ease;
  // 轻微横向抖动，避免同径重叠成一串
  const jx = jitter * 0.018 * Math.sin(s * Math.PI * 2 + pathIndex);
  const jy = jitter * 0.01 * Math.cos(s * Math.PI * 2 + pathIndex * 1.7);
  return slotXY(nx + jx, ny + jy, w, h, blit);
}

export function stampStates(buildings: Record<string, number>) {
  const out: { id: string; owned: boolean; locked: boolean; lv: number }[] = [];
  let lockedShown = false;
  for (const def of BUILDINGS) {
    const lv = buildings[def.id] ?? 0;
    const idx = BUILDINGS.findIndex((b) => b.id === def.id);
    const prevOk = idx <= 0 || (buildings[BUILDINGS[idx - 1].id] ?? 0) > 0;
    if (lv > 0 || prevOk) {
      out.push({ id: def.id, owned: lv > 0, locked: false, lv });
    } else if (!lockedShown) {
      out.push({ id: def.id, owned: false, locked: true, lv: 0 });
      lockedShown = true;
    }
  }
  return out;
}

export function buildingsInBand(band: 0 | 1 | 2) {
  return BUILDINGS.filter((b) => BUILDING_SLOTS[b.id]?.band === band).sort(
    (a, b) => (BUILDING_SLOTS[a.id]?.z ?? 0) - (BUILDING_SLOTS[b.id]?.z ?? 0),
  );
}

const SKIN = ["#e2b48a", "#d4a074", "#c48e62", "#ebc4a0", "#d8aa80", "#c9a078"];
const HAIR = ["#1a1612", "#2a2420", "#1c1814", "#3a342c"];
const ROBE = ["#cfc6b8", "#a63d32", "#3a3630", "#e8e0d2", "#5c564c", "#6e2a24"];

export function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#e4dccb");
  g.addColorStop(0.45, "#d8cfc0");
  g.addColorStop(1, "#cfc6b6");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function drawDistantPeaks(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#c4baa8";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.38);
  ctx.lineTo(w * 0.3, h * 0.22);
  ctx.lineTo(w * 0.55, h * 0.32);
  ctx.lineTo(w, h * 0.18);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fill();
}

export function drawPeaks(ctx: CanvasRenderingContext2D, w: number, h: number, band: 0 | 1 | 2) {
  const fill = ["#b3a894", "#9c9280", "#8a8478"][band];
  ctx.fillStyle = fill;
  ctx.beginPath();
  const y0 = h * (0.28 + band * 0.18);
  ctx.moveTo(0, h);
  ctx.lineTo(0, y0);
  ctx.quadraticCurveTo(w * 0.25, y0 - h * 0.08, w * 0.5, y0 + h * 0.04);
  ctx.quadraticCurveTo(w * 0.75, y0 - h * 0.06, w, y0);
  ctx.lineTo(w, h);
  ctx.fill();
}

export function drawWaterfall(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "#f3eee4";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(w * 0.18, h * 0.22);
  ctx.lineTo(w * 0.2, h * 0.62);
  ctx.stroke();
  ctx.globalAlpha = 0.18 + 0.08 * Math.sin(t * 4);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w * 0.175, h * 0.24 + ((t * 40) % 20));
  ctx.lineTo(w * 0.195, h * 0.6);
  ctx.stroke();
  ctx.restore();
}

export function drawPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 三条淡墨径：山麓最实，朝圣最淡
  const alphas = [0.32, 0.22, 0.14];
  MOUNTAIN_PATHS.forEach((path, pi) => {
    ctx.strokeStyle = `rgba(92,86,76,${alphas[pi] ?? 0.18})`;
    ctx.lineWidth = pi === 0 ? 2.6 : 1.8;
    ctx.beginPath();
    path.forEach((p, i) => {
      const x = p.nx * w;
      const y = p.ny * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
}

export function drawBandMist(ctx: CanvasRenderingContext2D, w: number, h: number, band: number) {
  ctx.fillStyle = `rgba(243,238,228,${0.08 + band * 0.04})`;
  ctx.fillRect(0, h * (0.35 + band * 0.2), w, 28);
}

export function drawForeground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#7a7468";
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.92);
  ctx.quadraticCurveTo(w * 0.5, h * 0.88, w, h * 0.94);
  ctx.lineTo(w, h);
  ctx.fill();
}

export function drawCultivator(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number,
  t: number,
  scale = 1,
  facing = 1,
) {
  const bob = Math.sin(t * 7.2) * 1.15;
  const stride = Math.sin(t * 8.4);
  const skin = SKIN[variant % SKIN.length];
  const hair = HAIR[variant % HAIR.length];
  const robe = ROBE[variant % ROBE.length];
  const female = variant % 3 === 1;
  ctx.save();
  ctx.translate(x, y + bob);
  ctx.scale(scale * facing, scale);
  ctx.fillStyle = hair;
  if (female) {
    ctx.fillRect(-2, -8, 5, 3);
    ctx.fillRect(-3, -6, 2, 5);
    ctx.fillRect(2, -6, 2, 5);
  } else {
    ctx.fillRect(-2, -8, 5, 3);
    ctx.fillRect(-1, -9, 3, 2);
  }
  ctx.fillStyle = skin;
  ctx.fillRect(-2, -6, 5, 4);
  ctx.fillStyle = "#2a2018";
  ctx.fillRect(-1, -5, 1, 1);
  ctx.fillRect(1, -5, 1, 1);
  ctx.fillStyle = robe;
  ctx.fillRect(-3, -2, 7, 5);
  ctx.fillStyle = variant % 2 === 0 ? "#a63d32" : "#3a3630";
  ctx.fillRect(-3, -1, 7, 1);
  ctx.fillStyle = robe;
  ctx.fillRect(-2 + stride * 1.2, 3, 2, 3.2);
  ctx.fillRect(1 - stride * 1.2, 3, 2, 3.2);
  ctx.fillStyle = "#2a2622";
  ctx.fillRect(-2 + stride * 1.2, 6, 2, 1);
  ctx.fillRect(1 - stride * 1.2, 6, 2, 1);
  ctx.restore();
}

export function drawSwordRider(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  scale: number,
  facing: number,
  rarity: number,
) {
  const bob = Math.sin(t * 5.1) * 1.4;
  const tilt = Math.sin(t * 2.4) * 0.12;
  const robe = rarity >= 5 ? "#a63d32" : rarity >= 3 ? "#2a2622" : rarity >= 1 ? "#4a453e" : "#cfc6b8";
  ctx.save();
  ctx.translate(x, y + bob);
  ctx.rotate(tilt);
  ctx.scale(scale * facing, scale);
  ctx.strokeStyle = "#1c1914";
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-11, 5);
  ctx.lineTo(12, 2.4);
  ctx.stroke();
  ctx.fillStyle = "#e2b48a";
  ctx.fillRect(-2, -8, 4, 4);
  ctx.fillStyle = "#1a1612";
  ctx.fillRect(-2, -9, 4, 2);
  ctx.fillStyle = robe;
  ctx.fillRect(-3, -4, 6, 6);
  ctx.restore();
}

export function drawCrane(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, scale = 1, facing = 1) {
  const flap = Math.sin(t * 3.4) * 0.45;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * facing, scale);
  ctx.strokeStyle = "#1c1914";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-8, flap * 6);
  ctx.lineTo(0, 0);
  ctx.lineTo(8, -flap * 6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(4, 3);
  ctx.stroke();
  ctx.restore();
}

export function drawTribCloud(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  pulse: number,
  t: number,
) {
  const blobs: [number, number, number][] = [
    [0, 0.06, 1.08],
    [-0.78, 0.12, 0.7],
    [0.76, 0.14, 0.68],
    [-0.38, -0.12, 0.55],
    [0.36, -0.1, 0.52],
    [0.04, 0.28, 0.48],
    [-0.55, 0.32, 0.36],
    [0.58, 0.3, 0.34],
  ];
  ctx.save();
  // 外圈淡墨晕（水墨 wash）
  const wash = ctx.createRadialGradient(cx, cy, s * 0.15, cx, cy, s * 2.4);
  wash.addColorStop(0, `rgba(28,25,20,${0.14 + pulse * 0.06})`);
  wash.addColorStop(0.45, "rgba(28,25,20,0.07)");
  wash.addColorStop(1, "rgba(28,25,20,0)");
  ctx.fillStyle = wash;
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.05, s * 2.35, s * 1.15, 0, 0, Math.PI * 2);
  ctx.fill();

  for (const [dx, dy, sc] of blobs) {
    const wob = 0.06 * Math.sin(t * 0.6 + dx * 2.2);
    const rx = s * sc * (1.62 + pulse * 0.06 + wob);
    const ry = s * sc * (0.52 + 0.07 * Math.sin(t * 0.5 + dy));
    ctx.fillStyle = "rgba(28,25,20,0.09)";
    ctx.beginPath();
    ctx.ellipse(cx + dx * s * 1.4, cy + dy * s, rx * 1.2, ry * 1.25, dx * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const [dx, dy, sc] of blobs) {
    const rx = s * sc * (1.1 + pulse * 0.05);
    const ry = s * sc * (0.36 + 0.05 * Math.sin(t * 0.48 + dy));
    ctx.fillStyle = `rgba(28,25,20,${0.34 + pulse * 0.1})`;
    ctx.beginPath();
    ctx.ellipse(cx + dx * s * 1.28, cy + dy * s * 0.88, rx, ry, dx * 0.07, 0, Math.PI * 2);
    ctx.fill();
  }
  // 墨核
  const core = ctx.createRadialGradient(cx - s * 0.05, cy - s * 0.04, 0, cx, cy, s * 0.55);
  core.addColorStop(0, `rgba(40,36,32,${0.82 + pulse * 0.1})`);
  core.addColorStop(0.55, "rgba(28,25,20,0.55)");
  core.addColorStop(1, "rgba(28,25,20,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.02, s * 0.52, s * 0.28, -0.06, 0, Math.PI * 2);
  ctx.fill();
  // 软朱砂印心（非硬红点）
  const seal = ctx.createRadialGradient(cx + s * 0.04, cy - s * 0.02, 0, cx + s * 0.04, cy, s * (0.22 + pulse * 0.12));
  seal.addColorStop(0, `rgba(166,61,50,${0.72 + pulse * 0.2})`);
  seal.addColorStop(0.45, `rgba(166,61,50,${0.28 + pulse * 0.12})`);
  seal.addColorStop(1, "rgba(166,61,50,0)");
  ctx.fillStyle = seal;
  ctx.beginPath();
  ctx.ellipse(cx + s * 0.05, cy, s * (0.16 + pulse * 0.35), s * (0.08 + pulse * 0.16), 0.12, 0, Math.PI * 2);
  ctx.fill();
  // 宣纸高光一点
  ctx.fillStyle = `rgba(243,238,228,${0.22 + pulse * 0.15})`;
  ctx.beginPath();
  ctx.ellipse(cx - s * 0.06, cy - s * 0.05, s * 0.045, s * 0.022, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  id: string,
  owned: boolean,
  locked: boolean,
) {
  const r = id === "hall" ? 15 : id === "array" ? 14 : 12;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = owned ? 0.7 : locked ? 0.38 : 0.55;
  ctx.beginPath();
  ctx.arc(0, 0, r + 1.6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(243,238,228,0.32)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = owned ? "rgba(28,25,20,0.68)" : locked ? "rgba(92,86,76,0.5)" : "rgba(58,54,48,0.55)";
  ctx.fill();
  ctx.strokeStyle = owned ? "rgba(243,238,228,0.62)" : "rgba(138,132,120,0.45)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.globalAlpha = locked ? 0.55 : 0.95;
  ctx.fillStyle = "#f3eee4";
  ctx.strokeStyle = "#f3eee4";
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (locked) {
    ctx.beginPath();
    ctx.arc(0, -1.6, 2.4, Math.PI, 0);
    ctx.stroke();
    ctx.strokeRect(-2.8, -1.6, 5.6, 4.6);
  } else {
    drawStampMark(ctx, id);
  }
  ctx.restore();
}

function drawStampMark(ctx: CanvasRenderingContext2D, id: string) {
  ctx.strokeStyle = "#f3eee4";
  ctx.fillStyle = "#f3eee4";
  ctx.lineWidth = 1.25;
  ctx.lineCap = "round";
  if (id === "sword") {
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 6);
    ctx.moveTo(-3.2, -2.5);
    ctx.lineTo(3.2, -2.5);
    ctx.stroke();
  } else if (id === "tower") {
    ctx.strokeRect(-2.6, -2.2, 5.2, 3.2);
    ctx.beginPath();
    ctx.moveTo(-2, -2.2);
    ctx.lineTo(0, -6.4);
    ctx.lineTo(2, -2.2);
    ctx.stroke();
  } else if (id === "array") {
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(6.2, 5);
    ctx.lineTo(-6.2, 5);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0.4, 2.4, 0, Math.PI * 2);
    ctx.stroke();
  } else if (id === "mine") {
    ctx.beginPath();
    ctx.moveTo(-6.5, 3);
    ctx.quadraticCurveTo(0, -8, 6.5, 3);
    ctx.stroke();
  } else if (id === "alchemy") {
    ctx.beginPath();
    ctx.moveTo(-5.2, 1.5);
    ctx.lineTo(-3.2, 6);
    ctx.lineTo(3.2, 6);
    ctx.lineTo(5.2, 1.5);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, -1.2, 3.2, 2.4, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (id === "mirror") {
    ctx.beginPath();
    ctx.ellipse(0, 0.2, 4.6, 6.2, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (id === "house") {
    ctx.beginPath();
    ctx.moveTo(0, -6.2);
    ctx.lineTo(6.2, 0.2);
    ctx.lineTo(-6.2, 0.2);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeRect(-4, 0.2, 8, 5.2);
  } else {
    ctx.beginPath();
    ctx.moveTo(-7, -1);
    ctx.lineTo(0, -8);
    ctx.lineTo(7, -1);
    ctx.stroke();
    ctx.strokeRect(-5.4, -1, 10.8, 7);
  }
}

function drawQiThreads(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  n: number,
  spread: number,
  height: number,
  tint: "ink" | "seal" | "paper" = "ink",
) {
  for (let i = 0; i < n; i++) {
    const seed = i * 1.618;
    const life = (t * 0.28 + seed) % 1;
    const sway = Math.sin(seed * 4 + t * 0.9) * spread * 0.35;
    const px = x + Math.sin(seed * 2.3) * spread * 0.45 + sway * life;
    const py = y - life * height;
    const a = (1 - life) * (1 - life) * 0.42;
    ctx.globalAlpha = a;
    ctx.strokeStyle = tint === "seal" ? "#a63d32" : tint === "paper" ? "#f3eee4" : "#3a3630";
    ctx.lineWidth = 1 + (1 - life) * 0.6;
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(seed) * spread * 0.25, y);
    ctx.quadraticCurveTo(x + sway, y - life * height * 0.55, px, py);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function drawSiteFx(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lv: number,
  t: number,
  id?: string,
  scale = 56,
  ruined = false,
) {
  const tier = ruined ? 0 : buildingTier(lv);
  const s = Math.max(28, scale);
  const breath = 0.5 + 0.5 * Math.sin(t * 1.15 + x * 0.01);
  ctx.save();
  if (id === "array") drawArraySite(ctx, x, y, s, tier, t, ruined, breath);
  else if (id === "sword") drawSwordSite(ctx, x, y, s, tier, t, ruined);
  else if (id === "tower") drawTowerSite(ctx, x, y, s, tier, t, ruined, breath);
  else if (id === "mine") drawMineSite(ctx, x, y, s, tier, t, ruined);
  else if (id === "alchemy") drawAlchemySite(ctx, x, y, s, tier, t, ruined, breath);
  else if (id === "mirror") drawMirrorSite(ctx, x, y, s, tier, t, ruined, breath);
  else if (id === "house") drawHouseSite(ctx, x, y, s, tier, t, ruined, breath);
  else if (id === "hall") drawHallSite(ctx, x, y, s, tier, t, ruined);
  ctx.restore();
}

function drawArraySite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
  breath: number,
) {
  const pillars: [number, number, number][] = [
    [0, -s * 0.38, ruined ? -0.18 : 0],
    [-s * 0.46, s * 0.24, ruined ? 0.22 : 0],
    [s * 0.46, s * 0.24, ruined ? -0.12 : 0],
  ];
  for (const [px, py, rot] of pillars) {
    ctx.save();
    ctx.translate(x + px, y + py);
    ctx.rotate(rot);
    ctx.globalAlpha = ruined ? 0.32 : 0.65;
    ctx.strokeStyle = ruined ? "#5c564c" : "#2a2622";
    ctx.lineWidth = ruined ? 1.2 : 1.8;
    const h = ruined ? s * 0.14 : s * (0.22 + tier * 0.03);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -h);
    ctx.moveTo(-4.5, -h);
    ctx.lineTo(4.5, -h);
    ctx.stroke();
    ctx.restore();
  }
  ctx.strokeStyle = ruined ? "rgba(92,86,76,0.4)" : `rgba(166,61,50,${0.38 + breath * 0.28})`;
  ctx.lineWidth = ruined ? 1 : 1.7;
  ctx.beginPath();
  ctx.moveTo(x, y - s * 0.38);
  ctx.lineTo(x + s * 0.46, y + s * 0.24);
  ctx.lineTo(x - s * 0.46, y + s * 0.24);
  ctx.closePath();
  ctx.stroke();
  if (tier >= 1) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.2, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (tier >= 2) drawQiThreads(ctx, x, y, t, 5, s * 0.28, s * 0.7, "ink");
  if (tier >= 3) drawQiThreads(ctx, x, y - s * 0.1, t + 1, 4, s * 0.22, s * 0.85, "seal");
}

function drawSwordSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
) {
  const n = ruined ? 1 : 2 + tier;
  for (let i = 0; i < n; i++) {
    const ang = ruined ? -0.6 : t * 0.7 + i * ((Math.PI * 2) / n);
    const rr = ruined ? s * 0.18 : s * (0.22 + 0.08 * Math.sin(t + i));
    ctx.save();
    ctx.globalAlpha = ruined ? 0.3 : 0.7;
    ctx.translate(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr * 0.45 - 8);
    ctx.rotate(ang + 0.4);
    ctx.strokeStyle = ruined ? "#5c564c" : "#1c1914";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.16);
    ctx.lineTo(0, -s * 0.22);
    ctx.stroke();
    ctx.restore();
  }
  if (tier >= 2) drawQiThreads(ctx, x, y, t, 3 + tier, s * 0.2, s * 0.55, "ink");
}

function drawTowerSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
  breath: number,
) {
  if (ruined) {
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = "#5c564c";
    ctx.beginPath();
    ctx.moveTo(x - 6, y + 8);
    ctx.lineTo(x - 2, y - s * 0.4);
    ctx.stroke();
    return;
  }
  if (tier >= 1) drawQiThreads(ctx, x, y - s * 0.35, t, 3, s * 0.12, s * 0.55, "ink");
  if (tier >= 2) {
    ctx.strokeStyle = `rgba(28,25,20,${0.4 + breath * 0.3})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y - s * 0.4);
    ctx.lineTo(x + Math.sin(t * 8) * s * 0.12, y - s * 0.95);
    ctx.stroke();
  }
}

function drawMineSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
) {
  ctx.globalAlpha = ruined ? 0.28 : 0.55;
  ctx.strokeStyle = "#2a2622";
  ctx.beginPath();
  ctx.moveTo(x - s * 0.38, y + s * 0.12);
  ctx.quadraticCurveTo(x, y - s * (ruined ? 0.12 : 0.28), x + s * 0.38, y + s * 0.12);
  ctx.stroke();
  if (!ruined && tier >= 2) drawQiThreads(ctx, x, y, t, 4, s * 0.22, s * 0.45, "ink");
}

function drawAlchemySite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
  breath: number,
) {
  if (ruined) return;
  ctx.fillStyle = `rgba(166,61,50,${0.32 + breath * 0.35})`;
  ctx.beginPath();
  ctx.moveTo(x - 4, y + s * 0.06);
  ctx.quadraticCurveTo(x, y - s * (0.18 + breath * 0.1), x + 4, y + s * 0.06);
  ctx.fill();
  drawQiThreads(ctx, x, y - s * 0.05, t, 2 + tier, s * 0.12, s * 0.5, tier >= 3 ? "seal" : "ink");
}

function drawMirrorSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
  breath: number,
) {
  ctx.globalAlpha = ruined ? 0.25 : 0.55;
  ctx.strokeStyle = ruined ? "#5c564c" : "#2a2622";
  ctx.beginPath();
  ctx.ellipse(x, y - 2, s * 0.22, s * 0.3, 0, 0, Math.PI * 2);
  ctx.stroke();
  if (!ruined && tier >= 2) drawQiThreads(ctx, x, y - s * 0.1, t, 3, s * 0.16, s * 0.45, "paper");
}

function drawHouseSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
  breath: number,
) {
  if (ruined) return;
  const g = 0.35 + breath * 0.4;
  ctx.fillStyle = `rgba(166,61,50,${g})`;
  ctx.fillRect(x - s * 0.28, y - 8, 4, 6);
  ctx.fillRect(x + s * 0.22, y - 6, 4, 6);
  if (tier >= 2) drawQiThreads(ctx, x, y, t, 3, s * 0.3, s * 0.35, "ink");
}

function drawHallSite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tier: number,
  t: number,
  ruined: boolean,
) {
  if (ruined) return;
  drawQiThreads(ctx, x, y + 4, t, 3 + tier, s * 0.22, s * 0.45, "ink");
  if (tier >= 3) drawQiThreads(ctx, x, y, t + 1.2, 3, s * 0.16, s * 0.55, "seal");
}

export function drawUpgradeBurst(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fl: number,
  tierUp: boolean,
) {
  if (fl <= 0) return;
  ctx.save();
  const a = Math.min(1, fl);
  ctx.globalAlpha = a * 0.55;
  ctx.fillStyle = "#f3eee4";
  ctx.beginPath();
  ctx.ellipse(x, y + 6, 18 + (1 - a) * 70, 10 + (1 - a) * 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = a * 0.7;
  ctx.fillStyle = tierUp ? "rgba(166,61,50,0.55)" : "rgba(243,238,228,0.55)";
  ctx.fillRect(x - (tierUp ? 5 : 3), y - (40 + (1 - a) * 90), tierUp ? 10 : 6, 50 + (1 - a) * 90);
  ctx.strokeStyle = `rgba(166,61,50,${a})`;
  ctx.lineWidth = tierUp ? 3 : 2;
  ctx.beginPath();
  ctx.arc(x, y, 16 + (1 - a) * (tierUp ? 70 : 40), 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function drawProceduralBuilding(
  ctx: CanvasRenderingContext2D,
  def: BuildingDef,
  x: number,
  y: number,
  lv: number,
  t: number,
) {
  drawSiteFx(ctx, x, y, lv, t, def.id, 48, lv <= 0);
}

export function drawRuinVeil(ctx: CanvasRenderingContext2D, x: number, y: number, rw: number, rh: number) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x, y, rw, rh, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(176,164,148,0.7)";
  ctx.fill();
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#6e685c";
  ctx.fillRect(x - rw * 0.25, y, rw * 0.18, rh * 0.22);
  ctx.fillRect(x + rw * 0.1, y + rh * 0.05, rw * 0.2, rh * 0.16);
  ctx.restore();
}
