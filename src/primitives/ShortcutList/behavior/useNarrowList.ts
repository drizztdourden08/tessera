/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';
import { COLUMN_GAP, MIN_DESCRIPTION_WIDTH } from '../ShortcutList.constants';
import { widestKeys } from './widest-keys';

const useNarrowList = (ref: RefObject<HTMLElement | null>): boolean => {
  const [narrow, setNarrow] = useState(false);
  useLayoutEffect(() => {
    const list = ref.current;
    if (!list) return undefined;
    const view = ownerWindowOf(list) as Window & typeof globalThis;
    const check = (): void => setNarrow(list.getBoundingClientRect().width - widestKeys(list) - COLUMN_GAP < MIN_DESCRIPTION_WIDTH);
    check();
    const observer = new view.ResizeObserver(check);
    observer.observe(list);
    return () => observer.disconnect();
  }, [ref]);
  return narrow;
};

export { useNarrowList };
