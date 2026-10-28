/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { marqueeItemRects } from './marquee-item-rects';
import { startMarquee } from './marquee-session';
import { THRESHOLD } from './marquee.constants';
import { modifiersOf } from './modifiers-of';
import { startsOnBackground } from './starts-on-background';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Rect } from '../rect-drag/rect-drag.type';
import type { MarqueeCellRect, MarqueeOptions, MarqueeSelect } from './marquee.type';

const useMarqueeSelect = (options: MarqueeOptions): MarqueeSelect => {
  const [rect, setRect] = useState<Rect | null>(null);
  const [cells, setCells] = useState<MarqueeCellRect | null>(null);
  const latest = useRef(options);
  const stop = useRef<(() => void) | null>(null);

  useEffect(() => {
    latest.current = options;
  });
  useEffect(() => () => stop.current?.(), []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const current = latest.current;
    const container = current.containerRef.current;
    if (!container || current.enabled === false || event.button !== 0 || stop.current) return;
    const canStart = current.canStart ?? startsOnBackground(current.itemSelector);
    if (!canStart(event)) return;
    const selector = current.itemSelector ?? '';
    stop.current = startMarquee({
      container,
      pointerId: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      modifiers: modifiersOf(event),
      base: current.selected,
      rectsOf: () => current.getRects?.() ?? marqueeItemRects(container, selector),
      threshold: current.threshold ?? THRESHOLD,
      autoScroll: current.autoScroll ?? true,
      onRect: setRect,
      onCells: setCells,
      onSelect: (keys) => latest.current.onChange(keys),
      onEnd: () => { stop.current = null; },
    });
  }, []);

  return { rect, cells, bind: { onPointerDown } };
};

export { useMarqueeSelect };
