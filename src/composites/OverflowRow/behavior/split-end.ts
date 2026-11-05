/* @layer renderer-components @kind util */
import type { OverflowRowItem, OverflowRowSplit } from '../OverflowRow.type';

const splitEnd = (items: readonly OverflowRowItem[], shown: readonly OverflowRowItem[]): OverflowRowSplit => {
  const from = items.findIndex((item) => item.end === true);
  const endIds = from < 0 ? [] : items.slice(from).map((item) => item.id);
  return {
    start: shown.filter((item) => !endIds.includes(item.id)),
    end: shown.filter((item) => endIds.includes(item.id)),
  };
};

export { splitEnd };
