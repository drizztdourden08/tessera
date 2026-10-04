/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsLockRenderer, SettingsSectionData } from '../SettingsSection';
import type { SettingsPageTabs } from '../SettingsPage';

interface WorkspacePage {
  id: string;
  title: string;
  icon: ReactNode;
  description?: string;
  keywords?: string;
  sections?: readonly SettingsSectionData[];
  content?: ReactNode;
  tabs?: SettingsPageTabs;
  actions?: ReactNode;
  backdrop?: ReactNode;
  scroll?: boolean;
}

interface WorkspaceGroup {
  id: string;
  label?: string;
  pages: readonly WorkspacePage[];
}

interface WorkspaceContent {
  home?: WorkspacePage;
  groups: readonly WorkspaceGroup[];
}

interface WorkspaceSearch {
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  idleMessage?: ReactNode;
  emptyMessage?: ReactNode;
}

interface WorkspaceRowLook {
  compactRows?: boolean;
  readOnly?: boolean;
  renderLock?: SettingsLockRenderer;
}

interface WorkspaceScreenProps extends WorkspaceRowLook {
  title: ReactNode;
  onClose: () => void;
  content: WorkspaceContent;
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  backdrop?: ReactNode;
  search?: WorkspaceSearch | false;
  narrow?: boolean;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  className?: string;
}

interface WorkspaceMatch {
  page: WorkspacePage;
  sections: SettingsSectionData[];
  count: number;
}

interface WorkspaceMatches {
  byName: WorkspacePage[];
  withRows: WorkspaceMatch[];
  total: number;
}

export type {
  WorkspaceContent, WorkspaceGroup, WorkspaceMatches, WorkspacePage, WorkspaceRowLook, WorkspaceScreenProps, WorkspaceSearch,
};
