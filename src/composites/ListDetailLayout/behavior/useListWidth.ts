/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { usePaneSize } from '../../ResizeHandle/behavior/usePaneSize';
import type { PaneSize, PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

const useListWidth = (width: PaneSizeOptions): PaneSize => {
  const pane = usePaneSize(width);
  const { initial } = width;
  const { reset } = pane;
  const seen = useRef(initial);
  useEffect(() => {
    if (seen.current === initial) return;
    seen.current = initial;
    reset();
  }, [initial, reset]);
  return pane;
};

export { useListWidth };
