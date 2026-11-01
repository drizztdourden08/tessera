/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { anchorShift } from '../src/composites/VirtualGrid/behavior/anchor-shift';
import { gridHeights } from '../src/composites/VirtualGrid/behavior/grid-heights';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { gridOffsets } from '../src/composites/VirtualGrid/behavior/grid-offsets';
import { gridTotal } from '../src/composites/VirtualGrid/behavior/grid-total';
import { mergeHeights } from '../src/composites/VirtualGrid/behavior/merge-heights';
import { pruneHeights } from '../src/composites/VirtualGrid/behavior/prune-heights';
import { rowPlace } from '../src/composites/VirtualGrid/behavior/row-place';
import { rowRange } from '../src/composites/VirtualGrid/behavior/row-range';
import { scrollOffset } from '../src/composites/VirtualGrid/behavior/scroll-offset';
import { GROUPS, HEIGHTS as FIXED } from './virtual-grid-fixture.mjs';

const layout = gridLayout(GROUPS, 3);
const KNOWN = { 1: 150, 2: 200, 6: 120 };
const offsetsOf = (known) => gridOffsets(layout, (row) => known[row]);
const measured = (known = KNOWN) => ({ ...FIXED, offsets: offsetsOf(known) });
const topsOf = (heights) => layout.rows.map((row, at) => rowPlace(row, heights, at).top);

describe('K1 the offset table of measured rows', { tags: ['critical'] }, () => {
  it('gives in fixed mode the tops of one tile height and one header height', () => {
    expect(topsOf(FIXED)).toEqual([0, 32, 128, 224, 320, 352, 384]);
    expect(gridTotal(layout, FIXED)).toBe(480);
  });

  it('gives the same tops from a table where no row is measured yet', () => {
    expect(topsOf({ ...FIXED, offsets: offsetsOf({}) })).toEqual(topsOf(FIXED));
    expect(gridTotal(layout, { ...FIXED, offsets: offsetsOf({}) })).toBe(480);
  });

  it('sums the measured heights and the estimate of the rows not measured', () => {
    const heights = measured();
    expect(topsOf(heights)).toEqual([0, 32, 182, 382, 478, 510, 542]);
    expect(layout.rows.map((row, at) => rowPlace(row, heights, at).height)).toEqual([32, 150, 200, 96, 32, 32, 120]);
    expect(gridTotal(layout, heights)).toBe(662);
  });

  it('follows the estimate for the rows not measured when it changes', () => {
    const heights = { tile: 100, head: 30, offsets: offsetsOf(KNOWN) };
    expect(topsOf(heights)).toEqual([0, 30, 180, 380, 480, 510, 540]);
  });

  it('averages the measured tile rows and leaves headers out', () => {
    expect(offsetsOf(KNOWN).average).toBeCloseTo((150 + 200 + 120) / 3);
    expect(offsetsOf({}).average).toBe(0);
  });

  it('carries the offsets from the metrics', () => {
    const offsets = offsetsOf(KNOWN);
    expect(gridHeights({ top: 0, viewport: 300, rowHeight: 80, head: 24 }, offsets)).toEqual({ tile: 80, head: 24, offsets });
  });
});

describe('K1 the rows in view with mixed heights', { tags: ['critical'] }, () => {
  const heights = measured();
  const range = (scrollTop, viewport, overscan) => rowRange({ rows: layout.rows, heights, scrollTop, viewport, overscan });

  it('finds the first and last row by their place', () => {
    expect(range(0, 100, 0)).toEqual({ start: 0, end: 2 });
    expect(range(200, 50, 0)).toEqual({ start: 2, end: 3 });
    expect(range(400, 100, 0)).toEqual({ start: 3, end: 5 });
  });

  it('adds the overscan and stops at the last row', () => {
    expect(range(600, 100, 1)).toEqual({ start: 5, end: 7 });
    expect(range(5000, 100, 2)).toEqual({ start: 5, end: 7 });
  });
});

describe('K1 scrolling an item into view with mixed heights', { tags: ['critical'] }, () => {
  const heights = measured();
  const at = (index, align, scrollTop = 0, viewport = 200) => scrollOffset({ layout, heights, index, viewport, scrollTop, align });

  it('puts the row of the item at its measured place', () => {
    expect(at(0, 'start')).toBe(32);
    expect(at(4, 'start')).toBe(182);
    expect(at(12, 'start')).toBe(542);
  });

  it('ends on the bottom of a tall row', () => {
    expect(at(12, 'end', 0, 300)).toBe(362);
    expect(at(0, 'nearest', 0, 100)).toBe(82);
  });

  it('keeps the scroll when the row is already in view', () => {
    expect(at(4, 'nearest', 150, 300)).toBe(150);
  });
});

describe('K1 the scroll anchor when a row above the first visible row changes height', { tags: ['critical'] }, () => {
  const rows = layout.rows;
  const before = measured();
  const after = (known) => measured({ ...KNOWN, ...known });
  const shift = (known, scrollTop) => anchorShift({ rows, before, after: after(known), scrollTop });

  it('moves the scroll by the growth of a row above', () => {
    expect(shift({ 1: 250 }, 400)).toBe(100);
    expect(shift({ 1: 100 }, 400)).toBe(-50);
  });

  it('adds the change of every row above', () => {
    expect(shift({ 1: 250, 2: 250 }, 500)).toBe(150);
  });

  it('keeps the scroll when the first visible row or a row below changes', () => {
    expect(shift({ 1: 250 }, 100)).toBe(0);
    expect(shift({ 6: 300 }, 400)).toBe(0);
    expect(shift({ 1: 250 }, 0)).toBe(0);
  });

  it('keeps the scroll past the last row', () => {
    expect(shift({ 1: 250 }, 5000)).toBe(0);
  });
});

describe('K1 the cache of measured heights', { tags: ['critical'] }, () => {
  it('keeps the same map when nothing changed', () => {
    const before = new Map([['row-a', 100]]);
    expect(mergeHeights(before, new Map([['row-a', 100]]))).toBe(before);
  });

  it('adds new rows and replaces changed ones', () => {
    const next = mergeHeights(new Map([['row-a', 100]]), new Map([['row-a', 120], ['row-b', 90]]));
    expect([...next]).toEqual([['row-a', 120], ['row-b', 90]]);
  });

  it('drops the rows not in the layout and keeps the map when all stay', () => {
    const before = new Map([['row-a', 100], ['row-b', 90]]);
    expect([...pruneHeights(before, new Set(['row-b']))]).toEqual([['row-b', 90]]);
    expect(pruneHeights(before, new Set(['row-a', 'row-b', 'row-c']))).toBe(before);
  });
});
