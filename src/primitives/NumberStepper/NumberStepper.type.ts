/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: ControlSize;
  ariaLabel?: string;
  className?: string;
}

export type { NumberStepperProps };
