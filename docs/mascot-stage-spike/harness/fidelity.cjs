// Seeks the approved WAAPI playback and the three candidates to the same times and diffs pixels.
// node harness/fidelity.cjs [all]
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const { PNG } = require('X:/relic-of-the-past/node_modules/pngjs');

const SCRATCH = path.resolve(__dirname, '../..');
const OUT = path.join(SCRATCH, 'fidelity');
fs.mkdirSync(OUT, { recursive: true });
const BRANDS = Object.fromEntries(Object.entries({ rotp: { name: 'Sentri', scale: 6 }, brock: { name: 'Flint', scale: 5 }, archipelia: { name: 'Pelago', scale: 4 } }).filter(([k]) => !process.env.ONLY || process.env.ONLY === k));
const CORE = ['idle', 'jump', 'spin', 'wave', 'working'];
const ALL = ['idle', 'move', 'jump', 'wave', 'scan', 'happy', 'alert', 'point', 'blink', 'link', 'idle-bounce', 'move-wobble', 'jump-hop', 'spin', 'happy-grin', 'alert-exclaim', 'default', 'content', 'curious', 'focused', 'sleep', 'love', 'working', 'idea', 'success', 'confused', 'worried', 'low-power', 'resting'];
const SAMPLES = 24;
const DRIVERS = (process.env.DRIVERS ?? 'waapi-again,stage-native,engine,engine-style,gsap,motion').split(',');

const diff = (a, b) => {
  if (a.width !== b.width || a.height !== b.height) return { size: true, pixels: a.width * a.height, max: 255 };
  let pixels = 0;
  let max = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    let m = 0;
    for (let c = 0; c < 4; c += 1) m = Math.max(m, Math.abs(a.data[i + c] - b.data[i + c]));
    if (m > 0) pixels += 1;
    if (m > max) max = m;
  }
  return { pixels, max, total: a.width * a.height };
};

const strip = (frames, file) => {
  const w = frames[0][0].width;
  const h = frames[0][0].height;
  const out = new PNG({ width: w * frames[0].length, height: h * frames.length });
  frames.forEach((row, r) => row.forEach((png, c) => PNG.bitblt(png, out, 0, 0, w, h, c * w, r * h)));
  fs.writeFileSync(file, PNG.sync.write(out));
};

(async () => {
  const clips = process.argv[2] === 'all' ? ALL : CORE;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 600 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('file://' + path.join(__dirname, 'out.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  const results = [];
  for (const [brand, info] of Object.entries(BRANDS)) {
    for (const clip of clips) {
      const { duration, loop } = await page.evaluate(([b, c, s]) => { window.PARK = true; return window.harness.setup(b, c, s); }, [brand, clip, info.scale]);
      const span = loop ? duration * 2 : duration;
      const row = { brand: info.name, clip, samples: 0, worst: {} };
      for (const d of DRIVERS) row.worst[d] = { pixels: 0, max: 0, framesDiffering: 0 };
      const stripFrames = [[], []];
      for (let k = 0; k < SAMPLES; k += 1) {
        const ms = Math.round(((k + 0.37) / SAMPLES) * span * 1000) / 1000;
        await page.evaluate((t) => window.harness.seek(t), ms);
        const shots = {};
        for (const name of ['waapi', ...DRIVERS]) shots[name] = PNG.sync.read(await page.locator(`[data-driver="${name}"] > svg`).screenshot());
        for (const d of DRIVERS) {
          const r = diff(shots.waapi, shots[d]);
          const w = row.worst[d];
          if (r.pixels > 0) w.framesDiffering += 1;
          w.pixels = Math.max(w.pixels, r.pixels);
          w.max = Math.max(w.max, r.max);
        }
        if (CORE.includes(clip) && k % 4 === 0) { stripFrames[0].push(shots.waapi); stripFrames[1].push(shots[DRIVERS.includes('stage-native') ? 'stage-native' : 'engine']); }
        row.samples += 1;
      }
      if (CORE.includes(clip)) strip(stripFrames, path.join(OUT, `${info.name.toLowerCase()}-${clip}.png`));
      results.push(row);
      console.log(info.name.padEnd(7), clip.padEnd(14), DRIVERS.map((d) => `${d}: ${row.worst[d].framesDiffering}/${SAMPLES} frames differ, worst ${row.worst[d].pixels}px max ${row.worst[d].max}`).join(' | '));
    }
  }
  fs.writeFileSync(path.join(OUT, `results-${clips === ALL ? 'all' : 'core'}-${DRIVERS.join('+')}.json`), JSON.stringify(results, null, 1));
  console.log('errors', errors.length, errors.slice(0, 5));
  await browser.close();
})();
