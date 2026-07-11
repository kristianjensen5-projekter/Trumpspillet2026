import { chromium } from 'playwright';
const FILE=new URL('../index.html', import.meta.url).href+'?resetMedals=1';
const browser=await chromium.launch({headless:true});
for (const [name,vp] of [['desk',{viewport:{width:1600,height:900}}],
                         ['mob',{viewport:{width:390,height:844},hasTouch:true,isMobile:true}]]){
  const page=await browser.newPage(vp);
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto(FILE);
  if (vp.hasTouch) await page.tap('#start-btn'); else await page.keyboard.press('Enter');
  await page.waitForTimeout(2600);
  await page.evaluate(()=>window.__tv2.cheat.finale());
  await page.waitForTimeout(1500);
  await page.screenshot({path:`out/fin_${name}_medals.png`});   // medaljer flyver ind
  await page.waitForTimeout(3600);
  await page.screenshot({path:`out/fin_${name}_ceremony.png`}); // to Trumps + medalje
  await page.waitForTimeout(2000);
  await page.screenshot({path:`out/fin_${name}_quips.png`});    // replikker + parade
  // videre til stats
  if (vp.hasTouch) await page.tap('canvas'); else await page.keyboard.press('e');
  await page.waitForTimeout(600);
  await page.screenshot({path:`out/fin_${name}_stats.png`});
  const s=await page.evaluate(()=>window.__tv2.snapshot());
  console.log(name.toUpperCase(), 'scene:', s.scene, '| errors:', errs.length?errs:'none');
  // KEEP GOVERNING: tast 2 / tap på højre knap
  if (!vp.hasTouch){
    await page.keyboard.press('2'); await page.waitForTimeout(400);
    const s2=await page.evaluate(()=>window.__tv2.snapshot());
    console.log('  efter KEEP GOVERNING: finale lukket, scene:', s2.scene);
  }
  await page.close();
}
await browser.close();
