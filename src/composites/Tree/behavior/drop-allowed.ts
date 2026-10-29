/* @layer renderer-components @kind logic */
import type { TreeDropTarget } from '../Tree.type';
import type { DropTargetInput } from './drop-target-of.type';
import { parentFits } from './parent-fits';

const dropAllowed = <T,>(target: TreeDropTarget, input: DropTargetInput<T>): boolean => {
  const { rows, indexOfKey, moving, maxDepth, allow } = input;
  const parent = target.parentKey === null ? undefined : rows[indexOfKey.get(target.parentKey) ?? -1];
  if (target.parentKey !== null && !parent) return false;
  return parentFits(parent, moving, maxDepth) && (allow ? allow(target) : true);
};

export { dropAllowed };
