/* @layer renderer-components @kind logic */
import { SIZE_STEPS } from './virtual.constants';
import type { VirtualSize } from './virtual.type';

const stepVirtualSize = (size: VirtualSize, by: number): VirtualSize => {
  const at = SIZE_STEPS.indexOf(size);
  const next = Math.min(SIZE_STEPS.length - 1, Math.max(0, (at < 0 ? 0 : at) + Math.trunc(by)));
  return SIZE_STEPS[next] ?? size;
};

export { stepVirtualSize };
