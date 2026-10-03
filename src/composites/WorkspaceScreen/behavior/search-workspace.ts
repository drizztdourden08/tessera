/* @layer renderer-components @kind logic */
import { countRows } from '../../SettingsSection/behavior/count-rows';
import { filterSettingsSections } from '../../SettingsSection/behavior/filter-sections';
import { NO_SECTIONS } from '../WorkspaceScreen.constants';
import type { WorkspaceMatches, WorkspacePage } from '../WorkspaceScreen.type';

const pageNamed = (page: WorkspacePage, needle: string): boolean =>
  [page.title, page.description ?? '', page.keywords ?? ''].some((word) => word.toLowerCase().includes(needle));

const searchWorkspace = (pages: readonly WorkspacePage[], query: string): WorkspaceMatches => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return { byName: [], withRows: [], total: 0 };
  const withRows = pages.flatMap((page) => {
    const sections = filterSettingsSections(page.sections ?? NO_SECTIONS, needle);
    const count = countRows(sections);
    return count > 0 ? [{ page, sections, count }] : [];
  });
  const byName = pages.filter((page) => pageNamed(page, needle));
  return { byName, withRows, total: withRows.reduce((sum, match) => sum + match.count, 0) };
};

export { searchWorkspace };
