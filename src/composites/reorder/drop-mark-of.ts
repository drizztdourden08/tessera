/* @layer renderer-components @kind util */
import { finalIndex } from './final-index';
import type { ReorderDragState, ReorderDrop } from './reorder.type';

const dropMarkOf = (drag: ReorderDragState | null, index: number, total: number): ReorderDrop | undefined => {
  if (!drag || finalIndex(drag) === drag.from) return undefined;
  if (index === drag.before) return 'before';
  return drag.before === total && index === total - 1 ? 'after' : undefined;
};

export { dropMarkOf };
