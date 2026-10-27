/* @layer renderer-components @kind types */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';

interface FormClassParts {
  size: ControlSize;
  compact: boolean;
  dashed: boolean;
  className: string;
}

export type { FormClassParts };
