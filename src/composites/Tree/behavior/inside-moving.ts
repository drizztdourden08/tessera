/* @layer renderer-components @kind logic */
import type { TreeFlatRow } from '../Tree.type';

const insideMoving = <T,>(row: TreeFlatRow<T>, moving: ReadonlySet<string>): boolean =>
  moving.has(row.key) || row.ancestors.some((ancestor) => moving.has(ancestor));

export { insideMoving };
