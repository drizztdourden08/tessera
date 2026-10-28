/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

interface VirtualItemProps {
  index: number;
  count: number;
  tabbable: boolean;
  selected?: boolean;
  itemKey?: string;
  onActivate: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onPick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

export type { VirtualItemProps };
