# 《仙途点修》第二轮交付

> **2026-09-14 hotfix:** blank tap 开光; mountainReveal residual; larger 劫核; progress int.

试玩：`源码/` → `npm i && npm run dev`

详见 `docs/`（含粉哥实机反馈与劫核/开局山 hotfix 说明）。

完整 `游戏核心/ink.ts`、`WorldCanvas.tsx`、`ui.tsx` 载荷在 `grok-parts/*.gz.b64`（WorldCanvas 为 `.0`+`.1`）。运行仓库内 `.github/workflows/assemble-hotfix.yml` 或本地 gunzip+base64 解码写入。
