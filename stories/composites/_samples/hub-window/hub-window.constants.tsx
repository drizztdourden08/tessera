/* @layer stories @kind data */
import type { FloatingSwitchItem, SideNavConfig } from '../../../../src/composites';
import { Icon } from '../../../../src/primitives';
import type { DataPage } from './hub-window.type';

const HUBS: FloatingSwitchItem[] = [
  { id: 'game', label: 'Game', icon: <Icon name="gamepad-2" /> },
  { id: 'data', label: 'Data', icon: <Icon name="archive" /> },
  { id: 'store', label: 'Hookshop', icon: <Icon name="package" /> },
];

const DATA_PAGES: readonly DataPage[] = [
  { id: 'profiles', label: 'Profiles', icon: 'users', group: 'library' },
  { id: 'roms', label: 'ROMs', icon: 'gamepad-2', group: 'library' },
  { id: 'sprites', label: 'Sprites', icon: 'image', group: 'library' },
  { id: 'characters', label: 'Character Studio', icon: 'user', group: 'studios' },
  { id: 'languages', label: 'Language Studio', icon: 'globe', group: 'studios' },
  { id: 'msu', label: 'MSU Studio', icon: 'headphones', group: 'studios' },
  { id: 'storage', label: 'Storage', icon: 'hard-drive' },
];

const NAV_GROUPS = [{ id: 'library', label: 'Library' }, { id: 'studios', label: 'Studios' }, { id: 'more' }];

const DATA_NAV: SideNavConfig = {
  groups: NAV_GROUPS.map((group) => ({
    ...group,
    items: DATA_PAGES.filter((page) => (page.group ?? 'more') === group.id).map((page) => ({ id: page.id, label: page.label, icon: <Icon name={page.icon} /> })),
  })),
};

export { DATA_NAV, DATA_PAGES, HUBS };
