/* @layer renderer-components @kind types */
import type { PinMode } from '../Widget.type';

interface PinButtonProps {
  pin: PinMode;
  onTop: boolean;
  onChange: (mode: PinMode) => void;
}

export type { PinButtonProps };
