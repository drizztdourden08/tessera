/* @layer renderer-components @kind types */
import type { PinMode } from '../Widget.type';

interface PinMenuProps {
  pin: PinMode;
  onChange: (mode: PinMode) => void;
}

export type { PinMenuProps };
