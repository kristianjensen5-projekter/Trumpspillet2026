# LEVEL_TEMPLATE — sådan bygger du en ny bane i Trumpspillet

> Skrevet af Fable 5 (2026-07-08) til de modeller der bygger videre
> (Sonnet/Codex/andre). Følg denne fil SLAVISK — den er hele kontrakten.
> Accept-kriterium: et simpelt nyt level skal kunne bygges på < 1 time
> alene ud fra denne fil. Alt foregår i `index.html` (én fil, ingen build).

---

## Overblik: hvad du får gratis

Når du registrerer et level med `registerLevel({...})`, sørger enginen
automatisk for: plads i helikopter-menuen (med ✓/○-medaljestatus),
scene-skift, kamera (verden er 540 høj, gulv y=420), spillerens gang/hop,
møntopsamling, talebobler, game over→voting machine→respawn, mobil
touch-styring (hold=gå, tap=interager, action-chip), debug-snapshot og
musik-skift. Du skriver KUN banens indhold.

## Trin-for-trin (tjekliste — udfør ALLE punkter)

1. **Læs først:** `AI_INDEX.md` + `LESSONS.md` (kendte fælder!) + ét
   eksisterende level som forbillede — KREMLIN-registreringen i
   `index.html` er den bedste reference (søg `id:SCENE.KREMLIN`).
2. **JSON-data:** Tilføj en datablok til `#game-data`-JSON'en øverst i
   `index.html` (søg `"KREMLIN": {` og læg din blok ved siden af).
   AL redaktionel tekst (replikker, infokort, navne) SKAL ligge her —
   aldrig hårdkodet i funktionerne. Kør JSON'en gennem en validator.
3. **Level-afsnit:** Indsæt hele dit level (state-objekt + funktioner +
   `registerLevel(...)`) ved markøren i `index.html`:
   `>>> NYE LEVELS REGISTRERES HER <<<` (søg på den). Brug skelettet
   nedenfor.
4. **Medalje (hvis banen kan gennemføres):** Tilføj en post i
   `"MEDALS"`-blokken i JSON'en med samme nøgle som dit level-id, og kald
   `awardMedal('<dit-id>')` ved sejr. `GS.medals` bygges automatisk af
   MEDALS-blokkens nøgler (fixet 2026-07-08 efter accept-testen), så
   medaljen overlever refresh uden mere arbejde — men VERIFICÉR det i
   røgtesten: reload siden og tjek at medaljen stadig står i snapshot.
5. **Game over (hvis banen kan tabes):** Tilføj en post i `"GAMEOVER"`-
   JSON-blokken og kald `gameOverCause('<cause>',{delayMs:...})`.
   Vil du have et flot dødstableau: tilføj en branch i `drawTableau()`
   (søg funktionen; hver cause er en isoleret `else if`-blok) — ellers
   får du en neutral standardskærm.
6. **Syntaks-tjek FØR browsertest:**
   ```bash
   python3 -c "
   import re, json
   html=open('index.html').read()
   json.loads(re.search(r'<script id=\"game-data\" type=\"application/json\">(.*?)</script>',html,re.S).group(1))
   open('/tmp/check.js','w').write(re.findall(r'<script>(.*?)</script>',html,re.S)[0])
   print('JSON OK')"
   node --check /tmp/check.js
   ```
7. **Røgtest med Playwright** — desktop OG mobil-viewport, 0 pageerrors
   er kravet. Læg dit script i `tests/` (skabelon nederst; se
   tests/README.md) og kør BAGEFTER hele `tests/regression.mjs`.
8. **Regression:** Spil mindst Greenland + ét andet level igennem via
   heli-menuen bagefter (dit level må ikke have smadret de andre).
9. **Dokumentér:** STATUS.md-afsnit + evt. ny lektie i LESSONS.md.
10. **Deploy** (efter Kristians OK ved større ændringer):
    `npx wrangler pages deploy . --project-name trumpspillet2026
    --branch=main --commit-dirty=true` — og curl-verificér liveness.

## Skelet (kopiér, erstat `mylevel` overalt)

