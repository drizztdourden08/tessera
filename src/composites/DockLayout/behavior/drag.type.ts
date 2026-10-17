/* @layer renderer-components @kind types */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { Point } from '../../rect-drag/rect-drag.type';
import type {
  DockDrop, DockTree, DragModifiers, DropTarget, FloatingWidget, LayoutEdit, Rect, Size, WidgetId,
} from '../DockLayout.type';
import type { LaidOut } from './layout-tree.type';
import type { SnapGuide } from './snap.type';

interface DragSource {
  id: WidgetId | null;
  isMain: boolean;
  fromKey: string | null;
  fromTab: boolean;
  floating: FloatingWidget | null;
  loneWidget: boolean;
  start: Point;
  grab: Point;
  size: Size;
}

interface DragSubject {
  fromKey: string | null;
  isMain: boolean;
  loneWidget: boolean;
}

interface DropZone {
  target: DropTarget;
  hit: Rect;
  preview: Rect | null;
  kind: 'outer' | 'compass' | 'float';
}

interface DragView {
  pointer: Point;
  label: string;
  zones: DropZone[];
  hot: DropZone | null;
  preview: Rect | null;
  refused: boolean;
  swapKey: string | null;
  outside: boolean;
  stays: boolean;
  canPopOut: boolean;
  swap: boolean;
  overlay: boolean;
  floatingRect: Rect | null;
  guides: SnapGuide[];
}

interface DragContext {
  laid: LaidOut | null;
  layout: DockTree;
  mainRect: Rect | null;
  stage: Rect;
  modifiers: DragModifiers;
  labelOf: (id: WidgetId) => string;
  mainLabel: string;
  strings: TesseraStrings['widgets'];
  canPopOut?: (id: WidgetId) => boolean;
  canDrop?: (id: WidgetId, drop: DockDrop) => boolean;
  floatSnap: number;
}

type DropCheck = Pick<DragContext, 'canDrop' | 'laid'>;

interface PointerPlace {
  pointer: Point;
  client: Point;
  onScreen: Point;
  view: Window;
}

interface HeldKeys {
  shift: boolean;
  ctrl: boolean;
}

interface DropResult {
  edit?: LayoutEdit;
  popOut?: WidgetId;
}

interface ExternalPointer {
  id: WidgetId;
  pointer: Point;
}

export type {
  DragContext, DragSource, DropCheck, DragSubject, DragView, DropResult, DropZone, ExternalPointer, HeldKeys, Point, PointerPlace,
};
