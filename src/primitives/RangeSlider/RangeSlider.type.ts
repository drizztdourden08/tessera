/* @layer renderer-components @kind types */
interface RangeSliderProps {
  stops: readonly string[];
  value: readonly [number, number];
  onChange: (next: [number, number]) => void;
  disabled?: boolean;
  step?: number;
  labelEvery?: number;
  ariaLabel?: string;
  className?: string;
}

export type { RangeSliderProps };
