/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';
import type { ControlLabelSize } from '../../field-control/label-size.type';

interface CheckboxClassParts {
  controlSize: ControlSize;
  labelSize: ControlLabelSize | undefined;
  boxed: boolean;
  disabled: boolean | undefined;
  className: string | undefined;
}

export type { CheckboxClassParts };
