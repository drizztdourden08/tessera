/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';
import { tidySeparators } from './tidy-separators';

const visibleItems = (items: readonly ToolbarItem[], hidden: readonly string[] | undefined): readonly ToolbarItem[] => {
  if (hidden === undefined || hidden.length === 0) return items;
  const shown = items.filter((item) => !hidden.includes(item.id));
  return shown.length === items.length ? items : tidySeparators(shown);
};

export { visibleItems };
