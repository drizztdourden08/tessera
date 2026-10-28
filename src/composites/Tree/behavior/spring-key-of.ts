/* @layer renderer-components @kind logic */
import type { TreeDropTarget, TreeFlatRow } from '../Tree.type';

const springKeyOf = <T,>(target: TreeDropTarget | undefined, rows: readonly TreeFlatRow<T>[]): string | null => {
  const row = target?.into ? rows[target.intoAt] : undefined;
  return row && !row.expanded ? row.key : null;
};

export { springKeyOf };
