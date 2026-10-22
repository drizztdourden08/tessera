/* @layer renderer-components @kind data */
import type { StepperMediaSize, StepperSize, StepperStepWidth } from '../Stepper.type';
import type { StepperSizeLook } from './stepper-sizes.constants.type';

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

const STEPPER_SIZES: Readonly<Record<StepperSize, StepperSizeLook>> = {
  sm: { dot: 'var(--size-24)', digit: 'var(--text-xs)', gap: 'var(--space-md)', gapMin: 'var(--size-8)', icon: 14 },
  md: { dot: 'var(--size-32)', digit: 'var(--text-base)', gap: 'var(--space-xl)', gapMin: 'var(--size-16)', icon: 18 },
};

export { STEPPER_MEDIA_SIZES, STEPPER_SIZES, STEPPER_STEP_WIDTHS };
