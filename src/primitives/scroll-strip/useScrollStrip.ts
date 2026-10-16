/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { observeResize } from '../dom/observe-resize';
import { NO_OVERFLOW } from './scroll-strip.constants';
import { edgesForMetrics } from './edges-for-metrics';
import { metricsOf } from './metrics-of';
import { pageDeltaFor } from './page-delta-for';
import { sameEdges } from './same-edges';
import { wheelScrollDelta } from './wheel-scroll-delta';
import type { ScrollStripState, StripEdges } from './scroll-strip.type';

const useScrollStrip = (itemCount: number): ScrollStripState => {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLElement | null>(null);
  const [edges, setEdges] = useState<StripEdges>(NO_OVERFLOW);

  const measure = useCallback((): void => {
    const node = trackRef.current;
    if (!node) return;
    const next = edgesForMetrics(metricsOf(node));
    setEdges((prev) => (sameEdges(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return undefined;
    measure();
    return observeResize([node, ...node.children], measure);
  }, [measure, itemCount]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const handleWheel = (event: WheelEvent): void => {
      const node = trackRef.current;
      if (!node) return;
      const delta = wheelScrollDelta(event, metricsOf(node));
      if (delta === null) return;
      event.preventDefault();
      node.scrollBy({ left: delta });
    };
    root.addEventListener('wheel', handleWheel, { passive: false });
    return () => root.removeEventListener('wheel', handleWheel);
  }, []);

  const pageBy = useCallback((direction: -1 | 1): void => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: pageDeltaFor(node.clientWidth, direction) });
  }, []);

  return { rootRef, trackRef, ...edges, handleScroll: measure, pageBy };
};

export { useScrollStrip };
