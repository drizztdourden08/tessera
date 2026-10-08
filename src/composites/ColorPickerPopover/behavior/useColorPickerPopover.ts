/* @layer renderer-hooks @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { dropPanelPositionFor, useAnchorTracking, useDismissListeners, viewportBounds } from '../../../primitives/Portal';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { pickerTop } from './picker-top';
import { ANCHOR_GAP, EDGE_MARGIN, ESTIMATED_HEIGHT, ESTIMATED_WIDTH } from './useColorPickerPopover.constants';
import type { Correction, Position, UseColorPickerPopoverParams } from './useColorPickerPopover.type';

const popoverPositionFor = (rect: DOMRect, view: Window): Position => {
  const base = dropPanelPositionFor(rect, {
    roomForDropDown: ESTIMATED_HEIGHT,
    gap: ANCHOR_GAP,
    minPanelWidth: ESTIMATED_WIDTH,
  }, view);
  const bounds = viewportBounds(view);
  return {
    anchorTop: base.top,
    top: pickerTop(base.top, ESTIMATED_HEIGHT, base.dropUp, bounds),
    left: clampNumber(base.left, bounds.left + EDGE_MARGIN, bounds.right - ESTIMATED_WIDTH - EDGE_MARGIN),
    width: base.width,
    dropUp: base.dropUp,
  };
};

const useColorPickerPopover = (params: UseColorPickerPopoverParams) => {
  const { open, anchorRef, onClose } = params;
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const { position } = useAnchorTracking({
    active: open,
    anchorRef,
    compute: popoverPositionFor,
    onOutOfView: () => onCloseRef.current(),
  });

  const [corrected, setCorrected] = useState<Correction | null>(null);
  useLayoutEffect(() => {
    if (!open || !position || !panelRef.current) { setCorrected(null); return; }
    const rect = panelRef.current.getBoundingClientRect();
    const bounds = viewportBounds(ownerWindowOf(panelRef.current));
    const maxLeft = bounds.right - rect.width - EDGE_MARGIN;
    const left = position.left > maxLeft ? Math.max(bounds.left + EDGE_MARGIN, maxLeft) : position.left;
    const top = pickerTop(position.anchorTop, rect.height, position.dropUp, bounds);
    setCorrected(left !== position.left || top !== position.top ? { left, top } : null);
  }, [open, position]);

  const placed = position && { ...position, ...corrected };
  const fallback = placed && { top: placed.top, left: placed.left, width: placed.width };

  const handleClose = useCallback(() => onCloseRef.current(), []);

  useDismissListeners({ open, onClose: handleClose, contentRef: panelRef, triggerRef: anchorRef });

  return { fallback, dropUp: placed?.dropUp === true, panelRef };
};

export { useColorPickerPopover };
