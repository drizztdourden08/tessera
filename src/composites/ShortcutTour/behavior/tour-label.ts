/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../../../primitives/Shortcut';
import type { KeyName, KeysStrings, MouseButton, ShortcutKey } from '../../../primitives/Shortcut';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const spokenName = (key: ShortcutKey, names: KeysStrings): string => (isKeyName(key) ? names[key] : key.toUpperCase());

const tourLabel = (keys: readonly ShortcutKey[], mouse: MouseButton | undefined, names: KeysStrings): string => {
  const spoken = keys.map((key) => spokenName(key, names));
  return (mouse ? [...spoken, names[`mouse-${mouse}`]] : spoken).join(' + ');
};

export { tourLabel };
