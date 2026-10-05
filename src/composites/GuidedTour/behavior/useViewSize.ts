/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { TourSize } from './tour-internal.type';

const useViewSize = (root: HTMLElement | null): TourSize => {
  const [size, setSize] = useState<TourSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!root) return undefined;
    const view = ownerWindowOf(root);
    const read = (): void => setSize({ width: view.innerWidth, height: view.innerHeight });
    read();
    view.addEventListener('resize', read);
    return () => view.removeEventListener('resize', read);
  }, [root]);

  return size;
};

export { useViewSize };
