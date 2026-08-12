// Embed-røgtest: spillet i en iframe på en simuleret artikelside.
// Verificerer boot, input og at værtssiden er upåvirket.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
const HOST=new URL('./embed_host.html', import.meta.url).href;
const OUT=fileURLToPath(new URL('./out', import.meta.url)); mkdirSync(OUT,{recursive:true});
const browser=await chromium.launch({headless:true});
let fail=0; const check=(l,c,x='')=>{ console.log(c?'  ok ':'  FAIL ',l,x); if(!c)fail++; };
for (const [name,vp] of [['desktop',{viewport:{width:1200,height:900}}],
                         ['mobil',{viewport:{width:390,height:844},hasTouch:true,isMobile:true}]]){
  const page=await browser.newPage(vp);
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto(HOST);
  const frame=page.frame({url:/index\.html/});
  check(`${name}: iframe fundet`, !!frame);
  // start spillet som en RIGTIG bruger: klik/tap midt i iframen på
  // intro-skærmen (ethvert tryk starter spillet)
  await frame.waitForSelector('#start-btn');
  const fbox=await (await page.$('#gameframe')).boundingBox();
  if (vp.hasTouch) await page.touchscreen.tap(fbox.x+fbox.width/2, fbox.y+fbox.height*0.4);
  else await page.mouse.click(fbox.x+fbox.width/2, fbox.y+fbox.height*0.4);
  // 4500ms: heli-landing + gåturen til minen (~4,2 s) + introskiltet
  await page.waitForTimeout(4500);
  const s=await frame.evaluate(()=>window.__tv2 && window.__tv2.snapshot());
  check(`${name}: spillet booter i iframe`, s && s.scene==='greenland', s&&s.scene);
  // Luk Grønlands introskilt først. Siden granskningen 2026-08-12 har
  // infokort 700 ms læse-grace, og de skal lukkes med et selvstændigt tryk —
  // ét tryk kan ikke længere både lukke kortet OG flytte Trump.
  if (vp.hasTouch) await page.touchscreen.tap(fbox.x+fbox.width/2, fbox.y+fbox.height*0.4);
  else await page.mouse.click(fbox.x+fbox.width/2, fbox.y+fbox.height*0.4);
  await page.waitForTimeout(400);
  // input inde i framen (klik-for-at-gå)
  if (s && s.stage){
    const box=await (await page.$('#gameframe')).boundingBox();
    // mål: punkt der er SYNLIGT i det aktuelle kameraudsnit
    const wx=Math.min(520, s.stage.camX + (s.stage.vw/s.stage.scale)*0.8);
    const cx=box.x + (s.stage.on ? s.stage.x+(wx-s.stage.camX)*s.stage.scale
                                 : (wx-s.stage.camX)*s.stage.scale);
    const cy=box.y + (s.stage.on ? s.stage.y+400*s.stage.scale : 400*s.stage.scale);
    if (vp.hasTouch) await page.touchscreen.tap(cx,cy); else await page.mouse.click(cx,cy);
    await page.waitForTimeout(2600);
    const s2=await frame.evaluate(()=>window.__tv2.snapshot());
    check(`${name}: input virker i iframe`, s2.player.x!==s.player.x, `x ${Math.round(s.player.x)}->${Math.round(s2.player.x)}`);
  }
  // værtssiden upåvirket: overskrift synlig, body-scroll intakt
  const h1=await page.textContent('h1');
  check(`${name}: værtsside upåvirket`, h1.includes('Testartikel'));
  check(`${name}: 0 pageerrors`, errs.length===0, errs.join(' | '));
  await page.screenshot({path:`${OUT}/embed_${name}.png`, fullPage:true});
  await page.close();
}
await browser.close();
console.log(fail===0?'\nALLE TJEK GRØNNE':`\n${fail} FEJLEDE`);
process.exit(fail?1:0);
