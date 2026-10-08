/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ScreenLayerSize = 'fill' | 'compact';

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
