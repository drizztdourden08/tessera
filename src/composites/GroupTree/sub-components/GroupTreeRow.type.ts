/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TreeRow } from '../GroupTree.type';

interface GroupTreeRowProps<T> {
  row: TreeRow<T>;
  selected: boolean;
  focusable: boolean;
  activeBranch: ReadonlySet<string>;
  showCounts: boolean;
  renderItem: (item: T) => ReactNode;
  itemIcon?: (item: T) => ReactNode;
  onChoose: (row: TreeRow<T>) => void;
  onActivate?: (item: T) => void;
}

export type { GroupTreeRowProps };
