/* @layer renderer-components @kind logic */
import type { DragShift, DragShiftParams } from './column-drag-shift.type';

const columnDragShift = (params: DragShiftParams): DragShift => {
  const { index, from, over } = params;
  if (from === null || over === null || from === over || index === from) return 'none';
  if (over > from) return index > from && index <= over ? 'left' : 'none';
  return index >= over && index < from ? 'right' : 'none';
};

export { columnDragShift };
