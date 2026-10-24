/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

interface GridCellProps {
  index: number;
  column: number;
  itemKey: string;
  tabbable: boolean;
  onActivate: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
  children: ReactNode;
}

export type { GridCellProps };
