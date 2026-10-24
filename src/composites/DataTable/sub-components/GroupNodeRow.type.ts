/* @layer renderer-components @kind types */
import type { GroupNode } from '../behavior/flatten-rows.type';
import type { RowRenderContext } from '../DataTable.type';

interface GroupNodeRowProps<T> {
  node: GroupNode<T>;
  uid: string;
  context: RowRenderContext<T>;
  index?: number;
}

export type { GroupNodeRowProps };
