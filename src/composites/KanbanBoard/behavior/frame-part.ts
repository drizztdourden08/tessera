/* @layer renderer-components @kind util */
import type { KanbanFramePart } from '../KanbanBoard.type';

const framePart = (place: number, length: number): KanbanFramePart => {
  if (length === 1) return 'only';
  if (place === 0) return 'first';
  return place === length - 1 ? 'last' : 'middle';
};

export { framePart };
