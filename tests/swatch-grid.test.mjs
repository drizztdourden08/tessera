/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { SwatchGrid } from '../src/composites/SwatchGrid';
import { focusTarget } from '../src/composites/SwatchGrid/behavior/focus-target';
import { inRange } from '../src/composites/SwatchGrid/behavior/in-range';
import { pickIntent } from '../src/composites/SwatchGrid/behavior/pick-intent';
import { swatchName } from '../src/composites/SwatchGrid/behavior/swatch-name';
import { swatchPick } from '../src/composites/SwatchGrid/behavior/swatch-pick';
import { tabbableSwatch } from '../src/composites/SwatchGrid/behavior/tabbable-swatch';
import { SWATCH_GRID_STRINGS } from '../src/primitives/strings/swatch-grid-strings.constants';

const COLORS = [
  { id: 'ink', value: '#101018', label: 'Ink' },
  { id: 'green', value: '#00ff00' },
  { id: 'clear', value: null },
  { id: 'sky', value: 'rgb(60 120 220)', label: 'Sky' },
];

const draw = (props) => renderToString(h(SwatchGrid, { label: 'Palette', colors: COLORS, ...props }));

const buttonsOf = (html) => html.match(/<button[^>]*>/g) ?? [];

const attr = (tag, name) => new RegExp(` ${name}="([^"]*)"`).exec(tag)?.[1];

const keyEvent = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, ...held });

const noKeys = { shiftKey: false, ctrlKey: false, metaKey: false };

describe('SwatchGrid', () => {
  it('draws a named listbox with one option button per colour', () => {
    const html = draw();
    expect(html).toMatch(/<div[^>]*role="listbox"[^>]*aria-label="Palette"|<div[^>]*aria-label="Palette"[^>]*role="listbox"/);
    const buttons = buttonsOf(html);
    expect(buttons).toHaveLength(4);
    expect(buttons.map((tag) => attr(tag, 'role'))).toEqual(['option', 'option', 'option', 'option']);
    expect(buttons.map((tag) => attr(tag, 'data-swatch-key'))).toEqual(['ink', 'green', 'clear', 'sky']);
  });

  it('names each swatch by its label or its value, then its index', () => {
    const names = buttonsOf(draw()).map((tag) => attr(tag, 'aria-label'));
    expect(names).toEqual(['Ink, index 0', '#00ff00, index 1', 'Transparent, index 2', 'Sky, index 3']);
  });

  it('draws the transparent slot as a checkerboard with no colour', () => {
    const [ink, , clear] = buttonsOf(draw());
    expect(ink).toContain('background:#101018');
    expect(clear).toContain('color-swatch--transparent');
    expect(clear).not.toContain('background');
  });

  it('shows the 0-based index on each swatch and hides it on request', () => {
    const shown = draw();
    expect(shown.match(/color-swatch__caption/g)).toHaveLength(4);
    expect(shown).toMatch(/color-swatch__caption[^>]*>3</);
    expect(draw({ showIndex: false })).not.toContain('color-swatch__caption');
  });

  it('marks the selected swatch and keeps one tab stop on it', () => {
    const buttons = buttonsOf(draw({ selectedId: 'green' }));
    expect(buttons.map((tag) => attr(tag, 'aria-selected'))).toEqual(['false', 'true', 'false', 'false']);
    expect(buttons.map((tag) => attr(tag, 'tabindex'))).toEqual(['-1', '0', '-1', '-1']);
    expect(buttons[1]).toContain('color-swatch--selected');
  });

  it('puts the tab stop on the first swatch when nothing is selected', () => {
    expect(buttonsOf(draw()).map((tag) => attr(tag, 'tabindex'))).toEqual(['0', '-1', '-1', '-1']);
  });

  it('marks every swatch of a range, whichever way it runs, and not the others', () => {
    const forward = buttonsOf(draw({ selectedId: 'ink', range: { from: 0, to: 2 }, onRangeChange: () => undefined }));
    expect(forward.map((tag) => attr(tag, 'data-range'))).toEqual(['yes', 'yes', 'yes', undefined]);
    expect(forward.map((tag) => attr(tag, 'aria-selected'))).toEqual(['true', 'true', 'true', 'false']);
    const backward = buttonsOf(draw({ range: { from: 3, to: 1 } }));
    expect(backward.map((tag) => attr(tag, 'data-range'))).toEqual([undefined, 'yes', 'yes', 'yes']);
  });

  it('makes the list multiselectable only when a range can be made', () => {
    expect(draw({ onRangeChange: () => undefined })).toContain('aria-multiselectable="true"');
    expect(draw()).not.toContain('aria-multiselectable');
  });

  it('marks the secondary swatch and says so in its name', () => {
    const buttons = buttonsOf(draw({ selectedId: 'ink', secondaryId: 'sky' }));
    expect(buttons.map((tag) => attr(tag, 'data-secondary'))).toEqual([undefined, undefined, undefined, 'yes']);
    expect(attr(buttons[3] ?? '', 'aria-label')).toBe('Sky, index 3, secondary');
  });

});

