/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { ResizeHandle } from '../src/composites/ResizeHandle';
import { SplitPane } from '../src/composites/SplitPane';
import { ColumnResizeHandle } from '../src/composites/DataTable/sub-components/ColumnResizeHandle';
import { DockDivider } from '../src/composites/DockLayout/sub-components/DockDivider';
import { Grid } from '../src/primitives/Grid';

const noop = () => undefined;

const one = (html) => {
  const found = html.match(/<div[^>]*role="separator"[^>]*>/g) ?? [];
  expect(found).toHaveLength(1);
  return found[0];
};

const handle = (extra = {}) => renderToString(h(ResizeHandle, { label: 'r', value: 1, min: 0, max: 2, onResize: noop, ...extra }));
const fold = (extra = {}) => ({ sides: ['low', 'high'], folded: null, onFold: noop, onUnfold: noop, ...extra });

describe('ResizeHandle', () => {
  it('is a focusable separator across the axis it moves on, with its value, range and the pane it controls', () => {
    const tag = one(handle({ label: 'Resize outline', value: 224.4, min: 160, max: 360, controls: 'outline' }));
    expect(tag).toContain('class="resize-handle resize-handle--horizontal focus-ring-inset"');
    expect(tag).toContain('aria-orientation="vertical" aria-label="Resize outline" aria-valuenow="224" aria-valuemin="160" aria-valuemax="360" aria-controls="outline" tabindex="0"');
    const stacked = one(handle({ orientation: 'vertical' }));
    expect(stacked).toContain('resize-handle--vertical');
    expect(stacked).toContain('aria-orientation="horizontal"');
  });

  it('draws one thin line, whatever the use: no grip, no ghost, no children', () => {
    for (const html of [handle(), handle({ orientation: 'vertical' }), handle({ fold: fold() })]) {
      expect(html).not.toMatch(/resize-handle--(grip|line|ghost)|resize-handle__grip/);
      expect(html).toMatch(/<div[^>]*role="separator"[^>]*><\/div>$/);
    }
  });

  it('reports 0 as its lowest value when it can fold the low side, and its end value while folded', () => {
    const open = { value: 300, min: 240, max: 480 };
    expect(one(handle({ ...open, fold: fold() }))).toContain('aria-valuenow="300" aria-valuemin="0" aria-valuemax="480"');
    expect(one(handle({ ...open, fold: fold({ sides: ['high'] }) }))).toContain('aria-valuemin="240"');
    expect(one(handle({ ...open, fold: fold({ folded: 'low' }) }))).toContain('aria-valuenow="0" aria-valuemin="0"');
    expect(one(handle({ ...open, fold: fold({ folded: 'high' }) }))).toContain('aria-valuenow="480"');
  });
});

describe('the four parts on ResizeHandle', () => {
  it('SplitPane draws the line in percent, controlling its first pane, and a rail in the folded pane', () => {
    const html = renderToString(h(SplitPane, { start: 'a', end: 'b', defaultRatio: 0.4 }));
    const tag = one(html);
    expect(tag).toContain('resize-handle--horizontal');
    expect(tag).toContain('aria-valuenow="40" aria-valuemin="0" aria-valuemax="80"');
    const paneId = /id="([^"]+)" class="split-pane__pane"/.exec(html)?.[1];
    expect(tag).toContain(`aria-controls="${paneId}"`);
    const folded = renderToString(h(SplitPane, { start: 'a', end: 'b', startLabel: 'files', defaultCollapsed: 'start' }));
    expect(one(folded)).toContain('aria-label="Resize files and second pane"');
    expect(folded).toMatch(/split-pane__pane split-pane__pane--folded"[^>]*><div class="box--sunken pane-rail pane-rail--folded pane-rail--start">/);
    expect(folded).toContain('aria-label="Show files"');
  });

  it('ListDetailLayout draws the line in pixels, controlling the list', () => {
    const html = renderToString(h(ListDetailLayout, { list: 'rows', detail: 'detail' }));
    const listId = /id="([^"]+)" class="box--sunken list-detail-layout__list"/.exec(html)?.[1];
    const tag = one(html);
    expect(tag).toContain('resize-handle--horizontal');
    expect(tag).toContain(`aria-valuenow="320" aria-valuemin="0" aria-valuemax="480" aria-controls="${listId}"`);
  });

  it('DockLayout draws the line at its divider rectangle, in pixels of the pair it splits', () => {
    const divider = { node: { kind: 'split', axis: 'row', sizes: [0.25, 0.5, 0.25], children: [] }, index: 1, rect: { x: 200, y: 0, width: 8, height: 300 }, along: 800 };
    const html = renderToString(h(DockDivider, { divider, onEdit: noop }));
    expect(html).toMatch(/^<div class="dock-divider" style="left:200px;top:0;width:8px;height:300px">/);
    const tag = one(html);
    expect(tag).toContain('class="resize-handle resize-handle--horizontal focus-ring-inset"');
    expect(tag).toContain('aria-valuenow="400" aria-valuemin="64" aria-valuemax="536"');
    const column = one(renderToString(h(DockDivider, { divider: { ...divider, node: { ...divider.node, axis: 'column' } }, onEdit: noop })));
    expect(column).toContain('resize-handle--vertical');
  });

  it('DataTable draws the same line on each column, controlling its header', () => {
    const props = {
      label: 'Slot', path: 'slot', index: 0, width: 180, cellRef: { current: null }, headerId: 'head-slot',
      actions: { onResize: noop, onPreviewResize: noop }, onResizingChange: noop,
    };
    const tag = one(renderToString(h(ColumnResizeHandle, props)));
    expect(tag).toContain('class="resize-handle resize-handle--horizontal focus-ring-inset data-table__resize"');
    expect(tag).toContain('aria-label="Resize Slot" aria-valuenow="180" aria-valuemin="64" aria-valuemax="720" aria-controls="head-slot"');
    expect(one(renderToString(h(ColumnResizeHandle, { ...props, width: undefined })))).not.toContain('aria-valuenow');
  });
});

describe('Grid dense and Grid.Cell', () => {
  it('packs dense and marks each cell with its span', () => {
    const html = renderToString(h(Grid, { minColWidth: 288, dense: true, gap: 'lg' },
      h(Grid.Cell, { span: 'full' }, 'options'),
      h(Grid.Cell, { span: 2 }, 'players'),
      h(Grid.Cell, null, 'summary')));
    expect(html).toContain('class="grid" data-gap="lg" data-dense="true" data-min-col="288"');
    expect(html).toContain('grid-template-columns:repeat(auto-fill, minmax(min(100%, 288px), 1fr))');
    expect(html).toContain('<div class="grid__cell" data-span="full">options</div>');
    expect(html).toContain('<div class="grid__cell" data-span="1">players</div>');
    expect(html).toContain('<div class="grid__cell" data-span="1">summary</div>');
    expect(renderToString(h(Grid, { columns: 3 }, 'a'))).toContain('data-columns="3"');
    expect(renderToString(h(Grid, null, 'a'))).not.toContain('data-dense');
  });
});
