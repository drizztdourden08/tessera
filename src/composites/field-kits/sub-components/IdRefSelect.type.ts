/* @layer renderer-components @kind types */
import type { ControlName } from '../../../primitives/field-control/control-name.type';
import type { IdRefOption } from '../registry.type';

interface IdRefSelectProps extends ControlName {
  options: readonly IdRefOption[];
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export type { IdRefSelectProps };
