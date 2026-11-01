/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { columnsOf } from '../src/composites/MillerColumns/behavior/columns-of';
import { nextPath } from '../src/composites/MillerColumns/behavior/next-path';

const file = (id) => ({ id, name: id });
const folder = (id, children) => ({ id, name: id, children });
const ITEMS = [folder('a', [folder('a1', [file('x')]), file('a2')]), folder('b', []), file('c')];
const getKey = (item) => item.id;
const getChildren = (item) => item.children;

describe('K1 the columns of a path', { tags: ['critical'] }, () => {
  it('shows the first column alone when nothing is open', () => {
    const columns = columnsOf(ITEMS, [], getKey, getChildren);
    expect(columns).toHaveLength(1);
    expect(columns[0].items).toBe(ITEMS);
  });

  it('adds the children of each open folder as the next column', () => {
    const columns = columnsOf(ITEMS, ['a', 'a1'], getKey, getChildren);
    expect(columns.map((column) => column.items.map(getKey))).toEqual([['a', 'b', 'c'], ['a1', 'a2'], ['x']]);
    expect(columns.map((column) => column.openKey)).toEqual(['a', 'a1', undefined]);
  });

  it('shows an empty column for an empty folder and none for a leaf', () => {
    expect(columnsOf(ITEMS, ['b'], getKey, getChildren)).toHaveLength(2);
    expect(columnsOf(ITEMS, ['c'], getKey, getChildren)).toHaveLength(1);
  });

  it('ignores a key that is not in its column', () => {
    expect(columnsOf(ITEMS, ['missing', 'a'], getKey, getChildren)).toHaveLength(1);
  });
});

describe('K1 the path after a pick', { tags: ['critical'] }, () => {
  it('replaces what is open from that column on with the one picked key', () => {
    expect(nextPath(['a', 'a1'], 1, new Set(['a2']))).toEqual(['a', 'a2']);
    expect(nextPath(['a', 'a1'], 0, new Set(['b']))).toEqual(['b']);
  });

  it('closes the columns after a pick of several or of none', () => {
    expect(nextPath(['a', 'a1'], 1, new Set(['a1', 'a2']))).toEqual(['a']);
    expect(nextPath(['a', 'a1'], 0, new Set())).toEqual([]);
  });
});
