/* @layer stories @kind data */
import type { MenuGroup, MenuItem } from '../../../src/composites/DropdownMenu';

const leaf = (id: string, label: string): MenuItem => ({ id, label });

const leaves = (prefix: string, labels: readonly string[]): MenuItem[] => labels.map((label, index) => leaf(`${prefix}-${index}`, label));

const RECENT: MenuItem = { id: 'recent', icon: 'clock', label: 'Recent', children: leaves('recent', ['Morning run', 'Practice seed', 'Race night', 'Archipelago']) };

const SHARE: MenuItem = { id: 'share', icon: 'share-2', label: 'Share', children: leaves('share', ['Copy link', 'Send to a friend']) };

const MOVE: MenuItem = { id: 'move', icon: 'folder-open', label: 'Move to', children: leaves('move', ['Archive', 'Favourites']) };

const plain = (ids: readonly string[]): MenuItem[] => ids.map((id) => leaf(id, id[0]?.toUpperCase() + id.slice(1)));

const JOIN_MENUS: Readonly<Record<string, MenuGroup[]>> = {
  'From the top': [{ id: 'top', items: [RECENT, ...plain(['open', 'rename', 'duplicate'])] }],
  'From the bottom': [{ id: 'bottom', items: [...plain(['open', 'rename', 'duplicate', 'pin']), SHARE] }],
  'In the middle': [{ id: 'middle', items: [...plain(['open', 'rename', 'duplicate']), MOVE, ...plain(['pin', 'export', 'delete'])] }],
};

const WINDOW_GROUPS: MenuItem[] = ['None', 'Group 1', 'Group 2', 'Group 3', 'Group 4'].map((label, index) => ({
  id: `group-${index}`, label, kind: 'radio', checked: index === 0,
}));

const MARKS_MENU: MenuGroup[] = [{
  id: 'view',
  label: 'View',
  items: [
    { id: 'pin', icon: 'pin', label: 'Pin window on top', checked: false },
    { id: 'status', icon: 'monitor', label: 'Status bar', checked: true },
    { id: 'fullscreen', icon: 'maximize-2', label: 'Fullscreen' },
    { id: 'group', icon: 'group', label: 'Window group', children: WINDOW_GROUPS },
  ],
}];

export { JOIN_MENUS, MARKS_MENU };
