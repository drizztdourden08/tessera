/* @layer renderer-components @kind logic */
import type { TreeFlatRow } from '../Tree.type';
import { insideMoving } from './inside-moving';

const parentFits = <T,>(parent: TreeFlatRow<T> | undefined, moving: ReadonlySet<string>, maxDepth: number | undefined): boolean => {
  if (parent && insideMoving(parent, moving)) return false;
  return maxDepth === undefined || (parent?.depth ?? 0) + 1 <= maxDepth;
};

export { parentFits };
