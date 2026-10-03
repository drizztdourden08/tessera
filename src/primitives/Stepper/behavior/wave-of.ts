/* @layer renderer-components @kind util */
import type { StepperMotion } from './step-motion.type';

const waveOf = (index: number, current: number, motion: StepperMotion): number | undefined => {
  if (motion.direction !== 'forward') return undefined;
  return index >= motion.from && index <= current ? index - motion.from : undefined;
};

export { waveOf };
