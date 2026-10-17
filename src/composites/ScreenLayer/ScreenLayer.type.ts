/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Rect, Size } from '../rect-drag/rect-drag.type';

type ScreenLayerSize = 'fill' | 'compact' | 'info';

interface ScreenLayerMove {
  rect: Rect | null;
  min?: Size;
  onChange: (rect: Rect) => void;
}

interface ScreenLayerProps {
  children: ReactNode;
  onClose?: () => void;
  floating?: ReactNode;
  corner?: ReactNode;
  move?: ScreenLayerMove;
  tight?: boolean;
  hidden?: boolean;
  size?: ScreenLayerSize;
  square?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
}

export type { ScreenLayerMove, ScreenLayerProps, ScreenLayerSize };
