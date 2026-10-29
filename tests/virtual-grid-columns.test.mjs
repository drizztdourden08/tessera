/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { gridFixedColumns } from '../src/composites/VirtualGrid/behavior/grid-fixed-columns';
import { gridKeys } from '../src/composites/VirtualGrid/behavior/grid-keys';
import { gridLayout } from '../src/composites/VirtualGrid/behavior/grid-layout';
import { gridRects } from '../src/composites/VirtualGrid/behavior/grid-rects';
import { nextCell } from '../src/composites/VirtualGrid/behavior/next-cell';
import { VirtualGrid } from '../src/composites/VirtualGrid';

const ITEMS = Array.from({ length: 40 }, (_, at) => ({ id: `tile-${at}`, text: `Tile ${at}` }));

const draw = (extra) => renderToString(h(VirtualGrid, {
  label: 'Tileset', items: ITEMS, getKey: (item) => item.id, renderItem: (item) => item.text, ...extra,
}));

const flat = (count, columns) => gridLayout([{ header: false, count, collapsed: false }], columns);

describe('the fixed column count', () => {
  it('keeps a whole number from 1', () => {
    expect(gridFixedColumns(6)).toBe(6);
    expect(gridFixedColumns(1)).toBe(1);
    expect(gridFixedColumns(6.9)).toBe(6);
  });

  it('falls back to the width for anything else', () => {
    expect(gridFixedColumns(undefined)).toBeUndefined();
    expect(gridFixedColumns(0)).toBeUndefined();
    expect(gridFixedColumns(0.5)).toBeUndefined();
    expect(gridFixedColumns(-3)).toBeUndefined();
    expect(gridFixedColumns(Number.NaN)).toBeUndefined();
    expect(gridFixedColumns(Number.POSITIVE_INFINITY)).toBeUndefined();
  });
});

describe('a layout with a fixed column count', () => {
  it('holds exactly that many tiles in every row but the last', () => {
    const layout = flat(20, 6);
    expect(layout.rows.map((row) => row.size)).toEqual([6, 6, 6, 2]);
  });

  it('breaks each section at the fixed count', () => {
    const layout = gridLayout([{ header: true, count: 8, collapsed: false }, { header: true, count: 13, collapsed: false }], 6);
    expect(layout.rows.filter((row) => row.kind === 'tiles').map((row) => row.size)).toEqual([6, 2, 6, 6, 1]);
  });

  it('moves Up and Down by the fixed count and Page by whole rows', () => {
    const layout = flat(40, 6);
    const press = (key, active, page = 2) => nextCell(key, layout, active, { ctrl: false, page });
    expect(press('ArrowDown', 3)).toBe(9);
    expect(press('ArrowUp', 9)).toBe(3);
    expect(press('PageDown', 3)).toBe(15);
    expect(press('PageUp', 15)).toBe(3);
    expect(press('End', 7)).toBe(11);
  });

  it('gives the selection rectangle the row and column of every item', () => {
    const keys = ITEMS.map((item) => item.id);
    const { cells } = gridKeys(flat(40, 6), keys);
    expect(cells.get('tile-0')).toEqual({ row: 0, column: 0 });
    expect(cells.get('tile-5')).toEqual({ row: 0, column: 5 });
    expect(cells.get('tile-6')).toEqual({ row: 1, column: 0 });
    expect(cells.get('tile-39')).toEqual({ row: 6, column: 3 });
  });

  it('places the marquee rects at the fixed columns', () => {
    const rects = gridRects({
      layout: flat(14, 6), heights: { tile: 64, head: 32 }, tileWidth: 64, origin: { x: 0, y: 0 }, keyOf: (index) => `k${index}`,
    });
    const at = (key) => rects.find((item) => item.key === key)?.rect;
    expect(at('k5')).toEqual({ x: 320, y: 0, width: 64, height: 64 });
    expect(at('k6')).toEqual({ x: 0, y: 64, width: 64, height: 64 });
    expect(at('k13')).toEqual({ x: 64, y: 128, width: 64, height: 64 });
  });
});

describe('VirtualGrid with columns on the server', () => {
  it('says the column count and keeps the grid at least as wide as the columns', () => {
    const html = draw({ columns: 6, tileSize: 'size-64' });
    expect(html).toContain('aria-colcount="6"');
    expect(html).toContain('--vg-cols:6');
  });

  it('draws six tiles in the first row', () => {
    const html = draw({ columns: 6 });
    const first = html.split('data-vg-row="1"')[0] ?? '';
    expect((first.match(/data-vg-kind="tile"/g) ?? []).length).toBe(6);
  });

  it('leaves the width driven count alone without columns', () => {
    const html = draw();
    expect(html).toContain('aria-colcount="5"');
    expect(html).not.toContain('--vg-cols');
  });
});
