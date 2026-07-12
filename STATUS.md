# Trumpspillet 2026 — Status

**Type:** arbejde (bekræftet af Kristian 2026-07-02)
**Live URL:** https://trumpspillet2026.pages.dev/ (v2 — NY version, Trin 9
udført 2026-07-08) · gammel version arkiveret på `/index-v1` ·
gamle `/trumpspillet-v2`-links redirecter til `/`
**GitHub:** https://github.com/kristianjensen5/Trumpspillet2026
**Senest opdateret:** 2026-07-12

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
- ✅ Oval Office, Kremlin, Epstein Files og Mar-a-Lago Mini-Putt er nu bygget
  i `trumpspillet-v2.html` og koblet på helikopter-menuen
- ❌ Gammel mobiltestfil (`Trumpspillet2026Mobil.html`) forældet — erstattes af v2

## Genopbygningsplan (v2)

1. ✅ Spec + krydstjek (Fable 5, 2026-07-02)
2. ✅ Fundament + Greenland komplet (Fable 5, 2026-07-02)
3. ✅ Oval Office → Kremlin → Epstein → Golf (én bane ad gangen, test imellem)
4. ⏳ Musik-engine (chiptune-tracks porteres; disabled by default)
5. Når v2 = feature-paritet: v2 bliver `index.html`, gammel fil arkiveres

---

## Fable-review af Codex' arbejde — 2026-07-05 ✅

Fuld automatiseret regression (Playwright, desktop 1280×720 + iPhone 390×844):

- ✅ Alle 5 baner spilbare ende-til-ende, **0 console/page errors**
- ✅ Verificeret: Lars-fight→medalje · ny Oval (5 policies→Pulitzer, rød knap→
  nuke→voting machine→respawn i Oval) · Kremlin håndtryk→Nobel · Epstein
  redact · Golf tutorial→putt (også mobil-portrait med roteret bane)
- ✅ Musik: 4 MP3'er committet OG live (HTTP 200), scene-mapping virker
  (Greenland_1/2.2/3/4), GainNode-styring = korrekt iOS-mønster
- ✅ Live-deploy er byte-identisk med lokal fil
- ⚠️ `oval-office-simple-prototype.html` ligger utracket — slet eller arkivér
- ⚠️ REDAKTIONELT: `assets/oval office/obamaabes.jpeg` censureres I SPILLET,
  men rå-filen er offentligt tilgængelig på pages.dev-URL'en. Bevidst valg?

## Oval Office finesse-pass (Fable) — 2026-07-08 ✅

Efter Kristians afklaring (billedet har kørt i alle større medier — ingen
redaktionel hindring) er Obama-reposten nu et fuldt satirisk beat:

