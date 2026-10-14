/* @layer stories @kind data */
import swordsIcon from '@iconify-icons/lucide/swords';
import { Icon } from '../../../src/primitives';
import type { MenuGroup } from '../../../src/composites/DropdownMenu';

const ICON_SOURCE_MENU: MenuGroup[] = [{
  id: 'insert',
  label: 'Insert',
  items: [
    { id: 'name', icon: 'layout-dashboard', label: 'A name from the set' },
    { id: 'iconify', icon: swordsIcon, label: 'Iconify data, imported' },
    { id: 'path', icon: { d: 'M1 3h5l2 2h7v8H1z' }, label: 'Path data of your own' },
    { id: 'node', icon: <Icon name="person-standing" flip="horizontal" />, label: 'Any element, such as an Icon of your own' },
    { id: 'none', label: 'No icon, the column stays' },
  ],
}];

export { ICON_SOURCE_MENU };
