/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { FreshClick } from './typed-segment.type';

const useFreshClick = <E extends HTMLElement>(): FreshClick<E> => {
  const fresh = useRef(false);

  const handleMouseDown = useCallback((event: MouseEvent<E>) => {
    fresh.current = event.currentTarget.ownerDocument.activeElement !== event.currentTarget;
  }, []);

  const takeFresh = useCallback(() => {
    const was = fresh.current;
    fresh.current = false;
    return was;
  }, []);

  return { handleMouseDown, takeFresh };
};

export { useFreshClick };
