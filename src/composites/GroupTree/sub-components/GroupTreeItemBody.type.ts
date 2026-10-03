/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TreeItemRow } from '../GroupTree.type';

interface GroupTreeItemBodyProps<T> {
  row: TreeItemRow<T>;
  renderItem: (item: T) => ReactNode;
  itemIcon?: (item: T) => ReactNode;
}

export type { GroupTreeItemBodyProps };
