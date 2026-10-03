/* @layer stories @kind component */
import type { SideNavGroup, SideNavItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';

const setting = (id: string, label: string, icon: IconName): SideNavItem => ({
  id, label, icon: <Icon name={icon} size={18} />,
});

const SETTINGS_GROUPS: SideNavGroup[] = [
  {
    id: 'application',
    label: 'Application',
    items: [setting('general', 'General', 'settings'), setting('appearance', 'Appearance', 'palette'), setting('notifications', 'Notifications', 'info')],
  },
  {
    id: 'multiworld',
    label: 'Multiworld',
    items: [setting('hosting', 'Hosting', 'globe'), setting('servers', 'Servers', 'server'), setting('game-presets', 'Game presets', 'sliders-horizontal')],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    items: [setting('logging', 'Logging', 'file-text'), setting('data-folder', 'Data folder', 'folder')],
  },
];

export { SETTINGS_GROUPS };
