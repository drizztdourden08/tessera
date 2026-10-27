/* @layer renderer-components @kind types */
import type { RowRenderContext } from '../DataTable.type';

interface DetailRowProps<T> {
  row: T;
  context: RowRenderContext<T>;
  index?: number;
}

export type { DetailRowProps };
