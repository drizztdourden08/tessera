/* @layer renderer-components @kind util */
import { ROW_ID } from '../ItemList.constants';

const rowElement = (list: HTMLElement | null, id: string): HTMLElement | null =>
  list?.querySelector<HTMLElement>(`[${ROW_ID}="${CSS.escape(id)}"]`) ?? null;

export { rowElement };
