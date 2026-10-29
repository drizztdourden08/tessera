/* @layer renderer-components @kind util */
import { shortcutRows } from '../../../primitives/Shortcut';
import type { ShortcutKey } from '../../../primitives/Shortcut';
import type { ToolbarItemBase } from '../Toolbar.type';

const keyBadgeKeys = (shortcut: ToolbarItemBase['shortcut']): readonly ShortcutKey[] | undefined =>
  (shortcut === undefined ? undefined : shortcutRows(shortcut).find((row) => row.keys.length === 1)?.keys);

export { keyBadgeKeys };
