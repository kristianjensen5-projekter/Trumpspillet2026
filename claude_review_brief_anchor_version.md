# Claude Opus 4.7 — anchor-baseret review-brief til Trumpspillet 2026

## Formål
Denne brief er skrevet til et **kode-review af masterfilen for Trumpspillet 2026**, hvor projektet er stort, historisk lagdelt og delvist organiseret med **anchors**, **sektionstitler** og en slags **mini-TOC** for at gøre arbejdet mere håndterbart i AI-værktøjer.

Målet er at udnytte den eksisterende struktur mest muligt, så reviewet bliver:
- mere præcist
- mindre diffust
- bedre til at finde regressionsrisici
- bedre til at foreslå realistiske refaktorer i små bidder

---

## Anbefalet arbejdsgang i Claude
### Bedste tilgang
Brug **Deep Review først**, ikke Ultra Review.

**Hvorfor:**
Fordi projektet tilsyneladende stadig i høj grad lever i én stor masterfil, og fordi meget af forståelsen afhænger af:
- scene-navne
- sektioner
- anchors
- gamle vs nye entry points
- historiske lag i routing og reset-logik

Et Ultra Review direkte på hele filen risikerer at blive for bredt. Deep Review er bedre til:
- at kortlægge struktur
- at identificere hotspots
- at pege på uklar ansvarfordeling
- at bygge en prioriteret plan for næste reviewrunde

### Praktisk rækkefølge
1. **Deep Review** af hele masterfilen med fokus på struktur, anchors og hotspots
2. **Ultra Review** af udvalgte sektioner:
   - Golf
   - scene-switching / routing
   - reset-funktioner
   - HUD / overlays / tutorials
   - input-system
3. Først derefter:
   - patchforslag
   - små refaktorer
   - målrettede bugfixes

---

## Kendt struktur i projektet
Nedenstående skal bruges aktivt i reviewet.

### Projektformat
Projektet er et scene-baseret browser-spil, sandsynligvis samlet i en stor HTML-fil med indlejret CSS og JavaScript.

### Kendte scener / baner
Claude skal holde særligt øje med disse scene-navne og deres relationer:

- Intro
- Greenland
- Oval
- Kremlin
- Epstein
- Golf / Mar-a-Lago Mini-Putt

### Kendte hotspots
Særligt sandsynlige risikoområder:
- Golf-banen
- scene-skift / routing
- reset/state cleanup
- HUD / overlay lifecycle
- input globalt vs scene-lokalt
- Greenland-interaktioner og onboarding
- asset loading / course loading i Golf

### Kendte arkitekturtræk
Projektet bruger eller har brugt:
- scene-definitioner
- `switchScene(...)`
- scene-`enter(...)`
- reset-funktioner
- global state + scene-state
- HUD med level / gold / medals
- overlays / tutorials / menus
- achievements / medals
- coins / progression
- scene-specifikke hjælpefunktioner
- mulig async asset/course loading i Golf

---

## Kendte anchors og sektionstyper
I reviewet skal Claude aktivt bruge følgende kendte strukturgreb:

### 1. MINI-TOC
Der findes eller har eksisteret en topstruktur i stil med:
- `MINI-TOC — TRUMPSPILLET 2026`

Claude skal bruge den som navigationskort over filen og som tegn på, at projektet allerede er opdelt semantisk, selv hvis det fysisk stadig er én stor fil.

### 2. Scene-sektioner
Scener kan være indrammet med sektioner i stil med:
- `// SCENE_GREENLAND (START)`
- `// SCENE_GREENLAND (END)`
- `// SCENE_EPSTEIN`
- tilsvarende sektioner for andre scener

Claude skal:
- mappe hvilke scener der har klare sektioner
- se om scene-logik er lækket uden for egen sektion
- finde afhængigheder mellem scene-sektioner og global kode

### 3. Reset-sektion
Der er kendt en større sektion i stil med:
- `9. SCENE RESET FUNCTIONS`

Claude skal bruge den som nøgleområde for:
- cleanup
- progression reset
- scene re-entry
- state leaks
- regressionsrisiko ved scene-skift

