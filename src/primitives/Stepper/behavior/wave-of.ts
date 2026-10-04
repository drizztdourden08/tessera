/* @layer renderer-components @kind util */
import type { StepperMotion } from './step-motion.type';

const waveOf = (index: number, current: number, motion: StepperMotion): number | undefined => {
  if (motion.direction === 'forward') return index >= motion.from && index <= current ? index - motion.from : undefined;
  if (motion.direction === 'back') return index >= current && index <= motion.from ? motion.from - index : undefined;
  return undefined;
};

export { waveOf };
