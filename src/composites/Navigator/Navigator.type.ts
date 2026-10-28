/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Rect, Size } from '../rect-drag/rect-drag.type';

type NavigatorSurface = Size;

type NavigatorViewport = Rect;

interface NavigatorProps {
  surface: NavigatorSurface;
  viewport: NavigatorViewport;
  onViewportChange: (viewport: NavigatorViewport) => void;
  children?: ReactNode;
  label?: string;
  step?: number;
  className?: string;
}

interface KeyMove {
  dx: number;
  dy: number;
}

interface PercentSpans {
  across: [number, number];
  down: [number, number];
}

export type { KeyMove, NavigatorProps, NavigatorSurface, NavigatorViewport, PercentSpans };
