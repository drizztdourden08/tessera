/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

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

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Size {
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

interface DockTree {
  dock: LayoutNode;
  floating: FloatingWidget[];
}

type LayoutEdit =
  | { type: 'move-widget'; id: WidgetId; target: DockTarget; makeRoom: boolean }
  | { type: 'float-widget'; id: WidgetId; rect: Rect }
  | { type: 'move-main'; target: MainTarget }
  | { type: 'swap-panes'; keyA: string; keyB: string }
  | { type: 'resize'; node: SplitNode; index: number; delta: number }
  | { type: 'even'; node: SplitNode; index: number }
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
  onPopOut?: (id: WidgetId) => void;
  canPopOut?: (id: WidgetId) => boolean;
  externalDrag?: ExternalDrag | null;
  onExternalDrop?: (id: WidgetId, edit: LayoutEdit | null) => void;
  sizeOf?: (id: WidgetId) => Size;
  mainLabel?: string;
  gripLabel?: string;
  className?: string;
}

export type {
  DockEdge, DockLayoutProps, DockTarget, DockTree, DragModifiers, DropTarget, ExternalDrag, FloatingWidget, LayoutEdit,
  LayoutNode, LeafNode, MainNode, MainTarget, PaneNode, Rect, Size, SplitAxis, SplitNode, WidgetId,
};
