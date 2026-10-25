/* @layer renderer-components @kind util */
import type { StepperStep } from '../Stepper.type';

const stepName = (step: Pick<StepperStep, 'label' | 'summary'>, number: number): string =>
  [number, step.label, step.summary].filter(Boolean).join(' ');

export { stepName };
