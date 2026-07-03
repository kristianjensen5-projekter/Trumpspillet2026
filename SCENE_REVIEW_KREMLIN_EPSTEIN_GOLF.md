# Scene-review: Kremlin, Epstein Files & Mar-a-Lago

> Fable 5, 2026-07-03. Samme blik som Oval Office-analysen: hvor falder en
> engangs-læser af, og hvad kan forbedres **uden at røre tone of voice**.
> Grundlag: fuld gennemlæsning af v1-koden (jf. GAME_SPEC.md afsnit 5–7).
> Per scene: friktion (rangeret) → anbefaling (pakke B) → alternativer.
> Beslutning træffes per scene, som med Oval Office.

**Gennemgående princip fra Oval-redesignet:** Sig præmissen højt i et
infokort — satiren ER forklaringen. Alle tre scener nedenfor får det.

---

## 1. KREMLIN

### Sådan virker den i dag
Putin står ved det lange sorte bord. E på Putin → infokort ("HANDSHAKE
BATTLE — The strongest gets Ukraine! Press A and D rapidly!") → 6 sekunders
armlægning: fase 1 hamrer man A+D skiftevis, fase 2 skifter til **F+K**
("HARDER MODE!"). Vind → amerikansk flag daler ned på Ukraine-kortet →
Nobel-medalje. Tab → russisk flag. Sidegame: 3 guldstatuer kan stjæles, men
kun når overvågningskameraernes røde laserkegler ikke ser dem — fanget =
Wagner-soldater jager dig; med gold sneakers når du helikopteren, uden =
game over i gulag. Dynamit på Putin = "World Peace?"-game over.

### Hvor læserne falder af (rangeret)
1. **Kernen er umulig på mobil.** Tastatur-mash (A+D, så F+K) har intet
   touch-modstykke. Scenen kan bogstaveligt talt ikke gennemføres på telefon.
2. **F+K-skiftet er en gearvæltning.** Midt i kampen skal man finde to nye
   taster mens tiden løber — de fleste taber momentum dér, og beskeden
   "HARDER MODE!" er lille. Sværhedsgraden føles som tastaturgeografi, ikke
   som Putin.
3. **Statue-mekanikken er usynlig.** Intet fortæller at statuer kan stjæles,
   at kameraerne betyder noget, eller at gold sneakers er flugtplanen.
   Trumps tænkebobler ("These would look great in my office...") er et fint
   hint — men koblingen laser → Wagner → sneakers skal læses i bakspejlet,
   efter man er død.
4. **Scenens mål er uklart.** Er det håndtrykket (medaljen) eller statuerne?
   Ingen prioritering kommunikeres.
5. **Efter tabt håndtryk: hvad nu?** Man KAN bare trykke E på Putin igen,
   men intet siger det.

### Anbefaling (pakke B)
- **Infokort ved ankomst:** *"Putin wants to settle Ukraine the old way:
  ARM WRESTLING. Win the handshake, win the map. And those gold statues?
  Nobody is watching... probably."* — mål, sidegame og risiko på tre linjer,
  i spillets egen tone.
- **Mash = hurtige tap.** Mobil: hamr på skærmen (stor "TAP! TAP! TAP!"-
  puls). Desktop: A+D beholdes. **F+K droppes** — fase 2 bliver i stedet at
  Putin trækker hårdere + rystelse + rød glød ("PUTIN FIGHTS BACK!").
  Samme dramaturgi, ingen tastaturjagt.
- **Gør overvågningen læsbar:** statuerne får en diskret markering af
  vagt-status (fx svag rød kant når en laser ser dem / lille 👁), og Putin
  planter selv setup-linjen ved ankomst: *"Do not touch my statues, Donald."*
  — så er tyveriet en aktiv fristelse i stedet for en skjult feature.
- **Tabt håndtryk = øjeblikkelig revanche:** Putin håner ("Again, little
  hands?"), E/tap starter forfra. Ingen dødsløkke — nederlaget er selve
  straffen (russisk flag på kortet er et stærkt billede).
- **Wagner-flugten beholdes rå** — det ER joken at man skulle have købt
  sneakers. Men i flugtøjeblikket vises en pil mod helikopteren + linjen
  "RUN! (those sneakers would have helped)" så man forstår HVORFOR man dør,
  når man dør.

### Alternativer
- **A (minimal):** Kun infokortet + tap-mash til mobil. F+K og usynlige
  kameraer bevares som i v1.
- **C (større greb):** Håndtrykket som rytmespil (tap i takt med pulserende
  ring — à la Epstein-banens hitzone) i stedet for rå mash. Mere elegant,
  men mash-panikken er en del af humoren. Ikke anbefalet.

---

## 2. EPSTEIN FILES

### Sådan virker den i dag
Guitar Hero-redaction: dokumenter scroller opad, RØDE Trump-navne skal
krydses over med E når de rammer den gyldne tape-zone, BLÅ navne (Clinton/
Gates) må ikke røres. 10 targets, max 2 misses, max 1 blåt fejlklik, farten
stiger undervejs. Til sidst stopper scrollen ved fødselsdagstegningen →
klik → sharpie-animation hvor Trump tegner jakkesæt på figuren ("Fixed it!
-DJT") → succes-kort eller avis-fail. Det er den eneste v1-scene MED
infokort — forklaringen er faktisk god.

### Hvor læserne falder af (rangeret)
1. **E-tasten har intet touch-modstykke.** Ligesom Kremlin: kernen virker
   ikke på mobil.
2. **"Tilladte" misses er en fælde.** Man må misse 2 undervejs — men
   succes-slutningen kræver alle 10 fundet. Misser man 1–2, overlever man
   hele banen og taber alligevel VED MÅLSTREGEN uden at forstå hvorfor.
   De tilladte misses udskyder kun nederlaget. Det føles som snyd.
3. **Sværhedskurven er tunet til Kristian efter måneders træning.**
   v1-koden siger det selv: "+25% tempo, higher base for harder start".
   En førstegangslæser møder banens hårdeste udgave.
4. **Blå-navne-fælden telegraferes kun med farve** — ved høj fart og for
   farvesvage læsere er rød/blå ikke nok.
5. **Miss-budgettet vises som tekst** ("Missed: 1/2") i et statistik-panel —
   let at overse at man er ét miss fra døden.

### Anbefaling (pakke B)
- **Stor rund REDACT-knap** nederst på skærmen til touch (samme kontrakt
  som E — genbruger v2's action-chip-mønster). Tegningen til sidst: stor
  pulserende "TAP TO FIX IT"-label.
- **Ret sejrslogikken:** overlever man (≤2 misses), er banen bestået —
  succes-slutning OG medalje. Missene har allerede kostet stress og
  assist-nedsættelse; at straffe dem dobbelt ved målstregen er v1's
  perfektionisme, ikke en læser-mekanik. (Alternativ hvis du vil beholde
  et perfektions-incitament: 10/10 giver en lille "FLAWLESS COVER-UP"-
  stjerne oveni medaljen.)
- **Blødere start, hårdere slutning:** samme totaltid, men kurven flyttes
  så de første 2 dokumenter er læse-tempo og de sidste er panik. Assist-
  mekanikken (langsommere efter miss) beholdes uændret.
- **Misses som liv:** tre ❌-ikoner øverst der tændes ét ad gangen —
  universalsprog, ingen tekst at afkode.
- **Blå navne får 🛑 foran** navnet ud over farven. Én glyf, løser både
  fart- og farveblindhedsproblemet.
- Tonen røres ikke: dokumentteksterne, "Of course I am not mentioned —
  never met the guy", VIRGIN-flyet, sharpie-animationen og avis-forsiden
  er scenens guld og porteres 1:1.

### Alternativer
- **A (minimal):** Kun REDACT-knappen (mobilkravet) + ❌-ikonerne.
- **C (større greb):** Skift fra scroll-rytme til "find og tap navnene
  direkte i dokumentet" (v1's oprindelige idé før Guitar Hero-versionen).
  Mere intuitivt, men langsommere og mindre sjovt under pres. Ikke
  anbefalet — rytme-versionen er bedre satire: censur på samlebånd.

---

## 3. MAR-A-LAGO MINI-PUTT

### Sådan virker den i dag
3 huller top-down minigolf. Heli lander → Trump skal GÅS (piletaster, også
op/ned!) hen til en pulserende "⛳ START HER"-boks og samle køllen op →
tutorial-modal → spil. Skud: træk-og-slip slingshot (touch-venligt!) eller
piletaster + hold E. Biden er færdig på forhånd (4/7/4 slag) og står ved
hullet med solbriller. Banner efter hvert hul ("Par!" / "X over par").
Vind på TOTAL → trofæ + medalje; tab → MAGA GAZETTE-avisforside + game
over. Esc = gå til helikopteren og forlad. Hul 3 hedder "Hole 19" med
hundeben på banen (easter egg).

### Hvor læserne falder af (rangeret)
1. **Approach-fasen er ren friktion.** At skulle gå i 2D (op/ned/venstre/
   højre) hen til en boks før spillet starter giver ingenting — og v2's
   mobile hold-venstre/højre-styring kan slet ikke gå op/ned. Det er
   filler mellem læseren og det sjove.
2. **Total-vs-total-reglen er usynlig.** Man vinder hvis ens SAMLEDE slag
   over 3 huller er under Bidens 15 — men spillere tænker per hul, og
   stillingen gemmer sig i et lille panel i hjørnet.
3. **Bidens rolle skal siges per hul.** "Sleepy Joe used 7 strokes on this
   hole. Beat him!" er hele spændingen — men tallet nævnes kun i
   tutorialen ved start.
4. **Slingshot-retningen forvirrer første gang** (træk VÆK fra bolden,
   som Angry Birds). Tutorialen siger det, men en visuel forstærkning
   mangler.
5. **Mobil kan ikke forlade banen** — Esc findes ikke på touch, og
   R-tasten (drop bolden +1) har heller intet modstykke.

### Anbefaling (pakke B)
- **Klip approach-fasen:** heli lander → Trump går selv ind i billedet
  (auto-walk cutscene på 1,5 s, samler køllen op undervejs — beholder det
  visuelle beat) → tutorial → spil. "START HER"-boksen udgår.
- **Stillingen frem i lyset:** banner ved hvert huls start: *"Hole 2 —
  Sleepy Joe: 7 strokes. Beat that."* Og efter hullet: *"After hole 2:
  You 8 — Joe 11. YOU LEAD! Tremendous."* / *"Joe leads. SAD!"* — dermed
  er total-reglen fortalt gennem stillingen, uden regeltekst.
- **Power-farve på sigtelinjen:** preview-linjen skifter grøn → gul → rød
  med trækkets styrke. Én gradient, stor intuitionsgevinst.
- **To små touch-chips** i hjørnet under spil: 🚁 "Leave" (= Esc-flowet)
  og ⛳ "Reset ball +1" (= R). Diskrete, i samme stil som action-chippen.
- **Behold:** Biden-før-spillet-konceptet (genial forsimpling fra v1),
  Biden-citaterne, cup-magneten, "Best golfer ever!"-trofæet, MAGA
  GAZETTE-forsiden ved nederlag, Hole 19-easter egg'et. Tab → voting
  machine er fint: maskinen respawner dig netop på golfbanen = rematch.
- **Teknisk forudsætning** (uanset pakke): hul 2+3's geometri ligger som
  Lottie-JSON og kræver Lottie-CDN i v1. Konverteres én gang til rene
  polygon-JSON-data (build-værktøj, ikke runtime) — v2 har ingen
  CDN-afhængigheder.

### Alternativer
- **A (minimal):** Kun auto-walk + Leave-knappen (mobilkravene).
- **C (større greb):** Match play i stedet for total (vind flest huller,
  2 af 3) — lettere at forstå, men ændrer Bidens 4/7/4-balance og dermed
  sværhedsgraden. Kun hvis total-visningen viser sig ikke at være nok.

---

## Tværgående prioritering

| Prioritet | Punkt | Hvorfor |
|---|---|---|
| 1 | Touch-input til alle tre kerner (tap-mash, REDACT-knap, chips) | Uden dem virker banerne slet ikke på mobil — resten er justering |
| 2 | Infokort i Kremlin + stillings-bannere i golf | Samme greb som Oval: sig præmissen højt |
| 3 | Epstein-sejrslogikken (≤2 misses = bestået) | Skjult dobbeltstraf, føles som snyd |
| 4 | Kremlin F+K → "Putin fights back" | Fjerner tastaturjagt, bevarer dramaet |
| 5 | Golf approach-klip + power-farve | Filler væk, intuition ind |
| 6 | Epstein-kurve + ❌-liv + 🛑-glyf | Finjustering af sværhedsgrad og læsbarhed |

Alle forslag bevarer de eksisterende tekster, jokes og game over-billeder
uændret — det er interaktionen og forklaringerne der justeres, ikke satiren.
