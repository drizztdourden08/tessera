/* @layer renderer-components @kind util */
import type { StepperStep, StepperTone } from '../Stepper.type';

const lineTone = (step: StepperStep, next: StepperStep | undefined, tone: StepperTone | undefined): StepperTone | undefined => {
  if (next?.tone !== undefined) return next.tone;
  return step.tone === undefined ? undefined : tone ?? 'primary';
};

export { lineTone };
