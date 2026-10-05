/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { COLUMN_GAP, MIN_DESCRIPTION_WIDTH } from '../ShortcutList.constants';
import { widestKeys } from './widest-keys';

const useNarrowList = (ref: RefObject<HTMLElement | null>): boolean => {
  const [narrow, setNarrow] = useState(false);
  useLayoutEffect(() => {
    const list = ref.current;
    if (!list) return undefined;
    const check = (): void => setNarrow(list.getBoundingClientRect().width - widestKeys(list) - COLUMN_GAP < MIN_DESCRIPTION_WIDTH);
    check();
    return observeResize([list], check);
  }, [ref]);
  return narrow;
};

export { useNarrowList };
