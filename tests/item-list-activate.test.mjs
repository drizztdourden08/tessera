/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { listKey } from '../src/composites/ItemList/behavior/list-key';
import { rowPick } from '../src/composites/ItemList/behavior/row-pick';
import { rowTabs } from '../src/composites/ItemList/behavior/row-tabs';
import { tabRow } from '../src/composites/ItemList/behavior/tab-row';

const PROFILES = [
  { id: 'a', name: 'Weekly async' },
  { id: 'b', name: 'Casual run' },
  { id: 'c', name: 'First clear' },
];

const buttons = () => PROFILES.map(() => ({ focus: vi.fn() }));
const press = (key, list, target, more) => {
  const event = { key, target: list[target], preventDefault: vi.fn() };
  listKey({ event, buttons: list, rowIds: PROFILES.map((profile) => profile.id), ...more });
  return event;
};

describe('K1 ItemList onActivate', { tags: ['critical'] }, () => {
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
  });

  it('keeps one Tab stop on the focused row, else the current one, else the first', () => {
    expect(tabRow(['a', 'b', 'c'], 'c', 'a')).toBe('c');
    expect(tabRow(['a', 'b', 'c'], 'gone', 'b')).toBe('b');
    expect(tabRow(['a', 'b', 'c'], null, null)).toBe('a');
    expect(tabRow([], null, null)).toBeNull();
    const onActivate = () => {};
    expect(rowTabs({ onActivate }, 'b', 'b')).toEqual({ row: 0, tools: undefined });
    expect(rowTabs({ onActivate }, 'b', 'a')).toEqual({ row: -1, tools: -1 });
  });
});

describe('K1 ItemList actionVisibility', { tags: ['critical'] }, () => {
  it('keeps the actions of rows other than the keyboard row out of the Tab order', () => {
    expect(rowTabs({ selectedId: 'a', onSelect: () => {} }, null, 'a')).toEqual({ row: undefined, tools: undefined });
    expect(rowTabs({ selectedId: 'a', onSelect: () => {} }, null, 'b')).toEqual({ row: undefined, tools: -1 });
    expect(rowTabs({}, null, 'b')).toEqual({ row: undefined, tools: undefined });
  });
});
