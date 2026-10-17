/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import type { DragWiring } from './rect-drag.type';

const listenDrag = <T>(wiring: DragWiring<T>): (() => void) => {
  const { handle, pointerId, origin, frame, onLive, onDone } = wiring;
  const view = ownerWindowOf(handle);
  const zoom = cssZoomOf(handle);
  const listening = new AbortController();
  const { signal } = listening;
  let last: T | null = null;
  const detach = (): void => {
    listening.abort();
    if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId);
  };
  const end = (result: T | null): void => {
    detach();
    onDone(result);
  };
  view.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== pointerId) return;
    last = frame({ x: (ev.clientX - origin.x) / zoom, y: (ev.clientY - origin.y) / zoom });
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

export { listenDrag };
