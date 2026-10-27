/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../Title/Title.type';

type SectionHeaderSize = 'md' | 'lg';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  count?: number;
  badge?: ReactNode;
  hideZero?: boolean;
  level?: HeadingLevel;
  size?: SectionHeaderSize;
  wrap?: boolean;
  className?: string;
}

export type { SectionHeaderProps, SectionHeaderSize };
