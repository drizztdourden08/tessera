/* @layer renderer-components @kind util */
import { gridInsertionAt } from './grid-insertion-at';
import { insertionAt } from './insertion-at';
import { AXIS_BOX } from './reorder.constants';
import type { ReorderAxis } from './reorder.type';

const pointerInsertion = (
  list: HTMLElement | null,
  selector: string,
  axis: ReorderAxis,
  point: { clientX: number; clientY: number },
): number => {
  if (axis === 'grid') return gridInsertionAt(list, selector, point.clientX, point.clientY);
  return insertionAt(list, selector, axis, point[AXIS_BOX[axis].pointer]);
};

export { pointerInsertion };
