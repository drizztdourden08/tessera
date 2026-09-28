/* @layer renderer-components @kind types */
import type { Dispatch, SetStateAction } from 'react';

interface UseTagKeyDownParams {
  value: readonly string[];
  onChange: (next: readonly string[]) => void;
  query: string;
  filtered: readonly string[];
  highlightIdx: number;
  setHighlightIdx: Dispatch<SetStateAction<number>>;
  commit: (raw: string) => void;
  commitTyped: () => void;
  popup: { handleOpen: () => void; handleClose: () => void };
}

export type { UseTagKeyDownParams };
