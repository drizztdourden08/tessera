/* @layer renderer-components @kind types */
import type { KeyboardEvent, PointerEvent, ReactNode, RefObject } from 'react';
import type { ReorderDrag, ReorderPoint } from '../../reorder';
import type { TreeDropMark, TreeDropTarget, TreeFlatRow, TreeMoveRequest, TreeReorder } from '../Tree.type';

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

interface DragSession {
  down: ReorderPoint | null;
  moved: boolean;
}

type ReorderHandlers = ReturnType<ReorderDrag['handlers']>;

interface TreeCommitInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  reorder: TreeReorder | undefined;
  getLabel: (item: T) => string;
  childCount: (parentKey: string | null) => number;
  setExpanded: (key: string, expanded: boolean) => void;
  jump: (index: number) => void;
}

interface TreeCommit {
  commit: (request: TreeMoveRequest) => void;
  message: string;
}

interface LocatorInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  bodyRef: RefObject<HTMLElement | null>;
  rowHeight: number;
  reorder: TreeReorder | undefined;
  requestFor: (target: TreeDropTarget, keys: readonly string[]) => TreeMoveRequest;
  moving: { current: readonly string[] };
  fromRow: { current: number };
  target: { current: TreeDropTarget | undefined };
}

interface KeyMoverInput<T> {
  reorder: TreeReorder | undefined;
  enabled: boolean;
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  selected: ReadonlySet<string>;
  childCount: (parentKey: string | null) => number;
  commit: (request: TreeMoveRequest) => void;
}

export type {
  DragSession, KeyMoverInput, LocatorInput, ReorderHandlers, TreeCommit, TreeCommitInput, TreeDrag, TreeDragGhost, TreeDragInput, TreeRowPointer,
};
