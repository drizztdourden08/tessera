/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { allStateOf } from '../src/composites/selection/all-state-of';
import { checkAllOf } from '../src/composites/selection/check-all-of';
import { rangeBetween } from '../src/composites/selection/range-between';
import { rectKeys } from '../src/composites/selection/rect-keys';
import { selectionAction } from '../src/composites/selection/selection-action';
import { toggledKey } from '../src/composites/selection/toggled-key';
import { typeAheadIndex } from '../src/composites/selection/type-ahead-index';

const ORDER = ['a', 'b', 'c', 'd', 'e', 'f'];

const key = (name, held = {}) => ({ key: name, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...held });

describe('the selection math', () => {
  it('takes the keys between two keys in either direction', () => {
    expect(rangeBetween(ORDER, 'b', 'd')).toEqual(['b', 'c', 'd']);
    expect(rangeBetween(ORDER, 'd', 'b')).toEqual(['b', 'c', 'd']);
    expect(rangeBetween(ORDER, 'zz', 'b')).toEqual(['b']);
  });

  it('toggles a key without touching the set it was given', () => {
    const before = new Set(['a']);
    expect([...toggledKey(before, 'b')]).toEqual(['a', 'b']);
    expect([...toggledKey(before, 'a')]).toEqual([]);
    expect([...before]).toEqual(['a']);
  });

  it('reports none, some and all, and checks all or clears the shown keys', () => {
    expect(allStateOf(ORDER, new Set())).toBe('none');
    expect(allStateOf(ORDER, new Set(['a']))).toBe('some');
    expect(allStateOf(ORDER, new Set(ORDER))).toBe('all');
    expect([...checkAllOf(['a', 'b'], new Set(['a', 'x']))].sort()).toEqual(['a', 'b', 'x']);
    expect([...checkAllOf(['a', 'b'], new Set(['a', 'b', 'x']))]).toEqual(['x']);
  });

  it('takes a rectangle of cells on a grid, whatever corner it starts from', () => {
    const cells = { a: [0, 0], b: [0, 1], c: [0, 2], d: [1, 0], e: [1, 1], f: [1, 2] };
    const cellOf = (name) => (cells[name] ? { row: cells[name][0], column: cells[name][1] } : undefined);
    expect(rectKeys(ORDER, cellOf, 'a', 'e')).toEqual(['a', 'b', 'd', 'e']);
    expect(rectKeys(ORDER, cellOf, 'f', 'b')).toEqual(['b', 'c', 'e', 'f']);
    expect(rectKeys(ORDER, cellOf, 'a', 'missing')).toEqual(['missing']);
  });
});

describe('the keys of a selection', () => {
  it('maps Ctrl+A, Space, Shift+Space, Escape and a letter', () => {
    expect(selectionAction(key('a', { ctrlKey: true }))).toBe('all');
    expect(selectionAction(key('A', { metaKey: true }))).toBe('all');
    expect(selectionAction(key(' '))).toBe('toggle');
    expect(selectionAction(key(' ', { shiftKey: true }))).toBe('range');
    expect(selectionAction(key('Escape'))).toBe('clear');
    expect(selectionAction(key('q'))).toBe('type');
    expect(selectionAction(key('ArrowDown'))).toBeUndefined();
    expect(selectionAction(key('q', { altKey: true }))).toBeUndefined();
    expect(selectionAction(key('q', { ctrlKey: true }))).toBeUndefined();
  });

  it('finds the next label that starts with the typed text, wrapping round', () => {
    const labels = ['Apple', 'Avocado', 'Banana', 'Cherry', 'Apricot'];
    const input = { count: labels.length, labelAt: (at) => labels[at] };
    expect(typeAheadIndex({ ...input, from: 0, text: 'c' })).toBe(3);
    expect(typeAheadIndex({ ...input, from: 3, text: 'a' })).toBe(4);
    expect(typeAheadIndex({ ...input, from: 4, text: 'a' })).toBe(0);
    expect(typeAheadIndex({ ...input, from: 0, text: 'av' })).toBe(1);
    expect(typeAheadIndex({ ...input, from: 0, text: 'zz' })).toBe(-1);
    expect(typeAheadIndex({ ...input, from: 0, text: '' })).toBe(-1);
  });

  it('cycles through the labels of one letter when it is pressed again', () => {
    const labels = ['Ant', 'Bee', 'Ape', 'Asp'];
    const input = { count: labels.length, labelAt: (at) => labels[at], from: 0 };
    expect(typeAheadIndex({ ...input, text: 'aa' })).toBe(2);
  });
});
