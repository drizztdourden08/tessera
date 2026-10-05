/* @layer renderer-components @kind util */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
const clampAxis = (offset: number, view: number, world: number): number => {
  if (world <= view) return (view - world) / 2;
  return clampNumber(offset, view - world, 0);
};

export { clampAxis };
