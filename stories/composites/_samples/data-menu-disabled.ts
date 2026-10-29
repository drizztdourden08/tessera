/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

const DISABLED_MENU: MenuGroup[] = [{
  id: 'edit',
  items: [
    { id: 'undo', icon: 'undo-2', label: 'Undo', shortcut: 'Ctrl+Z' },
    { id: 'copy', icon: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'redo', icon: 'redo-2', label: 'Redo', description: 'Nothing to redo', shortcut: 'Ctrl+Shift+Z', disabled: true },
    { separator: true },
    { id: 'grid', label: 'Show grid', checked: true, disabled: true },
    { id: 'delete', icon: 'trash-2', label: 'Delete', tone: 'danger', disabled: true },
  ],
}];

export { DISABLED_MENU };
