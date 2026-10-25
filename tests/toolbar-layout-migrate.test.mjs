/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { createToolbarLayout, hideToolbar, migrateToolbarLayout, moveToolbar, toolbarIdsOf } from '../src/composites/ToolbarDock';
import { DEFS, bar, def, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

const SAVED_LAYOUT = { v: 1, sides: { top: ['a', 'b'], bottom: [], left: ['c'], right: [] }, hidden: ['d'], last: { a: { side: 'top', index: 0 } } };

describe('migrateToolbarLayout input', () => {
  it('rebuilds from definitions on a bad or missing version', () => {
    const fresh = createToolbarLayout(DEFS);
    expect(migrateToolbarLayout(null, DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout('x', DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout({ sides: { top: ['b'] } }, DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout({ v: 3, sides: { top: ['b'] } }, DEFS)).toEqual(fresh);
  });

  it('survives a JSON round trip', () => {
    const layout = hideToolbar(moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0), 'c');
    const back = JSON.parse(JSON.stringify(layout));
    expect(back).toEqual(layout);
    expect(migrateToolbarLayout(back, DEFS)).toEqual(layout);
  });

  it('survives a JSON round trip with shared lanes', () => {
    const raw = v2({ top: [[bar('a', 0, 0.4), bar('b', 0.5, 0.5)]], left: [[bar('c')]] }, { corners: { 'top-left': ['v', 'h'] } });
    const layout = migrateToolbarLayout(raw, DEFS);
    expect(migrateToolbarLayout(JSON.parse(JSON.stringify(layout)), DEFS)).toEqual(layout);
    expect(layout.corners['top-left']).toEqual(['v', 'h']);
  });
});

describe('migrateToolbarLayout from v1', () => {
  it('turns each id into a full-width lane and each last into a v2 spot', () => {
    expect(migrateToolbarLayout(SAVED_LAYOUT, DEFS)).toEqual({
      v: 2,
      sides: { top: [[bar('a')], [bar('b')]], bottom: [], left: [[bar('c')]], right: [] },
      corners: { 'top-left': ['h', 'h', 'v'], 'top-right': ['h', 'h'], 'bottom-left': ['v'], 'bottom-right': [] },
      hidden: ['d'],
      last: { a: { side: 'top', lane: 0, start: 0, size: 1 } },
    });
  });

  it('is the layout createToolbarLayout draws for the same definitions', () => {
    expect(migrateToolbarLayout({ ...SAVED_LAYOUT, last: {} }, DEFS)).toEqual(createToolbarLayout(DEFS));
  });

  it('drops unknown ids, duplicates and anything over two lanes', () => {
    const raw = {
      v: 1,
      sides: { top: ['ghost', 'a', 'a', 'b', 'c'], bottom: ['a', 7], left: 'nope', right: [] },
      hidden: ['b', 'zzz'],
      last: { a: { side: 'top', index: 0 }, ghost: { side: 'top', index: 0 }, b: { side: 'nowhere', index: 0 }, c: { side: 'left', index: -1 } },
    };
    const layout = migrateToolbarLayout(raw, DEFS);
    expect(toolbarIdsOf(layout, 'top')).toEqual(['a', 'b']);
    expect(layout.sides.bottom).toEqual([]);
    expect(toolbarIdsOf(layout, 'left')).toEqual(['c']);
    expect(layout.hidden).toEqual(['d']);
    expect(layout.last).toEqual({ a: { side: 'top', lane: 0, start: 0, size: 1 } });
  });

  it('places definitions that are missing anywhere', () => {
    const layout = migrateToolbarLayout({ v: 1, sides: { top: ['a'] }, hidden: [], last: {} }, DEFS);
    expect(toolbarIdsOf(layout, 'top')).toEqual(['a', 'b']);
    expect(toolbarIdsOf(layout, 'left')).toEqual(['c']);
    expect(layout.hidden).toEqual(['d']);
  });
});

describe('migrateToolbarLayout from v2, keeping', () => {
  it('keeps a valid layout as it is, and is idempotent', () => {
    const layout = hideToolbar(moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0), 'c');
    const once = migrateToolbarLayout(layout, DEFS);
    expect(once).toEqual(layout);
    expect(migrateToolbarLayout(once, DEFS)).toEqual(once);
  });

  it('is idempotent on a messy layout after one pass', () => {
    const raw = v2({
      top: [[bar('b', 0.5, 0.9), bar('a', 0.1, 0.7), bar('ghost'), bar('a', 0, 0.2)], [], [bar('c')], [bar('d')]],
      left: 'nope',
    }, { hidden: ['d', 'zzz'], corners: { 'top-left': ['v', 'h', 'x', 'h', 'h', 'h'] }, last: { c: { side: 'left', lane: 0, start: 2, size: 5 } } });
    const once = migrateToolbarLayout(raw, DEFS);
    expect(migrateToolbarLayout(once, DEFS)).toEqual(once);
  });

  it('keeps a stored corner order that fits', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'left')];
    const raw = v2({ top: [[bar('a')], [bar('b')]], left: [[bar('c')]] }, { corners: { 'top-left': ['h', 'v', 'h'] } });
    expect(migrateToolbarLayout(raw, defs).corners['top-left']).toEqual(['h', 'v', 'h']);
  });

  it('cleans last spots and drops the broken ones', () => {
    const raw = v2({ top: [[bar('a')]] }, {
      last: {
        a: { side: 'top', lane: 1, start: 0.25, size: 0.5 },
        b: { side: 'top', lane: 0, start: 0, size: 0 },
        c: { side: 'nowhere', lane: 0, start: 0, size: 1 },
        ghost: { side: 'top', lane: 0, start: 0, size: 1 },
      },
    });
    expect(migrateToolbarLayout(raw, DEFS).last).toEqual({ a: { side: 'top', lane: 1, start: 0.25, size: 0.5 } });
  });
});

