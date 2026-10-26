/* @layer renderer-components @kind util */
import { ELAPSED_STEPS, ELAPSED_STEPS_ONE_UNIT } from '../DateText.constants';

const elapsedDue = (at: number, now: number, oneUnit = false): number => {
  const seconds = Math.max(0, Math.trunc((now - at) / 1000));
  const steps = oneUnit ? ELAPSED_STEPS_ONE_UNIT : ELAPSED_STEPS;
  const step = steps.find(([limit]) => seconds < limit)?.[1] ?? 1;
  return at + (Math.trunc(seconds / step) + 1) * step * 1000;
};

export { elapsedDue };
