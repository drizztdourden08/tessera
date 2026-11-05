/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { FoldParams } from '../OverflowRow.type';
import { measureRow } from './measure-row';
import { SEPARATOR } from './useOverflowFold.constants';

const useOverflowFold = (params: FoldParams): readonly string[] => {
  const { rowRef, measureRef, items } = params;
  const [folded, setFolded] = useState<readonly string[]>([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const key = items.map((item) => `${item.id}:${item.priority ?? ''}:${item.pinned ? 1 : 0}`).join(SEPARATOR);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return undefined;
    const update = () => {
      const next = measureRow(row, measure, itemsRef.current);
      setFolded((current) => (current.join(SEPARATOR) === next.join(SEPARATOR) ? current : next));
    };
    update();
    return observeResize([row, measure], update);
  }, [rowRef, measureRef, key]);

  return folded;
};

export { useOverflowFold };
