/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../../../primitives/Shortcut';
import type { ShortcutKey } from '../../../primitives/Shortcut';

const keyLabel = (key: ShortcutKey): string => (Object.hasOwn(KEY_SPECS, key) ? KEY_SPECS[key as keyof typeof KEY_SPECS].name : key.toUpperCase());

const ariaKeyShortcuts = (keys: readonly ShortcutKey[]): string => keys.map(keyLabel).join('+');

export { ariaKeyShortcuts };
