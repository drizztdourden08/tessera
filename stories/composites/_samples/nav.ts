/* @layer stories @kind data */
import type { HeaderAnchorNavItem } from '../../../src/composites';
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

const SESSION_SECTIONS: readonly HeaderAnchorNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'players', label: 'Players', badge: 8 },
  { id: 'items', label: 'Item log', badge: 214 },
  { id: 'hints', label: 'Hints', badge: 3 },
  { id: 'settings', label: 'Settings' },
];

export { NAV_ICONS, SESSION_SECTIONS };
export type { NavIcon };
