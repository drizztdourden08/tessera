/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { SideNavProps } from '../SideNav';

type SideNavLayoutPaneScroll = 'page' | 'always' | 'none';

interface SideNavLayoutProps {
  nav: SideNavProps;
  children: ReactNode;
  results?: ReactNode;
  paneScroll?: SideNavLayoutPaneScroll;
  narrow?: boolean;
  className?: string;
  ref?: Ref<HTMLElement>;
}

export type { SideNavLayoutPaneScroll, SideNavLayoutProps };
