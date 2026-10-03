/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import type { StepperStatus } from '../Stepper.type';

const stepName = (strings: TesseraStrings['stepper'], number: number, label: string, status: StepperStatus): string => {
  if (status === 'done') return strings.stepDone(number, label);
  return status === 'error' ? strings.stepError(number, label) : strings.stepName(number, label);
};

export { stepName };
