/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TreeFlatRow, TreeRowState } from '../Tree.type';
import type { TreeRowBind } from '../behavior/row-binder-of.type';

interface TreeRowProps<T> {
  row: TreeFlatRow<T>;
  at: number;
  bind: TreeRowBind;
  activeBranch: ReadonlySet<string> | null;
  openOnPick: boolean;
  getLabel: (item: T) => string;
  renderLead?: (item: T, state: TreeRowState) => ReactNode;
  renderLabel?: (item: T, state: TreeRowState) => ReactNode;
  renderTrail?: (item: T, state: TreeRowState) => ReactNode;
}

export type { TreeRowProps };
