// Drives the Stage story on the spike's dev server (:4410) through the brief's scenarios and records
// numbers and frame strips: interruption (blend vs hard cut), flip, move-to-x, extras fading.
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const { PNG } = require('X:/relic-of-the-past/node_modules/pngjs');
const OUT = path.resolve(__dirname, '../../stage-shots');
fs.mkdirSync(OUT, { recursive: true });

const strip = (pngs, file) => {
  const w = pngs[0].width;
  const h = pngs[0].height;
  const out = new PNG({ width: w * pngs.length, height: h });
  pngs.forEach((png, i) => PNG.bitblt(png, out, 0, 0, Math.min(w, png.width), Math.min(h, png.height), i * w, 0));
  fs.writeFileSync(path.join(OUT, file), PNG.sync.write(out));
};

const record = (page, actor, script, ms) => page.evaluate(async ([who, body, span]) => {
  const stage = window.mascotStage;
  const wrap = document.querySelectorAll('.mascot-stage__actor')[{ sentri: 0, flint: 1, pelago: 2 }[who]];
  const rig = wrap.querySelector('[data-motion-part="rig"]');
  const rows = [];
  const t0 = performance.now();
  const run = new (Object.getPrototypeOf(async () => {}).constructor)('stage', 'wait', body);
  const wait = (n) => new Promise((r) => setTimeout(r, n));
  const sample = () => {
    const m = new DOMMatrix(getComputedStyle(rig).transform);
    const exclaim = wrap.querySelector('[data-motion-part="exclaim"]');
    rows.push({ t: performance.now() - t0, a: m.a, b: m.b, d: m.d, e: m.e, f: m.f, x: wrap.getBoundingClientRect().x, ex: exclaim ? Number(getComputedStyle(exclaim).opacity) : 0, sx: new DOMMatrix(getComputedStyle(wrap.querySelector('svg')).transform).a });
    if (performance.now() - t0 < span) requestAnimationFrame(sample);
  };
  requestAnimationFrame(sample);
  await run(stage, wait);
  await wait(span + 50);
  return rows;
}, [actor, script, ms]);

