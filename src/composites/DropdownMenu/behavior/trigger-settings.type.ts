/* @layer renderer-components @kind types */
import type { DropAlign } from '../../../primitives/listbox/drop-placement.type';
import type { MenuIntensity, MenuTriggerSize, MenuVariant } from '../DropdownMenu.type';

interface TriggerSettings {
  variant: MenuVariant;
  intensity: MenuIntensity;
  size: MenuTriggerSize;
  align: DropAlign;
  disabled: boolean;
  closeOnSelect: boolean;
  filter: boolean;
  openOnHover: boolean;
}

export type { TriggerSettings };
