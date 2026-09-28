/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface ClosedSetProps {
  field: FieldDescriptor;
  options: readonly string[];
  current: string;
  disabled?: boolean;
  onChange: (value: unknown) => void;
}

export type { ClosedSetProps };
