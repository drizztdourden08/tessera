/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { GroupTree } from '../src/composites/GroupTree';
import { countItems } from '../src/composites/GroupTree/behavior/count-items';
import { groupEntriesOf } from '../src/composites/GroupTree/behavior/group-entries-of';
import { keysToDepth } from '../src/composites/GroupTree/behavior/keys-to-depth';
import { selectionKey } from '../src/composites/GroupTree/behavior/selection-key';
import { activeBranchOf } from '../src/composites/Tree/behavior/active-branch-of';
import { flattenItems } from '../src/composites/Tree/behavior/flatten-items';
import { treeKeyMove as treeMove } from '../src/composites/Tree/behavior/tree-key-move';

const leaf = (key, label, items = []) => ({ key, label, children: [], items });
const ROOT = {
  key: 'root', label: 'Servers', children: [
    { key: 'eu', label: 'Europe', children: [leaf('eu-1', 'Paris', ['ann', 'bob']), leaf('eu-2', 'Oslo', ['cat'])], items: [] },
    { key: 'us', label: 'America', children: [leaf('us-1', 'Austin', ['dan'])], items: ['eve'] },
  ], items: [],
};
const getItemKey = (item) => `p-${item}`;
const open = (...keys) => new Set(keys);
const entries = groupEntriesOf(ROOT, getItemKey);
const flatOf = (tree, keys) => flattenItems(tree.top, {
  getKey: (entry) => entry.key, getChildren: (entry) => entry.children, isBranch: (entry) => entry.kind === 'group',
  open: open(...keys), loading: new Set(), kept: null,
});
const flat = (keys) => flatOf(entries, keys);
const indexOf = (rows) => new Map(rows.map((row, at) => [row.key, at]));

describe('GroupTree rows', () => {
  it('lists only the top groups when nothing is open', () => {
    expect(flat([]).map((row) => row.key)).toEqual(['eu', 'us']);
  });

  it('lists the children of an open group before the next group', () => {
    expect(flat(['eu']).map((row) => row.key)).toEqual(['eu', 'eu-1', 'eu-2', 'us']);
  });

  it('puts the items of a group after its child groups, keyed by parent', () => {
    const rows = flat(['us', 'us-1']);
    expect(rows.map((row) => row.key)).toEqual(['eu', 'us', 'us-1', 'us-1::p-dan', 'us::p-eve']);
  });

  it('gives each row its depth, position, set size and ancestors', () => {
    const row = flat(['eu']).find((candidate) => candidate.key === 'eu-2');
    expect(row).toMatchObject({ depth: 2, position: 2, setSize: 2, parentKey: 'eu', ancestors: ['eu'] });
  });

  it('counts the items under a group unless the node says its own count', () => {
    expect(countItems(ROOT)).toBe(5);
    const rows = flatOf(groupEntriesOf({ ...ROOT, children: [{ ...ROOT.children[0], count: 99 }] }, getItemKey), []);
    expect(rows[0].item.count).toBe(99);
  });

  it('opens groups down to a depth', () => {
    expect(keysToDepth(ROOT, 0)).toEqual([]);
    expect(keysToDepth(ROOT, 1)).toEqual(['eu', 'us']);
    expect(keysToDepth(ROOT, 2)).toEqual(['eu', 'eu-1', 'eu-2', 'us', 'us-1']);
  });

  it('selects a group by its key and an item by its own key', () => {
    const rows = flat(['us', 'us-1']);
    expect(selectionKey(rows[1].item)).toBe('us');
    expect(selectionKey(rows[3].item)).toBe('p-dan');
  });

  it('marks the branch above the selected row', () => {
    const rows = flat(['us', 'us-1']);
    const branch = (key) => activeBranchOf(rows, indexOf(rows), key === null ? undefined : new Set(entries.bySelection.get(key) ?? []));
    expect([...branch('p-dan')]).toEqual(['us', 'us-1']);
    expect([...branch('us')]).toEqual(['us']);
    expect(branch('none').size).toBe(0);
    expect(branch(null).size).toBe(0);
  });
});

