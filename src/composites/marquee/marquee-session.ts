/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import { clampPoint } from './clamp-point';
import { contentPoint } from './content-point';
import { cellRectOf } from './cell-rect-of';
import { hitItems } from './hit-items';
import { mergeSelection } from './merge-selection';
import { passedThreshold } from './passed-threshold';
import { rectFromPoints } from './rect-from-points';
import { sameKeys } from './same-keys';
import { scrollByEdge } from './scroll-by-edge';
import type { Point } from '../rect-drag/rect-drag.type';
import type { MarqueeWiring } from './marquee.type';

const startMarquee = (wiring: MarqueeWiring): (() => void) => {
  const { container, pointerId, modifiers, base, rectsOf, threshold, autoScroll, onRect, onCells, onSelect, onEnd } = wiring;
  const view = ownerWindowOf(container);
  const zoom = cssZoomOf(container);
  const listening = new AbortController();
  const { signal } = listening;
  const origin = contentPoint(container, zoom, wiring.start);
  let pointer: Point = wiring.start;
  let started = false;
  let latest: readonly string[] = base;
  let frame = 0;

  const update = (): void => {
    if (!started && !passedThreshold(wiring.start, pointer, threshold)) return;
    started = true;
    const reached = clampPoint(contentPoint(container, zoom, pointer), container.scrollWidth, container.scrollHeight);
    const rect = rectFromPoints(origin, reached);
    onRect(rect);
    const hits = hitItems(rect, rectsOf());
    onCells(cellRectOf(hits));
    const next = mergeSelection(base, hits.map((item) => item.key), modifiers);
    if (sameKeys(next, latest)) return;
    latest = next;
    onSelect(next);
  };

  const tick = (): void => {
    if (scrollByEdge(container, pointer)) update();
    frame = view.requestAnimationFrame(tick);
  };

  const stop = (): void => {
    listening.abort();
    view.cancelAnimationFrame(frame);
    if (container.hasPointerCapture(pointerId)) container.releasePointerCapture(pointerId);
    onRect(null);
    onCells(null);
    onEnd();
  };

  const cancel = (): void => {
    if (!sameKeys(latest, base)) onSelect(base);
    stop();
  };

  view.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    pointer = { x: event.clientX, y: event.clientY };
    const before = started;
    update();
    if (started && !before && autoScroll) frame = view.requestAnimationFrame(tick);
  }, { signal });
  view.addEventListener('pointerup', (event) => { if (event.pointerId === pointerId) stop(); }, { signal });
  view.addEventListener('pointercancel', (event) => { if (event.pointerId === pointerId) cancel(); }, { signal });
  view.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    cancel();
  }, { signal, capture: true });
  container.addEventListener('selectstart', (event) => { if (started) event.preventDefault(); }, { signal });
  container.setPointerCapture(pointerId);
  return stop;
};

export { startMarquee };
