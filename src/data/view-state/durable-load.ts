/* @layer renderer-components @kind logic */
import type { SchemaLike } from '../schema/build-schema';
import type { TableColumn } from '../table/types';
import type { FilterClause } from '../filter/clause';
import { prune } from './prune';
import type { ViewSnapshot } from './snapshot';
import { emptySnapshotFor } from './emptySnapshotFor';
import type { DurableLoadParams } from './durable-load.type';

const dedupeClauseIds = (clauses: readonly FilterClause[]): readonly FilterClause[] => {
  const seen = new Set<string>();
  return clauses.map((clause) => {
    if (!seen.has(clause.id)) {
      seen.add(clause.id);
      return clause;
    }
    const id = crypto.randomUUID();
    seen.add(id);
    return { ...clause, id };
  });
};

const restoreDurableSnapshot = (
  loaded: ViewSnapshot | undefined,
  schema: SchemaLike,
  fallbackColumns: readonly TableColumn[],
  fallbackGroupBy?: readonly string[],
): ViewSnapshot => {
  const base = loaded ?? emptySnapshotFor(fallbackColumns, fallbackGroupBy);
  const pruned = prune(base, schema, fallbackColumns);
  return { ...pruned, filters: dedupeClauseIds(pruned.filters) };
};

const beginDurableLoad = (params: DurableLoadParams): void => {
  const { guard, load, schema, fallbackColumns, fallbackGroupBy, apply } = params;
  const token = guard.begin();
  void load().then((loaded) => {
    if (!guard.mayApply(token)) return;
    apply(restoreDurableSnapshot(loaded, schema, fallbackColumns, fallbackGroupBy));
  });
};

export { beginDurableLoad };
