const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');

const [,, base, outDir, ...names] = process.argv;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('response', (r) => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ' ' + r.url()); });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e.stack).slice(0, 900)));
  for (const spec of names) {
    const [name, rest] = spec.split('=');
    const [file, vw] = rest.split('@');
    await page.setViewportSize({ width: Number(vw || 1920), height: 1080 });
    await page.goto(`${base}/#${name}`, { waitUntil: 'load' });
    await page.reload({ waitUntil: 'load' });
    try {
      await page.waitForSelector('#shot', { timeout: 60000 });
    } catch (e) {
      console.log('FAIL', name, errors.join(' | '));
      continue;
    }
    await page.waitForTimeout(800);
    await page.locator('#shot').screenshot({ path: `${outDir}/${file}.png` });
    console.log('shot', name, '->', file);
  }
  if (errors.length) console.log('ERRORS: ' + [...new Set(errors)].slice(0, 20).join(' | '));
  await browser.close();
})();
