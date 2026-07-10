# ENGINE_MAP — motorkort for Trumpspillet v2

> Skrevet af Fable 5 (2026-07-10) som videnoverdragelse inden Fable
> forsvinder som model-option (~2026-07-15). Målgruppe: Sonnet/Codex/andre
> modeller der skal VEDLIGEHOLDE og FEJLRETTE selve motoren.
> Skal du kun bygge en ny bane: læs `LEVEL_TEMPLATE.md` i stedet — den er
> hele kontrakten for levels. Dette dokument er alt det UDENOM.
>
> Læs først: `STATUS.md` (nyeste tilstand) + `LESSONS.md` (kendte fælder).
> Alle henvisninger her er SØGBARE STRENGE (funktionsnavne/overskrifter),
> aldrig linjenumre — de rådner.

---

## Filens anatomi

ÉN fil: `index.html`. Ingen build, ingen dependencies. Tre dele:

1. **CSS** øverst (HUD, inventar, helpbox, intro — DOM-elementer)
2. **`#game-data` JSON-blok** — AL redaktionel tekst (replikker, policies,
   medaljer, game over-tekster, FINALE). Redigér tekst HER, aldrig i JS.
3. **Én stor IIFE** med nummererede sektioner (søg på overskriften):

| Sektion | Indhold |
|---|---|
| `0. DATA + UTILS` | `DATA=JSON.parse(...)`, clamp/dist2/pick/roundRectPath |
| `1. CANVAS + CAMERA` | fit(), DPR, stage (desktop-ramme), CAM, beginWorld/endWorld/beginScreen |
| `2. AUDIO` | SFX (WebAudio-toner) + `Music` (MP3-loops, `MUSIC_TRACKS`) |
| `3. GLOBAL STATE` | `SCENE`, `GS` (lives/medals/runStartAt), `player`, load/saveMedals |
| `4. DOM UI` | HUD, medalje-pills, inventar, helpbox, action-chip (DOM, ikke canvas) |
| `5. SPEECH BUBBLES` | renderActorBubble — layout-regler står som kommentar i koden |
| `6. PARTICLES + SHAKE` | spawnSparks/spawnConfetti/drawFx, kamera-shake |
| `7. SPRITES` | drawTrump/drawBear/drawPutin osv. — porteret 1:1 fra v1, DET er spillets look |
| `8. OVERLAY SYSTEM` | choiceOverlay, infoCard, game over-tableauer, voting machine |
| `9. FIGHT ENGINE` | Lars-boksekampen (genbrugelig FightEngine) |
| `10–10E` | de fem oprindelige baner (Greenland/Oval/Kremlin/Epstein/Golf) |
| `11. SCENE SYSTEM` | **LEVELS-registry**, switchScene, heli-menu, markøren `>>> NYE LEVELS REGISTRERES HER <<<` |
| `11B. FINALE` | Medal of Medals-ceremonien (udløses ved alle medaljer) |
| `12. INPUT` | ÉN router for keyboard+mus+touch (se nedenfor — vigtigst!) |
| `13. MAIN LOOP` | step(): update- og draw-rækkefølgen |
| `14. BOOT` | intro-skærm, første rAF, `window.__tv2` debug-hook |

---

## Koordinatsystemer (den vigtigste viden i hele dokumentet)

Der er TRE lag — bland dem aldrig:

1. **World-space**: verden er 540 units høj, gulvet er `GROUND_Y=420`.
   Kameraet: `CAM.scale = clamp(VH/540, 0.5, 2.4)`, `CAM.viewW = VW/CAM.scale`,
   `CAM.x` clampes til `[0, worldW-viewW]` (`updateCamera(focusX)`).
   Tegn med `beginWorld()` … `endWorld()`.
2. **Screen-space**: `VW×VH` — men OBS: det er STAGE-lokale mål, ikke
   browservinduet (se stage nedenfor). Tegn med `beginScreen()`.
3. **Browser-koordinater**: kun rå events. ALLE pointer-handlers oversætter
   straks: `sx = e.clientX - STAGE_X; sy = e.clientY - STAGE_Y`.

