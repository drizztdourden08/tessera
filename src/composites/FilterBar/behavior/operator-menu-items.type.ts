/* @layer renderer-components @kind types */
import type { FieldKind } from '../../../data/schema/field-descriptor';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface OperatorMenuInput {
  kind: FieldKind;
  op: string;
  caseSensitive?: boolean;
  onPickOperator: (id: string) => void;
  onToggleCaseSensitive?: (next: boolean) => void;
  strings: TesseraStrings['filters'];
  operatorLabels: TesseraStrings['filterOperators'];
}

export type { OperatorMenuInput };
