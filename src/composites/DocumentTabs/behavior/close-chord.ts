/* @layer renderer-components @kind util */
import type { ReorderKeyEvent } from '../../reorder/reorder.type';

const closeChord = (event: ReorderKeyEvent & { shiftKey: boolean }): boolean => {
  if (event.altKey || event.metaKey || event.shiftKey) return false;
  if (event.ctrlKey) return event.key.toLowerCase() === 'w';
  return event.key === 'Delete';
};

export { closeChord };
