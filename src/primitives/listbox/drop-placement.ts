/* @layer renderer-components @kind util */
import { cssZoomOf } from '../dom/css-zoom-of';
import { anchorLook } from './anchor-look';
import { MAX_DROP_HEIGHT, ROOM_FOR_DROP_DOWN, VIEW_MARGIN } from './listbox.constants';
import type { DropAlign, DropOptions, DropPlacement } from './drop-placement.type';

const zoomOf = (anchor: HTMLElement | null): number => (anchor ? cssZoomOf(anchor) : 1);

const endsAligned = (align: DropAlign, left: number, right: number, viewWidth: number): boolean =>
  align === 'end' || (align === 'auto' && right > viewWidth - left);

const dropPlacement = (anchor: HTMLElement | null, box: DOMRect, view: Window, options: DropOptions = {}): DropPlacement => {
  const { fit = false, align = 'start' } = options;
  const zoom = zoomOf(anchor);
  const rect = { top: box.top / zoom, bottom: box.bottom / zoom, left: box.left / zoom, right: box.right / zoom, width: box.width / zoom };
  const viewHeight = view.innerHeight / zoom;
  const viewWidth = view.innerWidth / zoom;
  const end = endsAligned(align, rect.left, rect.right, viewWidth);
  const { line, radius } = anchorLook(anchor, view);
  const below = viewHeight - rect.bottom;
  const dropUp = below < ROOM_FOR_DROP_DOWN && rect.top > below;
  return {
    top: dropUp ? rect.top + line : rect.bottom - line,
    left: rect.left,
    right: viewWidth - rect.right,
    end,
    anchorWidth: rect.width,
    dropUp,
    space: Math.min(fit ? Number.POSITIVE_INFINITY : MAX_DROP_HEIGHT, (dropUp ? rect.top : below) - VIEW_MARGIN),
    radius,
    maxWidth: (end ? rect.right : viewWidth - rect.left) - VIEW_MARGIN,
  };
};

export { dropPlacement };
