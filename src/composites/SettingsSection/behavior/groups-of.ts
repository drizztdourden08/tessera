/* @layer renderer-components @kind logic */
import type { SettingsGroupData, SettingsSectionData } from '../SettingsSection.type';

const groupsOf = (section: Pick<SettingsSectionData, 'rows' | 'groups'>): readonly SettingsGroupData[] => {
  if (section.groups !== undefined) return section.groups;
  return section.rows === undefined ? [] : [{ rows: section.rows }];
};

export { groupsOf };
