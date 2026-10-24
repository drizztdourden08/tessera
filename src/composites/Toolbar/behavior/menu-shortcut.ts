/* @layer renderer-components @kind util */
import type { LabelledShortcut, ShortcutKey } from '../../../primitives/Shortcut';
import type { ToolbarItemBase } from '../Toolbar.type';

const isLabelled = (entry: ShortcutKey | LabelledShortcut): entry is LabelledShortcut => typeof entry === 'object';

const isKey = (entry: ShortcutKey | LabelledShortcut): entry is ShortcutKey => typeof entry === 'string';

const menuShortcut = (shortcut: ToolbarItemBase['shortcut']): string | readonly ShortcutKey[] | undefined => {
  if (shortcut === undefined || typeof shortcut === 'string') return shortcut;
  const first = shortcut.find(isLabelled);
  return first === undefined ? shortcut.filter(isKey) : first.keys;
};

export { menuShortcut };
