/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SideNavProps } from '../SideNav';

interface SettingsShellProps {
  nav: SideNavProps;
  children: ReactNode;
  className?: string;
}

export type { SettingsShellProps };
