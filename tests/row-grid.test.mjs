/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { gridShape } from '../src/composites/RowGrid/behavior/grid-shape';

const COLUMNS = [
  { id: 'name', label: 'Name', min: 120, max: 260, cell: (row) => h('span', null, row.name), error: (row) => (row.name ? undefined : 'Give the player a name.') },
  { id: 'game', label: 'Game', min: 160, max: 300, cell: () => h('span', null, 'game') },
  { id: 'notes', label: 'Overrides', min: 168, max: 200, fold: true, cell: () => h('span', null, 'none') },
];
const PARTS = { handle: true, numbered: true, endButtons: 2, density: 'comfortable' };

describe('K1 RowGrid', { tags: ['critical'] }, () => {
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
});
