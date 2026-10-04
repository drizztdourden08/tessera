/* @layer renderer-components @kind logic */
import type { SettingsSectionData } from '../SettingsSection.type';
import { groupsOf } from './groups-of';
import { isSettingsItem } from './is-settings-item';

const countChanged = (section: Pick<SettingsSectionData, 'rows' | 'groups'>): number =>
  groupsOf(section).reduce((sum, group) => sum + group.rows.filter((row) => isSettingsItem(row) && row.changed === true).length, 0);

export { countChanged };
