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

export const MOUNTAIN_PATH: { nx: number; ny: number }[] = [
  // 拜山折线：云阶 → 香案 → 残纹 → 剑冢 → 望劫
  { nx: 0.2, ny: 0.84 },
  { nx: 0.34, ny: 0.76 },
  { nx: 0.48, ny: 0.7 },
  { nx: 0.36, ny: 0.58 },
  { nx: 0.28, ny: 0.48 },
  { nx: 0.52, ny: 0.46 },
  { nx: 0.78, ny: 0.46 },
  { nx: 0.58, ny: 0.34 },
];

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

export function tribCenter(w: number, h: number, blit: Blit | null = null) {
  const p = slotXY(TRIB.nx, TRIB.ny, w, h, blit);
  return { cx: p.x, cy: p.y, R: Math.min(w, h) * 0.092 };
}

export function pathPoint(s: number, w: number, h: number, blit: Blit | null = null) {
  const n = MOUNTAIN_PATH.length - 1;
  const t = Math.max(0, Math.min(0.999, s)) * n;
  const i = Math.floor(t);
  const f = t - i;
  const a = MOUNTAIN_PATH[i];
  const b = MOUNTAIN_PATH[i + 1] ?? a;
  const ease = f * f * (3 - 2 * f);
  return slotXY(a.nx + (b.nx - a.nx) * ease, a.ny + (b.ny - a.ny) * ease, w, h, blit);
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
  ctx.strokeStyle = "rgba(92,86,76,0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  MOUNTAIN_PATH.forEach((p, i) => {
    const x = p.nx * w;
    const y = p.ny * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
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

// truncated for size - SEE NOTE
