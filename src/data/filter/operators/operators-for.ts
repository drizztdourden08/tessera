/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { OPERATORS_BY_KIND } from './operators.constants';
import type { OperatorSpec } from './operators.type';

const operatorsFor = (kind: FieldKind): readonly OperatorSpec[] =>
  OPERATORS_BY_KIND[kind];

export { operatorsFor };
