/* @layer renderer-components @kind logic */
import { MAX_BLANK_DEPTH } from './blank-value.constants';
import { blankFor } from './blank-for';
import { keyOf } from '../path/key-of';
import type { FieldDescriptor } from '../field-descriptor';

const blankAt = (field: FieldDescriptor, depth: number): unknown => {
  if (field.kind !== 'object') return blankFor(field);
  const shape: Record<string, unknown> = {};
  if (depth >= MAX_BLANK_DEPTH) return shape;
  for (const child of field.children ?? []) {
    if (child.optional) continue;
    shape[keyOf(child.path)] = blankAt(child, depth + 1);
  }
  return shape;
};

const blankValue = (field: FieldDescriptor): unknown => blankAt(field, 0);

export { blankValue };
