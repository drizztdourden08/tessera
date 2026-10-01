/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { WizardStepDirection } from '../WizardProgress.type';

const useStepDirection = (current: number): WizardStepDirection => {
  const [seen, setSeen] = useState<{ index: number; direction: WizardStepDirection }>({ index: current, direction: 'still' });
  if (seen.index !== current) {
    const direction = current > seen.index ? 'forward' : 'back';
    setSeen({ index: current, direction });
    return direction;
  }
  return seen.direction;
};

export { useStepDirection };
