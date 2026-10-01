/* @layer renderer-components @kind logic */
import { MAX_NESTING } from './nested-plan.constants';
import { detectUnionBranch } from './union-branch';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { NestedPlan } from './nested-plan.type';
import type { UnionBranchStatus } from './union-branch.type';

const noBranchNote = (status: UnionBranchStatus, strings: TesseraStrings['records']): string => {
  if (status === 'absent') return strings.branchAbsent;
  if (status === 'not-object') return strings.branchNotObject;
  return strings.branchUnmatched;
};

const unionPlan = (field: FieldDescriptor, value: unknown, strings: TesseraStrings['records']): NestedPlan => {
  const branch = detectUnionBranch(field, value);
  if (branch.status !== 'resolved') return { fields: [], note: noBranchNote(branch.status, strings) };
  const note = branch.extraKeys.length ? strings.alsoHolds(branch.extraKeys) : undefined;
  return { fields: branch.fields, note };
};

const nestedPlanFor = (
  field: FieldDescriptor,
  value: unknown,
  depth: number,
  strings: TesseraStrings['records'],
): NestedPlan | null => {
  if (field.kind !== 'object' && field.kind !== 'union') return null;
  if (depth >= MAX_NESTING) return { fields: [], note: strings.nestedTooDeep };
  if (field.kind === 'union') return unionPlan(field, value, strings);
  const children = field.children ?? [];
  return children.length ? { fields: children } : { fields: [], note: strings.nestedNoFields };
};

export { nestedPlanFor };
