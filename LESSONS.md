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

## Automatiserede Playwright-flowtests fanger det manuel test ikke gør

**Indsigt:** Alle tre bugs ovenfor blev fundet med headless Playwright-scripts
der spiller spillet (gå, tryk E, vent, screenshot + `window.__tv2.snapshot()`).
Manuel test havde næppe fundet bjørne-buggen (kræver at man trykker E på en
rasende bjørn). v2 har en permanent debug-hook `window.__tv2` med read-only
snapshot + gold-cheat til netop dette. Testscripts ligger i sessionens
scratchpad og kan genskabes billigt.
**Dato:** 2026-07-02
