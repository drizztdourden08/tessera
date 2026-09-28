/* @layer renderer-components @kind logic */
import { MAX_NESTING, NO_BRANCH, NO_FIELDS, TOO_DEEP } from './nested-plan.constants';
import { detectUnionBranch } from './union-branch';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { NestedPlan } from './nested-plan.type';

const extraNote = (keys: readonly string[]): string | undefined =>
  (keys.length ? `Also holds, unedited: ${keys.join(', ')}` : undefined);

const unionPlan = (field: FieldDescriptor, value: unknown): NestedPlan => {
  const branch = detectUnionBranch(field, value);
  if (branch.status !== 'resolved') return { fields: [], note: NO_BRANCH[branch.status] };
  return { fields: branch.fields, note: extraNote(branch.extraKeys) };
};

const nestedPlanFor = (field: FieldDescriptor, value: unknown, depth: number): NestedPlan | null => {
  if (field.kind !== 'object' && field.kind !== 'union') return null;
  if (depth >= MAX_NESTING) return { fields: [], note: TOO_DEEP };
  if (field.kind === 'union') return unionPlan(field, value);
  const children = field.children ?? [];
  return children.length ? { fields: children } : { fields: [], note: NO_FIELDS };
};

export { nestedPlanFor };
