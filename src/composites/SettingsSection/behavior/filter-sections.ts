/* @layer renderer-components @kind logic */
import { matchesText } from '../../../data/text/matches-text';
import type { SettingsGroupData, SettingsSectionData } from '../SettingsSection.type';
import { groupsOf } from './groups-of';
import { rowText } from './row-text';

const named = (query: string, ...words: (string | undefined)[]): boolean =>
  matchesText(words.filter((word) => word !== undefined).join(' '), query);

const filterGroup = (group: SettingsGroupData, query: string): SettingsGroupData => (named(query, group.title)
  ? group
  : { ...group, rows: group.rows.filter((row) => matchesText(rowText(row), query)) });

const filterSettingsSections = (sections: readonly SettingsSectionData[], query: string): SettingsSectionData[] => {
  if (query.trim() === '') return [...sections];
  return sections.flatMap((section) => {
    if (named(query, section.title, section.keywords)) return [section];
    const groups = groupsOf(section).map((group) => filterGroup(group, query)).filter((group) => group.rows.length > 0);
    return groups.length === 0 ? [] : [{ ...section, rows: undefined, groups }];
  });
};

export { filterSettingsSections };
