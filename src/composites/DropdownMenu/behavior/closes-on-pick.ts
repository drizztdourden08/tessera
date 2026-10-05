/* @layer renderer-components @kind util */
import type { MenuItemKind } from '../DropdownMenu.type';
import { isChoice } from './is-choice';

const closesOnPick = (kind: MenuItemKind, closeOnSelect: boolean): boolean => closeOnSelect && !isChoice(kind);

export { closesOnPick };
