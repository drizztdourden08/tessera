/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../../../primitives/Shortcut';
import type { KeyName, ShortcutKey } from '../../../primitives/Shortcut';
import { ARIA_KEY_NAMES } from './aria-key-shortcuts.constants';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const keyLabel = (key: ShortcutKey): string => (isKeyName(key) ? ARIA_KEY_NAMES[key] : key.toUpperCase());

const ariaKeyShortcuts = (keys: readonly ShortcutKey[]): string => keys.map(keyLabel).join('+');

export { ariaKeyShortcuts };
