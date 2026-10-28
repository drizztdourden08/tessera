/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MillerColumns } from '../src/composites/MillerColumns';
import { columnsOf } from '../src/composites/MillerColumns/behavior/columns-of';
import { nextPath } from '../src/composites/MillerColumns/behavior/next-path';

const file = (id) => ({ id, name: id });
const folder = (id, children) => ({ id, name: id, children });
const ITEMS = [folder('a', [folder('a1', [file('x')]), file('a2')]), folder('b', []), file('c')];
const getKey = (item) => item.id;
const getChildren = (item) => item.children;

describe('the columns of a path', () => {
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

describe('the path after a pick', () => {
  it('replaces what is open from that column on with the one picked key', () => {
    expect(nextPath(['a', 'a1'], 1, new Set(['a2']))).toEqual(['a', 'a2']);
    expect(nextPath(['a', 'a1'], 0, new Set(['b']))).toEqual(['b']);
  });

  it('closes the columns after a pick of several or of none', () => {
    expect(nextPath(['a', 'a1'], 1, new Set(['a1', 'a2']))).toEqual(['a']);
    expect(nextPath(['a', 'a1'], 0, new Set())).toEqual([]);
  });
});

describe('MillerColumns on the server', () => {
  const draw = (extra = {}) => renderToString(h(MillerColumns, {
    label: 'Files', items: ITEMS, getKey, getChildren, renderItem: (item) => item.name, selection: { selected: new Set(), onChange: () => undefined }, ...extra,
  }));

  it('draws a group of columns, each a list box named with its number', () => {
    const html = draw({ defaultPath: ['a'] });
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Files"');
    expect(html).toContain('aria-label="Files 1"');
    expect(html).toContain('aria-label="Files 2"');
    expect((html.match(/role="listbox"/g) ?? []).length).toBe(2);
    expect(html).toContain('data-miller-column="1"');
  });

  it('marks a folder with a chevron and the open folder of a column', () => {
    const html = draw({ defaultPath: ['a'] });
    expect(html).toContain('miller-columns__chevron');
    expect(html).toContain('data-open="true"');
  });

  it('marks the picked keys with aria-selected and does not mark the open folder then', () => {
    const html = draw({ defaultPath: ['a'], selection: { selected: new Set(['a']), onChange: () => undefined } });
    expect(html).toContain('aria-selected="true"');
    expect(html).not.toContain('data-open');
  });
});
