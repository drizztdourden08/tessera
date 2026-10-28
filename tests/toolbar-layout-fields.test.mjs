/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import {
  createToolbarLayout, hideToolbar, migrateToolbarLayout, moveToolbar, setToolbarColumns, setToolbarItems,
} from '../src/composites/ToolbarDock';
import { toolbarSlotFields } from '../src/composites/ToolbarDock/behavior/toolbar-slot-fields';
import { DEFS, bar, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

const read = (extra) => migrateToolbarLayout(v2({ top: [[bar('a')]], left: [[bar('c')]] }, extra), DEFS);

describe('migrateToolbarLayout items', () => {
  it.each([
    ['keeps hidden ids of a known toolbar', { a: ['x', 'y'], c: ['z'] }, { a: ['x', 'y'], c: ['z'] }],
    ['drops an unknown toolbar', { a: ['x'], zzz: ['y'] }, { a: ['x'] }],
    ['drops ids that are not strings or are empty', { a: ['x', 3, '', null, 'y'] }, { a: ['x', 'y'] }],
    ['drops a repeated id', { a: ['x', 'x', 'y'] }, { a: ['x', 'y'] }],
    ['drops an entry with nothing valid', { a: [1], c: 'x', b: [] }, undefined],
    ['drops a map that is an array', [['x']], undefined],
    ['drops a map that is a string', 'x', undefined],
    ['drops a null map', null, undefined],
  ])('%s', (_name, items, expected) => {
    expect(read({ items }).items).toEqual(expected);
  });

  it('survives a JSON round trip', () => {
    const layout = read({ items: { a: ['x'] } });
    expect(migrateToolbarLayout(JSON.parse(JSON.stringify(layout)), DEFS).items).toEqual({ a: ['x'] });
  });
});

describe('migrateToolbarLayout columns', () => {
  it.each([
    ['keeps 1, 2 and auto', { a: 1, c: 2, b: 'auto' }, { a: 1, c: 2, b: 'auto' }],
    ['drops an unknown toolbar', { a: 2, zzz: 2 }, { a: 2 }],
    ['drops a count that is not allowed', { a: 3, c: '2', b: 0, d: null }, undefined],
    ['drops a map that is an array', [2], undefined],
    ['drops a null map', null, undefined],
  ])('%s', (_name, columns, expected) => {
    expect(read({ columns }).columns).toEqual(expected);
  });
});

describe('old layouts', () => {
  it('has neither field when the saved layout had none', () => {
    const layout = read({});
    expect('items' in layout).toBe(false);
    expect('columns' in layout).toBe(false);
  });

  it('has neither field after a v1 upgrade or a fresh layout', () => {
    const upgraded = migrateToolbarLayout({ v: 1, sides: { top: ['a'], left: ['c'] }, hidden: [], last: {} }, DEFS);
    expect('items' in upgraded).toBe(false);
    expect('columns' in upgraded).toBe(false);
    expect('items' in createToolbarLayout(DEFS)).toBe(false);
    expect('columns' in createToolbarLayout(DEFS)).toBe(false);
  });
});

describe('setToolbarItems', () => {
  it('sets the hidden ids of a toolbar and keeps the others', () => {
    const layout = setToolbarItems(setToolbarItems(createToolbarLayout(DEFS), 'b', ['q']), 'a', ['x', 'y']);
    expect(layout.items).toEqual({ b: ['q'], a: ['x', 'y'] });
  });

  it('returns the same layout when nothing changes', () => {
    const layout = setToolbarItems(createToolbarLayout(DEFS), 'a', ['x']);
    expect(setToolbarItems(layout, 'a', ['x'])).toBe(layout);
    expect(setToolbarItems(createToolbarLayout(DEFS), 'a', [])).toEqual(createToolbarLayout(DEFS));
  });

  it('removes the entry, and the field, when no id is left', () => {
    const layout = setToolbarItems(setToolbarItems(createToolbarLayout(DEFS), 'a', ['x']), 'a', []);
    expect('items' in layout).toBe(false);
  });

  it('survives hide and move, and does not change the input', () => {
    const start = createToolbarLayout(DEFS);
    const layout = setToolbarItems(start, 'a', ['x']);
    expect(hideToolbar(layout, 'a').items).toEqual({ a: ['x'] });
    expect(moveToolbar(layout, 'a', 'right', 0).items).toEqual({ a: ['x'] });
    expect(start.items).toBeUndefined();
  });
});

describe('setToolbarColumns', () => {
  it('sets, changes and clears the count of a toolbar', () => {
    const two = setToolbarColumns(createToolbarLayout(DEFS), 'c', 2);
    expect(two.columns).toEqual({ c: 2 });
    expect(setToolbarColumns(two, 'c', 'auto').columns).toEqual({ c: 'auto' });
    expect('columns' in setToolbarColumns(two, 'c', undefined)).toBe(false);
  });

  it('returns the same layout when nothing changes', () => {
    const two = setToolbarColumns(createToolbarLayout(DEFS), 'c', 2);
    expect(setToolbarColumns(two, 'c', 2)).toBe(two);
    const empty = createToolbarLayout(DEFS);
    expect(setToolbarColumns(empty, 'c', undefined)).toBe(empty);
  });

  it('keeps the version and survives move', () => {
    const two = setToolbarColumns(createToolbarLayout(DEFS), 'c', 2);
    expect(two.v).toBe(2);
    expect(moveToolbar(two, 'c', 'right', 0).columns).toEqual({ c: 2 });
  });
});

describe('toolbarSlotFields', () => {
  it('gives the hidden items and the count of a toolbar, and nothing for the rest', () => {
    const layout = setToolbarColumns(setToolbarItems(createToolbarLayout(DEFS), 'a', ['x']), 'a', 2);
    expect(toolbarSlotFields(layout, 'a')).toEqual({ hiddenItems: ['x'], columns: 2 });
    expect(toolbarSlotFields(layout, 'b')).toEqual({});
    expect(toolbarSlotFields(createToolbarLayout(DEFS), 'a')).toEqual({});
  });
});
