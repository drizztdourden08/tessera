/* @layer renderer-components @kind util */
import type { StepperItemProps } from '../sub-components/StepperItem.type';
import { stepName } from './step-name';

const stepAria = (item: Pick<StepperItemProps, 'step' | 'number' | 'status' | 'toggle'>, noteId: string | undefined) => {
  const { step, number, status, toggle } = item;
  return {
    'aria-label': stepName(step, number),
    'aria-pressed': toggle ? status === 'done' || status === 'current' : undefined,
    'aria-describedby': noteId,
  };
};

export { stepAria };
