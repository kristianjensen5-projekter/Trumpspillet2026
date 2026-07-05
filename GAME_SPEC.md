# GAME_SPEC — Trumpspillet 2026 (genopbygning)

> Udtrukket af Fable 5 (2026-07-02) ved fuld gennemlæsning af `index.html`
> (13.633 linjer — den fungerende desktopversion). Krydstjekket mod Codex'
> `kodebasetilfable.md`. Dette er facit for genopbygningen: gameplayet skal
> bevares 1:1, arkitekturen bygges om (mobile-first, én responsiv fil).

---

## 1. Overordnet

2D satirisk canvas-spil. Spilleren styrer en tegneserie-Trump gennem fem baner:
**Greenland → White House (Oval Office) → Kremlin → Epstein Files → Mar-a-Lago
Mini-Putt**. Helikopter binder banerne sammen. Guldbarrer er valuta, butik i
Greenland sælger powerups, medaljer per bane, voting-machine continue-system
ved game over. Alt in-game tekst er **engelsk**. Grafik er programmatisk
pixel-art (fillRect-figurer) — ingen eksterne billeder undtagen golfbane-
overlays og `assets/drawing.png`.

**Intro:** Retro startskærm, cremefarvet baggrund (`#efe8d2`), Courier New.
Canvas med helikopter + Trump. Titel: *"Try not to destroy the world Donald"*.
Undertitel: *"Being the best president ever is tough. Bet YOU can't handle it"*.
Enter/klik/Start-knap → helikopter-landing i Greenland med linjen
*"Perfect landing! Welcome to Greenland!"*.

---

## 2. Globale systemer

### Styring (desktop)
| Tast | Funktion |
|---|---|
| ←→ (↑↓) | Gå (op/ned bruges kun i fight/golf-approach) |
| Space / ↑ | Hop |
| E | Interager / plant dynamit / redact (Epstein) / putt-charge (Golf) |
| B | Vis/skjul inventar |
| 1–4 | Brug inventar-slot (tan/shoes/maga/dynamite) |
| D | Vælg/fravælg dynamit (auto-fravælges efter 10 s) |
| T | Tweet |
| I | Vis/skjul hjælpekort |
| M | Mute musik (localStorage `trumpv2-music-muted`) |
| N | Non-violent mode toggle |
| R | Reset nuværende bane · Shift+R = fuld genstart |
| F / K | FPS / debug (dev) |
| Esc | Luk overlay / forlad golf (gå-til-heli) / afbryd fight |
| Museklik | Klik-nær-objekt → auto-walk hen og interager |

### Styring (mobil — fra Trumpspillet2026Mobil.html-testen, skal med fra dag ét)
- Portrait-first. Ingen synlige joysticks/labels — **usynlig assistance**.
- Hold venstre/højre halvdel af skærmen = gå venstre/højre.
- Kort tap = interager; tap nær objekt = auto-walk + interager (intent-tap:
  butik → åbn butik, Lars → tal, mine/rig/heli/items/glaciers/coins → interager;
  tomt område → fallback `interact()` hvis Trump allerede står tæt på noget).
- Hold retning med én finger + tap med anden = hop uden at slippe bevægelsen.
- Alle menuer/valg (heli, butik) = tappelige nummererede bokse.
- Golf: drag/release skal virke med touch (pointer events).
- iOS: `user-select:none`, `-webkit-touch-callout:none` (long-press-selection fra).
- **Lyd-styrke på iOS kun via Web Audio GainNode — aldrig `.volume`** (jf. lessons).

### Spiller-tuning
- Gangfart `SPEED: 210` px/s · interaktionsafstand `INTERACT_DIST: 48` px
  (skaleret med `SCALE = clamp(W/1200, 0.8, 1.4)`).
- Hop: sinus-tween, 520 ms, højde 26 px (**50 px med MAGA-cap** = super jump).
- Gold sneakers: fart ×2 (toggle). Talebobler: 2000 ms default.
- Tan-niveau 0–5, hudfarve-gradient: `#f4cda4 → #f1b577 → #ee9850 → #ea7a28 → #e16706 → #c65200`.

