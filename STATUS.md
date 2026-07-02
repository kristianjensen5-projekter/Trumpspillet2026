# Trumpspillet 2026 — Status

**Type:** arbejde (bekræftet af Kristian 2026-07-02)
**Live URL:** https://trumpspillet2026.pages.dev/ (gammel version) ·
**v2-test:** https://trumpspillet2026.pages.dev/trumpspillet-v2
**GitHub:** https://github.com/kristianjensen5/Trumpspillet2026
**Senest opdateret:** 2026-07-02

---

## Hvad er det?

2D satirisk canvas-spil hvor spilleren styrer Trump gennem fem baner
(Greenland, Oval Office, Kremlin, Epstein Files, Mar-a-Lago mini-golf).
Bygget over et år af mange AI-generationer — nu under **fuld genopbygning**
(v2) fordi den gamle kodebase er for tung at ændre i og ikke virker på mobil.

---

## Status lige nu

- ✅ Gammel version (`index.html`, 13.633 linjer) virker på desktop — RØRES IKKE
- ✅ `GAME_SPEC.md` skrevet: komplet gameplay-facit udtrukket af Fable 5 ved
  fuld kodegennemlæsning, krydstjekket mod Codex' `kodebasetilfable.md`
- ✅ **v2-fundament + Greenland bygget og verificeret** (`trumpspillet-v2.html`,
  ~2.300 linjer): intro, heli-entry, kamera (portrait-mobil!), gå/hop/mønter,
  mine, olierig, butik+inventar, isbjørn (rasende+bid+game over), Lars-dialog
  → fight → sejr+medalje, dynamit (Lars/isbjerg/jord), vand-stigning →
  ice-game-over, voting-machine-continue (+1 liv, respawn), medaljer i
  localStorage, touch-styring (hold=gå, tap=interager, 2. finger=hop,
  kontekst-knap), debug-hook `window.__tv2`
- ✅ Verificeret med automatiserede Playwright-flowtests (desktop + mobil
  viewport) — alle flows testet ende-til-ende, 0 konsolfejl. 3 bugs fundet og
  fixet undervejs (se LESSONS.md — én var en latent v1-bug!)
- ⏳ Heli-menuens 4 andre destinationer viser "coming in the next build step"
- ❌ Gammel mobiltestfil (`Trumpspillet2026Mobil.html`) forældet — erstattes af v2

## Genopbygningsplan (v2)

1. ✅ Spec + krydstjek (Fable 5, 2026-07-02)
2. ✅ Fundament + Greenland komplet (Fable 5, 2026-07-02)
3. ⏳ Oval Office → Kremlin → Epstein → Golf (én bane ad gangen, test imellem)
4. Musik-engine (chiptune-tracks porteres; disabled by default)
5. Når v2 = feature-paritet: v2 bliver `index.html`, gammel fil arkiveres

---

## Næste skridt

1. **Kristian tester Greenland-v2 på fysisk iPhone** (deploy preview først —
   afventer OK til commit/deploy)
2. Derefter Oval Office (byggetrin 3 — kan bygges af Sonnet efter GAME_SPEC.md
   afsnit 4)

## Afventer

- Kristians test af v2-Greenland på iPhone → resultat tilbage i næste chat

---

## Tekniske beslutninger

- **Genopbygning frem for refaktorering** — gameplay bevares 1:1 fra
  `GAME_SPEC.md`; kun arkitekturen er ny (besluttet 2026-07-02)
- v2: én responsiv fil, mobile-first, samme kodebase til desktop+mobil
  (regel 4) — ingen separat mobilfil
- Draw-funktioner (pixel-art-figurerne) porteres næsten 1:1 fra original —
  det er spillets look
- Lottie-web-CDN droppes; golfbane-geometri konverteres til ren JSON
- Musik-engine genopbygges men er disabled by default (som i original)
- Redaktionel tekst holdes i JSON-blokke adskilt fra kode
- localStorage-nøgler bevares (`trumpv2-medals` osv.) så medaljer overlever

## Kendte problemer

- Gammel version: to-fils-strategi (desktop/mobil) er usynkroniseret —
  løses ved at v2 erstatter begge
- iOS: lydstyrke KUN via Web Audio GainNode, aldrig `.volume` (global lesson)
- Test altid på fysisk iPhone, ikke kun emulator

---

## Vigtige filer

- `index.html` — GAMMEL fungerende version (rør ikke; reference)
- `GAME_SPEC.md` — gameplay-facit for genopbygningen ⭐
- `kodebasetilfable.md` — Codex' rebuild-brief (krydstjekket mod spec)
- `trumpspillet-v2.html` — NY version under opbygning
- `AI_INDEX.md`, `START_PROMPT.md`, `WORKFLOW_ANCHORS.md` — gammel versions
  arbejdsdokumenter (historik)
- `assets/` — golfbane-overlays, drawing.png m.m.
