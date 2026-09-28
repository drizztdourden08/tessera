/* @layer renderer-components @kind logic */
import { allStateOf } from './allStateOf';

const checkAllOf = (order: readonly string[], ids: ReadonlySet<string>): Set<string> => {
  if (allStateOf(order, ids) !== 'all') return new Set([...ids, ...order]);
  const shown = new Set(order);
  return new Set([...ids].filter((id) => !shown.has(id)));
};

export { checkAllOf };
