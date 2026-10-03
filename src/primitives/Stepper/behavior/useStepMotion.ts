/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { StepperMotion } from './step-motion.type';

const useStepMotion = (current: number): StepperMotion => {
  const [seen, setSeen] = useState<StepperMotion & { at: number }>({ at: current, from: current, direction: 'still' });
  if (seen.at !== current) {
    const next = { at: current, from: seen.at, direction: current > seen.at ? 'forward' : 'back' } as const;
    setSeen(next);
    return next;
  }
  return seen;
};

export { useStepMotion };
