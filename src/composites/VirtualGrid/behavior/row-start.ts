/* @layer renderer-components @kind logic */
import type { GridShape } from '../VirtualGrid.type';

const rowStart = (shape: GridShape): number => shape.active - (shape.active % shape.columns);

export { rowStart };
