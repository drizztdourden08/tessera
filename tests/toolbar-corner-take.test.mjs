/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { normalizeCorners, resizeToolbarEnd, takeToolbarCorner, toolbarCornerReach, toolbarCornerStep } from '../src/composites/ToolbarDock';
import { TOOLBAR_DOCK_RAIL_FULL_HEIGHT, TOOLBAR_DOCK_RAIL_UNDER_TOP } from '../stories/composites/_samples/toolbar-dock-layouts.constants';
import { bar, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

const EMPTY = { 'top-left': [], 'top-right': [], 'bottom-left': [], 'bottom-right': [] };

const DEFAULT = normalizeCorners({ ...TOOLBAR_DOCK_RAIL_UNDER_TOP, corners: EMPTY });

const METRICS = {
  spans: { top: [1000, 1000], bottom: [1000, 0], left: [600, 0], right: [0, 0] },
  laneThickness: { top: [40, 40], bottom: [40, 0], left: [48, 0], right: [0, 0] },
};

const START = { id: 'tools', end: 'start' };
const END = { id: 'tools', end: 'end' };

const place = (layout, side, lane, id) => layout.sides[side][lane].find((entry) => entry.id === id);

const pixels = (entry, span) => [Math.round(entry.start * span * 1e6) / 1e6, Math.round(entry.size * span * 1e6) / 1e6];

describe('takeToolbarCorner, the take and the give back', () => {
  it('does nothing when the handle stays inside the lane', () => {
    expect(takeToolbarCorner(DEFAULT, METRICS, START, 0)).toBe(DEFAULT);
    expect(takeToolbarCorner(DEFAULT, METRICS, START, 120)).toBe(DEFAULT);
    expect(takeToolbarCorner(DEFAULT, METRICS, END, 600)).toBe(DEFAULT);
  });

  it.each([
    ['half a thickness not passed', -15, ['h', 'h', 'v']],
    ['half a thickness passed', -30, ['h', 'v', 'h']],
    ['one full thickness', -40, ['h', 'v', 'h']],
    ['half of the second lane not passed', -55, ['h', 'v', 'h']],
    ['half of the second lane passed', -65, ['v', 'h', 'h']],
    ['past every lane', -400, ['v', 'h', 'h']],
  ])('start handle, %s', (_name, px, claims) => {
    expect(takeToolbarCorner(DEFAULT, METRICS, START, px).corners['top-left']).toEqual(claims);
  });

  it('takes the bottom corner with the end handle', () => {
    const next = takeToolbarCorner(DEFAULT, METRICS, END, 630);
    expect(next.corners['bottom-left']).toEqual(['v', 'h']);
    expect(next.corners['top-left']).toEqual(['h', 'h', 'v']);
  });

  it('only the first start handle and the last end handle can take', () => {
    const two = { ...DEFAULT, sides: { ...DEFAULT.sides, left: [[bar('tools', 0, 0.4), bar('other', 0.5, 0.4)]] } };
    expect(takeToolbarCorner(two, METRICS, { id: 'other', end: 'start' }, -60)).toBe(two);
    expect(takeToolbarCorner(two, METRICS, START, -60).corners['top-left']).toEqual(['h', 'v', 'h']);
    expect(takeToolbarCorner(two, METRICS, { id: 'tools', end: 'end' }, 700)).toBe(two);
    expect(takeToolbarCorner(two, METRICS, { id: 'other', end: 'end' }, 700).corners['bottom-left']).toEqual(['v', 'h']);
  });

  it('rescales the bars to keep their pixel position, then pushes', () => {
    const next = takeToolbarCorner(DEFAULT, METRICS, START, -30);
    expect(pixels(place(next, 'top', 1, 'select'), 952)).toEqual([0, 550]);
    expect(pixels(place(next, 'top', 0, 'shapes'), 1000)).toEqual(pixels(place(DEFAULT, 'top', 0, 'shapes'), 1000));
    expect(pixels(place(next, 'left', 0, 'tools'), 640)).toEqual([10, 630]);
  });

  it('keeps the pixel position of a bar that was away from the lane start', () => {
    const away = { ...DEFAULT, sides: { ...DEFAULT.sides, top: [DEFAULT.sides.top[0], [bar('select', 0.3, 0.4)]] } };
    const next = takeToolbarCorner(away, METRICS, START, -30);
    expect(pixels(place(next, 'top', 1, 'select'), 952)).toEqual([252, 400]);
  });

  it('gives the corner back when the handle returns, always from the origin', () => {
    const taken = takeToolbarCorner(DEFAULT, METRICS, START, -65);
    expect(taken.corners['top-left']).toEqual(['v', 'h', 'h']);
    expect(resizeToolbarEnd(DEFAULT, METRICS, START, -30).corners['top-left']).toEqual(['h', 'v', 'h']);
    expect(resizeToolbarEnd(DEFAULT, METRICS, START, -15)).toBe(DEFAULT);
    expect(resizeToolbarEnd(DEFAULT, METRICS, START, 0)).toBe(DEFAULT);
    expect(JSON.stringify(resizeToolbarEnd(DEFAULT, METRICS, START, -30))).toBe(JSON.stringify(takeToolbarCorner(DEFAULT, METRICS, START, -30)));
  });

  it('flows through resizeToolbarEnd and never mutates the origin', () => {
    const before = JSON.stringify(DEFAULT);
    expect(resizeToolbarEnd(DEFAULT, METRICS, START, -65).corners['top-left']).toEqual(['v', 'h', 'h']);
    expect(JSON.stringify(DEFAULT)).toBe(before);
  });

  it('does nothing without lane thickness', () => {
    expect(takeToolbarCorner(DEFAULT, { spans: METRICS.spans }, START, -65)).toBe(DEFAULT);
  });
});

describe('takeToolbarCorner, outer-lane promotion', () => {
  const small = (corners) => ({
    ...TOOLBAR_DOCK_RAIL_FULL_HEIGHT,
    sides: { ...TOOLBAR_DOCK_RAIL_FULL_HEIGHT.sides, left: [[bar('tools', 0.2, 0.5)]] },
    corners: { ...TOOLBAR_DOCK_RAIL_FULL_HEIGHT.corners, 'top-left': corners },
  });

  it('moves the outer top lane along with the taking lane', () => {
    const next = takeToolbarCorner(small(['v', 'h', 'h']), METRICS, { id: 'select', end: 'start' }, -30);
    expect(next.corners['top-left']).toEqual(['h', 'h', 'v']);
    expect(pixels(place(next, 'top', 0, 'shapes'), 1048)).toEqual([48, 600]);
    expect(pixels(place(next, 'left', 0, 'tools'), 520)).toEqual([40, 300]);
  });

  it('moves only the taking lane when the outer lane is already in front', () => {
    const next = takeToolbarCorner(small(['h', 'v', 'h']), METRICS, { id: 'select', end: 'start' }, -30);
    expect(next.corners['top-left']).toEqual(['h', 'h', 'v']);
  });

  it('takes a lane of the top side from the rail and back', () => {
    const start = small(['v', 'h', 'h']);
    const taken = takeToolbarCorner(start, METRICS, { id: 'shapes', end: 'start' }, -30);
    expect(taken.corners['top-left']).toEqual(['h', 'v', 'h']);
    expect(takeToolbarCorner(start, METRICS, { id: 'shapes', end: 'start' }, -10)).toBe(start);
  });
});

describe('takeToolbarCorner, refusal', () => {
  const crowded = (outer, inner) => v2(
    { top: [[bar('t', 0, 0.5)]], left: [[outer], [inner]] },
    { corners: { 'top-left': ['v', 'v', 'h'], 'top-right': ['h'], 'bottom-left': ['v', 'v'], 'bottom-right': [] } },
  );
  const metrics = {
    spans: { top: [1000, 0], bottom: [0, 0], left: [600, 600], right: [0, 0] },
    laneThickness: { top: [40, 0], bottom: [0, 0], left: [48, 48], right: [0, 0] },
  };
  const grip = { id: 't', end: 'start' };

  it('stops when yielding bars cannot keep their size', () => {
    const layout = crowded(bar('small', 0.2, 0.3), bar('wide', 0, 1));
    expect(takeToolbarCorner(layout, metrics, grip, -30)).toBe(layout);
    expect(takeToolbarCorner(layout, metrics, grip, -90)).toBe(layout);
  });

  it('stops at the last lane that fits', () => {
    const layout = crowded(bar('wide', 0, 1), bar('small', 0.2, 0.3));
    expect(takeToolbarCorner(layout, metrics, grip, -90).corners['top-left']).toEqual(['v', 'h', 'v']);
    expect(takeToolbarCorner(layout, metrics, grip, -30).corners['top-left']).toEqual(['v', 'h', 'v']);
  });

  it('takes both lanes when both fit', () => {
    const layout = crowded(bar('a', 0.2, 0.3), bar('b', 0.2, 0.3));
    expect(takeToolbarCorner(layout, metrics, grip, -90).corners['top-left']).toEqual(['h', 'v', 'v']);
  });
});

describe('toolbarCornerStep, the keyboard', () => {
  const sessionOf = (step, grip) => ({ id: grip.id, end: grip.end, origin: step.origin, metrics: step.metrics, result: step.layout, count: step.count });

  it('takes the next lane with each outward press and gives it back with inward ones', () => {
    const one = toolbarCornerStep({ layout: DEFAULT, metrics: METRICS, grip: START, px: -8, session: null });
    expect(one.layout.corners['top-left']).toEqual(['h', 'v', 'h']);
    const two = toolbarCornerStep({ layout: one.layout, metrics: METRICS, grip: START, px: -8, session: sessionOf(one, START) });
    expect(two.layout.corners['top-left']).toEqual(['v', 'h', 'h']);
    const none = toolbarCornerStep({ layout: two.layout, metrics: METRICS, grip: START, px: -8, session: sessionOf(two, START) });
    expect(none).toBeNull();
    const back = toolbarCornerStep({ layout: two.layout, metrics: METRICS, grip: START, px: 8, session: sessionOf(two, START) });
    expect(back.layout.corners['top-left']).toEqual(['h', 'v', 'h']);
    const origin = toolbarCornerStep({ layout: back.layout, metrics: METRICS, grip: START, px: 8, session: sessionOf(back, START) });
    expect(origin.layout).toBe(DEFAULT);
    expect(origin.count).toBe(0);
  });

  it('leaves an inward press alone when nothing was taken', () => {
    expect(toolbarCornerStep({ layout: DEFAULT, metrics: METRICS, grip: START, px: 8, session: null })).toBeNull();
  });

  it('ignores a handle that is not at the lane end', () => {
    const inside = { ...DEFAULT, sides: { ...DEFAULT.sides, left: [[bar('tools', 0.2, 0.5)]] } };
    expect(toolbarCornerStep({ layout: inside, metrics: METRICS, grip: START, px: 100, session: null })).toBeNull();
  });

  it('reports the pixel reach of a lane count', () => {
    expect(toolbarCornerReach(DEFAULT, METRICS, START, 1)).toBe(-40);
    expect(toolbarCornerReach(DEFAULT, METRICS, START, 2)).toBe(-80);
    expect(toolbarCornerReach(DEFAULT, METRICS, START, 3)).toBeNull();
    expect(toolbarCornerReach(DEFAULT, METRICS, END, 1)).toBe(640);
  });
});

describe('the owner layouts from the default layout', () => {
  const afterRail = { ...METRICS, spans: { ...METRICS.spans, left: [640, 0] } };
  const corners = (layout) => layout.corners;

  it('screenshot 1 by drag', () => {
    const first = resizeToolbarEnd(DEFAULT, METRICS, START, -30);
    const second = resizeToolbarEnd(first, afterRail, END, 640 + 30);
    expect(corners(second)).toEqual(corners(TOOLBAR_DOCK_RAIL_UNDER_TOP));
    expect(normalizeCorners(second)).toBe(second);
  });

  it('screenshot 2 by drag', () => {
    const next = resizeToolbarEnd(DEFAULT, METRICS, START, -65);
    expect(corners(next)['top-left']).toEqual(corners(TOOLBAR_DOCK_RAIL_FULL_HEIGHT)['top-left']);
    const second = resizeToolbarEnd(next, { ...METRICS, spans: { ...METRICS.spans, left: [680, 0] } }, END, 680 + 30);
    expect(corners(second)).toEqual(corners(TOOLBAR_DOCK_RAIL_FULL_HEIGHT));
  });

  it('screenshot 1 by keys', () => {
    const top = toolbarCornerStep({ layout: DEFAULT, metrics: METRICS, grip: START, px: -8, session: null });
    const bottom = toolbarCornerStep({ layout: top.layout, metrics: afterRail, grip: END, px: 650, session: null });
    expect(corners(bottom.layout)).toEqual(corners(TOOLBAR_DOCK_RAIL_UNDER_TOP));
  });

  it('screenshot 2 by keys', () => {
    const one = toolbarCornerStep({ layout: DEFAULT, metrics: METRICS, grip: START, px: -8, session: null });
    const two = toolbarCornerStep({
      layout: one.layout,
      metrics: METRICS,
      grip: START,
      px: -8,
      session: { id: 'tools', end: 'start', origin: one.origin, metrics: one.metrics, result: one.layout, count: 1 },
    });
    const bottom = toolbarCornerStep({ layout: two.layout, metrics: { ...METRICS, spans: { ...METRICS.spans, left: [680, 0] } }, grip: END, px: 700, session: null });
    expect(corners(bottom.layout)).toEqual(corners(TOOLBAR_DOCK_RAIL_FULL_HEIGHT));
  });
});
