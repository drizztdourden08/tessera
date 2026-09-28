/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface NestedPlan {
  fields: readonly FieldDescriptor[];
  note?: string;
}

export type { NestedPlan };
