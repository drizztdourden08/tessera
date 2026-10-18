/* @layer renderer-components @kind types */
import type { FoldSide } from '../ResizeHandle.type';

interface DragOrigin {
  pointer: number;
  start: number;
  last: number;
  pixelsPerUnit: number;
  sign: number;
  snap: number;
  folded: FoldSide | null;
  moved: boolean;
}

export type { DragOrigin };
