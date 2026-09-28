/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';

interface GhostRowSample<T> {
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  limit: number;
}

export type { GhostRowSample };
