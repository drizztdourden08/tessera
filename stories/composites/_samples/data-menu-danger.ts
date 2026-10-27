/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

const DANGER_MENU: MenuGroup[] = [{
  id: 'session',
  items: [
    { id: 'rename', icon: 'pencil', label: 'Rename' },
    { id: 'duplicate', icon: 'copy', label: 'Duplicate' },
    { id: 'reset', icon: 'rotate-ccw', label: 'Reset options', kind: 'confirm' },
    { separator: true },
    { id: 'delete', icon: 'trash-2', label: 'Delete session', tone: 'danger', shortcut: 'Del' },
  ],
}];

export { DANGER_MENU };
