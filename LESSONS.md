# LESSONS — Trumpspillet 2026

Per-projekt lektier. Globalt relevante kopieres til `Masterversioner/context/05_lessons.md`.

---

## `hp || 4` healede den rasende bjørn og deaktiverede stille hele chase-mekanikken

**Problem:** I v2-testen blev bjørnen rasende men bed aldrig — game over 'bear'
kunne ikke udløses. Automatiseret test afslørede at hp gik 4→0 (rasende) og
derefter TILBAGE til 3 ved næste E-tryk.
**Årsag:** `GL.bear.hp = Math.max(0,(GL.bear.hp||4)-1)` — når hp er 0 er den
falsy, så `0||4` giver 4. Chase/bid-logikken er gated på `hp<=0`, så ét ekstra
E-tryk på den rasende bjørn "healede" den og slukkede jagten uden fejl.
**Buggen fandtes også i v1** — usynlig fordi spillere flygter fra en rasende
bjørn i stedet for at trykke E på den igen.
**Fix:** Brug `??` i stedet for `||` når 0 er en gyldig værdi, og gør
tilstandsskiftet envejs: når bjørnen først er `angry`, dekrementeres hp aldrig
igen. Generel regel: `||`-fallback på talfelter hvor 0 er meningsfuldt er en
tidsindstillet bombe.
**Dato:** 2026-07-02

---

## Store baggrundsobjekter må ikke konkurrere på bounding-box-afstand i interaktionsvalg

**Problem:** I v2 valgte `nearestGL()` altid isbjerget frem for Lars/bjørnen —
dialog og fight kunne ikke startes fra højre side.
**Årsag:** Isbjergene er 240–300 units brede; med rektangel-afstand er
afstanden 0 så snart spilleren står inde i deres bounding box. Og isbjerg #2
(x=900) står næsten oven i Lars (x=890), så selv center-afstand tipper forkert
på højre side af Lars.
**Fix:** (1) Center-afstand for store objekter i interaktionsvalget (som v1);
rektangel-tjek KUN i den dedikerede dynamit-plant-sti. (2) Små +25-afstands-
straf til isbjerge så karakterer altid vinder når begge er i rækkevidde.
Generel regel: interaktionsprioritet skal afgøres af hvad spilleren MENER,
ikke af rå geometri — små/interaktive objekter før store baggrundsobjekter.
**Dato:** 2026-07-02

---

## Mønter blev opsamlet under helikopter-landingen

**Problem:** Guld-HUD viste 1/12 før spilleren havde gjort noget.
**Årsag:** Møntopsamling kræver "airborne" (`player.y < ground-4`) — men under
entry-helikopterens landing følger spilleren helikopterens y og passerer
mønternes højde.
**Fix:** Skip opsamlingstjekket mens `entryHeli.active`. Generel regel:
cutscene-styret bevægelse skal eksplicit undtages fra fysik-triggere.
**Dato:** 2026-07-02

---

## Talebobler: klem til skærmen FØR overlap-tjekket, og voks opad

**Problem:** Kristians iPhone-test (2026-07-03): talebobler stod oveni
hinanden og for lavt. v1's mobiltest ramte samme problem (løst med et
magisk "-70px løft" på Lars' boble).
**Årsag:** To fejl: (1) boblens boks voksede NEDAD fra ankerpunktet, så
flerlinjede bobler dækkede figuren. (2) Overlap-tjekket brugte de u-klemte
x-positioner, mens tegningen bagefter klemte boblen inden for kameraets
udsnit — på en smal telefon endte to "ikke-overlappende" bobler derfor
alligevel samme sted.
**Fix:** Ét samlet layout-trin: boks placeres HELT over hovedet (bunden ved
hoved-højde), klemmes til kameraet FØRST, og overlap-undgåelse (stak opad)
køres på de endelige rects. Halen tegnes fra boblens bund ned mod hovedet.
Generel regel: kollisions-/overlap-logik skal arbejde på de samme endelige
koordinater som tegningen — aldrig på mellemresultater.
**Dato:** 2026-07-03

---

## Canvas-tegninger under indledende script-evaluering kan forsvinde — og en anden bug kan skjule det

**Problem:** HUD-ikonerne (Trump-hoved, guldbarre) var blanke — men KUN dem
der blev malet ved boot. Senere renderHUD-kald malede fint.
**Årsag (to lag):** (1) Canvas-elementer tegnet synkront under selve den
indledende script-evaluering kan miste deres backing store når Chromiums
compositor initialiserer — `getImageData` viste rene nuller trods korrekt
tegnekode. (2) Fejlen var USYNLIG i starten, fordi en ANDEN bug (mønter
opsamlet under heli-landing) tilfældigvis udløste et ekstra `renderHUD()`
efter load og dermed genmalede ikonerne. Da mønt-buggen blev fixet,
"opstod" ikon-buggen.
**Fix:** Udskyd al boot-tids canvas-UI-maling til efter første frame:
`requestAnimationFrame(()=>{ renderHUD(); renderInv(); })`.
**Generel regel:** (a) Mal aldrig canvas-UI under initial script-eval —
vent på første rAF. (b) Når en bugfix "skaber" en ny bug et andet sted, så
mistænk at den gamle bug maskerede en eksisterende — ikke at fixet var
forkert.
**Dato:** 2026-07-03

---

## Automatiserede Playwright-flowtests fanger det manuel test ikke gør

**Indsigt:** Alle tre bugs ovenfor blev fundet med headless Playwright-scripts
der spiller spillet (gå, tryk E, vent, screenshot + `window.__tv2.snapshot()`).
Manuel test havde næppe fundet bjørne-buggen (kræver at man trykker E på en
rasende bjørn). v2 har en permanent debug-hook `window.__tv2` med read-only
snapshot + gold-cheat til netop dette. Testscripts ligger i sessionens
scratchpad og kan genskabes billigt.
**Dato:** 2026-07-02

---

## Statusdokumenter kan være foran koden — tjek altid `SCENES` og ruterne

**Problem:** `BUILD_PLAN_V2.md` markerede Mar-a-Lago som færdig, men
`trumpspillet-v2.html` havde kun Golf-data. `SCENES` manglede `SCENE.GOLF`,
helikopter-menuerne sagde stadig "coming soon", og input/render-loop havde
ingen golfgren.
**Fix:** Ved kold start: verificér færdig-status mod tre konkrete steder:
`SCENES`, menuruter og debug-snapshot. Dokumentstatus alene er ikke nok.
**Dato:** 2026-07-04

---

## Touch-chips er ikke desktop-knapper

**Problem:** Golfens Leave/Reset-chips var nyttige på iPhone, men på desktop
lå Leave-chippen oven i det eksisterende help-panel nederst til venstre.
**Fix:** Tegn kun touch-chips når `IS_TOUCH` er sand. Desktop har allerede
keyboard-kontrakt (`Esc`/`R`), så ekstra canvas-knapper skaber kun overlap.
**Dato:** 2026-07-04
