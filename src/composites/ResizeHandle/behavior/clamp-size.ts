/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { HUNDREDTH } from './clamp-size.constants';
import type { PaneSizeOptions } from './pane-size.type';

const clampSize = (size: number, limits: Pick<PaneSizeOptions, 'min' | 'max' | 'fine'>): number => {
  const clamped = clampNumber(size, limits.min, limits.max);
  return limits.fine ? Math.round(clamped * HUNDREDTH) / HUNDREDTH : Math.round(clamped);
};

export { clampSize };
