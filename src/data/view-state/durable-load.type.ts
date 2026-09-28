/* @layer renderer-components @kind types */
import type { SchemaLike } from '../schema/build-schema';
import type { TableColumn } from '../table/types';
import type { ViewSnapshot } from './snapshot';

interface LoadGuard {
  begin: () => number;
  cancel: () => void;
  markEdited: () => void;
  mayApply: (token: number) => boolean;
}

interface DurableLoadParams {
  guard: LoadGuard;
  load: () => Promise<ViewSnapshot | undefined>;
  schema: SchemaLike;
  fallbackColumns: readonly TableColumn[];
  fallbackGroupBy?: readonly string[];
  apply: (snapshot: ViewSnapshot) => void;
}

export type { LoadGuard, DurableLoadParams };
