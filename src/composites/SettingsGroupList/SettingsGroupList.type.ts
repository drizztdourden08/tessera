/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsSectionLockRenderer, SettingsSectionRow } from '../SettingsSection';

interface SettingsGroupListGroup {
  id?: string;
  title?: string;
  description?: string;
  rows: readonly SettingsSectionRow[];
}

interface SettingsGroupListSection {
  id: string;
  title: string;
  groups: readonly SettingsGroupListGroup[];
  changedCount?: number;
  onReset?: () => void;
}

interface SettingsGroupListProps {
  sections: readonly SettingsGroupListSection[];
  flash?: string;
  renderLock?: SettingsSectionLockRenderer;
  emptyMessage?: ReactNode;
  className?: string;
}

export type { SettingsGroupListGroup, SettingsGroupListProps, SettingsGroupListSection };
