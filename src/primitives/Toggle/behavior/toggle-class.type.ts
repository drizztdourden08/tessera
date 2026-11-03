/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';
import type { ControlLabelSize } from '../../field-control/label-size.type';

interface ToggleClassInput {
  controlSize: ControlSize;
  labelSize: ControlLabelSize | undefined;
  mixed: boolean;
  disabled: boolean;
}

export type { ToggleClassInput };
