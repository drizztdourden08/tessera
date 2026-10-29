/* @layer renderer-components @kind types */
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import type { TreeDropMark, TreeFlatRow, TreeRowState } from '../Tree.type';
import type { TreeDrag, TreeRowPointer } from './useTreeDrag.type';
import type { TreeRowDragOut } from './useTreeDragOut.type';
import type { TreeExpansion } from './useTreeExpansion.type';
import type { TreeNav } from './useTreeNav.type';

interface TreeRowBindInput<T> {
  rows: readonly TreeFlatRow<T>[];
  nav: TreeNav;
  drag: TreeDrag;
  expansion: TreeExpansion;
  selected: ReadonlySet<string> | undefined;
  openOnPick: boolean;
  onActivate?: (item: T) => void;
  dragOutOf: (at: number) => TreeRowDragOut | undefined;
}

interface TreeRowBind {
  tabIndex: 0 | -1;
  selected: boolean | undefined;
  mark: TreeDropMark | undefined;
  dragging: boolean;
  state: TreeRowState;
  pointer: TreeRowPointer | undefined;
  dragOut: TreeRowDragOut | undefined;
  onFocus: FocusEventHandler<HTMLElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  onClick: MouseEventHandler<HTMLElement>;
  onDoubleClick: MouseEventHandler<HTMLElement> | undefined;
  onToggle: () => void;
}

export type { TreeRowBind, TreeRowBindInput };
