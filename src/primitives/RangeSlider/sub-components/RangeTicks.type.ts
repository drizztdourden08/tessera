/* @layer renderer-components @kind types */
interface RangeTicksProps {
  stops: readonly string[];
  low: number;
  high: number;
  labelEvery?: number;
}

export type { RangeTicksProps };
