/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { PointerEvent } from 'react';
import { pointerFraction } from './pointer-fraction';

const useSeekHover = () => {
  const [hover, setHover] = useState<number | null>(null);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    setHover(pointerFraction(event.clientX, event.currentTarget.getBoundingClientRect()));
  }, []);

  const handlePointerLeave = useCallback(() => setHover(null), []);

  return { hover, handlePointerMove, handlePointerLeave };
};

export { useSeekHover };
