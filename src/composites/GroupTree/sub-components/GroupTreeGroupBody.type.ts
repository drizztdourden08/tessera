/* @layer renderer-components @kind types */
import type { TreeGroupRow } from '../GroupTree.type';

interface GroupTreeGroupBodyProps<T> {
  row: TreeGroupRow<T>;
  showCounts: boolean;
}

export type { GroupTreeGroupBodyProps };
