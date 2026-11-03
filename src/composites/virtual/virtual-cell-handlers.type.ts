/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, PointerEvent as ReactPointerEvent } from 'react';

interface VirtualCellHandlers {
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLElement>) => void;
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerCancel?: () => void;
}

export type { VirtualCellHandlers };
