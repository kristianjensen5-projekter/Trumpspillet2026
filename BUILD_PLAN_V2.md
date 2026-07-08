# BUILD_PLAN_V2 — færdiggørelse af genopbygningen

> Fable 5, 2026-07-03. **Kristians beslutning:** Fable bygger ALLE resterende
> baner selv ("jeg har ikke tillid til at hverken sonnet eller opus kan bygge
> banerne korrekt"). Pakke B fra `SCENE_REVIEW_KREMLIN_EPSTEIN_GOLF.md`
> gælder for alle scener. Denne fil er kontrakten på tværs af sessioner —
> en frisk session skal kunne fortsætte fra næste ubyggede trin.

## Arbejdsform (gælder hvert trin)

1. Byg i `trumpspillet-v2.html` (gameplay-facit: `GAME_SPEC.md`;
   UX-beslutninger: `SCENE_REVIEW_KREMLIN_EPSTEIN_GOLF.md` pakke B)
2. Verificér med automatiserede Playwright-flowtests (desktop 1280×720 +
   iPhone-portrait 390×844) via debug-hooken `window.__tv2` — udvid
   snapshot() med den nye scenes state
3. Kør Greenland+Oval-regressionstesten (scripts genskabes billigt, se
   LESSONS.md)
4. Commit + push + `npx wrangler pages deploy . --project-name
   trumpspillet2026 --branch=main --commit-dirty=true` + curl-verificér
5. Opdater STATUS.md; nye lektier → LESSONS.md
6. Kristian iPhone-tester efter hvert trin (checkpoint)

## Trin og rækkefølge (med begrundelse)

### ✅ Trin 0–3 (færdige)
Spec/krydstjek → fundament + Greenland → boble-fix → Oval Office (pakke B).

### ✅ Trin 4: Død-løkken — voting machine + game over-tableauer (2026-07-03)
**Hvorfor først:** Alle baner munder ud i denne løkke — bygges den færdig
nu, tester hver efterfølgende bane automatisk mod det endelige flow.
- Voting machine i fuld skærm; framing: "Out of luck? In America, you can
  always VOTE."
- **Kerne-gag (Kristians oprindelige idé, aldrig implementeret i v1):**
  ALLE tryk fører til Trump. DEMOCRAT → ryst + buzzer + eskalerende afvisning
  ("INVALID BALLOT" → "RECOUNT DENIED" → "SO RIGGED... FOR YOU") → spinner
  ALLIGEVEL og lander på TRUMP. Genstart-til-intro flyttes til diskret
  "Give up"-linje (+ Shift+R)
- Game over som fuldskærms-ANIMEREDE tableauer (temaet er skærmen):
  bear (sne falder), ice (vandet stiger, MAGA-kasket flyder), lars-fight
  (roterende stjerner, Lars m. løftet arm), nuke (voksende paddehattesky).
  Wagner/kremlin/golf/epstein-tableauer bygges sammen med deres baner.

### ✅ Trin 5: Kremlin (2026-07-03)
- Verden: vægge/draperier/Stalin-portræt/sort bord (GAME_SPEC §5), dør,
  heli, 4 mønter
- Infokort: "Putin wants to settle Ukraine the old way: ARM WRESTLING..."
- Håndtryk: tap-mash på mobil / A+D på desktop. Fase 2 = "PUTIN FIGHTS
  BACK!" (hårdere træk + rystelse) — INTET tasteskift. Vind → Ukraine-kort-
  overlay m. dalende US-flag → Nobel-drop + medalje. Tab → russisk flag +
  Putin-hån + øjeblikkelig revanche
- Statuer: 3 stk., synlig vagt-status (rød kant/👁 når laser ser dem),
  Putins setup-linje "Do not touch my statues, Donald.", stjålne statuer
  vises på Oval-hylderne
- Kameraer: 2 stk. med sweep (8 s, modfase), laserkegler
- Wagner-chase: fanget → 2 soldater, pil mod heli + "RUN!"-hint; sneakers =
  flugt-menu; ellers game over 'wagner' (gulag-tableau)
- Dynamit på Putin → 'kremlin'-tableau ("World Peace?" + dalende duefjer)
- Heli-menu opdateres: Moscow aktiv

### ✅ Trin 6: Epstein Files (2026-07-03)
- Dokumentgenerator (GAME_SPEC §6): 12 sider, præcis 10 Trump-varianter
  (sidste side garanteret ≥1), 3× Clinton + 3× Gates m. 🛑-glyf
- Scroll + gylden hit-zone; **stor REDACT-knap** til touch (E på desktop);
  misses som ❌❌❌-liv; blødere startkurve, hårdere slutning; assist efter
  miss beholdes
- **Rettet sejrslogik: ≤2 misses = bestået + medalje.** 10/10 giver
  "FLAWLESS COVER-UP"-stjerne oveni
- Slut: scroll stopper ved tegningen (assets/drawing.png), "TAP TO FIX IT"
  → sharpie-animation ("Fixed it! -DJT") → succes-kort (VIRGIN-fly) eller
  avis-fail-tableau (The Daily Tremendous, fuld skærm)
- P/pause udelades (korte runder); Esc/dør = forlad

### ✅ Trin 7: Mar-a-Lago Mini-Putt (2026-07-04) — STØRSTE TRIN
**Statusnote:** Fable nåede at indsætte Golf-data, men scenen var ikke koblet
på `SCENES`/input/render-loop. Codex implementerede og verificerede pakken
2026-07-04.

- **Forarbejde:** konvertér hul 2+3's Lottie-geometri til rene polygon-
  JSON-data med et engangs-node-script (porter parseLottieGolfHole fra v1,
  kør mod `#course-mar-a-lago-2/3`-blokkene i gamle index.html, gem som
  JSON i v2). Ingen Lottie-CDN i v2. PNG-overlays (assets/golf1 ny.png,
  bane.png, bane3.png) genbruges
- Fysik-port: friktion per underlag, rail-kollision (segment-projektion),
  cup-magnet, penalty-zoner, tuning-tal fra GAME_SPEC §7 (GOLF_MAX_DRAG
  260, speed 140–780, exp 1.18, cup-tærskel 20 osv.)
- Flow: heli → AUTO-walk ind (approach-fasen klippet) → tutorial → spil
- Skud: slingshot-drag (touch/mus) m. **power-farvet sigtelinje**
  (grøn→gul→rød); desktop også piletaster + hold E
- Biden præ-færdig 4/7/4; **stillings-bannere**: hul-start "Hole 2 —
  Sleepy Joe: 7 strokes. Beat that." / hul-slut "After hole 2: You 8 —
  Joe 11. YOU LEAD! Tremendous." — total-reglen fortælles via stillingen
- Touch-chips: 🚁 Leave + ⛳ Reset ball (+1)
- Vind → trofæ-drop + medalje; tab → MAGA GAZETTE-tableau → voting machine
  (respawn på golfbanen = rematch)
- Hole 19-easter egg (hundeben) bevares

### Trin 8: Polish + paritet
- ✅ Musik-engine: original MP3-underlægning er koblet på sceneskift med
  Web Audio GainNode-volume og `M`-mute. Mapping 2026-07-04: Greenland_1 →
  Greenland, Greenland_2.2 → Oval, Greenland_3 → Kremlin, Greenland_4 →
  Epstein + Golf (Golf deler spor indtil et femte nummer findes).
- ✅ GAME_SPEC §2-paritet: scene-specifikke tweets, Kremlin/Putin-trust
  flavor, mønt-bonusser på tværs, medalje-pills og non-violent bear-flow
  er auditeret/tilrettet.
- ✅ Samlet automatiseret regression kørt 2026-07-04: desktop + mobil-
  viewport, scene-routing, musik, Epstein/Golf entrypoints, voting-machine
  continue, tweets/Putin-trust og non-violent bear-flow.
- Mangler stadig: fysisk iPhone-test før `v2 → index.html`.
- **Bevidst udeladt fra v1** (beslutninger, kan genåbnes): borderDraw
  (forældreløs), relations-flavor-tekster (delvist med), legacy-endings
  fra determineEnding (erstattet af medaljer + tableauer), TTS-helper
- ✅ Automatiseret regressionssuite kørt lokalt; mangler Kristians totale
  gennemspilning på fysisk iPhone

### ✅ Trin 9: Skiftet (2026-07-08)
- `trumpspillet-v2.html` → `index.html`; gammel version arkiveret som
  `index-v1.html` (live på /index-v1); `_redirects` sender gamle
  /trumpspillet-v2-links til /
- STATUS/AI_INDEX opdateret; gamle arbejdsdokumenter markeret historiske
- **GENOPBYGNINGEN ER HERMED KOMPLET.** Nye spor: se
  `PLAN_DESKTOP_OG_LEVELSYSTEM.md`

## Tekniske noter til kold start
- Alt spil-state bor i én IIFE i `trumpspillet-v2.html`; debug-adgang via
  `window.__tv2.snapshot()` + `window.__tv2.cheat.gold(n)`
- Kamera: verden 540 høj, gulv y=420, `CAM.scale=VH/540 (clamp .5–2.4)`,
  `beginWorld()/endWorld()/beginScreen()`; worldW per scene i SCENES
- Overlays: `openChoice/openInfoCard`; død: `gameOverCause(cause,{title,
  subtitle,delayMs})` → tableau → `startContinueOverlay()`
- Mobil-input: pointers-map; hold >200 ms = gå (zone ±1), kort tap =
  intentTap, 2. finger = hop; scene-specifik skal registreres i intentTap,
  nearestXX, updateActionChip
- Playwright: `~/.npm-global` har ikke playwright — `npm install playwright`
  i scratchpad, browsers ligger cached i `~/Library/Caches/ms-playwright`
