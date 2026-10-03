/* @layer renderer-components @kind types */
import type { StepperItemProps } from './StepperItem.type';

type StepperGapProps = Pick<StepperItemProps, 'step' | 'current' | 'last' | 'selectable' | 'activeSubStepId' | 'onSubStepSelect'>;

export type { StepperGapProps };
