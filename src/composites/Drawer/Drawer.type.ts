/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerSize = 'md' | 'lg' | 'xl';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  label?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export type { DrawerProps, DrawerSize };