### Guld & mønt-bonusser
- Guldbarrer svæver i banerne (hoppes op til; opsamles med hovedet ved hop, radius 20 px):
  Greenland 12 · Oval 7 · Kremlin 4 = **23 i alt**.
- 10 mønter → permanent +25 % fart. 18 → "Health boost unlocked!". Alle 23 →
  "Gold Rush Master! All gold bars found!".

### Butik (Greenland, "BUTIK"-bod)
| Vare | Pris | Effekt |
|---|---|---|
| Self-tanner | 3 guld | tanLevel +1 (kan købes flere gange) |
| Gold sneakers | 8 guld | Fart ×2; kræves til Wagner-flugt |
| MAGA-cap | 5 guld | Super jump + stil |
| Dynamite (x5) | 6 guld | 5 stk; D for at vælge, E for at plante (kan genkøbes) |
- Første køb: inventar åbnes automatisk + "press B to see my beautiful stuff".
- Ikke nok guld: "Not enough gold." · dublet: "You already have that item."

### Dynamit (plant-system, cooldown 900 ms)
Effekt afhænger af mål: **Lars/mette** → flyver roterende ud af skærmen,
Greenland-medalje + flagdrop · **bjørn** → hp=0, rasende chase straks ·
**rig** → flammer fra toppen · **glacier** → begge isbjerge sprænges → vand
stiger → game over 'ice' · **Putin** → game over 'kremlin' ("World Peace?") ·
**ground** → boom, rystelse, "BOOM! Dynamite planted!".
Isbjerge er store: plant-check bruger kant-afstand ≤ 30 px (ikke center).

### Medaljer (localStorage `trumpv2-medals`, reset via `?resetMedals=1`)
| Bane | Medalje | Ikon | Krav |
|---|---|---|---|
| Greenland | Greenland flag | 🇬🇱 | Besejr Lars (fight eller dynamit) |
| Oval | Pulitzer | 📰 | 100 % MAGA approval |
| Kremlin | Nobel | 🏅 | Vind håndtryks-kampen mod Putin |
| Epstein | Art Diploma | 🎨 | Redact alle dokumenter + tegningen |
| Golf | FIFA Trophy | 🏆 | Slå Biden |
- Top-center: fremskridts-pills (Greenland/White House/Kremlin/Epstein files/
  Mar-a-Lago) — grøn+🏅 ved medalje, aktiv bane fremhævet. Top-right: medalje-ikoner.
- Medalje-tildeling: fanfare + "🏅 MEDALJE: <navn>!"-boble.
- Prestige-drops (fælles fysik: fald + dæmpet pendulsving + konfetti):
  Grønlandsflag på hovedet, guldmedalje på brystet (Oval), Nobel (Kremlin),
  trofæ (Golf).

### Tweets (T)
Kontekstafhængig tekst (bane + inventar) + presets: "So much winning!", "The
Fake News won't report this!", "MAKE GREENLAND GREAT AGAIN!", "Covfefe.".
Tweet i Kremlin: Putin-relation −trust; >3 tweets + lav trust → Putin:
"Perhaps less... social media?".

### Relations-system (let)
`RELATIONSHIPS.mette` og `.putin` med respect/trust/fear 0–100. Justeres ved
dialog, tweets, håndtryk, tyveri. Bruges til Putins replikvalg efter håndtryk
og til (arve-)ending-tekster. **Lavt prioriteret i genopbygningen — behold
strukturen, den styrer kun flavor-tekst.**

### Musik & lyd
- SFX: WebAudio-oscillatorer (click, buttonPress, success-akkord, error,
  helicopter, explosion, whoosh, achievement-fanfare, tweet, heartbeat, punchHit).
