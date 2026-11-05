/* @layer renderer-components @kind util */
import type { OverflowRowItem } from '../OverflowRow.type';

const itemClass = (item: OverflowRowItem, firstEnd: boolean): string | undefined => {
  const names = [firstEnd && 'overflow-row__end', item.shrink === true && 'overflow-row__shrink'].filter(Boolean);
  return names.length > 0 ? names.join(' ') : undefined;
};

export { itemClass };
