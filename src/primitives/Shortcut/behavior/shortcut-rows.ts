/* @layer renderer-components @kind util */
import { shortcutKeys } from './shortcut-keys';
import type { LabelledShortcut, ShortcutRow, ShortcutSpec } from '../Shortcut.type';

const isLabelled = (spec: ShortcutSpec): spec is readonly LabelledShortcut[] =>
  typeof spec !== 'string' && spec.some((entry) => typeof entry === 'object');

const shortcutRows = (spec: ShortcutSpec): readonly ShortcutRow[] => {
  if (isLabelled(spec)) return spec.map((entry) => ({ label: entry.label, keys: shortcutKeys(entry.keys) }));
  return [{ keys: shortcutKeys(spec) }];
};

export { shortcutRows };
