/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { Rect } from '../DockLayout.type';
import type { ResizeWiring } from './float-resize.type';
import { resizeRect } from './resize-rect';

const listenResize = (wiring: ResizeWiring): (() => void) => {
  const { handle, pointerId, origin, edge, start, bounds, min, onLive, onDone } = wiring;
  const view = ownerWindowOf(handle);
  const zoom = cssZoomOf(handle);
  const listening = new AbortController();
  const { signal } = listening;
  let last: Rect = start;
  const detach = (): void => {
    listening.abort();
    if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId);
  };
  const end = (rect: Rect | null): void => {
    detach();
    onDone(rect);
  };
  view.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== pointerId) return;
    last = resizeRect(start, edge, { x: (ev.clientX - origin.x) / zoom, y: (ev.clientY - origin.y) / zoom }, { bounds, min });
    onLive(last);
  }, { signal });
  view.addEventListener('pointerup', (ev) => { if (ev.pointerId === pointerId) end(last); }, { signal });
  view.addEventListener('pointercancel', (ev) => { if (ev.pointerId === pointerId) end(null); }, { signal });
  view.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    ev.stopPropagation();
    end(null);
  }, { signal, capture: true });
  handle.setPointerCapture(pointerId);
  return detach;
};

export { listenResize };
