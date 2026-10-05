/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from './column-width-math.constants';

const clampWidth = (width: number): number =>
  Math.round(clampNumber(width, MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH));

export { clampWidth };
