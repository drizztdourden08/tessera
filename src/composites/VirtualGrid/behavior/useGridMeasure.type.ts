/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseGridMeasureInput {
  enabled: boolean;
  bodyRef: RefObject<HTMLElement | null>;
  drawn: string;
  keyAt: (row: number) => string | undefined;
  record: (found: ReadonlyMap<string, number>) => void;
}

export type { UseGridMeasureInput };