**Stagen (desktop-landskabsramme, Spor A1):** på desktop-landscape
(`!coarse pointer && W>H && W>=900`) tegnes spillet i en centreret
16:9-scene (maks 1240 px) med guldramme. `STAGE_ON/STAGE_X/STAGE_Y`
sættes i `fit()`. `beginScreen`/`beginWorld` translater selv med
STAGE_X/Y. `paintStageBackdrop()` clipper til scenen (ctx.save+clip);
`paintStageFrame()` popper clippen (ctx.restore) og tegner rammen —
**de to SKAL forblive parret**, ellers lækker verden ud af rammen.
`positionStageUI()` forankrer DOM-HUD til scenens hjørner.
På mobil/portrait er STAGE_ON=false og alt er som før.
Nyttig konsekvens: på stage er `CAM.viewW` altid ≈960 world-units
(16:9-låst) — Oval-banens hylder er placeret efter dét (fast kamera,
synligt bånd world-x 158–1118; se kommentar i `drawOvalArtifactWall`).

**Regel:** hit-test og tegning skal bruge SAMME koordinater (boble-
lektien i LESSONS.md). Skriv aldrig din egen `ctx.setTransform`.

---

## Main loop — rækkefølgen i `step()`

Update (springes over ved `GS.over`): entry-heli-animation →
`level.update(dt)` → fx → **møntopsamling** (kræver airborne, springes
over ved `entryHeli.active` — mønt-lektien) → `updateCamera(fokus)`
(level kan overstyre fokus via `cameraFocus()`).

Draw (rækkefølge = dybde, ændr den ikke i tankeløshed):
`paintStageBackdrop()` → `level.draw()` → `drawHoverGlow()` (desktop) →
`FightEngine.draw()` → choiceOverlay → infoCard → `drawGameOver()` →
`drawFinale()` → toast → action-chip/DOM → `paintStageFrame()`.

---

## Input — én router, tidlig-retur-stige

`addEventListener('keydown', …)` og `cvs pointerdown` er STIGER af
early-returns i PRIORITETSRÆKKEFØLGE:

INTRO → `GS.over` (tableau/voting machine) → `FINALE.active` →
`FightEngine.active` → `tug` (armlægning) → `flagOverlay` →
choiceOverlay/infoCard → EPSTEIN (alle tap = redaction) → GOLF (egen
pointer-pipeline) → almindelig gameplay.

**Regel:** en ny modal tilstand SKAL ind højt i BEGGE stiger og returnere
efter håndtering — ellers lækker taster/taps ned i gameplay (key-leak-
lektien: giv desuden overlays ~1200 ms dismiss-grace, søg `dismissAt`).

Touch-modellen: `pointers` (Map). Hold >200 ms = gå (zone ±1 efter
skærmhalvdel), kort tap = `intentTap(wx,wy)` (nærmeste tapTarget, rank>0
kun som fallback — glacier-lektien), 2. finger = hop. Desktop-ekstra:
`MOUSE` + `hoverTarget()`/`drawHoverGlow()` (genbruger tapTargets;
slukket ved overlays/fight/cutscene/walkTween).

---

## Overlays & død-loopet

- `openChoice(...)`/`openInfoCard(...)` — generiske; `anyOverlayActive()`
  gater chip/hover/intent-tap. Ny modal? Tilføj den i `anyOverlayActive`.
- Død: `gameOverCause(cause,{delayMs})` → `GS.over=true`, fuldskærms-
  tableau pr. cause (`drawTableau`, én isoleret `else if` pr. cause) →
  tastetryk/tap → `startContinueOverlay()` = **stemmemaskinen**: uanset
  input vælges Trump (INVALID BALLOT → RECOUNT DENIED → …), `GS.lives++`,
  respawn i `GO.lastScene` via levelets `reset()`.
- `FINALE` (11B): udløses af `awardMedal()` når ALLE `DATA.MEDALS`-nøgler
  er vundet. Ren screen-space, scene-uafhængig. Test: `__tv2.cheat.finale()`.

## State & persistens

