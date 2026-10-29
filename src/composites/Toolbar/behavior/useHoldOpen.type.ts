/* @layer renderer-components @kind types */
import type { PointerEventHandler } from 'react';

interface HoldOpenParams {
  enabled: boolean;
  delay: number;
  onHold: () => void;
}

interface HoldHandlers {
  onPointerDown: PointerEventHandler<HTMLButtonElement>;
  onPointerUp: PointerEventHandler<HTMLButtonElement>;
  onPointerLeave: PointerEventHandler<HTMLButtonElement>;
  onPointerCancel: PointerEventHandler<HTMLButtonElement>;
}

interface HoldOpen {
  handlers: Partial<HoldHandlers>;
  consumed: () => boolean;
}

export type { HoldHandlers, HoldOpen, HoldOpenParams };
