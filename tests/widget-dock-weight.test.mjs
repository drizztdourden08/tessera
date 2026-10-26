/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { createPane } from '../src/composites/DockLayout';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';
import { dockOnEdge } from '../src/composites/Widget/behavior/dock-on-edge';
import { joinEdge } from '../src/composites/Widget/behavior/join-edge';
import { openWidget } from '../src/composites/Widget/behavior/open-widget';

const pane = (key) => ({ kind: 'pane', key, widgets: [key], active: key, makeRoom: true });
const main = { kind: 'main', key: 'main' };
const column = (keys) => ({ kind: 'split', axis: 'column', children: keys.map(pane), sizes: keys.map(() => 1 / keys.length) });
const treeOf = (stack) => ({ kind: 'split', axis: 'row', children: [stack, main], sizes: [0.25, 0.75] });

const CASES = [
  { name: 'no weight counts as 1', existing: ['a'], weight: undefined, expected: [0.5, 0.5] },
  { name: 'weight 1 shares evenly', existing: ['a', 'b'], weight: 1, expected: [1 / 3, 1 / 3, 1 / 3] },
  { name: 'weight 2 beside one widget', existing: ['a'], weight: 2, expected: [1 / 3, 2 / 3] },
  { name: 'weight 2 beside two widgets', existing: ['a', 'b'], weight: 2, expected: [0.25, 0.25, 0.5] },
  { name: 'weight 0.5 beside one widget', existing: ['a'], weight: 0.5, expected: [2 / 3, 1 / 3] },
  { name: 'weight 3 beside three widgets', existing: ['a', 'b', 'c'], weight: 3, expected: [1 / 6, 1 / 6, 1 / 6, 0.5] },
  { name: 'zero falls back to 1', existing: ['a'], weight: 0, expected: [0.5, 0.5] },
  { name: 'negative falls back to 1', existing: ['a'], weight: -2, expected: [0.5, 0.5] },
  { name: 'NaN falls back to 1', existing: ['a'], weight: Number.NaN, expected: [0.5, 0.5] },
];

describe('joinEdge sizes by weight', () => {
  for (const { name, existing, weight, expected } of CASES) {
    it(name, () => {
      const tree = treeOf(existing.length === 1 ? pane(existing[0]) : column(existing));
      const joined = joinEdge(tree, tree.children[0], createPane(['n']), { edge: 'left', weight });
      const sizes = joined.children[0].sizes;
      expect(sizes).toHaveLength(expected.length);
      sizes.forEach((size, i) => expect(size).toBeCloseTo(expected[i], 9));
      expect(sizes.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9);
    });
  }
});

describe('dockOnEdge and openWidget pass the weight on', () => {
  const base = { defaultVisibility: 'always', defaultSide: 'left', defaultDockedSize: 280, defaultFloatingSize: { width: 300, height: 200 } };
  const definitions = [{ id: 'a', label: 'A', ...base }, { id: 'b', label: 'B', ...base, dockWeight: 3 }];

  it('gives the joining widget its weight on the edge', () => {
    const one = dockOnEdge(createDefaultLayout(), 'a', 'left', { size: 280 });
    const two = dockOnEdge(one, 'b', 'left', { size: 280, weight: 3 });
    const sizes = two.dock.children[0].sizes;
    expect(sizes[0]).toBeCloseTo(0.25, 9);
    expect(sizes[1]).toBeCloseTo(0.75, 9);
  });

  it('reads dockWeight from the definition when it opens a widget', () => {
    const one = openWidget(createDefaultLayout(), 'a', definitions);
    const two = openWidget(one, 'b', definitions);
    expect(two.dock.children[0].sizes[1]).toBeCloseTo(0.75, 9);
  });

  it('leaves widgets without weights even', () => {
    const three = ['a', 'b', 'c'].reduce((layout, id) => dockOnEdge(layout, id, 'left', { size: 260 }), createDefaultLayout());
    for (const size of three.dock.children[0].sizes) expect(size).toBeCloseTo(1 / 3, 9);
  });

  it('keeps the saved layout version', () => {
    expect(dockOnEdge(createDefaultLayout(), 'b', 'left', { weight: 2 }).v).toBe(2);
  });
});

describe('three joins keep the weight of each widget', () => {
  const base = { defaultVisibility: 'always', defaultSide: 'left', defaultDockedSize: 280, defaultFloatingSize: { width: 300, height: 200 } };
  const defs = [
    { id: 'timeline', label: 'Timeline', ...base, dockWeight: 2 },
    { id: 'tileset', label: 'Tileset', ...base, dockWeight: 1 },
    { id: 'project', label: 'Project', ...base, dockWeight: 1 },
    { id: 'plain', label: 'Plain', ...base },
  ];
  const TABLE = [
    { name: 'weights 2, 1, 1', order: ['timeline', 'tileset', 'project'], expected: [0.5, 0.25, 0.25] },
    { name: 'weights 1, 2, 1', order: ['tileset', 'timeline', 'project'], expected: [0.25, 0.5, 0.25] },
    { name: 'a widget without a weight counts as 1', order: ['timeline', 'plain', 'project'], expected: [0.5, 0.25, 0.25] },
  ];
  for (const { name, order, expected } of TABLE) {
    it(name, () => {
      const layout = order.reduce((acc, id) => openWidget(acc, id, defs), createDefaultLayout());
      layout.dock.children[0].sizes.forEach((size, i) => expect(size).toBeCloseTo(expected[i], 9));
    });
  }

  it('counts a child without a definition as 1', () => {
    const known = openWidget(dockOnEdge(createDefaultLayout(), 'gone', 'left'), 'timeline', defs);
    const sizes = known.dock.children[0].sizes;
    expect(sizes[0]).toBeCloseTo(1 / 3, 9);
    expect(sizes[1]).toBeCloseTo(2 / 3, 9);
  });
});

describe('defaultDockedSize resizes the edge column a widget joins', () => {
  const widened = () => {
    const one = dockOnEdge(createDefaultLayout(), 'a', 'left', { size: 280 });
    return { ...one, dock: { ...one.dock, sizes: [0.4, 0.6] } };
  };

  it('sets the column share and rescales the rest', () => {
    const sizes = dockOnEdge(widened(), 'b', 'left', { size: 280 }).dock.sizes;
    expect(sizes[0] + sizes[1]).toBeCloseTo(1, 9);
    expect(sizes[0]).not.toBeCloseTo(0.4, 3);
  });

  it('leaves the column alone when no size is given', () => {
    expect(dockOnEdge(widened(), 'b', 'left', { weight: 2 }).dock.sizes).toEqual([0.4, 0.6]);
  });
});
