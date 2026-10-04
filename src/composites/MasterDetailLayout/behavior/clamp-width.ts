/* @layer renderer-components @kind logic */
import type { ListWidthLimits } from './list-width.type';

const clampWidth = (width: number, limits: Pick<ListWidthLimits, 'min' | 'max'>): number =>
  Math.round(Math.min(limits.max, Math.max(limits.min, width)));

export { clampWidth };
