/* @layer renderer-components @kind types */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface RectsInput {
  layout: GridLayout;
  heights: GridHeights;
  tileWidth: number;
  origin: Point;
  keyOf: (index: number) => string;
}

export type { RectsInput };
