/* @layer renderer-components @kind types */
interface FitSpan {
  lo: number;
  hi: number;
}

interface FitBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface FitSize {
  width: number;
  height: number;
}

interface FitShift {
  x: number;
  y: number;
}

export type { FitBox, FitShift, FitSize, FitSpan };
