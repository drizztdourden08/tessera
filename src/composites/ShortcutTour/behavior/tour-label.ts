/* @layer renderer-components @kind util */
import { KEY_SPECS, MOUSE_SPECS } from '../../../primitives';
import type { KeyName, MouseButton, ShortcutKey } from '../../../primitives';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const spokenName = (key: ShortcutKey): string => (isKeyName(key) ? KEY_SPECS[key].name : key.toUpperCase());

const tourLabel = (keys: readonly ShortcutKey[], mouse: MouseButton | undefined): string => {
  const names = keys.map(spokenName);
  return (mouse ? [...names, MOUSE_SPECS[mouse].name] : names).join(' + ');
};

export { tourLabel };
