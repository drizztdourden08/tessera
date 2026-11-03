/* @layer renderer-components @kind logic */
import { sizeVariable } from '../../virtual/size-variable';
import { SWATCH_GAP } from '../VirtualGrid.constants';
import type { VirtualSize } from '../../virtual';
import type { VirtualGridDensity } from '../VirtualGrid.type';

const tileSpan = (size: VirtualSize, density: VirtualGridDensity | undefined): string =>
  (density === 'swatch' ? `calc(${sizeVariable(size)} + ${SWATCH_GAP})` : sizeVariable(size));

export { tileSpan };
