/* @layer renderer-components @kind logic */
import { selectionKey } from './selection-key';
import type { TreeRow } from '../GroupTree.type';

const activeBranchOf = <T,>(rows: readonly TreeRow<T>[], selectedKey: string | null): ReadonlySet<string> => {
  const row = rows.find((candidate) => selectionKey(candidate) === selectedKey);
  if (!row) return new Set();
  return new Set(row.kind === 'group' ? [...row.ancestors, row.key] : row.ancestors);
};

export { activeBranchOf };
