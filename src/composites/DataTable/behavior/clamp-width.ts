/* @layer renderer-components @kind logic */
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from './column-width-math.constants';

const clampWidth = (width: number): number =>
  Math.round(Math.min(Math.max(width, MIN_COLUMN_WIDTH), MAX_COLUMN_WIDTH));

export { clampWidth };
