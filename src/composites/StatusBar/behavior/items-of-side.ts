/* @layer renderer-components @kind logic */
import type { StatusBarAlign, StatusBarEntry } from '../StatusBar.type';

const itemsOfSide = (items: readonly StatusBarEntry[], side: StatusBarAlign): readonly StatusBarEntry[] =>
  items.filter((item) => (item.align ?? 'start') === side);

export { itemsOfSide };
