/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { ROW_ITEMS } from '../ItemList.constants';
import { rowsCap } from './rows-cap';

const watched = (list: HTMLElement) => [list, list.querySelector(ROW_ITEMS)];

const useRowsCap = (listRef: RefObject<HTMLElement | null>, maxRows: number | undefined): number | undefined => {
  const [cap, setCap] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !maxRows) {
      setCap(undefined);
      return undefined;
    }
    const measure = () => setCap(rowsCap(list, maxRows));
    measure();
    let stop = observeResize(watched(list), measure);
    const changes = new MutationObserver(() => {
      measure();
      stop();
      stop = observeResize(watched(list), measure);
    });
    changes.observe(list, { childList: true, subtree: true });
    return () => {
      changes.disconnect();
      stop();
    };
  }, [listRef, maxRows]);
  return cap;
};

export { useRowsCap };
