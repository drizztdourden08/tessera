/* @layer renderer-components @kind types */
import type { LayoutRow } from './grid-layout.type';

interface UseGridRowHeightsInput {
  enabled: boolean;
  rows: readonly LayoutRow[];
  keyAt: (row: number) => string | undefined;
}

interface GridRowHeights {
  known: ReadonlyMap<string, number>;
  record: (found: ReadonlyMap<string, number>) => void;
}

export type { GridRowHeights, UseGridRowHeightsInput };
