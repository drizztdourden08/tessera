/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useHeldTimeout } from '../../../primitives/dom/useHeldTimeout';
import { HOVER_CLOSE_GRACE, HOVER_OPEN_DELAY, SURFACE_SELECTOR } from '../DropdownMenu.constants';
import type { MenuHover } from '../DropdownMenu.type';
import type { HoverOpenParams } from './useHoverOpen.type';

const useHoverOpen = (params: HoverOpenParams): MenuHover => {
  const { open, byHover, anchorRef, onOpen, onClose, enabled = true } = params;
  const [inside, setInside] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setInside(false);
  }

  const focusInMenu = (): boolean => ownerDocumentOf(anchorRef.current).activeElement?.closest(SURFACE_SELECTOR) != null;
  useHeldTimeout(!enabled || !inside || open, HOVER_OPEN_DELAY, onOpen);
  useHeldTimeout(!enabled || !byHover || !open || inside, HOVER_CLOSE_GRACE, () => {
    if (!focusInMenu()) onClose();
  });

  return { onMouseEnter: () => setInside(true), onMouseLeave: () => setInside(false) };
};

export { useHoverOpen };
