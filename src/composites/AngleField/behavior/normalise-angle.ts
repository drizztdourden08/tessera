/* @layer renderer-components @kind util */
import { FULL_TURN } from '../AngleField.constants';

const normaliseAngle = (degrees: number): number => {
  if (!Number.isFinite(degrees)) return 0;
  const turned = ((degrees % FULL_TURN) + FULL_TURN) % FULL_TURN;
  return Number(turned.toFixed(6));
};

export { normaliseAngle };
