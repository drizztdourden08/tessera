/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';
import type { RowRenderContext } from '../DataTable.type';

interface RowTreeProps<T> {
  nodes: readonly GroupedRow<T>[];
  parentUid: string;
  context: RowRenderContext<T>;
}

export type { RowTreeProps };
