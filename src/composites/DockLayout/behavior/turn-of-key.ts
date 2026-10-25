/* @layer renderer-components @kind logic */
import { INWARD, OUTWARD } from './corner.constants';
import type { CornerHandle, CornerTurn } from './corner.type';

const turnOfKey = (key: string, handle: CornerHandle): CornerTurn | null => {
  if (key === OUTWARD[handle.along][handle.end]) return handle.take === null ? null : 'take';
  if (key === INWARD[handle.along][handle.end]) return handle.give === null ? null : 'give';
  return null;
};

export { turnOfKey };