### 4. Input-anchors
Der findes kendte anchors i stil med:
- `// END INPUT_GLOBAL_KEYDOWN`

Det tyder på, at inputlogik er stærkt centraliseret nogle steder, men muligvis også delt med scene-lokal logik andre steder.

Claude skal derfor specifikt undersøge:
- hvor globalt input starter/slutter
- hvilke scener der også håndterer input lokalt
- om Enter / Escape / E / andre actions ejes uklart

### 5. Funktionsnavne som strukturelle pejlemærker
Claude skal være særligt opmærksom på funktioner/navne i stil med:
- `switchScene(...)`
- `startGolf(...)`
- `golfEnter(...)`
- `resetStateDefaults(...)`
- `resetGreenland(...)`
- `updateMedalDisplay()`
- `renderAreas2(...)`
- `createCoinsFromConfig(...)`

De skal behandles som centrale entry points eller shared utilities og vurderes for:
- dubleret ansvar
- historiske lag
- uklart ejerskab
- regression ved refaktor

---

# Prompt til Claude — Fase 1 (Deep Review)
Brug dette som første prompt.

```md
Du skal lave et **arkitektur- og stabilitetsreview** af mit browser-spilprojekt **Trumpspillet 2026**.

## Vigtigt om projektets struktur
Projektet er ikke bare “en stor fil”; det er også delvist organiseret gennem:
- anchors
- sektionstitler
- scene-navne
- en slags mini-TOC
- START/END-kommentarer for blokke
- navngivne centrale funktioner, som fungerer som pejlemærker

Du skal aktivt bruge denne struktur i din analyse i stedet for at læse projektet som en anonym masse kode.

## Formål
Målet er at:
1. forstå den faktiske struktur i masterfilen
2. bruge anchors og sektioner til at kortlægge systemet
3. identificere de mest fejlbehæftede områder
4. finde teknisk gæld og skrøbelige overgangspunkter
5. foreslå den bedste rækkefølge for videre code review og stabilisering

## Kendte scene-navne
Hold især øje med disse scener:
- Intro
- Greenland
- Oval
- Kremlin
- Epstein
- Golf / Mar-a-Lago Mini-Putt

## Kendte vigtige sektioner / mønstre
Der kan være sektioner eller anchors i stil med:
- `MINI-TOC — TRUMPSPILLET 2026`
- `// SCENE_GREENLAND (START)` / `(END)`
- `// SCENE_EPSTEIN`
- `9. SCENE RESET FUNCTIONS`
- `// END INPUT_GLOBAL_KEYDOWN`

Der kan også være centrale funktioner som:
- `switchScene(...)`
- `startGolf(...)`
- `golfEnter(...)`
- `resetStateDefaults(...)`
- `resetGreenland(...)`
- `createCoinsFromConfig(...)`
- `updateMedalDisplay()`
- `renderAreas2(...)`

Brug disse aktivt som navigationspunkter.

## Det jeg vil have dig til at gøre
### 1. System map baseret på anchors
Kortlæg projektet ud fra dets faktiske sektioner:
- hvilke top-level sektioner findes?
- hvilke anchors fungerer som naturlige moduler?
- hvilke scene-sektioner er tydelige?
- hvor bryder strukturen sammen?
- hvor ligger fælles/shared kode kontra scene-specifik kode?

### 2. Scene map
Lav et overblik over hver scene:
- hvor scene-sektionen ser ud til at starte/slutte
- hvordan scenen kommer ind i flowet
- hvilke reset-/enter-/render-/input-afhængigheder den har
- om den virker isoleret eller lækker ansvar til global kode

### 3. Routing og entry points
Undersøg især:
- hvordan `switchScene(...)` bruges
- om gamle og nye entry points eksisterer side om side
- om `startGolf(...)` og `golfEnter(...)` er tydeligt adskilt eller overlapper
- om scene-start stadig sker flere steder på inkompatible måder

### 4. Reset og cleanup
Undersøg især sektionen med scene reset functions:
- hvad nulstilles globalt?
- hvad nulstilles scene-lokalt?
- hvor er cleanup utilstrækkelig?
- hvilke ting risikerer at overleve scene-skift?
- hvor er der risiko for state leaks eller order-dependent bugs?

