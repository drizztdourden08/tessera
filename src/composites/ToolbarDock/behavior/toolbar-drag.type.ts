/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { Point, Rect } from '../../rect-drag/rect-drag.type';
import type { ToolbarDefinition, ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarFrame {
  rect: Rect;
  thickness: Record<ToolbarSide, number>;
  spans: Record<ToolbarSide, number[]>;
  starts?: Record<ToolbarSide, number[]>;
  laneThickness: Record<ToolbarSide, number[]>;
}

interface ToolbarSlotSpan {
  side: ToolbarSide;
  lane: number;
  count: number;
}

interface ToolbarZone {
  side: ToolbarSide;
  others: number;
  band: Rect;
  held: Rect;
}

interface ToolbarLaneTarget {
  kind: 'lane';
  side: ToolbarSide;
  lane: number | 'new';
  index: number;
  at: number;
  start: number;
  size: number;
  rect: Rect;
  next: ToolbarLayout;
}

type ToolbarDropTarget =
  | ToolbarLaneTarget
  | { kind: 'refused'; side: ToolbarSide; rect: Rect }
  | { kind: 'basket' }
  | { kind: 'none' };

interface ToolbarDragView {
  id: string;
  label: string;
  pointer: Point | null;
  target: ToolbarDropTarget;
  basket: Rect;
}

interface ToolbarPress {
  id: string;
  pointerId: number;
  start: Point;
  live: boolean;
  frame: ToolbarFrame | null;
  target: ToolbarDropTarget;
}

interface ToolbarDragLatest {
  layout: ToolbarLayout;
  definitions: readonly ToolbarDefinition[];
  onLayoutChange: (layout: ToolbarLayout) => void;
}

interface ToolbarDragParams extends ToolbarDragLatest {
  rootRef: RefObject<HTMLElement | null>;
}

interface ToolbarPressWiring {
  root: HTMLElement;
  press: RefObject<ToolbarPress | null>;
  latest: RefObject<ToolbarDragLatest>;
  drop: () => void;
  cancel: () => void;
  show: (view: ToolbarDragView) => void;
}

export type {
  ToolbarDragLatest, ToolbarDragParams, ToolbarDragView, ToolbarDropTarget, ToolbarFrame, ToolbarPress, ToolbarPressWiring, ToolbarSlotSpan, ToolbarZone,
};
