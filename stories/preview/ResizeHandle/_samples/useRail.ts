/* @layer stories @kind hook */
import { useLayoutEffect, useRef } from 'react';
import { useListWidth } from '../../../../src/composites/ListDetailLayout/behavior/useListWidth';
import type { ListWidthOptions } from '../../../../src/composites/ListDetailLayout/behavior/list-width.type';

const useRail = (options: ListWidthOptions) => {
  const railRef = useRef<HTMLElement>(null);
  const { width, handlers } = useListWidth(options);
  useLayoutEffect(() => {
    railRef.current?.style.setProperty('inline-size', `${width}px`);
  }, [width]);
  return { railRef, width, handlers };
};

export { useRail };
