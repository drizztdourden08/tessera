/* @layer renderer-components @kind types */
import type { OperatorSpec } from '../../../data/filter/operators';
import type { FieldKind } from '../../../data/schema/field-descriptor';

type Arity = OperatorSpec['arity'];

interface OperatorChangeInput {
  kind: FieldKind;
  previousOp: string;
  nextOp: string;
  currentValue: unknown;
}

export type { Arity, OperatorChangeInput };
