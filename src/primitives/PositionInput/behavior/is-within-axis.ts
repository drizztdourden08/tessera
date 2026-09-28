/* @layer renderer-components @kind logic */
import type { PositionAxis } from '../PositionInput.type';

const isWithinAxis = (value: number, axis: PositionAxis = {}): boolean => {
  const { min, max } = axis;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};

export { isWithinAxis };
