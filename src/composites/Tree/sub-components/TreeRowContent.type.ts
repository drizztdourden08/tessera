/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TreeFlatRow, TreeRowState } from '../Tree.type';

interface TreeRowContentProps<T> {
  row: TreeFlatRow<T>;
  state: TreeRowState;
  activeBranch: ReadonlySet<string> | null;
  onToggle: (() => void) | undefined;
  getLabel: (item: T) => string;
  renderLead?: (item: T, state: TreeRowState) => ReactNode;
  renderLabel?: (item: T, state: TreeRowState) => ReactNode;
  renderTrail?: (item: T, state: TreeRowState) => ReactNode;
}

export type { TreeRowContentProps };
