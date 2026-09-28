/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DropEdge } from './column-drag-shift.type';
import type { ColumnDragBinding } from '../DataTable.type';

interface UseHeaderDragInput {
  path: string;
  index: number;
  drag: ColumnDragBinding;
  cellRef: RefObject<HTMLElement | null>;
}

interface HeaderDragState {
  isDragging: boolean;
  vacated: boolean;
  edge: DropEdge;
}

export type { HeaderDragState, UseHeaderDragInput };
