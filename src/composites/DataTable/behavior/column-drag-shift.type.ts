/* @layer renderer-components @kind types */
type DragShift = 'none' | 'left' | 'right';

type DropEdge = 'before' | 'after' | null;

interface DragShiftParams {
  index: number;
  from: number | null;
  over: number | null;
}

export type { DragShift, DragShiftParams, DropEdge };
