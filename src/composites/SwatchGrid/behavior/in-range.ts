/* @layer renderer-components @kind util */
import type { SwatchRange } from '../SwatchGrid.type';

const inRange = (index: number, range: SwatchRange | undefined): boolean =>
  range !== undefined && index >= Math.min(range.from, range.to) && index <= Math.max(range.from, range.to);

export { inRange };
