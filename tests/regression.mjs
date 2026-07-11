// Fuld regression af index.html efter A1-stagepatch + Sonnets tower-level
// + dynamisk GS.medals. 3 viewports: bred desktop (stage), std desktop
// (stage), iPhone (ingen stage). Flows: Greenland-interaktion, heli-menu,
// tower (UP x10 -> medalje -> refresh-persistens), golf-entry, oval policy.
import { chromium } from 'playwright';
const FILE=new URL('../index.html', import.meta.url).href+'?resetMedals=1';
import {fileURLToPath} from 'node:url';
import {mkdirSync} from 'node:fs';
const SP=fileURLToPath(new URL('./out', import.meta.url));
mkdirSync(SP,{recursive:true});
const browser = await chromium.launch({ headless: true });
const snap = (page) => page.evaluate(() => window.__tv2.snapshot());
let fail = 0;
const check = (label, cond, extra='') => { console.log((cond?'  ok ':'  FAIL '), label, extra); if(!cond) fail++; };

// ---------- 1) Bred desktop 2560x1080 — stage skal være ON ----------
{
  const page = await browser.newPage({ viewport:{width:2560,height:1080} });
  const errs = []; page.on('pageerror', e=>errs.push(e.message));
  await page.goto(FILE);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2800);
  await page.keyboard.press('e'); await page.waitForTimeout(400); // luk GL-startskilt
  let s = await snap(page);
  console.log('WIDE stage:', JSON.stringify(s.stage));
  check('stage on (wide)', s.stage && s.stage.on === true);
  check('scene greenland', s.scene === 'greenland');

  // klik-på-mine gennem stage-offset (mine ved world x=520)
  const clickX = s.stage.x + (520 - s.stage.camX) * s.stage.scale;
  const clickY = s.stage.y + 400 * s.stage.scale;
  await page.mouse.click(clickX, clickY);
  await page.waitForTimeout(2600);
  s = await snap(page);
  check('click-to-walk mod minen', Math.abs(s.player.x - 478) < 40, `player.x=${Math.round(s.player.x)}`);

  // heli-menu: gå til heli, E, vælg tower (nr 6)
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(2400);
  await page.keyboard.up('ArrowLeft');
  await page.keyboard.press('e'); await page.waitForTimeout(500);
  await page.screenshot({ path: SP + '/rg_wide_helimenu.png' });
  await page.keyboard.press('6'); await page.waitForTimeout(3800);
  s = await snap(page);
  check('heli -> tower', s.scene === 'tower', `scene=${s.scene}`);

  // tower: gå til UP-knappen (x=640) med snapshot-polling, tryk 12 gange
  for (let i=0;i<16;i++){
    s = await snap(page);
    if (s.player.x >= 590) break;
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.up('ArrowRight');
  }
  // ny tower-mekanik (commit b98a6aa): hvert E-tryk = elevatortur én
  // etage op; etage 5 er penthouse -> medalje. Vent mellem ture.
  for (let p=0;p<10;p++){
    s = await snap(page);
    if (s.tower && s.tower.medalAwarded) break;
    if (!s.tower || !s.tower.riding) await page.keyboard.press('e');
    await page.waitForTimeout(1100);
  }
  for (let i=0;i<10;i++){ s=await snap(page); if (s.medals && s.medals.tower) break; await page.waitForTimeout(500); }
  s = await snap(page);
  console.log('  tower snapshot:', JSON.stringify(s.tower||{}), 'medals.tower=', s.medals && s.medals.tower);
  check('tower-medalje tildelt', !!(s.medals && s.medals.tower));
  await page.screenshot({ path: SP + '/rg_wide_tower.png' });

  // persistens: reload UDEN resetMedals — medaljen skal overleve (dynamisk GS.medals)
  await page.goto(new URL('../index.html', import.meta.url).href); // UDEN resetMedals: persistens-tjek
  await page.waitForTimeout(800);
  s = await snap(page);
  check('tower-medalje overlever refresh', !!(s.medals && s.medals.tower), JSON.stringify(s.medals));
  check('0 pageerrors (wide)', errs.length === 0, errs.join(' | '));
  await page.close();
}

