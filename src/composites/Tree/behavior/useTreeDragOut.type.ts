/* @layer renderer-components @kind types */
import type { DragEvent, DragEventHandler, PointerEventHandler, ReactNode } from 'react';
import type { NativeDragGhost } from '../../DragGhost';
import type { TreeFlatRow } from '../Tree.type';

interface TreeDragOutInput<T> {
  rows: readonly TreeFlatRow<T>[];
  selected: ReadonlySet<string>;
  onDragOut: ((keys: readonly string[], event: DragEvent<HTMLElement>) => void) | undefined;
  renderThumbnail: ((key: string) => ReactNode) | undefined;
  reorderOn: boolean;
}

interface TreeRowDragOut {
  draggable: true;
  onDragStart: DragEventHandler<HTMLElement>;
  onPointerDownCapture: PointerEventHandler<HTMLElement>;
}

interface DragOutRequest {
  keys: readonly string[];
  onDragOut: (keys: readonly string[], event: DragEvent<HTMLElement>) => void;
  ghost: NativeDragGhost;
  renderThumbnail: ((key: string) => ReactNode) | undefined;
  held: boolean;
}

interface TreeDragOut {
  dragOutOf: (at: number) => TreeRowDragOut | undefined;
}

export type { DragOutRequest, TreeDragOut, TreeDragOutInput, TreeRowDragOut };
