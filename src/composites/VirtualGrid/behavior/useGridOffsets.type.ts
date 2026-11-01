/* @layer renderer-components @kind types */
import type { GridLayout, GridOffsets } from './grid-layout.type';

interface UseGridOffsetsInput {
  enabled: boolean;
  layout: GridLayout;
  keyAt: (row: number) => string | undefined;
}

interface GridOffsetsModel {
  offsets: GridOffsets | undefined;
  record: (found: ReadonlyMap<string, number>) => void;
}

export type { GridOffsetsModel, UseGridOffsetsInput };
