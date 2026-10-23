/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { itemOfKey } from '../../reorder/item-of-key';

const useKeepInView = (trackRef: RefObject<HTMLElement | null>, activeId: string | undefined): void => {
  useEffect(() => {
    if (activeId === undefined) return;
    itemOfKey(trackRef.current, activeId)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [trackRef, activeId]);
};

export { useKeepInView };
