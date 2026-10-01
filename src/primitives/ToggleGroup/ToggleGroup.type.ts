/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintReport } from '../hint/hint.type';

interface ToggleOption<T extends string = string> {
  value: T;
  label: string;
  hint?: Hint;
  disabled?: boolean;
}

interface ToggleGroupProps<T extends string = string> {
  value: T[];
  options: ToggleOption<T>[];
  onChange: (value: T[]) => void;
  onHint?: HintReport;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: ControlSize;
}

export type { ToggleOption, ToggleGroupProps };
