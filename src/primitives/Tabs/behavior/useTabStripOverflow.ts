/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { NO_OVERFLOW } from './strip-geometry.constants';
import { edgesForMetrics } from './strip-geometry';
import { pageDeltaFor } from './page-delta-for';
import { sameEdges } from './same-edges';
import { wheelScrollDelta } from './wheel-scroll-delta';
import type { StripEdges, StripMetrics } from './strip-geometry.type';

const metricsOf = (node: HTMLElement): StripMetrics => ({
  scrollLeft: node.scrollLeft,
  scrollWidth: node.scrollWidth,
  clientWidth: node.clientWidth,
});

const useTabStripOverflow = (tabCount: number) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState<StripEdges>(NO_OVERFLOW);

  const measure = useCallback((): void => {
    const node = stripRef.current;
    if (!node) return;
    const next = edgesForMetrics(metricsOf(node));
    setEdges((prev) => (sameEdges(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    const node = stripRef.current;
    if (!node) return undefined;
    measure();
    return observeResize([node, ...node.children], measure);
  }, [measure, tabCount]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const handleWheel = (event: WheelEvent): void => {
      const node = stripRef.current;
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
    const node = stripRef.current;
    if (!node) return;
    node.scrollBy({ left: pageDeltaFor(node.clientWidth, direction) });
  }, []);

  const revealTab = useCallback((tab: HTMLElement): void => {
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, []);

  return {
    rootRef,
    stripRef,
    canScrollBack: edges.canScrollBack,
    canScrollForward: edges.canScrollForward,
    handleScroll: measure,
    pageBy,
    revealTab,
  };
};

export { useTabStripOverflow };
