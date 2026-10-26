/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { restoreFocus } from '../../../primitives/dom/restore-focus';
import { SURFACE_SELECTOR } from '../../DropdownMenu/DropdownMenu.constants';

const focusedOutsideMenu = (): HTMLElement | null => {
  const active = ownerDocumentOf(null).activeElement;
  return isHTMLElement(active) && !active.closest(SURFACE_SELECTOR) ? active : null;
};

const useFocusRestore = (open: boolean, opener: RefObject<HTMLElement | null>): void => {
  const origin = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useLayoutEffect(() => {
    if (open && !wasOpen.current) origin.current = opener.current ?? focusedOutsideMenu();
    if (!open && wasOpen.current) {
      restoreFocus(origin.current);
      origin.current = null;
      opener.current = null;
    }
    wasOpen.current = open;
  }, [open, opener]);
};

export { useFocusRestore };