- Musik-engine: chiptune-loops per bane (8 takter, square-bas 0.035 +
  triangle-lead 0.10): Greenland 100 BPM A-mol · Oval 110 C-dur march ·
  Kremlin 95 D-dorisk · Epstein 130 E-frygisk · Golf 105 C-dur yacht rock.
  Per-track gain-node så skift ikke overlapper.
- **Status: musikken er pt. slået fra** (`Music.disabled = true`, commit
  "Disable background music"). Genopbyg enginen, men lad den være disabled
  by default; M-mute-preference gemmes stadig.

### Game over & continue
1. Dødsårsag → **cause-art-skærm** (cremet baggrund, titel + undertitel + pixel-art):

| Cause | Bane | Titel/undertekst |
|---|---|---|
| `lars-fight` | Greenland | "KO!" / "Lars got you. Try again." |
| `ice` | Greenland | isbjerge sprængt, vand steg |
| `bear` | Greenland | "EATEN BY A BEAR!" / "This is very unfair treatment!" (bjørn med Trump i gabet, blodstænk) |
| `nuke` | Oval | SURPRISE-knappen (missil-art) |
| `kremlin` | Kremlin | "World Peace?" / "Historic day in geopolitics" |
| `wagner` | Kremlin | "CAPTURED BY WAGNER" / "Should have worn those gold sneakers..." (Trump i orange jumpsuit bag tremmer) |
| `golf-loss` | Golf | "LOSER!" / "Sleepy Joe slog X mod dine Y. Very SAD!" + MAGA GAZETTE-avisforside |
| `epstein_fail` | Epstein | Avisforside "The Daily Tremendous": "BREAKING: DONALD NAMED. MULTIPLE TIMES." (roteret 10°, s/h-figurer) |
| `epstein_success` | Epstein | SUCCES-kort: VIRGIN-fly + smilende Trump & Epstein, "Of course I am not mentioned — never met the guy" → retur til Greenland |

2. Tastetryk → **voting machine** ("DIEBOLD NIXONDORF™", navy kasse, rød stribe,
   blå glow-skærm, "PRESIDENTIAL ELECTION 2024"). Slot-ord: DEMOCRAT /
   INDEPENDENT / REPUBLICAN / TRUMP. VOTE → dekelererende spin (12–18 steps,
   interval 80 ms + 32/step) der ALTID lander på TRUMP → "+1 LIFE —
   TREMENDOUS!", roterende guldstjerner, Trump-boble "VOTE TRUMP!" →
   "YOU'RE HIRED! BIGLY!" → continue **til banen man døde i** (`GO.lastScene`).
   DEMOCRAT-knap: slot viser "RIGGED!", boble "WITCH HUNT! RIGGED!", 1,8 s →
   fuld genstart til intro.

---

## 3. Bane 1: Greenland (hub)

**Miljø:** Isblå himmel-gradient, drivende skyer, is-gulv, to store isbjerge
(240×360 og 300×420 px, ved x≈200/900), mine (x 520), olierig (x 380),
helikopter (x 160), isbjørn (x 760), **Lars Løkke** (x ≈ 890 — figur med gråt
hår, briller, **pibe med animeret røg**; internt hedder objektet stadig
`mette`), butik (x 1040), 12 guldbarrer.

**Navigations-hints:** Over heli: "E / Press E to fly to the next level".
Over butik: "E interakt / Buy powerups in the shop (you might need them later)".

