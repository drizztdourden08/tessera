/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface Position {
  top: number;
  left: number;
}

interface UseColorPickerPopoverParams {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export type { Position, UseColorPickerPopoverParams };
