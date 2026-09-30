/* @layer renderer-components @kind types */
import type { SettingsSectionLockRenderer, SettingsSectionRow } from '../SettingsSection.type';

interface SettingsSectionRowsProps {
  rows: readonly SettingsSectionRow[];
  renderLock?: SettingsSectionLockRenderer;
  flashKey?: string;
}

export type { SettingsSectionRowsProps };
