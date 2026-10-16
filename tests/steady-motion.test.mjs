/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { STEADY_PARTS } from '../scripts/storylite/check-steady.constants.mjs';
import { EMPHASIS_DEFAULTS } from '../src/primitives/Emphasis/Emphasis.constants';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const filesIn = (dir, end) => readdirSync(new URL(`../${dir}`, import.meta.url), { recursive: true })
  .filter((file) => file.endsWith(end)).map((file) => `${dir}/${file.split(sep).join('/')}`);

const LAYOUT_FREE_PROPERTIES = /^(?:opacity|transform|translate|scale|rotate|filter|clip-path|stroke-dashoffset|color|background|box-shadow|--[\w-]+)$/;
const HELD_BY_A_PEAK_COPY = { 'emphasis-swell': ['font-weight'] };

const keyframesOf = (css) => [...css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*)\s*\}/g)]
  .map(([, name, body]) => ({ name, props: [...new Set([...body.matchAll(/([a-z-]+)\s*:/g)].map(([, prop]) => prop))] }));

const KEYFRAMES = ['splash.css', ...filesIn('src', '.css')].flatMap((file) => keyframesOf(read(file)).map((frames) => ({ file, ...frames })));

const pageIds = filesIn('stories', '.stories.tsx').map((file) => `${file.replace(/^stories\//, '').replace(/\.stories\.tsx$/, '').split('/').join('-').toLowerCase()}--overview`);

describe('animation keeps every box still', () => {
  it('finds the keyframes to check', () => {
    expect(KEYFRAMES.length).toBeGreaterThan(20);
  });

  it.each(KEYFRAMES)('$name in $file animates only properties that leave the layout alone', ({ name, props }) => {
    const moving = props.filter((prop) => !LAYOUT_FREE_PROPERTIES.test(prop) && !(HELD_BY_A_PEAK_COPY[name] ?? []).includes(prop));
    expect(moving).toEqual([]);
  });

  it('keeps Emphasis on a hidden copy at the peak weight by default', () => {
    expect(EMPHASIS_DEFAULTS.stable).toBe(true);
    expect(read('src/primitives/Emphasis/Emphasis.css')).toMatch(/\.emphasis__ghost \{\s*font-weight: var\(--emphasis-to\);\s*visibility: hidden;/);
  });

  it('draws the title bar status digits at one width, so a frame rate keeps its box as it ticks', () => {
    expect(read('src/composites/WindowTitleBar/WindowTitleBar.css')).toMatch(/\.window-title-bar__status \{[^}]*font-variant-numeric: tabular-nums;/);
  });

  it.each(STEADY_PARTS)('check:steady samples the $page gallery page, which exists', ({ page }) => {
    expect(pageIds).toContain(page);
  });
});
