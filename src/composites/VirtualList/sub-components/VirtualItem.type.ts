/* @layer renderer-components @kind types */
import type { CSSProperties, ReactNode } from 'react';
import type { VirtualListCellBind } from '../VirtualList.type';

interface VirtualItemProps {
  bind: VirtualListCellBind;
  place: CSSProperties;
  slot: boolean;
  children: ReactNode;
}

export type { VirtualItemProps };
