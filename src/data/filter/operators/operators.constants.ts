/* @layer renderer-components @kind data */
import type { FieldKind } from '../../schema/field-descriptor';
import type { OperatorSpec } from './operators.type';

const IS_EMPTY: OperatorSpec = { id: 'isEmpty', icon: 'is-empty', arity: 'none' };
const IS_NOT_EMPTY: OperatorSpec = { id: 'isNotEmpty', icon: 'is-not-empty', arity: 'none' };
const EQ: OperatorSpec = { id: 'eq', icon: 'equals', arity: 'one' };
const NEQ: OperatorSpec = { id: 'neq', icon: 'not-equals', arity: 'one' };

const STRING_OPERATORS: readonly OperatorSpec[] = [
  { id: 'contains', icon: 'contains', arity: 'one' },
  { id: 'startsWith', icon: 'starts-with', arity: 'one' },
  { id: 'endsWith', icon: 'ends-with', arity: 'one' },
  EQ, NEQ, IS_EMPTY, IS_NOT_EMPTY,
];

const NUMBER_OPERATORS: readonly OperatorSpec[] = [
  EQ, NEQ,
  { id: 'gt', icon: 'greater', arity: 'one' },
  { id: 'gte', icon: 'greater-eq', arity: 'one' },
  { id: 'lt', icon: 'less', arity: 'one' },
  { id: 'lte', icon: 'less-eq', arity: 'one' },
  { id: 'between', icon: 'between', arity: 'many' },
];

const BOOLEAN_OPERATORS: readonly OperatorSpec[] = [
  { id: 'isTrue', icon: 'is-true', arity: 'none' },
  { id: 'isFalse', icon: 'is-false', arity: 'none' },
];

const ENUM_OPERATORS: readonly OperatorSpec[] = [
  { id: 'anyOf', icon: 'any-of', arity: 'many' },
  { id: 'noneOf', icon: 'none-of', arity: 'many' },
];

const ID_REF_OPERATORS: readonly OperatorSpec[] = [EQ, NEQ, IS_EMPTY];

const ARRAY_OPERATORS: readonly OperatorSpec[] = [
  { id: 'containsValue', icon: 'contains-value', arity: 'one' },
  IS_EMPTY, IS_NOT_EMPTY,
  { id: 'lengthEq', icon: 'length-eq', arity: 'one' },
  { id: 'lengthGt', icon: 'length-gt', arity: 'one' },
  { id: 'lengthLt', icon: 'length-lt', arity: 'one' },
];

const EXISTENCE_OPERATORS: readonly OperatorSpec[] = [IS_EMPTY, IS_NOT_EMPTY];

const OPERATORS_BY_KIND: Record<FieldKind, readonly OperatorSpec[]> = {
  string: STRING_OPERATORS,
  number: NUMBER_OPERATORS,
  boolean: BOOLEAN_OPERATORS,
  enum: ENUM_OPERATORS,
  idRef: ID_REF_OPERATORS,
  array: ARRAY_OPERATORS,
  object: EXISTENCE_OPERATORS,
  union: EXISTENCE_OPERATORS,
  unknown: EXISTENCE_OPERATORS,
};

export { IS_EMPTY, OPERATORS_BY_KIND };