// ---------- 2) Std desktop 1280x720 — stage on, golf + oval ----------
{
  const page = await browser.newPage({ viewport:{width:1280,height:720} });
  const errs = []; page.on('pageerror', e=>errs.push(e.message));
  await page.goto(FILE);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2800);
  await page.keyboard.press('e'); await page.waitForTimeout(400); // luk GL-startskilt
  let s = await snap(page);
  console.log('STD stage:', JSON.stringify(s.stage));
  check('stage on (1280x720)', s.stage && s.stage.on === true);

  // til heli og til golf (nr 5)
  await page.keyboard.down('ArrowLeft'); await page.waitForTimeout(2400); await page.keyboard.up('ArrowLeft');
  await page.keyboard.press('e'); await page.waitForTimeout(500);
  await page.keyboard.press('5'); await page.waitForTimeout(4200);
  s = await snap(page);
  check('heli -> golf', s.scene === 'golf', `scene=${s.scene}`);
  // luk evt. tutorial og se golf-state
  await page.keyboard.press('e'); await page.waitForTimeout(700);
  s = await snap(page);
  console.log('  golf state:', s.golf ? s.golf.state : '(ingen)');
  check('golf aktiv (tutorial/aim/idle)', !!s.golf);
  await page.screenshot({ path: SP + '/rg_std_golf.png' });

  // Esc ud af golf (første tastetryk lukker evt. banner, så Esc igen)
  await page.keyboard.press('Escape'); await page.waitForTimeout(600);
  await page.keyboard.press('Escape'); await page.waitForTimeout(3200);
  s = await snap(page);
  check('golf Esc -> greenland', s.scene === 'greenland', `scene=${s.scene}`);
  // til heli og videre til oval (nr 2)
  for (let i=0;i<16;i++){
    s = await snap(page);
    if (s.player.x <= 230) break;
    await page.keyboard.down('ArrowLeft');
    await page.waitForTimeout(500);
    await page.keyboard.up('ArrowLeft');
  }
  await page.keyboard.press('e'); await page.waitForTimeout(500);
  await page.keyboard.press('2'); await page.waitForTimeout(4500);
  s = await snap(page);
  check('heli -> oval', s.scene === 'oval', `scene=${s.scene}`);
  // gå til skrivebordet og tryk policy-knappen
  for (let i=0;i<16;i++){
    s = await snap(page);
    if (s.oval && s.oval.buttons.policy.x && Math.abs(s.player.x - s.oval.buttons.policy.x) < 60) break;
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.up('ArrowRight');
  }
  await page.keyboard.press('e'); await page.waitForTimeout(1400);
  s = await snap(page);
  console.log('  oval snapshot:', JSON.stringify({policy:s.oval&&s.oval.policyTitle, px:Math.round(s.player.x)}));
  check('oval policy valgt', !!(s.oval && s.oval.policyTitle), s.oval?`title=${s.oval.policyTitle}`:'');
  await page.screenshot({ path: SP + '/rg_std_oval.png' });
  check('0 pageerrors (std)', errs.length === 0, errs.join(' | '));
  await page.close();
}

// ---------- 3) iPhone 390x844 — stage skal være OFF, touch virker ----------
{
  const page = await browser.newPage({ viewport:{width:390,height:844}, hasTouch:true, isMobile:true });
  const errs = []; page.on('pageerror', e=>errs.push(e.message));
  await page.goto(FILE);
  await page.tap('#start-btn');
  await page.waitForTimeout(2800);
  await page.keyboard.press('e'); await page.waitForTimeout(400); // luk GL-startskilt
  let s = await snap(page);
  console.log('MOBIL stage:', JSON.stringify(s.stage));
  check('stage OFF på mobil', s.stage && s.stage.on === false);
  check('scene greenland (mobil)', s.scene === 'greenland');

  // touch-hold for at gå til højre, så tap på nærmeste
  await page.touchscreen.tap(300, 500); // intent-tap i gå-retningen
  await page.waitForTimeout(2200);
  s = await snap(page);
  check('touch-bevægelse virker', s.player.x !== 200, `player.x=${Math.round(s.player.x)}`);
  await page.screenshot({ path: SP + '/rg_mob_greenland.png' });
  check('0 pageerrors (mobil)', errs.length === 0, errs.join(' | '));
  await page.close();
}

await browser.close();
console.log(fail === 0 ? '\nALLE TJEK GRØNNE' : `\n${fail} TJEK FEJLEDE`);
process.exit(fail === 0 ? 0 : 1);
