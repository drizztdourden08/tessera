/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { dropTargetOf } from '../src/composites/Tree/behavior/drop-target-of';
import { flattenItems } from '../src/composites/Tree/behavior/flatten-items';
import { keyMoveOf } from '../src/composites/Tree/behavior/key-move-of';
import { moveRequestOf } from '../src/composites/Tree/behavior/move-request-of';

const file = (id) => ({ id, name: id });
const folder = (id, children) => ({ id, name: id, children });
const ITEMS = [folder('a', [file('a1'), file('a2')]), folder('b', [file('b1')]), file('c')];
const base = { getKey: (item) => item.id, getChildren: (item) => item.children, isBranch: (item) => item.children !== undefined };
const rows = flattenItems(ITEMS, { ...base, open: new Set(['a']), loading: new Set(), kept: null });
const indexOfKey = new Map(rows.map((row, at) => [row.key, at]));
const childCount = (key) => (key === null ? ITEMS.length : (ITEMS.flatMap((item) => [item, ...(item.children ?? [])]).find((item) => item.id === key)?.children?.length ?? 0));
const HEIGHT = 10;

const at = (y, extra = {}) => dropTargetOf({ rows, indexOfKey, y, rowHeight: HEIGHT, from: 4, moving: new Set(['c']), ...extra });

describe('the drop target under the pointer', () => {
  it('puts a gap before a row near its top and lifts the line to the top of the tree', () => {
    expect(at(2)).toMatchObject({ gap: 0, parentKey: null, index: 0, into: false });
    expect(at(-5)).toMatchObject({ gap: 0, parentKey: null, index: 0 });
  });

  it('drops into a folder in the middle of its row', () => {
    expect(at(5)).toMatchObject({ into: true, parentKey: 'a', intoAt: 0 });
    expect(at(35)).toMatchObject({ into: true, parentKey: 'b', intoAt: 3 });
  });

  it('puts the gap under an open folder before its first child', () => {
    expect(at(9)).toMatchObject({ gap: 1, parentKey: 'a', index: 0, into: false });
  });

  it('splits a leaf row into a gap before and a gap after', () => {
    expect(at(44, { moving: new Set(['a1']) })).toMatchObject({ gap: 4, parentKey: null, index: 2 });
    expect(at(47, { moving: new Set(['a1']) })).toMatchObject({ gap: 5, parentKey: null, index: 3 });
  });

  it('puts the gap after the last row below the tree', () => {
    expect(at(500, { moving: new Set(['a1']) })).toMatchObject({ gap: 5, parentKey: null, index: 3 });
  });

  it('refuses a folder as its own target and a gap inside what moves', () => {
    expect(at(5, { moving: new Set(['a']) })).toBeUndefined();
    expect(at(14, { moving: new Set(['a']) })).toBeUndefined();
  });

  it('refuses a drop deeper than the depth limit and what the app refuses', () => {
    expect(at(5, { maxDepth: 1 })).toBeUndefined();
    expect(at(2, { maxDepth: 1 })).toBeDefined();
    expect(at(2, { allow: () => false })).toBeUndefined();
  });
});

describe('the move request', () => {
  const request = (target, keys) => moveRequestOf({ rows, indexOfKey, target, keys, modifier: 'alt', childCount });
  const gap = (parentKey, index) => ({ gap: 0, parentKey, index, into: false, intoAt: -1 });

  it('gives the index among the siblings once the moved rows are out', () => {
    expect(request(gap(null, 0), ['c'])).toEqual({ keys: ['c'], parentKey: null, index: 0, into: false, modifier: 'alt' });
    expect(request(gap('a', 2), ['a1'])).toMatchObject({ parentKey: 'a', index: 1 });
    expect(request(gap('a', 0), ['a2'])).toMatchObject({ index: 0 });
  });

  it('puts a drop into a folder after its children', () => {
    const into = { gap: 3, parentKey: 'b', index: -1, into: true, intoAt: 3 };
    expect(request(into, ['c'])).toMatchObject({ parentKey: 'b', index: 1, into: true });
    expect(request({ ...into, parentKey: 'a', intoAt: 0 }, ['a1'])).toMatchObject({ index: 1 });
  });

  it('lists the moved keys in the order they are shown', () => {
    expect(request(gap(null, 3), ['c', 'a2']).keys).toEqual(['a2', 'c']);
  });
});

describe('the move by key', () => {
  const move = (key, direction, maxDepth) => keyMoveOf({ rows, indexOfKey, keys: [key], direction, maxDepth, childCount });

  it('moves among the siblings and stops at the ends', () => {
    expect(move('a2', 'up')).toMatchObject({ parentKey: 'a', index: 0, into: false });
    expect(move('a1', 'up')).toBeUndefined();
    expect(move('a1', 'down')).toMatchObject({ parentKey: 'a', index: 1 });
    expect(move('a2', 'down')).toBeUndefined();
    expect(move('a', 'down')).toMatchObject({ parentKey: null, index: 1 });
  });

  it('drops into the sibling above when it is a folder', () => {
    expect(move('b', 'in')).toMatchObject({ parentKey: 'a', index: 2, into: true });
    expect(move('c', 'in')).toMatchObject({ parentKey: 'b', index: 1, into: true });
    expect(move('a', 'in')).toBeUndefined();
    expect(move('a2', 'in')).toBeUndefined();
  });

  it('lifts out of the parent to just after it', () => {
    expect(move('a1', 'out')).toMatchObject({ parentKey: null, index: 1, into: false });
    expect(move('a', 'out')).toBeUndefined();
  });

  it('respects the depth limit when it goes in', () => {
    expect(move('b', 'in', 1)).toBeUndefined();
    expect(move('b', 'in', 2)).toBeDefined();
  });

  it('moves the set when its rows share a parent and the first row alone when they do not', () => {
    const same = keyMoveOf({ rows, indexOfKey, keys: ['a1', 'a2'], direction: 'out', childCount });
    expect(same.keys).toEqual(['a1', 'a2']);
    const mixed = keyMoveOf({ rows, indexOfKey, keys: ['a1', 'c'], direction: 'out', childCount });
    expect(mixed.keys).toEqual(['a1']);
  });
});
