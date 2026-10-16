/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ScreenLayerSize = 'fill' | 'compact' | 'info';

interface ScreenLayerProps {
  children: ReactNode;
  onClose?: () => void;
  floating?: ReactNode;
  hidden?: boolean;
  size?: ScreenLayerSize;
  square?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
}

export type { ScreenLayerProps, ScreenLayerSize };
