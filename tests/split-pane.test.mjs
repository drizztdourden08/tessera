/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FloatingSwitch } from '../src/composites/FloatingSwitch';
import { SplitPane } from '../src/composites/SplitPane';

const draw = (extra = {}) => renderToString(h(SplitPane, { start: 'a', end: 'b', ...extra }));
const style = (html) => /<div[^>]* class="split-pane [^"]*" style="([^"]*)"/.exec(html)?.[1] ?? '';

describe('SplitPane', () => {
  it('shares the room by percent between its limits, and keeps the pane edge between the two panes', () => {
    expect(style(draw())).toBe('grid-template-columns:minmax(0, 58fr) auto minmax(0, 42fr)');
    expect(style(draw({ defaultRatio: 0.4 }))).toBe('grid-template-columns:minmax(0, 40fr) auto minmax(0, 60fr)');
    expect(style(draw({ defaultRatio: 0.95 }))).toContain('minmax(0, 80fr) auto minmax(0, 20fr)');
    expect(style(draw({ defaultRatio: 0.05 }))).toContain('minmax(0, 20fr) auto minmax(0, 80fr)');
    expect(draw()).toMatch(/split-pane__pane">a<\/div><div class="pane-edge pane-edge--horizontal pane-edge--edge-start">.*<div id="[^"]+" class="split-pane__pane">b<\/div>/);
  });

  it('folds a pane into the auto column and gives the other pane the room, the edge staying in place', () => {
    expect(style(draw({ defaultCollapsed: 'start' }))).toBe('grid-template-columns:auto auto minmax(0, 1fr)');
    expect(style(draw({ defaultCollapsed: 'end' }))).toBe('grid-template-columns:minmax(0, 1fr) auto auto');
    expect(draw({ defaultCollapsed: 'end' })).toMatch(/split-pane__pane split-pane__pane--folded"[^>]*><div class="box--sunken pane-rail pane-rail--folded pane-rail--end">/);
    expect(draw({ defaultCollapsed: 'start' }).match(/role="separator"/g)).toHaveLength(1);
  });

  it('takes the fold away with collapsible false, and keeps the limits as the range of the separator', () => {
    const html = draw({ collapsible: false, defaultCollapsed: 'start' });
    expect(html).not.toContain('pane-edge__toggle');
    expect(html).not.toContain('--folded');
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="58" aria-valuemin="20" aria-valuemax="80"/);
    expect(draw({ minRatio: 0.3, maxRatio: 0.7, collapsible: false })).toMatch(/aria-valuemin="30" aria-valuemax="70"/);
  });

  it('draws a separator across the axis, folding at both limits', () => {
    const side = draw({ defaultRatio: 0.4 });
    expect(side).toContain('role="separator"');
    expect(side).toContain('aria-orientation="vertical"');
    expect(side).toMatch(/aria-valuenow="40" aria-valuemin="0" aria-valuemax="80"/);
    expect(side).not.toContain('resize-handle__grip');
    const stacked = draw({ orientation: 'vertical' });
    expect(stacked).toContain('aria-orientation="horizontal"');
    expect(stacked).toContain('pane-edge--vertical');
    expect(style(stacked)).toBe('grid-template-rows:minmax(0, 58fr) auto minmax(0, 42fr)');
  });
});

describe('SplitPane summary line', () => {
  const lined = (extra = {}) => draw({ orientation: 'vertical', defaultCollapsed: 'end', ...extra });

  it('draws the header and the summary beside the rail of the folded pane', () => {
    const html = lined({ header: 'Selection', summary: '12 tiles' });
    expect(html).toContain('split-pane__pane--lined');
    expect(html).toContain('split-pane__summary"');
    expect(html).toMatch(/Selection<div class="split-pane__summary-text">12 tiles/);
  });

  it('takes a summary alone or a header alone', () => {
    expect(lined({ summary: 'Done' })).toContain('split-pane__summary-text">Done');
    const headerOnly = lined({ header: 'Selection' });
    expect(headerOnly).toContain('split-pane__summary');
    expect(headerOnly).not.toContain('split-pane__summary-text');
  });

  it('draws nothing extra while the pane is open, or side by side, or with no summary', () => {
    expect(draw({ orientation: 'vertical', summary: 'x' })).not.toContain('split-pane__summary');
    expect(draw({ defaultCollapsed: 'end', summary: 'x' })).not.toContain('split-pane__summary');
    expect(lined()).not.toContain('split-pane__summary');
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
