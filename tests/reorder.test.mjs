/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { dropMarkOf } from '../src/composites/reorder/drop-mark-of';
import { finalIndex } from '../src/composites/reorder/final-index';
import { insertionAt } from '../src/composites/reorder/insertion-at';
import { reorderStep } from '../src/composites/reorder/reorder-step';

const keys = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, ...held });

const boxOf = (left, top, width, height) => ({ getBoundingClientRect: () => ({ left, top, width, height }) });

const listOf = (...boxes) => ({ querySelectorAll: () => boxes });

describe('reorderStep', () => {
  it('steps one place on the vertical keys and stops at both ends', () => {
    const options = { axis: 'vertical', chord: 'plain', index: 1, total: 3 };
    expect(reorderStep(keys('ArrowUp'), options)).toBe(0);
    expect(reorderStep(keys('ArrowDown'), options)).toBe(2);
    expect(reorderStep(keys('ArrowUp'), { ...options, index: 0 })).toBeUndefined();
    expect(reorderStep(keys('ArrowDown'), { ...options, index: 2 })).toBeUndefined();
  });

  it('reads the left and right keys on the horizontal axis and ignores the vertical ones', () => {
    const options = { axis: 'horizontal', chord: 'plain', index: 1, total: 3 };
    expect(reorderStep(keys('ArrowLeft'), options)).toBe(0);
    expect(reorderStep(keys('ArrowRight'), options)).toBe(2);
    expect(reorderStep(keys('ArrowUp'), options)).toBeUndefined();
  });

  it('keeps the plain chord free of Alt, Ctrl and Meta', () => {
    const options = { axis: 'vertical', chord: 'plain', index: 1, total: 3 };
    expect(reorderStep(keys('ArrowDown', { altKey: true }), options)).toBeUndefined();
    expect(reorderStep(keys('ArrowDown', { ctrlKey: true }), options)).toBeUndefined();
    expect(reorderStep(keys('ArrowDown', { metaKey: true }), options)).toBeUndefined();
  });

  it('asks for Alt on the alt chord and refuses it with Ctrl or Meta', () => {
    const options = { axis: 'vertical', chord: 'alt', index: 1, total: 3 };
    expect(reorderStep(keys('ArrowDown'), options)).toBeUndefined();
    expect(reorderStep(keys('ArrowDown', { altKey: true }), options)).toBe(2);
    expect(reorderStep(keys('ArrowUp', { altKey: true }), options)).toBe(0);
    expect(reorderStep(keys('ArrowDown', { altKey: true, ctrlKey: true }), options)).toBeUndefined();
    expect(reorderStep(keys('ArrowDown', { altKey: true, metaKey: true }), options)).toBeUndefined();
  });
});

describe('finalIndex and dropMarkOf', () => {
  it('takes the slot the row leaves into account when it moves down', () => {
    expect(finalIndex({ from: 0, before: 3 })).toBe(2);
    expect(finalIndex({ from: 2, before: 0 })).toBe(0);
    expect(finalIndex({ from: 1, before: 1 })).toBe(1);
    expect(finalIndex({ from: 1, before: 2 })).toBe(1);
  });

  it('marks the row the drop lands before, and the last row when it lands at the end', () => {
    expect(dropMarkOf(null, 0, 3)).toBeUndefined();
    expect(dropMarkOf({ from: 1, before: 1 }, 1, 3)).toBeUndefined();
    expect(dropMarkOf({ from: 2, before: 0 }, 0, 3)).toBe('before');
    expect(dropMarkOf({ from: 0, before: 3 }, 2, 3)).toBe('after');
    expect(dropMarkOf({ from: 0, before: 3 }, 1, 3)).toBeUndefined();
  });
});

describe('insertionAt', () => {
  const rows = listOf(boxOf(0, 0, 100, 20), boxOf(0, 20, 100, 20), boxOf(0, 40, 100, 20));
  const columns = listOf(boxOf(0, 0, 20, 100), boxOf(20, 0, 20, 100), boxOf(40, 0, 20, 100));

  it('finds the slot from the pointer height on a vertical list', () => {
    expect(insertionAt(rows, 'li', 'vertical', 5)).toBe(0);
    expect(insertionAt(rows, 'li', 'vertical', 15)).toBe(1);
    expect(insertionAt(rows, 'li', 'vertical', 59)).toBe(3);
  });

  it('finds the slot from the pointer position across on a horizontal list', () => {
    expect(insertionAt(columns, 'li', 'horizontal', 5)).toBe(0);
    expect(insertionAt(columns, 'li', 'horizontal', 35)).toBe(2);
    expect(insertionAt(columns, 'li', 'horizontal', 59)).toBe(3);
  });

  it('answers 0 for a list that is not there', () => {
    expect(insertionAt(null, 'li', 'vertical', 10)).toBe(0);
  });
});
