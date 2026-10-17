/* @layer renderer-components @kind types */
import type { ResizeSides } from '../../rect-drag/rect-drag.type';
import type { LayoutEdit, Rect, Size, WidgetId } from '../DockLayout.type';
import type { FloatSnap, SnapGuide } from './snap.type';

interface SnapResize {
  sides: ResizeSides;
  bounds: Rect;
  min: Size;
}

interface FloatResizeParams {
  id: WidgetId;
  rect: Rect;
  bounds: Rect;
  min: Size;
  snap: FloatSnap | null;
  onEdit: (edit: LayoutEdit) => void;
}

interface LiveResize {
  rect: Rect;
  guides: SnapGuide[];
}

export type { FloatResizeParams, LiveResize, SnapResize };
