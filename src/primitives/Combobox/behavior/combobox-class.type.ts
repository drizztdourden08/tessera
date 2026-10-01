/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';

interface ComboboxClassInput {
  open: boolean;
  disabled: boolean;
  size: ControlSize;
  multi: boolean;
  className: string;
}

export type { ComboboxClassInput };
