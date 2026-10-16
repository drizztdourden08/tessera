/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FloatingWidget, LayoutEdit, Rect, Size } from '../DockLayout.type';
import type { FloatSnap } from '../behavior/snap.type';

interface FloatingFrameProps {
  entry: FloatingWidget;
  rect: Rect;
  bounds: Rect;
  min: Size;
  resizable: boolean;
  snap: FloatSnap | null;
  onEdit: (edit: LayoutEdit) => void;
  renderFloating: (floating: FloatingWidget, rect: Rect) => ReactNode;
}

export type { FloatingFrameProps };
