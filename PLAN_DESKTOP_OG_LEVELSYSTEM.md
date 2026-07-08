# PLAN — Desktopversion & Level-system

> Fable 5, 2026-07-08. To nye spor efter afsluttet genopbygning (Trin 0–9 ✅).
> Kristians bestilling: (a) desktopversion baseret på iPhone-udgaven,
> (b) arkitektur så nye levels let kan tilføjes.
> **Anbefalet rækkefølge: B før A** — begrundelse nederst.

---

## SPOR A: Desktopversionen

### Udgangspunkt
v2 KØRER allerede på desktop (samme fil, samme logik, tastatur+mus virker,
alle Playwright-tests kører desktop-first). Det der mangler er ikke funktion
men **præsentation**: spillet er komponeret til en smal portrait-skærm.
På en bred monitor bliver verdenen strakt ud i et tomt panorama — figurerne
er små øer i beige flader, HUD'en klistrer i hjørnerne af et kæmpe vindue,
og kompositionen (som er stram på iPhone) forsvinder.

### Afgørende spørgsmål FØRST: publiceringsformatet
Jf. `context/02_brand.md` leveres widgets på to måder — og valget afgør
hvad "desktopversion" overhovedet betyder:

1. **Iframe i låst format (typisk 9:16 højkant)** — så er "desktop-
   versionen" reelt: gør portrait-spillet lækkert MED MUS i en høj, smal
   boks midt i artiklen. Minimal ny kode: hover-cursors, klik-polish,
   tastatur-legend. **Billigste spor.**
2. **Inline i superartikel (fuld bredde)** — så skal der en ægte landscape-
   præsentation til (spor A2 nedenfor).

→ **Kristian afklarer med redaktionen hvordan spillet skal embeddes,
inden vi bygger.** Alt andet i spor A afhænger af svaret.

### A1: "Stage-ramme" (anbefalet basis uanset format)
Spillet tegnes i en **fast-proportioneret scene** (fx max 1100×620) centreret
i vinduet, med en tematiseret ramme udenom (Oval Office-vægfarve/mørk
teaterramme + diskret titel). Det giver:
- Kompositionskontrol: kameraet arbejder altid i kendte proportioner
- Ingen "tom prærie" på ultrabrede skærme
- HUD/chips forankres til SCENEN, ikke browservinduet
- Én kodeændring (viewport-beregningen i `fit()`/CAM), nul spillogik
**Estimat: lille.** Kan Playwright-verificeres med eksisterende flows.

### A2: Landscape-kompositionspas (hvis inline/fuld bredde)
Per bane justeres til bred visning — IKKE ny logik, kun iscenesættelse:
- Kamera: lavere min-zoom på landscape så mere af verdenen ses;
  scene-worldW kan udvides med dekorative props i siderne (flere
  isbjerge/skyer i Greenland, flere draperier i Kreml osv.)
- Golf: banen vises u-roteret og større (rotationslogikken er allerede
  betinget af portrait — gevinsten er gratis)
- Oval: TV + skrivebord komponeres bredere (Codex' `OV.compact`-mønster
  genbruges: `OV.wide`-variant)
- Desktop-input-polish: hover-glow på interaktive objekter (mus over →
  samme markering som action-chippen viser på mobil), cursor:pointer
**Estimat: mellem (et pas per bane, fem baner).**

### A3: Bevidst udeladt
- Separat desktop-HTML-fil: NEJ — én responsiv fil er brand-regel og hele
  pointen med genopbygningen. Desktop = samme fil, anden iscenesættelse.

---

## SPOR B: Level-system — "nyt level på en eftermiddag"

### Problemet i dag (målt, ikke gættet)
At tilføje en bane kræver i dag ændringer på **~12 koordinerede steder**:
`SCENE`-konstanten, `SCENES`-registry, heli-menuens tekst + handlers (×4
menuer!), `interact()`-dispatch, `intentTap()`-targets, `nearestXX()`,
`updateActionChip()`, coin-dispatch i step(), draw/update-dispatch i step(),
entry-heli-completion, `fullRestartRun()`-reset, `__tv2.snapshot()`,
`AREAS`/medaljedata. Glemmer man ét sted, fejler banen stille.
(Det var præcis dét der skete da Codex overtog golf: data var der,
wiring manglede.)

### Løsning: én level-kontrakt, ét registreringspunkt
Hvert level bliver ét selvstændigt objekt der registreres ét sted:

