/* @layer renderer-components @kind logic */
import type { SelectAllState } from '../DataTable.type';

const allStateOf = (order: readonly string[], ids: ReadonlySet<string>): SelectAllState => {
  const picked = order.filter((id) => ids.has(id)).length;
  if (picked === 0) return 'none';
  return picked === order.length ? 'all' : 'some';
};

export { allStateOf };
