/* @layer renderer-components @kind types */
import type { FieldKind } from '../../../data/schema/field-descriptor';

interface OperatorMenuInput {
  kind: FieldKind;
  op: string;
  caseSensitive?: boolean;
  onPickOperator: (id: string) => void;
  onToggleCaseSensitive?: (next: boolean) => void;
}

export type { OperatorMenuInput };
