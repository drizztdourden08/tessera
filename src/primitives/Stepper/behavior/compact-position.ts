/* @layer renderer-components @kind util */
import type { StepperPositionText } from './compact-position.type';

const compactPosition = (current: number, total: number, text: StepperPositionText): string => {
  if (current < 0) return text.notStarted;
  if (current >= total) return text.complete;
  return text.stepOf(current + 1, total);
};

export { compactPosition };
