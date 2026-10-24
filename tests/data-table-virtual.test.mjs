/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DataTable } from '../src/composites/DataTable';
import { buildSchema } from '../src/data';

const ROWS = Array.from({ length: 300 }, (_, at) => ({ id: `row-${at}`, name: `Row ${at}` }));
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string' }, hidden: ['id'] });

const draw = (extra) => renderToString(h(DataTable, {
  rows: ROWS, schema: SCHEMA, getRowId: (row) => row.id, ...extra,
}));

const rowCount = (html) => (html.match(/role="row"/g) ?? []).length;

describe('DataTable on the server', () => {
  it('draws every row of a small table, as before', () => {
    expect(rowCount(draw({ virtualizeFrom: 1000 }))).toBe(301);
  });

  it('draws only the first screen of rows of a long table, without a window or a document', () => {
    const html = draw({ virtualizeFrom: 100 });
    expect(html).toContain('data-table__body');
    expect(rowCount(html)).toBeLessThan(60);
    expect(rowCount(html)).toBeGreaterThan(10);
  });
});
