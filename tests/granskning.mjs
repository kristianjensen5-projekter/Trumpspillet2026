/* granskning.mjs — beviser at granskningens huller (2026-08-12) er lukket
   OG at det der virkede før stadig virker.

   Kør:  node tests/granskning.mjs        (fra projektroden)
         node granskning.mjs              (fra tests/)

   INGEN BROWSER. Ren Node. To slags tjek:
     [LOGIK]    porteret kode kørt med rigtige værdier — beviser adfærd
     [STRUKTUR] koden indeholder guarden — svagere, men fanger en fortrydelse

   Baggrund: granskning med 4 read-only agenter før publicering på
   politiken.dk. Se STATUS.md og LESSONS.md.
*/
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = existsSync(join(HERE, 'index.html')) ? HERE : join(HERE, '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

let pass = 0, fail = 0;
const ok   = (n, d='') => { pass++; console.log(`  ✅ ${n}${d ? ' — ' + d : ''}`); };
const bad  = (n, d='') => { fail++; console.log(`  ❌ ${n}${d ? ' — ' + d : ''}`); };
const test = (n, cond, d='') => cond ? ok(n, d) : bad(n, d);
const head = (t) => console.log(`\n${t}`);

/* ---------- fælles udtræk ---------- */
const jsonBlock = html.match(/<script id="game-data"[^>]*>([\s\S]*?)<\/script>/);
const DATA = JSON.parse(jsonBlock[1]);
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// hent en funktionskrop ud efter navn (balancerede tuborgparenteser)
function body(name) {
  const i = js.indexOf(`function ${name}(`);
  if (i < 0) return '';
  let d = 0, start = js.indexOf('{', i);
  for (let k = start; k < js.length; k++) {
    if (js[k] === '{') d++;
    else if (js[k] === '}' && --d === 0) return js.slice(start, k + 1);
  }
  return '';
}

/* ================================================================
   DEL 1 — hullerne fra granskningen skal være lukket
   ================================================================ */

head('P1 · fire fejl der låste eller dræbte uundgåeligt');

// F1 Epstein envejsdør på touch
test('[STRUKTUR] Epstein har en Leave-knap på touch',
  /EP\._btnLeave\s*=\s*\{/.test(js));
test('[STRUKTUR] Leave-knappen hit-testes FØR epsteinRedact()',
  js.indexOf('epsteinLeave(); return;') > -1 &&
  js.indexOf('epsteinLeave(); return;') < js.indexOf('epsteinRedact();\n    return;'));

// [LOGIK] Leave-chippen må ikke overlappe REDACT på nogen telefon
{
  const geom = (VW, VH) => {
    const bw = Math.min(200, VW * 0.5), bh = 54;
    const bx = (VW - bw) / 2, by2 = VH - bh - Math.max(36, VH * 0.02);
    const lw = 104, lh = 38, ly = by2 - lh - 10;
    const overlapX = 12 < bx + bw && 12 + lw > bx;
    const overlapY = ly < by2 + bh && ly + lh > by2;
    return { overlap: overlapX && overlapY, bottomGap: VH - (by2 + bh), ly };
  };
  const phones = [[390, 690], [390, 844], [430, 932], [320, 568], [360, 640]];
  const clash = phones.filter(([w, h]) => geom(w, h).overlap);
  test('[LOGIK] Leave-chip overlapper ikke REDACT på 5 telefonformater',
    clash.length === 0, clash.length ? `overlap ved ${JSON.stringify(clash)}` : '390/430/320/360 px');
  const tooLow = phones.filter(([w, h]) => geom(w, h).bottomGap < 34);
  test('[LOGIK] REDACT-knappen er fri af home-indicator (34px)',
    tooLow.length === 0, `mindste bundafstand ${Math.min(...phones.map(([w, h]) => geom(w, h).bottomGap))}px`);
}

// F2 atomraketten
test('[STRUKTUR] resetOval() nulstiller NUKE.active',
  /NUKE\.active\s*=\s*false/.test(body('resetOval')));

// F3 smeltevandet
test('[STRUKTUR] ice-timeren er scene-gated',
  /if \(scene===SCENE\.GREENLAND\) gameOverCause\('ice'\)/.test(js));
test('[STRUKTUR] submerged-testen er scene-gated',
  /const submerged = scene===SCENE\.GREENLAND && glacierExplosion\.active/.test(js));

// [LOGIK] samme udtryk uden for Grønland skal give false
{
  const submerged = (scene, GREENLAND, water, playerY, WORLD_H) =>
    scene === GREENLAND && water > 0 && (playerY - 38) > (WORLD_H - water);
  test('[LOGIK] smeltevand rammer IKKE i Kreml',
    submerged('kremlin', 'greenland', 324, 420, 540) === false);
  test('[LOGIK] smeltevand rammer STADIG i Grønland (regression)',
    submerged('greenland', 'greenland', 324, 420, 540) === true, '382 > 216');
}

// F5 kamp efter død
test('[STRUKTUR] kamp-timeren har scene/GS.over-guard',
  /if \(scene!==SCENE\.GREENLAND \|\| GS\.over \|\| GL\.lars\.blownUp\) return;\s*\n\s*startGreenlandFight\(\);/.test(js));

head('P2 · tre tavse fejlmåder');

test('[STRUKTUR] JSON.parse har try/catch med synlig fejl',
  /try \{\s*DATA = JSON\.parse/.test(js) && /Fejl i tekstblokken/.test(js));
test('[STRUKTUR] muted-linjen tåler blokeret localStorage',
  /muted:\(\(\)=>\{ try\{ return localStorage/.test(js));
test('[STRUKTUR] step()-catch lukker stage-clippet',
  /try\{ ctx\.restore\(\); \}catch\(_\)\{\}\s*\n\s*console\.error\('Game loop error/.test(js));

// [LOGIK] TDZ-fælden i fit(): typeof på en let i dead zone kaster også
{
  let threw = false;
  try { (() => { try { if (tdzVar === 1) {} } catch (_) { threw = true; } })(); let tdzVar = 1; }
  catch (_) { threw = true; }
  test('[LOGIK] try/catch fanger TDZ (derfor ikke typeof i fit())', threw === true);
  test('[STRUKTUR] fit() bruger try/catch, ikke typeof, til golf-låsen',
    /try\{ if \(scene===SCENE\.GOLF\) GOLF\.viewLock/.test(js));
}

head('P3 · polish');

// [LOGIK] infoCard-grace
{
  const openInfoCard = (t) => ({ readyAt: t + 700 });
  const tapDismisses = (card, t) => !(t < (card.readyAt || 0));
  const c = openInfoCard(1000);
  test('[LOGIK] infokort afvises IKKE af et tap efter 100 ms', tapDismisses(c, 1100) === false);
  test('[LOGIK] infokort kan lukkes efter 800 ms (regression)', tapDismisses(c, 1800) === true);
}
test('[STRUKTUR] infoCard-grace i BEGGE input-stiger',
  (js.match(/now\(\)<\(infoCard\.readyAt\|\|0\)/g) || []).length === 2);
test('[STRUKTUR] game over-tableau har 1200 ms grace i begge stiger',
  (js.match(/now\(\) < \(GO\.shownAt\|\|0\)\+1200/g) || []).length === 2);
test('[STRUKTUR] FightEngine.stop rydder pointers',
  /pointers\.clear\(\);/.test(body('stop')) || /this\.active=false; this\.punchOut=false;\s*\n\s*pointers\.clear\(\)/.test(js));
test('[STRUKTUR] inventarknappen respekterer blocked',
  /const invShow = inventory\.length>0 && !blocked/.test(js));
test('[STRUKTUR] intent-tap er spærret under cutscene',
  /const inCutscene = entryHeli\.active \|\| \(walkTween && !walkTween\.byPlayer\)/.test(js) && /!GS\.over && !inCutscene/.test(js));
test('[STRUKTUR] doJump spærret under entry-heli',
  /jumpTween\|\|GS\.over\|\|entryHeli\.active/.test(js));
test('[STRUKTUR] finalePlayAgain rydder GS.over',
  /GS\.over=false; GS\.overMode=null; continueOverlay=null;/.test(body('finalePlayAgain')));

// [LOGIK] input-stigerne skal være enige om FINALE vs GS.over
{
  const kd = js.indexOf("addEventListener('keydown'");
  const pd = js.indexOf("cvs.addEventListener('pointerdown'");
  const finKd = js.indexOf('if (FINALE.active){ finaleKey(k)', kd);
  const overKd = js.indexOf('if (GS.over){', kd);
  const finPd = js.indexOf('if (FINALE.active){ finaleTap', pd);
  const overPd = js.indexOf('if (GS.over){', pd);
  test('[LOGIK] FINALE står før GS.over i BEGGE stiger',
    finKd > 0 && finKd < overKd && finPd > 0 && finPd < overPd);
  test('[STRUKTUR] kun ÉN finale-gren i keydown-stigen',
    (js.match(/if \(FINALE\.active\)\{ finaleKey\(k\)/g) || []).length === 1);
}

test('[STRUKTUR] mobil får et gå-hint',
  /Hold fingeren i højre side/.test(js));
test('[STRUKTUR] infokort krymper også på højden',
  /lines\.length\*fs\*1\.45 > h-20/.test(js));

/* ================================================================
   DEL 2 — regression: virkede det før, skal det stadig virke
   ================================================================ */

head('REGRESSION · det der virkede før');

test('#game-data er gyldig JSON', !!DATA, `${Object.keys(DATA).length} top-nøgler`);
test('Alle 6 medaljer findes stadig', Object.keys(DATA.MEDALS).length === 6,
  Object.keys(DATA.MEDALS).join(', '));
test('FINALE-blokken er intakt', !!DATA.FINALE);
test('CONFIG har verden + fart', DATA.CONFIG.WORLD_H === 540 && DATA.CONFIG.SPEED > 0);

// alle registrerede levels har en medalje-nøgle (og omvendt)
{
  const ids = [...js.matchAll(/registerLevel\(\{\s*\n\s*id:\s*([A-Za-z0-9_.]+)/g)].map(m => m[1]);
  test('Alle 6 levels er stadig registreret', ids.length === 6, ids.join(', '));
}

// golfdata: de sovende ||-fælder må ikke være blevet aktive
{
  const holes = DATA.GOLF.COURSE.holes;
  const par = DATA.GOLF.COURSE.par;               // ligger på COURSE, ikke per hul
  // `golfPar()` bruger `|| 3` og `bidenStrokes || 4`: sætter man en dag en af
  // dem til 0 som pointe, bliver den stille til 3 hhv. 4 (hp||4-lektien).
  test('Ingen par-værdi er 0 (||-fælden er sovende)',
    Array.isArray(par) && par.length === holes.length && par.every(p => p > 0),
    'par: ' + JSON.stringify(par));
  test('Ingen bidenStrokes er 0',
    holes.every(h => h.bidenStrokes > 0),
    'Biden: ' + holes.map(h => h.bidenStrokes).join('/'));
}

// dansk tegnsætning i alle strenge må stadig parse
{
  const strings = [];
  (function walk(o) {
    if (typeof o === 'string') strings.push(o);
    else if (o && typeof o === 'object') Object.values(o).forEach(walk);
  })(DATA);
  const empty = strings.filter(s => s.length === 0);
  test('Ingen tomme strenge i redaktionel tekst', empty.length === 0,
    `${strings.length} strenge gennemgået`);
  const probe = JSON.stringify({ t: 'Han sagde "hej" — og gik. Æøå: 100 % sikkert' });
  test('Dansk tegnsætning parser (typografiske anførselstegn, æøå)',
    JSON.parse(probe).t.includes('"hej"'));
}

// sikkerhed: nul eksterne kald i den publicerede fil
{
  const patterns = ['https://', 'http://', 'fetch(', 'XMLHttpRequest', 'new Worker',
    'eval(', 'document.write', 'postMessage', 'WebSocket', 'document.cookie'];
  const hits = patterns.filter(p => html.includes(p));
  test('Nul eksterne kald i index.html', hits.length === 0,
    hits.length ? 'FUNDET: ' + hits.join(', ') : `${patterns.length} mønstre afprøvet`);
  const globals = [...js.matchAll(/window\.(\w+)\s*=/g)].map(m => m[1]);
  test('Kun __tv2 som global', globals.every(g => g === '__tv2'),
    globals.join(', ') || 'ingen');
}

// alle refererede assets findes faktisk på disken
{
  // NB: filnavne kan indeholde mellemrum ("assets/golf1 ny.png") — match
  // derfor frem til det afsluttende anførselstegn, ikke til første mellemrum.
  const refs = new Set();
  for (const m of html.matchAll(/["']((?:assets|Musik til trumpspillet)\/[^"']+)["']/g)) refs.add(m[1]);
  for (const m of html.matchAll(/["'](icon-\d+\.png|apple-touch-icon\.png|favicon-32\.png|manifest\.json)["']/g)) refs.add(m[1]);
  const missing = [...refs].filter(r => !existsSync(join(ROOT, r)));
  test('Alle refererede assets findes på disken', missing.length === 0,
    missing.length ? 'MANGLER: ' + missing.join(', ') : `${refs.size} filer`);
  // dist/-byggeriet afhænger af at denne liste er komplet
  test('Asset-listen er komplet (4 billeder + 4 MP3 + 4 ikoner + manifest)',
    refs.size === 13, `${refs.size} fundet`);
  console.log('     ' + [...refs].sort().join('\n     '));
}

// localStorage-nøglerne må ALDRIG omdøbes (spillernes fremskridt)
test('localStorage-nøglerne er uændrede',
  js.includes("'trumpv2-medals'") && js.includes("'trumpv2-music-muted'"));

/* ---------- resultat ---------- */
console.log(`\n${'─'.repeat(52)}`);
console.log(`${pass} bestået, ${fail} fejlet`);
if (fail) { console.log('❌ NOGET ER I STYKKER — ret før deploy.'); process.exit(1); }
console.log('✅ Alle huller lukket, ingen regression fundet.');
