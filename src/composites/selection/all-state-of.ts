/* @layer renderer-components @kind logic */
import type { SelectAllState } from './selection.type';

const allStateOf = (order: readonly string[], keys: ReadonlySet<string>): SelectAllState => {
  const picked = order.filter((key) => keys.has(key)).length;
  if (picked === 0) return 'none';
  return picked === order.length ? 'all' : 'some';
};

export { allStateOf };