const jumps = (rows, from, to) => {
  let worst = 0;
  for (let i = 1; i < rows.length; i += 1) {
    const [p, q] = [rows[i - 1], rows[i]];
    if (q.t < from || q.t > to) continue;
    const d = Math.max(Math.abs(q.a - p.a) * 20, Math.abs(q.b - p.b) * 20, Math.abs(q.d - p.d) * 20, Math.abs(q.e - p.e), Math.abs(q.f - p.f));
    worst = Math.max(worst, d);
  }
  return worst;
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('http://localhost:4410/#/canvas/brand-mascotstage--stage', { waitUntil: 'load' });
  await page.waitForFunction(() => window.mascotStage && document.querySelectorAll('.mascot-stage__actor').length === 3, null, { timeout: 60000 });
  await page.waitForTimeout(1000);
  const report = {};

  // 1. Interruption: spin, then alert-exclaim 700 ms in; blended versus a hard cut.
  const interrupt = (blend) => `stage.actor('sentri').play('spin'); await wait(700); stage.actor('sentri').play('alert-exclaim'${blend === 0 ? ', { blend: 0 }' : ''});`;
  const blended = await record(page, 'sentri', interrupt(), 1700);
  await page.waitForTimeout(2200);
  const cut = await record(page, 'sentri', interrupt(0), 1700);
  report.interrupt = {
    spinFrameToFrameWorst: jumps(blended, 150, 690),
    blendedWorstAroundCut: jumps(blended, 690, 1100),
    hardCutWorstAroundCut: jumps(cut, 690, 1100),
    exclaimOpacityRamp: blended.filter((r) => r.t > 690 && r.t < 1100).map((r) => [Math.round(r.t), Number(r.ex.toFixed(2))]),
  };
  await page.waitForTimeout(2200);

  // Frame strips at a quarter speed, so screenshots land close together in stage time.
  await page.evaluate(() => window.setStageSlow(true));
  await page.waitForTimeout(300);
  const box = async (who) => page.evaluate((i) => document.querySelectorAll('.mascot-stage__actor')[i].getBoundingClientRect().toJSON(), { sentri: 0, flint: 1, pelago: 2 }[who]);
  const shots = async (who, count, every, pad = 10, wide = 0) => {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const b = await box(who);
      const clip = { x: Math.max(0, b.x - pad - wide / 2), y: Math.max(0, b.y - pad), width: b.width + pad * 2 + wide, height: b.height + pad };
      list.push(PNG.sync.read(await page.screenshot({ clip })));
      await page.waitForTimeout(every);
    }
    return list;
  };
  await page.evaluate(() => { window.mascotStage.actor('sentri').play('spin'); setTimeout(() => window.mascotStage.actor('sentri').play('alert-exclaim'), 2800); });
  await page.waitForTimeout(2000);
  strip(await shots('sentri', 10, 150), 'interrupt-spin-to-alert.png');
  await page.waitForTimeout(4000);

  // 2. Flip: Flint turns to face left, then plays confused and working while facing left.
  await page.evaluate(() => { void window.mascotStage.actor('flint').face('left'); });
  strip(await shots('flint', 8, 110), 'flip-turn.png');
  await page.evaluate(() => { void window.mascotStage.actor('flint').play('confused', { loop: true }); });
  await page.waitForTimeout(3000);
  const leftConfused = await shots('flint', 1, 0);
  await page.evaluate(() => { void window.mascotStage.actor('flint').play('working', { loop: true }); });
  await page.waitForTimeout(2500);
  const leftWorking = await shots('flint', 1, 0);
  await page.evaluate(() => { void window.mascotStage.actor('flint').face('right'); });
  await page.waitForTimeout(1500);
  const rightWorking = await shots('flint', 1, 0);
  await page.evaluate(() => { void window.mascotStage.actor('flint').play('confused', { loop: true }); });
  await page.waitForTimeout(3000);
  const rightConfused = await shots('flint', 1, 0);
  strip([rightConfused[0], leftConfused[0], rightWorking[0], leftWorking[0]], 'flip-upright-symbols.png');

  // 3. Move to x: Pelago walks from its spot to near the left edge.
  const stageBox = await page.evaluate(() => document.querySelector('.mascot-stage').getBoundingClientRect().toJSON());
  await page.evaluate(() => window.setStageSlow(false));
  await page.waitForTimeout(300);
  await page.evaluate(() => { void window.mascotStage.actor('pelago').moveTo(140, { speed: 220 }); });
  const moveFrames = [];
  for (let i = 0; i < 8; i += 1) {
    moveFrames.push(PNG.sync.read(await page.screenshot({ clip: { x: stageBox.x, y: stageBox.y, width: stageBox.width, height: stageBox.height } })));
    await page.waitForTimeout(420);
  }
  const small = moveFrames.map((png) => png);
  const stacked = new PNG({ width: small[0].width, height: small[0].height * small.length });
  small.forEach((png, i) => PNG.bitblt(png, stacked, 0, 0, png.width, png.height, 0, i * png.height));
  fs.writeFileSync(path.join(OUT, 'move-to-x.png'), PNG.sync.write(stacked));

  // 4. Extras fading: Sentri sleeps (z letters), then turns happy: the z letters fade out.
  await page.evaluate(() => window.setStageSlow(true));
  await page.evaluate(() => { void window.mascotStage.actor('sentri').play('sleep', { loop: true }); });
  await page.waitForTimeout(6000);
  await page.evaluate(() => { void window.mascotStage.actor('sentri').play('happy-grin'); });
  strip(await shots('sentri', 8, 120), 'extras-fade-sleep-to-happy.png');

  fs.writeFileSync(path.join(OUT, 'scenarios.json'), JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report, null, 1));
  console.log('errors', errors);
  await browser.close();
})();