> Bemærk: skelettet bruger med vilje en standalone `const SCENE_MYLEVEL`
> i stedet for at udvide det delte `const SCENE = {...}`-objekt (som de
> fem oprindelige baner gør). Det er bevidst: hele dit arbejde skal holde
> sig inden for de to berøringszoner (JSON-blokken + markør-sektionen) —
> rør IKKE det delte SCENE-objekt.

```js
/* ================================================================
   LEVEL: MYLEVEL — én sætning om hvad banen er
   ================================================================ */
const MY = {                       // alt scene-state i ÉT objekt
  heli:{x:160,y:GROUND_Y-18,type:'heli'},
  thing:{x:600,y:GROUND_Y,type:'thing',say:'',speakingUntil:0},
  coins:[], introShown:false
};
function resetMylevel(){
  player.x=200; player.y=GROUND_Y; player.say=''; player.speakingUntil=0;
  Object.assign(MY.thing,{x:600,say:'',speakingUntil:0});
  MY.coins=(DATA.MYLEVEL.COINS||[]).map(([x,dy])=>({x,y:GROUND_Y+dy,collected:false,type:'coin'}));
  playEntryHeli(DATA.MYLEVEL.LINES.arrive);   // standard heli-ankomst
}
function updateMylevel(dt){ /* per-frame logik */ }
function drawMylevel(){
  beginWorld();                                // -> world-koordinater
  ctx.fillStyle='#dff4ff'; ctx.fillRect(CAM.x-2,0,CAM.viewW+4,CFG.WORLD_H);
  ctx.fillStyle='#e7fbff'; ctx.fillRect(CAM.x-2,GROUND_Y,CAM.viewW+4,CFG.FLOOR_H+400);
  MY.coins.forEach(c=>{ if(!c.collected) drawGoldBar(c); });
  if (!entryHeli.active) drawHeli(MY.heli.x,MY.heli.y,0.35);
  drawTrump(player.x,player.y,player.facing);
  drawFx();
  if (entryHeli.active) drawHeli(entryHeli.x,entryHeli.y,1);
  const placed=[];
  renderActorBubble(player,placed,'trump');
  renderActorBubble(MY.thing,placed,'default');
  endWorld();                                  // -> skærm-koordinater
}
function nearestMylevel(){
  const arr=[MY.heli,MY.thing];
  let best=null,bd=1e9;
  for (const o of arr){
    const d = o.type==='heli' ? distToRect(player.x,player.y,o.x+20,o.y-6,220,120)
            : dist2(player.x,player.y,o.x,o.y);
    if (d<bd){ bd=d; best=o; }
  }
  return bd<CFG.INTERACT_DIST*1.3 ? best : null;
}
function interactMylevel(){
  const o=nearestMylevel(); if (!o) return;
  if (o.type==='heli'){ openHeliLevelSelect(SCENE_MYLEVEL); }
  else if (o.type==='thing'){ say(MY.thing, DATA.MYLEVEL.LINES.hello, 2000); }
}

const SCENE_MYLEVEL='mylevel';    // id = nøglen overalt (medalje, menu, musik)
registerLevel({
  id:SCENE_MYLEVEL, name:'My Level', worldW:1200,
  reset:resetMylevel,
  update:updateMylevel,
  draw:drawMylevel,
  coins(){ return MY.coins; },
  interact:interactMylevel,
  nearest:nearestMylevel,
  chip(){
    const o=nearestMylevel(); if (!o) return null;
    return o.type==='heli'?'🚁':'E';
  },
  tapTargets(){ return [MY.heli,MY.thing].map(o=>({obj:o})); },
  onRestart(){ MY.introShown=false; },
  snapshot(){ return { mylevel:{ /* det testen skal kunne aflæse */ } }; }
});
```

## Kontrakten i detaljer

