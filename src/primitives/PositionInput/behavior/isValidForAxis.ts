/* @layer renderer-components @kind logic */
import { isWithinAxis } from './isWithinAxis';
import type { PositionAxis } from '../PositionInput.type';

const isValidForAxis = (value: number, axis: PositionAxis = {}): boolean =>
  Number.isFinite(value) && isWithinAxis(value, axis);

export { isValidForAxis };
