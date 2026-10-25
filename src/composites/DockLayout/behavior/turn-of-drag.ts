/* @layer renderer-components @kind logic */
import type { CornerHandle, CornerTurn } from './corner.type';

const turnOfDrag = (outward: number, handle: CornerHandle): CornerTurn | null => {
  if (handle.take !== null && outward > handle.take / 2) return 'take';
  if (handle.give !== null && -outward > handle.give / 2) return 'give';
  return null;
};

export { turnOfDrag };
