/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import type { SubOpen, SubOpenState } from '../ControlMenu.type';

const useSubOpen = (rowRef: RefObject<HTMLElement | null>, panelId: string): SubOpen => {
  const [open, setOpen] = useState<SubOpenState>(null);
  const inside = (): boolean => {
    const doc = ownerDocumentOf(rowRef.current);
    return doc.getElementById(panelId)?.contains(doc.activeElement) === true;
  };

  return {
    open,
    hover: () => setOpen((now) => now ?? 'hover'),
    focus: () => setOpen('focus'),
    leave: () => {
      if (!inside()) setOpen(null);
    },
    back: () => {
      const was = inside();
      setOpen(null);
      if (was) rowRef.current?.querySelector<HTMLElement>('.control-menu__sub-row')?.focus();
    },
  };
};

export { useSubOpen };
