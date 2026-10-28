/* @layer stories @kind data */
import swordsIcon from '@iconify-icons/lucide/swords';
import { ColorSwatch, Icon } from '../../../src/primitives';
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

const swatchIcon = (hex: string) => <ColorSwatch size="xs" color={hex} tabIndex={-1} aria-hidden />;

const COLOR_ICON_MENU: MenuGroup[] = [{
  id: 'colours',
  label: 'Palette',
  items: [
    { id: 'green', icon: swatchIcon('#38a048'), label: 'Tunic green' },
    { id: 'red', icon: swatchIcon('#e84830'), label: 'Heart red' },
    { id: 'blue', icon: swatchIcon('#4870d8'), label: 'Water blue' },
    { id: 'clear', icon: swatchIcon('#38a04880'), label: 'Half clear green' },
  ],
}];

export { COLOR_ICON_MENU, ICON_SOURCE_MENU };
