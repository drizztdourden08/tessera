/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { columnsOf } from '../src/composites/reorder/columns-of';
import { gridInsertionAt } from '../src/composites/reorder/grid-insertion-at';
import { pointerInsertion } from '../src/composites/reorder/pointer-insertion';
import { reorderStep } from '../src/composites/reorder/reorder-step';

const keys = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, ...held });

const boxAt = (column, row) => ({ getBoundingClientRect: () => ({ left: column * 20, top: row * 20, width: 16, height: 16 }) });

const gridOf = (columns, total) => ({
  querySelectorAll: () => Array.from({ length: total }, (_, index) => boxAt(index % columns, Math.floor(index / columns))),
});

describe('reorderStep on the grid axis', () => {
  const options = { axis: 'grid', chord: 'plain', index: 5, total: 12, columns: 4 };

  it('steps one place on Left and Right and one row on Up and Down', () => {
    expect(reorderStep(keys('ArrowLeft'), options)).toBe(4);
    expect(reorderStep(keys('ArrowRight'), options)).toBe(6);
    expect(reorderStep(keys('ArrowUp'), options)).toBe(1);
    expect(reorderStep(keys('ArrowDown'), options)).toBe(9);
  });

  it('stops at both ends of the list', () => {
    expect(reorderStep(keys('ArrowLeft'), { ...options, index: 0 })).toBeUndefined();
    expect(reorderStep(keys('ArrowUp'), { ...options, index: 2 })).toBeUndefined();
    expect(reorderStep(keys('ArrowRight'), { ...options, index: 11 })).toBeUndefined();
    expect(reorderStep(keys('ArrowDown'), { ...options, index: 9 })).toBeUndefined();
  });

  it('treats a missing column count as one column', () => {
    expect(reorderStep(keys('ArrowDown'), { axis: 'grid', chord: 'plain', index: 1, total: 4 })).toBe(2);
  });

  it('keeps the Alt chord apart from the plain one', () => {
    const alt = { ...options, chord: 'alt' };
    expect(reorderStep(keys('ArrowDown'), alt)).toBeUndefined();
    expect(reorderStep(keys('ArrowDown', { altKey: true }), alt)).toBe(9);
    expect(reorderStep(keys('ArrowRight', { altKey: true }), alt)).toBe(6);
    expect(reorderStep(keys('ArrowDown', { altKey: true }), options)).toBeUndefined();
  });

  it('leaves the other axes as they were', () => {
    const vertical = { axis: 'vertical', chord: 'plain', index: 1, total: 3, columns: 4 };
    expect(reorderStep(keys('ArrowDown'), vertical)).toBe(2);
    expect(reorderStep(keys('ArrowRight'), vertical)).toBeUndefined();
  });
});

describe('gridInsertionAt', () => {
  const list = gridOf(4, 10);
  const selector = '[data-swatch-index]';

  it('lands before the cell whose left half the pointer is in', () => {
    expect(gridInsertionAt(list, selector, 21, 5)).toBe(1);
    expect(gridInsertionAt(list, selector, 31, 5)).toBe(2);
    expect(gridInsertionAt(list, selector, 21, 25)).toBe(5);
  });

  it('lands before the first cell of the next row when the pointer is past the end of a row', () => {
    expect(gridInsertionAt(list, selector, 200, 5)).toBe(4);
    expect(gridInsertionAt(list, selector, 200, 25)).toBe(8);
  });

  it('lands before the next row when the pointer is in the gap between rows', () => {
    expect(gridInsertionAt(list, selector, 70, 18)).toBe(4);
  });

  it('lands at the end below the last row and with no list', () => {
    expect(gridInsertionAt(list, selector, 5, 400)).toBe(10);
    expect(gridInsertionAt(null, selector, 5, 5)).toBe(0);
  });
});

describe('pointerInsertion', () => {
  it('reads both coordinates on the grid and one on a line', () => {
    const list = gridOf(4, 8);
    expect(pointerInsertion(list, '[data-swatch-index]', 'grid', { clientX: 21, clientY: 25 })).toBe(5);
    expect(pointerInsertion(list, '[data-swatch-index]', 'vertical', { clientX: 900, clientY: 25 })).toBe(4);
    expect(pointerInsertion(list, '[data-swatch-index]', 'horizontal', { clientX: 21, clientY: 900 })).toBe(1);
  });
});

describe('columnsOf', () => {
  it('counts the cells that share the first row', () => {
    expect(columnsOf(gridOf(4, 10), '[data-swatch-index]')).toBe(4);
    expect(columnsOf(gridOf(7, 30), '[data-swatch-index]')).toBe(7);
  });

  it('counts every cell when they all fit in one row, and is one with no cells', () => {
    expect(columnsOf(gridOf(8, 3), '[data-swatch-index]')).toBe(3);
    expect(columnsOf(gridOf(8, 0), '[data-swatch-index]')).toBe(1);
    expect(columnsOf(null, '[data-swatch-index]')).toBe(1);
  });
});
