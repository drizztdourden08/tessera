/* @layer renderer-components @kind logic */
import { PRECISION } from './clamp-axis.constants';
import type { PositionAxis } from '../PositionInput.type';

const trim = (value: number): number => Number(value.toFixed(PRECISION));

const clampAxis = (value: number, axis: PositionAxis = {}, fallback = 0): number => {
  const { min, max } = axis;
  const usable = Number.isFinite(value) ? value : fallback;
  let next = Number.isFinite(usable) ? usable : (min ?? 0);
  if (min !== undefined && next < min) next = min;
  if (max !== undefined && next > max) next = max;
  return trim(next);
};

export { clampAxis };
