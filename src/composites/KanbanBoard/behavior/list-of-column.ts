/* @layer renderer-components @kind util */
import { LIST_ATTRIBUTE } from '../KanbanBoard.constants';

const listOfColumn = (board: HTMLElement | null, columnId: string): HTMLElement | null =>
  [...(board?.querySelectorAll<HTMLElement>(`[${LIST_ATTRIBUTE}]`) ?? [])].find((list) => list.getAttribute(LIST_ATTRIBUTE) === columnId) ?? null;

export { listOfColumn };
