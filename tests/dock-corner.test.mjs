/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { GAP, cornerEnds, layoutTree, turnCorner } from '../src/composites/DockLayout';
import { editOfTurn } from '../src/composites/DockLayout/behavior/edit-of-turn';
import { turnOfDrag } from '../src/composites/DockLayout/behavior/turn-of-drag';
import { turnOfKey } from '../src/composites/DockLayout/behavior/turn-of-key';
import { applyEdit } from '../src/composites/Widget/behavior/apply-edit';

const pane = (key) => ({ kind: 'pane', key, widgets: [key], active: key, makeRoom: true });
const main = { kind: 'main', key: 'main' };
const split = (axis, children, sizes) => ({ kind: 'split', axis, children, sizes });
const around = () => split('row', [pane('L'), split('column', [pane('T'), main, pane('B')], [0.2, 0.6, 0.2])], [0.3, 0.7]);
const STAGE = { x: 0, y: 0, width: 1000, height: 800 };

const rounded = (node) => (node.kind === 'split'
  ? { ...node, sizes: node.sizes.map((size) => Math.round(size * 1e9) / 1e9), children: node.children.map(rounded) }
  : node);
const rectsOf = (tree) => Object.fromEntries(layoutTree(tree, STAGE).leaves.map((leaf) => [leaf.node.key, leaf.rect]));

describe('turnCorner take', () => {
  it('lets the top panel take the corner from the left panel', () => {
    const next = turnCorner(around(), 'T', 'start');
    expect(rounded(next)).toEqual(rounded(split('column', [
      pane('T'),
      split('row', [pane('L'), split('column', [main, pane('B')], [0.75, 0.25])], [0.3, 0.7]),
    ], [0.2, 0.8])));
  });

  it('lets the bottom panel take the corner from the left panel', () => {
    const next = turnCorner(around(), 'B', 'start');
    expect(next.axis).toBe('column');
    expect(next.children.map((child) => child.key ?? child.axis)).toEqual(['row', 'B']);
    expect(next.sizes[1]).toBeCloseTo(0.2, 9);
  });

  it('keeps every pane where it was within a gap', () => {
    const before = rectsOf(around());
    const after = rectsOf(turnCorner(around(), 'T', 'start'));
    for (const key of ['main', 'B']) {
      for (const side of ['x', 'y', 'width', 'height']) expect(Math.abs(after[key][side] - before[key][side])).toBeLessThanOrEqual(GAP);
    }
    for (const side of ['x', 'width']) expect(Math.abs(after.L[side] - before.L[side])).toBeLessThanOrEqual(GAP);
    expect(Math.abs(after.T.height - before.T.height)).toBeLessThanOrEqual(GAP);
    expect(after.T.width).toBeGreaterThan(before.T.width + before.L.width);
  });

  it('takes from the right when the neighbour is on the right', () => {
    const tree = split('row', [split('column', [pane('T'), main], [0.3, 0.7]), pane('R')], [0.8, 0.2]);
    const next = turnCorner(tree, 'T', 'end');
    expect(next.axis).toBe('column');
    expect(next.children[1].children.map((child) => child.key ?? child.axis)).toEqual(['main', 'R']);
    expect(next.children[1].sizes[1]).toBeCloseTo(0.2, 9);
  });

  it('works along the other axis: the left panel takes a corner from the top panel', () => {
    const tree = split('column', [pane('T'), split('row', [pane('L'), main], [0.3, 0.7])], [0.2, 0.8]);
    const next = turnCorner(tree, 'L', 'start', { along: 'column' });
    expect(next.axis).toBe('row');
    expect(next.children[0].key).toBe('L');
    expect(next.sizes[0]).toBeCloseTo(0.3, 9);
  });
});

describe('turnCorner give back', () => {
  it('returns the original tree after a take and a give', () => {
    const start = around();
    const taken = turnCorner(start, 'T', 'start');
    expect(taken).not.toEqual(start);
    expect(rounded(turnCorner(taken, 'T', 'start', { give: true }))).toEqual(rounded(start));
  });

  it('gives a corner from the left panel to the top panel, as the top panel taking it', () => {
    const viaLeft = turnCorner(around(), 'L', 'start', { along: 'column', give: true });
    expect(rounded(viaLeft)).toEqual(rounded(turnCorner(around(), 'T', 'start')));
  });

  it('reverses a bottom take on a right neighbour', () => {
    const start = split('row', [split('column', [main, pane('B')], [0.7, 0.3]), pane('R')], [0.8, 0.2]);
    const taken = turnCorner(start, 'B', 'end');
    expect(taken).not.toEqual(start);
    expect(rounded(turnCorner(taken, 'B', 'end'))).toEqual(rounded(start));
  });

  it('keeps the other corner when a middle stack gives one back', () => {
    const both = turnCorner(turnCorner(around(), 'T', 'start'), 'B', 'start');
    expect(both.axis).toBe('column');
    expect(both.children).toHaveLength(3);
    const next = turnCorner(both, 'T', 'start', { give: true });
    expect(next.axis).toBe('column');
    expect(next.children.map((child) => child.key ?? child.axis)).toEqual(['row', 'B']);
  });

  it('collapses single-child splits', () => {
    const walk = (node) => (node.kind === 'split' ? node.children.length > 1 && node.children.every(walk) : true);
    const taken = turnCorner(around(), 'T', 'start');
    expect(walk(taken)).toBe(true);
    expect(walk(turnCorner(taken, 'T', 'start'))).toBe(true);
  });
});

