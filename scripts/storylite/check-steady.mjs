/* @layer tooling-scripts @kind entry */
import { STEADY_CYCLE_MS, STEADY_PARTS, STEADY_SLACK_PX } from './check-steady.constants.mjs';
import { loadPlaywright } from './load-playwright.mjs';
import { openOverview } from './open-overview.mjs';
import { sampleBoxes } from './sample-boxes.mjs';

const URL = process.env.GALLERY_URL ?? 'http://localhost:4400';

const checkPage = async (page, { page: id, parts }) => {
  const frame = await openOverview(page, id) ?? await openOverview(page, id);
  const moved = frame ? await frame.evaluate(sampleBoxes, { parts, ms: STEADY_CYCLE_MS, slack: STEADY_SLACK_PX }) : ['the page did not load'];
  return moved.map((line) => `${id}: ${line}`);
};

const main = async () => {
  const { chromium } = loadPlaywright(process.cwd(), 'check:steady');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${URL}/`, { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(3000);
  const found = [];
  for (const entry of STEADY_PARTS) found.push(...await checkPage(page, entry));
  await browser.close();
  found.forEach((line) => console.log(line));
  console.log(found.length === 0 ? `Every animated part on ${STEADY_PARTS.length} pages kept its box for ${STEADY_CYCLE_MS} ms.` : `${found.length} animated boxes moved.`);
  process.exitCode = found.length === 0 ? 0 : 1;
};

await main();
