/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { VirtualListModel } from '../behavior/useVirtualList.type';
import type { VirtualListCellBind, VirtualListPick } from '../VirtualList.type';

interface ListRowsProps<T> {
  items: readonly T[];
  model: VirtualListModel;
  renderItem?: (item: T, index: number) => ReactNode;
  renderOption?: (item: T, index: number, cell: VirtualListCellBind) => ReactNode;
  current?: string;
  onPick?: VirtualListPick;
  ownsKey?: (event: KeyboardEvent<HTMLElement>) => boolean;
}

export type { ListRowsProps };
