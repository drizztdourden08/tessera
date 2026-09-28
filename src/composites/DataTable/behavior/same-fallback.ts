/* @layer renderer-components @kind logic */
import type { GrowFallback } from './overflow-probe.type';

const sameFallback = (left: GrowFallback, right: GrowFallback): boolean => {
  if (left === null || right === null) return left === right;
  if (left.size !== right.size) return false;
  return [...left].every(([path, width]) => right.get(path) === width);
};

export { sameFallback };
