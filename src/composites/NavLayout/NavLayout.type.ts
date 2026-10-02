/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { SectionNavProps } from '../SectionNav';

type NavLayoutPaneScroll = 'page' | 'always' | 'none';

interface NavLayoutProps {
  nav: SectionNavProps;
  children: ReactNode;
  results?: ReactNode;
  paneScroll?: NavLayoutPaneScroll;
  compact?: boolean;
  className?: string;
  ref?: Ref<HTMLElement>;
}

export type { NavLayoutPaneScroll, NavLayoutProps };
