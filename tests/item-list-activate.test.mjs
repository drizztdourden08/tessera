/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { listKey } from '../src/composites/ItemList/behavior/list-key';
import { rowPick } from '../src/composites/ItemList/behavior/row-pick';
import { rowTabs } from '../src/composites/ItemList/behavior/row-tabs';
import { tabRow } from '../src/composites/ItemList/behavior/tab-row';
import { ListDetail } from '../src/composites/ListDetail';

const PROFILES = [
  { id: 'a', name: 'Weekly async' },
  { id: 'b', name: 'Casual run' },
  { id: 'c', name: 'First clear' },
];

const base = {
  title: 'Profiles',
  items: PROFILES,
  getId: (profile) => profile.id,
  getName: (profile) => profile.name,
  onRename: () => {},
  onDelete: () => {},
};

const draw = (props) => renderToStaticMarkup(h(ItemList, { ...base, ...props }));
const buttons = () => PROFILES.map(() => ({ focus: vi.fn() }));
const press = (key, list, target, more) => {
  const event = { key, target: list[target], preventDefault: vi.fn() };
  listKey({ event, buttons: list, rowIds: PROFILES.map((profile) => profile.id), ...more });
  return event;
};

describe('ItemList onActivate', () => {
  it('moves only the focus on the arrow keys, Home and End when onActivate is set', () => {
    const onSelect = vi.fn();
    const onActivate = vi.fn();
    const list = buttons();
    expect(press('ArrowDown', list, 0, { onSelect, onActivate }).preventDefault).toHaveBeenCalled();
    expect(list[1].focus).toHaveBeenCalled();
    press('End', list, 0, { onSelect, onActivate });
    expect(list[2].focus).toHaveBeenCalled();
    press('Home', list, 2, { onSelect, onActivate });
    press('ArrowUp', list, 1, { onSelect, onActivate });
    expect(list[0].focus).toHaveBeenCalledTimes(2);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onActivate).not.toHaveBeenCalled();
  });

  it('keeps the selection on the arrow keys without onActivate, and F2 renames either way', () => {
    const onSelect = vi.fn();
    const rename = vi.fn();
    press('ArrowDown', buttons(), 0, { onSelect });
    expect(onSelect).toHaveBeenCalledWith('b');
    press('F2', buttons(), 1, { onSelect, onActivate: vi.fn(), rename });
    expect(rename).toHaveBeenCalledWith('b');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('activates on a click, which Enter and Space raise on the row button, and selects too when onSelect is passed', () => {
    const onSelect = vi.fn();
    const onActivate = vi.fn();
    rowPick('b', { onActivate })();
    expect(onActivate).toHaveBeenCalledWith('b');
    rowPick('c', { onSelect, onActivate })();
    expect(onSelect).toHaveBeenCalledWith('c');
    expect(onActivate).toHaveBeenLastCalledWith('c');
    expect(rowPick('a', {})).toBeUndefined();
    const html = draw({ selectedId: 'a', onActivate });
    expect(html.match(/<button[^>]*class="pressable list-item-row__main"/g)).toHaveLength(3);
  });

  it('keeps one Tab stop on the focused row, else the current one, else the first', () => {
    expect(tabRow(['a', 'b', 'c'], 'c', 'a')).toBe('c');
    expect(tabRow(['a', 'b', 'c'], 'gone', 'b')).toBe('b');
    expect(tabRow(['a', 'b', 'c'], null, null)).toBe('a');
    expect(tabRow([], null, null)).toBeNull();
    const onActivate = () => {};
    expect(rowTabs({ onActivate }, 'b', 'b')).toEqual({ row: 0, tools: undefined });
    expect(rowTabs({ onActivate }, 'b', 'a')).toEqual({ row: -1, tools: -1 });
    const html = draw({ selectedId: 'b', onActivate });
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    expect(html).toMatch(/tabindex="0"[^>]*>.*?Casual run/);
  });
});

describe('ItemList actionVisibility', () => {
  it('shows rename and delete on every row, always on the picked one and on hover on the rest, by default', () => {
    const html = draw({ selectedId: 'a', onSelect: () => {} });
    for (const profile of PROFILES) expect(html).toContain(`aria-label="Delete ${profile.name}"`);
    expect(html.match(/list-item-row__action--always/g)).toHaveLength(1);
    expect(html.match(/list-item-row__action--hover/g)).toHaveLength(2);
    expect(html.indexOf('list-item-row__action--always')).toBeLessThan(html.indexOf('Casual run'));
  });

  it('shows them on every row with always, and on hover only with hover and no pick', () => {
    expect(draw({ selectedId: 'a', onActivate: () => {}, actionVisibility: 'always' }).match(/list-item-row__action--always/g)).toHaveLength(3);
    expect(draw({ actionVisibility: 'hover' }).match(/list-item-row__action--hover/g)).toHaveLength(3);
  });

  it('keeps the actions of rows other than the keyboard row out of the Tab order', () => {
    expect(rowTabs({ selectedId: 'a', onSelect: () => {} }, null, 'a')).toEqual({ row: undefined, tools: undefined });
    expect(rowTabs({ selectedId: 'a', onSelect: () => {} }, null, 'b')).toEqual({ row: undefined, tools: -1 });
    expect(rowTabs({}, null, 'b')).toEqual({ row: undefined, tools: undefined });
  });
});

describe('ListDetail with the activation of ItemList', () => {
  it('keeps every row a Tab stop and the arrow keys moving the selection', () => {
    const html = renderToStaticMarkup(h(ListDetail, { list: base, selectedId: 'a', onSelect: () => {}, detail: 'The editor' }));
    expect(html.match(/<button[^>]*class="pressable list-item-row__main"[^>]*>/g).join('')).not.toContain('tabindex');
    expect(html.match(/list-item-row__action--always/g)).toHaveLength(1);
    const onSelect = vi.fn();
    press('ArrowDown', buttons(), 1, { onSelect });
    expect(onSelect).toHaveBeenCalledWith('c');
  });
});
