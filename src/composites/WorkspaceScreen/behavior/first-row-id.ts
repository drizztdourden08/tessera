/* @layer renderer-components @kind logic */
import { groupsOf } from '../../SettingsSection/behavior/groups-of';
import type { SettingsSectionData } from '../../SettingsSection';

const firstRowId = (sections: readonly SettingsSectionData[]): string | undefined =>
  sections.flatMap((section) => groupsOf(section)).flatMap((group) => group.rows)[0]?.id;

export { firstRowId };