describe('turnCorner guards', () => {
  it('refuses when the taker holds main', () => {
    const tree = split('row', [pane('L'), split('column', [split('row', [pane('P'), main], [0.4, 0.6]), pane('B')], [0.7, 0.3])], [0.3, 0.7]);
    expect(turnCorner(tree, 'P', 'start')).toBe(tree);
  });

  it('returns the same tree for main, an unknown key or a pane with no corner', () => {
    const tree = around();
    expect(turnCorner(tree, 'main', 'start')).toBe(tree);
    expect(turnCorner(tree, 'nope', 'start')).toBe(tree);
    expect(turnCorner(tree, 'T', 'end')).toBe(tree);
    expect(turnCorner(main, 'main', 'start')).toBe(main);
  });
});

describe('applyEdit take-corner', () => {
  const layout = { v: 2, dock: around(), floating: [], popped: [], frame: {} };
  const rect = { x: 0, y: 0, width: 600, height: 400 };

  it('takes and gives through the edit', () => {
    const taken = applyEdit(layout, { type: 'take-corner', key: 'T', end: 'start' }, rect);
    expect(taken.dock).toEqual(turnCorner(layout.dock, 'T', 'start'));
    expect(taken.v).toBe(2);
    const back = applyEdit(taken, { type: 'take-corner', key: 'T', end: 'start', give: true }, rect);
    expect(rounded(back.dock)).toEqual(rounded(layout.dock));
  });

  it('leaves the layout alone when no corner turns', () => {
    expect(applyEdit(layout, { type: 'take-corner', key: 'main', end: 'start' }, rect)).toEqual(layout);
  });
});

describe('cornerEnds', () => {
  const tree = around();
  const laid = layoutTree(tree, STAGE);
  const ends = cornerEnds(laid, tree);
  const name = (end) => `${end.key}:${end.along}:${end.end}`;

  it('offers a take on the stacked panels and a give on the left panel', () => {
    expect(ends.map(name).sort()).toEqual(['B:row:start', 'L:column:end', 'L:column:start', 'T:row:start']);
    const top = ends.find((end) => name(end) === 'T:row:start');
    expect(top.take).toBeCloseTo(rectsOf(tree).L.width, 6);
    expect(top.give).toBeNull();
    expect(top.takeCorner).toBe('top-left');
    const left = ends.find((end) => name(end) === 'L:column:start');
    expect(left.give).toBeCloseTo(rectsOf(tree).T.height, 6);
    expect(left.take).toBeNull();
    expect(left.giveCorner).toBe('top-left');
  });

  it('puts the handle strip at the pane end', () => {
    const top = ends.find((end) => name(end) === 'T:row:start');
    const t = rectsOf(tree).T;
    expect(top.rect).toEqual({ x: t.x, y: t.y, width: GAP, height: t.height });
    const bottom = ends.find((end) => name(end) === 'L:column:end');
    const l = rectsOf(tree).L;
    expect(bottom.rect.y + bottom.rect.height).toBeCloseTo(l.y + l.height, 6);
    expect(bottom.giveCorner).toBe('bottom-left');
  });

  it('follows a turn: the top panel then offers a give', () => {
    const next = turnCorner(tree, 'T', 'start');
    const after = cornerEnds(layoutTree(next, STAGE), next).find((end) => name(end) === 'T:row:start');
    expect(after.take).toBeNull();
    expect(after.give).toBeGreaterThan(0);
  });

  it('offers nothing around a lone main view and nothing for a taker that holds main', () => {
    expect(cornerEnds(layoutTree(main, STAGE), main)).toEqual([]);
    const held = split('row', [pane('L'), split('column', [split('row', [pane('P'), main], [0.4, 0.6]), pane('B')], [0.7, 0.3])], [0.3, 0.7]);
    expect(cornerEnds(layoutTree(held, STAGE), held).map(name)).not.toContain('P:row:start');
  });
});

describe('corner keys and drags', () => {
  const handle = { key: 'T', active: 'T', end: 'start', along: 'row', rect: STAGE, take: 200, give: 100, takeCorner: 'top-left', giveCorner: 'top-left' };

  it('maps outward arrows to take and inward arrows to give', () => {
    expect(turnOfKey('ArrowLeft', handle)).toBe('take');
    expect(turnOfKey('ArrowRight', handle)).toBe('give');
    expect(turnOfKey('ArrowUp', handle)).toBeNull();
    expect(turnOfKey('ArrowRight', { ...handle, end: 'end' })).toBe('take');
    expect(turnOfKey('ArrowDown', { ...handle, along: 'column', end: 'end' })).toBe('take');
    expect(turnOfKey('ArrowLeft', { ...handle, take: null })).toBeNull();
  });

  it('turns once a drag passes half of the neighbour thickness', () => {
    expect(turnOfDrag(99, handle)).toBeNull();
    expect(turnOfDrag(101, handle)).toBe('take');
    expect(turnOfDrag(-49, handle)).toBeNull();
    expect(turnOfDrag(-51, handle)).toBe('give');
    expect(turnOfDrag(500, { ...handle, take: null })).toBeNull();
  });

  it('builds the edit', () => {
    expect(editOfTurn(handle, 'take')).toEqual({ type: 'take-corner', key: 'T', end: 'start', along: 'row' });
    expect(editOfTurn(handle, 'give')).toEqual({ type: 'take-corner', key: 'T', end: 'start', along: 'row', give: true });
  });
});
