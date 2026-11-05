/* @layer renderer-components @kind logic */
import { operatorsFor } from '../../../data/filter/operators';
import type { OperatorSpec } from '../../../data/filter/operators';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const allowedOperators = (field: FieldDescriptor): readonly OperatorSpec[] => {
  const all = operatorsFor(field.kind);
  if (field.operators === undefined) return all;
  return field.operators.flatMap((id) => all.filter((spec) => spec.id === id));
};

export { allowedOperators };
