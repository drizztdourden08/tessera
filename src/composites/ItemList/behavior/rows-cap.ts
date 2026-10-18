/* @layer renderer-components @kind util */
import { ROW_ITEMS } from '../ItemList.constants';

const rowsCap = (list: HTMLElement, maxRows: number): number | undefined => {
  const rows = list.querySelectorAll<HTMLElement>(ROW_ITEMS);
  const last = rows[maxRows - 1];
  if (rows.length <= maxRows || !last) return undefined;
  return Math.ceil(last.getBoundingClientRect().bottom - list.getBoundingClientRect().top + list.scrollTop);
};

export { rowsCap };
