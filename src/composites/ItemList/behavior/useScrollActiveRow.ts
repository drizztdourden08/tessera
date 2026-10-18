/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { rowElement } from './row-element';
import { scrollRowInto } from './scroll-row-into';

const useScrollActiveRow = (listRef: RefObject<HTMLElement | null>, selectedId: string | null | undefined, cap: number | undefined): void => {
  useLayoutEffect(() => {
    const list = listRef.current;
    const row = selectedId != null && cap !== undefined ? rowElement(list, selectedId) : null;
    if (list && row) scrollRowInto(list, row);
  }, [listRef, selectedId, cap]);
};

export { useScrollActiveRow };
