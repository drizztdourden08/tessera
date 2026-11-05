/* @layer renderer-components @kind types */
import type { OperatorSpec } from '../../../data/filter/operators';
import type { FieldKind } from '../../../data/schema/field-descriptor';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface OperatorMenuInput {
  kind: FieldKind;
  specs: readonly OperatorSpec[];
  op: string;
  caseSensitive?: boolean;
  onPickOperator: (id: string) => void;
  onToggleCaseSensitive?: (next: boolean) => void;
  strings: TesseraStrings['filters'];
  operatorLabels: TesseraStrings['filterOperators'];
}

export type { OperatorMenuInput };
