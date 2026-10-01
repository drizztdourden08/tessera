/* @layer renderer-components @kind types */
interface SliderScale {
  min: number;
  max: number;
  step: number;
  stops?: readonly string[];
  formatValue?: (value: number) => string;
}

export type { SliderScale };
