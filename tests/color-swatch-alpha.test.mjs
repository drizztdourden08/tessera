/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { ColorSwatch } from '../src/primitives/ColorSwatch';
import { colorAlpha } from '../src/primitives/ColorSwatch/behavior/color-alpha';

vi.mock('../src/primitives/field-control/useControlSize', () => ({ useControlSize: () => 'md' }));

const classOf = (props) => ColorSwatch.render({ ...props }, null).props.className.split(' ');

describe('ColorSwatch alpha', () => {
  it('reads the alpha of hex, rgb, hsl and keyword colours, and calls the rest opaque', () => {
    expect(colorAlpha('#38a048')).toBe(1);
    expect(colorAlpha('#38a')).toBe(1);
    expect(colorAlpha('#38a04800')).toBe(0);
    expect(colorAlpha('#38a048ff')).toBe(1);
    expect(colorAlpha('#0008')).toBeCloseTo(0.533, 2);
    expect(colorAlpha('rgba(0, 0, 0, 0.25)')).toBe(0.25);
    expect(colorAlpha('rgb(0 0 0 / 50%)')).toBe(0.5);
    expect(colorAlpha('hsl(120 40% 40% / 0.2)')).toBe(0.2);
    expect(colorAlpha('rgb(255, 0, 0)')).toBe(1);
    expect(colorAlpha('transparent')).toBe(0);
    expect(colorAlpha('tomato')).toBe(1);
  });

  it('draws the checkerboard class only when the colour is translucent', () => {
    expect(classOf({ color: '#38a04880' })).toContain('color-swatch--translucent');
    expect(classOf({ color: 'rgba(56, 160, 72, 0.5)' })).toContain('color-swatch--translucent');
    expect(classOf({ color: '#38a048' })).not.toContain('color-swatch--translucent');
    expect(classOf({ color: '#38a048ff' })).not.toContain('color-swatch--translucent');
    expect(classOf({ color: 'rgb(56, 160, 72)' })).not.toContain('color-swatch--translucent');
  });

  it('lays the colour over the checkerboard as a tint, and fills an opaque colour directly', () => {
    expect(ColorSwatch.render({ color: '#38a04880' }, null).props.style).toEqual({ '--swatch-tint': '#38a04880' });
    expect(ColorSwatch.render({ color: '#38a048' }, null).props.style).toEqual({ background: '#38a048' });
    expect(classOf({ color: '#38a04880', transparent: true })).not.toContain('color-swatch--translucent');
  });

  it('shares the checker tokens with the transparent swatch', () => {
    const css = readFileSync('src/primitives/ColorSwatch/ColorSwatch.css', 'utf8');
    expect(css).toMatch(/\.color-swatch--transparent,\s*\.color-swatch--translucent \{[^}]*var\(--c-checker-a\)[^}]*var\(--swatch-tint, transparent\)[^}]*var\(--checker-size\)/s);
  });
});

describe('ColorSwatch menu pass-through', () => {
  it('hands onContextMenu and onKeyDown to its button', () => {
    const onContextMenu = vi.fn();
    const onKeyDown = vi.fn();
    const props = ColorSwatch.render({ color: '#ff0000', onContextMenu, onKeyDown }, null).props;
    expect(props.onContextMenu).toBe(onContextMenu);
    expect(props.onKeyDown).toBe(onKeyDown);
  });
});
