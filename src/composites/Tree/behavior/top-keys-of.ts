/* @layer renderer-components @kind logic */
import type { TreeFlatRow } from '../Tree.type';

const topKeysOf = <T,>(rows: readonly TreeFlatRow<T>[], keys: ReadonlySet<string>): string[] =>
  rows
    .filter((row) => keys.has(row.key) && !row.ancestors.some((ancestor) => keys.has(ancestor)))
    .map((row) => row.key);

export { topKeysOf };