**Mine:** E → planter US-flag ved minen, "Mine now." (igen: "Already claimed
this beautiful mine!").

**Olierig:** E → olie-burst fra toppen, "Huge energy play. Beautiful, clean oil!"

**Isbjerge:** 1. interaktion: "These massive ice walls are blocking my
BEAUTIFUL view! Need something explosive to clear them." · uden dynamit:
"Still need something to blast through these glaciers! Where's my dynamite?" ·
dynamit ejet men ikke valgt: "Look in the inventory, dummy!" · sprængning er
en FÆLDE → game over 'ice' (eksplosioner, ischunks, stigende vand 60 % af
skærmen, Trump "svømmer" med bob-animation, game over efter 1,5 s).

**Isbjørn:** hp 4. E (violent) = slag: blod, knockback (vy −280, vx +60).
Ved hp 0: RASENDE — "ROAAAAR! 😡", rød-øjet stort gab med tænder, chase
300 px/s (normal 100). Nær Trump (< 30 px): 2 % bid-chance/frame → "CHOMP! 🦷",
HUD "🐻 Bear attack! (1/3)" — **3. bid = game over 'bear'**. Non-violent mode:
"Nice bear. Take a fish 🐟" → fredelig. Fysik: gravity 1400, damping 0.92/0.96,
skærm-bounce.

**Lars-dialog** (E, 5 runder — begge bobler vises samtidig, Lars' løftes 70 px):
Trump: "Mine!" → "Rules are stupid." → "Pathetic danes." → "Boom. Everywhere."
→ "Enough talk. Now fight."
Lars: "Greenland is not for sale — let's put it in a work group." → "Det skader
USA's ry — work group." → "NATO er i fare — work group." → "... work group?"
Efter 5. runde → **fight**.

**Fight for Greenland** (FightEngine):
- Countdown-overlay: "FIGHT FOR GREENLAND" (1,6 s) → 3 → 2 → 1 → "FIGHT!"
  (0,8 s pr. tal, 4,6 s i alt; input blokeret).
- Begge 100 HP, HP-bjælker over hovederne (TRUMP orange / LARS blå).
- Bevægelse: pile/WASD. E = punch (160 ms, cooldown 260 ms, hit-vindue
  35–55 %, range 80 px, **10 dmg**, arm tegnes kun ved stød).
- Lars-AI: bobber (sinus ±6 px), driver mod Trump (30 px/s, ønsket afstand
  60 px), jab hver ~900–1400 ms (180 ms, hit-vindue 63–99 ms, **12 dmg**,
  første jab tidligst 1 s efter countdown).
- Hits: punchHit-lyd + sparks + hvid flash 120 ms; KO: 30 sparks + rystelse.
- Trump vinder → Grønlandsflag daler ned på hovedet, konfetti, "Greenland is
  mine now.", medalje. Taber → game over 'lars-fight'.
- (Genopbygning: undgå originalens capture-fase-input-bridge-hack — byg
  fight-input ind i den almindelige input-router med scene-state.)

**Helikopter-menu** (E ved heli): "Board helicopter?" → 1. Stay in Greenland ·
2. Fly to The White House · 3. Fly to Moscow (meeting) · 4. Epstein files ·
5. Fly to Mar-a-Lago (mini-putt). Valg-overlay: fuldskærm, farvede bokse
(`#9feaf2 #e7e77b #f36a6a #e892f4 #5f79df`), pile/tal/klik/tap.

**Heli-entry (alle baner):** Helikopter daler lodret ned (1,6 s) med Trump
inde i kabinen, downwash-partikler sidst, derefter går Trump 40 px ud og siger
ankomstlinjen (Oval: "Back at the Resolute Desk — the best!" · Kremlin: "Very
strong handshake incoming." · Golf: "Time for some golf!").

---

## 4. Bane 2: White House / Oval Office

**Miljø:** Tapetvæg med damask-mønster, kamin-hylder med guldstatuer (+ evt.
stjålne fra Kremlin!), vægskærm-TV med **EXECUTIVE SCREEN**, Resolute Desk
med to reelle knapper: sort **POLICY/RANDOM**-knap og stor rød **DO NOT
PRESS** under glaskuppel med hazard-striber. Yes-men-gruppe med tre
arketyper: QAnon-mand, Fox-host og Vance-type. Dør + helikopter. 7
guldbarrer.

**Presidential Decisions v3:** Trump går til skrivebordet efter heli-entry.
Spilleren kan frit styre ham som i Greenland og interagere via action-cirkel,
tap på knap eller `E`.

- **Sort POLICY-knap:** vælger et tilfældigt policy-forslag fra
  `DATA.OVAL.POLICIES`, flasher skærmen og får yes-men til at juble.
- Skærmen viser titel + kort policytekst. Nogle policies bruger billeder fra
  `assets/oval office/` (`trumpjesus.jpeg`, `obamaabes.jpeg`), hvor racistisk
  AI-content vises censureret/flagget i stedet for råt.
- Policies gentages ikke direkte, hvis der findes alternativer.
- **Pulitzer-medalje:** gives efter 5 policy-tryk; herefter kan spilleren
  fortsætte med at trykke for flere jokes uden retry/fail-state.
- **Rød DO NOT PRESS-knap:** launcher altid atommissil (3,2 s, rystelse) →
  game over `nuke` → voting machine/continue-flow → respawn.
- Gammel gæstequiz, YES/NO-kort, approval-score og selvbruner-aide er
  fjernet fra runtime.

---

## 5. Bane 3: Kremlin

**Miljø:** Lyserøde vægge, røde draperier, Stalin-portræt i guldramme, langt
sort bord, rødt gulvtæppe. Putin (ved højre side), dør, helikopter,
**3 guldstatuer** (x 420/560/700), **2 overvågningskameraer** (x 30 %/70 %,
synlige røde laser-kegler 22,5°, sweeper 30°–150° på 8 s, modsat fase),
4 guldbarrer.

**Putin (E) → Handshake battle:** Infokort: "HANDSHAKE BATTLE WITH PUTIN /
Who has the strongest handshake? … The strongest gets Ukraine! / Press A and D
rapidly to win!" (begge valg starter kampen — "No regrets"!).
- 6 s. Arm-wrestling-grafik over bord. Progress-bar TRUMP (grøn) vs PUTIN (rød).
- Fase 1 (0–3 s): mash **A+D** skiftevis (+0.15/skift). Fase 2 (3–6 s):
  **F+K** ("HARDER MODE!"). Putin trækker konstant (0.18/frame, 0.25 i fase 2).
- Slut: pos > 0.5 = sejr → verdenskorts-overlay med **amerikansk flag der
  daler ned på Ukraine** (bounce-easing), "UKRAINE ER NU AMERIKANSK
  TERRITORIUM!" → efter Enter: Nobel-medalje-drop. Tab → russisk flag,
  "UKRAINE FORBLIVER UNDER RUSSISK INDFLYDELSE!", ingen medalje.
- Putins efter-replik afhænger af relationsniveau.

**Statue-tyveri:** E ved statue — **kun hvis intet kamera ser den**. Stjålet:
boast-linje ("Only I could get this deal." m.fl.), statuen vises bagefter på
Oval-hylderne. Tænke-boble nær statuer: "These would look great in my
office..." m.fl.
**Fanget af kamera:** rød skærm-flash, Putin: "WAGNER! SEIZE HIM!", Trump:
"This is fake surveillance!" → **2 Wagner-soldater** (camo, balaclava, rød
beret) jager. Med gold sneakers: nå helikopteren < 60 px → "Nobody catches
Trump! NOBODY!" → flugt-menu (Greenland/White House/Mar-a-Lago). Uden (eller
fanget < 30 px / 3 s timeout): Putin "Take him to the gulag!" → game over 'wagner'.

**Grænse-tegning** (borderDraw, verdenskort med gul Ukraine): mus-tegnet
grænse analyseres (længde/kompleksitet/aggression) → Trump/Putin-reaktioner.
*Arve-feature, pt. uden indgang i flowet — medtag IKKE i v2 (bekræftet drop
kan revideres).*

---

## 6. Bane 4: Epstein Files

**Guitar Hero-agtigt redaction-minispil.** Træbrun desk-baggrund, hvidt
papir-område (60 % bredde), dokumenter scroller opad.

**Infokort ved start:** "Trump is OBVIOUSLY not mentioned in the Epstein
files. / Cross out the 10 mistakes before Democrats spread their conspiracy
theories! / 🎸 Press [E] when RED names hit the tape / 🛑 Do NOT press on BLUE
names (Clinton/Gates) / ⚠️ 3+ misses = defeat / ⏸️ P to pause/resume".

- 12 genererede "CLASSIFIED DOCUMENT"-sider (15–23 linjer, skabelontekster med
  tilfældige dummy-navne). **Præcis 10 Trump-navne** (varianter: "Donald
  Trump", "The Donald", "POTUS Trump" osv.) fordelt jævnt — sidste dokument har
  altid mindst ét. **3× Bill Clinton + 3× Bill Gates** (beskyttede, BLÅ).
- Trump-linjer: rød highlight. Beskyttede: blå. Hit-zone: gylden bånd-tape
  midt på papiret med E-tast-ikon.
- Scroll-hastighed vokser med fremdrift: `(1.8 + progress*2.6) * 1.25`;
  efter miss: 15 % langsommere i 3,5 s + pulserende assist-outline på targets.
- E i zonen: nærmeste target — Trump-navn: sort marker-animation (tusch
  glider hen over, 300 ms), +1 redacted, sparks. Beskyttet navn: penalty
  ("Penalty: Do not cross out blue names"), **>1 penalty = fail**. Miss (navn
  forbi toppen): **>2 misses = fail**. Cooldown 150 ms.
- Til sidst stopper scrollen ved **fødselsdagstegningen** (`assets/drawing.png`
  eller vektor-fallback). E/klik → **sharpie-animation** (2 s): Trump tegner
  jakkesæt, slips og knapper på figuren + "Fixed it! -DJT" → toast "Fixed it!".
- Alle 10 fundet → succes-kort (VIRGIN-fly, Enter → Greenland) + Art Diploma.
  Ellers → avis-fail-kort.

---

## 7. Bane 5: Mar-a-Lago Mini-Putt

**Top-down minigolf, 3 huller** (hul 3 vises som "Hole 19" — easter egg med
hundeben på banen). Course-data i JSON (`course-mar-a-lago`): bounds 960×540,
hul 1 med håndkodede rails, hul 2+3 fra Lottie-JSON (fairway/genstand/tee/hul-
lag parses til walls/surfaces/cup/teeRect) + PNG-overlays (`assets/golf1 ny.png`,
`bane.png`, `bane3.png`). Sand-baggrund `#efe8d2`, zoom 0.5, centreret viewport.

**Flow:** Heli-landing → `approach`: Trump går (pile, 160 px/s) til pulserende
gylden "⛳ START HER"-boks (96 px) og samler golfkøllen op → tutorial-modal:
"Trump vs. Sleepy Joe / You must not lose this duel. / Drag away from the ball
to aim and choose power. / Release to shoot. Keyboard: arrow keys + space. /
Sleepy Joe used N strokes. Beat him! / Press any key to begin." (300 ms
dismiss-delay mod key-leak).

**Skud:**
- Mus/touch: pointer-down ≤ 2,4× boldradius → **slingshot-drag** (træk væk fra
  bolden, stiplet gul preview-linje spejles i skudretning), release = skud.
  Power = drag/260 (max), speed = 140 + power^1.18 × (780−140).
- Tastatur: ←→ justerer vinkel (±0.12 rad), **hold E** = charge (420/s, max
  720, charge-meter nederst "E: release to putt"), slip = skud.
- Fysik: friktion per underlag (fairway 0.989, green 0.992, sand 0.965, rough
  0.962, water 0.935, trees 0.91) + generel dæmpning 0.995; elastiske
  rail-bounces (segment-projektion); cup-magnet: range +18 px, styrke 1200,
  kun under 220 px/s; **i hul når d ≤ cup.r og fart < 20**; penalty-zoner →
  drop på tee +1 slag ("Drop (+1)"); R = drop +1; bold stopper < 6 px/s → aim.
- **Biden er færdig på forhånd**: står ved cuppen med solbriller og kølle,
  boblen "N slag". Scores per hul: **4, 7, 4** (hul 2 par 5, øvrige par 3).
  Biden-citater (rullende): "Trump is a threat to our democracy." m.fl.
- Efter hvert hul: banner "Par!" / "X under par!" / "X over par".
- **Slut:** Trump total < Biden total → "Best golfer ever!" → trofæ daler ned
  på Trump, konfetti, medalje, Enter → Trump går til helikopteren → heli-menu.
  Ellers → "Sleepy Joe wins!" → game over 'golf-loss'.
- Esc undervejs: Trump går til den parkerede helikopter → exit + heli-menu.
- HUD: kursusnavn-banner, infopanel "Hole X / 3 · Par N" + "You: X | Joe: Y".

---

## 8. Krydstjek mod Codex' `kodebasetilfable.md`

Codex' brief stemmer med koden på alle hovedmekanikker. Afvigelser fundet
(koden er facit):

1. **Golf-charge:** Codex skriver "hold E/Space to charge" — koden bruger kun
   **E** (Space hopper). Tutorial-teksten nævner dog "arrow keys + space";
   v2 må gerne acceptere begge, det matcher tutorial-løftet.
2. **Epstein-fejlgrænser:** Codex: "More than 2 misses" ✓ og "more than 1
   protected penalty" ✓ — bekræftet i kode (`missesAllowed: 2`,
   `protectedLimit: 1`). Infokortet siger "3+ misses = defeat" (konsistent).
3. **Biden golf-scores:** Codex "around 4, 7, 4" — koden: præcis 4/7/4 via
   `GOLF_HOLE_CONFIG` (hul 2 par 5, hul 3 displayId 19).
4. **Bjørnen:** Codex: "Normal interaction damages/annoys the bear. After
   enough hits or dynamite, bear becomes angry" ✓ (hp 4 → 0 = rasende; dør
   ALDRIG — kun rasende).
