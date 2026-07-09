# Trumpspillet 2026 — Status

**Type:** arbejde (bekræftet af Kristian 2026-07-02)
**Live URL:** https://trumpspillet2026.pages.dev/ (v2 — NY version, Trin 9
udført 2026-07-08) · gammel version arkiveret på `/index-v1` ·
gamle `/trumpspillet-v2`-links redirecter til `/`
**GitHub:** https://github.com/kristianjensen5/Trumpspillet2026
**Senest opdateret:** 2026-07-09

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

## Næste skridt

- Ingen åbne spor. Evt. fremtidige baner bygges af Sonnet/Codex efter
  `LEVEL_TEMPLATE.md` (accept-testet 2026-07-08)

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
