/* @layer renderer-components @kind types */
import type { VirtualRows } from '../behavior/useVirtualRows.type';
import type { RowRenderContext } from '../DataTable.type';

interface VirtualRowsProps<T> {
  virtual: VirtualRows<T>;
  context: RowRenderContext<T>;
}

export type { VirtualRowsProps };
