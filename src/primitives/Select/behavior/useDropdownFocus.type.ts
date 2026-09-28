/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseDropdownFocusParams {
  open: boolean;
  searchable: boolean;
  highlightIdx: number;
  searchRef: RefObject<HTMLInputElement | null>;
  contentRef: RefObject<HTMLElement | null>;
}

export type { UseDropdownFocusParams };
