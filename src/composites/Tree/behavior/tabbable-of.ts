/* @layer renderer-components @kind logic */
import { firstSelectedAt } from './first-selected-at';

const tabbableOf = (
  indices: readonly number[],
  activeAt: number | undefined,
  selected: ReadonlySet<string> | undefined,
  indexOfKey: ReadonlyMap<string, number>,
): number => {
  const base = activeAt ?? firstSelectedAt(selected, indexOfKey) ?? 0;
  return indices.includes(base) ? base : (indices[0] ?? 0);
};

export { tabbableOf };
