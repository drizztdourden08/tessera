/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tree } from '../src/composites/Tree';
import { flattenItems } from '../src/composites/Tree/behavior/flatten-items';
import { keptKeysOf } from '../src/composites/Tree/behavior/kept-keys-of';
import { topKeysOf } from '../src/composites/Tree/behavior/top-keys-of';
import { treeKeyMove } from '../src/composites/Tree/behavior/tree-key-move';

const file = (id) => ({ id, name: id });
const folder = (id, children) => ({ id, name: id, children });
const ITEMS = [folder('a', [file('a1'), file('a2')]), folder('b', [file('b1')]), file('c')];

const base = { getKey: (item) => item.id, getChildren: (item) => item.children, isBranch: (item) => item.children !== undefined };
const flat = (open = [], extra = {}) => flattenItems(ITEMS, { ...base, open: new Set(open), loading: new Set(), kept: null, ...extra });
const keysOf = (rows) => rows.map((row) => row.key);

describe('Tree rows', () => {
  it('lists the top level when nothing is open and the children of what is open', () => {
    expect(keysOf(flat())).toEqual(['a', 'b', 'c']);
    expect(keysOf(flat(['a']))).toEqual(['a', 'a1', 'a2', 'b', 'c']);
  });

  it('says level, place, branch and open for each row', () => {
    const rows = flat(['a']);
    expect(rows[2]).toMatchObject({ key: 'a2', depth: 2, position: 2, setSize: 2, parentKey: 'a', branch: false, ancestors: ['a'] });
    expect(rows[0]).toMatchObject({ branch: true, expanded: true, loaded: true });
    expect(rows[3]).toMatchObject({ branch: true, expanded: false });
  });

  it('marks a folder without children as not loaded and as loading while its key is listed', () => {
    const lazy = [{ id: 'l', name: 'l', children: undefined }];
    const rows = flattenItems(lazy, { ...base, isBranch: () => true, open: new Set(['l']), loading: new Set(['l']), kept: null });
    expect(rows[0]).toMatchObject({ branch: true, loaded: false, expanded: true, loading: true });
  });

  it('keeps the matches and the folders above them, opened', () => {
    const { kept, forced } = keptKeysOf(ITEMS, { ...base, filter: (item) => item.id === 'a2' });
    expect([...kept].sort()).toEqual(['a', 'a2']);
    expect([...forced]).toEqual(['a']);
    const rows = flat([], { open: forced, kept });
    expect(keysOf(rows)).toEqual(['a', 'a2']);
    expect(rows[1]).toMatchObject({ position: 1, setSize: 1 });
  });

  it('keeps a folder that matches by itself without its other children', () => {
    const { kept } = keptKeysOf(ITEMS, { ...base, filter: (item) => item.id === 'b' });
    expect(keysOf(flat(['b'], { kept }))).toEqual(['b']);
  });

  it('keeps only the top of a picked set, not the children picked with their folder', () => {
    const rows = flat(['a', 'b']);
    expect(topKeysOf(rows, new Set(['a', 'a1', 'b1', 'c']))).toEqual(['a', 'b1', 'c']);
  });
});

describe('Tree keys', () => {
  const rows = flat(['a']);

  it('moves by a row, a page and to the ends, and stops there', () => {
    expect(treeKeyMove('ArrowDown', rows, 0)).toEqual({ kind: 'focus', index: 1 });
    expect(treeKeyMove('ArrowUp', rows, 0)).toEqual({ kind: 'focus', index: 0 });
    expect(treeKeyMove('PageDown', rows, 0, 3)).toEqual({ kind: 'focus', index: 3 });
    expect(treeKeyMove('PageDown', rows, 3, 9)).toEqual({ kind: 'focus', index: 4 });
    expect(treeKeyMove('End', rows, 0)).toEqual({ kind: 'focus', index: 4 });
  });

  it('opens a closed folder, enters an open one and goes up to the parent', () => {
    expect(treeKeyMove('ArrowRight', rows, 3)).toEqual({ kind: 'expand', key: 'b' });
    expect(treeKeyMove('ArrowRight', rows, 0)).toEqual({ kind: 'focus', index: 1 });
    expect(treeKeyMove('ArrowLeft', rows, 0)).toEqual({ kind: 'collapse', key: 'a' });
    expect(treeKeyMove('ArrowLeft', rows, 2)).toEqual({ kind: 'focus', index: 0 });
  });

  it('asks to open all the siblings with the star', () => {
    expect(treeKeyMove('*', rows, 1)).toEqual({ kind: 'siblings', key: 'a' });
    expect(treeKeyMove('*', rows, 3)).toEqual({ kind: 'siblings', key: null });
  });
});

