/* @layer renderer-components @kind logic */
import { NO_KEYS } from '../Tree.constants';
import type { TreeFlatRow } from '../Tree.type';
import { topKeysOf } from './top-keys-of';

const dragKeysOf = <T,>(rows: readonly TreeFlatRow<T>[], selected: ReadonlySet<string>, from: number): readonly string[] => {
  const row = rows[from];
  if (!row) return NO_KEYS;
  return selected.has(row.key) ? topKeysOf(rows, selected) : [row.key];
};

export { dragKeysOf };
