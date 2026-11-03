/* @layer renderer-components @kind logic */
import type { ReorderKeyEvent } from '../../reorder';
import type { VirtualAxis } from '../../virtual';

const listKeyStep = (event: ReorderKeyEvent, axis: VirtualAxis): -1 | 1 | undefined => {
  if (!event.altKey || event.ctrlKey || event.metaKey) return undefined;
  const [before, after] = axis === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
  if (event.key === before) return -1;
  return event.key === after ? 1 : undefined;
};

export { listKeyStep };