### 5. Input ownership
Undersøg hvor input håndteres:
- global keydown eller tilsvarende
- scene-lokalt input
- Enter / Escape / E / andre action keys
- om input har uklart ejerskab mellem systemer

### 6. HUD / overlays / tutorials
Kortlæg:
- hvor HUD’en ejes
- hvordan overlays og tutorials vises/skjules
- om samme overlay-ansvar er spredt flere steder
- om Golf, Greenland eller Epstein har special cases
- om UI-lifecycle virker konsistent på tværs af scener

### 7. Shared utilities vs scene code
Vurdér om fælles hjælpefunktioner som fx coin-/medal-/render-helpers:
- er reelt generelle
- eller i praksis er skjult scene-specifik logik
- eller lækker ansvar mellem scener

### 8. Hotspot review
Identificér de vigtigste hotspots i kodebasen.
For hvert hotspot:
- præcis placering / sektion / anchor
- hvorfor det er risikabelt
- hvilke bugtyper der sandsynligvis opstår
- regressionsrisiko
- anbefalet næste reviewtrin

## Outputformat
Svar i denne struktur:

### A. Executive summary
Kort vurdering af projektets tilstand.

### B. Anchor-based system map
Beskriv projektets struktur ud fra anchors, sektioner og sceneblokke.

### C. Scene map
En scene-for-scene teknisk vurdering.

### D. Entry points og routing-risici
Særligt fokus på scene-skift og gamle/nyere flows.

### E. Reset / cleanup-risici
Hvad ser mest skrøbeligt ud?

### F. Input / HUD / overlay-risici
Særligt fokus på ownership og lifecycle.

### G. Top hotspots
Prioriteret liste med de farligste områder.

### H. Reviewplan
Hvilke områder bør gennemgås med Ultra Review bagefter?

### I. Usikkerheder
Hvad kan du ikke afgøre sikkert ud fra koden?

## Vigtig arbejdsform
- Brug anchors og sektionstitler aktivt.
- Når du omtaler et problem, så nævn helst hvilken anchor eller sektion det ligger omkring.
- Kig efter tegn på historiske lag: gammel og ny logik side om side.
- Kig efter dublerede entry points og skjulte afhængigheder.
- Vær hård ved Golf, routing, reset, input og overlays.
- Fokusér på reelle risici frem for generelle kode-review-fraser.
- Giv ikke patchkode endnu, medmindre noget er ekstremt oplagt og lav-risiko.
- Jeg vil hellere have et præcist risikokort end en pæn, generel opsummering.

Afslut med en sektion med overskriften:
## “Hvis jeg kun måtte bruge 1-2 arbejdsdage på at reducere regressionsrisiko”
Her skal du vælge de mest effektive indgreb.
```

---

# Prompt til Claude — Fase 2 (Ultra Review på hotspots)
Brug denne efter første Deep Review.

```md
Nu vil jeg have et **målrettet Ultra Review** af de mest risikable områder i Trumpspillet 2026.

Du skal bruge den eksisterende struktur i koden aktivt:
- anchors
- scene-sektioner
- reset-sektioner
- input-anchors
- navngivne entry points

## Fokusområder
Gennemgå især:
1. Golf / Mar-a-Lago Mini-Putt
2. `switchScene(...)` og relateret routing
3. `startGolf(...)` vs `golfEnter(...)`
4. `9. SCENE RESET FUNCTIONS`
5. input omkring global keydown og scene-lokale handlers
6. HUD / overlays / tutorials
7. Greenland-sektionen hvis den deler helpers eller flow med Golf/routing/reset

## Hvad jeg vil have
For hver vigtig observation skal du give:

### 1. Placering
Anchor, sektion, scene eller funktion.

### 2. Problem
Hvad er problemet præcist?

### 3. Hvorfor det er farligt
Hvordan kan det skabe bugs eller regressioner?

### 4. Praktisk symptom
Hvordan viser det sig i gameplay eller videre udvikling?

