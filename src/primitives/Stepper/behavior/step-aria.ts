/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import type { StepperItemProps } from '../sub-components/StepperItem.type';
import { stepName } from './step-name';

const stepAria = (strings: TesseraStrings['stepper'], item: Pick<StepperItemProps, 'step' | 'number' | 'status' | 'toggle'>) => {
  const { step, number, status, toggle } = item;
  const shown = step.summary ? `${step.label} ${step.summary}` : step.label;
  if (!toggle) return { 'aria-label': stepName(strings, number, shown, status), 'aria-pressed': undefined };
  return { 'aria-label': strings.stepName(number, shown), 'aria-pressed': status === 'done' || status === 'current' };
};

export { stepAria };
