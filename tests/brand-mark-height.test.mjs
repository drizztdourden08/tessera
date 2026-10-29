/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BrandMark, Logo } from '../src/brand';

const css = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

const viewBoxOf = (html) => html.match(/viewBox="([^"]+)"/)[1];

describe('brand mark height fit', () => {
  it('keeps the square box by default, so a wide mark is centred in a square', () => {
    const html = renderToString(h(BrandMark, { app: 'argus', size: 'md' }));
    expect(viewBoxOf(html)).toBe('67 52 1120 1120');
    expect(html).not.toContain('brand-mark--height');
  });

  it('draws a wide mark in its own view box when fit is height', () => {
    const html = renderToString(h(BrandMark, { app: 'argus', size: 'h26', fit: 'height' }));
    expect(viewBoxOf(html)).toBe('67 270 1120 684');
    expect(html).toContain('brand-mark--h26');
    expect(html).toContain('brand-mark--height');
  });

  it('leaves a square mark unchanged by the fit', () => {
    const square = renderToString(h(BrandMark, { app: 'archipelia', size: 'h39' }));
    const height = renderToString(h(BrandMark, { app: 'archipelia', size: 'h39', fit: 'height' }));
    expect(viewBoxOf(height)).toBe(viewBoxOf(square));
  });

  it('keeps the tile square for an app icon', () => {
    const html = renderToString(h(BrandMark, { app: 'archipelia', size: 'h26', fit: 'height', variant: 'app-icon' }));
    const [, , w, hh] = viewBoxOf(html).split(' ').map(Number);
    expect(w).toBe(hh);
  });

  it('ignores the fit at fill', () => {
    const html = renderToString(h(BrandMark, { app: 'argus', size: 'fill', fit: 'height' }));
    expect(html).not.toContain('brand-mark--height');
    expect(viewBoxOf(html)).toBe('67 52 1120 1120');
  });

  it('takes the height from a token and lets the width follow', () => {
    const style = css('brand/BrandMark/BrandMark.css');
    expect(style).toContain('.brand-mark--h26 {\n  --brand-mark-size: var(--brand-mark-h26);');
    expect(style).toContain('.brand-mark--h39 {\n  --brand-mark-size: var(--brand-mark-h39);');
    expect(style).toContain('.brand-mark--height { inline-size: auto; }');
    const tokens = css('tokens/size.css');
    expect(tokens).toContain('--brand-mark-h26: calc(26 * var(--size-1));');
    expect(tokens).toContain('--brand-mark-h39: calc(39 * var(--size-1));');
  });

  it('passes the fit through Logo and draws the same square by default', () => {
    const html = renderToString(h(Logo, { brand: 'argus', size: 'h39', fit: 'height' }));
    expect(viewBoxOf(html)).toBe('67 270 1120 684');
    const plain = renderToString(h(Logo, { brand: 'argus', size: 'md' }));
    expect(plain).toBe(renderToString(h(BrandMark, { app: 'argus', size: 'md' })));
  });
});

describe('size 22 token', () => {
  it('sits between 20 and 24 in the scale', () => {
    const scale = css('tokens/scale.css');
    expect(scale).toMatch(/--size-20: +20px;\n {2}--size-22: +22px;\n {2}--size-24: +24px;/);
  });
});
