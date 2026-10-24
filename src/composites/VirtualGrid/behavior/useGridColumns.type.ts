/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface GridColumnsInput {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  fallbackTile: number;
  refitKey: string;
  onColumns: (columns: number) => void;
}

export type { GridColumnsInput };
