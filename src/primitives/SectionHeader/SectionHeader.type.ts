/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../Title/Title.type';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  count?: number;
  level?: HeadingLevel;
  className?: string;
}

export type { SectionHeaderProps };
