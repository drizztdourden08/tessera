/* @layer renderer-components @kind types */
import type { KeyboardEvent, PointerEvent, ReactNode, RefObject } from 'react';
import type { ReorderPoint } from '../../reorder';
import type { TreeDropMark, TreeFlatRow, TreeReorder } from '../Tree.type';

interface TreeDragInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  selected: ReadonlySet<string>;
  reorder: TreeReorder | undefined;
  filtering: boolean;
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  rowHeight: number;
  getLabel: (item: T) => string;
  childCount: (parentKey: string | null) => number;
  setExpanded: (key: string, expanded: boolean) => void;
  jump: (index: number) => void;
}

interface TreeDragGhost {
  count: number;
  thumbnails: readonly ReactNode[];
  point: ReorderPoint | null;
}

interface TreeRowPointer {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

interface TreeDrag {
  enabled: boolean;
  message: string;
  ghost: TreeDragGhost | null;
  dragging: ReadonlySet<string>;
  markOf: (at: number) => TreeDropMark | undefined;
  pointerOf: (at: number) => TreeRowPointer | undefined;
  keyMove: (event: KeyboardEvent<HTMLElement>, at: number) => boolean;
  swallowClick: () => boolean;
}

export type { TreeDrag, TreeDragGhost, TreeDragInput, TreeRowPointer };
