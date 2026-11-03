/* @layer renderer-components @kind types */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { VirtualAxis } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

interface ListRectsInput {
  layout: ItemLayout;
  cross: number;
  axis: VirtualAxis;
  origin: Point;
  keyOf: (index: number) => string;
}

export type { ListRectsInput };
