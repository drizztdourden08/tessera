/* @layer renderer-components @kind logic */
import type { RampStep } from '../RampStrip.type';

const isOpen = (steps: readonly RampStep[], index: number | null): index is number =>
  index !== null && steps[index] !== undefined && steps[index].disabled !== true;

const rampTabStop = (steps: readonly RampStep[], value: number | null, focused: number | null): number | null => {
  if (isOpen(steps, focused)) return focused;
  if (isOpen(steps, value)) return value;
  const first = steps.findIndex((step) => step.disabled !== true);
  return first === -1 ? null : first;
};

export { rampTabStop };
