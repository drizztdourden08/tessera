/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { foldedGroups } from '../src/composites/Toolbar/behavior/folded-groups';
import { nextStop } from '../src/composites/Toolbar/behavior/next-stop';
import { splitItems } from '../src/composites/Toolbar/behavior/split-items';
import { stopIds } from '../src/composites/Toolbar/behavior/stop-ids';
import { tabbableStop } from '../src/composites/Toolbar/behavior/tabbable-stop';

const ignore = () => undefined;
const button = (id, extra = {}) => ({ kind: 'button', id, label: id, icon: 'pencil', onSelect: ignore, ...extra });
const toggle = (id, extra = {}) => ({ kind: 'toggle', id, label: id, icon: 'eraser', pressed: false, onChange: ignore, ...extra });
const separator = (id) => ({ kind: 'separator', id });
const group = { kind: 'group', id: 'mirror', label: 'Mirror', value: 'off', onChange: ignore, choices: [
  { value: 'off', label: 'No mirror', icon: 'square' },
  { value: 'both', label: 'Both ways', icon: 'circle' },
] };
const number = { kind: 'number', id: 'size', label: 'Brush size', value: 2, min: 1, max: 16, onChange: ignore };

const ITEMS = [
  toggle('pencil', { shortcut: 'P', description: 'Draw one pixel at a time.' }),
  toggle('eraser'),
  separator('a'),
  button('undo', { shortcut: 'Ctrl+Z' }),
];

describe('K1 Toolbar roving focus', { tags: ['critical'] }, () => {
  it('moves along a row with Right and Left and wraps', () => {
    expect(nextStop('ArrowRight', 'horizontal', 0, 4)).toBe(1);
    expect(nextStop('ArrowLeft', 'horizontal', 0, 4)).toBe(3);
    expect(nextStop('ArrowRight', 'horizontal', 3, 4)).toBe(0);
  });

  it('moves along a column with Down and Up and ignores the other axis', () => {
    expect(nextStop('ArrowDown', 'vertical', 1, 4)).toBe(2);
    expect(nextStop('ArrowUp', 'vertical', 0, 4)).toBe(3);
    expect(nextStop('ArrowRight', 'vertical', 1, 4)).toBeNull();
    expect(nextStop('ArrowDown', 'horizontal', 1, 4)).toBeNull();
  });

  it('goes to the ends with Home and End and stays put on a single stop', () => {
    expect(nextStop('Home', 'horizontal', 2, 4)).toBe(0);
    expect(nextStop('End', 'vertical', 1, 4)).toBe(3);
    expect(nextStop('ArrowRight', 'horizontal', 0, 1)).toBeNull();
  });

  it('leaves the arrow keys, Home and End to a number field and steps back on Escape', () => {
    expect(nextStop('ArrowRight', 'field', 2, 4)).toBeNull();
    expect(nextStop('Home', 'field', 2, 4)).toBeNull();
    expect(nextStop('Escape', 'field', 2, 4)).toBe(1);
  });

  it('keeps one tab stop on the focused item, or on the first when it is gone', () => {
    expect(tabbableStop(['a', 'b', 'c'], 'b')).toBe('b');
    expect(tabbableStop(['a', 'b', 'c'], 'gone')).toBe('a');
    expect(tabbableStop(['a', 'b', 'c'], null)).toBe('a');
  });

  it('lists the stops in order: handle, items with every choice of a group, then More', () => {
    expect(stopIds([ITEMS[0], separator('s'), group, number], true, true)).toEqual(['#handle', 'pencil', 'mirror:off', 'mirror:both', 'size', '#more']);
    expect(stopIds([ITEMS[0]], false, false)).toEqual(['pencil']);
  });
});

describe('K1 Toolbar overflow split', { tags: ['critical'] }, () => {
  it('shows every item when they all fit', () => {
    expect(splitItems(ITEMS, Number.POSITIVE_INFINITY)).toEqual({ shown: ITEMS, folded: [] });
    expect(splitItems(ITEMS, ITEMS.length).folded).toEqual([]);
  });

  it('folds the items past the fit, in order', () => {
    const { shown, folded } = splitItems(ITEMS, 2);
    expect(shown.map((item) => item.id)).toEqual(['pencil', 'eraser']);
    expect(folded.map((item) => item.id)).toEqual(['undo']);
  });

  it('drops a separator left at the end of the shown items or at the start of the folded ones', () => {
    expect(splitItems(ITEMS, 3).shown.map((item) => item.id)).toEqual(['pencil', 'eraser']);
    expect(splitItems(ITEMS, 2).folded[0].id).toBe('undo');
  });

  it('folds everything when nothing fits', () => {
    expect(splitItems(ITEMS, 0).shown).toEqual([]);
    expect(splitItems(ITEMS, -3).folded.map((item) => item.id)).toEqual(['pencil', 'eraser', 'a', 'undo']);
  });

  it('turns folded items into menu groups split at the separators', () => {
    const groups = foldedGroups([toggle('grid', { pressed: true, shortcut: 'Ctrl+G' }), separator('s'), button('undo'), group, number]);
    expect(groups.map((entry) => entry.items.length)).toEqual([1, 1, 2, 1]);
    expect(groups[0].items[0]).toMatchObject({ kind: 'check', checked: true, shortcut: 'Ctrl+G' });
    expect(groups[2]).toMatchObject({ label: 'Mirror' });
    expect(groups[2].items[0]).toMatchObject({ kind: 'radio', checked: true });
    expect(groups[2].items[1]).toMatchObject({ kind: 'radio', checked: false });
    expect(groups[3].items[0]).toMatchObject({ kind: 'slider', value: 2, min: 1, max: 16 });
  });

  it('keeps the options of a folded tool as a sub-menu that starts with the tool itself', () => {
    const options = [{ id: 'size', label: 'Size', items: [{ id: 'one', label: '1 px' }] }];
    const [entry] = foldedGroups([button('pencil', { options })])[0].items;
    expect(entry.children).toHaveLength(3);
    expect(entry.children[0]).toMatchObject({ label: 'pencil' });
    expect(entry.children[1]).toEqual({ separator: true });
    expect(entry.children[2]).toMatchObject({ label: '1 px' });
  });
});
});
