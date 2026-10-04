/* @layer stories @kind data */
import type { SideNavConfig } from '../../../src/composites';
import { navItem } from './nav-item';

const SCROLL_CONFIG: SideNavConfig = {
  home: navItem('home', 'Home', 'home'),
  groups: [
    {
      id: 'play', label: 'Play', items: [
        navItem('sessions', 'Sessions', 'sessions'), navItem('players', 'Players', 'players'),
        navItem('hosting', 'Hosting', 'hosting'), navItem('servers', 'Servers', 'servers'),
      ],
    },
    {
      id: 'library', label: 'Library', items: [
        navItem('presets', 'Game presets', 'presets'), navItem('logs', 'Item logs', 'logs'),
        navItem('appearance', 'Appearance', 'appearance'), navItem('trash', 'Trash', 'trash'),
      ],
    },
    {
      id: 'system', label: 'System', items: [
        navItem('settings', 'Settings', 'settings'), navItem('relays', 'Relays', 'servers'),
        navItem('themes', 'Themes', 'appearance'), navItem('audit', 'Audit log', 'logs'),
      ],
    },
  ],
};

export { SCROLL_CONFIG };
