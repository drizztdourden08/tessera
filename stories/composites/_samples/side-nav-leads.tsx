/* @layer stories @kind data */
import type { SideNavConfig, SideNavItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { NAV_ICONS } from './nav';
import type { NavIcon } from './nav';

type LeadCase = 'search' | 'item' | 'label' | 'one';

const navItem = (id: string, label: string, icon: NavIcon): SideNavItem => ({
  id, label, icon: <Icon name={NAV_ICONS[icon]} size={18} />,
});

const PLAY = { id: 'play', label: 'Play', items: [navItem('sessions', 'Sessions', 'sessions'), navItem('players', 'Players', 'players')] };

const LEAD_CONFIGS: Readonly<Record<LeadCase, SideNavConfig>> = {
  search: { home: navItem('home', 'Home', 'home'), groups: [PLAY] },
  item: { home: navItem('home', 'Home', 'home'), groups: [PLAY] },
  label: { groups: [PLAY] },
  one: { groups: [{ id: 'play', label: 'Play', items: [navItem('sessions', 'Sessions', 'sessions')] }] },
};

const LEAD_ROWS: readonly { key: LeadCase; label: string }[] = [
  { key: 'search', label: 'Search first' },
  { key: 'item', label: 'Item first' },
  { key: 'label', label: 'Group label first' },
  { key: 'one', label: 'One item' },
];

export { LEAD_CONFIGS, LEAD_ROWS };
export type { LeadCase };
