/* @layer renderer-components @kind types */
import type { TreeFlatRow } from '../Tree.type';
import type { TreeRowBind } from './row-binder-of.type';
import type { TreeDrag } from './useTreeDrag.type';
import type { TreeNav } from './useTreeNav.type';

interface TreeModel<T> {
  rows: readonly TreeFlatRow<T>[];
  nav: TreeNav;
  drag: TreeDrag;
  bindOf: (at: number) => TreeRowBind | undefined;
  activeBranch: ReadonlySet<string> | null;
}

export type { TreeModel };
