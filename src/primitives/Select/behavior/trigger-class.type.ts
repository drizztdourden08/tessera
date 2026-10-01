/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';

interface TriggerClassInput {
  open: boolean;
  disabled: boolean;
  size: ControlSize;
  full: boolean;
  className: string;
}

export type { TriggerClassInput };
