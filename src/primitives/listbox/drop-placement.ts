/* @layer renderer-components @kind util */
import { cssZoomOf } from '../dom/css-zoom-of';
import { MAX_DROP_HEIGHT, ROOM_FOR_DROP_DOWN, VIEW_MARGIN } from './listbox.constants';
import type { DropPlacement } from './drop-placement.type';

const pixels = (text: string | undefined): number => Number.parseFloat(text ?? '') || 0;

const zoomOf = (anchor: HTMLElement | null): number => (anchor ? cssZoomOf(anchor) : 1);

const dropPlacement = (anchor: HTMLElement | null, box: DOMRect, view: Window, fit = false): DropPlacement => {
  const zoom = zoomOf(anchor);
  const rect = { top: box.top / zoom, bottom: box.bottom / zoom, left: box.left / zoom, width: box.width / zoom };
  const viewHeight = view.innerHeight / zoom;
  const style = anchor ? view.getComputedStyle(anchor) : null;
  const line = pixels(style?.borderBottomWidth);
  const radius = Math.max(pixels(style?.borderTopLeftRadius), pixels(style?.borderBottomLeftRadius));
  const below = viewHeight - rect.bottom;
  const dropUp = below < ROOM_FOR_DROP_DOWN && rect.top > below;
  return {
    top: dropUp ? rect.top + line : rect.bottom - line,
    left: rect.left,
    anchorWidth: rect.width,
    dropUp,
    space: Math.min(fit ? Number.POSITIVE_INFINITY : MAX_DROP_HEIGHT, (dropUp ? rect.top : below) - VIEW_MARGIN),
    radius,
    maxWidth: view.innerWidth / zoom - rect.left - VIEW_MARGIN,
  };
};

export { dropPlacement };
