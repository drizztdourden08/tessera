/* @layer renderer-components @kind types */
import type { PointerEvent, RefObject } from 'react';

type ReorderAxis = 'vertical' | 'horizontal';

type ReorderChord = 'plain' | 'alt';

type ReorderDrop = 'before' | 'after';

interface ReorderDragState {
  from: number;
  before: number;
}

interface ReorderHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

interface ReorderDrag {
  dragging: number | null;
  handlers: (index: number) => ReorderHandlers;
  cancel: () => void;
  dropMark: (index: number, total: number) => ReorderDrop | undefined;
}

interface ReorderDragOptions {
  listRef: RefObject<HTMLElement | null>;
  selector: string;
  axis?: ReorderAxis;
  onDrop: (from: number, to: number) => void;
}

interface ReorderKeyEvent {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface ReorderStepOptions {
  axis: ReorderAxis;
  chord: ReorderChord;
  index: number;
  total: number;
}

export type {
  ReorderAxis, ReorderDrag, ReorderDragOptions, ReorderDragState, ReorderDrop, ReorderKeyEvent, ReorderStepOptions,
};