describe('GroupTree keys', () => {
  const rows = flat(['eu']);

  it('moves focus by a row and stops at both ends', () => {
    expect(treeMove('ArrowDown', rows, 0)).toEqual({ kind: 'focus', index: 1 });
    expect(treeMove('ArrowUp', rows, 0)).toEqual({ kind: 'focus', index: 0 });
    expect(treeMove('ArrowDown', rows, 3)).toEqual({ kind: 'focus', index: 3 });
  });

  it('jumps to the first and the last row', () => {
    expect(treeMove('Home', rows, 2)).toEqual({ kind: 'focus', index: 0 });
    expect(treeMove('End', rows, 0)).toEqual({ kind: 'focus', index: 3 });
  });

  it('opens a closed group with Right and goes into an open one', () => {
    expect(treeMove('ArrowRight', rows, 3)).toEqual({ kind: 'expand', key: 'us' });
    expect(treeMove('ArrowRight', rows, 0)).toEqual({ kind: 'focus', index: 1 });
  });

  it('does nothing with Right on an item', () => {
    const itemRows = flat(['us', 'us-1']);
    expect(treeMove('ArrowRight', itemRows, 3)).toEqual({ kind: 'none' });
  });

  it('closes an open group with Left and otherwise goes to the parent', () => {
    expect(treeMove('ArrowLeft', rows, 0)).toEqual({ kind: 'collapse', key: 'eu' });
    expect(treeMove('ArrowLeft', rows, 1)).toEqual({ kind: 'focus', index: 0 });
    expect(treeMove('ArrowLeft', rows, 3)).toEqual({ kind: 'none' });
  });

  it('selects with Enter and Space and ignores other keys', () => {
    expect(treeMove('Enter', rows, 2)).toEqual({ kind: 'select', index: 2 });
    expect(treeMove(' ', rows, 2)).toEqual({ kind: 'select', index: 2 });
    expect(treeMove('x', rows, 2)).toEqual({ kind: 'none' });
  });
});

describe('GroupTree markup', () => {
  const draw = (extra = {}) => renderToString(h(GroupTree, {
    root: ROOT, getItemKey, renderItem: (item) => `Player ${item}`, expandToDepth: 2, ...extra,
  }));

  it('draws a tree of tree items named after the root', () => {
    const html = draw();
    expect(html).toContain('role="tree"');
    expect(html).toContain('aria-label="Servers"');
    expect((html.match(/role="treeitem"/g) ?? []).length).toBe(10);
  });

  it('says level, set size, position and expanded state', () => {
    const html = draw();
    expect(html).toContain('aria-level="1"');
    expect(html).toContain('aria-level="2"');
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('aria-setsize="2"');
    expect(html).toContain('aria-posinset="2"');
  });

  it('keeps one tab stop and marks the selected row', () => {
    const html = draw({ selectedKey: 'us' });
    expect((html.match(/tabindex="0"/g) ?? []).length).toBe(1);
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('tree__row--selected');
  });

  it('shows counts unless told not to', () => {
    expect(draw()).toContain('group-tree__count');
    expect(draw({ showCounts: false })).not.toContain('group-tree__count');
  });

  it('hides the items of a closed group', () => {
    const html = draw({ expandToDepth: 0 });
    expect((html.match(/role="treeitem"/g) ?? []).length).toBe(2);
    expect(html).toContain('aria-expanded="false"');
  });

  it('says nothing to show for a tree without rows', () => {
    const html = renderToString(h(GroupTree, { root: leaf('r', 'Empty'), getItemKey, renderItem: String, emptyLabel: 'No players' }));
    expect(html).toContain('tree--empty');
    expect(html).toContain('No players');
  });

  it('draws the label of the item and the icon the app gives it', () => {
    const html = draw({ itemIcon: () => h('i', { className: 'mark' }) });
    expect(html).toContain('Player ann');
    expect(html).toContain('class="mark"');
  });
});
