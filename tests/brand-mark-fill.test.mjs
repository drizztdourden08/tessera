/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BrandMark, Logo, Mascot } from '../src/brand';

const css = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');

const rule = (source, selector) => {
  const from = source.indexOf(`${selector} {`);
  return from < 0 ? '' : source.slice(from, source.indexOf('}', from) + 1);
};

describe('fluid brand mark', () => {
  it('draws the fill class and no fixed size class', () => {
    const html = renderToString(h(BrandMark, { app: 'archipelia', size: 'fill' }));
    expect(html).toContain('brand-mark--fill');
    expect(html).not.toContain('brand-mark--xxl');
  });

  it('fills the inline size, stays square and takes an optional max from a token', () => {
    const fill = rule(css('brand/BrandMark/BrandMark.css'), '.brand-mark--fill');
    expect(fill).toContain('inline-size: 100%;');
    expect(fill).toContain('aspect-ratio: 1;');
    expect(fill).toContain('max-inline-size: var(--brand-mark-fill-max);');
    expect(css('tokens/size.css')).toContain('--brand-mark-fill-max: none;');
  });

  it('scales the rim with the mark as a share of its side', () => {
    const rim = css('brand/BrandRimPaths/BrandRimPaths.css');
    expect(rim).toContain('stroke-width: calc(2 * var(--brand-rim-fill));');
    expect(rim).toContain('vector-effect: none;');
    expect(css('tokens/size.css')).toMatch(/--brand-rim-fill: [\d.]+%;/);
    expect(renderToString(h(BrandMark, { app: 'brock', size: 'fill', rim: 'light' }))).toContain('brand-rim--light');
  });

  it('fills the mark and the wordmark of Logo.Combined', () => {
    for (const direction of ['inline', 'stacked']) {
      const html = renderToString(h(Logo.Combined, { brand: 'archipelia', size: 'fill', direction }));
      expect(html).toContain('logo-combined--fill');
      expect(html).toContain('brand-mark--fill');
      expect(html).toContain('pixel-wordmark--fill');
      expect(html).not.toContain('calc(var(--pixel-wordmark-size)');
    }
  });

  it('gives the mascot the same size', () => {
    const html = renderToString(h(Mascot, { brand: 'archipelia', size: 'fill' }));
    expect(html).toContain('mascot--fill');
    expect(rule(css('brand/Mascot/Mascot.css'), '.mascot--fill')).toContain('inline-size: 100%;');
    expect(rule(css('brand/AnimatedMascot/AnimatedMascot.css'), '.animated-mascot--fill')).toContain('inline-size: 100%;');
  });
});
