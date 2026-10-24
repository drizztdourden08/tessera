/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { itemOfStop } from '../src/composites/VirtualGrid/behavior/item-of-stop';
import { nextCell } from '../src/composites/VirtualGrid/behavior/next-cell';
import { rowOfItem } from '../src/composites/VirtualGrid/behavior/row-of-item';
import { rowRange } from '../src/composites/VirtualGrid/behavior/row-range';
import { scrollOffset } from '../src/composites/VirtualGrid/behavior/scroll-offset';
import { scrollTopForSpan } from '../src/composites/virtual/scroll-top-for-span';

const flat = (count, columns = 5) => gridLayout([{ header: false, count, collapsed: false }], columns);

const GROUPS = [
  { header: true, count: 7, collapsed: false },
  { header: true, count: 4, collapsed: true },
  { header: true, count: 3, collapsed: false },
];

const HEIGHTS = { tile: 96, head: 32 };

describe('the row math of sections', () => {
  const layout = gridLayout(GROUPS, 3);

  it('puts a header row before the tile rows of each section', () => {
    expect(layout.rows.map((row) => row.kind)).toEqual(['header', 'tiles', 'tiles', 'tiles', 'header', 'header', 'tiles']);
    expect(layout.rows.map((row) => row.size)).toEqual([1, 3, 3, 1, 1, 1, 3]);
    expect(layout).toMatchObject({ headers: 3, tileRows: 4, stops: 13, items: 14 });
  });

  it('draws no tile row for a collapsed section but keeps its items in the count', () => {
    expect(layout.rows.filter((row) => row.section === 1).map((row) => row.kind)).toEqual(['header']);
    expect(layout.rows[5]).toMatchObject({ heads: 2, tiles: 3, first: 11 });
  });

  it('counts the headers and tile rows above a row for its place', () => {
    expect(layout.rows.map((row) => [row.heads, row.tiles])).toEqual([[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 3], [3, 3]]);
  });

  it('windows rows of two heights by their place', () => {
    const range = (scrollTop, viewport, overscan) => rowRange({ rows: layout.rows, heights: HEIGHTS, scrollTop, viewport, overscan });
    expect(range(0, 100, 0)).toEqual({ start: 0, end: 2 });
    expect(range(330, 40, 0)).toEqual({ start: 4, end: 6 });
    expect(range(330, 40, 1)).toEqual({ start: 3, end: 7 });
    expect(range(5000, 100, 2)).toEqual({ start: 5, end: 7 });
  });

  it('finds the row of an item, or the header when its section is collapsed', () => {
    expect(rowOfItem(layout, 0)).toBe(1);
    expect(rowOfItem(layout, 6)).toBe(3);
    expect(rowOfItem(layout, 8)).toBe(4);
    expect(rowOfItem(layout, 12)).toBe(6);
    expect(rowOfItem(layout, 999)).toBe(6);
  });

  it('turns a focus stop into an item, and a header into none', () => {
    expect(itemOfStop(layout, 0)).toBe(-1);
    expect(itemOfStop(layout, 1)).toBe(0);
    expect(itemOfStop(layout, 7)).toBe(6);
    expect(itemOfStop(layout, 8)).toBe(-1);
    expect(itemOfStop(layout, 10)).toBe(11);
  });
});

describe('the keys across the headers', () => {
  const layout = gridLayout(GROUPS, 3);
  const step = (key, active, ctrl = false) => nextCell(key, layout, active, { ctrl, page: 2 });

  it('moves between a header and the tiles under and over it', () => {
    expect(step('ArrowDown', 0)).toBe(1);
    expect(step('ArrowUp', 1)).toBe(0);
    expect(step('ArrowUp', 5)).toBe(2);
    expect(step('ArrowDown', 7)).toBe(8);
    expect(step('ArrowUp', 8)).toBe(7);
  });

  it('steps from the last tile of a section to the next header and back', () => {
    expect(step('ArrowRight', 7)).toBe(8);
    expect(step('ArrowLeft', 9)).toBe(8);
    expect(step('ArrowLeft', 1)).toBe(0);
  });

  it('goes down from a header over a collapsed section to the next header', () => {
    expect(step('ArrowDown', 8)).toBe(9);
    expect(step('ArrowDown', 9)).toBe(10);
  });

  it('goes to the ends of a row, a header or the grid', () => {
    expect(step('End', 4)).toBe(6);
    expect(step('Home', 5)).toBe(4);
    expect(step('Home', 8)).toBe(8);
    expect(step('End', 1, true)).toBe(12);
    expect(step('Home', 12, true)).toBe(0);
  });

  it('moves by a page of rows', () => {
    expect(step('PageDown', 0)).toBe(4);
    expect(step('PageUp', 12)).toBe(8);
  });
});

describe('the scroll offset of an index', () => {
  const layout = gridLayout(GROUPS, 3);
  const at = (index, align, scrollTop = 0) => scrollOffset({ layout, heights: HEIGHTS, index, viewport: 200, scrollTop, align });

  it('brings the row of the item into view with the nearest edge', () => {
    expect(at(12, 'nearest')).toBe(280);
    expect(at(0, 'nearest', 100)).toBe(32);
    expect(at(0, 'nearest', 0)).toBe(0);
  });

  it('puts the row at the start, the middle or the end', () => {
    expect(at(12, 'start')).toBe(384);
    expect(at(12, 'center')).toBe(332);
    expect(at(12, 'end')).toBe(280);
  });

  it('goes to the header of a collapsed section', () => {
    expect(at(8, 'start')).toBe(320);
  });

  it('works for a grid with no sections and never goes below the top', () => {
    const plain = flat(2000);
    const plainAt = (index, align) => scrollOffset({ layout: plain, heights: HEIGHTS, index, viewport: 288, scrollTop: 0, align });
    expect(plainAt(50, 'start')).toBe(960);
    expect(plainAt(0, 'end')).toBe(0);
    expect(scrollTopForSpan({ top: 10, height: 96, viewport: 288, scrollTop: 500 }, 'center')).toBe(0);
  });
});
