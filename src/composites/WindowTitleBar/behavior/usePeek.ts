/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { PEEK_ZONE_PX } from '../WindowTitleBar.constants';

const usePeek = (tucked: boolean, barRef: RefObject<HTMLElement | null>) => {
  const [peeking, setPeeking] = useState(false);

  useEffect(() => {
    if (!tucked) {
      setPeeking(false);
      return undefined;
    }
    const view = barRef.current?.ownerDocument.defaultView ?? window;
    const onMove = (event: MouseEvent) => {
      const bar = barRef.current;
      if (bar?.contains(event.target as Node)) return;
      const top = bar?.parentElement?.getBoundingClientRect().top ?? 0;
      const depth = event.clientY - top;
      setPeeking(depth >= 0 && depth <= PEEK_ZONE_PX);
    };
    view.addEventListener('mousemove', onMove);
    return () => view.removeEventListener('mousemove', onMove);
  }, [tucked, barRef]);

  const handleMouseLeave = () => {
    if (tucked) setPeeking(false);
  };

  return { peeking, handleMouseLeave };
};

export { usePeek };
