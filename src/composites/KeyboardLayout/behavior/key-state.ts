/* @layer renderer-components @kind util */
import type { ShortcutState } from '../../../primitives';
import type { PlacedKey } from '../KeyboardLayout.type';

const keyState = (key: PlacedKey, lit: ReadonlySet<string>, down: ReadonlySet<string>): ShortcutState => {
  if (key.names.some((name) => down.has(name))) return 'pressed';
  return key.names.some((name) => lit.has(name)) ? 'lit' : 'idle';
};

export { keyState };
