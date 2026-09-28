/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DragShift } from './column-drag-shift.type';

interface UseColumnShiftInput {
  cellRef: RefObject<HTMLElement | null>;
  path: string;
  shift: DragShift;
  carriedPath: string | null;
}

export type { UseColumnShiftInput };
