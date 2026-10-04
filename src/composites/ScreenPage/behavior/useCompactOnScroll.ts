/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { COMPACT_AFTER, EXPAND_AT, HEADER_GAIN } from '../ScreenPage.constants';

const nextCompact = (body: HTMLElement, compact: boolean): boolean => {
  if (compact) return body.scrollTop > EXPAND_AT;
  const room = body.scrollHeight - body.clientHeight;
  return body.scrollTop > COMPACT_AFTER && room > HEADER_GAIN + COMPACT_AFTER;
};

const useCompactOnScroll = (bodyRef: RefObject<HTMLElement | null>): boolean => {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return undefined;
    const update = () => setCompact((was) => nextCompact(body, was));
    update();
    body.addEventListener('scroll', update, { passive: true });
    return () => body.removeEventListener('scroll', update);
  }, [bodyRef]);
  return compact;
};

export { useCompactOnScroll };
