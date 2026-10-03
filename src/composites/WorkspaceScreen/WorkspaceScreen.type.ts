/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsPageProps } from '../SettingsPage';
import type { SideNavProps } from '../SideNav';

type WorkspaceScreenPage = Omit<SettingsPageProps, 'children' | 'className'>;

interface WorkspaceScreenProps {
  title: ReactNode;
  onClose: () => void;
  nav: SideNavProps;
  page: WorkspaceScreenPage;
  children: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  results?: ReactNode;
  filterable?: boolean;
  filterPlaceholder?: string;
  compact?: boolean;
  className?: string;
}

export type { WorkspaceScreenPage, WorkspaceScreenProps };
