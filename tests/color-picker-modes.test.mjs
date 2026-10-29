/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from '../src/composites/ColorPicker';

vi.mock('../src/primitives/field-control/useControlSize', () => ({ useControlSize: () => 'md' }));

const render = (props) => renderToStaticMarkup(h(ColorPicker, { value: '#3f8fd2', onChange: () => undefined, ...props }));

describe('ColorPicker model tabs', () => {
  it('keeps the wheel and the RGB boxes, with no tabs, when modes is left out', () => {
    const markup = render({});
    expect(markup).not.toContain('color-picker__modes');
    expect(markup).toContain('aria-label="R"');
    expect(markup).toContain('picker-wheel');
  });

  it('shows one tab per mode, in the order given', () => {
    const markup = render({ modes: ['oklch', 'rgb', 'hsv'] });
    expect(markup).toContain('color-picker__modes');
    expect(markup.indexOf('OKLCH')).toBeLessThan(markup.indexOf('RGB'));
    expect(markup.indexOf('RGB')).toBeLessThan(markup.indexOf('HSV'));
    expect(markup).toContain('role="tablist"');
  });

  it('opens on the first mode and drops the RGB boxes beside the hex field', () => {
    const markup = render({ modes: ['hsv', 'oklch', 'rgb'] });
    expect(markup).toContain('picker-wheel');
    expect(markup).toContain('aria-label="Hue"');
    expect(markup).not.toContain('aria-label="R"');
  });

  it('shows the lightness, chroma and hue sliders on the OKLCH tab, with no notice for a colour that fits', () => {
    const markup = render({ modes: ['oklch', 'hsv'], mode: 'oklch' });
    expect(markup).toContain('Lightness');
    expect(markup).toContain('Chroma');
    expect(markup).toContain('Hue');
    expect(markup).not.toContain('color-picker__gamut');
    expect(markup).not.toContain('picker-wheel');
  });

  it('shows the red, green and blue sliders on the RGB tab, and an alpha slider only when it can change', () => {
    const markup = render({ modes: ['rgb'], mode: 'rgb' });
    expect(markup).toContain('Red');
    expect(markup).toContain('Green');
    expect(markup).toContain('Blue');
    expect(markup).not.toContain('Alpha');
    expect(render({ modes: ['rgb'], mode: 'rgb', onAlphaChange: () => undefined })).toContain('Alpha');
    expect(render({ modes: ['rgb'], mode: 'rgb', onAlphaChange: () => undefined, disableAlpha: true })).not.toContain('Alpha');
  });
});

describe('ColorPicker slots', () => {
  it('draws the name slot under the title and the footer slot under the buttons', () => {
    const markup = render({ title: 'Skin', name: h('span', null, 'Name box'), footer: h('span', null, 'Used in 3 frames'), onClose: () => undefined });
    expect(markup.indexOf('Skin')).toBeLessThan(markup.indexOf('Name box'));
    expect(markup.indexOf('Name box')).toBeLessThan(markup.indexOf('picker-wheel'));
    expect(markup.indexOf('Done')).toBeLessThan(markup.indexOf('Used in 3 frames'));
  });

  it('draws neither slot when none is given', () => {
    const markup = render({});
    expect(markup).not.toContain('color-picker__name');
    expect(markup).not.toContain('color-picker__footer');
  });

  it('reaches the popover untouched, because the popover spreads every picker prop but onClose', () => {
    const source = readFileSync('src/composites/ColorPickerPopover/ColorPickerPopover.tsx', 'utf8');
    expect(source).toContain('const { open, anchorRef, onClose, ...pickerProps } = props;');
    expect(source).toContain('<ColorPicker {...pickerProps} onClose={onClose} />');
  });
});

const BASE = {
  value: '#3f8fd2',
  onChange: () => undefined,
  onAlphaChange: () => undefined,
  original: '#ff0000',
  swatchGroups: [{ label: 'Skin', colors: ['#f0d0a8', '#b86820'] }],
  onReset: () => undefined,
  onClose: () => undefined,
};

const buttonsOf = (markup) => [...markup.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].map((m) => ({ attrs: m[1], text: m[2].replace(/<[^>]*>/g, '').trim() }));

const named = (button) => /aria-label="[^"]+"|aria-labelledby="[^"]+"|title="[^"]+"/.test(button.attrs) || button.text !== '';

describe('ColorPicker accessible names', () => {
  it('names the current colour swatch with its hex', () => {
    const markup = render({ ...BASE, modes: ['hsv'] });
    expect(markup).toContain('aria-label="Current colour, #3f8fd2"');
  });

  it.each([['hsv'], ['rgb'], ['oklch']])('gives every button a name in %s mode', (mode) => {
    const markup = render({ ...BASE, modes: ['hsv', 'rgb', 'oklch'], mode });
    const buttons = buttonsOf(markup);
    expect(buttons.length).toBeGreaterThan(4);
    expect(buttons.filter((button) => !named(button))).toEqual([]);
  });

  it('gives every button a name with no modes', () => {
    const buttons = buttonsOf(render(BASE));
    expect(buttons.filter((button) => !named(button))).toEqual([]);
  });
});
