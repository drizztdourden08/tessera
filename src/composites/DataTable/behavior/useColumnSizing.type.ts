/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GrowFallback } from './overflow-probe.type';
import type { TableColumn } from '../../../data/table/types';

interface UseColumnSizingInput {
  columns: readonly TableColumn[];
}

interface ColumnSizing {
  rootRef: RefObject<HTMLElement | null>;
  previewWidth: (path: string, width: number) => void;
  growFallback: GrowFallback;
  fitFallback: GrowFallback;
}

export type { ColumnSizing, UseColumnSizingInput };
