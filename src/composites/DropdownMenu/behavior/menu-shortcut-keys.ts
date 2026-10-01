/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../../../primitives/Shortcut';
import { SHORTCUT_ALIASES, SHORTCUT_JOINER } from './menu-shortcut-keys.constants';
import type { ShortcutKey } from '../../../primitives/Shortcut';

const toKey = (part: string): ShortcutKey => {
  const lower = part.toLowerCase();
  if (Object.hasOwn(KEY_SPECS, lower)) return lower as ShortcutKey;
  return SHORTCUT_ALIASES[lower] ?? (part as ShortcutKey);
};

const menuShortcutKeys = (shortcut: string | readonly ShortcutKey[]): readonly ShortcutKey[] => {
  if (typeof shortcut !== 'string') return shortcut;
  return shortcut.split(SHORTCUT_JOINER).map((part) => part.trim()).filter((part) => part !== '').map(toKey);
};

export { menuShortcutKeys };
