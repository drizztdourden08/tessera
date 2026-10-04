/* @layer renderer-components @kind logic */
import type { IsletId, IsletMove } from './pelago.type';

const isletEach = (move: (id: IsletId, i: number) => IsletMove): Record<IsletId, IsletMove> =>
  ({ a: move('a', 0), b: move('b', 1), c: move('c', 2), d: move('d', 3) });

export { isletEach };
