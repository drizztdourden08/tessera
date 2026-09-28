/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

type UnionBranchStatus = 'resolved' | 'absent' | 'not-object' | 'unmatched';

interface UnionBranch {
  status: UnionBranchStatus;
  fields: readonly FieldDescriptor[];
  extraKeys: readonly string[];
}

export type { UnionBranch, UnionBranchStatus };
