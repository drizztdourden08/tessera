/* @layer renderer-components @kind types */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { CommandPatternSpec, CommandValues } from '../CommandInput.type';

interface CommandPatternFieldProps {
  spec: CommandPatternSpec;
  values: CommandValues;
  size: ControlSize;
  disabled: boolean;
  onValues: (values: CommandValues) => void;
}

export type { CommandPatternFieldProps };
