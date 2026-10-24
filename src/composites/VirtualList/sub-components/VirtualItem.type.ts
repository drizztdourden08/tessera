/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

interface VirtualItemProps {
  index: number;
  count: number;
  tabbable: boolean;
  onActivate: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
  children: ReactNode;
}

export type { VirtualItemProps };
