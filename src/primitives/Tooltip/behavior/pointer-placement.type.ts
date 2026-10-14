/* @layer renderer-components @kind types */
interface PointerSpot {
  x: number;
  y: number;
}

interface PointerRoom {
  pointer: PointerSpot;
  bubble: { width: number; height: number };
  view: { width: number; height: number };
}

export type { PointerRoom, PointerSpot };
