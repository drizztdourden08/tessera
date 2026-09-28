/* @layer renderer-components @kind logic */
import type { DragShiftParams, DropEdge } from './column-drag-shift.type';

const dropEdgeAt = (params: DragShiftParams): DropEdge => {
  const { index, from, over } = params;
  if (from === null || over === null || from === over || index !== over) return null;
  return over > from ? 'after' : 'before';
};

export { dropEdgeAt };
