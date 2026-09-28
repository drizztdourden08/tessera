/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface OperatorMenuProps {
  field: FieldDescriptor;
  op: string;
  caseSensitive?: boolean;
  onChange: (nextOp: string) => void;
  onChangeCaseSensitive?: (next: boolean) => void;
}

export type { OperatorMenuProps };
