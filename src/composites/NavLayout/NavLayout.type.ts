/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { SideNavProps } from '../SideNav';

type NavLayoutPaneScroll = 'page' | 'always' | 'none';

interface NavLayoutProps {
  nav: SideNavProps;
  children: ReactNode;
  results?: ReactNode;
  paneScroll?: NavLayoutPaneScroll;
  compact?: boolean;
  className?: string;
  ref?: Ref<HTMLElement>;
}

export type { NavLayoutPaneScroll, NavLayoutProps };
