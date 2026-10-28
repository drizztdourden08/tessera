/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualListModel } from '../behavior/useVirtualList.type';

interface ListRowsProps<T> {
  items: readonly T[];
  model: VirtualListModel;
  renderItem: (item: T, index: number) => ReactNode;
}

export type { ListRowsProps };
