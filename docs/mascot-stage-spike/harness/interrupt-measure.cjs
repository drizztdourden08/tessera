// Interrupts Sentri's spin at its back-facing moment (470 ms) with alert-exclaim, once blended and once
// as a hard cut (blend 0), and records the rig's horizontal scale and the "!" opacity every frame.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto('http://localhost:4410/#/canvas/brand-mascotstage--stage', { waitUntil: 'load' });
  await page.waitForFunction(() => window.mascotStage && document.querySelectorAll('.mascot-stage__actor').length === 3, null, { timeout: 60000 });
  await page.waitForTimeout(1000);
  const run = (blend) => page.evaluate(async (b) => {
    const wrap = document.querySelectorAll('.mascot-stage__actor')[0];
    const rig = wrap.querySelector('[data-motion-part="rig"]');
    const rows = [];
    const t0 = performance.now();
    let cutAt = 0;
    const sample = () => {
      const m = new DOMMatrix(getComputedStyle(rig).transform);
      const ex = wrap.querySelector('[data-motion-part="exclaim"]');
      rows.push([Math.round(performance.now() - t0), Number(m.a.toFixed(3)), Number(m.f.toFixed(2)), ex ? Number(Number(getComputedStyle(ex).opacity).toFixed(2)) : 0]);
      if (performance.now() - t0 < 1100) requestAnimationFrame(sample);
    };
    void window.mascotStage.actor('sentri').play('spin');
    requestAnimationFrame(sample);
    await new Promise((r) => setTimeout(r, 470));
    cutAt = Math.round(performance.now() - t0);
    void window.mascotStage.actor('sentri').play('alert-exclaim', b === null ? {} : { blend: b });
    await new Promise((r) => setTimeout(r, 900));
    let worst = 0;
    for (let i = 1; i < rows.length; i += 1) if (rows[i][0] >= cutAt) worst = Math.max(worst, Math.abs(rows[i][1] - rows[i - 1][1]));
    return { cutAt, worstScaleStepAfterCut: Number(worst.toFixed(3)), rows: rows.filter((r) => r[0] > cutAt - 60 && r[0] < cutAt + 300) };
  }, blend);
  const blended = await run(null);
  await page.waitForTimeout(2500);
  const cut = await run(0);
  const report = { blended, cut };
  fs.writeFileSync(path.resolve(__dirname, '../../stage-shots/interrupt-measure.json'), JSON.stringify(report, null, 1));
  for (const [name, r] of Object.entries(report)) {
    console.log(name, 'cut at', r.cutAt, 'ms; largest one-frame change of horizontal scale after the cut:', r.worstScaleStepAfterCut);
    console.log('  [ms, scaleX, y, ! opacity]', JSON.stringify(r.rows));
  }
  await browser.close();
})();
