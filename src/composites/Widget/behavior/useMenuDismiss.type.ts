/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface MenuDismissParams {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export type { MenuDismissParams };
