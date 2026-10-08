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

const handle = (extra = {}, ...children) => renderToString(h(ResizeHandle, { label: 'r', value: 1, min: 0, max: 2, onResize: noop, ...extra }, ...children));

describe('ResizeHandle', () => {
  it('is a focusable separator across the axis it moves on, with its value, range and the pane it controls', () => {
    const tag = one(handle({ label: 'Resize outline', value: 224.4, min: 160, max: 360, controls: 'outline' }));
    expect(tag).toContain('class="resize-handle resize-handle--horizontal resize-handle--grip focus-ring-inset"');
    expect(tag).toContain('aria-orientation="vertical" aria-label="Resize outline" aria-valuenow="224" aria-valuemin="160" aria-valuemax="360" aria-controls="outline" tabindex="0"');
    const stacked = one(handle({ orientation: 'vertical', look: 'line' }));
    expect(stacked).toContain('resize-handle--vertical resize-handle--line');
    expect(stacked).toContain('aria-orientation="horizontal"');
  });

  it('draws a grip only in the grip look, and children in place of any look', () => {
    expect(handle()).toContain('resize-handle__grip');
    expect(handle({ look: 'ghost' })).not.toContain('resize-handle__grip');
    const filled = handle({}, 'files');
    expect(filled).not.toContain('resize-handle--grip');
    expect(filled).toContain('>files</div>');
  });
});

describe('the four parts on ResizeHandle', () => {
  it('SplitPane draws the grip in percent, controlling its first pane, and a rail when a pane is folded', () => {
    const html = renderToString(h(SplitPane, { start: 'a', end: 'b', defaultRatio: 0.4 }));
    const tag = one(html);
    expect(tag).toContain('resize-handle--grip');
    expect(tag).toContain('aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"');
    const paneId = /id="([^"]+)" class="split-pane__pane"/.exec(html)?.[1];
    expect(tag).toContain(`aria-controls="${paneId}"`);
    const folded = one(renderToString(h(SplitPane, { start: 'a', end: 'b', startLabel: 'files', defaultCollapsed: 'start' })));
    expect(folded).toContain('split-pane__rail split-pane__rail--start');
    expect(folded).toContain('aria-label="Show files"');
  });

  it('ListDetailLayout draws the grip in pixels, controlling the list', () => {
    const html = renderToString(h(ListDetailLayout, { list: 'rows', detail: 'detail' }));
    const listId = /id="([^"]+)" class="list-detail-layout__list"/.exec(html)?.[1];
    const tag = one(html);
    expect(tag).toContain('resize-handle--grip');
    expect(tag).toContain(`aria-valuenow="320" aria-valuemin="240" aria-valuemax="480" aria-controls="${listId}"`);
  });

  it('DockLayout draws the ghost line at its divider rectangle, in pixels of the pair it splits', () => {
    const divider = { node: { kind: 'split', axis: 'row', sizes: [0.25, 0.5, 0.25], children: [] }, index: 1, rect: { x: 200, y: 0, width: 8, height: 300 }, along: 800 };
    const html = renderToString(h(DockDivider, { divider, onEdit: noop }));
    expect(html).toMatch(/^<div class="dock-divider" style="left:200px;top:0;width:8px;height:300px">/);
    const tag = one(html);
    expect(tag).toContain('class="resize-handle resize-handle--horizontal resize-handle--ghost focus-ring-inset"');
    expect(tag).toContain('aria-valuenow="400" aria-valuemin="64" aria-valuemax="536"');
    const column = one(renderToString(h(DockDivider, { divider: { ...divider, node: { ...divider.node, axis: 'column' } }, onEdit: noop })));
    expect(column).toContain('resize-handle--vertical resize-handle--ghost');
  });

  it('DataTable draws the line look on each column, controlling its header', () => {
    const props = {
      label: 'Slot', path: 'slot', index: 0, width: 180, cellRef: { current: null }, headerId: 'head-slot',
      actions: { onResize: noop, onPreviewResize: noop }, onResizingChange: noop,
    };
    const tag = one(renderToString(h(ColumnResizeHandle, props)));
    expect(tag).toContain('resize-handle--line focus-ring-inset data-table__resize');
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
