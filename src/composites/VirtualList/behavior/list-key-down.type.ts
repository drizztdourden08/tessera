/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { VirtualListPick } from '../VirtualList.type';
import type { VirtualListModel } from './useVirtualList.type';

interface ListKeyDownInput {
  model: VirtualListModel;
  index: number;
  itemKey: string;
  onPick?: VirtualListPick;
  ownsKey?: (event: KeyboardEvent<HTMLElement>) => boolean;
}

export type { ListKeyDownInput };
