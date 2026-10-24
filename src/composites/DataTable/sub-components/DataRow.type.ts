/* @layer renderer-components @kind types */
import type { RowRenderContext } from '../DataTable.type';

interface DataRowProps<T> {
  row: T;
  context: RowRenderContext<T>;
  index?: number;
}

export type { DataRowProps };
