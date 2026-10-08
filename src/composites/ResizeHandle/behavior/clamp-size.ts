/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { PaneSizeOptions } from './pane-size.type';

const clampSize = (size: number, limits: Pick<PaneSizeOptions, 'min' | 'max'>): number => Math.round(clampNumber(size, limits.min, limits.max));

export { clampSize };
