/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { MIN_SHARE, canShowToolbar, createToolbarLayout, hideToolbar, migrateToolbarLayout, normalizeCorners, showToolbar } from '../src/composites/ToolbarDock';
import { bar, def, fullDefs, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

const defs = [...fullDefs(), def('x', 'top', { hiddenByDefault: true })];

const dense = (size, over = {}) => migrateToolbarLayout(v2({
  top: [[bar('top1', 0, size)], [bar('top2', 0, size)]],
  left: [[bar('left1', 0, size)], [bar('left2', 0, size)]],
  right: [[bar('right1', 0, size)], [bar('right2', 0, size)]],
  bottom: [[bar('bottom1', 0, size)], [bar('bottom2', 0, size)]],
  ...over,
}), defs);

describe('lanes with several toolbars', () => {
  it('opens a new lane before sharing a gap', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('top1', 0, 0.3), bar('top2', 0.5, 0.5)]] }), defs);
    const next = showToolbar(layout, 'x', defs);
    expect(next.sides.top).toEqual([[bar('top1', 0, 0.3), bar('top2', 0.5, 0.5)], [bar('x')]]);
  });

  it('takes the lane with the largest gap and gives the toolbar that room', () => {
    const layout = dense(1, { top: [[bar('top1', 0, 0.8)], [bar('top2', 0, 0.5)]] });
    const next = showToolbar(layout, 'x', defs);
    expect(next.sides.top).toEqual([[bar('top1', 0, 0.8)], [bar('top2', 0, 0.5), bar('x', 0.5, 0.5)]]);
  });

  it('fills the gap between two neighbours', () => {
    const withTop3 = [...defs, def('top3', 'top')];
    const layout = migrateToolbarLayout(v2({ top: [[bar('top1', 0, 0.3), bar('top2', 0.5, 0.5)], [bar('top3', 0, 0.9)]] }), withTop3);
    const next = showToolbar(layout, 'x', withTop3);
    expect(next.sides.top[0].map((place) => place.id)).toEqual(['top1', 'x', 'top2']);
    expect(next.sides.top[0][1].start).toBeCloseTo(0.3);
    expect(next.sides.top[0][1].size).toBeCloseTo(0.2);
  });

  it('keeps the size a toolbar had when the gap is larger', () => {
    const layout = dense(1, { top: [[bar('top1', 0, 0.2)], [bar('top2', 0, 1)]] });
    const withLast = { ...layout, last: { x: { side: 'top', lane: 5, start: 0, size: 0.25 } } };
    expect(showToolbar(withLast, 'x', defs).sides.top[0]).toEqual([bar('top1', 0, 0.2), bar('x', 0.2, 0.25)]);
  });

  it('restores the last spot when it is free', () => {
    const layout = migrateToolbarLayout(v2({ top: [[bar('top1', 0, 0.3), bar('x', 0.4, 0.2), bar('top2', 0.7, 0.3)]] }), defs);
    const hidden = hideToolbar(layout, 'x');
    expect(hidden.last.x).toEqual({ side: 'top', lane: 0, start: 0.4, size: 0.2 });
    expect(showToolbar(hidden, 'x', defs).sides.top).toEqual(layout.sides.top);
  });
});

describe('MIN_SHARE', () => {
  it('refuses a gap below MIN_SHARE on every side', () => {
    const layout = dense(0.9);
    expect(1 - 0.9).toBeLessThan(MIN_SHARE);
    expect(canShowToolbar(layout, 'x', defs)).toBe(false);
    expect(showToolbar(layout, 'x', defs)).toBe(layout);
  });

  it('accepts a gap of exactly MIN_SHARE', () => {
    const layout = dense(0.85);
    expect(canShowToolbar(layout, 'x', defs)).toBe(true);
    const placed = showToolbar(layout, 'x', defs).sides.top[0][1];
    expect(placed.start).toBeCloseTo(0.85);
    expect(placed.size).toBeCloseTo(0.15);
  });

  it('tries the other sides when the default side has no room', () => {
    const layout = dense(0.9, { left: [[bar('left1', 0, 0.9)], [bar('left2', 0, 0.5)]] });
    const next = showToolbar(layout, 'x', defs);
    expect(next.sides.top).toEqual(layout.sides.top);
    expect(next.sides.left[1]).toEqual([bar('left2', 0, 0.5), bar('x', 0.5, 0.5)]);
  });
});

describe('normalizeCorners', () => {
  const claims = (layout, topLeft, bottomLeft = layout.corners['bottom-left']) => ({
    ...layout,
    corners: { ...layout.corners, 'top-left': topLeft, 'bottom-left': bottomLeft },
  });
  const shot = () => createToolbarLayout([def('t1', 'top'), def('t2', 'top'), def('rail', 'left'), def('foot', 'bottom')]);
  const emptied = () => ({ ...shot(), corners: { 'top-left': [], 'top-right': [], 'bottom-left': [], 'bottom-right': [] } });

  it('keeps the first screenshot, a top bar over the corner with the rail under it', () => {
    const layout = claims(shot(), ['h', 'v', 'h'], ['v', 'h']);
    expect(normalizeCorners(layout)).toBe(layout);
  });

  it('keeps the second screenshot, the rail the full height', () => {
    const layout = claims(shot(), ['v', 'h', 'h'], ['v', 'h']);
    expect(normalizeCorners(layout)).toBe(layout);
  });

  it('appends what is missing with h first, so an empty list gives the old look', () => {
    expect(normalizeCorners(emptied()).corners).toEqual({
      'top-left': ['h', 'h', 'v'],
      'top-right': ['h', 'h'],
      'bottom-left': ['h', 'v'],
      'bottom-right': ['h'],
    });
  });

  it('drops entries that have no lane and keeps the order of the rest', () => {
    const layout = claims(shot(), ['v', 'h', 'v', 'h', 'h', 'h']);
    expect(normalizeCorners(layout).corners['top-left']).toEqual(['v', 'h', 'h']);
  });

  it('returns the same object when nothing changes', () => {
    const once = normalizeCorners(emptied());
    expect(normalizeCorners(once)).toBe(once);
  });
});
