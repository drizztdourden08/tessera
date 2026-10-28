/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface HoverOpenParams {
  open: boolean;
  byHover: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onOpen: () => void;
  onClose: () => void;
  enabled?: boolean;
  delay?: number;
}

export type { HoverOpenParams };