- ✅ **Post-lightbox:** AI-posterne (Obama + Jesus) popper ud af TV'et som en
  stor social media-post: @REALPRESIDENT, caption, ÅBENT billede, likes,
  og for Obama-posten en **Community Note** ("AI-generated and racist. It
  was reposted anyway.") + BREAKING-chyron. Tap/E lukker; auto-luk efter 6 s
- ✅ Trumps quip ved Obama-posten: "I know nothing about it. Great picture
  though." — selve den virkelige gag
- ✅ Alle 14 policies har nu kicker-tags (TRADE WAR/JUSTICE/STATE MEDIA...),
  strammede punchlines og personlige Trump-quips i stedet for generisk ros
- ✅ Grafik: kicker-pill + LIVE-dot på Executive Screen, glow på POLICY-
  knappen indtil første tryk, artefakthyldens 8 kolliderende etiketter
  erstattet af ét skilt: "THE TRUMP PRESIDENTIAL LIBRARY"
- ✅ Playwright-verificeret desktop+mobil: lightbox begge billeder, 5 tryk →
  Pulitzer, 0 fejl

## Spor B: Level-system — FÆRDIGT 2026-07-08 ✅ (Fable)

Hele spillet kører nu på en **level-registry**: hver bane er ét objekt
registreret med `registerLevel({...})` — de ~12 håndkoblede dispatch-steder
(interact, intent-tap, action-chip, coins, kamera, draw/update, heli-menu,
restart, snapshot, walk-in) er erstattet af generiske registry-opslag.

- ✅ Alle 5 baner porteret til kontrakten; heli-menuen autogenereres af
  registreringsrækkefølgen (nyt level = automatisk i menuen m. ✓/○)
- ✅ `LEVEL_TEMPLATE.md`: komplet guide til IKKE-Fable-modeller — kontrakt,
  copy-paste-skelet, tjekliste, kendte fælder, Playwright-røgtest-skabelon.
  Indsætningsmarkør i index.html: ">>> NYE LEVELS REGISTRERES HER <<<"
- ✅ Fuld regression efter omlægningen: alle 5 baner + mobil, 0 fejl
- Accept-testen (nyt legetøjs-level < 1 time, bygget af en anden model
  alene ud fra skabelonen) udestår — kør den med Codex/Sonnet

## Accept-test af level-systemet — 2026-07-08 ✅ (Sonnet)

Bygget "Trump Tower Elevator" (id `tower`) KUN ud fra `LEVEL_TEMPLATE.md`
(+ AI_INDEX.md, LESSONS.md, KREMLIN-registreringen som forbillede — ingen
andre dokumenter læst). Ét gyldent UP-tryk, floor-display, 5 skrydelinjer,
medalje ved etage 10 (`tower`-nøgle), ingen game over, heli-menu begge veje.

- ✅ Syntaks-tjek (JSON + `node --check`) grønt før browsertest
- ✅ Playwright-røgtest desktop (1280×720) + iPhone-viewport (390×844,
  touch): 0 pageerrors, floor talte korrekt op til 11, konfetti+medalje
  udløst ved etage 10, action-chip virker på mobil
- ✅ Regression: Greenland (gå/hop/interager) → heli → Oval (policy-tryk) →
  heli → Tower → heli → Greenland, 0 fejl undervejs
- ⚠️ **Skabelon-hul fundet:** `GS.medals`-objektet (linje ~1970) er en
  HÅRDKODET liste af medalje-nøgler (`greenland/oval/kremlin/epstein/golf`),
  og `loadMedals()` gennemløber kun disse forudkendte nøgler ved indlæsning
  fra `localStorage`. Skabelonens trin 4 nævner kun JSON-MEDALS-blokken +
  `awardMedal(...)`-kaldet — intet om at nyt levels medalje-nøgle også skal
  tilføjes her. Uden fixet: medaljen vises korrekt i selve sessionen (fordi
  `awardMedal` sætter nøglen dynamisk), men overlever IKKE en sideindlæsning
  (forsvinder fra HUD og heli-menuens ✓-status efter refresh). Rettet med én
  linje (tilføjet `tower:false`) — se `ACCEPT_TEST_RESULTAT.md` for detaljer.
- Dom: **bestået** — < 1 time, ét reelt skabelon-hul fundet og dokumenteret
  (se `ACCEPT_TEST_RESULTAT.md`)

## Skabelon-huller lukket + Spor A1: desktop-stage — 2026-07-08 ✅ (Fable)

Opfølgning på accept-testen — alle tre fund lukket mens Fable stadig er
tilgængelig:

- ✅ **Engine-fix (Sonnets anbefaling):** `GS.medals` bygges nu dynamisk af
  JSON'ens MEDALS-nøgler (`Object.keys(DATA.MEDALS)`) i stedet for en
  hårdkodet liste — fremtidige levels behøver KUN deres MEDALS-post, og
  medaljen overlever refresh automatisk. Verificeret: tower-medalje vundet
  → reload → stadig ✓ i snapshot
- ✅ `LEVEL_TEMPLATE.md` opdateret: trin 4 (medalje-persistens + verificér
  efter reload), taster i røgtesten (ArrowLeft/Right — IKKE a/d) og note om
  hvorfor skelettet bevidst ikke rører det delte `SCENE`-objekt

**Spor A1 — desktop i landskabsformat (stage-ramme) — FÆRDIGT:**

- ✅ På desktop-landscape (mus + bredere end høj + ≥900 px) tegnes spillet
  nu i en centreret 16:9-scene (maks. 1240 px bred) med mørkeblå baggrund,
  guldramme og titel — i stedet for at strække sig over hele vinduet.
  Mobil/portrait er 100 % uændret (stagen er slået fra dér)
- ✅ Verden clippes til scenen (ingen "bleed" uden for rammen), HUD +
  hjælpeboks forankres til scenens hjørner, alle pointer-koordinater
  (klik-gå, golf-sigte) oversættes gennem scene-offsettet
- ✅ Fuld regression på `index.html` efter patchen: ultrawide 2560×1080 +
  1280×720 + iPhone 390×844 — klik-på-mine-gåtur, heli→Tower→medalje→
  refresh-persistens, golf-entry+Esc, Oval policy-tryk, touch på mobil.
  **Alle tjek grønne, 0 pageerrors** (testscript: `reg_index_a1.mjs` i
  scratchpad, kan genskabes fra LEVEL_TEMPLATE-skabelonen)
- Arbejdskopien `desktop-dev.html` + patch-værktøjet er slettet efter
  vellykket overførsel til `index.html`

## Kristians beslutninger — 2026-07-08/09

- ✅ Tower-banen BEHOLDES i spillet (Kristians valg) — deployet
- ✅ `oval-office-simple-prototype.html` slettet (Kristians valg)

## Spor A2: landskabs-kompositionspas — FÆRDIGT 2026-07-09 ✅ (Fable)

Desktop-polish oven på A1-stagen — ingen ny logik, kun iscenesættelse:

- ✅ **Hover-glow + pointer-cursor:** mus over et interaktivt objekt giver
  et blødt gyldent glow + `cursor:pointer` (genbruger levels `tapTargets()`
  — nye levels får det GRATIS). Store baggrundsobjekter (rank>0) glower
  ikke, jf. glacier-lektien. Slukket under overlays/fight/cutscenes og på
  touch. I Epstein (hvor ethvert klik er et redaction-forsøg) viser hele
  scenen pointer-cursor
- ✅ **Greenland:** fjern fjeldkæde med sne-toppe i horisonten
  (parallakse 0,35) — udfylder det brede format
- ✅ **Kreml:** draperier i fuld bredde (også bag Putin), guldgesims
  langs loftet og lysekrone over bordet
- ✅ **Oval:** de klassiske høje buede vinduer med marineblå gardiner og
  guldstænger flankerer TV'et (kun ikke-kompakt visning)
- ✅ **Golf:** u-roteret + stor bane i landskab var allerede på plads (A1)
- ✅ Verificeret: A2-visueltest (cursor over mine/POLICY/tom luft,
  screenshots af alle tre baner) + fuld A1-regression (3 viewports) +
  Epstein-cursortjek — **alle grønne, 0 pageerrors**. Mobil upåvirket

## Oval Office visuel oprydning (Kristians 5 punkter) — 2026-07-09 ✅ (Fable)

Kristians feedback efter gennemspil af desktop-versionen:

1. ✅ **Pokalhylder synlige:** to hylder på væggen udenfor vinduerne
   (EAST WING ANNEX til venstre, THE TRUMP PRESIDENTIAL LIBRARY til
   højre). NB: Oval-kameraet er FAST (world-x 158–1118 synligt) — hylder
   skal ligge inde i det bånd. Mobil-kompakt beholder én hylde under TV'et
2. ✅ **Knapper står PÅ bordet:** begge knapper har base på bordpladen
   (GROUND_Y-14) med en sokkel — ingen svævende knapper
3. ✅ **Rektangulære knapper + tryk-animation:** ellipse/kuppel-look
   erstattet af firkantede caps; ved tryk synker cappen 6-7 px ned i
   soklen (160 ms). Glow-hjælpen på POLICY er nu en rekt-outline
4. ✅ **Gule artefakter væk:** hazard-striberne under den røde knap
   fjernet; rød pulserende farve beholdt
5. ✅ **Yes-mænd løber ind fra døren (Kristians valg):** popup-systemet i
   skærm-koordinater (svævende + brune kasser) er erstattet af løbere i
   VERDENS-koordinater: de spurter ind fra døren på gulvet, jubler ved
   bordet (forskudte talebobler, ingen overlap) og spurter ud igen.
   Mobil-kompakt: kameraet viser kun bordet, så dér myldrer de ind FORAN
   bordet på forgrundstæppet i stedet. Døde funktioner (drawYesGroup,
   drawOvalReactionBase) slettet
- ✅ Verificeret: skærmbilleder i ro/tryk/jubel/udløb på desktop 1600×900 +
  mobil 390×844, begge regressionssuiter grønne, 0 pageerrors

## Trump Tower finesse-pass — 2026-07-09 ✅ (Sonnet)

Kristian testede tower-banen og pegede på tre ting: Trump gik ikke ind i
elevatoren, elevatoren "kørte" ikke (kun tallet skiftede), og banen manglede
et formål ud over selve tallet. Brainstormet frem til: 5 tryk → 4 satiriske
etage-stop, 5. tryk → penthouse med baggrundsskift + credits.

- ✅ **Rigtig elevatortur:** Trump går ind i kabinen (genbruger den
  eksisterende `startWalkTo`-tween som en nul-distance "hold", så turen også
  blokerer bevægelse uden at røre den delte input-gate) → dørene lukker
  (350 ms) → rejse-beat med ding + let ryst (650 ms) → dørene åbner (350 ms)
  → Trump træder ud af kabinen igen, så etage-indholdet ikke gemmer sig bag
  ham (fundet og rettet under egen Playwright-test — første version havde
  ham stående midt i synet)
- ✅ **4 satiriske etager** (Kristians retning: kommentér virkelige
  begivenheder), hver med et indgraveret væg-skilt + en lille scene bag
  døren: BIBLE FLOOR (usolgte $59.99-bibler), PRIZE FLOOR (tom sokkel,
  "RESERVED FOR THE NOBEL PEACE PRIZE"), BEST DEALS FLOOR (skæv
  "BEST DEALS EVER"-banner over "-$300B"-tavle, Iran-aftalen), TARIFF FLOOR
  (overstregede prismærker, højere priser under)
- ✅ **5. tryk = penthouse:** hele baggrunden skifter til en
  solnedgangs-palet med panoramavindue + skyline-silhuet, gulvet bliver rødt
  tæppe, display viser "PH". Konfetti + `tower`-medalje udløses her; en
  guldindrammet plakette (samme stil som Oval Office-biblioteksskiltet)
  viser "THE PENTHOUSE" + credits ("BUILT BY KRISTIAN JENSEN · POLITIKEN" /
  "CODED WITH CLAUDE & CODEX, 2026") — tekst som en del af grafikken, ikke
  et UI-overlay, efter Kristians ønske
- ✅ Efter penthouse fortsætter tælleren uendeligt (display viser "PH"),
  replikkerne roterer, ingen game over — som oprindeligt spec'et
- ✅ Playwright-verificeret: fuld tur gennem alle 5 stop + endnu et tryk
  bagefter, desktop + mobil-viewport, 0 pageerrors, skærmbilleder af hvert
  etage-skilt kigget igennem. Stress-testet: 20× hurtige E-tryk midt i én
  tur springer INGEN etager over (nul-distance-hold-guarden holder), og
  Shift+R midt i en tur nulstiller rent uden hængende callbacks
- ✅ Fuld regression (Grønland → Oval → Tower → Grønland via heli begge
  veje) kørt igen efter ændringerne — 0 fejl
- Committet, **ikke deployet** — afventer Kristians OK

## FINALEN: The Medal of Medals Ceremony — 2026-07-10 ✅ (Fable)

Spillet har nu en SLUTNING. Når alle 6 medaljer er samlet (vilkårlig
rækkefølge), udløses finalen 2,6 s efter sidste medalje — Kristians valg:
**Obama-medalje-memet i Trump-udgave: Trump tildeler Trump medaljen.**

- ✅ Beat-rækkefølge (skærm-overlay, ens på mobil+desktop, uafhængig af
  bane): BREAKING-chyron + ceremonititel → de 6 medaljer flyver ind én ad
  gangen med navne → East Room-kulisse (guldgardiner + flag) →
  modtager-Trump ind fra venstre, overrækker-Trump ind fra højre og
  stiller sig BAGVED (memets komposition: begge ansigter synlige,
  overrækkeren højere) → kæmpemedaljen "№1" sænkes over hovedet og lander
  om HALSEN (bånd om nakken, hænder på skuldrene — lagdelt tegning) →
  konfetti + yes-mænd-parade → replikker ("I'd like to thank the
  committee. It's me.") → **stats-kort**: FINAL RESULTS (OFFICIAL — DO
  NOT RECOUNT) med medaljer, guld, "Elections needed" (voting
  machine-tælleren!) og Time in office + [RUN AGAIN] / [KEEP GOVERNING]
- ✅ RUN AGAIN nulstiller medaljer+run og starter forfra i Greenland
  (verificeret); KEEP GOVERNING lukker overlayet og spillet fortsætter
- ✅ Al tekst i JSON (`FINALE`-blokken); trigger i `awardMedal()` er
  generisk over `DATA.MEDALS` — et 7. level kræver automatisk 7 medaljer
- ✅ Debug: `__tv2.cheat.finale()` udløser finalen direkte (til test)
- ✅ Verificeret: hele beatet + stats + begge knapper på desktop 1600×900
  + iPhone 390×844, fuld regression, 0 pageerrors
- Tegneviden til eftertiden: `drawTrump` er ~50 units høj (fødder y=0,
  hårtop -50, bryst -22) — finale-geometrien følger dét

## Tower finesse-pass (b98a6aa, ikke-Fable) — regressionstjek 2026-07-10 ✅

Tower er ombygget til rigtig elevatortur (E = én etage op m. animation),
4 satiriske etager + penthouse på 5. → "Penthouse Key"-medaljen.
Fable har opdateret regressionssuiten til den nye mekanik — alt grønt.

## ENGINE_MAP.md — motorkortet — 2026-07-10 ✅ (Fable)

Videnoverdragelsen er komplet: `ENGINE_MAP.md` dækker alt UDENOM levels
(det LEVEL_TEMPLATE.md ikke gør): filens anatomi (sektion 0–14),
koordinatsystemerne (world/screen/browser + stagen), main-loopets update-
og draw-rækkefølge, input-stigen (og reglen om nye modale tilstande),
overlay/død-loopet, persistens-nøglerne, musik/iOS-reglen, sprite-facts
(bl.a. drawTrump ~50 units), debug-hooks og "ti bud for motor-ændringer".
Alle henvisninger er søgbare strenge (ankertjek kørt — alle findes i
koden). Sammen med LEVEL_TEMPLATE.md + LESSONS.md + GAME_SPEC.md kan
Sonnet/Codex nu både bygge baner OG vedligeholde motoren efter ~15/7.

## Kristians 11-punkts-liste — ALLE implementeret 2026-07-11 ✅ (Fable)

1. ✅ Oval jump cut: walk-in-gangen havde et 0,9s-loft uanset afstand —
   cutscene-gange får nu naturligt tempo (loftet gælder stadig tap-gange)
2. ✅ Policies forenklet (Kristians valg: ét land pr. tryk): 5 nye
   tariff/land-policies med KÆMPE typografi på Executive Screen (flag +
   "CANADA +25%" + én kort linje). De to social-post-gags (Obama/Jesus)
   er BEHOLDT i puljen — sig til hvis de også skal ud
3. ✅ Epstein-scroll hakkede: per-linje clip-operationer + tekst på
   subpixel-positioner — nu ét clip for hele papiret + hele pixels
4. ✅ Blå navne er nu en blanding: Bill Clinton, Hillary Clinton, Barack
   Obama, Joe Biden, Nancy Pelosi, Al Gore
5. ✅ Putin er nu næsten skaldet med kortklippede grå sider
6. ✅ "Tap or press Enter to continue" på Epstein-succeskortet er hvid
7. ✅ Blå firkant om golf-tee'en fjernet
8. ✅ Sigtelinjen er gul hele vejen med mørk underlinje (Kristians valg)
9. ✅ Generøs kop: fangst-fartgrænse 20→85 + bredere/stærkere magnet —
   bolden hopper ikke længere over hullet
10. ✅ MOBIL-SOFT-LOCK: input-tilstand (fingre/taster/auto-gang) ryddes
    nu ved ALLE scene-skift — se ny lektie i LESSONS.md
11. ✅ Finalen: konfettien brager i det øjeblik medaljen lander om halsen
    og fortsætter til man trykker — først dér vises resultat-kortet
    (auto-skiftet efter 11 s er fjernet)

Verificeret: tariff-tavle/Putin/Epstein-navne/golf-linje med screenshots,
fuld regression (3 viewports) + finale-flow — alle grønne, 0 pageerrors.

## Testsuiten committet — 2026-07-11 ✅ (Fable)

Overdragelses-hul lukket: Playwright-suiten lå før i AI-sessionernes
midlertidige scratchpad og døde mellem sessioner. Nu ligger den i
**`tests/`** (regression.mjs + finale.mjs + README med kendte fælder) —
kør `node regression.mjs` efter enhver ændring i index.html. Verificeret:
begge scripts kørt grønt fra den nye placering. Alle dokumenter
(AI_INDEX, ENGINE_MAP, LEVEL_TEMPLATE, LESSONS) peger nu på tests/.

## GAME_SPEC ajourført + embed-forarbejde — 2026-07-11 ✅ (Fable)

- ✅ `GAME_SPEC.md` har fået **§10: v2-afvigelser og tilføjelser** — alle
  bevidste ændringer siden genopbygningen (Oval v3+tariffer, Tower,
  finalen, stage/hover, registry, dynamiske medaljer m.m.) + reference-
  hierarki for audits. §1–9 bevaret som historisk v1-facit
- ✅ `EMBED_GUIDE.md` skrevet: **anbefaling = iframe** (spillet er en
  fuldskærms-side og opfylder ikke inline-CMS-isolationskravene; iframe
  giver isolationen gratis) + færdig iframe-kode til CUE
- ✅ Sikkerheds-audit mod `context/03_security.md`: alle 5 lag er N/A med
  begrundelse (nul eksterne scripts/kald — verificeret; ingen læserinput,
  API eller uploads). GDPR: kun spil-fremskridt i localStorage
- ✅ Verificeret iframe-test committet: `tests/embed_host.html` +
  `tests/embed.mjs` — boot, input gennem iframen og upåvirket værtsside
  på desktop + iPhone-format, 0 pageerrors
- Udestår (beslutninger, ikke arbejde): Politikens Cloudflare-konto før
  produktion · evt. frame-ancestors-header når CUE-domæner kendes

## Introskilte oversat til dansk — 2026-07-11 ✅ (Fable)

Til mor-testen: startskærmen (titel/undertitel/prompt) + alle intro-/
instruktionskort (Oval, Kremlin + begge håndtrykskort, Epstein, golf-
tutorial) er nu på dansk. Trumps replikker, tweets, policies og øvrig
in-game-tekst er BEVIDST stadig engelsk (afventer senere beslutning om
fuld oversættelse). Regression grøn + skærmbilleder tjekket.

## Startskærms-ramme + Grønlands-startskilt — 2026-07-11 ✅ (Fable)

- ✅ Startskærmen har nu SAMME scene-ramme som banerne på desktop
  (mørkeblå baggrund, guldramme, TRUMPSPILLET 2026-titel) — ren CSS,
  mobil-layoutet er urørt (display:contents-wrapper)
- ✅ Grønland har fået sit manglende startskilt (Kristians tekst):
  "Grønland skal naturligvis tilhøre USA. Find en måde at få øen
  franarret de irriterende danskere..." — vises én gang efter første
  landing, nulstilles ved fuld genstart. regression.mjs lukker nu
  skiltet ved spilstart (alle 3 viewports)

## Mor-testens 5 punkter — ALLE implementeret 2026-07-12 ✅ (Fable)

1. ✅ **Styring:** desktop viser nu taste-hints nederst midtfor ("← → gå ·
   E brug · ↑ hop") — hver kvitterer med grønt flueben når den er brugt,
   og rækken fader når alle tre er lært. Skjult i golf/Epstein (egne
   kontroller) og på touch
1b. ✅ **Lars-dialog = RPG-valg (Kristians forslag b):** efter hver
   replik-runde vælger man "Fortsæt kedelig diplomatisk dialog" eller
   "Rigtige præsidenter slås 👊" — ingen tvungen 5-runders maraton
2. ✅ **Heli-menu:** ALLE piletaster flytter valget (mor brugte ←→),
   valgt punkt har guldkant + pulserende ▶ + de øvrige dæmpes, og der
   står "Piletaster = vælg · Enter = OK (eller klik)" under menuen
3. ✅ **Golf hul 2:** koppen er flyttet fra blindgyden (72 px fra
   endevæggen) ud på det åbne midterstykke af slutkorridoren + r 18→21.
   S-formen og sværhedsgraden i øvrigt bevaret
4. ✅ **Tower:** joke-etagerne ses nu som OPLYSTE RUM bag elevatordøren
   (væg, fodpanel, gulv — opstillingen står på etagen, ikke i elevatoren),
   og penthousen har fået panoramavindue med tegnet Central Park-udsigt
   (park-perspektiv, sø, trækroner, flankerende skyskrabere, gule taxier)
   + messingskilt "CENTRAL PARK — I OWN THE TREES"

Verificeret: screenshots af alle fem + fuld regression + finale-flow —
alle grønne, 0 pageerrors.

## Mor-test runde 2 — implementeret 2026-07-12 ✅ (Fable)

1. ✅ **Infokort skygger ikke længere for banen:** ALLE kort er docket i
   TOPPEN (himlen er død plads i alle baner — handlingen foregår ved
   jorden), baggrunden dæmpes kun let. Én løsning, virker på begge formater
1b. ✅ **Executive Screen-hvileskærm:** kun "PRESS THE BLACK BUTTON" +
   kæmpe pulserende gul pil ned mod knappen — ingen tekst at lede
   efter pointer i. Jokes kommer først NÅR man trykker
1c. ✅ **QAnon-lokkeren (mors idé):** efter 2. policy lister QAnon ind
   fra højre, stiller sig ved den røde knap med hviskeboble ("Psst. The
   RED one. The plan demands it.") + pulserende rød pil mod knappen
2. ✅ **Voting machine forklaret:** stor dansk "GAME OVER"-overskrift +
   "...men i Amerika kan man altid STEMME sig til en chance til" +
   pulserende "Tryk på en tast for at stemme"-instruktion
3. ✅ **Butikken:** bekræftet at den kører på samme menu-system som
   helikopteren — piletaster/markering/hjælpelinje kom automatisk med
   menu-fixet fra runde 1 (mors test lå FØR det fix)

Fuld regression grøn. UDESTÅR: visuel gennemgang af 1/1b/1c/2 med
screenshots (desktop+mobil) før endelig deploy-blåstempling — deployet
er kørt, men Kristian bør se skærmbillederne/spille det igennem.

## Næste skridt

- Kristian tester hele listen live — særligt golfrunden på FYSISK iPhone
  (mobil-bug #10) og hul 2's nye gavmildhed
- Ingen åbne Fable-spor. Evt. næste: publicerings-klargøring til
  politiken.dk (iframe-embed-test + sikkerheds-baseline + brand-tjek) —
  afventer redaktionens valg af embed-format

## Trin 9 udført — 2026-07-08 ✅

- `trumpspillet-v2.html` → `index.html` (hoved-URL serverer nu v2)
- Gammel version arkiveret som `index-v1.html` (live på `/index-v1`)
- `_redirects`: `/trumpspillet-v2` → `/` (301), så delte links overlever
- localStorage-nøgler uændrede → medaljer overlever URL-skiftet
- AI_INDEX.md omskrevet til v2-virkeligheden

## Oval Office v3 — udskiftet 2026-07-05 (simpel knapbane)

Kristian vurderede quiz/YES-NO-versionen som for kompleks til engangs-læsere.
Scenen er derfor ført tilbage til den simple satiriske kerne:

- ✅ Trump går til Resolute Desk efter heli-entry, som før
- ✅ To reelle skrivebordsknapper: sort POLICY-knap og stor rød DO NOT PRESS
  med hazard-base
- ✅ Sort knap vælger tilfældig Trump-sk policy på skærmen bag bordet
- ✅ Yes-men er genkendelige arketyper: QAnon-mand, Fox-host og Vance-type,
  som popper ind og jubler ved hvert policy-tryk
- ✅ Skærmen kan vise de to nye Oval Office-billeder fra `assets/oval office/`
  som censureret/social-post content
- ✅ Pulitzer-medaljen gives efter 5 policy-tryk; spilleren kan fortsætte
  med at trykke for flere jokes bagefter
- ✅ Rød knap launcher stadig missil → game over/voting machine/respawn-flow
- ✅ Gammel quiz, gæster, YES/NO-kort og selvbruner-aide er ikke længere
  del af Oval Office-runtime

### Oval Office layout-polish — opdateret 2026-07-05

- ✅ Heli-entry bruger nu en Oval-specifik landingsposition, så Trump lander
  ved scenens venstre side og går ind til Resolute Desk
- ✅ Mobil-layoutet har kompakt skrivebord/skærm/kamera-fokus, så knapper og
  policy-skærm ikke fylder hele beskæringen
- ✅ Sort og rød knap er tegnet om som fladere trykknapper med tydelig base,
  highlight og press-state
- ✅ Yes-men står ikke længere permanent ude i siden; QAnon/Fox/Vance popper
  ind som korte reaktioner, hver gang Trump laver policy

### Oval Office artefakt-/joke-pass — opdateret 2026-07-05

- ✅ Pokal-/artefaktvæggen er flyttet ind under executive screen, så den er
  synlig i mobilbeskæringen
- ✅ Stjålne Kremlin-statuer placeres nu på samme synlige artefaktvæg
- ✅ Basishylden viser Pulitzer-medalje, FIFA PEACE-pokal, Sharpie-kort og
  Diet Coke-knap som små Trump-artefakter
- ✅ Policy-listen er skrevet om med kortere, mere punchy Trump-satire

### Oval Office reaction/UI-polish — opdateret 2026-07-05

- ✅ Yes-men cut-ins har nu podie/skygge og lavere screen-ankre, så de føles
  som indkig fra skærmkanten i stedet for figurer der svæver frit
- ✅ Talebobler på touch respekterer nu top-HUD/browser safe area,
  så de ikke klemmes op under UI'en på smalle skærme

### Global mobil-UI simplification — opdateret 2026-07-05

- ✅ Den faste grønne/røde top-levelbar er fjernet for at frigive plads
- ✅ Helikopterens levelselecter viser nu gennemført status pr. destination:
  `✓` + medaljeikon ved gennemført, `○` ved ikke-gennemført

## iPhone-test 2026-07-03 (Kristian) — GODKENDT ✅

- ✅ Styring: gå + to-finger-hop virker
- ✅ Butik: købte selvbruner og brugte den
- ✅ Lars-kamp: virkede, flag faldt ned
- ✅ Talebobler stod oveni hinanden og for lavt → FIXET samme dag
  (layout skrevet om, se LESSONS.md) og deployet
- Dom: "overordnet super duper godt"

### Greenland mobil-polish — opdateret 2026-07-05

- ✅ Talebobler på touch løftes højere for både Trump og NPC'er, så de ikke
  lægger sig oven på mine-/helikopter-skilte
- ✅ Mobil-inventory viser nu kun købte varer i en kompakt boks i stedet for
  alle fire mulige slots med tomme pladser

## Mar-a-Lago Mini-Putt v2 — bygget 2026-07-04 (pakke B)

- ✅ Heli-menuen flyver nu til Mar-a-Lago
- ✅ Approach-fasen er klippet: Trump auto-går ind, ingen START HER-boks
- ✅ 3 huller bruger v2's rene JSON-geometri + PNG-overlays; ingen Lottie/CDN
- ✅ Slingshot-drag med power-farvet sigtelinje; desktop understøtter pil + hold E
- ✅ Biden er præ-færdig 4/7/4, og scorebannere forklarer total-reglen løbende
- ✅ Touch-chips: Leave + Reset ball (+1)
- ✅ Vind: trofæ-drop + golf-medalje; tab: MAGA GAZETTE-tableau + voting machine
- ✅ Playwright-verificeret lokalt på desktop 1280×720 og iPhone 390×844:
  heli → golf → tutorial → hole-banner → aim → første putt, 0 console/page errors

### Mar-a-Lago mobil-polish — opdateret 2026-07-04

- ✅ Banerne roterer nu til højkant på touch/portrait uden at rotere Trump,
  Biden, bold, flag, labels eller talebobler
- ✅ Biden-visningen er gjort mobil-læsbar uden at dominere banen; hans
  stroke-label holdes kompakt, så UI ikke overlapper
- ✅ Det store mobile hole-start-banner er fjernet/auto-kortet, fordi det
  dækkede Trump og tee-området
- ✅ Golf-viewet bruger nu låst layout pr. hul + touch `preventDefault`, så
  banen ikke små-zoomer eller rykker under drag/slag på mobil
- ✅ Boldens mobile touch-target er gjort større og synligt med en subtil
  pulserende ring
- ✅ Hul 2-vægge er gjort mere robuste med substep-collision; lokal simulation
  med 72 fuldkraftsvinkler endte med 0 bolde uden for fairway
- ✅ Playwright-verificeret lokalt på iPhone 390×844: aim-state, touch-ring,
  drag fra udvidet hitområde → slag registreret, 0 errors

### Mar-a-Lago Biden-søvn — opdateret 2026-07-05

- ✅ Biden-citatboblerne er fjernet fra aktivt golf-gameplay
- ✅ Efter Trumps første slag falder Biden i søvn med lukkede øjne og `Zzz`
- ✅ Hvert af de tre huller har sin egen soveposition: stående nik, siddende
  lur og liggende lur

## Musik v2 — bygget 2026-07-04

- ✅ Originale MP3-numre i `Musik til trumpspillet/` er koblet på som
  underlægningsmusik via Web Audio GainNode (ingen `.volume` på iOS)
- ✅ Musik starter efter brugerens første start/tap og skifter på `switchScene()`
- ✅ `M`-mute gemmer stadig i `localStorage` (`trumpv2-music-muted`)
- Mapping: `Greenland_1.mp3` → Greenland, `Greenland_2.2.mp3` → Oval,
  `Greenland_3.mp3` → Kremlin, `Greenland_4.mp3` → Epstein + Golf
  (Golf deler spor indtil et femte nummer findes)

## Trin 8-paritet — opdateret 2026-07-04

- ✅ Tweets er nu scene-specifikke; Kremlin-tweets sænker Putin-trust og kan
  trigge Putins "Perhaps less... social media?"-flavor
- ✅ Non-violent mode pacificerer bjørnen reelt (stopper chase/bid og nulstiller
  bite-count), ikke kun med tekst
- ✅ Mønt-bonusser og medalje-pills er auditeret mod `GAME_SPEC.md` og matcher
  den aktuelle v2-implementation
- ✅ Samlet automatiseret regression kørt lokalt: scene-routing, musik,
  Epstein/Golf entrypoints, voting-machine continue, tweets/Putin-trust,
  non-violent bear-flow og mobil-viewport smoke — 5/5 testblokke grønne

---

## Tekniske beslutninger

- **Genopbygning frem for refaktorering** — gameplay bevares 1:1 fra
  `GAME_SPEC.md`; kun arkitekturen er ny (besluttet 2026-07-02)
- v2: én responsiv fil, mobile-first, samme kodebase til desktop+mobil
  (regel 4) — ingen separat mobilfil
- Draw-funktioner (pixel-art-figurerne) porteres næsten 1:1 fra original —
  det er spillets look
- Lottie-web-CDN droppes; golfbane-geometri konverteres til ren JSON
- Musik-engine bruger nu originale MP3-loops; mute gemmes stadig som i original
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
