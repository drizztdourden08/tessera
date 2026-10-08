/* @layer renderer-components @kind types */
import type { DropAlign } from '../../../primitives/listbox/drop-placement.type';
import type { MenuIntensity, MenuSize, MenuVariant } from '../DropdownMenu.type';

interface TriggerSettings {
  variant: MenuVariant;
  intensity: MenuIntensity;
  size: MenuSize;
  align: DropAlign;
  disabled: boolean;
  closeOnSelect: boolean;
  filter: boolean;
}

export type { TriggerSettings };
