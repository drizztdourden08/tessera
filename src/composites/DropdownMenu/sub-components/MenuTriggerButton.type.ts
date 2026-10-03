/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, RefObject } from 'react';
import type { MenuSize, MenuTrigger, MenuVariant } from '../DropdownMenu.type';

interface MenuTriggerButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  buttonRef: RefObject<HTMLButtonElement | null>;
  trigger: MenuTrigger;
  variant: MenuVariant;
  size: MenuSize;
  open: boolean;
}

export type { MenuTriggerButtonProps };
