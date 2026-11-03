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

interface NavigatorAxisStep {
  x: number;
  y: number;
}

type NavigatorStep = number | NavigatorAxisStep;

interface NavigatorProps {
  surface: NavigatorSurface;
  viewport: NavigatorViewport;
  onViewportChange: (viewport: NavigatorViewport) => void;
  children?: ReactNode;
  label?: string;
  step?: NavigatorStep;
  bigStep?: NavigatorStep;
  unclamped?: boolean;
  overlays?: readonly NavigatorOverlay[];
  onOverlayPress?: (id: string) => void;
  onWheelZoom?: (direction: 1 | -1, at: NavigatorWheelPoint, deltaY: number) => void;
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

interface NavigatorSteps {
  unit: NavigatorAxisStep;
  bigUnit: NavigatorAxisStep;
}

interface PercentSpans {
  across: [number, number];
  down: [number, number];
}

export type { KeyMove, NavigatorAxisStep, NavigatorOverlay, NavigatorOverlayKind, NavigatorProps, NavigatorStep, NavigatorSteps, NavigatorSurface, NavigatorViewport, NavigatorWheelPoint, PercentSpans };
