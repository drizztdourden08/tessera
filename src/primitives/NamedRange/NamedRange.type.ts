/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';

interface NamedStep {
  label: string;
  value: number;
}

interface NamedRangeProps {
  value: number;
  onChange: (value: number) => void;
  names: readonly NamedStep[];
  min: number;
  max: number;
  step?: number;
  showValues?: boolean;
  customLabel?: string;
  disabled?: boolean;
  size?: ControlSize;
  'aria-label'?: string;
  className?: string;
}

export type { NamedRangeProps, NamedStep };
