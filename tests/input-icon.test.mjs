/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PressedGrid } from '../src/composites/PressedGrid';
import {
  GAMEPAD_INPUT_ICONS, INPUT_ICON_FAMILIES, INPUT_ICON_NAMES, INPUT_ICONS, InputIcon, gamepadInputIcon, inputIconData, isInputIconName,
} from '../src/primitives/InputIcon';

describe('InputIcon data', () => {
  it('holds every family RotP had, and every glyph draws something', () => {
    expect(Object.keys(INPUT_ICONS)).toEqual(['xbox', 'playstation', 'switch', 'gamecube', 'snes', 'generic', 'keyboard']);
    const total = Object.values(INPUT_ICONS).reduce((sum, set) => sum + Object.keys(set).length, 0);
    expect(total).toBe(283);
    for (const [family, set] of Object.entries(INPUT_ICONS)) {
      for (const name of Object.keys(set)) expect(inputIconData({ family, name })?.body.length).toBeGreaterThan(20);
    }
  });

  it('draws the pack in currentColor and keeps the highlights apart', () => {
    expect(inputIconData({ family: 'xbox', name: 'a' })?.body).toContain('fill="currentColor"');
    expect(inputIconData({ family: 'xbox', name: 'dpad-up' })?.body).toContain('class="input-icon__accent"');
    expect(Object.values(INPUT_ICONS.keyboard).join('')).not.toContain('#FFFFFF');
  });

  it('is vector geometry only: no bitmap, no texture, no blur filter', () => {
    const RASTER = /<image|data:image|<filter|filter=|<pattern|foreignObject|backdrop-filter/;
    for (const [family, set] of Object.entries(INPUT_ICONS)) {
      for (const name of Object.keys(set)) expect(inputIconData({ family, name })?.body, `${family}/${name}`).not.toMatch(RASTER);
    }
  });

  it('paints only what the art fills, so outline paths in the SNES art stay outlines', () => {
    for (const name of Object.keys(INPUT_ICONS.snes)) expect(inputIconData({ family: 'snes', name })?.body.startsWith('<g fill="none"')).toBe(true);
  });

  it('marks the pressed arm of every d-pad direction, in every family that has one', () => {
    const families = Object.keys(INPUT_ICONS).filter((family) => Object.hasOwn(INPUT_ICONS[family], 'dpad-up'));
    expect(families).toEqual(['xbox', 'playstation', 'switch', 'gamecube', 'snes', 'generic']);
    for (const family of families) {
      for (const way of ['up', 'down', 'left', 'right']) {
        const body = inputIconData({ family, name: `dpad-${way}` })?.body ?? '';
        expect(body.match(/class="input-icon__accent"/g), `${family}/dpad-${way}`).toHaveLength(1);
      }
    }
    expect(inputIconData({ family: 'generic', name: 'dpad' })?.body).not.toContain('input-icon__accent');
  });

  it('gives one object per glyph, so the effect samples stay cached', () => {
    expect(inputIconData({ family: 'switch', name: 'zl' })).toBe(inputIconData({ family: 'switch', name: 'zl' }));
    expect(inputIconData({ family: 'switch', name: 'nope' })).toBeNull();
  });

  it('draws through Icon with its tone class', () => {
    const html = renderToString(h(InputIcon, { family: 'gamecube', name: 'a', size: 32, tone: 'theme', label: 'A' }));
    expect(html).toContain('class="icon input-icon input-icon--theme"');
    expect(html).toContain('width="32"');
    expect(html).toContain('aria-label="A"');
  });
});

