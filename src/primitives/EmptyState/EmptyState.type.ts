/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: ReactNode;
  title?: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  size?: 'sm' | 'md' | 'hero';
  className?: string;
}

export type { EmptyStateProps };
