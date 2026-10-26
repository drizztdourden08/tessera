/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import '../src/composites/field-kits/NumberKit';
import { numberCellText } from '../src/composites/field-kits/number-cell-text';
import { cellContent } from '../src/composites/DataTable/behavior/cell-content';
import { buildSchema, deriveRows } from '../src/data';

const ROWS = [
  { id: 'a', name: 'alpha', memory: 9.5 },
  { id: 'b', name: 'beta', memory: 120 },
  { id: 'c', name: 'gamma', memory: 12.4 },
];
const SCHEMA = buildSchema(ROWS, { units: { memory: 'MB' } });
const memory = SCHEMA.find((field) => field.path === 'memory');
const cell = (row) => renderToString(h('div', null, cellContent(row, 'memory', memory)));

describe('a number field with a unit', () => {
  it('takes the unit from the schema config', () => {
    expect(memory.unit).toBe('MB');
    expect(SCHEMA.find((field) => field.path === 'name').unit).toBeUndefined();
  });

  it('writes the number and the unit in the cell, right aligned like numbers', () => {
    expect(numberCellText(12.4, memory)).toEqual({ text: '12.4 MB', title: '12.4 MB' });
    expect(cell(ROWS[2])).toContain('field-kit__num');
    expect(cell(ROWS[2])).toContain('>12.4 MB<');
  });

  it('leaves a plain number and a hex number as they were without a unit', () => {
    expect(numberCellText(12.4, {})).toEqual({ text: '12.4', title: '12.4' });
    expect(numberCellText(260, { format: 'hex4' })).toEqual({ text: '0x0104', title: '0x0104 (260)' });
    expect(numberCellText(260, { format: 'hex4', unit: 'B' }).text).toBe('0x0104 B');
  });

  it('sorts on the raw number, not on the text with the unit', () => {
    const sorted = deriveRows({ rows: ROWS, schema: { byPath: (path) => SCHEMA.find((field) => field.path === path) }, sort: [{ path: 'memory', dir: 'asc' }], groupBy: [] });
    expect(sorted.sortedRows.map((row) => row.id)).toEqual(['a', 'c', 'b']);
    const text = ROWS.map((row) => `${row.memory} MB`).sort();
    expect(text[0]).toBe('12.4 MB');
  });
});
