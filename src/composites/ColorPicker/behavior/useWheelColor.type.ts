/* @layer renderer-components @kind types */
type WheelColor =
  | string
  | { r: number; g: number; b: number; a?: number }
  | { h: number; s: number; l: number; a?: number };

export type { WheelColor };
