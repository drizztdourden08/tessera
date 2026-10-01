/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';

interface PositionAxis {
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

interface PositionValue {
  x: number;
  y: number;
}

interface PositionInputProps {
  value: PositionValue;
  onChange: (next: PositionValue) => void;
  x?: PositionAxis;
  y?: PositionAxis;
  disabled?: boolean;
  label?: string;
  size?: ControlSize;
  className?: string;
}

interface AxisFieldProps {
  axis: PositionAxis;
  axisLabel: string;
  value: number;
  disabled: boolean;
  size: ControlSize;
  onCommit: (next: number) => void;
}

export type { PositionAxis, PositionValue, PositionInputProps, AxisFieldProps };
