/* @layer renderer-components @kind types */
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { Rect, ResizeEdge } from '../../rect-drag/rect-drag.type';

interface LayerMove {
  placed: Rect | null;
  dragging: boolean;
  onBandDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onBandKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  onEdgeDown: (edge: ResizeEdge, event: ReactPointerEvent<HTMLElement>) => void;
}

export type { LayerMove };
