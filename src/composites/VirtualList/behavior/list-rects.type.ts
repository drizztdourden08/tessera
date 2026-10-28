/* @layer renderer-components @kind types */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { VirtualAxis } from '../../virtual';

interface ListRectsInput {
  count: number;
  size: number;
  cross: number;
  axis: VirtualAxis;
  origin: Point;
  keyOf: (index: number) => string;
}

export type { ListRectsInput };
