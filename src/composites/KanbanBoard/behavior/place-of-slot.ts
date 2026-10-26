/* @layer renderer-components @kind util */
import type { CardPlace } from '../KanbanBoard.type';

const placeOfSlot = (sizes: readonly number[], slot: number): CardPlace => {
  let start = 0;
  for (const [column, size] of sizes.entries()) {
    if (slot <= start + size) return { column, index: slot - start };
    start += size + 1;
  }
  const last = Math.max(sizes.length - 1, 0);
  return { column: last, index: sizes[last] ?? 0 };
};

export { placeOfSlot };
