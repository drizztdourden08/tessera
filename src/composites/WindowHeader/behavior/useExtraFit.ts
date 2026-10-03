/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { EXTRA_SELECTOR, TITLE_SELECTOR } from '../WindowHeader.constants';
import { extraFits } from './extra-fits';

const useExtraFit = (headerRef: RefObject<HTMLElement | null>, hasExtra: boolean): boolean => {
  const [fits, setFits] = useState(true);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header || !hasExtra) return undefined;
    const update = () => setFits(extraFits(header));
    update();
    const view = ownerWindowOf(header) as Window & typeof globalThis;
    if (typeof view.ResizeObserver === 'undefined') return undefined;
    const observer = new view.ResizeObserver(update);
    const parts = header.querySelectorAll<HTMLElement>(`${TITLE_SELECTOR}, ${EXTRA_SELECTOR}`);
    [header, ...parts].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headerRef, hasExtra]);

  return fits;
};

export { useExtraFit };
