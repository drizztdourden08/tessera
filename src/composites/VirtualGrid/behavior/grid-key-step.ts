/* @layer renderer-components @kind logic */
import type { ReorderKeyEvent } from '../../reorder';

const gridKeyStep = (event: ReorderKeyEvent, columns: number): number | undefined => {
  if (!event.altKey || event.ctrlKey || event.metaKey) return undefined;
  switch (event.key) {
    case 'ArrowLeft': return -1;
    case 'ArrowRight': return 1;
    case 'ArrowUp': return -Math.max(1, columns);
    case 'ArrowDown': return Math.max(1, columns);
    default: return undefined;
  }
};

export { gridKeyStep };
