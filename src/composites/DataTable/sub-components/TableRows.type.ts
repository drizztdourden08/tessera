/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';
import type { VirtualRows } from '../behavior/useVirtualRows.type';
import type { RowRenderContext } from '../DataTable.type';

interface TableRowsProps<T> {
  virtual: VirtualRows<T> | null;
  nodes: readonly GroupedRow<T>[];
  context: RowRenderContext<T>;
}

export type { TableRowsProps };
