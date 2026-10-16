/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { isUndoKey } from '../src/primitives/undo-stack/is-undo-key';
import { listKey } from '../src/composites/ItemList/behavior/list-key';
import { nearRow } from '../src/composites/ItemList/behavior/near-row';
import { pruneDeletes } from '../src/composites/ItemList/behavior/prune-deletes';
import { rowsShape } from '../src/composites/ItemList/behavior/rows-shape';
import * as pkg from '../src/index';

const SAVES = [
  { id: 'a', name: 'Before the palace' },
  { id: 'b', name: 'Hookshot in hand' },
  { id: 'c', name: 'Dark World start' },
];

const base = {
  title: 'Saves',
  items: SAVES,
  getId: (save) => save.id,
  getName: (save) => save.name,
  selectedId: 'b',
  onSelect: () => {},
  onDelete: () => {},
};

const draw = (props) => renderToStaticMarkup(h(ItemList, { ...base, ...props }));
const press = (key, target, more) => {
  const buttons = SAVES.map(() => ({ focus: vi.fn() }));
  const event = { key, target: buttons[target], preventDefault: vi.fn() };
  listKey({ event, buttons, rowIds: SAVES.map((save) => save.id), ...more });
  return { event, buttons };
};

describe('ItemList row actions', () => {
  it('draws rowActions before rename and delete, with the tabIndex and the selection of the row', () => {
    const seen = [];
    const rowActions = (save, row) => {
      seen.push([save.id, row.tabIndex, row.selected]);
      return h('button', { type: 'button', 'data-load': save.id, tabIndex: row.tabIndex }, 'Load');
    };
    const html = draw({ rowActions, onRename: () => {} });
    expect(seen).toEqual([['a', -1, false], ['b', undefined, true], ['c', -1, false]]);
    expect(html).toMatch(/<div class="item-list__tools"><button type="button" data-load="b">Load<\/button><button[^>]*aria-label="Rename Hookshot in hand"/);
  });

  it('counts rowActions for the action track when the buttons always show, and draws tools with rowActions alone', () => {
    const rowActions = () => 'x';
    expect(rowsShape({ ...base, onDelete: undefined, rowActions, actionVisibility: 'always' }, SAVES).action).toBe(true);
    expect(rowsShape({ ...base, onDelete: undefined, actionVisibility: 'always' }, SAVES).action).toBe(false);
    expect(draw({ onDelete: undefined, rowActions })).toContain('<div class="item-list__tools">x</div>');
  });
});

describe('ItemList delete with an Undo', () => {
  it('keeps the Delete question by default and draws a plain trash button with undoDelete', () => {
    expect(draw()).toContain('confirm-icon-btn');
    const html = draw({ undoDelete: 8000 });
    expect(html).not.toContain('confirm-icon-btn');
    expect(html).toMatch(/<button[^>]*aria-label="Delete Hookshot in hand"/);
  });

  it('binds Delete only when asked: it calls remove on the focused row and stops the key', () => {
    const remove = vi.fn();
    const { event } = press('Delete', 1, { remove });
    expect(remove).toHaveBeenCalledWith('b');
    expect(event.preventDefault).toHaveBeenCalled();
    const none = press('Delete', 1, {});
    expect(none.event.preventDefault).not.toHaveBeenCalled();
    const rename = vi.fn();
    press('F2', 2, { rename, remove });
    expect(rename).toHaveBeenCalledWith('c');
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('reads Ctrl+Z and Cmd+Z as undo, not with Shift or Alt', () => {
    expect(isUndoKey({ key: 'z', ctrlKey: true, metaKey: false, altKey: false, shiftKey: false })).toBe(true);
    expect(isUndoKey({ key: 'Z', ctrlKey: false, metaKey: true, altKey: false, shiftKey: false })).toBe(true);
    expect(isUndoKey({ key: 'z', ctrlKey: true, metaKey: false, altKey: false, shiftKey: true })).toBe(false);
    expect(isUndoKey({ key: 'z', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false })).toBe(false);
  });

  it('finds the next live row after a delete, or the one before at the end', () => {
    const order = ['a', 'b', 'c', 'd'];
    expect(nearRow(order, ['a', 'c', 'd'], 'b')).toBe('c');
    expect(nearRow(order, ['a', 'd'], 'b')).toBe('d');
    expect(nearRow(order, ['a', 'b'], 'd')).toBe('b');
    expect(nearRow(order, [], 'b')).toBeUndefined();
  });

  it('forgets a waiting or finished delete once its item leaves the list, and keeps the same state otherwise', () => {
    const state = { pending: ['a'], done: ['b'] };
    expect(pruneDeletes(state, new Set(['a', 'b', 'c']))).toBe(state);
    expect(pruneDeletes(state, new Set(['c']))).toEqual({ pending: [], done: [] });
  });
});

describe('useNameEdit', () => {
  it('is exported from the package for an inline rename of an app part', () => {
    expect(typeof pkg.useNameEdit).toBe('function');
  });
});
