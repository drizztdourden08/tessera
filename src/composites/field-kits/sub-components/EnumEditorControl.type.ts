/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { ControlName } from '../../../primitives/field-control/control-name.type';

interface ClosedSetProps extends ControlName {
  field: FieldDescriptor;
  options: readonly string[];
  current: string;
  disabled?: boolean;
  onChange: (value: unknown) => void;
}

export type { ClosedSetProps };
