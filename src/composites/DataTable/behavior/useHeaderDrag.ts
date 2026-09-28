/* @layer renderer-components @kind hook */
import { columnDragShift } from './column-drag-shift';
import { dropEdgeAt } from './dropEdgeAt';
import { useColumnShift } from './useColumnShift';
import type { HeaderDragState, UseHeaderDragInput } from './useHeaderDrag.type';

const useHeaderDrag = ({ path, index, drag, cellRef }: UseHeaderDragInput): HeaderDragState => {
  const isDragging = drag.draggingPath === path;
  const placement = { index, from: drag.draggingIndex, over: drag.overIndex };
  const shift = columnDragShift(placement);
  const vacated = isDragging && drag.overIndex !== drag.draggingIndex;
  useColumnShift({ cellRef, path, shift, carriedPath: drag.draggingPath });
  return { isDragging, vacated, edge: dropEdgeAt(placement) };
};

export { useHeaderDrag };
