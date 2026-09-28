/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const withFit = (column: TableColumn): TableColumn => {
  const next: TableColumn = { ...column, fit: true };
  delete next.width;
  delete next.grow;
  return next;
};

export { withFit };
