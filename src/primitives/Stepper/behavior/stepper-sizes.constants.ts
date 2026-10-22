/* @layer renderer-components @kind data */
import type { StepperMediaSize, StepperStepWidth } from '../Stepper.type';

const STEPPER_STEP_WIDTHS: Readonly<Record<StepperStepWidth, string>> = {
  sm: 'var(--size-80)',
  md: 'var(--size-96)',
  lg: 'var(--size-128)',
};

const STEPPER_MEDIA_SIZES: Readonly<Record<StepperMediaSize, string>> = {
  sm: 'var(--size-24)',
  md: 'var(--size-32)',
  lg: 'var(--size-48)',
};

export { STEPPER_MEDIA_SIZES, STEPPER_STEP_WIDTHS };
