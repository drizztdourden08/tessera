/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FloatingWidget, LayoutEdit, Rect, Size } from '../DockLayout.type';

interface FloatingFrameProps {
  entry: FloatingWidget;
  rect: Rect;
  bounds: Rect;
  min: Size;
  resizable: boolean;
  onEdit: (edit: LayoutEdit) => void;
  renderFloating: (floating: FloatingWidget, rect: Rect) => ReactNode;
}

export type { FloatingFrameProps };
