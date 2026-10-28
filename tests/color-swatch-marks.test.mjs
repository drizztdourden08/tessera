/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ColorSwatch } from '../src/primitives/ColorSwatch';
import { swatchMarks } from '../src/primitives/ColorSwatch/behavior/swatch-marks';

const html = (props) => renderToStaticMarkup(h(ColorSwatch, { color: '#38a048', size: 'md', ...props }));
const css = readFileSync('src/primitives/ColorSwatch/ColorSwatch.css', 'utf8');

describe('ColorSwatch marks', () => {
  it('puts up to four marks in the corners, in order: top start, top end, bottom end, bottom start', () => {
    expect(swatchMarks(['1', '2', '3', '4']).map((mark) => mark.corner)).toEqual(['top-start', 'top-end', 'bottom-end', 'bottom-start']);
  });

  it('ignores marks past the fourth and skips empty slots without moving the others', () => {
    expect(swatchMarks(['1', '2', '3', '4', '5'])).toHaveLength(4);
    expect(swatchMarks(['1', null, undefined, '4']).map((mark) => [mark.corner, mark.content])).toEqual([['top-start', '1'], ['bottom-start', '4']]);
    expect(swatchMarks(undefined)).toEqual([]);
  });

  it('draws each mark as a span in its corner, with an ink that reads on the colour', () => {
    const dark = html({ color: '#f8f8f8', marks: ['1', '2'] });
    expect(dark).toContain('color-swatch__mark--top-start');
    expect(dark).toContain('color-swatch__mark--top-end');
    expect(dark).toContain('color-swatch__mark--ink-dark');
    expect(html({ color: '#202020', marks: ['1'] })).toContain('color-swatch__mark--ink-light');
  });

  it('draws no mark when none is given', () => {
    expect(html({})).not.toContain('color-swatch__mark');
  });
});

describe('ColorSwatch unused and mixed', () => {
  it('adds the unused class and a dashed look only when asked', () => {
    expect(html({ unused: true })).toContain('color-swatch--unused');
    expect(html({})).not.toContain('color-swatch--unused');
    expect(css).toMatch(/\.color-swatch--unused \{[^}]*border-style: dashed;/);
  });

  it('adds the mixed class and a dash, hidden from readers, only when asked', () => {
    const mixed = html({ mixed: true });
    expect(mixed).toContain('color-swatch--mixed');
    expect(mixed).toContain('color-swatch__mixed');
    expect(mixed).toContain('aria-hidden="true"');
    expect(html({})).not.toContain('color-swatch__mixed');
  });
});

describe('ColorSwatch fill', () => {
  it('keeps its fixed size by default and adds the fill class on request', () => {
    expect(html({})).not.toContain('color-swatch--fill');
    expect(html({ fill: true })).toContain('color-swatch--fill');
  });

  it('stretches to the width of its cell, square unless the cell sets another aspect', () => {
    const rule = /\.color-swatch--fill \{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(rule).toMatch(/width: 100%;/);
    expect(rule).toMatch(/height: auto;/);
    expect(rule).toMatch(/aspect-ratio: var\(--swatch-aspect, 1\);/);
    expect(css.indexOf('.color-swatch--fill {')).toBeGreaterThan(css.indexOf('.color-swatch {'));
  });
});

describe('ColorSwatch focus ring apart from selected', () => {
  it('keeps the inside ring by default and adds the apart class on request', () => {
    expect(html({})).not.toContain('color-swatch--ring-apart');
    expect(html({ focusRing: 'apart' })).toContain('color-swatch--ring-apart');
  });

  it('draws the selected ring inside and the focus ring outside, so both show together', () => {
    const selected = /\.color-swatch--ring-apart\.color-swatch--selected \{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(selected).toMatch(/outline: none;/);
    expect(selected).toMatch(/box-shadow: inset 0 0 0 var\(--border-width-thick\) var\(--c-primary\);/);
    const both = /\.color-swatch--ring-apart\.color-swatch--selected:focus-visible \{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(both).toMatch(/outline: var\(--border-width-thick\) solid var\(--c-text\);/);
    expect(both).toMatch(/outline-offset: var\(--border-width-thick\);/);
    expect(both).toContain('inset 0 0 0 var(--border-width-thick) var(--c-primary)');
  });
});
