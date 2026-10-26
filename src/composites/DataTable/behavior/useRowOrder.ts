/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { flattenRows } from './flatten-rows';
import { itemGroups } from './item-groups';
import { NO_GROUPS, NO_KEYS } from './useRowOrder.constants';
import type { UseRowOrderInput, RowOrder } from './useRowOrder.type';

const useRowOrder = <T,>(input: UseRowOrderInput<T>): RowOrder => {
  const { enabled, items: windowed, nodes, isExpanded, getRowId } = input;

  const { keys, groups } = useMemo(() => {
    if (!enabled) return { keys: NO_KEYS, groups: NO_GROUPS };
    const items = windowed ?? flattenRows({ nodes, isExpanded, getRowId });
    const grouped = itemGroups(items);
    const rows = items.flatMap((item, at) => (item.kind === 'row' ? [{ id: getRowId(item.row), group: grouped[at] }] : []));
    return { keys: rows.map((row) => row.id), groups: rows.map((row) => row.group) };
  }, [enabled, windowed, nodes, isExpanded, getRowId]);

  const positions = useMemo(() => new Map(keys.map((key, at) => [key, at])), [keys]);
  const indexOf = useCallback((id: string) => positions.get(id) ?? -1, [positions]);

  return { keys, groups, indexOf };
};

export { useRowOrder };
