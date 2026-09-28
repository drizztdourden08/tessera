/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseDismissListenersParams {
  open: boolean;
  onClose: () => void;
  contentRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
}

export type { UseDismissListenersParams };
