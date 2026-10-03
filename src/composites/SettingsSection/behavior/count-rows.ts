/* @layer renderer-components @kind logic */
import type { SettingsSectionData } from '../SettingsSection.type';
import { groupsOf } from './groups-of';

const countRows = (sections: readonly SettingsSectionData[]): number =>
  sections.reduce((sum, section) => sum + groupsOf(section).reduce((rows, group) => rows + group.rows.length, 0), 0);

export { countRows };
