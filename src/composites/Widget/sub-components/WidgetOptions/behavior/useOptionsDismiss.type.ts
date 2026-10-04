/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface OptionsDismissParams {
  panelRef: RefObject<HTMLElement | null>;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export type { OptionsDismissParams };
