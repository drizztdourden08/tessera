/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { ReorderModifier } from '../reorder';
import type { ScrollAlign } from '../virtual';

type TreeRowSize = 'compact' | 'normal';

type TreeSelectionMode = 'single' | 'multiple';

type TreeDropMark = 'before' | 'after' | 'into';

interface TreeRowState {
  depth: number;
  expanded: boolean;
  selected: boolean;
  branch: boolean;
  loading: boolean;
  dropInto: boolean;
}

interface TreeSelection {
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
  mode?: TreeSelectionMode;
}

interface TreeMoveRequest {
  keys: readonly string[];
  parentKey: string | null;
  index: number;
  into: boolean;
  modifier: ReorderModifier;
}

interface TreeReorder {
  onMove: (move: TreeMoveRequest) => void;
  canDrop?: (move: TreeMoveRequest) => boolean;
  maxDepth?: number;
  springDelay?: number;
  renderThumbnail?: (key: string) => ReactNode;
}

interface TreeHandle {
  scrollToKey: (key: string, align?: ScrollAlign) => void;
}

interface TreeSlots<T> {
  renderLead?: (item: T, state: TreeRowState) => ReactNode;
  renderLabel?: (item: T, state: TreeRowState) => ReactNode;
  renderTrail?: (item: T, state: TreeRowState) => ReactNode;
}

interface TreeProps<T> extends TreeSlots<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  getLabel: (item: T) => string;
  label: string;
  isBranch?: (item: T) => boolean;
  expandedKeys?: readonly string[];
  defaultExpandedKeys?: readonly string[];
  onExpandedChange?: (keys: readonly string[]) => void;
  selection?: TreeSelection;
  onActivate?: (item: T) => void;
  openOnPick?: boolean;
  onLoadChildren?: (item: T) => void;
  loadingKeys?: ReadonlySet<string>;
  filter?: (item: T) => boolean;
  reorder?: TreeReorder;
  guides?: boolean;
  rowSize?: TreeRowSize;
  overscan?: number;
  emptyLabel?: string;
  ref?: Ref<TreeHandle>;
  className?: string;
}

interface TreeFlatRow<T> {
  key: string;
  item: T;
  depth: number;
  parentKey: string | null;
  position: number;
  setSize: number;
  branch: boolean;
  loaded: boolean;
  expanded: boolean;
  loading: boolean;
  ancestors: readonly string[];
}

type TreeKeyMove =
  | { kind: 'focus'; index: number }
  | { kind: 'expand'; key: string }
  | { kind: 'collapse'; key: string }
  | { kind: 'siblings'; key: string | null }
  | { kind: 'select'; index: number }
  | { kind: 'none' };

interface TreeDropTarget {
  gap: number;
  parentKey: string | null;
  index: number;
  into: boolean;
  intoAt: number;
}

export type {
  TreeDropMark, TreeDropTarget, TreeFlatRow, TreeHandle, TreeKeyMove, TreeMoveRequest, TreeProps, TreeReorder, TreeRowSize, TreeRowState,
  TreeSelection, TreeSelectionMode, TreeSlots,
};
