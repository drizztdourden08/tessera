/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VirtualGrid } from '../src/composites/VirtualGrid';

const ITEMS = Array.from({ length: 12 }, (_, at) => ({ id: `tile-${at}`, text: `Tile ${at}` }));

const drawTiles = () => renderToString(h(VirtualGrid, {
  label: 'Buttons', items: ITEMS, getKey: (item) => item.id,
  renderTile: (item, _index, cell) => h('button', { ...cell, type: 'button' }, item.text),
}));

describe('VirtualGrid with renderTile', () => {
  it('makes each tile the cell, with one tab stop for the whole grid', () => {
    const html = drawTiles();
    expect((html.match(/role="gridcell"/g) ?? []).length).toBe(12);
    expect((html.match(/tabindex="0"/g) ?? []).length).toBe(1);
    expect((html.match(/<button/g) ?? []).length).toBe(12);
    expect(html).not.toMatch(/<div[^>]*role="gridcell"/);
  });

  it('keeps the data attributes and drops the padding of the cell', () => {
    const html = drawTiles();
    expect(html).toMatch(/<button[^>]*data-vg-index="0"[^>]*data-vg-kind="tile"[^>]*data-marquee-key="tile-0"/);
    expect(html).toContain('virtual-grid__cell--bare');
  });

  it('keeps a padded wrapper cell when renderItem is used', () => {
    const html = renderToString(h(VirtualGrid, { label: 'Tiles', items: ITEMS, getKey: (item) => item.id, renderItem: (item) => item.text }));
    expect(html).not.toContain('virtual-grid__cell--bare');
    expect(html).toMatch(/<div[^>]*role="gridcell"/);
  });
});
