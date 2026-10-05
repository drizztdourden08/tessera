/* @layer renderer-components @kind logic */
import { clampIndex } from './clamp-index';
import type { TourMove, TourOutcome, TourPosition } from './tour-internal.type';

const stay = (at: TourPosition): TourOutcome => ({ ...at, finished: false });

const tourMove = (at: TourPosition, move: TourMove, total: number): TourOutcome => {
  if (total === 0) return { open: false, index: 0, finished: false };
  if (move.type === 'start') return { open: true, index: clampIndex(move.at, total), finished: false };
  if (move.type === 'close') return { ...at, open: false, finished: false };
  if (move.type === 'go') return { ...at, index: clampIndex(move.index, total), finished: false };
  if (!at.open) return stay(at);
  if (move.type === 'back') return { ...at, index: clampIndex(at.index - 1, total), finished: false };
  if (at.index >= total - 1) return { ...at, open: false, finished: true };
  return { ...at, index: at.index + 1, finished: false };
};

export { tourMove };
