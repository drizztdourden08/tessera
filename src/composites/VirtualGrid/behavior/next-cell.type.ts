/* @layer renderer-components @kind types */
import type { GridShape } from '../VirtualGrid.type';

type GridMove = (shape: GridShape, ctrl: boolean) => number;

export type { GridMove };
