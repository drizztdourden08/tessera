/* @layer renderer-components @kind util */
import { CHARACTER_KEYS, KEY_SPECS, LETTER_KEYS } from '../../../primitives/Shortcut';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { FUNCTION_KEY, PLATFORM_MOD, SHORTCUT_ALIASES, SHORTCUT_JOINER } from './menu-shortcut-keys.constants';
import { platformModKey } from './platform-mod-key';
import type { ShortcutKey } from '../../../primitives/Shortcut';

const isPrintable = (part: string): boolean =>
  part.length === 1 && (LETTER_KEYS.includes(part.toUpperCase()) || CHARACTER_KEYS.includes(part));

const toKey = (part: string): ShortcutKey | undefined => {
  const lower = part.toLowerCase();
  if (lower === PLATFORM_MOD) return platformModKey();
  if (Object.hasOwn(KEY_SPECS, lower)) return lower as ShortcutKey;
  const alias = SHORTCUT_ALIASES[lower];
  if (alias) return alias;
  if (FUNCTION_KEY.test(part)) return part.toUpperCase() as ShortcutKey;
  if (isPrintable(part)) return part.toUpperCase() as ShortcutKey;
  devWarn(`Menu shortcut part "${part}" is not a known key, so it is left out.`);
  return undefined;
};

const menuShortcutKeys = (shortcut: string | readonly ShortcutKey[]): readonly ShortcutKey[] => {
  if (typeof shortcut !== 'string') return shortcut;
  return shortcut.split(SHORTCUT_JOINER).map((part) => part.trim()).filter((part) => part !== '')
    .flatMap((part) => toKey(part) ?? []);
};

export { menuShortcutKeys };
