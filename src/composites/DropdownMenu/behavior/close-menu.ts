/* @layer renderer-components @kind util */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { SUB_MENU_SELECTOR } from '../DropdownMenu.constants';

const closeMenu = (close: () => void, anchor: HTMLElement | null): void => {
  const focused = ownerDocumentOf(anchor).activeElement;
  const inSubMenu = focused?.closest(SUB_MENU_SELECTOR) != null;
  close();
  if (inSubMenu) anchor?.focus();
};

export { closeMenu };
