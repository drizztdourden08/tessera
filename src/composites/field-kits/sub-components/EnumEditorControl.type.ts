/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { ControlName } from '../../../primitives/field-control/control-name.type';

type ClosedSetTier = 'segments' | 'chips' | 'list';

interface ClosedSetProps extends ControlName {
  field: FieldDescriptor;
  options: readonly string[];
  labelOf: (option: string) => string;
  current: string;
  disabled?: boolean;
  onChange: (value: unknown) => void;
}

interface ClosedSetChoicesProps extends ClosedSetProps {
  chips: boolean;
}

export type { ClosedSetChoicesProps, ClosedSetProps, ClosedSetTier };
