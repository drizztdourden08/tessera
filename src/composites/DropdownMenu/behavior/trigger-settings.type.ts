/* @layer renderer-components @kind types */
import type { MenuIntensity, MenuSize, MenuVariant } from '../DropdownMenu.type';

interface TriggerSettings {
  variant: MenuVariant;
  intensity: MenuIntensity;
  size: MenuSize;
  disabled: boolean;
  closeOnSelect: boolean;
  filter: boolean;
}

export type { TriggerSettings };
