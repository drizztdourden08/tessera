/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Rect, Size } from '../rect-drag/rect-drag.type';
import type { CornerEnd } from './behavior/corner.type';
import type { ResizeOrigin } from './behavior/resize-origin.type';

type WidgetId = string;

type DockEdge = 'left' | 'right' | 'top' | 'bottom';

type SplitAxis = 'row' | 'column';

interface PaneNode {
  kind: 'pane';
  key: string;
  widgets: WidgetId[];
  active: WidgetId;
  makeRoom: boolean;
}

interface MainNode {
  kind: 'main';
  key: 'main';
}

interface SplitNode {
  kind: 'split';
  axis: SplitAxis;
  children: LayoutNode[];
  sizes: number[];
}

type LayoutNode = PaneNode | MainNode | SplitNode;

type LeafNode = PaneNode | MainNode;

interface FloatingWidget {
  id: WidgetId;
  x: number;
  y: number;
  width: number;
  height: number;
}

type DropTarget =
  | { at: 'outer'; edge: DockEdge }
  | { at: 'leaf'; key: string; edge: DockEdge }
  | { at: 'tab'; key: string }
  | { at: 'float' };

type DockTarget = Exclude<DropTarget, { at: 'float' }>;

type MainTarget = Exclude<DropTarget, { at: 'float' } | { at: 'tab' }>;

type DockDropKind = 'tab' | 'split' | 'float';

type DockDropSlot = 'pane' | 'main' | 'stage';

interface DockDrop {
  kind: DockDropKind;
  slot: DockDropSlot;
  pane: PaneNode | null;
  edge: DockEdge | null;
}

interface DockTree {
  dock: LayoutNode;
  floating: FloatingWidget[];
}

type LayoutEdit =
  | { type: 'move-widget'; id: WidgetId; target: DockTarget; makeRoom: boolean }
  | { type: 'float-widget'; id: WidgetId; rect: Rect }
  | { type: 'move-main'; target: MainTarget }
  | { type: 'swap-panes'; keyA: string; keyB: string }
  | { type: 'resize'; node: SplitNode; index: number; delta: number; origin?: ResizeOrigin }
  | { type: 'even'; node: SplitNode; index: number }
  | { type: 'take-corner'; key: string; end: CornerEnd; along?: SplitAxis; give?: boolean }
  | { type: 'activate-tab'; key: string; id: WidgetId }
  | { type: 'pop-out'; id: WidgetId };

interface DragModifiers {
  swap: boolean;
  overlay: boolean;
}

interface ExternalDrag {
  id: WidgetId;
  point: { x: number; y: number };
  released: boolean;
}

type DockMainGrip = 'always' | 'dragging' | 'hidden';

interface ScreenPoint {
  screenX: number;
  screenY: number;
}

interface DockLayoutProps {
  layout: DockTree;
  renderPane: (pane: PaneNode, rect: Rect) => ReactNode;
  renderFloating: (floating: FloatingWidget, rect: Rect) => ReactNode;
  onEdit: (edit: LayoutEdit) => void;
  labelOf: (id: WidgetId) => string;
  main?: ReactNode;
  peek?: boolean;
  modifiers?: DragModifiers;
  onMainRect?: (rect: Rect | null) => void;
  onPopOut?: (id: WidgetId, point?: ScreenPoint) => void;
  canPopOut?: (id: WidgetId) => boolean;
  externalDrag?: ExternalDrag | null;
  onExternalDrop?: (id: WidgetId, edit: LayoutEdit | null) => void;
  sizeOf?: (id: WidgetId) => Size;
  mainLabel?: string;
  gripLabel?: string;
  mainGrip?: DockMainGrip;
  floatingMin?: Size;
  canDrop?: (id: WidgetId, drop: DockDrop) => boolean;
  floatSnap?: number;
  className?: string;
}

export type {
  DockDrop, DockDropKind, DockDropSlot, DockEdge, DockLayoutProps, DockMainGrip, DockTarget, DockTree, DragModifiers, DropTarget,
  ExternalDrag, FloatingWidget, LayoutEdit, LayoutNode, LeafNode, MainNode, MainTarget, PaneNode, Rect, ScreenPoint, Size, SplitAxis,
  SplitNode, WidgetId,
};
