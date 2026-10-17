/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { listenDrag } from './listen-drag';
import type { Point, RectDrag } from './rect-drag.type';

const useRectDrag = <T>(): RectDrag<T> => {
  const [live, setLive] = useState<T | null>(null);
  const detach = useRef<(() => void) | null>(null);

  useEffect(() => () => detach.current?.(), []);

  const begin = useCallback((e: ReactPointerEvent<HTMLElement>, frame: (delta: Point) => T, onDone: (last: T | null) => void) => {
    if (e.button !== 0 || detach.current) return;
    e.preventDefault();
    e.stopPropagation();
    detach.current = listenDrag<T>({
      handle: e.currentTarget, pointerId: e.pointerId, origin: { x: e.clientX, y: e.clientY }, frame, onLive: setLive,
      onDone: (last) => {
        detach.current = null;
        setLive(null);
        onDone(last);
      },
    });
  }, []);

  return { live, begin };
};

export { useRectDrag };
