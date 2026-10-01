/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';

interface FieldState {
  invalid: boolean;
  labelledBy: string | undefined;
  disabled: boolean;
  size: ControlSize;
  className: string;
}

export type { FieldState };
