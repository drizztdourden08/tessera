/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { findOperator } from './find-operator';

const isOperatorValid = (kind: FieldKind, id: string): boolean => findOperator(kind, id) !== undefined;

export { isOperatorValid };
