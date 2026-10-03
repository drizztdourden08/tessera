/* @layer renderer-components @kind types */
import type { SettingsGroupData, SettingsSectionLook } from '../SettingsSection.type';

interface SettingsSectionGroupProps extends SettingsSectionLook {
  group: SettingsGroupData;
}

export type { SettingsSectionGroupProps };
