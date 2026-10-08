/* @layer renderer-components @kind types */
interface DragOrigin {
  pointer: number;
  start: number;
  last: number;
  pixelsPerUnit: number;
  sign: number;
}

export type { DragOrigin };