describe('migrateToolbarLayout from v2, cleaning', () => {
  it('cleans ids, drops duplicates and unknown toolbars and places the missing ones', () => {
    const raw = v2({ top: [[bar('ghost'), bar('a', 0, 0.5), bar('a', 0.5, 0.5)]], bottom: [[bar('a')]] }, { hidden: ['b', 'zzz'] });
    const layout = migrateToolbarLayout(raw, DEFS);
    expect(layout.sides.top).toEqual([[bar('a', 0, 0.5)]]);
    expect(layout.sides.left).toEqual([[bar('c')]]);
    expect(layout.sides.bottom).toEqual([]);
    expect(layout.hidden).toEqual(['b', 'd']);
  });

  it('drops empty lanes with their corner claims, and lanes over the cap', () => {
    const raw = v2({ top: [[], [bar('a')], [bar('b')], [bar('c')]] }, { corners: { 'top-left': ['h', 'h', 'h', 'h'] } });
    const layout = migrateToolbarLayout(raw, [...DEFS]);
    expect(layout.sides.top).toEqual([[bar('a')], [bar('b')]]);
    expect(layout.corners['top-left']).toEqual(['h', 'h', 'v']);
    expect(toolbarIdsOf(layout, 'left')).toEqual(['c']);
  });

  it('normalizes corners to the lanes that exist', () => {
    const raw = v2({ top: [[bar('a')]], left: [[bar('c')]] }, { corners: { 'top-left': ['v', 'v', 'h', 'h'], 'top-right': 'no' } });
    const layout = migrateToolbarLayout(raw, [def('a', 'top'), def('c', 'left')]);
    expect(layout.corners['top-left']).toEqual(['v', 'h']);
    expect(layout.corners['top-right']).toEqual(['h']);
    expect(layout.corners['bottom-left']).toEqual(['v']);
  });
});

describe('migrateToolbarLayout from v2, fitting', () => {
  it('clamps starts and sizes and drops places that have no size', () => {
    const raw = v2({ top: [[bar('a', -3, 7), bar('b', 0.2, 0), bar('c', Number.NaN, 0.3)]] });
    const layout = migrateToolbarLayout(raw, DEFS);
    expect(layout.sides.top).toEqual([[bar('a', 0, 1)], [bar('b')]]);
    expect(layout.sides.left).toEqual([[bar('c')]]);
  });

  it('sorts each lane by start', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('b', 0.6, 0.4), bar('a', 0, 0.4)]] }), DEFS);
    expect(layout.sides.top[0].map((place) => place.id)).toEqual(['a', 'b']);
  });

  it('pushes overlapping places apart', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0, 0.4), bar('b', 0.3, 0.5)]] }), DEFS);
    const [a, b] = layout.sides.top[0];
    expect(a).toEqual(bar('a', 0, 0.4));
    expect(b.start).toBeCloseTo(0.4);
    expect(b.size).toBe(0.5);
  });

  it('pushes back from the lane end instead of running past it', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0.7, 0.2), bar('b', 0.75, 0.2)]] }), DEFS);
    const [a, b] = layout.sides.top[0];
    expect(a.start).toBeCloseTo(0.6);
    expect(b.start).toBeCloseTo(0.8);
    expect(a.size).toBe(0.2);
    expect(b.size).toBe(0.2);
  });

  it('scales the sizes down when the places cannot fit', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0, 0.8), bar('b', 0.5, 0.8)]] }), DEFS);
    const [a, b] = layout.sides.top[0];
    expect(a.start).toBe(0);
    expect(a.size + b.size).toBeCloseTo(1);
    expect(b.start).toBeCloseTo(a.size);
  });
});
