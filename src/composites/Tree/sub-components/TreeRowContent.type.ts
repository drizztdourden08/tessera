/* @layer renderer-components @kind types */
import type { TreeFlatRow, TreeRowState, TreeSlots } from '../Tree.type';

interface TreeRowContentProps<T> extends TreeSlots<T> {
  row: TreeFlatRow<T>;
  state: TreeRowState;
  activeBranch: ReadonlySet<string> | null;
  onToggle: (() => void) | undefined;
  getLabel: (item: T) => string;
}

export type { TreeRowContentProps };
