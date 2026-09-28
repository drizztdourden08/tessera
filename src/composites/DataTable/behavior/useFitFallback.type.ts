/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { TableColumn } from '../../../data/table/types';

interface UseFitFallbackInput {
  columns: readonly TableColumn[];
  rootRef: RefObject<HTMLElement | null>;
}

export type { UseFitFallbackInput };
