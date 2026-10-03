/* @layer renderer-components @kind logic */
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';
import { FUNCTION_KEY, MODIFIER_KEYS, NAMED_KEYS } from '../SettingsRow.constants';

const mainKey = (key: string): ShortcutKey | null => {
  const named = NAMED_KEYS[key];
  if (named !== undefined) return named;
  if (FUNCTION_KEY.test(key)) return key as ShortcutKey;
  return key.length === 1 ? key.toUpperCase() as ShortcutKey : null;
};

const keysOfEvent = (event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'>): ShortcutKey[] | null => {
  if (MODIFIER_KEYS.includes(event.key)) return null;
  const main = mainKey(event.key);
  if (main === null) return null;
  const held: [boolean, ShortcutKey][] = [[event.ctrlKey, 'ctrl'], [event.altKey, 'alt'], [event.shiftKey, 'shift'], [event.metaKey, 'cmd']];
  return [...held.filter(([down]) => down).map(([, key]) => key), main];
};

export { keysOfEvent };
