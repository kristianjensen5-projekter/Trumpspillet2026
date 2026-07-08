# Accept-test af level-systemet — prompt til Sonnet

> Kopiér ALT under stregen ind i en frisk Sonnet-session i dette projekt.
> Formål: bevise at LEVEL_TEMPLATE.md alene er nok til at bygge en bane
> (Fable-uafhængighed). Det er SKABELONEN der testes, ikke modellen.

---

Du arbejder i Trumpspillet (index.html). Opgave: byg et nyt, bevidst
simpelt level — **"Trump Tower Elevator"** — som accept-test af projektets
level-system.

**Læs KUN disse kilder, i denne rækkefølge:**
1. `LEVEL_TEMPLATE.md` — følg den SLAVISK, den er hele kontrakten
2. De filer skabelonen selv henviser til (AI_INDEX.md, LESSONS.md samt
   KREMLIN-registreringen i index.html som forbillede)

Læs IKKE GAME_SPEC, BUILD_PLAN eller andre dokumenter, og lad være med at
reverse-engineere engine-koden ud over det skabelonen beder om — testen
måler om skabelonen er tilstrækkelig i sig selv.

**Banens indhold (udvid ikke):**
- Setting: elevator-lobby i Trump Tower — guldtonet væg, én elevatordør
  med etage-display over, helikopter i venstre side
- ÉN interaktion: en gylden **UP-knap** ved døren. Hvert tryk: displayet
  tæller én etage op, kort "ding", Trump siger en skrydende linje
  (5 varianter i JSON, engelsk)
- Ved 10. etage: konfetti + medalje med nøglen `tower` + linjen
  "The best floors. Nobody goes higher." — derefter kan man blive ved
  med at trykke (displayet fortsætter, replikkerne gentager)
- Ingen game over i denne bane. Helikopter-menuen skal virke BEGGE veje
- Al spiltekst engelsk og i `#game-data`-JSON-blokken

**Arbejdsregler (vigtige):**
- Rør IKKE de eksisterende baners kode eller delte engine-funktioner.
  Hele dit arbejde er: (1) nye poster i JSON-blokken, (2) ét nyt
  level-afsnit ved markøren ">>> NYE LEVELS REGISTRERES HER <<<"
- Kør skabelonens syntaks-tjek FØR browsertest, og Playwright-røgtesten
  på både desktop- og mobil-viewport (0 pageerrors er kravet)
- Kør derefter en kort Greenland-regression (start spillet, gå, interagér,
  flyv til dit level og tilbage)
- **Hvis skabelonen mangler information, eller noget ikke virker som
  beskrevet: STOP med det samme og notér PRÆCIST hvad der manglede —
  improviser IKKE udenom.** Fundne huller er testens vigtigste output
- Tag tid: notér hvornår du startede og sluttede

**Aflevering:**
1. Det færdige level, committet (deploy IKKE uden Kristians OK)
2. `ACCEPT_TEST_RESULTAT.md` med: samlet tidsforbrug · hvad der virkede
   gnidningsfrit · hver eneste ting skabelonen manglede eller var uklar
   om (med citat) · screenshots-status (desktop + mobil) · din dom:
   bestået/ikke bestået ift. kriteriet "nyt level på under 1 time"
