/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { gridCellExtras } from '../src/composites/VirtualGrid/behavior/grid-cell-extras';
import { gridKeyStep } from '../src/composites/VirtualGrid/behavior/grid-key-step';
import { gridKeys } from '../src/composites/VirtualGrid/behavior/grid-keys';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { gridMarkOf } from '../src/composites/VirtualGrid/behavior/grid-mark-of';
import { gridPointAt } from '../src/composites/VirtualGrid/behavior/grid-point-at';
import { gridRects } from '../src/composites/VirtualGrid/behavior/grid-rects';
import { listRects } from '../src/composites/VirtualList/behavior/list-rects';
import { nextAcrossIndex } from '../src/composites/VirtualList/behavior/next-across-index';
import { nextIndex } from '../src/composites/VirtualList/behavior/next-index';
import { stepVirtualSize } from '../src/composites/virtual/size-steps';

const SECTIONS = [
  { header: true, count: 7, collapsed: false },
  { header: true, count: 3, collapsed: false },
];

const HEIGHTS = { tile: 100, head: 40 };

describe('K1 VirtualList on the horizontal axis', { tags: ['critical'] }, () => {
  it('steps by the left and right keys and ignores the vertical ones', () => {
    expect(nextAcrossIndex('ArrowRight', 3, 100, 8)).toBe(4);
    expect(nextAcrossIndex('ArrowLeft', 0, 100, 8)).toBe(0);
    expect(nextAcrossIndex('ArrowDown', 3, 100, 8)).toBeUndefined();
    expect(nextIndex('ArrowRight', 3, 100, 8)).toBeUndefined();
    expect(nextAcrossIndex('End', 3, 100, 8)).toBe(99);
  });

  it('gives the rects of items on the main axis for a marquee', () => {
    const rects = listRects({ count: 3, size: 50, cross: 30, axis: 'horizontal', origin: { x: 10, y: 5 }, keyOf: (at) => `k${at}` });
    expect(rects[2]).toEqual({ key: 'k2', rect: { x: 110, y: 5, width: 50, height: 30 } });
    const column = listRects({ count: 2, size: 20, cross: 80, axis: 'vertical', origin: { x: 0, y: 0 }, keyOf: (at) => `k${at}` });
    expect(column[1]?.rect).toEqual({ x: 0, y: 20, width: 80, height: 20 });
  });
});

describe('K1 the sizes of tiles', { tags: ['critical'] }, () => {
  it('moves along the steps of the size tokens and stops at both ends', () => {
    expect(stepVirtualSize('size-64', 1)).toBe('size-80');
    expect(stepVirtualSize('size-64', -2)).toBe('size-48');
    expect(stepVirtualSize('size-24', -3)).toBe('size-24');
    expect(stepVirtualSize('size-256', 3)).toBe('size-256');
  });
});

describe('K1 the cells and rects of the grid', { tags: ['critical'] }, () => {
  const layout = gridLayout(SECTIONS, 4);
  const keys = Array.from({ length: 10 }, (_, at) => `k${at}`);

  it('numbers the tile rows across sections and skips the items of a collapsed section', () => {
    const { order, cells } = gridKeys(layout, keys);
    expect(order).toEqual(keys);
    expect(cells.get('k0')).toEqual({ row: 0, column: 0 });
    expect(cells.get('k5')).toEqual({ row: 1, column: 1 });
    expect(cells.get('k7')).toEqual({ row: 2, column: 0 });
    const folded = gridKeys(gridLayout([SECTIONS[0], { ...SECTIONS[1], collapsed: true }], 4), keys);
    expect(folded.order).toEqual(keys.slice(0, 7));
  });

  it('carries the cell of every rect so a marquee can report a cell rect', () => {
    const rects = gridRects({ layout, heights: HEIGHTS, tileWidth: 100, origin: { x: 0, y: 0 }, keyOf: (at) => `k${at}` });
    expect(rects.find((item) => item.key === 'k5')?.cell).toEqual({ row: 1, column: 1 });
    expect(rects.every((item) => item.cell !== undefined)).toBe(true);
  });
});

