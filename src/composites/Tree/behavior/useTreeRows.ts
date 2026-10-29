/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { NO_SET } from '../Tree.constants';
import { flattenItems } from './flatten-items';
import { keptKeysOf } from './kept-keys-of';
import { useLazyLoad } from './useLazyLoad';
import { useTreeExpansion } from './useTreeExpansion';
import type { TreeRows, TreeRowsInput } from './useTreeRows.type';

const useTreeRows = <T,>(input: TreeRowsInput<T>): TreeRows<T> => {
  const { items, getKey, getChildren, isBranch, filter, loadingKeys = NO_SET, onLoadChildren } = input;
  const expansion = useTreeExpansion(input);
  const branchOf = useMemo(() => isBranch ?? ((item: T) => getChildren(item) !== undefined), [isBranch, getChildren]);
  const filtered = useMemo(() => (filter ? keptKeysOf(items, { getKey, getChildren, filter }) : null), [items, getKey, getChildren, filter]);
  const open = useMemo(
    () => (filtered && filtered.forced.size > 0 ? new Set([...expansion.open, ...filtered.forced]) : expansion.open),
    [expansion.open, filtered],
  );
  const kept = filtered ? filtered.kept : null;
  const rows = useMemo(
    () => flattenItems(items, { getKey, getChildren, isBranch: branchOf, open, loading: loadingKeys, kept }),
    [items, getKey, getChildren, branchOf, open, loadingKeys, kept],
  );
  const keys = useMemo(() => rows.map((row) => row.key), [rows]);
  const indexOfKey = useMemo(() => new Map(keys.map((key, at) => [key, at])), [keys]);
  useLazyLoad(rows, onLoadChildren);
  return { rows, keys, indexOfKey, expansion, filtering: filtered !== null };
};

export { useTreeRows };
