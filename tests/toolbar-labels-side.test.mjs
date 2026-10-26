/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import {
  createToolbarLayout, hideToolbar, migrateToolbarLayout, moveToolbar, moveToolbarToSide, setToolbarLabels, toolbarIdsOf,
} from '../src/composites/ToolbarDock';
import { DEFS, bar, def, fullDefs, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

describe('setToolbarLabels', () => {
  it.each([
    ['sets false on a layout with no map', undefined, false, { a: false }],
    ['sets true', undefined, true, { a: true }],
    ['flips an existing entry', { a: true }, false, { a: false }],
    ['keeps the other entries', { b: false }, true, { b: false, a: true }],
  ])('%s', (_name, labels, on, expected) => {
    const layout = createToolbarLayout(DEFS);
    const start = labels ? { ...layout, labels } : layout;
    expect(setToolbarLabels(start, 'a', on).labels).toEqual(expected);
  });

  it('returns the same layout when the value is already set', () => {
    const layout = setToolbarLabels(createToolbarLayout(DEFS), 'a', false);
    expect(setToolbarLabels(layout, 'a', false)).toBe(layout);
  });

  it('does not change the version or the input', () => {
    const layout = createToolbarLayout(DEFS);
    const next = setToolbarLabels(layout, 'a', false);
    expect(next.v).toBe(2);
    expect(layout.labels).toBeUndefined();
  });

  it('survives hide, show and move', () => {
    const layout = setToolbarLabels(createToolbarLayout(DEFS), 'a', false);
    expect(hideToolbar(layout, 'a').labels).toEqual({ a: false });
    expect(moveToolbar(layout, 'a', 'right', 0).labels).toEqual({ a: false });
  });
});

describe('migrateToolbarLayout labels', () => {
  const read = (labels) => migrateToolbarLayout(v2({ top: [[bar('a')]], left: [[bar('c')]] }, { labels }), DEFS).labels;

  it.each([
    ['keeps valid entries', { a: false, c: true }, { a: false, c: true }],
    ['drops an unknown toolbar', { a: false, zzz: true }, { a: false }],
    ['drops a value that is not a boolean', { a: 'no', c: 0, b: false }, { b: false }],
    ['drops a map with nothing valid', { a: 1 }, undefined],
    ['drops a map that is an array', [true], undefined],
    ['drops a map that is a string', 'yes', undefined],
    ['drops a null map', null, undefined],
  ])('%s', (_name, labels, expected) => {
    expect(read(labels)).toEqual(expected);
  });

  it('has no labels field when the saved layout had none', () => {
    expect('labels' in migrateToolbarLayout(v2({ top: [[bar('a')]] }), DEFS)).toBe(false);
  });

  it('keeps labels through a v1 upgrade and a JSON round trip', () => {
    const upgraded = migrateToolbarLayout({ v: 1, sides: { top: ['a'], left: ['c'] }, hidden: [], last: {}, labels: { a: false } }, DEFS);
    expect(upgraded.labels).toEqual({ a: false });
    const layout = setToolbarLabels(createToolbarLayout(DEFS), 'c', false);
    expect(migrateToolbarLayout(JSON.parse(JSON.stringify(layout)), DEFS)).toEqual(layout);
  });
});

describe('moveToolbarToSide', () => {
  it.each([
    ['right', 'a'],
    ['bottom', 'c'],
    ['left', 'b'],
  ])('moves to %s', (side, id) => {
    const layout = createToolbarLayout(DEFS);
    const moved = moveToolbarToSide(layout, id, side);
    expect(toolbarIdsOf(moved, side)).toContain(id);
    for (const other of ['top', 'left', 'right', 'bottom']) {
      if (other !== side) expect(toolbarIdsOf(moved, other)).not.toContain(id);
    }
  });

  it('puts the bar in a new lane when the side has none free', () => {
    const moved = moveToolbarToSide(createToolbarLayout(DEFS), 'a', 'left');
    expect(moved.sides.left).toEqual([[bar('c')], [bar('a')]]);
    expect(moved.sides.top).toEqual([[bar('b')]]);
  });

  it('takes the last spot on that side when it is free', () => {
    const defs = [def('a', 'top'), def('c', 'left')];
    const last = { c: { side: 'top', lane: 0, start: 0.5, size: 0.5 } };
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0, 0.4)]], left: [[bar('c')]] }, { last }), defs);
    expect(moveToolbarToSide(layout, 'c', 'top').sides.top).toEqual([[bar('a', 0, 0.4), bar('c', 0.5, 0.5)]]);
  });

  it('ignores a last spot on another side', () => {
    const defs = [def('a', 'top'), def('c', 'left')];
    const last = { c: { side: 'left', lane: 0, start: 0, size: 1 } };
    const layout = migrateToolbarLayout(v2({ top: [[bar('a')]], left: [[bar('c')]] }, { last }), defs);
    expect(moveToolbarToSide(layout, 'c', 'right').sides.right).toEqual([[bar('c')]]);
  });

  it('uses the largest gap when the side has two lanes', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'left')];
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0, 0.4)], [bar('b', 0.5, 0.5)]], left: [[bar('c')]] }), defs);
    const moved = moveToolbarToSide(layout, 'c', 'top');
    expect(moved.sides.top[0]?.map((place) => place.id)).toEqual(['a', 'c']);
    expect(moved.sides.top[1]).toEqual([bar('b', 0.5, 0.5)]);
    expect(moved.sides.left).toEqual([]);
  });

});

describe('moveToolbarToSide refusals and kept state', () => {
  it('is refused when the side has no room', () => {
    const layout = createToolbarLayout(fullDefs());
    expect(moveToolbarToSide(layout, 'top1', 'left')).toBe(layout);
  });

  it('is refused for a hidden toolbar, an unknown one and the same side', () => {
    const layout = createToolbarLayout(DEFS);
    expect(moveToolbarToSide(layout, 'd', 'top')).toBe(layout);
    expect(moveToolbarToSide(layout, 'zzz', 'top')).toBe(layout);
    expect(moveToolbarToSide(layout, 'a', 'top')).toBe(layout);
  });

  it('keeps last, hidden and labels as they were', () => {
    const hidden = hideToolbar(createToolbarLayout(DEFS), 'b');
    const layout = setToolbarLabels(hidden, 'a', false);
    const moved = moveToolbarToSide(layout, 'a', 'bottom');
    expect(moved).not.toBe(layout);
    expect(moved.last).toEqual(layout.last);
    expect(moved.hidden).toEqual(layout.hidden);
    expect(moved.labels).toEqual({ a: false });
  });

  it('drops the lane and the corner claim it leaves', () => {
    const moved = moveToolbarToSide(createToolbarLayout(DEFS), 'c', 'bottom');
    expect(moved.sides.left).toEqual([]);
    expect(moved.sides.bottom).toEqual([[bar('c')]]);
    expect(moved.corners['top-left']).toEqual(['h', 'h']);
  });
});
