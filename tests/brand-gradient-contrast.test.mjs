/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BRAND_APPS, BRAND_FAMILY } from '../src/brand/family.constants';
import { markContrast } from '../scripts/tokens/mark-contrast.mjs';

const GRAPHICS_CONTRAST = 3;

describe('brand gradients', () => {
  it.each(BRAND_APPS)('the %s mark reads at 3:1 or more on every stop of its gradient', (app) => {
    const svg = readFileSync(new URL(`../brand/${app}.svg`, import.meta.url), 'utf8');
    expect(Math.min(...markContrast(svg, BRAND_FAMILY[app].gradient.stops))).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST);
  });
});
