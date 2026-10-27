/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { buildSchema } from '../src/data';
import { DataTable } from '../src/composites/DataTable';

const ROWS = [{ id: 'r1', name: 'Echo' }, { id: 'r2', name: 'Delta' }];
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string' }, hidden: ['id'] });
const draw = (extra) => renderToString(h(DataTable, { rows: ROWS, schema: SCHEMA, getRowId: (row) => row.id, ...extra }));

describe('DataTable footer', () => {
  it('draws the footer with the count by default', () => {
    const html = draw({});
    expect(html).toContain('data-table__footer');
    expect(html).toContain('2 entries');
  });

  it('leaves the footer out for footer false', () => {
    const html = draw({ footer: false });
    expect(html).not.toContain('data-table__footer');
    expect(html).not.toContain('data-table__count');
    expect(html).toContain('Echo');
  });
});
