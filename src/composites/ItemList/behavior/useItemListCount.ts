/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent } from 'react';
import type { ItemListProps } from '../ItemList.type';

const useItemListCount = (onCount: ItemListProps<unknown>['onCount'], shown: number, total: number) => {
  const report = useEffectEvent(() => onCount?.(shown, total));
  useEffect(() => {
    report();
  }, [shown, total]);
};

export { useItemListCount };
