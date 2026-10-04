/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RowGrid } from '../stories/preview/RowGrid/RowGrid';
import { gridShape } from '../stories/preview/RowGrid/behavior/grid-shape';

const ignore = () => undefined;
const ROWS = [{ id: 'a', name: 'Ana' }, { id: 'b', name: 'Ana' }, { id: 'c', name: '' }];
const COLUMNS = [
  { id: 'name', label: 'Name', min: 120, max: 260, cell: (row) => h('span', null, row.name), error: (row) => (row.name ? undefined : 'Give the player a name.') },
  { id: 'game', label: 'Game', min: 160, max: 300, cell: () => h('span', null, 'game') },
  { id: 'notes', label: 'Overrides', min: 168, max: 200, fold: true, cell: () => h('span', null, 'none') },
];
const PARTS = { handle: true, numbered: true, endButtons: 2, density: 'comfortable' };

const draw = (props) => renderToString(h(RowGrid, {
  label: 'Players', rows: ROWS, columns: COLUMNS, rowKey: (row) => row.id, rowLabel: (row, index) => row.name || `Player ${index + 1}`,
  numbered: true, onAdd: ignore, addLabel: 'Add player', onRemove: ignore, onMove: ignore, ...props,
}));

describe('RowGrid, the preview grid of editable rows', () => {
  it('works out the width each layout needs from the column sizes', () => {
    const shape = gridShape(COLUMNS, PARTS);
    expect(shape.table).toBe(164 + 120 + 160 + 168 + 16);
    expect(shape.fold).toBe(164 + 120 + 160 + 8);
    expect(shape.max).toBe(164 + 260 + 300 + 200 + 16);
    expect(gridShape(COLUMNS.slice(0, 2), PARTS).fold).toBeNull();
  });

  it('names the grid lines the cells, the fold and the buttons sit on', () => {
    const shape = gridShape(COLUMNS, PARTS);
    expect(shape.tracks('table')).toMatch(/^\[start\] var\(--size-24\) \[\] var\(--size-24\) \[cells\] minmax\(calc\(120 \* var\(--size-1\)\), calc\(260 \* var\(--size-1\)\)\)/);
    expect(shape.tracks('table').match(/minmax/g)).toHaveLength(3);
    expect(shape.tracks('fold').match(/minmax/g)).toHaveLength(2);
    expect(shape.tracks('cards')).toContain('[cells] minmax(0, 1fr) [end]');
    expect(shape.tracks('cards')).toMatch(/\[stop\]$/);
  });

  it('draws a header, one named group per row and a label per cell', () => {
    const html = draw();
    expect(html).toContain('aria-label="Players"');
    expect(html).toMatch(/row-grid__head" aria-hidden="true">.*>Name<.*>Game<.*>Overrides</);
    expect(html).toContain('aria-label="Ana, row 1"');
    expect(html).toContain('aria-label="Player 3, row 3"');
    expect(html.match(/<label/g)).toHaveLength(9);
    expect(html).toContain('aria-label="Move Ana"');
    expect(html).toContain('aria-label="Remove Ana"');
    expect(html).toContain('Add player');
  });

  it('writes a check under its cell and points the cell at it', () => {
    const html = draw();
    const error = /<span[^>]*id="([^"]+)"[^>]*>Give the player a name\.<\/span>/.exec(html);
    expect(error).not.toBeNull();
    expect(html).toContain('data-invalid="yes"');
    expect(html).toContain(error[1]);
  });

  it('shows an empty state with the add button when there are no rows', () => {
    const html = draw({ rows: [], empty: 'No players yet.' });
    expect(html).toContain('No players yet.');
    expect(html).toContain('Add player');
    expect(html).not.toContain('row-grid__head');
    expect(html).not.toContain('<ol');
  });

  it('leaves out the grip without onMove and the remove button without onRemove', () => {
    const html = draw({ onMove: undefined, onRemove: undefined });
    expect(html).not.toContain('row-grid__handle');
    expect(html).not.toContain('row-grid__remove');
    expect(html).not.toContain('row-grid__end');
  });
});