### 5. Teknisk årsag
Hvorfor er koden endt sådan? Fx:
- historisk lag
- dubleret entry point
- uklart ejerskab
- skjult global afhængighed
- order dependence
- utilstrækkelig cleanup
- async timing
- UI lifecycle overlap

### 6. Anbefalet løsning
Retning for løsning, ikke nødvendigvis færdig patch.

### 7. Prioritet
- kritisk
- høj
- mellem
- lav

## Særligt fokus
Jeg vil især have dig til at være hård ved:
- gammel og ny scene-routing side om side
- dublerede scene-starts
- state der resettes flere steder
- helpers der både er “fælles” og scene-specifikke
- overlay ownership
- input ownership
- implicit afhængighed af globale variabler
- asset loading med særregler
- flow der kun virker pga. nuværende rækkefølge

## Outputformat
Svar i disse sektioner:

### A. Top 10 konkrete problemer
Med placering, prioritet og anbefalet retning.

### B. De mest skrøbelige entry points
Hvilke funktioner/anchors har størst regressionsrisiko?

### C. De mest skrøbelige lifecycle-overgange
Fx scene enter/exit/reset/show overlay/hide overlay/load asset.

### D. Top 5 lav-risiko forbedringer
Små ændringer med høj nytte.

### E. Top 5 høj-effekt refaktorer
Større ændringer, hvis jeg vil styrke projektet strukturelt.

### F. Hvad du ville teste manuelt først
Konkrete flows og transitions.
```

---

# Prompt til Claude — Fase 3 (patch-plan med anchors)
Brug denne, når du vil have konkrete ændringer.

```md
Nu vil jeg have en **implementeringsplan med små, sikre trin** for Trumpspillet 2026.

Projektet er anchor-baseret og stadig delvist organiseret i én stor masterfil. Derfor skal dine forslag respektere eksisterende struktur så meget som muligt.

## Regler
- Ingen store alt-eller-intet refaktorer først.
- Foretræk små patches.
- Hver ændring skal kunne testes isoleret.
- Bevar eksisterende gameplay-adfærd mest muligt.
- Brug anchors, sektioner og funktionsnavne som referencepunkter.
- Når du foreslår ændringer, skal du sige hvor de hører hjemme ift. eksisterende struktur.

## For hver anbefalet ændring skal du give:
1. Titel
2. Placering i koden
   - anchor / sektion / funktion
3. Problem den løser
4. Hvorfor ændringen er sikker eller risikabel
5. Teststrategi
6. Forventet gevinst
7. Type:
   - lille patch
   - mellemstor refaktor
   - større omstrukturering

## Vigtigt
Hvis du foreslår en ny hjælper eller wrapper, så forklar:
- om den bør ligge tæt ved eksisterende anchor/sektion
- eller om den bør oprettes som ny tydelig sektion
- og hvordan man minimerer risikoen for at bryde eksisterende flow

## Slutmål
Lav en prioriteret plan for:
- første 3 patches
- næste 3 refaktorer
- hvad der bør udskydes
- hvad der ikke bør røres endnu
```

---

## Kort operator-guide
Når du bruger Claude på dette projekt, så bed den ikke bare “review the game”.

Bed den i stedet gøre dette:
1. læs masterfilens struktur
2. identificér anchors og scene-sektioner
3. map entry points
4. map reset cleanup
5. map input ownership
6. vælg hotspots
7. review ét hotspot ad gangen
8. foreslå små patches

Det er den bedste måde at udnytte jeres eksisterende struktureringsarbejde på.

---

## Konkrete ting Claude skal være ekstra opmærksom på
- om Golf faktisk er gjort til fuld scene overalt, eller kun delvist
- om `startGolf(...)` stadig bærer gammelt ansvar
- om `switchScene(...)` bruges konsekvent
- om `enter(params)`-mønsteret er fuldt indført eller kun delvist
- om reset-funktioner nulstiller for meget eller for lidt
- om overlays ryddes entydigt ved scene-skift
- om HUD’en reelt ejes centralt
- om inputkonflikter opstår mellem global keydown og scene-lokal logik
- om scene-kode lækker uden for egne anchorblokke
- om “fælles” helpers i praksis er skjult scene-kode
