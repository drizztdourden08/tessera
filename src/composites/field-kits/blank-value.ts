/* @layer renderer-components @kind logic */
import { MAX_BLANK_DEPTH } from './blank-value.constants';
import { blankFor } from './blank-for';
import { keyOf } from './key-of';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';

const blankValue = (field: FieldDescriptor, depth = 0): unknown => {
  if (field.kind !== 'object') return blankFor(field);
  const shape: Record<string, unknown> = {};
  if (depth >= MAX_BLANK_DEPTH) return shape;
  for (const child of field.children ?? []) {
    if (child.optional) continue;
    shape[keyOf(child.path)] = blankValue(child, depth + 1);
  }
  return shape;
};

export { blankValue };
