/* @layer renderer-components @kind hook */
import { useRowOrder } from './useRowOrder';
import { useRowRects } from './useRowRects';
import { useRowReorder } from './useRowReorder';
import type { UseRowFeaturesInput, RowFeatures } from './useRowFeatures.type';

const useRowFeatures = <T,>(input: UseRowFeaturesInput<T>): RowFeatures => {
  const { onRowMove, virtual, rootRef, nodes, isExpanded, getRowId } = input;
  const { getRects, getFlat } = useRowRects({ rootRef, virtual, nodes, isExpanded, getRowId });
  const order = useRowOrder({
    enabled: onRowMove !== undefined, items: virtual ? virtual.items : null, nodes, isExpanded, getRowId,
  });
  const reorder = useRowReorder({
    onRowMove, order, rootRef, listRef: virtual ? virtual.bodyRef : rootRef, getFlat,
  });
  return { getRects, reorder };
};

export { useRowFeatures };
