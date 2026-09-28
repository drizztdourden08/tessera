/* @layer renderer-components @kind logic */
import { findOperator } from '../../../data/filter/operators';
import { defaultValueForArity } from './default-value-for-arity';
import type { OperatorChangeInput } from './filter-clause-defaults.type';

const valueForOperatorChange = (input: OperatorChangeInput): unknown => {
  const { kind, previousOp, nextOp, currentValue } = input;
  const previousArity = findOperator(kind, previousOp)?.arity ?? 'one';
  const nextArity = findOperator(kind, nextOp)?.arity ?? 'one';
  if (previousArity === nextArity) return currentValue;
  return defaultValueForArity(nextArity);
};

export { valueForOperatorChange };
