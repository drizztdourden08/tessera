/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ButtonContentProps {
  icon: ReactNode;
  iconEnd: ReactNode;
  loading: boolean;
  caption: ReactNode;
  children: ReactNode;
}

export type { ButtonContentProps };
