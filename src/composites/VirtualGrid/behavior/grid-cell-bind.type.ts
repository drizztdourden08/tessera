/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface GridCellBindInput {
  index: number;
  column: number;
  itemKey: string;
  tabbable: boolean;
  bare: boolean;
  onActivate: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

export type { GridCellBindInput };
