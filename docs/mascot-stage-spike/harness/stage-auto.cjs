// Narrows the stage (resize) and turns the autonomous mode on; records the event log and screenshots.
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const OUT = path.resolve(__dirname, '../../stage-shots');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('http://localhost:4410/#/canvas/brand-mascotstage--stage', { waitUntil: 'load' });
  await page.waitForFunction(() => window.mascotStage && document.querySelectorAll('.mascot-stage__actor').length === 3, null, { timeout: 60000 });
  await page.waitForTimeout(800);
  const frame = page.locator('[data-testid="stage-frame"]');
  await frame.screenshot({ path: path.join(OUT, 'stage-wide.png') });
  await frame.evaluate((el) => { el.style.width = '520px'; });
  await page.waitForTimeout(1200);
  await frame.screenshot({ path: path.join(OUT, 'stage-narrow.png') });
  const narrow = await page.evaluate(() => [...document.querySelectorAll('.mascot-stage__actor')].map((a) => Math.round(a.getBoundingClientRect().right)));
  await frame.evaluate((el) => { el.style.width = ''; });
  await page.getByText('Autonomous', { exact: true }).click();
  const events = [];
  const shots = [];
  for (let i = 0; i < 6; i += 1) {
    await page.waitForTimeout(5000);
    shots.push(path.join(OUT, `autonomy-${i}.png`));
    await frame.screenshot({ path: shots[shots.length - 1] });
  }
  const log = await page.evaluate(() => [...document.querySelectorAll('.stage-lab__log span, .stage-lab__log p, .stage-lab__log div')].map((n) => n.textContent).filter(Boolean));
  const stageRight = await page.evaluate(() => Math.round(document.querySelector('[data-testid="stage-frame"]').getBoundingClientRect().left + 520));
  fs.writeFileSync(path.join(OUT, 'autonomy-log.json'), JSON.stringify({ narrowActorRights: narrow, narrowStageRight: stageRight, log, errors }, null, 1));
  console.log({ narrow, stageRight, errors });
  console.log(log.slice(0, 12).join('\n'));
  await browser.close();
})();
