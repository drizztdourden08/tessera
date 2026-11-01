/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import { anchorShift } from './anchor-shift';
import type { GridHeights, LayoutRow } from './grid-layout.type';
import type { UseGridAnchorInput } from './useGridAnchor.type';

const useGridAnchor = (input: UseGridAnchorInput): void => {
  const { rootRef, rows, heights, onScroll } = input;
  const last = useRef<{ rows: readonly LayoutRow[]; heights: GridHeights } | null>(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    const before = last.current;
    last.current = { rows, heights };
    if (!root || !before || !heights.offsets) return;
    if (before.rows !== rows || before.heights.offsets === heights.offsets) return;
    const shift = anchorShift({ rows, before: before.heights, after: heights, scrollTop: root.scrollTop });
    if (shift === 0) return;
    root.scrollTop += shift;
    onScroll();
  });
};

export { useGridAnchor };
