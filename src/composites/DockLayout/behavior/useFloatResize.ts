/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Rect } from '../DockLayout.type';
import type { FloatResizeParams, ResizeEdge } from './float-resize.type';
import { listenResize } from './listen-resize';
import { sameRect } from './same-rect';

const useFloatResize = (params: FloatResizeParams) => {
  const [live, setLive] = useState<Rect | null>(null);
  const detach = useRef<(() => void) | null>(null);
  const latest = useRef(params);
  latest.current = params;

  useEffect(() => () => detach.current?.(), []);

  const onPointerDown = useCallback((edge: ResizeEdge, e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0 || detach.current) return;
    e.preventDefault();
    e.stopPropagation();
    const { rect: start, bounds, min } = latest.current;
    const onDone = (rect: Rect | null): void => {
      detach.current = null;
      setLive(null);
      const { id, onEdit } = latest.current;
      if (rect && !sameRect(rect, start)) onEdit({ type: 'float-widget', id, rect });
    };
    detach.current = listenResize({
      handle: e.currentTarget, pointerId: e.pointerId, origin: { x: e.clientX, y: e.clientY }, edge, start, bounds, min, onLive: setLive, onDone,
    });
  }, []);

  return { live, onPointerDown };
};

export { useFloatResize };
