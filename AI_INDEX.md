# AI_INDEX — Trumpspillet 2026 (kort indgangsfil)

Formål: Hurtig onboarding for AI. **Læs STATUS.md først.**

## Filer (kort)
- `index.html` — HELE spillet (v2-genopbygningen, 2026-07-08). Én responsiv
  fil, mobile-first, desktop+mobil i samme kodebase. Alt spil-state i én
  IIFE; redaktionel tekst i `#game-data` JSON-blokken øverst.
- `index-v1.html` — ARKIV: den gamle version (13.633 linjer, desktop-only).
  Rør den ikke; kun reference. Live på `/index-v1`.
- `GAME_SPEC.md` — gameplay-facit fra genopbygningen ⭐
- `BUILD_PLAN_V2.md` — genopbygningens trin (alle ✅ pr. 2026-07-08)
- `SCENE_REVIEW_KREMLIN_EPSTEIN_GOLF.md` — UX-beslutninger (pakke B)
- `LESSONS.md` — projekt-lektier (læs før debugging!)
- `assets/` — golfbane-overlays, drawing.png, oval office-billeder
- `Musik til trumpspillet/` — 4 MP3-underlægningsspor
- `_redirects` — Cloudflare: gamle `/trumpspillet-v2`-links → `/`
- `Trumpspillet 2026-kopi.html`, `Trumpspillet2026Mobil.html`,
  `START_PROMPT.md`, `WORKFLOW_ANCHORS.md` — historiske v1-arbejdsfiler

## Deploy/status
- Git remote: `https://github.com/kristianjensen5/Trumpspillet2026.git`
- Cloudflare Pages: `trumpspillet2026` → https://trumpspillet2026.pages.dev/
- Deploy: `npx wrangler pages deploy . --project-name trumpspillet2026
  --branch=main --commit-dirty=true` (ALTID `--branch=main`, ellers preview)
- User-regel: deploy som standard efter hver færdig update

## v2-arkitektur (index.html)
- Kamera: verden 540 høj, gulv y=420, `CAM.scale=VH/540 (clamp .5–2.4)`,
  `beginWorld()/endWorld()/beginScreen()`; worldW per scene i SCENES
- Overlays: `openChoice/openInfoCard`; død: `gameOverCause(...)` →
  fuldskærms-tableau → voting machine (`startContinueOverlay`)
- Mobil-input: pointers-map (hold >200 ms = gå, tap = intentTap,
  2. finger = hop) + kontekst-chips
- Debug: `window.__tv2.snapshot()` + `.cheat.gold(n)` / `.cheat.policy(title)`
- Verifikation: Playwright headless (npm install playwright i scratchpad;
  browsers cached i ~/Library/Caches/ms-playwright)
