/* @layer renderer-components @kind logic */
import { bandOf } from './band-of';
import { changeRows } from './change-rows';

const fillBandAt = (row: number, height: number, x: number, y: number): number => {
  const k = changeRows(height).findIndex((edge) => row === edge - 1 || row === edge);
  if (k < 0) return bandOf(row, height);
  return (x + y) % 2 === 0 ? k : k + 1;
};

export { fillBandAt };
