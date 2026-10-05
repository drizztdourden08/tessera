/* @layer renderer-components @kind logic */
import { matchesText } from '../../../data/text/matches-text';
import { countRows } from '../../SettingsSection/behavior/count-rows';
import { filterSettingsSections } from '../../SettingsSection/behavior/filter-sections';
import { NO_SECTIONS } from '../WorkspaceScreen.constants';
import type { WorkspaceMatches, WorkspacePage } from '../WorkspaceScreen.type';

const pageNamed = (page: WorkspacePage, query: string): boolean =>
  matchesText([page.title, page.description ?? '', page.keywords ?? ''].join(' '), query);

const searchWorkspace = (pages: readonly WorkspacePage[], query: string): WorkspaceMatches => {
  if (query.trim() === '') return { byName: [], withRows: [], total: 0 };
  const withRows = pages.flatMap((page) => {
    const sections = filterSettingsSections(page.sections ?? NO_SECTIONS, query);
    const count = countRows(sections);
    return count > 0 ? [{ page, sections, count }] : [];
  });
  const byName = pages.filter((page) => pageNamed(page, query));
  return { byName, withRows, total: withRows.reduce((sum, match) => sum + match.count, 0) };
};

export { searchWorkspace };