| Felt | Krævet | Hvad |
|---|---|---|
| `id` | ja | Unik streng. Bruges som medalje-nøgle, musik-nøgle og menu-id |
| `name` | ja | Label i helikopter-menuen |
| `worldW` | ja | Verdens bredde (kamera-clamp). Standard-baner: 1200 |
| `reset()` | ja | Sæt AL scene-state til start. Kaldes ved hvert besøg OG respawn |
| `draw()` | ja | Tegn hele scenen. `beginWorld()/endWorld()` for world-space |
| `update(dt)` | nej | Per-frame logik. Kaldes KUN når spillet kører (ikke under game over) |
| `coins()` | nej | Returnér array af `{x,y,collected}` — opsamling er automatisk |
| `interact()` | nej | E/chip/tap-slutpunkt. Lav din egen nearest-dispatch |
| `nearest()` | nej | Nærmeste interaktive objekt (bruges af chip + tap) |
| `chip()` | nej | Emoji/label til mobil-knappen, `null` = skjult |
| `tapTargets()` | nej | Mobil intent-tap-mål. `rank:1` = fallback (store baggrundsobjekter — se glacier-lektien i LESSONS.md!). Udelades hvis scenen selv håndterer taps |
| `onWalkInDone()` | nej | Efter heli-landing+gåtur. Vis infokort her (én gang via egen flag) |
| `cameraFocus()` | nej | Returnér x for kamerafokus (ellers følges spilleren) |
| `onRestart()` | nej | Nulstil ved fuld genstart (Shift+R / give up) |
| `snapshot()` | nej | Objekt der merges ind i `window.__tv2.snapshot()` — SKRIV DEN, ellers kan du ikke teste banen ordentligt |

**Musik:** `Music.startForScene(id)` kaldes automatisk — tilføj dit id i
`MUSIC_TRACKS`-mappingen (søg `const MUSIC_TRACKS`) eller lad være (stilhed).

**Input udover interact:** Har banen egne taster/gestures (som golf/
Epstein), tilføj en tidlig scene-branch i keydown/pointerdown-routerne
(søg `scene===SCENE.EPSTEIN` for mønsteret) — og RETURNÉR efter håndtering.

## Kendte fælder (fra LESSONS.md — læs den!)

- `||`-fallback på tal hvor 0 er gyldigt (`hp||4` healede bjørnen) — brug `??`
- Store objekters bounding-box må ikke stjæle interaktion fra små
  (glacier-lektien) — brug `rank:1`/afstands-straf
- Key-leak: overlays der åbnes mens spilleren hamrer taster skal have
  dismiss-grace (~1200 ms) — se `flagOverlay.dismissAt`
- Kollisions-/overlap-tjek skal bruge SAMME koordinater som tegningen
  (boble-lektien)
- Canvas-UI må ikke males under initial script-eval — vent på første rAF
- Cutscene-bevægelse (entry-heli) skal undtages fra fysik-triggere
  (mønt-lektien): tjek `entryHeli.active`

## Røgtest-skabelon (Playwright)

**Taster i testen:** bevægelse = `ArrowLeft`/`ArrowRight` (IKKE a/d —
`d` er reserveret til dynamit-valg), hop = `ArrowUp`, interager = `e`.

```js
// tests/smoke_mylevel.mjs — npm install i tests/ først
// (browsers ligger cached i ~/Library/Caches/ms-playwright)
import { chromium } from 'playwright';
const FILE='file:///Users/kristian.jensen/Documents/CODE/Masterversioner/Trumpspillet Master 2026/index.html?resetMedals=1';
const browser=await chromium.launch({headless:true});
for (const vp of [{viewport:{width:1280,height:720}},
                  {viewport:{width:390,height:844},hasTouch:true,isMobile:true}]){
  const page=await browser.newPage(vp);
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto(FILE);
  if (vp.hasTouch) await page.tap('#start-btn'); else await page.keyboard.press('Enter');
  await page.waitForTimeout(2600);
  await page.keyboard.press('e'); await page.waitForTimeout(300);   // heli-menu
  // find dit levels nummer i menuen ud fra rækkefølgen i LEVEL_ORDER
  await page.keyboard.press('6'); await page.waitForTimeout(3500);  // <- tilpas!
  const s=await page.evaluate(()=>window.__tv2.snapshot());
  console.log(vp.hasTouch?'MOBIL':'DESKTOP', 'scene:', s.scene, 'errors:', errs.length?errs:'none');
  await page.screenshot({path:`smoke_${vp.hasTouch?'mob':'desk'}.png`});
  // ...spil banens kerne igennem via snapshot-polling + keyboard...
  await page.close();
}
await browser.close();
```

**Definition of done:** begge viewports uden pageerrors, kerneflowet
gennemspillet automatisk (sejr + evt. nederlag→voting machine→respawn),
screenshots kigget efter med egne øjne, Greenland-regression kørt,
STATUS.md opdateret.
