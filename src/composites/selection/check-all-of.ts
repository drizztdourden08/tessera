/* @layer renderer-components @kind logic */
import { allStateOf } from './all-state-of';

const checkAllOf = (order: readonly string[], keys: ReadonlySet<string>): Set<string> => {
  if (allStateOf(order, keys) !== 'all') return new Set([...keys, ...order]);
  const shown = new Set(order);
  return new Set([...keys].filter((key) => !shown.has(key)));
};

export { checkAllOf };
