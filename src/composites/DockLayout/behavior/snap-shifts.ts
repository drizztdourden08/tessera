/* @layer renderer-components @kind logic */
import type { SnapLine } from './snap.type';

const snapShifts = (edges: readonly number[], lines: readonly SnapLine[], distance: number): number[] =>
  edges
    .flatMap((edge) => lines.map((line) => line.at - edge))
    .filter((shift) => Math.abs(shift) <= distance)
    .sort((a, b) => Math.abs(a) - Math.abs(b));

export { snapShifts };
