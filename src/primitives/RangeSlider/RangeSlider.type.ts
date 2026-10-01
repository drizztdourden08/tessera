/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';

interface RangeSliderProps {
  stops: readonly string[];
  value: readonly [number, number];
  onChange: (next: [number, number]) => void;
  disabled?: boolean;
  step?: number;
  labelEvery?: number;
  ariaLabel?: string;
  size?: ControlSize;
  className?: string;
}

export type { RangeSliderProps };
