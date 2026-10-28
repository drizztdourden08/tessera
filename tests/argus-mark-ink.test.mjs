/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY, BrandMark, markInk } from '../src/brand';

const file = (path) => readFileSync(new URL(`../brand/${path}`, import.meta.url), 'utf8');

describe('the Argus mark draws in the colour of its surroundings', () => {
  it('fills every path with currentColor, so the app sets it', () => {
    const html = renderToString(h(BrandMark, { app: 'argus' }));
    expect(html.match(/fill="currentColor"/g)).toHaveLength(BRAND_FAMILY.argus.mark.paths.length);
  });

  it('turns currentColor into black or white for a file', () => {
    const { mark } = BRAND_FAMILY.argus;
    expect(markInk(mark, 'light').paths.every((p) => p.ink === '#000000')).toBe(true);
    expect(markInk(mark, 'dark').paths.every((p) => p.ink === '#ffffff')).toBe(true);
  });

  it('leaves a mark with no current ink as it is', () => {
    const { mark } = BRAND_FAMILY.tessera;
    expect(markInk(mark, 'dark')).toBe(mark);
  });

  it('writes black on light grounds and white on the dark ground in the icon files', () => {
    expect(file('argus.svg')).toContain('fill="#000000"');
    expect(file('argus.svg')).not.toContain('#ffffff');
    expect(file('dark-ground/argus.svg')).toContain('fill="#ffffff"');
    expect(file('dark-ground/argus.svg')).not.toContain('#000000');
  });
});
