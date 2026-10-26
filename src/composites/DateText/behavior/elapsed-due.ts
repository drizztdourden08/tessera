/* @layer renderer-components @kind util */
import { ELAPSED_STEPS } from '../DateText.constants';

const elapsedDue = (at: number, now: number): number => {
  const seconds = Math.max(0, Math.trunc((now - at) / 1000));
  const step = ELAPSED_STEPS.find(([limit]) => seconds < limit)?.[1] ?? 1;
  return at + (Math.trunc(seconds / step) + 1) * step * 1000;
};

export { elapsedDue };
