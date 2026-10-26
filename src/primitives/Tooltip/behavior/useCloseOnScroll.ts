/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';

const useCloseOnScroll = (active: boolean, anchorRef: RefObject<HTMLElement | null>, onScroll: () => void): void => {
  const latest = useRef(onScroll);
  latest.current = onScroll;

  useEffect(() => {
    if (!active) return;
    const doc = ownerDocumentOf(anchorRef.current);
    const scrolled = () => latest.current();
    doc.addEventListener('scroll', scrolled, true);
    return () => doc.removeEventListener('scroll', scrolled, true);
  }, [active, anchorRef]);
};

export { useCloseOnScroll };
