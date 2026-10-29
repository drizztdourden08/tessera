/* @layer renderer-components @kind logic */
import { NO_SET } from '../Tree.constants';
import type { TreeFlatRow } from '../Tree.type';
import { firstSelectedAt } from './first-selected-at';

const activeBranchOf = <T,>(
  rows: readonly TreeFlatRow<T>[],
  indexOfKey: ReadonlyMap<string, number>,
  selected: ReadonlySet<string> | undefined,
): ReadonlySet<string> => {
  const at = firstSelectedAt(selected, indexOfKey);
  const row = at === undefined ? undefined : rows[at];
  if (!row) return NO_SET;
  return new Set(row.branch ? [...row.ancestors, row.key] : row.ancestors);
};

export { activeBranchOf };
