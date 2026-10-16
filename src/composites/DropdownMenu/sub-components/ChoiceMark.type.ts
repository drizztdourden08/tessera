/* @layer renderer-components @kind types */
import type { MenuItemKind } from '../DropdownMenu.type';

type ChoiceMarkKind = Extract<MenuItemKind, 'check' | 'radio'>;

interface ChoiceMarkProps {
  kind: ChoiceMarkKind;
  checked: boolean;
  className?: string;
}

export type { ChoiceMarkKind, ChoiceMarkProps };
