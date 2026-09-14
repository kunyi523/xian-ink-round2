> **2026-09-14 hotfix:** blank tap 开光; mountainReveal residual; larger 劫核; progress int.

# 《仙途点修》第二轮交付总览 · 2026-09-14

目标：去抄袭/他游痕迹；UI/UX·流畅；美工音效；玩法逻辑；建筑从 0→1 重排。

## 已完成

| 块 | 内容 | 谁 |
|---|---|---|
| P0 | 建筑新名（开山香案…）、PEAKS 山麓→近劫、SHORT_NAME 一字碑、文案去「伤害」口气 | Micheal |
| P1 | 丹灶 soft unlock、云游槽 house≥3、离线礼 0.5、劫后 hall 残影+≥10玉 | Micheal |
| M1 | Sheet 可滚、资源条常驻、山缓存/后台停帧 | 粉哥 |
| M2 | ink-btn、印鉴底栏、对照卷+band、HUD 香火/山息、空白不误点 | 粉哥 |
| M3 | 水墨 synth 音效、mission juice、vibrate(shakeOn)、粒子压墨 | 粉哥 |

## 怎么试

进 `源码/`：`npm i && npm run dev`  
存档键仍 `xian-clicker-v1`（建筑 id 未改，旧档可读）。

## 文档

- `第二轮重建大纲-2026-09-14.md`
- `他游痕迹扫描.md` / `P1玩法逻辑-2026-09-14.md`
- `粉哥-水墨独有方向` / `粉哥-M2-改动` / `粉哥-M3-改动`
- `Micheal-接口约定-回粉哥.md`
- `docs/粉哥-实机反馈-2026-09-14.md` / `docs/hotfix-劫核与开局山-2026-09-14.md`

## 已知未做

- 采样文件换合成（API 已留）
- 宽屏左侧卷
- 立绘体积/残山 crossfade 大改
