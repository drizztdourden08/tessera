/* @layer renderer-components @kind logic */
import { rowDragStart } from './row-drag-start';
import type { RowRenderContext } from '../DataTable.type';
import type { RowAttrs } from './row-attrs.type';

const rowAttrs = <T>(row: T, id: string, context: RowRenderContext<T>): RowAttrs => {
  const { reorder, rowDragData, rowState } = context;
  const attrs: RowAttrs = { 'data-marquee-key': id, 'data-state': rowState?.(row) };
  const at = reorder ? reorder.indexOf(id) : -1;
  if (reorder && at >= 0) {
    attrs['data-reorder-index'] = at;
    attrs['data-reorder-key'] = id;
    attrs['data-drop'] = reorder.drag.dropMark(at, reorder.total);
    attrs['data-dragging'] = reorder.drag.dragging === at ? 'yes' : undefined;
  }
  if (rowDragData) {
    attrs.draggable = true;
    attrs.onDragStart = (event) => rowDragStart(event, rowDragData(row), (reorder?.drag.dragging ?? null) !== null);
  }
  return attrs;
};

export { rowAttrs };
