const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');

// usage: node proposed-shoot.cjs <id>=<file>[!click-selector] ...
const OUT = 'C:/Users/drizz/.coord/archipelia/review/components';
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const spec of process.argv.slice(2)) {
    const [id, rest] = spec.split('=');
    const [file, click] = rest.split('!');
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
    page.on('pageerror', (e) => errors.push(`${id}: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`${id}: ${m.text().slice(0, 300)}`); });
    await page.goto(`http://localhost:4420/#/canvas/${id}`, { waitUntil: 'load' });
    try {
      await page.waitForSelector('.spike-shot', { timeout: 60000 });
    } catch {
      console.log('FAIL', id); await page.close(); continue;
    }
    await page.evaluate(() => { document.documentElement.dataset.palette = 'archipelia'; });
    await page.waitForTimeout(800);
    if (click) { await page.locator(click).first().click(); await page.waitForTimeout(500); }
    const shot = page.locator('.spike-shot').first();
    const box = await shot.boundingBox();
    const menus = await page.evaluate(() => [...document.querySelectorAll('[role="menu"],[role="listbox"]')].map((m) => m.getBoundingClientRect().bottom));
    const bottom = Math.max(box.y + box.height, ...menus);
    await page.screenshot({ path: `${OUT}/${file}.png`, clip: { x: box.x, y: box.y, width: box.width, height: bottom - box.y + 8 }, fullPage: true });
    console.log('shot', id, '->', file, Math.round(box.width), 'x', Math.round(bottom - box.y));
    await page.close();
  }
  if (errors.length) console.log('ERRORS\n' + [...new Set(errors)].slice(0, 30).join('\n'));
  await browser.close();
})();
