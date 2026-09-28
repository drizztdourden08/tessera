/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { NestedPlan } from '../behavior/nested-plan.type';
import type { EditorBinding, PositionPair } from '../RecordEditor.type';

interface EditorNestProps {
  field: FieldDescriptor;
  value: unknown;
  plan: NestedPlan;
  pair?: PositionPair;
  binding: EditorBinding;
  depth: number;
}

export type { EditorNestProps };
