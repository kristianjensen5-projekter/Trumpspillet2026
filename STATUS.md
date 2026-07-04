# Trumpspillet 2026 — Status

**Type:** arbejde (bekræftet af Kristian 2026-07-02)
**Live URL:** https://trumpspillet2026.pages.dev/ (gammel version) ·
**v2-test:** https://trumpspillet2026.pages.dev/trumpspillet-v2
**GitHub:** https://github.com/kristianjensen5/Trumpspillet2026
**Senest opdateret:** 2026-07-04

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

## Næste skridt

1. Kristian tester hele `trumpspillet-v2.html` på fysisk iPhone
2. Hvis iPhone-testen er godkendt: kør Trin 9 (`v2 → index.html`)

## Oval Office v2 — bygget 2026-07-03 (redesign "pakke B")

Kristians dom over v1-scenen: for kompleks til engangs-læsere. Fable-analyse
→ tre pakker → Kristian valgte B (forsimpling med jokes intakte):
- ✅ Infokort forklarer præmissen ("Answer whatever keeps MAGA happy —
  truth is optional")
- ✅ Store tappelige YES/NO-svar-kort (tastatur 1/2) i stedet for at gå til
  skrivebordsknapper — knapperne på bordet er nu dekoration
- ✅ Selvbruner-joken løses I SCENEN: Shaman afviser bleg Trump → aide løber
  ind med "Sir! Your emergency tan!" → ét tryk → quiz fortsætter (ingen
  rejse tilbage til Greenland-butikken). Har man allerede tan ≥2, roser
  Shamanen den i stedet
- ✅ Ærlig scoring: 3/3 = Pulitzer-medalje; ellers fail-kort med øjeblikkelig
  prøv-igen (nye tilfældige gæster)
- ✅ SURPRISE-knappen: missil → game over → voting machine → respawn i Oval
- ✅ Alle gæstesvar konsekvent engelsk (v1 var dansk/engelsk-mix)
- ✅ Kamera indrammer Trump + gæst samtidig på portrait-mobil
- ✅ Playwright-verificeret: fuld quiz m. tan-detour + medalje, fail/retry,
  surprise-nuke-respawn, mobil tap-svar, Greenland-regression — 0 fejl

## iPhone-test 2026-07-03 (Kristian) — GODKENDT ✅

- ✅ Styring: gå + to-finger-hop virker
- ✅ Butik: købte selvbruner og brugte den
- ✅ Lars-kamp: virkede, flag faldt ned
- ✅ Talebobler stod oveni hinanden og for lavt → FIXET samme dag
  (layout skrevet om, se LESSONS.md) og deployet
- Dom: "overordnet super duper godt"

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
