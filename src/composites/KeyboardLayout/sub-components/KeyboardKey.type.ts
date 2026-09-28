/* @layer renderer-components @kind types */
import type { KeyState, PlacedKey } from '../KeyboardLayout.type';

interface KeyboardKeyProps {
  placed: PlacedKey;
  state: KeyState;
}

export type { KeyboardKeyProps };
