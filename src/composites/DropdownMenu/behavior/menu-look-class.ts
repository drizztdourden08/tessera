/* @layer renderer-components @kind util */
import type { MenuIntensity, MenuVariant } from '../DropdownMenu.type';

const menuLookClass = (variant: MenuVariant, intensity: MenuIntensity): string =>
  `dropdown-look dropdown-look--${variant} dropdown-look--${intensity}`;

export { menuLookClass };
