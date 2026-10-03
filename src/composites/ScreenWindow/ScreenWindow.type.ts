/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ScreenLayerSize } from '../ScreenLayer';

interface ScreenWindowProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  size?: ScreenLayerSize;
  className?: string;
}

export type { ScreenWindowProps };