describe('the list of accepted names', () => {
  it('lists every family, in the order of the glyph data', () => {
    expect(INPUT_ICON_FAMILIES).toEqual(Object.keys(INPUT_ICONS));
    expect(Object.keys(INPUT_ICON_NAMES)).toEqual([...INPUT_ICON_FAMILIES]);
  });

  it('gives every listed name glyph data, and every glyph a listed name, once', () => {
    for (const family of INPUT_ICON_FAMILIES) {
      const listed = INPUT_ICON_NAMES[family];
      expect(new Set(listed).size, `${family} has a name twice`).toBe(listed.length);
      expect([...listed].sort(), family).toEqual(Object.keys(INPUT_ICONS[family]).sort());
    }
  });

  it('checks a name against its own family only', () => {
    expect(isInputIconName('xbox', 'lb')).toBe(true);
    expect(isInputIconName('playstation', 'lb')).toBe(false);
    expect(isInputIconName('keyboard', 'question')).toBe(true);
    expect(isInputIconName('xbox', 'toString')).toBe(false);
    expect(isInputIconName('atari', 'a')).toBe(false);
  });

  it('draws a question mark key for a name it does not know, and warns once', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const html = renderToString(h(InputIcon, { family: 'snes', name: 'lb', size: 24 }));
    renderToString(h(InputIcon, { family: 'snes', name: 'lb', size: 24 }));
    expect(html).toContain('input-icon--unknown');
    expect(html).toContain('<path');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain('"lb" in the "snes" family');
    warn.mockRestore();
  });
});

describe('matching a device id to a glyph', () => {
  it('reads SDL ids as positions', () => {
    expect(gamepadInputIcon('xbox', 'a')).toEqual({ family: 'xbox', name: 'a' });
    expect(gamepadInputIcon('switch', 'a')).toEqual({ family: 'switch', name: 'b' });
    expect(gamepadInputIcon('playstation', 'y')).toEqual({ family: 'playstation', name: 'triangle' });
    expect(gamepadInputIcon('gamecube', 'b')).toEqual({ family: 'gamecube', name: 'x' });
    expect(gamepadInputIcon('xbox', 'dpleft')).toEqual({ family: 'xbox', name: 'dpad-left' });
    expect(gamepadInputIcon('playstation', 'guide')).toBeNull();
    expect(gamepadInputIcon('generic', 'dpup')).toEqual({ family: 'generic', name: 'dpad-up' });
    expect(gamepadInputIcon('generic', 'dpright')).toEqual({ family: 'generic', name: 'dpad-right' });
  });

  it('reads KeyboardEvent.code for the keyboard', () => {
    expect(gamepadInputIcon('keyboard', 'KeyW')).toEqual({ family: 'keyboard', name: 'w' });
    expect(gamepadInputIcon('keyboard', 'Digit7')).toEqual({ family: 'keyboard', name: '7' });
    expect(gamepadInputIcon('keyboard', 'F11')).toEqual({ family: 'keyboard', name: 'f11' });
    expect(gamepadInputIcon('keyboard', 'ShiftRight')).toEqual({ family: 'keyboard', name: 'shift-icon' });
    expect(gamepadInputIcon('keyboard', 'IntlRo')).toBeNull();
  });

  it('names only glyphs that exist', () => {
    for (const [family, names] of Object.entries(GAMEPAD_INPUT_ICONS)) {
      for (const name of Object.values(names)) expect(Object.hasOwn(INPUT_ICONS[family], name)).toBe(true);
    }
  });
});

describe('PressedGrid cells', () => {
  it('draws the glyph of the family, an item icon over it, and the id when there is none', () => {
    const html = renderToString(h(PressedGrid, {
      family: 'playstation',
      pressed: ['a'],
      items: [{ id: 'a' }, { id: 'guide' }, { id: 'ok', label: 'OK', icon: { family: 'switch', name: 'a' } }],
    }));
    expect(html.match(/input-icon--theme/g)).toHaveLength(2);
    expect(html).toContain('>guide<');
    expect(html).toContain('>OK<');
    expect(html.match(/data-pressed/g)).toHaveLength(1);
  });

  it('keeps the old text cells without a family', () => {
    const html = renderToString(h(PressedGrid, { pressed: [], items: [{ id: 'a', label: 'A' }] }));
    expect(html).not.toContain('input-icon');
    expect(html).toContain('>A<');
  });
});
