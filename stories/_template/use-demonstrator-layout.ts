/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../src/primitives/dom/observe-resize';
import type { DemonstratorLayout, DemonstratorNeed } from './Demonstrator.type';
import { nextLayout } from './next-layout';
import { trackWidth } from './track-width';

const useDemonstratorLayout = (ref: RefObject<HTMLElement | null>): DemonstratorLayout => {
  const [layout, setLayout] = useState<DemonstratorLayout>('grid');
  const need = useRef<DemonstratorNeed>({ grid: 0, stacked: 0 });

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return undefined;
    const check = () => {
      const current = (grid.dataset.layout ?? 'grid') as DemonstratorLayout;
      const next = nextLayout(current, trackWidth(grid), grid.clientWidth + 1, need.current);
      if (next !== current) setLayout(next);
    };
    check();
    void grid.ownerDocument.fonts.ready.then(check);
    return observeResize([grid], check);
  }, [ref]);

  return layout;
};

export { useDemonstratorLayout };
