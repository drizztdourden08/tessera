/* @layer renderer-components @kind types */
import type { ShortcutState } from '../../../primitives';
import type { PlacedKey } from '../KeyboardLayout.type';

interface KeyboardKeyProps {
  placed: PlacedKey;
  state: ShortcutState;
}

export type { KeyboardKeyProps };