const draw = (extra = {}) => renderToString(h(Tree, {
  label: 'Files', items: ITEMS, ...base, getLabel: (item) => item.name, defaultExpandedKeys: ['a'], ...extra,
}));

const hundred = (at) => Array.from({ length: 100 }, (_, inner) => file(`f${at}-${inner}`));
const BIG = Array.from({ length: 100 }, (_, at) => folder(`f${at}`, hundred(at)));

describe('Tree on the server', () => {
  it('draws a tree of tree items with level, place and open', () => {
    const html = draw();
    expect(html).toContain('role="tree"');
    expect(html).toContain('aria-label="Files"');
    expect((html.match(/role="treeitem"/g) ?? []).length).toBe(5);
    expect(html).toContain('aria-level="2"');
    expect(html).toContain('aria-posinset="2"');
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('aria-expanded="false"');
  });

  it('leaves the selection out without a selection prop and marks it with one', () => {
    expect(draw()).not.toContain('aria-selected');
    const html = draw({ selection: { selected: new Set(['a2']), onChange: () => undefined } });
    expect(html).toContain('aria-multiselectable="true"');
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('tree__row--selected');
    expect(draw({ selection: { selected: new Set(), onChange: () => undefined, mode: 'single' } })).not.toContain('aria-multiselectable');
  });

  it('keeps one tab stop, on the picked row', () => {
    const html = draw({ selection: { selected: new Set(['b']), onChange: () => undefined } });
    expect((html.match(/tabindex="0"/g) ?? []).length).toBe(1);
    expect(html).toMatch(/tabindex="0"[^>]*data-tree-key="b"|data-tree-key="b"[^>]*tabindex="0"/);
  });

  it('draws the guides only when asked', () => {
    expect(draw()).not.toContain('tree__guide');
    expect(draw({ guides: true })).toContain('tree__guide');
  });
});

describe('Tree slots, loading, a filter and many rows', () => {
  it('fills the three slots of a row and adds no toggle of its own', () => {
    const html = draw({
      renderLead: () => h('i', { className: 'lead-mark' }),
      renderLabel: (item) => h('b', null, `Name ${item.id}`),
      renderTrail: () => h('u', { className: 'trail-mark' }),
    });
    expect(html).toContain('lead-mark');
    expect(html).toContain('Name a1');
    expect(html).toContain('trail-mark');
    expect(html).not.toContain('role="switch"');
  });

  it('shows a spinner and aria-busy on a folder that loads', () => {
    const html = draw({ items: [{ id: 'l', name: 'l', children: undefined }], isBranch: () => true, defaultExpandedKeys: ['l'], loadingKeys: new Set(['l']) });
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('spinner');
  });

  it('draws the matches with the folders above them while a filter runs', () => {
    const html = draw({ defaultExpandedKeys: [], filter: (item) => item.id === 'b1' });
    expect((html.match(/role="treeitem"/g) ?? []).length).toBe(2);
    expect(html).toContain('data-tree-key="b1"');
  });

  it('says there is nothing to show for an empty tree', () => {
    const html = draw({ items: [], emptyLabel: 'No files' });
    expect(html).toContain('tree--empty');
    expect(html).toContain('No files');
  });

  it('draws only the first screen of 10,000 rows', () => {
    const html = draw({ items: BIG, defaultExpandedKeys: BIG.map((item) => item.id), selection: { selected: new Set(), onChange: () => undefined } });
    expect((html.match(/role="treeitem"/g) ?? []).length).toBeLessThan(60);
    expect(html).toContain('--tree-count:10100');
  });
});
