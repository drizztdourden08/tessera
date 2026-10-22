/* @layer renderer-components @kind types */
import type { IconName } from '../../Icon';
import type { StepperSize } from '../Stepper.type';

interface StepperDotProps {
  number: number;
  icon?: IconName;
  size?: StepperSize;
}

export type { StepperDotProps };
