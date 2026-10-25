/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { ColorSwatch } from '../src/primitives/ColorSwatch';

vi.mock('../src/primitives/field-control/useControlSize', () => ({ useControlSize: () => 'md' }));

describe('ColorSwatch focus', () => {
  const css = readFileSync('src/primitives/ColorSwatch/ColorSwatch.css', 'utf8');
  const focus = /\.color-swatch:focus-visible \{([^}]*)\}/.exec(css)?.[1] ?? '';

  it('draws a light ring over a dark one inside the swatch edge, so it shows on any swatch colour', () => {
    expect(focus).toMatch(/outline: var\(--border-width-thick\) solid var\(--c-text\);/);
    expect(focus).toMatch(/outline-offset: calc\(-1 \* var\(--border-width-thick\)\);/);
    expect(focus).toMatch(/box-shadow: inset 0 0 0 calc\(2 \* var\(--border-width-thick\)\) var\(--p-pure-black\);/);
    expect(focus).not.toContain('--c-primary');
  });
});

describe('ColorSwatch ref', () => {
  it('hands the ref to its button, so a popover can anchor to it', () => {
    const ref = { current: null };
    const element = ColorSwatch.render({ color: '#ff0000' }, ref);
    expect(element.type).toBe('button');
    expect(element.ref ?? element.props.ref).toBe(ref);
  });
});
