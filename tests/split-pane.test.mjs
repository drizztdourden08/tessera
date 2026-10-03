/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FloatingSwitch } from '../src/composites/FloatingSwitch';
import { SplitPane } from '../src/composites/SplitPane';
import { settleShare } from '../src/composites/SplitPane/behavior/settle-share';
import { stepShare } from '../src/composites/SplitPane/behavior/step-share';
import { valueRangeOf } from '../src/composites/SplitPane/behavior/value-range-of';

const limits = { min: 0.2, max: 0.8, snapAt: 0.14 };

describe('SplitPane', () => {
  it('keeps an open pane within its limits and collapses past the snap point', () => {
    expect(settleShare(0.5, limits, 0.4)).toEqual({ collapsed: 'none', ratio: 0.5 });
    expect(settleShare(0.16, limits, 0.4)).toEqual({ collapsed: 'none', ratio: 0.2 });
    expect(settleShare(0.1, limits, 0.4)).toEqual({ collapsed: 'start', ratio: 0.4 });
    expect(settleShare(0.9, limits, 0.4)).toEqual({ collapsed: 'end', ratio: 0.4 });
    expect(settleShare(-1, { ...limits, snapAt: 0 }, 0.4)).toEqual({ collapsed: 'none', ratio: 0.2 });
  });

  it('steps by key, collapses from a limit and comes back at the limit', () => {
    expect(stepShare({ collapsed: 'none', ratio: 0.5 }, 0.02, limits)).toBeCloseTo(0.52);
    expect(stepShare({ collapsed: 'none', ratio: 0.2 }, -0.02, limits)).toBe(0);
    expect(stepShare({ collapsed: 'start', ratio: 0.5 }, 0.02, limits)).toBe(0.2);
    expect(stepShare({ collapsed: 'end', ratio: 0.5 }, -0.02, limits)).toBe(0.8);
  });

  it('reports the limits as its range only when nothing collapses', () => {
    expect(valueRangeOf(limits)).toEqual({ min: 0, max: 100 });
    expect(valueRangeOf({ ...limits, snapAt: 0 })).toEqual({ min: 20, max: 80 });
  });

  it('draws a separator across the axis with a grip', () => {
    const side = renderToString(h(SplitPane, { start: 'a', end: 'b', defaultRatio: 0.4 }));
    expect(side).toContain('role="separator"');
    expect(side).toContain('aria-orientation="vertical"');
    expect(side).toContain('aria-valuenow="40"');
    expect(side).toContain('split-pane__grip');
    const stacked = renderToString(h(SplitPane, { start: 'a', end: 'b', orientation: 'vertical' }));
    expect(stacked).toContain('aria-orientation="horizontal"');
    expect(stacked).toContain('grid-template-rows');
  });
});

describe('FloatingSwitch', () => {
  it('draws one thumb behind the items, hidden until it is measured', () => {
    const items = [{ id: 'a', label: 'One', icon: null }, { id: 'b', label: 'Two', icon: null }];
    const html = renderToString(h(FloatingSwitch, { items, activeId: 'b', onSelect: () => undefined, label: 'Switch' }));
    expect(html.match(/floating-switch__thumb/g)).toHaveLength(2);
    expect(html).toContain('floating-switch__thumb--hidden');
    expect(html).toContain('aria-current="page"');
  });
});
