/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { dropPanelPositionFor, useAnchorTracking, useDismissListeners } from '../../Portal';
import { FIELD_GAP, MIN_PANEL_WIDTH, ROOM_FOR_DROP_DOWN } from './useTagPopup.constants';

const tagPanelPositionFor = (rect: DOMRect) =>
  dropPanelPositionFor(rect, {
    roomForDropDown: ROOM_FOR_DROP_DOWN,
    gap: FIELD_GAP,
    minPanelWidth: MIN_PANEL_WIDTH,
  });

const useTagPopup = (disabled: boolean) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled]);

  const handleClose = useCallback(() => setOpen(false), []);

  const { position } = useAnchorTracking({
    active: open,
    anchorRef,
    compute: tagPanelPositionFor,
    onOutOfView: handleClose,
  });

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useDismissListeners({ open, onClose: handleClose, contentRef: panelRef, triggerRef: anchorRef });

  return { open, pos: position, anchorRef, panelRef, handleOpen, handleClose };
};

export { useTagPopup };
