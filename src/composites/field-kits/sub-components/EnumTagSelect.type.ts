/* @layer renderer-components @kind types */
import type { ControlName } from '../../../primitives/field-control/control-name.type';
interface EnumTagSelectProps extends ControlName {
  id: string;
  options: readonly string[];
  selected: readonly string[];
  onChange: (selected: readonly string[]) => void;
  single?: boolean;
  disabled?: boolean;
}

export type { EnumTagSelectProps };
