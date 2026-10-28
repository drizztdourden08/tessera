/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';

const isSeparator = (item: ToolbarItem | undefined): boolean => item?.kind === 'separator';

const trimEnd = (items: readonly ToolbarItem[]): readonly ToolbarItem[] => (isSeparator(items.at(-1)) ? trimEnd(items.slice(0, -1)) : items);

const trimStart = (items: readonly ToolbarItem[]): readonly ToolbarItem[] => (isSeparator(items[0]) ? trimStart(items.slice(1)) : items);

const tidySeparators = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
  trimStart(trimEnd(items.filter((item, index) => !(isSeparator(item) && isSeparator(items[index - 1])))));

export { tidySeparators };
