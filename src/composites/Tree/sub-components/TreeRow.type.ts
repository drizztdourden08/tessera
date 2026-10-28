/* @layer renderer-components @kind types */
import type { TreeFlatRow, TreeSlots } from '../Tree.type';
import type { TreeRowBind } from '../behavior/row-binder-of.type';

interface TreeRowProps<T> extends TreeSlots<T> {
  row: TreeFlatRow<T>;
  at: number;
  bind: TreeRowBind;
  activeBranch: ReadonlySet<string> | null;
  openOnPick: boolean;
  getLabel: (item: T) => string;
}

export type { TreeRowProps };
