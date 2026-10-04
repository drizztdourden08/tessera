/* @layer renderer-components @kind logic */
import { isletOutward } from './islet-outward';
import type { IsletId, IsletMove } from './pelago.type';

const outwardMoves = (by: number, extra: Omit<IsletMove, 'x' | 'y'> = {}): Record<IsletId, IsletMove> => {
  const move = (id: IsletId): IsletMove => {
    const [x, y] = isletOutward(id, by);
    return { x, y, ...extra };
  };
  return { a: move('a'), b: move('b'), c: move('c'), d: move('d') };
};

export { outwardMoves };
