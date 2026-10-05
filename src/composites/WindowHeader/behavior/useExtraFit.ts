/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { EXTRA_SELECTOR, TITLE_SELECTOR } from '../WindowHeader.constants';
import { extraFits } from './extra-fits';

const useExtraFit = (headerRef: RefObject<HTMLElement | null>, hasExtra: boolean): boolean => {
  const [fits, setFits] = useState(true);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header || !hasExtra) return undefined;
    const update = () => setFits(extraFits(header));
    update();
    const parts = header.querySelectorAll<HTMLElement>(`${TITLE_SELECTOR}, ${EXTRA_SELECTOR}`);
    return observeResize([header, ...parts], update);
  }, [headerRef, hasExtra]);

  return fits;
};

export { useExtraFit };
