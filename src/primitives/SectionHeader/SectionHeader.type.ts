/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export type { SectionHeaderProps };
