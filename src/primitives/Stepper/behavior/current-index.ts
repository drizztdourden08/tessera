/* @layer renderer-components @kind util */
import type { StepperProps } from '../Stepper.type';

const currentIndex = (props: Pick<StepperProps, 'steps' | 'currentId' | 'complete' | 'selectMode'>): number => {
  const { steps, currentId, complete, selectMode } = props;
  if (selectMode === 'toggle') return -1;
  if (complete) return steps.length;
  return Math.max(steps.findIndex((step) => step.id === currentId), 0);
};

export { currentIndex };
