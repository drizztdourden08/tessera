/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import {
  MAX_PER_SIDE, canShowToolbar, createToolbarLayout, hideToolbar, isToolbarShown, migrateToolbarLayout, moveToolbar, showToolbar,
  toggleToolbar, toolbarOrientation,
} from '../src/composites/ToolbarDock';

const def = (id, defaultSide, extra = {}) => ({ id, label: id, defaultSide, ...extra });

const DEFS = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'bottom', { hiddenByDefault: true })];

const fullDefs = () => ['top', 'left', 'right', 'bottom'].flatMap((side) => [def(`${side}1`, side), def(`${side}2`, side)]);

describe('createToolbarLayout', () => {
  it('places shown toolbars on their default side and hides the rest', () => {
    const layout = createToolbarLayout(DEFS);
    expect(layout.v).toBe(1);
    expect(layout.sides).toEqual({ top: ['a', 'b'], bottom: [], left: ['c'], right: [] });
    expect(layout.hidden).toEqual(['d']);
  });

  it('caps a side at two and falls back top, left, right, bottom', () => {
    const layout = createToolbarLayout([def('a', 'top'), def('b', 'top'), def('c', 'top'), def('d', 'top'), def('e', 'top')]);
    expect(layout.sides.top).toEqual(['a', 'b']);
    expect(layout.sides.left).toEqual(['c', 'd']);
    expect(layout.sides.right).toEqual(['e']);
    expect(MAX_PER_SIDE).toBe(2);
  });

  it('hides what finds no lane', () => {
    const layout = createToolbarLayout([...fullDefs(), def('extra', 'top')]);
    expect(layout.hidden).toEqual(['extra']);
  });
});

describe('moveToolbar', () => {
  it('moves to another side with room and records last', () => {
    const next = moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0);
    expect(next.sides.top).toEqual(['b']);
    expect(next.sides.right).toEqual(['a']);
    expect(next.last.a).toEqual({ side: 'right', index: 0 });
  });

  it('refuses a side that already holds two others', () => {
    const layout = createToolbarLayout(DEFS);
    expect(moveToolbar(layout, 'c', 'top', 0)).toBe(layout);
  });

  it('reorders within the same side, even when full', () => {
    const layout = createToolbarLayout(DEFS);
    const next = moveToolbar(layout, 'b', 'top', 0);
    expect(next.sides.top).toEqual(['b', 'a']);
    expect(next.last.b).toEqual({ side: 'top', index: 0 });
  });

  it('clamps the index', () => {
    const next = moveToolbar(createToolbarLayout(DEFS), 'c', 'right', 9);
    expect(next.sides.right).toEqual(['c']);
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

describe('hideToolbar and showToolbar', () => {
  it('hide then show returns to last', () => {
    const layout = createToolbarLayout(DEFS);
    const hidden = hideToolbar(layout, 'a');
    expect(hidden.sides.top).toEqual(['b']);
    expect(hidden.hidden).toContain('a');
    expect(hidden.last.a).toEqual({ side: 'top', index: 0 });
    const back = showToolbar(hidden, 'a', DEFS);
    expect(back.sides.top).toEqual(['a', 'b']);
    expect(back.hidden).not.toContain('a');
  });

  it('shows on the default side when there is no last', () => {
    expect(showToolbar(createToolbarLayout(DEFS), 'd', DEFS).sides.bottom).toEqual(['d']);
  });

  it('falls back in the order top, left, right, bottom', () => {
    const four = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'left'), def('e', 'right'), def('f', 'right')];
    const right = [...four.slice(0, 4), def('x', 'top', { hiddenByDefault: true })];
    expect(showToolbar(createToolbarLayout(right), 'x', right).sides.right).toEqual(['x']);
    const bottom = [...four, def('y', 'top', { hiddenByDefault: true })];
    expect(showToolbar(createToolbarLayout(bottom), 'y', bottom).sides.bottom).toEqual(['y']);
  });

  it('falls back to left once top is full', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'top', { hiddenByDefault: true })];
    const shown = showToolbar(createToolbarLayout(defs), 'c', defs);
    expect(shown.sides.left).toEqual(['c']);
  });

  it('refuses when all eight lanes are full', () => {
    const defs = [...fullDefs(), def('extra', 'top')];
    const layout = createToolbarLayout(defs);
    expect(showToolbar(layout, 'extra', defs)).toBe(layout);
    expect(canShowToolbar(layout, 'extra', defs)).toBe(false);
  });

  it('returns the same object when already shown, hidden or unknown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(showToolbar(layout, 'a', DEFS)).toBe(layout);
    expect(hideToolbar(layout, 'd')).toBe(layout);
    expect(hideToolbar(layout, 'zzz')).toBe(layout);
  });

  it('toggles and reports shown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(isToolbarShown(layout, 'a')).toBe(true);
    expect(isToolbarShown(layout, 'd')).toBe(false);
    const off = toggleToolbar(layout, 'a', DEFS);
    expect(isToolbarShown(off, 'a')).toBe(false);
    expect(toggleToolbar(off, 'a', DEFS).sides.top).toEqual(['a', 'b']);
    expect(canShowToolbar(layout, 'd', DEFS)).toBe(true);
  });
});

describe('migrateToolbarLayout', () => {
  it('rebuilds from definitions on a bad or missing version', () => {
    const fresh = createToolbarLayout(DEFS);
    expect(migrateToolbarLayout(null, DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout('x', DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout({ sides: { top: ['b'] } }, DEFS)).toEqual(fresh);
    expect(migrateToolbarLayout({ v: 2, sides: { top: ['b'] } }, DEFS)).toEqual(fresh);
  });

  it('drops unknown ids, duplicates and anything over the cap', () => {
    const raw = {
      v: 1,
      sides: { top: ['ghost', 'a', 'a', 'b', 'c'], bottom: ['a', 7], left: 'nope', right: [] },
      hidden: ['b', 'zzz'],
      last: { a: { side: 'top', index: 0 }, ghost: { side: 'top', index: 0 }, b: { side: 'nowhere', index: 0 }, c: { side: 'left', index: -1 } },
    };
    const layout = migrateToolbarLayout(raw, DEFS);
    expect(layout.sides.top).toEqual(['a', 'b']);
    expect(layout.sides.bottom).toEqual([]);
    expect(layout.sides.left).toEqual(['c']);
    expect(layout.hidden).toEqual(['d']);
    expect(layout.last).toEqual({ a: { side: 'top', index: 0 } });
  });

  it('places definitions that are missing anywhere', () => {
    const layout = migrateToolbarLayout({ v: 1, sides: { top: ['a'] }, hidden: [], last: {} }, DEFS);
    expect(layout.sides.top).toEqual(['a', 'b']);
    expect(layout.sides.left).toEqual(['c']);
    expect(layout.hidden).toEqual(['d']);
  });

  it('keeps a valid layout as it is', () => {
    const layout = moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0);
    expect(migrateToolbarLayout(layout, DEFS)).toEqual(layout);
  });

  it('survives a JSON round trip', () => {
    const layout = hideToolbar(moveToolbar(createToolbarLayout(DEFS), 'a', 'right', 0), 'c');
    const back = JSON.parse(JSON.stringify(layout));
    expect(back).toEqual(layout);
    expect(migrateToolbarLayout(back, DEFS)).toEqual(layout);
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
