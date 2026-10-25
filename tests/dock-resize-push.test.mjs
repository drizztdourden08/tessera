/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { resizeSplit as split } from '../src/composites/DockLayout';
import { MIN_SIZE } from '../src/composites/DockLayout/DockLayout.constants';
import { dividerRange } from '../src/composites/DockLayout/behavior/divider-range';

const pane = (key) => ({ kind: 'pane', key, widgets: [key], active: key });
const rowOf = (sizes) => ({ kind: 'split', axis: 'row', sizes, children: sizes.map((_, i) => pane(`p${i}`)) });
const push = (tree, index, delta, origin) => split(tree, tree, index, { delta, origin });
const sum =(sizes) => sizes.reduce((total, size) => total + size, 0);
const close = (actual, expected) => {
  expect(actual).toHaveLength(expected.length);
  actual.forEach((size, i) => expect(size).toBeCloseTo(expected[i], 10));
};

describe('resizeSplit without a minimum reached', () => {
  it('moves only the two neighbours, as before', () => {
    const tree = rowOf([0.3, 0.4, 0.3]);
    close(push(tree, 0, 0.1).sizes, [0.4, 0.3, 0.3]);
    close(push(tree, 1, -0.1).sizes, [0.3, 0.3, 0.4]);
  });

  it('lands exactly on the minimum without touching the next sibling', () => {
    const tree = rowOf([0.3, 0.4, 0.3]);
    close(push(tree, 0, 0.4 - MIN_SIZE).sizes, [0.7 - MIN_SIZE, MIN_SIZE, 0.3]);
  });
});

describe('resizeSplit pushing', () => {
  it('shrinks the second sibling once the first reaches its minimum', () => {
    const tree = rowOf([0.3, 0.3, 0.4]);
    const next = push(tree, 0, 0.3 - MIN_SIZE + 0.1);
    close(next.sizes, [0.3 + 0.3 - MIN_SIZE + 0.1, MIN_SIZE, 0.3]);
    expect(sum(next.sizes)).toBeCloseTo(1, 10);
  });

  it('cascades through three siblings and ends with every one at the minimum', () => {
    const tree = rowOf([0.2, 0.3, 0.3, 0.2]);
    const mid = push(tree, 0, 2 * (0.3 - MIN_SIZE) + 0.05);
    close(mid.sizes, [0.2 + 2 * (0.3 - MIN_SIZE) + 0.05, MIN_SIZE, MIN_SIZE, 0.2 - 0.05]);
    close(push(tree, 0, 5).sizes, [1 - 3 * MIN_SIZE, MIN_SIZE, MIN_SIZE, MIN_SIZE]);
  });

  it('pushes the near side the other way, toward the first sibling', () => {
    const tree = rowOf([0.3, 0.3, 0.4]);
    const next = push(tree, 1, -(0.3 - MIN_SIZE + 0.1));
    close(next.sizes, [0.3 - 0.1, MIN_SIZE, 0.4 + 0.3 - MIN_SIZE + 0.1]);
    expect(sum(next.sizes)).toBeCloseTo(1, 10);
  });

  it('clamps a drag past the whole chain instead of refusing it', () => {
    const tree = rowOf([0.4, 0.3, 0.3]);
    close(push(tree, 1, 3).sizes, [0.4, 1 - 0.4 - MIN_SIZE, MIN_SIZE]);
    close(push(tree, 1, -3).sizes, [MIN_SIZE, MIN_SIZE, 1 - 2 * MIN_SIZE]);
  });

  it('keeps nested splits and other siblings intact', () => {
    const inner = rowOf([0.5, 0.5]);
    const tree = { kind: 'split', axis: 'column', sizes: [0.6, 0.4], children: [inner, pane('bottom')] };
    const next = split(tree, inner, 0, { delta: 0.1 });
    expect(next.sizes).toEqual([0.6, 0.4]);
    close(next.children[0].sizes, [0.6, 0.4]);
    expect(next.children[1]).toBe(tree.children[1]);
  });
});

describe('resizeSplit within one gesture', () => {
  const tree = rowOf([0.2, 0.3, 0.3, 0.2]);
  const origin = (delta) => ({ sizes: tree.sizes, delta });

  it('restores the pushed neighbours when the drag reverses', () => {
    const pushed = push(tree, 0, 0.55, origin(0.55));
    close(pushed.sizes, [0.2 + 0.55, MIN_SIZE, MIN_SIZE, 0.2 - (0.55 - 2 * (0.3 - MIN_SIZE))]);
    const live = { ...tree, sizes: pushed.sizes };
    close(push(live, 0, -0.45, origin(0.1)).sizes, [0.3, 0.2, 0.3, 0.2]);
    close(push(live, 0, -0.1, origin(0)).sizes, tree.sizes);
  });

  it('works from the gesture start, whatever the live sizes are', () => {
    const live = { ...tree, sizes: [0.5, 0.1, 0.1, 0.3] };
    close(push(live, 0, 0.01, origin(0.1)).sizes, [0.3, 0.2, 0.3, 0.2]);
  });

  it('falls back to the step when the origin does not fit the split', () => {
    const stored = rowOf([0.3, 0.3, 0.4]);
    close(push(stored, 0, 0.1, origin(0.9)).sizes, [0.4, 0.2, 0.4]);
  });
});

describe('dividerRange', () => {
  const along = 1000;
  const rangeOf = (node, index) => dividerRange({ node, index, rect: {}, along });

  it('reads a plain pair as the pair less a minimum on each side', () => {
    const range = rangeOf(rowOf([0.5, 0.5]), 0);
    expect(range.value).toBeCloseTo(500, 6);
    expect(range.min).toBeCloseTo(MIN_SIZE * along, 6);
    expect(range.max).toBeCloseTo((1 - MIN_SIZE) * along, 6);
  });

  it('widens over the whole chain of siblings', () => {
    const node = rowOf([0.2, 0.3, 0.3, 0.2]);
    const first = rangeOf(node, 0);
    expect(first.value).toBeCloseTo(200, 6);
    expect(first.min).toBeCloseTo(MIN_SIZE * along, 6);
    expect(first.max).toBeCloseTo((1 - 3 * MIN_SIZE) * along, 6);
    const middle = rangeOf(node, 1);
    expect(middle.min).toBeCloseTo(2 * MIN_SIZE * along, 6);
    expect(middle.max).toBeCloseTo((1 - 2 * MIN_SIZE) * along, 6);
  });

  it('keeps its bounds while a drag pushes', () => {
    const node = rowOf([0.2, 0.3, 0.3, 0.2]);
    const pushed = { ...node, sizes: push(node, 0, 0.5).sizes };
    const before = rangeOf(node, 0);
    const after = rangeOf(pushed, 0);
    expect(after.min).toBeCloseTo(before.min, 6);
    expect(after.max).toBeCloseTo(before.max, 6);
  });
});
