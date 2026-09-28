/* @layer renderer-components @kind types */
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
  className?: string;
}

interface AxisFieldProps {
  axis: PositionAxis;
  axisLabel: string;
  value: number;
  disabled: boolean;
  onCommit: (next: number) => void;
}

export type { PositionAxis, PositionValue, PositionInputProps, AxisFieldProps };
