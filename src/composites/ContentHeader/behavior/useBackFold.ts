/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { BACK_CLASS } from '../ContentHeader.constants';
import type { BackAction } from '../../../primitives/action-data';
import { backFits } from './back-fits';

const useBackFold = (headerRef: RefObject<HTMLElement | null>, back: BackAction | undefined): boolean => {
  const label = back === undefined ? null : back.label ?? '';
  const [folded, setFolded] = useState(false);
  const foldedRef = useRef(false);
  const fullRef = useRef(0);

  useLayoutEffect(() => {
    const header = headerRef.current;
    fullRef.current = 0;
    foldedRef.current = false;
    setFolded(false);
    if (!header || label === null) return undefined;
    const update = () => {
      const back = header.querySelector<HTMLElement>(`.${BACK_CLASS}`);
      if (back && !foldedRef.current) fullRef.current = back.offsetWidth;
      const next = !backFits(header, fullRef.current);
      if (next === foldedRef.current) return;
      foldedRef.current = next;
      setFolded(next);
    };
    update();
    return observeResize([header, ...header.children], update);
  }, [headerRef, label]);

  return folded;
};

export { useBackFold };
