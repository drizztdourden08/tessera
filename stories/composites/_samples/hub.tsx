/* @layer stories @kind component */
import type { SearchResultsHit, SideNavConfig, SideNavItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { NAV_ICONS } from './nav';
import type { NavIcon } from './nav';

const hubItem = (id: string, label: string, icon: NavIcon): SideNavItem => ({
  id, label, icon: <Icon name={NAV_ICONS[icon]} size={18} />,
});

const HUB_NAV: SideNavConfig = {
  home: hubItem('home', 'Overview', 'home'),
  groups: [
    { id: 'play', label: 'Play', items: [hubItem('sessions', 'Sessions', 'sessions'), hubItem('players', 'Players', 'players')] },
    { id: 'app', label: 'App', items: [hubItem('general', 'General', 'settings'), hubItem('appearance', 'Appearance', 'appearance')] },
  ],
};

const HUB_PAGES: readonly SideNavItem[] = [HUB_NAV.home, ...HUB_NAV.groups.flatMap((g) => g.items)].filter(
  (page): page is SideNavItem => page !== undefined,
);

const HUB_TABS: readonly SearchResultsHit[] = [
  { id: 'sessions/live', label: 'Live sessions', detail: 'Sessions' },
  { id: 'sessions/archive', label: 'Session archive', detail: 'Sessions' },
  { id: 'players/bans', label: 'Banned players', detail: 'Players' },
  { id: 'general/updates', label: 'Updates', detail: 'General' },
];

const matchHub = (query: string): SearchResultsHit[] => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [];
  const pages = HUB_PAGES.filter((p) => p.label.toLowerCase().includes(needle)).map((p) => ({ id: p.id, label: p.label }));
  return [...pages, ...HUB_TABS.filter((t) => t.label.toLowerCase().includes(needle))];
};

export { HUB_NAV, HUB_PAGES, matchHub };
