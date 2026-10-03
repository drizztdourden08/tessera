/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DrawerSide = 'left' | 'right' | 'top';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  label?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export type { DrawerProps };
