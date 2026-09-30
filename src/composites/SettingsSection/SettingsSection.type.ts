/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SettingsSectionRow {
  key: string;
  content: ReactNode;
  lock?: string | null;
}

interface SettingsSectionLock {
  cause: string;
  children: ReactNode;
}

type SettingsSectionLockRenderer = (lock: SettingsSectionLock) => ReactNode;

interface SettingsSectionRun {
  lock: string | null;
  rows: SettingsSectionRow[];
}

interface SettingsSectionProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  rows?: readonly SettingsSectionRow[];
  renderLock?: SettingsSectionLockRenderer;
  flashKey?: string;
  anchor?: string;
  inset?: boolean;
  className?: string;
}

export type {
  SettingsSectionLock,
  SettingsSectionLockRenderer,
  SettingsSectionProps,
  SettingsSectionRow,
  SettingsSectionRun,
};
