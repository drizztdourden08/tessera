/* @layer stories @kind logic */
import { CHARACTER_KEYS, FUNCTION_KEY_COUNT, KEY_SPECS, LETTER_KEYS } from '../../../src/primitives';
import type { ShortcutKey } from '../../../src/primitives';

const shortcutKey = (word: string): ShortcutKey | null => {
  const lower = word.toLowerCase();
  if (lower in KEY_SPECS) return lower as ShortcutKey;
  if (word.length === 1 && (LETTER_KEYS.includes(word.toUpperCase()) || CHARACTER_KEYS.includes(word))) return word as ShortcutKey;
  const fn = /^f(\d{1,2})$/.exec(lower)?.[1];
  if (fn !== undefined && Number(fn) >= 1 && Number(fn) <= FUNCTION_KEY_COUNT) return `F${Number(fn)}` as ShortcutKey;
  return null;
};

const shortcutKeys = (combo: string): ShortcutKey[] | null => {
  const words = combo.length === 1 ? [combo] : combo.split('+').map((word) => word.trim());
  const keys = words.map(shortcutKey);
  return keys.every((key) => key !== null) ? keys : null;
};

export { shortcutKeys };
