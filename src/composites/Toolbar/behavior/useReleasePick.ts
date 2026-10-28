/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { MENU_ITEM_SELECTOR } from '../Toolbar.constants';

const useReleasePick = (active: boolean, anchorRef: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    if (!active) return undefined;
    const doc = ownerDocumentOf(anchorRef.current);
    const release = (event: PointerEvent): void => {
      doc.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>(MENU_ITEM_SELECTOR)?.click();
    };
    doc.addEventListener('pointerup', release, { once: true });
    return () => doc.removeEventListener('pointerup', release);
  }, [active, anchorRef]);
};

export { useReleasePick };
