/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';

interface GhostRowsInput<T> {
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
}

export type { GhostRowsInput };
