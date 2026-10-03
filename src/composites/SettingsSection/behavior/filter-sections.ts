/* @layer renderer-components @kind logic */
import type { SettingsGroupData, SettingsSectionData } from '../SettingsSection.type';
import { groupsOf } from './groups-of';
import { rowText } from './row-text';

const named = (needle: string, ...words: (string | undefined)[]): boolean =>
  words.some((word) => word?.toLowerCase().includes(needle) === true);

const filterGroup = (group: SettingsGroupData, needle: string): SettingsGroupData => (named(needle, group.title)
  ? group
  : { ...group, rows: group.rows.filter((row) => rowText(row).includes(needle)) });

const filterSettingsSections = (sections: readonly SettingsSectionData[], query: string): SettingsSectionData[] => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [...sections];
  return sections.flatMap((section) => {
    if (named(needle, section.title, section.keywords)) return [section];
    const groups = groupsOf(section).map((group) => filterGroup(group, needle)).filter((group) => group.rows.length > 0);
    return groups.length === 0 ? [] : [{ ...section, rows: undefined, groups }];
  });
};

export { filterSettingsSections };
