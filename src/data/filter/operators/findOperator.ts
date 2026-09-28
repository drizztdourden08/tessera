/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { operatorsFor } from './operatorsFor';
import type { OperatorSpec } from './operators.type';

const findOperator = (kind: FieldKind, id: string): OperatorSpec | undefined =>
  operatorsFor(kind).find((spec) => spec.id === id);

export { findOperator };
