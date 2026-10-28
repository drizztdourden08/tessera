/* @layer renderer-components @kind logic */
import type { TreeDropMark, TreeDropTarget } from '../Tree.type';

const dropMarkFor = (target: TreeDropTarget | undefined, total: number, at: number): TreeDropMark | undefined => {
  if (!target) return undefined;
  if (target.into) return target.intoAt === at ? 'into' : undefined;
  if (target.gap === at) return 'before';
  return target.gap === total && at === total - 1 ? 'after' : undefined;
};

export { dropMarkFor };
