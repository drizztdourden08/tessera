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

describe('Brock and Tessera mark redraw', () => {
  it.each([
    ['brock', 8, ['403 320L407 317', '579 337L582 343L583 352', '812 919L813 920']],
    ['tessera', 21, ['762 443L716 442L715 440', '863 267L866 272L865 279', '523 538L546 541L547 543']],
  ])('draws the %s mark from clean edges, not the old trace', (app, count, traceChunks) => {
    const { paths } = BRAND_FAMILY[app].mark;
    expect(paths).toHaveLength(count);
    const all = paths.map((p) => p.d).join('');
    for (const chunk of traceChunks) expect(all).not.toContain(chunk);
    const html = renderToString(h(Logo, { brand: app, size: 'xxl' }));
    expect(html).toContain('brand-mark--xxl');
    for (const p of paths) expect(html).toContain(p.d);
  });

  it('keeps the Brock faces meeting at shared corners', () => {
    const [body, , , side, shoulder, , top, accent] = BRAND_FAMILY.brock.mark.paths.map((p) => p.d);
    const first = (d) => d.slice(1, d.indexOf('L'));
    expect(first(accent)).toBe(first(side));
    expect(first(accent)).toBe(first(shoulder));
    expect(body).toContain(first(accent));
    expect(body).toContain(first(top));
  });

  it('ships the redrawn Brock and Tessera marks in every brand file', () => {
    const files = {
      brock: ['brock.svg', 'brock/icon/icon.svg', 'light-rim/brock.svg', 'dark-ground/brock.svg'],
      tessera: ['tessera.svg', 'light-rim/tessera.svg', 'dark-ground/tessera.svg'],
    };
    for (const [app, list] of Object.entries(files)) {
      for (const file of list) {
        const svg = readFileSync(new URL(`../brand/${file}`, import.meta.url), 'utf8');
        for (const p of BRAND_FAMILY[app].mark.paths) expect(svg).toContain(p.d);
      }
    }
  });
});
