# Trumpspillet 2026 — Status

**Type:** arbejde (bekræftet af Kristian 2026-07-02)
**Live URL:** https://trumpspillet2026.pages.dev/ (gammel version) ·
**v2-test:** https://trumpspillet2026.pages.dev/trumpspillet-v2
**GitHub:** https://github.com/kristianjensen5/Trumpspillet2026
**Senest opdateret:** 2026-07-05

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

## Næste skridt

1. Kristian tester hele `trumpspillet-v2.html` på fysisk iPhone
2. Hvis iPhone-testen er godkendt: kør Trin 9 (`v2 → index.html`)

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
