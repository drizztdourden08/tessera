/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { SectionNavProps } from '../SectionNav';

interface NavLayoutProps {
  nav: SectionNavProps;
  children: ReactNode;
  results?: ReactNode;
  compact?: boolean;
  className?: string;
  ref?: Ref<HTMLElement>;
}

export type { NavLayoutProps };
