/* @layer renderer-components @kind types */
import type { ControlName } from '../../../primitives/field-control/control-name.type';
interface IdInputProps extends ControlName {
  placeholder: string;
  value: unknown;
  disabled?: boolean;
  onChange: (value: unknown) => void;
}

export type { IdInputProps };
