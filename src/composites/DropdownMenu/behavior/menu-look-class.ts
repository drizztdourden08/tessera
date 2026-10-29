/* @layer renderer-components @kind util */
import type { MenuIntensity, MenuItemSize, MenuVariant } from '../DropdownMenu.type';

const menuLookClass = (variant: MenuVariant, intensity: MenuIntensity, itemSize: MenuItemSize = 'default'): string =>
  `dropdown-look dropdown-look--${variant} dropdown-look--${intensity}${itemSize === 'roomy' ? ' dropdown-look--roomy' : ''}`;

export { menuLookClass };
