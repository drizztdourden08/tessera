/* @layer renderer-components @kind types */
import type { SelectionCell } from '../../selection';

interface GridKeys {
  order: readonly string[];
  cells: ReadonlyMap<string, SelectionCell>;
}

export type { GridKeys };
