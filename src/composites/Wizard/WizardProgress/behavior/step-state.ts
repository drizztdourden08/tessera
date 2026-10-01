/* @layer renderer-components @kind util */
import type { WizardStepState } from '../WizardProgress.type';

const stepState = (index: number, current: number): WizardStepState => {
  if (index < current) return 'done';
  return index === current ? 'current' : 'upcoming';
};

export { stepState };
