/* @layer renderer-components @kind util */
import { MOUSE_SPECS } from '../../../primitives';
import { keyFace } from '../../../primitives/Shortcut/behavior/key-face';
import type { MouseButton, ShortcutKey } from '../../../primitives';

const tourLabel = (keys: readonly ShortcutKey[], mouse: MouseButton | undefined): string => {
  const names = keys.map((key) => keyFace(key, 'label').name);
  return (mouse ? [...names, MOUSE_SPECS[mouse].name] : names).join(' + ');
};

export { tourLabel };
