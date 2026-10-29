/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { buildSchema } from '../src/data';
import { DataTable } from '../src/composites/DataTable';

const ROWS = Array.from({ length: 5 }, (_, at) => ({ id: `r${at}`, label: `Item ${at}` }));
const SCHEMA = buildSchema(ROWS, { kinds: { label: 'string' }, hidden: ['id'] });
const idOf = (row) => row.id;

const draw = (extra) => renderToString(h(DataTable, { rows: ROWS, schema: SCHEMA, getRowId: idOf, ...extra }));

describe('DataTable with rowRef', () => {
  it('draws the same rows and leaves the refs to the browser', () => {
    const rowRef = vi.fn(() => vi.fn());
    const html = draw({ rowRef });
    expect(html).toBe(draw({}));
    expect(rowRef).not.toHaveBeenCalled();
  });

  it('keeps drawing rows that drag, select and reorder', () => {
    const html = draw({
      rowRef: () => vi.fn(),
      rowDragData: (row) => ({ 'text/plain': row.id }),
      selectable: true,
      selectedIds: new Set(),
      onRowMove: vi.fn(),
    });
    expect(html).toContain('draggable="true"');
    expect(html).toContain('data-reorder-key="r0"');
  });
});
