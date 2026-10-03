/* @layer renderer-components @kind types */
import type { SettingsSectionLook, SettingsSectionRow } from '../SettingsSection.type';

interface SettingsSectionRowsProps extends SettingsSectionLook {
  rows: readonly SettingsSectionRow[];
}

export type { SettingsSectionRowsProps };
