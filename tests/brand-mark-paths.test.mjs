/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, Logo } from '../src/brand';

const SIZES = ['sm', 'md', 'lg', 'xl', 'xxl'];

const pathCount = (html) => (html.match(/<path /g) ?? []).length;

describe('brand mark paths', () => {
  it.each(BRAND_APPS.flatMap((app) => SIZES.map((size) => [app, size])))('draws every path of %s at %s', (app, size) => {
    const html = renderToString(h(BrandMark, { app, size }));
    expect(html).toContain(`brand-mark--${size}`);
    expect(pathCount(html)).toBeGreaterThanOrEqual(BRAND_FAMILY[app].mark.paths.length);
  });

  it('draws the Archipelia mark from arcs, not the old polyline trace', () => {
    const { paths } = BRAND_FAMILY.archipelia.mark;
    expect(paths).toHaveLength(2);
    for (const p of paths) expect(p.d).toMatch(/A[\d.]+ [\d.]+ 0 [01] [01] /);
    expect(paths.map((p) => p.d).join('')).not.toContain('M539 351L543 352');
    const html = renderToString(h(Logo, { brand: 'archipelia', size: 'xxl', variant: 'app-icon' }));
    expect(html).toContain('brand-mark--xxl');
    for (const p of paths) expect(html).toContain(p.d);
  });

  it('writes the xxl size and rim as tokens', () => {
    const css = readFileSync(new URL('../src/tokens/size.css', import.meta.url), 'utf8');
    expect(css).toContain('--brand-mark-xxl: var(--size-256);');
    expect(css).toContain('--brand-rim-xxl:');
  });

  it('ships the redrawn mark in every Archipelia file', () => {
    const [dark, purple] = BRAND_FAMILY.archipelia.mark.paths;
    for (const file of ['archipelia.svg', 'archipelia/icon/icon.svg', 'light-rim/archipelia.svg', 'dark-ground/archipelia.svg']) {
      const svg = readFileSync(new URL(`../brand/${file}`, import.meta.url), 'utf8');
      expect(svg).toContain(dark.d);
      expect(svg).toContain(purple.d);
    }
  });
});
