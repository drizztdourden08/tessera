/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { cellRectOf } from '../src/composites/marquee/cell-rect-of';
import { hitItems } from '../src/composites/marquee/hit-items';
import { modifierOf } from '../src/composites/reorder/modifier-of';
import { moveSet } from '../src/composites/reorder/move-set';
import { stepGap } from '../src/composites/reorder/step-gap';

const ORDER = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('K1 moving a set in the reorder kit', { tags: ['critical'] }, () => {
  it('puts the set together at the gap and keeps its order', () => {
    expect(moveSet(ORDER, ['b', 'd'], 5)).toEqual(['a', 'c', 'e', 'b', 'd', 'f']);
    expect(moveSet(ORDER, ['e', 'b'], 0)).toEqual(['b', 'e', 'a', 'c', 'd', 'f']);
    expect(moveSet(ORDER, ['c'], 6)).toEqual(['a', 'b', 'd', 'e', 'f', 'c']);
  });

  it('leaves the order alone when the gap touches the set', () => {
    expect(moveSet(ORDER, ['c', 'd'], 2)).toEqual(ORDER);
    expect(moveSet(ORDER, ['c', 'd'], 4)).toEqual(ORDER);
  });

  it('finds the gap one step or one row away from a set, and nothing at the edges', () => {
    expect(stepGap(ORDER, ['c'], 1)).toBe(4);
    expect(stepGap(ORDER, ['c'], -1)).toBe(1);
    expect(stepGap(ORDER, ['b', 'c'], 1)).toBe(4);
    expect(stepGap(ORDER, ['b', 'c'], -3)).toBe(0);
    expect(stepGap(ORDER, ['a', 'b'], -1)).toBeUndefined();
    expect(stepGap(ORDER, ['e', 'f'], 1)).toBeUndefined();
    expect(stepGap(ORDER, ['x'], 1)).toBeUndefined();
    expect(moveSet(ORDER, ['c'], stepGap(ORDER, ['c'], 1))).toEqual(['a', 'b', 'd', 'c', 'e', 'f']);
  });

  it('reads the modifier held at the drop', () => {
    const held = (extra) => ({ altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...extra });
    expect(modifierOf(held({}))).toBe('none');
    expect(modifierOf(held({ altKey: true }))).toBe('alt');
    expect(modifierOf(held({ ctrlKey: true }))).toBe('ctrl');
    expect(modifierOf(held({ metaKey: true }))).toBe('ctrl');
    expect(modifierOf(held({ shiftKey: true }))).toBe('shift');
    expect(modifierOf(held({ altKey: true, shiftKey: true }))).toBe('alt');
  });
});

describe('K1 the cell rect of a marquee', { tags: ['critical'] }, () => {
  const item = (key, row, column) => ({ key, rect: { x: column * 10, y: row * 10, width: 10, height: 10 }, cell: { row, column } });

  it('bounds the cells of the items inside the rectangle', () => {
    const items = [item('a', 0, 0), item('b', 0, 1), item('c', 1, 0), item('d', 2, 3)];
    const hits = hitItems({ x: 0, y: 0, width: 15, height: 15 }, items);
    expect(hits.map((hit) => hit.key)).toEqual(['a', 'b', 'c']);
    expect(cellRectOf(hits)).toEqual({ firstRow: 0, lastRow: 1, firstColumn: 0, lastColumn: 1 });
  });

  it('reports nothing when no item with a cell is hit', () => {
    expect(cellRectOf([])).toBeNull();
    expect(cellRectOf([{ key: 'x', rect: { x: 0, y: 0, width: 1, height: 1 } }])).toBeNull();
  });
});
