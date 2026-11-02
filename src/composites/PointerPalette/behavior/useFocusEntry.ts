/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { ENTRY_SELECTOR } from '../PointerPalette.constants';

const useFocusEntry = (surface: RefObject<HTMLElement | null>, origin: RefObject<HTMLElement | null>): void => {
  useLayoutEffect(() => {
    const active = ownerDocumentOf(surface.current).activeElement;
    origin.current = isHTMLElement(active) ? active : null;
    surface.current?.querySelector<HTMLElement>(ENTRY_SELECTOR)?.focus();
  }, [surface, origin]);
};

export { useFocusEntry };