describe('K1 where a drop lands on the grid', { tags: ['critical'] }, () => {
  const layout = gridLayout(SECTIONS, 4);
  const sectionKeys = ['one', 'two'];
  const land = (x, y, canInto = () => true, sectioned = true) => gridPointAt({
    layout, heights: HEIGHTS, tileWidth: 100, origin: { x: 0, y: 0 }, point: { x, y }, sectionKeys, sectioned, canInto,
  });

  it('picks the gap nearest the pointer inside a row of tiles', () => {
    expect(land(40, 60)).toEqual({ kind: 'gap', index: 0, section: 'one' });
    expect(land(160, 60)).toEqual({ kind: 'gap', index: 2, section: 'one' });
    expect(land(390, 60)).toEqual({ kind: 'gap', index: 4, section: 'one' });
    expect(land(160, 200)).toEqual({ kind: 'gap', index: 6, section: 'one' });
  });

  it('turns a header into an into target only when the section takes drops', () => {
    expect(land(50, 10)).toEqual({ kind: 'into', section: 'one' });
    expect(land(50, 10, () => false)).toEqual({ kind: 'gap', index: 0, section: 'one' });
    expect(land(50, 260)).toEqual({ kind: 'into', section: 'two' });
  });

  it('lands at the end of the last row below the content, with no section on a flat grid', () => {
    expect(land(50, 9000)).toEqual({ kind: 'gap', index: 10, section: 'two' });
    const flat = gridLayout([{ header: false, count: 6, collapsed: false }], 4);
    const point = gridPointAt({
      layout: flat, heights: HEIGHTS, tileWidth: 100, origin: { x: 0, y: 0 }, point: { x: 250, y: 150 }, sectionKeys: [''], sectioned: false, canInto: () => false,
    });
    expect(point).toEqual({ kind: 'gap', index: 6 });
  });
});

describe('K1 the marks and keys of a grid reorder', { tags: ['critical'] }, () => {
  it('marks the tile before the gap, and the last tile when the gap is the end', () => {
    expect(gridMarkOf({ item: 3, gap: 3, total: 10, owners: [] })).toBe('before');
    expect(gridMarkOf({ item: 9, gap: 10, total: 10, owners: [] })).toBe('after');
    expect(gridMarkOf({ item: 4, gap: 3, total: 10, owners: [] })).toBeUndefined();
  });

  it('marks the last tile of a section when the gap closes that section', () => {
    const owners = ['one', 'one', 'one', 'two', 'two'];
    expect(gridMarkOf({ item: 2, gap: 3, section: 'one', total: 5, owners })).toBe('after');
    expect(gridMarkOf({ item: 3, gap: 3, section: 'one', total: 5, owners })).toBeUndefined();
    expect(gridMarkOf({ item: 3, gap: 3, section: 'two', total: 5, owners })).toBe('before');
  });

  it('reads Alt with the arrows as one place or one row, and nothing else', () => {
    const alt = (key, held = {}) => ({ key, altKey: true, ctrlKey: false, metaKey: false, ...held });
    expect(gridKeyStep(alt('ArrowRight'), 5)).toBe(1);
    expect(gridKeyStep(alt('ArrowLeft'), 5)).toBe(-1);
    expect(gridKeyStep(alt('ArrowDown'), 5)).toBe(5);
    expect(gridKeyStep(alt('ArrowUp'), 5)).toBe(-5);
    expect(gridKeyStep(alt('ArrowUp', { ctrlKey: true }), 5)).toBeUndefined();
    expect(gridKeyStep({ ...alt('ArrowUp'), altKey: false }, 5)).toBeUndefined();
    expect(gridKeyStep(alt('x'), 5)).toBeUndefined();
  });
});

describe('K1 the props a tile gets from the grid', { tags: ['critical'] }, () => {
  const quiet = { extrasOf: () => ({ marker: true }), swallowClick: () => false };
  const select = { isSelected: (key) => key === 'k1', click: () => undefined };

  it('gives a hole nothing and a plain grid only the reorder props', () => {
    expect(gridCellExtras({ key: 'k0', item: 0, select, moving: quiet, selecting: true, hole: true })).toEqual({});
    expect(gridCellExtras({ key: 'k0', item: 0, select, moving: quiet, selecting: false, hole: false })).toEqual({ marker: true });
  });

  it('marks the selected tile and routes a click to the selection unless a drag just ended', () => {
    const clicks = [];
    const model = { ...select, click: (key) => clicks.push(key) };
    const open = gridCellExtras({ key: 'k1', item: 1, select: model, moving: quiet, selecting: true, hole: false });
    expect(open['aria-selected']).toBe(true);
    open.onClick({});
    expect(clicks).toEqual(['k1']);
    const held = gridCellExtras({ key: 'k1', item: 1, select: model, moving: { ...quiet, swallowClick: () => true }, selecting: true, hole: false });
    held.onClick({});
    expect(clicks).toEqual(['k1']);
  });
});
