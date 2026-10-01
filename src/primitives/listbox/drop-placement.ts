/* @layer renderer-components @kind util */
import { MAX_DROP_HEIGHT, ROOM_FOR_DROP_DOWN, VIEW_MARGIN } from './listbox.constants';
import type { DropPlacement } from './drop-placement.type';

const pixels = (text: string | undefined): number => Number.parseFloat(text ?? '') || 0;

const dropPlacement = (anchor: HTMLElement | null, rect: DOMRect, view: Window, fit = false): DropPlacement => {
  const style = anchor ? view.getComputedStyle(anchor) : null;
  const line = pixels(style?.borderBottomWidth);
  const radius = Math.max(pixels(style?.borderTopLeftRadius), pixels(style?.borderBottomLeftRadius));
  const below = view.innerHeight - rect.bottom;
  const dropUp = below < ROOM_FOR_DROP_DOWN && rect.top > below;
  return {
    top: dropUp ? rect.top + line : rect.bottom - line,
    left: rect.left,
    anchorWidth: rect.width,
    dropUp,
    space: Math.min(fit ? Number.POSITIVE_INFINITY : MAX_DROP_HEIGHT, (dropUp ? rect.top : below) - VIEW_MARGIN),
    radius,
    maxWidth: view.innerWidth - rect.left - VIEW_MARGIN,
  };
};

export { dropPlacement };
