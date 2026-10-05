/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { ListWidthLimits } from './list-width.type';

const clampWidth = (width: number, limits: Pick<ListWidthLimits, 'min' | 'max'>): number => Math.round(clampNumber(width, limits.min, limits.max));

export { clampWidth };
