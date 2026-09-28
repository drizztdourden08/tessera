/* @layer renderer-components @kind types */
import type { MouseEvent } from 'react';
import type { Edge } from '../behavior/useWidgetResize.type';
import type { SnapSide, WidgetMode } from '../Widget.type';

interface WidgetResizeHandlesProps {
  mode: WidgetMode;
  side: SnapSide;
  onEdgeMouseDown: (edge: Edge) => (e: MouseEvent) => void;
}

export type { WidgetResizeHandlesProps };
