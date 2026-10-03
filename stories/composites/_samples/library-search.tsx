/* @layer stories @kind logic */
import type { SearchResultsGroup, SideNavConfig } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { LIBRARY_GROUPS, LIBRARY_PAGES } from './library-pages';

const LIBRARY_NAV: SideNavConfig = {
  groups: LIBRARY_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    items: LIBRARY_PAGES.filter((page) => page.group === group.id).map((page) => ({ id: page.id, label: page.title, icon: <Icon name={page.icon} /> })),
  })),
};

const searchLibrary = (query: string): SearchResultsGroup[] => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [];
  return LIBRARY_PAGES.flatMap((page) => {
    const hits = page.entries
      .filter((entry) => `${entry.title} ${entry.text}`.toLowerCase().includes(needle))
      .map((entry) => ({ id: `${page.id}/${entry.id}`, label: entry.title, description: entry.text, path: [page.title] }));
    return hits.length === 0 ? [] : [{ id: page.id, label: page.title, icon: <Icon name={page.icon} />, count: hits.length, hits }];
  });
};

export { LIBRARY_NAV, searchLibrary };
