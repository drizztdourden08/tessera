/* @layer renderer-components @kind types */
import type { StackedBarOrientation, StackedBarSize } from '../StackedBar.type';

interface BarFrameInput {
  orientation: StackedBarOrientation;
  size: StackedBarSize;
  height: number | undefined;
  className: string | undefined;
}

export type { BarFrameInput };
