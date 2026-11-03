/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { VirtualListCellBind } from '../VirtualList.type';

interface ListCellBindInput {
  index: number;
  count: number;
  itemKey: string;
  tabbable: boolean;
  selected?: boolean;
  current: boolean;
  bare: boolean;
  extras: Partial<VirtualListCellBind>;
  onActivate: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { ListCellBindInput };
