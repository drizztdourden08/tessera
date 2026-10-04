const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const { createHash } = require('node:crypto');
const { writeFileSync, mkdirSync } = require('node:fs');

const OUT = 'C:/Users/drizz/.coord/archipelia/review/components';
const TMP = 'C:/Users/drizz/AppData/Local/Temp/claude/X--tessera/07c6d5dd-7798-400d-8b45-28019d8471c4/scratchpad/t03';
const PLAIN = '.field__label,.text--label{text-transform:none!important;letter-spacing:normal!important}';
const BIG = ':root{--text-xs:var(--size-12)!important}';
const VARIANTS = [
  { name: '10px-caps', css: '', size: '10px', caps: true },
  { name: '12px-caps', css: BIG, size: '12px', caps: true },
  { name: '10px-plain', css: PLAIN, size: '10px', caps: false },
  { name: '12px-plain', css: BIG + PLAIN, size: '12px', caps: false },
];
const SCREENS = process.argv.length > 2 ? process.argv.slice(2) : ['settings', 'form', 'widget', 'list'];
const SIZES = [{ w: 1920, h: 1080, suffix: '' }, { w: 960, h: 540, suffix: '-960' }];
const PROBES = { caption: '.text--caption', fieldLabel: '.field__label', textLabel: '.text--label', tag: '.tag', mono: '.stat-row__value[data-mono]' };

const measure = (page) => page.evaluate((probes) => {
  const out = { textXs: getComputedStyle(document.documentElement).getPropertyValue('--text-xs').trim() };
  for (const [key, sel] of Object.entries(probes)) {
    const el = document.querySelector(sel);
    out[key] = el ? `${getComputedStyle(el).fontSize} ${getComputedStyle(el).textTransform}` : 'none on screen';
  }
  return out;
}, PROBES);

const check = (m, v) => {
  const bad = [];
  if (m.textXs !== v.size) bad.push(`--text-xs ${m.textXs}`);
  for (const key of ['caption', 'tag', 'mono']) if (m[key] !== 'none on screen' && !m[key].startsWith(v.size)) bad.push(`${key} ${m[key]}`);
  for (const key of ['fieldLabel', 'textLabel']) {
    if (m[key] === 'none on screen') continue;
    if (!m[key].startsWith(v.size)) bad.push(`${key} ${m[key]}`);
    if (m[key].endsWith('uppercase') !== v.caps) bad.push(`${key} ${m[key]}`);
  }
  return bad;
};

(async () => {
  mkdirSync(TMP, { recursive: true });
  const browser = await chromium.launch();
  const log = [];
  for (const screen of SCREENS) {
    for (const size of SIZES) {
      const page = await browser.newPage({ viewport: { width: size.w, height: size.h }, deviceScaleFactor: 1 });
      await page.goto(`http://localhost:4420/#/canvas/spike-typescale--${screen}`, { waitUntil: 'load' });
      await page.waitForSelector('.spike-screen', { timeout: 60000 });
      await page.evaluate(() => {
        document.documentElement.dataset.palette = 'archipelia';
        const s = document.createElement('style'); s.id = 't03-variant'; document.head.appendChild(s);
      });
      const hashes = new Map();
      for (const v of VARIANTS) {
        await page.evaluate((css) => { document.getElementById('t03-variant').textContent = css; }, v.css);
        await page.waitForTimeout(500);
        const m = await measure(page);
        const bad = check(m, v);
        const file = `T-03-${screen}-${v.name}${size.suffix}.png`;
        log.push(`${file} ${JSON.stringify(m)}${bad.length ? ` WRONG: ${bad.join(', ')}` : ''}`);
        if (bad.length) continue;
        const buf = await page.screenshot();
        const md5 = createHash('md5').update(buf).digest('hex');
        if (hashes.has(md5)) { log.push(`  SAME IMAGE as ${hashes.get(md5)}, not written`); continue; }
        hashes.set(md5, file);
        writeFileSync(`${OUT}/${file}`, buf);
        writeFileSync(`${TMP}/${file}`, buf);
        log.push(`  wrote ${md5}`);
      }
      await page.close();
    }
  }
  console.log(log.join('\n'));
  await browser.close();
})();
