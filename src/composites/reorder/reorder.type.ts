/* @layer renderer-components @kind types */
import type { PointerEvent, RefObject } from 'react';

type ReorderAxis = 'vertical' | 'horizontal' | 'grid';

type ReorderLinearAxis = Exclude<ReorderAxis, 'grid'>;

type ReorderChord = 'plain' | 'alt';

type ReorderDrop = 'before' | 'after';

type ReorderModifier = 'none' | 'alt' | 'ctrl' | 'shift';

interface ReorderPoint {
  x: number;
  y: number;
}

interface ReorderDragState {
  from: number;
  before: number;
  keys: readonly string[];
  point: ReorderPoint;
  modifier: ReorderModifier;
}

interface ReorderDropInfo {
  keys: readonly string[];
  before: number;
  modifier: ReorderModifier;
}

interface ReorderHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event?: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

interface ReorderDrag {
  dragging: number | null;
  dragKeys: readonly string[];
  point: ReorderPoint | null;
  handlers: (index: number) => ReorderHandlers;
  cancel: () => void;
  dropMark: (index: number, total: number) => ReorderDrop | undefined;
}

interface ReorderDragOptions {
  listRef: RefObject<HTMLElement | null>;
  selector: string;
  axis?: ReorderAxis;
  locate?: (point: { clientX: number; clientY: number }) => number;
  keys?: (from: number) => readonly string[];
  scrollRef?: RefObject<HTMLElement | null>;
  onDrop: (from: number, to: number, drop: ReorderDropInfo) => void;
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
  columns?: number;
}

export type {
  ReorderAxis, ReorderDrag, ReorderDragOptions, ReorderDragState, ReorderDrop, ReorderDropInfo, ReorderKeyEvent, ReorderLinearAxis,
  ReorderModifier, ReorderPoint, ReorderStepOptions,
};
