/* @layer renderer-hooks @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { dropPanelPositionFor, useAnchorTracking, useDismissListeners, viewportBounds } from '../../../primitives/Portal';
import { ANCHOR_GAP, EDGE_MARGIN, ESTIMATED_HEIGHT, ESTIMATED_WIDTH } from './useColorPickerPopover.constants';
import type { Position, UseColorPickerPopoverParams } from './useColorPickerPopover.type';

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const popoverPositionFor = (rect: DOMRect) => {
  const base = dropPanelPositionFor(rect, {
    roomForDropDown: ESTIMATED_HEIGHT,
    gap: ANCHOR_GAP,
    minPanelWidth: ESTIMATED_WIDTH,
  });
  const bounds = viewportBounds();
  return {
    ...base,
    left: clamp(base.left, bounds.left + EDGE_MARGIN, bounds.right - ESTIMATED_WIDTH - EDGE_MARGIN),
    top: clamp(base.top, bounds.top + EDGE_MARGIN, bounds.bottom - ESTIMATED_HEIGHT - EDGE_MARGIN),
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

  const [corrected, setCorrected] = useState<Position | null>(null);
  useLayoutEffect(() => {
    if (!open || !position || !panelRef.current) { setCorrected(null); return; }
    const rect = panelRef.current.getBoundingClientRect();
    const bounds = viewportBounds();
    const maxLeft = bounds.right - rect.width - EDGE_MARGIN;
    const maxTop = bounds.bottom - rect.height - EDGE_MARGIN;
    const left = position.left > maxLeft ? Math.max(bounds.left + EDGE_MARGIN, maxLeft) : position.left;
    const top = position.top > maxTop ? Math.max(bounds.top + EDGE_MARGIN, maxTop) : position.top;
    setCorrected(left !== position.left || top !== position.top ? { left, top } : null);
  }, [open, position]);

  const finalPosition = position && (corrected ?? position);

  const handleClose = useCallback(() => onCloseRef.current(), []);

  useDismissListeners({ open, onClose: handleClose, contentRef: panelRef, triggerRef: anchorRef });

  return { position: finalPosition, panelRef };
};

export { useColorPickerPopover };
