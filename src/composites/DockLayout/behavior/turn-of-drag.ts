/* @layer renderer-components @kind logic */
import type { CornerHandle, CornerTurn } from './corner.type';

const turnOfDrag = (outward: number, reach: Pick<CornerHandle, 'take' | 'give'>): CornerTurn | null => {
  if (reach.take !== null && outward > reach.take / 2) return 'take';
  if (reach.give !== null && -outward > reach.give / 2) return 'give';
  return null;
};

export { turnOfDrag };
