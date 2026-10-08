/* @layer stories @kind hook */
import { useLayoutEffect, useRef } from 'react';
import { usePaneSize } from '../../../src/composites';
import type { PaneSizeOptions } from '../../../src/composites';

const useRailSize = (options: PaneSizeOptions, property: 'inline-size' | 'block-size' = 'inline-size') => {
  const railRef = useRef<HTMLElement>(null);
  const pane = usePaneSize(options);
  useLayoutEffect(() => {
    railRef.current?.style.setProperty(property, `${pane.size}px`);
  }, [pane.size, property]);
  return { railRef, ...pane };
};

export { useRailSize };
