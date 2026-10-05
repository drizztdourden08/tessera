/* @layer renderer-components @kind types */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';

interface TagInputClassInput {
  disabled: boolean;
  invalid: boolean;
  size: ControlSize;
  className: string;
}

export type { TagInputClassInput };
