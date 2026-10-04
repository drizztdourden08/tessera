/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ownerDocumentOf } from '../dom/owner-document';
import { useAnchorTracking } from '../Portal/behavior/useAnchorTracking';
import { useDismissListeners } from '../Portal/behavior/useDismissListeners';
import { dropPlacement } from './drop-placement';
import { dropShape } from './drop-shape';
import { useAnchorResize } from './useAnchorResize';
import { useDropWidth } from './useDropWidth';
import type { ListboxDrop, UseListboxDropParams } from './listbox-drop.type';

const useListboxDrop = <E extends HTMLElement>(params: UseListboxDropParams): ListboxDrop<E> => {
  const { disabled, defaultOpen, inline = false, contentKey, focusRef, escape, fit, align, onClose } = params;
  const [open, setOpen] = useState(defaultOpen === true && !disabled);
  const anchorRef = useRef<E>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const close = useCallback(() => {
    const drop = dropRef.current;
    const focused = ownerDocumentOf(drop).activeElement;
    if (drop && focused && drop.contains(focused)) (focusRef ?? anchorRef).current?.focus();
    setOpen(false);
    closeRef.current?.();
  }, [focusRef]);

  const show = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled]);

  const compute = useCallback(
    (rect: DOMRect, view: Window) => dropPlacement(anchorRef.current, rect, view, { fit, align }),
    [fit, align],
  );
  const { position, reposition } = useAnchorTracking({ active: open && !inline, anchorRef, compute, onOutOfView: close });
  useAnchorResize(open && !inline, anchorRef, reposition);
  const width = useDropWidth({ open: open && !inline, dropRef, placement: position, contentKey });
  useDismissListeners({ open, onClose: close, contentRef: dropRef, triggerRef: anchorRef, escape });

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return { open, show, close, anchorRef, dropRef, placement: position, width, ...dropShape(position, width), inline };
};

export { useListboxDrop };
