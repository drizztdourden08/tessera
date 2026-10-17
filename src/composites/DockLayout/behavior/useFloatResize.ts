/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { resizeRect } from '../../rect-drag/resize-rect';
import type { ResizeEdge } from '../../rect-drag/rect-drag.type';
import { sameRect } from '../../rect-drag/same-rect';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import type { FloatResizeParams, LiveResize } from './float-resize.type';
import { snapResizeOf } from './snap-resize-of';

const useFloatResize = (params: FloatResizeParams) => {
  const drag = useRectDrag<LiveResize>();
  const latest = useRef(params);
  latest.current = params;
  const { begin } = drag;

  const onPointerDown = useCallback((edge: ResizeEdge, e: ReactPointerEvent<HTMLElement>) => {
    const { rect: start, bounds, min, snap } = latest.current;
    const snapTo = snapResizeOf(snap, edge, { bounds, min });
    begin(e, (delta) => snapTo(resizeRect(start, edge, delta, { bounds, min })), (last) => {
      const { id, onEdit } = latest.current;
      if (last && !sameRect(last.rect, start)) onEdit({ type: 'float-widget', id, rect: last.rect });
    });
  }, [begin]);

  return { live: drag.live, onPointerDown };
};

export { useFloatResize };
