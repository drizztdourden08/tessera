/* @layer renderer-components @kind logic */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { VirtualAxis } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

const listGapAt = (layout: ItemLayout, axis: VirtualAxis, origin: Point, point: Point): number => {
  if (layout.count <= 0) return 0;
  const offset = axis === 'horizontal' ? point.x - origin.x : point.y - origin.y;
  const at = layout.indexAt(offset);
  return offset > layout.startOf(at) + layout.sizeOf(at) / 2 ? at + 1 : at;
};

export { listGapAt };
