/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { gridRects } from '../src/composites/VirtualGrid/behavior/grid-rects';
import { VirtualGrid } from '../src/composites/VirtualGrid';
import { hitKeys } from '../src/composites/marquee/hit-keys';

const GROUPS = [
  { header: true, count: 8, collapsed: false },
  { header: true, count: 5, collapsed: true },
  { header: true, count: 2, collapsed: false },
];

const HEIGHTS = { tile: 96, head: 32 };

const rectsOf = (layout, origin = { x: 0, y: 0 }) => gridRects({ layout, heights: HEIGHTS, tileWidth: 100, origin, keyOf: (index) => `k${index}` });

describe('the rects of every item of the grid', () => {
  const rects = rectsOf(gridLayout(GROUPS, 4));
  const at = (key) => rects.find((item) => item.key === key)?.rect;

  it('places the tiles of later rows below the headers above them', () => {
    expect(at('k0')).toEqual({ x: 0, y: 32, width: 100, height: 96 });
    expect(at('k5')).toEqual({ x: 100, y: 128, width: 100, height: 96 });
    expect(at('k7')).toEqual({ x: 300, y: 128, width: 100, height: 96 });
    expect(at('k13')).toEqual({ x: 0, y: 288, width: 100, height: 96 });
    expect(at('k14')).toEqual({ x: 100, y: 288, width: 100, height: 96 });
  });

  it('leaves out the items of a collapsed section and the headers', () => {
    expect(rects.map((item) => item.key)).toEqual(['k0', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k13', 'k14']);
  });

  it('shifts every rect by the origin of the grid body', () => {
    const moved = rectsOf(gridLayout(GROUPS, 4), { x: 10, y: 5 });
    expect(moved[0]?.rect).toEqual({ x: 10, y: 37, width: 100, height: 96 });
  });

  it('follows the columns', () => {
    const wide = rectsOf(gridLayout([{ header: false, count: 7, collapsed: false }], 4));
    expect(wide.map((item) => [item.rect.x, item.rect.y])).toEqual([[0, 0], [100, 0], [200, 0], [300, 0], [0, 96], [100, 96], [200, 96]]);
  });

  it('lets the marquee pick tiles far below the rendered rows', () => {
    const area = { x: 0, y: 280, width: 300, height: 20 };
    expect(hitKeys(area, rects)).toEqual(['k13', 'k14']);
  });
});

describe('VirtualGrid section headers on the server', () => {
  const draw = (sections) => renderToString(h(VirtualGrid, {
    label: 'Folders', sections, getKey: (item) => item, renderItem: (item) => item,
  }));

  it('indents a header by its depth and leaves a plain header at zero', () => {
    const html = draw([
      { key: 'a', label: 'A', items: ['a1'] },
      { key: 'b', label: 'B', depth: 2, items: ['b1'] },
    ]);
    expect(html).toContain('--vg-depth:0');
    expect(html).toContain('--vg-depth:2');
  });

  it('draws the actions of a header after its count', () => {
    const html = draw([{ key: 'a', label: 'A', items: ['a1'], actions: [{ id: 'add', label: 'Add here', icon: 'plus', onSelect: () => {} }] }]);
    expect(html).toContain('virtual-grid__header-actions');
    expect(html).toContain('Add here');
  });

  it('draws no action area for a header without actions', () => {
    expect(draw([{ key: 'a', label: 'A', items: ['a1'] }])).not.toContain('virtual-grid__header-actions');
  });
});
