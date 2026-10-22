/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import type { StepperItemProps } from '../sub-components/StepperItem.type';
import { stepName } from './step-name';

const stepAria = (strings: TesseraStrings['stepper'], item: Pick<StepperItemProps, 'step' | 'number' | 'status' | 'toggle'>) => {
  const { step, number, status, toggle } = item;
  if (!toggle) return { 'aria-label': stepName(strings, number, step.label, status), 'aria-pressed': undefined };
  return { 'aria-label': strings.stepName(number, step.label), 'aria-pressed': status === 'done' || status === 'current' };
};

export { stepAria };
