/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Table, TableCell, TableRow, TableSection } from '../src/primitives/Table';

const draw = (props) => renderToString(h(
  Table,
  props,
  h(TableSection, { head: true }, h(TableRow, null, h(TableCell, { header: true, align: 'right' }, 'Uses'))),
  h(TableSection, null, h(TableRow, null, h(TableCell, { align: 'center' }, '1'), h(TableCell, null, '2'))),
));

describe('Table', () => {
  it('draws a table in a scrolling border with a head, a body, rows and cells', () => {
    const html = draw({ 'aria-label': 'Keys' });
    expect(html).toBe('<div class="table-wrap"><table class="table" aria-label="Keys"><thead class="table__head"><tr class="table__row">'
      + '<th class="table__cell table__cell--head table__cell--right">Uses</th></tr></thead><tbody class="table__body"><tr class="table__row">'
      + '<td class="table__cell table__cell--center">1</td><td class="table__cell">2</td></tr></tbody></table></div>');
  });

  it('shades every second row with striped and adds a class to the wrapper', () => {
    const html = draw({ striped: true, className: 'mine' });
    expect(html).toContain('<div class="table-wrap mine"><table class="table table--striped">');
  });
});
