/* @layer renderer-components @kind util */
import type { StepperStatus, StepperStep } from '../Stepper.type';

const stepStatus = (step: StepperStep, index: number, current: number): StepperStatus => {
  if (step.error === true && index <= current) return 'error';
  if (index < current) return 'done';
  return index === current ? 'current' : 'upcoming';
};

export { stepStatus };