- `GS.medals` bygges DYNAMISK af `Object.keys(DATA.MEDALS)` — nye baner
  skal kun tilføje deres MEDALS-post i JSON (fixet 2026-07-08).
- localStorage: `trumpv2-medals` (medaljer), `trumpv2-music-muted`.
  Nøglerne må ALDRIG omdøbes — spillernes fremskridt ryger.
- `GS.lives` = antal voting machine-continues. `GS.runStartAt` = run-ur
  (sættes i startGame/fullRestartRun; bruges af finalens stats).
- `fullRestartRun()` nulstiller run (inventar/guld/boosts + alle levels
  `onRestart()`); `fullRestartToIntro()` = tilbage til intro-skærmen.

## Musik & lyd

- `Music.startForScene(id)` kaldes af switchScene; mapping i
  `const MUSIC_TRACKS` (id → MP3 i `Musik til trumpspillet/`). Mangler
  id'et = stilhed, ingen fejl.
- **iOS-JERNREGEL:** lydstyrke KUN via GainNode — aldrig `.volume` på
  media-elementet (global lesson). `ensureAudio()` skal kaldes fra en
  user-gesture før lyd kan starte.
- SFX er syntetiske WebAudio-toner (`SFX.click/buttonPress/achievement`…).

## Sprites & tegne-facts

- Figurerne er håndkodede canvas-rects — bevar stilen (firkantet, flad).
- **`drawTrump(x,y,dir)`: (x,y) = fødder; figuren er ~50 units høj**
  (hårtop -50, ansigt -46…-34, bryst ~-22). Fejl-placeret grafik oven på
  ansigtet var finale-buggen 2026-07-10 — mål efter, gæt ikke.
- Talebobler: `say(actor, txt, ms)` + `renderActorBubble` (regler står
  som kommentar i sektion 5: klem til kamera FØRST, voks opad).
- Mal ALDRIG canvas-UI under initial script-eval — vent på første rAF
  (boot-lektien; se `14. BOOT`).

## Debug & verifikation (SÅDAN arbejder man i dette repo)

- `window.__tv2.snapshot()` — read-only spiltilstand (+ levels egne
  snapshots + stage-info). `__tv2.cheat.gold(n)/.policy(title)/.finale()`.
- Syntaks-tjek FØR browsertest (kommandoerne står i LEVEL_TEMPLATE.md
  trin 6: JSON-validering + `node --check`).
- Playwright headless (skabelon i LEVEL_TEMPLATE.md): kør ALTID desktop
  (1280×720 eller bredere) OG iPhone (390×844, touch); kravet er
  **0 pageerrors** + screenshots man selv har KIGGET på.
  Bevægelse = piletaster (ikke a/d). Heli-menuens numre afhænger af
  hvilken bane man står i (menuen udelader den aktuelle bane!).
- Deploy: `npx wrangler pages deploy . --project-name trumpspillet2026
  --branch=main --commit-dirty=true` (ALTID `--branch=main`) — verificér
  bagefter at live er byte-identisk (`curl` + sammenlign).
- Commit efter hver afsluttet, verificeret ændring; deploy er standard-
  flowet, men spørg Kristian ved indholdsmæssige/redaktionelle ændringer.

## Ti bud for motor-ændringer

1. Læs `LESSONS.md` før du fejlretter — buggen er sandsynligvis en kendt fælde
2. Hit-test og tegning: samme koordinater, samme klemning
3. Ny modal tilstand → ind i BEGGE input-stiger + `anyOverlayActive()` + dismiss-grace
4. `??` i stedet for `||` når 0 er gyldig værdi
5. Rør aldrig localStorage-nøglenavnene
6. Stage-clip (`paintStageBackdrop`/`paintStageFrame`) skal forblive parret
7. Cutscene-bevægelse (entry-heli) undtages fra fysik-triggere
8. Redaktionel tekst i JSON-blokken — aldrig hårdkodet i JS
9. Mobilen er hovedplatformen: verificér ALTID begge viewports
10. Dokumentér i STATUS.md + ny lektie i LESSONS.md, hver gang
