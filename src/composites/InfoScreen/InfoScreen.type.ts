/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type InfoScreenWidth = 'readable' | 'wide';

interface InfoScreenProps {
  title: ReactNode;
  icon: ReactNode;
  heading: ReactNode;
  onClose: () => void;
  children: ReactNode;
  lead?: ReactNode;
  footer?: ReactNode;
  width?: InfoScreenWidth;
  backdrop?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  className?: string;
}

export type { InfoScreenProps, InfoScreenWidth };
