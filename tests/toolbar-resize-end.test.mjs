/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { MIN_BAR_PX, createToolbarLayout, resizeToolbarEnd, toolbarEndRange } from '../src/composites/ToolbarDock';

const def = (id, defaultSide) => ({ id, label: `Label ${id}`, defaultSide });

const BASE = createToolbarLayout([def('a', 'top'), def('b', 'top'), def('c', 'top'), def('l', 'left')]);

const METRICS = { spans: { top: [1000, 1000], bottom: [1000], left: [600], right: [600] } };

const lane = (...places) => ({ ...BASE, sides: { ...BASE.sides, top: [places] } });

const THREE = lane({ id: 'a', start: 0, size: 0.2 }, { id: 'b', start: 0.3, size: 0.2 }, { id: 'c', start: 0.6, size: 0.2 });

const placeOf = (layout, id) => layout.sides.top[0].find((place) => place.id === id);

const shape = (layout) => layout.sides.top[0].map(({ id, start, size }) => [id, Number(start.toFixed(6)) + 0, Number(size.toFixed(6)) + 0]);

describe('resizeToolbarEnd, end handle', () => {
  it('grows into a gap and leaves the neighbours alone', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 250);
    expect(shape(next)).toEqual([['a', 0, 0.25], ['b', 0.3, 0.2], ['c', 0.6, 0.2]]);
  });

  it('pushes one neighbour, which keeps its size', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 350);
    expect(shape(next)).toEqual([['a', 0, 0.35], ['b', 0.35, 0.2], ['c', 0.6, 0.2]]);
  });

  it('pushes a chain of neighbours', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 500);
    expect(shape(next)).toEqual([['a', 0, 0.5], ['b', 0.5, 0.2], ['c', 0.7, 0.2]]);
  });

  it('clamps so the chain never passes the lane end', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 5000);
    expect(shape(next)).toEqual([['a', 0, 0.6], ['b', 0.6, 0.2], ['c', 0.8, 0.2]]);
  });

  it('gives the origin back when the gesture reverses', () => {
    const pushed = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 500);
    expect(pushed).not.toBe(THREE);
    expect(resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 200)).toBe(THREE);
    expect(shape(resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 300))).toEqual(shape(THREE).map(([id, start, size]) => [id, start, id === 'a' ? 0.3 : size]));
  });

  it('keeps the minimum size', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 0);
    expect(placeOf(next, 'a').size).toBeCloseTo(MIN_BAR_PX / 1000, 9);
  });

  it('never mutates the origin', () => {
    const before = JSON.stringify(THREE);
    resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 500);
    expect(JSON.stringify(THREE)).toBe(before);
  });

  it('leaves the other lane and the other sides alone', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'a', end: 'end' }, 500);
    expect(next.sides.left).toBe(THREE.sides.left);
    expect(next.sides.top[1]).toBe(THREE.sides.top[1]);
  });

  it('returns the origin for an unknown toolbar or a lane without a measure', () => {
    expect(resizeToolbarEnd(THREE, METRICS, { id: 'zzz', end: 'end' }, 500)).toBe(THREE);
    expect(resizeToolbarEnd(THREE, { spans: { ...METRICS.spans, top: [0, 0] } }, { id: 'a', end: 'end' }, 500)).toBe(THREE);
  });
});

describe('resizeToolbarEnd, start handle', () => {
  it('shrinks a bar from its start without moving the end', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'c', end: 'start' }, 700);
    expect(shape(next)).toEqual([['a', 0, 0.2], ['b', 0.3, 0.2], ['c', 0.7, 0.1]]);
  });

  it('pushes the neighbour on the left, which keeps its size', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'c', end: 'start' }, 450);
    expect(shape(next)).toEqual([['a', 0, 0.2], ['b', 0.25, 0.2], ['c', 0.45, 0.35]]);
  });

  it('pushes a chain and clamps at the lane start', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'c', end: 'start' }, -300);
    expect(shape(next)).toEqual([['a', 0, 0.2], ['b', 0.2, 0.2], ['c', 0.4, 0.4]]);
  });

  it('keeps the minimum size', () => {
    const next = resizeToolbarEnd(THREE, METRICS, { id: 'c', end: 'start' }, 5000);
    expect(placeOf(next, 'c').size).toBeCloseTo(MIN_BAR_PX / 1000, 9);
    expect(placeOf(next, 'c').start + placeOf(next, 'c').size).toBeCloseTo(0.8, 9);
  });

  it('gives the origin back when the gesture reverses', () => {
    expect(resizeToolbarEnd(THREE, METRICS, { id: 'c', end: 'start' }, 600)).toBe(THREE);
  });
});

describe('resizeToolbarEnd on a vertical side', () => {
  it('measures the lane along its own axis', () => {
    const layout = { ...BASE, sides: { ...BASE.sides, left: [[{ id: 'l', start: 0, size: 0.5 }]] } };
    const next = resizeToolbarEnd(layout, METRICS, { id: 'l', end: 'end' }, 300);
    expect(next.sides.left[0][0]).toMatchObject({ start: 0, size: 0.5 });
    const grown = resizeToolbarEnd(layout, METRICS, { id: 'l', end: 'end' }, 450);
    expect(grown.sides.left[0][0].size).toBeCloseTo(0.75, 9);
  });
});

describe('toolbarEndRange', () => {
  it('gives value, min and max in pixels for an end handle', () => {
    expect(toolbarEndRange(THREE, METRICS, 'a', 'end')).toEqual({ value: 200, min: 32, max: 600, span: 1000 });
    expect(toolbarEndRange(THREE, METRICS, 'c', 'end')).toEqual({ value: 800, min: 632, max: 1000, span: 1000 });
  });

  it('gives value, min and max in pixels for a start handle', () => {
    const a = toolbarEndRange(THREE, METRICS, 'a', 'start');
    expect(a).toMatchObject({ value: 0, min: 0, span: 1000 });
    expect(a.max).toBeCloseTo(168, 6);
    const c = toolbarEndRange(THREE, METRICS, 'c', 'start');
    expect(c).toMatchObject({ span: 1000 });
    expect(c.value).toBeCloseTo(600, 6);
    expect(c.min).toBeCloseTo(400, 6);
    expect(c.max).toBeCloseTo(768, 6);
  });

  it('is null for an unknown toolbar or a lane without a measure', () => {
    expect(toolbarEndRange(THREE, METRICS, 'zzz', 'end')).toBeNull();
    expect(toolbarEndRange(THREE, { spans: { ...METRICS.spans, top: [0, 0] } }, 'a', 'end')).toBeNull();
  });

  it('keeps the value inside the range', () => {
    for (const id of ['a', 'b', 'c']) {
      for (const end of ['start', 'end']) {
        const range = toolbarEndRange(THREE, METRICS, id, end);
        expect(range.value).toBeGreaterThanOrEqual(range.min - 1e-6);
        expect(range.value).toBeLessThanOrEqual(range.max + 1e-6);
      }
    }
  });
});
