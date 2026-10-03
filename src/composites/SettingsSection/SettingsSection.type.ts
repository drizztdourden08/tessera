/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsItem } from '../SettingsRow';

interface SettingsContentRow {
  id: string;
  content: ReactNode;
  title?: string;
  keywords?: string;
  lock?: string | null;
}

type SettingsSectionRow = SettingsItem | SettingsContentRow;

interface SettingsGroupData {
  id?: string;
  title?: string;
  description?: string;
  rows: readonly SettingsSectionRow[];
}

interface SettingsSectionData {
  id: string;
  title?: string;
  description?: string;
  keywords?: string;
  rows?: readonly SettingsSectionRow[];
  groups?: readonly SettingsGroupData[];
  changedCount?: number;
  onReset?: () => void;
}

interface SettingsLock {
  cause: string;
  children: ReactNode;
}

type SettingsLockRenderer = (lock: SettingsLock) => ReactNode;

interface SettingsSectionLook {
  flash?: string;
  renderLock?: SettingsLockRenderer;
  compact?: boolean;
  readOnly?: boolean;
}

interface SettingsSectionProps extends Omit<SettingsSectionData, 'id'>, SettingsSectionLook {
  id?: string;
  children?: ReactNode;
  className?: string;
}

interface SettingsRun {
  lock: string | null;
  rows: SettingsSectionRow[];
}

export type {
  SettingsContentRow, SettingsGroupData, SettingsLock, SettingsLockRenderer, SettingsRun, SettingsSectionData, SettingsSectionLook,
  SettingsSectionProps, SettingsSectionRow,
};
