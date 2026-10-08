/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface Position {
  anchorTop: number;
  top: number;
  left: number;
  width: number;
  dropUp: boolean;
}

type Correction = Pick<Position, 'top' | 'left'>;

interface UseColorPickerPopoverParams {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export type { Correction, Position, UseColorPickerPopoverParams };
