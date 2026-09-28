/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FullScreenLayerProps {
  children: ReactNode;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
}

export type {
  FullScreenLayerProps,
};
