/* @layer renderer-components @kind util */
import type { ToolbarItem, ToolbarSplit } from '../Toolbar.type';
import { itemPriorities } from './item-priorities';
import { itemUnits } from './item-units';
import { tidySeparators } from './tidy-separators';

const keptIndices = (items: readonly ToolbarItem[], count: number): ReadonlySet<number> => {
  const priorities = itemPriorities(items);
  const priorityOf = (unit: readonly number[]): number => priorities[unit[0] ?? 0] ?? 0;
  const units = itemUnits(items).sort((left, right) => priorityOf(right) - priorityOf(left) || (left[0] ?? 0) - (right[0] ?? 0));
  const kept = new Set<number>();
  for (const unit of units) {
    if (kept.size + unit.length > count) break;
    for (const index of unit) kept.add(index);
  }
  return kept;
};

const splitItems = (items: readonly ToolbarItem[], fit: number): ToolbarSplit => {
  const count = Math.max(0, Math.min(items.length, fit));
  if (count >= items.length) return { shown: items, folded: [] };
  const kept = keptIndices(items, count);
  return {
    shown: tidySeparators(items.filter((_item, index) => kept.has(index))),
    folded: tidySeparators(items.filter((_item, index) => !kept.has(index))),
  };
};

export { splitItems };
