/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { gridColumns } from '../src/composites/VirtualGrid/behavior/grid-columns';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { nextCell } from '../src/composites/VirtualGrid/behavior/next-cell';
import { visibleRange } from '../src/composites/virtual/visible-range';
import { sizeVariable } from '../src/composites/virtual/size-variable';
import { VirtualGrid } from '../src/composites/VirtualGrid';
import { VirtualList } from '../src/composites/VirtualList';

const ITEMS = Array.from({ length: 2000 }, (_, at) => ({ id: `tile-${at}`, text: `Tile ${at}` }));

const draw = (extra) => renderToString(h(VirtualGrid, {
  label: 'Tiles', items: ITEMS, getKey: (item) => item.id, renderItem: (item) => item.text, ...extra,
}));

const flat = (count, columns = 5) => gridLayout([{ header: false, count, collapsed: false }], columns);

const move = (key, ctrl, active, layout = flat(23)) => nextCell(key, layout, active, { ctrl, page: 2 });

describe('the columns and rows of the grid', () => {
  it('fits as many whole tiles as the width holds', () => {
    expect(gridColumns(500, 96)).toBe(5);
    expect(gridColumns(479, 96)).toBe(4);
    expect(gridColumns(96, 96)).toBe(1);
  });

  it('keeps one column when the box or the tile has no size', () => {
    expect(gridColumns(0, 96)).toBe(1);
    expect(gridColumns(50, 96)).toBe(1);
    expect(gridColumns(500, 0)).toBe(1);
  });

  it('counts a partly filled last row', () => {
    expect(flat(2000).tileRows).toBe(400);
    expect(flat(23).tileRows).toBe(5);
    expect(flat(0).tileRows).toBe(0);
  });

  it('windows by rows with the same math as the list', () => {
    expect(visibleRange({ scrollTop: 960, viewport: 288, rowHeight: 96, count: 400, overscan: 2 })).toEqual({ start: 8, end: 15 });
    expect(visibleRange({ scrollTop: 0, viewport: 288, rowHeight: 96, count: 0, overscan: 2 })).toEqual({ start: 0, end: 0 });
  });

  it('names a size token as a custom property value', () => {
    expect(sizeVariable('size-64')).toBe('var(--size-64)');
  });
});

describe('the keys of VirtualGrid', () => {
  it('moves by a tile left and right and stops at both ends', () => {
    expect(move('ArrowRight', false, 3)).toBe(4);
    expect(move('ArrowLeft', false, 0)).toBe(0);
    expect(move('ArrowRight', false, 22)).toBe(22);
  });

  it('moves by a row up and down in the same column', () => {
    expect(move('ArrowDown', false, 7)).toBe(12);
    expect(move('ArrowUp', false, 7)).toBe(2);
    expect(move('ArrowUp', false, 2)).toBe(2);
  });

  it('lands on the last tile when the column is short in the last row', () => {
    expect(move('ArrowDown', false, 19)).toBe(22);
    expect(move('ArrowDown', false, 22)).toBe(22);
  });

  it('goes to the ends of the row, or of the grid with Ctrl', () => {
    expect(move('Home', false, 7)).toBe(5);
    expect(move('End', false, 7)).toBe(9);
    expect(move('End', false, 21)).toBe(22);
    expect(move('Home', true, 7)).toBe(0);
    expect(move('End', true, 7)).toBe(22);
  });

  it('moves by a page of rows and keeps the column', () => {
    expect(move('PageDown', false, 1)).toBe(11);
    expect(move('PageDown', false, 11)).toBe(21);
    expect(move('PageUp', false, 11)).toBe(1);
    expect(move('PageUp', false, 3)).toBe(3);
  });

  it('ignores other keys and an empty grid', () => {
    expect(move('a', false, 3)).toBeUndefined();
    expect(move('ArrowDown', false, 0, flat(0))).toBeUndefined();
  });
});

describe('VirtualGrid on the server', () => {
  it('draws only the first screen of 2000 tiles, without a window or a document', () => {
    const html = draw();
    const cells = (html.match(/role="gridcell"/g) ?? []).length;
    expect(cells).toBeGreaterThan(5);
    expect(cells).toBeLessThan(200);
    expect(html).toContain('aria-label="Tiles"');
    expect(html).toContain('role="grid"');
    expect(html).toContain('data-vg-index="0"');
    expect(html).not.toContain('Tile 1999');
  });

  it('puts one tile in the tab order', () => {
    expect((draw().match(/tabindex="0"/g) ?? []).length).toBe(1);
  });

  it('takes the tile size from a token and sets the row count', () => {
    const html = draw({ tileSize: 'size-64' });
    expect(html).toContain('--vg-tile-w:var(--size-64)');
    expect(html).toContain('--vg-tile-h:var(--size-64)');
    expect(html).toContain('--vg-rows:400');
    expect(html).toContain('--vg-headers:0');
  });

  it('draws an empty grid with no row', () => {
    const html = draw({ items: [] });
    expect(html).toContain('role="grid"');
    expect(html).not.toContain('role="row"');
  });
});

describe('tiles that are not square', () => {
  it('fits columns from the width of the tile', () => {
    expect(gridColumns(500, 125)).toBe(4);
    expect(gridColumns(500, 50)).toBe(10);
  });

  it('sets the width and the height of the tile from two tokens', () => {
    const html = draw({ tileWidth: 'size-128', tileHeight: 'size-64' });
    expect(html).toContain('--vg-tile-w:var(--size-128)');
    expect(html).toContain('--vg-tile-h:var(--size-64)');
  });

  it('takes the square size for the side left out', () => {
    const html = draw({ tileSize: 'size-48', tileWidth: 'size-160' });
    expect(html).toContain('--vg-tile-w:var(--size-160)');
    expect(html).toContain('--vg-tile-h:var(--size-48)');
  });
});

describe('the row height of VirtualList', () => {
  const list = (extra) => renderToString(h(VirtualList, {
    label: 'Items', items: ITEMS, getKey: (item) => item.id, renderItem: (item) => item.text, ...extra,
  }));

  it('takes the height from a size token', () => {
    expect(list({ rowHeight: 'size-64' })).toContain('--vl-row-h:var(--size-64)');
  });

  it('leaves the height to the row size when no token is given', () => {
    const html = list({ rowSize: 'compact' });
    expect(html).not.toContain('--vl-row-h');
    expect(html).toContain('data-row-size="compact"');
  });
});
