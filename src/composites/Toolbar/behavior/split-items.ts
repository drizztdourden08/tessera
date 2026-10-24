/* @layer renderer-components @kind util */
import type { ToolbarItem, ToolbarSplit } from '../Toolbar.type';

const isSeparator = (item: ToolbarItem | undefined): boolean => item?.kind === 'separator';

const trimEnd = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
  (isSeparator(items.at(-1)) ? trimEnd(items.slice(0, -1)) : items);

const trimStart = (items: readonly ToolbarItem[]): readonly ToolbarItem[] =>
  (isSeparator(items[0]) ? trimStart(items.slice(1)) : items);

const splitItems = (items: readonly ToolbarItem[], fit: number): ToolbarSplit => {
  const count = Math.max(0, Math.min(items.length, fit));
  if (count >= items.length) return { shown: items, folded: [] };
  return { shown: trimEnd(items.slice(0, count)), folded: trimStart(items.slice(count)) };
};

export { splitItems };
