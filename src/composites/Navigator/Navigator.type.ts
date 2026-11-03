/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { Rect, Size } from '../rect-drag/rect-drag.type';

type NavigatorSurface = Size;

type NavigatorViewport = Rect;

type NavigatorOverlayKind = 'selection' | 'view' | 'region';

interface NavigatorOverlay {
  id: string;
  rect: NavigatorViewport;
  kind: NavigatorOverlayKind;
  label: string;
  interactive?: boolean;
}

interface NavigatorWheelPoint {
  x: number;
  y: number;
}

interface NavigatorProps {
  surface: NavigatorSurface;
  viewport: NavigatorViewport;
  onViewportChange: (viewport: NavigatorViewport) => void;
  children?: ReactNode;
  label?: string;
  step?: number;
  overlays?: readonly NavigatorOverlay[];
  onOverlayPress?: (id: string) => void;
  onWheelZoom?: (direction: 1 | -1, at: NavigatorWheelPoint) => void;
  onKey?: (event: KeyboardEvent<HTMLElement>) => boolean;
  empty?: ReactNode;
  caption?: ReactNode;
  describe?: string;
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

export type { KeyMove, NavigatorOverlay, NavigatorOverlayKind, NavigatorProps, NavigatorSurface, NavigatorViewport, NavigatorWheelPoint, PercentSpans };
