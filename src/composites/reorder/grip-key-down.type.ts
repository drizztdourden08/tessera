/* @layer renderer-components @kind types */
import type { ReorderDrag } from './reorder.type';

interface GripKeyOptions {
  drag: ReorderDrag;
  index: number;
  total: number;
  onStep: (to: number) => void;
}

export type { GripKeyOptions };
