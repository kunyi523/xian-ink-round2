# Changelog · TOP 1 / 4 / 5 · 2026-09-14

Mirrored edits in `游戏核心/` and `源码/src/game/` (identical).  
Did **not** touch `GameShell.tsx` / `WorldCanvas.tsx` / `ui.tsx` (粉哥).

## Fix 1 — Auto-click feel / crit (`store.ts`)
- `tick` autoAcc loop now calls `get().click(nx, ny, true)` near 劫核 instead of raw `applyDamage(clickPower)`.
- Auto path shares `critChance` / `critMult`, juice floaters/particles.
- Auto SFX: only on crit (mute-friendly); juice always emits.

## Fix 4 — Feedback holes (`store.ts` + `data.ts`)
- **A)** `applyDamage` layer break: `sfx.layer()` gated by `sfxOn`.
- **B)** `setSfx` calls `setSfxEnabled(v)`; hydrate also syncs audio module from save.
- **C)** New skill `天道感应` (`senseDao`, `kind:"dao"`, value 0.05, max 10) so `multipliers().dao` can be non-zero.
- **D)** `claimMission` still emits `{ t: "mission" }` (for future dedicated handler) **and** `{ t: "upgrade", name: mission.title }` so existing WorldCanvas upgrade burst fires without touching WorldCanvas.

## Fix 5 — Gacha colors + trib bug (`data.ts` + `store.ts`)
- **A)** `RARITY_COLOR` restyled: gray → teal-ink → blue-ink → cinnabar → purple-ink → near-black → dark gold-brown → near-black gold tint (ink aesthetic, more distinguishable).
- **B)** Tribulation fill loop recomputes `need = tribulationNeed(s.tribFilled)` each iteration (was frozen → extra 道果).

## Leftover for 粉哥
- Optional: dedicated `t: "mission"` juice in `WorldCanvas` (flash + 「任务完成」floater) instead of upgrade-burst fallback.
- TOP 2/3 (HUD scroll / JPG cache) still 粉哥 scope.
