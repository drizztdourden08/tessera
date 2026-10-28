/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';

const isSeparator = (item: ToolbarItem | undefined): boolean => item?.kind === 'separator';

const isPlainSeparator = (item: ToolbarItem | undefined): boolean => item?.kind === 'separator' && item.label === undefined;

const trimEnd = (items: readonly ToolbarItem[]): readonly ToolbarItem[] => (isSeparator(items.at(-1)) ? trimEnd(items.slice(0, -1)) : items);

const trimStart = (items: readonly ToolbarItem[]): readonly ToolbarItem[] => (isPlainSeparator(items[0]) ? trimStart(items.slice(1)) : items);

const tidySeparators = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
  trimStart(trimEnd(items.filter((item, index) => !(isPlainSeparator(item) && isSeparator(items[index - 1])))));

export { tidySeparators };
