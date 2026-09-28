/* @layer stories @kind data */
import type { HeaderTabItem, SideNavGroup } from '../../../src/composites';
import type { IconName } from '../../../src/primitives';

const NAV_ICONS = {
  home: 'house',
  sessions: 'layers',
  players: 'users',
  servers: 'server',
  presets: 'sliders-horizontal',
  settings: 'settings',
  appearance: 'palette',
  hosting: 'globe',
  logs: 'file-text',
  trash: 'trash-2',
} as const satisfies Record<string, IconName>;

type NavIcon = keyof typeof NAV_ICONS;

const SETTINGS_GROUPS: SideNavGroup[] = [
  {
    title: 'Application',
    items: [
      { id: 'general', label: 'General' },
      { id: 'appearance', label: 'Appearance' },
      { id: 'notifications', label: 'Notifications' },
    ],
  },
  {
    title: 'Multiworld',
    items: [
      { id: 'hosting', label: 'Hosting' },
      { id: 'servers', label: 'Servers' },
      { id: 'game-presets', label: 'Game presets' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { id: 'logging', label: 'Logging' },
      { id: 'data-folder', label: 'Data folder' },
    ],
  },
];

const TARGET_GROUPS: SideNavGroup[] = [
  { title: 'Overview', id: 'overview', items: [] },
  {
    title: 'Sessions',
    id: 'sessions',
    items: [
      { id: 'friday-async', label: 'Friday async' },
      { id: 'league-week-3', label: 'League week 3' },
      { id: 'practice-room', label: 'Practice room' },
    ],
  },
  { title: 'Archive', id: 'archive', items: [] },
];

const SESSION_TABS: readonly HeaderTabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'players', label: 'Players', badge: 8 },
  { id: 'items', label: 'Item log', badge: 214 },
  { id: 'hints', label: 'Hints', badge: 3 },
  { id: 'settings', label: 'Settings' },
];

export { NAV_ICONS, SESSION_TABS, SETTINGS_GROUPS, TARGET_GROUPS };
export type { NavIcon };
