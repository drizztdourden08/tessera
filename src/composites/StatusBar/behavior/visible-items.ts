/* @layer renderer-components @kind logic */
import { PRIORITY_MIN_WIDTH } from '../StatusBar.constants';
import type { StatusBarEntry } from '../StatusBar.type';
import { priorityTier } from './priority-tier';

const visibleItems = (items: readonly StatusBarEntry[], width: number): readonly StatusBarEntry[] =>
  items.filter((item) => item.priority === undefined || width >= PRIORITY_MIN_WIDTH[priorityTier(item.priority)]);

export { visibleItems };
