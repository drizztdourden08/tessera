/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import {
  MAX_LANES, MAX_PER_SIDE, MIN_SHARE, TOOLBAR_LAYOUT_V, createToolbarLayout, migrateToolbarLayout, moveToolbar, placeToolbar, toolbarIdsOf, toolbarOrientation,
} from '../src/composites/ToolbarDock';
import { DEFS, bar, def, fullDefs, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

describe('constants', () => {
  it('names the model version and the lane limits', () => {
    expect(TOOLBAR_LAYOUT_V).toBe(2);
    expect(MAX_LANES).toBe(2);
    expect(MAX_PER_SIDE).toBe(MAX_LANES);
    expect(MIN_SHARE).toBe(0.15);
  });
});

describe('createToolbarLayout', () => {
  it('places shown toolbars on their default side as full-width lanes and hides the rest', () => {
    const layout = createToolbarLayout(DEFS);
    expect(layout.v).toBe(2);
    expect(layout.sides).toEqual({ top: [[bar('a')], [bar('b')]], bottom: [], left: [[bar('c')]], right: [] });
    expect(layout.hidden).toEqual(['d']);
    expect(layout.last).toEqual({});
  });

  it('gives the corners to the top and bottom lanes first, as before', () => {
    expect(createToolbarLayout(DEFS).corners).toEqual({
      'top-left': ['h', 'h', 'v'],
      'top-right': ['h', 'h'],
      'bottom-left': ['v'],
      'bottom-right': [],
    });
  });

  it('caps a side at two lanes and falls back top, left, right, bottom', () => {
    const layout = createToolbarLayout([def('a', 'top'), def('b', 'top'), def('c', 'top'), def('d', 'top'), def('e', 'top')]);
    expect(toolbarIdsOf(layout, 'top')).toEqual(['a', 'b']);
    expect(toolbarIdsOf(layout, 'left')).toEqual(['c', 'd']);
    expect(toolbarIdsOf(layout, 'right')).toEqual(['e']);
  });

  it('hides what finds no lane', () => {
    const layout = createToolbarLayout([...fullDefs(), def('extra', 'top')]);
    expect(layout.hidden).toEqual(['extra']);
  });
});

describe('placeToolbar', () => {
  it('places a toolbar and returns the new layout, or null when no side has room', () => {
    const layout = createToolbarLayout(DEFS);
    const placed = placeToolbar(layout, 'd', DEFS[3]);
    expect(placed.sides.bottom).toEqual([[bar('d')]]);
    expect(placed.hidden).toEqual([]);
    const defs = [...fullDefs(), def('extra', 'top')];
    expect(placeToolbar(createToolbarLayout(defs), 'extra', defs[8])).toBeNull();
  });
});

describe('toolbarIdsOf', () => {
  it('lists the ids of a side lane by lane, each lane by start', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('b', 0.5, 0.5), bar('a', 0, 0.5)], [bar('c')]] }), [def('a', 'top'), def('b', 'top'), def('c', 'top')]);
    expect(toolbarIdsOf(layout, 'top')).toEqual(['a', 'b', 'c']);
    expect(toolbarIdsOf(layout, 'left')).toEqual([]);
  });
});

describe('moveToolbar', () => {
  it('moves to another side with room as a full-width lane and records last', () => {
    const next = moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0);
    expect(toolbarIdsOf(next, 'top')).toEqual(['b']);
    expect(next.sides.right).toEqual([[bar('a')]]);
    expect(next.last.a).toEqual({ side: 'right', lane: 0, start: 0, size: 1 });
    expect(next.corners['top-left']).toEqual(['h', 'v']);
    expect(next.corners['top-right']).toEqual(['h', 'v']);
  });

  it('refuses a side that already holds two other lanes', () => {
    const layout = createToolbarLayout(DEFS);
    expect(moveToolbar(layout, 'c', 'top', 0)).toBe(layout);
  });

  it('reorders within the same side, even when full', () => {
    const next = moveToolbar(createToolbarLayout(DEFS), 'b', 'top', 0);
    expect(toolbarIdsOf(next, 'top')).toEqual(['b', 'a']);
    expect(next.last.b).toEqual({ side: 'top', lane: 0, start: 0, size: 1 });
  });

  it('clamps the index', () => {
    expect(toolbarIdsOf(moveToolbar(createToolbarLayout(DEFS), 'c', 'right', 9), 'right')).toEqual(['c']);
  });

  it('returns the same object when nothing changes', () => {
    const moved = moveToolbar(createToolbarLayout(DEFS), 'a', 'top', 0);
    expect(moveToolbar(moved, 'a', 'top', 0)).toBe(moved);
  });

  it('ignores a toolbar that is hidden or unknown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(moveToolbar(layout, 'd', 'right', 0)).toBe(layout);
    expect(moveToolbar(layout, 'zzz', 'right', 0)).toBe(layout);
  });
});

describe('toolbarOrientation', () => {
  it('is horizontal on top and bottom, vertical on left and right', () => {
    expect(toolbarOrientation('top')).toBe('horizontal');
    expect(toolbarOrientation('bottom')).toBe('horizontal');
    expect(toolbarOrientation('left')).toBe('vertical');
    expect(toolbarOrientation('right')).toBe('vertical');
  });
});
