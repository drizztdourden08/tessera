/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { createToolbarLayout, normalizeCorners, toolbarGridPlacement } from '../src/composites/ToolbarDock';
import { DEFS, bar, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

const FULL = 'minmax(0, 1fr)';

const rows = (placement, side) => placement[side].map(({ gridRow, gridColumn }) => [gridRow, gridColumn]);

const layoutOf = (sides, corners = {}) => normalizeCorners(v2(sides, {
  corners: { 'top-left': [], 'top-right': [], 'bottom-left': [], 'bottom-right': [], ...corners },
}));

const screenshot = (topLeft) => layoutOf(
  {
    top: [[bar('t1', 0, 0.6)], [bar('t2', 0.2, 0.5)]],
    left: [[bar('l1', 0.1, 0.7)]],
    bottom: [[bar('b1', 0.3, 0.5)]],
  },
  { 'top-left': topLeft, 'bottom-left': ['v', 'h'] },
);

describe('toolbarGridPlacement for the default layout', () => {
  const placement = toolbarGridPlacement(createToolbarLayout(DEFS.map((entry) => ({ ...entry, hiddenByDefault: false }))));

  it('puts the top lanes on rows 1 and 2 across every column', () => {
    expect(rows(placement, 'top')).toEqual([['1 / 2', '1 / 6'], ['2 / 3', '1 / 6']]);
  });

  it('lets the left rail claim the bottom corner it was placed before', () => {
    expect(rows(placement, 'left')).toEqual([['3 / 6', '1 / 2']]);
    expect(rows(placement, 'bottom')).toEqual([['5 / 6', '2 / 6']]);
  });

  it('draws the horizontal lanes first when no corner is stored', () => {
    const plain = toolbarGridPlacement(layoutOf({ top: [[bar('a')], [bar('b')]], left: [[bar('c')]], bottom: [[bar('d')]] }));
    expect(rows(plain, 'left')).toEqual([['3 / 5', '1 / 2']]);
    expect(rows(plain, 'bottom')).toEqual([['5 / 6', '1 / 6']]);
  });

  it('gives a full bar one track', () => {
    expect(placement.top[0].tracks).toBe(FULL);
    expect(placement.top[0].bars).toEqual([{ id: 'a', track: 1 }]);
  });

  it('leaves out sides without lanes', () => {
    expect(placement.right).toEqual([]);
  });
});

describe('toolbarGridPlacement for the owner layouts', () => {
  it('screenshot 1: the top toolbar claims the corner, the rail sits under it', () => {
    const placement = toolbarGridPlacement(screenshot(['h', 'v', 'h']));
    expect(rows(placement, 'top')).toEqual([['1 / 2', '1 / 6'], ['2 / 3', '2 / 6']]);
    expect(rows(placement, 'left')).toEqual([['2 / 6', '1 / 2']]);
    expect(rows(placement, 'bottom')).toEqual([['5 / 6', '2 / 6']]);
  });

  it('screenshot 2: the rail claims the corner and runs the full height', () => {
    const placement = toolbarGridPlacement(screenshot(['v', 'h', 'h']));
    expect(rows(placement, 'top')).toEqual([['1 / 2', '2 / 6'], ['2 / 3', '2 / 6']]);
    expect(rows(placement, 'left')).toEqual([['1 / 6', '1 / 2']]);
    expect(rows(placement, 'bottom')).toEqual([['5 / 6', '2 / 6']]);
  });

  it('mirrors on the right side', () => {
    const layout = layoutOf(
      { top: [[bar('t')]], right: [[bar('r')]], bottom: [[bar('b')]] },
      { 'top-right': ['v', 'h'], 'bottom-right': ['h', 'v'] },
    );
    const placement = toolbarGridPlacement(layout);
    expect(rows(placement, 'top')).toEqual([['1 / 2', '1 / 5']]);
    expect(rows(placement, 'right')).toEqual([['1 / 5', '5 / 6']]);
    expect(rows(placement, 'bottom')).toEqual([['5 / 6', '1 / 6']]);
  });

  it('fills missing corner claims with the horizontal lane first', () => {
    const placement = toolbarGridPlacement(layoutOf({ top: [[bar('t')]], left: [[bar('l')]] }));
    expect(rows(placement, 'top')).toEqual([['1 / 2', '1 / 6']]);
    expect(rows(placement, 'left')).toEqual([['2 / 6', '1 / 2']]);
  });
});

describe('toolbarGridPlacement tracks', () => {
  it('alternates gaps and bars, a gap only above zero', () => {
    const placement = toolbarGridPlacement(screenshot(['h', 'v', 'h']));
    expect(placement.top[0].tracks).toBe('minmax(0, 0.6fr) minmax(0, 0.4fr)');
    expect(placement.top[0].bars).toEqual([{ id: 't1', track: 1 }]);
    expect(placement.top[1].tracks).toBe('minmax(0, 0.2fr) minmax(0, 0.5fr) minmax(0, 0.3fr)');
    expect(placement.top[1].bars).toEqual([{ id: 't2', track: 2 }]);
    expect(placement.left[0].tracks).toBe('minmax(0, 0.1fr) minmax(0, 0.7fr) minmax(0, 0.2fr)');
  });

  it('numbers the bars of one lane in order, touching bars have no gap between', () => {
    const lane = toolbarGridPlacement(layoutOf({ top: [[bar('a', 0, 0.5), bar('b', 0.5, 0.25)]] })).top[0];
    expect(lane.tracks).toBe('minmax(0, 0.5fr) minmax(0, 0.25fr) minmax(0, 0.25fr)');
    expect(lane.bars).toEqual([{ id: 'a', track: 1 }, { id: 'b', track: 2 }]);
  });
});
