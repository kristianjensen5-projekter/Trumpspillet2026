# Tests — Trumpspillet 2026

Kørselsklar Playwright-suite. **Kør efter ENHVER ændring i index.html.**

## Opsætning (én gang)

```bash
cd tests
npm install                      # henter playwright
npx playwright install chromium  # kun hvis browseren mangler
```

(Browsere caches i `~/Library/Caches/ms-playwright` — findes de allerede,
springer install-steppet dem over.)

## Kørsel

```bash
node regression.mjs   # fuld regression: 3 viewports, alle kernescener
node finale.mjs       # Medal of Medals-ceremonien + stats + KEEP GOVERNING
```

**Krav for grønt:** output ender med "ALLE TJEK GRØNNE" og 0 pageerrors.
Screenshots lander i `out/` — KIG på dem med egne øjne (Read/åbn dem);
"testen kørte" er ikke det samme som "det ser rigtigt ud".

## Hvad regression.mjs dækker

- Ultrawide 2560×1080: stage-ramme, klik-for-at-gå gennem stage-offset,
  heli → Tower (elevatortur til penthouse → medalje), medalje-persistens
  efter reload
- Desktop 1280×720: heli → Golf (banner) → Esc → Greenland → heli → Oval
  (policy-tryk registreres)
- iPhone 390×844 (touch): stage slået fra, touch-bevægelse virker

## Kendte fælder når du skriver nye tests

- Bevægelse = `ArrowLeft`/`ArrowRight` (IKKE a/d — d er dynamit)
- Heli-menuen UDELADER den bane man står på — numrene skifter derfor
  med afsenderscenen (fra Greenland: 2=Oval … 6=Tower; fra Kremlin: 3=Oval)
- Oval viser et velkomst-infokort ved første besøg (dismiss-grace ~1200 ms
  — vent, tryk så E)
- Tower: hvert E-tryk er en elevatortur med animation — poll
  `snapshot().tower.riding` mellem tryk
- Brug `window.__tv2.snapshot()` til assertions og
  `__tv2.cheat.gold(n)/.policy(title)/.finale()` til opsætning
- Flere fælder: ../LESSONS.md · skabelon for nye banetests:
  ../LEVEL_TEMPLATE.md