5. **Ikke i Codex-briefen (men i koden — skal med):** mønt-bonusser (10/18/23),
   mine-flag, non-violent mode (N), tweets (T), relations-flavor, nav-hints,
   tan-gradient på huden, "Hole 19"-easter egg med hundeben, shop-tutorial
   (auto-åbn inventar), Epstein assist-mode efter miss, adaptive hitbox-padding,
   Kremlin tænke-bobler, stjålne statuer vises i Oval Office.
6. **Grænse-tegning (borderDraw)** findes i koden men er ikke koblet til
   flowet og er udeladt i Codex-briefen → droppes i v2.
7. **Musik:** Codex nævner M-mute; koden har HELE chiptune-enginen men
   `disabled: true`. V2: byg engine, disabled by default.

---

## 9. Arkitektur-krav til genopbygningen (v2)

1. **Én responsiv HTML-fil** (`trumpspillet-v2.html` → senere `index.html`)
   — desktop + mobil via samme kodebase, ingen separat mobilfil.
2. **Mobile-first input-lag:** ét samlet pointer/touch/keyboard-router med
   scene-state — ingen capture-fase-hacks, ingen input-bridges.
3. **Data-adskillelse:** al redaktionel tekst (dialoger, gæster, tweets,
   game over-tekster) i JSON-blokke som i original — redaktionen kan rette
   tekst uden at røre kode.
4. **Scene-moduler:** hvert scene-objekt har `reset/enter/leave/update/draw/
   onTap/onKey` — registry + `switchScene()` som eneste vej.
5. **Ingen eksterne CDN-afhængigheder** (Lottie-web fjernes; golfbane-data
   konverteres én gang til rene JSON-polygoner).
6. **Genbrug originalens draw-funktioner** (Trump, Lars, bjørn, Putin, gæster,
   heli, butik osv.) — de ER spillets look. Porteres næsten 1:1.
7. **Canvas-skalering:** ét logisk koordinatsystem, DPR-korrekt, portrait-
   støtte med kamera/zoom i stedet for at gemme skalerede koordinater i
   world-state (originalens `rescaleAll`-tilgang var skør ved resize).
8. localStorage-nøgler bevares: `trumpv2-medals`, `trumpv2-music-muted`,
   `trumpv2-help-open`.
