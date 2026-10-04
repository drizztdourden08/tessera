/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FloatingWidget, LayoutEdit, Rect, Size, WidgetId } from '../DockLayout.type';
import type { DragView } from '../behavior/drag.type';

interface DockFloatingProps {
  floating: FloatingWidget[];
  mainRect: Rect;
  drag: DragView | null;
  dragId: WidgetId | null;
  min: Size;
  resizable: boolean;
  onEdit: (edit: LayoutEdit) => void;
  renderFloating: (floating: FloatingWidget, rect: Rect) => ReactNode;
}

export type { DockFloatingProps };
