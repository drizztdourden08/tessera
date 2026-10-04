/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { COMPACT_AFTER } from '../ScreenPage.constants';

const useCompactOnScroll = (bodyRef: RefObject<HTMLElement | null>): boolean => {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return undefined;
    const update = () => setCompact(body.scrollTop > COMPACT_AFTER);
    update();
    body.addEventListener('scroll', update, { passive: true });
    return () => body.removeEventListener('scroll', update);
  }, [bodyRef]);
  return compact;
};

export { useCompactOnScroll };
