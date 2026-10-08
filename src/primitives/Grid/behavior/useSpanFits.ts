/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { twoColumnsFit } from './two-columns-fit';

const useSpanFits = (cellRef: RefObject<HTMLElement | null>, wanted: boolean): boolean => {
  const [fits, setFits] = useState(false);
  useLayoutEffect(() => {
    const grid = cellRef.current?.parentElement;
    if (!wanted || !grid) return undefined;
    const check = () => setFits(twoColumnsFit(grid));
    check();
    return observeResize([grid], check);
  }, [cellRef, wanted]);
  return wanted && fits;
};

export { useSpanFits };
