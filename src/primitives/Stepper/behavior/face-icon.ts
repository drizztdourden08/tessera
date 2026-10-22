/* @layer renderer-components @kind util */
import type { IconName } from '../../Icon';
import type { StepperProps, StepperStep } from '../Stepper.type';

const faceIcon = (step: StepperStep, props: Pick<StepperProps, 'doneIcon' | 'dotVariant'>): IconName | undefined => {
  if (props.dotVariant === 'ring') return undefined;
  return (step.doneIcon ?? props.doneIcon ?? 'check') || undefined;
};

export { faceIcon };
