/* @layer renderer-components @kind logic */
import type { FilterClause } from './clause.type';

const createClause = (path: string, op: string, value: unknown = null): FilterClause => ({
  id: crypto.randomUUID(), path, op, value, enabled: true,
});

export { createClause };
