/* @layer renderer-components @kind logic */
import { createClause } from '../../../data/filter/clause';
import { defaultOperatorFor, findOperator } from '../../../data/filter/operators';
import { defaultValueForArity } from './default-value-for-arity';
import type { FilterClause } from '../../../data/filter/clause';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const createClauseForField = (field: FieldDescriptor): FilterClause => {
  const op = defaultOperatorFor(field.kind);
  const arity = findOperator(field.kind, op)?.arity ?? 'one';
  return createClause(field.path, op, defaultValueForArity(arity));
};

export { createClauseForField };
