// Frame cost: the stage engine with 3/9/18/30 autonomous mascots against today's WAAPI playback
// (the Mascot Animations page: 29 AnimatedMascots of one brand). CDP metrics over 6 seconds per case.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const SECONDS = 6;

const measure = async (page) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Performance.enable');
  const read = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
  await page.evaluate(() => { if (window.__ticking) return; window.__ticking = true; window.__frames = 0; const tick = () => { window.__frames += 1; requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  const a = await read();
  const f0 = await page.evaluate(() => window.__frames);
  await page.waitForTimeout(SECONDS * 1000);
  const b = await read();
  const f1 = await page.evaluate(() => window.__frames);
  const frames = f1 - f0;
  const per = (k) => (((b[k] - a[k]) * 1000) / frames).toFixed(3);
  return { fps: (frames / SECONDS).toFixed(1), scriptMsPerFrame: per('ScriptDuration'), styleMsPerFrame: per('RecalcStyleDuration'), layoutMsPerFrame: per('LayoutDuration'), taskMsPerFrame: per('TaskDuration') };
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const rows = [];
  await page.goto('http://localhost:4410/#/canvas/brand-mascotstage--crowd', { waitUntil: 'load' });
  await page.waitForSelector('.mascot-stage__actor', { timeout: 60000 });
  for (const count of ['3', '9', '18', '30']) {
    await page.getByText(`${count} mascots`, { exact: true }).click();
    await page.getByText('Stage engine', { exact: true }).click();
    await page.waitForTimeout(2500);
    const m = await measure(page);
    const engine = await page.evaluate(() => document.querySelector('[data-testid="stage-stats"]')?.textContent);
    rows.push({ case: `stage engine, ${count}`, ...m, engineLine: engine });
    await page.getByText('Today: AnimatedMascot', { exact: true }).click();
    await page.waitForTimeout(2500);
    rows.push({ case: `today WAAPI, ${count}`, ...(await measure(page)) });
  }
  console.table(rows);
  fs.writeFileSync(path.resolve(__dirname, '../../stage-shots/perf.json'), JSON.stringify(rows, null, 1));
  await browser.close();
})();
