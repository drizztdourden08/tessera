/* @layer stories @kind util */
import type { RowGridColumn, RowGridLayout } from '../RowGrid.type';

const splitColumns = <Row>(columns: readonly RowGridColumn<Row>[], layout: RowGridLayout) => {
  if (layout === 'cards') return { inRow: columns.slice(0, 1), below: columns.slice(1) };
  if (layout === 'table') return { inRow: columns, below: [] };
  return { inRow: columns.filter((column) => !column.fold), below: columns.filter((column) => column.fold) };
};

export { splitColumns };
