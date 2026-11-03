/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { VirtualListModel } from './useVirtualList.type';

interface ListKeyDownInput {
  model: VirtualListModel;
  index: number;
  itemKey: string;
  ownsKey?: (event: KeyboardEvent<HTMLElement>) => boolean;
}

export type { ListKeyDownInput };
