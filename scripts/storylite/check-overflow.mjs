/* @layer tooling-scripts @kind entry */
/* global document, getComputedStyle, location */
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const STORIES = join(ROOT, 'stories');
const URL = process.env.GALLERY_URL ?? 'http://localhost:4400';
const WIDTHS = (process.env.OVERFLOW_WIDTHS ?? '1920,1440,1280,1100,1000').split(',').map(Number);
const FRAMES = '.overview__showcase, .overview__fit, .playground, .overview__section, .overview';

const loadPlaywright = () => {
  const from = process.env.PLAYWRIGHT_MODULE;
  try {
    return from ? createRequire(import.meta.url)(from) : createRequire(join(ROOT, 'package.json'))('playwright');
  } catch {
    console.error('check:overflow needs Playwright. Set PLAYWRIGHT_MODULE to the path of an installed playwright package.');
    return process.exit(2);
  }
};

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
));

const overviewIds = () => walk(STORIES).filter((file) => file.endsWith('.stories.tsx'))
  .filter((file) => /const meta = \{[^]*?\btitle: '/.test(readFileSync(file, 'utf8')))
  .map((file) => `${relative(STORIES, file).replace(/\.stories\.tsx$/, '').split(sep).join('-').toLowerCase()}--overview`);

const scrollsOrSpills = (frames) => {
  const root = document.documentElement;
  const wide = Math.max(root.scrollWidth - root.clientWidth, document.body.scrollWidth - document.body.clientWidth);
  const page = document.querySelector('.overview');
  if (!page) return ['the page drew no Overview'];
  const clips = (box) => getComputedStyle(box).overflowX !== 'visible';
  const frameOf = (el) => {
    for (let box = el.parentElement; box; box = box.parentElement) {
      if (box.matches(frames)) return box;
      if (clips(box) || getComputedStyle(box).position === 'fixed') return null;
    }
    return null;
  };
  const past = [...page.querySelectorAll('*')].filter((el) => {
    const style = getComputedStyle(el);
    if (style.position === 'fixed' || el.getBoundingClientRect().width < 2) return false;
    const frame = frameOf(el);
    if (!frame || clips(frame)) return false;
    const box = el.getBoundingClientRect();
    const edge = frame.getBoundingClientRect();
    return box.right > Math.min(edge.right, root.clientWidth) + 1 || box.left < Math.max(edge.left, 0) - 1;
  });
  return [
    ...(wide > 0 ? [`the page scrolls sideways by ${wide} px`] : []),
    ...past.slice(0, 3).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} runs past its frame`),
  ];
};

const frameOf = async (page) => (await page.$('iframe'))?.contentFrame();

const openPage = async (page, id) => {
  const old = await frameOf(page);
  await old?.evaluate(() => document.querySelectorAll('.overview').forEach((el) => { el.dataset.seen = ''; })).catch(() => undefined);
  await page.evaluate((hash) => { location.hash = hash; }, `#/story/${id}`);
  for (let tries = 0; tries < 60; tries += 1) {
    await page.waitForTimeout(250);
    const frame = await frameOf(page);
    const ready = await frame?.evaluate(() => document.querySelector('.overview:not([data-seen])') !== null).catch(() => false);
    if (ready) {
      await frame.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(700);
      return frame;
    }
  }
  return null;
};

const checkWidth = async (browser, width, ids) => {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(`${URL}/`, { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  const found = [];
  for (const id of ids) {
    const frame = await openPage(page, id);
    const problems = frame ? await frame.evaluate(scrollsOrSpills, FRAMES) : ['the page did not load'];
    problems.forEach((problem) => found.push(`${width} px  ${id}: ${problem}`));
  }
  await page.close();
  return found;
};

const main = async () => {
  const { chromium } = loadPlaywright();
  const ids = process.argv.slice(2).length > 0 ? process.argv.slice(2) : overviewIds();
  const browser = await chromium.launch();
  const found = (await Promise.all(WIDTHS.map((width) => checkWidth(browser, width, ids)))).flat();
  await browser.close();
  found.forEach((line) => console.log(line));
  console.log(found.length === 0 ? `No overflow on ${ids.length} Overview pages at ${WIDTHS.join(', ')} px.` : `${found.length} overflow problems.`);
  process.exitCode = found.length === 0 ? 0 : 1;
};

await main();
