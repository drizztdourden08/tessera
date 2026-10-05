/* @layer stories @kind component */
import { filterSettingsSections, SearchResults, SettingsSection } from '../../../src/composites';
import type { WorkspacePage } from '../../../src/composites';
import { matchesText } from '../../../src/data';
import { useSampleSettings } from './settings-sample-state';
import { workspaceSample } from './workspace-sample';

const rowCount = (page: WorkspacePage, query: string): number => filterSettingsSections(page.sections ?? [], query)
  .reduce((sum, section) => sum + (section.rows?.length ?? 0) + (section.groups ?? []).reduce((n, group) => n + group.rows.length, 0), 0);

const SettingsResultsDemo = (props: { query: string; onOpen?: (id: string) => void; idleMessage?: string }) => {
  const { query, onOpen, idleMessage } = props;
  const content = workspaceSample(useSampleSettings());
  const pages = content.groups.flatMap((group) => group.pages);
  const needle = query.trim();
  const matched = pages.filter((page) => needle !== '' && rowCount(page, needle) > 0);
  const total = matched.reduce((sum, page) => sum + rowCount(page, needle), 0);
  return (
    <SearchResults
      query={query}
      count={total}
      summary={total > 0 ? `${total} ${total === 1 ? 'setting matches' : 'settings match'} "${query.trim()}"` : undefined}
      jumps={pages.filter((page) => needle !== '' && matchesText(page.title, needle)).map((page) => ({ id: page.id, label: page.title, icon: page.icon }))}
      onJump={onOpen}
      groups={matched.map((page) => ({
        id: page.id,
        label: page.title,
        icon: page.icon,
        count: rowCount(page, needle),
        children: filterSettingsSections(page.sections ?? [], needle).map((section) => <SettingsSection key={section.id} {...section} onReset={undefined} />),
      }))}
      onOpenGroup={onOpen}
      idleMessage={idleMessage ?? 'Type to search every setting, on every page.'}
      emptyMessage="Try a shorter word, or the name of what the setting changes."
    />
  );
};

export { SettingsResultsDemo };
