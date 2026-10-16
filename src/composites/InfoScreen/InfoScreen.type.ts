/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface InfoScreenProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  lead?: ReactNode;
  footer?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  className?: string;
}

export type { InfoScreenProps };
