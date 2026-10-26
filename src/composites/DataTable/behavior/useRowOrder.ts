/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { flattenRows } from './flatten-rows';
import { NO_KEYS } from './useRowOrder.constants';
import type { UseRowOrderInput, RowOrder } from './useRowOrder.type';

const useRowOrder = <T,>(input: UseRowOrderInput<T>): RowOrder => {
  const { enabled, items: windowed, nodes, isExpanded, getRowId } = input;

  const keys = useMemo(() => {
    if (!enabled) return NO_KEYS;
    const items = windowed ?? flattenRows({ nodes, isExpanded, getRowId });
    return items.flatMap((item) => (item.kind === 'row' ? [getRowId(item.row)] : []));
  }, [enabled, windowed, nodes, isExpanded, getRowId]);

  const positions = useMemo(() => new Map(keys.map((key, at) => [key, at])), [keys]);
  const indexOf = useCallback((id: string) => positions.get(id) ?? -1, [positions]);

  return { keys, indexOf };
};

export { useRowOrder };