describe('SwatchGrid layout and keys', () => {
  it('names the move chord only when the swatches can be moved', () => {
    expect(draw({ onMove: () => undefined })).toContain('aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown Alt+ArrowLeft Alt+ArrowRight"');
    expect(draw()).not.toContain('aria-keyshortcuts');
    expect(draw()).toContain('aria-live="polite"');
  });

  it('fits the columns to the width, or fixes them with columns', () => {
    expect(draw()).not.toContain('data-columns');
    const fixed = draw({ columns: 3 });
    expect(fixed).toContain('data-columns="3"');
    expect(fixed).toContain('repeat(3, 1fr)');
  });

  it('sizes the swatches from the size option', () => {
    expect(draw({ size: 'sm' })).toContain('data-size="sm"');
    expect(draw({ size: 'sm' })).toContain('color-swatch--sm');
    expect(draw({ size: 'md' })).toContain('color-swatch--md');
  });

  it('shows the empty message when there are no colours', () => {
    const html = draw({ colors: [], empty: 'No colours here.' });
    expect(html).toContain('No colours here.');
    expect(html).not.toContain('role="listbox"');
  });
});

describe('swatch picking', () => {
  const pickWith = (extra = {}) => {
    const calls = { onSelect: vi.fn(), onSecondarySelect: vi.fn(), onRangeChange: vi.fn() };
    const pick = swatchPick({ colors: COLORS, selectedIndex: 1, ...calls, ...extra });
    return { pick, calls };
  };

  it('picks the intent from the modifiers and from what the app listens to', () => {
    const can = { range: true, secondary: true };
    expect(pickIntent(noKeys, can)).toBe('select');
    expect(pickIntent({ ...noKeys, shiftKey: true }, can)).toBe('range');
    expect(pickIntent({ ...noKeys, ctrlKey: true }, can)).toBe('secondary');
    expect(pickIntent({ ...noKeys, metaKey: true }, can)).toBe('secondary');
    expect(pickIntent({ ...noKeys, shiftKey: true }, { range: false, secondary: true })).toBe('select');
    expect(pickIntent({ ...noKeys, ctrlKey: true }, { range: true, secondary: false })).toBe('select');
  });

  it('selects on a plain pick', () => {
    const { pick, calls } = pickWith();
    pick(3, noKeys);
    expect(calls.onSelect).toHaveBeenCalledWith('sky');
    expect(calls.onRangeChange).not.toHaveBeenCalled();
  });

  it('reports a range from the selected swatch to the picked one, backwards too', () => {
    const { pick, calls } = pickWith();
    pick(3, { ...noKeys, shiftKey: true });
    pick(0, { ...noKeys, shiftKey: true });
    expect(calls.onRangeChange).toHaveBeenNthCalledWith(1, 1, 3);
    expect(calls.onRangeChange).toHaveBeenNthCalledWith(2, 1, 0);
    expect(calls.onSelect).not.toHaveBeenCalled();
  });

  it('starts the range at the picked swatch when nothing is selected', () => {
    const { pick, calls } = pickWith({ selectedIndex: -1 });
    pick(2, { ...noKeys, shiftKey: true });
    expect(calls.onRangeChange).toHaveBeenCalledWith(2, 2);
  });

  it('picks the secondary swatch on Ctrl or Cmd', () => {
    const { pick, calls } = pickWith();
    pick(2, { ...noKeys, ctrlKey: true });
    expect(calls.onSecondarySelect).toHaveBeenCalledWith('clear');
    expect(calls.onSelect).not.toHaveBeenCalled();
  });

  it('ignores an index with no colour', () => {
    const { pick, calls } = pickWith();
    pick(9, noKeys);
    expect(calls.onSelect).not.toHaveBeenCalled();
  });
});

describe('swatch range, focus and names', () => {
  it('tells whether an index is in a range', () => {
    expect(inRange(1, undefined)).toBe(false);
    expect(inRange(2, { from: 1, to: 3 })).toBe(true);
    expect(inRange(2, { from: 3, to: 1 })).toBe(true);
    expect(inRange(4, { from: 1, to: 3 })).toBe(false);
  });

  it('moves focus in two dimensions and to the ends', () => {
    expect(focusTarget(keyEvent('ArrowRight'), 5, 20, 8)).toBe(6);
    expect(focusTarget(keyEvent('ArrowDown'), 5, 20, 8)).toBe(13);
    expect(focusTarget(keyEvent('ArrowUp'), 5, 20, 8)).toBeUndefined();
    expect(focusTarget(keyEvent('Home'), 9, 20, 8)).toBe(0);
    expect(focusTarget(keyEvent('End'), 9, 20, 8)).toBe(19);
  });

  it('keeps Shift on the focus move and leaves the Alt chord to the move', () => {
    expect(focusTarget(keyEvent('ArrowRight', { shiftKey: true }), 5, 20, 8)).toBe(6);
    expect(focusTarget(keyEvent('ArrowDown', { altKey: true }), 5, 20, 8)).toBeUndefined();
    expect(focusTarget(keyEvent('Home', { altKey: true }), 9, 20, 8)).toBeUndefined();
  });

  it('picks the focused swatch, then the selected one, then the first for the tab stop', () => {
    const ids = ['a', 'b', 'c'];
    expect(tabbableSwatch(ids, 'c', 'b')).toBe('c');
    expect(tabbableSwatch(ids, null, 'b')).toBe('b');
    expect(tabbableSwatch(ids, 'gone', 'gone')).toBe('a');
    expect(tabbableSwatch([], null, undefined)).toBeUndefined();
  });

  it('names a swatch by label, value or transparency, and marks the secondary one', () => {
    expect(swatchName(COLORS[0], 0, false, SWATCH_GRID_STRINGS)).toBe('Ink, index 0');
    expect(swatchName(COLORS[1], 1, true, SWATCH_GRID_STRINGS)).toBe('#00ff00, index 1, secondary');
    expect(swatchName(COLORS[2], 2, false, SWATCH_GRID_STRINGS)).toBe('Transparent, index 2');
  });
});
