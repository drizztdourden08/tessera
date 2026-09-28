/* @layer renderer-components @kind logic */
import { keyOf } from './key-of';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { UnionBranch, UnionBranchStatus } from './union-branch.type';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const presentKeys = (value: Record<string, unknown>): ReadonlySet<string> =>
  new Set(Object.keys(value).filter((key) => value[key] !== undefined));

const noBranch = (status: UnionBranchStatus): UnionBranch => ({ status, fields: [], extraKeys: [] });

const detectUnionBranch = (field: FieldDescriptor, value: unknown): UnionBranch => {
  const children = field.children ?? [];
  if (value === undefined || value === null) return noBranch('absent');
  if (!isPlainObject(value)) return noBranch('not-object');
  const present = presentKeys(value);
  if (!children.some((child) => present.has(keyOf(child)))) return noBranch('unmatched');
  const known = new Set(children.map(keyOf));
  return {
    status: 'resolved',
    fields: children.filter((child) => present.has(keyOf(child)) || !child.optional),
    extraKeys: [...present].filter((key) => !known.has(key)),
  };
};

export { detectUnionBranch };
