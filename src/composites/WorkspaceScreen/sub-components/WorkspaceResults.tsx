/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SearchResults } from '../../SearchResults';
import { SettingsSection } from '../../SettingsSection';
import { firstRowId } from '../behavior/first-row-id';
import { searchWorkspace } from '../behavior/search-workspace';
import type { WorkspaceResultsProps } from './WorkspaceResults.type';

const WorkspaceResults = (props: WorkspaceResultsProps) => {
  const { pages, query, search, onOpen, compactRows, readOnly, renderLock } = props;
  const { settings } = useTesseraStrings();
  const matches = useMemo(() => searchWorkspace(pages, query), [pages, query]);
  const needle = query.trim();
  const groups = matches.withRows.map(({ page, sections, count }) => ({
    id: page.id,
    label: page.title,
    icon: page.icon,
    count,
    children: sections.map((section) => (
      <SettingsSection key={section.id} {...section} onReset={undefined} compact={compactRows} readOnly={readOnly} renderLock={renderLock} />
    )),
  }));
  const openGroup = (id: string) => onOpen(id, firstRowId(matches.withRows.find((match) => match.page.id === id)?.sections ?? []));

  return (
    <SearchResults
      query={query}
      count={matches.total}
      summary={matches.total > 0 ? settings.settingsMatch(matches.total, needle) : settings.noSettingMatches(needle)}
      jumps={matches.byName.map((page) => ({ id: page.id, label: page.title, icon: page.icon }))}
      onJump={(id) => onOpen(id)}
      groups={groups}
      onOpenGroup={openGroup}
      idleMessage={search.idleMessage ?? settings.searchIdle}
      emptyMessage={search.emptyMessage ?? settings.searchTip}
    />
  );
};

export { WorkspaceResults };