```js
registerLevel({
  id: 'kremlin',
  name: 'Kremlin',                  // heli-menu + medaljeoversigt
  icon: '🏅',
  medal: { name:'Nobel', icon:'🏅', desc:'Win arm-wrestling with Putin' },
  music: 'Greenland_3',
  worldW: 1200,
  coins: [[400,-40],[700,-35]],     // engine håndterer opsamling generisk
  data: 'KREMLIN',                  // nøgle ind i #game-data JSON-blokken

  reset(){...},                     // scene-state til start
  update(dt){...},
  draw(){...},                      // world-space; engine håndterer kamera
  onEnterWalkDone(){...},           // fx infokort første gang

  // Interaktions-DEKLARATION — erstatter nearestXX/intentTap/actionChip:
  interactables(){ return [
    { obj: KR.putin,  icon:'🤝', limit: 62,  onInteract: startHandshake },
    { obj: KR.heli,   icon:'🚁', hitbox:'heli', onInteract: engine.heliMenu },
    ...KR.statues.filter(s=>!s.collected).map(s=>({
      obj:s, icon:'💰', onInteract:()=>tryStealStatue(s) }))
  ]; },

  snapshot(){ return {...}; }       // __tv2-debug automatisk
});
```

Engine-laget (findes allerede, skal blot GENERALISERES):
- Heli-menuen autogenereres af registry-rækkefølgen (navn + ✓/○-status) —
  én kilde i stedet for fire håndskrevne menuer
- `nearestX`/`intentTap`/action-chip bliver ÉN generisk funktion over
  `interactables()` (inkl. glacier-lektien: prioritet før geometri via
  valgfri `priority`-felt)
- Coins, medaljer, death-loop, kamera, bobler, entry-heli: allerede
  generiske — kobles på kontrakten
- `fullRestartRun`/`snapshot` itererer registry i stedet for håndskrevne
  lister

### Det nye level-flow (målet)
1. Kopiér `LEVEL_TEMPLATE`-skelettet (skrives som del af sporet)
2. Udfyld JSON-datablok (tekster/positioner) + level-objektets hooks
3. Registrér med `registerLevel(...)` — færdig: banen er i heli-menuen,
   har medalje-status, mønter, debug-snapshot og mobil-interaktion
4. Kør Playwright-røgtesten (skabelon-script følger med)

### Migreringsplan (i små verificerbare trin)
1. **B1:** Indfør registry + generisk interaktionslag; portér GREENLAND
   som referencelevel. Fuld regression skal bestå uændret
2. **B2:** Portér Oval, Kremlin, Epstein, Golf (én ad gangen, regression
   imellem — samme disciplin som genopbygningen)
3. **B3:** Autogenerér heli-menu + AREAS/medaljedata fra registry;
   slet de fire håndskrevne menuer
4. **B4:** Skriv `LEVEL_TEMPLATE.md` + skelet-kode + røgtest-skabelon;
   verificér ved at bygge et LEGETØJS-level ("Trump Tower elevator",
   én knap, én joke) på under en time — det er accept-testen
5. **B5:** Dokumentér i AI_INDEX; opdater GAME_SPEC §-henvisninger

**Estimat: mellem-stort, men hvert trin er lille og regressionssikret.**
Single-file-arkitekturen BEHOLDES (brand-krav om self-contained HTML +
ingen build-toolchain at vedligeholde) — levels bliver tydeligt afgrænsede
sektioner med markører i filen.

---

## Anbefalet rækkefølge: B → A

1. **B giver A gratis fundament:** desktop-kompositionspasset (A2) rører
   alle fem baner — det er langt billigere at gøre OVENPÅ den nye
   level-kontrakt end at gøre det to gange
2. **A afhænger af en ekstern afklaring** (embed-format fra redaktionen) —
   den kan indhentes MENS B bygges
3. B er ren intern refaktorering med eksisterende regressionssuite som
   sikkerhedsnet — ingen synlig ændring for spillere, lav risiko

**Kristians beslutninger (2026-07-08):**
- [x] Rækkefølge: **B → A** — godkendt
- [x] Spor A: begge embed-formater mulige, ingen præference — men
  **desktop skal være landskabsformat** (dvs. A1 stage-ramme + A2
  landscape-kompositionspas)
- [x] Spor B accept-kriterium godkendt, med SKÆRPELSE: **Fable forsvinder
  som model-option ca. 2026-07-15.** Level-systemet skal derfor kunne
  betjenes af ANDRE modeller (Sonnet/Codex) alene: skabelon + tjekliste +
  medfølgende røgtest skal bære hele vejen uden stammeviden. Accept-testen
  udføres derfor IKKE af Fable, men beskrives så en anden model kan bestå
  den: "byg et legetøjs-level på < 1 time KUN ud fra LEVEL_TEMPLATE.md".
