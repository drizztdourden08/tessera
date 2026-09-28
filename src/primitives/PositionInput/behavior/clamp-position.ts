/* @layer renderer-components @kind logic */
import { clampAxis } from './clamp-axis';
import type { PositionAxis, PositionValue } from '../PositionInput.type';

const clampPosition = (
  value: PositionValue,
  x: PositionAxis = {},
  y: PositionAxis = {},
): PositionValue => ({
  x: clampAxis(value.x, x, 0),
  y: clampAxis(value.y, y, 0),
});

export { clampPosition };
