/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../dom/css-zoom-of';
import type { FloatingPlacement } from '../../Floating/Floating.type';
import type { AnchoredPlacement } from '../Anchored.type';
import type { PlaceAlign, PlaceSide } from './anchored-fallback.type';

const inlineOf = (align: PlaceAlign, rect: DOMRect, view: Window, zoom: number): FloatingPlacement => {
  if (align === 'end') return { right: (view.innerWidth - rect.right) / zoom };
  if (align === 'center') return { left: (rect.left + rect.width / 2) / zoom };
  return { left: rect.left / zoom };
};

const anchoredFallback = (anchor: HTMLElement | null, rect: DOMRect, view: Window, placement: AnchoredPlacement): FloatingPlacement => {
  const zoom = anchor ? cssZoomOf(anchor) : 1;
  const [side, align] = placement.split('-') as [PlaceSide, PlaceAlign];
  if (side === 'right') return { top: rect.top / zoom, left: rect.right / zoom };
  const block = side === 'bottom' ? { top: rect.bottom / zoom } : { bottom: (view.innerHeight - rect.top) / zoom };
  return { ...block, ...inlineOf(align, rect, view, zoom) };
};

export { anchoredFallback };
